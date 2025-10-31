// --- 정답 및 상태 변수 정의 ---
const CORRECT_ANSWERS = {
    1: "5103", // A=5, B=10, C=3 (절댓값 처리) -> 5103
    2: "6",    // f⁻¹(7) = 6. 이 값이 다음 문제의 k
    3: "4",    // k=6일 때 사분면 개수는 4개
    4: "4"     // A=4, B=7일 때 정의역 x ≤ 4. 최종 M=4
};
// 각 문제별 오답 횟수를 저장
const wrongAttempts = { 1: 0, 2: 0, 3: 0, 4: 0 }; 
const MAX_ATTEMPTS_FOR_HINT = 2; // 2회 오답 후 힌트 제공

// --- 정답 확인 함수 ---
function checkAnswer(puzzleNumber) {
    const inputElement = document.getElementById(`answer-${puzzleNumber}`);
    const feedbackElement = document.getElementById(`feedback-${puzzleNumber}`);
    const hintElement = document.getElementById(`hint-${puzzleNumber}`);
    const userAnswer = inputElement.value.trim();
    const correctAnswer = CORRECT_ANSWERS[puzzleNumber];

    // 기존 피드백 초기화
    feedbackElement.textContent = "";
    hintElement.classList.add('hidden');

    // 정답 검증
    if (userAnswer === correctAnswer) {
        // --- 정답 처리 ---
        feedbackElement.textContent = "✅ 성공! 힌트를 얻었습니다. 다음 관문으로 이동합니다.";
        feedbackElement.style.color = "#2ecc71"; // 초록색
        
        // 오답 횟수 초기화 (성공했으므로)
        wrongAttempts[puzzleNumber] = 0;

        // 다음 퍼즐로 이동 (최종 관문이 아닌 경우)
        if (puzzleNumber < Object.keys(CORRECT_ANSWERS).length) {
            setTimeout(() => {
                moveToNextPuzzle(puzzleNumber);
            }, 1500); // 1.5초 후 이동
        } else {
            // 최종 탈출 성공
            document.getElementById(`puzzle-${puzzleNumber}`).classList.remove('active');
            document.getElementById('escape-success').classList.remove('hidden');
        }

    } else {
        // --- 오답 처리 ---
        wrongAttempts[puzzleNumber]++;
        feedbackElement.textContent = `❌ 오답입니다. 다시 시도하세요. (현재 오답 횟수: ${wrongAttempts[puzzleNumber]}회)`;
        feedbackElement.style.color = "#e74c3c"; // 빨간색

        // 오답 횟수가 기준을 넘으면 힌트 제공
        if (wrongAttempts[puzzleNumber] >= MAX_ATTEMPTS_FOR_HINT) {
            hintElement.classList.remove('hidden');
        }
    }
}

// --- 다음 문제 표시 함수 ---
function moveToNextPuzzle(current) {
    // 현재 퍼즐 숨기기
    document.getElementById(`puzzle-${current}`).classList.remove('active');
    
    // 다음 퍼즐 활성화
    const next = current + 1;
    const nextPuzzleElement = document.getElementById(`puzzle-${next}`);
    if (nextPuzzleElement) {
        nextPuzzleElement.classList.add('active');
        // 입력 필드 초기화
        document.getElementById(`answer-${next}`).value = '';
    }

}
