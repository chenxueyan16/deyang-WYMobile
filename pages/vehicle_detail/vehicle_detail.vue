<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" :title="name" :border-bottom="false"></u-navbar>
		<div class="form_title">信息登记</div>
		<view class="formStyle" style="background-color: #fff;">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="所属小区" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.deptName" :clearable="false" input-align="right" disabled/>
				</u-form-item>
				<u-form-item v-if="type=='vehicle'" label="车牌号码" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input type="textarea" :clearable="false" :height="20" :auto-height="true" v-model="submitForm.carPlate" input-align="right" placeholder="多个车牌号可逗号分隔" @input="changeValue"/>
				</u-form-item>
				<u-form-item v-if="type=='vehicle'" label="车位号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input type="textarea" :clearable="false" :height="20" :auto-height="true" v-model="submitForm.placeCode" input-align="right" @input="changeValue"/>
				</u-form-item>
				<u-form-item v-if="type=='nonvehicle'" label="RFID" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input type="textarea" :clearable="false" :height="20" :auto-height="true" v-model="submitForm.rfid" input-align="right" placeholder="多个rfid可逗号分隔" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="车主姓名" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.username" :clearable="false" input-align="right" placeholder="请输入姓名" maxlength="15" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="人员类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.userTypeName" type="select" input-align="right" @click="showType=true;"/>
				</u-form-item>
				<u-form-item label="手机号" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.mobile" :clearable="false" placeholder="请输入手机号" input-align="right" @input="changeValue"/>
				</u-form-item>
				<u-form-item label="房屋信息" v-if="!showSelect" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="submitForm.houseInfo" :clearable="false" input-align="right" placeholder="请输入房屋信息" @input="changeValue" @click="showSelect=true"/>
				</u-form-item>
			</u-form>
			<u-select v-model="showType" :list="typeList" @confirm="confirmType"></u-select>
		</view>
		<div class="form_title" v-if="showSelect" style="margin-top:10px;border-top:10px solid #f5f5f5;">楼宇信息</div>
		<view class="formStyle" style="background-color: #fff;">
			<u-form ref="uForm" label-width="auto" v-if="showSelect" >
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
		<view :class="[canSubmit?'btnActive':'btnNormal','linerbtn']" style="margin-top:35px;margin-bottom:20px;" @click="submitHandle">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				type:'',
				id:null,
				submitForm:{
					deptName:'左岸春天',
					  deptId: null,
					  carPlate: '',
					  placeCode: '',
					  rfid: '',
					  userName: '',
					  userType: 0,
					  userTypeName: '业主',
					  userPhone: '',
					  houseInfo: '',
					  buildId: '',
					  unitId: '',
					  floorId: '',
					  roomId: null
				},
				showSelect:false,
				showType:false,
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
				canSubmit: false,
				showLoading:false,
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
			}
		},
		onLoad(option){
			this.id = option.id
			this.type = option.type
			this.name = this.id == '0' ? '新增' : '详情';
			if (this.id !== '0') {
				this.submitForm = JSON.parse(option.data);
				this.changeValue();
			} else {
				this.showSelect = true;
			}
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.submitForm.deptName = res
				}
			})
			uni.getStorage({
				key: 'deptId',
				success: function (res) {
					this.submitForm.deptId = res
				}
			})
			this.selectBuilding({ parent_id: this.submitForm.deptId });
		},
		methods: {
			confirmType:function(e){
				this.submitForm.userTypeName = e[0].label;
				this.submitForm.userType =  e[0].value;
				this.showType =false
				this.changeValue()
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
			changeValue: function () {
				if (this.type == 'vehicle') {
					if (this.submitForm.carPlate !== '' && this.submitForm.plateCode !== '' && this.submitForm.userName !== '' && this.submitForm.userPhone !== '' && this.submitForm.houseInfo !== '') {
						this.canSubmit = true;
					} else {
						this.canSubmit = false;
					}
				} else {
					if (this.submitForm.rfid !== '' && this.submitForm.userName !== '' && this.submitForm.userPhone !== '' && this.submitForm.houseInfo !== '') {
						this.canSubmit = true;
					} else {
						this.canSubmit = false;
					}
				}
			},
			submitHandle: function () {
			    if (!this.canSubmit) {
			        return false;
			    } else {
			        var phone = /^1(3|4|5|7|8)\d{9}$/;
			            // this.submitForm.userPhone = this.submitForm.userPhone.replace(/\s+/g,"");
					if (!phone.test(this.submitForm.userPhone)) {
						vant.Toast({
							message: '手机号格式错误！',
							icon: '../image/warn.png'
						})
						return false;
					}
					if (this.type == 'vehicle') {
						if (this.id==0) {
							this.addHandle(1);
						} else {
							this.updateHandle(1)
						}
					} else {
						if (this.id==0) {
							this.addHandle(2); 
						} else {
							this.updateHandle(2)
						}
					}
			    }
			},
			addHandle: function (carType) {
				var that = this;
				that.showLoading = true;
			          // $.ajax({
			          //   url: url + 'app/usercar/add',
			          //   type: 'POST',
			          //   data: JSON.stringify(Object.assign({ carType: carType }, that.submitForm)),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code == 0) {
			          //       vant.Toast({
			          //         icon: '../image/success.png',
			          //         message: '操作成功！'
			          //       })
			          //       setTimeout(function () {
			          //         that.showZZ = false;
			          //         that.routerTo();
			          //       }, 1000)
			          //     } else {
			          //       vant.Toast({
			          //         icon: '../image/error.png',
			          //         message: res.msg
			          //       })
			          //     }
			          //   },
			          //   error: function (err) {
			          //     that.showZZ = false;
			          //   }
			          // })
			},
			updateHandle: function (carType) {
				var that = this;
				that.showLoading = true;
			 //  $.ajax({
				// url: url + 'app/usercar/update',
				// type: 'POST',
				// data: JSON.stringify(Object.assign({ carType: carType }, that.submitForm)),
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0) {
				// 	vant.Toast({
				// 	  icon: '../image/success.png',
				// 	  message: '操作成功！'
				// 	})
				// 	setTimeout(function () {
				// 	  that.showZZ = false;
				// 	  that.routerTo();
				// 	}, 1000)
				//   } else {
				// 	vant.Toast({
				// 	  icon: '../image/error.png',
				// 	  message: res.msg
				// 	})
				//   }
				// },
				// error: function (err) {
				//   that.showZZ = false;
				// }
			 //  })
			},
		}
	}
</script>

<style>

</style>
