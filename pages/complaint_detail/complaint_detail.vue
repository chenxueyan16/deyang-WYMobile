<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.type" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="状态" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.state" disabled input-align="right"/>
				</u-form-item>
				<view class="remarks">
					<view>投诉/意见描述</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.text" disabled/>
					</u-form-item>
				</view>
				<view class="comDetail_img" v-if="info.images">
				    <image v-for="(item,index) in info.images" :key="index" :src="item" @click="viewHandle(item,index)" />
				</view>
				<u-form-item label="手机号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.mobile" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="房屋信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.house" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="提交时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.createDate" disabled input-align="right"/>
				</u-form-item>
				<view class="remarks" v-if="info.state=='已处理'">
					<view>处理反馈</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.textReply" disabled/>
					</u-form-item>
				</view>
			</u-form>		
		</view>
		<view class="replyBlock" v-if="info.state=='待处理'">
			<u-form-item>
				<u-input type="textarea" maxlength="140" :height="20" :auto-height="true" v-model="info.textReply" placeholder="请输入反馈留言"/>
				<u-button slot="right" type="primary" style="width:40%;" size="medium" @click="dealHandle">处理</u-button>
			</u-form-item>
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
				id:null
			}
		},
		onLoad(option){
			this.id = option.id
			this.getInfo();
		},
		methods: {
			getInfo: function () {
				var that = this;
				this.$request('app/zhsqcomplaints/info/'+that.id,JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.info = res.data;
						that.info.state = that.info.state == '1' ? '已处理' : '待处理';
						switch (that.info.type) {
							case '1': that.info.type = '环境';
								break;
							case '2': that.info.type = '安全';
								break;
							case '3': that.info.type = '秩序';
								break;
							case '4': that.info.type = '工作人员';
								break;
							case '5': that.info.type = '设备设施';
								break;
							case '6': that.info.type = '其他';
								break;
						}
						that.info.images = JSON.parse(res.data.images);
					}
				})
			},
			viewHandle:function(item,index){
				var that = this;
				uni.previewImage({
					current:index,
					urls:that.info.images ,
					success: function(data) {},
					fail: function(err) {}	
				});
			},
			dealHandle: function () {
				var that = this;
				if (that.info.textReply == '') {
					this.$refs.uToast.show({
						title: '请输入反馈留言',
						type: 'warning'
					})
				} else {
					that.showLoading = true;
					this.$request('app/zhsqcomplaints/update',JSON.stringify({ id: that.id, textReply: that.info.textReply})).then(res=>{
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
							that.showLoading = false;
							this.$refs.uToast.show({
								title: res.msg,
								type: 'error'
							})
						}
					})
				}
			},
			routerTo:function(){
				uni.navigateTo({
					url:'../complaint/complaint'
				})
			}
		}
	}
</script>

<style>

</style>
