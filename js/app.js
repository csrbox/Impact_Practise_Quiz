/**
 * OPIF IMPACT PRACTICE QUIZ - Core Application Orchestrator
 * Updated with:
 * - 10-Digit Phone Number Strict Validation
 * - Persistent Game Visibility Toggles (Trivia Quiz, Build the Chain, CSR or not-CSR)
 * - Complete Removal of Dummy/Seed Data
 * - 5/5 Score Fireworks & Celebration Engine
 * - Dynamic 3-Game Router
 */

class KioskApp {
  constructor() {
    this.currentParticipant = {
      name: "",
      email: "",
      phone: ""
    };

    this.soundEnabled = true;
    this.audioCtx = null;
    this.initAudioContext();

    this.activeScreenId = "screen-welcome";
    this.cleanLegacySeedData();
    this.initGameVisibility();
    this.bindGlobalEvents();
    this.updateHeaderParticipant();
  }

  /* ========================================================================
     CLEAN LEGACY SEED / DUMMY DATA (Only real attendee data allowed)
     ======================================================================== */
  cleanLegacySeedData() {
    try {
      const data = localStorage.getItem('OPIF_QUIZ_RECORDS');
      if (data) {
        const records = JSON.parse(data);
        const filtered = records.filter(r => !r.id || !r.id.startsWith('seed_'));
        localStorage.setItem('OPIF_QUIZ_RECORDS', JSON.stringify(filtered));
      }
    } catch (e) {
      console.warn("Storage cleanup error:", e);
    }
  }

  /* ========================================================================
     GAME VISIBILITY MANAGER (Persistent across page reloads & kiosk restarts)
     ======================================================================== */
  initGameVisibility() {
    const defaultSettings = {
      trivia: true,
      chain: true,
      csrcheck: true,
      sdg: true
    };

    try {
      const saved = localStorage.getItem('OPIF_GAME_SETTINGS');
      this.gameSettings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (e) {
      this.gameSettings = defaultSettings;
    }

    this.applyGameVisibility();
  }

  setGameSetting(gameKey, isEnabled) {
    this.gameSettings[gameKey] = Boolean(isEnabled);
    localStorage.setItem('OPIF_GAME_SETTINGS', JSON.stringify(this.gameSettings));
    this.applyGameVisibility();
  }

  applyGameVisibility() {
    // Selection Cards (All 4 Games)
    const cardTrivia = document.getElementById('choice-card-trivia');
    const cardChain = document.getElementById('choice-card-chain');
    const cardCsrCheck = document.getElementById('choice-card-csrcheck');
    const cardSdg = document.getElementById('choice-card-sdg');

    if (cardTrivia) cardTrivia.style.display = this.gameSettings.trivia ? 'flex' : 'none';
    if (cardChain) cardChain.style.display = this.gameSettings.chain ? 'flex' : 'none';
    if (cardCsrCheck) cardCsrCheck.style.display = this.gameSettings.csrcheck ? 'flex' : 'none';
    if (cardSdg) cardSdg.style.display = this.gameSettings.sdg ? 'flex' : 'none';

    // Synchronize switches in organizer panel
    const toggleTrivia = document.getElementById('toggle-game-trivia');
    const toggleChain = document.getElementById('toggle-game-chain');
    const toggleCsrCheck = document.getElementById('toggle-game-csrcheck');
    const toggleSdg = document.getElementById('toggle-game-sdg');

    if (toggleTrivia) toggleTrivia.checked = this.gameSettings.trivia;
    if (toggleChain) toggleChain.checked = this.gameSettings.chain;
    if (toggleCsrCheck) toggleCsrCheck.checked = this.gameSettings.csrcheck;
    if (toggleSdg) toggleSdg.checked = this.gameSettings.sdg;
  }

  /* ========================================================================
     SCREEN ROUTING
     ======================================================================== */
  showScreen(screenId) {
    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.activeScreenId = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Screen specific hooks
      if (screenId === 'screen-dashboard') {
        if (window.opifDashboard) {
          window.opifDashboard.refreshDashboard();
        }
      }
    }
  }

  /* ========================================================================
     PARTICIPANT MANAGEMENT (With Profit / Non-Profit & Company Name)
     ======================================================================== */
  saveParticipantDetails(name, email, phone = "", orgType = "Profit", company = "") {
    this.currentParticipant = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      orgType: orgType.trim(),
      company: company.trim()
    };
    this.updateHeaderParticipant();
  }

  hasParticipant() {
    return Boolean(this.currentParticipant.name && this.currentParticipant.email);
  }

  updateHeaderParticipant() {
    const badge = document.getElementById('header-participant-badge');
    const nameEl = document.getElementById('header-participant-name');
    if (!badge || !nameEl) return;

    if (this.hasParticipant()) {
      badge.style.display = 'inline-flex';
      nameEl.textContent = this.currentParticipant.name;
    } else {
      badge.style.display = 'none';
    }
  }

  resetParticipant() {
    this.currentParticipant = {
      name: "",
      email: "",
      phone: "",
      orgType: "Profit",
      company: ""
    };
    const form = document.getElementById('participant-form');
    if (form) form.reset();
    this.updateHeaderParticipant();
  }

  /* ========================================================================
     DATA STORAGE (Strictly Privacy-Compliant)
     ======================================================================== */
  recordGameResult(gameName, score, maxScore) {
    const validGameName = (gameName && typeof gameName === 'string' && gameName.trim()) 
      ? gameName.trim() 
      : 'Trivia Quiz';
    const record = {
      id: "opif_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: this.currentParticipant.name || "Stall Guest",
      email: this.currentParticipant.email || "guest@opif.org",
      phone: this.currentParticipant.phone || "",
      orgType: this.currentParticipant.orgType || "Profit",
      company: this.currentParticipant.company || "",
      game: validGameName,
      score: Number(score) || 0,
      maxScore: Number(maxScore) || 5,
      timestamp: new Date().toISOString()
    };

    const records = this.getAllGameRecords();
    records.unshift(record);
    localStorage.setItem('OPIF_QUIZ_RECORDS', JSON.stringify(records));

    // Instant Cloud Database Sync across all stall tablets & laptops
    if (window.FirebaseSync && typeof window.FirebaseSync.saveRecord === 'function') {
      window.FirebaseSync.saveRecord(record);
    }

    return record;
  }

  getAllGameRecords() {
    try {
      const data = localStorage.getItem('OPIF_QUIZ_RECORDS');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /* ========================================================================
     WEB AUDIO API SYNTHESIZER
     ======================================================================== */
  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  ensureAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTap() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudio();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  playCorrect() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudio();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.07);
        osc.stop(this.audioCtx.currentTime + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }

  playWrong() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudio();
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(160, this.audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.22);
    } catch (e) {}
  }

  playFanfare() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudio();
    try {
      const melody = [
        { f: 523.25, d: 0.14 },
        { f: 659.25, d: 0.14 },
        { f: 783.99, d: 0.14 },
        { f: 1046.50, d: 0.5 }
      ];
      let t = this.audioCtx.currentTime;
      melody.forEach(m => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(m.f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + m.d);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + m.d);
        t += m.d * 0.9;
      });
    } catch (e) {}
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.innerHTML = this.soundEnabled 
        ? '<i class="bi bi-volume-up-fill"></i>' 
        : '<i class="bi bi-volume-mute-fill"></i>';
      btn.title = this.soundEnabled ? 'Mute Audio' : 'Unmute Audio';
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  /* ========================================================================
     FIREWORKS & CRACKERS CELEBRATION (FATAKE SYSTEM FOR 5/5)
     ======================================================================== */
  triggerFireworksCrackers() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#2563eb', '#8b5cf6', '#ec4899', '#fbbf24', '#ffffff'];

    // Spawn 5 cracker explosion bursts across the canvas
    const burstCenters = [
      { x: canvas.width * 0.5, y: canvas.height * 0.35 },
      { x: canvas.width * 0.25, y: canvas.height * 0.3 },
      { x: canvas.width * 0.75, y: canvas.height * 0.3 },
      { x: canvas.width * 0.35, y: canvas.height * 0.5 },
      { x: canvas.width * 0.65, y: canvas.height * 0.5 }
    ];

    burstCenters.forEach((center, burstIdx) => {
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x: center.x,
          y: center.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.008,
          gravity: 0.18,
          delay: burstIdx * 150 // staggered bursts
        });
      }
    });

    const startTime = Date.now();
    let animId;

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      particles.forEach(p => {
        if (elapsed < p.delay) return;
        p.vx *= 0.98;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      if (aliveCount > 0 && elapsed < 4000) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animId);
      }
    };

    render();
  }

  /* ========================================================================
     RESULT SCREEN PRESENTER
     ======================================================================== */
  showResults(gameName, score, maxScore = 5, customMessage = "", showZczpCta = false) {
    const resultScreen = document.getElementById('screen-result');
    if (!resultScreen) return;

    this.recordGameResult(gameName, score, maxScore);

    const btnPlayAgain = document.getElementById('result-btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.dataset.lastGame = gameName;
    }

    const badgeEl = document.getElementById('result-badge-text');
    const trophyEl = document.getElementById('result-trophy-icon');
    const scoreNumEl = document.getElementById('result-score-num');
    const scoreDenomEl = document.getElementById('result-score-denom');
    const titleEl = document.getElementById('result-title');
    const msgEl = document.getElementById('result-message');
    const wrapEl = document.getElementById('celebration-box-wrap');
    const zczpBox = document.getElementById('result-zczp-cta-box');

    scoreNumEl.textContent = score;
    scoreDenomEl.textContent = `/${maxScore}`;

    // Show ZCZP button if game 3 or explicitly requested
    if (zczpBox) {
      zczpBox.style.display = (showZczpCta || gameName === 'CSR or not-CSR?') ? 'block' : 'none';
    }

    wrapEl.className = 'celebration-box';

    if (maxScore > 0 && score === maxScore) {
      // Perfect Score: FATAKE CRACKERS BURST
      wrapEl.classList.add('state-champion');
      badgeEl.innerHTML = `<i class="bi bi-trophy-fill"></i> PERFECT ${maxScore}/${maxScore} SCORE`;
      trophyEl.innerHTML = '<i class="bi bi-trophy-fill"></i>';
      titleEl.textContent = 'CHAMPION! 🏆';
      msgEl.textContent = customMessage || `Flawless mastery! You scored ${score} out of ${maxScore} in ${gameName}. Outstanding competence!`;

      this.playFanfare();
      this.triggerFireworksCrackers();
    } else if (score >= Math.ceil(maxScore * 0.6)) {
      wrapEl.classList.add('state-good');
      badgeEl.innerHTML = '<i class="bi bi-patch-check-fill"></i> GREAT WORK';
      trophyEl.innerHTML = '<i class="bi bi-stars"></i>';
      titleEl.textContent = 'Great Work! 🌟';
      msgEl.textContent = customMessage || `Well done! You scored ${score}/${maxScore} in ${gameName}. Strong grasp of principles!`;

      this.playCorrect();
    } else {
      wrapEl.classList.add('state-support');
      badgeEl.innerHTML = '<i class="bi bi-stars"></i> KEEP BUILDING';
      trophyEl.innerHTML = '<i class="bi bi-rocket-takeoff-fill"></i>';
      titleEl.textContent = 'Keep Building! 💡';
      msgEl.textContent = customMessage || `You scored ${score} out of ${maxScore} in ${gameName}. Great effort exploring impact knowledge!`;

      this.playCorrect();
    }

    this.showScreen('screen-result');
  }

  /* ========================================================================
     EVENT BINDINGS
     ======================================================================== */
  bindGlobalEvents() {
    // Sound & Fullscreen
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) soundBtn.addEventListener('click', () => this.toggleSound());

    const fsBtn = document.getElementById('fullscreen-toggle-btn');
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    const brand = document.getElementById('brand-home-link');
    if (brand) {
      brand.addEventListener('click', () => {
        this.playTap();
        this.showScreen('screen-welcome');
      });
    }

    const statsBtn = document.getElementById('header-stats-btn');
    if (statsBtn) {
      statsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playTap();
        this.showScreen('screen-dashboard');
      });
    }

    // Check URL route or hash for organizer settings / dashboard
    const checkSettingsRoute = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#setting' || hash === '#settings') {
        window.location.href = 'setting/';
      } else if (hash === '#stats' || hash === '#dashboard') {
        this.showScreen('screen-dashboard');
      }
    };
    window.addEventListener('hashchange', checkSettingsRoute);
    checkSettingsRoute();

    // Cross-tab synchronization for organizer settings
    window.addEventListener('storage', (e) => {
      if (e.key === 'OPIF_GAME_SETTINGS') {
        this.initGameVisibility();
      }
    });

    // Start Challenge CTA
    const startBtn = document.getElementById('btn-start-challenge');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.playTap();
        if (this.hasParticipant()) {
          this.showScreen('screen-selection');
        } else {
          this.showScreen('screen-details');
        }
      });
    }

    // Phone Number Input: Restrict to 10 digits numeric only
    const phoneInput = document.getElementById('participant-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
        const errEl = document.getElementById('participant-phone-error');
        if (errEl) {
          if (e.target.value.length > 0 && e.target.value.length < 10) {
            phoneInput.classList.add('is-invalid');
            errEl.textContent = `Phone number must be exactly 10 digits (${e.target.value.length}/10 entered)`;
          } else {
            phoneInput.classList.remove('is-invalid');
          }
        }
      });
    }

    // Radio toggle cards visual feedback
    const orgRadios = document.querySelectorAll('input[name="participant-org-type"]');
    orgRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.org-radio-card').forEach(c => c.classList.remove('active'));
        const parentCard = radio.closest('.org-radio-card');
        if (parentCard) parentCard.classList.add('active');
        this.playTap();
      });
    });

    // Secret 3-Click Bypass Hack on CONTINUE TO CHALLENGE button
    let bypassClicks = 0;
    let lastBypassClick = 0;
    let bypassTriggered = false;
    const submitBtn = document.getElementById('btn-submit-details');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastBypassClick < 1200) {
          bypassClicks++;
        } else {
          bypassClicks = 1;
        }
        lastBypassClick = now;

        if (bypassClicks >= 3) {
          e.preventDefault();
          e.stopPropagation();
          bypassTriggered = true;
          bypassClicks = 0;
          this.playFanfare();

          // Reset any validation states
          const nameInput = document.getElementById('participant-name');
          const emailInput = document.getElementById('participant-email');
          const phoneInput = document.getElementById('participant-phone');
          if (nameInput) nameInput.classList.remove('is-invalid');
          if (emailInput) emailInput.classList.remove('is-invalid');
          if (phoneInput) phoneInput.classList.remove('is-invalid');

          this.saveParticipantDetails("Guest Player", "guest@opif.org", "", "Profit", "Guest Participant");
          const area = document.getElementById('guest-mode-trigger');
          if (area) {
            area.innerHTML = '<span class="badge bg-success px-4 py-2 rounded-pill fs-6 shadow-sm"><i class="bi bi-lightning-charge-fill"></i> Fast-Track Mode Activated! Jumping into game...</span>';
          }
          setTimeout(() => {
            this.showScreen('screen-selection');
            bypassTriggered = false;
          }, 350);
        }
      });
    }

    // Direct guest skip button (if present)
    const quickGuestBtn = document.getElementById('btn-quick-guest');
    if (quickGuestBtn) {
      quickGuestBtn.addEventListener('click', () => {
        this.playFanfare();
        this.saveParticipantDetails("Guest Player", "guest@opif.org", "", "Profit", "Guest Participant");
        this.showScreen('screen-selection');
      });
    }

    // Participant Registration Form Validation
    const detailsForm = document.getElementById('participant-form');
    if (detailsForm) {
      detailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (bypassTriggered) return;
        const nameInput = document.getElementById('participant-name');
        const emailInput = document.getElementById('participant-email');
        const phoneInput = document.getElementById('participant-phone');
        const companyInput = document.getElementById('participant-company');
        const orgTypeRadio = document.querySelector('input[name="participant-org-type"]:checked');
        const phoneError = document.getElementById('participant-phone-error');

        let valid = true;
        nameInput.classList.remove('is-invalid');
        emailInput.classList.remove('is-invalid');
        if (phoneInput) phoneInput.classList.remove('is-invalid');

        if (!nameInput.value.trim()) {
          nameInput.classList.add('is-invalid');
          valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('is-invalid');
          valid = false;
        }

        // 10-digit Phone Validation (if entered)
        if (phoneInput && phoneInput.value.trim().length > 0) {
          const digitsOnly = phoneInput.value.trim().replace(/\D/g, '');
          if (digitsOnly.length !== 10) {
            phoneInput.classList.add('is-invalid');
            if (phoneError) phoneError.textContent = "Phone number must be exactly 10 digits.";
            valid = false;
          }
        }

        if (!valid) {
          this.playWrong();
          return;
        }

        this.playTap();
        const selectedOrgType = orgTypeRadio ? orgTypeRadio.value : "Profit";
        const companyName = companyInput ? companyInput.value.trim() : "";
        this.saveParticipantDetails(
          nameInput.value,
          emailInput.value,
          phoneInput ? phoneInput.value.trim() : "",
          selectedOrgType,
          companyName
        );
        this.showScreen('screen-selection');
      });
    }

    // 4 Game Choice Cards
    const cardTrivia = document.getElementById('choice-card-trivia');
    if (cardTrivia) {
      cardTrivia.addEventListener('click', () => {
        this.playTap();
        if (window.opifTriviaQuiz) window.opifTriviaQuiz.startQuiz();
      });
    }

    const cardChain = document.getElementById('choice-card-chain');
    if (cardChain) {
      cardChain.addEventListener('click', () => {
        this.playTap();
        if (window.opifChainGame) window.opifChainGame.initSectorsScreen();
      });
    }

    const cardCsrCheck = document.getElementById('choice-card-csrcheck');
    if (cardCsrCheck) {
      cardCsrCheck.addEventListener('click', () => {
        this.playTap();
        if (window.opifCsrCheck) window.opifCsrCheck.startGame();
      });
    }

    const cardSdg = document.getElementById('choice-card-sdg');
    if (cardSdg) {
      cardSdg.addEventListener('click', () => {
        this.playTap();
        if (window.opifSdgEngine) window.opifSdgEngine.startQuiz();
      });
    }

    // Result Screen Actions
    const btnPlayAgain = document.getElementById('result-btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        this.playTap();
        const lastGame = btnPlayAgain.dataset.lastGame;
        if (lastGame === 'Trivia Quiz') {
          window.opifTriviaQuiz.startQuiz();
        } else if (lastGame === 'CSR or not-CSR?') {
          window.opifCsrCheck.startGame();
        } else if (lastGame === 'Guess The SDG') {
          window.opifSdgEngine.startQuiz();
        } else {
          window.opifChainGame.initSectorsScreen();
        }
      });
    }

    const btnChooseOther = document.getElementById('result-btn-choose-other');
    if (btnChooseOther) {
      btnChooseOther.addEventListener('click', () => {
        this.playTap();
        this.showScreen('screen-selection');
      });
    }

    const btnNewParticipant = document.getElementById('result-btn-new-participant');
    if (btnNewParticipant) {
      btnNewParticipant.addEventListener('click', () => {
        this.playTap();
        this.resetParticipant();
        this.showScreen('screen-welcome');
      });
    }

    // ZCZP Deep Dive Trigger on Result Screen
    const btnOpenZczp = document.getElementById('btn-explore-zczp');
    if (btnOpenZczp) {
      btnOpenZczp.addEventListener('click', () => {
        if (window.opifCsrCheck) window.opifCsrCheck.openZczpModal();
      });
    }

    // Organizer Game Visibility Toggles
    const toggleTrivia = document.getElementById('toggle-game-trivia');
    if (toggleTrivia) {
      toggleTrivia.addEventListener('change', (e) => {
        this.setGameSetting('trivia', e.target.checked);
      });
    }

    const toggleChain = document.getElementById('toggle-game-chain');
    if (toggleChain) {
      toggleChain.addEventListener('change', (e) => {
        this.setGameSetting('chain', e.target.checked);
      });
    }

    const toggleCsrCheck = document.getElementById('toggle-game-csrcheck');
    if (toggleCsrCheck) {
      toggleCsrCheck.addEventListener('change', (e) => {
        this.setGameSetting('csrcheck', e.target.checked);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.opifApp = new KioskApp();
});
