import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWithRouter from './AppWithRouter';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}

if (process.env.NODE_ENV === 'production') {
  const blockKeys = (e: KeyboardEvent) => {
    const k = (e.key || '').toLowerCase();
    if (
      k === 'f12' ||
      (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'p')) ||
      (e.ctrlKey && (k === 'u' || k === 's'))
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  window.addEventListener('keydown', blockKeys, { capture: true });
  window.addEventListener('contextmenu', (e) => { e.preventDefault(); }, { capture: true });
  const noop = () => {};
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.error = noop;
}
