<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" :title="title" :border-bottom="false"></u-navbar>
		<view class="formStyle" style="background-color: #fff;">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="输入车牌" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.plateCode" :clearable="false" @input="changeValue" input-align="right" placeholder="请输入车牌"/>
				</u-form-item>
				<u-form-item label="入场时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.inDate" type="select" input-align="right" @click="showTime=true" />
				</u-form-item>			
			</u-form>
			<u-calendar v-model="showTime" mode="date" :max-date="maxDate" @change="confirmHandle"></u-calendar>
		</view>
		<view class="form_title" style="border-top:10px solid #f5f5f5;">进口选择</view>
		<view class="clearfix" style="margin:0 16px">
			<view class="fl" v-for="item in buttons" v-if="item.gatewayState==0" :class="[selectGatewayName==item.gatewayName?'buttonGroup_active':'buttonGroup_normal','buttonGroup']" @click="selectHandle(item)">
				<image :src="selectGatewayName==item.gatewayName?'/static/outselect.png':'/static/outnormal.png'" style="width:18px;height: 16px;" />{{item.gatewayName}}
			</view>
			<view v-for="item in buttons" v-if="item.gatewayState==1" class="buttonGroup buttonGroup_offline fl">
				<image src="/static/outerror.png" style="width:18px;height: 16px;" />{{item.gatewayName}}
			</view>
			<view v-for="item in buttons" v-if="item.gatewayState==2" class="buttonGroup buttonGroup_error fl">
				<image src="/static/outnormal.png" style="width:18px;height: 16px;" />{{item.gatewayName}}
			</view>
		</view>
		<view style="padding:0px 16px;margin-top: 20px;">
			<u-upload :action="action" :file-list="fileList" @on-success="successHandle" @on-error="errorHandle" @on-remove="removeHandle" max-count="6" :width="180" :custom-btn="true" style="margin:0 auto;">
				<image slot="addBtn" src="/static/parking_pic.png" style="width: 90px;height: 120px;"></image>
			</u-upload>
		</view>
		<!-- 入场登记 -->
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="300px">
			<view class="dialogBlock_title" style="font-weight: bold;">{{submitForm.plateCode}}</view>
			<view style="margin:0 16px;text-align: center;margin-bottom: 20px;">入场时间：{{submitForm.inDate}}</view>
			<view class="buttonGroup buttonGroup_active" style="float:none;margin: 0 auto;width:90%;" @click="upHandle">发送抬杆指令</view>
			<view class="clearfix dialogBlock_btnGroup" style="margin-top:20px;">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="cancelHandle">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="saveHandle">确定</view>
			</view>
		</u-popup>
		<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:35px;margin-bottom:20px;" @click="submitHandle">入场登记</view>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import {url,request} from '../../common/config.js'
	export default {
		data() {
			return {
				title:'',
				submitForm:{},
				showTime:false,
				maxDate: moment().format('YYYY-MM-DD'),
				buttons:[
					{gatewayName:'出口',gatewayState:0},
					{gatewayName:'出口3',gatewayState:0},
					{gatewayName:'出口1',gatewayState:1},
					{gatewayName:'出口2',gatewayState:2}
				],//出入口
				selectGatewayName:'出口',
				selectGatewayId:null,
				showLoading:false,
				canSubmit:false,
				showDialog:false,
				action: url + 'images/photoupload',
				fileList:[]
			}
		},
		onLoad(option){
			this.title = option.name
			this.outHandle();
		},
		methods: {
			// 获取出入口
			outHandle: function () {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/park/parkgatewayinfo/list',
				// type: 'POST',
				// data: JSON.stringify({ parkId: id, isInOut: 0 }),
				// success: function (res) {
				//   if (res.code == 0) {
				// 	that.buttons = res.data.list;
				//   }
				// }
			 //  })
			},
			confirmHandle:function(e){
				this.submitForm.inDate = e.result;
				this.changeValue()
			},
			selectHandle: function (item) {
				this.selectGatewayName = item.gatewayName;
				this.selectGatewayId = item.id;
				this.changeValue()
			},
			successHandle:function(data, index, lists, name){
				this.fileList = lists
				this.changeValue();
			},
			removeHandle:function(index, lists, name){
				this.fileList = lists
				this.changeValue();
			},
			errorHandle:function(res, index, lists, name){
				console.log(res)
				console('上传失败')
			},
			changeValue: function () {
				console.log(this.submitForm)
				if (this.submitForm.inDate && this.submitForm.plateCode && this.selectGatewayName && this.fileList.length > 0) {
					this.canSubmit = true;
				} else {
					this.canSubmit = false;
				}
			},
			submitHandle:function(){
				if (!this.canSubmit) {
					return false;
				} else {
					this.showDialog = true;
					this.submitForm.inPhotoUrl = this.fileList.filter((item) => item.img).map((item) => item.img).join()
			    }
			},
			// 发送抬杆指令
			upHandle: function () {
				var that = this;
				that.showLoading = true;
			 //  $.ajax({
				// url: url + 'app/park/parkinoutrecord/sendInOpenDoorCommond',
				// type: 'POST',
				// data: JSON.stringify({ parkId: id, inGatewayId: that.submitForm.inGatewayId }),
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0) {
				// 	that.canConfirm = true;
				// 	vant.Toast({
				// 	  icon: '../image/success.png',
				// 	  message: '发送成功'
				// 	})
				// 	that.showZZ = false;
				//   } else {
				// 	vant.Toast({
				// 	  icon: '../image/error.png',
				// 	  message: res.msg
				// 	})
				// 	that.showZZ = false;
				//   }
				// },
				// error: function (err) {
				//   that.showZZ = false;
				// }
			 //  })
			},
			// 保存入场时间
			saveHandle: function () {
				if (!this.canConfirm) {
					return false;
				}
				var that = this;
			    that.showLoading = true;
		// 	  $.ajax({
		// 		url: url + 'app/park/parkinoutrecord/save',
		// 		type: 'POST',
		// 		data: JSON.stringify(Object.assign({ parkId: id }, that.submitForm)),
		// 		success: function (res) {
		// 		  deal(res);
		// 		  if (res.code == 0) {
		// 			that.show = false;
		// 			that.submitForm = that.init();
		// 			vant.Toast({
		// 			  icon: '../image/success.png',
		// 			  message: '手工入场成功！'
		// 			})
		// 			that.showZZ = false;
		// 			that.camera1 = false;
		// 			that.camera2 = false;
		// 			that.camera3 = false;
		// 			that.camera4 = false;
		// 			that.camera5 = false;
		// 			that.camera6 = false;
		// 		  } else {
		// 			vant.Toast({
		// 			  icon: '../image/error.png',
		// 			  message: res.msg
		// 			})
		// 			that.showZZ = false;
		// 		  }
		// 		},
		// 		error: function (err) {
		// 		  that.showZZ = false;
		// 		}
		// 	  })
			},
		}
	}
</script>

<style>

</style>
