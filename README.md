# 박정연 · 데이터 분석 포트폴리오

정적 웹사이트(HTML/CSS/JS)로 만든 포트폴리오입니다. 빌드 도구 없이 **GitHub Pages**에 바로 배포할 수 있습니다.

---

## 📁 파일 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 페이지 구조 (Hero → 핵심역량 → 프로젝트 → 자료 → 푸터) |
| `styles.css` | 디자인 (화이트 배경 / 딥 인디고 포인트 / 반응형) |
| `data.js` | **내용 데이터** — 프로필·핵심역량·프로젝트·코드를 여기서 수정 |
| `main.js` | 렌더링·필터·코드 모달·스크롤 효과 로직 |
| `portfolio.pdf` | 포트폴리오 PDF (다운로드용) |
| `resume.pdf` | 이력서 PDF (다운로드용) |

> 외부 라이브러리는 모두 CDN으로 불러옵니다(Pretendard 폰트, highlight.js). 별도 설치가 필요 없습니다.

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
2. 이 폴더의 파일 전부(`index.html`, `styles.css`, `data.js`, `main.js`, `portfolio.pdf`, `resume.pdf`)를 드래그
3. **Commit changes** 클릭

**방법 B — 터미널(git)**
```bash
cd portfolio_site
git init
git add index.html styles.css data.js main.js portfolio.pdf resume.pdf README.md
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

- 공개 사이트이므로 전화번호는 노출하지 않았습니다(이메일·velog·GitHub만). 전화번호는 이력서 PDF 안에만 있습니다.
- `data.js` 의 코드 스니펫은 **예시 템플릿**입니다. 실제 분석 코드로 교체하세요.
- 폰트는 한글 가독성이 좋은 **Pretendard**, 숫자·코드는 **JetBrains Mono** 를 사용했습니다.
