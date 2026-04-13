/**
 * Safe Storage Utility
 * Prevents the app from crashing when localStorage is denied access 
 * (e.g. Incognito mode or strict privacy on some mobile browsers)
 */

const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('localStorage getItem failed:', e);
    }
    return null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('localStorage setItem failed:', e);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('localStorage removeItem failed:', e);
    }
  }
};

export default safeStorage;
