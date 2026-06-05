/* ===================================================================
   main.js — 허브(메인) 페이지: Hero · 역량칩 · 프리셋(?set=) · 카드 목록
   카드 클릭 → project.html?p=<key>(&set=) 상세 페이지로 이동
   =================================================================== */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byKey = (k) => PROJECTS.find((p) => p.key === k);

  /* ---- 회사별 조합: URL ?set=key (구버전 ?focus= 호환) ---- */
  const params = new URLSearchParams(location.search);
  let setKey = params.get("set");
  if (!setKey && params.get("focus")) setKey = "__focus__";
  const preset =
    setKey === "__focus__"
      ? buildFocusPreset(params.get("focus"))
      : PRESETS[setKey] || PRESETS[DEFAULT_SET];
  const isDefaultView = !setKey || setKey === DEFAULT_SET;
  const setQS = !isDefaultView && PRESETS[setKey] ? `&set=${encodeURIComponent(setKey)}` : "";

  function buildFocusPreset(fk) {
    const f = byKey(fk) ? fk : "abtest";
    return { label: "맞춤", featured: f, show: PROJECTS.map((p) => p.key).filter((k) => k !== f) };
  }

  const featuredKey = byKey(preset.featured) ? preset.featured : "abtest";
  const showKeys = (preset.show || []).filter((k) => byKey(k) && k !== featuredKey);
  const visibleKeys = [featuredKey, ...showKeys];

  const detailHref = (k) => `project.html?p=${encodeURIComponent(k)}${setQS}`;

  /* ================= HERO ================= */
  // 데스크탑 기준 의도된 줄바꿈 (모바일에선 자동 재배치)
  const titleTag = esc(PROFILE.tagline).replace("실행 가능한", "<br>실행 가능한");
  $("#heroTitle").innerHTML = `<b>${esc(PROFILE.name)}</b>입니다.<br>${titleTag}`;
  $("#heroIntro").innerHTML = esc(PROFILE.intro).replace("좋아합니다. ", "좋아합니다.<br>");

  // 큐카드: 기본은 대표 4개(HERO_STATS), 프리셋 링크면 그 프로젝트 수치만
  const heroStats = isDefaultView
    ? HERO_STATS
    : visibleKeys.map((k) => ({ value: byKey(k).metric.value, label: byKey(k).metric.label }));
  $("#heroStats").style.gridTemplateColumns =
    `repeat(${Math.min(4, heroStats.length)}, 1fr)`;
  $("#heroStats").innerHTML = heroStats
    .map(
      (s) =>
        `<li><span class="num">${esc(s.value)}</span><span class="cap">${esc(s.label)}</span></li>`
    )
    .join("");

  /* ===== 핵심역량 칩 (보이는 프로젝트의 역량만) ===== */
  $("#heroChips").innerHTML =
    `<span class="hero__chips-label">핵심 역량</span>` +
    visibleKeys
      .map((k) => `<span class="cap-chip">${esc(byKey(k).chip)}</span>`)
      .join("");

  /* ================= 카드 빌더 ================= */
  const toolsTags = (tools, cls = "") =>
    tools.map((t) => `<span class="${cls}">${esc(t)}</span>`).join("");

  function cardHTML(p) {
    return `
    <a class="card card--link reveal" href="${detailHref(p.key)}" data-domain="${p.domain}" data-key="${p.key}">
      <div class="card__top">
        <span class="badge">${esc(p.domainLabel)}</span>
        <span class="card__period">${esc(p.period)}</span>
      </div>
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__summary">${esc(p.summary || "")}</p>
      <div class="metric">
        <span class="metric__value">${esc(p.metric.value)}</span>
        <span class="metric__label">${esc(p.metric.label)}</span>
      </div>
      <div class="card__tools">${toolsTags(p.tools)}</div>
      <span class="card__more">상세 분석 보기 →</span>
    </a>`;
  }

  /* ================= 렌더 ================= */
  // 주요 프로젝트 분리 없이 전체 그리드로 (featured = 첫 카드)
  $("#projectGrid").innerHTML = visibleKeys.map((k) => cardHTML(byKey(k))).join("");

  // 프리셋 안내 배너 없음 — 링크에 지정한 프로젝트만 그대로 노출 (큐레이션 유지)

  /* ================= 필터 (기본 전체보기에서만) ================= */
  const filtersEl = $("#filters");
  if (isDefaultView) {
    const present = new Set(visibleKeys.map((k) => byKey(k).domain));
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
