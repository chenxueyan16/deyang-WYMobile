<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="工作人员" :border-bottom="false"></u-navbar>
		<view style="margin:8px 16px">
			<u-search placeholder="请输入搜索姓名或身份证号" v-model="value" shape="square" :show-action="false" style="" @search="searchHandle"></u-search>
		</view>
		<view style="font-size:15px;color:#295BFD;padding:8px 16px;" v-if="list.length>0&&show == false">{{menu}}</view>
		<!-- 列表模块 -->
		<u-empty v-if="list.length==0&&show == false" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="list.length>0&&show==false" v-for="(item,index) in list" :key="index">
			<u-cell-item :title="item.name" :arrow="(item.list!==undefined)&&(item.list!==[])&&item.list.length!==0" @click="toChildren(item)"></u-cell-item>
		</view>
		<!-- 搜索模块 -->
		<u-empty v-if="searchList.length==0&&show==true" text="暂无查询结果～" style="margin-top:30px;" src="/static/img_noresult.png" iconSize="160"></u-empty>
		<view v-if="searchList.length>0&&show==true" v-for="(item,index) in searchList" :key="index">
			<u-cell-item :title="item.name" :value="item.idNumber" @click="toChildren(item)"></u-cell-item>
		</view>
		
		<view v-if="edit==1" class="linerbtn btnActive" style="margin:0 auto;margin-top:50px;width:90%;height:40px;" @click="addHandle">
			<text>新增人员</text>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menu: '组织机构 ',
				list:[{
					name: "赏识在于角度的转换",
					list:[{}]
				},{
					name: "生活中不是缺少美，",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				},{
					name: "周围一些不起眼的",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
				searchList:[],
				value:'',
				show:false,
				edit: null,
				info:null,
				isManage:null,
				deptId:[]
			}
		},
		onLoad(option){
			this.edit = option.edit;//1从我的进入，0从报修进入
			this.info = option.info;
			this.isManage = option.isManage;
			this.getDept({ keyWord: this.value });
		},
		methods: {
			getDept: function (param) {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/wy/list',
				// type: 'POST',
				// data: JSON.stringify(param),
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	that.list = res.data;
				// 	that.list.map(function (item) {
				// 	  // 是否有下级工作人员
				// 	  if (item.userlist && item.userlist.length > 0) {
				// 		item.userlist.map(function (sitem) {
				// 		  // 下级工作人员标记
				// 		  sitem.isPerson = 1;
				// 		  // 下级工作人员及部门塞进同级
				// 		  item.list.push(sitem);
				// 		})
				// 	  }
				// 	})
				//   }
				// }
			 //  })
			},
			toChildren: function (item) {
				if (item.list !== undefined && item.list !== [] && item.list.length !== 0 && item.isPerson == undefined) {
					// 当前选中下级是部门，切部门列表有数据
					this.menu += '/ ' + item.name + ' ';
					this.deptId.push(item.deptId);
					this.list = item.list;
					this.list.map(function (item) {
						if (item.userlist && item.userlist.length > 0) {
							item.userlist.map(function (sitem) {
								if (item.list) {
									sitem.isPerson = 1;
									item.list.push(sitem);
								}
							})
						}
					})
				} else {
				    // 当前选中下级是人员
					if (this.edit == 0 && item.isPerson) {
						//报修进入 
						var str = this.deptId.join(",");
						uni.navigateTo({
						    url: '../service_detail/service_detail?employeeId='+item.id+'&info='+ this.info + '&isManage=' + this.isManage+'&deptId='+str
						});
					} else {
						// 工作人员进入
						if (!item.isPerson) {
							return false;
						}
						uni.navigateTo({
						    url: '../employee_detail/employee_detail?id='+item.id
						});
					}
				}
			},
			searchHandle:function(){
				if (this.value1) {
					// var that = this;
					// $.ajax({
					//   url: url + 'app/wy/search',
					//   type: 'POST',
					//   data: JSON.stringify({ keyWord: that.value1 }),
					//   success: function (res) {
					// 	deal(res);
					// 	if (res.code === 0) {
					// 	  that.show = true;
					// 	  that.searchList = res.data;
					// 	  that.searchList.map(function (item) {
					// 		item.isPerson = 1;
					// 		item.idNumber = item.idNumber.substr(0, 6) + '********' + item.idNumber.substr(14, 18);
					// 	  })
					// 	}
					//   },
					// })
				} else {
					this.show = false;
					this.getDept({ keyWord: null });
				}
			},
			addHandle: function () {
				uni.navigateTo({
				    url: '../employee_edit/employee_edit?id=0'
				});
			},	
		}
	}
</script>

<style>

</style>
