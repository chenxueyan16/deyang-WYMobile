;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["uview-ui/components/u-row/u-row"],{"0c0e":function(t,n,e){"use strict";e.r(n);var u=e("74d1"),i=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);n["default"]=i.a},2059:function(t,n,e){"use strict";e.r(n);var u=e("9191"),i=e("0c0e");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("f199");var f,s=e("f0c5"),c=Object(s["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],f);n["default"]=c.exports},"74d1":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"u-row",props:{gutter:{type:[String,Number],default:20},justify:{type:String,default:"start"},align:{type:String,default:"center"}},provide:function(){return{gutter:this.gutter}},computed:{uJustify:function(){return"end"==this.justify||"start"==this.justify?"flex-"+this.justify:"around"==this.justify||"between"==this.justify?"space-"+this.justify:this.justify},uAlignItem:function(){return"top"==this.align?"flex-start":"bottom"==this.align?"flex-end":this.align}},methods:{click:function(){this.$emit("click")}}};n.default=u},9191:function(t,n,e){"use strict";var u,i=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return u}))},a64e:function(t,n,e){},f199:function(t,n,e){"use strict";var u=e("a64e"),i=e.n(u);i.a}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'uview-ui/components/u-row/u-row-create-component',
    {
        'uview-ui/components/u-row/u-row-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("2059"))
        })
    },
    [['uview-ui/components/u-row/u-row-create-component']]
]);
