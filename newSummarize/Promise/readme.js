/* 【Promise/A+规范，彻底弄懂Promise原理】=============================================== 
    参考：
      * 中文：https://zhuanlan.zhihu.com/p/143204897
      * 英文：https://promisesaplus.com/

   【示例】：
      new Promise((resolve, reject) => {
        // 这里不会返回一个新的promise
      }).then(
        successResult => { // 成功回调 }, 
        failResult => { // 失败回调 }
      ).then(
        successResult => { // 成功回调 }, 
        failResult => { // 失败回调 }
      ).then(
        null, // 不设置成功回调
        failResult => { // 失败回调 }
      ).then(
        successResult => { // 成功回调 }, 
        null // 不设置失败回调
      ).catch(err => {
        // 失败回调
      })

   【重磅总结：】
      * Promise 和 回调地狱 都是在用【异步编程】的方法去解决有关联的【同步任务】，
      * Promsie 解决的是回调地狱的问题，
      * 每个then都接受两个callback：success 和 fail，
      * Promise的每一个then的callback(success或fail)都会返回一个新的Promise，
      * 如果then的callback没有显示地返回一个promise对象，那么JS程序内部会自动执行【Promise.resolve(当前callback返回值)】来生成一个新的promise，
      * 这个新的Promise的执行结果会决定应该执行下一个then的success还是fail，
      * 如果下一个then根本就没有指定callback(success或fail)，那么就会继续往下追随找到最近一个指定了对应callback的then，然后执行它,
      * 比如：新的Promise执行结果为【fullfilled】，那么就会往下找到最近一个指定了【success】的then，然后执行它的【success】，
      * 比如：新的Promise执行结果为【rejected】，那么就会往下找到最近一个指定了【fail】的then，然后执行它的【fail】，
      * 如果找到最后都没有找到一个指定了【fail】的then，那么就会抛出异常，所以一般会在最后设置一个catch来兜底处理没有捕获的异常。
      * catch其实就是一个没有指定success的then，等同于 then(null, failCallback)，所以catch不只是放在最后来兜底的，它也可以放在then的前面。
       
   【Promise异常】
      * Promise 会自动捕获代码异常，并执行reject(异常信息)
      * 如果没有指定fail来捕获异常，Promsie就会往外抛【unhandledrejection】异常，
      * 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；
          window.addEventListener('unhandledrejection', function(event) {
            // 这个事件对象有两个特殊的属性：
            console.log('报错的promise对象：', event.promise); // [object Promise] - 生成该全局 error 的 promise
            console.log('报错的原因：', event.reason); // Error: Whoops! - 未处理的 error 对象
            // 防止默认处理（例如将错误输出到控制台）
            event.preventDefault();
          });
      * Promise没法捕获【异步执行】的异常：
          new Promise(function(resolve, reject) {
            setTimeout(() => {
              throw new Error("Whoops!");
            }, 1000);
          }).catch(alert);
*/


/* 【彻底弄懂async await原理】=============================================== 
     // 一般不只是下面这么用，这么用没有什么意义，写出来只是为了更好的理解原理
     async function yy() {  
      return 'yy';
     }
     async function zz() {
       return Promise.resolve('zz');
     }
     async function xx() {
       let promise1 = yy();
       let result1 = await promise;
       console.log(result);

       let promise2 = zz();
       let result2 = await promise2;
       console.log(result2);

       let promise3 = Promise.resolve('zz');
       let result3 = await promise3;
       console.log(result3);
     }

     // 一般是下面这么用的
     let p1 = new Promise((resolve, reject) => {});
     let p2 = new Promise((resolve, reject) => {});
     async function zz() {  
       let result1 = await p1;
       console.log(result1);
       let result2 = await p2;
       console.log(result2);
       // 最后可以return任何值，最后都会被包装成Promise返回，以供后面继续异步操作
     }
    * async await 是 Promise 的一种简化写法，可以解决连续then回调的不优雅的写法问题
    * await 后面跟随的是一个Promise对象
    * async 函数返回的是一个Promise对象，所以可以在 async函数 里面继续 await 一个async函数
    * await 返回的是Promise【Fullfilled】后的结果，
    * await 后面的Promise reject 后，会直接抛出异常，阻断后面js执行，
      * 可以在catch中来捕获处理，这时候await的就是catch返回的结果了，catch返回的也是Promsie对象
      * 一般根据具体情况看要不要这么用，还是不处理异常，直接让程序报错就行了
*/
