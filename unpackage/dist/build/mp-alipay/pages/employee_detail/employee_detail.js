(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/employee_detail/employee_detail"],{"1c54":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{info:{headPortraitUrl:"/static/pic_avator.png",name:"chen"},roleList:[{roleName:"diwe"}],deptList:[],id:null,showDialog:!1}},onLoad:function(n){this.id=n.id,this.getInfo()},methods:{getInfo:function(){},editHandle:function(){n.navigateTo({url:"../employee_edit/employee_edit?id="+this.id})},deleteHandle:function(){},routerTo:function(){n.navigateTo({url:"../employee/employee?edit=1"})}}};e.default=t}).call(this,t("c11b")["default"])},a9b3:function(n,e,t){"use strict";var u={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"ba98"))},uRow:function(){return t.e("uview-ui/components/u-row/u-row").then(t.bind(null,"2059"))},uCol:function(){return t.e("uview-ui/components/u-col/u-col").then(t.bind(null,"8f00"))},uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,"8393"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"2189"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,"5771"))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,"1cea"))}},o=function(){var n=this,e=n.$createElement,t=(n._self._c,{background:"transparent"}),u={color:"#888"},o={color:"#888"},i={color:"#888"},r={color:"#888"},a={color:"#888"};n._isMounted||(n.e0=function(e){n.showDialog=!0},n.e1=function(e){n.showDialog=!1}),n.$mp.data=Object.assign({},{$root:{a0:t,a1:u,a2:o,a3:i,a4:r,a5:a}})},i=[];t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return u}))},b763:function(n,e,t){"use strict";t.r(e);var u=t("a9b3"),o=t("c7ec");for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);t("bb2a");var r,a=t("f0c5"),c=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);e["default"]=c.exports},bb2a:function(n,e,t){"use strict";var u=t("d9a8"),o=t.n(u);o.a},c7ec:function(n,e,t){"use strict";t.r(e);var u=t("1c54"),o=t.n(u);for(var i in u)"default"!==i&&function(n){t.d(e,n,(function(){return u[n]}))}(i);e["default"]=o.a},d9a8:function(n,e,t){},f759:function(n,e,t){"use strict";(function(n){t("3323"),t("921b");u(t("66fd"));var e=u(t("b763"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("c11b")["createPage"])}},[["f759","common/runtime","common/vendor"]]]);