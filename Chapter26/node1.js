// var moduleB = require('./moduleB');

// module.exports = {
// 	stuff: moduleB.doStuff();
// };

// define('moduleA', ['moduleB'], function(moduleB) {
// 	return {
// 		stuff: moduleB.doStuff()
// 	};
// });

// --- AMD ---
define('moduleA', ['require', 'exports'], function(require, exports) {
  var moduleB = require('moduleB');
  exports.stuff = moduleB.doStuff();
});

define('moduleA', ['require'], function(require) {
  if (condition) {
    var moduleB = rquire('moduleB');
  }
});

// --- 只包含一个依赖的UMD模块定义的示例 ---
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['moduleB'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('moduleB'));
  } else {
    root.returnExports = factory(root, moduleB);
  }
})(this, function (moduleB) {
  return {};
});
