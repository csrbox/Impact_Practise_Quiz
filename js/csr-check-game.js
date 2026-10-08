/**
 * OPIF IMPACT PRACTICE QUIZ - Game 3: CSR or not-CSR?
 * 5 Real-world corporate scenarios to test regulatory nuance.
 * Score: 5 Marks total + "Explore more about ZCZPs…" deep dive.
 */

class CsrCheckGameEngine {
  constructor() {
    this.questions = window.CSR_CHECK_QUESTIONS || [];
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;

    this.bindEvents();
  }

  startGame() {
    this.questions = window.CSR_CHECK_QUESTIONS || [];
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;

    window.opifApp.showScreen('screen-csrcheck');
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.finishGame();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.isAnswered = false;
    const quizWrap = document.querySelector('#screen-csrcheck .quiz-container');
    if (quizWrap) quizWrap.classList.remove('reflect-correct', 'reflect-wrong');
    document.body.classList.remove('body-reflect-correct', 'body-reflect-wrong');

    // Progress Bar & Label
    const progressText = document.getElementById('csrcheck-progress-text');
    const progressFill = document.getElementById('csrcheck-progress-fill');
    if (progressText) {
      progressText.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    }
    if (progressFill) {
      const pct = ((this.currentIndex + 1) / this.questions.length) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // Question Title
    const promptText = document.getElementById('csrcheck-prompt-title');
    if (promptText) {
      promptText.textContent = q.question;
    }

    // Options Container (2 Large Buttons)
    const optionsContainer = document.getElementById('csrcheck-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `option-btn csr-battle-card ${idx === 0 ? 'csr-btn-yes' : 'csr-btn-no'}`;
        btn.dataset.index = idx;
        btn.innerHTML = `
          <div class="csr-battle-badge ${idx === 0 ? 'badge-yes' : 'badge-no'}">
            ${idx === 0 ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-x-lg"></i>'}
          </div>
          <div class="csr-battle-text">${optText}</div>
          <div class="option-check-icon" style="display: none; font-size: 24px;"></div>
        `;

        btn.addEventListener('click', () => {
          this.handleOptionSelect(idx);
        });

        optionsContainer.appendChild(btn);
      });
    }

    // Hide Next Button & Explanation
    const nextBtn = document.getElementById('csrcheck-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
      nextBtn.textContent = this.currentIndex === this.questions.length - 1 ? 'VIEW RESULTS (5 MARKS) →' : 'NEXT QUESTION →';
    }

    const explBox = document.getElementById('csrcheck-explanation-box');
    if (explBox) {
      explBox.style.display = 'none';
    }
  }

  handleOptionSelect(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === q.correctAnswer;
    const quizWrap = document.querySelector('#screen-csrcheck .quiz-container');
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

    // Highlight choices
    const options = document.querySelectorAll('#csrcheck-options-container .option-btn');
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
    const explBox = document.getElementById('csrcheck-explanation-box');
    const explText = document.getElementById('csrcheck-explanation-text');
    if (explBox && explText && q.explanation) {
      explText.innerHTML = `<strong>Rule / Mandate:</strong> ${q.explanation}`;
      explBox.style.display = 'flex';
    }

    // Show Next Button
    const nextBtn = document.getElementById('csrcheck-next-btn');
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

  finishGame() {
    window.opifApp.showResults('CSR or not-CSR?', this.score, this.questions.length, "", true);
  }

  openZczpModal() {
    window.opifApp.playTap();
    const modal = document.getElementById('zczp-modal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeZczpModal() {
    const modal = document.getElementById('zczp-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  bindEvents() {
    const nextBtn = document.getElementById('csrcheck-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    const backBtn = document.getElementById('csrcheck-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.opifApp.playTap();
        window.opifApp.showScreen('screen-selection');
      });
    }

    // Close ZCZP Modal buttons
    const closeBtn = document.getElementById('btn-close-zczp-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeZczpModal();
      });
    }

    const modal = document.getElementById('zczp-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeZczpModal();
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.opifCsrCheck = new CsrCheckGameEngine();
});
