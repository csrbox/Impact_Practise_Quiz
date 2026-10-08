/**
 * OPIF IMPACT PRACTICE QUIZ - Game 2: Build the Chain Engine
 * Refactored Flow:
 * - 12 Sectors & Programme Browser with Distinct Stakeholder Pill Themes
 * - Options Bank placed AT THE TOP, 4 Chain Rungs placed BELOW
 * - Submit Chain gives right-side tags (Correct/Incorrect + Placed vs Expected)
 * - 4 Marks for Stage Placements (1 mark each)
 * - Follow-up Outcome Indicator Question (1 Mark)
 * - Total Score: 5 Marks (5/5 triggers fireworks/confetti celebration)
 */

class BuildTheChainEngine {
  constructor() {
    this.sectors = window.SECTORS || [];
    this.programmes = window.PROGRAMMES || [];
    this.icons = window.SECTOR_ICONS || {};
    this.rungs = window.CHAIN_RUNGS || [];

    // Active Programme & Round State
    this.activeProgramme = null;
    this.slotPlacements = [null, null, null, null];
    this.unplacedCards = [];
    this.selectedCardKey = null;

    this.isSubmitted = false;
    this.stageScore = 0;
    this.indicatorScore = 0;

    this.bindStaticEvents();
  }

  /* ========================================================================
     SECTOR SELECTION SCREEN
     ======================================================================== */
  initSectorsScreen() {
    window.opifApp.showScreen('screen-chain-sector');
    this.renderSectors();
  }

  renderSectors() {
    const grid = document.getElementById('sectors-grid');
    if (!grid) return;
    grid.innerHTML = '';

    this.sectors.forEach(sec => {
      const card = document.createElement('div');
      card.className = 'sector-card';
      card.dataset.sectorId = sec.id;

      const pathData = this.icons[sec.icon] || 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5';

      card.innerHTML = `
        <div class="sector-icon-wrap">
          <svg class="sector-icon-svg" viewBox="0 0 24 24">
            <path d="${pathData}"></path>
          </svg>
        </div>
        <div>
          <h4 class="sector-name">${sec.name}</h4>
          <div class="sector-count">
            <i class="bi bi-collection"></i> ${sec.count || 1} ${sec.count === 1 ? 'programme' : 'programmes'}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        window.opifApp.playTap();
        this.selectSector(sec.id);
      });

      grid.appendChild(card);
    });
  }

  selectSector(sectorId) {
    const sector = this.sectors.find(s => s.id === sectorId);
    if (!sector) return;

    const sectorNameEl = document.getElementById('programme-sector-title');
    if (sectorNameEl) {
      sectorNameEl.textContent = `${sector.name} Programmes`;
    }

    const progsInSector = this.programmes.filter(p => p.sector === sectorId);
    this.renderProgrammesList(progsInSector);
    window.opifApp.showScreen('screen-chain-programme');
  }

  /* Stakeholder Color Classifier (Impact Practice & CSRBOX Theme) */
  getStakeholderClass(roleStr) {
    const r = (roleStr || '').toLowerCase();
    if (r.includes('funder') || r.includes('csr') || r.includes('corporate') || r.includes('donor')) {
      return 'sh-pill-funder';
    }
    if (r.includes('ngo') || r.includes('implement') || r.includes('partner') || r.includes('civil')) {
      return 'sh-pill-ngo';
    }
    if (r.includes('govt') || r.includes('government') || r.includes('department') || r.includes('state') || r.includes('district') || r.includes('panchayat')) {
      return 'sh-pill-govt';
    }
    if (r.includes('school') || r.includes('community') || r.includes('smc') || r.includes('beneficiar') || r.includes('women') || r.includes('farmer')) {
      return 'sh-pill-community';
    }
    return 'sh-pill-default';
  }

  /* ========================================================================
     PROGRAMME SELECTION SCREEN
     ======================================================================== */
  renderProgrammesList(progs) {
    const list = document.getElementById('programmes-list');
    if (!list) return;
    list.innerHTML = '';

    progs.forEach(prog => {
      const card = document.createElement('div');
      card.className = 'programme-card';

      let stakeholdersHtml = '';
      if (prog.stakeholders && prog.stakeholders.length > 0) {
        stakeholdersHtml = `
          <div class="stakeholder-pills">
            ${prog.stakeholders.map(sh => `
              <span class="sh-pill ${this.getStakeholderClass(sh.role)}">
                <strong>${sh.role}:</strong> ${sh.who}
              </span>
            `).join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
          <h3 class="programme-title">${prog.name}</h3>
          <span class="badge bg-primary text-white px-3 py-2 rounded-pill font-heading fs-6">
            BUILD CHAIN →
          </span>
        </div>
        <p class="programme-blurb">${prog.blurb}</p>
        ${stakeholdersHtml}
      `;

      card.addEventListener('click', () => {
        window.opifApp.playTap();
        this.startProgramme(prog);
      });

      list.appendChild(card);
    });
  }

  /* ========================================================================
     START PROGRAMME GAME
     ======================================================================== */
  startProgramme(prog) {
    this.activeProgramme = prog;
    this.isSubmitted = false;
    this.selectedCardKey = null;
    this.stageScore = 0;
    this.indicatorScore = 0;

    // Reset 4 slots
    this.slotPlacements = [null, null, null, null];

    // Scramble the 4 real stage cards (NO DECOYS)
    const rawChain = prog.chain;
    const cards = [
      { key: 'dowe', label: 'DO / WE', text: rawChain.dowe },
      { key: 'output', label: 'OUTPUT', text: rawChain.output },
      { key: 'outcome', label: 'OUTCOME', text: rawChain.outcome },
      { key: 'impact', label: 'IMPACT', text: rawChain.impact }
    ];

    this.unplacedCards = [...cards].sort(() => 0.5 - Math.random());

    window.opifApp.showScreen('screen-chain-board');
    this.renderBoard();
  }

  /* ========================================================================
     RENDER BOARD: OPTIONS AT TOP, 4 SLOTS BELOW
     ======================================================================== */
  renderBoard() {
    // Top Compact Header
    const progTitle = document.getElementById('chain-board-prog-title');
    if (progTitle) {
      progTitle.textContent = this.activeProgramme.name;
    }

    const progBlurb = document.getElementById('chain-board-prog-blurb');
    if (progBlurb) {
      progBlurb.textContent = this.activeProgramme.blurb;
    }

    const shBar = document.getElementById('chain-board-stakeholders');
    if (shBar && this.activeProgramme.stakeholders) {
      shBar.innerHTML = this.activeProgramme.stakeholders.map(sh => `
        <span class="sh-pill ${this.getStakeholderClass(sh.role)}">
          <strong>${sh.role}:</strong> ${sh.who}
        </span>
      `).join('');
    }

    // Hide summary feedback until submitted
    const summaryBox = document.getElementById('chain-summary-feedback-box');
    if (summaryBox) {
      summaryBox.style.display = this.isSubmitted ? 'flex' : 'none';
    }

    // Render Options AT TOP
    this.renderTopOptionsBank();

    // Render Slots BELOW
    this.renderSlots();

    // Controls
    this.updateControls();
  }

  /* Render Options Bank at the Top */
  renderTopOptionsBank() {
    const bankSection = document.getElementById('top-options-bank');
    const bankGrid = document.getElementById('bank-cards-grid');
    if (!bankSection || !bankGrid) return;

    if (this.unplacedCards.length === 0 || this.isSubmitted) {
      bankSection.style.display = 'none';
      return;
    }

    bankSection.style.display = 'block';
    bankGrid.innerHTML = '';

    this.unplacedCards.forEach(card => {
      const cardEl = this.createCardElement(card, null, true);
      bankGrid.appendChild(cardEl);
    });
  }

  /* Render 4 Chain Drop Slots */
  renderSlots() {
    const slotsContainer = document.getElementById('chain-slots-column');
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '';

    const expectedKeys = ['dowe', 'output', 'outcome', 'impact'];
    const rungLabels = {
      dowe: 'DO / WE',
      output: 'OUTPUT',
      outcome: 'OUTCOME',
      impact: 'IMPACT'
    };

    this.rungs.forEach((rung, slotIdx) => {
      const placedCard = this.slotPlacements[slotIdx];

      // Slot Row
      const row = document.createElement('div');
      row.className = 'chain-slot-row';

      // Left Rung Badge Column
      const badgeCol = document.createElement('div');
      badgeCol.className = `rung-badge-col rung-stage-${rung.key}`;
      badgeCol.innerHTML = `
        <div class="rung-badge-title">${rung.label}</div>
        <div class="rung-badge-sub">${rung.tagline}</div>
      `;

      // Right Drop Target Area
      const dropTarget = document.createElement('div');
      dropTarget.className = 'chain-drop-target';
      dropTarget.dataset.slotIndex = slotIdx;

      if (placedCard) {
        dropTarget.classList.add('is-filled');
        const cardEl = this.createCardElement(placedCard, slotIdx, false);
        dropTarget.appendChild(cardEl);
      } else {
        dropTarget.innerHTML = `
          <div class="empty-slot-placeholder">
            <i class="bi bi-plus-circle-dotted fs-4 text-primary opacity-50"></i>
            <span>Tap option above or drag here</span>
          </div>
        `;
      }

      // If Submitted: Show Right-side Validation Badge
      if (this.isSubmitted) {
        const isCorrect = placedCard && placedCard.key === expectedKeys[slotIdx];
        const statusBadge = document.createElement('div');
        statusBadge.className = `badge-slot-status ${isCorrect ? 'correct' : 'wrong'}`;

        if (isCorrect) {
          dropTarget.classList.add('state-correct');
          statusBadge.innerHTML = `<i class="bi bi-check-circle-fill"></i> Correct (${rung.label}) • +1 Mark`;
        } else {
          dropTarget.classList.add('state-wrong');
          const placedLabel = placedCard ? placedCard.label : 'Empty';
          statusBadge.innerHTML = `<i class="bi bi-x-circle-fill"></i> Placed: ${placedLabel} — Should be: ${rung.label} • 0 Mark`;
        }

        row.appendChild(statusBadge);
      }

      // Drag and Drop Listeners
      dropTarget.addEventListener('dragover', (e) => {
        if (this.isSubmitted) return;
        e.preventDefault();
        dropTarget.classList.add('drag-over');
      });

      dropTarget.addEventListener('dragleave', () => {
        dropTarget.classList.remove('drag-over');
      });

      dropTarget.addEventListener('drop', (e) => {
        if (this.isSubmitted) return;
        e.preventDefault();
        dropTarget.classList.remove('drag-over');
        const cardKey = e.dataTransfer.getData('text/plain');
        this.placeCardInSlot(cardKey, slotIdx);
      });

      // Tap-to-place Click Listener
      dropTarget.addEventListener('click', (e) => {
        if (this.isSubmitted) return;
        if (e.target.closest('.card-touch-btn')) return;

        if (this.selectedCardKey) {
          this.placeCardInSlot(this.selectedCardKey, slotIdx);
          this.selectedCardKey = null;
        } else if (placedCard) {
          this.selectedCardKey = placedCard.key;
          this.renderBoard();
        }
      });

      row.appendChild(badgeCol);
      row.appendChild(dropTarget);
      slotsContainer.appendChild(row);

      // Flow Connector Arrow
      if (slotIdx < this.rungs.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'chain-connector-arrow';
        arrow.innerHTML = '<i class="bi bi-arrow-down-short"></i>';
        slotsContainer.appendChild(arrow);
      }
    });
  }

  /* Create Card Element */
  createCardElement(card, currentSlotIndex = null, isInBank = false) {
    const el = document.createElement('div');
    el.className = 'chain-movable-card';
    el.dataset.cardKey = card.key;
    el.draggable = !this.isSubmitted;

    if (this.selectedCardKey === card.key) {
      el.classList.add('selected-tap');
    }

    // HTML5 Drag Events
    el.addEventListener('dragstart', (e) => {
      if (this.isSubmitted) return;
      el.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.key);
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
    });

    // Touch tap selection
    el.addEventListener('click', (e) => {
      if (this.isSubmitted) return;
      e.stopPropagation();

      if (this.selectedCardKey === card.key) {
        this.selectedCardKey = null;
        this.renderBoard();
      } else if (this.selectedCardKey && !isInBank) {
        this.placeCardInSlot(this.selectedCardKey, currentSlotIndex);
        this.selectedCardKey = null;
      } else {
        this.selectedCardKey = card.key;
        window.opifApp.playTap();
        this.renderBoard();
      }
    });

    // Touch Controls
    let touchControlsHtml = '';
    if (!this.isSubmitted) {
      if (isInBank) {
        touchControlsHtml = `
          <div class="card-touch-controls">
            <span class="text-muted small"><i class="bi bi-hand-index-thumb"></i> Tap to select</span>
            <button type="button" class="card-touch-btn auto-place-btn" title="Place in first available slot">
              <i class="bi bi-arrow-down-circle"></i> Place Next
            </button>
          </div>
        `;
      } else {
        touchControlsHtml = `
          <div class="card-touch-controls">
            <div class="d-flex gap-1">
              <button type="button" class="card-touch-btn btn-move-up" ${currentSlotIndex === 0 ? 'disabled style="opacity:0.4"' : ''} title="Move Up">▲</button>
              <button type="button" class="card-touch-btn btn-move-down" ${currentSlotIndex === 3 ? 'disabled style="opacity:0.4"' : ''} title="Move Down">▼</button>
            </div>
            <button type="button" class="card-touch-btn btn-return-bank text-danger" title="Return to options above">
              <i class="bi bi-x-circle"></i> Remove
            </button>
          </div>
        `;
      }
    }

    el.innerHTML = `
      <div class="card-text-content">${card.text}</div>
      ${touchControlsHtml}
    `;

    // Bind Button Clicks
    if (!this.isSubmitted) {
      if (isInBank) {
        const autoBtn = el.querySelector('.auto-place-btn');
        if (autoBtn) {
          autoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.placeInFirstEmptySlot(card.key);
          });
        }
      } else {
        const moveUpBtn = el.querySelector('.btn-move-up');
        if (moveUpBtn && currentSlotIndex > 0) {
          moveUpBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.swapSlots(currentSlotIndex, currentSlotIndex - 1);
          });
        }

        const moveDownBtn = el.querySelector('.btn-move-down');
        if (moveDownBtn && currentSlotIndex < 3) {
          moveDownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.swapSlots(currentSlotIndex, currentSlotIndex + 1);
          });
        }

        const returnBtn = el.querySelector('.btn-return-bank');
        if (returnBtn) {
          returnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.returnCardToBank(currentSlotIndex);
          });
        }
      }
    }

    return el;
  }

  /* Place Card into Slot */
  placeCardInSlot(cardKey, targetSlotIndex) {
    window.opifApp.playTap();

    let card = this.unplacedCards.find(c => c.key === cardKey);
    let fromSlotIndex = null;

    if (card) {
      this.unplacedCards = this.unplacedCards.filter(c => c.key !== cardKey);
    } else {
      fromSlotIndex = this.slotPlacements.findIndex(c => c && c.key === cardKey);
      if (fromSlotIndex !== -1) {
        card = this.slotPlacements[fromSlotIndex];
      }
    }

    if (!card) return;

    const existingTargetCard = this.slotPlacements[targetSlotIndex];
    this.slotPlacements[targetSlotIndex] = card;

    if (existingTargetCard) {
      if (fromSlotIndex !== null) {
        this.slotPlacements[fromSlotIndex] = existingTargetCard;
      } else {
        this.unplacedCards.push(existingTargetCard);
      }
    } else {
      if (fromSlotIndex !== null) {
        this.slotPlacements[fromSlotIndex] = null;
      }
    }

    this.renderBoard();
  }

  placeInFirstEmptySlot(cardKey) {
    const emptyIndex = this.slotPlacements.findIndex(s => s === null);
    if (emptyIndex !== -1) {
      this.placeCardInSlot(cardKey, emptyIndex);
    } else {
      this.placeCardInSlot(cardKey, 0);
    }
  }

  swapSlots(idx1, idx2) {
    window.opifApp.playTap();
    const temp = this.slotPlacements[idx1];
    this.slotPlacements[idx1] = this.slotPlacements[idx2];
    this.slotPlacements[idx2] = temp;
    this.renderBoard();
  }

  returnCardToBank(slotIndex) {
    window.opifApp.playTap();
    const card = this.slotPlacements[slotIndex];
    if (card) {
      this.slotPlacements[slotIndex] = null;
      this.unplacedCards.push(card);
      this.renderBoard();
    }
  }

  /* Update Controls */
  updateControls() {
    const submitBtn = document.getElementById('chain-submit-btn');
    const allFilled = this.slotPlacements.every(s => s !== null);

    if (submitBtn) {
      submitBtn.style.display = this.isSubmitted ? 'none' : 'inline-flex';
      submitBtn.disabled = !allFilled;
      submitBtn.style.opacity = allFilled ? '1' : '0.5';
    }
  }

  /* ========================================================================
     SUBMIT CHAIN & EVALUATION (4 MARKS)
     ======================================================================== */
  submitChain() {
    this.isSubmitted = true;
    this.stageScore = 0;

    const expectedKeys = ['dowe', 'output', 'outcome', 'impact'];
    this.slotPlacements.forEach((placed, idx) => {
      if (placed && placed.key === expectedKeys[idx]) {
        this.stageScore++;
      }
    });

    if (this.stageScore === 4) {
      window.opifApp.playCorrect();
    } else {
      window.opifApp.playWrong();
    }

    this.renderBoard();

    // Show Summary Feedback & Bonus Button
    const summaryBox = document.getElementById('chain-summary-feedback-box');
    const scoreText = document.getElementById('chain-summary-score-text');
    if (summaryBox && scoreText) {
      scoreText.innerHTML = `<strong>Stage Placement Score:</strong> ${this.stageScore} / 4 Marks earned!`;
      summaryBox.style.display = 'flex';
      summaryBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ========================================================================
     FOLLOW-UP INDICATOR QUESTION (1 MARK) -> TOTAL 5 MARKS
     ======================================================================== */
  openIndicatorStep() {
    window.opifApp.playTap();

    const prog = this.activeProgramme;
    const indData = (prog.indicators && prog.indicators[0]) ? prog.indicators[0] : null;

    // If no indicators in data, generate high-quality fallback
    const outcomeText = prog.chain.outcome;
    const goodText = indData ? indData.good : `Percentage increase in verified target outcome vs baseline`;
    const vanityText = indData ? indData.vanity : `Total number of kits/materials distributed or workshops held`;
    const unmeasText = indData ? indData.unmeas : `General feeling of community satisfaction without baseline metrics`;
    const whyGood = indData ? indData.why.good : `A measurable, baseline-benchmarked indicator directly tracking the change that matters.`;

    const options = [
      { type: 'good', text: goodText, isCorrect: true, why: whyGood },
      { type: 'vanity', text: vanityText, isCorrect: false, why: indData ? indData.why.vanity : `This only measures effort or activity volume, not actual outcome achievement.` },
      { type: 'unmeas', text: unmeasText, isCorrect: false, why: indData ? indData.why.unmeas : `Unmeasurable and subjective without a defined baseline or measuring instrument.` }
    ].sort(() => 0.5 - Math.random());

    // Populate Indicator Screen
    const progTitleEl = document.getElementById('ind-prog-title');
    if (progTitleEl) progTitleEl.textContent = prog.name;

    const outcomeTextEl = document.getElementById('ind-outcome-text');
    if (outcomeTextEl) outcomeTextEl.textContent = `"${outcomeText}"`;

    const container = document.getElementById('ind-options-container');
    if (container) {
      container.innerHTML = '';

      options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'indicator-option-card';
        card.innerHTML = `
          <div class="option-badge"><i class="bi bi-circle"></i></div>
          <div class="flex-grow-1">
            <div class="fw-bold fs-6 mb-1">${opt.text}</div>
            <div class="text-muted small opt-why" style="display: none; margin-top: 6px;">${opt.why}</div>
          </div>
          <div class="opt-result-icon" style="display: none; font-size: 24px;"></div>
        `;

        card.addEventListener('click', () => {
          this.handleIndicatorAnswer(opt, card, container);
        });

        container.appendChild(card);
      });
    }

    const finishBtn = document.getElementById('btn-finish-challenge');
    if (finishBtn) finishBtn.style.display = 'none';

    window.opifApp.showScreen('screen-chain-indicator');
  }

  handleIndicatorAnswer(selectedOpt, selectedCard, container) {
    const cards = container.querySelectorAll('.indicator-option-card');
    cards.forEach(c => c.style.pointerEvents = 'none');

    if (selectedOpt.isCorrect) {
      this.indicatorScore = 1;
      selectedCard.classList.add('selected-correct');
      selectedCard.querySelector('.opt-result-icon').style.display = 'block';
      selectedCard.querySelector('.opt-result-icon').innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
      window.opifApp.playCorrect();
    } else {
      this.indicatorScore = 0;
      selectedCard.classList.add('selected-wrong');
      selectedCard.querySelector('.opt-result-icon').style.display = 'block';
      selectedCard.querySelector('.opt-result-icon').innerHTML = '<i class="bi bi-x-circle-fill text-danger"></i>';
      window.opifApp.playWrong();
    }

    // Reveal all explanations
    cards.forEach(c => {
      const whyEl = c.querySelector('.opt-why');
      if (whyEl) whyEl.style.display = 'block';
    });

    const finishBtn = document.getElementById('btn-finish-challenge');
    if (finishBtn) {
      finishBtn.style.display = 'inline-flex';
      finishBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  finishProgrammeChallenge() {
    window.opifApp.playTap();
    const finalScore = this.stageScore + this.indicatorScore;
    const maxScore = 5;

    let customMsg = "";
    if (finalScore === 5) {
      customMsg = "PERFECT 5/5! 🏆 You flawlessly aligned the entire results chain from Do/We to systemic Impact, and chose the defensible outcome indicator!";
    } else if (finalScore >= 3) {
      customMsg = `Great Job (${finalScore}/5)! You scored ${this.stageScore}/4 on the stages and ${this.indicatorScore}/1 on the indicator question. Solid Theory of Change mastery!`;
    } else {
      customMsg = `Good effort (${finalScore}/5)! Theory of Change takes practice: Activities → Outputs → Behavioral Shifts (Outcomes) → Systemic Impact. Keep building!`;
    }

    window.opifApp.showResults('Build the Chain', finalScore, maxScore, customMsg);
  }

  bindStaticEvents() {
    // Back to Sectors button on Programme selection screen
    const backToSectors = document.getElementById('btn-back-to-sectors');
    if (backToSectors) {
      backToSectors.addEventListener('click', () => {
        window.opifApp.playTap();
        this.initSectorsScreen();
      });
    }

    // Back from Game Board
    const backFromBoard = document.getElementById('btn-back-from-board');
    if (backFromBoard) {
      backFromBoard.addEventListener('click', () => {
        window.opifApp.playTap();
        if (confirm("Return to programmes list? Current placement progress will be cleared.")) {
          this.selectSector(this.activeProgramme.sector);
        }
      });
    }

    // Submit Chain button
    const submitBtn = document.getElementById('chain-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.submitChain();
      });
    }

    // Continue to Indicator Question button
    const continueIndBtn = document.getElementById('btn-continue-to-indicator');
    if (continueIndBtn) {
      continueIndBtn.addEventListener('click', () => {
        this.openIndicatorStep();
      });
    }

    // Finish Challenge button on Indicator Step
    const finishBtn = document.getElementById('btn-finish-challenge');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        this.finishProgrammeChallenge();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.opifChainGame = new BuildTheChainEngine();
});
