if(!self.define){let e,n={};const i=(i,c)=>(i=new URL(i+".js",c).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let o={};const b=e=>i(e,r),s={module:{uri:r},exports:o,require:b};n[r]=Promise.all(c.map((e=>s[e]||b(e)))).then((e=>(a(...e),o)))}}define(["./workbox-ef1dface"],(function(e){"use strict";e.setCacheNameDetails({prefix:"iconduit-website"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/apple-touch-icon-180x180.52129c11a460bc0f7b94.png",revision:null},{url:"/favicon-16x16.6035f008766897e910f4.png",revision:null},{url:"/favicon-32x32.aead0723150d320572aa.png",revision:null},{url:"/favicon.ico",revision:"1a04cd9efb8224fbe8fa7c315f70cc08"},{url:"/index.html",revision:"caa8f65ff0838919a031d8aceefa0966"},{url:"/main.789e5ce572b039446efe.js",revision:null},{url:"/main.789e5ce572b039446efe.js.LICENSE.txt",revision:"b114cc85da504a772f040e3f40f8e46a"},{url:"/polyfill.7b78999e643042fc3cb1.js",revision:null},{url:"/site.52ecf163109b44efc3e1.webmanifest",revision:null},{url:"/web-app-icon-maskable-1024x1024.5920441c5f1d616c1057.png",revision:"cf3247be732597205fdbc4e24028153e"},{url:"/web-app-icon-maskable-192x192.af557ef4c86553267bb9.png",revision:"32c527c049e06f67c0cc5698b2cb904d"},{url:"/web-app-icon-maskable-512x512.c1beb71ea0ba890227b2.png",revision:"527842aad889b414260b766bc94fc221"},{url:"/web-app-icon-masked-1024x1024.92531aa2e2b97c1bbcf6.png",revision:"2d7d9f8256537cbd3ee07c35a2a047d0"},{url:"/web-app-icon-masked-192x192.0c3be8f0590b4fb76f20.png",revision:"7a5abaa581a3ee403b313a0b56a68b7b"},{url:"/web-app-icon-masked-512x512.4a53d74827009fd5079c.png",revision:"583947ea36647a3034296150456c987c"},{url:"/workbox.c11bec9923cc4e989cb4.js",revision:null}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\bapple-touch-startup[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bbrowserconfig[^/]*\.xml$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bopen-graph[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bsafari-mask-icon[^/]*\.svg$/,new e.NetworkFirst,"GET"),e.registerRoute(/\btwitter-card[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bwindows-tile[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bVERSION$/,new e.NetworkOnly,"GET")}));
//# sourceMappingURL=service-worker.js.map
