<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="section2" style="margin-top:0;padding:20px;">
		    <view class="artical_title" style="font-weight:600;">{{info.title}}</view>
		    <view class="clearfix">
		        <view class="messageBlock_time fl" style="font-size:14px;">{{info.addTime}}</view>
		        <text style="color:#FF8E00;font-size:14px;" class="fr" v-if="info.type">【{{info.type}}】</text>
		    </view>
		    <image v-if="type=='leader'" class="artical_img" :src="info.coverUrl?info.coverUrl:'/static/prevention.jpg'" />
		    <u-parse :html="info.content" style="color:#333;margin-top: 30px;line-height: 24px;"></u-parse>
		    <image v-if="type!=='leader'" class="artical_img" style="margin-top:15px;" :src="info.coverUrl?info.coverUrl:'/static/prevention.jpg'" />
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				id:null,
				info:{}
			}
		},
		onLoad:function(option){
			this.type = option.type;
			this.id = option.id
			if (this.type== 'notification') {
				this.getNotification();
			} else if (this.type == 'leader') {
				this.getLeader();
			}
		},
		methods: {
			getNotification: function () {
				var that = this;
				this.$request('app/zhsqnotice/info/'+that.id,JSON.stringify({})).then(res=>{
					if(res.code==0){			
						that.info = res.zhsqNotice;
						that.info.type = that.info.type == '正常' ? '' : that.info.type;
					}
				})
			},
			getLeader: function () {
				var that = this;
				this.$request('app/wyworkguide/info/'+that.id,JSON.stringify({})).then(res=>{
					if(res.code==0){			
						that.info = {
							coverUrl: res.data.image,
							content: res.data.text,
							addTime: res.data.createDate,
							title: res.data.title
						};
					}
				})
			},
			routerTo:function(){
				if(this.type==='leader'){
					uni.navigateTo({
						url:'../leader/leader'
					})
				}else{
					uni.navigateBack({
					    delta: 1
					});
				}
			}
		}
	}
</script>

<style>

</style>
