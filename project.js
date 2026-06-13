/* ===================================================================
   project.js — 프로젝트 상세 페이지 렌더러 (?p=<key>)
   목적 → 데이터 → 분석과정(차트/표/코드) → 결과 → 제안 → 회고
   =================================================================== */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byKey = (k) => PROJECTS.find((p) => p.key === k);

  const params = new URLSearchParams(location.search);
  const setParam = params.get("set");           // 조합 유지용
  // 회사별 색 테마(예: modoodoc=퍼플) — 해당 data-theme의 CSS가 있을 때만 적용됨
  if (setParam && typeof PRESETS !== "undefined" && PRESETS[setParam] && setParam !== DEFAULT_SET)
    document.documentElement.setAttribute("data-theme", setParam);
  // 차트 팔레트도 테마에 맞춰 분기(차트 색은 JS에서 그려 CSS 변수를 못 받음)
  const PALETTE = setParam === "modoodoc"
    ? ["#5307B0", "#7F4FDF", "#9d72e8", "#c0a6f2", "#e6dafa"]
    : ["#1456f0", "#3b82f6", "#6f9cf5", "#a8c2f9", "#d4e2fd"];
  const setQS = setParam ? `&set=${encodeURIComponent(setParam)}` : "";
  const backHref = "index.html" + (setParam ? `?set=${encodeURIComponent(setParam)}` : "") + "#projects";

  const proj = byKey(params.get("p")) || PROJECTS[0];
  document.title = `${proj.title} · 박정연 포트폴리오`;

  // CTA로 다른 프로젝트(예: 심층분석)에서 넘어온 경우 — 원래 프로젝트로 돌아가는 링크용
  const fromProj = params.get("from") ? byKey(params.get("from")) : null;
  const fromShort = fromProj ? String(fromProj.title).split(/[—·]/)[0].trim() : "";
  const backToFrom = fromProj
    ? { href: `project.html?p=${fromProj.key}${setParam ? `&set=${encodeURIComponent(setParam)}` : ""}`, label: `← ${fromShort} 프로젝트로` }
    : null;

  // 프리셋 링크로 들어오면 그 프리셋 안에서만 이전/다음이 순환하도록
  const presetDef =
    setParam && typeof PRESETS !== "undefined" && PRESETS[setParam] && setParam !== DEFAULT_SET
      ? PRESETS[setParam]
      : null;
  const presetKeys = presetDef
    ? [presetDef.featured, ...presetDef.show].filter((k, i, a) => byKey(k) && a.indexOf(k) === i)
    : null;
  // 현재 프로젝트가 프리셋에 포함되면 프리셋 목록으로, 아니면 전체로 순환
  const ringKeys =
    presetKeys && presetKeys.includes(proj.key)
      ? presetKeys
      : PROJECTS.filter((p) => !p.hidden || p.key === proj.key).map((p) => p.key);
  const inPreset = !!presetKeys;
  const listLabel = inPreset ? "← 프로젝트 목록" : "← 전체 프로젝트";

  $("#backLink").setAttribute("href", backHref);
  $("#backLink").textContent = listLabel;
  $("#brandLink").setAttribute("href", "index.html" + (setParam ? `?set=${encodeURIComponent(setParam)}` : ""));

  const d = proj.detail || {};

  /* ---------- 작은 빌더 ---------- */
  const tools = (arr) =>
    arr.map((t) => `<span class="t-chip">${esc(t)}</span>`).join("");

  function tableHTML(t) {
    if (!t) return "";
    const head = t.headers
      .map((h, i) =>
        t.sortable
          ? `<th data-sort="${i}"><button class="th-sort" type="button">${esc(h)}<span class="th-sort__ico"></span></button></th>`
          : `<th>${esc(h)}</th>`
      )
      .join("");
    const rows = t.rows
      .map(
        (r) =>
          `<tr>${r
            .map((c, i) => `<td${i === 0 ? ' class="td-key"' : ""}>${esc(c)}</td>`)
            .join("")}</tr>`
      )
      .join("");
    return `<div class="d-table-wrap"><table class="d-table${t.sortable ? " d-table--sortable" : ""}"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  let chartSeq = 0;
  const chartSpecs = [];
  function chartHTML(c) {
    if (!c) return "";
    const id = "chart-" + chartSeq++;
    chartSpecs.push({ id, spec: c });
    return `
      <figure class="d-chart">
        ${c.title ? `<figcaption class="d-chart__title">${esc(c.title)}</figcaption>` : ""}
        <div class="d-chart__canvas"><canvas id="${id}"></canvas></div>
        ${c.note ? `<p class="d-chart__note">${esc(c.note)}</p>` : ""}
      </figure>`;
  }

  function codeHTML(code) {
    if (!code) return "";
    return `
      <details class="d-code">
        <summary class="d-code__summary">
          <span class="d-code__ico">&lt;/&gt;</span>
          <span class="d-code__label">코드 보기</span>
          <span class="d-code__title">${esc(code.title || "")}</span>
          <span class="d-code__lang">${esc(code.lang)}</span>
        </summary>
        <div class="d-code__body">
          <button class="d-code__copy" data-copy>복사</button>
          <pre><code class="language-${esc(code.lang)}">${esc(code.body)}</code></pre>
        </div>
      </details>`;
  }

  // 자동 줄바꿈: 문장 끝(.!?)과 '괄호 밖 콤마'에서 1차로 끊은 뒤,
  // 너무 짧은 조각은 이웃과 합친다 → 양쪽이 다 충분히 길 때만 줄바꿈이 남는다.
  // (나열 콤마는 항목이 짧아 자동 병합되고, 두 절을 가르는 긴 콤마는 양쪽이 길어 줄바꿈 유지)
  function smartBreak(p) {
    const sentences = String(p).split(/(?<=[.!?])\s+(?=\S)/);
    const out = [];
    for (let s of sentences) {
      s = s.trim();
      if (!s) continue;
      let depth = 0, buf = "", lines = [];
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "(" || ch === "\uFF08") depth++;
        else if (ch === ")" || ch === "\uFF09") depth = Math.max(0, depth - 1);
        buf += ch;
        if (ch === "," && depth === 0 && s[i + 1] === " ") {
          lines.push(buf.trim());
          buf = "";
          i++; // 콤마 뒤 공백 건너뜀
        }
      }
      if (buf.trim()) lines.push(buf.trim());
      // 앞이든 뒤든 너무 짧은 조각은 이웃과 합친다 — 양쪽 다 충분히 길 때만 줄바꿈을 유지.
      const MIN = 28;
      let segs = lines.slice(), changed = true;
      while (changed && segs.length > 1) {
        changed = false;
        for (let i = 0; i < segs.length; i++) {
          if (segs[i].length < MIN) {
            if (i > 0) { segs[i - 1] += " " + segs[i]; segs.splice(i, 1); }
            else { segs[1] = segs[0] + " " + segs[1]; segs.splice(0, 1); }
            changed = true;
            break;
          }
        }
      }
      out.push(segs.join("\n"));
    }
    return out.join("\n");
  }

  function bodyText(body) {
    if (!body) return "";
    const arr = Array.isArray(body) ? body : [body];
    return arr
      .map((p) => {
        // 본문에 직접 넣은 \n이 있으면 그걸 그대로(수동 우선), 없으면 자동 절 분할.
        const src = String(p).includes("\n") ? String(p) : smartBreak(String(p));
        return src
          .split(/\n\s*\n/)
          .map((para) => `<p class="d-text">${esc(para).replace(/\n/g, "<br>")}</p>`)
          .join("");
      })
      .join("");
  }

  // 색상 보간 (연한 배경 → 진한 accent), t: 0~1
  function lerpColor(t) {
    // 모두닥 테마면 퍼플(#F3ECFC→#5307B0), 아니면 블루(#eef3ff→#1456f0)
    const a = setParam === "modoodoc" ? [243, 236, 252] : [238, 243, 255];
    const b = setParam === "modoodoc" ? [83, 7, 176]    : [20, 86, 240];
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  // HTML 색상 히트맵
  function heatmapHTML(hm) {
    if (!hm) return "";
    const cellVal = (c) => (c && typeof c === "object" ? c.v : c);
    const vals = hm.rows.flatMap((r) => r.cells.map(cellVal))
      .filter((v) => v !== null && v !== undefined && !isNaN(v));
    const min = hm.min != null ? hm.min : Math.min(...vals);
    const max = hm.max != null ? hm.max : Math.max(...vals);
    const colHead = `<th></th>` + hm.cols.map((c) => `<th>${esc(c)}</th>`).join("");
    const body = hm.rows
      .map((r) => {
        const cells = r.cells
          .map((c) => {
            const isObj = c && typeof c === "object";
            const v = isObj ? c.v : c;
            const disp = isObj ? c.display : c;
            if (v === null || v === undefined || v === "" || isNaN(v))
              return `<td class="hm-empty"></td>`;
            const t = max === min ? 0.5 : (v - min) / (max - min);
            const fg = t > 0.55 ? "#fff" : "#1a1f2b";
            return `<td style="background:${lerpColor(t)};color:${fg}">${esc(disp != null ? disp : v)}${hm.unit && typeof (disp != null ? disp : v) === "number" ? hm.unit : ""}</td>`;
          })
          .join("");
        return `<tr><th class="hm-row">${esc(r.label)}</th>${cells}</tr>`;
      })
      .join("");
    return `
      <figure class="d-heatmap">
        ${hm.title ? `<figcaption class="d-chart__title">${esc(hm.title)}</figcaption>` : ""}
        <div class="d-table-wrap"><table class="hm-table"><thead><tr>${colHead}</tr></thead><tbody>${body}</tbody></table></div>
        ${hm.note ? `<p class="d-chart__note">${esc(hm.note)}</p>` : ""}
      </figure>`;
  }

  // 이미지 블록 (실제 분석 자료)
  function imagesHTML(s) {
    const items = s.images ? s.images : s.image ? [s.image] : [];
    if (!items.length) return "";
    const cls = items.length > 1 ? "d-figs d-figs--multi" : "d-figs";
    return `<div class="${cls}">` + items
      .map(
        (im) => `
        <figure class="d-fig d-fig--${esc(im.kind || "plain")}">
          <img loading="lazy" src="${esc(im.src)}" alt="${esc(im.caption || "")}" />
          ${im.caption ? `<figcaption class="d-fig__cap">${esc(im.caption)}</figcaption>` : ""}
        </figure>`
      )
      .join("") + `</div>`;
  }

  /* ---------- 헤더 ---------- */
  const headerHTML = `
    <section class="d-hero">
      <div class="wrap">
        <a class="d-back" href="${esc(backToFrom ? backToFrom.href : backHref)}">${esc(backToFrom ? backToFrom.label : inPreset ? "← 프로젝트 목록으로" : "← 전체 프로젝트로")}</a>
        <div class="d-hero__top">
          <span class="badge">${esc(proj.domainLabel)}</span>
          <span class="d-hero__period">${esc(proj.period)} · ${esc(proj.type)}</span>
        </div>
        <h1 class="d-hero__title">${esc(proj.title)}</h1>
        <p class="d-hero__summary">${esc(proj.summary || "")}</p>
        <div class="d-hero__tools">${tools(proj.tools)}</div>
        <div class="d-hero__metric">
          <span class="d-hero__metric-val">${esc(proj.metric.value)}</span>
          <span class="d-hero__metric-lab">${esc(proj.metric.label)}</span>
        </div>
        ${
          proj.links && proj.links.length
            ? `<div class="d-hero__links" style="margin-top:18px;display:flex;flex-wrap:wrap;gap:8px;">${proj.links
                .map(
                  (l) =>
                    `<a href="${esc(l.url)}" target="_blank" rel="noopener" style="display:inline-block;padding:8px 15px;border:1px solid var(--accent);border-radius:8px;color:var(--accent);text-decoration:none;font-size:13px;font-weight:600;">${esc(l.label)}</a>`
                )
                .join("")}</div>`
            : ""
        }
      </div>
    </section>`;

  /* ---------- 목적 ---------- */
  const objectiveHTML = `
    <section class="d-section wrap">
      <h2 class="d-h2"><span class="d-h2__no">01</span> 분석 목적</h2>
      ${d.question ? `<p class="d-question">“${esc(d.question)}”</p>` : ""}
      ${bodyText(d.objective)}
    </section>`;

  /* ---------- 데이터 설명 ---------- */
  function dataHTML() {
    if (!d.data) return "";
    const rows = [];
    if (d.data.source) rows.push(["데이터", d.data.source]);
    if (d.data.period && d.data.period !== "-") rows.push(["기간", d.data.period]);
    if (d.data.scale) rows.push(["규모", d.data.scale]);
    const meta = rows
      .map(
        (r) =>
          `<div class="d-meta"><span class="d-meta__k">${esc(r[0])}</span><span class="d-meta__v">${esc(r[1])}</span></div>`
      )
      .join("");
    const pre = (d.data.preprocessing || []).length
      ? `<h3 class="d-h3">전처리 · 정제 규칙</h3><ul class="d-list">${d.data.preprocessing
          .map((x) => `<li>${esc(x)}</li>`)
          .join("")}</ul>`
      : "";
    const preTable = d.data.preTable ? tableHTML(d.data.preTable) : "";
    return `
      <section class="d-section d-section--alt">
        <div class="wrap">
          <h2 class="d-h2"><span class="d-h2__no">02</span> 데이터 설명</h2>
          <div class="d-meta-grid">${meta}</div>
          ${pre}${preTable}
        </div>
      </section>`;
  }

  /* ---------- 분석 과정 ---------- */
  function sectionsHTML() {
    if (!d.sections || !d.sections.length) return "";
    const blocks = d.sections
      .map(
        (s) => `
      <article class="d-step">
        <h3 class="d-step__title">${esc(s.title)}</h3>
        ${s.lead ? `<p class="d-lead">${s.lead}</p>` : ""}
        ${s.points ? `<ul class="d-list d-list--pt">${s.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
        ${bodyText(s.body)}
        ${s.callout ? `<div class="d-callout">${esc(s.callout)}</div>` : ""}
        ${s.callout2 ? `<div class="d-callout d-callout--build">${esc(s.callout2)}</div>` : ""}
        ${chartHTML(s.chart)}
        ${heatmapHTML(s.heatmap)}
        ${tableHTML(s.table)}
        ${imagesHTML(s)}
        ${codeHTML(s.code)}
        ${s.cta ? `<a class="d-cta" href="project.html?p=${esc(s.cta.to)}${setQS}&from=${esc(proj.key)}"><span class="d-cta__txt">${esc(s.cta.text)}</span><span class="d-cta__go">자세히 보기 →</span></a>` : ""}
      </article>`
      )
      .join("");
    return `
      <section class="d-section wrap">
        <h2 class="d-h2"><span class="d-h2__no">03</span> 분석 과정 <span class="d-h2__sub">근거</span></h2>
        <div class="d-steps">${blocks}</div>
      </section>`;
  }

  /* ---------- 결과 ---------- */
  function resultsHTML() {
    const stats = (d.resultStats || [])
      .map(
        (s) =>
          `<li><span class="d-stat__v">${esc(s.value)}</span><span class="d-stat__l">${esc(s.label)}</span></li>`
      )
      .join("");
    const list = (d.results || [])
      .map((r) => `<li>${esc(r)}</li>`)
      .join("");
    return `
      <section class="d-section d-section--alt">
        <div class="wrap">
          <h2 class="d-h2"><span class="d-h2__no">04</span> 결과</h2>
          ${stats ? `<ul class="d-stats">${stats}</ul>` : ""}
          ${list ? `<ul class="d-list d-list--check">${list}</ul>` : ""}
        </div>
      </section>`;
  }

  /* ---------- 제안 ---------- */
  function proposalHTML() {
    if (!d.proposal || !d.proposal.length) return "";
    const cards = d.proposal
      .map(
        (p) => `
        <div class="d-prop">
          <h4 class="d-prop__t">${esc(p.title)}</h4>
          <p class="d-prop__d">${esc(p.desc)}</p>
        </div>`
      )
      .join("");
    return `
      <section class="d-section wrap">
        <h2 class="d-h2"><span class="d-h2__no">05</span> 제안 · 액션</h2>
        <div class="d-props">${cards}</div>
      </section>`;
  }

  /* ---------- 회고 ---------- */
  function retroHTML() {
    if (!d.retro || !d.retro.length) return "";
    const list = d.retro.map((r) => `<li>${esc(r)}</li>`).join("");
    return `
      <section class="d-section d-section--alt">
        <div class="wrap">
          <h2 class="d-h2"><span class="d-h2__no">06</span> 회고 <span class="d-h2__sub">한계 · 다음 단계</span></h2>
          <ul class="d-list d-list--retro">${list}</ul>
        </div>
      </section>`;
  }

  /* ---------- 프로젝트 간 이동 ---------- */
  function pagerHTML() {
    // 프리셋 안에서만(또는 전체) 순환
    const n = ringKeys.length;
    const idx = ringKeys.indexOf(proj.key);
    const prev = byKey(ringKeys[(idx - 1 + n) % n]);
    const next = byKey(ringKeys[(idx + 1) % n]);
    const single = n <= 1;
    const link = (p, dir, label) =>
      `<a class="d-pager__item d-pager__item--${dir}" href="project.html?p=${esc(p.key)}${setQS}">
         <span class="d-pager__dir">${label}</span>
         <span class="d-pager__title">${esc(p.title)}</span>
       </a>`;
    // CTA로 넘어온 페이지(예: 심층분석)는 '이전 프로젝트' 자리에 원래 프로젝트로 돌아가기를 둔다
    const prevSlot = backToFrom
      ? `<a class="d-pager__item d-pager__item--prev" href="${esc(backToFrom.href)}">
           <span class="d-pager__dir">← 돌아가기</span>
           <span class="d-pager__title">${esc(fromProj.title)}</span>
         </a>`
      : single ? "" : link(prev, "prev", "← 이전 프로젝트");
    return `
      <section class="d-pager wrap">
        ${prevSlot}
        <a class="d-pager__all" href="${esc(backHref)}">${esc(inPreset ? "목록 보기" : "전체 보기")}</a>
        ${single ? "" : link(next, "next", "다음 프로젝트 →")}
      </section>`;
  }

  /* ---------- 조립 ---------- */
  $("#projectRoot").innerHTML =
    headerHTML +
    objectiveHTML +
    dataHTML() +
    sectionsHTML() +
    resultsHTML() +
    proposalHTML() +
    retroHTML() +
    pagerHTML();

  /* ---------- 결과·회고 한 줄 고정 (넘치면 폰트만 살짝 축소) ---------- */
  function fitOneLine() {
    if (window.innerWidth <= 600) return; // 모바일은 자연 줄바꿈
    $$(".d-list--check li, .d-list--retro li").forEach((li) => {
      li.style.fontSize = "";
      let size = parseFloat(getComputedStyle(li).fontSize);
      const floor = size * 0.8; // 최소 80%까지만 축소
      let guard = 0;
      while (li.scrollWidth > li.clientWidth + 1 && size > floor && guard < 60) {
        size -= 0.5;
        li.style.fontSize = size + "px";
        guard++;
      }
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitOneLine);
  fitOneLine();
  let fitT;
  window.addEventListener("resize", () => { clearTimeout(fitT); fitT = setTimeout(fitOneLine, 150); });

  /* ---------- 코드 하이라이트 + 복사 ---------- */
  if (window.hljs) $$("pre code").forEach((el) => hljs.highlightElement(el));
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const code = btn.closest(".d-code").querySelector("code").innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = "복사됨 ✓";
      setTimeout(() => (btn.textContent = "복사"), 1400);
    });
  });

  /* ---------- 정렬 가능한 표 (헤더 클릭) ---------- */
  function parseSortVal(s) {
    s = String(s).trim();
    const tm = s.match(/(\d+)\s*분\s*(\d+)?/);
    if (tm) return +tm[1] * 60 + +(tm[2] || 0);
    const nm = s.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
    if (nm) return parseFloat(nm[0]);
    return s.toLowerCase();
  }
  document.addEventListener("click", (e) => {
    const th = e.target.closest(".d-table--sortable th[data-sort]");
    if (!th) return;
    const table = th.closest("table");
    const col = +th.dataset.sort;
    const tbody = table.querySelector("tbody");
    const asc = !(table.dataset.sortCol === String(col) && table.dataset.sortDir === "asc");
    Array.from(tbody.rows)
      .sort((a, b) => {
        const x = parseSortVal(a.cells[col].innerText);
        const y = parseSortVal(b.cells[col].innerText);
        if (typeof x === "number" && typeof y === "number") return asc ? x - y : y - x;
        return asc
          ? String(x).localeCompare(String(y), "ko")
          : String(y).localeCompare(String(x), "ko");
      })
      .forEach((r) => tbody.appendChild(r));
    table.dataset.sortCol = col;
    table.dataset.sortDir = asc ? "asc" : "desc";
    table.querySelectorAll("th[data-sort]").forEach((h) => h.removeAttribute("data-dir"));
    th.setAttribute("data-dir", asc ? "asc" : "desc");
  });

  /* ---------- 차트 렌더 (Chart.js) ---------- */
  function makeChart({ id, spec }) {
    const ctx = document.getElementById(id);
    if (!ctx || !window.Chart) return;
    const isPct = spec.unit === "%";
    const single = spec.datasets.length === 1;

    let type = "bar";
    let datasets;

    if (spec.type === "combo") {
      // bar + line 혼합, 이중 축 (dataset.kind: 'bar'|'line', dataset.axis: 'y'|'y1')
      datasets = spec.datasets.map((ds, i) => {
        const isLine = ds.kind === "line";
        return {
          type: isLine ? "line" : "bar",
          label: ds.label,
          data: ds.data,
          yAxisID: ds.axis || "y",
          backgroundColor: isLine ? "transparent" : PALETTE[1],
          borderColor: PALETTE[Math.min(i + 1, PALETTE.length - 1)],
          borderWidth: isLine ? 2.5 : 0,
          pointRadius: isLine ? 2 : 0,
          tension: 0.3,
          borderRadius: isLine ? 0 : 6,
          order: isLine ? 0 : 1,
        };
      });
      new Chart(ctx, {
        data: { labels: spec.labels, datasets },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { position: "top", labels: { font: { family: "Pretendard", size: 12 }, color: "#5a6473", boxWidth: 12, padding: 12 } },
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { family: "Pretendard", size: 11 }, color: "#5a6473", maxRotation: 0, autoSkip: true } },
            y: { beginAtZero: true, position: "left", grid: { color: "#eef0f4" }, ticks: { font: { family: "JetBrains Mono", size: 10 }, color: "#9aa3b2", callback: (v) => v.toLocaleString() } },
            y1: { beginAtZero: true, position: "right", grid: { drawOnChartArea: false }, ticks: { font: { family: "JetBrains Mono", size: 10 }, color: "#9aa3b2" } },
          },
        },
      });
      return;
    }

    if (spec.type === "doughnut") {
      type = "doughnut";
      datasets = [
        {
          data: spec.datasets[0].data,
          backgroundColor: spec.labels.map((_, i) => PALETTE[i % PALETTE.length]),
          borderColor: "#fff",
          borderWidth: 2,
        },
      ];
    } else {
      datasets = spec.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: single
          ? spec.labels.map((_, j) => (j === spec.labels.length - 1 && spec.type === "bar" && spec.labels.length === 2 ? PALETTE[1] : PALETTE[0]))
          : PALETTE[i % PALETTE.length],
        borderRadius: 6,
        maxBarThickness: 64,
      }));
    }

    const valFmt = (v) =>
      isPct ? v + "%" : spec.unit === "원" ? v.toLocaleString() : v.toLocaleString();

    new Chart(ctx, {
      type,
      data: { labels: spec.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: spec.horizontal ? "y" : "x",
        plugins: {
          legend: {
            display: type === "doughnut" || !single,
            position: type === "doughnut" ? "right" : "top",
            labels: { font: { family: "Pretendard", size: 12 }, color: "#5a6473", boxWidth: 12, padding: 12 },
          },
          tooltip: {
            callbacks: {
              label: (c) => {
                const v = spec.horizontal ? c.parsed.x : (c.parsed.y ?? c.parsed);
                return ` ${c.dataset.label ? c.dataset.label + ": " : ""}${valFmt(v)}`;
              },
            },
          },
        },
        scales:
          type === "doughnut"
            ? {}
            : (function () {
                const catAxis = { grid: { display: false }, ticks: { font: { family: "Pretendard", size: spec.horizontal ? 11 : 12 }, color: "#5a6473", autoSkip: false } };
                const valAxis = {
                  beginAtZero: true,
                  suggestedMax: spec.max || undefined,
                  grid: { color: "#eef0f4" },
                  ticks: { font: { family: "JetBrains Mono", size: 11 }, color: "#9aa3b2", callback: (v) => (isPct ? v + "%" : v.toLocaleString()) },
                };
                return spec.horizontal
                  ? { x: valAxis, y: catAxis }
                  : { x: catAxis, y: valAxis };
              })(),
      },
    });
  }
  chartSpecs.forEach(makeChart);

  /* ---------- FOOTER ---------- */
  $("#footerTagline").textContent = PROFILE.tagline;
  const links = [
    { k: "Email", label: PROFILE.email, href: "mailto:" + PROFILE.email },
    PROFILE.velog && !PROFILE.velog.includes("본인아이디")
      ? { k: "velog", label: "학습 블로그", href: PROFILE.velog }
      : null,
    PROFILE.github && !PROFILE.github.includes("본인아이디")
      ? { k: "GitHub", label: "코드 저장소", href: PROFILE.github }
      : null,
  ].filter(Boolean);
  $("#footerLinks").innerHTML = links
    .map(
      (l) =>
        `<li><a href="${esc(l.href)}" ${l.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><span class="k">${esc(l.k)}</span> ${esc(l.label)}</a></li>`
    )
    .join("");
  $("#year").textContent = "2026";

  /* ---------- NAV 스크롤 효과 ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
