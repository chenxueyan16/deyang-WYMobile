<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="投票活动" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<u-empty v-if="list.length==0" style="margin-top:30px;" text="暂无数据～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view class="leaderBlock" v-for="(item,index) in list" :key="index" @click="detailTo(item)">
		    <view class="voteImg" style="height:145px;background-size: 100% 145px;" :style="{backgroundImage:'url(' + item.image + ')'}">
		        <view>
					<view class="clearfix" style="color:#fff;font-size:14px;">
						<image class="fl" src="/static/icon_timer.png" style="width:16px;height:16px;margin-right: 4px;padding-top:6px;"/>
						<text class="fl" style="line-height: 30px;" v-if="item.state=='1'">投票活动已结束~</text>
						<view class="fl" v-if="item.state!=='1'" style="line-height: 30px;">
							<text style="margin-right:4px;">距投票结束还有</text>
							<u-count-down :timestamp="item.time" separator="zh" bg-color="transparent" color="#fff" separator-color="#fff"></u-count-down>
						</view>
					</view>
		        </view>
		    </view>
		    <view class="leaderBlock_article">
		        <view>{{item.title}}</view>
		        <view>{{item.starTime2}} ~ {{item.endTime2}}</view>
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
				this.$request('app/wyvote/list',JSON.stringify({}),'GET').then(res=>{
					if(res.code==0){
						that.list = res.data.list;
						that.list.forEach(function (item) {
							item.starTime2 = item.starTime.substring(0, 10);
							item.endTime2 = item.endTime.substring(0, 10);
							if (item.state !== '1') {
								var NowTime = new Date();   // 当前时间
								var EndTime = item.endTime; //截止时间
								EndTime = EndTime.replace(/-/g, ':').replace(' ', ':');
								EndTime = EndTime.split(':');
								var EndTime1 = new Date(EndTime[0], (EndTime[1] - 1), EndTime[2], EndTime[3], EndTime[4], EndTime[5]);
								item.time = (EndTime1 - NowTime.getTime())/1000;
							}
							item.image = item.image ? item.image : '/static/img_vote.png';
						})
					}
				})
			},
			detailTo:function(item){
				uni.navigateTo({
				    url: '../vote_detail/vote_detail?id=' + item.id
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
