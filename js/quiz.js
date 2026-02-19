// ===== Quiz Module (FIXED - Complete) =====
const quiz = {
  currentIndex: 0,
  questions: [],
  questionLangEn: true, // true = English question, false = Vietnamese question
  answerLangEn: false, // true = English answers, false = Vietnamese answers
  answersShuffled: true,
  selectedAnswers: {}, // { [qIndex]: { index: number, correct: boolean } }
  originalQuestions: [],
  currentOptions: [], // options currently displayed (after shuffle)

  init() {
    this.generateQuestions();
    this.currentIndex = 0;
    this.selectedAnswers = {};
    this.currentOptions = [];
    this.setupEventListeners();
    this.displayQuestion();
  },

  setupEventListeners() {
    // tránh add listener nhiều lần nếu init gọi lại
    const nextBtn = document.getElementById("quizNext");
    const prevBtn = document.getElementById("quizPrev");

    nextBtn?.replaceWith(nextBtn.cloneNode(true));
    prevBtn?.replaceWith(prevBtn.cloneNode(true));

    document
      .getElementById("quizNext")
      ?.addEventListener("click", () => this.nextQuestion());
    document
      .getElementById("quizPrev")
      ?.addEventListener("click", () => this.previousQuestion());

    // Đảo EN ↔ VI (câu hỏi tiếng Anh, đáp án tiếng Việt và ngược lại)
    document
      .getElementById("toggleQuestionLang")
      ?.addEventListener("click", () => {
        this.questionLangEn = !this.questionLangEn;
        // Khi đảo câu hỏi thì đáp án cũng đảo theo
        this.answerLangEn = !this.questionLangEn;
        this.displayQuestion();
        app.showToast(
          this.questionLangEn ? "Câu hỏi EN → Đáp án VI" : "Câu hỏi VI → Đáp án EN",
          "info",
        );
      });

    // Xáo câu hỏi ngẫu nhiên
    document.getElementById("shuffleQuestions")?.addEventListener("click", () => {
      this.shuffleAllQuestions();
      this.currentIndex = 0;
      this.displayQuestion();
      app.showToast("Đã xáo câu hỏi!", "info");
    });

    document.getElementById("speakQuestion")?.addEventListener("click", () => {
      const q = this.questions[this.currentIndex];
      if (!q) return;
      // đọc term (EN) cho chuẩn phát âm
      window.app.speak(q.term);
    });

    document.getElementById("toggleQuizList")?.addEventListener("click", () => {
      this.showQuizList();
    });

    // Arrow keys navigation + Number keys 1-4 for quiz options
    document.addEventListener("keydown", (e) => {
      if (app.state.currentSection === "quiz") {
        if (e.key === "ArrowRight") this.nextQuestion();
        if (e.key === "ArrowLeft") this.previousQuestion();
        
        // Number keys 1-4 to select options A-B-C-D
        if (["1", "2", "3", "4"].includes(e.key)) {
          const index = parseInt(e.key) - 1;
          // Only select if question hasn't been answered yet
          if (!this.selectedAnswers[this.currentIndex]) {
            this.selectOption(index);
          }
        }
      }
    });
  },

  // Fisher-Yates shuffle (ổn định, không dùng sort random)
  shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // Xáo thứ tự tất cả câu hỏi
  shuffleAllQuestions() {
    if (this.questions.length > 0) {
      this.questions = this.shuffleArray(this.questions);
      this.selectedAnswers = {};
    }
  },

  generateQuestions() {
    const vocab = window.app?.state?.vocabulary || [];
    if (!Array.isArray(vocab) || vocab.length < 4) {
      this.questions = [];
      this.originalQuestions = [];
      return;
    }

    this.questions = vocab.map((word, index) => {
      // lấy 3 đáp án sai ngẫu nhiên
      const wrongAnswers = this.shuffleArray(
        vocab.map((w, i) => ({ ...w, i })).filter((x) => x.i !== index),
      )
        .slice(0, 3)
        .map((w) => ({ term: w.term, meaning: w.meaning, correct: false }));

      // đáp án đúng
      const correctAnswer = {
        term: word.term,
        meaning: word.meaning,
        correct: true,
      };

      // options gốc (chưa shuffle)
      const options = [correctAnswer, ...wrongAnswers];

      return {
        term: word.term,
        meaning: word.meaning,
        options, // giữ gốc, không shuffle ở đây
      };
    });

    this.originalQuestions = JSON.parse(JSON.stringify(this.questions));
  },

  displayQuestion() {
    const question = this.questions[this.currentIndex];
    if (!question) {
      // nếu không đủ từ để quiz
      const qt = document.getElementById("questionText");
      const oc = document.getElementById("quizOptions");
      const cc = document.getElementById("quizCounter");
      if (qt) qt.textContent = "Chưa đủ từ vựng để làm quiz";
      if (oc) oc.innerHTML = "";
      if (cc) cc.textContent = `0 / 0`;
      return;
    }

    // question text
    const questionText = this.questionLangEn ? question.term : question.meaning;
    document.getElementById("questionText").textContent = questionText;

    // build options ONCE for this render
    let optionsToShow = [...question.options];
    if (this.answersShuffled) {
      optionsToShow = this.shuffleArray(optionsToShow);
    }
    this.currentOptions = optionsToShow; // IMPORTANT

    // render buttons
    const optionsContainer = document.getElementById("quizOptions");
    optionsContainer.innerHTML = "";

    const saved = this.selectedAnswers[this.currentIndex]; // {index, correct} | undefined
    const letters = ["A", "B", "C", "D"];

    this.currentOptions.forEach((opt, idx) => {
      const optionText = this.answerLangEn ? opt.term : opt.meaning;

      const button = document.createElement("button");
      button.className = "quiz-option";
      button.textContent = `${letters[idx]}. ${optionText}`;

      // nếu đã trả lời câu này -> highlight + disable
      if (saved) {
        button.disabled = true;

        if (idx === saved.index) {
          button.classList.add(
            opt.correct ? "correct-answer" : "incorrect-answer",
          );
        } else if (opt.correct) {
          button.classList.add("correct-answer");
        }
      } else {
        button.addEventListener("click", () => this.selectOption(idx));
      }

      optionsContainer.appendChild(button);
    });

    // counter
    document.getElementById("quizCounter").textContent =
      `${this.currentIndex + 1} / ${this.questions.length}`;
  },

  selectOption(index) {
    const question = this.questions[this.currentIndex];
    if (!question) return;

    const buttons = document.querySelectorAll(".quiz-option");
    const options = this.currentOptions; // IMPORTANT: dùng đúng thứ tự đang hiển thị
    const selectedOption = options[index];

    // lưu đáp án
    this.selectedAnswers[this.currentIndex] = {
      index,
      correct: !!selectedOption.correct,
    };

    // disable + reveal correct/incorrect
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      const opt = options[i];
      if (opt.correct) btn.classList.add("correct-answer");
      if (i === index && !opt.correct) btn.classList.add("incorrect-answer");
    });

    if (selectedOption.correct) {
      storage.addLearningHistory({
        term: question.term,
        meaning: question.meaning,
      });
      app.showToast("✓ Chính xác!", "success");
    } else {
      storage.addMistake({ term: question.term, meaning: question.meaning });
      app.showToast("✗ Sai rồi!", "error");
    }

    setTimeout(() => this.nextQuestion(), 900);
  },

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.displayQuestion();
    } else {
      app.showToast("Hoàn thành bài quiz!", "success");
    }
  },

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.displayQuestion();
    }
  },

  showQuizList() {
    const modal = document.getElementById("quizListModal");
    const listContainer = document.getElementById("quizListItems");
    if (!modal || !listContainer) return;

    listContainer.innerHTML = this.questions
      .map((q, i) => {
        const saved = this.selectedAnswers[i];
        const isAnswered = !!saved;
        const isCorrect = isAnswered && saved.correct;

        return `
        <div class="quiz-list-item ${isAnswered ? (isCorrect ? "correct" : "incorrect") : ""}">
          <div class="list-item-number">${i + 1}</div>
          <div class="list-item-content">
            <div class="list-item-question">${this.questionLangEn ? q.term : q.meaning}</div>
            ${isAnswered ? `<div class="list-item-status">${isCorrect ? "✓ Đúng" : "✗ Sai"}</div>` : ""}
          </div>
          <button class="btn btn-small" onclick="quiz.goToQuestion(${i})">Đi tới</button>
        </div>
      `;
      })
      .join("");

    modal.classList.add("active");
  },

  goToQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;
    this.displayQuestion();
    document.getElementById("quizListModal")?.classList.remove("active");
  },
};

// ===== Quiz styles (giữ nguyên như bạn đang có) =====
const quizStyles = `
<style>
  .quiz-container { max-width: 1100px; margin: 0 auto; }
  .quiz-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px; }
  .quiz-counter { font-size:18px; font-weight:700; color: var(--primary); }
  .quiz-controls-header { display:flex; gap:8px; flex-wrap:wrap; }

  .quiz-question {
    background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(99,102,241,.1));
    border: 2px solid var(--primary);
    border-radius: var(--radius);
    padding: 30px 20px;
    margin-bottom: 24px;
    text-align: center;
  }
  body.dark-mode .quiz-question { background: linear-gradient(135deg, rgba(59,130,246,.2), rgba(99,102,241,.2)); }

  .question-text { font-size: 32px; font-weight: 800; color: #000000; }
  body.dark-mode .question-text { color: #ffffff; }

  .quiz-options { display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:20px; }

  .quiz-option{
    padding: 20px 18px;
    border: 2px solid var(--border);
    background: white;
    border-radius: var(--radius-sm);
    cursor: pointer;
    text-align: left;
    font-weight: 700;
    transition: all var(--transition);
    font-size: 16px;
    animation: slideUp .4s ease-out;
  }
  body.dark-mode .quiz-option { background: var(--bg-secondary); }

  .quiz-option:hover:not(:disabled){
    border-color: var(--primary);
    background: rgba(59,130,246,.05);
    transform: translateY(-2px);
  }
  .quiz-option:disabled { cursor:not-allowed; }

  .quiz-option.correct-answer{
    border-color: var(--success);
    background: rgba(16,185,129,.1);
    color: var(--success);
  }
  .quiz-option.incorrect-answer{
    border-color: var(--danger);
    background: rgba(239,68,68,.1);
    color: var(--danger);
  }

  .quiz-navigation { display:flex; justify-content:center; gap:12px; margin-bottom:24px; }
  .quiz-list-toggle { text-align:center; }

  .quiz-list-items { padding: 20px 24px; max-height:60vh; overflow-y:auto; }

  .quiz-list-item{
    display:flex; align-items:center; gap:12px;
    padding:12px; border-radius: var(--radius-sm);
    border:1px solid var(--border);
    margin-bottom:8px; transition: all var(--transition);
  }
  .quiz-list-item:hover{ background: rgba(59,130,246,.05); }
  .quiz-list-item.correct{ border-color: var(--success); background: rgba(16,185,129,.05); }
  .quiz-list-item.incorrect{ border-color: var(--danger); background: rgba(239,68,68,.05); }

  .list-item-number{ font-weight:700; color: var(--primary); min-width:30px; text-align:center; }
  .list-item-content{ flex:1; }
  .list-item-question{ font-weight:600; font-size:14px; color: var(--text); margin-bottom:4px; }
  .list-item-status{ font-size:12px; color: var(--secondary); }
  .quiz-list-item.correct .list-item-status{ color: var(--success); }
  .quiz-list-item.incorrect .list-item-status{ color: var(--danger); }

  @media (max-width: 768px){
    .quiz-options{ grid-template-columns: 1fr; }
    .quiz-header{ flex-direction:column; align-items:flex-start; }
    .quiz-controls-header{ width:100%; }
    .quiz-controls-header .btn{ flex:1; min-width:100px; }
  }
</style>
`;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    document.head.insertAdjacentHTML("beforeend", quizStyles);
  });
} else {
  document.head.insertAdjacentHTML("beforeend", quizStyles);
}

// Expose quiz module globally
window.quiz = quiz;
