<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" :title="name" :border-bottom="false"></u-navbar>
		<view style="padding:8px 16px;background-color: #fff;" v-if="type=='vehicle'">
			<u-search placeholder="请输入搜索车牌信息" v-model="value" shape="square" :show-action="false" @search="searchHandle"></u-search>
		</view>
		<view style="padding:8px 16px;background-color: #fff;" v-if="type=='nonvehicle'">
			<u-search placeholder="请输入搜索rfid" v-model="value" shape="square" :show-action="false" @search="searchHandle"></u-search>
		</view>
		<u-swipe-action v-if="list.length>0" :index="item.id" v-for="(item, index) in list" :key="item.id" :show="item.show"
			@click="click" @open="open" :options="options" style="margin:10px 20px;">
			<view class="item u-border-bottom">
				<view class="title-wrap">
					<view class="clearfix" style="padding:15px;" @click="detailTo(item)">
					    <view class="infoBlock_text fl">
					        <view v-if="type=='nonvehicle'" class="infoBlock_text-item">
					            <text>RFID：</text>
								<text>{{item.rfid}}</text>
							</view>
					        <view v-if="type=='vehicle'" class="infoBlock_text-item">
					            <text>车牌号码：</text>
								<text>{{item.carPlate}}</text>
							</view>
					        <view class="infoBlock_text-item">
					            <text>车主姓名：</text>
					            <text>{{item.userName}}</text>
					            <label class="tag">{{item.userTypeName}}</label>
					        </view>
					        <view v-if="type=='nonvehicle'" class="infoBlock_text-item">
					            <text>手机号：</text>
					            <text>{{item.userPhone}}</text>
					        </view>
					        <view v-if="type=='vehicle'" class="infoBlock_text-item">
					            <text>车位号：</text>
								<text>{{item.placeCode}}</text>
							</view>
					    </view>
					</view>
					<!-- <text class="title u-line-2">{{ item.title }}</text> -->
				</view>
			</view>
		</u-swipe-action>
		<u-empty v-if="list.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view style="width:100%;margin-top:20px;text-align:center;">
		    <view class="linerbtn btnActive" style="width:90%;height:40px;" @click="addHandle">
				新增{{name}}信息
		    </view>
		</view>
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="270px" height="140px">
			<view class="dialogBlock_title">是否删除</view>
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
				type:'',
				value:'',
				list:[{
					id:4,
					title:'131',
					rfid:'13',
					userName:'4の43让'
				}],
				showDialog:false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				currentId:null
			}
		},
		onLoad(option){
			this.type = option.type
			this.name = this.type == 'vehicle' ? '机动车' : '非机动车';
			this.getList();		
		},
		methods: {
			searchHandle: function () {
				if (this.type == 'vehicle') {
					this.getList({ limit: 999, carType: 1, carPlate: this.value });
				} else {
					this.getList({ limit: 999, carType: 2, rfid: this.value });
				}
			},
			getList: function (param) {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/usercar/list',
				// type: 'POST',
				// data: JSON.stringify(param),
				// success: function (res) {
				//   deal(res);
				//   if (res.code == 0) {
				// 	that.list = res.data.list;
				// 	that.list.map(function (item) {
				// 	  switch (item.userType) {
				// 		case 0: item.userTypeName = '业主';
				// 		  break;
				// 		case 1: item.userTypeName = '住户';
				// 		  break;
				// 		case 2: item.userTypeName = '租客';
				// 		  break;
				// 	  }
				// 	})
				//   }
				// }
			 //  })
			},
			click:function(index, index1) {
				if(index1 == 0) {
					this.showDialog = true
					this.currentId = index
				}
			},
			deleteHandle:function(){
				// $.ajax({
				// 	  url: url + 'app/usercar/delete?id=' + id,
				// 	  type: 'POST',
				// 	  success: function (res) {
				// 		deal(res);
				// 		if (res.code == 0) {
				// 		  vant.Toast({
				// 			icon: '../image/success.png',
				// 			message: '操作成功！'
				// 		  })
				// 		  setTimeout(function () {
				// 			that.searchHandle();
				// 		  }, 1000)
				// 		}
				// 	  }
				// 	})
			},
			open:function(index) {				
				this.list.map(item=>{
					if(item.id === index){
						item.show = true
					}else{
						item.show = false
					}
				})
			},
			addHandle: function () {
				uni.navigateTo({
					url: '../vehicle_detail/vehicle_detail?id=0&type=' + this.type
				});
			},
			detailTo: function (item) {
				uni.navigateTo({
					url: '../vehicle_detail/vehicle_detail?id='+item.id+'&type=' + this.type+'&data='+JSON.stringify(item)
				});
			},
		}
	}
</script>

<style>

</style>
