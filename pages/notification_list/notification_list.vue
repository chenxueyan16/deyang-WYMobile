<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="群防群治" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="dropDown">
			<view class="fl dropDown_item" style="padding-left:16px;text-align: left;" @click="showType=true">
				<text style="margin-right: 10px;">{{type}}</text>
				<u-icon size="10px" color="#41424F" name="arrow-down-fill"> </u-icon>
			</view>
		</view>
		<u-empty v-if="list.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<u-card :show-head="false" padding="0" :border="false" :full="true" :body-style="{'padding':'4px 14px 14px 14px'}">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom" v-for="(item,index) in list" :key="index" style="margin-bottom:18px;" @click="detailTo(item)">
					<view style="width:85%;">
						<view class="u-body-item-title u-line-2" style="color:#333333;">
							<text style="color:#FF8E00" v-if="item.type">【{{item.type}}】</text>
							{{item.title}}				
						</view>
						<view class="messageBlock_time">{{item.addTime}}</view>
					</view>
					<image :src="item.coverUrl?item.coverUrl:'/static/prevention.jpg'" mode="aspectFill"></image>
				</view>
			</view>
		</u-card>
		<u-action-sheet :safe-area-inset-bottom="false" :list="option" v-model="showType" :cancel-btn="false" @click="changeType"></u-action-sheet>	
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				list:[],
				showType:false,
				type:'全部',
				option: [
				  { value: 0, text: '全部' },
				  { value: 1, text: '维修通知' },
				  { value: 2, text: '水电煤气' },
				  { value: 3, text: '安全提醒' },
				  { value: 4, text: '公益服务' },
				  { value: 5, text: '温馨提示' },
				  { value: 6, text: '紧急通知' },
				  { value: 7, text: '物业催费通知单' },
				  { value: 8, text: '其他' },
				  { value: 9, text: '紧急' },
				  { value: 10, text: '正常' }
				],
			}
		},
		onLoad(){
			this.getList({ limit: 999, type: null, isRelease: 1 });
		},
		methods: {
			getList: function (param) {
				var that = this;
				this.$request('app/zhsqnotice/listApp',JSON.stringify(param)).then(res=>{
					if(res.code==0){
						that.list = res.page.list;
						that.list.map(function (item) {
							if (item.type == '正常') {
								item.type = '';
							}
						})
					}
				})
			},
			changeType:function(index){
				this.type = this.option[index].text;
				this.getList({ type: index==0?null:this.type, limit: 999, isRelease: 1 })
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../notification_detail/notification_detail?id=' + item.id + '&type=notification'
				});
			},
			routerTo:function(){
				uni.navigateTo({
					url:'../notification/notification'
				})
			}
		}
	}
</script>

<style>

</style>
