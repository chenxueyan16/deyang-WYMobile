<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" :title="title" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view style="margin-top:20px;" v-if="title=='手机号'">
			<view class="inp_label">当前手机号</view>
			<view class="inp_label" style="font-size:20px;color:#333333;font-weight:bold;">{{mobile}}</view>
			<view style="margin-left:15px;font-size:12px;color:#CDCDCD">更换后，请使用新的手机号登录。</view>
			<view class="linerbtn btnActive" style="margin-top:50px;" @click="changeHandle">更换手机号</view>
		</view>
		<view style="margin-top:20px;" v-if="title=='更换手机号'">
			<image class="logo" src="/static/img_change_number.png"></image>
			<view class="inp_label" style="text-align:center;margin-top:15px;">当前手机号 {{mobile}}</view>
			<view class="formStyle">
				<u-form ref="uForm" :border-bottom="false" label-width="auto">
					<u-form-item label="新手机号">
						<u-input type="text" maxlength="11" :clearable="false" v-model="phone" input-align="right"  placeholder="请输入新手机号" @input="changeValue"/>
					</u-form-item>			
					<u-form-item label="短信验证码">
						<u-input type="number" maxlength="4"  v-model="captcha" :clearable="false" input-align="right"  placeholder="请输入短信验证码" @input="changeValue"/>
						<view slot="right" v-show="canClick" style="color:#295BFD;font-size:15px;font-weight:bold;" @click="verifyHandle">{{content}}</view>
						<view slot="right" v-show="!canClick" style="color:#CDCDCD;font-size:15px;font-weight:bold;">{{content}}</view>
					</u-form-item>			
				</u-form>
			</view>
			<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:50px;" @click="confirmHandle">确定</view>
			<view id="wt-model" v-if="showLoading">
				<u-loading mode="flower" size="46"></u-loading>
				<view style="color:#fff;margin-top: 16px;">
					提交中...
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {url,request,removeInfo} from '../../common/config.js'
	
	export default {
		data() {
			return {
				id:null,
				title:'手机号',
				captcha: '',
				phone: '',
				mobile: '18702942802',
				canSubmit: false,
				canClick: true,
				seconds: 60,
				content: '发送验证码',
				showLoading:false,
			}
		},
		onLoad(){
			try {
			    var userInfo = uni.getStorageSync('userInfo');
				this.mobile = JSON.parse(userInfo).user.mobile;
				this.id = JSON.parse(userInfo).user.id;
			} catch (e) {
			    // error
			}
		},
		methods: {		
			changeHandle: function () {
				this.title = '更换手机号';
			},
			changeValue: function () {
				if (this.phone !== '' && this.captcha !== '') {
					this.canSubmit = true;
				}else{
					this.canSubmit = false;
				}
			},
			verifyHandle: function () {
				var that = this;
				var reg = /^1(3|4|5|7|8|9)\d{9}$/;
				that.phone = that.phone.replace(/\s+/g, "");
				if (!reg.test(that.phone)) {
					that.$refs.uToast.show({
						title: '手机号格式错误',
						type: 'warning'
					})
				} else {
					this.$request('app/tologin/sendSms',JSON.stringify({ phone: that.phone })).then(res=>{
						that.count();
					})
				}
			},
			count: function () {
				if (!this.canClick) return;  //改动的是这两行代码
				this.canClick = false;
				this.content = '重新发送(' + this.seconds + ')秒';
				var that = this;
				var clock = setInterval(function () {
					that.seconds--;
					that.content = '重新发送(' + that.seconds + ')秒';
					if (that.seconds < 0) {
						clearInterval(clock);
						that.content = '重新发送';
						that.seconds = 60;
						that.canClick = true; //这里重新开启
					}
				}, 1000)
			},
			confirmHandle: function () {
				if (!this.canSubmit) {
					return false;
				}
				var that = this;
				that.showLoading = true
				this.$request('app/tologin/updatePhone',JSON.stringify({ phone: that.phone, old_phone: that.mobile, code: that.captcha, user_id: that.id })).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						removeInfo('userInfo')
						removeInfo('deptName')
						removeInfo('deptId')
						removeInfo('roleId')
						that.$refs.uToast.show({
							title: '修改成功,请重新登录',
							type: 'success'
						})
						setTimeout(function(){
							uni.reLaunch({
							    url: '../login/login'
							});
						},1000)
					}else{
						that.showLoading = false;
						that.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},
			routerTo:function(){
				uni.navigateTo({
					url:'../myself/myself'
				})
			}
		}
	}
</script>

<style>
.inp_label {
  margin-left: 15px;
  font-size: 15px;
  color: #888;
  margin-bottom: 20px;
}
.logo {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  height: 80px;
  width: 80px;
}
</style>
