console.log('main.js');

console.log(location.href);

const worker = new Worker('./emptyWorker.js');
// const worker = new Worker(location.href + 'emptyWorker.js');

console.log(worker);

// globalScopeWorker.js

// service worker
navigator.serviceWorker.register('/serviceWorker.js')
  .then((serviceWorkerRegistration) => {
    console.log(serviceWorkerRegistration)
  })

console.log(caches)

const request1 = new Request('https://www.foo.com')
const response1 = new Response('fooResponse')

caches.open('v1')
  .then((cache) => {
    cache.put(request1, response1)
      .then(() => cache.keys())
      .then(console.log)
      .then(() => cache.delete(request1))
      .then(() => cache.keys())
      .then(console.log)
  })