if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,f)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const n={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return n;default:return e(a)}})).then(e=>{const a=f(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-0627a8fc"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"qPmY4IMYB16doR_1dFt6J"},{url:"/FaviconBlack.svg",revision:"81cebbb9bc7ed4de45b2f92773b4937c"},{url:"/_next/static/chunks/1bfc9850.86717d7e081952dd4ce9.js",revision:"48d1c5d4752a40fc9809e96acd3adf7e"},{url:"/_next/static/chunks/252f366e.671e12b0c6f653e67084.js",revision:"c00c75c2219b5693ef56a614c3a6ca8b"},{url:"/_next/static/chunks/372404ba26445f2c831378dfad94236106a26337.7b1862f56d5ead407f9d.js",revision:"2349e9a4efe06f55fec070533249c36e"},{url:"/_next/static/chunks/372404ba26445f2c831378dfad94236106a26337_CSS.ddce25b62cf34b951439.js",revision:"4b5dee0608216fad4834b8be46e48768"},{url:"/_next/static/chunks/56.deb56f524e7132d74f71.js",revision:"8b7e9506450a03fe36712577b203ccae"},{url:"/_next/static/chunks/57.7fcf24994f78d5f225e3.js",revision:"8944fa82c064ef4cf7cb1a374a089dbb"},{url:"/_next/static/chunks/58.9984e85c5528e6ce5f6a.js",revision:"db7c6d625e613facfdc36c474fdb69b7"},{url:"/_next/static/chunks/59.4a33296a09eb5ee2a720.js",revision:"b1996e8e72a2415a8ac74f93f4c8f551"},{url:"/_next/static/chunks/60.bbb699a77df4cf6d4ec3.js",revision:"646045e74eb67974096a7d567b58927d"},{url:"/_next/static/chunks/61.d89c49e415fe41d0b9cc.js",revision:"82dad32e13b6fefabd03ee4d771797ec"},{url:"/_next/static/chunks/78f0c21b4ad9e49a4775185e39ef050c010a4397.e7686edcd53fa7f5ceb6.js",revision:"742aa76c7d49c4b5d6b049b5065abf31"},{url:"/_next/static/chunks/95b64a6e.5b7cfd39651c1f77f8cf.js",revision:"52906867119b3a2b59565e923a38f64d"},{url:"/_next/static/chunks/a16c9387aa4c91beadf5d87b83efeb452a4ad84b.89251dde088840382681.js",revision:"1374d37c56a5839abdbd902aaffed73c"},{url:"/_next/static/chunks/a175aa7367d9d9ca2d603181876c5b5ded0dc4ec.a22bbd89439b85607425.js",revision:"72168035dc167b0a47a635e683fe1f8c"},{url:"/_next/static/chunks/b00119b9c122a87d498307c69b0643393d4131f3.ce667a752c8175650f3a.js",revision:"080498896d7adb26e09514eeb100fee2"},{url:"/_next/static/chunks/commons.9358683034665289e3cf.js",revision:"9d17de7e3b7853ff7a88affab1146c72"},{url:"/_next/static/chunks/d3509ea66fa28466622ced266f547002a013c242.f2ecac906f5118717639.js",revision:"d88cdf6c9a43eab808864d8e7b2bc319"},{url:"/_next/static/chunks/d8a8e99e6c62181167db2673a97c7d397e90f5c4.dbd41bb108ba1003ea8d.js",revision:"8f8d9996d56b35db4d787853679a5c26"},{url:"/_next/static/chunks/e4468523d12056fc6ae73e68b39731b9a66e4dc3.23f09911ea076731127b.js",revision:"d5befd76f78ce666c9dd4343a09fcead"},{url:"/_next/static/chunks/f8dfa2d6eb33e49ea6d5f862f6c086135e3698ff.2138a2558be21aa5cbfa.js",revision:"bcc17ee9d2ea69d8cc93b05866301564"},{url:"/_next/static/chunks/fcc97345007f62926fb4067a447b39958d67e2e5.fcd5c9b320e023829ee6.js",revision:"b80eb118a3b9cf764d804ba75fb0ea1a"},{url:"/_next/static/chunks/fonts/Dana-FaNum-Bold-510240ffa38a417924425599ccc65916.ttf",revision:"510240ffa38a417924425599ccc65916"},{url:"/_next/static/chunks/fonts/Dana-FaNum-Medium-598558d43f9488b68e9932a1d3974cda.ttf",revision:"598558d43f9488b68e9932a1d3974cda"},{url:"/_next/static/chunks/fonts/IRANSansWeb-94c311fd48c9362dea340aa3a29e3567.eot",revision:"94c311fd48c9362dea340aa3a29e3567"},{url:"/_next/static/chunks/fonts/IRANSansWeb-bd6f69a8db87710b2f3fcd6ef75bd3e2.woff",revision:"bd6f69a8db87710b2f3fcd6ef75bd3e2"},{url:"/_next/static/chunks/fonts/IRANSansWeb-e9908f05e5771638e40913309b784a17.ttf",revision:"e9908f05e5771638e40913309b784a17"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Black-20f2dc0a09e36bed1b999d5236ec4014.ttf",revision:"20f2dc0a09e36bed1b999d5236ec4014"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Black-b6c45d92f5517961190cd955b4c1e4b7.eot",revision:"b6c45d92f5517961190cd955b4c1e4b7"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Black-bea60ea788538ed6b635ad0c519fb0b8.woff",revision:"bea60ea788538ed6b635ad0c519fb0b8"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Bold-4abe296380edacb9f146cd778a94f43d.eot",revision:"4abe296380edacb9f146cd778a94f43d"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Bold-753b3827c415580e864a545d1a860a5a.woff",revision:"753b3827c415580e864a545d1a860a5a"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Bold-ff320f78af3a0fd44f2ee2993559fa9f.ttf",revision:"ff320f78af3a0fd44f2ee2993559fa9f"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Light-25bd95ce239f04e9457b5cf1c7dac593.woff",revision:"25bd95ce239f04e9457b5cf1c7dac593"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Light-ad395cc9a045cb4059bed55605a611e6.eot",revision:"ad395cc9a045cb4059bed55605a611e6"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Light-bd26f02a2febca2229ccf2c4d37ee3f7.ttf",revision:"bd26f02a2febca2229ccf2c4d37ee3f7"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Medium-30ecec094f809f90a3e4c121115cc8ca.eot",revision:"30ecec094f809f90a3e4c121115cc8ca"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Medium-8789622647008ae1b00f6a890b49916e.ttf",revision:"8789622647008ae1b00f6a890b49916e"},{url:"/_next/static/chunks/fonts/IRANSansWeb_Medium-fe1913144aa13ac4b31777a96230fed1.woff",revision:"fe1913144aa13ac4b31777a96230fed1"},{url:"/_next/static/chunks/fonts/dana-fanum-bold-8464ad6ca198f2ff5c4c8a45693b9896.eot",revision:"8464ad6ca198f2ff5c4c8a45693b9896"},{url:"/_next/static/chunks/fonts/dana-fanum-bold-d83eebca2c317bbbd740ea63d7c0fef8.woff",revision:"d83eebca2c317bbbd740ea63d7c0fef8"},{url:"/_next/static/chunks/fonts/dana-fanum-medium-b958b2c8db9409d3a3d2bb9bb71a654e.woff",revision:"b958b2c8db9409d3a3d2bb9bb71a654e"},{url:"/_next/static/chunks/fonts/dana-fanum-medium-cd847f332296c09422b93e87584b5115.eot",revision:"cd847f332296c09422b93e87584b5115"},{url:"/_next/static/chunks/framework.198429e535fd20978580.js",revision:"691bbe95e479d3795141fefbac53cb73"},{url:"/_next/static/chunks/main-2af107aa620354882222.js",revision:"089904c2e42fcce8f03ec9a9348f7c1a"},{url:"/_next/static/chunks/pages/404-4cf27ad66af9f32452aa.js",revision:"1ad0825687da6a17bd33d5fcd81de8ae"},{url:"/_next/static/chunks/pages/500-6b98b63c0adeb8f4e196.js",revision:"59e06ad88628ba1b35d74449145ce7dc"},{url:"/_next/static/chunks/pages/_app-d3f66e79f6e262f796a6.js",revision:"b127ae1d405c4d28bfc5b98480b1ba25"},{url:"/_next/static/chunks/pages/_error-b95cda6f2fa9c2ece955.js",revision:"5531c90dc0d1716fa0d078a79adb84e6"},{url:"/_next/static/chunks/pages/about-us-12b3ca0dafe379020b91.js",revision:"2b8e008e56cf9da5169488f1db8aef29"},{url:"/_next/static/chunks/pages/add-car-b42006fd30ac1a03430c.js",revision:"ead504ed5ba499ebea2d59bb41754916"},{url:"/_next/static/chunks/pages/assurance-e9edf08aade668245b58.js",revision:"485b0cae000df18697ff31f18d3b50a9"},{url:"/_next/static/chunks/pages/car-insurance-ea1e3a1d20601dd4dece.js",revision:"37189c22c129b00dc5bac8df209970f1"},{url:"/_next/static/chunks/pages/car/[id]-884c5537f3497ed5c48c.js",revision:"4263905cf56f38eab4918a9420942a5c"},{url:"/_next/static/chunks/pages/checkout-8938953eae07f8bc496f.js",revision:"bd69c8c70493a6a3a20031e9a138f117"},{url:"/_next/static/chunks/pages/complete-register-bfba01368565c70d192a.js",revision:"e17a883edc3a5e6ec43ea9945f0ea985"},{url:"/_next/static/chunks/pages/evaluation-72373e2f5059a9e8b6bf.js",revision:"c87a82d0748d7d586eadd27169cd7792"},{url:"/_next/static/chunks/pages/faq-496ee48aff9ad66b1ecd.js",revision:"c220b824011651588be74ff9c8d643e9"},{url:"/_next/static/chunks/pages/gps-ca1356cccfafc59cb1fa.js",revision:"9afcf429ad5ff9aa81fae6bf0058c9d8"},{url:"/_next/static/chunks/pages/guide-for-rent-b46cf0dfc73b6f58c881.js",revision:"8aca1684f89689c128d6e06cd449209d"},{url:"/_next/static/chunks/pages/guide-picture-3e1db8e4a254d20167d0.js",revision:"18e5a69cb3221359d23a87710190878f"},{url:"/_next/static/chunks/pages/guide-renter-648451d036dcba85d75a.js",revision:"2b789f8381ee68a2941440014c08925a"},{url:"/_next/static/chunks/pages/index-363085b590a89cdd80c1.js",revision:"47385e185789f3bfe5194e06b20353ae"},{url:"/_next/static/chunks/pages/insurance-policies-ea8e4aed6bb0e7796615.js",revision:"7ae9d9760f17e474ddbfbb775af658ed"},{url:"/_next/static/chunks/pages/join-us-91bfa03cdf39f732a391.js",revision:"39e4d27f02a07ae5f55ab76ef20c247f"},{url:"/_next/static/chunks/pages/join-us2-71bea3ed23b3194e03e1.js",revision:"daff70d674f3262d25ba0e9a2157c697"},{url:"/_next/static/chunks/pages/join-us3-290c40cf6d3d22d7eb30.js",revision:"f3be6d1828fea6f40abc69685b041700"},{url:"/_next/static/chunks/pages/join-us4-e70663d3daede4d13058.js",revision:"a19586414b58ff33f3541e1dbf66590e"},{url:"/_next/static/chunks/pages/login-bd36b17f4e8036b18411.js",revision:"d847af8bfe89544399d17afa64256f90"},{url:"/_next/static/chunks/pages/our-policies-74c11f731cfc2b11ddc4.js",revision:"ef680e7c45039498f2c05dc9cfb7d7ef"},{url:"/_next/static/chunks/pages/payment_failed-33601a6c7dca0259a4c5.js",revision:"c55313cb38aa5df9caa9cd9a49bbcaa1"},{url:"/_next/static/chunks/pages/payment_succeed-9f29a725e4199e92021b.js",revision:"57834d337b41982e5e5df955c1bd555d"},{url:"/_next/static/chunks/pages/rent-919fe11e88804cad1be7.js",revision:"38ac4d0cd60d618a3278d7adbfad2b36"},{url:"/_next/static/chunks/pages/rent/[id]-175aef38aeaed579061f.js",revision:"ce29ab29ba4e8817d86b6519a873785b"},{url:"/_next/static/chunks/pages/request/[id]-6af99a59acc1f27edd4d.js",revision:"cded4b6d8bbeaed64826555be59f33e0"},{url:"/_next/static/chunks/pages/requests-d185db1c74fc4f8306f6.js",revision:"533930bf7075ddc4f84573dc89508886"},{url:"/_next/static/chunks/pages/search-result-0334e4ae9a666aeed6a7.js",revision:"a54fe8783eed487262b1c35d459f5ebb"},{url:"/_next/static/chunks/pages/sepris-e247f12bcf40222a03ef.js",revision:"605ff46c2286ad3446596afe0a7981be"},{url:"/_next/static/chunks/pages/set-car-timing-8ce4b4b4ee8a4ee36f11.js",revision:"6a979942c97dc3900638c4b28d6effdf"},{url:"/_next/static/chunks/pages/site-map-63abb4aee8af4ddb6f68.js",revision:"631faab2f36aea8a52c118fb74c371cf"},{url:"/_next/static/chunks/pages/user/[id]-ae3f1c897292e1e5083d.js",revision:"560fb3e27ca5e5a15670bdd80fce9305"},{url:"/_next/static/chunks/polyfills-9fa960ab16ed182ee862.js",revision:"95d613b44266c7cf32aeabeef98163e5"},{url:"/_next/static/chunks/styles.f8c4b0d4ed518770c07a.js",revision:"6d0782d9a7982a9048e6126b77950e5c"},{url:"/_next/static/chunks/webpack-5fcba22326406e9327f2.js",revision:"12aa3b2c15748ca98b94fca66987feb8"},{url:"/_next/static/css/372404ba26445f2c831378dfad94236106a26337_CSS.98f398f2.chunk.css",revision:"1b0bfbb2508ae24bdf2debb10346131b"},{url:"/_next/static/css/styles.42f0f1c6.chunk.css",revision:"89bbca89b9771a6ea96e121e4b7fa3db"},{url:"/_next/static/images/404-befd95b25809c556f25131626a8d1930.png",revision:"befd95b25809c556f25131626a8d1930"},{url:"/_next/static/images/500-e7889ca60ed288a18597803173da27fa.png",revision:"e7889ca60ed288a18597803173da27fa"},{url:"/_next/static/images/car-image-e2d58e1a9cfd4f6b2e5e6f8600481373.jpg",revision:"e2d58e1a9cfd4f6b2e5e6f8600481373"},{url:"/_next/static/qPmY4IMYB16doR_1dFt6J/_buildManifest.js",revision:"120e290913be273f812db4ae22c55317"},{url:"/_next/static/qPmY4IMYB16doR_1dFt6J/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/android-icon-144x144.png",revision:"07d244b0e154e1de914ee717744d529d"},{url:"/android-icon-192x192.png",revision:"a69041dc5ca7e64e43c84a15a98bc28c"},{url:"/android-icon-36x36.png",revision:"bdf25bfa55df8d7ba5e55bef7e58dcea"},{url:"/android-icon-48x48.png",revision:"146573ebee89ca1bfb1dcdd56638a18d"},{url:"/android-icon-72x72.png",revision:"14594022bb4e4f0d71a88a85a99bfa1b"},{url:"/android-icon-96x96.png",revision:"770d965173ccdd7f49f1a1271908a9f0"},{url:"/apple-icon-114x114.png",revision:"2f60854cf22ef63777a4802743a9e7b9"},{url:"/apple-icon-120x120.png",revision:"6bfbd6ec9a91648d1bcd096036d81a03"},{url:"/apple-icon-144x144.png",revision:"87d0133e1f18010032164beabf7662e2"},{url:"/apple-icon-152x152.png",revision:"791c932686939faefd611f98fda7d385"},{url:"/apple-icon-180x180.png",revision:"7edf7920d50d7032043708b325d172cc"},{url:"/apple-icon-57x57.png",revision:"47f85dab9105618ca5cdfcf943068bd5"},{url:"/apple-icon-60x60.png",revision:"8f8b2b3d2ede174d2cc3854a1fd1201f"},{url:"/apple-icon-72x72.png",revision:"4b6af7caffdd57a40cd9f1b5f046d171"},{url:"/apple-icon-76x76.png",revision:"56319432c68c90ad99a453ab2e67c8bc"},{url:"/apple-icon-precomposed.png",revision:"34539a295541aac25243302edf9a9d2a"},{url:"/apple-icon.png",revision:"3ee824ca3ff337278edd5155ea9923c1"},{url:"/browserconfig.xml",revision:"e0b7bb895ea7194b5afa9ed3b07200f3"},{url:"/car_logo.svg",revision:"ceaa9cdd00cc7b6df7551e9697c0ae43"},{url:"/favicon-16.png",revision:"48416bd966d30edf21179cd0b8230497"},{url:"/favicon-16x16.png",revision:"c86804fcb5629d4b5d5e8099439d9b7f"},{url:"/favicon-32x32.png",revision:"0cbcefe245f1bdfed30f1b48f8351ce6"},{url:"/favicon-48.png",revision:"170fb2b0d98b41c497bed58c4f1825d1"},{url:"/favicon-96x96.png",revision:"4903eb1430037599667b0bbdf9c74ec5"},{url:"/favicon.ico",revision:"412192267449ea67eebabd3e62acfe51"},{url:"/fonts/dana/eot/dana-fanum-bold.eot",revision:"d7dae0286cb36b2270cafd6d4170a03c"},{url:"/fonts/dana/eot/dana-fanum-medium.eot",revision:"6e3fa3c68d3ea905320e5be0fd510256"},{url:"/fonts/dana/ttf/Dana-FaNum-Bold.ttf",revision:"a891e7a6d356bc4cddfb312fc9be75af"},{url:"/fonts/dana/ttf/Dana-FaNum-Medium.ttf",revision:"7f6dfd26f06f918fc1b9aabf8897b86b"},{url:"/fonts/dana/woff/dana-fanum-bold.woff",revision:"70adab285eb52a3c37e149af29eb5dc1"},{url:"/fonts/dana/woff/dana-fanum-medium.woff",revision:"f3684eed081190eadada69fd422cc31c"},{url:"/fonts/eot/IRANSansWeb.eot",revision:"60988e96c62583af6161ba98189bb2e5"},{url:"/fonts/eot/IRANSansWeb_Black.eot",revision:"6dc8fffed3bffa4eed74acde35df7806"},{url:"/fonts/eot/IRANSansWeb_Bold.eot",revision:"106edb34d8f875356374dbbb5693c67a"},{url:"/fonts/eot/IRANSansWeb_Light.eot",revision:"cea5324785821d4c6007b90062bbde7a"},{url:"/fonts/eot/IRANSansWeb_Medium.eot",revision:"a767beb66a15c84cc284a321ff534f94"},{url:"/fonts/ttf/IRANSansWeb.ttf",revision:"afa8bf88b43b2d57debc24e4e23402a3"},{url:"/fonts/ttf/IRANSansWeb_Black.ttf",revision:"59e8f14d5470e792d2e4fb752f16917e"},{url:"/fonts/ttf/IRANSansWeb_Bold.ttf",revision:"0e72a663d36602cad6928190d3233f74"},{url:"/fonts/ttf/IRANSansWeb_Light.ttf",revision:"fa628b10df2e587e1e6f640130ecc93d"},{url:"/fonts/ttf/IRANSansWeb_Medium.ttf",revision:"c307170408a9138d5285fa55bba94e23"},{url:"/fonts/woff/IRANSansWeb.woff",revision:"cfc20d482fe1a50517165e33560e5508"},{url:"/fonts/woff/IRANSansWeb_Black.woff",revision:"a29e787ec7c1d0bfb83e9dd549a7aa34"},{url:"/fonts/woff/IRANSansWeb_Bold.woff",revision:"7259f5f831604a553cfbbd30287d7617"},{url:"/fonts/woff/IRANSansWeb_Light.woff",revision:"bf4d42a9ae66eb0d6585662ab030a9dc"},{url:"/fonts/woff/IRANSansWeb_Medium.woff",revision:"425e5ff360f9fce1908d607e5385bf53"},{url:"/fonts/woff2/IRANSansWeb.woff2",revision:"edbe5f695c0c3194c0ba27d3df390144"},{url:"/fonts/woff2/IRANSansWeb_Black.woff2",revision:"d506c6f44afdc9a8c7599031a2f07ec4"},{url:"/fonts/woff2/IRANSansWeb_Bold.woff2",revision:"e2820128c3e14ebdd1849baf987a9257"},{url:"/fonts/woff2/IRANSansWeb_Light.woff2",revision:"5527b42f22c46db51e5f95b49f6bd7db"},{url:"/fonts/woff2/IRANSansWeb_Medium.woff2",revision:"f29d1694269cf3bcb285404231f3cbde"},{url:"/icon-128x128.png",revision:"4e8fde2d3dd50870d05eb709230e0251"},{url:"/icon-144x144.png",revision:"2014bccfcd81d92ed0702e0298531fc9"},{url:"/icon-192x192.png",revision:"00f0b327dffe638527f894c0598d64dd"},{url:"/icon-52x52.png",revision:"f2bece3975b2d71172e88a2b677f07a5"},{url:"/icon-72x72.png",revision:"81447cfe16a5ed7c99186e820b5d494d"},{url:"/image/404.png",revision:"ac70fb1d7e47c6e59fbe68a43abc1e0c"},{url:"/image/500.png",revision:"5a0b340545359707d0aaa60646988d4b"},{url:"/image/SUV.svg",revision:"fba7ec6386f9c587a07e8bc5a43261c1"},{url:"/image/SamanInsurance.png",revision:"895f5e377adc8ebf40a68c140af2bad9"},{url:"/image/affordable.svg",revision:"170ba00c56a334e2178c00bb7fd76f0c"},{url:"/image/car-image-thumbnail.jpg",revision:"cce8e56e964ccd1840187f667109dabe"},{url:"/image/car-image.jpg",revision:"ec56eb0140895a6c516567e7ce90b1bc"},{url:"/image/car_vector.png",revision:"32dc38647e192c6c3c9881750d8211cc"},{url:"/image/index-landing.jpg",revision:"c16d968e0a1ba38de435cf5a6931a548"},{url:"/image/main_banner.jpg",revision:"3ef7d4ef55368bc0215e909a1391561b"},{url:"/image/parking.jpg",revision:"ed74fab9d4001f7973370f43250bd791"},{url:"/image/pelak.png",revision:"71b8d12ad100ab4e7703def8de4ad4da"},{url:"/image/svg/active_shield.svg",revision:"07a50388b5381d64e18f1af0b8378997"},{url:"/image/svg/arrow-right.svg",revision:"ca13fa4ffda8c35e304fd25b256b3acc"},{url:"/image/svg/avatar.svg",revision:"89bf1b43776ea3f8edd02e6b32da0bac"},{url:"/image/svg/balloon.svg",revision:"4bd850df8c4886519b10505de2d96717"},{url:"/image/svg/boxes.svg",revision:"436d117563b884ae11fb51bfa57ffb41"},{url:"/image/svg/calendar.svg",revision:"1a8c070fdfd8a7ab76e52f8ab733c4ec"},{url:"/image/svg/car.svg",revision:"81a6b4714d30a06c1e4e9b180ea150d2"},{url:"/image/svg/check.svg",revision:"9930210fa3431fcb1a1818b7d087a3e5"},{url:"/image/svg/deactivated_shield.svg",revision:"297803aaade9c2c18ac9addc75afe74e"},{url:"/image/svg/document.svg",revision:"a5b775d2a1cadd2e99cce20b175dc306"},{url:"/image/svg/fullscreen.svg",revision:"7790d173bd80626c003aa5a9e079a146"},{url:"/image/svg/gear.svg",revision:"e874ffd6418508fb43c7215845dc2a31"},{url:"/image/svg/opposite_arrows.svg",revision:"281db46ce14df3bc71c6516d41a16767"},{url:"/image/svg/pin.svg",revision:"5c29a61925400b165c10606c9138b847"},{url:"/image/svg/quotation.svg",revision:"6db4b98cec158b655a55a51772e6d8cb"},{url:"/image/svg/star.svg",revision:"748a49f32342756a6a66e8d4e495c5cf"},{url:"/languages/JsonSampleForTest.json",revision:"c3b42de665c0be67074cdc0f5294c53d"},{url:"/languages/fa/_404.json",revision:"aacb42317a86c818f32a3dea21086168"},{url:"/languages/fa/_500.json",revision:"f4f96fd4e48cb60d2e071151b9bec93a"},{url:"/languages/fa/aboutus.json",revision:"80c0a8ed7d1576f6bedf2de2202ed326"},{url:"/languages/fa/addcar.json",revision:"6a7a77ac790df732ef75729a2014d3fe"},{url:"/languages/fa/assurance.json",revision:"c81fdb5dea736ca3b50a6d948c4c53b6"},{url:"/languages/fa/carinsurance.json",revision:"ce42e618046a40472b05963fed2e545d"},{url:"/languages/fa/carpage.json",revision:"9f323651bb29766d1221b480905bfe0c"},{url:"/languages/fa/checkout.json",revision:"7cab4698ac87e3c477f7069c8ef13ec7"},{url:"/languages/fa/completeregister.json",revision:"76a0a332864ae9027ec44ff6c84bec0f"},{url:"/languages/fa/dynamic_pages.json",revision:"429878953fda13005b5a2966dd2c9fc1"},{url:"/languages/fa/evaluation.json",revision:"2b3d6d532da94eb8fc07fde4bb06fea3"},{url:"/languages/fa/faq.json",revision:"4c8c91c62c89c7c7f458a78306b53f42"},{url:"/languages/fa/footer.json",revision:"d07ef33ed8ec994c204e3f607d93fc3d"},{url:"/languages/fa/gps.json",revision:"48959f8d22a88410408fa94bb3abb2c8"},{url:"/languages/fa/guideforrent.json",revision:"454ec827e54ba3b757ff6a71dca4f072"},{url:"/languages/fa/guidepicture.json",revision:"474cf74e29a277cbd08c7df8f800629e"},{url:"/languages/fa/guiderenter.json",revision:"9776a64bd8696a78652598524ea26c0b"},{url:"/languages/fa/header.json",revision:"b11f75ea91a4ab494a80eeacefdddb95"},{url:"/languages/fa/homepage.json",revision:"3b024de16268eeddb84fce0c8d7ec8cc"},{url:"/languages/fa/insurancepolicies.json",revision:"7800b527009628c73abe5185935a94aa"},{url:"/languages/fa/joinus.json",revision:"27429e99b0392ceb1c173e10f4923b30"},{url:"/languages/fa/login.json",revision:"e46fd84a391fe0469a55ab00c10df04b"},{url:"/languages/fa/modals.json",revision:"d44175417990aefdcc6e886756a82b37"},{url:"/languages/fa/otoli.json",revision:"cd5078d0cdc3e2140118b083d37f84e3"},{url:"/languages/fa/ourpolicies.json",revision:"59387744d7dd0d086c83365db9c11d76"},{url:"/languages/fa/paymentfaild.json",revision:"8778264b74b4378f36574a6e7356f5f1"},{url:"/languages/fa/paymentsucceed.json",revision:"7c5f0cf567676cae311e24bc1740d2a8"},{url:"/languages/fa/rent.json",revision:"b63d9aa58e8af91eec0ecc93f91f8f7d"},{url:"/languages/fa/requestpage.json",revision:"a216a4ae14ee86637c6ddbfcde248dae"},{url:"/languages/fa/requestspage.json",revision:"85755b905d997c047a61ed32c16ccce1"},{url:"/languages/fa/searchresult.json",revision:"01f356ca9366d6860c75562eeba6d103"},{url:"/languages/fa/setcartimig.json",revision:"0219050f4007aef41c251e76282ab753"},{url:"/languages/fa/sitemap.json",revision:"e4d72dba07ccf15a85bea9eb2d99525b"},{url:"/languages/fa/textinputcomponent.json",revision:"f8feb58716c21f028a50a234a4aa6382"},{url:"/languages/fa/user.json",revision:"de1bcc8927c8d770bccc68d728545aad"},{url:"/logo.svg",revision:"f3686201fbb76f8bb151678d5e5c7163"},{url:"/logo_sticky.svg",revision:"5c37e8f9bb9550fe1bee67573f70aa23"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"},{url:"/ms-icon-144x144.png",revision:"497f7937d961fce92c945c426e5b1b30"},{url:"/ms-icon-150x150.png",revision:"fcc5e1d449de106a7ba0dd67a532526f"},{url:"/ms-icon-310x310.png",revision:"02a82c256fdcf514f69f180c5064e2d5"},{url:"/ms-icon-70x70.png",revision:"09714d62a2274008b638fdf3f996135e"},{url:"/robots.txt",revision:"cb333937db4fdf75f29294867cd772cf"},{url:"/touch-icon-start-up-320x480.png",revision:"89232c5cfcf21bd926a2ddd16e6e7b20"},{url:"/touch-icon-start-up-320x480.png.png",revision:"8a560f12d99b4003ffc10639f725e70c"},{url:"/x_512x512.png",revision:"e7579eccde76f0201e732118cca7c2d7"},{url:"/zeit.svg",revision:"7b2022f3692adf56949c7019f7ebb670"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
