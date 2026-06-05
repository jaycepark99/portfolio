# 박정연 · 데이터 분석 포트폴리오

정적 웹사이트(HTML/CSS/JS)로 만든 포트폴리오입니다. 빌드 도구 없이 **GitHub Pages**에 바로 배포할 수 있습니다.

---

## 📁 파일 구성

사이트는 **허브(메인) + 프로젝트 상세 페이지** 2단 구조입니다.

| 파일 | 설명 |
|------|------|
| `index.html` | 메인(허브) — Hero → 핵심역량 칩 → 프로젝트 카드 목록 → 푸터 |
| `project.html` | 프로젝트 상세 페이지 (1개 템플릿이 `?p=<key>`로 7개 모두 렌더) |
| `styles.css` | 디자인 (화이트 배경 / 딥 인디고 / 반응형) — 메인·상세 공용 |
| `data.js` | **내용 데이터** — 프로필·프로젝트·상세(목적/데이터/분석과정/차트/코드/결과/제안/회고)를 여기서 수정 |
| `main.js` | 메인(허브) 렌더링·필터·프리셋 로직 |
| `project.js` | 상세 페이지 렌더링 + Chart.js 차트 + HTML 히트맵 |
| `img/` | 실제 분석 이미지(대시보드 4종, 코호트·추세·비회원 원본, SHAP·변수중요도·EDA, LTV 산점도, 광고 소재) 13개 |

> 외부 라이브러리는 모두 CDN으로 불러옵니다(Pretendard 폰트, highlight.js, Chart.js). 별도 설치가 필요 없습니다.
> PDF 다운로드(포트폴리오·이력서)는 제공하지 않습니다 — 사이트 자체가 포트폴리오이며, 이력서는 지원 시스템으로 별도 제출합니다.

### 카드 클릭 → 상세 페이지
메인의 프로젝트 카드를 누르면 `project.html?p=<key>` 상세 페이지로 들어갑니다.
상세 페이지는 **분석 목적 → 데이터 설명 → 분석 과정(SQL·차트·표) → 결과 → 제안 → 회고** 순서로,
데이터 분석 보고서 5요소 구조를 따릅니다.

### 상세 내용 수정 (`data.js` 의 각 프로젝트 `detail`)
- `objective` / `question` : 분석 목적·핵심 질문
- `data` : 출처·기간·규모·전처리 규칙 (`preTable` 로 표도 가능)
- `sections[]` : 분석 과정 단계. 각 단계에 `body`(설명), `callout`(💡 강조), `chart`(차트), `table`(표), `code`(SQL/Python) 를 자유롭게 조합
- `chart` : `{ type: "bar"|"groupedBar"|"doughnut"|"line", title, labels, datasets, unit }` — 실제 수치만 넣으면 Chart.js 가 사이트 톤으로 그려줍니다
- `resultStats` / `results` / `proposal` / `retro` : 결과·제안·회고

---

## ✏️ 내용 수정하기 (`data.js` 한 파일만)

1. **연락처 / 링크** — `PROFILE` 의 `velog`, `github` 주소를 본인 것으로 교체하세요.
   (`본인아이디` 가 들어있으면 푸터에서 자동으로 숨겨집니다.)
2. **프로젝트 코드** — 각 프로젝트의 `code: [ ... ]` 배열에 실제 Python/SQL 코드를 붙여넣으세요.
   `github: "https://github.com/..."` 를 채우면 카드에 **GitHub 버튼**이 생깁니다.
3. **핵심 역량 / 숫자** — `STRENGTHS`, `HERO_STATS` 에서 수정합니다.

---

## 🎯 회사별로 보여줄 프로젝트 조합 바꾸기 (URL 한 줄)

사이트를 수정하지 않고 **링크 뒤 `?set=` 파라미터만** 바꾸면, 회사 직군에 맞는 프로젝트 묶음과 핵심역량만 보여줍니다.
**셀프빨래방 A/B 테스트는 항상 최상단 "주요 프로젝트"로 고정**되고, 그 아래 묶음만 달라집니다.

```
…/index.html                  → 기본 (전체 7개 프로젝트 + 도메인 필터)
…/index.html?set=finance       → 금융·핀테크용
…/index.html?set=ecommerce     → 이커머스·리테일용
…/index.html?set=growth        → 그로스·데이터분석용
…/index.html?set=bio           → 바이오·제약용
…/index.html?set=marketing     → 마케팅용
```

사용 가능한 `set` 값 (조합 구성은 `data.js`의 `PRESETS` 에서 수정):

| set | 대상 직군 | 빨래방 A/B 아래 표시되는 프로젝트 |
|-----|----------|----------------------------------|
| (없음) | 전체 | 7개 전부 |
| `finance` | 금융·핀테크 | 빨래방 대시보드 · 신용카드 이탈 · DDI |
| `ecommerce` | 이커머스·리테일 | 빨래방 대시보드 · RFM · 코호트 · DDI |
| `growth` | 그로스·데이터분석 | 코호트 · RFM · 신용카드 이탈 · 빨래방 대시보드 |
| `bio` | 바이오·제약 | DDI · 신용카드 이탈 · 빨래방 대시보드 |
| `marketing` | 마케팅 | 마케팅 · RFM · 코호트 |

- **핵심 역량 섹션**도 그 조합에 포함된 프로젝트의 역량만 자동으로 보여줍니다.
- 조합 링크에는 "전체 프로젝트 보기" 링크가 함께 떠서, 방문자가 전체도 볼 수 있습니다.
- 조합을 새로 만들거나 구성을 바꾸려면 `data.js` 의 `PRESETS` 에서 `featured`(최상단 고정)·`show`(아래 묶음, 순서대로)만 수정하면 됩니다.

> 예) 금융권 지원 → `?set=finance`, 이커머스 지원 → `?set=ecommerce` 링크를 보내세요.

---

## 🚀 GitHub Pages 배포 방법

### 1. 저장소 만들기
GitHub에서 새 저장소를 만듭니다. (예: `portfolio` 또는 `본인아이디.github.io`)

### 2. 파일 올리기

**방법 A — 웹에서 드래그앤드롭 (가장 쉬움)**
1. 저장소 페이지 → **Add file ▸ Upload files**
2. 아래 파일들과 **`img` 폴더**를 드래그: `index.html`, `project.html`, `styles.css`, `data.js`, `main.js`, `project.js`, `img/`(이미지 8개)
   - ⚠️ `img` 폴더는 폴더째 드래그하세요 (대시보드·차트·SHAP 이미지가 들어 있어 빠지면 상세 페이지 이미지가 안 보입니다)
   - 원본 코드/데이터(`*.ipynb`, `*.sql`, `*.csv`, `이커머스 데이터 분석/` 등)는 **사이트엔 필요 없습니다.** GitHub에 코드를 올리려면 프로젝트별 별도 저장소로 관리하고, `data.js`의 각 프로젝트 `github` 칸에 그 주소를 넣으세요.
3. **Commit changes** 클릭

**방법 B — 터미널(git)**
```bash
cd portfolio_site
git init
git add index.html project.html styles.css data.js main.js project.js img README.md
git commit -m "데이터 분석 포트폴리오 사이트"
git branch -M main
git remote add origin https://github.com/본인아이디/저장소이름.git
git push -u origin main
```

### 3. Pages 켜기
1. 저장소 → **Settings ▸ Pages**
2. **Source** 를 `Deploy from a branch` 로
3. **Branch** 를 `main` / `/ (root)` 으로 선택 후 **Save**
4. 1~2분 뒤 상단에 표시되는 주소로 접속:
   `https://본인아이디.github.io/저장소이름/`

> 저장소 이름을 `본인아이디.github.io` 로 만들면 주소가 `https://본인아이디.github.io/` 로 깔끔해집니다.

### 4. 회사에 보낼 링크
```
https://본인아이디.github.io/저장소이름/                  (기본)
https://본인아이디.github.io/저장소이름/?focus=churn       (이탈예측 강조)
```

---

## 🔧 로컬에서 미리보기

빌드가 필요 없습니다. 브라우저로 `index.html` 을 바로 열면 됩니다.
(코드 하이라이팅 등 일부 CDN 기능을 정확히 보려면 간단한 로컬 서버 권장)

```bash
# Python 3
python3 -m http.server 8000
# → http://localhost:8000 접속
```

---

## 📝 메모

- 공개 사이트이므로 연락처는 이메일·velog·GitHub만 노출합니다. 전화번호 등은 지원 시 이력서로 별도 제출하세요.
- `data.js` 의 코드 스니펫은 **예시 템플릿**입니다. 실제 분석 코드로 교체하세요.
- 폰트는 한글 가독성이 좋은 **Pretendard**, 숫자·코드는 **JetBrains Mono** 를 사용했습니다.
