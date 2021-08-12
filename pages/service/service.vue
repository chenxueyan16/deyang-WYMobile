<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="服务报修" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
				<view @click="show=true" style="margin-top:10px;" >
					<text style="margin-right: 8px;">{{value}}</text>
					<u-icon size="10px" color="#41424F" name="arrow-down-fill"></u-icon>
				</view>
			</view>
			<u-action-sheet :list="option" v-model="show" :cancel-btn="false" @click="getMessage"></u-action-sheet>
			<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
		</view>
		<view v-if="current===0">
			<u-empty v-if="waitList.length==0" text="没有需要处理的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="waitList.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in waitList" :key="index">
				<view style="width:100%;" @click="detailTo(item)">
					<view class="infoBlock_text" style="width:100%;">
						<view class="clearfix infoBlock_text-item">
							<text>服务原因：</text>
							<text class="overLong">{{item.title}}</text>
							<image class="fr infoBlock_img" src="/static/wait_deal.png" />
						</view>
						<view class="infoBlock_text-item">
							<text>预约时间：</text>
							<text>{{item.appointmentTime}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>房屋信息：</text>
							<text>{{item.house}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>提交人：</text>
							<text class="overLong">{{item.userName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current===1&&value=='340'">
			<u-empty v-if="ingList.length==0" text="没有处理中的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="ingList.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in waitList" :key="index">
				<view style="width:100%;" @click="detailTo(item)">
					<view class="infoBlock_text" style="width:100%;">
						<view class="clearfix infoBlock_text-item">
							<text>服务原因：</text>
							<text class="overLong">{{item.title}}</text>
							<image class="fr infoBlock_img" src="/static/dealing.png" />
						</view>
						<view class="infoBlock_text-item">
							<text>预约时间：</text>
							<text>{{item.appointmentTime}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>房屋信息：</text>
							<text>{{item.house}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>提交人：</text>
							<text class="overLong">{{item.userName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current===2">
			<u-empty v-if="dealList.length==0" text="没有已处理的信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
			<view v-if="dealList.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in waitList" :key="index">
				<view style="width:100%;" @click="detailTo(item)">
					<view class="infoBlock_text" style="width:100%;">
						<view class="clearfix infoBlock_text-item">
							<text>服务原因：</text>
							<text class="overLong">{{item.title}}</text>
							<image class="fr infoBlock_img" v-if="value=='340' && item.state!=='1'" src="/static/deal.png" />
							<image class="fr infoBlock_img" v-if="value=='340' && item.state=='1'" src="/static/deny_check.png" />
							<image class="fr infoBlock_img" v-if="value!=='340' && item.handleState=='2'" src="/static/deal.png" />
							<image class="fr infoBlock_img" v-if="value!=='340' && item.handleState=='1'" src="/static/deny_check.png" />
						</view>
						<view class="infoBlock_text-item">
							<text>预约时间：</text>
							<text>{{item.appointmentTime}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>房屋信息：</text>
							<text>{{item.house}}</text>
						</view>
						<view class="infoBlock_text-item">
							<text>提交人：</text>
							<text class="overLong">{{item.userName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deptName:'左岸春天',
				current:0,
				list: [{
					name: '待处理'
				}, {
					name:'处理中'
				},{
					name: '已处理'
				}],
				waitList:[{
					title:'123',
					house:'e3',
					appointmentTime:'324'
				}],
				ingList:[],
				dealList:[],
				value:'管理员',
				show:false,
				option:[
					{id:1,text:'左岸春天'},
					{id:2,text:'木塔南苑'},
					{id:3,text:'软件园'},
				]
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
			this.getType();
		},
		methods: {
			//  获取当前角色列表
			getType: function () {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/wyownersservicerepair/getUserType',
				// type: 'POST',
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0 && res.data.length > 0) {
				// 	that.option = res.data;
				// 	if (localStorage.getItem('roleId')) {
				// 	  that.value = localStorage.getItem('roleId');
				// 	} else {
				// 	  that.value = that.option[0].value;
				// 	}
				// 	that.getMessage();
				//   }
				// }
			 //  })
			},
			//  获取角色对应数据
			getMessage: function (index) {
			  var that = this;
			  that.value = that.option[index].text
			  console.log(index)
			 //  $.ajax({
				// url: url + 'app/wyownersservicerepair/list',
				// type: 'POST',
				// data: JSON.stringify({ pageSize: 999, type: that.value == '340' ? 2 : 1 }),
				// success: function (res) {
				//   deal(res);
				//   that.waitList = [];
				//   that.dealList = [];
				//   that.ingList = [];
				//   localStorage.setItem('roleId', that.value);
				//   if (res.code == 0 && res.data.list.length > 0) {
				// 	res.data.list.map(function (item) {
				// 	  if (that.value == '340') {
				// 		if (item.state == '0') {
				// 		  that.waitList.push(item);
				// 		} else if(item.state == '2' && item.handleState == '0'){
				// 		  that.ingList.push(item);
				// 		} else if(item.state == '1' || item.handleState !== '0' || item.state == '3' ){
				// 		  that.dealList.push(item);
				// 		}   
				// 	  } else {
				// 		if (item.handleState == '0') {
				// 		  that.waitList.push(item);
				// 		} else {
				// 		  that.dealList.push(item);
				// 		}
				// 	  }
				// 	})
				//   }
				// },
			 //  })
			},
			change:function(index) {
				this.current = index;
			},
			detailTo:function(item){
				let param = this.value === '管理员'?true:false
				uni.navigateTo({
				    url: '../service_detail/service_detail?id=' + item.id+'&isManage='+ param
				});
			}
		}
	}
</script>

<style>

</style>
