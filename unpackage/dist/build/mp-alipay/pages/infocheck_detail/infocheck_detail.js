(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/infocheck_detail/infocheck_detail"],{1145:function(n,o,t){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={data:function(){return{info:{id:213,userName:"11",communityName:"11",idNumber:"156485256325684897498",mobile:"11",type:"11",documentType:"身份证",nationName:"汉族",unitInformation:"好的1111111111",headPortraitUrl:"/static/pic_avator.png"},showPhone:!1,showRoom:!1,showRelation:!1,showTime:!1,nationList:[],showLoading:!1,id:null,showDialog:!1,dialogText:""}},onLoad:function(n){this.id=n.id,this.getNations()},methods:{getNations:function(){var n=this;this.$request("mp/mpcommonnation/list",JSON.stringify({limit:60})).then((function(o){n.nationList=o.page.list,n.getInfo()}))},getInfo:function(){},denyHandle:function(n){this.showDialog=!0,this.dialogText="是否拒绝申请？"},passHandle:function(n){this.showDialog=!0,this.dialogText="是否通过申请？"},vertifyHandle:function(n){var o=this;o.showDialog=!1,o.showLoading=!0},routerTo:function(){n.navigateTo({url:"../infocheck/infocheck"})}}};o.default=t}).call(this,t("c11b")["default"])},"18a0":function(n,o,t){"use strict";t.r(o);var e=t("1145"),i=t.n(e);for(var u in e)"default"!==u&&function(n){t.d(o,n,(function(){return e[n]}))}(u);o["default"]=i.a},"435c":function(n,o,t){"use strict";t.r(o);var e=t("a19c"),i=t("18a0");for(var u in i)"default"!==u&&function(n){t.d(o,n,(function(){return i[n]}))}(u);var a,c=t("f0c5"),r=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);o["default"]=r.exports},a19c:function(n,o,t){"use strict";var e={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"ba98"))},uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,"8393"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"2189"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,"5771"))},uRow:function(){return t.e("uview-ui/components/u-row/u-row").then(t.bind(null,"2059"))},uCol:function(){return t.e("uview-ui/components/u-col/u-col").then(t.bind(null,"8f00"))},uLoading:function(){return t.e("uview-ui/components/u-loading/u-loading").then(t.bind(null,"73e3"))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,"1cea"))}},i=function(){var n=this,o=n.$createElement,t=(n._self._c,{color:"#888"}),e={color:"#888"},i={color:"#888"},u={color:"#888"},a={color:"#888"},c={color:"#888"},r={color:"#888"},l={color:"#888"},f={color:"#888"},s={color:"#888"};n._isMounted||(n.e0=function(o){n.showDialog=!1}),n.$mp.data=Object.assign({},{$root:{a0:t,a1:e,a2:i,a3:u,a4:a,a5:c,a6:r,a7:l,a8:f,a9:s}})},u=[];t.d(o,"b",(function(){return i})),t.d(o,"c",(function(){return u})),t.d(o,"a",(function(){return e}))},f28c:function(n,o,t){"use strict";(function(n){t("3323"),t("921b");e(t("66fd"));var o=e(t("435c"));function e(n){return n&&n.__esModule?n:{default:n}}n(o.default)}).call(this,t("c11b")["createPage"])}},[["f28c","common/runtime","common/vendor"]]]);