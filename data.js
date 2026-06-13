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
  velog: "https://velog.io/@wjddus/posts",
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
  freewillin: { label: "전략기획·데이터 의사결정·바이브코딩", featured: "abtest", show: ["dashboard", "trainer", "growth"] },
  loreal:     { label: "채널 KPI·대시보드·데이터 품질", featured: "abtest", show: ["dashboard", "growth", "trainer", "churn"] },
  willog:     { label: "경영지표·KPI 대시보드·실행", featured: "abtest", show: ["dashboard", "growth", "trainer"] },
  jinhak:     { label: "합격예측 모델링·서비스 데이터 분석", featured: "abtest", show: ["churn", "trainer", "growth"] },
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
          lead: '매출 꼴찌 C지점, 그런데 <span class="hl">고객 수·리텐션은 멀쩡</span> — \'고객을 못 모아서\'가 아니다.',
          points: [
            "2024년 지점 매출: A 8,364 / B 8,640 / C 6,824(만원) — C가 최저",
            "고객 수·리텐션율·재충전 주기는 지점 간 큰 차이 없음",
            "→ 매출 격차는 '고객 수'가 아닌 다른 데서 발생",
          ],
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
          lead: '진짜 원인은 <span class="hl">\'충전 단가 구조\'</span> — C지점은 1만원에 몰리고 고액 충전이 적다.',
          points: [
            "C지점 1만원 충전 비중 69.7% — 평균보다 +5.8%p 높음",
            "3만원 이상 고액 충전 비중 9.6% — 평균보다 −6.4%p 낮음",
            "2만원 구간은 지점 간 유사 → 격차는 '고액 전환'에서 발생",
          ],
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
          lead: '<span class="hl">2만원을 1차 전환 타겟</span>으로 — 3만원 직접 유도는 장벽이 높다고 판단.',
          points: [
            "가설: 2만원 이상 충전 시 인센티브 → 고액 전환·충전율 개선 → 코호트 매출 상승",
            "전략: 1만원(Low) → 2만원 이상 혜택 → 객단가 상승(High)의 단계 전환",
          ],
        },
        {
          title: "4. 실험 설계 (A/B Test)",
          lead: 'C지점 기존 고객 2,682명을 <span class="hl">무작위 A/B 배정</span> — 3개월 집행.',
          points: [
            "Control 1,341명(기존 정책) vs Test 1,341명(2만원 이상 충전 +10%)",
            "기간 2025.03~05 (3개월), 사전 분포 차이 ≤ 1%p로 동질성 검증",
            "ITT(Intention To Treat) 기준으로 분석",
          ],
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
          lead: '충전율·고액 비중·평균 충전액이 <span class="hl">동시에 상승</span> — 매출이 구조적으로 개선.',
          points: [
            "충전율 14.2% → 18.2% (+4.0%p, χ² p≈0.006 유의)",
            "2만원 이상 비중 28.4% → 38.1% (+9.7%p, z-test p≈0.03 유의)",
            "평균 충전액 +1,620원(p≈0.07 경계) · 1인당 매출 +25.7%(3,433 → 4,316원)",
          ],
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
        "1인당 매출 +25.7% (3,433 → 4,316원), 총매출 기여 +1,184,000원",
        "충전율 +4.0%p·2만원 이상 비중 +9.7%p 모두 통계적으로 유의",
        "고객 수를 안 늘리고 객단가 상승만으로 매출 구조 개선 검증",
      ],
      proposal: [
        { title: "프로모션 정책 확정", desc: "2만원 이상 +10% 인센티브를 정식 정책으로 채택, 지점별 요금 차등 설계에 반영" },
        { title: "2차 업셀 실험", desc: "2만원 전환 이후 3만원 이상 구간을 타겟으로 한 후속 업셀 실험 설계 (Up-Selling 고도화)" },
      ],
      retro: [
        "충전 데이터만 분석 → 세탁기/건조기/자판기 이용 로그 기여도는 분리 검증 못 함",
        "단기 3개월 효과는 검증, 장기 유지·인센티브 ROI는 추가 검증 필요",
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
          lead: '3개 지점 POS <span class="hl">5.7만 건을 하나의 데이터 마트로 통합</span> — 정합성·확장성 확보.',
          points: [
            "동전교환 보정·지점코드 매핑·결측치·날짜 표준화로 지점 간 비교 가능하게 정렬",
            "매개변수(Parameter)로 동적 측정값 전환",
            "계산된 필드로 YoY/MoM·월별 리텐션율 등 파생 지표 생성",
          ],
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
          lead: '수기 집계의 한계를 <span class="hl">Google Sheets 동기화 대시보드</span>로 — 주 2시간 → 20분.',
          points: [
            "Tableau Public은 CSV 수동 업로드라 일상 트래킹에 한계",
            "Looker Studio(Sheets 동기화)로 전환 → 일일 입력만으로 현황 수시 확인",
          ],
          callout:
            "💡 수기 집계 주 2시간 → 자동화 후 주 20분. 약 83% 단축 + 데이터 누락 리스크 제거.",
        },
        {
          title: "3. BI 도구로 시각화 — Tableau · Looker Studio",
          lead: '두 BI 도구의 <span class="hl">역할을 분리</span> — Tableau는 전략, Looker는 실시간 트래킹.',
          points: [
            "Tableau: 연간 분석·전략용 (KPI·매출 트렌드·계절 패턴·고객 구조)",
            "Looker Studio: 실시간 트래킹용 (매출·지출·수익 추이, 요일·시간대 히트맵, 지점별 구조)",
          ],
          images: [
            { src: "img/dashboard-tableau.png", caption: "Tableau Public — 2024년 빨래방 연간 대시보드 (직접 구축)", kind: "dashboard" },
            { src: "img/dashboard-looker.png", caption: "Looker Studio — 실시간 매출 대시보드 (직접 구축)", kind: "dashboard" },
          ],
          callout:
            "💡 요일·시간대 히트맵에서 심야 저조 시간대 식별 → 청소·점검을 그 시간대로 배치해 피크타임 가동률 확보. 지점별 비용구조 차이로 비용 절감 우선순위·매출 목표를 차등 설정.",
        },
        {
          title: "4. 운영 자동화 — 파일 드래그 자동 반영 웹 대시보드",
          lead: 'BI 도구를 넘어 <span class="hl">\'운영자가 직접 쓰는 도구\'</span>를 제작 — 파일만 올리면 자동 갱신.',
          points: [
            "POS 엑셀/CSV를 드래그 → 충전·자판기·지출 시트 자동 인식 → KPI·손익·고객 분석 즉시 갱신",
            "카드·현금만 수기, 입력 최소화로 설계 → 집계가 월 10분 수준까지 단축",
            "단순 시각화를 넘어 '도구를 만드는' 단계로 확장",
          ],
          callout2:
            "🛠 개발 방식: 직접 백엔드/프런트엔드를 작성하기보다, Claude Code 바이브코딩(MCP 연동 활용)으로 구현했습니다. '필요한 운영 도구를 AI 페어코딩으로 빠르게 만들어 쓰는' 접근이 핵심입니다.",
          images: [
            { src: "img/dashboard-web-pnl.png", caption: "직접 개발한 웹 대시보드 — 파일 드래그 → KPI·손익·월별 추이 자동 반영", kind: "dashboard" },
            { src: "img/dashboard-web-usage.png", caption: "시간대별 피크타임·요일별 이용·결제수단 분석 (자동 집계)", kind: "dashboard" },
          ],
          callout:
            "💡 수기 엑셀 → BI 도구 시각화 → 자동 반영 웹 도구로 진화. Looker Studio로 주 20분이던 집계가, 웹 대시보드 전환 후엔 파일만 올리면 돼 월 10분 수준까지 줄었습니다. '도구를 쓰는' 수준을 넘어 '도구를 만드는' 단계까지 확장했습니다.",
        },
      ],
      resultStats: [
        { value: "83%↓", label: "주간 집계 시간 (2h→20m)" },
        { value: "5.7만 건", label: "통합 POS 데이터" },
        { value: "3개 지점", label: "실시간 트래킹" },
      ],
      results: [
        "주 2시간 수기 집계 → 주 20분, 약 83% 단축 (웹 대시보드 후 월 10분)",
        "피크타임 식별 → 청소·점검 스케줄 최적화",
        "지점별 비용구조 차이 식별 → 비용 절감 우선순위·매출 목표 차등 설정",
      ],
      proposal: [
        { title: "일일 입력 워크플로우 정착", desc: "점주가 부담 없이 유지할 수 있는 수준으로 입력 항목을 설계해 자동 갱신 환경 유지" },
        { title: "운영 액션 연결", desc: "히트맵 기반 인력 배치·청소 시간 최적화, 결제수단 비중에 따른 카드/현금 운영비율 조정" },
      ],
      retro: [
        "BI의 CSV 수동 업로드 한계를 직접 만든 웹 대시보드로 해결 → '운영자가 매일 쓰는 도구'로 정착",
        "카드·현금은 아직 수기 입력 → 결제 데이터 연동으로 완전 자동화가 다음 단계",
        "수기 → BI → 자체 웹 도구로 이어지며, 도구 선택·제작이 운영 지속성을 좌우함을 체감",
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
    type: "팀 프로젝트 (4인 · 팀장)",
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
          lead: '<span class="hl">Books·Electronics가 매출의 49%</span> — 비중도 높고 가장 안정적.',
          points: [
            "Books 26.7% · Electronics 22.3% → 합산 매출의 49%",
            "변동계수(CV) Books 0.19·Electronics 0.17로 가장 낮음(안정적)",
          ],
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
          lead: 'R·F·M 정규화 → <span class="hl">5등급 분류</span> — Diamond(상위 3%)가 매출의 15% 기여.',
          points: [
            "Recency·Frequency·Monetary를 minmax_scale로 0~1 정규화 (Recency는 역전)",
            "합산 점수 백분위화 → Diamond 3%·Platinum 12%·Gold 20%·Silver 45%·Bronze 20%",
            "Diamond(상위 3%)가 전체 매출의 15% 기여하는 핵심 고객",
          ],
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
          lead: '등급마다 <span class="hl">주력 카테고리가 뚜렷이 갈린다</span> — 차별화 마케팅의 근거.',
          points: [
            "Platinum은 Books(36%) 압도적 · Silver는 Electronics(25%) 특화",
            "Gold는 Home&Kitchen(20%) · Diamond는 Clothing(17%) · Bronze는 Bags(11%) 강세",
          ],
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
          lead: '중간 등급 20% 승급 유도 → <span class="hl">전체 매출 +8% 성장</span> 예측.',
          points: [
            "1단계 승급 시 평균 구매금액 약 +95% (등급별 평균 구매금액 차이 기반)",
            "중간 등급 20% 승급 유도 → 전체 매출 약 +8% 성장 예측",
          ],
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
        "RFM 5등급 세분화 → Diamond(상위 3%)가 매출 15% 기여하는 핵심 고객 식별",
        "등급별 카테고리 선호 차이 분석 → 맞춤 전략의 데이터 근거 확보",
        "중간 등급 20% 승급 유도 시 전체 매출 +8% 성장 예측",
      ],
      proposal: [
        { title: "Platinum — Books 집중", desc: "신간/프리미엄 제안으로 충성 카테고리 강화" },
        { title: "Gold — Home&Kitchen 강세", desc: "번들 할인으로 객단가 상승 유도" },
        { title: "Silver — Electronics 특화", desc: "승급 유도 프로모션으로 상위 등급 전환" },
        { title: "Bronze — Bags 재활성", desc: "타겟 마케팅으로 휴면 고객 재활성화" },
      ],
      retro: [
        "예측 +8%는 등급별 평균 구매금액 차이 기반 산출 → 실제 승급 캠페인 후 A/B로 검증 필요",
        "Cross-selling(등급별 균형 카테고리)까지 결합하면 더 정교한 추천 전략 설계 가능",
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
          lead: '외형 성장은 강하지만 <span class="hl">시즌 편차가 크다</span> — 연말 정점, 비수기 저조.',
          points: [
            "9월부터 매출·고객수·거래건수 동반 급증 → 11~12월 정점의 뚜렷한 시즌성",
            "전년 동월 대비 일평균 매출 +95%·고객 수 +100%·거래건수 +81%",
            "단, 비수기(1~8월) 편차 큼 → 도매 특성상 연말 재고 확보 수요 집중",
          ],
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
          lead: '유입 시기가 충성도를 가른다 — <span class="hl">연말 유입 50% vs 봄·여름 17%</span>.',
          points: [
            "유입 월별 코호트로 '첫 구매 이후 시점별 재구매율' 분석",
            "연말(2010-12) 유입은 30~50%대 vs 봄·여름(2011-03~07) 유입은 14~26%대",
            "→ 봄·여름 코호트엔 첫 구매 직후 리텐션 장치가 필요",
          ],
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
          lead: '비회원 비중은 줄다가 <span class="hl">11월 고액 거래로 급반등</span> — 회원 전환 기회.',
          points: [
            "전체 거래의 약 25%가 비회원(거래번호 기준 7%)",
            "비회원 매출 비중 연초 28%대 → 하반기 9%대로 감소",
            "11월부터 급반등(21.7% → 22.9%), 거래번호당 평균 매출 3천 파운드까지 상승",
          ],
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
          lead: '세 관점 종합 — <span class="hl">성장성·재방문·회원 확보</span>를 각각의 액션으로.',
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
        "성장성: YoY +95%, 단 비수기 편차 큼 → 비수기 확대 전략 필요성 도출",
        "내실: 연말 유입 재구매율 50% vs 봄·여름 17% → 시즌별 차별 마케팅 근거",
        "회원: 거래 25%가 비회원, 11월 고액 비회원 급증 → 연말 회원 전환 기회 포착",
      ],
      proposal: [
        { title: "비수기 확대 전략", desc: "봄·여름 매출 편차 완화를 위한 하절기 대규모 프로모션" },
        { title: "리텐션 장치", desc: "첫 구매 직후 재구매 유도 장치로 저충성 코호트 방어" },
        { title: "연말 회원 전환", desc: "고액 비회원 대상 회원가입 유도로 잠재 우량 고객 확보" },
      ],
      retro: [
        "비회원 비중이 거래 기준 25% vs 거래번호 기준 7% → 지표 정의에 따라 해석이 바뀜을 확인",
        "시즌성 강한 도매 특성상, 월 단위보다 시즌 단위 코호트가 의사결정에 더 유용",
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
          lead: '이탈 고객은 <span class="hl">거래 활동성이 낮은 쪽에 몰려 있다</span> — 변수 선택의 출발점.',
          points: [
            "전체 이탈률 16.07% (불균형)",
            "이탈 고객은 거래액 $2,500↓·횟수 50회↓·상품 1~2개·리볼빙 $500↓에 집중",
            "이탈 vs 비이탈 분포(KDE) 차이를 모델 변수 선택 근거로 활용",
          ],
          image: {
            src: "img/churn-eda.png",
            caption: "이탈 vs 비이탈 그룹의 핵심 변수 분포(KDE) — 거래 활동성에서 뚜렷한 차이",
            kind: "capture",
          },
        },
        {
          title: "2. 모델 비교 및 선정",
          lead: '수치 1위(LightGBM)가 아니라 <span class="hl">안정성으로 RandomForest 선정</span> — 과적합 회피.',
          points: [
            "RandomForest·LightGBM·LogisticRegression·XGBoost 비교",
            "LightGBM이 수치 1위지만 학습-테스트 차 0.05↑ → 과적합 우려로 제외",
            "데이터 1만 건·불균형 16% 고려 → RandomForest를 GridSearchCV(81조합) 튜닝",
            "Test 정확도 0.96·이탈 F1 0.86·ROC-AUC 0.987로 높은 분리력",
          ],
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
          lead: '<span class="hl">거래가 줄고 분기 대비 활동이 꺾이는</span> 고객이 이탈 신호.',
          points: [
            "상위 변수: 총 거래금액·거래횟수, 분기 변동률(Q4/Q1), 리볼빙 잔액, 관계 상품 수",
            "→ 이 변수들이 뒤의 이탈 규칙·방어 전략의 기준",
          ],
          image: {
            src: "img/churn-importance.png",
            caption: "RandomForest 변수 중요도 — 상위 7개(빨간 박스)가 이탈을 주도",
            kind: "capture",
          },
        },
        {
          title: "4. 이탈 규칙 추출 (Decision Tree)",
          lead: 'Decision Tree로 <span class="hl">해석 가능한 이탈 규칙</span> 추출 — 방어 전략에 직접 연결.',
          points: [
            "예: 월거래 54.5회↓ & 리볼빙 $671.5↑ & 상품 2.5개↑ & 거래액 $2,103↓ → 이탈률 7.04%",
            "반대로 거래 활발 구간은 이탈률 0.23%로 매우 낮음",
            "→ 이 규칙을 LTV 등급별 방어 전략에 매핑",
          ],
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
          lead: '이탈확률을 LTV로 연결 — <span class="hl">\'우량인데 이탈 위험 높은\'</span> 고객이 우선 방어 대상.',
          points: [
            "유지확률(1−이탈확률)·월평균 거래·리볼빙 비율에 유지기간 가중 → 고객별 LTV 산출",
            "pd.qcut으로 V.High(상위 5%)~V.Low(하위 10%) 5등급 분류",
            "산점도(LTV vs 이탈확률): 우상단 = 우량이지만 이탈 위험 → 등급별 차등 전략 근거",
          ],
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
          lead: '규칙별 차등 방어 → <span class="hl">평균 이탈률 52.7% 감소</span>·고객당 $82,372 추가 이익(예상).',
          points: [
            "기초 강화(규칙2)·습관 형성(규칙4)·VIP 관리(규칙5)로 등급별 차등 대응",
            "그룹별 평균 이탈률 52.7% 감소 예상 (수수료율 1.25% 가정)",
            "고객당 평균 $82,372 추가 이익 예상",
          ],
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
        "RandomForest 정확도 96%(Precision 0.92·Recall 0.81)·ROC-AUC 0.987로 높은 분리력",
        "Decision Tree 이탈 규칙을 LTV 등급별 방어 전략에 직접 연결",
        "그룹별 평균 이탈률 52.7% 감소·고객당 평균 $82,372 추가 수익 예상",
      ],
      proposal: [
        { title: "규칙2 — 기초 강화", desc: "거래 횟수 증가 유도 및 제품 사용 범위 확대 캠페인 (고위험군)" },
        { title: "규칙4 — 습관 형성", desc: "소액 구매 혜택(페이백) 및 지속적 재방문 유도" },
        { title: "규칙5 — VIP 관리", desc: "거래 유지 보너스 프로그램 및 프리미엄 서비스 제공" },
      ],
      retro: [
        "RF가 예측 실패한 고위험군은 대부분 규칙2 고객 → 모델+규칙 병행의 필요성 확인",
        "추가 이익은 수수료율 1.25% 가정값 → 실제 정책 적용 시 비용 대비 효과 재검증 필요",
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
    period: "2022.09 ~ 2022.10",
    type: "인턴 프로젝트 (개인 수행)",
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
          lead: '두 약물의 CYP450 효소 벡터를 원소곱해 <span class="hl">\'상호작용 feature\'를 직접 설계</span>.',
          points: [
            "약물쌍 SMILES를 RDKit으로 분자화 → PyBioMed로 descriptor 추출",
            "CYP450 효소(12종) 벡터 원소곱으로 상호작용 feature 생성 (약 67,317 페어)",
            "핵심 이슈는 19개 클래스 간 심한 불균형 · EDA상 효소 2D6·2C19 중요도 최상위",
          ],
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
          lead: '<span class="hl">수천 개 descriptor → 94개</span>로 압축 — 과적합↓·속도↑.',
          points: [
            "RandomForest 중요도 누적 95% 지점 기준(SelectFromModel)으로 차원 축소",
            "RandomForest는 중요도 평가·비선형 관계 포착에 효과적이라 선택",
          ],
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
          lead: 'RF·LightGBM·XGBoost 비교 → <span class="hl">XGBoost 최종 선정</span>.',
          points: [
            "초기 성능 XGBoost가 Accuracy 0.75·Precision 0.78·Recall 0.56으로 전반 우위",
          ],
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
          lead: '<span class="hl">불균형 처리(SMOTE)가 결정타</span> — 정확도 0.75 → 0.92.',
          points: [
            "Base 0.75 → GridSearch 튜닝 0.80 → SMOTE 적용 0.92",
            "클래스 불균형 해결이 성능 향상의 결정적 지점",
          ],
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
          lead: '블랙박스 대신 SHAP으로 <span class="hl">\'왜 그렇게 예측했는가\'</span>를 설명.',
          points: [
            "SHAP(TreeExplainer)으로 예측을 좌우하는 descriptor 상호작용(예: LabuteASA×MTPSA) 식별",
            "값의 고저(빨강/파랑)가 예측을 미는 방향까지 확인 → 정확도를 넘어 설명력 확보",
          ],
          image: {
            src: "img/ddi-shap.png",
            caption: "실제 분석 — XGBoost SHAP Summary Plot (상위 상호작용 특성별 기여도)",
            kind: "capture",
          },
        },
        {
          title: "6. 세부 성능 & 비즈니스 임팩트",
          lead: 'Top 5 유형 평균 <span class="hl">F1 0.98</span> · 기존 연구 대비 Precision +14%.',
          points: [
            "주요 DDI 유형(Top 5) 평균 F1 0.98 · Class 13·15는 F1 0.99",
            "기존 연구 대비 Precision +14% → 더 신뢰도 높은 안전성 정보 제공",
          ],
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
          lead: '미디어믹스를 <span class="hl">4단계로 재설계</span> — \'예상 설치수 = 광고비 ÷ CPI\'로 사전 검증.',
          points: [
            "비효율 SA 키워드 제거·균등 재배분 → CPI 최저 매체에 예산 60% 집중",
            "연말 예약 마감(11/25) 역산으로 DA 종료일 설정",
            "앱설치 5,000건·예약 500건 목표 충족 여부를 수식으로 사전 검증",
          ],
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
          lead: '<span class="hl">클릭 많은 소재 ≠ 전환 잘 되는 소재</span> — 최종 지표(CVR)로 선정.',
          points: [
            "흑백요리사·연말맛집 두 테마 소재를 직접 기획해 매체별 테스트",
            "CTR은 흑백요리사가 우세했지만, 예약 전환(CVR)은 연말맛집이 2배 이상",
            "→ 최종 목표지표(CVR) 기준으로 연말맛집 소재 채택",
          ],
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
          lead: '예산 100% 소진, <span class="hl">신규 예약 +9.03% 초과 달성</span> (앱 설치는 3.23% 미달).',
          points: [
            "광고비 1,000만원 목표대로 소진",
            "신규 예약 608건 — 목표 558건 대비 +9.03% 초과",
            "앱 설치 5,032건 — 목표 5,200건 대비 3.23% 미달",
          ],
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
          lead: '메타 DA가 두 지표 모두 최저 → <span class="hl">12월엔 네이버 SA 집중</span>.',
          points: [
            "CPI 최우수 네이버 SA · CPA 최우수 카카오 비즈보드 · 메타 DA는 두 지표 모두 비효율",
            "→ 12월 메타 DA 제외하고 네이버 SA에 예산 더 투입 → 앱 설치 목표 초과 가능 예상",
          ],
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
        "KPI를 먼저 설계해야 성과 판단 기준이 흔들리지 않음을 체득 — '무엇을 측정할지'가 먼저",
        "한 매체가 모든 KPI에서 우수할 수 없음 → 목적에 따라 매체를 선택·배분하는 판단이 핵심",
      ],
    },
  },

  /* ============================================================ 08 TRAINER (바이브코딩 MVP) */
  {
    key: "trainer",
    domain: "product",
    domainLabel: "바이브코딩·프로덕트",
    title: "AI 역량검사 연습 사이트 — 바이브코딩 MVP & 채널·퍼널 분석",
    summary:
      "Claude Code 바이브코딩으로 AI 역량검사 게임 연습 사이트를 직접 만들고, GA4·GTM·UTM과 행동 로그로 800+ 사용자를 분석해 채널 '양 vs 질'·리텐션·학습 효과를 진단한 뒤 제품 개선으로 잇는 풀사이클 — 실사용자 피드백으로 게임 4종 → 9종까지 확장하며 운영 중",
    period: "2026.05 ~ (운영 중)",
    type: "개인 프로젝트 · 바이브코딩",
    tools: ["Claude Code", "Vite·React", "Supabase", "Vercel", "GA4·GTM·UTM"],
    metric: { value: "800+", label: "멀티채널 활성 사용자" },
    chip: "바이브코딩 MVP · 채널·퍼널 분석",
    links: [
      { label: "🎮 사이트 체험하기", url: "https://jobda-trainer.vercel.app/?utm_source=portfolio&utm_medium=referral&utm_campaign=resume" },
    ],
    detail: {
      objective:
        "AI(Claude Code)로 풀스택 서비스를 직접 만들고, 그것을 데이터로 키우는 한 사이클 — 만들고(바이브코딩) → 측정(GA4·UTM) → 분석(채널·퍼널) → 개선 — 을 혼자 돌려본 프로젝트입니다. 서비스를 만드는 데 그치지 않고, 데이터로 검증해 다시 개선하는 전 과정을 직접 경험하고자 했습니다.",
      question: "어느 채널이 진짜 몰입하는 유저를 데려오는가? 유입량(방문자 수)만 보면 될까?",
      data: {
        source: "직접 제작·운영하는 웹 서비스 (jobda-trainer.vercel.app)",
        period: "2026.05 ~ (운영 중) · 데이터 매주 1회 갱신 (2026.06.13 기준)",
        scale: "GA4 활성 사용자 810 · 활성 사용자당 평균 참여 16분 27초 · UTM 멀티채널 (링커리어·에브리타임·네이버·인스타·티스토리) — 유입 계속 증가 중",
        preprocessing: [],
      },
      sections: [
        {
          title: "1. 서비스 — 바이브코딩으로 직접 제작",
          lead: 'AI가 코드를 쓰되 <span class="hl">제품 판단은 직접</span> — AI 역량검사 연습 서비스를 만들어 배포.',
          points: [
            "Claude Code로 제작 (Vite·React·Supabase·Vercel) — 게임 4종 → 실사용자 피드백 받아 9종까지 확장, 전 게임 실전모드",
            "개인 통계 대시보드·목표 설정·친구 공유·피드백 창구·SEO/OG 직접 구현",
            "AI는 코드 작성, <b>스택 설계·라우팅·배포 디버깅 같은 핵심 판단은 직접</b>",
          ],
          images: [
            {
              src: "img/jobda-home.png",
              caption: "직접 제작·배포한 AI 역량검사 연습 사이트 — 4종 게임",
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
          lead: '결과를 주장하기 전에 <span class="hl">측정부터 깔았다</span> — GA4·GTM·UTM + 6단계 퍼널.',
          points: [
            "GA4를 GTM으로 연결 → 코드 수정 없이 클릭·이벤트·SPA page_view 추적",
            "외부 링크에 UTM(source·medium·campaign·content) 설계 → 채널·콘텐츠·위치별 유입 구분",
            "퍼널 정의: 진입 → 게임 페이지 → 시작 → 완료 → 목표 설정 → 달성",
          ],
        },
        {
          title: "3. 분석 — 첫 소스별 퍼널, '양 vs 질'의 역전",
          lead: '유입 1위 채널이 완료는 꼴찌 — 채널은 \'양\'이 아니라 <span class="hl">\'전환·몰입\'</span>으로 본다.',
          points: [
            "첫 소스별 퍼널(6/1~12·진입 889명): 에브리타임 진입 1위(349명)인데 완료율 21.8%",
            "링커리어는 진입 절반(166명)인데 <b>완료율 75.9%로 역전</b> · 네이버 87.7% · bing 79.5%",
            "세션 참여율도 네이버 86%·링커리어 71% vs 에브리타임 52%",
            "단, 에브리타임은 모바일 비중↑ → 측정 왜곡 섞임 (6번에서 기기까지 분리)",
          ],
          chart: {
            type: "groupedBar",
            title: "첫 소스별 퍼널 — 진입 vs 게임 완료 (6/1~12, 889명)",
            labels: ["에브리타임", "(direct)", "링커리어", "네이버", "bing"],
            datasets: [
              { label: "사이트 진입", data: [349, 190, 166, 65, 39] },
              { label: "게임 완료", data: [76, 100, 126, 57, 31] },
            ],
            note: "에브리타임 진입 349명(1위)인데 완료율 21.8% / 링커리어 진입 166명인데 완료율 75.9%·네이버 87.7%",
          },
          table: {
            headers: ["채널", "진입→완료율", "세션 참여율", "평균 참여시간"],
            rows: [
              ["에브리타임", "21.8% (76/349)", "52%", "45초"],
              ["링커리어", "75.9% (126/166)", "71%", "16분 52초"],
              ["네이버", "87.7% (57/65)", "86%", "24분 31초"],
              ["(direct)", "52.6% (100/190)", "—", "—"],
            ],
          },
          cta: {
            to: "channel-device",
            text: "이 채널 수치엔 측정 한계가 숨어 있었습니다 — 채널 데이터를 '기기'까지 쪼개 모바일 측정 왜곡을 검증·보정한 심층 분석",
          },
        },
        {
          title: "4. 분석 — 유입은 새도, 들어오면 끈끈 (리텐션·고착도)",
          lead: '유입은 새도 <span class="hl">들어오면 끈끈하다</span> — 병목은 \'재미\'가 아니라 \'유입\'.',
          points: [
            "행동 로그 5,363건·404세션: <b>79%가 재플레이</b>, 세션당 평균 13회",
            "26% 다른 날 재방문 · 66% 2종 이상 시도 · 최난도 N-back이 플레이의 50%",
            "단, 일간 잔존은 D+1 14%·D+2 7.7% → '세션 몰입'과 '다음날 복귀'는 별개 지표",
            "결론: 고착도는 충분 → 병목은 '첫 플레이까지 데려오고 다시 부르는 유입'",
          ],
          chart: {
            type: "bar",
            title: "세션당 플레이 횟수 분포 — 대부분 여러 번 플레이",
            labels: ["1회", "2회", "3–4회", "5–9회", "10회+"],
            datasets: [{ label: "세션 수", data: [84, 35, 66, 78, 141] }],
            note: "1회만 하고 떠난 세션은 21%뿐 — 79%가 재플레이, 35%는 10회 이상 플레이",
          },
          table: {
            headers: ["게임", "플레이 수", "비중", "평균 점수"],
            rows: [
              ["N-back", "2,688", "50%", "75 (최난도)"],
              ["도형 회전", "1,195", "22%", "79"],
              ["길 만들기", "609", "11%", "87"],
              ["가위바위보", "452", "8%", "89 (입문)"],
              ["약속 정하기 외 신규 5종", "419", "8%", "신규 안착"],
            ],
          },
        },
        {
          title: "5. 분석 — 도구가 실제로 작동한다 (학습 효과)",
          lead: '연습할수록 점수가 실제로 오른다 — <span class="hl">반복 시 +27점·89% 향상</span>.',
          points: [
            "N-back 첫 판 66점 → 3판 77점(+11), 3회 이상 연습 시 <b>평균 +27점·89% 향상</b>",
            "첫 점수 낮은 층(50점 미만)이 17.8회로 최다 연습 → 낮은 점수는 이탈 아닌 동기 신호",
            "게임 내 완주율 100% → 이탈은 게임이 아니라 '첫 플레이까지의 유입'에서만 발생",
            "결론: 레버는 '마찰 제거'가 아니라 '향상 가시화 + 초반 2~3판 반복 유도'",
          ],
          chart: {
            type: "bar",
            title: "N-back 반복 플레이 — 점수가 실제로 오른다 (학습 효과)",
            labels: ["1판", "2판", "3판", "4판", "5판", "6판"],
            datasets: [{ label: "평균 점수", data: [66, 70, 77, 75, 75, 78] }],
            note: "첫 판 66 → 3판 77(+11)로 도약, 반복할수록 78점대. 3회+ 연습 세션은 평균 +27점·89% 향상",
          },
          table: {
            headers: ["첫 점수대", "세션 수", "평균 플레이 수"],
            rows: [
              ["낮음 (50점 미만)", "51", "17.8회 — 가장 많이 연습"],
              ["중간 (50–79)", "97", "9.4회"],
              ["높음 (80+)", "101", "8.6회"],
            ],
          },
        },
        {
          title: "6. 개선 — 분석을 다시 제품으로 (실제 배포)",
          lead: '분석을 <span class="hl">제품 개선으로 되돌려 실제 배포</span> — 만들고·측정·분석·개선 한 바퀴.',
          points: [
            "리텐션: 결과 화면에 '지난 판 +N점·개인 최고·2번째 판 넛지·연속 출석' → 재플레이 유도",
            "유입: 공유 버튼에 UTM(source=share) → (direct)로 묻히던 바이럴 측정 가능",
            "측정 정확도: GA4 예약어 'source' 오염 버그 → 'ui_source'로 분리 + 로그에 버전(v2) 태깅",
          ],
        },
        {
          title: "7. 업데이트 — 실사용자 피드백으로 서비스를 다시 키우다 (운영 중)",
          lead: '피드백 → 며칠 안에 배포 → 다시 피드백 — <span class="hl">계속 도는 루프</span>.',
          points: [
            "사용자 요청 반영: 게임 4종 → 9종 확장, 전 게임 실전모드(정답 비공개·제한시간)",
            "난이도는 실제 AI 역량검사 경험을 살려 '오르되 중간에 쉬운 문제가 섞이는' 램프로 구현",
            "익명 피드백 창구(Supabase·도배 방지) + 플레이 데이터 기반 맞춤 피드백(표본 적으면 침묵)",
          ],
          callout:
            "💡 사용자 피드백 → 며칠 안에 배포 → 다시 피드백. 만들고 → 측정 → 분석 → 개선의 사이클이 한 바퀴가 아니라 '계속 도는 루프'가 됐습니다.",
        },
      ],
      resultStats: [
        { value: "800+", label: "멀티채널 활성 사용자" },
        { value: "79%", label: "재플레이율 — 세션당 평균 13회" },
        { value: "+27점", label: "반복 연습 시 점수 향상 (89% 개선)" },
      ],
      results: [
        "유입 1위 에브리타임은 완료율 21.8%, 유입 절반 링커리어는 75.9% — '유입량 ≠ 성과'",
        "네이버는 진입→완료 87.7%·세션 참여율 86% — 검색 유입의 높은 의도 확인",
        "행동 로그 5,363건: 재플레이 79%·세션당 13회·재방문 26% — 고착도는 충분, 병목은 유입",
        "완주율 100%·반복 시 +27점(89%)·첫 점수 낮은 층이 17.8회 최다 연습 — 레버는 '향상 가시화'",
        "분석을 실제 배포: 2번째 판 넛지·공유 UTM·GA4 소스오염(not set) 수정·v2 태깅",
        "피드백 받아 4→9종·전 게임 실전모드·익명 피드백 창구·맞춤 피드백 — 루프 상시 운영",
      ],
      retro: [
        "유입 1위(에브리타임)와 몰입·재방문 1위(링커리어·네이버)가 정반대 — 지표는 '양' 아닌 '목적에 맞는 질'",
        "만들고→측정→분석→개선을 직접 한 바퀴 — 다음은 코호트 재방문·게임별 이탈 단계까지 확장 계획",
      ],
    },
  },
  {
    key: "channel-device",
    hidden: true,
    domain: "product",
    domainLabel: "GA4·측정 분석",
    title: "측정의 함정 — 채널 재방문율, 행동이 아니라 기기 탓?",
    summary:
      "에브리타임이 '질 낮은 일회성 트래픽'처럼 보였지만, 채널×기기 교차분석으로 그게 사용자 행동이 아니라 모바일 측정의 한계가 만든 착시임을 밝히고 보정한 분석 — 데이터를 액면 그대로 믿지 않고 '측정 자체를 의심'한 사례.",
    period: "2026.06.01 ~ 06.09",
    type: "GA4 심층 분석 · jobda-trainer",
    tools: ["GA4 (탐색 분석)", "채널×기기 교차분석", "데이터 보정"],
    metric: { value: "3.4×", label: "같은 채널 PC vs 모바일 재방문율 격차" },
    chip: "측정 한계 진단 · 채널×기기 교차분석",
    detail: {
      objective:
        "GA4에서 에브리타임 채널의 재방문율이 비정상적으로 낮게 잡히던 현상을, '일회성 트래픽'으로 단정하지 않고 측정 방법론 자체를 의심해 검증·보정한 분석입니다. 핵심은 채널 비교가 아니라 '측정 환경이 데이터를 어떻게 왜곡하는가'를 밝힌 데 있습니다.",
      question: "에브리타임은 정말 '질 낮은 일회성 트래픽'일까, 아니면 측정이 그렇게 보이게 만든 걸까?",
      data: {
        source: "자체 운영 사이트 jobda-trainer.vercel.app · GA4 탐색 분석 (첫 사용자 소스/매체 기준)",
        period: "2026.06.01 ~ 06.09",
        scale: "활성 사용자 556명 · 세션 472건 · 모바일 57% / 데스크톱 40% / 태블릿 3%",
        preprocessing: [],
      },
      sections: [
        {
          title: "1. 1차 관찰 — 채널별 '양'과 '질'이 정반대",
          lead: '유입 1위 에브리타임이 <span class="hl">재방문·체류는 꼴찌</span> — 표면상 \'질 낮은 트래픽\'.',
          points: [
            "에브리타임 264명(47%) 1위지만 재방문율 7.6%·참여 2분 17초로 최저",
            "링커리어는 양 절반(111명)인데 재방문율 47.7%·참여 27분 30초로 정반대",
            "표면 해석: '에브리타임=일회성, 링커리어=고가치' (헤더 클릭 시 정렬)",
          ],
          table: {
            sortable: true,
            headers: ["채널", "사용자", "비율", "재방문자", "평균 참여시간", "사용자당 세션"],
            rows: [
              ["everytime / referral", "264", "47.5%", "20", "2분 17초", "0.75"],
              ["linkareer / referral", "111", "20.0%", "53", "27분 30초", "1.78"],
              ["(direct)", "86", "15.5%", "33", "23분 48초", "1.97"],
              ["naver / organic", "43", "7.7%", "20", "38분 59초", "2.51"],
              ["bing / organic", "20", "3.6%", "6", "24분 15초", "1.25"],
              ["instagram", "8", "1.4%", "3", "12분 07초", "1.38"],
              ["tistory", "7", "1.3%", "3", "30분 13초", "2.14"],
            ],
          },
          callout:
            "💡 표면 해석: '에브리타임은 양만 많고 질 낮은 일회성 트래픽이다.' — 그러나 이 결론엔 측정 방법론상의 함정이 숨어 있습니다.",
        },
        {
          title: "2. 가설 — 낮은 재방문율은 '행동'이 아니라 '측정' 탓일 수 있다",
          lead: '에브리타임은 모바일 의존도↑ → <span class="hl">쿠키 식별 한계로 재방문이 과소집계</span>됐을 수 있다.',
          points: [
            "모바일은 PC보다 쿠키 유지력이 낮음",
            "인앱 브라우저 → 사파리·크롬 재진입 시 다른 쿠키로 '신규' 중복 카운트",
            "iOS ITP가 1st-party 쿠키도 7일 후 만료 (대학생층=아이폰↑ → 영향 큼)",
          ],
          callout:
            "💡 가설: 낮은 재방문율 = 사용자가 안 돌아온 게 아니라, 측정이 '같은 사람'을 못 알아본 것.",
        },
        {
          title: "3. 검증 — 채널 × 기기 교차분석",
          lead: '같은 채널을 기기로 쪼개니 <span class="hl">PC vs 모바일 재방문율 3.4배 차</span> — 행동이 아니라 측정 차이.',
          points: [
            "에브리타임 모바일 비율 87.9% (전체 평균 57%)로 압도적",
            "에브리타임 PC 19.2% vs 모바일 5.6%(약 3.4배) · 세션 시간 12분 vs 2분(약 5배)",
            "기기별 퍼널 완료율도 PC 78.2% vs 모바일 24.7%(약 3배, 6/1~12·889명)",
            "단, 모바일 저조엔 실제 UX 차이(키보드형 게임은 PC 유리)도 섞여 분리 해석",
          ],
          chart: {
            type: "groupedBar",
            title: "같은 채널, PC vs 모바일 재방문율 — 행동이 아니라 측정 차이",
            labels: ["에브리타임", "링커리어"],
            datasets: [
              { label: "PC 재방문율(%)", data: [19.2, 49.4] },
              { label: "모바일 재방문율(%)", data: [5.6, 38.2] },
            ],
            note: "에브리타임 PC 19.2% vs 모바일 5.6% = 약 3.4배. 세션 시간도 12분 vs 2분(약 5배). 같은 채널인데 기기로 갈림.",
          },
          table: {
            sortable: true,
            headers: ["채널", "모바일", "데스크톱", "태블릿", "합계", "모바일 비율"],
            rows: [
              ["everytime", "232", "26", "6", "264", "87.9%"],
              ["linkareer", "34", "83", "1", "118", "28.8%"],
              ["(direct)", "37", "43", "6", "86", "43.0%"],
              ["naver", "0", "43", "0", "43", "0%"],
              ["bing", "0", "23", "0", "23", "0%"],
              ["tistory", "1", "13", "0", "14", "7.1%"],
              ["instagram", "7", "1", "0", "8", "87.5%"],
            ],
          },
          callout:
            "🔑 같은 채널·같은 콘텐츠인데 기기에 따라 재방문율이 최대 약 3.4배 차이 → '행동 차이'가 아니라 '측정 왜곡'.",
        },
        {
          title: "4. 보정 — '측정 손실'을 걷어내고 다시 본 채널 가치",
          lead: 'PC를 기준선으로 보정하니 <span class="hl">에브리타임은 \'일회성\'이 아니라 \'도달·인지\' 채널</span>.',
          points: [
            "에브리타임 PC 재방문율 19.2%를 모바일 232명에 적용 → 실제 재방문 약 45명(보고 13명)",
            "최대 ~71% 측정 손실 추정 — 단, PC는 자기선택 집단이라 '상한 추정'으로 해석",
            "재해석: 에브리타임=도달·인지 / 링커리어 PC=최고 가치 / 티스토리 PC=재방문 61.5% 미실현 잠재력",
          ],
          table: {
            sortable: false,
            headers: ["채널", "표면 데이터", "보정 해석", "진짜 가치"],
            rows: [
              ["에브리타임 모바일", "232명 / 재방문 5.6% / 1분 03초", "측정 손실 큼 (실제 사용자 200~220 추정)", "도달·인지 채널"],
              ["링커리어 PC", "83명 / 재방문 49.4% / 20분 54초", "측정 신뢰도 높음 → 그대로 신뢰", "⭐ 최고 가치 채널"],
              ["링커리어 모바일", "34명 / 재방문 38.2% / 10분 34초", "약간의 손실, 양호", "양호"],
              ["naver organic", "43명 / 재방문 34.9% / 21분 02초", "전부 PC, 신뢰도 높음", "검색 SEO 우수"],
              ["bing organic", "23명 / 재방문 34.8% / 26분 30초", "전부 PC, 신뢰도 높음", "보너스 채널 우수"],
              ["tistory PC", "13명 / 재방문 61.5% / 14분 53초", "양 적지만 질 최고", "⭐ 잠재력 미실현"],
            ],
          },
          callout:
            "💡 '측정 손실 상한 약 71%'는 단정이 아니라 보정 추정입니다 — 측정 한계와 실제 행동이 섞인 값으로 정직하게 해석했습니다.",
        },
        {
          title: "5. 인사이트 — '데이터를 믿기 전에 측정을 의심한다'",
          lead: '단일 지표는 오판을 부른다 — <span class="hl">\'어떻게 측정됐는가\'를 먼저 본다</span>.',
          points: [
            "측정 환경(기기·브라우저·OS)이 같은 행동도 다르게 기록 → 단일 지표 평가는 오판",
            "GA4 신규/재방문은 모바일 시대에 신뢰도 제한적 → 참여율·체류·이벤트로 보완",
            "추적 신뢰도: PC > 일반 모바일 브라우저 > 인앱 브라우저",
            "액션: 링커리어 추가 투자 · 티스토리 SEO 보강 · 에브리타임은 인지 채널 · Google Signals·다중 지표 대시보드 도입",
          ],
          callout:
            "🔑 일반 분석(수집 → 지표 → 인사이트 → 결정)에 '이상치 발견 → 방법론 의심 → 가설 → 교차검증 → 보정'을 끼워 오판을 막은 사례.",
        },
      ],
      resultStats: [
        { value: "87.9%", label: "에브리타임 모바일 비율 (전체 57%)" },
        { value: "3.4×", label: "에타 PC vs 모바일 재방문율 격차" },
        { value: "~71%", label: "추정 측정 손실 (상한)" },
      ],
      results: [
        "기기로 쪼개니 재방문율 PC 19.2% vs 모바일 5.6%(3.4배)·세션 약 5배 차 → 측정 왜곡",
        "PC 기준선 보정 시 에브리타임 실제 재방문 약 45명(보고 13명), 최대 ~71% 손실 추정",
        "재해석: 에브리타임=도달·인지 / 링커리어 PC=최고 가치 / 티스토리 PC=잠재력",
        "측정 개선: Google Signals + 참여율·체류·이벤트 중심 다중 지표로 보완",
      ],
      retro: [
        "PC 기준선 보정은 측정 손실·실제 행동이 섞여 '상한 추정'으로만 해석 — 단정하지 않음",
        "근본 해결은 Google Signals·서버사이드·로그인 식별 등 측정 인프라 보강 — '어떻게 측정됐는가'를 먼저 보는 습관 체득",
      ],
    },
  },
];
