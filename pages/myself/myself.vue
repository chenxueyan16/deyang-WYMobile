<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="个人信息" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="姓名" :border-bottom="false" :label-style="{'color':'#888'}" prop="name">
					<u-input v-model="submitForm.name" :clearable="false" input-align="right" placeholder="请输入姓名" maxlength="15" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="证件类型" :border-bottom="false" :label-style="{'color':'#888'}" prop="documentType">
					<u-input v-model="submitForm.documentType" type="select" input-align="right" @click="showCard=true" />
				</u-form-item>
				<u-form-item label="证件号" :border-bottom="false" :label-style="{'color':'#888'}" prop="idNumber">
					<u-input v-model="submitForm.idNumber" :clearable="false" placeholder="请输入证件号" input-align="right" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="民族" :border-bottom="false" :label-style="{'color':'#888'}" prop="nationName">
					<u-input v-model="submitForm.nationName" type="select" input-align="right" @click="showNation=true;"/>
				</u-form-item>
				<u-form-item label="手机号" :border-bottom="false" :label-style="{'color':'#888'}" prop="mobile">
					<u-input v-model="submitForm.mobile" type="select" placeholder="请输入手机号" input-align="right" disabled @click="toDetail"/>
				</u-form-item>
				<view class="section2 cameraBlock_img">
					<u-upload :action="action" :file-list="fileList" @on-success="successHandle" @on-error="errorHandle" @on-remove="removeHandle" max-count="1" :width="280" style="margin:0 auto;">
						<image slot="addBtn" src="/static/pic_empty.png" class="photo"></image>
					</u-upload>
				</view> 
				<view class="imgDescription" style="margin-top: 16px;">请拍一张清晰的正面照</view>
				<view class="imgDescription">以便通过刷脸进入社区</view>
				<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:35px;margin-bottom:20px;" @click="saveHandle">提交</view>
			</u-form>
			<u-select v-model="showCard" :list="cardList" @confirm="confirmCard"></u-select>
			<u-select v-model="showNation" :list="nationList" @confirm="confirmNation"></u-select>
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
	import {url,request} from '../../common/config.js'
	
	export default {
		data() {
			return {
				submitForm: {
					documentType: '身份证',
					idNumber: '',
					nationName: '汉族',
					nationId: 1,
					mobile: '123',
					name: '',
					headPortraitUrl: ''
				},
				action: url + 'images/photoupload',
				fileList: [],
				showCard: false,
				showNation: false,
				showLoading: false,
				cardList: [{
				  value: 0,
				  label: '身份证'
				}, {
				  value: 1,
				  label: '港澳通行证'
				}, {
				  value: 2,
				  label: '护照'
				}],
				nationList: [],
				canSubmit: false
			}
		},
		onLoad(){
			try {
			    var userInfo = uni.getStorageSync('userInfo');
				this.getInfo(JSON.parse(userInfo).user.id);	   
			} catch (e) {
			    // error
			}
			this.getNations();
		},
		methods: {
			getInfo: function (id) {
				var that = this;
				this.$request('app/zhsquser/info/' + id,JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.submitForm = res.zhsqUser;
						that.submitForm.idNumber = that.submitForm.idNumber.length == 18 ? that.submitForm.idNumber : '';
						if (that.submitForm.headPortraitUrl) {
							that.fileList.push({url:that.submitForm.headPortraitUrl})
						} else {
							that.fileList.push({url:'/static/pic_empty.png'})
						}
						that.changeValue();
					}
				})
			},
			getNations:function () {
			    var that = this;
				this.$request('mp/mpcommonnation/list',JSON.stringify({ limit: 60 })).then(res=>{
					if(res.code==0){			
						that.nationList = res.page.list
						that.nationList.map(item=>{
							item.label=item.nation
							item.value=item.id
						})
					}
				})
			},
			confirmCard:function(e){
				this.submitForm.documentType = e[0].label;
				this.showCard=false
			},
			confirmNation:function(e){
				this.submitForm.nationName = e[0].label;
				this.submitForm.nationId=e[0].value;
				this.showNation=false
			},
			successHandle:function(data, index, lists, name){
				this.submitForm.headPortraitUrl = data;
				this.changeValue();
			},
			removeHandle:function(index, lists, name){
				this.submitForm.headPortraitUrl = '';
				this.changeValue();
			},
			errorHandle:function(res, index, lists, name){
				this.$refs.uToast.show({
					title: '上传失败',
					type: 'error'
				})
			},
			changeValue: function () {
				if (this.submitForm.name !== '' && this.submitForm.idNumber !== '' && this.submitForm.mobile !== '' && this.submitForm.headPortraitUrl !== '') {
					this.canSubmit = true;
				} else {
					this.canSubmit = false;
				}
			},
			saveHandle: function () {
				if (!this.canSubmit) {
					return false;
				} else {
					var phone = /^1(3|4|5|7|8|9)\d{9}$/;
					var number = /^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9Xx]$/;
					if (!phone.test(this.submitForm.mobile)) {
						this.$refs.uToast.show({
							title: '手机号格式错误',
							type: 'warning'
						})
						return false;
					}
					if (this.submitForm.documentType == '身份证') {
						if (!number.test(this.submitForm.idNumber) || this.submitForm.idNumber.length !== 18) {
							this.$refs.uToast.show({
								title: '身份证格式错误',
								type: 'warning'
							})
							return false;
						}
					}
					var that = this;
					that.submitForm.isManage = that.submitForm.isManage == true ? 1 : 0;
					that.showLoading = true;
					this.$request('app/zhsquser/update',JSON.stringify(that.submitForm)).then(res=>{
						if(res.code==0){
							that.showLoading = false;
							that.$refs.uToast.show({
								title: '操作成功',
								type: 'success'
							})
							setTimeout(function(){
								that.routerTo()
							},1000)
						}else{
							that.showLoading = false;
							that.$refs.uToast.show({
								title: res.msg,
								type: 'error'
							})
						}
					})	
			    }
			},
			toDetail:function(){
				uni.navigateTo({
				    url: '../phone/phone'
				});
			},
			routerTo:function(){
				uni.reLaunch({
				    url: '../mine/mine'
				});
			}
		}
	}
</script>

<style>

</style>
