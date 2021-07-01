/************************** 基础计算题 ******************************/

/*  【函数柯里化】=============================================== 
    实现： add(1,2,3).sumof(), add(1)(2)(3).sumof(), add(1,2)(3).sumof()
*/
function add(...rest) {
    var allNumsArr = [...rest];
    var fn = (...innerRest) => {
        allNumsArr.push(...innerRest);
        return fn;
    }
    fn.sumof = () => {
        return allNumsArr.reduce((total, num) => {
            return total + num;
        }, 0);
    }
    return fn;
}
// console.log(add()(4)(5)(6).sumof());

/*  【驼峰转换】=============================================== 
    实现： get_element_by_id => getElementById
*/
let str = 'get_element_by_id'.replace(/_(.)/g, function($0, $1) {
    return $1.toUpperCase();
});
//console.log(str);

let str = 'get_element_by_id'.split('_').reduce((all, item, index) => {
    return all + item.substr(0,1).toUpperCase() + item.substr(1);
});
//console.log(str);

/*  【深度拷贝】=============================================== 
    实现： https://www.jianshu.com/p/f4329eb1bace
*/

/*  【二进制和十进制转换】=============================================== 
    实现： 
*/

/*  【sort排序】=============================================== 
    默认是字典排序：[11, 2, 3].sort()
    用法：需要传递一个排序函数作为参数
    有以下几种情况案例：
    1、根据数字来排序：
       1）[1,3,2]
       2）[{x:1}, {x:3}, {x:2}] 
    2、根据字母来排序：
       1）['a', 'c', 'b']
       2）[{x:'a'}, {x:'c'}, {x:'b'}]
    解答：
    1、以上两种情况都可以用：
        function(a, b){
            return a < b ? -1 : 1;  // 升序
            //return a > b ? -1 : 1;  // 降序
        }
    2、数字还可以用：
        function(a, b){
            return a - b;  // 升序
            //return b - a;  // 降序
        }
    
*/
let arr1 = ['a','c', 'b']; // 或 arr = [1,3,2]
arr1.sort(function(a, b){
    return a < b ? -1 : 1;  // 升序
    //return a > b ? -1 : 1;  // 降序
});

let arr2 = [{x:1}, {x:3}, {x:2}]; // 根据对象x属性来排序
arr2.sort(function(a, b){
    return a.x < b.x ? -1 : 1;  // 升序
    //return a.x > b.x ? -1 : 1;  // 降序
});

let arr3 = [1, 3, 2];
arr3.sort(function(a, b){
    return a - b;  // 升序
    //return b - a;  // 降序
});

/*  【交换数组中的两个元素的位置】=============================================== 
    实现：ES6语法 
*/
let arr = [1,2];
[arr[0], arr[1]] = [arr[1], arr[0]];

/*  【随机获取10到20之间的一个整数（包括10和20）】=============================================== 
*/
Math.round(10 + (20 - 10) * Math.random())

/*  【数组去冲，Set】=============================================== 
*/
[...new Set([1, 2, 2, 3, 3, 4])]


/*  【金额千分位格式化处理】=============================================== 
*/
String(str).replace(/(\d{1,3})(?=(\d{3})+($|\.))/g, "$1,")

/*  【debounce(防抖)和throttle(节流)】=============================================== 

    function debounce (fn, delay) {
        let timer = null;
        return function () {
            let context = this;
            let args = arguments;
            if (timer) {
                clearTimeout(time);
                timer = null;
            }
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }

    function throttle (fn, delay) {
        let timer = null;
        let lastTime = Date.now();
        return function() {
            let context = this;
            let args = arguments;
            let remainDelay = delay - (Date.now() - lastTime);
            clearTimeout(timer);
            if (remainDelay <= 0) {
                fn.apply(context, args);
                lastTime = Date.now();
            } else {
                timer = setTimeout(function(){
                    fn.apply(context, args);
                    lastTime = Date.now();
                }, remainDelay);
            }
        }
    }
*/


/*  【用 requestAnimationFrame 实现一秒执行一次动画】=============================================== 
        
        function loop(delay, last) {
            requestAnimationFrame((now) => {
                if (now - last >= delay) {
                    console.log(`${delay}秒执行一次`);
                    loop(delay, now);
                } else {
                    loop(delay, last);
                }
            });
        }
        loop(1000, 0); // 初始化循环
*/


/*  【组合函数：compose】=============================================== 
     * 函数的本质是把多个操作合并：
        * args -> A方法 -> B方法 -> C方法 -> result
        
        // 从【右到左】依次对【某个东西】执行相应的操作
        function myCompose(...fns) {
            return (...arg) => {
                return fns.reduceRight((pre, cur) => {
                    return typeof pre === 'function' ? cur(pre(...arg)): cur(pre);
                });
            }
        }

        // 需要依次执行以下三个操作，前面执行结果是后面的参数
        function addA(str) {
            return str + '-A';
        }
        function addB(str) {
            return str + '-B';
        }
        function addC(str) {
            return str + '-C';
        }
        
        var execFn1 = myCompose(addC, addB, addA);
        var execFn2 = myCompose(addC, myCompose(addB, addA));
        var execFn3 = myCompose(myCompose(addC, addB), addA);
        console.log(execFn1('Hello'));
        console.log(execFn2('Hello'));
        console.log(execFn3('Hello'));
*/


/*  【柯里化函数：curry】=============================================== 
     * 函数的本质是缓存参数，一并求职：
       * 实现函数的无限调用，每次调用完都还是返回一个函数，
       * 目的是把每次调用的参数收集到一起并缓存起来，
       * 利用函数隐士转换会调用toString方法来得到所有参数的求值。

        例如实现：add(1,2)(2)(3,4)(5,6,7)

        function add(...args) {
            var inner = (...innerArgs) => {
                args = [...args, ...innerArgs];
                return inner;
            }
            inner.toString = () => {
                return args.reduce((pre, cur) => {
                    return pre + cur;
                });
            }
            return inner;
        }

        var res1 = add(1, 2)(3);
        console.log(res1);

        var res2 = add(4);
        console.log(res2);

        var res3 = res1(5)(6);
        console.log(res2);
*/


/*
   【轮询的接口中的请求，如何保证【先发送后返回数据】的情况被丢弃掉】=============================================== 
        function setTimer() {
            let lastRequestSuccessTime = 0; // 记录最近一次请求成功的时间戳
            setInterval(() => {
                let requestTime = Date.now(); // 设置当前请求的时间戳
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, Math.random() * 3000);
                }).then(res => {
                    if (requestTime > lastRequestSuccessTime) { // 比较当前和上一次请求成功的时间戳，大于就执行，不大于就放弃
                        console.log('Done:', requestTime - lastRequestSuccessTime);
                        lastRequestSuccessTime = requestTime;
                    }
                });
            }, 100);
        }
        setTimer();
*/