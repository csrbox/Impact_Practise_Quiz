/**
 * OPIF IMPACT PRACTICE QUIZ - Cloud Database Sync (Firebase Realtime Database)
 * Instant, ₹0 cost cross-device live synchronization with offline fallback.
 */

const FIREBASE_DEFAULT_URL = "https://opif-b6f33-default-rtdb.firebaseio.com";
const STORAGE_KEY_FIREBASE = "OPIF_FIREBASE_URL";
const STORAGE_KEY_RECORDS = "OPIF_QUIZ_RECORDS";

const FirebaseSync = {
  /**
   * Get active Firebase Database endpoint URL
   */
  getUrl() {
    try {
      const custom = localStorage.getItem(STORAGE_KEY_FIREBASE);
      if (custom && custom.trim().startsWith("http")) {
        return custom.trim().replace(/\/+$/, "");
      }
    } catch (e) {}
    return FIREBASE_DEFAULT_URL;
  },

  /**
   * Set or update custom Firebase URL
   */
  setUrl(url) {
    try {
      if (url && url.trim().startsWith("http")) {
        localStorage.setItem(STORAGE_KEY_FIREBASE, url.trim().replace(/\/+$/, ""));
      } else {
        localStorage.removeItem(STORAGE_KEY_FIREBASE);
      }
    } catch (e) {}
  },

  /**
   * Save a single participant record
   * Saves to local storage cache immediately, then syncs to Firebase cloud.
   */
  async saveRecord(record) {
    if (!record || !record.id) return;

    // 1. Immediately cache in localStorage (offline protection)
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
      const list = raw ? JSON.parse(raw) : [];
      if (!list.some(r => r.id === record.id)) {
        list.unshift(record);
        localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(list));
      }
    } catch (e) {
      console.warn("[FirebaseSync] Local save error:", e);
    }

    // 2. Post to Firebase Realtime Database REST API
    const baseUrl = this.getUrl();
    if (!baseUrl) return;

    try {
      const endpoint = `${baseUrl}/participants/${record.id}.json`;
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
      if (!res.ok) {
        console.warn("[FirebaseSync] Cloud PUT returned status:", res.status);
      }
    } catch (err) {
      console.warn("[FirebaseSync] Cloud network sync failed (cached locally):", err);
    }
  },

  /**
   * Fetch all participant records from Firebase
   * Merges with any unsynced local records and updates local cache.
   */
  async fetchRecords() {
    const baseUrl = this.getUrl();
    let cloudList = [];
    let fetchSuccess = false;

    if (baseUrl) {
      try {
        const endpoint = `${baseUrl}/participants.json`;
        const res = await fetch(endpoint, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object") {
            cloudList = Object.values(data).filter(r => r && typeof r === "object" && r.name);
          }
          fetchSuccess = true;
        }
      } catch (err) {
        console.warn("[FirebaseSync] Could not reach Firebase, using local cache:", err);
      }
    }

    // Local cached records
    let localList = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (raw) localList = JSON.parse(raw);
    } catch (e) {
      localList = [];
    }

    if (fetchSuccess) {
      // Find any local records that weren't in cloud yet and push them up
      const cloudIds = new Set(cloudList.map(r => r.id));
      const unSynced = localList.filter(r => r.id && !cloudIds.has(r.id));

      if (unSynced.length > 0 && baseUrl) {
        unSynced.forEach(rec => {
          fetch(`${baseUrl}/participants/${rec.id}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rec)
          }).catch(() => {});
        });
      }

      // Merge and sort
      const merged = [...unSynced, ...cloudList];
      merged.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

      try {
        localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(merged));
      } catch (e) {}
      return merged;
    }

    // Fallback to local cache if offline
    localList.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    return localList;
  },

  /**
   * Clear all records (Organizer Pin Protected)
   */
  async clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY_RECORDS);
    } catch (e) {}

    const baseUrl = this.getUrl();
    if (baseUrl) {
      try {
        await fetch(`${baseUrl}/participants.json`, { method: "DELETE" });
      } catch (e) {
        console.warn("[FirebaseSync] Cloud delete error:", e);
      }
    }
  }
};

// Global export
window.FirebaseSync = FirebaseSync;
