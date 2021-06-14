
/*
 【https】
  [参考：最完整的诠释]https://blog.csdn.net/Xw_Classmate/article/details/109324109
   * 数字证书的生成过程
      *【服务器】自己生成【公钥】和【私钥】
      *【服务器】把自己的【公钥】、【域名】、【申请者信息】打包到一个【csr的文件】中
      *【服务器】把【csr的文件】发给【CA证书机构】去申请【数字证书】
      *【CA证书机构】对【csr的文件】进行HASH计算得到一个【摘要信息】
      *【CA证书机构】用自己的【私钥】对【摘要信息】进行加密来生成【签名】
      *【CA证书机构】把【csr的文件内容】和【签名】打包生成【crt证书】
      *【CA证书机构】把【crt证书】给到【服务器】
   * 浏览器在出厂的时候就已经把各大权威【CA证书机构的证书】
      * 证书里包含了：CA机构的公钥、加密算法、有效期等信息   
   * https请求验证过程
      * 浏览器端发起请求
      * 服务器端把证书返回给浏览器
      * 浏览器就可以看到证书中的csr文件内容
      * 浏览器从csr文件内容看到是它要请求的域名，也有对应的公钥，接下来就要验证这个公钥是不是真的是这个域名对应的公钥
      * 用浏览器内置的CA机构证书的公钥来解密签名得到csr文件内容的HASH摘要信息
      * 然后浏览器再用对应的HASH算法对csr文件进行HASH计算，然后比较自己算出来的HASH摘要是否跟上一步揭秘出来的HASH摘要一致
      * 如果一致就证明自己请求回来的证书里的公钥是这个域名服务器对应的公钥
      * 然后就用服务器的公钥来加密一个随机字符串来作为对称加密的密码，发送给服务端，只有服务端有密钥可以解密
      * 服务端用私钥揭秘得到对称加密的密码
      * 然后浏览器和服务器端就可以用对称加密来发送消息内容了
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
       https://www.infoq.cn/article/javascript-high-performance-animation-and-page-rendering/
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