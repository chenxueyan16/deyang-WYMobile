<template>
	<view class="page">
		<view class="schedulingBlock_topbar" style="height: auto;">
		    <view class="bgBlock">
				<u-navbar back-icon-name="arrow-leftward" :background="{'background':'transparent'}" back-icon-color="#fff" title="详情" :border-bottom="false" title-color="#fff" :custom-back="routerTo"></u-navbar>
		        <view style="width:55%;padding-left:16px;margin-top: 20px;" @click="showTime=true">
					<text style="color: #fff;margin-right: 8px;">{{time}}</text>
					<u-icon size="10px" color="#fff" name="arrow-down-fill"></u-icon>
		        </view>
				<u-select v-model="showTime" :list="option" @confirm="changeTime"></u-select>
		    </view>
		    <view class="schedulingBlock_example clearfix">
		        <div class="fl" style="line-height:48px;">{{userName}}</div>
		        <span class="deptName fl">{{deptName}}</span>
		    </view>
		</view>
		<u-empty v-if="show" style="margin-top:30px;" text="暂无数据～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="!show">
			<view class="listBlock clearfix" v-for="(item,index) in info.sche" :key="index">
				<view class="fl">{{item.planTime}} {{item.weeks}}</view>
				<view class="fr clearfix" style="width:64%;height:60px;" v-for="(sub,index) in item.list" :key="index">
					<view class="fl">
					  <view class="schedulingBlock_name">{{sub.title}}</view>
					  <view class="schedulingBlock_time">{{sub.startTime}}-{{sub.endTime}}</view>
					</view>
					<view class="fr schedulingBlock_color" :style="{background:sub.color}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				showTime:false,
				show:false,
				time:'',
				option:[],
				userName:'',
				deptName:'',
				deptId:null,
				id:null,
				info:{}
			}
		},
		onLoad(option){
			this.time = JSON.parse(option.info).time ? JSON.parse(option.info).time : this.initWeek(moment().week());
			this.userName = JSON.parse(option.info).name
			this.deptId = JSON.parse(option.info).deptId
			this.id = JSON.parse(option.info).id
			this.initOption();
			this.getDept();
		},
		methods: {
			// 获取option选项
			initOption: function () {
				var current = this.initWeek(moment().week());
				var before = this.initWeek(moment().week() - 1);
				var after = this.initWeek(moment().week() + 1);
				this.currentYear = moment().week(moment().week()).startOf('week').format('YYYY');
				this.option = [{ value: 1, label: before }, { value: 2, label: current }, { value: 3, label: after }];
			},
			// 获取每周开始时间及结束时间
			initWeek: function (time) {
				var startDate = moment().week(time).startOf('week').format('YYYY-MM-DD');
				var endDate = moment().week(time).endOf('week').format('YYYY-MM-DD');
				return startDate + '~' + endDate;
			},
			changeTime:function(e){
				this.time = e[0].label
				this.showTime = false
				this.getDept()
			},
			getDept: function () {
				var that = this;
				this.$request('app/wy/listAllDeptAndUser',JSON.stringify({})).then(res=>{
					if(res.code==0){
						res.data.map(function (item) {
							if (item.deptId == that.deptId) {
								that.deptName = item.name;
							}
						})
						var start = that.time.split('~')[0];//获取当前查询的开始时间
						var end = that.time.split('~')[1];//获取当前查询的结束时间
						that.getInfo({ userID: that.id, starTime: start, endTime: end });
					}
				})
			},
			getInfo: function (param) {
				var that = this;
				this.$request('app/wyplanmanage/listAllbyuser',JSON.stringify(param)).then(res=>{
					if(res.code==0){
						var info = {}
						info.sche = []
						if (res.data.length !== 0) {
							that.show = false;
							res.data.map(function (sitem, index) {
								sitem.planTime = moment(sitem.planTime).format('MM-DD');
								switch (sitem.week) {
									case 'we1': sitem.weeks = '周一';
										break;
									case 'we2': sitem.weeks = '周二';
										break;
									case 'we3': sitem.weeks = '周三';
										break;
									case 'we4': sitem.weeks = '周四';
										break;
									case 'we5': sitem.weeks = '周五';
										break;
									case 'we6': sitem.weeks = '周六';
										break;
									case 'we7': sitem.weeks = '周日';
										break;
								}
								info.sche.push(sitem)
							})
							that.info = info;
						} else {
							that.show = true;
						}
					}
				})
			},
			routerTo:function(){
				uni.navigateTo({
					url: '../scheduling/scheduling'
				})
			}
		}
	}
</script>

<style>
.listBlock {
  background: #fff;
  box-sizing: border-box;
  padding: 0px 20px;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px 16px;
}

.listBlock>view:first-child {
  color: #333;
  font-size: 15px;
  line-height: 60px;
}
.schedulingBlock_name {
  color: #333;
  font-size: 15px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 5px;
}
.schedulingBlock_time {
  color: #888;
  font-size: 12px;
  margin-bottom: 8px;
}
.schedulingBlock_color {
  height: 8px;
  width: 8px;
  margin-top: 23px;
  border:1px solid #eee;
}
.deptName {
  margin-top: 16px;
  margin-left: 6px;
  height: 16px;
  background: #93B6FA;
  padding: 0px 5px;
  border-radius: 8px;
  color: #fff;
  font-size: 10px;
}
</style>
