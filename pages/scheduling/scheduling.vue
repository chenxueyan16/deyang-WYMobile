<template>
	<view>
		<view class="schedulingBlock_topbar">
		    <view class="bgBlock">
				<u-navbar back-icon-name="arrow-leftward" :background="{'background':'transparent'}" back-icon-color="#fff" title="排班计划" :border-bottom="false" title-color="#fff" :custom-back="routerTo"></u-navbar>
		        <view style="width:55%;padding-left:16px;margin-top: 20px;" @click="showTime=true">
					<text style="color: #fff;margin-right: 8px;">{{time}}</text>
					<u-icon size="10px" color="#fff" name="arrow-down-fill"></u-icon>
		        </view>
				<u-select v-model="showTime" :list="option" @confirm="changeTime"></u-select>
		    </view>
		    <view class="schedulingBlock_example clearfix">
		        <view class="fl" v-for="(item,index) in example" :key="index">
					<text :style="{background:item.color}"></text>{{item.title}}
				</view>
		    </view>
		    <view class="schedulingBlock_week clearfix">
		        <view class="fl" v-for="(item,index) in week" :key="index">{{item}}</view>
		    </view>	
		</view>
		<u-empty v-if="data.length==0" style="margin-top:30px;" text="暂无数据～" src="/static/img_nodata.png" iconSize="160"></u-empty>
		<view v-if="data.length>0">
		    <view class="schedulingBlock" v-for="(item,index) in data" :key="index">
		        <view>{{item.name}}</view>
		        <view class="schedulingBlock_table" v-for="(sitem,sindex) in item.userlist" :key="sindex">
					<view class="clearfix" style="min-height:60px;height:auto;border-bottom:0.6px solid #EFF0F7;" @click="detailTo(item,sitem)">
						<view class="trBlock fl" style="line-height:60px;overflow:hidden;color: #333333;font-size: 12px;">{{sitem.name}}</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we1" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we2" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we3" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we4" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we5" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we6" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
						<view class="trBlock fl">
							<text v-for="(items,index) in sitem.we7" :key="index" :class="[(items.color=='#ffffff'||items.color==null)?'fontBlack':'fontWhite','tagName']" :style="{background:items.color}">{{items.title}}</text>
						</view>
					</view>
		        </view>
		    </view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	import moment from 'moment'; 
	export default {
		data() {
			return {
				showTime:false,
				time:'',
				option:[],
				week: ['姓名', '一', '二', '三', '四', '五', '六', '日'],
				data: [],
				example:[],
				deptList:[]
			}
		},
		onLoad(option){
			this.time = option.time ? option.time : this.initWeek(moment().week());
			this.initOption();
			this.getExample();
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
			// 获取班次信息
			getExample: function () {
				var that = this;
				this.$request('app/wyshifts/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.example = res.data;
					}
				})
			},
			getDept: function () {
				var that = this;
				this.$request('app/wy/listAllDeptAndUser',JSON.stringify({})).then(res=>{
					if(res.code==0){
						var start = that.time.split('~')[0];//获取当前查询的开始时间
						var end = that.time.split('~')[1];//获取当前查询的结束时间
						that.getInfo(res.data,{ starTime: start, endTime: end });
					}
				})
			},
			getInfo: function (obj,param) {
				var that = this;
				this.$request('app/wyplanmanage/listAllbyuser',JSON.stringify(param)).then(res=>{
					that.data = []
					if(res.code==0&&res.data.length>0){
						res.data.map(function (items) {
							//  遍历部门
							obj.map(function (item) {
								if (items.deptId == item.deptId) {
									//  遍历人员
									item.userlist.map(function (value) {
										if (items.userId == value.id) {
											value.deptId = item.deptId;
											switch (items.week) {
												case 'we1': value.we1 = items.list;
													break;
												case 'we2': value.we2 = items.list;
													break;
												case 'we3': value.we3 = items.list;
													break;
												case 'we4': value.we4 = items.list;
													break;
												case 'we5': value.we5 = items.list;
													break;
												case 'we6': value.we6 = items.list;
													break;
												case 'we7': value.we7 = items.list;
													break;
											}
										}
									})
								}
							})
						})
						that.data = obj;
					}
				})
			},
			detailTo: function (item,sitem) {
				var param = {id:sitem.id,deptId:item.deptId,name:sitem.name,time:this.time};
				uni.navigateTo({
				    url: '../scheduling_detail/scheduling_detail?info=' + JSON.stringify(param)
				});
			},
			routerTo:function(){
				uni.reLaunch({
				    url: '../home/home'
				});
			}
		}
	}
</script>

<style>
.schedulingBlock_example>view {
  line-height: 48px;
  min-width: 15%;
  margin-right: 8px;
  width: auto;
}

.schedulingBlock_example text {
  display: inline-block;
  line-height: 48px;
  height: 8px;
  width: 8px;
  margin-right: 5px;
}
.schedulingBlock_week {
  position: absolute;
  top: 168px;
  height: 24px;
  width: 100%;
  background: #EFF0F7;
}
.schedulingBlock_week>view {
  line-height: 24px;
  width: 12.5%;
  text-align: center;
}
.schedulingBlock>view:first-child{
  height: 24px;
  text-align: center;
  color: #C7C8D4;
  font-size: 10px;
  line-height: 24px;
  background: #EFF0F7;
}
.schedulingBlock_table {
  width: 100%;
}
.tagName {
  display: block;
  height: 16px;
  font-size: 10px;
  overflow: hidden;
  margin:0;
  margin-top:2px
}
.trBlock {
  text-align: center;
  height: 100%;
  width:12.5%;
  border:1px solid transparent;
}
.trBlock .tagName:first-child{
  margin-top:2px;
}
.fontBlack{
  color:#333;
  box-sizing: border-box;
  border:1px solid #eee;
}
.fontWhite{
  color:#fff;
}
</style>
