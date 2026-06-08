/* ============================================================
   포트폴리오 데이터 — 이 파일만 고치면 사이트 내용이 바뀝니다.
   ------------------------------------------------------------
   구조: 메인(허브) index.html  +  상세 project.html?p=<key>
   · 연락처/링크 → PROFILE
   · 회사별 조합 → PRESETS  (예: index.html?set=finance)
   · 빨래방 A/B 는 항상 최상단 '주요 프로젝트' 로 고정
   · 각 프로젝트 detail = 상세 페이지 내용(목적/데이터/분석과정/결과/제안/회고)
   · detail.sections[].chart 는 Chart.js 스펙, code 는 SQL/Python 코드
   ============================================================ */

const PROFILE = {
  name: "박정연",
  tagline: "데이터로 문제를 정의하고, 실험과 분석으로 검증해 실행 가능한 의사결정으로 연결합니다.",
  intro:
    "가설을 세우고 데이터로 검증해, 비즈니스가 바로 실행할 수 있는 결론까지 끌고 가는 것을 좋아합니다. " +
    "직접 운영하는 매장 데이터부터 금융·이커머스·바이오 도메인까지, 문제 정의 → 분석 → 액션의 전 과정을 경험했습니다.",
  email: "jaycepark99@gmail.com",
  velog: "https://velog.io/@jaycepark99",
  github: "https://github.com/jaycepark99",
  resumePdf: "resume.pdf",
  portfolioPdf: "portfolio.pdf",
};

const DEFAULT_SET = "default";
const PRESETS = {
  default:    { label: "전체",            featured: "abtest",    show: ["dashboard", "rfm", "growth", "churn", "ddi", "marketing", "trainer"] },
  core:       { label: "핵심 4선",         featured: "abtest",    show: ["dashboard", "churn", "growth"] },
  commercial: { label: "커머셜·세일즈 분석", featured: "dashboard", show: ["abtest", "rfm", "growth", "ddi"] },
  flex:       { label: "ML·예측·평가",      featured: "churn",     show: ["ddi", "abtest", "dashboard"], gridExtra: ["growth"] },
  finance:   { label: "금융·핀테크",      featured: "abtest", show: ["dashboard", "churn", "ddi"] },
  ecommerce: { label: "이커머스·리테일",  featured: "abtest", show: ["dashboard", "rfm", "growth", "ddi"] },
  growth:    { label: "그로스·데이터분석", featured: "abtest", show: ["growth", "rfm", "churn", "dashboard"] },
  bio:       { label: "바이오·제약",      featured: "abtest", show: ["ddi", "churn", "dashboard"] },
  marketing: { label: "마케팅",          featured: "abtest", show: ["marketing", "rfm", "growth"] },
  serveone:  { label: "구매·운영 데이터·바이브코딩", featured: "abtest", show: ["dashboard", "growth", "trainer"] },
  modoodoc:  { label: "세일즈·운영·실행가", featured: "abtest", show: ["dashboard", "trainer", "growth", "rfm"] },
};

const HERO_STATS = [
  { value: "+25.7%", label: "A/B 테스트 1인당 매출 개선" },
  { value: "96%", label: "이탈 예측 모델 정확도" },
  { value: "83%", label: "운영 집계 시간 단축" },
  { value: "+95%", label: "이커머스 연 매출 성장 진단" },
];

/* 차트 색상 팔레트는 project.js 에서 적용됩니다.
   chart.type: bar | groupedBar | doughnut | line  */

const PROJECTS = [
  /* ============================================================ 01 ABTEST */
  {
    key: "abtest",
    domain: "experiment",
    domainLabel: "실험·통계",
    title: "셀프빨래방 코호트 기반 업셀 A/B 테스트",
    summary: "지점별 충전구조·리텐션을 분석해 매출 격차의 원인을 진단하고, 코호트 업셀 A/B 테스트로 매출 개선 전략을 통계적으로 검증",
    period: "2024.12 ~ 2025.06",
    type: "개인 프로젝트",
    tools: ["SQL", "Python", "A/B Test", "Tableau"],
    metric: { value: "+25.7%", label: "1인당 매출(ARPU)" },
    chip: "가설 설계와 통계적 검증",
    detail: {
      objective:
        "직접 운영하는 매장 포함 셀프빨래방 3개 지점 중 C지점 매출이 약 18% 낮았습니다. 매출 격차의 '원인'을 데이터로 진단하고, 실행 가능한 개선안을 설계·검증하는 것이 목표였습니다.",
      question: "C지점 매출이 낮은 진짜 원인은 고객 수일까, 객단가일까? 그리고 어떻게 올릴 수 있을까?",
      data: {
        source: "본인 운영 매장 포함 3개 지점 POS 데이터",
        period: "2024년 전체",
        scale: "충전·결제 거래 데이터 (SQL 통합 데이터 마트 구축)",
        preprocessing: [
          "3개 지점 POS를 SQL로 통합·표준화 (지점코드 매핑, 날짜 형식 표준화)",
          "KPI 정의: 고객 수 / 평균 충전액 / 1인당 매출(ARPU) / 리텐션율 / 재충전 주기",
          "분석용 데이터 마트로 재구성해 지점 간 비교 가능하도록 정렬",
        ],
      },
      sections: [
        {
          title: "1. 현황 분석 — 지점별 매출과 핵심 지표 비교",
          body:
            "2024년 지점별 매출은 A 8,364 / B 8,640 / C 6,824(만원)으로 C지점이 가장 낮았습니다. 하지만 고객 수·리텐션율·재충전 주기는 지점 간 큰 차이가 없었습니다. 즉, '고객을 못 모아서'가 아니었습니다.",
          chart: {
            type: "bar",
            title: "지점별 2024년 매출 (만원)",
            labels: ["A지점", "B지점", "C지점"],
            datasets: [{ label: "매출(만원)", data: [8364, 8640, 6824] }],
            note: "Source: 3개 지점 POS 데이터",
          },
          table: {
            headers: ["지표", "A지점", "B지점", "C지점"],
            rows: [
              ["고객 수", "1,884명", "1,623명", "1,540명"],
              ["평균 충전액", "15,450원", "16,596원", "14,005원"],
              ["1인당 매출", "44,297원", "53,167원", "43,802원"],
              ["리텐션율", "64.7%", "67.9%", "63.1%"],
              ["재충전 주기", "45.4일", "42.6일", "34.5일"],
            ],
          },
          code: {
            lang: "sql",
            title: "재방문 주기 계산 (Window 함수 LAG)",
            body:
`-- 고객별 직전 방문일을 LAG로 가져와 재방문 간격 계산
SELECT store_name, card_number, register_date,
       DATEDIFF(register_date,
         LAG(register_date) OVER (
           PARTITION BY store_name, card_number
           ORDER BY register_date)) AS days_since_prev
FROM card_update
WHERE COALESCE(type, '') <> '원격충전';   -- 원격충전 제외로 기준 일관성`,
          },
        },
        {
          title: "2. 원인 진단 — 충전 단가 구조의 차이",
          body:
            "충전금액 분포를 보니 C지점은 1만원 충전 비중이 69.7%로 평균보다 +5.8%p 높고, 3만원 이상 고액 충전 비중은 9.6%로 평균보다 -6.4%p 낮았습니다. 2만원 구간은 지점 간 유사 → 격차는 '고액 전환'에서 발생하고 있었습니다.",
          chart: {
            type: "groupedBar",
            title: "충전금액 구간 비중 — C지점 vs 평균 (%)",
            labels: ["1만원 충전", "3만원 이상 충전"],
            datasets: [
              { label: "C지점", data: [69.7, 9.6] },
              { label: "전체 평균", data: [63.9, 16.0] },
            ],
            unit: "%",
          },
          callout:
            "💡 Key Finding — 매출 격차의 핵심 원인은 '고객 수'가 아니라 '충전 단가 구조' 차이",
          code: {
            lang: "sql",
            title: "지점별 충전금액 구간 분포",
            body:
`-- 지점별 충전금액 구간(1만/2만/3만원+) 비중
SELECT
    store_id,
    CASE
        WHEN charge_amount <  20000 THEN '1만원대'
        WHEN charge_amount <  30000 THEN '2만원대'
        ELSE '3만원이상'
    END AS charge_band,
    COUNT(*)                                   AS cnt,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*))
          OVER (PARTITION BY store_id), 1)     AS pct
FROM charges
GROUP BY store_id, charge_band
ORDER BY store_id, charge_band;`,
          },
        },
        {
          title: "3. 가설 수립 — 2만원을 1차 전환 타겟으로",
          body:
            "\"2만원 이상 충전 시 인센티브를 제공하면 고액 전환·충전율이 개선되어 코호트 매출이 상승할 것이다.\" 3만원 직접 유도는 장벽이 높다고 판단해, 1만원 중심(Low) → 2만원 이상 혜택 부여 → 객단가 상승(High)의 단계 전환 전략을 설계했습니다.",
        },
        {
          title: "4. 실험 설계 (A/B Test)",
          body:
            "C지점 기존 고객 2,682명을 무작위 배정해 Control(1,341명, 기존 정책)과 Test(1,341명, 2만원 이상 충전 시 +10%)로 나눠 3개월간 집행했습니다. 사전 분포 차이 ≤ 1%p로 동질성을 검증하고, ITT(Intention To Treat) 기준으로 분석했습니다.",
          table: {
            headers: ["항목", "내용"],
            rows: [
              ["실험 기간", "2025.03.01 ~ 2025.05.31 (3개월)"],
              ["대상", "C지점 기존 고객 2,682명 (무작위 배정)"],
              ["Control", "1,341명 — 기존 정책 유지"],
              ["Test", "1,341명 — 2만원 이상 충전 시 +10%"],
              ["검증 기준", "동질성 ≤ 1%p / ITT 분석"],
            ],
          },
          code: {
            lang: "sql",
            title: "재현 가능한 A/B 무작위 배정 (해시 기반)",
            body:
`-- 카드번호 해시로 정렬 → 짝/홀로 그룹 배정 (재현 가능)
WITH ranked AS (
  SELECT card_number,
         ROW_NUMBER() OVER (
           ORDER BY CONV(SUBSTR(MD5(CONCAT(card_number,'_salt2025')),1,8),16,10)
         ) AS rn
  FROM cohort)
SELECT card_number,
       CASE WHEN MOD(rn, 2) = 1 THEN 'TEST' ELSE 'CONTROL' END AS ab_group
FROM ranked;`,
          },
        },
        {
          title: "5. 성과 분석 — 충전율과 단가가 동시에 개선",
          body:
            "충전율·고액 충전 비중·평균 충전액이 함께 상승하며 매출이 구조적으로 개선됐습니다. 각 지표는 적절한 통계 검정으로 유의성을 확인했습니다.",
          chart: {
            type: "groupedBar",
            title: "A/B 테스트 핵심 지표 — Control vs Test (%)",
            labels: ["충전율", "2만원 이상 충전 비중"],
            datasets: [
              { label: "Control", data: [14.2, 28.4] },
              { label: "Test", data: [18.2, 38.1] },
            ],
            unit: "%",
          },
          table: {
            headers: ["지표", "Control", "Test", "변화", "검정 / 유의성"],
            rows: [
              ["충전율", "14.2%", "18.2%", "+4.0%p", "Chi-square, p≈0.006 (유의)"],
              ["2만원 이상 비중", "28.4%", "38.1%", "+9.7%p", "z-test, p≈0.03 (유의)"],
              ["평균 충전액", "14,398원", "16,018원", "+1,620원", "Welch's t-test, p≈0.07 (경계)"],
              ["1인당 매출(ARPU)", "3,433원", "4,316원", "+25.7%", "총매출 기여 +1,184,000원"],
            ],
          },
          code: {
            lang: "python",
            title: "충전율 차이 검정 (Chi-square)",
            body:
`from scipy import stats
import numpy as np

#                전환    미전환
table = np.array([[ 190, 1151],   # control
                  [ 244, 1097]])  # test
chi2, p, dof, _ = stats.chi2_contingency(table)
print(f"chi2={chi2:.3f}, p={p:.4f}")   # p ≈ 0.006 → 유의

# ARPU 차이: Welch's t-test
t, p2 = stats.ttest_ind(test_arpu, control_arpu, equal_var=False)
print(f"ARPU uplift +25.7%, p={p2:.3f}")`,
          },
        },
      ],
      resultStats: [
        { value: "+25.7%", label: "1인당 매출(ARPU)" },
        { value: "+4.0%p", label: "충전율 (p≈0.006)" },
        { value: "+9.7%p", label: "2만원 이상 충전 비중" },
      ],
      results: [
        "1인당 평균 매출 25.7% 증가 (3,433원 → 4,316원), 총매출 기여 +1,184,000원",
        "충전율 +4.0%p, 2만원 이상 충전 비중 +9.7%p 모두 통계적으로 유의",
        "고객 수를 늘리지 않고도 객단가 상승만으로 매출 구조를 개선할 수 있음을 검증",
      ],
      proposal: [
        { title: "프로모션 정책 확정", desc: "2만원 이상 +10% 인센티브를 정식 정책으로 채택, 지점별 요금 차등 설계에 반영" },
        { title: "2차 업셀 실험", desc: "2만원 전환 이후 3만원 이상 구간을 타겟으로 한 후속 업셀 실험 설계 (Up-Selling 고도화)" },
      ],
      retro: [
        "충전 데이터만으로 분석해, 세탁기/건조기/자판기 이용 로그 기반의 기여도는 분리 검증하지 못함",
        "단기(3개월) 효과는 검증했으나, 장기 유지 효과와 인센티브 비용 대비 ROI 분석은 추가 검증 필요",
      ],
    },
  },

  /* ============================================================ 02 DASHBOARD */
  {
    key: "dashboard",
    domain: "dashboard",
    domainLabel: "대시보드·운영",
    title: "셀프빨래방 운영 대시보드 구축",
    summary: "POS 5.7만 건 통합 데이터 마트 → Tableau·Looker 시각화 → 파일 드래그 자동 반영 웹 대시보드 직접 개발까지, 수기 집계의 비효율을 단계적으로 제거",
    period: "2025.01 ~ 2026.01",
    type: "개인 프로젝트",
    tools: ["SQL", "Tableau", "Looker Studio", "Google Sheets"],
    metric: { value: "83%↓", label: "주간 집계 시간" },
    chip: "KPI 대시보드 · 데이터 정합성",
    detail: {
      objective:
        "수기 집계(주 2시간)와 데이터 누락 리스크로 운영 결정이 직관에 의존하던 상황. 일일 입력만으로 갱신되는 실시간 대시보드 환경을 만들어 의사결정을 데이터 기반으로 전환하는 것이 목표였습니다.",
      question: "점주가 매일 부담 없이 입력만 하면, 운영 현황이 자동으로 보이는 환경을 만들 수 있을까?",
      data: {
        source: "3개 지점 POS 데이터 + Google Sheets 일일 입력",
        period: "2022 ~ 2026 (운영 전체 기간, 현재 진행형)",
        scale: "POS 5.7만 건 통합 분석용 데이터 마트",
        preprocessing: [
          "자판기 동전교환 보정 (계수 0.7)",
          "지점 코드 매핑 / 결측치 처리 / 날짜 형식 표준화",
          "혼합 데이터로 충전내역·지출·월별 요약 등 다중 소스 통합",
        ],
      },
      sections: [
        {
          title: "1. 데이터 전처리 — 정합성 확보와 확장성",
          body:
            "3개 POS 5.7만 건을 하나의 분석용 데이터 마트로 통합했습니다. 매개변수(Parameter)로 동적 측정값을 바꾸고, 계산된 필드로 YoY/MoM·월별 리텐션율 등 파생 지표를 생성해 확장성을 확보했습니다.",
          table: {
            headers: ["전처리 항목", "처리 내용"],
            rows: [
              ["자판기 동전교환", "보정 계수 0.7 적용"],
              ["지점 식별", "지점 코드 매핑으로 통합"],
              ["결측치", "누락 거래 보정·제거"],
              ["날짜", "형식 표준화 (집계 단위 통일)"],
            ],
          },
          code: {
            lang: "sql",
            title: "POS 통합 데이터 마트 전처리",
            body:
`SELECT
    DATE(paid_at)                          AS dt,
    store_map.std_store_id                 AS store_id,
    CASE WHEN method = 'coin_exchange'     -- 동전교환 보정
         THEN amount * 0.7 ELSE amount END AS amount_adj,
    COALESCE(method, 'unknown')            AS pay_method
FROM raw_pos r
JOIN store_map ON r.raw_store = store_map.raw_store
WHERE amount > 0;          -- 결측/이상치 제거`,
          },
        },
        {
          title: "2. 업무 효율 — 주 2시간 → 주 20분",
          body:
            "Tableau Public은 CSV 수동 업로드 방식이라 일상 트래킹에 한계가 있었습니다. Google Sheets 동기화 방식의 Looker Studio로 전환해, 점주가 일일 데이터만 추가하면 현황을 수시로 확인할 수 있게 했습니다.",
          callout:
            "💡 수기 집계 주 2시간 → 자동화 후 주 20분. 약 83% 단축 + 데이터 누락 리스크 제거.",
        },
        {
          title: "3. BI 도구로 시각화 — Tableau · Looker Studio",
          body:
            "먼저 BI 도구로 대시보드를 구축했습니다. Tableau는 연간 분석·전략 수립용(KPI·매출 트렌드·계절 패턴·고객 구조), Looker Studio는 실시간 트래킹용(매출·지출·수익 추이, 요일·시간대 히트맵, 지점별 구조)으로 역할을 나눴습니다.",
          images: [
            { src: "img/dashboard-tableau.png", caption: "Tableau Public — 2024년 빨래방 연간 대시보드 (직접 구축)", kind: "dashboard" },
            { src: "img/dashboard-looker.png", caption: "Looker Studio — 실시간 매출 대시보드 (직접 구축)", kind: "dashboard" },
          ],
          callout:
            "💡 요일·시간대 히트맵에서 심야 저조 시간대 식별 → 청소·점검을 그 시간대로 배치해 피크타임 가동률 확보. 지점별 비용구조 차이로 비용 절감 우선순위·매출 목표를 차등 설정.",
        },
        {
          title: "4. 운영 자동화 — 파일 드래그 자동 반영 웹 대시보드",
          body:
            "BI 도구는 CSV를 수동 업로드해야 하는 한계가 있었습니다. 그래서 받아온 POS 엑셀/CSV 파일을 화면에 끌어다 놓으면 충전·자판기·지출 시트를 자동 인식해 KPI·손익·고객 분석이 즉시 갱신되는 웹 대시보드를 만들었습니다. 카드·현금 매출만 수기지만, 입력을 최소화하도록 설계했습니다. 단순 시각화를 넘어 '운영자가 직접 쓰는 도구'를 만든 단계입니다.",
          callout2:
            "🛠 개발 방식: 직접 백엔드/프런트엔드를 작성하기보다, Claude Code 바이브코딩(MCP 연동 활용)으로 구현했습니다. '필요한 운영 도구를 AI 페어코딩으로 빠르게 만들어 쓰는' 접근이 핵심입니다.",
          images: [
            { src: "img/dashboard-web-pnl.png", caption: "직접 개발한 웹 대시보드 — 파일 드래그 → KPI·손익·월별 추이 자동 반영", kind: "dashboard" },
            { src: "img/dashboard-web-usage.png", caption: "시간대별 피크타임·요일별 이용·결제수단 분석 (자동 집계)", kind: "dashboard" },
          ],
          callout:
            "💡 수기 엑셀 → BI 도구 시각화 → 자동 반영 웹 도구로 진화. '도구를 쓰는' 수준을 넘어 '도구를 만드는' 단계까지 확장했습니다.",
        },
      ],
      resultStats: [
        { value: "83%↓", label: "주간 집계 시간 (2h→20m)" },
        { value: "5.7만 건", label: "통합 POS 데이터" },
        { value: "3개 지점", label: "실시간 트래킹" },
      ],
      results: [
        "주 2시간 수기 집계 → 주 20분으로 약 83% 단축",
        "피크타임 식별로 청소·점검 스케줄 최적화",
        "지점별 비용구조 차이 식별 → 비용 절감 우선순위 및 매출 목표 차등 설정",
      ],
      proposal: [
        { title: "일일 입력 워크플로우 정착", desc: "점주가 부담 없이 유지할 수 있는 수준으로 입력 항목을 설계해 자동 갱신 환경 유지" },
        { title: "운영 액션 연결", desc: "히트맵 기반 인력 배치·청소 시간 최적화, 결제수단 비중에 따른 카드/현금 운영비율 조정" },
      ],
      retro: [
        "BI 도구의 CSV 수동 업로드 한계를, 파일 드래그만으로 자동 반영되는 웹 대시보드를 직접 개발해 해결 — 분석 결과물을 '운영자가 매일 쓰는 도구'로 정착시킴",
        "카드·현금 매출은 아직 수기 입력 — 입력을 최소화하도록 설계했지만, 결제 데이터 연동으로 완전 자동화하는 것이 다음 단계",
        "수기 → BI 시각화 → 자체 웹 도구로 이어진 과정에서, 도구 선택·제작이 곧 운영 지속성을 좌우함을 체감",
      ],
    },
  },

  /* ============================================================ 03 RFM */
  {
    key: "rfm",
    domain: "ecommerce",
    domainLabel: "E-commerce",
    title: "이커머스 RFM 고객 세분화 전략",
    summary: "핵심 카테고리와 고가치 고객을 식별하고, RFM 5등급 세분화 기반 등급별 승급 전략으로 매출 성장을 설계",
    period: "제로베이스 부트캠프",
    type: "팀 프로젝트 (4인)",
    tools: ["SQL", "Python", "BigQuery", "RFM"],
    metric: { value: "+8%", label: "전체 매출 성장 (예측)" },
    chip: "RFM 고객 세분화 · 타겟 전략",
    detail: {
      objective:
        "외형 성장 중인 이커머스에서 어떤 카테고리·어떤 고객이 매출을 끌고 가는지 식별하고, 데이터 기반 등급별 승급 전략으로 매출 성장을 도모하는 것이 목표였습니다.",
      question: "매출을 책임지는 핵심 고객은 누구이고, 어떤 등급을 어떻게 올려야 전체 매출이 커질까?",
      data: {
        source: "Kaggle Retail Study (거래/고객/제품 3개 테이블)",
        period: "2011 ~ 2014 (RFM은 2013년 거래 기준)",
        scale: "거래 약 23,053건 (BigQuery LEFT JOIN으로 통합)",
        preprocessing: [
          "transactions·customer·prod_cat 3개 테이블을 BigQuery에서 LEFT JOIN",
          "중복행 제거, dob→age 파생 후 pd.cut으로 연령대 구간화",
          "구매확정(purchase_confirmed=1) 데이터를 2013년으로 필터링해 RFM 분석셋 구성",
        ],
      },
      sections: [
        {
          title: "1. 카테고리 분석 — 어디서 매출이 나오나",
          body:
            "Books·Electronics 합산이 매출의 49%를 차지했습니다. 변동계수(CV)가 낮을수록 안정적인 카테고리인데, Books(0.19)·Electronics(0.17)가 비중도 높고 안정적이었습니다.",
          chart: {
            type: "bar",
            title: "카테고리별 매출 비중 (%)",
            labels: ["Books", "Electronics", "Home&Kitchen", "Footwear", "Clothing", "Bags"],
            datasets: [{ label: "비중(%)", data: [26.7, 22.3, 16.8, 13.3, 12.7, 8.2] }],
            unit: "%",
          },
          table: {
            headers: ["카테고리", "비중", "재구매율", "변동계수(CV)"],
            rows: [
              ["Books", "26.7%", "27%", "0.19"],
              ["Electronics", "22.3%", "23%", "0.17"],
              ["Home&Kitchen", "16.8%", "21%", "0.20"],
              ["Footwear", "13.3%", "19%", "0.25"],
              ["Clothing", "12.7%", "18%", "0.24"],
              ["Bags", "8.2%", "16%", "0.31"],
            ],
          },
        },
        {
          title: "2. RFM 세분화 — 정규화 스코어링",
          body:
            "Recency(마지막 구매 후 경과일)·Frequency(고객당 주문 수)·Monetary(구매금액 합)를 각각 minmax_scale로 0~1 정규화했습니다(Recency는 1-스케일로 역전). 합산 점수를 백분위화한 뒤 Diamond(상위 3%)·Platinum(12%)·Gold(20%)·Silver(45%)·Bronze(하위 20%) 5등급으로 나눴습니다. Diamond(상위 3%)가 전체 매출의 15%를 기여하는 핵심 고객이었습니다.",
          chart: {
            type: "doughnut",
            title: "RFM 등급별 고객 비중 (%)",
            labels: ["Diamond (3%)", "Platinum (12%)", "Gold (20%)", "Silver (45%)", "Bronze (20%)"],
            datasets: [{ label: "고객 비중", data: [3, 12, 20, 45, 20] }],
            unit: "%",
          },
          code: {
            lang: "python",
            title: "정규화 점수 → 등급 부여",
            body:
`from sklearn.preprocessing import minmax_scale

rfm['Recency'] = 1 - minmax_scale(rfm['Recency'])   # 최근일수록 고점
rfm['Frequency'] = minmax_scale(rfm['Frequency'])
rfm['Monetary'] = minmax_scale(rfm['Monetary'])
rfm['Score'] = rfm['Recency'] + rfm['Frequency'] + rfm['Monetary']

rfm['percentile'] = pd.qcut(rfm['Score'].rank(method='first'), 100, labels=False)
rfm['Grade'] = rfm['percentile'].apply(lambda x:
    'Diamond' if x>=97 else 'Platinum' if x>=85 else
    'Gold' if x>=65 else 'Silver' if x>=20 else 'Bronze')`,
          },
        },
        {
          title: "3. 등급별 카테고리 특성 — 히트맵으로 본 주력 카테고리",
          body:
            "등급별 카테고리 구매 비율을 히트맵으로 보면, 등급마다 주력 카테고리가 뚜렷이 갈립니다(색이 진할수록 비중↑). Platinum은 Books(36%) 압도적, Silver는 Electronics(25%) 특화, Gold는 Home&Kitchen(20%), Bronze는 Bags(11%) 상대 강세, Diamond는 Clothing(17%) 강세 — 이 패턴이 등급별 차별화 마케팅의 근거가 됩니다.",
          heatmap: {
            title: "등급 × 카테고리 구매 비율 (%) — 색이 진할수록 비중↑",
            unit: "%",
            cols: ["Bags", "Books", "Clothing", "Electronics", "Footwear", "Home&K"],
            rows: [
              { label: "Diamond", cells: [8, 25, 17, 20, 12, 18] },
              { label: "Platinum", cells: [8, 36, 14, 22, 14, 18] },
              { label: "Gold", cells: [7, 25, 14, 20, 15, 20] },
              { label: "Silver", cells: [9, 26, 13, 25, 12, 16] },
              { label: "Bronze", cells: [11, 25, 15, 19, 11, 19] },
            ],
          },
        },
        {
          title: "4. 비즈니스 임팩트 — 승급 전략의 효과 예측",
          body:
            "등급별 평균 구매금액 차이를 기반으로, 1단계 승급 시 평균 구매금액이 약 95% 증가하는 것으로 산출됐습니다. 중간 등급 20%를 승급 유도하면 전체 매출이 약 +8% 성장할 것으로 예측했습니다.",
          callout:
            "💡 중간 등급 20% 승급 유도 → 전체 매출 +8% 성장 예측 (1단계 승급 시 평균 구매금액 +95%)",
        },
      ],
      resultStats: [
        { value: "+8%", label: "전체 매출 성장 (예측)" },
        { value: "+95%", label: "1단계 승급 시 구매금액" },
        { value: "49%", label: "Books+Electronics 비중" },
      ],
      results: [
        "RFM 5등급 세분화로 Diamond(상위 3%)가 매출 15% 기여하는 핵심 고객 식별",
        "등급별 카테고리 선호 차이를 정밀 분석해 맞춤 전략의 데이터 근거 확보",
        "중간 등급 20% 승급 유도 시 전체 매출 +8% 성장 예측",
      ],
      proposal: [
        { title: "Platinum — Books 집중", desc: "신간/프리미엄 제안으로 충성 카테고리 강화" },
        { title: "Gold — Home&Kitchen 강세", desc: "번들 할인으로 객단가 상승 유도" },
        { title: "Silver — Electronics 특화", desc: "승급 유도 프로모션으로 상위 등급 전환" },
        { title: "Bronze — Bags 재활성", desc: "타겟 마케팅으로 휴면 고객 재활성화" },
      ],
      retro: [
        "예측 성과(±8%)는 등급별 평균 구매금액 차이 기반 산출이므로, 실제 승급 캠페인 집행 후 A/B로 검증 필요",
        "Cross-selling 관점(등급별 균형 카테고리)까지 결합하면 더 정교한 추천 전략 설계 가능",
      ],
    },
  },

  /* ============================================================ 04 GROWTH */
  {
    key: "growth",
    domain: "ecommerce",
    domainLabel: "E-commerce",
    title: "이커머스 성장성·내실 진단",
    summary: "B2B 도매 대상 이커머스의 매출 트렌드·재구매율·회원 확보 현황을 정량 진단해 성장성과 내실을 평가하고 액션을 도출",
    period: "2026.03",
    type: "개인 프로젝트",
    tools: ["BigQuery", "SQL", "Cohort", "Google Sheets"],
    metric: { value: "+95%", label: "연 매출 성장 (YoY)" },
    chip: "코호트 · 리텐션 분석",
    detail: {
      objective:
        "외형 성장 중인 B2B 도매 대상 이커머스의 '성장성'과 '내실'을 매출 트렌드·코호트 재구매율·회원 확보 현황으로 진단해, 서비스 건강성을 평가하고 비즈니스 액션을 도출하는 것이 목표였습니다.",
      question: "서비스의 성장성과 내실은 어떤가? 외형 성장이 진짜 건강한 성장인가?",
      data: {
        source: "Kaggle — UCI E-Commerce Dataset (영국 온라인 소품 쇼핑몰, B2B 도매)",
        period: "2010.12 ~ 2011.12",
        scale: "거래 약 541,909건 (BigQuery 정제, 전년 동월 대비 비교)",
        preprocessing: [],
        preTable: {
          headers: ["컬럼", "전처리 규칙", "이유"],
          rows: [
            ["InvoiceNo", "C·A로 시작 → 삭제", "거래 취소건 및 오류 데이터 제거"],
            ["StockCode", "5글자 미만 → 삭제", "POST, B, M 등 상품 외 코드 제거"],
            ["Quantity", "0 이하·최댓값 2건 삭제", "음수/이상치 제거"],
            ["UnitPrice", "0 이하 삭제", "음수/무료 거래 제거"],
            ["CustomerID", "NULL → 'Guest'", "비회원 거래 식별을 위해 유지"],
          ],
        },
      },
      sections: [
        {
          title: "1. 성장성 진단 — 매출 트렌드와 시즌성",
          body:
            "월별 일평균 매출·고객수·거래건수를 함께 보면, 9월부터 세 지표가 동반 급증해 11~12월 정점에 도달하는 뚜렷한 시즌성이 드러납니다. 전년 동월(2010-12) 대비 일평균 매출 +95%, 고객 수 +100%, 거래건수 +81%로 외형 성장은 강했지만, 비수기(1~8월)와의 편차가 컸습니다. 도매 고객 특성상 연말 선물 시즌 재고 확보 수요가 집중되기 때문입니다.",
          image: {
            src: "img/growth-trend.png",
            caption: "월별 일평균 매출(막대)·구매고객수·구매건수(선) 추이 — 3개 지표 동반 상승",
            kind: "capture",
          },
          callout:
            "💡 비수기(1~8월) 매출 편차가 커서, 외형 성장과 별개로 '비수기 확대 전략'이 필요",
        },
        {
          title: "2. 내실 진단 — 코호트 재구매율 히트맵",
          body:
            "유입 월별 코호트로 '첫 구매 이후 시점별 재구매율'을 분석했습니다. 색이 진할수록 재구매율이 높습니다. 연말(2010-12) 유입 고객은 전 기간 30~50%대로 높은 반면, 봄·여름(2011-03~07) 유입 고객은 14~26%대로 낮았습니다 — 표만으로는 안 보이는 '유입 시기별 충성도 격차'가 색으로 한눈에 드러납니다.",
          image: {
            src: "img/growth-cohort.png",
            caption: "첫 구매 이후 시점에 따른 재구매율(%) — 유입월별 코호트 히트맵",
            kind: "capture",
          },
          callout:
            "💡 연말 유입 고객 충성도↑ vs 봄·여름 유입↓. 봄·여름 코호트엔 첫 구매 직후 리텐션 장치가 필요",
          code: {
            lang: "sql",
            title: "유입 시기별 코호트 재구매율 (BigQuery)",
            body:
`WITH first_month AS (
  SELECT customer_key,
         DATE_TRUNC(MIN(invoice_date), MONTH) AS cohort
  FROM cleaned GROUP BY customer_key
)
SELECT f.cohort,
       DATE_DIFF(DATE_TRUNC(c.invoice_date, MONTH),
                 f.cohort, MONTH)            AS month_no,
       COUNT(DISTINCT c.customer_key)        AS buyers
FROM cleaned c JOIN first_month f USING (customer_key)
GROUP BY 1, 2 ORDER BY 1, 2;`,
          },
        },
        {
          title: "3. 회원 확보 — 비회원 거래 분석",
          body:
            "전체 거래의 약 25%가 비회원 거래(거래번호 기준 7%)였고, 비회원 매출 비중은 연초 28%대에서 하반기 9%대까지 꾸준히 감소했습니다. 그런데 11월부터 급반등(21.7% → 22.9%)해 비회원 거래번호당 평균 매출이 3천 파운드까지 올랐습니다 — 연말 고액 비회원 거래가 다수 발생한 것입니다.",
          image: {
            src: "img/growth-nonmember.png",
            caption: "비회원 평균 매출(막대)·거래 비중·매출 비중(선) 추이 — 11~12월 급반등",
            kind: "capture",
          },
          callout:
            "💡 연말 고액 비회원 거래 급증 → 회원가입 유도로 '잠재 우량 고객' 데이터를 확보할 기회",
          code: {
            lang: "sql",
            title: "거래 데이터 정제 + 비회원 식별",
            body:
`SELECT *,
       COALESCE(customer_id, 'Guest') AS customer_key  -- 비회원 식별
FROM raw_invoices
WHERE invoice_no NOT LIKE 'C%'     -- 취소건 제거
  AND invoice_no NOT LIKE 'A%'     -- 오류 데이터 제거
  AND LENGTH(stock_code) >= 5      -- POST/B/M 등 비상품 코드 제거
  AND quantity  > 0                -- 음수/이상치 제거
  AND unit_price > 0;              -- 무료/음수 거래 제거`,
          },
        },
        {
          title: "4. 최종 결론 — 성장성과 내실 종합",
          body:
            "세 관점을 종합해 진단과 액션을 정리했습니다.",
          table: {
            headers: ["관점", "진단", "제안 액션"],
            rows: [
              ["매출 성장성", "연 YoY +95%, 단 시즌 편차 큼", "비수기(봄·여름) 매출 확대 전략 수립"],
              ["고객 재방문", "연말 유입 충성도↑ / 봄·여름 유입 재방문↓", "첫 구매 직후 리텐션 장치 + 하절기 대규모 프로모션"],
              ["회원 확보", "비회원 비중 감소 추세, 단 연말 고액 비회원 급증", "연말 회원가입 유도 마케팅 / 비회원 식별키 도입"],
            ],
          },
        },
      ],
      resultStats: [
        { value: "+95%", label: "연 매출 성장 (YoY)" },
        { value: "50%→17%", label: "시즌별 재구매율 편차" },
        { value: "25%", label: "비회원 거래 비중" },
      ],
      results: [
        "성장성: YoY +95% 매출 확인, 단 비수기 편차 큼 → 비수기 확대 전략 필요성 도출",
        "내실: 연말 유입 재구매율 50% vs 봄·여름 17% → 시즌별 차별 마케팅 근거 제시",
        "회원: 전체 거래 25%가 비회원, 11월부터 고액 비회원 급증 → 연말 회원 전환 기회 포착",
      ],
      proposal: [
        { title: "비수기 확대 전략", desc: "봄·여름 매출 편차 완화를 위한 하절기 대규모 프로모션" },
        { title: "리텐션 장치", desc: "첫 구매 직후 재구매 유도 장치로 저충성 코호트 방어" },
        { title: "연말 회원 전환", desc: "고액 비회원 대상 회원가입 유도로 잠재 우량 고객 확보" },
      ],
      retro: [
        "비회원 거래 비중이 거래 기준 25% vs 거래번호 기준 7%로 달라, 지표 정의에 따라 해석이 바뀜을 확인",
        "시즌성이 강한 도매 특성상, 월 단위가 아닌 시즌 단위 코호트로 보는 것이 의사결정에 더 유용",
      ],
    },
  },

  /* ============================================================ 05 CHURN */
  {
    key: "churn",
    domain: "ml",
    domainLabel: "금융·머신러닝",
    title: "신용카드 고객 이탈 예측 및 LTV 분석",
    summary: "RandomForest 이탈 예측 모델(정확도 96%)을 구축하고, LTV 기반 5등급 세분화로 등급별 맞춤 방어 전략을 설계",
    period: "2024.08 ~ 2024.09",
    type: "팀 프로젝트 (5인 · 리더)",
    tools: ["Python", "RandomForest", "Decision Tree", "LTV"],
    metric: { value: "96%", label: "이탈 예측 정확도" },
    chip: "거래 데이터 모델링 · LTV",
    detail: {
      objective:
        "신용카드 고객 이탈을 예측하는 모델을 개발하고, LTV 기반 고객 세분화로 등급별 차별 관리 전략을 수립하는 것이 목표였습니다. 프로젝트 리더로서 일정 관리와 분석 전 과정의 팀 협업을 주도했습니다.",
      question: "어떤 고객이 이탈할 가능성이 높고, 가치가 높은 고객을 어떻게 차별적으로 방어할까?",
      data: {
        source: "Kaggle BankChurners",
        period: "-",
        scale: "10,127명 · 21개 변수 · 전체 이탈률 16.07%",
        preprocessing: [
          "이탈 고객 특징: 거래액 $2,500↓, 거래횟수 50회↓, 상품 1~2개 가입, 리볼빙 잔액 $500↓",
          "다중공선성 제거: Avg_Open_To_Buy 제외 (Credit_Limit과 상관계수 1.0)",
          "인코딩: 순서형(교육수준·소득) Ordinal / 명목형(성별·카드유형) One-Hot",
        ],
      },
      sections: [
        {
          title: "1. EDA — 이탈 고객의 특징",
          body:
            "전체 이탈률은 16.07%(불균형)였습니다. 이탈(주황)·비이탈(파랑) 그룹의 변수별 분포(KDE)를 겹쳐 보니, 이탈 고객은 총 거래금액·거래횟수가 낮은 쪽에 몰려 있었습니다(거래액 $2,500↓, 횟수 50회↓, 상품 1~2개, 리볼빙 잔액 $500↓). 이 분포 차이를 모델 변수 선택의 출발점으로 삼았습니다.",
          image: {
            src: "img/churn-eda.png",
            caption: "이탈 vs 비이탈 그룹의 핵심 변수 분포(KDE) — 거래 활동성에서 뚜렷한 차이",
            kind: "capture",
          },
        },
        {
          title: "2. 모델 비교 및 선정",
          body:
            "RandomForest·LightGBM·LogisticRegression·XGBoost를 비교했습니다. LightGBM이 수치상 가장 높았으나 학습-테스트 정확도 차이가 0.05 이상으로 과적합 우려가 있었습니다. 데이터 규모(1만 건)와 불균형(이탈 16%)을 고려해, 안정성이 높은 RandomForest를 GridSearchCV(81개 조합)로 튜닝해 최종 선정했습니다. Test 기준 정확도 0.96, 이탈 클래스 F1 0.86, ROC-AUC 0.987로 분리력이 매우 높았습니다.",
          chart: {
            type: "groupedBar",
            title: "모델별 성능 비교",
            labels: ["Accuracy", "Precision", "Recall"],
            datasets: [
              { label: "RandomForest (선정)", data: [0.96, 0.92, 0.81] },
              { label: "LightGBM", data: [0.97, 0.93, 0.87] },
              { label: "LogisticRegression", data: [0.88, 0.72, 0.46] },
            ],
            max: 1,
          },
          table: {
            headers: ["Model", "Accuracy", "Precision", "Recall", "비고"],
            rows: [
              ["RandomForest", "0.96", "0.92", "0.81", "최종 선정 · ROC-AUC 0.987"],
              ["LightGBM", "0.97", "0.93", "0.87", "과적합 우려로 제외"],
              ["LogisticRegression", "0.88", "0.72", "0.46", "성능 미달"],
            ],
          },
          heatmap: {
            title: "혼동행렬 (테스트 3,039명) — 색이 진할수록 건수↑",
            unit: "",
            cols: ["예측: 비이탈", "예측: 이탈"],
            rows: [
              { label: "실제: 비이탈", cells: [{ v: 2517, display: "2,517 (TN)" }, { v: 34, display: "34 (FP)" }] },
              { label: "실제: 이탈", cells: [{ v: 93, display: "93 (FN)" }, { v: 395, display: "395 (TP)" }] },
            ],
          },
          code: {
            lang: "python",
            title: "순서형/명목형 분리 인코딩 (실제 코드)",
            body:
`from sklearn.preprocessing import OrdinalEncoder
# 교육수준·소득은 순서가 있으므로 OrdinalEncoder
ordinal = OrdinalEncoder(categories=[
    ['Unknown','Uneducated','High School','College',
     'Graduate','Post-Graduate','Doctorate'],
    ['Unknown','Less than $40K','$40K - $60K',
     '$60K - $80K','$80K - $120K','$120K +']])
X[['Education_Level','Income_Category']] = ordinal.fit_transform(
    X[['Education_Level','Income_Category']])
# 성별·카드유형 등 명목형은 One-Hot, 이후 GridSearchCV(cv=5)로 튜닝`,
          },
        },
        {
          title: "3. 핵심 이탈 변수 — 무엇이 이탈을 부르나",
          body:
            "RandomForest 변수 중요도로 이탈을 가장 잘 설명하는 변수를 추출했습니다(빨간 박스 = 상위 7개). 총 거래금액·거래횟수, 분기 대비 변동률(Q4/Q1), 리볼빙 잔액, 관계 상품 수가 핵심이었습니다. '거래가 줄고 분기 대비 활동이 꺾이는' 고객이 이탈 신호 — 이 변수들이 뒤의 이탈 규칙·방어 전략의 기준이 됩니다.",
          image: {
            src: "img/churn-importance.png",
            caption: "RandomForest 변수 중요도 — 상위 7개(빨간 박스)가 이탈을 주도",
            kind: "capture",
          },
        },
        {
          title: "4. 이탈 규칙 추출 (Decision Tree)",
          body:
            "Decision Tree로 해석 가능한 이탈 규칙을 추출했습니다. 예: '월거래 54.5회↓ & 리볼빙 $671.5↑ & 상품 2.5개↑ & 거래액 $2,103↓' → 이탈률 7.04%. 반대로 거래가 활발한 구간은 이탈률 0.23%로 매우 낮았습니다. 이 규칙을 LTV 등급별 방어 전략에 직접 연결했습니다.",
          chart: {
            type: "bar",
            title: "Decision Tree 규칙별 이탈률 (%)",
            labels: ["규칙2 (저거래·고리볼빙)", "규칙4 (중간 거래)", "규칙5 (고거래)"],
            datasets: [{ label: "이탈률(%)", data: [7.04, 0.23, 2.25] }],
            unit: "%",
          },
        },
        {
          title: "5. LTV 계산 및 5등급 세분화",
          body:
            "RandomForest 이탈 예측 확률(1-이탈확률 = 유지확률)을 LTV 공식에 직접 연결했습니다. 월평균 거래금액·횟수, 리볼빙 잔액 비율, 유지확률에 유지기간 가중을 곱해 고객별 LTV를 산출하고, pd.qcut으로 V.High(상위 5%)~V.Low(하위 10%) 5등급으로 나눴습니다. 아래 산점도(LTV vs 이탈확률, 색=5등급)를 보면, 고LTV 고객은 대부분 좌측(낮은 이탈확률)에 모여 있지만 일부는 우측(높은 이탈확률)에 흩어져 있습니다 — 바로 이 '우량인데 이탈 위험이 높은' 고객이 우선 방어 대상이며, 이것이 등급별 차등 전략의 근거입니다.",
          image: {
            src: "img/churn-ltv-scatter.png",
            caption: "LTV vs 이탈확률 (색 = LTV 5등급). 우상단 = 우량 고객이지만 이탈 위험 → 우선 방어 대상 (* 코드상 변수명 CLV = LTV)",
            kind: "capture",
          },
          code: {
            lang: "python",
            title: "이탈확률 기반 LTV 산출",
            body:
`def calculate_ltv(row):
    retention_prob = 1 - row['Attrition_Prob']          # 모델 예측 유지확률
    monthly_avg_trans = row['Total_Trans_Amt'] / row['Months_on_book']
    revolving_ratio = row['Total_Revolving_Bal'] / (row['Total_Trans_Amt'] + 1)
    ltv = (monthly_avg_trans * 12 + monthly_avg_trans_ct * 10
           + (1 - revolving_ratio) * 100 + retention_prob * 100)
    return ltv * (1 + (row['Months_on_book'] / 12) * 0.05)   # 유지기간 가중

df['LTV'] = df.apply(calculate_ltv, axis=1)
df['LTV_grade'] = pd.qcut(df['LTV'], q=[0,.10,.50,.80,.95,1.0],
    labels=['V.Low','Low','Medium','High','V.High'])`,
          },
        },
        {
          title: "6. 등급별 방어 전략 및 성과 예측",
          body:
            "각 LTV 등급에 이탈 규칙별 방어 전략을 매핑했습니다. 기초 강화(규칙2)·습관 형성(규칙4)·VIP 관리(규칙5)로 차등 대응한 결과, 그룹별 평균 이탈률 52.7% 감소, 고객당 평균 $82,372 추가 이익이 예상됐습니다(수수료율 1.25% 가정).",
          table: {
            headers: ["LTV 등급", "적용 전", "적용 후", "감소율", "추가 이익($)"],
            rows: [
              ["Very Low", "23%", "11%", "-52.3%", "22,321"],
              ["Low", "26%", "2%", "-90.4%", "317,438"],
              ["Medium", "4%", "1%", "-69.6%", "33,442"],
              ["High", "13%", "6%", "-52.9%", "103,113"],
              ["Very High", "5%", "3%", "-39.3%", "17,868"],
            ],
          },
        },
      ],
      resultStats: [
        { value: "96%", label: "예측 정확도 (RandomForest)" },
        { value: "0.987", label: "ROC-AUC" },
        { value: "-52.7%", label: "평균 이탈률 감소 (예상)" },
        { value: "$82,372", label: "고객당 추가 이익 (예상)" },
      ],
      results: [
        "RandomForest 정확도 96% (Precision 0.92 / Recall 0.81), ROC-AUC 0.987로 높은 분리력",
        "Decision Tree 이탈 규칙을 LTV 등급별 방어 전략에 직접 연결",
        "그룹별 평균 이탈률 52.7% 감소, 고객당 평균 $82,372 추가 수익 예상",
      ],
      proposal: [
        { title: "규칙2 — 기초 강화", desc: "거래 횟수 증가 유도 및 제품 사용 범위 확대 캠페인 (고위험군)" },
        { title: "규칙4 — 습관 형성", desc: "소액 구매 혜택(페이백) 및 지속적 재방문 유도" },
        { title: "규칙5 — VIP 관리", desc: "거래 유지 보너스 프로그램 및 프리미엄 서비스 제공" },
      ],
      retro: [
        "High_Attribution(고위험군)은 RF가 예측 실패한 케이스로, 대부분 규칙2 고객 → 모델+규칙 병행의 필요성 확인",
        "추가 이익은 수수료율 1.25% 가정값이므로, 실제 정책 적용 시 비용 대비 효과 재검증 필요",
      ],
    },
  },

  /* ============================================================ 06 DDI */
  {
    key: "ddi",
    domain: "ml",
    domainLabel: "바이오·머신러닝",
    title: "화학구조 기반 약물상호작용(DDI) 예측 모델",
    summary: "화학구조와 CYP450 효소 데이터로 19가지 상호작용 유형을 분류(정확도 92%)해 신약 개발 초기 비용·안전성 리스크를 절감",
    period: "인턴 프로젝트",
    type: "팀 프로젝트",
    tools: ["Python", "XGBoost", "PyBioMed", "SMOTE"],
    metric: { value: "92%", label: "예측 정확도 (XGBoost)" },
    chip: "화학구조 기반 ML 분류",
    detail: {
      objective:
        "신약 개발 초기 단계에서 비용을 절감하고 약물 안전성을 확보하기 위해, 화학구조와 CYP450 효소 데이터로 19가지 약물 상호작용(DDI) 유형을 분류하는 모델을 개발했습니다.",
      question: "화학 구조 특성만으로, 약물 간 상호작용 유형을 충분히 정확하게 예측할 수 있을까?",
      data: {
        source: "약물 페어 데이터셋 (SMILES 구조 + CYP450 효소 정보)",
        period: "-",
        scale: "67,317 페어 · 19개 DDI 클래스 (클래스 불균형)",
        preprocessing: [
          "SMILES 구조 기반 PyBioMed로 3,600개 특성 추출",
          "12개 CYP 단백질(1A2·2D6·3A4 등) 기반 상호작용 정보 구성",
          "상호작용 = Drug A(기질 여부 0/1) × Drug B(효소 영향: 유도 -1 / 무 0 / 억제 1)",
        ],
      },
      sections: [
        {
          title: "1. 특성 추출 — 분자 구조 + CYP450 효소",
          body:
            "약물쌍 SMILES를 RDKit으로 분자화하고 PyBioMed로 분자 descriptor를 추출했습니다. 여기에 두 약물의 CYP450 효소(12종) 벡터를 원소곱해 '상호작용 feature'를 직접 설계했습니다. 결과적으로 약 67,317 페어 데이터에서 고차원 특성을 확보했고, 핵심 이슈는 19개(코드상 다중분류) 클래스 간 심한 불균형이었습니다. EDA 결과 효소 2D6·2C19가 가장 높은 중요도를 보였습니다.",
          code: {
            lang: "python",
            title: "CYP450 효소 상호작용 feature 생성 (실제 코드)",
            body:
`def generate_cyp450_vector(row, is_second=False):
    enzymes = ['1A2','2A6','2B6','2C18','2C19','2C8',
               '2C9','2D6','2E1','3A4','3A5','3A7']
    if is_second: enzymes = [f'{e}.1' for e in enzymes]
    return [row[e] for e in enzymes]

# 두 약물의 효소 벡터를 원소곱 → 상호작용 feature
df['interaction_features'] = df.apply(
    lambda r: [v1*v2 for v1, v2 in zip(r['vector1'], r['vector2'])], axis=1)`,
          },
        },
        {
          title: "2. 특성 선택 — 고차원 → 94개",
          body:
            "RandomForest 중요도 상위 누적 95% 지점을 기준으로(SelectFromModel) 수천 개 descriptor를 94개로 줄였습니다. 모델 복잡도·과적합을 낮추고 학습/추론 속도를 높이기 위함입니다. RandomForest는 특성 중요도 평가와 비선형 관계 포착에 효과적이라 선택했습니다.",
          chart: {
            type: "bar",
            title: "특성 선택 — 차원 축소",
            labels: ["초기 특성", "최종 선택"],
            datasets: [{ label: "특성 수", data: [3600, 94] }],
            note: "RandomForest 중요도 누적 95% 기준",
          },
          image: {
            src: "img/ddi-features.png",
            caption: "실제 분석 — RandomForest 특성 중요도 랭킹 (누적 95% 지점에서 컷)",
            kind: "capture",
          },
        },
        {
          title: "3. 모델 비교 및 선정",
          body:
            "RandomForest·LightGBM·XGBoost를 비교한 결과 XGBoost가 전반적으로 가장 우수해 최종 모델로 선정했습니다.",
          chart: {
            type: "groupedBar",
            title: "모델별 초기 성능 비교",
            labels: ["Accuracy", "Precision", "Recall"],
            datasets: [
              { label: "RandomForest", data: [0.71, 0.73, 0.52] },
              { label: "LightGBM", data: [0.73, 0.74, 0.53] },
              { label: "XGBoost (선정)", data: [0.75, 0.78, 0.56] },
            ],
            max: 1,
          },
        },
        {
          title: "4. 성능 고도화 — 튜닝 + SMOTE",
          body:
            "초기 0.75에서 GridSearch 튜닝으로 0.80, 그리고 SMOTE로 클래스 불균형을 해결하며 0.92까지 끌어올렸습니다. 불균형 처리가 성능 향상의 결정적 지점이었습니다.",
          chart: {
            type: "bar",
            title: "최적화 단계별 정확도",
            labels: ["Base (초기)", "Tuning (GridSearch)", "SMOTE 적용"],
            datasets: [{ label: "Accuracy", data: [0.75, 0.80, 0.92] }],
            max: 1,
          },
          code: {
            lang: "python",
            title: "SMOTE 오버샘플링 + 다중모델 교차검증 (실제 코드)",
            body:
`from imblearn.over_sampling import SMOTE
from sklearn.model_selection import cross_val_score

# 클래스 불균형 해결 (소수 상호작용 유형 오버샘플링)
X_res, y_res = SMOTE(random_state=42).fit_resample(X_train.fillna(0), y_train)

for name, model in models.items():   # RF / LR / DT / NB / XGBoost
    cv = cross_val_score(model, X_res, y_res, cv=5, scoring='f1_weighted')
    print(f"{name} CV F1: {cv.mean():.4f}")   # XGBoost가 독보적`,
          },
        },
        {
          title: "5. 특성 해석 — SHAP",
          body:
            "모델을 블랙박스로 두지 않고 SHAP(TreeExplainer)으로 해석했습니다. 어떤 분자 descriptor 상호작용(예: LabuteASA×MTPSA)이 예측을 좌우하는지, 값이 높을 때(빨강)/낮을 때(파랑) 예측을 어느 방향으로 미는지를 확인했습니다 — 단순 정확도를 넘어 '왜 그렇게 예측했는가'를 설명할 수 있게 했습니다.",
          image: {
            src: "img/ddi-shap.png",
            caption: "실제 분석 — XGBoost SHAP Summary Plot (상위 상호작용 특성별 기여도)",
            kind: "capture",
          },
        },
        {
          title: "6. 세부 성능 & 비즈니스 임팩트",
          body:
            "주요 DDI 유형(Top 5) 평균 F1 0.98, Class 13·15는 F1 0.99로 매우 높았습니다. 기존 연구 대비 Precision이 14% 향상되어 더 신뢰도 높은 안전성 정보를 제공합니다.",
          callout:
            "💡 초기 단계에서 잠재 상호작용을 예측 → 임상 실패 비용 최소화 + 후보 물질 스크리닝 가속, 부작용 리스크 사전 차단",
        },
      ],
      resultStats: [
        { value: "92%", label: "최종 정확도 (XGBoost)" },
        { value: "+14%", label: "기존 연구 대비 Precision" },
        { value: "0.98", label: "Top 5 유형 평균 F1" },
      ],
      results: [
        "최종 정확도 92% (Base 0.75 → Tuning 0.80 → SMOTE 0.92)",
        "기존 연구 대비 Precision +14% 향상",
        "Top 5 DDI 유형 평균 F1 0.98 (Class 13·15 F1 0.99)",
      ],
      proposal: [
        { title: "스크리닝 자동화", desc: "후보 물질 단계에서 상호작용 유형 자동 분류로 검증 우선순위 설정" },
        { title: "안전성 정보 강화", desc: "Precision 향상분을 활용해 부작용 리스크 사전 경고 체계에 반영" },
      ],
      retro: [
        "SMOTE로 불균형은 해결했으나, 소수 클래스의 실제 분포 대표성은 추가 검증 필요",
        "특성 94개 선택이 성능과 속도의 균형점이었는지, 다른 누적 기준(90/97%)과 비교했으면 더 좋았을 것",
      ],
    },
  },

  /* ============================================================ 07 MARKETING */
  {
    key: "marketing",
    domain: "marketing",
    domainLabel: "퍼포먼스 마케팅",
    title: "캐치테이블 대상 퍼포먼스 마케팅",
    summary: "KPI 설계부터 미디어믹스 최적화·소재 A/B 테스트·성과 분석까지, 퍼포먼스 마케팅 전 사이클을 시뮬레이션으로 수행 (프라임커리어 제공)",
    period: "2026.03",
    type: "프라임커리어 제공 시뮬레이션",
    tools: ["A/B Test", "Excel", "미디어믹스"],
    metric: { value: "2배+", label: "소재 CVR 우세 차이" },
    chip: "KPI 설계 · 성과 분석",
    detail: {
      objective:
        "프라임커리어에서 제공한 레스토랑 예약 앱(캐치테이블) 퍼포먼스 마케팅 시뮬레이션입니다. 실제 광고 집행이 아닌, 제공된 시뮬레이션 데이터를 바탕으로 '무엇을 측정할 것인가(KPI)' 설계부터 미디어믹스 수립·소재 A/B 테스트·성과 분석까지 전 사이클을 수행했습니다.",
      question: "한정된 예산(1,000만원)으로 앱 설치와 신규 예약을 동시에 극대화하려면 매체·소재를 어떻게 배분할까?",
      data: {
        source: "프라임커리어 제공 — 캐치테이블 퍼포먼스 마케팅 시뮬레이션",
        period: "2025.11 시뮬레이션 데이터 (실제 집행 아님)",
        scale: "총 예산 1,000만원 · 네이버 SA / 카카오 비즈보드 / 메타 DA",
        preprocessing: [
          "비즈니스 목표를 측정 가능한 지표로 분해: 목표1 앱 설치 수(CPI) / 목표2 신규 예약 전환(CPA)",
          "넷플릭스 흑백요리사 방영 → 출연 셰프 식당 중심 연말 예약 프로모션 기획",
        ],
      },
      sections: [
        {
          title: "1. KPI 설계 & 미디어믹스 최적화",
          body:
            "대행사 제안을 기반으로, 예산 효율을 극대화하도록 4단계로 미디어믹스를 수정했습니다. '예상 설치수 = 광고비 ÷ CPI' 공식으로 사전 검증했습니다.",
          table: {
            headers: ["단계", "액션", "근거"],
            rows: [
              ["Step 1", "비효율 키워드 제거", "SA 키워드 4개 중 CPC/CPI 최고 예상 1개 제거, 균등 재배분"],
              ["Step 2", "예산 비중 최적화", "CPI 최저 예상 매체에 60% 집중"],
              ["Step 3", "집행 기간 조정", "연말 예약 마감일(11/25) 역산으로 DA 종료일 설정"],
              ["Step 4", "KPI 사전 검증", "앱설치 5,000건·예약 500건 목표 충족 가능한지 수식 검증"],
            ],
          },
        },
        {
          title: "2. 소재 A/B 테스트 — CTR이 아니라 CVR로 판단",
          body:
            "흑백요리사 / 연말맛집 두 테마 소재를 직접 기획해 매체별로 테스트했습니다. 두 매체 모두 CTR은 흑백요리사가 높았지만, 실제 예약 전환(CVR)은 연말맛집이 2배 이상 우세했습니다. '클릭을 많이 유도하는 소재가 전환까지 이어지지는 않는다'를 데이터로 확인하고, 최종 목표지표(CVR) 기준으로 연말맛집 소재를 선정했습니다.",
          chart: {
            type: "groupedBar",
            title: "소재별 CTR vs CVR (%)",
            labels: ["CTR", "CVR"],
            datasets: [
              { label: "흑백요리사", data: [0.87, 8.35] },
              { label: "연말맛집", data: [0.63, 14.83] },
            ],
            unit: "%",
          },
          image: {
            src: "img/marketing-creative.png",
            caption: "직접 기획한 소재 예시 — 화제성(흑백요리사) 활용 카피",
            kind: "capture",
          },
          callout:
            "💡 CTR 우세 소재(흑백요리사) ≠ CVR 우세 소재(연말맛집). 최종 목표지표 기준으로 의사결정해야 한다.",
        },
        {
          title: "3. 11월 성과 분석 — 목표 vs 실적",
          body:
            "총 1,000만원을 목표와 동일하게 소진했고, 신규 예약 수는 목표 대비 +9.03% 초과 달성했습니다. 다만 앱 설치 수는 목표 대비 3.23% 미달했습니다.",
          table: {
            headers: ["구분", "광고비", "앱설치", "CPI", "신규예약", "CPA"],
            rows: [
              ["목표", "1,000만", "5,200건", "1,923원", "558건", "17,932원"],
              ["실적", "1,000만", "5,032건", "1,987원", "608건", "16,447원"],
              ["달성률", "100%", "96.8% ▼", "—", "109% ▲", "91.7%"],
            ],
          },
        },
        {
          title: "4. 매체별 성과 — 차월 전략 도출",
          body:
            "CPI는 네이버 SA, CPA는 카카오 비즈보드가 최우수였고, 메타 DA는 두 지표 모두 가장 비효율적이었습니다. 따라서 12월엔 메타 DA를 제외하고 네이버 SA에 예산을 더 투입하면, 미달이던 앱 설치 목표도 초과 달성할 수 있을 것으로 예상했습니다.",
          chart: {
            type: "groupedBar",
            title: "매체별 CPI / CPA (원)",
            labels: ["네이버 SA", "카카오 비즈보드", "메타 DA"],
            datasets: [
              { label: "CPI(원)", data: [1734, 2128, 3465] },
              { label: "CPA(원)", data: [16304, 16129, 17241] },
            ],
            unit: "원",
          },
        },
      ],
      resultStats: [
        { value: "+9.03%", label: "신규 예약 목표 초과" },
        { value: "2배+", label: "연말맛집 CVR 우세" },
        { value: "1,000만원", label: "예산 100% 운영" },
      ],
      results: [
        "최종 목표지표(CVR) 기준으로 소재 선정 → 연말맛집 소재 채택",
        "11월 신규 예약 수 목표 대비 +9.03% 초과 달성",
        "메타 DA 제외·네이버 SA 집중을 차월 전략으로 제안",
      ],
      proposal: [
        { title: "12월 미디어믹스", desc: "최저효율 메타 DA 제외, CPI 최우수 네이버 SA에 예산 집중" },
        { title: "소재 디벨롭", desc: "연말맛집 소재의 CTR 개선을 위한 이미지/카피 발전, 흑백요리사 소재는 전환→인지도 목적으로 전환" },
      ],
      retro: [
        "\"무엇을 측정할 것인가를 먼저 설계해야 한다\" — KPI를 먼저 설계해야 성과 판단 기준이 흔들리지 않음을 체득",
        "매체마다 역할이 다르므로(한 매체가 모든 KPI에서 우수할 수 없음), 목적에 따라 매체를 선택·배분하는 판단이 핵심",
      ],
    },
  },

  /* ============================================================ 08 TRAINER (바이브코딩 MVP) */
  {
    key: "trainer",
    domain: "product",
    domainLabel: "바이브코딩·프로덕트",
    title: "AI 역검 연습 사이트 — 바이브코딩 MVP & 채널·퍼널 분석",
    summary:
      "Claude Code 바이브코딩으로 AI 역검 게임 연습 사이트를 직접 만들고, GA4·GTM·UTM과 행동 로그로 250+ 사용자를 분석해 채널 '양 vs 질'·리텐션·학습 효과를 진단한 뒤 제품 개선으로 잇는 — '만들고 → 측정 → 분석 → 개선' 풀사이클",
    period: "2026.05 ~ (운영 중)",
    type: "개인 프로젝트 · 바이브코딩",
    tools: ["Claude Code", "Vite·React", "Supabase", "Vercel", "GA4·GTM·UTM"],
    metric: { value: "250+", label: "멀티채널 유입 사용자" },
    chip: "바이브코딩 MVP · 채널·퍼널 분석",
    links: [
      { label: "🎮 사이트 체험하기", url: "https://jobda-trainer.vercel.app/?utm_source=portfolio&utm_medium=referral&utm_campaign=resume" },
    ],
    detail: {
      objective:
        "AI(Claude Code)로 풀스택 제품을 직접 만들고, 그것을 데이터로 키우는 한 사이클 — 만들고(바이브코딩) → 측정(GA4·UTM) → 분석(채널·퍼널) → 개선 — 을 혼자 돌려본 프로젝트입니다. 제품을 만드는 데 그치지 않고, 데이터로 검증해 다시 개선하는 전 과정을 직접 경험하고자 했습니다.",
      question: "어느 채널이 진짜 몰입하는 유저를 데려오는가? 유입량(방문자 수)만 보면 될까?",
      data: {
        source: "직접 제작·운영하는 웹 서비스 (jobda-trainer.vercel.app)",
        period: "2026.05 ~ (운영 중) · 데이터 매주 1회 갱신 (2026.06.08 기준)",
        scale: "GA4 250+ 사용자 · 10,983 이벤트 · UTM 멀티채널 (링커리어·에브리타임·네이버·인스타·티스토리) — 유입 계속 증가 중",
        preprocessing: [],
      },
      sections: [
        {
          title: "1. 제품 — 바이브코딩으로 직접 제작",
          body:
            "AI 역량검사(잡다 신역검) 게임을 무제한 연습하는 웹 서비스를 Claude Code 바이브코딩으로 만들었습니다. 가위바위보·도형 회전·길 만들기·N-back 등 역검 미니게임에 더해, 정확도·반응속도·점수를 기록하는 개인 통계 대시보드, 목표 설정, 친구 공유 기능까지 구현했습니다. Vite+React(SPA)·Supabase·Vercel로 만들고 SEO·OG 메타까지 직접 세팅했습니다. AI가 코드를 작성하되 스택 설계, SPA 라우팅 및 배포 디버깅, 어떤 지표를 노출할지 같은 제품 결정은 직접 내리며 진행했습니다.",
          images: [
            {
              src: "img/jobda-home.png",
              caption: "직접 제작·배포한 신역검 연습 사이트 — 4종 역검 게임",
              kind: "capture",
            },
            {
              src: "img/jobda-records.png",
              caption: "직접 만든 개인 통계 대시보드 — 게임별 최고 기록·정확도 추이·다음 연습 추천",
              kind: "capture",
            },
          ],
        },
        {
          title: "2. 측정 — GA4·GTM·UTM 계측 인프라",
          body:
            "결과를 주장하기 전에 '측정'부터 깔았습니다. GA4를 GTM으로 전환해 코드 수정 없이 클릭·이벤트를 추적하고, SPA 라우트 이동도 page_view로 잡았습니다. 외부 유입 링크에는 UTM(source·medium·campaign·content)을 설계해 어떤 채널·콘텐츠·위치(상단·푸터·게임바·글하단 CTA)에서 들어왔는지 구분되게 했습니다. 퍼널은 '사이트 진입 → 게임 페이지 → 게임 시작 → 게임 완료 → 목표 설정 → 목표 달성' 단계로 정의했습니다.",
        },
        {
          title: "3. 분석 — 채널별 '양 vs 질'의 역전",
          body:
            "GA4 퍼널을 채널별로 분해하자 '유입량'과 '실제 완료'가 정반대였습니다. 에브리타임은 유입 109명으로 1위지만 단계마다 약 절반씩 빠져 게임 완료는 23명에 그쳤습니다. 반면 링커리어는 유입이 절반(49명)인데 단계 전환율이 높아 완료 31명으로 에브리타임을 앞섰고, 네이버는 게임 시작→완료 전환이 100%였습니다. 세션 참여율도 네이버 86%·링커리어 71% vs 에브리타임 52%로 갈렸습니다. 즉 채널은 방문자 수가 아니라 '단계별 전환과 몰입'으로 평가해야 한다는 결론입니다.",
          chart: {
            type: "groupedBar",
            title: "채널별 유입 vs 게임 완료 — '양'과 '질'의 역전",
            labels: ["에브리타임", "링커리어", "네이버", "direct", "인스타"],
            datasets: [
              { label: "사이트 진입(유입)", data: [109, 49, 25, 29, 7] },
              { label: "게임 완료", data: [23, 31, 23, 17, 2] },
            ],
            note: "에브리타임은 유입 1위지만 완료 23명 / 링커리어는 유입 절반인데 완료 31명",
          },
          table: {
            headers: ["채널", "세션 참여율", "평균 참여시간", "재방문율"],
            rows: [
              ["에브리타임", "52%", "45초", "낮음"],
              ["링커리어", "71%", "16분 52초", "52%"],
              ["네이버", "86%", "24분 31초", "—"],
              ["티스토리", "92%", "11분 46초", "—"],
            ],
          },
        },
        {
          title: "4. 분석 — 유입은 새도, 들어오면 끈끈 (리텐션·고착도)",
          body:
            "채널 유입은 단계마다 빠지지만, 한 번이라도 플레이한 사용자는 강하게 고착됐습니다. 행동 로그 984건을 분석하니 88개 세션 중 81.8%가 2회 이상 재플레이했고, 세션당 평균 11회를 플레이했습니다. 26%는 다른 날 다시 돌아왔고, 66%는 2종 이상의 게임을 시도했습니다. 게임별로는 가장 어려운 N-back이 전체 플레이의 54%로, 사용자들이 '실전에 가까운 어려운 게임'을 가장 많이 연습한다는 신호였습니다. 즉 제품의 고착도는 충분하고, 성장의 병목은 '제품'이 아니라 '첫 플레이까지 데려오는 유입'에 있다는 결론입니다.",
          chart: {
            type: "bar",
            title: "세션당 플레이 횟수 분포 — 대부분 여러 번 플레이",
            labels: ["1회", "2회", "3–4회", "5–9회", "10회+"],
            datasets: [{ label: "세션 수", data: [16, 14, 15, 14, 29] }],
            note: "1회만 하고 떠난 세션은 18%뿐 — 82%가 재플레이, 33%는 10회 이상 플레이",
          },
          table: {
            headers: ["게임", "플레이 수", "비중", "평균 점수"],
            rows: [
              ["N-back", "532", "54%", "74 (최난도)"],
              ["도형 회전", "251", "25%", "78"],
              ["길 만들기", "105", "11%", "91"],
              ["가위바위보", "96", "10%", "94 (입문)"],
            ],
          },
        },
        {
          title: "5. 분석 — 도구가 실제로 작동한다 (학습 효과)",
          body:
            "리텐션이 강한 '이유'를 라운드 단위 로그로 더 파고드니, 사용자들이 '실제로 늘어서' 다시 온다는 게 보였습니다. N-back 점수는 첫 판 평균 62점에서 2판 72점(+10), 반복할수록 80점대까지 올랐고, 같은 세션에서 3회 이상 연습한 사용자는 평균 +20점·74%가 향상됐습니다. 더 흥미로운 건 첫 점수가 낮은 사용자(50점 미만)가 오히려 평균 16회로 가장 많이 연습했다는 점입니다 — 낮은 점수는 이탈 신호가 아니라 동기 신호였습니다. 또 4개 게임 모두 '게임 내 완주율 100%'로, 이탈은 게임 안이 아니라 '첫 플레이까지의 유입'에서만 일어났습니다. 즉 성장의 레버는 '마찰 제거'가 아니라 '향상을 눈에 보이게 만들고, 가장 큰 도약이 일어나는 2번째 판으로 유도하는 것'이라는 결론입니다.",
          chart: {
            type: "bar",
            title: "N-back 반복 플레이 — 점수가 실제로 오른다 (학습 효과)",
            labels: ["1판", "2판", "3판", "4판", "5판", "6판"],
            datasets: [{ label: "평균 점수", data: [62, 72, 73, 78, 76, 80] }],
            note: "첫 판 62 → 2판 72(+10), 반복할수록 80점대. 3회+ 연습 세션은 평균 +20점·74% 향상",
          },
          table: {
            headers: ["첫 점수대", "세션 수", "평균 플레이 수"],
            rows: [
              ["낮음 (50점 미만)", "14", "16.4회 — 가장 많이 연습"],
              ["중간 (50–79)", "20", "6.5회"],
              ["높음 (80+)", "19", "8.6회"],
            ],
          },
        },
        {
          title: "6. 개선 — 분석을 다시 제품으로",
          body:
            "세 분석(채널·리텐션·학습)을 제품 개선으로 되돌립니다. 게임 내 이탈은 없고(완주율 100%) 리텐션·학습 효과가 강하므로, 레버를 '마찰 제거'가 아니라 '향상을 보이게 만들고 신규 유입을 늘리는 것'에 둡니다. ① 가장 큰 점수 도약이 일어나는 2번째 판을 유도합니다 — 첫 판 직후 '한 판 더 하면 보통 +10점 올라요' 넛지. ② 개인 성장 피드백(첫 판 대비 +N점·최고기록·연속 출석)으로 재방문 동기를 만듭니다. ③ 단일 점수가 아니라 '62→82, 사흘의 성장' 같은 진척을 공유하게 해, 끈끈한 사용자를 무료 바이럴 채널로 전환합니다. ④ 첫 점수가 낮을수록 더 많이 연습한다는 점을 살려, 낮은 점수를 '대부분 여기서 시작해 늘어요'로 리프레이밍합니다. 만들고 → 측정 → 분석 → 개선의 사이클을 계속 돌립니다.",
        },
      ],
      resultStats: [
        { value: "250+", label: "멀티채널 유입 사용자" },
        { value: "81.8%", label: "재플레이율 — 세션당 평균 11회" },
        { value: "+20점", label: "반복 연습 시 점수 향상 (74% 개선)" },
      ],
      results: [
        "에브리타임은 유입 1위(109명)지만 단계마다 ~50% 이탈 → 게임 완료 23명 / 링커리어는 유입 49명인데 완료 31명으로 역전 → '유입량 ≠ 성과'",
        "네이버는 게임 시작→완료 전환 100%·세션 참여율 86%로 검색 유입의 높은 의도를 확인",
        "행동 로그 984건 분석: 재플레이율 81.8%·세션당 평균 11회·재방문 26% → 제품 고착도는 충분, 병목은 '첫 플레이까지의 유입'",
        "라운드 단위 분석: 게임 완주율 100%(이탈은 유입에서만) · 반복 시 +20점 향상(74%) · 첫 점수 낮은 사용자가 16회로 최다 연습 → 개선 레버를 '마찰 제거'가 아닌 '향상 가시화·2번째 판 유도'로 재정의",
      ],
      retro: [
        "유입량만 보면 에브리타임이 1등이지만 몰입·재방문(질)은 링커리어·네이버가 압도 — 지표는 '양'이 아니라 '목적에 맞는 질'로 봐야 함을 데이터로 체득",
        "제품 제작(바이브코딩) → 측정(GA4·GTM·UTM) → 분석(채널·퍼널)까지 한 사이클을 직접 운영. 데이터가 더 쌓이면 코호트 재방문·게임별 이탈 단계까지 확장할 계획",
      ],
    },
  },
];
