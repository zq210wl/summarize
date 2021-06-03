
/*
Array
Math
String
RegExp
reduce  ???
*/

/*
Object.prototype.toString.call(obj) === '[object Object]'

Math.max.apply(null, [1, 2, 3])
Math.max.call(null,1, 2, 3)

[...new Set(array)]  // 去除数组的重复成员
[...new Set('ababbc')].join('')  // 去除字符串里面的重复字符

Set // 数据
Map // 对象

for (let i in obj) {
    obj.hasOwnProperty(i)
}

Math.random()  0-1（包括0，不包括1）
function getRandom(min, max) {
    let res = min + Math.round((max - min) * Math.random());
    return res;
}

'testAAtestAAtest'.match(/te(s)(t)/)    输出：['test', 's', 't', index: 1, input: 'testAAtestAAtest']
'testAAtestAAtest'.match(/te(s)(t)/g)   输出：['test', 'test', 'test']

/te(s)(t)/.exec('testAAtestAAtest')     输出：['test', 's', 't', index: 1, input: 'testAAtestAAtest']

var reg = /te(s)(t)/g
var res;
while(res = reg.exec('testAAtestAAtest')) {
    console.log(res); 
    // 输出：['test', 's', 't', index: 0, input: 'testAAtestAAtest']
    // 输出：['test', 's', 't', index: 6, input: 'testAAtestAAtest']
    // 输出：['test', 's', 't', index: 12, input: 'testAAtestAAtest']
}

function xxx() {
  return Array.prototype.slice.call(arguments);  // es6: Array.from(arguments)
}

[8,3,7,1,3,2,1,6,7,3].sort(function(a, b){
    return a - b;  // 升序：a - b  降序：b - a
})

['a','u','c','e','m','b'].sort(function(a, b){
    return a <= b ? -1 : 1;  // 升序
    return a >= b ? -1 : 1;  // 降序
})

undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）、Symbol









ES6 export 模块输出的是对象的动态引用
CommonJS 服务端模块，输出的是值的缓存，module.exports上添加模块输出
AMD 浏览器端，requireJS，define()定义模块，依赖优先加载，exports上添加模块输出
CMD 浏览器端，seaJS，define()定义模块，用到时就近加载，exports上添加模块输出
UMD 通用模块定义规范，兼容各种方式的模块引用

AMD 与 CMD：
  AMD是 RequireJS 在推广过程中对模块定义的规范化产出。
  CMD是 SeaJS 在推广过程中对模块定义的规范化产出。
  CMD推崇依赖就近，AMD推崇依赖前置。

ES Module与CommonJS:
  CommonJS模块是对象，是运行时加载，运行时才把模块挂载在exports之上（加载整个模块的所有），加载模块其实就是查找对象属性。
  ES Module不是对象，是使用export显示指定输出，再通过import输入。此法为编译时加载，编译时遇到import就会生成一个只读引用。等到运行时就会根据此引用去被加载的模块取值。所以不会加载模块所有方法，仅取所需。
  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

CommonJS与AMD/CMD:
  AMD/CMD是CommonJS在浏览器端的解决方案。
  CommonJS是同步加载（代码在本地，加载时间基本等于硬盘读取时间）。
  AMD/CMD是异步加载（浏览器必须这么做，代码在服务端）

UMD与AMD/CMD
  UMD（Universal Module Definition）是AMD和CommonJS的糅合，跨平台的解决方案。
  AMD模块以浏览器第一的原则发展，异步加载模块。
  CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。
  UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。


*/