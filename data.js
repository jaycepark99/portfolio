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
  modoodoc:  { label: "세일즈·운영·실행가", featured: "abtest", show: ["dashboard", "trainer", "growth"] },
  freewillin: { label: "전략기획·데이터 의사결정·바이브코딩", featured: "abtest", show: ["dashboard", "trainer", "growth"] },
  loreal:     { label: "채널 KPI·대시보드·데이터 품질", featured: "abtest", show: ["dashboard", "growth", "trainer", "churn"] },
  willog:     { label: "경영지표·KPI 대시보드·실행", featured: "abtest", show: ["dashboard", "growth", "trainer"] },
  jinhak:     { label: "합격예측 모델링·서비스 데이터 분석", featured: "abtest", show: ["churn", "trainer", "growth"] },
  codeit:     { label: "이탈 예측·통계·학습 데이터 분석·바이브코딩", featured: "churn", show: ["trainer", "abtest", "dashboard"] },
  woowa:      { label: "운영 지표 분석·이탈/수급·실험", featured: "abtest", show: ["dashboard", "churn", "growth", "trainer"] },
  musinsa:    { label: "바이브코딩·AI 모델 평가·실험·대시보드 자동화", featured: "trainer", show: ["churn", "abtest", "dashboard"] },
  danggeun:   { label: "현장 운영 개선·VOC·자동화·AI 빌드", featured: "abtest", show: ["dashboard", "trainer", "growth"] },
  levit:      { label: "AI 제품 직접 빌드·PMF 검증·고객 문제 발굴", featured: "trainer", show: ["dashboard", "growth", "abtest"] },
  wrtn:       { label: "AI 에이전트·자동화 직접 빌드 · LLM·프롬프트 · 측정 운영", featured: "trainer", show: ["dashboard", "abtest", "churn"] },
};

const HERO_STATS = [
  { value: "+25.7%", label: "A/B 테스트 1인당 매출 개선" },
  { value: "74%", label: "이탈자가 '저수익' 고객 (수익 진단)" },
  { value: "98%", label: "운영 집계 시간 단축" },
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
    type: "직접 운영하는 매장 · 실데이터",
    tools: ["SQL", "Python", "A/B Test", "Tableau"],
    metric: { value: "+25.7%", label: "1인당 매출(ARPU)" },
    chip: "가설 설계와 통계적 검증",
    detail: {
      objective:
        "직접 운영하는 매장 포함 셀프빨래방 3개 지점 중 C지점 매출이 약 18% 낮았습니다. 매출 격차의 '원인'을 데이터로 진단하고, 실행 가능한 개선안을 설계·검증하는 것이 목표였습니다.",
      question: "C지점 매출이 낮은 진짜 원인은 고객 수일까, 객단가일까? 그리고 어떻게 올릴 수 있을까?",
      data: {
        source: "본인 운영 매장 포함 3개 지점 충전 데이터",
        period: "2024년 전체",
        scale: "충전·결제 거래 데이터 (SQL 통합 데이터 마트 구축)",
        preprocessing: [
          "3개 지점 충전 데이터를 SQL로 통합·표준화 (지점코드 매핑, 날짜 형식 표준화)",
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
            note: "Source: 3개 지점 충전 데이터",
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
            "배경: C지점은 외국인·단기 손님 비중이 높고 인근에 경쟁 빨래방 2곳 — 외국인 업셀보다 '가격 민감한 단골이 경쟁점으로 이탈하지 않게' 붙잡는 차별화가 필요",
            "가설: 2만원 이상 충전 시 인센티브 → 고액 전환·충전율 개선 → 코호트 매출 상승",
            "전략: 1만원(Low) → 2만원 이상 혜택 → 객단가 상승(High)의 단계 전환. 충전 잔액 자체가 재방문을 부르는 lock-in이라 일회성 프로모션이 아님",
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
          lead: '1인당 매출 +25.7%의 <span class="hl">동력은 \'전환(충전율)\'</span> — 단가 상승보다 "더 많은 사람이 충전"이 핵심.',
          points: [
            "충전율 14.2% → 18.2% (+4.0%p, χ² p≈0.006 유의)",
            "2만원 이상 비중 28.4% → 38.1% (+9.7%p, z-test p≈0.03 유의)",
            "평균 충전액 +1,620원(p≈0.07 경계) · 1인당 매출 +25.7%(3,433 → 4,316원)",
            "→ ARPU 상승의 통계적 동력은 단가(평균충전액·경계)가 아니라 전환(충전율·유의) — '얼마나'보다 '몇 명이' 충전했나",
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
    summary: "결제 데이터 5.7만 건 통합 데이터 마트 → Tableau·Looker 시각화 → 파일 드래그 자동 반영 웹 대시보드 직접 개발까지, 수기 집계의 비효율을 단계적으로 제거",
    period: "2025.01 ~ 2026.01",
    type: "직접 운영하는 매장 · 실데이터",
    tools: ["SQL", "Tableau", "Looker Studio", "Google Sheets"],
    metric: { value: "98%↓", label: "집계 시간\n(주 2h → 월 10분)" },
    chip: "KPI 대시보드 · 데이터 정합성",
    detail: {
      objective:
        "수기 집계(주 2시간)와 데이터 누락 리스크로 운영 결정이 직관에 의존하던 상황. 일일 입력만으로 갱신되는 실시간 대시보드 환경을 만들어 의사결정을 데이터 기반으로 전환하는 것이 목표였습니다.",
      question: "점주가 매일 부담 없이 입력만 하면, 운영 현황이 자동으로 보이는 환경을 만들 수 있을까?",
      data: {
        source: "3개 지점 결제 데이터 + Google Sheets 일일 입력",
        period: "2022 ~ 2026 (운영 전체 기간, 현재 진행형)",
        scale: "결제 데이터 5.7만 건 통합 분석용 데이터 마트",
        preprocessing: [
          "자판기 동전교환 보정 (계수 0.7)",
          "지점 코드 매핑 / 결측치 처리 / 날짜 형식 표준화",
          "혼합 데이터로 충전내역·지출·월별 요약 등 다중 소스 통합",
        ],
      },
      sections: [
        {
          title: "1. 데이터 전처리 — 정합성 확보와 확장성",
          lead: '3개 지점 결제 데이터 <span class="hl">5.7만 건을 하나의 데이터 마트로 통합</span> — 정합성·확장성 확보.',
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
            title: "결제 데이터 통합 마트 전처리",
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
            "💡 수기 주 2시간 → BI 주 20분(83%↓) → 자체 웹 월 10분(최종 98%↓) + 데이터 누락 리스크 제거.",
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
            "결제 엑셀/CSV를 드래그 → 충전·자판기·지출 시트 자동 인식 → KPI·손익·고객 분석 즉시 갱신",
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
        { value: "98%↓", label: "집계 시간 (주 2h → 월 10분)" },
        { value: "5.7만 건", label: "통합 결제 데이터" },
        { value: "3개 지점", label: "실시간 트래킹" },
      ],
      results: [
        "주 2시간 수기 집계 → 월 10분, 약 98% 단축 (BI 단계 주 20분 83%↓ 경유)",
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
    title: "이커머스 고객 세분화 & 신규 유입 진단",
    summary: "RFM 5등급 세분화로 고객 base의 건강성(상위 고객 기여·91% 재구매)을 확인하고, 신규 유입이 2012→2013 73% 급감했음을 규명 — '유지는 강한데 성장 엔진이 꺼지는' 위기를 진단",
    period: "2024.07 ~ 2024.08",
    type: "제로베이스 데이터 분석 스쿨 · 팀 (4인 · 팀장)",
    tools: ["SQL", "Python", "BigQuery", "RFM"],
    metric: { value: "73%↓", label: "신규 유입 급감 진단 (2012→2013)" },
    chip: "RFM 세분화 · 유입 진단",
    detail: {
      objective:
        "외형 성장 중인 이커머스의 고객 base가 건강한지(세분화·유지)와 성장 엔진(신규 유입)이 작동하는지를 진단하는 것이 목표였습니다. 4인 팀 리더로 BigQuery 3-테이블 조인부터 분석·전략까지 주도했습니다.",
      question: "우량 고객은 누구이고 잘 유지되는가? 그리고 외형 성장이 진짜 건강한가 — 신규는 들어오고 있는가?",
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
          lead: '<span class="hl">Books·Electronics가 매출의 48%</span> — 비중은 크지만 성장은 정체(Books −8%).',
          points: [
            "Books 26% · Electronics 22% → 합산 매출의 48%, 비중 1·2위",
            "단 YoY(2012→2013)로 보면 정체: Books −8%·Footwear −5%, 성장은 Home&Kitchen +5%·Clothing +4% 정도",
          ],
          chart: {
            type: "bar",
            title: "카테고리별 매출 비중 (%)",
            labels: ["Books", "Electronics", "Home&Kitchen", "Clothing", "Footwear", "Bags"],
            datasets: [{ label: "비중(%)", data: [26, 22, 17, 13, 13, 9] }],
            unit: "%",
          },
          table: {
            headers: ["카테고리", "매출 비중", "YoY(’12→’13)", "변동계수(CV)"],
            rows: [
              ["Books", "26%", "−8%", "0.19"],
              ["Electronics", "22%", "−0%", "0.17"],
              ["Home&Kitchen", "17%", "+5%", "0.20"],
              ["Clothing", "13%", "+4%", "0.24"],
              ["Footwear", "13%", "−5%", "0.25"],
              ["Bags", "9%", "+3%", "0.31"],
            ],
          },
        },
        {
          title: "2. RFM 세분화 — base는 건강한가",
          lead: 'R·F·M 정규화 → <span class="hl">5등급 분류</span> · 91% 재구매 — 기존 고객 base는 탄탄.',
          points: [
            "Recency·Frequency·Monetary를 minmax_scale로 0~1 정규화 (Recency는 역전)",
            "합산 점수 백분위화 → Diamond 3%·Platinum 12%·Gold 20%·Silver 45%·Bronze 20%",
            "상위 3%(Diamond)가 매출 9%·상위 15%(D+P)가 매출 32% 기여 · 전체 91%가 재구매(평균 3.8회) → 충성 base",
            "단 등급별 카테고리 선호는 거의 동일(전 등급 Books~25%·Electronics~22%) → 카테고리 전략은 등급 무관 범용으로",
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
          title: "3. 🔥 신규 유입 급감 — 성장 엔진 경보",
          lead: '활성 고객은 유지되는데 <span class="hl">신규 유입이 73% 급감</span> — 외형 성장의 함정.',
          points: [
            "신규 고객: 2012년 1,324명(활성의 34%) → 2013년 359명(9%) = 약 73% 감소",
            "활성 고객 수는 ~3,950명으로 유지 → 사실상 '같은 기존 고객'으로 매출을 버티는 중",
            "시나리오(경쟁사 등장·성장 둔화 우려)와 정확히 일치 — RFM(지금 누가 우량한가)만으론 못 잡는 위기",
          ],
          chart: {
            type: "groupedBar",
            title: "연도별 신규 vs 기존 고객 (명)",
            labels: ["2012", "2013"],
            datasets: [
              { label: "신규 고객", data: [1324, 359] },
              { label: "기존 고객", data: [2620, 3591] },
            ],
          },
        },
        {
          title: "4. 전략 — 유지 강점은 살리고, 유입 위기에 대응",
          lead: '<span class="hl">유지는 강하니 지키고, 유입은 끊겼으니 막는다</span> — 두 갈래 처방.',
          points: [
            "유지(강점): 충성 base를 등급별로 관리·크로스셀 (카테고리는 등급 무관이라 범용 추천이 효율적)",
            "유입(위기): 신규 획득 채널·온보딩 점검이 최우선 — 기존 고객 의존은 경쟁 심화 시 매출 하락으로 직결",
            "객단가 레버: 중간 등급 20%를 한 단계 승급 유도 시 전체 매출 약 +10% 추정(가정 기대치)",
          ],
          callout:
            "💡 진짜 처방은 '승급'보다 '유입'. 중간 등급 20% 승급 효과는 +10%(가정·1단계 승급 시 평균 구매금액 +54%) — 단 신규 유입 73% 급감이 더 큰 리스크라 획득 채널 재점검이 우선.",
        },
      ],
      resultStats: [
        { value: "73%↓", label: "신규 유입 급감 (2012→2013)" },
        { value: "91%", label: "기존 고객 재구매율 (평균 3.8회)" },
        { value: "9%", label: "Diamond(상위 3%) 매출 기여" },
      ],
      results: [
        "RFM 5등급 세분화 → 상위 3%(Diamond)가 매출 9%·전체 91% 재구매로 base 건강성 확인",
        "신규 유입 2012→2013 약 73% 급감 규명 → '외형 유지, 성장 엔진 정지' 위기 진단",
        "등급별 카테고리 선호는 거의 동일함을 확인 → 등급별 차별 마케팅보다 유입·범용 추천에 집중 권고",
      ],
      proposal: [
        { title: "유입 — 신규 획득 채널 재점검", desc: "신규 유입 73% 급감이 최대 리스크. 획득 경로·온보딩·첫 구매 전환 진단이 1순위" },
        { title: "유지 — 충성 base 잠금", desc: "91% 재구매 강점 유지: 상위 등급 VIP 케어 + 이탈 시점 코호트 모니터링" },
        { title: "객단가 — 중간 등급 승급", desc: "Silver→Gold 승급 유도(1단계 +54%), 단 효과는 A/B로 검증 후 확대" },
      ],
      retro: [
        "초기 RFM·승급 효과(+8%·+95%)는 과대 산출이었음 → 실제 데이터 재계산으로 Diamond 기여 9%·승급 +54%·전체 +10%로 정정",
        "데이터가 가리킨 진짜 신호는 '신규 유입 급감'인데 RFM만으론 못 잡음 → 진단 범위를 '유지+유입'으로 넓혀야 함",
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
    title: "신용카드 고객 이탈 예측 및 수익 기반 가치 분석",
    summary: "이탈 예측 모델(ROC-AUC 0.987)을 규칙으로 번역하고, 가치를 '추정 수익(수수료+이자)'으로 재정의해 수익 × 이탈위험으로 세분화 — 이탈자의 74%가 저수익(완납·소액) 고객임을 데이터로 규명",
    period: "2024.08 ~ 2024.09",
    type: "제로베이스 데이터 분석 스쿨 · 팀 (5인 · 리더)",
    tools: ["Python", "RandomForest", "Decision Tree", "고객 수익 세분화"],
    metric: { value: "74%", label: "이탈자가 '저수익(완납·소액)' 고객 (수익 진단)" },
    chip: "거래 데이터 모델링 · 수익 가치",
    detail: {
      objective:
        "신규/기존 고객을 실시간으로 스코어링할 이탈 예측 모델을 만들고, 고객을 '추정 수익(가치)'으로 세분화해 누구부터 어떻게 방어할지 우선순위를 설계하는 것이 목표였습니다. 프로젝트 리더로서 일정 관리와 분석 전 과정의 팀 협업을 주도했습니다.",
      question: "누가 이탈하고(예측), 그중 회사에 실제 수익을 주는 고객은 누구인가(가치)? — 둘을 곱해 방어 우선순위를 정한다.",
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
          title: "1. EDA — 이탈은 '행동'이 가른다 (인구통계 아님)",
          lead: '나이·성별·소득은 거의 무관(단일 AUC ~0.51), <span class="hl">이탈을 가르는 건 거래·관계 행동</span>.',
          points: [
            "전체 이탈률 16.07% (불균형 1:5)",
            "거래횟수: 연 60회가 절벽 — 미만 31~37% vs 이상 1~6% 이탈 (단일 변수 AUC 0.80)",
            "완납자(리볼빙=0) 이탈 36% vs 잔액 보유 고객 9.6% — 이자 안 내는 '거래형'이 떠나기 쉬움",
            "고객센터 접촉 늘수록 이탈 단조 증가(2%→100%)·분기 거래 반토막 시 49% — 조기경보 신호",
            "인구통계(나이·성별·부양가족·가입기간) AUC ~0.51로 무용 → 모델·세분화는 행동 중심",
          ],
          image: {
            src: "img/churn-eda.png",
            caption: "이탈 vs 비이탈 핵심 변수 분포(KDE) — 거래 활동성에서 뚜렷한 차이",
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
          title: "4. 이탈 규칙 추출 (RF → Decision Tree)",
          lead: 'RF를 규칙으로 번역하니 <span class="hl">공통 레버는 \'거래 빈도\'</span> — 연 60회가 분기점.',
          points: [
            "RF 상위 변수 → Decision Tree 규칙(Gini≤0.2·샘플≥400)으로 사람이 읽는 IF-THEN 추출",
            "규칙들이 공통으로 가리킨 핵심 = 거래 빈도. 연 60회 미만 31~37% vs 이상 1~6% 이탈",
            "규칙1(이탈 92%)은 회생 어려워 타깃 제외(triage) — 살릴 수 있는 중위험에 집중",
          ],
          chart: {
            type: "bar",
            title: "거래횟수 구간별 이탈률 (%) — 60회가 절벽",
            labels: ["~40회", "40-60회", "60-80회", "80회+"],
            datasets: [{ label: "이탈률(%)", data: [31.5, 37.0, 5.8, 1.2] }],
            unit: "%",
          },
        },
        {
          title: "5. 가치 = '추정 수익' × 이탈위험 세분화",
          lead: '카드 수익은 <span class="hl">결제 수수료 + 리볼빙 이자</span> — 이자가 ~60%라 완납자는 저수익+고이탈.',
          points: [
            "추정 연수익 = 결제액×1.5%(수수료) + 리볼빙잔액×18%(이자) — 업계 표준 요율 기반",
            "옛 LTV는 리볼빙을 깎는 항이었지만, 사실 이자가 카드 수익의 ~60% → 알짜는 리볼빙 고객",
            "pd.qcut으로 수익 5등급, 산점도(수익 × 이탈확률)로 우상단=고수익 위험군 우선 방어",
          ],
          image: {
            src: "img/churn-ltv-scatter.png",
            caption: "추정 수익 vs 이탈확률 (색 = 수익 5등급). 고수익(리볼빙) 고객은 왼쪽(저이탈)에 몰리고, 이탈은 저수익(완납·소액)에 집중",
            kind: "capture",
          },
          code: {
            lang: "python",
            title: "추정 수익(가치) 산출 — 카드사 수익 구조 기반",
            body:
`# 카드사 실제 수익원 = 결제 수수료(인터체인지) + 리볼빙 이자
INTERCHANGE, APR = 0.015, 0.18              # 업계 표준 요율
df['est_revenue'] = (df['Total_Trans_Amt'] * INTERCHANGE   # 결제 수수료
                     + df['Total_Revolving_Bal'] * APR)    # 리볼빙 이자

# 수익 기반 가치 5등급 (이탈위험과 독립된 '가치' 축)
df['value_tier'] = pd.qcut(df['est_revenue'], q=[0,.10,.50,.80,.95,1.0],
    labels=['V.Low','Low','Medium','High','V.High'])`,
          },
        },
        {
          title: "6. 수익 가치 등급별 이탈 — 누구부터 어떻게",
          lead: '<span class="hl">이탈자의 74%가 하위 2등급(저수익)</span> — 블랭킷 방어 대신 가치 등급별 차등.',
          points: [
            "이탈은 최저수익(완납·소액) Very Low 등급에 집중(64%), 고수익 리볼빙 고객은 끈끈(~10%)",
            "저수익 고이탈군 = 가치 전환(리볼빙·상품 cross-sell)·저비용 / 고가치 위험군 = 집중 방어",
            "단 Very High(상위 5%)도 11% 이탈 → 소수지만 ROI 큰 우선 방어 대상",
          ],
          table: {
            headers: ["수익 가치 등급", "인원", "추정수익(연)", "이탈률"],
            rows: [
              ["Very Low (완납·소액)", "304", "$30", "64%"],
              ["Low", "1,216", "$172", "14%"],
              ["Medium", "911", "$351", "5%"],
              ["High", "456", "$464", "13%"],
              ["Very High (VIP)", "152", "$570", "11%"],
            ],
          },
        },
      ],
      resultStats: [
        { value: "74%", label: "이탈자 중 저수익(하위 2등급) 비중" },
        { value: "0.987", label: "ROC-AUC (이탈 예측·배포용)" },
        { value: "3.6배", label: "완납자 이탈률 (36% vs 9.6%)" },
        { value: "0.80", label: "단일 변수(거래횟수) AUC" },
      ],
      results: [
        "RandomForest ROC-AUC 0.987 — 신규/기존 고객 실시간 스코어링용 배포 모델",
        "가치를 '추정 수익(수수료+이자)'으로 재정의 → 옛 LTV가 놓친 이자 수익(60%) 반영",
        "이탈자의 74%가 저수익(완납·소액)임을 규명 → 수익 등급별 차등 방어로 우선순위화",
      ],
      proposal: [
        { title: "저수익 고이탈군 — 가치 전환", desc: "완납·소액 고객에 리볼빙·상품 cross-sell 유도, 비용은 저비용 자동 채널로" },
        { title: "고수익 위험군 — 집중 방어", desc: "리볼빙 고객 중 거래 꺾임(Q4/Q1↓·접촉↑) 감지 시 전담 리텐션" },
        { title: "조기경보 운영", desc: "거래 빈도·고객센터 접촉을 선행 지표로 모니터링, 거래 0 되기 전 개입" },
      ],
      retro: [
        "이탈 예측은 이 데이터에선 거의 자명(거래 끊김=이탈) — 가치는 '배포용 스코어링'에, 진짜 인사이트는 '수익 관점 진단'에 있음",
        "추정 수익은 수수료 1.5%·이자 18% 가정값 → 실제 고객별 요율로 민감도 검증 필요",
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
    type: "온코크로스 인턴 · 개인 수행",
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
            "핵심 이슈는 19개 클래스 간 심한 불균형(19개 중 7개만 1,000쌍↑) · EDA상 효소 2D6·2C19 중요도 최상위 → 히스타민 길항제 관련 DDI에 핵심임을 시사",
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
            "Base 0.75 → GridSearch 튜닝 0.80 → SMOTE 적용 0.92 (정확도뿐 아니라 Precision 0.85·Recall 0.88·F1 0.90)",
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
            "기존 연구 대비 Precision +14%·Recall +11% · 실제 약물 '지프라시돈' 상호작용 예측 성공으로 실용성 입증",
          ],
          callout:
            "💡 초기 단계에서 잠재 상호작용을 예측 → 임상 실패 비용 최소화 + 후보 물질 스크리닝 가속, 부작용 리스크 사전 차단",
        },
        {
          title: "7. 일반화 검증 — 비승인(미지) 약물 셋",
          lead: '학습셋 0.92 vs <span class="hl">비승인 약물 검증셋 F1 ~0.6</span> — 일반화 한계를 정직하게.',
          points: [
            "92%는 학습/테스트(SMOTE 균형) 기준 — 한 번도 안 본 비승인 약물엔 F1이 0.6대로 하락",
            "샘플 많은 Class 3(570쌍)·Class 4(670쌍)는 F1 0.59~0.64로 상대적 신뢰 / 샘플 적은 Class 17(10쌍)은 0.38로 불안정",
            "→ '아는 유형'엔 강하나 신약 일반화는 별도 — 표본 보강 + 도메인 특화(2D6·2C19)가 다음 과제",
          ],
          table: {
            headers: ["DDI 유형", "Precision", "Recall", "F1", "약물쌍"],
            rows: [
              ["Class 4", "0.65", "0.67", "0.59", "670"],
              ["Class 3", "0.73", "0.57", "0.64", "570"],
              ["Class 6", "0.71", "0.73", "0.60", "165"],
              ["Class 17", "0.46", "0.45", "0.38", "10"],
              ["Class 15", "0.68", "0.75", "0.65", "7"],
            ],
          },
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
        "학습 0.92 vs 비승인 약물 검증 F1 ~0.6 — '아는 유형'엔 강하나 신약 일반화는 표본·도메인 특화(2D6·2C19) 보강 필요(SMOTE 균형 효과도 감안)",
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
    title: "AI 역량검사 연습 사이트 — 직접 만들어 운영·개선하는 서비스",
    summary:
      "AI 역량검사를 연습하려 했지만 공식 체험은 매번 번거로운 사전 절차를 거쳐야 해 마음 편히 반복하기 어려웠습니다. 그래서 절차 없이 바로·무제한으로 연습할 수 있는 사이트를 Claude Code 바이브코딩으로 직접 만들어 배포했습니다. GA4·GTM·UTM으로 측정 인프라를 깔고, 실사용자 피드백을 받아 게임 4종 → 9종으로 키우며, 만들고 → 측정 → 분석 → 개선을 며칠 단위로 도는 루프를 혼자 운영 중입니다.",
    period: "2026.05 ~ (운영 중)",
    type: "개인 프로젝트 · 바이브코딩",
    tools: ["Claude Code", "Vite·React", "Supabase", "Vercel", "GA4·GTM·UTM"],
    metric: { value: "6,500+", label: "활성 사용자\n(배포 약 3주 만에)" },
    chip: "바이브코딩 MVP · 운영·개선 루프",
    links: [
      { label: "🎮 사이트 체험하기", url: "https://jobda-trainer.vercel.app/?utm_source=portfolio&utm_medium=referral&utm_campaign=resume" },
    ],
    detail: {
      objective:
        "AI 역량검사를 연습하려 했지만 공식 체험은 매번 번거로운 사전 절차를 거쳐야 해 마음 편히 반복하기 어려웠습니다. 그래서 절차 없이 바로·무제한으로 연습할 수 있는 서비스를 직접 만들어 풀었습니다. 만드는 데 그치지 않고 — 측정 인프라를 깔고(GA4·UTM), 실사용자 피드백으로 검증해, 며칠 단위로 다시 배포하는 '만들고 → 측정 → 분석 → 개선' 루프를 혼자 돌리는 프로젝트입니다.",
      question: "내가 겪은 불편을 직접 서비스로 만들어, 데이터로 검증하며 계속 키울 수 있을까?",
      data: {
        source: "직접 제작·운영하는 웹 서비스 (jobda-trainer.vercel.app)",
        period: "2026.06.01 배포 ~ (운영 중) · 데이터 2026.06.21 기준",
        scale: "GA4 활성 사용자 6,500+ · 활성 사용자당 평균 참여 44분 51초 · Supabase 누적 로그 약 7.5만 건 (2026.6.1 배포 ~ 약 3주, 6.21 기준)",
        preprocessing: [],
      },
      metricTabs: {
        title: "GA4 일별 추이 — 배포 후 (2026.6.1 ~ 6.21)",
        caption: "개인 프로젝트 · 광고 0원 — 6/16 카톡 입소문으로 급증(출처는 09 '측정의 함정' 설문에서 규명), 3주 만에 누적 6,500+.",
        labels: ["6/1","6/2","6/3","6/4","6/5","6/6","6/7","6/8","6/9","6/10","6/11","6/12","6/13","6/14","6/15","6/16","6/17","6/18","6/19","6/20","6/21"],
        tabs: [
          { key: "활성 사용자", value: "6,500+", unit: "명", data: [19,7,35,55,95,82,81,145,164,169,186,147,79,97,120,1008,1441,1423,1515,1779,2030] },
          { key: "새 사용자", value: "6,400+", unit: "명", data: [18,4,31,47,83,65,54,127,125,114,140,93,50,60,80,935,1133,924,586,859,914] },
          { key: "이벤트 수", value: "65만+", unit: "", data: [332,225,1329,1640,3619,4176,4774,5940,11426,9252,10168,9763,4314,4777,7138,29548,79266,97492,82152,144248,146127] },
          { key: "세션당 참여(분)", value: "최근 18분", unit: "분", data: [4.5,3.6,6.6,6.2,7.0,8.4,9.6,6.0,11.8,9.1,9.0,11.0,11.4,8.9,11.9,7.5,13.2,18.3,14.5,21.4,17.6] },
        ],
      },
      sections: [
        {
          title: "1. 서비스 — 바이브코딩으로 직접 제작",
          lead: 'AI가 코드를 쓰되 <span class="hl">서비스 방향은 직접</span> — AI 역량검사 연습 서비스를 만들어 배포.',
          points: [
            "Claude Code로 제작 (Vite·React·Supabase·Vercel) — 게임 4종 → 실사용자 피드백 받아 9종까지 확장, 전 게임 실전모드",
            "개인 통계 대시보드·목표 설정·친구 공유·피드백 창구·SEO/OG 직접 구현",
            "AI는 코드 작성, <b>스택 설계·라우팅·배포 디버깅 같은 핵심 판단은 직접</b>",
          ],
          images: [
            {
              src: "img/jobda-home.png",
              caption: "직접 제작·배포한 AI 역량검사 연습 사이트 — 게임 9종",
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
          title: "2. 측정 — 웹 유입(GA4·UTM) + 자체 수집(Supabase) 두 축",
          lead: '결과를 주장하기 전에 <span class="hl">측정부터 깔았다</span> — 웹 유입은 GA4·GTM·UTM, 플레이·설문·피드백은 Supabase로 직접 수집.',
          points: [
            "GA4를 GTM으로 연결 → 코드 수정 없이 클릭·이벤트·SPA page_view 추적, UTM으로 채널·콘텐츠 구분, 6단계 퍼널 정의(진입→게임→시작→완료→목표→달성)",
            "게임 플레이 로그(누적 약 7.5만 건)·유입 출처 설문(326명)·피드백을 <b>모두 Supabase에 직접 적재</b> → 재플레이·학습곡선·게임별 완료율·다크소셜 출처까지 SQL로 쿼리·분석",
            "즉 GA4(웹 유입) + Supabase(플레이·설문·피드백 등 1st-party 데이터) 두 축을 직접 깔아 — '내가 만든 서비스의 데이터'를 처음부터 끝까지 수집·분석",
          ],
          images: [
            {
              src: "img/jobda-feedback.png",
              caption: "Supabase로 피드백·플레이·설문을 직접 수집 — 복잡한 분석·타겟팅은 SQL로 쿼리",
              kind: "capture",
            },
          ],
          cta: {
            to: "channel-device",
            text: "측정 인프라를 깔고 채널을 줄세웠더니 유입 1위가 완료·재방문 꼴찌처럼 보였다 — 그런데 퍼널을 기기로 쪼개니 진짜 병목(모바일 첫 진입)도, '채널 질' 착시의 정체도 드러났다. 측정의 함정 심층 분석",
          },
        },
        {
          title: "3. 작동한다 — 79% 재플레이, 반복하면 +27점",
          lead: '들어오면 끈끈하고(<span class="hl">79% 재플레이</span>), 연습할수록 점수가 실제로 오른다(<span class="hl">반복 시 +27점</span>).',
          points: [
            "행동 로그 5,363건·404세션: 79%가 재플레이·세션당 13회·66%가 2종 이상 시도 → 고착도 충분",
            "N-back 첫 판 66 → 3판 77(+11), 3회+ 연습 시 평균 +27점·89% 향상 — 도구가 실제로 작동",
            "첫 점수 낮은 층(50점 미만)이 17.8회로 최다 연습 → 낮은 점수는 이탈 아닌 동기 신호",
            "한 번 시작한 게임은 대부분 완주 → 병목은 게임이 아니라 '첫 진입'(→ 측정의 함정에서 파헤침)",
          ],
          chart: {
            type: "bar",
            title: "N-back 반복 플레이 — 점수가 실제로 오른다 (학습 효과)",
            labels: ["1판", "2판", "3판", "4판", "5판", "6판"],
            datasets: [{ label: "평균 점수", data: [66, 70, 77, 75, 75, 78] }],
            note: "첫 판 66 → 3판 77(+11)로 도약. 3회+ 연습 세션은 평균 +27점·89% 향상.",
          },
        },
        {
          title: "4. 개선 루프 — 고치고, '고친 게 효과 있었나'까지 검증",
          lead: '피드백을 고치는 데서 멈추지 않고, <span class="hl">그 개선이 실제로 효과 있었는지</span>를 데이터로 검증했다.',
          points: [
            "분석→배포: 결과 화면 성장 피드백·2번째 판 넛지(재플레이)·공유 UTM(바이럴 추적)·GA4 소스오염 수정·v2 태깅으로 전후 비교 설계",
            "피드백→공개 루프: 익명 피드백 50건을 받아 수정하고 공개 패치노트('💬 의견 반영')로 닫음 — 의견 낸 사람이 반영된 걸 다시 본다 (게임 4종→9종·오답노트도 여기서 나옴)",
            "효과 검증: 패치마다 Supabase SQL로 전후 비교하되 편향을 통제 — 재방문 학습효과를 빼려 '신규 사용자 첫 판'만, 시간제 게임은 정확도 아닌 <b>throughput(분당 푼 수)</b>, 평균 대신 <b>중앙값</b>으로",
            "결과 예: 길찾기 난이도를 2번 올려도 신규 기준 평탄(throughput 2.53→2.66, '체감만 어려움'을 구분) / 도형회전 최소수는 군 D8 구조상 ≤3이 천장임을 전수검증(3,584케이스)으로 규명 → 난이도는 반전비율·속도로만. 표본 적은 당일 패치는 baseline 박고 2~3일 뒤 재검증 예약",
          ],
          chart: {
            type: "bar",
            title: "리텐션 — 사용자별 플레이 판수 분포",
            labels: ["1판", "2-3판", "4판+"],
            datasets: [{ label: "사용자 수(명)", data: [393, 466, 1992] }],
            note: "4판+ 1,992명 — 로그인 없는 에피소드형인데도 재방문이 강함(로그인 동기화 재검토 가치).",
          },
          code: {
            lang: "sql",
            title: "분석 SQL — 리텐션 · 패치 전후(신규 첫 판) 검증",
            body:
`-- [1] 리텐션 — 며칠에 걸쳐 다시 오는 사람 (로그인 수요 판단)
select case when n=1 then '1판' when n<=3 then '2-3판' else '4판+' end as bucket,
       count(*) as users
from (select session_id, count(*) n from game_responses group by session_id) s
group by 1 order by 1;

-- [5] 패치 전/후 '신규 첫 판'만 — 재방문 학습효과를 뺀 순수 난이도
--     세션별 가장 이른 판 = 첫 판. after에서 throughput·정확도 떨어지면 진짜 어려워진 것
with firsts as (
  select distinct on (session_id) session_id, created_at, accuracy, correct_count
  from game_responses
  where game_id = 'path'
    and created_at >= timestamptz '2026-06-16 16:27+09'
    and created_at <  timestamptz '2026-06-24 16:27+09'
  order by session_id, created_at)
select case when created_at < timestamptz '2026-06-20 16:27+09'
            then 'before' else 'after' end as period,
       count(*) as new_users, round(avg(accuracy)) as first_acc,
       round(avg(correct_count), 1) as throughput   -- 분당 푼 수(시간제 핵심 지표)
from firsts group by 1 order by 1;`,
          },
          images: [
            {
              src: "img/jobda-changelog.png",
              caption: "피드백 → 수정 → 공개 패치노트('💬 의견 반영')로 루프를 닫는다",
              kind: "capture",
            },
          ],
          callout:
            "💡 '고쳤다'가 아니라 '고친 게 효과 있었나'를 편향까지 통제해 검증 — AI 결과를 평가하고 A/B로 실험하는 것과 똑같은 근육입니다.",
        },
        {
          title: "5. 안 보이는 버그를 데이터로 — 일부 기기에서만 터진 오류 추적",
          lead: '모두가 아니라 <span class="hl">일부 기기에서만</span> 터지는 버그 — 내 폰에선 멀쩡해 재현조차 안 됐다.',
          points: [
            "증상: '길이 한 방향으로만 그려진다'는 신고 반복 — 내 폰·아이패드 프로는 멀쩡, 아이패드 에어는 재현. 기기마다 다른 '재현 안 되는' 버그",
            "진단: 추측 대신 데이터 — 막힌 사용자가 누르면 그 순간의 화면 상태(누른 위치·확대 배율·기기)가 전송되는 '신고 버튼'을 게임에 직접 심어 수집",
            "범인: 모인 데이터가 화면 확대를 지목 → 확대 상태에선 터치 좌표가 칸과 어긋나 방향이 틀어짐",
            "해결: 확대 자동 감지 안내(두 손가락으로 축소) + 방향 직접 고르기 버튼 → 안 되는 사람도 진행 가능",
          ],
          callout:
            "💡 재현 안 되는 버그는 '안 되는 사람의 화면'을 받아와야 잡힙니다 — 추측을 데이터로 바꾼, 측정으로 문제를 보이게 만든 또 하나의 사례입니다.",
        },
      ],
      resultStats: [
        { value: "6,500+", label: "활성 사용자 (배포 약 3주 만에)" },
        { value: "79%", label: "재플레이율 — 세션당 평균 13회" },
        { value: "+27점", label: "반복 연습 시 점수 향상 (89% 개선)" },
      ],
      results: [
        "AI 역량검사를 직접 준비하다 느낀 불편을 바이브코딩으로 서비스화 — 게임 4종→9종, 배포 약 3주 만에 6,500+ 사용자(6.21 기준)",
        "결과를 주장하기 전에 측정부터: GA4·GTM·UTM + 6단계 퍼널로 채널·콘텐츠·행동을 코드 수정 없이 추적",
        "행동 로그 5,363건: 재플레이 79%·세션당 13회·재방문 26% — 고착도는 충분, 병목은 유입",
        "반복 시 +27점(89%)·첫 점수 낮은 층이 17.8회 최다 연습 — 레버는 '향상 가시화'(시작한 게임은 대부분 완주)",
        "분석을 실제 배포: 2번째 판 넛지·공유 UTM·GA4 소스오염(not set) 수정·v2 태깅",
        "피드백 받아 4→9종·전 게임 실전모드·'오답노트'(틀린 문제 복습)·익명 피드백 창구·맞춤 피드백 — 루프 상시 운영",
      ],
      retro: [
        "기술 실행은 AI가 빠르게 해주니, 내 몫은 '뭘 만들지 정하고·측정을 설계하고·숫자를 의심하는' 판단이었다",
        "만들고→측정→분석→개선을 직접 한 바퀴 — 다음은 코호트 재방문·게임별 이탈 단계까지 확장 계획",
      ],
    },
  },
  {
    key: "channel-device",
    hidden: true,
    domain: "product",
    domainLabel: "GA4·측정 분석",
    title: "측정의 함정 — 진짜 병목은 '모바일 첫 진입', 그게 '채널 질' 착시도 만들었다",
    summary:
      "게임 완주율은 높은데 성장은 더뎠습니다. 채널을 줄세우면 유입 1위 에브리타임이 꼴찌처럼 보였지만, 퍼널을 기기로 쪼개니 진짜 병목은 '모바일 랜딩→게임 시작'(모바일 44% vs PC 79%)이었고, 그 모바일 이탈이 PC 재접속을 새 (direct)로 잡히게 해 '채널 질' 착시까지 만들고 있었습니다. 게다가 GA4가 못 보는 다크소셜(카톡 오픈채팅)은 사이트 설문(326명)으로 삼각측량해 실제 유입을 찾았습니다. 표면 지표를 액면 그대로 믿지 않고 기기·채널·측정까지 의심한 분석.",
    period: "2026.06.01 ~ 06.16",
    type: "GA4 심층 분석 · jobda-trainer",
    tools: ["GA4 (탐색 분석)", "이벤트·기기 퍼널", "채널×기기 교차분석"],
    metric: { value: "44% vs 79%", label: "모바일 vs PC 게임 시작률 (랜딩→시작)" },
    chip: "프로덕트 퍼널 진단 · 기기 측정 착시",
    detail: {
      objective:
        "직접 만든 서비스가 '완료율은 높은데 왜 안 크지?'에 답하려고, 이벤트 퍼널을 기기로 분해한 분석입니다. 채널을 줄세워 '에타=저질'로 단정하지 않고 — 진짜 병목(모바일 첫 진입)을 찾고, 그 병목이 어떻게 '채널 질' 착시까지 만들었는지를 밝혔습니다. 핵심은 '어떻게 측정됐는가'를 먼저 의심한 데 있습니다.",
      question: "완주율은 높은데 왜 안 클까? 유입 1위 에브리타임은 정말 '질 낮은 트래픽'일까?",
      data: {
        source: "자체 운영 사이트 jobda-trainer.vercel.app · GA4 탐색 분석 (이벤트·기기·첫 사용자 소스)",
        period: "2026.06.01 ~ 06.16",
        scale: "활성 사용자 2,011명 (6/1~16 분석 윈도우) · 모바일 1,159 / 데스크톱 754 / 태블릿 101",
        preprocessing: [],
      },
      sections: [
        {
          title: "1. 퍼널을 기기로 쪼개다 — 진짜 병목은 '모바일 첫 진입'",
          lead: '이벤트 퍼널을 기기로 분해하니, 이탈은 게임이 아니라 <span class="hl">모바일의 랜딩→게임 시작</span>에서 터졌다.',
          points: [
            "모바일: 랜딩 1,106명 → 게임 시작 484명(44%) — 절반 이상이 게임을 한 번도 안 시작하고 이탈",
            "데스크톱: 랜딩 749명 → 시작 590명(79%) — 모바일과 35%p 차이",
            "단, 일단 시작하면 완료율은 모바일 57%·PC 89%로 둘 다 양호 → 문제는 '게임'이 아니라 '진입'",
            "mobile_notice('PC로 하세요' 안내)가 모바일 방문의 99%(1,093/1,106)에 노출 — 이탈의 문",
          ],
          chart: {
            type: "groupedBar",
            title: "기기별 퍼널 — 랜딩 → 게임 시작 → 완료 (활성 사용자)",
            labels: ["랜딩(page_view)", "게임 시작", "게임 완료"],
            datasets: [
              { label: "모바일", data: [1106, 484, 277] },
              { label: "데스크톱", data: [749, 590, 528] },
            ],
            note: "모바일은 랜딩→시작에서 56% 증발(44%만 시작), 데스크톱은 79% 시작. 시작 후 완료율은 모바일 57%·PC 89%.",
          },
          table: {
            headers: ["기기", "랜딩", "게임 시작", "완료", "랜딩→시작", "시작→완료"],
            rows: [
              ["모바일", "1,106", "484", "277", "44%", "57%"],
              ["데스크톱", "749", "590", "528", "79%", "89%"],
              ["태블릿", "99", "47", "31", "47%", "66%"],
            ],
          },
          callout:
            "🔑 '완주율 높음'에 가려져 있던 진짜 병목 = 모바일 유저를 첫 게임에 진입시키기. 게임이 아니라 진입이 새는 곳이었습니다.",
        },
        {
          title: "2. 그 모바일 이탈이 '채널 질' 착시까지 만들었다",
          lead: '모바일 유저가 PC로 넘어가며 새 (direct)로 잡힌다 — <span class="hl">채널 \'질\' 차이는 사실 기기 측정 착시</span>.',
          points: [
            "에브리타임은 모바일 앱 유입이라 87%가 모바일(343/393) → mobile_notice 보고 PC로 이동",
            "GA4는 그 PC 재접속을 새 (direct) 사용자로 카운트 → 에타 여정이 쪼개지고 (direct)가 1위로 부풀음",
            "같은 에브리타임도 데스크톱에선 7분 07초 몰입(모바일은 59초) — 채널이 나쁜 게 아니라 기기",
            "전체 세션 참여도 데스크톱 12분 54초 vs 모바일 3분 06초(약 4.2배)",
          ],
          chart: {
            type: "groupedBar",
            title: "같은 채널도 기기로 몰입이 갈린다 — 세션 참여시간(분)",
            labels: ["에브리타임", "(direct)", "링커리어"],
            datasets: [
              { label: "모바일", data: [1.0, 1.4, 7.2] },
              { label: "데스크톱", data: [7.1, 7.9, 15.1] },
            ],
            note: "에브리타임 모바일 59초 vs 데스크톱 7분 07초. 채널 불문 데스크톱이 길다 → 차이는 채널이 아니라 기기.",
          },
          table: {
            sortable: true,
            headers: ["채널", "모바일", "데스크톱", "모바일 비율", "PC 참여시간"],
            rows: [
              ["에브리타임", "343", "37", "87%", "7분 07초"],
              ["링커리어", "64", "150", "29%", "15분 04초"],
              ["네이버", "0", "96", "0%", "13분 58초"],
              ["(direct)", "616", "273", "69%", "7분 53초"],
            ],
          },
          callout:
            "🔑 '에타=저질'이 아니라 '에타=모바일 앱 유입 + 모바일 측정 한계'. 채널을 줄세우기 전에 '어떻게 측정됐나'를 봐야 했습니다.",
        },
        {
          title: "3. GA4도 못 본 진짜 출처 — 설문으로 삼각측량",
          lead: '채널을 기기로 보정해도 GA4가 못 보는 게 있다 — <span class="hl">카톡·지인추천 같은 다크소셜</span>은 전부 (direct)로 묻힌다.',
          points: [
            "UTM은 '내가 단 링크'(링커리어·에타·티스토리)만 잡고, 남이 카톡 오픈채팅에 퍼나른 링크는 referrer가 없어 (direct)로 사라진다 — 내가 통제할 수 없는 구조적 한계",
            "그래서 게임 1판 끝낸 사용자에게 '어디서 오셨나요' 팝업 설문을 직접 띄워(응답은 Supabase에 적재) 실제 출처를 물음 — 자가응답 326명",
            "결과: 카카오톡 오픈채팅 47%·지인추천 26% = <b>다크소셜·입소문이 73%</b>. 검색(네이버·구글) 16%, 내가 UTM 단 채널은 합쳐 7%뿐",
            "→ 최근 급증의 정체 = 카톡 오픈채팅. 모바일로 들어와 'PC로 하세요' 보고 PC 전환 → GA4엔 desktop·(direct)로 잡힌 것 (앞 장의 메커니즘에 출처가 붙음)",
          ],
          chart: {
            type: "bar",
            title: "실제 유입 출처 — 자체 팝업 설문 (326명 자가응답)",
            labels: ["카톡 오픈채팅", "지인 추천", "네이버 검색", "구글 검색", "에타·티스토리·링커리어"],
            datasets: [{ label: "응답 수(명)", data: [153, 84, 41, 12, 24] }],
            note: "카톡+지인추천 = 237명(73%) — GA4엔 전부 (direct)로 묻혔던 다크소셜. UTM이 잡은 건 7%뿐.",
          },
          callout:
            "🔑 측정의 진짜 한계는 '기기'를 넘어 '채널 식별' 자체 — GA4가 원천적으로 못 보는 다크소셜을, 사이트 설문으로 직접 메워 진짜 성장 동력(카톡 입소문)을 찾았습니다.",
        },
        {
          title: "4. 인사이트 — '재미'가 아니라 '모바일 첫 진입'을 푼다",
          lead: '데이터를 액면 그대로 믿지 않고 기기·채널·측정까지 의심하니 <span class="hl">레버가 바뀌었다</span>.',
          points: [
            "레버 1 — 모바일 첫 진입: 안내를 '막는 문'이 아니라 '모바일에서 되는 게임부터 권하는' 방향으로",
            "레버 2 — 채널 평가를 '양' 아닌 '기기 보정된 질'로: 에타=도달·인지, 링커리어·네이버 PC=고가치",
            "레버 3 — 에피소드형이라 '습관 리텐션'보다 '필요할 때 다시 찾게 하는 검색 발견성(재유입)'·다크소셜(카톡 공유 유발)이 진짜 성장 레버",
            "측정: 재방문율 단일 지표 대신 기기·채널 분리 + 참여·이벤트 다중 지표. 로그인은 측정 목적으론 안 넣음(가입 마찰 > 이득)",
          ],
          callout:
            "🔑 표면 지표 → 기기로 분해 → 측정 방법론 의심 → 진짜 병목(모바일 진입) 발견. 같은 데이터에서 정반대 결론이 나왔습니다.",
        },
      ],
      resultStats: [
        { value: "44% vs 79%", label: "모바일 vs PC 게임 시작률 (랜딩→시작)" },
        { value: "73%", label: "실제 유입이 카톡·지인추천 (설문 326명) — GA4엔 (direct)" },
        { value: "4.2×", label: "PC vs 모바일 세션 참여시간" },
      ],
      results: [
        "퍼널을 기기로 쪼개니 진짜 병목은 모바일 랜딩→게임 시작(44% vs PC 79%) — 게임이 아니라 진입",
        "일단 시작하면 완료율 모바일 57%·PC 89% → 게임 자체는 문제없음",
        "에브리타임 87% 모바일·모바일 59초 vs PC 7분 07초 — '채널 질' 차이는 기기 측정 착시",
        "설문 326명: 실제 유입 카톡 오픈채팅 47%·지인추천 26%(다크소셜 73%) — GA4가 (direct)로 묻던 걸 설문으로 삼각측량",
        "레버: 모바일 첫 진입 개선 + 기기 보정된 채널 평가 + 리텐션 장치 동선",
      ],
      retro: [
        "표면 지표를 액면 그대로 믿었으면 '에타 끊어라'가 결론 — 기기·측정까지 의심해 정반대 답을 얻었다",
        "재방문 측정 한계(로그인 없음·쿠키 만료)는 로그인으로 풀 수 있지만, 무가입·즉시연습이 강점이라 '측정 때문에 로그인'은 본말전도 — 측정은 가볍게(Google Signals 등), 기능은 사용자 가치(예: 기기 간 기록 동기화)가 정당화할 때만",
      ],
    },
  },
];
