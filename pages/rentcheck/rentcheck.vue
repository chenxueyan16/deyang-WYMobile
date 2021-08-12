<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="租房审核" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
		</view>
		<view v-if="current===0">
			<u-empty v-if="waitList.length==0" text="没有需要审核的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="waitList.length>0" class="infoBlock" v-for="(item,index) in waitList" :key="index">
				<view class="clearfix" @click="detailTo(item)">
					<view class="infoBlock_text fl">
					  <view style="font-weight:600;margin-bottom: 10px;">{{item.roomName}}</view>
					  <view class="infoBlock_text-item">
						<text>租金：</text>
						<text>{{item.rent}}元/月</text>
					  </view>
					  <view class="infoBlock_text-item">
						<text>发布人：</text>
						<text>{{item.pubName}}</text>
					  </view>
					  <view class="infoBlock_text-item" style="margin-bottom: 0;">
						<text>发布时间：</text>
						<text>{{item.addTime}}</text>
					  </view>
					</view>
					<image class="fr infoBlock_img" src="/static/wait_check.png" />
				</view>
				<view class="infoBlock_btn clearfix">
					<view class="fr purebtn btnConfirm" @click="passHandle(item)">通过</view>
					<view class="fl purebtn btnDeny" @click="denyHandle(item)">拒绝</view>
				</view>
			</view>
		</view>
		<view v-if="current===1">
			<u-empty v-if="dealList.length==0" text="没有已审核的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="dealList.length>0" class="infoBlock" v-for="(item,index) in dealList" :key="index">
				<view class="clearfix" @click="detailTo(item)">
					<view class="infoBlock_text fl">
					  <view style="font-weight:600;margin-bottom: 10px;">{{item.roomName}}</view>
					  <view class="infoBlock_text-item">
						<text>租金：</text>
						<text>{{item.rent}}元/月</text>
					  </view>
					  <view class="infoBlock_text-item">
						<text>发布人：</text>
						<text>{{item.pubName}}</text>
					  </view>
					  <view class="infoBlock_text-item" style="margin-bottom: 0;">
						<text>发布时间：</text>
						<text>{{item.addTime}}</text>
					  </view>
					</view>
					<image v-if="item.status=='2'" class="fr infoBlock_img" src="/static/check.png" />
					<image v-if="item.status=='3'" class="fr infoBlock_img" src="/static/deny_check.png" />
				</view>
			</view>
		</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">{{dialogText}}</view>
			<view class="clearfix dialogBlock_btnGroup">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="showDialog=false">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="vertifyHandle(currentId, dialogText=='是否拒绝申请？'?3:2)">确定</view>
			</view>
		</u-popup>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				deptName: '',
				current: 0,
				showDialog:false,
				dialogText:'',
				currentId:null,
				waitList: [],
				dealList: [],
				list: [{
					name: '待审核'
				}, {
					name: '已审核'
				}],
				showLoading: false,
			}
		},
		onLoad(){
			try {
			    this.deptName = uni.getStorageSync('deptName');
			} catch (e) {
			    // error
			}
			this.getList();
		},
		methods: {
			change:function(index) {
				this.current = index;
			},
			getList: function () {
				var that = this;
				this.$request('app/wylease/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.waitList = res.data;
						that.waitList.map(function (item) {
							var index = item.roomName.indexOf('-')
							item.roomName = item.roomName.substring(index + 1, item.roomName.length)
						})
					}
				})
				this.$request('app/wylease/list/approve',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.dealList = res.data;
						that.dealList.map(function (item) {
							var index = item.roomName.indexOf('-')
							item.roomName = item.roomName.substring(index + 1, item.roomName.length)
						})
					}
				})
			},
			denyHandle: function (item) {
				this.showDialog=true
				this.dialogText='是否拒绝申请？'
				this.currentId=item.id
			},
			passHandle: function (item) {
				this.showDialog=true
				this.dialogText='是否通过申请？'
				this.currentId=item.id
			},
			vertifyHandle: function (id, status) {
				var that = this;
				that.showDialog = false
				that.showLoading = true
				this.$request('app/wylease/update',JSON.stringify({ id: id, status: status })).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						})
						that.getList();
					}
				})
			},
			detailTo: function (item) {
				uni.navigateTo({
					url: '../rentcheck_detail/rentcheck_detail?id=' + item.id
				});
			},
			routerTo:function(){
				uni.reLaunch({
				    url: '../home/home'
				});
			}
		}
	}
</script>

<style>
.infoBlock_img {
  height: 20px;
  width: 55px;
  transform: translateX(20px);
}
</style>
