<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="车辆管理" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<view class="vehicleBlock clearfix" style="background:#E9F0FF;" @click="switchTo('vehicle')">
				<view class="fl" style="margin-left:20px;margin-top:25px;">
				  <view style="font-size:16px;color:#333;font-weight:500;">机动车登记</view>
				  <view style="font-size:14px;color:#888;margin-top:6px;">机动车辆相关信息采集</view>
				</view>
				<image class="fr" src="/static/img_vehicle.png" style="width:150px;height:100px;" />
			</view>
			<view class="vehicleBlock clearfix" style="background:#DEFBF9;" @click="switchTo('nonvehicle')">
				<view class="fl" style="margin-left:20px;margin-top:25px;">
				  <view style="font-size:16px;color:#333;font-weight:500;">非机动车登记</view>
				  <view style="font-size:14px;color:#888;margin-top:6px;">非机动车RFID信息采集</view>
				</view>
				<image class="fr" src="/static/img_nonvehicle.png" style="width:150px;height:100px;" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deptName:'左岸春天'
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
		},
		methods: {
			switchTo: function (type) {
				uni.navigateTo({
					url: '../vehicle_list/vehicle_list?type=' + type
				});
			},
		}
	}
</script>

<style>
.vehicleBlock {
  margin: 10px 20px;
  height: 100px;
  border-radius: 5px;
}
</style>
