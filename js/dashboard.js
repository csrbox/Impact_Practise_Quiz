/**
 * OPIF IMPACT PRACTICE QUIZ - Stall Leaderboard & Cloud Sync
 * Real-time participant rankings, cross-device sync via Firebase RTDB, and offline resilience.
 */

class KioskDashboard {
  constructor() {
    this.organizerPin = "333";
    this.pollInterval = null;
    this.bindEvents();
    this.startAutoPoll();
  }

  getRecords() {
    try {
      const data = localStorage.getItem('OPIF_QUIZ_RECORDS');
      if (!data) return [];
      const records = JSON.parse(data);
      return Array.isArray(records) ? records : [];
    } catch (e) {
      return [];
    }
  }

  async refreshDashboard(isSilent = false) {
    let records = [];
    try {
      if (window.FirebaseSync) {
        records = await window.FirebaseSync.fetchRecords();
      } else {
        records = this.getRecords();
      }
    } catch (e) {
      records = this.getRecords();
    }

    // Filter out invalid items
    records = records.filter(r => r && typeof r === 'object' && r.name);

    // 1. Total Plays & Unique Attendees
    const totalPlays = records.length;
    const uniqueEmails = new Set(records.map(r => (r.email || r.phone || r.name || '').toLowerCase()));
    const totalParticipants = uniqueEmails.size;

    // 2. Today's Attendees
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayRecords = records.filter(r => r.timestamp && r.timestamp.slice(0, 10) === todayStr);
    const todayUnique = new Set(todayRecords.map(r => (r.email || r.phone || r.name || '').toLowerCase())).size;

    // 3. Perfect Scores / Champions (5/5 or 3/3)
    let perfectScores = 0;
    records.forEach(r => {
      if (Number(r.score) > 0 && Number(r.score) === Number(r.maxScore)) {
        perfectScores++;
      }
    });

    // Update DOM Scoreboard Cards (Kept at bottom)
    this.updateEl('dash-total-participants', totalParticipants);
    this.updateEl('dash-today-count', todayUnique);
    this.updateEl('dash-total-plays', totalPlays);
    this.updateEl('dash-champions-count', perfectScores);

    // Public highlight banner
    const heroEngaged = totalParticipants > 0 ? `${totalParticipants} Attendees Ranked` : "Ready for First Attendee";
    this.updateEl('dash-public-badge', heroEngaged);

    // Render Leaderboard Table (Top of screen)
    this.renderLeaderboardTable(records);
  }

  updateEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* Safe name mask: "Priya Sharma" -> "Priya S." */
  maskName(fullName) {
    if (!fullName) return "Stall Guest";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
  }

  formatTimeAgo(isoString) {
    if (!isoString) return "Just now";
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  getGameBadgeClass(gameName) {
    const name = (gameName || '').trim();
    if (name === 'Trivia Quiz' || name === 'CSR Quiz') return 'badge-game-trivia';
    if (name === 'Build the Chain') return 'badge-game-chain';
    if (name === 'CSR or not-CSR?') return 'badge-game-csrcheck';
    if (name === 'Guess The SDG') return 'badge-game-sdg';
    return 'badge-game-default';
  }

  renderLeaderboardTable(records) {
    const tbody = document.getElementById('dash-activity-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted py-4 font-heading" style="font-size: 15px;">
            <i class="bi bi-inbox text-subtle d-block fs-3 mb-2"></i>
            No attendee records in the leaderboard yet. Complete a quiz to rank here!
          </td>
        </tr>`;
      return;
    }

    // Render all rows up to 100 (scrollable container comfortably shows ~20 per viewport)
    records.slice(0, 100).forEach((r, idx) => {
      const isPerfect = Number(r.score) > 0 && Number(r.score) === Number(r.maxScore);
      const sNo = idx + 1;
      let rawGame = (r.game && typeof r.game === 'string' && r.game.trim() && r.game !== 'undefined' && r.game !== 'null') 
        ? r.game.trim() 
        : '';
      
      // Fallback: If game field is empty in historic record, detect from maxScore
      if (!rawGame) {
        if (Number(r.maxScore) === 3) rawGame = 'Guess The SDG';
        else rawGame = 'CSR or not-CSR?';
      }
      const gameTitle = rawGame;

      const row = document.createElement('tr');

      // Plain normal index number (no gold, silver, medals or emojis)
      const rankDisplay = `<strong style="color: var(--brand-navy); font-size: 14.5px;">${sNo}</strong>`;

      // Company / Org Subtitle
      let companySubtitle = '';
      if (r.company && r.company.trim()) {
        companySubtitle = `<div class="text-muted" style="font-size: 11.5px; line-height: 1.2; margin-top: 2px;">
          ${r.company.trim()} <span class="badge bg-light text-muted border px-1" style="font-size: 9.5px;">${r.orgType || 'Profit'}</span>
        </div>`;
      }

      row.innerHTML = `
        <td style="text-align: center; vertical-align: middle;">
          ${rankDisplay}
        </td>
        <td style="text-align: left; vertical-align: middle;">
          <div class="d-flex align-items-center gap-2">
            <span class="avatar-circle-sm" style="width:32px; height:32px; border-radius:50%; background:#eff6ff; display:inline-flex; align-items:center; justify-content:center; font-weight:700; color:#2563eb; flex-shrink:0; font-size: 13px;">
              ${r.name ? r.name.charAt(0).toUpperCase() : 'G'}
            </span>
            <div style="min-width: 0;">
              <strong style="color: var(--brand-navy); font-size: 14px;">${this.maskName(r.name)}</strong>
              ${companySubtitle}
            </div>
          </div>
        </td>
        <td style="text-align: center; vertical-align: middle;">
          <span class="badge ${this.getGameBadgeClass(gameTitle)} rounded-pill px-3 py-1 font-heading" style="font-size: 12.5px; display: inline-flex; align-items: center; justify-content: center;">
            ${gameTitle}
          </span>
        </td>
        <td style="text-align: center; vertical-align: middle;">
          <span class="fw-bold ${isPerfect ? 'text-success' : 'text-dark'}" style="font-size: 15px;">
            ${r.score}/${r.maxScore}${isPerfect ? ' 🏆' : ''}
          </span>
        </td>
        <td style="text-align: center; vertical-align: middle;" class="text-muted small">
          ${this.formatTimeAgo(r.timestamp)}
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  startAutoPoll() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    // Auto-sync polling every 8 seconds across all devices
    this.pollInterval = setInterval(() => {
      const dashScreen = document.getElementById('screen-dashboard');
      const isDashPage = window.location.pathname.includes('dashboard');
      if (isDashPage || (dashScreen && dashScreen.classList.contains('active'))) {
        this.refreshDashboard(true);
      }
    }, 8000);
  }

  bindEvents() {
    const backHomeBtn = document.getElementById('dash-back-home-btn');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        if (window.opifApp) {
          window.opifApp.showScreen('screen-welcome');
        } else {
          window.location.href = '../index.html';
        }
      });
    }

    const resetBtn = document.getElementById('dash-reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        const pin = prompt("Enter Organizer Passcode to clear stall leaderboard data:");
        if (pin === this.organizerPin || pin === "opif2026") {
          if (confirm("Are you sure you want to clear all leaderboard records? This will reset both cloud database and local cache.")) {
            if (window.FirebaseSync) {
              await window.FirebaseSync.clearAll();
            } else {
              localStorage.removeItem('OPIF_QUIZ_RECORDS');
            }
            await this.refreshDashboard();
            alert("Leaderboard records cleared.");
          }
        } else if (pin !== null) {
          alert("Incorrect organizer passcode.");
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.opifDashboard = new KioskDashboard();
});
