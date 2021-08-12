<template>
	<view>
		<view class="login_bg" style="height: 180px;">
			<u-navbar back-icon-name="arrow-leftward" :background="{'background':'transparent'}" back-icon-color="#fff" title="人员详情" title-color="#fff" :border-bottom="false"></u-navbar>
			<view style="margin:0px 15px" >
				<u-row gutter="16">
					<u-col span="3">
						<image class="user_img" :src="info.headPortraitUrl"></image>
					</u-col>
					<u-col span="9" class="infoBlock_text">
						<view>
							<text style="font-size:20px;margin-top:8px;color:#fff;width:auto;">{{info.name}}</text>
							<text class="tag" v-for="(item,index) in roleList" :key="index" style="margin-bottom:6px;">{{item.roleName}}</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="证件类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.documentType" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="证件号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.idNumber" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="民族" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.nationName" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="手机号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.mobile" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="部门" v-for="(item,index) in deptList" :key="index" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="item.name" disabled input-align="right"/>
				</u-form-item>
			</u-form>		
		</view>
		<view class="btnBlock clearfix" style="margin:30px 15px 20px 15px;">
			<view class="fl purebtn" style="color:#FF4F4D;border:1px solid #FF4F4D;" @click="showDialog=true">删除人员</view>
			<view class="fr purebtn btnConfirm" @click="editHandle">编辑</view>
		</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">是否删除？</view>
			<view class="clearfix dialogBlock_btnGroup">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="showDialog=false">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="deleteHandle">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					headPortraitUrl:'/static/pic_avator.png',
					name:'chen',
					
				},
				roleList:[{roleName:'diwe'}],
				deptList: [],
				id:null,
				showDialog:false,
			}
		},
		onLoad(option){
			this.id = option.id
			this.getInfo();
		},
		methods: {
			getInfo: function () {
			 //  var that = this;
			 //  $.ajax({
				// url: url + 'app/wy/one',
				// type: 'POST',
				// data: JSON.stringify({ id: id }),
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	that.info = res.data;
				// 	that.info.idNumber = that.info.idNumber ? that.info.idNumber.substr(0, 6) + '********' + that.info.idNumber.substr(14, 18) : '';
				// 	that.deptList = res.data.deptList;
				// 	that.roleList = res.data.roleList;
				//   }
				// }
			 //  })
			},
			editHandle: function () {
				uni.navigateTo({
				    url: '../employee_edit/employee_edit?id=' + this.id
				});
			},
			deleteHandle:function(){
				// $.ajax({
				//   url: url + 'app/wy/del',
				//   type: 'POST',
				//   data: JSON.stringify({ id: id }),
				//   success: function (res) {
				// 	deal(res);
				// 	if (res.code === 0) {
				// 	  vant.Toast({
				// 		message: '操作成功！',
				// 		icon: '../image/success.png'
				// 	  })
				// 	  setTimeout(function () {
				// 		that.routerTo();
				// 	  }, 1000)
				// 	} else {
				// 	  vant.Toast({
				// 		message: res.msg,
				// 		icon: '../image/error.png'
				// 	  })
				// 	}
				//   }
				// })
			},
			routerTo: function () {
				uni.navigateTo({
				    url: '../employee/employee?edit=1'
				});
			},
		}
	}
</script>

<style>
.user_img {
  height: 80px;
  width: 60px;
  border-radius: 30px;
}
.btnBlock {
  width: 90%;
  margin: 15px;
  position: fixed;
  bottom: 0;
}
</style>
