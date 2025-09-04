// /lib/gtag.js
export const GA_ID = 'G-GWBX9F3PLV';

export const gaEvent = (action, params = {}) => {
  if (typeof window === 'undefined') return;

  // Make GTM custom-event triggers fire
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: action, ...params });

  // Also send to GA4 directly (safe to do both)
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};
