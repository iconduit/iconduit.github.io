if(!self.define){let e,n={};const i=(i,l)=>(i=new URL(i+".js",l).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let s={};const c=e=>i(e,o),f={module:{uri:o},exports:s,require:c};n[o]=Promise.all(l.map((e=>f[e]||c(e)))).then((e=>(r(...e),s)))}}define(["./workbox-ef1dface"],(function(e){"use strict";e.setCacheNameDetails({prefix:"iconduit-website"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/apple-touch-icon-180x180.52129c11a460bc0f7b94.png",revision:null},{url:"/favicon-16x16.6035f008766897e910f4.png",revision:null},{url:"/favicon-32x32.aead0723150d320572aa.png",revision:null},{url:"/favicon.ico",revision:"1a04cd9efb8224fbe8fa7c315f70cc08"},{url:"/index.html",revision:"9d70e949d3193d7ff9244240fd3e08b5"},{url:"/main.1e1f06a567f234ddffc7.js",revision:null},{url:"/main.1e1f06a567f234ddffc7.js.LICENSE.txt",revision:"b114cc85da504a772f040e3f40f8e46a"},{url:"/polyfill.251cc0bd9657cefa801f.js",revision:null},{url:"/site.b0731098bae7057b4000.webmanifest",revision:null},{url:"/web-app-icon-maskable-1024x1024.5920441c5f1d616c1057.png",revision:null},{url:"/web-app-icon-maskable-192x192.af557ef4c86553267bb9.png",revision:null},{url:"/web-app-icon-maskable-512x512.c1beb71ea0ba890227b2.png",revision:null},{url:"/web-app-icon-masked-1024x1024.92531aa2e2b97c1bbcf6.png",revision:null},{url:"/web-app-icon-masked-192x192.0c3be8f0590b4fb76f20.png",revision:null},{url:"/web-app-icon-masked-512x512.4a53d74827009fd5079c.png",revision:null},{url:"/workbox.9385c3316ee6868ebb46.js",revision:null}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\bapple-touch-startup[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bbrowserconfig[^/]*\.xml$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bopen-graph[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bsafari-mask-icon[^/]*\.svg$/,new e.NetworkFirst,"GET"),e.registerRoute(/\btwitter-card[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bwindows-tile[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bVERSION$/,new e.NetworkOnly,"GET")}));
//# sourceMappingURL=service-worker.js.map
