(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/leader/leader"],{"40f2":function(t,n,e){"use strict";e.r(n);var u=e("6c72"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a},"6c08":function(t,n,e){"use strict";e.r(n);var u=e("a1e7"),i=e("40f2");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);var r,o=e("f0c5"),c=Object(o["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=c.exports},"6c72":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;e("31af");var u={data:function(){return{list:[]}},onLoad:function(){this.getList()},methods:{getList:function(){var t=this;this.$request("app/wyworkguide/list",JSON.stringify({isRelease:"1",limit:999})).then((function(n){0==n.code&&(t.list=n.data.list)}))},detailTo:function(n){t.navigateTo({url:"../notification_detail/notification_detail?id="+n.id+"&type=leader"})},routerTo:function(){t.reLaunch({url:"../home/home"})}}};n.default=u}).call(this,e("c11b")["default"])},a1e7:function(t,n,e){"use strict";var u={uNavbar:function(){return e.e("uview-ui/components/u-navbar/u-navbar").then(e.bind(null,"ba98"))},uEmpty:function(){return e.e("uview-ui/components/u-empty/u-empty").then(e.bind(null,"d406"))}},i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},f743:function(t,n,e){"use strict";(function(t){e("3323"),e("921b");u(e("66fd"));var n=u(e("6c08"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("c11b")["createPage"])}},[["f743","common/runtime","common/vendor"]]]);