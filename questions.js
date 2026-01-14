// 내 자산 방탄 지수 테스트 - 질문 데이터 (다국어)
const questionsKo = [
  {
    id: "income",
    title: "Q1. 월 소득은 어느 정도인가요?",
    choices: [
      { label: "0~200만원", value: { fundamentals: 5 } },
      { label: "200~400만원", value: { fundamentals: 10 } },
      { label: "400~700만원", value: { fundamentals: 15 } },
      { label: "700만원 이상", value: { fundamentals: 20 } },
    ],
  },
  {
    id: "assetRatio",
    title: "Q2. 현재 자산 구성 비율은?",
    subtitle: "(가장 가까운 걸 선택하세요)",
    choices: [
      { label: "현금/예금이 가장 많음", value: { defense: 20, risk: 0 } },
      { label: "주식이 절반 이상", value: { defense: 5, risk: 15 } },
      { label: "코인이 절반 이상", value: { defense: 0, risk: 25 } },
      {
        label: "예금·주식·코인·부동산 적절히 분산",
        value: { defense: 20, risk: 5 },
      },
    ],
  },
  {
    id: "emergency",
    title: "Q3. 비상금은 준비되어 있나요?",
    choices: [
      { label: "없음", value: { defense: 0 } },
      { label: "한 달치 생활비 정도", value: { defense: 10 } },
      { label: "3개월치 이상 보유", value: { defense: 20 } },
      { label: "6개월~1년치 있음", value: { defense: 25 } },
    ],
  },
  {
    id: "insurance",
    title: "Q4. 보험 가입 상태는?",
    choices: [
      { label: "보험 거의 없음", value: { defense: 0 } },
      { label: "민영보험 1~2개 가입", value: { defense: 10 } },
      { label: "건강·상해 등 기본보장 갖춤", value: { defense: 15 } },
      { label: "가성비 보장 체계적으로 갖춤", value: { defense: 20 } },
    ],
  },
  {
    id: "loan",
    title: "Q5. 빚(대출) 규모는?",
    choices: [
      { label: "없음", value: { defense: 10, risk: 0 } },
      { label: "소득의 1년치 이하", value: { defense: 5, risk: 10 } },
      { label: "소득의 1~3년치", value: { defense: 0, risk: 20 } },
      { label: "소득 3년치 이상 빚 있음", value: { defense: -5, risk: 30 } },
    ],
  },
  {
    id: "savingRate",
    title: "Q6. 월 저축률은?",
    choices: [
      { label: "0~10%", value: { fundamentals: 0 } },
      { label: "10~20%", value: { fundamentals: 10 } },
      { label: "20~30%", value: { fundamentals: 15 } },
      { label: "30% 이상", value: { fundamentals: 20 } },
    ],
  },
  {
    id: "jobStability",
    title: "Q7. 소득의 안정성은?",
    choices: [
      { label: "불안정함 (프리랜서/변동 큰 구조)", value: { risk: 15 } },
      { label: "보통", value: { fundamentals: 10 } },
      { label: "안정적 (정규직/고정수입)", value: { fundamentals: 15 } },
      {
        label: "매우 안정적 · 복수 수입원 있음",
        value: { fundamentals: 20 },
      },
    ],
  },
  {
    id: "investmentHabit",
    title: "Q8. 투자 습관에 가장 가까운 것은?",
    choices: [
      { label: "감정 따라 매매", value: { risk: 20 } },
      { label: "ETF 위주 장기투자", value: { defense: 10, fundamentals: 10 } },
      { label: "기업 분석하는 편", value: { fundamentals: 15 } },
      { label: "안전성 중심으로 자산 지킴", value: { defense: 20 } },
    ],
  },
  {
    id: "crisisReact",
    title: "Q9. 금융위기 뉴스 나오면?",
    choices: [
      { label: "겁나서 현금화부터 한다", value: { defense: 10 } },
      { label: "흐름을 지켜본다", value: { fundamentals: 10 } },
      { label: "오히려 기회라고 매수한다", value: { risk: 15 } },
      { label: "신경 안 씀", value: { risk: 10 } },
    ],
  },
  {
    id: "goal",
    title: "Q10. 당신의 돈 목표는?",
    choices: [
      { label: "안전(위험 최소화)", value: { defense: 20 } },
      { label: "균형(위험/수익 적당히)", value: { fundamentals: 15 } },
      { label: "수익(공격 투자)", value: { risk: 25 } },
      { label: "아직 모르겠음", value: { fundamentals: 5 } },
    ],
  },
];

const questionsEn = [
  {
    id: "income",
    title: "Q1. What is your monthly income range?",
    choices: [
      { label: "Under ₩2M", value: { fundamentals: 5 } },
      { label: "₩2M–₩4M", value: { fundamentals: 10 } },
      { label: "₩4M–₩7M", value: { fundamentals: 15 } },
      { label: "Above ₩7M", value: { fundamentals: 20 } },
    ],
  },
  {
    id: "assetRatio",
    title: "Q2. Which asset mix describes you?",
    subtitle: "(Pick the closest match)",
    choices: [
      { label: "Mostly cash/savings", value: { defense: 20, risk: 0 } },
      { label: "Stocks make up 50%+", value: { defense: 5, risk: 15 } },
      { label: "50%+ crypto", value: { defense: 0, risk: 25 } },
      {
        label: "Balanced cash, stocks, crypto, real estate",
        value: { defense: 20, risk: 5 },
      },
    ],
  },
  {
    id: "emergency",
    title: "Q3. Do you have an emergency fund?",
    choices: [
      { label: "None", value: { defense: 0 } },
      { label: "One month of expenses", value: { defense: 10 } },
      { label: "Three months or more", value: { defense: 20 } },
      { label: "Six months to a year", value: { defense: 25 } },
    ],
  },
  {
    id: "insurance",
    title: "Q4. Insurance coverage?",
    choices: [
      { label: "Almost none", value: { defense: 0 } },
      { label: "1–2 private plans", value: { defense: 10 } },
      { label: "Basic health/accident policies", value: { defense: 15 } },
      { label: "Well-structured, cost-effective cover", value: { defense: 20 } },
    ],
  },
  {
    id: "loan",
    title: "Q5. How large are your debts?",
    choices: [
      { label: "None", value: { defense: 10, risk: 0 } },
      { label: "Less than 1x annual income", value: { defense: 5, risk: 10 } },
      { label: "1–3x annual income", value: { defense: 0, risk: 20 } },
      { label: "More than 3x income", value: { defense: -5, risk: 30 } },
    ],
  },
  {
    id: "savingRate",
    title: "Q6. What's your monthly savings rate?",
    choices: [
      { label: "0–10%", value: { fundamentals: 0 } },
      { label: "10–20%", value: { fundamentals: 10 } },
      { label: "20–30%", value: { fundamentals: 15 } },
      { label: "Over 30%", value: { fundamentals: 20 } },
    ],
  },
  {
    id: "jobStability",
    title: "Q7. How stable is your income?",
    choices: [
      { label: "Unstable (freelance/variable)", value: { risk: 15 } },
      { label: "Average", value: { fundamentals: 10 } },
      { label: "Stable (full-time/fixed)", value: { fundamentals: 15 } },
      { label: "Very stable + multiple sources", value: { fundamentals: 20 } },
    ],
  },
  {
    id: "investmentHabit",
    title: "Q8. Which investment habit fits you?",
    choices: [
      { label: "Emotion-driven trading", value: { risk: 20 } },
      {
        label: "ETF-focused long-term investor",
        value: { defense: 10, fundamentals: 10 },
      },
      { label: "Company analyst type", value: { fundamentals: 15 } },
      { label: "Safety-first capital preservation", value: { defense: 20 } },
    ],
  },
  {
    id: "crisisReact",
    title: "Q9. When crisis news hits?",
    choices: [
      { label: "Panic sell everything", value: { defense: 10 } },
      { label: "Observe the flow", value: { fundamentals: 10 } },
      { label: "Buy the dip", value: { risk: 15 } },
      { label: "Ignore it", value: { risk: 10 } },
    ],
  },
  {
    id: "goal",
    title: "Q10. What is your financial goal?",
    choices: [
      { label: "Safety (minimize risk)", value: { defense: 20 } },
      { label: "Balance (risk & return)", value: { fundamentals: 15 } },
      { label: "Growth (aggressive)", value: { risk: 25 } },
      { label: "Not sure yet", value: { fundamentals: 5 } },
    ],
  },
];

const questions = {
  ko: questionsKo,
  en: questionsEn,
};
