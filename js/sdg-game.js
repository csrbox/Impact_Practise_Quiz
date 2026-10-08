/**
 * OPIF IMPACT PRACTICE QUIZ - Game 4: Guess The SDG Engine
 * Interactive UN Sustainable Development Goals visual challenge.
 * 3 Official Global Goals, 3 Marks Total.
 * Dynamic reactive screen reflections (Dribbble video style).
 */

class SdgQuizEngine {
  constructor() {
    this.initQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;

    this.bindEvents();
  }

  initQuestions() {
    this.questions = window.SDG_GAME_QUESTIONS || (typeof SDG_GAME_QUESTIONS !== 'undefined' ? SDG_GAME_QUESTIONS : []);
  }

  startQuiz() {
    this.initQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;

    this.clearScreenReflection();
    window.opifApp.showScreen('screen-sdg');
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    this.initQuestions();
    if (!this.questions || this.questions.length === 0) {
      console.warn("Retrying SDG_GAME_QUESTIONS lookup...");
      if (typeof SDG_GAME_QUESTIONS !== 'undefined') {
        this.questions = SDG_GAME_QUESTIONS;
      }
    }

    if (!this.questions || this.questions.length === 0) {
      console.error("SDG questions not loaded!");
      return;
    }

    if (this.currentIndex >= this.questions.length) {
      this.finishQuiz();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.selectedOption = null;
    this.isAnswered = false;
    this.clearScreenReflection();
    this.applyGoalTheme(q);

    // Progress Bar & Label
    const progressText = document.getElementById('sdg-progress-text');
    const progressFill = document.getElementById('sdg-progress-fill');
    if (progressText) {
      progressText.textContent = `Goal ${this.currentIndex + 1} of ${this.questions.length}`;
    }
    if (progressFill) {
      const pct = ((this.currentIndex + 1) / this.questions.length) * 100;
      progressFill.style.width = `${pct}%`;
      progressFill.style.background = q.color || 'var(--brand-blue)';
    }

    // Question Title
    const qTitle = document.getElementById('sdg-question-title');
    if (qTitle) {
      qTitle.textContent = q.question;
    }

    // Featured SDG Visual Tile Card (Emblem + Goal Number)
    const visualTile = document.getElementById('sdg-visual-tile');
    if (visualTile) {
      visualTile.style.background = q.bgGradient || q.color;
      visualTile.innerHTML = `
        <div class="sdg-tile-badge">
          <span>UN GLOBAL GOAL • CHALLENGE ${this.currentIndex + 1} OF 3</span>
        </div>
        <div class="sdg-tile-emblem">
          ${q.svgEmblem}
        </div>
        <div class="sdg-tile-clue">
          <i class="bi bi-patch-question-fill"></i> Which Global Goal does this emblem represent?
        </div>
      `;
    }

    // 4 Options in 2x2 Grid
    const optionsContainer = document.getElementById('sdg-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn sdg-option-btn';
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

    // Hide Next Button & Explanation Box
    const nextBtn = document.getElementById('sdg-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
      nextBtn.innerHTML = this.currentIndex === this.questions.length - 1 
        ? 'FINISH CHALLENGE (3 MARKS) <i class="bi bi-trophy-fill"></i>' 
        : 'NEXT GOAL <i class="bi bi-arrow-right"></i>';
    }

    const explBox = document.getElementById('sdg-explanation-box');
    if (explBox) {
      explBox.style.display = 'none';
    }
  }

  applyGoalTheme(q) {
    const screen = document.getElementById('screen-sdg');
    if (!screen) return;
    screen.style.setProperty('--sdg-active-color', q.color);
    screen.setAttribute('data-goal', q.goalNumber);
  }

  clearScreenReflection() {
    const quizWrap = document.querySelector('#screen-sdg .quiz-container');
    if (quizWrap) {
      quizWrap.classList.remove('reflect-correct', 'reflect-wrong');
    }
    document.body.classList.remove('body-reflect-correct', 'body-reflect-wrong');
  }

  handleOptionSelect(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    this.selectedOption = selectedIndex;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === q.correctAnswer;
    const quizWrap = document.querySelector('#screen-sdg .quiz-container');
    const body = document.body;

    if (isCorrect) {
      this.score++;
      window.opifApp.playCorrect();

      // Dribbble video reflection: Screen reacts with glowing Emerald reflection!
      if (quizWrap) quizWrap.classList.add('reflect-correct');
      body.classList.add('body-reflect-correct');
      setTimeout(() => body.classList.remove('body-reflect-correct'), 1200);
    } else {
      window.opifApp.playWrong();

      // Dribbble video reflection: Screen reacts with pulsating Coral Red reflection!
      if (quizWrap) quizWrap.classList.add('reflect-wrong');
      body.classList.add('body-reflect-wrong');
      setTimeout(() => body.classList.remove('body-reflect-wrong'), 1200);
    }

    // Highlight Buttons
    const buttons = document.querySelectorAll('#sdg-options-container .option-btn');
    buttons.forEach((btn, idx) => {
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

    // Reveal Explanation
    const explBox = document.getElementById('sdg-explanation-box');
    const explText = document.getElementById('sdg-explanation-text');
    if (explBox && explText && q.explanation) {
      explText.innerHTML = `<strong>Official SDG Target:</strong> ${q.explanation}`;
      explBox.style.display = 'flex';
    }

    // Show Next Button
    const nextBtn = document.getElementById('sdg-next-btn');
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
    this.clearScreenReflection();
    const customMsg = this.score === 3
      ? "Outstanding SDG awareness! You mastered all 3 Global Goals."
      : `You scored ${this.score} out of 3. Great effort exploring the UN Global Goals!`;
    window.opifApp.showResults('Guess The SDG', this.score, this.questions.length, customMsg);
  }

  bindEvents() {
    const nextBtn = document.getElementById('sdg-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    const backBtn = document.getElementById('sdg-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.opifApp.playTap();
        this.clearScreenReflection();
        window.opifApp.showScreen('screen-selection');
      });
    }
  }
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  window.opifSdgEngine = new SdgQuizEngine();
});
