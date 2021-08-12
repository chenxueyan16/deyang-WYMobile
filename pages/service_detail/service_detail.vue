<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false"></u-navbar>
		<view class="infoBlock" style="padding-left:15px;padding-right:0px;margin:0;">
		    <view class="clearfix">
		        <image class="fl" src="/static/icon_repair.png" style="margin-right:10px;height:30px;width:30px;" />
		        <view class="fl infoBlock_text" style="width:80%;">
					<view class="infoBlock_text-item">
						<text style="color:#000;font-weight:bold;">服务原因：</text>
						<text style="font-weight:bold;">{{info.title}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text style="color:#000;font-weight:bold;">预约时间：</text>
						<text style="font-weight:bold;">{{info.appointmentTime}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>小区名称：</text>
						<text style="color:#888;">{{info.deptName}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>房屋信息：</text>
						<text style="color:#888;">{{info.house}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>提交人：</text>
						<text style="color:#888;">{{info.userName}}</text>
					</view>
					<view class="remarks">
						<view style="margin-bottom: 0;">详情描述</view>
						<u-form-item :border-bottom="false">
							<u-input type="textarea" :height="20" :auto-height="true" v-model="info.text" disabled/>
						</u-form-item>
					</view>
					<view class="comDetail_img" v-if="info.images">
						<image v-for="(item,index) in info.images" :key="index" :src="item" @click="viewHandle(item)" />
					</view>
					<u-mask :show="showPicture" @click="showPicture = false">
						<view class="picView">
							<view class="picView_image" :style="{backgroundImage:'url(' + currentPicture + ')'}"></view>
						</view>
					</u-mask>
		        </view>
		    </view>
		</view>
		<!--  管理人员  已处理 -->
		<view style="margin-top:10px" v-if="info.state!=='0'">
		    <view class="infoBlock" style="padding-left:15px;padding-bottom:0;padding-right:0px;margin:0;">
		        <view class="clearfix">
					<image class="fl" src="/static/icon_recept.png" style="margin-right:10px;height: 30px;width:30px;" />
					<view class="fl infoBlock_text" style="width:80%;"> 
						<view v-if="info.state=='2'" class="infoBlock_text-item">
							<text style="color:#000;font-weight:bold;">已受理</text>
						</view>
						<view v-if="info.state=='1'" class="infoBlock_text-item">
							<text style="color:#000;font-weight:bold;">无法处理</text>
						</view>
						<view v-if="info.state=='3'" class="infoBlock_text-item">
							<text style="color:#000;font-weight:bold;">已完成</text>
						</view>
						<view class="infoBlock_text-item">
							<text>受理人：</text>
							<text style="color:#888;">{{info.manageUserName}}</text>
							<u-icon size="30" class="fr" name="phone" color="#295BFD" @click="callHandle(info.manageMobile)"></u-icon>
						</view>
						<view class="remarks">
							<view style="margin-bottom: 0;">处理留言</view>
							<u-form-item :border-bottom="false">
								<u-input type="textarea" :height="20" disabled :auto-height="true" v-model="info.content" />
							</u-form-item>
						</view>
					</view>
		        </view>
		    </view>
		</view>
		<!-- 维修人员 已受理 !isManage-->
		<view style="margin-top:10px;" v-if="info.handleState!=='0'">
		    <view class="infoBlock" style="padding-left:15px;padding-bottom:0;padding-right:0px;margin:0;">
		        <view class="clearfix">
					<image class="fl" src="/static/icon_deal.png" style="margin-right:10px;height:30px;width:30px;" />
					<view class="fl infoBlock_text" style="width:80%;">
						<view v-if="info.handleState=='2'" class="infoBlock_text-item">
							<text style="color:#000;font-weight:bold;">已完成</text>
						</view>
						<view v-if="info.handleState=='1'" class="infoBlock_text-item">
							<text style="color:#000;font-weight:bold;">无法处理</text>
						</view>
						<view class="infoBlock_text-item">
							<text>受理人：</text>
							<text style="color:#888;">{{info.assignUserName}}</text>
							<u-icon size="30" class="fr" name="phone" color="#295BFD" @click="callHandle(info.assignMobile)"></u-icon>
						</view>
						<view class="remarks">
							<view style="margin-bottom: 0;">处理留言</view>
							<u-form-item :border-bottom="false">
								<u-input type="textarea" :height="20" disabled :auto-height="true" v-model="info.serviceContent"/>
							</u-form-item>
						</view>
					</view>
		        </view>
		    </view>
		</view>
		<!--  管理人员  未处理 -->
		<view v-if="isManage&&info.state=='0'" style="margin-top:10px;">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="报修状态" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="submitForm.stateName" type="select" input-align="right" placeholder="请选择状态" @click="showStatus=true"/>
					</u-form-item>
					<u-form-item label="指派给" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="submitForm.person" type="select" input-align="right" placeholder="请选择指派人" @click="switchTo"/>
					</u-form-item>
					<view class="remarks">
						<view style="margin-bottom: 0;">处理留言</view>
						<u-form-item :border-bottom="false">
							<u-input type="textarea" :height="20" :auto-height="true" @keyup="changeValue" placeholder="请输入报修处理留言" maxlength="200" v-model="info.content" />
						</u-form-item>
					</view>
					<u-select v-model="showStatus" :list="stateList" @confirm="changeStatus"></u-select>
				</u-form>
				<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:40px;margin-bottom:10px;width:100%;" @click="submitHandle">提交</view>
			</view>
		</view>
		<!--维修人员 未处理  -->
		<view v-if="!isManage&&info.state=='2'&&info.handleState=='0'">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="服务结果" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="submitForm.handleStateName" type="select" input-align="right" placeholder="请选择状态" @click="showStatus=true"/>
					</u-form-item>
					<view class="remarks">
						<view style="margin-bottom: 0;">处理留言</view>
						<u-form-item :border-bottom="false">
							<u-input type="textarea" :height="20" :auto-height="true" @keyup="changeValue" placeholder="请输入报修处理留言" maxlength="200" v-model="info.serviceContent" />
						</u-form-item>
					</view>
					<u-select v-model="showStatus" :list="handleStateList" @confirm="changeStatus"></u-select>
				</u-form>
				<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:40px;margin-bottom:10px;width:100%;" @click="submitHandle">提交</view>
			</view>
		</view>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					state:'2',
					handleState:'0',
					title:'123',
					house:'e3',
					appointmentTime:'324',
					images:['/static/prevention.jpg','/static/icon-infocheck.png','/static/account.png']
				},
				submitForm:{},
				stateList: [{
				  value: '1',
				  label: '无法处理'
				}, {
				  value: '2',
				  label: '已受理'
				}, {
				  value: '3',
				  label: '已完成'
				}],
				showStatus:false,
				handleStateList: [{
				  value: '1',
				  label: '无法处理'
				}, {
				  value: '2',
				  label: '已处理'
				}],
				isManage:false,
				showPicture:false,
				showLoading:false,
				currentPicture:'',
				id:null
			}
		},
		onLoad(option){
			this.id = option.id
			this.isManage = option.isManage=='true'?true:false
			this.getdetail(this.id);
		},
		methods: {
			// 获取详情
			getdetail: function (id) {
			 //  var that = this;
			 //  $.ajax({
				// url: url + 'app/wyownersservicerepair/info/' + id,
				// type: 'POST',
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0) {
				// 	that.list = res.data;
				// 	that.submitForm.id = res.data.id;
				// 	that.list.images = JSON.parse(res.data.images);
				// 	if (info) {
				// 	  that.getEmployee(employeeId);
				// 	}
				//   }
				// },
			 //  })
			},
			getEmployee: function (id) {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/zhsquser/info/' + id,
				// type: 'POST',
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	var name = res.zhsqUser.name;
				// 	that.submitForm.assignUserId = res.zhsqUser.id;
				// 	//  var deptName = '';
				// 	//  for(var i=0;i<that.deptList.length;i++){
				// 	//    if(that.deptList[i].deptId==res.zhsqUser.deptId){
				// 	//      deptName = that.deptList[i].name;
				// 	//    }
				// 	//  }
				// 	if (that.list.state == 0) {
				// 	  //  deptName+'——'+
				// 	  that.submitForm.person = name;
				// 	} else {
				// 	  that.list.person = name;
				// 	}
				// 	that.changeValue();
				//   }
				// }
			 //  })
			},
			viewHandle:function(item){
				this.currentPicture=item
				this.showPicture=true
			},
			callHandle:function(mobile){
				var that = this
				if(!mobile){
					return false;
				}
				uni.makePhoneCall({
					phoneNumber: mobile, 
					success: (res) => {
						console.log('调用成功!')	
					},
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			changeStatus:function(e){
				if(this.isManage){				
					this.submitForm.stateName = e[0].label;
					this.submitForm.state=e[0].value;
				}else{
					this.submitForm.handleStateName = e[0].label;
					this.submitForm.handleState=e[0].value;
				}
				this.showStatus=false
				this.changeValue()
			},
			changeValue: function () {
				if (this.isManage) {
					if (this.submitForm.stateName == '已受理' && this.submitForm.person !== '请选择服务负责人' && this.submitForm.content !== '') {
						this.canSubmit = true;
					} else if ((this.submitForm.stateName == '无法处理' || this.submitForm.stateName == '已完成') && this.submitForm.content !== '') {
						this.canSubmit = true;
					}
				} else {
					if (this.submitForm.handleStateName !== '请选择状态' && this.submitForm.serviceContent !== '') {
						this.canSubmit = true;
					}
				}
			},
			//  提交信息
			submitHandle: function () {
				if (!this.canSubmit) {
					return false;
				} else {
					var that = this;
					that.showLoading = true;
				// $.ajax({
				//   url: url + 'app/wyownersservicerepair/update',
				//   type: 'POST',
				//   data: JSON.stringify(that.submitForm),
				//   success: function (res) {
				// 	deal(res);
				// 	if (res.code == 0) {
				// 	  vant.Toast({
				// 		message: '操作成功！',
				// 		icon: '../image/success.png'
				// 	  })
				// 	  setTimeout(function () {
				// 		that.showZZ = false;
				// 		that.routerTo();
				// 	  }, 1000)
				// 	} else {
				// 	  that.showZZ = false;
				// 	  vant.Toast({
				// 		message: res.msg,
				// 		icon: '../image/error.png'
				// 	  })
				// 	}
				//   },
				//   error: function (err) {
				// 	that.showZZ = false;
				//   }
				// })
				}
			},
		}
	}
</script>

<style>

</style>
