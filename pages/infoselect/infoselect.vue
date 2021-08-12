<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="信息采集" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{submitForm.deptName}}</text>
			</view>
		</view>
		<div class="form_title">信息登记</div>
		<view class="formStyle" style="background-color: #fff;">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="所属小区" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.deptName" :clearable="false" input-align="right" disabled/>
				</u-form-item>
				<u-form-item label="姓名" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.username" :clearable="false" input-align="right" placeholder="请输入姓名" maxlength="15" @input="changeValue"/>
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
				<view class="clearfix">
					<u-form-item class="fl" :border-bottom="false">
						<u-input v-model="submitForm.mobileChannelName" type="select" @click="showRadio=true"/>
					</u-form-item>
					<u-form-item class="fr" :border-bottom="false">
						<u-input v-model="submitForm.mobile" :clearable="false" placeholder="请输入手机号" input-align="right" @input="changeValue"/>
					</u-form-item>
				</view>
				<u-form-item label="人员类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.type" type="select" input-align="right" @click="showType=true;"/>
				</u-form-item>
				<u-form-item label="单位信息" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.unitInformation" :clearable="false" input-align="right" placeholder="请输入单位信息" maxlength="15" @input="changeValue"/>
				</u-form-item>
				<u-form-item v-if="submitForm.roleType == 711 || submitForm.roleType == 712||submitForm.roleType == 721||submitForm.roleType == 722" label="拜访时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.time" type="select" input-align="right" @click="showTime1=true" />
				</u-form-item>
				<u-form-item v-if="submitForm.roleType !== 711 && submitForm.roleType !== 712 && submitForm.roleType !== 721 && submitForm.roleType !== 722" label="是否管理员" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-switch slot="right" v-model="submitForm.isManage" size="40"></u-switch>
				</u-form-item>
			</u-form>
			<u-select v-model="showCard" :list="cardList" @confirm="confirmCard"></u-select>
			<u-select v-model="showNation" :list="nationList" @confirm="confirmNation"></u-select>
			<u-select v-model="showRadio" :list="radioList" @confirm="confirmRadio"></u-select>
			<u-select v-model="showType" :list="typeList" @confirm="confirmType"></u-select>
			<u-calendar v-model="showTime1" mode="range" @change="changeTime"></u-calendar>
		</view>
		<div class="form_title" v-if="!(submitForm.roleType==721||submitForm.roleType==722)" style="border-top:10px solid #F5F5F5">楼宇信息</div>
		<view class="formStyle" style="background-color: #fff;">
			<u-form ref="uForm" label-width="auto" v-if="!(submitForm.roleType==721||submitForm.roleType==722)" >
				<u-form-item v-if="canShowArea" label="区号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="area" type="select" input-align="right" @click="showArea=true"/>
				</u-form-item>
				<u-form-item v-if="canShowBuild" label="楼号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="build" type="select" input-align="right" @click="showBuild=true"/>
				</u-form-item>
				<u-form-item v-if="canShowUnit" label="单元" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="unit" type="select" input-align="right" @click="showUnit=true"/>
				</u-form-item>
				<u-form-item v-if="canShowFloor" label="楼层" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="floor" type="select" input-align="right" @click="showFloor=true"/>
				</u-form-item>
				<u-form-item v-if="canShowRoom" label="房号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="room" type="select" input-align="right" @click="showRoom=true"/>
				</u-form-item>
			</u-form>
			<u-select v-model="showArea" :list="areas" @confirm="changeBuild(item,'area')"></u-select>
			<u-select v-model="showBuild" :list="builds" @confirm="changeBuild(item,'build')"></u-select>
			<u-select v-model="showUnit" :list="units" @confirm="changeBuild(item,'unit')"></u-select>
			<u-select v-model="showFloor" :list="floors" @confirm="changeBuild(item,'floor')"></u-select>
			<u-select v-model="showRoom" :list="rooms" @confirm="changeBuild(item,'room')"></u-select>
		</view>
		<view class="section2 cameraBlock_img">
			<u-upload :action="action" :file-list="fileList" @on-success="successHandle" @on-error="errorHandle" @on-remove="removeHandle" max-count="1" :width="280" :custom-btn="true" style="margin:0 auto;">
				<image slot="addBtn" src="/static/pic_empty.png" class="photo"></image>
			</u-upload>
		</view>
		<view class="imgDescription" style="margin-top: 16px;">请拍一张清晰的正面照</view>
		<view class="imgDescription">以便通过刷脸进入社区</view>
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
				showArea: false,
				canShowArea: false,
				showBuild: false,
				canShowBuild: false,
				showUnit: false,
				canShowUnit: false,
				showFloor: false,
				canShowFloor: false,
				showRoom: false,
				canShowRoom: false,
				showCard: false,
				showType: false,
				showNation: false,
				canSubmit: false,
				// minDate: new Date(),
				// currentDate: new Date(),
				// currentDate2: new Date(),
				submitForm: {
					deptName: '',
					deptId: null,
					mobileChannel: 0,//注册方式
					mobileChannelName: '本人手机号',//注册方式
					areaNumber: '',
					username: '',
					documentType: '身份证',
					type: '业主',
					idNumber: '',
					isManage: false,
					mobile: '',
					roleType: 510,
					nationName: '汉族',
					nationId: 1,
					headPortraitUrl: '../image/pic_empty.png',
					time: '',
					startTime: '',
					endTime: '',
					roomId: null
				},
				action: url + 'images/photoupload',
				fileList: [],
				build: '',
				unit: '',
				floor: '',
				room: '',
				area: '',
				areas: [],
				builds: [],
				units: [],
				floors: [],
				rooms: [],
				showLoading: false,
				show: false,
				showTime1: false,
				// showTime2: false,
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
				showRadio: false,//注册方式
				radioList: [{ //注册方式
					value: 0,
					label: '本人手机号'
				}, {
					value: 1,
					label: '非本人手机号'
				}],
				typeList: [{
					value: 510,
					label: '业主',
				}, {
					value: 511,
					label: '业主夫妻'
				}, {
					value: 512,
					label: '业主子女'
				}, {
					value: 513,
					label: '业主父母'
				}, {
					value: 514,
					label: '业主亲属'
				}, {
					value: 515,
					label: '业主朋友'
				}, {
					value: 520,
					label: '租客'
				}, {
					value: 521,
					label: '租客夫妻'
				}, {
					value: 522,
					label: '租客子女'
				}, {
					value: 523,
					label: '租客父母'
				}, {
					value: 524,
					label: '租客亲属'
				}, {
					value: 525,
					label: '租客朋友'
				}, {
					value: 711,
					label: '亲友访客'
				}, {
					value: 712,
					label: '公务访客'
				}, {
					value: 721,
					label: '外卖'
				}, {
					value: 722,
					label: '快递'
				}],
				nationList: []
			}
		},
		onLoad(){
			var that = this
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					that.submitForm.deptName = res.data
				}
			})
			uni.getStorage({
				key: 'deptId',
				success: function (res) {
					that.submitForm.deptId = res.data
				}
			})
			this.getNations()
			this.selectBuilding({ parent_id: this.submitForm.deptId });
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
			selectBuilding: function (param) {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/zhsqdept/list',
				// type: 'POST',
				// data: JSON.stringify(param),
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0 && res.data) {
				// 	if (res.data[0].typeCode == 'area') {
				// 	  that.areas = res.data;
				// 	  that.showArea = false;
				// 	  that.canShowArea = true;
				// 	} else if (res.data[0].typeCode == 'building') {
				// 	  that.buildings = res.data;
				// 	  that.showBuild = false;
				// 	  that.canShowBuild = true;
				// 	} else if (res.data[0].typeCode == 'unit') {
				// 	  that.units = res.data;
				// 	  that.showUnit = false;
				// 	  that.canShowUnit = true;
				// 	} else if (res.data[0].typeCode == 'storey') {
				// 	  that.floors = res.data;
				// 	  that.showFloor = false;
				// 	  that.canShowFloor = true;
				// 	} else {
				// 	  that.rooms = res.data;
				// 	  that.showRooms = false;
				// 	  that.canShowRoom = true;
				// 	}
				//   }
				// }
			 //  })
			},
			changeBuild: function (item, name) {
				if (name === 'area') {
					this.area = item.name;
					this.build = '';
					this.unit = '';
					this.floor = '';
					this.room = '';
					this.showArea = false;
					this.canShowBuild = false;
					this.canShowUnit = false;
					this.canShowFloor = false;
					this.canShowRoom = false;
					this.submitForm.roomId = null;
					this.selectBuilding({ parent_id: item.deptId });
				} else if (name === 'build') {
					this.build = item.name;
					this.unit = '';
					this.floor = '';
					this.room = '';
					this.showBuild = false;
					this.canShowUnit = false;
					this.canShowFloor = false;
					this.canShowRoom = false;
					this.submitForm.roomId = null;
					this.selectBuilding({ parent_id: item.deptId });
				} else if (name === 'unit') {
					this.unit = item.name;
					this.floor = '';
					this.room = '';
					this.showUnit = false;
					this.canShowFloor = false;
					this.canShowRoom = false;
					this.submitForm.roomId = null;
					this.selectBuilding({ parent_id: item.deptId });
				} else if (name === 'floor') {
					this.floor = item.name;
					this.room = '';
					this.showFloor = false;
					this.canShowRoom = false;
					this.submitForm.roomId = null;
					this.selectBuilding({ parent_id: item.deptId });
				} else {
					this.room = item.name;
					this.showRoom = false;
					this.submitForm.roomId = item.deptId;
				}
				this.changeValue();
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
			confirmRadio:function(e){
				this.submitForm.mobileChannelName = e[0].label;
				this.submitForm.mobileChannel = e[0].value
				this.showRadio =false
				this.changeValue()
			},
			confirmType:function(e){
				this.submitForm.type = e[0].label;
				this.submitForm.roleType = e[0].value;
				this.showType =false
				this.changeValue()
			},
			changeTime:function(e){
				// this.submitForm.endTime = moment(value).format('YYYY-MM-DD HH:mm');
				  // this.submitForm.endTime += '00:00';
				this.submitForm.startTime = e.startDate +' 00:00'
				this.submitForm.endTime = e.endDate + ' 00:00'
				this.submitForm.time = this.submitForm.startTime + ' 至 ' + this.submitForm.endTime;
				this.showTime1 = false;
				this.changeValue();
			},
			changeValue: function () {
				if (this.submitForm.username !== '' && this.submitForm.idNumber !== '' && this.submitForm.mobile !== '' && this.submitForm.headPortraitUrl !== '../image/pic_empty.png') {
					if (this.submitForm.roleType == 711 || this.submitForm.roleType == 712 || this.submitForm.roleType == 721 || this.submitForm.roleType == 722) {
					    // 亲友公务访客
						if (this.submitForm.roleType == 711 || this.submitForm.roleType == 712) {
							if (this.submitForm.startTime !== '' && this.submitForm.endTime !== '' && this.submitForm.roomId) {
								this.canSubmit = true
							} else {
								this.canSubmit = false;
							}
							// 快递外卖
						} else {
							if (this.submitForm.startTime !== '' && this.submitForm.endTime !== '') {
								this.canSubmit = true
							} else {
								this.canSubmit = false;
							}
						}
					} else {
						this.canSubmit = this.submitForm.roomId ? true : false;
					}
			            // if (this.submitForm.roleType == 721 || this.submitForm.roleType == 722) {
			            //   this.canSubmit = true;
			            // } else if (this.submitForm.roleType == 711 || this.submitForm.roleType == 712) {
			            //   if (this.submitForm.startTime !== '' && this.submitForm.endTime !== '') {
			            //     this.canSubmit = true
			            //   } else {
			            //     this.canSubmit = false;
			            //   }
			            // } else {
			            //   this.canSubmit = this.submitForm.roomId ? true : false;
			            // }
			    } else {
			        this.canSubmit = false;
			    }
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
			submitHandle: function () {
			    if (!this.canSubmit) {
			        return false;
			    } else {
			        var phone = /^1(3|4|5|7|8|9)\d{9}$/;
			        var number = /^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9Xx]$/;
			            // this.submitForm.mobile = this.submitForm.mobile.replace(/\s+/g, "");
			            // this.submitForm.idNumber = this.submitForm.idNumber.replace(/\s+/g, "");
			        if (!phone.test(this.submitForm.mobile)) {
			            // vant.Toast({
			            //     message: '手机号格式错误！',
			            //     icon: '../image/warn.png'
			            // })
			            return false;
			        }
			        if (this.submitForm.documentType == '身份证') {
			            if (!number.test(this.submitForm.idNumber) || this.submitForm.idNumber.length !== 18) {
			                // vant.Toast({
			                //   message: '身份证格式错误！',
			                //   icon: '../image/warn.png'
			                // })
			                return false;
			            }
			        }
					var that = this;
					that.showZZ = true;
					// $.ajax({
					//   url: url + 'app/zhsquser/aliAuth/add',
					//   type: 'post',
					//   data: JSON.stringify(that.submitForm),
					//   success: function (res) {
					// 	deal(res);
					// 	if (res.code === 0) {
					// 	  that.addApplication(res.data.id);
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
			addApplication: function (ids) {
				var that = this;
				if (that.submitForm.roleType == 721 || that.submitForm.roleType == 722) {
					that.submitForm.roomId = that.submitForm.deptId;
				}
				if (that.submitForm.roleType == 711 || that.submitForm.roleType == 712 || that.submitForm.roleType == 721 || that.submitForm.roleType == 722) {
					that.submitForm.startTime = that.submitForm.startTime + ':00';
					that.submitForm.endTime = that.submitForm.endTime + ':00';
				}
			          // $.ajax({
			          //   url: url + 'app/zhsqpersonrecord/insertApplicantStatus',
			          //   type: 'post',
			          //   data: JSON.stringify({
			          //     applicantUserId: ids, // 用户ID
			          //     applicantDeptId: that.submitForm.roomId, // 房屋ID
			          //     roleType: that.submitForm.roleType,
			          //     deptId: that.submitForm.deptId, // 小区ID
			          //     community: that.submitForm.deptId,
			          //     isManage: that.submitForm.isManage == true ? 1 : 0,
			          //     startTime: that.submitForm.startTime,
			          //     endTime: that.submitForm.endTime,
			          //     mobileChannel: that.submitForm.mobileChannel,//注册
			          //     unitInformation: that.submitForm.unitInformation
			          //   }),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code === 0) {
			          //       vant.Toast({
			          //         message: '操作成功！',
			          //         icon: '../image/success.png'
			          //       })
			          //       setTimeout(function () {
			          //         that.showZZ = false;
			          //         that.routerTo();
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
