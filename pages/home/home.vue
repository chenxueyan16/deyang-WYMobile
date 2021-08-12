<template>
	<view class="page">
		<view class="section1" id="navbar">
			<view class="topbar">
				<view @click="show=true" style="margin-top:24px;" >
					<text v-if="isLogin" class="bold_menu">{{deptName}}</text>
					<text v-if="!isLogin" class="bold_menu">欢迎使用德阳智慧社区</text>
					<u-icon v-if="isLogin" size="10px" color="#41424F" name="arrow-down-fill" ></u-icon>
				</view>
				<u-action-sheet :list="option" v-model="show" :cancel-btn="false" @click="changeCommunity"></u-action-sheet>
			</view>
			<view style="margin:0 15px;">
				<u-swiper :list="images" interval="3000" height="300"></u-swiper>
			</view>
			<swiper class="swiper" style="height:190px;">
				<swiper-item>
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="(item, index) in navList1" :index="index" :key="index" @click="routerTo(item)">
							<u-image width="54px" height="54px" :src="item.icon"></u-image>
							<text class="grid-text">{{item.name1}}</text>
						</u-grid-item>			
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="(item, index) in navList2" :index="index + 8" :key="index" @click="routerTo(item)">
							<u-image width="54px" height="54px" :src="item.icon"></u-image>
							<text class="grid-text">{{item.name1}}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>			
			</swiper>
		</view>
		<view style="margin-bottom:60px;height:86px;margin-top:10px;background:#fff;" @click="leaderTo">
		    <image src="/static/img_leader.png" style="display:inline-block;height:86px;width:100%;"></image>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				isLogin:false,
				show:false,
				option: [],
				images:[],
				messageList: [],
				deptName:'',
				deptId:null,
				navList1:[{
					icon: '/static/icon-infoselect.png',
					name1: '信息采集',
					haveMessage: false,
					path: './infoselect.html',
					name2: 'infoselect',
					flag: 1
				},{
					icon: '/static/icon-infocheck.png',
					name1: '信息审核',
					haveMessage: false,
					path: './infocheck.html',
					name2: 'infocheck',
					flag: 2
				},{
					icon: '/static/icon-prevention.png',
					name1: '群防群治',
					haveMessage: false,
					path: './prevention.html',
					name2: 'prevention',
					flag: 3
				},{
					icon: '/static/icon-notification.png',
					name1: '通知公告',
					haveMessage: false,
					path: './notification.html',
					name2: 'notification',
					flag: 4
				},{
					icon: '/static/icon-committee.png',
					name1: '业主委员会',
					haveMessage: false,
					path: './committee.html',
					name2: 'committee',
					flag: 7
				}, {
					icon: '/static/icon-complaint.png',
					name1: '投诉处理',
					haveMessage: false,
					path: './complaint.html',
					name2: 'complaint',
					flag: 6
				}, {
					icon: '/static/icon-service.png',
					name1: '服务报修',
					haveMessage: false,
					path: './service.html',
					name2: 'service',
					flag: 5
				}, {
					icon: '/static/icon-vote.png',
					name1: '投票活动',
					haveMessage: false,
					path: './vote.html',
					name2: 'vote',
					flag: 14
				}],
				navList2:[{
					icon: '/static/icon-scheduling.png',
					name1: '工作排班',
					haveMessage: false,
					path: './scheduling.html',
					name2: 'scheduling',
					flag: 9
				},{
					icon: '/static/icon-parking.png',
					name1: '停车管理',
					haveMessage: false,
					path: './parking.html',
					name2: 'parking',
					flag: 10
				},{
					icon: '/static/icon-rentcheck.png',
					name1: '租房审核',
					haveMessage: false,
					path: './rentcheck.html',
					name2: 'rentcheck',
					flag: 11
				},
				// {
				//  	icon: '/static/icon-warn.png',
				// 	name1: '预警信息',
				// 	haveMessage: false,
				// 	path: './warn.html',
				// 	name2: 'warn',
				// 	flag: 12
				// },
				// {
				// 	icon:'/static/icon-equipment.png',
				// 	name1:'设备信息',
				// 	haveMessage:false,
				// 	path:'./equipment.html',
				// 	name2:'equipment',
				// 	flag:13
				// },
				// {
				// 	icon: '/static/icon-vehicle.png',
				// 	name1: '车辆管理',
				// 	haveMessage: false,
				// 	name2: 'vehicle',
				// 	flag: 15
				// }
				], 
			}
		},
		onLoad(){
			try {
			    var userInfo = uni.getStorageSync('userInfo');
				this.isLogin = userInfo ? true : false;
				if (this.isLogin) {
					this.getDept(); 
					this.getPicture();	 
				}
			} catch (e) {
			    // error
			} 	
		},
		methods: {
			getPicture: function () {
				var that = this;
				this.$request('app/guidedpicture/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						if(res.data.length>0){
							res.data.map(item=>{
								that.images.push({image:item})
							})
						}else{
							that.images = [{image:'/static/bj.jpg'}]
						}
					}
				})
			},
			getDept:function(){
				var that = this;
				this.$request('app/wy/listcommunity').then(res=>{
					if(res.code==0){
						that.option = res.data;
						that.option.map(item=>{
							item.text = item.name;
							item.id = item.deptId
						})
						var deptId,deptName
						try {
						    deptId = Number(uni.getStorageSync('deptId'));	
							deptName = uni.getStorageSync('deptName');
							if(deptId && deptName){
								that.deptName = deptName
								that.deptId = deptId
								// 	  that.getMessage();
								// 	  that.haveMessageHandle();
							}else{
								that.deptId = that.option[0].id;
								that.deptName = that.option[0].text;
								that.changeCommunity() 
							}	
						} catch (e) {
						    // error
						}	
					}	
				})
			},
			changeCommunity:function(index) {
				if(index!==null){	
					this.deptName = this.option[index].text;
					this.deptId = this.option[index].id
				}
				var that = this;
				this.$request('app/zhsquser/aliAuth/switch/dept',JSON.stringify({deptId: that.deptId })).then(res=>{
					if(res.code==0){
						// that.getMessage();
						// that.haveMessageHandle();
						
						try {
							uni.setStorageSync('deptId',JSON.stringify(that.deptId));
							uni.setStorageSync('deptName',that.deptName);
						} catch (e) {
							// error
						}
					}			
				})
			},
			routerTo: function (item) {
				var that = this;
				this.$request('app/zhsquser/isPermission',JSON.stringify({flag: item.flag, communityId: that.deptId})).then(res=>{
					if(res.code==0){			
						uni.navigateTo({
							url: '../'+item.name2+'/'+item.name2
						});
					}else{
						that.$refs.uToast.show({
							title: res.msg,
							type: 'error' 
						})
					}
				})
			},
			leaderTo: function () {
				uni.navigateTo({
				    url: '../leader/leader'
				});
			},
		}
	}
</script>

<style>

</style>
