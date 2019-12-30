/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.0570e8801811027e685508e7399e9f1b.js"
);

workbox.core.setCacheNameDetails({prefix: "iconduit-website"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/\bapple-touch-startup[^/]*\.png$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\bbrowserconfig[^/]*\.xml$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\bopen-graph[^/]*\.png$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\bsafari-mask-icon[^/]*\.svg$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\btwitter-card[^/]*\.png$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\bwindows-tile[^/]*\.png$/, new workbox.strategies.NetworkFirst(), 'GET');
workbox.routing.registerRoute(/\bVERSION$/, new workbox.strategies.NetworkOnly(), 'GET');
