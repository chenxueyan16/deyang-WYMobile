<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" :title="title" :border-bottom="false"></u-navbar>
		<view class="section2 cameraBlock_img">
			<u-upload :action="action" :file-list="fileList" @on-success="successHandle" @on-error="errorHandle" @on-remove="removeHandle" max-count="1" width="320" :custom-btn="true" style="margin:0 auto;">
				<image slot="addBtn" src="/static/pic_empty.png" class="photo"></image>
			</u-upload>
		</view>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="姓名" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.name" :clearable="false" input-align="right" placeholder="请输入姓名" maxlength="15" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="证件类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.documentType" type="select" input-align="right" @click="showCard=true" />
				</u-form-item>
				<u-form-item label="证件号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.idNumber" :clearable="false" placeholder="请输入证件号" input-align="right" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="民族" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.nationName" type="select" input-align="right" @click="showNation=true;"/>
				</u-form-item>
				<u-form-item label="手机号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.mobile" :clearable="false" placeholder="请输入手机号" input-align="right" @input="changeValue"/>
				</u-form-item>
				<u-form-item v-for="(item, index) in roleList" :key="index" :label="item.roleName" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-switch slot="right" v-model="submitForm.isManage" size="40" @change="changeValue"></u-switch>
				</u-form-item>		
			</u-form>
			<u-select v-model="showCard" :list="cardList" @confirm="confirmCard"></u-select>
			<u-select v-model="showNation" :list="nationList" @confirm="confirmNation"></u-select>
		</view>
		<div class="form_title" style="border-top:10px solid #F5F5F5">所属部门</div>
		<view class="formStyle">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="部门" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.deptList" type="select" input-align="right" placeholder="请选择所属部门" @click="showDept=true"/>
				</u-form-item>
			</u-form>
			<u-popup v-model="showDept" mode="bottom">
				<view style="font-size:15px;color:#295BFD;padding:8px 16px;">{{menu}}</view>
				<view style="padding:8px 16px;" v-if="deptTab">
					<u-tag v-for="(item,index) in deptTab" :key="index" :text="item" bg-color="#EFF0F7" color="#4F5D73" border-color="#EFF0F7" size="mini"/>
				</view>
				<u-empty v-if="list.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
				<view v-if="list.length>0" v-for="(item,index) in list" :key="index">
					<u-cell-item :title="item.name" :arrow="(item.list!==undefined)&&(item.list!==[])&&item.list.length!==0" @click="toChildren(item)"></u-cell-item>
				</view>
			</u-popup>
		</view>
		<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:35px;margin-bottom:20px;" @click="submitHandle">提交</view>
	    <view id="wt-model" v-if="showLoading">
	    	<u-loading mode="flower" size="46"></u-loading>
	    	<view style="color:#fff;margin-top: 16px;">
	    		提交中...
	    	</view>
	    </view>
	</view>
</template>

<script>
	import {url,request} from '../../common/config.js'
	export default {
		data() {
			return {
				title:'新增人员',
				menu: '组织机构 ',
				action: url + 'images/photoupload',
				fileList: [],
				showCard:false,
				showNation:false,
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
				submitForm:{
					name: '',
					documentType: '身份证',
					idNumber: '',
					mobile: '',
					nationName: '汉族',
					deptList: '',
					nationId: 1,
					deptIdList: [],
					roleIdList: [],
					headPortraitUrl: '',
				},
				roleList:[{
					roleName:'一级管理员'
				}],showDept:false,
				deptTab:['部门1'],
				list:[{
					name: "赏识在于角度的转换",
					list:[{}]
				},{
					name: "生活中不是缺少美，",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				},{
					name: "周围一些不起眼的",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
				canSubmit: false,
				showLoading:false,
				id:null,
			}
		},
		onLoad(option){
			this.id = option.id
			this.getNations();
			if (this.id == 0) {
				this.getRole([]);
			} else {
				this.getInfo();
			}
			this.title = id == 0 ? '新增人员' : '信息编辑';
		},
		methods: {
			getNations:function(){
				var that = this;
				this.$request('mp/mpcommonnation/list',JSON.stringify({ limit: 60 })).then(res=>{
					that.nationList = res.page.list
					that.nationList.map(item=>{
						item.label=item.nation
						item.value=item.id
					})
				})
			},
			getInfo: function () {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/wy/one',
				// type: 'POST',
				// data: JSON.stringify({ id: id }),
				// success: function (res) {
				//   deal(res);
				//   var deptList = [];
				//   var deptIdList = [];
				//   if (res.code === 0) {
				// 	that.submitForm = res.data;
				// 	res.data.deptList.map(function (item) {
				// 	  deptList.push(item.name);
				// 	  deptIdList.push(item.deptId);
				// 	})
				// 	that.submitForm.deptList = deptList.join(",");
				// 	that.submitForm.deptIdList = deptIdList;
				// 	that.getRole(res.data.roleList);
				// 	that.changeValue();
				//   }
				// }
			 //  })
			},
			getRole: function (list) {
			  var that = this;
	// 		  $.ajax({
	// 			url: url + 'app/wy/selectRole',
	// 			type: 'POST',
	// 			success: function (res) {
	// 			  deal(res);
	// 			  if (res.code === 0) {
	// 				that.roleList = res.data;
	// 				if (!info && id !== 0) {
	// 				  that.submitForm.roleIdList = [];
	// 				  if (list !== []) {
	// 					list.map(function (item) {
	// 					  that.submitForm.roleIdList.push(item.roleId);
	// 					})
	// 				  }
	// 				}
	
	// 			  }
	// 			}
			  // })
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
				console.log(res)
				console('上传失败')
			},
			confirmCard:function(e){
				this.submitForm.documentType = e[0].label;
				this.showCard=false
				this.changeValue()
			},
			confirmNation:function(e){
				this.submitForm.nationName = e[0].label;
				this.submitForm.nationId=e[0].value;
				this.showNation=false
				this.changeValue()
			},
			changeValue: function () {
				var length = this.submitForm.roleIdList ? this.submitForm.roleIdList.length : 0;
				if (this.submitForm.name !== '' && this.submitForm.idNumber !== '' && this.submitForm.deptList !== '' && length !== 0 && this.submitForm.mobile !== '' && this.submitForm.headPortraitUrl !== '../image/pic_empty.png') {
					this.canSubmit = true;
				} else {
					this.canSubmit = false;
				}
			},
			submitHandle: function () {
				if (!this.canSubmit) {
					return false;
				} else {
					var phone = /^1(3|4|5|7|8|9)\d{9}$/;
					var number = /^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9Xx]$/;
				// this.submitForm.mobile = this.submitForm.mobile.replace(/\s+/g, "");
				// this.submitForm.idNumber = this.submitForm.idNumber.replace(/\s+/g, "");
					if (!phone.test(this.submitForm.mobile)) {
					  vant.Toast({
						message: '手机号格式错误！',
						icon: '../image/warn.png'
					  })
						return false;
					}
					if (this.submitForm.documentType == '身份证') {
						if (!number.test(this.submitForm.idNumber) || this.submitForm.idNumber.length !== 18) {
							vant.Toast({
							  message: '身份证格式错误！',
							  icon: '../image/warn.png'
							})
							return false;
						}
					}
					if (id == 0) {
						this.addHandle();
					} else {
						this.modHandle();
					}
				}
			},
			addHandle: function () {
				var that = this;
				that.showLoading = true;
			          // $.ajax({
			          //   url: url + 'app/wy/add',
			          //   type: 'POST',
			          //   data: JSON.stringify({
			          //     headPortraitUrl: that.submitForm.headPortraitUrl,
			          //     name: that.submitForm.name,
			          //     documentType: that.submitForm.documentType,
			          //     idNumber: that.submitForm.idNumber,
			          //     nationId: that.submitForm.nationId,
			          //     nationName: that.submitForm.nationName,
			          //     mobile: that.submitForm.mobile,
			          //     roleIdList: that.submitForm.roleIdList,
			          //     deptIdList: that.submitForm.deptIdList
			          //   }),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code == 0) {
			          //       that.showZZ = false;
			          //       vant.Toast({
			          //         message: '操作成功！',
			          //         icon: '../image/success.png'
			          //       })
			          //       setTimeout(function () {
			          //         location.href = './employee.html?edit=1';
			          //       }, 1000)
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
			modHandle: function () {
				var that = this;
				that.showLoading = true;
			          // $.ajax({
			          //   url: url + 'app/wy/mod',
			          //   type: 'POST',
			          //   data: JSON.stringify({
			          //     id: id,
			          //     headPortraitUrl: that.submitForm.headPortraitUrl,
			          //     name: that.submitForm.name,
			          //     documentType: that.submitForm.documentType,
			          //     idNumber: that.submitForm.idNumber,
			          //     nationId: that.submitForm.nationId,
			          //     nationName: that.submitForm.nationName,
			          //     mobile: that.submitForm.mobile,
			          //     roleIdList: that.submitForm.roleIdList,
			          //     deptIdList: that.submitForm.deptIdList
			          //   }),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code == 0) {
			          //       that.showZZ = false;
			          //       vant.Toast({
			          //         message: '操作成功！',
			          //         icon: '../image/success.png'
			          //       })
			          //       setTimeout(function () {
			          //         location.href = './employee_detail.html?id=' + id;
			          //       }, 1000)
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
		}
	}
</script>

<style>

</style>
