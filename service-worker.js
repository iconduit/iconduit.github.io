if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return i[e]||(n=new Promise((async n=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},n=(n,i)=>{Promise.all(n.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(n)};self.define=(n,r,c)=>{i[n]||(i[n]=Promise.resolve().then((()=>{let i={};const a={uri:location.origin+n.slice(1)};return Promise.all(r.map((n=>{switch(n){case"exports":return i;case"module":return a;default:return e(n)}}))).then((e=>{const n=c(...e);return i.default||(i.default=n),i}))})))}}define("./service-worker.js",["./workbox-e4a3a23e"],(function(e){"use strict";e.setCacheNameDetails({prefix:"iconduit-website"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/apple-touch-icon-180x180.52129c11a460bc0f7b94.png",revision:null},{url:"/favicon-16x16.6035f008766897e910f4.png",revision:null},{url:"/favicon-32x32.aead0723150d320572aa.png",revision:null},{url:"/favicon.ico",revision:"1a04cd9efb8224fbe8fa7c315f70cc08"},{url:"/index.html",revision:"9bc678131ce6292408019db90c4b2dba"},{url:"/main.d727a7cec71354559459.js",revision:null},{url:"/main.d727a7cec71354559459.js.LICENSE.txt",revision:"fb6fca4f0fa26a7e27d26480a74532c9"},{url:"/polyfill.01a3e9dda0cfce3810b5.js",revision:null},{url:"/site.52ecf163109b44efc3e1.webmanifest",revision:null},{url:"/web-app-icon-maskable-1024x1024.5920441c5f1d616c1057.png",revision:"cf3247be732597205fdbc4e24028153e"},{url:"/web-app-icon-maskable-192x192.af557ef4c86553267bb9.png",revision:"32c527c049e06f67c0cc5698b2cb904d"},{url:"/web-app-icon-maskable-512x512.c1beb71ea0ba890227b2.png",revision:"527842aad889b414260b766bc94fc221"},{url:"/web-app-icon-masked-1024x1024.92531aa2e2b97c1bbcf6.png",revision:"2d7d9f8256537cbd3ee07c35a2a047d0"},{url:"/web-app-icon-masked-192x192.0c3be8f0590b4fb76f20.png",revision:"7a5abaa581a3ee403b313a0b56a68b7b"},{url:"/web-app-icon-masked-512x512.4a53d74827009fd5079c.png",revision:"583947ea36647a3034296150456c987c"},{url:"/workbox.23032156b8d5bb2a91e3.js",revision:null}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\bapple-touch-startup[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bbrowserconfig[^/]*\.xml$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bopen-graph[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bsafari-mask-icon[^/]*\.svg$/,new e.NetworkFirst,"GET"),e.registerRoute(/\btwitter-card[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bwindows-tile[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bVERSION$/,new e.NetworkOnly,"GET")}));
//# sourceMappingURL=service-worker.js.map
