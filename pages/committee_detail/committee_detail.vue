<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="section2" style="margin-top:0;padding:20px;">
			<label class="artical_title" style="margin-bottom:22px;font-weight: 600;">{{list.title}}</label>
			<view>会议地点</view>
			<text>{{list.address}}</text>
			<view>会议时间</view>
			<text>{{list.meetingTime}}</text>
			<view>召集人数</view>
			<text>{{list.partNum}}</text>
			<view>参与表决人数</view>
			<text>{{list.partVoteNum}}</text>
			<view>表决同意人数</view>
			<text>{{list.agreeVoteNum}}</text>
			<view>会议内容</view>
			<u-parse :html="list.content" style="color:#333;line-height: 24px;"></u-parse>
	    </view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				list:{},
				id:null,			
			}
		},
		onLoad(option){
			this.id = option.id
			this.getdetail();
		},
		methods: {
			getdetail: function () {
				var that = this;
				this.$request('app/ownerscommittee/meeting/info',JSON.stringify({id:that.id})).then(res=>{
					if(res.code==0){
						that.list = res.data
						that.list.address = that.list.address?that.list.address:''
						that.list.meetingTime = that.list.meetingTime?that.list.meetingTime:''
					}
				})
			},
			routerTo:function(){
				uni.reLaunch({
				    url: '../committee/committee'
				});
			}
		}
	}
</script>

<style>
.section2>view {
  font-size: 15px;
  color: #888;
  margin-top: 24px;
  margin-bottom: 10px;
}
.section2>text {
  font-size: 15px;
  color: #333; 
}
</style>
