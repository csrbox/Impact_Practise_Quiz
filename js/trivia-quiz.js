/**
 * OPIF IMPACT PRACTICE QUIZ - Game 1: Trivia Quiz Engine
 * Formerly CSR Quiz, now 5 comprehensive legal & spending trivia questions.
 * Max Score: 5 Marks.
 */

class TriviaQuizEngine {
  constructor() {
    this.questions = window.TRIVIA_QUESTIONS || [];
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;

    this.bindEvents();
  }

  startQuiz() {
    this.questions = window.TRIVIA_QUESTIONS || [];
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;

    window.opifApp.showScreen('screen-trivia');
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.finishQuiz();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.selectedOption = null;
    this.isAnswered = false;
    const quizWrap = document.querySelector('#screen-trivia .quiz-container');
    if (quizWrap) quizWrap.classList.remove('reflect-correct', 'reflect-wrong');
    document.body.classList.remove('body-reflect-correct', 'body-reflect-wrong');

    // Progress Bar & Label
    const progressText = document.getElementById('trivia-progress-text');
    const progressFill = document.getElementById('trivia-progress-fill');
    if (progressText) {
      progressText.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    }
    if (progressFill) {
      const pct = ((this.currentIndex + 1) / this.questions.length) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // Question Text
    const qTitle = document.getElementById('trivia-question-title');
    if (qTitle) {
      qTitle.textContent = q.question;
    }

    // Options Container
    const optionsContainer = document.getElementById('trivia-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        btn.dataset.index = idx;
        btn.innerHTML = `
          <div class="option-badge">${letters[idx]}</div>
          <div class="option-text">${optText}</div>
          <div class="option-check-icon" style="display: none; font-size: 20px;"></div>
        `;

        btn.addEventListener('click', () => {
          this.handleOptionSelect(idx);
        });

        optionsContainer.appendChild(btn);
      });
    }

    // Hide Next Button & Explanation
    const nextBtn = document.getElementById('trivia-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
      nextBtn.textContent = this.currentIndex === this.questions.length - 1 ? 'VIEW RESULTS (5 MARKS) →' : 'NEXT QUESTION →';
    }

    const explBox = document.getElementById('trivia-explanation-box');
    if (explBox) {
      explBox.style.display = 'none';
    }
  }

  handleOptionSelect(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    this.selectedOption = selectedIndex;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === q.correctAnswer;
    const quizWrap = document.querySelector('#screen-trivia .quiz-container');
    const body = document.body;

    if (isCorrect) {
      this.score++;
      window.opifApp.playCorrect();
      if (quizWrap) quizWrap.classList.add('reflect-correct');
      body.classList.add('body-reflect-correct');
      setTimeout(() => body.classList.remove('body-reflect-correct'), 1200);
    } else {
      window.opifApp.playWrong();
      if (quizWrap) quizWrap.classList.add('reflect-wrong');
      body.classList.add('body-reflect-wrong');
      setTimeout(() => body.classList.remove('body-reflect-wrong'), 1200);
    }

    // Highlight options visually
    const options = document.querySelectorAll('#trivia-options-container .option-btn');
    options.forEach((btn, idx) => {
      btn.style.pointerEvents = 'none';
      const icon = btn.querySelector('.option-check-icon');

      if (idx === q.correctAnswer) {
        btn.classList.add('correct-state');
        if (icon) {
          icon.style.display = 'block';
          icon.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
        }
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('wrong-state', 'shake-card');
        if (icon) {
          icon.style.display = 'block';
          icon.innerHTML = '<i class="bi bi-x-circle-fill text-danger"></i>';
        }
      }
    });

    // Show Explanation
    const explBox = document.getElementById('trivia-explanation-box');
    const explText = document.getElementById('trivia-explanation-text');
    if (explBox && explText && q.explanation) {
      explText.innerHTML = `<strong>Legal Context:</strong> ${q.explanation}`;
      explBox.style.display = 'flex';
    }

    // Show Next Button
    const nextBtn = document.getElementById('trivia-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  nextQuestion() {
    window.opifApp.playTap();
    this.currentIndex++;
    this.renderCurrentQuestion();
  }

  finishQuiz() {
    window.opifApp.showResults('Trivia Quiz', this.score, this.questions.length);
  }

  bindEvents() {
    const nextBtn = document.getElementById('trivia-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    const backBtn = document.getElementById('trivia-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.opifApp.playTap();
        window.opifApp.showScreen('screen-selection');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.opifTriviaQuiz = new TriviaQuizEngine();
});
