// 내 자산 방탄 지수 테스트 - 메인 로직

let currentQuestionIndex = 0;
let answers = {};
let scores = {
  defense: 0,
  risk: 0,
  fundamentals: 0
};
let questionScores = {}; // 각 질문별로 이미 계산된 점수 추적

// 페이지 로드 시 첫 질문 표시
function initPage() {
  console.log('페이지 초기화, 현재 경로:', window.location.pathname, window.location.href);
  if (window.location.pathname.includes('result.html') || window.location.href.includes('result.html')) {
    loadResult();
  } else {
    loadQuestion();
  }
}

// DOM이 이미 로드된 경우와 로딩 중인 경우 모두 처리
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  // 이미 로드된 경우
  initPage();
}

// 질문 로드
function loadQuestion() {
  const container = document.getElementById('questionContainer');
  const question = questions[currentQuestionIndex];
  
  if (!question) {
    calculateResult();
    return;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';

  let html = `
    <div class="question-card">
      <h2>${question.title}</h2>
      ${question.subtitle ? `<p class="subtitle">${question.subtitle}</p>` : ''}
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

  // 이전 답변이 있으면 선택 상태 복원 (되돌아왔을 경우)
  if (answers[question.id] !== undefined) {
    const prevChoiceIndex = answers[question.id];
    const prevChoiceId = `choice-${currentQuestionIndex}-${prevChoiceIndex}`;
    document.getElementById(prevChoiceId).classList.add('selected');
  }
}

// 선택지 선택
function selectChoice(index, choiceId) {
  const question = questions[currentQuestionIndex];
  
  // 같은 질문의 다른 선택지들 제거
  question.choices.forEach((_, i) => {
    const id = `choice-${currentQuestionIndex}-${i}`;
    document.getElementById(id).classList.remove('selected');
  });

  // 선택한 항목에 selected 클래스 추가
  document.getElementById(choiceId).classList.add('selected');

  // 이전 답변의 점수 제거 (질문을 다시 선택한 경우)
  if (questionScores[question.id]) {
    const prevScore = questionScores[question.id];
    scores.defense -= prevScore.defense || 0;
    scores.risk -= prevScore.risk || 0;
    scores.fundamentals -= prevScore.fundamentals || 0;
  }

  // 답변 저장
  answers[question.id] = index;

  // 새로운 점수 계산 및 저장
  const selectedChoice = question.choices[index];
  const newScore = {
    defense: selectedChoice.value.defense || 0,
    risk: selectedChoice.value.risk || 0,
    fundamentals: selectedChoice.value.fundamentals || 0
  };
  questionScores[question.id] = newScore;

  // 점수 업데이트
  scores.defense += newScore.defense;
  scores.risk += newScore.risk;
  scores.fundamentals += newScore.fundamentals;

  // 자동으로 다음 질문으로 이동 (짧은 딜레이 후)
  setTimeout(() => {
    handleNext();
  }, 400); // 0.4초 후 자동 이동
}

// 다음 버튼
function handleNext() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex >= questions.length) {
    calculateResult();
  } else {
    loadQuestion();
  }
}

// 결과 계산
function calculateResult() {
  console.log('결과 계산 시작', scores);
  
  // 방탄지수 계산
  const defenseScore = Math.min(100, Math.max(0, scores.defense));
  const fundamentalsScore = Math.min(100, Math.max(0, scores.fundamentals));
  const riskScore = Math.min(100, Math.max(0, scores.risk));
  
  console.log('점수:', { defenseScore, fundamentalsScore, riskScore });
  
  // 방탄지수 = defense * 0.45 + fundamentals * 0.35 + (100 - risk) * 0.20
  const shieldScore = Math.round(
    defenseScore * 0.45 + 
    fundamentalsScore * 0.35 + 
    (100 - riskScore) * 0.20
  );

  // 결과 타입 결정
  let resultType = 'balanced';
  let typeName = '현실형 밸런스 투자자';
  let typeDescription = '안정성과 수익성의 균형을 추구하는 현명한 투자자입니다.';
  let typeAdvice = [
    'ETF 중심의 장기 투자를 꾸준히 이어가세요',
    '비상금은 월 지출의 3~6개월치를 유지하세요',
    '세금 최적화를 위한 IRP, 연금저축 활용을 검토해보세요',
    '자산을 주식/채권/현금으로 70/20/10 비율로 분산하는 것을 권장합니다'
  ];

  if (defenseScore > 50 && riskScore < 30) {
    resultType = 'defense';
    typeName = '공포형 디펜스 투자자';
    typeDescription = '안전성을 최우선으로 생각하는 신중한 투자자입니다. 현금 비중이 높고 위험 회피 성향이 강합니다.';
    typeAdvice = [
      '과도한 현금 보유는 인플레이션에 취약할 수 있습니다',
      '적정 리스크도 필요합니다. 주식형 ETF를 20~30% 추가해보세요',
      '자산 분산을 위해 부동산, 금 등 다른 자산도 검토해보세요',
      '장기적으로는 주식 비중을 점진적으로 늘려가며 성장 포트폴리오를 구축하세요'
    ];
  } else if (riskScore > 40 || (defenseScore < 30 && fundamentalsScore < 30)) {
    resultType = 'risk';
    typeName = '공격형 리스크 테이커';
    typeDescription = '높은 수익을 추구하는 공격적인 투자자입니다. 주식이나 코인에 대한 노출이 높은 편입니다.';
    typeAdvice = [
      '반드시 비상금을 확보하세요 (월 지출의 3~6개월치)',
      '보험(건강보험, 상해보험 등)을 체계적으로 가입하여 리스크를 헤지하세요',
      '전체 자산의 30% 이상을 고위험 자산에 투자하지 않도록 주의하세요',
      '분산 투자를 통해 변동성을 줄이되, 성장 포트폴리오는 유지하세요'
    ];
  }

  // 결과 페이지로 이동
  const resultData = {
    shieldScore: Math.min(100, Math.max(0, shieldScore)),
    defenseScore: defenseScore,
    riskScore: riskScore,
    fundamentalsScore: fundamentalsScore,
    resultType: resultType,
    typeName: typeName,
    typeDescription: typeDescription,
    typeAdvice: typeAdvice
  };

  // URL에 결과 데이터 인코딩 (한글 지원)
  const jsonString = JSON.stringify(resultData);
  const encodedData = encodeURIComponent(jsonString);
  console.log('결과 페이지로 이동:', `result.html?data=${encodedData}`);
  window.location.href = `result.html?data=${encodedData}`;
}

// 결과 페이지 로드
function loadResult() {
  console.log('결과 페이지 로드 시작');
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('data');
  
  console.log('URL 파라미터:', { encodedData });
  
  if (!encodedData) {
    console.error('결과 데이터가 없습니다');
    window.location.href = 'index.html';
    return;
  }

  try {
    const decodedData = decodeURIComponent(encodedData);
    const resultData = JSON.parse(decodedData);
    console.log('결과 데이터 파싱 성공:', resultData);
    displayResult(resultData);
  } catch (e) {
    console.error('결과 데이터 파싱 실패:', e);
    window.location.href = 'index.html';
  }
}

// 결과 표시
function displayResult(data) {
  const container = document.querySelector('.container') || document.body;
  
  container.innerHTML = `
    <div class="result-container">
      <div class="header">
        <h1>🛡️ 나의 자산 방탄 지수</h1>
        <p class="subtitle">테스트 결과</p>
      </div>

      <div class="score-circle">
        <div>
          <div class="score-value">${data.shieldScore}</div>
          <div class="score-label">점</div>
        </div>
      </div>

      <!-- 광고 영역 1 (상단) -->
      <div style="text-align: center; margin: 20px 0;">
        <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit="DAN-eHVmT1JOh3rXNVsS"
             data-ad-width="300"
             data-ad-height="250"></ins>
      </div>

      <div class="result-type">
        <h2>${data.typeName}</h2>
        <p class="description">${data.typeDescription}</p>
        
        <div class="advice-section">
          <h3>💡 투자 조언</h3>
          <ul>
            ${data.typeAdvice.map(advice => `<li>${advice}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="chart-container">
        <h3 style="margin-bottom: 20px; text-align: center;">상세 분석</h3>
        
        <div class="chart-item">
          <div class="chart-label">
            <span>🛡️ 방어력 (Defense)</span>
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
            <span>⚠️ 위험 노출 (Risk)</span>
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
            <span>💪 기초 체력 (Fundamentals)</span>
            <span>${Math.round(data.fundamentalsScore)}점</span>
          </div>
          <div class="chart-bar">
            <div class="chart-fill fundamentals" style="width: ${data.fundamentalsScore}%">
              ${Math.round(data.fundamentalsScore)}%
            </div>
          </div>
        </div>
      </div>

      <!-- 광고 영역 2 (차트 후) -->
      <div style="text-align: center; margin: 20px 0;">
        <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit="DAN-eHVmT1JOh3rXNVsS"
             data-ad-width="300"
             data-ad-height="250"></ins>
      </div>

      <div class="guide-section">
        <h3>📚 자산 관리 기본 가이드</h3>
        
        <div class="guide-item">
          <h4>1. 비상금 준비하기</h4>
          <p>최소 월 지출의 3개월치, 이상적으로는 6개월치를 예금 통장에 준비하세요. 갑작스러운 실직이나 긴급 상황에 대비할 수 있습니다.</p>
        </div>

        <div class="guide-item">
          <h4>2. 자산 분산 전략 (70/20/10)</h4>
          <p>주식형 자산 70%, 채권형 20%, 현금 10%로 구성하는 것을 기본으로 합니다. 연령과 성향에 따라 조정하세요.</p>
        </div>

        <div class="guide-item">
          <h4>3. ETF 장기 투자</h4>
          <p>개별 주식보다는 코스피/코스닥 지수를 추종하는 ETF를 중심으로 투자하는 것이 장기적으로 안정적입니다.</p>
        </div>

        <div class="guide-item">
          <h4>4. 보험 기본 구성</h4>
          <p>건강보험, 상해보험 등 기본 보장은 필수입니다. 과도한 보험은 자산 축적에 부담이 될 수 있으니 가성비를 고려하세요.</p>
        </div>

        <div class="guide-item">
          <h4>5. 세금 최적화</h4>
          <p>연금저축(IRP)이나 퇴직연금을 활용하면 세금 혜택을 받을 수 있습니다. 장기 저축 계획에 포함시켜보세요.</p>
        </div>
      </div>

      <!-- 광고 영역 3 (가이드 후) -->
      <div style="text-align: center; margin: 20px 0;">
        <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit="DAN-eHVmT1JOh3rXNVsS"
             data-ad-width="300"
             data-ad-height="250"></ins>
      </div>

      <div class="share-buttons">
        <button class="share-btn kakao" onclick="shareKakao()">
          카카오톡 공유
        </button>
        <button class="share-btn" onclick="shareLink()">
          링크 복사
        </button>
      </div>

      <!-- 광고 영역 4 (하단) -->
      <div style="text-align: center; margin: 20px 0;">
        <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit="DAN-eHVmT1JOh3rXNVsS"
             data-ad-width="300"
             data-ad-height="250"></ins>
      </div>

      <button class="btn restart-btn" onclick="restartTest()">다시 테스트하기</button>
    </div>
  `;

  // 차트 애니메이션
  setTimeout(() => {
    const fills = container.querySelectorAll('.chart-fill');
    fills.forEach(fill => {
      const width = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = width;
      }, 100);
    });
  }, 500);

  // 카카오 애드핏 광고 초기화
  if (typeof kakao !== 'undefined' && kakao.ad) {
    try {
      kakao.ad.init();
    } catch(e) {
      console.log('카카오 애드핏 초기화:', e);
    }
  }
}

// 카카오톡 공유
function shareKakao() {
  const url = window.location.href;
  const title = '내 자산 방탄 지수 테스트';
  const description = '경제위기 와도 내 돈은 얼마나 버틸까?';
  
  // 카카오톡 JavaScript SDK 사용 (실제로는 SDK 초기화 필요)
  if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: 'https://via.placeholder.com/1200x630/1a1a2e/e94560?text=내+자산+방탄+지수+테스트',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '테스트 하기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  } else {
    // SDK가 없는 경우 링크 공유로 대체
    shareLink();
    alert('카카오톡 공유를 사용하려면 카카오 JavaScript SDK가 필요합니다.');
  }
}

// 링크 복사
function shareLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('링크가 클립보드에 복사되었습니다!');
  }).catch(() => {
    // 폴백: 텍스트 영역 사용
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('링크가 클립보드에 복사되었습니다!');
  });
}

// 테스트 다시하기
function restartTest() {
  window.location.href = 'index.html';
}

