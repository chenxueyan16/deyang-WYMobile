(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/myself/myself"],{"31f2":function(t,n,e){"use strict";var i={uNavbar:function(){return e.e("uview-ui/components/u-navbar/u-navbar").then(e.bind(null,"ba98"))},uForm:function(){return e.e("uview-ui/components/u-form/u-form").then(e.bind(null,"8393"))},uFormItem:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-form-item/u-form-item")]).then(e.bind(null,"2189"))},uInput:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-input/u-input")]).then(e.bind(null,"5771"))},uUpload:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-upload/u-upload")]).then(e.bind(null,"c32e"))},uSelect:function(){return e.e("uview-ui/components/u-select/u-select").then(e.bind(null,"8a06"))},uLoading:function(){return e.e("uview-ui/components/u-loading/u-loading").then(e.bind(null,"73e3"))},uToast:function(){return e.e("uview-ui/components/u-toast/u-toast").then(e.bind(null,"f7c3"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,{color:"#888"}),i={color:"#888"},o={color:"#888"},u={color:"#888"},r={color:"#888"};t._isMounted||(t.e0=function(n){t.showCard=!0},t.e1=function(n){t.showNation=!0}),t.$mp.data=Object.assign({},{$root:{a0:e,a1:i,a2:o,a3:u,a4:r}})},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}))},"3c92":function(t,n,e){"use strict";e.r(n);var i=e("f327"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},"5a5b":function(t,n,e){"use strict";(function(t){e("3323"),e("921b");i(e("66fd"));var n=i(e("9864"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("c11b")["createPage"])},9864:function(t,n,e){"use strict";e.r(n);var i=e("31f2"),o=e("3c92");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);var r,a=e("f0c5"),s=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);n["default"]=s.exports},f327:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("31af"),o={data:function(){return{submitForm:{documentType:"身份证",idNumber:"",nationName:"汉族",nationId:1,mobile:"123",name:"",headPortraitUrl:""},action:i.url+"images/photoupload",fileList:[],showCard:!1,showNation:!1,showLoading:!1,cardList:[{value:0,label:"身份证"},{value:1,label:"港澳通行证"},{value:2,label:"护照"}],nationList:[],canSubmit:!1}},onLoad:function(){try{var n=t.getStorageSync("userInfo");this.getInfo(JSON.parse(n).user.id)}catch(e){}this.getNations()},methods:{getInfo:function(t){var n=this;this.$request("app/zhsquser/info/"+t,JSON.stringify({})).then((function(t){0==t.code&&(n.submitForm=t.zhsqUser,n.submitForm.idNumber=18==n.submitForm.idNumber.length?n.submitForm.idNumber:"",n.submitForm.headPortraitUrl?n.fileList.push({url:n.submitForm.headPortraitUrl}):n.fileList.push({url:"/static/pic_empty.png"}),n.changeValue())}))},getNations:function(){var t=this;this.$request("mp/mpcommonnation/list",JSON.stringify({limit:60})).then((function(n){0==n.code&&(t.nationList=n.page.list,t.nationList.map((function(t){t.label=t.nation,t.value=t.id})))}))},confirmCard:function(t){this.submitForm.documentType=t[0].label,this.showCard=!1},confirmNation:function(t){this.submitForm.nationName=t[0].label,this.submitForm.nationId=t[0].value,this.showNation=!1},successHandle:function(t,n,e,i){this.submitForm.headPortraitUrl=t,this.changeValue()},removeHandle:function(t,n,e){this.submitForm.headPortraitUrl="",this.changeValue()},errorHandle:function(t,n,e,i){this.$refs.uToast.show({title:"上传失败",type:"error"})},changeValue:function(){""!==this.submitForm.name&&""!==this.submitForm.idNumber&&""!==this.submitForm.mobile&&""!==this.submitForm.headPortraitUrl?this.canSubmit=!0:this.canSubmit=!1},saveHandle:function(){if(!this.canSubmit)return!1;var t=/^1(3|4|5|7|8|9)\d{9}$/,n=/^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9Xx]$/;if(!t.test(this.submitForm.mobile))return this.$refs.uToast.show({title:"手机号格式错误",type:"warning"}),!1;if("身份证"==this.submitForm.documentType&&(!n.test(this.submitForm.idNumber)||18!==this.submitForm.idNumber.length))return this.$refs.uToast.show({title:"身份证格式错误",type:"warning"}),!1;var e=this;e.submitForm.isManage=1==e.submitForm.isManage?1:0,e.showLoading=!0,this.$request("app/zhsquser/update",JSON.stringify(e.submitForm)).then((function(t){0==t.code?(e.showLoading=!1,e.$refs.uToast.show({title:"操作成功",type:"success"}),setTimeout((function(){e.routerTo()}),1e3)):(e.showLoading=!1,e.$refs.uToast.show({title:t.msg,type:"error"}))}))},toDetail:function(){t.navigateTo({url:"../phone/phone"})},routerTo:function(){t.reLaunch({url:"../mine/mine"})}}};n.default=o}).call(this,e("c11b")["default"])}},[["5a5b","common/runtime","common/vendor"]]]);