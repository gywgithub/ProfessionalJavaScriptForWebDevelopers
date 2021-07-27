console.log('main.js');

console.log(location.href);

const worker = new Worker('./emptyWorker.js');
// const worker = new Worker(location.href + 'emptyWorker.js');

console.log(worker);

// globalScopeWorker.js