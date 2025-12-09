// 내 자산 방탄 지수 테스트 - 질문 데이터
const questions = [
  {
    id: "income",
    title: "Q1. 월 소득은 어느 정도인가요?",
    choices: [
      { label: "0~200만원", value: { fundamentals: 5 } },
      { label: "200~400만원", value: { fundamentals: 10 } },
      { label: "400~700만원", value: { fundamentals: 15 } },
      { label: "700만원 이상", value: { fundamentals: 20 } }
    ]
  },
  {
    id: "assetRatio",
    title: "Q2. 현재 자산 구성 비율은?",
    subtitle: "(가장 가까운 걸 선택하세요)",
    choices: [
      { label: "현금/예금이 가장 많음", value: { defense: 20, risk: 0 } },
      { label: "주식이 절반 이상", value: { defense: 5, risk: 15 } },
      { label: "코인이 절반 이상", value: { defense: 0, risk: 25 } },
      { label: "예금·주식·코인·부동산 적절히 분산", value: { defense: 20, risk: 5 } }
    ]
  },
  {
    id: "emergency",
    title: "Q3. 비상금은 준비되어 있나요?",
    choices: [
      { label: "없음", value: { defense: 0 } },
      { label: "한 달치 생활비 정도", value: { defense: 10 } },
      { label: "3개월치 이상 보유", value: { defense: 20 } },
      { label: "6개월~1년치 있음", value: { defense: 25 } }
    ]
  },
  {
    id: "insurance",
    title: "Q4. 보험 가입 상태는?",
    choices: [
      { label: "보험 거의 없음", value: { defense: 0 } },
      { label: "민영보험 1~2개 가입", value: { defense: 10 } },
      { label: "건강·상해 등 기본보장 갖춤", value: { defense: 15 } },
      { label: "가성비 보장 체계적으로 갖춤", value: { defense: 20 } }
    ]
  },
  {
    id: "loan",
    title: "Q5. 빚(대출) 규모는?",
    choices: [
      { label: "없음", value: { defense: 10, risk: 0 } },
      { label: "소득의 1년치 이하", value: { defense: 5, risk: 10 } },
      { label: "소득의 1~3년치", value: { defense: 0, risk: 20 } },
      { label: "소득 3년치 이상 빚 있음", value: { defense: -5, risk: 30 } }
    ]
  },
  {
    id: "savingRate",
    title: "Q6. 월 저축률은?",
    choices: [
      { label: "0~10%", value: { fundamentals: 0 } },
      { label: "10~20%", value: { fundamentals: 10 } },
      { label: "20~30%", value: { fundamentals: 15 } },
      { label: "30% 이상", value: { fundamentals: 20 } }
    ]
  },
  {
    id: "jobStability",
    title: "Q7. 소득의 안정성은?",
    choices: [
      { label: "불안정함 (프리랜서/변동 큰 구조)", value: { risk: 15 } },
      { label: "보통", value: { fundamentals: 10 } },
      { label: "안정적 (정규직/고정수입)", value: { fundamentals: 15 } },
      { label: "매우 안정적 · 복수 수입원 있음", value: { fundamentals: 20 } }
    ]
  },
  {
    id: "investmentHabit",
    title: "Q8. 투자 습관에 가장 가까운 것은?",
    choices: [
      { label: "감정 따라 매매", value: { risk: 20 } },
      { label: "ETF 위주 장기투자", value: { defense: 10, fundamentals: 10 } },
      { label: "기업 분석하는 편", value: { fundamentals: 15 } },
      { label: "안전성 중심으로 자산 지킴", value: { defense: 20 } }
    ]
  },
  {
    id: "crisisReact",
    title: "Q9. 금융위기 뉴스 나오면?",
    choices: [
      { label: "겁나서 현금화부터 한다", value: { defense: 10 } },
      { label: "흐름을 지켜본다", value: { fundamentals: 10 } },
      { label: "오히려 기회라고 매수한다", value: { risk: 15 } },
      { label: "신경 안 씀", value: { risk: 10 } }
    ]
  },
  {
    id: "goal",
    title: "Q10. 당신의 돈 목표는?",
    choices: [
      { label: "안전(위험 최소화)", value: { defense: 20 } },
      { label: "균형(위험/수익 적당히)", value: { fundamentals: 15 } },
      { label: "수익(공격 투자)", value: { risk: 25 } },
      { label: "아직 모르겠음", value: { fundamentals: 5 } }
    ]
  }
];

