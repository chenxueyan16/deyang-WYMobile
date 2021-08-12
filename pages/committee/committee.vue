<template>
	<view>
		<view class="colorBlock">
			<u-navbar back-icon-name="arrow-leftward" :background="{'background':'transparent'}" back-icon-color="#fff" title="业主委员会" :border-bottom="false" title-color="#fff" :custom-back="routerTo"></u-navbar>
			<view class="bgBlockTop">
				<view class="clearfix" style="font-size:20px;font-weight:500;">
					<u-row gutter="20" >
						<u-col span="6" text-align="left">
							<view class="bgBlockTop_text" style="font-size:20px;font-weight:500;">{{info.name}}</view>
							<view class="bgBlockTop_text">备案编号：{{info.code}}</view>
							<view class="bgBlockTop_text">成立时间：{{info.createTime}}</view>
						</u-col>
						<u-col span="6" text-align="right">
							<u-icon size="30" name="phone" color="#fff" @click="callHandle"></u-icon>
						</u-col>
					</u-row>
				</view>
			</view>
			<view>
				<u-row gutter="20">
					<u-col span="4" text-align="center">
						<view style="font-size:12px;color:#fff;">负责人</view>
						<view class="bold_font">{{info.master}}</view>
					</u-col>
					<u-col span="4" text-align="center">
						<view style="font-size:12px;color:#fff;">联系人</view>
						<view class="bold_font">{{info.contactUser}}</view>
					</u-col>
					<u-col span="4" text-align="center">
						<view style="font-size:12px;color:#fff;">成立方式</view>
						<view class="bold_font">{{info.createType}}</view>
					</u-col>
				</u-row>
			</view>
			<view class="rentBlock" style="border: 4px solid #fff;">
				<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
				<view v-if="current===0">
					<u-empty v-if="meetList.length==0" text="暂无数据～" src="/static/img_nodata.png" iconSize="160" style="margin-top:30px;"></u-empty>
					<view style="padding:10px 16px;margin-top:10px;" v-if="meetList.length>0" v-for="(item,index) in meetList" :key="index" @click="detailTo(item)">
						<view class="artical_title" style="font-size:14px;margin-bottom:0;">{{item.title}}</view>
						<view style="color:#888;font-size:14px;margin-top:12px;">{{item.addTime}}</view>
					</view>
				</view>
				<view v-if="current===1">
					<u-empty v-if="memberList.length==0" text="暂无数据～" src="/static/img_nodata.png" iconSize="160" style="margin-top:30px;"></u-empty>
					<view v-if="memberList.length>0" style="margin:10px 16px;">
						<u-table>
							<u-tr>
								<u-th>序列</u-th>
								<u-th>姓名</u-th>
								<u-th>性别</u-th>
								<u-th>职务</u-th>
							</u-tr>
							<u-tr v-for="(item,index) in memberList" :key="index">
								<u-td>{{index+1}}</u-td>
								<u-td>{{item.name}}</u-td>
								<u-td>{{item.gender}}</u-td>
								<u-td>{{item.title}}</u-td>
							</u-tr>
						</u-table>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				info: {},
				list: [{
					name: '全部事项'
				}, {
					name: '业委会人员信息'
				}],
				meetList:[],
				current: 0,
				memberList:[]
			}
		},
		onLoad(){
			this.getMessage();
			this.getMember();
			this.getMeeting();
		},
		methods: {
			callHandle:function(){
				var that = this
				if(!that.info.contactPhone){
					return false;
				}
				uni.makePhoneCall({
					phoneNumber: that.info.contactPhone, 
					success: (res) => {
						console.log('调用成功!')	
					},
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			change:function(index) {
				this.current = index;
			},
			getMessage: function () {
				var that = this;
				this.$request('app/ownerscommittee/info',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.info = res.data;
						that.info.createTime = moment(that.info.createTime).format('YYYY-MM-DD');
					}
				})
			},
			getMember: function () {
				var that = this;
				this.$request('app/ownerscommittee/member/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.memberList = res.data;
					}
				})
			},
			getMeeting: function () {
				var that = this;
				this.$request('app/ownerscommittee/meeting/list',JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.meetList = res.data;
					}
				})
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../committee_detail/committee_detail?id=' + item.id
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
.colorBlock {
  height: 250px;
  background: -webkit-linear-gradient(to top, #5C95FC, #295BFD);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to top, #5C95FC, #295BFD);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(to top, #5C95FC, #295BFD);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to top, #5C95FC, #295BFD);
  /* 标准的语法 */
}
.bgBlockTop {
  /* transform: translateY(14px); */
  margin: 10px 20px 20px 20px;
  /*top:-200px;*/
}
.bgBlockTop_text {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-bottom:6px;
}

.bold_font {
  font-size: 14px;
  color: #fff;
  margin-top: 6px;
  font-weight: 500;
}
</style>
