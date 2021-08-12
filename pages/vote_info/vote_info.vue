<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" title="详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<text class="voteNumberBlock_item-number">{{info.number}}号</text>
		<view class="section2" style="margin-top:30px;padding-top:20px;">
			<view class="prevent_img clearfix" :style="{backgroundImage:'url(' + info.coverUrl + ')'}"></view>
		</view>
		<view class="vote_main_box">
			<text>{{info.title}}</text>
			<text>{{info.voteCount}}票</text>
		</view>
		<view class="formStyle">		
			<view class="remarks">
				<u-form-item :border-bottom="false">
					<u-input type="textarea" :height="20" :auto-height="true" v-model="info.content" disabled/>
				</u-form-item>
			</view>
		</view>
		<view style="margin:0px 16px;position:fixed;bottom:20px;width:90%;">
			<view class="linerbtn btnActive" v-if="info.state!== '1'&&info.uservoteCount==0" style="height:30px;line-height:30px;width:100%;"
			 size="small" @click="voteHandle">投TA一票</view>
			<view class="linerbtn btnNormal" v-if="info.state!== '1'&&info.uservoteCount>0" style="height:30px;line-height:30px;width:100%;"
			 size="small">已投</view>
			<view class="linerbtn btnNormal" v-if="info.state== '1'" style="height:30px;line-height:30px;width:100%;" size="small">已结束</view>
		</view>
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
				info:{},
				showLoading:false,
				id:null,
				voteId:null,
				state:null
			}
		},
		onLoad(option){
			this.id = option.id
			this.voteId = option.voteId
			this.state = option.state
			this.getInfo()
		},
		methods: {
			getInfo:function(){
				var that = this;
				this.$request('app/wypartvote/info/'+that.voteId,JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.info = res.wyPartVote;
						that.info.state = that.state;
					}
				})
			},
			voteHandle: function () {
				var that = this;
				that.showLoading = true;
				this.$request('app/uservote/save',JSON.stringify({partVoteId: that.info.id,})).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						})
						setTimeout(function () {
							that.routerTo()
						}, 1000)	
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
						that.showLoading = false;
					}
				})
			},
			routerTo:function(){
				uni.navigateTo({
					url:'../vote_detail/vote_detail?id='+this.id
				})
			}
		}
	}
</script>

<style>
.voteNumberBlock_item-number {
	width: 45px;
	height: 25px;
	background: -webkit-linear-gradient(left, #3558FF, #B65CFF);
	/* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(left, #3558FF, #B65CFF);
	/* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(left, #3558FF, #B65CFF);
	/* Firefox 3.6 - 15 */
	background: linear-gradient(left, #3558FF, #B65CFF);
	/* 标准的语法 */
	border-radius: 0px 100px 100px 0px;
	color: #fff;
	font-size: 12px;
	padding-left: 10px;
	box-sizing: border-box;
	line-height: 25px;
	position: absolute;
	transform: translate(-5px, 5px);
}
.prevent_img {
	height: 280px;
	width: 210px;
	margin: 0 auto;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.vote_main_box {
	padding: 30px 16px 0 16px;
	overflow: hidden;
	display: flex;
}
.vote_main_box>text:first-child {
	font-size: 14px;
	color: #333;
	line-height: 20px;
	flex: 1;
}
.vote_main_box>text:last-child {
	font-size: 12px;
	color: #FF4F4D;
	line-height: 20px;
	flex: 1;
	text-align: right
}
</style>
