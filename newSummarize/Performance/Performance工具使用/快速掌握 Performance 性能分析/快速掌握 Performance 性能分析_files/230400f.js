(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1074:function(e,t,n){},1075:function(e,t,n){},1397:function(e,t,n){n(18),n(16),n(13),n(6),n(15);var o=n(127),r=n(165);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}e.exports={functional:!0,render:function(e,t){var n=t._c,data=(t._v,t.data),c=t.children,d=void 0===c?[]:c,h=data.class,m=data.staticClass,style=data.style,f=data.staticStyle,v=data.attrs,w=void 0===v?{}:v,O=r(data,["class","staticClass","style","staticStyle","attrs"]);return n("svg",function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){o(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({class:[h,m],style:[style,f],attrs:Object.assign({width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},w)},O),d.concat([n("circle",{attrs:{cx:"12",cy:"12",r:"11",fill:"black","fill-opacity":"0.4"}}),n("circle",{attrs:{cx:"12",cy:"12",r:"11.5",stroke:"white","stroke-opacity":"0.4"}}),n("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8.96924 8.24087C8.76787 8.0395 8.4414 8.0395 8.24003 8.24087C8.03867 8.44223 8.03867 8.76871 8.24003 8.97007L11.2919 12.022L8.02407 15.2898C7.82271 15.4912 7.82271 15.8177 8.02407 16.019C8.22543 16.2204 8.55191 16.2204 8.75327 16.019L12.0211 12.7512L15.289 16.019C15.4904 16.2204 15.8168 16.2204 16.0182 16.019C16.2196 15.8177 16.2196 15.4912 16.0182 15.2898L12.7503 12.022L15.8022 8.97007C16.0036 8.76871 16.0036 8.44223 15.8022 8.24087C15.6009 8.0395 15.2744 8.0395 15.073 8.24087L12.0211 11.2928L8.96924 8.24087Z",fill:"white","fill-opacity":"0.9"}})]))}}},1398:function(e,t,n){"use strict";n(1074)},1399:function(e,t,n){"use strict";n(1075)},1989:function(e,t,n){"use strict";n.r(t);n(18),n(16),n(13),n(6),n(15),n(62),n(110),n(95),n(37),n(39),n(45);var o=n(0),r=(n(19),n(5)),l=n(3),c=n(56),d=n(90),h=n(60),m=n(7),f=n(107),v=n(17),w=n(10),O=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:1e3,e.abrupt("return",setTimeout((function(){return Promise.resolve()}),t));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function _(){return(_=Object(r.a)(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||Object(w.f)()){e.next=17;break}if(localStorage.getItem(v.a.userFirstVisitDispatchCoupon)!==t){e.next=4;break}return e.abrupt("return");case 4:return e.prev=4,e.next=7,f.a.UserCouponReceiveDiscountFirstOrder({},{showError:!1});case 7:if((null==(n=e.sent)?void 0:n.err_no)!==m.ERROR_NO.OK){e.next=12;break}return localStorage.setItem(v.a.userFirstVisitDispatchCoupon,t),e.next=12,O();case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(4),console.error("userFirstVisitDispatchCoupon api request error:",e.t0);case 17:case"end":return e.stop()}}),e,null,[[4,14]])})))).apply(this,arguments)}var y=n(8),C=n(40),T=n.n(C),P=n(1397),E=n.n(P),j=n(4),R=Object(y.d)({components:{CloseIcon:E.a},emits:["show"],setup:function(e,t){var n=t.root,o=t.emit,c=[{name:"timelineIndex",alias:"home",traceShowKey:"ad_web_pop_show",traceClickKey:"ad_web_pop_click"},{name:"column",alias:"post",traceShowKey:"ad_web_article_pop_show",traceClickKey:"ad_web_article_pop_click"}],d=Object(l.p)(),h=Object(y.q)(),m=function(){var e=localStorage.getItem(v.a.showAdTccModal)||"[]",t=[];try{var n=JSON.parse(e);Array.isArray(n)&&(t=n)}catch(e){console.error(e),t=[]}return t},f=function(){return c.filter((function(e){return e.name===(d.value.name||"")}))},w=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t,r,l,c,d,v,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.$device.isDesktop){e.next=2;break}return e.abrupt("return");case 2:if(!(l=f()).length){e.next=13;break}return e.next=6,n.$store.dispatch(j.TCC_CONFIG,"juejin_config_web_ad_home_post");case 6:c=e.sent,d=(null===(t=c)||void 0===t?void 0:t[l[0].alias])||[],v=Date.now()/1e3,(w=d.filter((function(e){return v>T()(e.startTime).unix()&&v<T()(e.endTime).unix()}))).length&&!m().includes("".concat((null===(r=w[0])||void 0===r?void 0:r.id)||""))&&(o("show"),h.value=w[0],O(l[0].traceShowKey)),e.next=14;break;case 13:h.value&&(h.value=void 0);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(y.v)((function(){return d.value.name}),(function(){w()})),Object(y.l)((function(){w()}));var O=function(e){var t,o;e&&n.$TEA(e,{id:(null===(t=h.value)||void 0===t?void 0:t.id)||"",ad_url:(null===(o=h.value)||void 0===o?void 0:o.url)||""})},_=function(e){var t,o,r;n.$TEA(null===(t=f()[0])||void 0===t?void 0:t.traceClickKey,{id:(null===(o=h.value)||void 0===o?void 0:o.id)||"",ad_url:(null===(r=h.value)||void 0===r?void 0:r.url)||"",click_type:e})};return{activeAd:h,closeAd:function(){var e;localStorage.setItem(v.a.showAdTccModal,JSON.stringify(m().concat(["".concat((null===(e=h.value)||void 0===e?void 0:e.id)||"")]))),_("skip"),h.value=void 0},handleClick:function(){_("enter"),window.open(h.value.url,"_blank")}}}}),k=(n(1398),n(28)),S=Object(k.a)(R,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.activeAd?n("div",{staticClass:"poster-wrap",on:{click:function(t){return t.stopPropagation(),e.handleClick(t)}}},[n("div",{staticClass:"poster-close-wrap",on:{click:function(t){return t.stopPropagation(),e.closeAd(t)}}},[n("CloseIcon",{staticClass:"poster-close-icon"})],1),e._v(" "),n("div",{staticClass:"poster-img-wrap"},[n("img",{staticClass:"poster-img",attrs:{src:e.activeAd.imgUrl}})]),e._v(" "),n("div",{staticClass:"poster-title"},[e._v(e._s(e.activeAd.title))])]):e._e()}),[],!1,null,"144bae02",null).exports,L=n(895),A=n(884),M=n(20);var D=n(355),I=n(82),x=n(55),N=n(181),V=n(31),U=n(47),F=n(916),B=n(244);function G(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function $(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?G(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):G(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var H=0,K=["/bind","/login","/mobile/lottery","/mobile/lottery/welfare","/getting-started","/app","/delete/account","/mobile/bugfix","/bugfix/rank",/^\/meeting/,"/challenge/1","/challenge/1/detail"],J=Object(l.b)({components:{AlertList:function(){return n.e(42).then(n.bind(null,1991))},ErrorView:function(){return Promise.resolve().then(n.bind(null,437))},BindPhoneModal:function(){return n.e(33).then(n.bind(null,1999))},NewUserLead:function(){return n.e(28).then(n.bind(null,1988))},PinModal:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,1986))},AuthModal:function(){return n.e(24).then(n.bind(null,1998))},ActivityRecommend:function(){return n.e(57).then(n.bind(null,2003))},AccountDeleteModal:function(){return n.e(38).then(n.bind(null,2004))},GlobalFloatBanner:function(){return Promise.all([n.e(167),n.e(39)]).then(n.bind(null,2005))},GlobalFullscreenPopUp:function(){return n.e(40).then(n.bind(null,2006))},SuspensionPanel:function(){return n.e(30).then(n.bind(null,1992))},VipBorrowModal:function(){return n.e(45).then(n.bind(null,2e3))},UserGrowthLead:function(){return n.e(23).then(n.bind(null,1987))},UserGrowthPopup:function(){return n.e(29).then(n.bind(null,2007))},UpgradeBox:function(){return n.e(41).then(n.bind(null,2008))},Report:function(){return Promise.all([n.e(169),n.e(25)]).then(n.bind(null,1996))},BottomLoginGuide:function(){return n.e(47).then(n.bind(null,2009))},HomePostTccAd:S,FixedResourceTccConfig:function(){return n.e(49).then(n.bind(null,2010))},DarkModeNotification:function(){return n.e(44).then(n.bind(null,2011))},RiskModal:function(){return n.e(56).then(n.bind(null,2012))}},setup:function(e,t){var n=t.root,o=Object(l.r)(),d=Object(l.q)(),m=Object(A.a)().doFollow;o.dispatch(j.LOAD_THEME);var f=Object(L.b)(n),w=f.showReportModal,O=f.reportModalData,_=Object(I.d)(v.a.juejinDarkNotification)[v.a.juejinDarkNotification],y=Object(I.b)(v.a.juejinDarkNotification).handleJuejinDarkNotificationDismiss,C=Object(l.a)((function(){return Object(M.f)(d.currentRoute.fullPath)}));Object(l.h)((function(){var e,t,r=n.$getBean("eventBus");r.onVmLife(n,r.eventType.REPORT_CONTENT,w),!C.value&&(null===(t=null===(e=o.state.auth)||void 0===e?void 0:e.user)||void 0===t?void 0:t.user_id)&&(o.dispatch(j.FETCH_ORE_COUNT),o.dispatch(j.FETCH_AVATAR_MENU_INFO),h.a.CompleteTask().catch((function(){}))),Object(F.a)(!0)}));var style=Object(l.a)((function(){var e;return null===(e=n.$store.getters[j.TCC_STYLE])||void 0===e?void 0:e.trim()})),script=Object(l.a)((function(){var e;return null===(e=n.$store.getters[j.TCC_SCRIPT])||void 0===e?void 0:e.trim()})),T=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:script.value&&((t=document.createElement("script")).innerHTML=script.value,document.documentElement.appendChild(t)),style.value&&((n=document.createElement("style")).innerHTML=style.value,document.head.appendChild(n));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.h)(Object(r.a)(regeneratorRuntime.mark((function e(){var t,r,l,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.$store.dispatch(j.TCC_CONFIG),!(null===(t=o.state.auth)||void 0===t?void 0:t.user)){e.next=13;break}if(r=localStorage.getItem(v.a.autoFollowUser),localStorage.removeItem(v.a.autoFollowUser),!r){e.next=11;break}if(!(l=Object(x.f)(r,(function(e){return"number"==typeof(null==e?void 0:e.expire)&&e.expire>Date.now()})))){e.next=11;break}return e.next=9,m(l.itemId,l.itemType,{teaFollowType:l.teaFollowType});case 9:(d=e.sent)&&d.isSuccess&&c.Message.success("关注成功");case 11:e.next=15;break;case 13:Object(x.f)(localStorage.getItem(v.a.autoFollowUser),(function(e){return"number"==typeof(null==e?void 0:e.expire)&&e.expire>Date.now()}))||localStorage.removeItem(v.a.autoFollowUser);case 15:case"end":return e.stop()}}),e)})))),Object(l.s)([style,script],(function(){T()})),function(e){var t=Object(l.r)(),n=Object(l.q)(),o=Object(l.a)((function(){var e;return null===(e=t.state.auth)||void 0===e?void 0:e.userInitiated})),r=Object(l.a)((function(){var e;return null===(e=t.state.auth)||void 0===e?void 0:e.user})),c=Object(l.a)((function(){return Object(M.f)(n.currentRoute.fullPath)}));Object(l.s)(o,(function(t){c.value&&t&&e(!!r.value)}),{immediate:!0})}((function(e){e&&(o.dispatch(j.FETCH_ORE_COUNT),o.dispatch(j.FETCH_AVATAR_MENU_INFO),h.a.CompleteTask())})),$($({},Object(I.c)()),{},{reportModalData:O,darkModeVisible:_,onDarkNotificationClose:y},Object(D.a)())},data:function(){return{visibleAuthForm:null,isSuspensionPanelVisible:!1,isAlertListVisible:!1,newuserTicket:!1,isVisiblePinEditor:!1,isBindPhoneNumberModalVisible:!1,captchaType:"SLIDE",verifyCallback:"",bindPhoneMsg:"",to:"",isLogoutModalVisible:!1,UserLeadPopupShowed:!1,isFromMainPageSigninClick:!1,enter_method:"",bindPhoneOption:{},popupMutex:!1,isShowVipBorrow:!1,vipTeaParams:{},bookInfo:{},hideRecommendComponent:!1,closeRedirectParams:null,loginGuideFooterVisible:!1,hasTccAd:!1,loginGuideFrom:void 0}},computed:$($({},Object(d.mapGetters)({user:j.USER,activity:j.ACTIVITY,logined:j.LOGINED,unreadNotificationCount:j.UNREAD_NOTIFICATION_COUNT,errorView:j.ERROR_VIEW,statusCode:j.STATUS_CODE,needSuspension:j.NEED_SUSPENSION,needRiskModal:j.NEED_RISK_MODAL,userInitiated:j.USER_INITIATED})),{},{displayedUnreadNotificationAmount:function(){return Object(B.c)(this.unreadNotificationCount.total)},titleTemplate:function(){return this.displayedUnreadNotificationAmount?"(".concat(this.displayedUnreadNotificationAmount,") %s - 掘金"):"%s - 掘金"},date:function(){return Object(V.b)(new Date,"MMDD")},recommendComponent:function(){var e;return this.hideRecommendComponent||["login","lognIndex","bindIndex","offer","presalePay","presaleIndex","presaleResult","vipIndex","vipPayResult","membership","membershipHome","integral","property","mall"].includes(this.$route.name)||this.$route.path.startsWith("/creator")?null:1===(null===(e=this.activity[2020])||void 0===e?void 0:e.is_show)?"ActivityRecommend":null},isPathExcluded:function(){var path=this.$router.currentRoute.path;return K.some((function(e){return e instanceof RegExp?e.test(path):e===path}))}}),watch:{visibleAuthForm:function(e){this.visibleMobileExtension(!e)},user:function(e){var t=this.$route.name||"";("courseIndex"!==t||this.$route.path.includes("bytetech"))&&(["bookInfo","column"].includes(t)||function(e){_.apply(this,arguments)}((null==e?void 0:e.user_id)||""))},$route:function(){this.checkLogin(),this.modalStyleTimer&&clearTimeout(this.modalStyleTimer),this.modalStyleTimer=setTimeout((function(){document.body.style.overflow="",document.body.style.paddingRight=""}),300)},userInitiated:{handler:function(e){if(e&&(this.checkLogin(),this.$device.isDesktop)){var t=localStorage.getItem("juejin_2608_theme")||"{}",n=JSON.parse(t),o=n.theme,r=void 0===o?"light":o,l=n.isFollowSystem,c=void 0!==l&&l;this.$TEA("current_theme",{theme:r,isFollowSystem:c})}},immediate:!0}},mounted:function(){H=new Date,this.initEventListener(),this.mountAlertList(),this.mountSuspensionPanel(),this.$store.dispatch(j.ACTIVITY),this.modalStyleTimer=null,"1"!==window.sessionStorage.getItem("IS_DELETE")||this.popupMutex||this.isPathExcluded||(this.isLogoutModalVisible=!0,this.popupMutex=!0,window.sessionStorage.removeItem("IS_DELETE"))},beforeDestroy:function(){Object(U.m)(this.handleVisibilityChange),this.modalStyleTimer&&clearTimeout(this.modalStyleTimer)},methods:$($({},Object(d.mapActions)({fetchCurrentUser:j.FETCH_CURRENT_USER})),{},{visibleMobileExtension:function(e){var t=document.getElementById("mobile-newuser-ticket");null!==t&&(t.style.opacity=Number(e))},checkLogin:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,o,r,l,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$store.getters.USER){t.next=6;break}return t.next=3,e.$store.dispatch(j.TCC_CONFIG,"juejin_login_config");case 3:l=t.sent,(null==(c=null===(r=null===(o=null===(n=l)||void 0===n?void 0:n.mustLogin)||void 0===o?void 0:o.bookIds)||void 0===r?void 0:r.map((function(e){return{reg:new RegExp("^/((book)|(video))/(m/)?".concat(e,"/section/\\d+$")),id:e}})))?void 0:c.length)&&window.location.pathname&&c.forEach((function(t){var n=t.reg,o=t.id;n.test(window.location.pathname)&&e.$requestLogin({closeRedirectParams:{name:"bookInfo",params:{id:o}}})}));case 6:case"end":return t.stop()}}),t)})))()},initEventListener:function(){var e=this,t=this.$getBean("eventBus"),n=t.eventType;t.onVmLife(this,n.VISIBLE_LOGOUT_MODAL,(function(){e.isLogoutModalVisible=!0})),t.onVmLife(this,n.REQUEST_LOGIN,(function(t){var n=t||{},o=n.click,r=void 0!==o&&o,l=n.enterMethod,c=n.closeRedirectParams,d=n.successRedirectUrl,h=n.loginGuideFrom;e.isFromMainPageSigninClick=r,e.enter_method=l,e.visibleAuthForm="login-with-phone",e.newuserTicket=null,e.closeRedirectParams=c||null,e.loginGuideFrom=h,e.to=d||""})),t.onVmLife(this,n.SHOW_VIP_BORROW_MODAL,(function(t,n){e.isShowVipBorrow=!0,e.bookInfo=t,e.vipTeaParams=n})),t.onVmLife(this,n.REQUEST_LOGIN_REDIRECT,(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2?arguments[2]:void 0;e.isFromMainPageSigninClick=t,e.enter_method=n,e.visibleAuthForm="login-with-phone",e.newuserTicket=null,e.to=o})),t.onVmLife(this,n.REQUEST_REGISTER,(function(t){e.visibleAuthForm="register",e.newuserTicket=t})),t.onVmLife(this,n.REQUEST_RESET_PASSWORD,(function(){e.visibleAuthForm="reset-password"})),t.onVmLife(this,n.AUTHORIZED,(function(){e.visibleAuthForm=null})),t.onVmLife(this,n.REQUEST_LOGOUT,(function(){e.$store.dispatch(j.LOGOUT)})),t.onVmLife(this,n.ALERT,(function(content,t){e.$refs.alertList.$emit("push",{content:content,type:t})})),t.onVmLife(this,n.CREATE_PIN,(function(t){e.isVisiblePinEditor="pin",e.editorProps=t})),t.onVmLife(this,n.BIND_PHONE_NUMBER,(function(t,option){e.bindPhoneMsg=t||"",e.isBindPhoneNumberModalVisible=!0,e.bindPhoneOption=option;var n=e.$getBean("eventBus");n.emit(n.eventType.LOCK_ROOT_CONTAINER_SCROLL)})),Object(N.d)(),Object(U.l)(this.handleVisibilityChange)},mountAlertList:function(){this.isAlertListVisible=!0},mountSuspensionPanel:function(){this.isSuspensionPanelVisible=!this.isPathExcluded},onBindPhoneNumberModalClose:function(){var e=this.$getBean("eventBus");this.fetchCurrentUser(),this.isBindPhoneNumberModalVisible=!1,e.emit(e.eventType.UNLOCK_ROOT_CONTAINER_SCROLL)},collectPageStayTime:function(){var e=0;H&&(e=new Date-H),this.$TEA("main_site_stay",{user_id:this.user?this.user.id:"unknown",page_link:window.location.href,stay_time:e}),H=0},handleVisibilityChange:function(){var e=Object(U.d)();document[e]?this.collectPageStayTime():H=new Date},closeRecommendComponent:function(){this.hideRecommendComponent=!0},closeAuthModal:function(e){this.visibleAuthForm=null,!0!==e&&this.closeRedirectParams&&this.$router.push(this.closeRedirectParams)}})}),Q=(n(1399),Object(k.a)(J,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"juejin"}},[e.errorView?[n("client-only",[n("ErrorView",{attrs:{"status-code":e.statusCode}})],1)]:n("router-view"),e._v(" "),e.recommendComponent?n(e.recommendComponent,{tag:"component",attrs:{logined:e.logined},on:{close:e.closeRecommendComponent}}):e._e(),e._v(" "),n("div",{staticClass:"global-component-box"},[n("ClientOnly",[e.isAlertListVisible?n("AlertList",{ref:"alertList",staticClass:"alert-list"}):e._e(),e._v(" "),e.isSuspensionPanelVisible&&e.needSuspension?n("SuspensionPanel",{staticClass:"suspension-panel",attrs:{"has-extension-banner":Boolean(e.recommendComponent)}}):e._e(),e._v(" "),e.isBindPhoneNumberModalVisible?n("BindPhoneModal",{attrs:{visible:e.isBindPhoneNumberModalVisible,msg:e.bindPhoneMsg,to:e.bindPhoneOption.toUrl||"",closable:e.bindPhoneOption.closable,title:e.bindPhoneOption.title,"trigger-type":e.bindPhoneOption.triggerType},on:{close:e.onBindPhoneNumberModalClose}}):e._e(),e._v(" "),e.isVisiblePinEditor?n("PinModal",{attrs:{"editor-props":e.editorProps},on:{close:function(t){e.isVisiblePinEditor=!1}}}):e._e(),e._v(" "),e.visibleAuthForm?n("AuthModal",{attrs:{type:e.visibleAuthForm,"newuser-ticket":e.newuserTicket,to:e.to,"is-from-main-page-signin-click":e.isFromMainPageSigninClick,enter_method:e.enter_method,"login-guide-from":e.loginGuideFrom},on:{close:e.closeAuthModal}}):e._e(),e._v(" "),e.isShowVipBorrow?n("VipBorrowModal",{attrs:{"book-info":e.bookInfo,"tea-params":e.vipTeaParams},on:{closeVipBorrowModal:function(t){e.isShowVipBorrow=!1}}}):e._e()],1)],1),e._v(" "),n("ClientOnly",[n("NewUserLead",{attrs:{visible:e.showNewUserLead},on:{close:e.handleShowNewUserLeadDismiss,finish:e.handleShowNewUserLeadDismiss}}),e._v(" "),e.user_growth_lead?n("UserGrowthLead",{attrs:{logined:e.logined},on:{confirm:function(t){return e.handleUser_growth_leadDismiss("confirm")},dismiss:function(t){return e.handleUser_growth_leadDismiss("dismiss")}}}):e._e(),e._v(" "),e.showUserGrowthPopup||e.showUserGrowthPopup.visible?n("UserGrowthPopup",{attrs:{popup:e.showUserGrowthPopup.data},on:{dismiss:e.handleShowUserGrowthPopupDismiss}}):e._e(),e._v(" "),n("UpgradeBox",{attrs:{visible:e.isUpgradeBoxVisible.visible,user:e.user,"growth-info":e.isUpgradeBoxVisible.data},on:{close:e.handleIsUpgradeBoxVisibleDismiss}}),e._v(" "),e.isLogoutModalVisible?n("AccountDeleteModal",{attrs:{"need-qrcode":!1},on:{close:function(t){e.isLogoutModalVisible=!1}}},[e._v("\n      掘友您好，您当前登录账号正在注销审核期，故无法访问稀土掘金内容。如果需要取消注销申请，请登录稀土掘金App，进行放弃注销操作。如果您有任何建议和反馈，可以发送邮箱到\n      feedback@xitu.io 联系我们。给您带来的不便，我们深感抱歉。\n    ")]):e._e(),e._v(" "),e.reportModalData.show?n("Report",{attrs:{"item-id":e.reportModalData.itemId,"item-type":e.reportModalData.idType},model:{value:e.reportModalData.visible,callback:function(t){e.$set(e.reportModalData,"visible",t)},expression:"reportModalData.visible"}}):e._e()],1),e._v(" "),n("ClientOnly",[n("RiskModal"),e._v(" "),n("FixedResourceTccConfig",{on:{show:function(t){e.hasTccAd=!0}}}),e._v(" "),n("HomePostTccAd",{class:{"home-post-tcc-add":!0,"tcc-ad-with-recommend":!!e.recommendComponent},on:{show:function(t){e.hasTccAd=!0}}}),e._v(" "),e.showBottomLoginGuide?n("BottomLoginGuide",{on:{close:e.handleCloseBottomLoginGuide}}):e._e(),e._v(" "),n("DarkModeNotification",{attrs:{visible:e.darkModeVisible},on:{close:e.onDarkNotificationClose,ok:e.onDarkNotificationClose}}),e._v(" "),e.isSuspensionPanelVisible?n("GlobalFloatBanner"):e._e(),e._v(" "),e.isSuspensionPanelVisible?n("GlobalFullscreenPopUp"):e._e()],1)],2)}),[],!1,null,null,null));t.default=Q.exports}}]);
//# sourceMappingURL=230400f.js.map