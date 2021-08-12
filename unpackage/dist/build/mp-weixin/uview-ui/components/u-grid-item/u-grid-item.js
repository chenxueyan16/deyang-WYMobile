(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-grid-item/u-grid-item"],{"24f4":function(t,e,n){"use strict";n.r(e);var i=n("bcda"),r=n("cfe9");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("3365");var c,o=n("f0c5"),f=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"83347bea",null,!1,i["a"],c);e["default"]=f.exports},3365:function(t,e,n){"use strict";var i=n("b869"),r=n.n(i);r.a},b869:function(t,e,n){},bcda:function(t,e,n){"use strict";var i,r=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}))},cfe9:function(t,e,n){"use strict";n.r(e);var i=n("fe3c"),r=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},fe3c:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-grid-item",props:{bgColor:{type:String,default:"#ffffff"},index:{type:[Number,String],default:""}},inject:["uGrid"],data:function(){return{hoverClass:""}},created:function(){this.hoverClass=this.uGrid.hoverClass},computed:{colNum:function(){return this.col<2?2:this.col>12?12:this.col},width:function(){return 100/Number(this.uGrid.col)+"%"},showBorder:function(){return this.uGrid.border}},methods:{click:function(){this.$emit("click",this.index),this.uGrid.click(this.index)}}};e.default=i}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-grid-item/u-grid-item-create-component',
    {
        'uview-ui/components/u-grid-item/u-grid-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("24f4"))
        })
    },
    [['uview-ui/components/u-grid-item/u-grid-item-create-component']]
]);
