(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"1d3a":function(e,t,n){"use strict";n.r(t);var i=n("2562"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},2562:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("31af");var i={data:function(){return{isLogin:!1,show:!1,option:[],images:[],messageList:[],deptName:"",deptId:null,navList1:[{icon:"/static/icon-infoselect.png",name1:"信息采集",haveMessage:!1,path:"./infoselect.html",name2:"infoselect",flag:1},{icon:"/static/icon-infocheck.png",name1:"信息审核",haveMessage:!1,path:"./infocheck.html",name2:"infocheck",flag:2},{icon:"/static/icon-prevention.png",name1:"群防群治",haveMessage:!1,path:"./prevention.html",name2:"prevention",flag:3},{icon:"/static/icon-notification.png",name1:"通知公告",haveMessage:!1,path:"./notification.html",name2:"notification",flag:4},{icon:"/static/icon-committee.png",name1:"业主委员会",haveMessage:!1,path:"./committee.html",name2:"committee",flag:7},{icon:"/static/icon-complaint.png",name1:"投诉处理",haveMessage:!1,path:"./complaint.html",name2:"complaint",flag:6},{icon:"/static/icon-service.png",name1:"服务报修",haveMessage:!1,path:"./service.html",name2:"service",flag:5},{icon:"/static/icon-vote.png",name1:"投票活动",haveMessage:!1,path:"./vote.html",name2:"vote",flag:14}],navList2:[{icon:"/static/icon-scheduling.png",name1:"工作排班",haveMessage:!1,path:"./scheduling.html",name2:"scheduling",flag:9},{icon:"/static/icon-parking.png",name1:"停车管理",haveMessage:!1,path:"./parking.html",name2:"parking",flag:10},{icon:"/static/icon-rentcheck.png",name1:"租房审核",haveMessage:!1,path:"./rentcheck.html",name2:"rentcheck",flag:11}]}},onLoad:function(){try{var t=e.getStorageSync("userInfo");this.isLogin=!!t,this.isLogin&&(this.getDept(),this.getPicture())}catch(n){}},methods:{getPicture:function(){var e=this;this.$request("app/guidedpicture/list",JSON.stringify({})).then((function(t){0==t.code&&(t.data.length>0?t.data.map((function(t){e.images.push({image:t})})):e.images=[{image:"/static/bj.jpg"}])}))},getDept:function(){var t=this;this.$request("app/wy/listcommunity").then((function(n){if(0==n.code){var i,a;t.option=n.data,t.option.map((function(e){e.text=e.name,e.id=e.deptId}));try{i=Number(e.getStorageSync("deptId")),a=e.getStorageSync("deptName"),i&&a?(t.deptName=a,t.deptId=i):(t.deptId=t.option[0].id,t.deptName=t.option[0].text,t.changeCommunity())}catch(o){}}}))},changeCommunity:function(t){null!==t&&(this.deptName=this.option[t].text,this.deptId=this.option[t].id);var n=this;this.$request("app/zhsquser/aliAuth/switch/dept",JSON.stringify({deptId:n.deptId})).then((function(t){if(0==t.code)try{e.setStorageSync("deptId",JSON.stringify(n.deptId)),e.setStorageSync("deptName",n.deptName)}catch(i){}}))},routerTo:function(t){var n=this;this.$request("app/zhsquser/isPermission",JSON.stringify({flag:t.flag,communityId:n.deptId})).then((function(i){0==i.code?e.navigateTo({url:"../"+t.name2+"/"+t.name2}):n.$refs.uToast.show({title:i.msg,type:"error"})}))},leaderTo:function(){e.navigateTo({url:"../leader/leader"})}}};t.default=i}).call(this,n("543d")["default"])},9529:function(e,t,n){"use strict";n.r(t);var i=n("df96"),a=n("1d3a");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);var c,u=n("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);t["default"]=s.exports},df96:function(e,t,n){"use strict";var i={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"1d05"))},uActionSheet:function(){return n.e("uview-ui/components/u-action-sheet/u-action-sheet").then(n.bind(null,"486a"))},uSwiper:function(){return n.e("uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"eb17"))},uGrid:function(){return n.e("uview-ui/components/u-grid/u-grid").then(n.bind(null,"b39e"))},uGridItem:function(){return n.e("uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"24f4"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"4d52"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"f7c3"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.show=!0})},o=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}))},e476:function(e,t,n){"use strict";(function(e){n("3323"),n("921b");i(n("66fd"));var t=i(n("9529"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["e476","common/runtime","common/vendor"]]]);