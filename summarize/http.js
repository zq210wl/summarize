
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