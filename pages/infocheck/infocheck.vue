<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="信息审核" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
			<view style="margin:8px 16px">	
				<u-search placeholder="请输入搜索姓名或身份证号" v-model="value" shape="square" :show-action="false" style="" @search="searchHandle"></u-search>
			</view>
		</view>
		<view v-if="current===0">	
			<u-empty v-if="infoList.length==0" text="没有需要审核的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="infoList.length>0" class="infoBlock" v-for="(item,index) in infoList" :key="index">
				<view class="clearfix" @click="detailTo(item)">
					<image class="infoBlock_avator fl" src="/static/img_change_number.png"></image>
					<view class="infoBlock_text fl">
						<view class="infoBlock_text-item">
							<text>姓名：</text>
							<text class="overLong" style="width:50px;">{{item.userName}}</text>
							<label class="tag">{{item.tag}}</label>
						</view>
			            <view class="infoBlock_text-item">
			                <text>小区信息：</text>
			                <text>{{item.communityName}}</text>
			            </view>
			            <view class="infoBlock_text-item">
			                <text>证件号：</text>
			                <text>{{item.idNumber.substr(0,6)}}********{{item.idNumber.substr(14,18)}}</text>
			            </view>
			            <view class="infoBlock_text-item" style="margin-bottom: 0;">
							<text>手机号：</text>
							<text>{{item.mobile}}</text>
			            </view>
			        </view>
			    </view>
				<view class="infoBlock_btn clearfix">
					<view class="fr purebtn btnConfirm" @click="passHandle(item)">通过</view>
					<view class="fl purebtn btnDeny" @click="denyHandle(item)">拒绝</view>
				</view>
			</view>
		</view>
		<view v-if="current===1">
			<u-empty v-if="fkList.length==0" text="没有需要审核的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="fkList.length>0" class="infoBlock" v-for="(item,index) in infoList" :key="index">
				<view class="clearfix" @click="detailTo(item)">
					<image class="infoBlock_avator fl" src="/static/img_change_number.png"></image>
					<view class="infoBlock_text fl">
						<view class="infoBlock_text-item">
							<text>姓名：</text>
							<text class="overLong" style="width:50px;">{{item.userName}}</text>
							<label class="tag">{{item.tag}}</label>
						</view>
			            <view class="infoBlock_text-item">
			                <text>小区信息：</text>
			                <text>{{item.communityName}}</text>
			            </view>
			            <view class="infoBlock_text-item">
			                <text>证件号：</text>
			                <text>{{item.idNumber.substr(0,6)}}********{{item.idNumber.substr(14,18)}}</text>
			            </view>
						<view class="infoBlock_text-item" style="margin-bottom: 0;">
							<text>拜访时间：</text>
							<text class="overLong">{{item.addTime}}</text>
						</view>
			        </view>
			    </view>
				<view class="infoBlock_btn clearfix">
					<view class="fr purebtn btnConfirm" @click="passHandle(item)">通过</view>
					<view class="fl purebtn btnDeny" @click="denyHandle(item)">拒绝</view>
				</view>
			</view>
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
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="vertifyHandle(currentId, dialogText=='是否拒绝申请？'?2:1)">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '住户信息审核'
				}, {
					name: '访客信息审核'
				}],
				current: 0,
				value:null,
				fkList: [{
					userName:'11',
					communityName:'11',
					idNumber:'156485256325684897498',
					mobile:'11',
					tag:'11'
				}],
				infoList: [{
					id:213,
					userName:'11',
					communityName:'11',
					idNumber:'156485256325684897498',
					mobile:'11',
					tag:'11'
				}],
				deptName:'左岸春天',
				deptId: null,
				showLoading: false,	
				showDialog:false,
				dialogText:'',
				currentId:null
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
			uni.getStorage({
				key: 'deptId',
				success: function (res) {
					this.deptId = res
				}
			})
			this.houseHandle({ community: this.deptId, statusCode: 0, limit: 999 });
			this.fkHandle({ applicantDeptId: this.deptId, statusCode: 0, limit: 999 });
		},
		methods: {
			change:function(index) {
				this.current = index;
			},
			houseHandle: function (param) {
			          // var that = this;
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/listPersonRecordByProperty',
			          //   type: 'POST',
			          //   data: JSON.stringify(param),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code === 0) {
			          //       that.infoList = res.page.list;
			          //       that.infoList.map(function (item) {
			          //         var index = item.houseName.indexOf("\-");
			          //         item.communityName = index !== -1 ? item.houseName.substring(0, index) : item.houseName;
			          //         switch (item.roleType) {
			          //           case '510': item.tag = '业主';
			          //             break;
			          //           case '511': item.tag = '业主夫妻';
			          //             break;
			          //           case '512': item.tag = '业主子女';
			          //             break;
			          //           case '513': item.tag = '业主父母';
			          //             break;
			          //           case '514': item.tag = '业主亲属';
			          //             break;
			          //           case '515': item.tag = '业主朋友';
			          //             break;
			          //           case '520': item.tag = '租客';
			          //             break;
			          //           case '521': item.tag = '租客夫妻';
			          //             break;
			          //           case '522': item.tag = '租客子女';
			          //             break;
			          //           case '523': item.tag = '租客父母';
			          //             break;
			          //           case '524': item.tag = '租客亲属';
			          //             break;
			          //           case '525': item.tag = '租客朋友';
			          //             break;
			          //           case '810': item.tag = '物业人员';
			          //             break;
			          //           case '820': item.tag = '服务人员';
			          //             break;
			          //         }
			          //       })
			          //     }
			          //   }
			          // });
			},
			fkHandle: function (param) {
			          var that = this
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/listPersonRecordByFkKDWM',
			          //   type: 'POST',
			          //   data: JSON.stringify(param),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code === 0) {
			          //       that.fkList = res.page.list;
			          //       that.fkList.map(function (item) {
			          //         switch (item.roleType) {
			          //           case '711': item.tag = '亲友访客';
			          //             item.addTime = moment(item.startTime).format('YYYY-MM-DD') + '~' + moment(item.endTime).format('YYYY-MM-DD');
			          //             break;
			          //           case '712': item.tag = '公务访客';
			          //             item.addTime = moment(item.startTime).format('YYYY-MM-DD') + '~' + moment(item.endTime).format('YYYY-MM-DD');
			          //             break;
			          //           case '721': item.tag = '外卖';
			          //             item.addTime = moment(item.startTime).format('YYYY-MM-DD') + '~' + moment(item.endTime).format('YYYY-MM-DD');
			          //             break;
			          //           case '722': item.tag = '快递';
			          //             item.addTime = moment(item.startTime).format('YYYY-MM-DD') + '~' + moment(item.endTime).format('YYYY-MM-DD');
			          //             break;
			          //         }
			          //       })
			          //     }
			          //   }
			          // });
			},
			searchHandle: function () {
				if(this.current===0){		
					this.houseHandle({ community: this.deptId, statusCode: 0, limit: 999, selectNameIdNumber: this.value });
				}else{
					this.fkHandle({ applicantDeptId: this.deptId, statusCode: 0, limit: 999, selectNameIdNumber: this.value });
				}
			},
			denyHandle: function (item) {
				this.showDialog=true
				this.dialogText='是否拒绝申请？'
				this.currentId=item.id
			},
			passHandle:function(item){
				this.showDialog=true
				this.dialogText='是否通过申请？'
				this.currentId=item.id
			},
			vertifyHandle: function (id, status) {
				console.log(id)
			          var that = this;
					  that.showDialog = false
					  that.showLoading = true
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/updateAppApplicantStatusCode',
			          //   type: 'POST',
			          //   data: JSON.stringify({ id: id, statusCode: status }),
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
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../infocheck_detail/infocheck_detail?id=' + item.id
				});
		    },
		}
	}
</script>

<style>

</style>
