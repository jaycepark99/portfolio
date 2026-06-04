/* ============================================================
   포트폴리오 데이터 — 이 파일만 고치면 사이트 내용이 바뀝니다.
   ------------------------------------------------------------
   · 연락처 / 링크는 아래 PROFILE 에서 수정
   · 회사별 강조 조합(프리셋)은 URL 로 제어합니다:
        index.html              → 기본 (전체 7개)
        index.html?set=finance  → 금융용 조합
     (사용 가능한 set 값은 아래 PRESETS 의 key)
   · 빨래방 A/B 테스트는 항상 최상단 '주요 프로젝트' 로 고정됩니다.
   · 각 프로젝트의 strength = 핵심역량 1개. 화면에 보이는 프로젝트의
     핵심역량만 위쪽 '핵심 역량' 섹션에 표시됩니다.
   · code 배열에 실제 Python/SQL 코드를 채워 넣으세요.
     github 에 저장소 주소를 넣으면 'GitHub' 버튼이 생깁니다.
   ============================================================ */

const PROFILE = {
  name: "박정연",
  tagline: "데이터로 문제를 정의하고, 실험과 분석으로 검증해 실행 가능한 의사결정으로 연결합니다.",
  intro:
    "가설을 세우고 데이터로 검증해, 비즈니스가 바로 실행할 수 있는 결론까지 끌고 가는 것을 좋아합니다. " +
    "직접 운영하는 매장 데이터부터 금융·이커머스·바이오 도메인까지, 문제 정의 → 분석 → 액션의 전 과정을 경험했습니다.",
  email: "jaycepark99@gmail.com",
  // ▼ velog 핸들이 jaycepark99 가 아니면 아래 주소만 고쳐주세요
  velog: "https://velog.io/@jaycepark99",
  github: "https://github.com/jaycepark99",
  resumePdf: "resume.pdf",
  portfolioPdf: "portfolio.pdf",
};

/* ------------------------------------------------------------
   회사별 조합(프리셋)
   · featured : 항상 최상단에 크게 노출할 '주요 프로젝트' (기본 빨래방 A/B)
   · show     : 그 아래 그리드에 노출할 프로젝트 key 묶음 (순서대로)
   · 핵심역량 섹션 = [featured, ...show] 프로젝트들의 strength 만 표시
   · 보낼 링크 예) …/index.html?set=finance
   ------------------------------------------------------------ */
const DEFAULT_SET = "default";
const PRESETS = {
  default:   { label: "전체",            featured: "abtest", show: ["dashboard", "rfm", "growth", "churn", "ddi", "marketing"] },
  finance:   { label: "금융·핀테크",      featured: "abtest", show: ["dashboard", "churn", "ddi"] },
  ecommerce: { label: "이커머스·리테일",  featured: "abtest", show: ["dashboard", "rfm", "growth", "ddi"] },
  growth:    { label: "그로스·데이터분석", featured: "abtest", show: ["growth", "rfm", "churn", "dashboard"] },
  bio:       { label: "바이오·제약",      featured: "abtest", show: ["ddi", "churn", "dashboard"] },
  marketing: { label: "마케팅",          featured: "abtest", show: ["marketing", "rfm", "growth"] },
};

// Hero 상단 대표 숫자
const HERO_STATS = [
  { value: "+25.7%", label: "A/B 테스트 1인당 매출 개선" },
  { value: "96%", label: "이탈 예측 모델 정확도" },
  { value: "83%", label: "운영 집계 시간 단축" },
  { value: "+95%", label: "이커머스 연 매출 성장 진단" },
];

const PROJECTS = [
  /* ---------------------------------------------------------- 01 */
  {
    key: "abtest",
    domain: "experiment",
    domainLabel: "실험·통계",
    title: "셀프빨래방 코호트 기반 업셀 A/B 테스트",
    period: "2024.12 ~ 2025.06",
    type: "개인 프로젝트",
    tools: ["SQL", "Python", "A/B Test", "Tableau"],
    metric: { value: "+25.7%", label: "1인당 매출(ARPU)" },
    strength: {
      icon: "🧪",
      title: "가설 설계와 통계적 검증",
      desc: "코호트 기반 업셀 A/B 테스트로 1인당 매출 25.7% 개선을 통계적으로 검증",
      meta: "SQL · Python · Chi-square · t-test",
    },
    problem:
      "직접 운영하는 매장 포함 3개 지점 중 C지점 매출이 약 18% 낮은 상황. 매출 격차의 원인 진단과 실행 가능한 개선안 도출이 필요했습니다.",
    strategy: [
      "3개 지점 POS 데이터를 SQL로 통합·표준화해 분석용 데이터 마트 구축 및 KPI 정의",
      "리텐션·재충전 주기 비교로 고객 유지력은 유사함을 확인, 충전 단가 분석에서 C지점 1만원 편중(69.7%)·고액 충전 저조 발견",
      "'매출 격차의 핵심은 고객 수가 아닌 충전 단가 구조 차이'라는 가설 수립",
      "2만원 이상 인센티브 기반 코호트 A/B 테스트 설계 및 통계적 유의성 검증(ITT 기준)",
    ],
    result: [
      "1인당 평균 매출 25.7% 증가 (3,433원 → 4,316원)",
      "충전율 +4.0%p (14.2% → 18.2%, Chi-square p≈0.006, 유의)",
      "2만원 이상 충전 비중 +9.7%p (z-test p≈0.03, 유의)",
      "고객 수 유지 없이도 객단가 상승만으로 매출 구조 개선 가능함을 검증",
    ],
    code: [
      {
        lang: "sql",
        title: "지점별 충전 단가 구조 분석",
        body:
`-- 예시 코드 — 실제 쿼리로 교체하세요
-- 지점별 충전금액 구간 분포 (1만/2만/3만원+)
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
      {
        lang: "python",
        title: "A/B 테스트 통계 검증 (Chi-square)",
        body:
`# 예시 코드 — 실제 분석 코드로 교체하세요
from scipy import stats
import numpy as np

# 충전율(전환) 차이 검정: control vs test
#                전환    미전환
table = np.array([[ 190, 1151],   # control
                  [ 244, 1097]])  # test
chi2, p, dof, _ = stats.chi2_contingency(table)
print(f"chi2={chi2:.3f}, p={p:.4f}")   # p ≈ 0.006 → 유의

# 1인당 매출(ARPU) 차이: Welch's t-test
t, p2 = stats.ttest_ind(test_arpu, control_arpu, equal_var=False)
print(f"ARPU uplift +25.7%, p={p2:.3f}")`,
      },
    ],
    github: "", // 예: "https://github.com/본인아이디/laundry-abtest"
  },

  /* ---------------------------------------------------------- 02 */
  {
    key: "dashboard",
    domain: "dashboard",
    domainLabel: "대시보드·운영",
    title: "셀프빨래방 운영 대시보드 구축",
    period: "2025.01 ~ 2026.01",
    type: "개인 프로젝트",
    tools: ["SQL", "Tableau", "Looker Studio", "Google Sheets"],
    metric: { value: "83%↓", label: "주간 집계 시간" },
    strength: {
      icon: "📊",
      title: "KPI 대시보드 구축과 데이터 정합성 처리",
      desc: "POS 5.7만 건 통합·정합성 처리 후 Looker Studio 자동화로 주간 집계 83% 단축",
      meta: "SQL · Tableau · Looker Studio",
    },
    problem:
      "수기 집계(주 2시간)와 데이터 누락 리스크로 운영 결정이 직관에 의존하던 상황. 일일 입력만으로 갱신되는 실시간 환경이 필요했습니다.",
    strategy: [
      "3개 POS 5.7만 건을 통합한 분석용 데이터 마트 설계 (자판기 동전교환 보정, 지점코드 매핑, 결측치 처리, 날짜 표준화)",
      "Tableau 연간 분석: KPI 현황·매출 트렌드·계절별 패턴·고객 구조",
      "Looker Studio 실시간 트래킹: 매출·지출·수익 추이, 요일·시간대 히트맵, 고객 세분화",
      "CSV 수동 업로드 한계를 Google Sheets 동기화 방식으로 전환해 일일 입력만으로 현황 확인",
    ],
    result: [
      "주 2시간 수기 집계 → 주 20분으로 약 83% 단축",
      "피크타임 식별로 청소·점검 스케줄 최적화 (심야 저조 시간대 활용)",
      "지점별 비용구조 차이 식별 → 비용 절감 우선순위 및 매출 목표 차등 설정",
    ],
    code: [
      {
        lang: "sql",
        title: "POS 통합 데이터 마트 전처리",
        body:
`-- 예시 코드 — 실제 쿼리로 교체하세요
-- 3개 지점 POS 통합 + 정합성 보정
SELECT
    DATE(paid_at)                         AS dt,
    store_map.std_store_id                AS store_id,
    -- 자판기 동전교환 보정 (계수 0.7)
    CASE WHEN method = 'coin_exchange'
         THEN amount * 0.7 ELSE amount END AS amount_adj,
    COALESCE(method, 'unknown')           AS pay_method
FROM raw_pos r
JOIN store_map ON r.raw_store = store_map.raw_store
WHERE amount > 0;          -- 결측/이상치 제거`,
      },
    ],
    github: "",
  },

  /* ---------------------------------------------------------- 03 */
  {
    key: "rfm",
    domain: "ecommerce",
    domainLabel: "E-commerce",
    title: "이커머스 RFM 고객 세분화 전략",
    period: "프로젝트",
    type: "개인 프로젝트",
    tools: ["SQL", "Python", "BigQuery", "RFM"],
    metric: { value: "+8%", label: "전체 매출 성장 (예측)" },
    strength: {
      icon: "🎯",
      title: "RFM 고객 세분화와 타겟 전략",
      desc: "RFM 5분위 스코어링으로 고객을 5등급 세분화하고 등급별 맞춤 전략으로 매출 +8% 예측",
      meta: "SQL · Python · BigQuery · RFM",
    },
    problem:
      "외형 성장 중인 이커머스의 핵심 카테고리와 고가치 고객을 식별하고, 데이터 기반 등급별 승급 전략으로 매출 성장을 도모했습니다.",
    strategy: [
      "BigQuery로 거래/고객/제품 데이터(2만 건, 2011–2014) 통합, e-Shop 채널이 판매 40%+ → 핵심 채널 선정",
      "카테고리별 비중·재구매율·변동계수(CV) 분석 — Books·Electronics 합산 49%",
      "RFM 5분위 스코어링으로 Diamond~Bronze 5등급 세분화 (Diamond Top 3%가 매출 15% 기여)",
      "등급별 카테고리 구매 비율 정밀 분석으로 등급 특화 마케팅 설계",
    ],
    result: [
      "중간 등급 20% 승급 유도 시 전체 매출 +8% 성장 예측",
      "1단계 승급 시 평균 구매금액 95% 증가 (등급별 평균 구매금액 차이 기반 산출)",
      "등급별 차별화 전략: Platinum 신간 제안 / Gold 번들 / Silver 승급 프로모션 / Bronze 타겟 재활성",
    ],
    code: [
      {
        lang: "sql",
        title: "RFM 5분위 스코어링",
        body:
`-- 예시 코드 — 실제 쿼리로 교체하세요
WITH base AS (
  SELECT customer_id,
         DATE_DIFF(CURRENT_DATE(), MAX(order_date), DAY) AS recency,
         COUNT(DISTINCT order_id)                        AS frequency,
         SUM(amount)                                     AS monetary
  FROM orders GROUP BY customer_id
)
SELECT *,
  6 - NTILE(5) OVER (ORDER BY recency)   AS r_score,  -- 최근일수록 ↑
  NTILE(5) OVER (ORDER BY frequency)     AS f_score,
  NTILE(5) OVER (ORDER BY monetary)      AS m_score
FROM base;`,
      },
      {
        lang: "python",
        title: "RFM 점수 → 등급 매핑",
        body:
`# 예시 코드 — 실제 분석 코드로 교체하세요
import pandas as pd

df["rfm"] = df[["r_score","f_score","m_score"]].sum(axis=1)
bins   = [2, 7, 9, 11, 13, 15]
labels = ["Bronze","Silver","Gold","Platinum","Diamond"]
df["grade"] = pd.cut(df["rfm"], bins=bins, labels=labels)

print(df.groupby("grade")["monetary"].agg(["count","mean"]))`,
      },
    ],
    github: "",
  },

  /* ---------------------------------------------------------- 04 */
  {
    key: "growth",
    domain: "ecommerce",
    domainLabel: "E-commerce",
    title: "이커머스 성장성·내실 진단",
    period: "2026.03",
    type: "개인 프로젝트",
    tools: ["BigQuery", "SQL", "Cohort", "Google Sheets"],
    metric: { value: "+95%", label: "연 매출 성장 (YoY)" },
    strength: {
      icon: "📈",
      title: "시간 흐름 기반 코호트·리텐션 분석",
      desc: "코호트 분석으로 시즌별 재방문율 편차(50% vs 17%)를 진단해 비수기 전략 근거 도출",
      meta: "BigQuery · SQL · Cohort",
    },
    problem:
      "외형 성장 중인 B2B 도매 대상 이커머스의 성장성과 내실을 매출 트렌드·재구매율·회원 확보 현황으로 정량 진단해 비즈니스 액션을 도출했습니다.",
    strategy: [
      "BigQuery로 거래 데이터 정제 (취소건·이상치 제거, 비회원 거래 식별 규칙 정의)",
      "월별·계절별 매출 트렌드 분석으로 9월 급증·11~12월 정점의 시즌성 확인",
      "코호트 분석으로 유입 시기별 재구매율 비교",
      "비회원 거래 비중·매출 추이 진단으로 회원 전환 기회 발굴",
    ],
    result: [
      "성장성: YoY +95% 매출 확인, 단 비수기(1~8월) 편차 큼 → 비수기 확대 전략 필요성 도출",
      "내실: 연말 유입 고객 재구매율 50% vs 봄·여름 유입 17% → 시즌별 차별 마케팅 근거 제시",
      "회원: 전체 거래의 25%가 비회원, 11월부터 고액 비회원 거래 급증 → 연말 회원 전환 기회 포착",
    ],
    code: [
      {
        lang: "sql",
        title: "거래 데이터 정제 규칙",
        body:
`-- 예시 코드 — 실제 쿼리로 교체하세요
SELECT *,
       COALESCE(customer_id, 'Guest') AS customer_key  -- 비회원 식별
FROM raw_invoices
WHERE invoice_no NOT LIKE 'C%'     -- 취소건 제거
  AND invoice_no NOT LIKE 'A%'     -- 오류 데이터 제거
  AND LENGTH(stock_code) >= 5      -- POST/B/M 등 비상품 코드 제거
  AND quantity  > 0                -- 음수/이상치 제거
  AND unit_price > 0;              -- 무료/음수 거래 제거`,
      },
      {
        lang: "sql",
        title: "유입 시기별 코호트 재구매율",
        body:
`-- 예시 코드 — 실제 쿼리로 교체하세요
WITH first_month AS (
  SELECT customer_key,
         DATE_TRUNC(MIN(invoice_date), MONTH) AS cohort
  FROM cleaned GROUP BY customer_key
)
SELECT f.cohort,
       DATE_DIFF(DATE_TRUNC(c.invoice_date, MONTH), f.cohort, MONTH) AS m,
       COUNT(DISTINCT c.customer_key) AS buyers
FROM cleaned c JOIN first_month f USING (customer_key)
GROUP BY 1, 2 ORDER BY 1, 2;`,
      },
    ],
    github: "",
  },

  /* ---------------------------------------------------------- 05 */
  {
    key: "churn",
    domain: "ml",
    domainLabel: "금융·머신러닝",
    title: "신용카드 고객 이탈 예측 및 LTV 분석",
    period: "2024.08 ~ 2024.09",
    type: "팀 프로젝트 (5인 · 리더)",
    tools: ["Python", "RandomForest", "Decision Tree", "LTV"],
    metric: { value: "96%", label: "이탈 예측 정확도" },
    strength: {
      icon: "🤖",
      title: "거래 데이터 모델링과 LTV 세분화",
      desc: "RandomForest 이탈 예측(정확도 96%)과 LTV 5등급 세분화로 등급별 방어 전략 설계",
      meta: "Python · RandomForest · LTV",
    },
    problem:
      "신용카드 고객 이탈 예측 모델을 개발하고, LTV 기반 고객 세분화로 등급별 차별 관리 전략을 수립했습니다.",
    strategy: [
      "BankChurners(10,127명·21변수) EDA로 이탈 고객 핵심 특징 도출 (거래액·횟수·상품수·리볼빙 잔액)",
      "다중공선성 제거(상관계수 1.0 변수 제외), Ordinal/One-Hot 인코딩 전략 설계",
      "RandomForest·LightGBM·LogisticRegression 비교 → 과적합 고려해 RandomForest 최종 선정",
      "Decision Tree로 이탈 규칙 추출, LTV 계산 후 5등급 세분화 및 등급별 방어 전략 설계",
    ],
    result: [
      "RandomForest 정확도 96% (Precision 0.92 / Recall 0.81)",
      "GridSearchCV 튜닝(n_estimators=30, max_depth=20)으로 안정성 확보",
      "그룹별 평균 이탈률 52.7% 감소 예상, 고객당 평균 $82,372 추가 수익 예상",
      "LTV 5등급별 방어 전략(기초 강화/습관 형성/VIP 관리)으로 등급별 차별 대응",
    ],
    code: [
      {
        lang: "python",
        title: "RandomForest 학습 + 튜닝",
        body:
`# 예시 코드 — 실제 분석 코드로 교체하세요
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

param = {"n_estimators": [30, 50, 100], "max_depth": [10, 20, None]}
grid  = GridSearchCV(RandomForestClassifier(random_state=42),
                     param, scoring="f1", cv=5)
grid.fit(X_train, y_train)

best = grid.best_estimator_          # n_estimators=30, max_depth=20
print("accuracy:", best.score(X_test, y_test))   # ≈ 0.96`,
      },
      {
        lang: "python",
        title: "LTV 계산 및 5등급 세분화",
        body:
`# 예시 코드 — 실제 분석 코드로 교체하세요
ltv = (df.monthly_amt * 12 + df.monthly_cnt * 10
       + (1 - df.revolving_ratio) * 100
       + df.retention_prob * 100) \\
      * (1 + (df.tenure_month / 12) * 0.05)

df["ltv_grade"] = pd.qcut(ltv, q=[0,.10,.50,.80,.95,1.0],
    labels=["V.Low","Low","Medium","High","V.High"])`,
      },
    ],
    github: "",
  },

  /* ---------------------------------------------------------- 06 */
  {
    key: "ddi",
    domain: "ml",
    domainLabel: "바이오·머신러닝",
    title: "화학구조 기반 약물상호작용(DDI) 예측 모델",
    period: "인턴 프로젝트",
    type: "팀 프로젝트",
    tools: ["Python", "XGBoost", "PyBioMed", "SMOTE"],
    metric: { value: "92%", label: "예측 정확도 (XGBoost)" },
    strength: {
      icon: "🧬",
      title: "화학구조 기반 ML 분류 모델링",
      desc: "SMILES 특성 추출·특성 선택·SMOTE 불균형 처리로 19개 상호작용 유형 분류(정확도 92%)",
      meta: "Python · XGBoost · PyBioMed · SMOTE",
    },
    problem:
      "신약 개발 초기 단계에서 비용 절감·안전성 확보를 위해, 화학구조와 CYP450 효소 데이터로 19가지 상호작용 유형을 분류하는 모델을 개발했습니다.",
    strategy: [
      "67,317 페어 데이터, SMILES 구조 기반 PyBioMed로 3,600개 특성 추출",
      "RandomForest 중요도 상위 누적 95% 지점으로 94개 특성 선택 (과적합 방지·연산 효율)",
      "CYP450 효소 중요도 분석 (2D6·2C19 최고), 12개 CYP 단백질 기반 상호작용 정보 구성",
      "RandomForest·LightGBM·XGBoost 비교 → XGBoost 선정, 튜닝 + SMOTE로 클래스 불균형 해결",
    ],
    result: [
      "최종 정확도 92% (Base 0.75 → Tuning 0.80 → SMOTE 0.92)",
      "기존 연구 대비 Precision +14% 향상",
      "Top 5 DDI 유형 평균 F1 0.98 (Class 13·15 F1 0.99)",
      "초기 단계 상호작용 예측으로 임상 실패 비용 최소화·후보물질 스크리닝 가속",
    ],
    code: [
      {
        lang: "python",
        title: "특성 선택 + SMOTE + XGBoost",
        body:
`# 예시 코드 — 실제 분석 코드로 교체하세요
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier

# RandomForest 중요도 누적 95% 지점까지 특성 선택 (3600 → 94)
X_sel = X[top95_features]

# 클래스 불균형 해결
X_res, y_res = SMOTE(random_state=42).fit_resample(X_sel, y)

model = XGBClassifier(n_estimators=300, max_depth=6,
                      learning_rate=0.1, random_state=42)
model.fit(X_res, y_res)            # accuracy ≈ 0.92`,
      },
    ],
    github: "",
  },

  /* ---------------------------------------------------------- 07 */
  {
    key: "marketing",
    domain: "marketing",
    domainLabel: "퍼포먼스 마케팅",
    title: "캐치테이블 대상 퍼포먼스 마케팅 (KPI~성과분석)",
    period: "2026.03",
    type: "개인 프로젝트",
    tools: ["A/B Test", "Excel", "미디어믹스"],
    metric: { value: "2배+", label: "소재 CVR 우세 차이" },
    strength: {
      icon: "📣",
      title: "KPI 설계와 퍼포먼스 성과 분석",
      desc: "KPI 선설계부터 미디어믹스·소재 A/B 테스트까지, 최종 목표지표(CVR) 기준 의사결정",
      meta: "A/B Test · 미디어믹스 · CPI/CPA",
    },
    problem:
      "레스토랑 예약 앱 대상, KPI 설계부터 미디어믹스 수립·소재 A/B 테스트·성과 분석까지 퍼포먼스 마케팅 전 사이클을 수행했습니다.",
    strategy: [
      "비즈니스 목표를 측정 가능한 지표로 분해 (앱 설치 CPI / 신규 예약 전환 CPA)",
      "비효율 키워드 제거·예산 비중 최적화(CPI 최저 매체 60% 집중)·집행 기간 역산으로 미디어믹스 수정",
      "매체별 규격·타겟 심리를 반영한 소재 직접 기획 (흑백요리사 / 연말맛집 테마)",
      "소재 A/B 테스트를 CTR·CVR 두 지표로 해석",
    ],
    result: [
      "CTR은 흑백요리사 우세였으나 실제 예약 전환(CVR)은 연말맛집이 2배+ 우세 → 최종 목표지표(CVR) 기준 소재 선정",
      "11월 신규 예약 수 목표 대비 +9.03% 초과 달성",
      "메타 DA가 CPI·CPA 모두 최저효율 → 제외, 네이버 SA 예산 집중을 차월 전략으로 제안",
      "'무엇을 측정할지 먼저 설계해야 한다' — KPI 선설계의 중요성 체득",
    ],
    code: [], // 코드 없는 분석 프로젝트 — 'GitHub' 만 연결하거나 비워두세요
    github: "",
  },
];
