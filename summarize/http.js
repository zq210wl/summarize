
/*
 【https】
  参考：https://www.jianshu.com/p/14cd2c9d2cd2
*/


/*
 【http缓存，注意：缓存都是针对get请求的】
  1、不使用缓存
      * Pragma: no-cache（http1.0）(只有这一个值)
         * 这样设置以后是【不走强缓存】，还是回去检验协商缓存的expired字段，可以设置Expired来达到不缓存的目的。
         * 所以【http1.0没有设置不走缓存的设置，只能设置不走强缓存】
      * Cache-control: no-store （http1.1）
         * 这样设置就不走缓存了 
  2、强制缓存
      * Expired: [过期时间] （http1.0）
         * 这里设置的是绝对时间，缺陷：客户端和服务器端时间不同
         * 作为一种向下兼容方案，仍然在用
      * Cache-control: max-age=10000 （http2.0）（解决http1.0的Expired为绝对时间的问题）
         * max-age （一个过期时长，单位是秒，比如10000秒）
  2、走协商缓存
      * Last-Modified/If-Modified-Since （http1.0和http1.1都采用的这种方式）
         * http1.0 不需要对 Pragma 做设置，设置了也没用
         * http1.1 不需要对 Cache-control 做设置，因为默认值就是no-cache
      * ETag/If-None-Match （http2.0版本）
         * 解决了 Last-Modified 时间只能精确到一秒的缺陷
        
  【【缓存生效顺序：】】
     * http1.0
         * 先看是否设置了 Pragma: no-cache 不走强缓存，
            * 如果没设置，就去检查 Expired 来走强缓存
               * 如果 Expired 没设置，那么再去检查 Last-Modified 来走协商缓存
            * 如果设置了，就会去检查 Last-Modified 来走协商缓存
      * http2.0
         * 先看是否设置了 Cache-control: no-store 不走缓存
            * 如果没设置，就先检查 max-age 来走强制缓存，如果没设置，就去走协商缓存，先检查 ETag ，如果没设置，就再去检查 Last-Modified
            * 如果设置了就不走缓存了
*/


/*
  【TCP、UDP、三次握手 ？？？？？？？？？】

*/




/*
  等待整理？？？？？
  1、 等待获取CSS不会阻塞HTML的解析或者下载，但是它的确阻塞JavaScript，因为JavaScript经常用于查询元素的CSS属性。
  2、浏览器中的一些概念以及他们之间的关系：https://blog.csdn.net/BonJean/article/details/78453547
  3、渲染引擎和js引擎直接是怎么配合的？ https://blog.csdn.net/qiwoo_weekly/article/details/116772674
      * 渲染是会阻塞主线程的，也就是会阻塞js执行  
  4、渐进式 Web 应用介绍：https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Introduction
  5、window.requestAnimationFrame
       * event loop的机制会导致 动画延迟执行 或者 丢帧
       * requestAnimationFrame 可以解决丢帧问题，但是也解决不了延迟问题，它可以保证只要有机会执行渲染了，就一定会把requestAnimationFrame中的动画给执行了？？？？
      【
         1、用setTimeOut或setInterval为什么会导致动画延迟或丢帧？
             * 在setTimeOut或setInterval的回调执行完以后，会把渲染任何放到渲染任务列表中，
             * 如果还没到下一帧渲染的时侯，就会接着先去执行其它js任何，这个时候这个js任务可能很长，
             * 就会阻塞下一次渲染，从而导致错过下一次渲染时机，只能继续等待下一帧。
       】
   6、为什么用display:table来清楚浮动，而不用block？
       display:table不只是用来清除浮动的，还用来防止第一个元素或者最后一个元素在设置了margin以后，导致的margin塌陷的。
*/