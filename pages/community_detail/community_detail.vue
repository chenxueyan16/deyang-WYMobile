<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="姓名" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.userName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="人员类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.type" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="证件类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.documentType" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="证件号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.idNumber" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="民族" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.nationName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item :label="info.isMobile" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.mobile" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="是否管理员" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-switch slot="right" v-model="info.isManage" size="40" disabled></u-switch>
				</u-form-item>
				<u-form-item label="房屋信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.houseName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="单位信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input  type="textarea" :height="20" :auto-height="true" v-model="info.unitInformation" disabled input-align="right"/>
				</u-form-item>
			</u-form>		
		</view>
		<u-row gutter="16" style="padding-top:25px;">
			<u-col span="4"><view style="color:transparent">2</view></u-col>
			<u-col span="4">
				<image class="currentphoto" :src="info.headPortraitUrl" />
				<image v-if="info.statusCode==1" src="/static/pass.png" style="height:60px;width:73px;transform:translate(80px,-60px)"/>
				<image v-if="info.statusCode==2" src="/static/deny.png" style="height:60px;width:73px;transform:translate(80px,-60px)"/>
			</u-col>
			<u-col span="4" text-align="right" style="height:160px">
				<image v-if="info.statusCode==0" src="/static/wait_check.png" style="height:20px;width:55px;"/>
				<image v-if="info.statusCode!==0" src="/static/check.png" style="height:20px;width:55px;"/>
			</u-col>
		</u-row>
		<view class="infoBlock_btn clearfix" style="margin:30px 15px 20px 15px;" v-if="info.statusCode==0">
			<view class="fl purebtn btnDeny" @click="denyHandle">拒绝</view>
			<view class="fr purebtn btnConfirm" @click="passHandle">通过审核</view>
		</view>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">{{dialogText}}</view>
			<view class="clearfix dialogBlock_btnGroup">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="showDialog=false">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="vertifyHandle(dialogText=='是否拒绝申请？'?2:1)">确定</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				showDialog:false,
				showLoading:false,
				dialogText:'',
				nationList:[],
				id:null
			}
		},
		onLoad(option){
			this.id = option.id
			this.getNations();
		},
		methods: {
			getNations:function () {
			    var that = this;
				this.$request('mp/mpcommonnation/list',JSON.stringify({ limit: 60 })).then(res=>{
					that.nationList = res.page.list
					that.getInfo()
				})
			},
			getInfo: function () {
				var that = this;
				this.$request('app/zhsqpersonrecord/info/'+that.id,JSON.stringify({ limit: 60 })).then(res=>{
					if(res.code==0){
						that.info = res.zhsqPersonRecord;
						that.info.isManage = that.info.isManage ? true : false;
						that.info.isMobile = that.info.mobileChannel == 0 ? '本人手机号' : '非本人手机号';
						switch (that.info.roleType) {
							case '510': that.info.type = '业主';
								break;
							case '511': that.info.type = '业主夫妻';
								break;
							case '512': that.info.type = '业主子女';
								break;
							case '513': that.info.type = '业主父母';
								break;
							case '514': that.info.type = '业主亲属';
								break;
							case '515': that.info.type = '业主朋友';
								break;
							case '520': that.info.type = '租客';
								break;
							case '521': that.info.type = '租客夫妻';
								break;
							case '522': that.info.type = '租客子女';
								break;
							case '523': that.info.type = '租客父母';
								break;
							case '524': that.info.type = '租客亲属';
								break;
							case '525': that.info.type = '租客朋友';
								break;
							case '530': that.info.type = '商户';
								break;
							case '531': that.info.type = '商户从业人员';
								break;
							default: break;
						}
						that.info.idNumber = that.info.idNumber.substr(0, 6) + '********' + that.info.idNumber.substr(14, 18);
						that.info.documentType = that.info.documentType ? that.info.documentType : '居民身份证';
						that.nationList.map(function (item) {
							if (item.id == that.info.nationId) {
								that.info.nationName = item.nation;
							}
						})
					}
				})
			},
			denyHandle: function (item) {
				this.showDialog=true
				this.dialogText='是否拒绝申请？'
			},
			passHandle:function(item){
				this.showDialog=true
				this.dialogText='是否通过申请？'
			},
			vertifyHandle: function (status) {
				var that = this;
				that.showDialog = false
				that.showLoading = true
				this.$request('app/zhsqpersonrecord/updateAppApplicantStatusCode',JSON.stringify({ id: that.id, statusCode: status })).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success',
							url:'/pages/community/community'
						})
					}
				})
			},
			routerTo:function(){
				uni.navigateTo({
					url: '../community/community'
				})
			}
		}
	}
</script>

<style>

</style>
