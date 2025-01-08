document.addEventListener('DOMContentLoaded', function () {
  // 버튼 및 출력 영역
  const saveButton = document.getElementById('save-button');
  const resultDisplay = document.getElementById('result-display');

  // 기본 정보
  const roastingDateInput = document.getElementById('roasting-date');
  const cuppingDateInput = document.getElementById('cupping-date');
  const coffeeNameInput = document.getElementById('coffee-name');

  // 1. 향 맡기
  const aromaText = document.getElementById('aroma-text');

  // 2. 맛보기
  const tasteText = document.getElementById('taste-text');

  // 3. 전체적인 느낌
  const feelText = document.getElementById('feel-text');

  // 4. 추가 메모
  const additionalNote = document.getElementById('additional-note');

  // 5. 로스팅 추천
  const roastingRecommendation = document.getElementById('roasting-recommendation');

  saveButton.addEventListener('click', function () {
    // 0. 기본 정보
    const roastingDateValue = roastingDateInput.value;
    const cuppingDateValue = cuppingDateInput.value;
    const coffeeNameValue = coffeeNameInput.value.trim();

    // 1. 향 맡기 (체크박스)
    const aromaChoices = Array.from(
      document.querySelectorAll('.cupping-section:nth-child(2) input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);
    const aromaCustomText = aromaText.value.trim();

    // 2. 맛보기 (체크박스)
    const tasteChoices = Array.from(
      document.querySelectorAll('.cupping-section:nth-child(3) input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);
    const tasteCustomText = tasteText.value.trim();

    // 3. 전체적인 느낌 (체크박스)
    const feelChoices = Array.from(
      document.querySelectorAll('.cupping-section:nth-child(4) input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);
    const feelCustomText = feelText.value.trim();

    // 4. 추가 메모
    const additionalNoteValue = additionalNote.value.trim();

    // 5. 로스팅 추천 방향
    const roastingRecValue = roastingRecommendation.value.trim();

    // 출력용 문자열 구성
    let basicInfoOutput = `
[기본 정보]
  - 로스팅 날짜: ${roastingDateValue || '미입력'}
  - 커핑 날짜: ${cuppingDateValue || '미입력'}
  - 커피 이름: ${coffeeNameValue || '미입력'}
`;

    let aromaOutput = '';
    if (aromaChoices.length > 0) {
      aromaOutput += `선택 향: ${aromaChoices.join(', ')}`;
    }
    if (aromaCustomText !== '') {
      if (aromaOutput !== '') {
        aromaOutput += `, 기타 향: ${aromaCustomText}`;
      } else {
        aromaOutput += `기타 향: ${aromaCustomText}`;
      }
    }
    if (!aromaOutput) {
      aromaOutput = '선택없음';
    }

    let tasteOutput = '';
    if (tasteChoices.length > 0) {
      tasteOutput += `선택 맛: ${tasteChoices.join(', ')}`;
    }
    if (tasteCustomText !== '') {
      if (tasteOutput !== '') {
        tasteOutput += `, 기타 맛: ${tasteCustomText}`;
      } else {
        tasteOutput += `기타 맛: ${tasteCustomText}`;
      }
    }
    if (!tasteOutput) {
      tasteOutput = '선택없음';
    }

    let feelOutput = '';
    if (feelChoices.length > 0) {
      feelOutput += `느낌: ${feelChoices.join(', ')}`;
    }
    if (feelCustomText !== '') {
      if (feelOutput !== '') {
        feelOutput += `, 기타 느낌: ${feelCustomText}`;
      } else {
        feelOutput += `기타 느낌: ${feelCustomText}`;
      }
    }
    if (!feelOutput) {
      feelOutput = '선택없음';
    }

    let additionalNoteOutput = additionalNoteValue || '추가 메모 없음';
    let roastingRecOutput = roastingRecValue || '특별히 적을 내용 없음';

    let outputString = `
${basicInfoOutput}

[1. 향 맡기]
  ${aromaOutput}

[2. 맛보기]
  ${tasteOutput}

[3. 전체적인 느낌]
  ${feelOutput}

[4. 추가 메모]
  ${additionalNoteOutput}

[5. 로스팅 추천 방향]
  ${roastingRecOutput}
    `;

    // 출력
    resultDisplay.textContent = outputString.trim();
  });
});
