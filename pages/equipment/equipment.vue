<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="设备信息" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<view style="margin:8px 16px">	
				<u-search placeholder="请输入设备搜索关键字" v-model="value" shape="square" :show-action="false" style="" @search="searchHandle"></u-search>
			</view>
		</view>
	    <u-empty v-if="list.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view class="equipmentBlock clearfix" v-if="list.length>0" v-for="(item,index) in list" :key="index">
			<view class="fl equipmentBlock_item">
				<view>{{item.name}}</view>
				<view>{{item.message}}</view>
			</view>
			<u-button type="primary" class="fr" size="mini" @click="viewHandle(item,index)">查看状态</u-button>
			<view class="fl" style="color:#888;width:100%;">{{item.code}}</view>
			<view class="fl" style="color:#FF4F4D;width:100%;margin-top:2px;">{{item.warn}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deptName:'左岸春天',
				list:[{
					name:'123'
				}],
				value:''
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
			this.getList();
		},
		methods: {
			getList: function () {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/device/getDeviceListByDeptId',
				// type: 'POST',
				// data: JSON.stringify({ name: that.value1 }),
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0) {
				// 	that.list = res.page.list;
				//   }
				// }
			 //  })
			},
			searchHandle: function () {
				this.getList();
			},
			viewHandle: function (item, index) {
				var that = this;
			 //  $.ajax({
				// url: url + 'app/device/getDeviceStatus',
				// type: 'POST',
				// data: JSON.stringify({ deviceName: item.deviceName, productKey: item.productKey }),
				// success: function (res) {
				//   if (res.code == 200) {
				// 	that.list[index].message = "人脸信息：" + res.data.faceInfoList.length;
				// 	that.list[index].code = '————设备在线-------------------' + res.id;
				// 	that.list[index].warn = '';
				//   } else {
				// 	that.list[index].code = '';
				// 	that.list[index].message = '';
				// 	that.list[index].warn = '***设备异常******' + res.id + '******message：' + res.message;
				//   }
				// }
			 //  })
			},
		}
	}
</script>

<style>
.equipmentBlock{
  margin:10px 20px;
  background: #fff;
  padding:15px;
  border-radius:4px;
}
.equipmentBlock_item>view:first-child{
  color:#333;
  font-size: 15px;
  font-weight: bold;
}
.equipmentBlock_item>view:last-child{
  margin-top: 5px;
  color:#888;
  font-size: 12px;
}
</style>
