;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["uview-ui/components/u-count-down/u-count-down"],{"4ded":function(t,e,o){"use strict";var r=o("95ff"),n=o.n(r);n.a},5664:function(t,e,o){"use strict";o.r(e);var r=o("701d6"),n=o("669f");for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);o("4ded");var s,a=o("f0c5"),u=Object(a["a"])(n["default"],r["b"],r["c"],!1,null,"eca684e0",null,!1,r["a"],s);e["default"]=u.exports},"669f":function(t,e,o){"use strict";o.r(e);var r=o("f120"),n=o.n(r);for(var i in r)"default"!==i&&function(t){o.d(e,t,(function(){return r[t]}))}(i);e["default"]=n.a},"701d6":function(t,e,o){"use strict";var r,n=function(){var t=this,e=t.$createElement,o=(t._self._c,t.__get_style([t.itemStyle])),r=t.__get_style([t.letterStyle]),n=t.__get_style([t.itemStyle]),i=t.__get_style([t.itemStyle]),s=t.__get_style([t.itemStyle]);t.$mp.data=Object.assign({},{$root:{s0:o,s1:r,s2:n,s3:i,s4:s}})},i=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return r}))},"95ff":function(t,e,o){},f120:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"u-count-down",props:{timestamp:{type:[Number,String],default:0},autoplay:{type:Boolean,default:!0},separator:{type:String,default:"colon"},separatorSize:{type:[Number,String],default:30},separatorColor:{type:String,default:"#303133"},color:{type:String,default:"#303133"},fontSize:{type:[Number,String],default:30},bgColor:{type:String,default:"#fff"},height:{type:[Number,String],default:"auto"},showBorder:{type:Boolean,default:!1},borderColor:{type:String,default:"#303133"},showSeconds:{type:Boolean,default:!0},showMinutes:{type:Boolean,default:!0},showHours:{type:Boolean,default:!0},showDays:{type:Boolean,default:!0},hideZeroDay:{type:Boolean,default:!1}},watch:{timestamp:function(t,e){clearInterval(this.timer),this.start()}},data:function(){return{d:"00",h:"00",i:"00",s:"00",timer:null,seconds:0}},computed:{itemStyle:function(){var t={};return this.height&&(t.height=this.height+"rpx",t.width=this.height+"rpx"),this.showBorder&&(t.borderStyle="solid",t.borderColor=this.borderColor,t.borderWidth="1px"),this.bgColor&&(t.backgroundColor=this.bgColor),t},letterStyle:function(){var t={};return this.fontSize&&(t.fontSize=this.fontSize+"rpx"),this.color&&(t.color=this.color),t}},mounted:function(){this.autoplay&&this.timestamp&&this.start()},methods:{start:function(){var t=this;this.timestamp<=0||(this.seconds=Number(this.timestamp),this.formatTime(this.seconds),this.timer=setInterval((function(){if(t.seconds--,t.$emit("change",t.seconds),t.seconds<0)return t.end();t.formatTime(t.seconds)}),1e3))},formatTime:function(t){t<=0&&this.end();var e=0,o=0,r=0,n=0;e=Math.floor(t/86400),o=Math.floor(t/3600)-24*e;var i=null;i=this.showDays?o:Math.floor(t/3600),r=Math.floor(t/60)-60*o-24*e*60,n=Math.floor(t)-24*e*60*60-60*o*60-60*r,i=i<10?"0"+i:i,r=r<10?"0"+r:r,n=n<10?"0"+n:n,this.d=e,this.h=i,this.i=r,this.s=n},end:function(){clearInterval(this.timer),this.timer=null,this.$emit("end",{})}},beforeDestroy:function(){clearInterval(this.timer),this.timer=null}};e.default=r}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'uview-ui/components/u-count-down/u-count-down-create-component',
    {
        'uview-ui/components/u-count-down/u-count-down-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("5664"))
        })
    },
    [['uview-ui/components/u-count-down/u-count-down-create-component']]
]);
