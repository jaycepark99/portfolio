/* ===================================================================
   main.js  —  렌더링 · 프리셋(?set=) · 필터 · 코드 모달 · 스크롤 효과
   데이터는 data.js 에서 가져옵니다.
   =================================================================== */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byKey = (k) => PROJECTS.find((p) => p.key === k);
  const idxOf = (k) => PROJECTS.findIndex((p) => p.key === k);

  /* ---- 회사별 조합: URL ?set=key (구버전 ?focus= 도 호환) ---- */
  const params = new URLSearchParams(location.search);
  let setKey = params.get("set");
  if (!setKey && params.get("focus")) {
    // ?focus=key 는 'featured 만 그 프로젝트로, 나머지 전부 노출' 로 호환 처리
    setKey = "__focus__";
  }
  const preset =
    setKey === "__focus__"
      ? buildFocusPreset(params.get("focus"))
      : PRESETS[setKey] || PRESETS[DEFAULT_SET];
  const isDefaultView = !setKey || setKey === DEFAULT_SET;

  function buildFocusPreset(fk) {
    const f = byKey(fk) ? fk : "abtest";
    return {
      label: "맞춤",
      featured: f,
      show: PROJECTS.map((p) => p.key).filter((k) => k !== f),
    };
  }

  // 현재 화면에 노출할 프로젝트(순서대로): featured + show
  const featuredKey = byKey(preset.featured) ? preset.featured : "abtest";
  const showKeys = (preset.show || []).filter((k) => byKey(k) && k !== featuredKey);
  const visibleKeys = [featuredKey, ...showKeys];

  /* ================= HERO ================= */
  $("#heroTitle").innerHTML =
    `<b>${esc(PROFILE.name)}</b>입니다.<br>${esc(PROFILE.tagline)}`;
  $("#heroIntro").textContent = PROFILE.intro;
  $("#heroStats").innerHTML = HERO_STATS.map(
    (s) =>
      `<li><span class="num">${esc(s.value)}</span><span class="cap">${esc(s.label)}</span></li>`
  ).join("");

  /* ================= STRENGTHS (보이는 프로젝트의 역량만) ================= */
  $("#strengthsGrid").innerHTML = visibleKeys
    .map((k) => byKey(k).strength)
    .map(
      (s) => `
    <article class="strength reveal">
      <div class="strength__icon">${s.icon}</div>
      <h3 class="strength__title">${esc(s.title)}</h3>
      <p class="strength__desc">${esc(s.desc)}</p>
      <p class="strength__meta">${esc(s.meta)}</p>
    </article>`
    )
    .join("");

  /* ================= 카드 빌더 ================= */
  const toolsTags = (tools, cls = "") =>
    tools.map((t) => `<span class="${cls}">${esc(t)}</span>`).join("");
  const listBlock = (title, items) => `
      <div class="detail__block">
        <h4>${title}</h4>
        <ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>`;
  function actions(p) {
    let html = "";
    if (p.code && p.code.length) {
      html += `<button class="act act--code" data-code="${esc(p.key)}"><span class="ico">&lt;/&gt;</span> 코드 보기</button>`;
    }
    if (p.github) {
      html += `<a class="act" href="${esc(p.github)}" target="_blank" rel="noopener"><span class="ico">↗</span> GitHub</a>`;
    }
    return html ? `<div class="card__actions">${html}</div>` : "";
  }

  function cardHTML(p) {
    return `
    <article class="card reveal" data-domain="${p.domain}" data-key="${p.key}">
      <div class="card__top">
        <span class="badge">${esc(p.domainLabel)}</span>
        <span class="card__period">${esc(p.period)}</span>
      </div>
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__type">${esc(p.type)}</p>
      <div class="metric">
        <span class="metric__value">${esc(p.metric.value)}</span>
        <span class="metric__label">${esc(p.metric.label)}</span>
      </div>
      <div class="card__tools">${toolsTags(p.tools)}</div>
      <details class="card__detail">
        <summary>분석 과정 자세히 보기</summary>
        ${listBlock("문제 정의", [p.problem])}
        ${listBlock("전략 · 분석", p.strategy)}
        ${listBlock("성과", p.result)}
      </details>
      ${actions(p)}
    </article>`;
  }

  function featuredHTML(p) {
    return `
    <article class="card--featured reveal" data-key="${p.key}">
      <div class="card__main">
        <div class="card__top">
          <span class="badge">${esc(p.domainLabel)}</span>
          <span class="card__period">${esc(p.period)}</span>
        </div>
        <h3 class="card__title" style="font-size:1.4rem">${esc(p.title)}</h3>
        <p class="card__type">${esc(p.type)}</p>
        <details class="card__detail" open>
          <summary>분석 과정 자세히 보기</summary>
          ${listBlock("문제 정의", [p.problem])}
          ${listBlock("전략 · 분석", p.strategy)}
          ${listBlock("성과", p.result)}
        </details>
        ${actions(p)}
      </div>
      <aside class="card__side">
        <div class="metric" style="background:transparent;padding:0">
          <span class="metric__value">${esc(p.metric.value)}</span>
        </div>
        <span class="metric__label" style="margin-top:8px">${esc(p.metric.label)}</span>
        <div class="side__tools">${toolsTags(p.tools)}</div>
      </aside>
    </article>`;
  }

  /* ================= 렌더 ================= */
  $("#featuredCard").innerHTML = featuredHTML(byKey(featuredKey));
  $("#projectGrid").innerHTML = showKeys.map((k) => cardHTML(byKey(k))).join("");

  // 조합이 지정된 경우 안내 배지 + 전체보기 링크
  const setNote = $("#setNote");
  if (setNote) {
    if (!isDefaultView) {
      setNote.innerHTML =
        `<span class="set-chip">${esc(preset.label)} 맞춤 구성</span>` +
        `<a class="set-all" href="index.html">전체 프로젝트 보기 →</a>`;
      setNote.style.display = "flex";
    } else {
      setNote.style.display = "none";
    }
  }

  /* ================= 필터 (기본 전체보기에서만) ================= */
  const filtersEl = $("#filters");
  if (isDefaultView) {
    const present = new Set(showKeys.map((k) => byKey(k).domain));
    const DOMAINS = [
      { key: "all", label: "전체" },
      { key: "experiment", label: "실험·통계" },
      { key: "dashboard", label: "대시보드·운영" },
      { key: "ml", label: "머신러닝" },
      { key: "ecommerce", label: "E-commerce" },
      { key: "marketing", label: "마케팅" },
    ].filter((d) => d.key === "all" || present.has(d.key));

    filtersEl.innerHTML = DOMAINS.map(
      (d, i) =>
        `<button class="filter ${i === 0 ? "is-active" : ""}" data-filter="${d.key}">${esc(d.label)}</button>`
    ).join("");
    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$("#projectGrid .card").forEach((c) => {
        c.style.display = f === "all" || c.dataset.domain === f ? "" : "none";
      });
    });
  } else {
    filtersEl.style.display = "none";
  }

  /* ================= 코드 모달 ================= */
  const modal = $("#codeModal");
  const tabsEl = $("#modalTabs");
  const bodyEl = $("#modalBody");
  let activeProject = null;

  function openModal(proj) {
    activeProject = proj;
    $("#modalTitle").textContent = proj.title;
    tabsEl.innerHTML = proj.code
      .map(
        (c, i) =>
          `<button class="modal__tab ${i === 0 ? "is-active" : ""}" data-tab="${i}">${esc(c.title)}<span class="lang">${esc(c.lang)}</span></button>`
      )
      .join("");
    showSnippet(0);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function showSnippet(i) {
    const c = activeProject.code[i];
    bodyEl.innerHTML = `
      <button class="code-copy" data-copy>복사</button>
      <pre><code class="language-${esc(c.lang)}">${esc(c.body)}</code></pre>`;
    if (window.hljs) hljs.highlightElement(bodyEl.querySelector("code"));
    $$(".modal__tab", tabsEl).forEach((t, idx) =>
      t.classList.toggle("is-active", idx === i)
    );
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const codeBtn = e.target.closest("[data-code]");
    if (codeBtn) {
      const proj = byKey(codeBtn.dataset.code);
      if (proj && proj.code.length) openModal(proj);
      return;
    }
    if (e.target.closest("[data-close]")) return closeModal();
    const tab = e.target.closest(".modal__tab");
    if (tab) return showSnippet(+tab.dataset.tab);
    if (e.target.closest("[data-copy]")) {
      const code = bodyEl.querySelector("code").innerText;
      navigator.clipboard.writeText(code).then(() => {
        const b = $("[data-copy]");
        b.textContent = "복사됨 ✓";
        setTimeout(() => (b.textContent = "복사"), 1400);
      });
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ================= FOOTER ================= */
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

  /* ================= 스크롤 효과 ================= */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
