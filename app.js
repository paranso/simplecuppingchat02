document.addEventListener('DOMContentLoaded', function() {
  // 버튼 및 결과 영역
  const saveButton       = document.getElementById('save-button');
  const resultDisplay    = document.getElementById('result-display');

  // 0. 기본 정보 입력 요소
  const roastingDateInput   = document.getElementById('roasting-date');
  const cuppingDateInput    = document.getElementById('cupping-date');
  const userIdInput         = document.getElementById('user-id');
  const coffeeNameInput     = document.getElementById('coffee-name');
  const waterTypeInput      = document.getElementById('water-type');    // 추가된 물 종류
  const dropTempInput       = document.getElementById('drop-temp');
  const agtronInput         = document.getElementById('agtron');
  const grindSizeInput      = document.getElementById('grind-size');
  const beanAmountInput     = document.getElementById('bean-amount');
  const brewAmountInput     = document.getElementById('brew-amount');
  const ratioDisplay        = document.getElementById('ratio-display');

  // 1. 향 맡기
  const aromaCheckboxes     = document.querySelectorAll('#aroma-section input[type="checkbox"]');
  const aromaText           = document.getElementById('aroma-text');
  const aromaRatingInput    = document.getElementById('aroma-rating');

  // 2. 맛보기
  const tasteCheckboxes     = document.querySelectorAll('#taste-section input[type="checkbox"]');
  const tasteText           = document.getElementById('taste-text');
  const tasteRatingInput    = document.getElementById('taste-rating');

  // 3. 전체적인 느낌
  const feelCheckboxes      = document.querySelectorAll('#feel-section input[type="checkbox"]');
  const feelText            = document.getElementById('feel-text');
  const overallRatingInput  = document.getElementById('overall-rating');

  // 4. 추가 메모 & 5. 로스팅 추천
  const additionalNoteInput         = document.getElementById('additional-note');
  const roastingRecommendationInput = document.getElementById('roasting-recommendation');

  // ————————— 비율 계산 함수 —————————
  function calculateRatio() {
    const bean = parseFloat(beanAmountInput.value);
    const brew = parseFloat(brewAmountInput.value);
    if (!isNaN(bean) && !isNaN(brew) && bean > 0) {
      const r = (brew / bean).toFixed(1);
      ratioDisplay.textContent = `비율: 1:${r}`;
      ratioDisplay.style.display = 'inline-block';
    } else {
      ratioDisplay.style.display = 'none';
    }
  }
  beanAmountInput.addEventListener('input', calculateRatio);
  brewAmountInput.addEventListener('input', calculateRatio);

  // ————————— 슬라이더 값 실시간 표시 —————————
  function setupRatingDisplay(ratingInput) {
    const display = ratingInput.closest('.rating-container').querySelector('.rating-value');
    display.textContent = ratingInput.value;
    ratingInput.addEventListener('input', () => {
      display.textContent = ratingInput.value;
    });
  }
  setupRatingDisplay(aromaRatingInput);
  setupRatingDisplay(tasteRatingInput);
  setupRatingDisplay(overallRatingInput);

  // ————————— 저장 버튼 클릭 처리 —————————
  saveButton.addEventListener('click', function() {
    // 0. 기본 정보 수집
    const roastingDate  = roastingDateInput.value;
    const cuppingDate   = cuppingDateInput.value;
    const userId        = userIdInput.value.trim();
    const coffeeName    = coffeeNameInput.value.trim();
    const waterType     = waterTypeInput.value.trim();      // 추가된 물 종류
    const dropTemp      = dropTempInput.value.trim();
    const agtron        = agtronInput.value.trim();
    const grindSize     = grindSizeInput.value.trim();
    const beanAmount    = beanAmountInput.value.trim();
    const brewAmount    = brewAmountInput.value.trim();
    const ratioText     = ratioDisplay.textContent.replace('비율: ', '');

    // 1. 향 맡기
    const aromaChoices      = Array.from(aromaCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const aromaCustomText   = aromaText.value.trim();
    const aromaRating       = aromaRatingInput.value;

    // 2. 맛보기
    const tasteChoices      = Array.from(tasteCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const tasteCustomText   = tasteText.value.trim();
    const tasteRating       = tasteRatingInput.value;

    // 3. 전체적인 느낌
    const feelChoices       = Array.from(feelCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const feelCustomText    = feelText.value.trim();
    const overallRating     = overallRatingInput.value;

    // 4. 추가 메모 & 5. 추천
    const additionalNote      = additionalNoteInput.value.trim();
    const roastingRecommendation = roastingRecommendationInput.value.trim();

    // ————————— 결과 포맷팅 —————————
    const formattedResult = `
【 브루잉 요약 】

■ 기본 정보
 - 로스팅 날짜: ${roastingDate  || '미입력'}
 - 추출 날짜: ${cuppingDate   || '미입력'}
 - 이름/ID: ${userId        || '미입력'}
 - 커피 정보: ${coffeeName    || '미입력'}
 - 물 종류: ${waterType     || '미입력'}
 - 물/온도: ${dropTemp      || '미입력'}
 - 드리퍼/시간: ${agtron      || '미입력'}
 - 분쇄도: ${grindSize     || '미입력'}
 - 원두량: ${beanAmount ? beanAmount + 'g' : '미입력'}
 - 추출량: ${brewAmount ? brewAmount + 'g' : '미입력'}${ratioText ? ` (비율: ${ratioText})` : ''}

■ 향 평가 (${aromaRating}점)
 - 선택된 향: ${aromaChoices.length ? aromaChoices.join(', ') : '없음'}
 - 기타 향: ${aromaCustomText || '없음'}

■ 맛 평가 (${tasteRating}점)
 - 선택된 맛: ${tasteChoices.length ? tasteChoices.join(', ') : '없음'}
 - 기타 맛: ${tasteCustomText || '없음'}

■ 느낌 평가 (${overallRating}점)
 - 선택된 느낌: ${feelChoices.length ? feelChoices.join(', ') : '없음'}
 - 기타 느낌: ${feelCustomText || '없음'}

■ 추가 메모
${additionalNote || '없음'}

■ 다음 브루잉 의견
${roastingRecommendation || '없음'}
    `;
    resultDisplay.textContent = formattedResult.trim();

    // ————————— 구글 스프레드시트 자동 저장 —————————
    const WEB_APP_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXX/exec'; // ← 실제 배포된 웹앱 URL로 변경
    const payload = {
      roastingDate,
      cuppingDate,
      userId,
      coffeeName,
      waterType,
      dropTemp,
      agtron,
      grindSize,
      beanAmount,
      brewAmount,
      ratio: ratioText,
      aromaChoices:      aromaChoices.join(', '),
      aromaCustomText,
      aromaRating,
      tasteChoices:      tasteChoices.join(', '),
      tasteCustomText,
      tasteRating,
      feelChoices:       feelChoices.join(', '),
      feelCustomText,
      overallRating,
      additionalNote,
      roastingRecommendation
    };

    fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        alert('데이터 저장 성공!');
      } else {
        alert('저장 오류: ' + res.message);
      }
    })
    .catch(err => {
      alert('저장 중 오류 발생: ' + err.message);
    });
  });
});
