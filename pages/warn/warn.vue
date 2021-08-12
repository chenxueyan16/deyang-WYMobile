<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="预警信息" :border-bottom="false"></u-navbar>
		<view class="section1" style="padding-bottom:2px;">
			<view class="topbar">
				<text class="fl" style="color:#41424F;font-size:16px;font-weight:bold;margin-top:24px;">{{deptName}}</text>
			</view>
			<view class="dropDown">
				<view class="fl dropDown_item" @click="showStatus=true">
					<text style="margin-right: 10px;">{{status.text}}</text>
					<u-icon size="10px" color="#41424F" name="arrow-down-fill"></u-icon>
				</view>
				<view class="fl dropDown_item" @click="showType=true">
					<text style="margin-right: 10px;">{{type.text}}</text>
					<u-icon size="10px" color="#41424F" name="arrow-down-fill"></u-icon>
				</view>
			</view>
			<u-action-sheet :list="option1" v-model="showStatus" :cancel-btn="false" @click="changeStatus"></u-action-sheet>
			<u-action-sheet :list="option2" v-model="showType" :cancel-btn="false" @click="changeType"></u-action-sheet>
		</view>
		<u-empty v-if="list.length==0" style="margin-top:30px;" text="没有要处理的信息～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="list.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in list" :key="index" @click="detailTo(item)">
		    <view class="overLong" style="width:90%;color:#333;font-size:14px;margin-right:20px;margin-bottom:8px;">{{item.deployReason}}</view>
		    <view class="clearfix">
		        <view class="infoBlock_text">
					<view class="infoBlock_text-item">
						<text>预警类型：</text>
						<text>{{item.deployType}}</text>
					</view>
					<view style="color:#888;font-size:14px;">{{item.deployTime}}
						<image v-if="item.status=='1'" class="fr infoBlock_img" src="/static/deal.png" />
						<image v-if="item.status=='0'" class="fr infoBlock_img" src="/static/wait_deal.png" />
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
				status:{value:null,text:'全部状态'},
				type:{text: '全部类型', value: null},
				showStatus:false,
				showType:false,
				option1:[
					{value:null,text:'全部状态'},
					{value:'0',text:'待处理'},
					{value:'1',text:'已处理'},
				],
				option2:[
					{text: '全部类型', value: null}, 
					{text: '人员预警', value: 1}, 
					{text: '车辆预警', value: 2}, 
					{text: '未登记人员预警', value: 3}, 
					{text: '老人预警', value: 4}, 
					{text: '重点人员', value: 5}
				],
				list:[{
					deployReason:'eqiwfhregho',
					deployType:'1',
					deployTime:'2020-1-1',
					status:'1'
				}]
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
			this.getList({ status: null, deployType: null, limit: 999 });
		},
		methods: {
			getList:function(){
				var that = this;
				 //  $.ajax({
					// url: url + 'app/wy/alarm/list',
					// type: 'POST',
					// data: JSON.stringify(param),
					// success: function (res) {
					//   deal(res);
					//   if (res.code === 0) {
					// 	that.infoList = res.data.list;
					// 	that.infoList.map(function (item) {
					// 	  switch (item.deployType) {
					// 		case 1: item.deployType = '人员预警';
					// 		  break;
					// 		case 2: item.deployType = '车辆预警';
					// 		  break;
					// 		case 3: item.deployType = '未登记人员预警';
					// 		  break;
					// 		case 4: item.deployType = '老人预警';
					// 		  break;
					// 		case 5: item.deployType = '重点人员';
					// 		  break;
					// 	  }
					// 	})
					//   }
					// }
				 //  })
			},
			changeStatus:function(index){
				this.status = this.option1[index];
				this.getList({ status: this.status.value, deployType: this.type.value, limit: 999 });
			},
			changeType:function(index){
				this.type = this.option2[index];
				this.getList({ status: this.status.value, deployType: this.type.value, limit: 999 });
			},
			detailTo:function(item){
				uni.navigateTo({
				    url: '../warn_detail/warn_detail?id=' + item.id
				});
			}
		}
	}
</script>

<style>

</style>
