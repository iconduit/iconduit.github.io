if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return a[e]||(c=new Promise(async c=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=c}else importScripts(e),c()})),c.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},c=(c,a)=>{Promise.all(c.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(c)};self.define=(c,i,b)=>{a[c]||(a[c]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+c.slice(1)};return Promise.all(i.map(c=>{switch(c){case"exports":return a;case"module":return r;default:return e(c)}})).then(e=>{const c=b(...e);return a.default||(a.default=c),a})}))}}define("./service-worker.js",["./workbox-89b6dd0b"],(function(e){"use strict";e.setCacheNameDetails({prefix:"iconduit-website"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"/.stats.json",revision:"9376b6d39ed8e62eebefeab794c7aca2"},{url:"/apple-touch-icon-180x180.52129c11a460bc0f7b943a564440ac1b.png",revision:"666ce27e6fc424842c9ab8571cc568b0"},{url:"/favicon-16x16.6035f008766897e910f4036ccd0df666.png",revision:"f02bac1e01e587549c17044677d0c2cb"},{url:"/favicon-32x32.aead0723150d320572aa5d0fd4790ef1.png",revision:"dc737460898d85f2410ce137e8d4a069"},{url:"/favicon.ico",revision:"1a04cd9efb8224fbe8fa7c315f70cc08"},{url:"/index.html",revision:"151334114b25cf3d03fc1a4db70b603a"},{url:"/main.e40da15a8b84cd295f3f.js",revision:"f7cd1776ef2935724db213cce08a9236"},{url:"/main.e40da15a8b84cd295f3f.js.LICENSE.txt",revision:"e88a3e95b5364d46e95b35ae8c0dc27d"},{url:"/polyfill.7d18fa8a05f2dd81da92.js",revision:"36488a8b9f67bd05b30f013840fe32e8"},{url:"/site.cdbac6ccb380eebe4d82660ffcddb242.webmanifest",revision:"d929de449c658861af03d11f215d5116"},{url:"/web-app-icon-maskable-1024x1024.5920441c5f1d616c10578f2bd21328eb.png",revision:"cf3247be732597205fdbc4e24028153e"},{url:"/web-app-icon-maskable-192x192.af557ef4c86553267bb9503ba669e798.png",revision:"32c527c049e06f67c0cc5698b2cb904d"},{url:"/web-app-icon-maskable-512x512.c1beb71ea0ba890227b27cc8f987d44c.png",revision:"527842aad889b414260b766bc94fc221"},{url:"/web-app-icon-masked-1024x1024.92531aa2e2b97c1bbcf6430060aa81e7.png",revision:"2d7d9f8256537cbd3ee07c35a2a047d0"},{url:"/web-app-icon-masked-192x192.0c3be8f0590b4fb76f208f85286fe50a.png",revision:"7a5abaa581a3ee403b313a0b56a68b7b"},{url:"/web-app-icon-masked-512x512.4a53d74827009fd5079cad8fdeb14ffe.png",revision:"583947ea36647a3034296150456c987c"},{url:"/workbox.088f4347106bb295a2b4.js",revision:"68ef74db746ce0a22749df811fbceef5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\bapple-touch-startup[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bbrowserconfig[^/]*\.xml$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bopen-graph[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bsafari-mask-icon[^/]*\.svg$/,new e.NetworkFirst,"GET"),e.registerRoute(/\btwitter-card[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bwindows-tile[^/]*\.png$/,new e.NetworkFirst,"GET"),e.registerRoute(/\bVERSION$/,new e.NetworkOnly,"GET")}));
//# sourceMappingURL=service-worker.js.map
