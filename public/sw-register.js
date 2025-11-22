// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        function promptUpdate() {
          const ok = window.confirm('A new version of Umoja-Aware is available. Update now?');
          if (ok && reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }

        if (reg.waiting) {
          promptUpdate();
        }

        reg.addEventListener('updatefound', () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              promptUpdate();
            }
          });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

        console.log('SW registered:', reg);
      })
      .catch(err => {
        console.log('SW registration failed:', err);
      });
  });
}