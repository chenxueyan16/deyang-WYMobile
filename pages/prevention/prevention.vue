<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="群防群治" :border-bottom="false"></u-navbar>
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
		<u-empty v-if="list.length==0" style="margin-top:30px;" text="没有需要审核的信息～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="list.length>0" class="infoBlock" style="padding-right:0;" v-for="(item,index) in list" :key="index" @click="detailTo(item)">
			<view class="clearfix">
				<view class="fl infoBlock_text">
					<view class="infoBlock_text-item">
						<text>提交时间：</text>
						<text>{{item.createDate}}</text>
					</view>
					<view class="infoBlock_text-item">
						<text>提交人：</text>
						<text class="overLong">{{item.userName}}</text>
					</view>
					<view class="infoBlock_text-item" style="margin-bottom: 0;">
						<text>类型：</text>
						<text>{{item.type}}</text>
					</view>
				</view>
				<image v-if="item.state=='1'" class="fr infoBlock_img" src="/static/deal.png"></image>
				<image v-if="item.state=='0'" class="fr infoBlock_img" src="/static/wait_deal.png" /></image>
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
				deptName:'左岸春天',
				status:{value:null,text:'全部状态'},
                type:{text: '全部类型', value: null},
				showStatus:false,
				showType:false,
				showLoading:false,
				option1:[
					{value:null,text:'全部状态'},
					{value:'0',text:'待处理'},
					{value:'1',text:'已处理'},
				],
				option2:[
					{text: '全部类型', value: null}, 
					{text: '随手拍', value: '1'}, 
					{text: '小区隐患', value: '2'}, 
					{text: '寻求帮助', value: '3'}, 
					{text: '矛盾纠纷', value: '4'},
				],
				list: [{
					id:1,
					createDate:'1',
					userName:'1',
					type:'1',
					state:'0'
				}],		
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'deptName',
				success: function (res) {
					this.deptName = res
				}
			})
			this.getList({ isPolice: 0, type: null, state: null, limit: 999 });
		},
		methods: {
			getList: function (param) {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/wyownersmanagement/list',
				// type: 'POST',
				// data: JSON.stringify(param),
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	that.infoList = res.data.list;
				// 	that.infoList.map(function (item) {
				// 	  switch (item.type) {
				// 		case '1': item.type = '随手拍';
				// 		  break;
				// 		case '2': item.type = '小区隐患';
				// 		  break;
				// 		case '3': item.type = '寻求帮助';
				// 		  break;
				// 		case '4': item.type = '矛盾纠纷';
				// 		  break;
				// 	  }
				// 	})
				//   }
				// }
			 //  })
			},
			changeStatus:function(index){
				this.status = this.option1[index];
				this.getList({ isPolice: 0, type: this.status.value, state: this.type.value, limit: 999 });
			},
			changeType:function(index){
				this.type = this.option2[index];
				this.getList({ isPolice: 0, type: this.status.value, state: this.type.value, limit: 999 });
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../prevention_detail/prevention_detail?id=' + item.id
				});
			},
		}
	}
</script>

<style>

</style>
