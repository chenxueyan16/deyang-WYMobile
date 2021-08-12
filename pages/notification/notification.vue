<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="通知公告" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="section1" style="border-bottom: 10px solid #f5f5f5;">
			<view class="topbar">
				<view @click="show=true" style="margin-top:24px;">
					<text class="bold_menu">{{deptName}}</text>
				</view>
			</view>
			<view style="margin:0 15px;">
				<u-swiper :list="images" interval="3000" height="300"></u-swiper>
			</view>
		</view>
		<u-empty v-if="list.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<u-card title="通知公告" v-if="list.length>0" sub-title="全部 >" sub-title-size="20" sub-title-color="#CDCDCD" padding="0" :border="false" :full="true" :head-border-bottom="false" :head-style="{'padding':'0 14px 14px 14px'}" :body-style="{'padding':'4px 14px 14px 14px'}" @head-click="listTo">
			<view slot="body">
				<view class="u-body-item u-flex u-border-bottom" v-for="(item,index) in list" :key="index" style="margin-bottom:18px;" @click="detailTo(item)">
					<view style="width:85%;">
						<view class="u-body-item-title u-line-2" style="color:#333333;">
							<text style="color:#FF8E00" v-if="item.type">【{{item.type}}】</text>
							{{item.title}}				
						</view>
						<view class="messageBlock_time">{{item.addTime}}</view>
					</view>
					<image :src="item.coverUrl?item.coverUrl:'/static/prevention.jpg'"></image>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				deptName:'',
				list:[],
				images:[]
			}
		},
		onLoad(){
			try {
			    this.deptName = uni.getStorageSync('deptName');
			} catch (e) {
			    // error
			} 	
			this.getPicture()
			this.getList({ limit: 5, type: null, isRelease: 1 });
		},
		methods: {
			getPicture: function () {
				var that = this;
				this.$request('app/guidedpicture/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						if(res.data.length>0){
							res.data.map(item=>{
								that.images.push({image:item})
							})
						}else{
							that.images = [{image:'/static/bj.jpg'}]
						}
					}
				})
			},
			getList: function (param) {
				var that = this;
				this.$request('app/zhsqnotice/listApp',JSON.stringify(param)).then(res=>{
					if(res.code==0){
						that.list = res.page.list;
						that.list.map(function (item) {
							if (item.type == '正常') {
								item.type = '';
							}
						})
					}
				})
			},
			listTo:function(){
				uni.navigateTo({
				    url: '../notification_list/notification_list'
				});
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../notification_detail/notification_detail?id=' + item.id + '&type=notification'
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
