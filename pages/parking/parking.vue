<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="停车管理" :border-bottom="false"></u-navbar>
		<view class="section1">
			<u-empty v-if="list.length==0" text="没有停车场信息～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		    <view class="vehicleBlock clearfix" v-if="list.length>0" v-for="(item,index) in list" :key="index" :style="{background:item.color}" @click="switchTo(item)">
		        <view class="fl" style="margin-left:20px;margin-top:40px;">
					<view style="font-size:16px;color:#333;font-weight:500;">{{item.parkName}}</view>
		        </view>
		        <image class="fr" :src="item.image" style="width:150px;height: 100%;"/>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					parkName:'车场1',
					color:'#E7EDFF',
					image:'/static/parking1.png'
				}]
			}
		},
		onLoad(){
			this.getList();
		},
		methods: {
			getList:function(){
				var that = this;
				 //  $.ajax({
					// url: url + 'app/park/parkinfo/list',
					// type: 'POST',
					// data: JSON.stringify({}),
					// success: function (res) {
					//   deal(res);
					//   if (res.code == 0) {
					// 	that.list = res.data.list;
					// 	that.list.map(function (item, index) {
					// 	  switch (index % 4) {
					// 		case 0: item.image = '../image/parking1.png';
					// 		  item.color = '#E7EDFF';
					// 		  break;
					// 		case 1: item.image = '../image/parking2.png';
					// 		  item.color = '#D9F6F3';
					// 		  break;
					// 		case 2: item.image = '../image/parking3.png';
					// 		  item.color = '#FFF4E6';
					// 		  break;
					// 		default: item.image = '../image/parking4.png';
					// 		  item.color = '#E7E6FF';
					// 		  break;
					// 	  }
					// 	})
					//   }
					// }
				 //  });
			},
			switchTo: function (item) {
				uni.navigateTo({
					url: '../parking_list/parking_list?id=' + item.id + '&name=' + item.parkName
				});
			},
		}
	}
</script>

<style>
 .vehicleBlock {
  margin: 10px 20px;
  height: 100px;
  border-radius: 5px;
}
</style>
