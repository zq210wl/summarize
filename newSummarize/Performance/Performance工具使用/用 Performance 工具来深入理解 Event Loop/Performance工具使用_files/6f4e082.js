(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{1174:function(e,t,n){},1863:function(e,t,n){n(18),n(16),n(13),n(6),n(15);var r=n(127),c=n(165);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}e.exports={functional:!0,render:function(e,t){var n=t._c,data=(t._v,t.data),l=t.children,f=void 0===l?[]:l,v=data.class,d=data.staticClass,style=data.style,w=data.staticStyle,C=data.attrs,O=void 0===C?{}:C,h=c(data,["class","staticClass","style","staticStyle","attrs"]);return n("svg",function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){r(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({class:[v,d],style:[style,w],attrs:Object.assign({width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},O)},h),f.concat([n("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM7.89913 7.89775C8.1188 7.67808 8.47495 7.67808 8.69462 7.89775L12.0234 11.2266L15.3523 7.89775C15.5719 7.67808 15.9281 7.67808 16.1477 7.89775C16.3674 8.11742 16.3674 8.47357 16.1477 8.69324L12.8189 12.0221L16.3844 15.5875C16.6041 15.8072 16.6041 16.1634 16.3844 16.383C16.1647 16.6027 15.8086 16.6027 15.5889 16.383L12.0234 12.8176L8.45796 16.383C8.23829 16.6027 7.88214 16.6027 7.66247 16.383C7.4428 16.1634 7.4428 15.8072 7.66247 15.5875L11.2279 12.0221L7.89913 8.69324C7.67946 8.47357 7.67946 8.11742 7.89913 7.89775Z"}})]))}}},1864:function(e,t,n){"use strict";n(1174)},2010:function(e,t,n){"use strict";n.r(t);n(19);var r=n(5),c=(n(37),n(3)),o=n(40),l=n.n(o),f=n(1863),v=n.n(f),d=n(17),w=n(4),C=Object(c.b)({components:{CloseIcon:v.a},emits:["show"],setup:function(e,t){var n=t.root,o=t.emit,f=["timelineIndex","column","pinsIndex"],v=n.$device.isMobile,C=Object(c.p)(),O=Object(c.l)(),h=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!f.filter((function(e){return e===(C.value.name||"")})).length){e.next=10;break}return e.next=4,n.$store.dispatch(w.TCC_CONFIG,"juejin_fixed_resource_config");case 4:if(t=e.sent){e.next=7;break}return e.abrupt("return");case 7:localStorage.getItem(d.a.showFixedResourceTip)!==t.id&&l()().isAfter(t.start)&&l()().isBefore(t.end)&&(o("show"),O.value=t),e.next=11;break;case 10:O.value&&(O.value=void 0);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.s)((function(){return C.value.name}),(function(){h()})),Object(c.h)((function(){h()})),{activeAd:O,closeAd:function(){var e;localStorage.setItem(d.a.showFixedResourceTip,(null===(e=O.value)||void 0===e?void 0:e.id)||""),O.value=void 0},handleClick:function(){var link=v?O.value.h5Link:O.value.webLink;window.open(link,"_blank")}}}}),O=(n(1864),n(28)),component=Object(O.a)(C,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.activeAd?n("div",{staticClass:"poster-resouce-wrap",on:{click:function(t){return t.stopPropagation(),e.handleClick(t)}}},[n("div",{staticClass:"poster-close-wrap",on:{click:function(t){return t.stopPropagation(),e.closeAd(t)}}},[n("CloseIcon",{staticClass:"poster-close-icon"})],1),e._v(" "),n("div",{staticClass:"poster-img-wrap"},[n("img",{staticClass:"poster-img",attrs:{src:e.activeAd.imgUrl}})])]):e._e()}),[],!1,null,"a4f95a74",null);t.default=component.exports}}]);
//# sourceMappingURL=6f4e082.js.map