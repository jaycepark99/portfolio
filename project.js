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

  const PALETTE = ["#2d4a7c", "#3f6bb0", "#6b9bd8", "#a9c5e8", "#cfe0f2"];
  const params = new URLSearchParams(location.search);
  const setParam = params.get("set");           // 조합 유지용
  const setQS = setParam ? `&set=${encodeURIComponent(setParam)}` : "";
  const backHref = "index.html" + (setParam ? `?set=${encodeURIComponent(setParam)}` : "") + "#projects";

  const proj = byKey(params.get("p")) || PROJECTS[0];
  document.title = `${proj.title} · 박정연 포트폴리오`;
  $("#backLink").setAttribute("href", backHref);
  $("#brandLink").setAttribute("href", "index.html" + (setParam ? `?set=${encodeURIComponent(setParam)}` : ""));

  const d = proj.detail || {};

  /* ---------- 작은 빌더 ---------- */
  const tools = (arr) =>
    arr.map((t) => `<span class="t-chip">${esc(t)}</span>`).join("");

  function tableHTML(t) {
    if (!t) return "";
    const head = t.headers.map((h) => `<th>${esc(h)}</th>`).join("");
    const rows = t.rows
      .map(
        (r) =>
          `<tr>${r
            .map((c, i) => `<td${i === 0 ? ' class="td-key"' : ""}>${esc(c)}</td>`)
            .join("")}</tr>`
      )
      .join("");
    return `<div class="d-table-wrap"><table class="d-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
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

  function bodyText(body) {
    if (!body) return "";
    const arr = Array.isArray(body) ? body : [body];
    return arr
      .map((p) => {
        // 문장 끝(.!?) + 공백에서만 줄바꿈 → 문장이 중간에 어색하게 끊기지 않음.
        // 소수점(0.96, +9.03%)은 마침표 뒤에 공백이 없어 끊기지 않음.
        const html = esc(p).replace(/([.!?])\s+(?=\S)/g, "$1<br>");
        return `<p class="d-text">${html}</p>`;
      })
      .join("");
  }

  // 색상 보간 (연한 배경 → 진한 accent), t: 0~1
  function lerpColor(t) {
    const a = [238, 243, 251], b = [45, 74, 124]; // #eef3fb → #2d4a7c
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
        <a class="d-back" href="${esc(backHref)}">← 전체 프로젝트로</a>
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
        ${bodyText(s.body)}
        ${s.callout ? `<div class="d-callout">${esc(s.callout)}</div>` : ""}
        ${s.callout2 ? `<div class="d-callout d-callout--build">${esc(s.callout2)}</div>` : ""}
        ${chartHTML(s.chart)}
        ${heatmapHTML(s.heatmap)}
        ${tableHTML(s.table)}
        ${imagesHTML(s)}
        ${codeHTML(s.code)}
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
    const idx = PROJECTS.indexOf(proj);
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    const link = (p, dir, label) =>
      `<a class="d-pager__item d-pager__item--${dir}" href="project.html?p=${esc(p.key)}${setQS}">
         <span class="d-pager__dir">${label}</span>
         <span class="d-pager__title">${esc(p.title)}</span>
       </a>`;
    return `
      <section class="d-pager wrap">
        ${link(prev, "prev", "← 이전 프로젝트")}
        <a class="d-pager__all" href="${esc(backHref)}">전체 보기</a>
        ${link(next, "next", "다음 프로젝트 →")}
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
