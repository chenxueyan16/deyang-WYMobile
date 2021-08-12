<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="小区管理" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="dropDown">
			<view class="fl dropDown_item" @click="showArea=true" style="width:20%">
				<text style="margin-right: 10px;" :style="{'color':canShowArea?'#41424F':'#999'}">{{area}}</text>
				<u-icon size="10px" :color="canShowBuild?'#41424F':'#999'" name="arrow-down-fill"></u-icon>
			</view>
			<view class="fl dropDown_item" @click="showBuild=true" style="width:20%">
				<text style="margin-right: 10px;" :style="{'color':canShowBuild?'#41424F':'#999'}">{{build}}</text>
				<u-icon size="10px" :color="canShowBuild?'#41424F':'#999'" name="arrow-down-fill"></u-icon>
			</view>
			<view class="fl dropDown_item" @click="showUnit=true" style="width:20%">
				<text style="margin-right: 10px;" :style="{'color':canShowUnit?'#41424F':'#999'}">{{unit}}</text> 
				<u-icon size="10px" :color="canShowUnit?'#41424F':'#999'" name="arrow-down-fill"></u-icon>
			</view>
			<view class="fl dropDown_item" @click="showFloor=true" style="width:20%">
				<text style="margin-right: 10px;" :style="{'color':canShowFloor?'#41424F':'#999'}">{{floor}}</text> 
				<u-icon size="10px" :color="canShowFloor?'#41424F':'#999'" name="arrow-down-fill"></u-icon>
			</view>
			<view class="fl dropDown_item" @click="showRoom=true" style="width:20%">
				<text style="margin-right: 10px;" :style="{'color':canShowRoom?'#41424F':'#999'}">{{room}}</text> 
				<u-icon size="10px" :color="canShowRoom?'#41424F':'#999'" name="arrow-down-fill"></u-icon>
			</view>
			<u-action-sheet :list="areas" v-model="showArea" :cancel-btn="false" @click="changeArea"></u-action-sheet>
			<u-action-sheet :list="builds" v-model="showBuild" :cancel-btn="false" @click="changeBuild"></u-action-sheet>
			<u-action-sheet :list="units" v-model="showUnit" :cancel-btn="false" @click="changeUnit"></u-action-sheet>
			<u-action-sheet :list="floors" v-model="showFloor" :cancel-btn="false" @click="changeFloor"></u-action-sheet>
			<u-action-sheet :list="rooms" v-model="showRoom" :cancel-btn="false" @click="changeRoom"></u-action-sheet>
		</view>
		<u-empty v-if="list.length==0" style="margin-top:30px;" text="设置下查询条件试试～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="list.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in list" :key="index">
			<view class="clearfix" @click="detailTo(item)">
				<view class="fl infoBlock_text">
					<view class="infoBlock_text-item">
						<text>姓名：</text>
						<text class="overLong" style="width:50px;">{{item.userName}}</text>
						<text v-if="item.isManage == 1" style="color:#295BFD;font-size:12px;">【管理员】</text>
					</view>
					<view class="infoBlock_text-item">
						<text>人员类型：</text>
						<text>{{item.type}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>证件号：</text>
						<text>{{item.idNumber.substr(0,6)}}********{{item.idNumber.substr(14,18)}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>手机号：</text>
						<text>{{item.mobile}}</text>
					</view>
				</view>
				<image v-if="item.statusCode!==0" class="fr infoBlock_img" src="/static/check.png" />
				<image v-if="item.statusCode==0" class="fr infoBlock_img" src="/static/wait_check.png" />
			</view>
		</view>
	</view>
</template>

<script>
	import {request,replaceHandle} from '../../common/config.js'
	export default {
		data() {
			return {
				areas: [],
				builds: [],
				units: [],
				floors: [],
				rooms: [],
				searchForm: {
				  areaId: null,
				  buildId: null,
				  unitId: null,
				  floorId: null,
				  roomId: null,
				},
				canShowArea: true,
				showArea:false,
				canShowBuild: false,
				showBuild:false,
				canShowUnit: false,
				showUnit:false,
				canShowFloor: false,
				showFloor:false,
				canShowRoom: false,
				showRoom:false,
				area: '区号',
				build: '楼号',
				unit: '单元',
				floor: '楼层',
				room: '房号',
				list: []
			}
		},
		onLoad(){
			try {
			    var deptId = uni.getStorageSync('deptId');
				this.selectBuilding({ parent_id: Number(deptId)});
			} catch (e) {
			    // error
			}
		},
		methods: {
			selectBuilding: function (param) {
				var that = this;
				this.$request('app/zhsqdept/list',JSON.stringify(param)).then(res=>{
					if(res.code==0&&res.data){
						if (res.data[0].typeCode == 'area') {	
							var baseStr = JSON.stringify(res.data);
							var objInfo = { name: 'text', deptId: 'value' };
							that.areas = JSON.parse(replaceHandle(baseStr, objInfo));
							that.canShowArea = true;
						}else if (res.data[0].typeCode == 'building') {
							var baseStr = JSON.stringify(res.data);
							var objInfo = { name: 'text', deptId: 'value' };
							that.builds = JSON.parse(replaceHandle(baseStr, objInfo));
							that.canShowBuild = true;
						}else if (res.data[0].typeCode == 'unit') {
							var baseStr = JSON.stringify(res.data);
							var objInfo = { name: 'text', deptId: 'value' };
							that.units = JSON.parse(replaceHandle(baseStr, objInfo));
							that.canShowUnit = true;
						} else if (res.data[0].typeCode == 'storey') {
							var baseStr = JSON.stringify(res.data);
							var objInfo = { name: 'text', deptId: 'value' };
							that.floors = JSON.parse(replaceHandle(baseStr, objInfo));
							that.canShowFloor = true;
						} else {
							var baseStr = JSON.stringify(res.data);
							var objInfo = { name: 'text', deptId: 'value' };
							that.rooms = JSON.parse(replaceHandle(baseStr, objInfo));
							that.canShowRoom = true;
						}
					}
				})
			},
			changeArea: function (index) {
				this.area = this.areas[index].text;
				this.searchForm.areaId = this.areas[index].value;
				this.build = '楼号';
				this.unit = '单元';
				this.floor = '楼层';
				this.room = '房号';
				this.builds = [];
				this.units = [];
				this.floors = [];
				this.rooms = [];
				this.searchForm.buildId = null;
				this.searchForm.unitId = null;
				this.searchForm.floorId = null;
				this.searchForm.roomId = null;
				this.selectBuilding({ parent_id: this.searchForm.areaId });
			},
			changeBuild: function (index) {
				this.build = this.builds[index].text;
				this.searchForm.buildId = this.builds[index].value;
				this.unit = '单元';
				this.floor = '楼层';
				this.room = '房号';
				this.units = [];
				this.floors = [];
				this.rooms = [];
				this.searchForm.unitId = null;
				this.searchForm.floorId = null;
				this.searchForm.roomId = null;
				this.selectBuilding({ parent_id: this.searchForm.buildId });
			},
			changeUnit: function (index) {
				this.unit = this.units[index].text;
				this.searchForm.unitId = this.units[index].value;
				this.floor = '楼层';
				this.room = '房号';
				this.floors = [];
				this.rooms = [];
				this.searchForm.floorId = null;
				this.searchForm.roomId = null;
				this.selectBuilding({ parent_id: this.searchForm.unitId });
			},
			changeFloor: function (index) {
				this.floor = this.floors[index].text;
				this.searchForm.floorId = this.floors[index].value;
				this.room = '房号';
				this.rooms = [];
				this.searchForm.roomId = null;
				this.selectBuilding({ parent_id: this.searchForm.floorId });
			},
			changeRoom: function (index) {
				this.room = this.rooms[index].text;
				this.searchForm.roomId = this.rooms[index].value;
				this.selectHandle({ statusCode: null, applicantDeptId: this.searchForm.roomId, limit: 999 });
			},
			selectHandle: function (param) {
				var that = this;
				this.$request('app/zhsqpersonrecord/listPersonRecordByRoleType',JSON.stringify(param)).then(res=>{
					if(res.code==0){
						that.list = res.page.list;
						that.list.map(function (item) {
							switch (item.roleType) {
								case '510': item.type = '业主';
									break;
								case '511': item.type = '业主夫妻';
									break;
								case '512': item.type = '业主子女';
									break;
								case '513': item.type = '业主父母';
									break;
								case '514': item.type = '业主亲属';
									break;
								case '515': item.type = '业主朋友';
									break;
								case '520': item.type = '租客';
									break;
								case '521': item.type = '租客夫妻';
									break;
								case '522': item.type = '租客子女';
									break;
								case '523': item.type = '租客父母';
									break;
								case '524': item.type = '租客亲属';
									break;
								case '525': item.type = '租客朋友';
									break;
								default: break;
							}
						})
					}
				})
			},
		    detailTo:function(item){
				uni.navigateTo({
				    url: '../community_detail/community_detail?id=' + item.id
				});
			},
			routerTo:function(){
				uni.reLaunch({
					url: '../mine/mine'
				})
			}
		}
	}
</script>

<style>

</style>
