(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-col/u-col"],{1185:function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement,n=(t._self._c,Number(t.gutter));t.$mp.data=Object.assign({},{$root:{m0:n}})},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}))},"28e0":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-col",props:{span:{type:[Number,String],default:12},offset:{type:[Number,String],default:0},justify:{type:String,default:"start"},align:{type:String,default:"center"},textAlign:{type:String,default:"left"}},inject:["gutter"],computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(){this.$emit("click")}}};e.default=u},"8f00":function(t,e,n){"use strict";n.r(e);var u=n("1185"),i=n("b552");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("c038");var f,c=n("f0c5"),s=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],f);e["default"]=s.exports},b552:function(t,e,n){"use strict";n.r(e);var u=n("28e0"),i=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=i.a},c038:function(t,e,n){"use strict";var u=n("ec9e"),i=n.n(u);i.a},ec9e:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-col/u-col-create-component',
    {
        'uview-ui/components/u-col/u-col-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8f00"))
        })
    },
    [['uview-ui/components/u-col/u-col-create-component']]
]);
