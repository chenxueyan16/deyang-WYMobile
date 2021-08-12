;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["uview-ui/components/u-td/u-td"],{"2ee5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-td",props:{width:{type:[Number,String],default:"auto"}},inject:["uTable"],computed:{tdStyle:function(){var t={};return"auto"!=this.width&&(t.flex="0 0 ".concat(this.width)),t.textAlign=this.uTable.align,t.fontSize=this.uTable.fontSize+"rpx",t.padding=this.uTable.padding,t.borderBottom="solid 1px ".concat(this.uTable.borderColor),t.borderRight="solid 1px ".concat(this.uTable.borderColor),t.color=this.uTable.color,t}}};e.default=u},"6a64":function(t,e,n){"use strict";n.r(e);var u=n("84ed"),o=n("9ccf");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("7d69");var i,a=n("f0c5"),c=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,"46e23cca",null,!1,u["a"],i);e["default"]=c.exports},"7d69":function(t,e,n){"use strict";var u=n("b65e"),o=n.n(u);o.a},"84ed":function(t,e,n){"use strict";var u,o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.tdStyle]));t.$mp.data=Object.assign({},{$root:{s0:n}})},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}))},"9ccf":function(t,e,n){"use strict";n.r(e);var u=n("2ee5"),o=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=o.a},b65e:function(t,e,n){}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'uview-ui/components/u-td/u-td-create-component',
    {
        'uview-ui/components/u-td/u-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("6a64"))
        })
    },
    [['uview-ui/components/u-td/u-td-create-component']]
]);
