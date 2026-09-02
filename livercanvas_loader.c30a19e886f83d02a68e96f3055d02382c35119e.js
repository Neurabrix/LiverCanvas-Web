// Earlier Flutter releases could leave a service worker and Cache Storage
// entries behind. Clear only this site's application caches before loading the
// revision-named bootstrap file produced by version_web_assets.sh. Keep this
// logic in an external file so the production CSP can continue to reject
// inline scripts.
(async () => {
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }
  } catch (error) {
    console.warn("LiverCanvas could not clear an old application cache.", error);
  } finally {
    const bootstrap = document.createElement("script");
    bootstrap.src = "flutter_bootstrap.c30a19e886f83d02a68e96f3055d02382c35119e.js";
    bootstrap.async = true;
    document.body.appendChild(bootstrap);
  }
})();
