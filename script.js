// 내 자산 방탄 지수 테스트 - 메인 로직 (다국어 지원)

const languagePacks = {
  ko: {
    metaTitle: "내 자산 방탄 지수 테스트",
    heroTitle: "🛡️ 내 자산 방탄 지수 테스트",
    heroSubtitle: "경제위기 와도 내 자산은 얼마나 버틸까?",
    heroDescription: "10문항으로 알아보는 나의 자산 방어력",
    shareHint: "링크를 복사해 친구에게 공유해보세요.",
    loadingText: "결과를 분석하고 있습니다...",
    alertNeedTest: "카드를 다 채운 뒤 결과를 보세요.",
    shareLinkCopied: "링크가 클립보드에 복사되었습니다!",
    resultHeading: "🛡️ 나의 자산 방탄 지수",
    resultSubtitle: "테스트 결과",
    chartLabels: {
      defense: "🛡️ 방어력 (Defense)",
      risk: "⚠️ 위험 노출 (Risk)",
      fundamentals: "💪 기초 체력 (Fundamentals)",
    },
    guideTitle: "📚 자산 관리 기본 가이드",
    guideItems: [
      {
        title: "1. 비상금 확보",
        body: "월 지출의 3~6개월치 금액을 현금/단기예금으로 갖춰 두면 충격을 버틸 수 있습니다.",
      },
      {
        title: "2. 70/20/10 자산 비율",
        body: "주식형 자산 70%, 채권/안전자산 20%, 현금 10% 정도로 균형을 유지하세요.",
      },
      {
        title: "3. ETF 중심 장기 투자",
        body: "지수를 따라가는 ETF를 꾸준히 적립해 변동성을 분산하세요.",
      },
      {
        title: "4. 보험으로 위험 대비",
        body: "건강·상해 보험을 기본으로 갖추고, 필요 시 가족력 기반으로 확장하세요.",
      },
      {
        title: "5. 세금 혜택 활용",
        body: "IRP/연금저축 등 세금 우대 상품을 포함해 장기 저축을 설계하세요.",
      },
    ],
    shareLinkButton: "링크 복사",
    restartButton: "다시 테스트하기",
    shareMessage: "내 자산 방탄 지수 테스트: https://money.funnyfunny.cloud/",
    copyAlert: "링크가 클립보드에 복사되었습니다!",
    moreTestsButton: "더 많은 테스트 해보기",
  },
  en: {
    metaTitle: "Asset Shield Index Test",
    heroTitle: "🛡️ Asset Shield Index Test",
    heroSubtitle: "How would your money survive a crisis?",
    heroDescription: "10 quick questions that measure your financial defenses.",
    shareHint: "Copy the link to share your result.",
    loadingText: "Analyzing your result...",
    alertNeedTest: "Please finish the quiz before viewing the result.",
    shareLinkCopied: "Link copied to clipboard!",
    resultHeading: "🛡️ Asset Shield Index",
    resultSubtitle: "Your test result",
    chartLabels: {
      defense: "🛡️ Defense",
      risk: "⚠️ Risk exposure",
      fundamentals: "💪 Fundamentals",
    },
    guideTitle: "📚 Financial guardrails",
    guideItems: [
      {
        title: "1. Build an emergency fund",
        body: "Save 3–6 months of your expenses in liquid accounts for sudden shocks.",
      },
      {
        title: "2. Keep a 70/20/10 split",
        body: "Aim for 70% growth assets, 20% stable income, 10% cash for flexibility.",
      },
      {
        title: "3. Stay ETF-focused",
        body: "Regularly invest in low-fee ETFs to smooth volatility over time.",
      },
      {
        title: "4. Cover risks with insurance",
        body: "Maintain health/accident policies and adjust coverage as life changes.",
      },
      {
        title: "5. Use tax-advantaged accounts",
        body: "Include IRP, pension savings, or retirement accounts in your savings plan.",
      },
    ],
    shareLinkButton: "Copy link",
    restartButton: "Restart test",
    shareMessage: "Check my score: https://money.funnyfunny.cloud/",
    copyAlert: "Link copied to clipboard!",
    moreTestsButton: "Try more tests",
  },
};

const resultLocales = {
  balanced: {
    ko: {
      typeName: "현실형 밸런스 투자자",
      typeDescription: "안정성과 수익성을 균형 있게 챙기며 냉정하게 판단하는 스타일입니다.",
      typeAdvice: [
        "ETF 중심 장기 투자를 꾸준히 이어가세요.",
        "비상금은 월 지출의 3~6개월치를 유지하세요.",
        "IRP/연금저축으로 세금 혜택을 챙기세요.",
        "자산을 주식·채권·현금으로 분산하세요.",
      ],
    },
    en: {
      typeName: "Balanced realist",
      typeDescription: "You blend safety and returns, keeping a clear head during volatility.",
      typeAdvice: [
        "Continue regular investments into diversified ETFs.",
        "Keep 3–6 months of expenses as emergency cash.",
        "Use tax-advantaged IRP/pension accounts when possible.",
        "Distribute assets across equities, bonds, and cash.",
      ],
    },
  },
  defense: {
    ko: {
      typeName: "공포형 디펜스 투자자",
      typeDescription: "리스크 회피 성향이 강하며 안전성을 최우선으로 합니다.",
      typeAdvice: [
        "현금 비중이 높을수록 인플레이션 위험에 대비하세요.",
        "주식 비중을 조금씩 늘리며 성장 포트폴리오를 구축하세요.",
        "금·채권 등 다른 자산으로 방어막을 확장하세요.",
        "장기 관점에서 리스크를 관리하며 기회를 기다리세요.",
      ],
    },
    en: {
      typeName: "Fearful defender",
      typeDescription: "You prioritize safety even when opportunity knocks.",
      typeAdvice: [
        "Too much cash can lose value—consider adding low-volatility equities.",
        "Build a mix of bonds, gold, and cash to spread risk.",
        "Gradually grow your stock exposure while keeping hedges.",
        "Stay patient and let the long-term trend work for you.",
      ],
    },
  },
  risk: {
    ko: {
      typeName: "공격형 리스크 테이커",
      typeDescription: "높은 수익을 노리며 리스크 노출이 큰 스타일입니다.",
      typeAdvice: [
        "비상금을 먼저 확보한 뒤 고위험 자산을 조절하세요.",
        "보험(건강/상해)을 통해 급변 상황을 대비하세요.",
        "전체 자산의 30% 이상을 고위험으로 두지 마세요.",
        "분산 투자를 유지하며 변동성을 관리하세요.",
      ],
    },
    en: {
      typeName: "Aggressive risk taker",
      typeDescription: "You seek high returns, often moving fast through volatile markets.",
      typeAdvice: [
        "Lock in 3–6 months of emergency cash before chasing high risk.",
        "Hedge sudden shocks with health or accident cover.",
        "Limit high-risk positions to around 30% of your portfolio.",
        "Stay diversified to temper volatility while keeping growth assets.",
      ],
    },
  },
};

let currentLang = "ko";
let currentQuestionIndex = 0;
let answers = {};
let scores = { defense: 0, risk: 0, fundamentals: 0 };
let questionScores = {};
let lastResultData = null;

function getPack() {
  return languagePacks[currentLang] || languagePacks.ko;
}

function t(key, vars = {}) {
  const pack = getPack();
  const template = pack[key] ?? languagePacks.ko[key] ?? key;
  if (typeof template !== "string") return template;
  return template.replace(/\{(\w+)\}/g, (_, token) =>
    vars[token] !== undefined ? vars[token] : `{${token}}`
  );
}

function detectLang() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("lang");
  if (param && languagePacks[param]) return param;
  const stored = localStorage.getItem("preferredLang");
  if (stored && languagePacks[stored]) return stored;
  const intlLocale =
    typeof Intl === "object" && typeof Intl.DateTimeFormat === "function"
      ? Intl.DateTimeFormat().resolvedOptions().locale
      : "";
  const browserLang =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  if (browserLang && browserLang.toLowerCase().startsWith("ko")) {
    return "ko";
  }
  return defaultLang;
}

function applyTranslations() {
  document.title = t("metaTitle");
  document.body.classList.toggle("lang-en", currentLang === "en");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.setAttribute("placeholder", t(key));
  });
}

function setLang(lang, options = {}) {
  const nextLang = languagePacks[lang] ? lang : "ko";
  currentLang = nextLang;
  document.documentElement.lang = nextLang;
  localStorage.setItem("preferredLang", nextLang);
  document
    .querySelectorAll(".lang-switch button")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.lang === nextLang)
    );
  applyTranslations();
  if (!options.skipRender) {
    if (document.getElementById("questionContainer")) {
      loadQuestion();
    } else if (lastResultData) {
      displayResult(lastResultData);
    }
  }
  if (options.updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLang);
    window.history.replaceState({}, "", url);
  }
}

function getQuestionSet() {
  return questions[currentLang] || questions.ko;
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-switch button").forEach((button) => {
    button.addEventListener("click", () => {
      setLang(button.dataset.lang, { updateUrl: true });
    });
  });
}

function initPage() {
  if (
    window.location.pathname.includes("result.html") ||
    window.location.href.includes("result.html")
  ) {
    loadResult();
  } else {
    loadQuestion();
  }
}

function loadQuestion() {
  const dataset = getQuestionSet();
  const container = document.getElementById("questionContainer");
  if (!container) return;
  const question = dataset[currentQuestionIndex];
  if (!question) {
    calculateResult();
    return;
  }
  const progress = ((currentQuestionIndex + 1) / dataset.length) * 100;
  document.getElementById("progressFill").style.width = `${progress}%`;

  let html = `
    <div class="question-card">
      <h2>${question.title}</h2>
      ${question.subtitle ? `<p class="subtitle">${question.subtitle}</p>` : ""}
      <div class="choices">
  `;

  question.choices.forEach((choice, index) => {
    const choiceId = `choice-${currentQuestionIndex}-${index}`;
    html += `
      <div class="choice-item" 
           onclick="selectChoice(${index}, '${choiceId}')" 
           id="${choiceId}">
        ${choice.label}
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;

  if (answers[question.id] !== undefined) {
    const prevChoiceId = `choice-${currentQuestionIndex}-${answers[question.id]}`;
    const el = document.getElementById(prevChoiceId);
    if (el) el.classList.add("selected");
  }
}

function selectChoice(index, choiceId) {
  const dataset = getQuestionSet();
  const question = dataset[currentQuestionIndex];
  if (!question) return;
  question.choices.forEach((_, i) => {
    const id = `choice-${currentQuestionIndex}-${i}`;
    document.getElementById(id)?.classList.remove("selected");
  });
  document.getElementById(choiceId)?.classList.add("selected");

  if (questionScores[question.id]) {
    const prev = questionScores[question.id];
    scores.defense -= prev.defense || 0;
    scores.risk -= prev.risk || 0;
    scores.fundamentals -= prev.fundamentals || 0;
  }

  answers[question.id] = index;
  const selectedChoice = question.choices[index];
  const newScore = {
    defense: selectedChoice.value.defense || 0,
    risk: selectedChoice.value.risk || 0,
    fundamentals: selectedChoice.value.fundamentals || 0,
  };
  questionScores[question.id] = newScore;
  scores.defense += newScore.defense;
  scores.risk += newScore.risk;
  scores.fundamentals += newScore.fundamentals;

  setTimeout(() => {
    handleNext();
  }, 400);
}

function handleNext() {
  currentQuestionIndex++;
  const dataset = getQuestionSet();
  if (currentQuestionIndex >= dataset.length) {
    calculateResult();
  } else {
    loadQuestion();
  }
}

function calculateResult() {
  const defenseScore = Math.min(100, Math.max(0, scores.defense));
  const fundamentalsScore = Math.min(100, Math.max(0, scores.fundamentals));
  const riskScore = Math.min(100, Math.max(0, scores.risk));
  const shieldScore = Math.round(
    defenseScore * 0.45 +
      fundamentalsScore * 0.35 +
      (100 - riskScore) * 0.2
  );

  let resultType = "balanced";
  if (defenseScore > 50 && riskScore < 30) {
    resultType = "defense";
  } else if (riskScore > 40 || (defenseScore < 30 && fundamentalsScore < 30)) {
    resultType = "risk";
  }

  const locale =
    resultLocales[resultType][currentLang] ||
    resultLocales[resultType]["ko"];

  const resultData = {
    shieldScore: shieldScore,
    defenseScore,
    riskScore,
    fundamentalsScore,
    resultType,
    typeName: locale.typeName,
    typeDescription: locale.typeDescription,
    typeAdvice: locale.typeAdvice,
  };

  try {
    localStorage.setItem("testResult", JSON.stringify(resultData));
    window.location.href = "result.html";
  } catch (error) {
    const encoded = encodeURIComponent(JSON.stringify(resultData));
    window.location.href = `result.html?data=${encoded}`;
  }
}

function loadResult() {
  let resultData = null;
  try {
    const stored = localStorage.getItem("testResult");
    if (stored) {
      resultData = JSON.parse(stored);
      localStorage.removeItem("testResult");
    }
  } catch (error) {
    console.error(error);
  }

  if (!resultData) {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");
    if (encoded) {
      try {
        resultData = JSON.parse(decodeURIComponent(encoded));
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (!resultData) {
    alert(t("alertNeedTest"));
    window.location.href = "index.html";
    return;
  }

  lastResultData = resultData;
  displayResult(resultData);
}

function displayResult(data) {
  lastResultData = data;
  const container = document.querySelector(".container") || document.body;
  const pack = getPack();

  const guideHtml = pack.guideItems
    .map(
      (item) => `
      <div class="guide-item">
        <h4>${item.title}</h4>
        <p>${item.body}</p>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="result-container">
      <div class="header">
        <h1>${pack.resultHeading}</h1>
        <p class="subtitle">${pack.resultSubtitle}</p>
      </div>
      <div class="score-circle">
        <div>
          <div class="score-value">${data.shieldScore}</div>
          <div class="score-label">점</div>
        </div>
      </div>
      <div class="result-type">
        <h2>${data.typeName}</h2>
        <p class="description">${data.typeDescription}</p>
        <div class="advice-section">
          <h3>${pack.guideTitle}</h3>
          <div class="guide-grid">${guideHtml}</div>
        </div>
      </div>
      <div class="chart-container">
        <h3 style="margin-bottom: 20px; text-align: center;">${pack.chartLabels.defense}</h3>
        <div class="chart-item">
          <div class="chart-label">
            <span>${pack.chartLabels.defense}</span>
            <span>${Math.round(data.defenseScore)}점</span>
          </div>
          <div class="chart-bar">
            <div class="chart-fill defense" style="width: ${data.defenseScore}%">
              ${Math.round(data.defenseScore)}%
            </div>
          </div>
        </div>
        <div class="chart-item">
          <div class="chart-label">
            <span>${pack.chartLabels.risk}</span>
            <span>${Math.round(data.riskScore)}점</span>
          </div>
          <div class="chart-bar">
            <div class="chart-fill risk" style="width: ${data.riskScore}%">
              ${Math.round(data.riskScore)}%
            </div>
          </div>
        </div>
        <div class="chart-item">
          <div class="chart-label">
            <span>${pack.chartLabels.fundamentals}</span>
            <span>${Math.round(data.fundamentalsScore)}점</span>
          </div>
          <div class="chart-bar">
            <div class="chart-fill fundamentals" style="width: ${data.fundamentalsScore}%">
              ${Math.round(data.fundamentalsScore)}%
            </div>
          </div>
        </div>
      </div>
      <div class="share-buttons">
        <button class="share-btn" onclick="shareLink()">
          ${pack.shareLinkButton}
        </button>
      </div>
      <button class="btn restart-btn" onclick="restartTest()">
        ${pack.restartButton}
      </button>
    </div>
  `;

  applyTranslations();

  setTimeout(() => {
    const fills = container.querySelectorAll(".chart-fill");
    fills.forEach((fill) => {
      const width = fill.style.width;
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = width;
      }, 100);
    });
  }, 500);
}

function shareLink() {
  const message = getPack().shareMessage;
  navigator.clipboard
    .writeText(message)
    .then(() => {
      alert(t("shareLinkCopied"));
    })
    .catch(() => {
      const textarea = document.createElement("textarea");
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert(t("shareLinkCopied"));
    });
}

function restartTest() {
  currentQuestionIndex = 0;
  answers = {};
  scores = { defense: 0, risk: 0, fundamentals: 0 };
  questionScores = {};
  lastResultData = null;
  try {
    localStorage.removeItem("testResult");
  } catch (error) {
    console.warn(error);
  }
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  setLang(detectLang(), { updateUrl: false, skipRender: true });
  initPage();
});
