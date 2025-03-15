
import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Temporary fix: Only register the service worker in production
    if (import.meta.env.PROD) {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          if (confirm('Nouvelle version disponible! Voulez-vous mettre à jour?')) {
            window.location.reload();
          }
        }
      });

      wb.register()
        .then((registration) => {
          console.log('Service Worker enregistré avec succès:', registration);
        })
        .catch((error) => {
          console.error(`Échec d'enregistrement du Service Worker:`, error);
        });
    } else {
      console.log('Service Worker non enregistré en mode développement');
    }
  }
}
