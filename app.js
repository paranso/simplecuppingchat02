아래는 구글 스프레드시트 저장 관련 코드를 모두 제거하고, 결과 표시 기능만 남긴 깔끔한 전체 HTML 예시입니다. 이 파일을 그대로 사용하시면 “결과 저장” 버튼 클릭 시 하단에 입력값이 표시됩니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Brewing Form</title>
  <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    body {
      font-family: 'Nanum Gothic', sans-serif;
      background-color: #f9f9f9;
      color: #333;
      padding: 20px;
      max-width: 700px;
      margin: auto;
      line-height: 1.6;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { text-align: center; margin-bottom: 30px; }
    h2 {
      color: #555;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
      margin: 30px 0 15px;
      font-size: 1.2em;
    }
    label { display: block; margin-bottom: 8px; font-weight: bold; font-size: 0.9em; }
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 0.95em;
      margin-bottom: 15px;
    }
    .date-row { display: flex; gap: 15px; }
    .date-row label { flex: 1; }
    .amount-row { display: flex; gap: 15px; }
    .amount-row .input-group { flex: 1; position: relative; }
    .input-suffix {
      position: absolute; top: 50%; right: 10px; transform: translateY(-50%);
      color: #666; font-size: 0.9em;
    }
    .ratio-display {
      margin-top: -10px;
      margin-bottom: 15px;
      font-size: 0.9em;
      color: #555;
      text-align: right;
      visibility: hidden;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
    .options label {
      font-weight: normal;
      padding: 5px 10px;
      border: 1px solid #eee;
      border-radius: 15px;
      background: #fdfdfd;
      cursor: pointer;
      font-size: 0.9em;
    }
    .rating-container {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 15px;
    }
    .rating-value {
      min-width: 20px;
      text-align: center;
      background: #eee;
      border-radius: 3px;
      padding: 2px 6px;
      font-weight: bold;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1.1em;
      cursor: pointer;
    }
    button:hover { background: #0056b3; }
    #result-display {
      white-space: pre-wrap;
      background: #f0f0f0;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      margin-top: 25px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Brewing Form</h1>

    <!-- 기본 정보 -->
    <div>
      <h2>기본 정보 입력</h2>
      <div class="date-row">
        <label>로스팅 날짜
          <input type="date" id="roasting-date">
        </label>
        <label>추출 날짜
          <input type="date" id="cupping-date">
        </label>
      </div>
      <label>이름 or ID
        <input type="text" id="user-id" placeholder="이름 또는 ID를 입력하세요">
      </label>
      <label>커피 정보
        <input type="text" id="coffee-name" placeholder="예) 에티오피아 예가체프">
      </label>
      <label>물 종류
        <input type="text" id="water-type" placeholder="예) 카본필터수 / 생수">
      </label>
      <label>물/온도
        <input type="text" id="drop-temp" placeholder="예) 93도">
      </label>
      <label>드리퍼/시간
        <input type="text" id="agtron" placeholder="예) 하리오v60 / 2분 30초">
      </label>
      <label>분쇄도
        <input type="text" id="grind-size" placeholder="예) 중간분쇄 / #25 / 220μm">
      </label>
      <div class="amount-row">
        <div class="input-group">
          <input type="number" id="bean-amount" placeholder="원두량 (g)" min="0" step="0.1">
          <span class="input-suffix">g</span>
        </div>
        <div class="input-group">
          <input type="number" id="brew-amount" placeholder="추출량 (g)" min="0" step="0.1">
          <span class="input-suffix">g</span>
        </div>
      </div>
      <div id="ratio-display" class="ratio-display">비율: 1:0</div>
    </div>

    <!-- 향 맡기 -->
    <div id="aroma-section">
      <h2>1. 향 맡기</h2>
      <div class="options">
        <label><input type="checkbox" value="꽃향">꽃향</label>
        <label><input type="checkbox" value="과일향">과일향</label>
        <label><input type="checkbox" value="허브향">허브향</label>
        <label><input type="checkbox" value="견과류향">견과류향</label>
        <label><input type="checkbox" value="카라멜향">카라멜향</label>
        <label><input type="checkbox" value="초콜릿향">초콜릿향</label>
        <label><input type="checkbox" value="기타향">기타향</label>
      </div>
      <input type="text" id="aroma-text" placeholder="기타 향 입력">
      <div class="rating-container">
        <input type="range" id="aroma-rating" min="1" max="5" value="3">
        <span class="rating-value">3</span>
      </div>
    </div>

    <!-- 맛보기 -->
    <div id="taste-section">
      <h2>2. 맛보기</h2>
      <div class="options">
        <label><input type="checkbox" value="단맛">단맛</label>
        <label><input type="checkbox" value="신맛">신맛</label>
        <label><input type="checkbox" value="쓴맛">쓴맛</label>
        <label><input type="checkbox" value="기타맛">기타맛</label>
      </div>
      <input type="text" id="taste-text" placeholder="기타 맛 입력">
      <div class="rating-container">
        <input type="range" id="taste-rating" min="1" max="5" value="3">
        <span class="rating-value">3</span>
      </div>
    </div>

    <!-- 전체적인 느낌 -->
    <div id="feel-section">
      <h2>3. 전체적인 느낌</h2>
      <div class="options">
        <label><input type="checkbox" value="부드러움">부드러움</label>
        <label><input type="checkbox" value="묵직함">묵직함</label>
        <label><input type="checkbox" value="깔끔함">깔끔함</label>
        <label><input type="checkbox" value="씁쓸함">씁쓸함</label>
        <label><input type="checkbox" value="달콤함">달콤함</label>
        <label><input type="checkbox" value="상큼함">상큼함</label>
        <label><input type="checkbox" value="기타느낌">기타느낌</label>
      </div>
      <input type="text" id="feel-text" placeholder="기타 느낌 입력">
      <div class="rating-container">
        <input type="range" id="overall-rating" min="1" max="5" value="3">
        <span class="rating-value">3</span>
      </div>
    </div>

    <!-- 추가 메모 -->
    <div>
      <h2>4. 추가 메모</h2>
      <textarea id="additional-note" placeholder="추가 메모 입력"></textarea>
    </div>

    <!-- 다음 브루잉 의견 -->
    <div>
      <h2>5. 다음 브루잉 의견</h2>
      <textarea id="roasting-recommendation" placeholder="다음 브루잉 의견 입력"></textarea>
    </div>

    <button id="save-button">결과 저장</button>
    <pre id="result-display"></pre>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const beanInput    = document.getElementById('bean-amount');
      const brewInput    = document.getElementById('brew-amount');
      const ratioDisplay = document.getElementById('ratio-display');

      // 비율 계산
      function updateRatio() {
        const bean = parseFloat(beanInput.value);
        const brew = parseFloat(brewInput.value);
        if (!isNaN(bean) && bean > 0 && !isNaN(brew)) {
          ratioDisplay.textContent = `비율: 1:${(brew / bean).toFixed(1)}`;
          ratioDisplay.style.visibility = 'visible';
        } else {
          ratioDisplay.style.visibility = 'hidden';
        }
      }
      beanInput.addEventListener('input', updateRatio);
      brewInput.addEventListener('input', updateRatio);

      // 슬라이더 실시간 표시
      document.querySelectorAll('input[type="range"]').forEach(slider => {
        const display = slider.nextElementSibling;
        display.textContent = slider.value;
        slider.addEventListener('input', () => display.textContent = slider.value);
      });

      // 저장 버튼 클릭 시 결과 출력
      document.getElementById('save-button').addEventListener('click', () => {
        const lines = [];

        // 기본 정보
        [
          ['로스팅 날짜', 'roasting-date'],
          ['추출 날짜', 'cupping-date'],
          ['이름/ID', 'user-id'],
          ['커피 정보', 'coffee-name'],
          ['물 종류', 'water-type'],
          ['물/온도', 'drop-temp'],
          ['드리퍼/시간', 'agtron'],
          ['분쇄도', 'grind-size'],
          ['원두량(g)', 'bean-amount'],
          ['추출량(g)', 'brew-amount']
        ].forEach(([label, id]) => {
          const val = document.getElementById(id).value.trim() || '미입력';
          lines.push(`${label}: ${val}`);
        });

        // 향/맛/느낌
        [
          ['1. 향 맡기', 'aroma-section', 'aroma-text', 'aroma-rating'],
          ['2. 맛보기',   'taste-section', 'taste-text', 'taste-rating'],
          ['3. 느낌',     'feel-section',  'feel-text',  'overall-rating']
        ].forEach(([title, secId, textId, rateId]) => {
          const sec = document.getElementById(secId);
          const choices = Array.from(sec.querySelectorAll('input[type="checkbox"]:checked'))
                               .map(cb => cb.value).join(', ') || '없음';
          const custom  = document.getElementById(textId).value.trim() || '없음';
          const rating  = document.getElementById(rateId).value;
          lines.push(`${title} (${rating}점)`);
          lines.push(` - 선택: ${choices}`);
          lines.push(` - 기타: ${custom}`);
        });

        // 추가 메모 / 의견
        [
          ['추가 메모', 'additional-note'],
          ['다음 브루잉 의견', 'roasting-recommendation']
        ].forEach(([label, id]) => {
          const val = document.getElementById(id).value.trim() || '없음';
          lines.push(`${label}: ${val}`);
        });

        document.getElementById('result-display').textContent = lines.join('\n');
      });
    });
  </script>
</body>
</html>
```
