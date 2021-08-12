<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="关于我们" :border-bottom="false"></u-navbar>
		<u-cell-group :border="false">
			<u-cell-item title="当前版本" :border-bottom="false" :arrow="false" :title-style="{'color':'#888'}" :value="version" :value-style="{'color':'#333'}">
				<u-icon slot="right-icon" name="arrow-right" color="#C7C7CC"></u-icon>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false">
			<u-cell-item title="关于我们" :border-bottom="false" :arrow="false" :title-style="{'color':'#888'}">
				<u-icon slot="right-icon" name="arrow-right" color="#C7C7CC"></u-icon>
			</u-cell-item>
		</u-cell-group>
		<view class="loginOut" @click="showDialog = true">退出登录</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">确定退出登录？</view>
			<view class="clearfix dialogBlock_btnGroup">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="showDialog=false">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="loginOut">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {request,removeInfo} from '../../common/config.js'
	export default {
		data() {
			return {
				version: '',
				showDialog:false,
			}
		},
		onLoad(){
			this.getVersion()
		},
		methods: {
			getVersion: function () {
				var that = this;
				this.$request('pc/version/info',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.version = res.data.value;
					}
				})
			},
			loginOut: function () {
				this.showDialog = true
				var that = this;
				this.$request('app/tologin/out',JSON.stringify({})).then(res=>{
					if(res.code==0){
						removeInfo('userInfo')
						removeInfo('deptName')
						removeInfo('deptId')
						removeInfo('roleId')
						uni.reLaunch({
							url: '../login/login'
						})
					}	
				}) 
			},
		}
	}
</script>

<style>
.loginOut{
	position:fixed;
	bottom:40px;
	color:#FF4F4D;
	font-size:14px;
	width:100%;
	text-align:center;
}
</style>
