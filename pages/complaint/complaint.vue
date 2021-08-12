<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="投诉处理" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<view class="dropDown">
				<view class="fl dropDown_item" @click="showStatus=true">
					<text style="margin-right: 10px;">{{status.text}}</text>
					<u-icon size="10px" color="#41424F" name="arrow-down-fill"></u-icon>
				</view>
				<view class="fl dropDown_item" @click="showType=true">
					<text style="margin-right: 10px;">{{type.text}}</text>
					<u-icon size="10px" color="#41424F" name="arrow-down-fill"></u-icon>
				</view>
			</view>
			<u-action-sheet :list="option1" v-model="showStatus" :cancel-btn="false" @click="changeStatus"></u-action-sheet>
			<u-action-sheet :list="option2" v-model="showType" :cancel-btn="false" @click="changeType"></u-action-sheet>
		</view>
		<u-empty v-if="list.length==0" style="margin-top:30px;" text="没有需要处理的信息～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="list.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in list" :key="index">
		    <view class="clearfix" style="width:100%;" @click="detailTo(item)">
		        <view class="infoBlock_text">
					<view class="clearfix infoBlock_text-item" style="width:100%;">
						<text>提交时间：</text>
						<text>{{item.createDate}}</text>
						<image v-if="item.state=='1'" class="fr infoBlock_img" src="/static/deal.png" />
						<image v-if="item.state=='0'" class="fr infoBlock_img" src="/static/wait_deal.png" />
					</view>
					<view class="infoBlock_text-item">
						<text>提交人：</text>
						<text class="overLong">{{item.userName}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>类型：</text>
						<text>{{item.type}}</text>
					</view>
		        </view>
		    </view>
		    <view class="overLong" style="width: 100%;padding-right: 15px;">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				deptName:'',
				showStatus:false,
				showType:false,
				status:{id:null,text:'全部状态'},
				type:{text: '全部类型', value: null},
				option1:[
					{value:null,text:'全部状态'},
					{value:'0',text:'待处理'},
					{value:'1',text:'已处理'},
				],
				option2:[
					{text: '全部类型', value: null}, 
					{text: '环境', value: '1'}, 
					{text: '安全', value: '2'}, 
					{text: '秩序', value: '3'}, 
					{text: '工作人员', value: '4'}, 
					{text: '设施设备', value: '5'}, 
					{text: '其他', value: '6'}
				],
				list:[],		
			}
		},
		onLoad(){
			try {
			    this.deptName = uni.getStorageSync('deptName');
			} catch (e) {
			    // error
			}
			this.getList({ state: '', type: '', limit: 999 });
		},
		methods: {
			getList: function (param) {
			    var that = this;
				this.$request('app/zhsqcomplaints/getdeptList',JSON.stringify(param)).then(res=>{
					if(res.code==0){
						that.list = res.data.list;
						that.list.map(function (item) {
							switch (item.type) {
								case '1': item.type = '环境';
									break;
								case '2': item.type = '安全';
									break;
								case '3': item.type = '秩序';
									break;
								case '4': item.type = '工作人员';
									break;
								case '5': item.type = '设备设施';
									break;
								case '6': item.type = '其他';
									break;
							}
						})
					}
				})
			},
			changeStatus:function(index){	
				this.status = this.option1[index];
				var param = {
					isPolice: 0, 
					type: this.type.value,
					state: this.status.value, 
					limit: 999
				}
				this.getList(param);
			},
			changeType:function(index){
				this.type = this.option2[index];
				var param = {
					isPolice: 0, 
					type: this.type.value,
					state: this.status.value, 
					limit: 999
				}
				this.getList(param);
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../complaint_detail/complaint_detail?id=' + item.id
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
</style>
