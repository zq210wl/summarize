define('/folder/c.js', ['/folder/a.js', '/folder/b.js'], function(a, b){
    // do something ...
    return a + b;
});
require('/folder/c.js');
(function(){
    var modulePathMap = {};
    var modules = {};
    function config(options) {
      modulePathMap = options.paths;
    }
    function define(moudleName, dependencies, factory){
        modules[moudleName] = {
          factory: factory,
          export: undefined,
          dependencies: dependencies,
          done: false
        };
    }
    // todo ..... 改成多模块加载
    function require(moudleName, callback){
      if (modules[moudleName]) {
        var curModule = modules[moudleName];
        if (curModule.done) {
          return curModule.export;
        } else {
          var result = curModule.factory();
          curModule.export = result;
          curModule.done = true;
          callback(result);
          return result;
        }
      } else {
        loadJS(moudleName).then(function(){
          modules[moudleName].dependencies;
          // todo .......
        });
      }
      return factory();
      var factory = modules[moudleName];
    }
})();
let factorys ={};

function define(moudleName,dependencies,factory){
  factorys[moudleName] = factory;
  factory.dependencies = dependencies; //将依赖记在函数上。
}
function require(mods,callback){
  let result =  mods.map(function(mod){ //name  age
    let factory = factorys[mod];
    let exports;
    let dependencies = factory.dependencies;//依赖可能是多个，
    require(dependencies,function(){
      exports = factory.apply(null,arguments);
    })
    return exports;
  });
  callback.apply(null,result)
}
define("name",[],function(){
  return "dong" 
})
define("age",["name"],function(name){
  return  name+26
})
require(["age"],function(age){
}