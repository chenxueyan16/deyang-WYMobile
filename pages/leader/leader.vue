<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="办事指南" :border-bottom="false" :custom-back="routerTo"></u-navbar>
	    <u-empty v-if="list.length==0" style="margin-top:30px;" text="暂无数据～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view class="leaderBlock" v-for="(item,index) in list" :key="index" @click="detailTo(item)">
			<image :src="item.image?item.image:'/static/prevention.jpg'" />
			<view class="leaderBlock_article">
				<view>{{item.title}}</view>
				<view>{{item.createDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(){ 
			this.getList()
		},
		methods: {
			getList: function () {
				var that = this;
				this.$request('app/wyworkguide/list',JSON.stringify({ isRelease: '1', limit: 999 })).then(res=>{
					if(res.code==0){			
						that.list = res.data.list;
					}
				})
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../notification_detail/notification_detail?id=' + item.id + '&type=leader'
				});
			},
			routerTo:function(){
				uni.reLaunch({
					url: '../home/home'
				})
			}
		}
	}
</script>

<style>

</style>
