<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="房屋详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view style="height:375px;width:100%;background-size:100% 100%;" :style="{backgroundImage:'url(' + info.pic1 + ')'}">
			<image v-if="info.status==1" class="fr infoBlock_img" style="transform:translateY(206px);" src="/static/wait_check.png" />
			<image v-if="info.status==2" class="fr infoBlock_img" style="transform:translateY(206px);" src="/static//check.png" />
			<image v-if="info.status==3" class="fr infoBlock_img" style="transform:translateY(206px);" src="/static//deny_check.png" />
		</view>
		<view class="rentBlock" style="transform: translateY(-142px);">
		    <view class="rentBlock_title" style="font-weight:600;">{{info.title}}</view>
			<view class="rentBlock_money clearfix">
				<view class="fl">{{info.rent}}
				  <text style="font-size:12px;">元/月</text>
				</view>
				<view class="fr">押金：{{info.foregift}}元</view>
			</view>
			<view class="formStyle">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="房屋信息" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.roomName" disabled input-align="right"/>
					</u-form-item>
					<u-form-item label="业主" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.ownerName" disabled input-align="right"/>
					</u-form-item>
					<u-form-item label="面积" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.roomArea" disabled input-align="right"/>
					</u-form-item>
					<u-form-item label="付款周期" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.cycle" disabled input-align="right"/>
					</u-form-item>
					<u-form-item label="发布人" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.pubName" disabled input-align="right"/>
					</u-form-item>
					<u-form-item label="发布时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="info.addTime" disabled input-align="right"/>
					</u-form-item>
					<view class="remarks">
						<view>备注描述</view>
						<u-form-item :border-bottom="false">
							<u-input type="textarea" :height="20" :auto-height="true" v-model="info.remarks" disabled/>
						</u-form-item>
					</view>
			    </u-form>
			</view>
			<view class="imgBlock">
				<view>照片信息</view>
				<image v-for="(item,index) in info.pic" :key="index" :src="item" style="display:inline-block;height:375px;width:100%;margin-bottom:10px;" />
			</view>
		</view>
		<view class="infoBlock_btn clearfix" style="margin:30px 15px 20px 15px;" v-if="info.status=='1'">
			<view class="fl purebtn btnDeny" @click="denyHandle">拒绝</view>
			<view class="fr purebtn btnConfirm" @click="passHandle">通过审核</view>
		</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">{{dialogText}}</view>
			<view class="clearfix dialogBlock_btnGroup">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="showDialog=false">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="vertifyHandle(dialogText=='是否拒绝申请？'?2:1)">确定</view>
			</view>
		</u-popup>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				info: {},
				showLoading: false,
				id:null,
				showDialog:false,
				dialogText:'',
			}
		},
		onLoad(option){
			this.id = option.id
			this.getInfo();
		},
		methods: {
			getInfo: function () {
				var that = this;
				this.$request('app/wylease/info',JSON.stringify({id:that.id})).then(res=>{
					if(res.code==0){
						that.info = res.data;
						that.info.roomArea = res.data.roomArea ? res.data.roomArea + '㎡' : '㎡';
						that.info.pic = that.info.pic.split(",");
						that.info.pic1 = that.info.pic[0];
					}
				})
			},
			denyHandle: function () {
				this.showDialog=true
				this.dialogText='是否拒绝申请？'
			},
			passHandle: function () {
				this.showDialog=true
				this.dialogText='是否通过申请？'
			},
			vertifyHandle: function (status) {
				var that = this;
				that.showDialog = false
				that.showLoading = true
				this.$request('app/wylease/update',JSON.stringify({ id: id, status: status })).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success',
							url:'/pages/rentcheck/rentcheck'
						})
					}
				})
			},
			routerTo:function(){
				uni.navigateTo({
					url: '../rentcheck/rentcheck'
				})
			}
		}
	}
</script>

<style>
.imgBlock {
  background: #fff;
  border-top: 10px solid #F5F5F5;
  box-sizing: border-box;
}

.imgBlock>view {
  font-size: 16px;
  color: #41424F;
  padding: 14px;
}

.rentBlock_title {
  color: #41424F;
  font-size: 20px;
  margin: 0 14px 8px 14px;
}

.rentBlock_money {
  margin: 0 14px 8px 14px;
}

.rentBlock_money>view:first-child {
  color: #295BFD;
  font-size: 20px;
}

.rentBlock_money>view:last-child {
  color: #888;
  font-size: 12px;
  margin-top: 8px;
}
</style>
