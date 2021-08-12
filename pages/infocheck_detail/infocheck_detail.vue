<template> 
	<view> 
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false"></u-navbar>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="姓名" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.userName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="人员类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.type" disabled input-align="right"/>
				</u-form-item>
				<u-form-item v-if="showRelation" label="与业主关系" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.relation" disabled input-align="right"/>
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
				<u-form-item v-if="showPhone" :label="info.isMobile" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.mobile" disabled input-align="right"/>
				</u-form-item>
				<u-form-item v-if="showRoom" label="房屋信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.houseName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item v-if="showTime" label="拜访时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.addTime" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="单位信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input  type="textarea" :height="20" :auto-height="true" v-model="info.unitInformation" disabled input-align="right"/>
				</u-form-item>
			</u-form>		
		</view>
		<u-row gutter="16" style="padding-top:25px;">
			<u-col span="4"><view style="color:transparent">2</view></u-col>
			<u-col span="4">
				<image class="currentphoto" :src="info.headPortraitUrl" ></image>
			</u-col>
			<u-col span="4" text-align="right" style="height:160px">
				<image src="/static/wait_check.png" style="height:20px;width:55px;transform: translateX(4px);"></image>
			</u-col>
		</u-row>
		<view class="infoBlock_btn clearfix" style="margin:30px 15px 20px 15px;">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					id:213,
					userName:'11',
					communityName:'11',
					idNumber:'156485256325684897498',
					mobile:'11',
					type:'11',
					documentType:'身份证',
					nationName:'汉族',
					unitInformation:'好的1111111111',
					headPortraitUrl:'/static/pic_avator.png'
				},
				showPhone: false,
				showRoom: false,
				showRelation: false,
				showTime: false,
				nationList: [],
				showLoading: false,
				id:null,
				showDialog:false,
				dialogText:''
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
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/info/' + id,
			          //   type: 'POST',
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code === 0) {
			          //       that.info = res.zhsqPersonRecord;
			          //       that.info.isMobile = that.info.mobileChannel == 0 ? '本人手机号' : '非本人手机号';
			          //       switch (that.info.roleType) {
			          //         case '510': that.info.type = '业主';
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '511': that.info.type = '住户';
			          //           that.info.relation = '夫妻';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '512': that.info.type = '住户';
			          //           that.showRelation = true;
			          //           that.info.relation = '子女';
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '513': that.info.type = '住户';
			          //           that.info.relation = '父母';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '514': that.info.type = '住户';
			          //           that.info.relation = '亲属';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '515': that.info.type = '住户';
			          //           that.info.relation = '朋友';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '520': that.info.type = '租客';
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '521': that.info.type = '住户';
			          //           that.info.relation = '租客夫妻';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '522': that.info.type = '住户';
			          //           that.info.relation = '租客子女';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '523': that.info.type = '住户';
			          //           that.info.relation = '租客父母';
			          //           that.showRelation = true;
			          //           that.showPhone = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '524': that.info.type = '住户';
			          //           that.info.relation = '租客亲属';
			          //           that.showTime = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '525': that.info.type = '住户';
			          //           that.info.relation = '租客朋友';
			          //           that.showTime = true;
			          //           that.showRoom = true;
			          //           break;
			          //         case '711': that.info.type = '亲友访客';
			          //           that.showTime = true;
			          //           that.showRoom = true;
			          //           that.info.addTime = moment(that.info.startTime).format('YYYY-MM-DD HH:mm') + '~ ' + moment(that.info.endTime).format('YYYY-MM-DD HH:mm');
			          //           break;
			          //         case '712': that.info.type = '公务访客';
			          //           that.showTime = true;
			          //           that.showRoom = true;
			          //           that.info.addTime = moment(that.info.startTime).format('YYYY-MM-DD HH:mm') + '~ ' + moment(that.info.endTime).format('YYYY-MM-DD HH:mm');
			          //           break;
			          //         case '721': that.info.type = '外卖';
			          //           that.showTime = true;
			          //           that.info.addTime = moment(that.info.startTime).format('YYYY-MM-DD HH:mm') + '~ ' + moment(that.info.endTime).format('YYYY-MM-DD HH:mm');
			          //           break;
			          //         case '722': that.info.type = '快递';
			          //           that.showTime = true;
			          //           that.info.addTime = moment(that.info.startTime).format('YYYY-MM-DD HH:mm') + '~ ' + moment(that.info.endTime).format('YYYY-MM-DD HH:mm');
			          //           break;
			          //         case '810': that.info.type = '物业人员';
			          //           break;
			          //         case '820': that.info.type = '服务人员';
			          //           break;
			          //       }
			          //       that.info.idNumber = that.info.idNumber.substr(0, 6) + '********' + that.info.idNumber.substr(14, 18);
			          //       that.nationList.map(function (item) {
			          //         if (item.id == that.info.nationId) {
			          //           that.info.nationName = item.nation;
			          //         }
			          //       })
			          //     }
			          //   }
			          // })
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
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/updateAppApplicantStatusCode',
			          //   type: 'POST',
			          //   data: JSON.stringify({ id: that.id, statusCode: status }),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code === 0) {
			          //       vant.Toast({
			          //         message: '操作成功！',
			          //         icon: '../image/success.png'
			          //       })
			          //       that.showZZ = false;
			          //       that.fkHandle({ applicantDeptId: that.deptId, statusCode: 0, limit: 999 });
			          //       that.houseHandle({ community: that.deptId, statusCode: 0, limit: 999 });
			          //     } else {
			          //       that.showZZ = false;
			          //       vant.Toast({
			          //         message: res.msg,
			          //         icon: '../image/error.png'
			          //       })
			          //     }
			          //   },
			          //   error: function (err) {
			          //     that.showZZ = false;
			          //   }
			          // })
			},
			routerTo: function () {
				uni.navigateTo({
					url: '../infocheck/infocheck' 
				});
			}
		}
	}
</script>

<style>

</style>
