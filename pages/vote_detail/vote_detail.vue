<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" title="投票" :border-bottom="false" :custom-back="routerTo"></u-navbar>
		<view class="voteImg" :style="{backgroundImage:'url(' + info.image + ')'}">
			<view>
				<view class="clearfix" style="color:#fff;font-size:14px;">
					<image class="fl" src="/static/icon_timer.png" style="width:16px;height:16px;margin-right: 4px;padding-top:6px;"/>
					<text class="fl" style="line-height: 30px;" v-if="info.state=='1'">投票活动已结束~</text>
					<view class="fl" v-if="info.state!=='1'" style="line-height: 30px;">
						<text style="margin-right:4px;">距投票结束还有</text>
						<u-count-down :timestamp="info.time" separator="zh" bg-color="transparent" color="#fff" separator-color="#fff"></u-count-down>
					</view>
				</view>
			</view>
			<view class="rentBlock" style="border: 4px solid #fff;transform: translateY(114px);">
				<view style="margin:0 20px;padding-bottom:10px;border-bottom:2px solid #295BFD">
					<u-row gutter="20">
						<u-col span="4" text-align="center">
							<view class="font_bold">{{info.partCount}}</view>
							<view class="font_name">票项数</view>
						</u-col>
						<u-col span="4" text-align="center">
							<view class="font_bold">{{info.partVoteCount}}</view>
							<view class="font_name">累计票数</view>
						</u-col>
						<u-col span="4" text-align="center">
							<view class="font_bold">{{info.browseCount}}</view>
							<view class="font_name">浏览量</view>
						</u-col>
					</u-row>
				</view>
				<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
				<view v-if="current===0">
					<view style="margin:8px 16px">
						<u-search placeholder="搜索票项名称或票项编号" v-model="value" shape="square" :show-action="false" style="" @search="getList"></u-search>
					</view>
					<u-empty v-if="memberList.length==0" text="暂无数据～" style="margin-top:30px;" src="/static/img_nodata.png" iconSize="160"></u-empty>
					<view class="voteNumberBlock clearfix" v-if="memberList.length>0">
						<view class="voteNumberBlock_item" v-for="(item,index) in memberList" :key="index">
							<text class="voteNumberBlock_item-number">{{item.number}}号</text>
							<image :src="item.coverUrl?item.coverUrl:'/static/img_nopic.png'" @click="detailTo(item)" style="display:inline-block;border-radius:3px;height:180px;width:100%;"/>
							<view class="clearfix">
								<text class="fl overLong" style="font-size:14px;color:#333;font-weight:600;width:60%;">{{item.title}}</text>
								<text class="fr" style="font-size:12px;color:#FF4F4D;">{{item.voteCount}}票</text>
							</view>
							<view class="overLong" style="font-size:12px;color:#888;margin-bottom:9px;width:100%;">{{item.content}}</view>
							<view class="linerbtn btnActive" v-if="info.state!== '1'&&item.uservoteCount==0" style="height:30px;line-height:30px;width:100%;"
							 size="small" @click="voteHandle(item)">投TA一票</view>
							<view class="linerbtn btnNormal" v-if="info.state!== '1'&&item.uservoteCount>0" style="height:30px;line-height:30px;width:100%;"
							 size="small">已投</view>
							<view class="linerbtn btnNormal" v-if="info.state== '1'" style="height:30px;line-height:30px;width:100%;" size="small">已结束</view>
						</view>
					</view>
				</view>
				<view v-if="current===1">
					<view class="voteListBlock clearfix" v-for="(item,index) in rankingList" :key="index" @click="detailTo(item)">
						<image v-if="index==0" src="/static/top1.png" class="fl pai"/>
						<image v-if="index==1" src="/static/top2.png" class="fl pai" />
						<image v-if="index==2" src="/static/top3.png" class="fl pai" />
						<view v-if="index>2" class="fl voteListBlock-number">{{index+1}}</view>
						<image :src="item.coverUrl" class="fl" style="width:45px;height: 60px;border-radius:3px;margin-left:10px;" />
						<view class="fl" style="margin-left:10px;margin-top:10px;width:45%;">
							<view class="overLong" style="font-size:16px;color:#333;font-weight:600;">{{item.title}}</view>
							<view class="overLong" style="font-size:12px;color:#888;margin-bottom:9px;">{{item.content}}</view>
						</view>
						<view class="fl" style="width:20%;text-align:right;color:#FF4F4D;font-size:14px;line-height:60px;">{{item.voteCount}}票</view>
					</view>
				</view>
				<view v-if="current===2">
					<view class="voteDistributeBlock">
						<view class="artical_title" style="margin-bottom:22px;font-weight: 600;">投票活动介绍</view>
						<text>投票名称</text>
						<view class="artical_title">{{info.title}}</view>
						<text>内容</text>
						<u-parse :html="info.content" style="color:#333;line-height: 24px;"></u-parse>
						<text>投票人员</text>
						<view>{{info.roleTypeName}}</view>
						<text>投票时间</text>
						<view>{{info.starTime}} ~ {{info.endTime}}</view>
					</view>
				</view>
				<view id="wt-model" v-if="showLoading">
					<u-loading mode="flower" size="46"></u-loading>
					<view style="color:#fff;margin-top: 16px;">
						提交中...
					</view>
				</view>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/config.js'
	export default {
		data() {
			return {
				info:{},
				rankingList:[],
				memberList:[],
				list: [
					{name: '全部投票'}, 
					{name: '排行榜'},
					{name: '活动介绍'},
				],
				id:null,
				value:null,
				current:0,
				showLoading:false,
			}
		},
		onLoad(option){
			this.id = option.id
			this.getRankingList();
			this.getMemberList();
			this.getInfo();
		},
		methods: {
			change:function(index) {
				this.current = index;
			},
			// 全部
			getMemberList:function(){
				var that = this;
				this.$request('app/wypartvote/list',JSON.stringify({voteId: that.id,title: that.value})).then(res=>{
					if(res.code==0){
						that.memberList = res.data.list;		
					}
				})
			},
			// 排行榜
			getRankingList: function () {
				var that = this;
				this.$request('app/wypartvote/list',JSON.stringify({voteId: that.id,isSort: 1})).then(res=>{
					if(res.code==0){
						if (res.code == 0) {
							that.rankingList = res.data.list;
						}
					}
				})
			},
			// 详情
			getInfo: function () {
				var that = this;
				this.$request('app/wyvote/info/'+that.id,JSON.stringify({})).then(res=>{
					if(res.code==0){
						if (res.code == 0) {
							that.info = res.data;
							that.info.browseCount += 1;
							that.info.roleTypeName = that.info.roleType == '0' ? '物业/住户' : '住户';
							if (that.info.state !== '1') {
								var NowTime = new Date();   // 当前时间
								var EndTime = that.info.endTime; //截止时间
								EndTime = EndTime.replace(/-/g, ':').replace(' ', ':');
								EndTime = EndTime.split(':');
								var EndTime1 = new Date(EndTime[0], (EndTime[1] - 1), EndTime[2], EndTime[3], EndTime[4], EndTime[5]);
								that.info.time = (EndTime1 - NowTime.getTime())/1000;
							}
							that.info.image = that.info.image ? that.info.image : '/static/img_vote.png';
						}
					}
				})
			},
			voteHandle: function (item) {
				var that = this;
				that.showLoading = true;
				this.$request('app/uservote/save',JSON.stringify({partVoteId: item.id,})).then(res=>{
					if(res.code==0){
						that.showLoading = false;
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						})
						setTimeout(function () {
							that.getRankingList();
							that.getMemberList();
						}, 1000)	
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
						that.showLoading = false;
					}
				})
			},
			detailTo: function (item) {
				uni.navigateTo({
				    url: '../vote_info/vote_info?id=' + this.id+'&voteId='+item.id+ '&state=' + this.info.state
				});
			},
			routerTo:function(){
				uni.navigateTo({
					url:'../vote/vote'
				})
			}
		}
	}
</script>

<style>
.font_name {
	color: #888;
	font-size: 14px;
	margin-top: 5px;
}
.font_bold{
	font-size:16px;
	color:#333;
	font-weight:600;
}
.voteNumberBlock {
	padding: 10px 20px;
	background: #f5f5f5;
}
.voteNumberBlock_item {
	float: left;
	height: 272px;
	width: 49%;
	background: #fff;
	padding: 5px;
	box-sizing: border-box;
}
.voteNumberBlock_item:nth-child(2n-1) {
	margin-right: 2%;
}
.voteNumberBlock_item-number {
	width: 45px;
	height: 25px;
	background: -webkit-linear-gradient(left, #3558FF, #B65CFF);
	/* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(left, #3558FF, #B65CFF);
	/* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(left, #3558FF, #B65CFF);
	/* Firefox 3.6 - 15 */
	background: linear-gradient(left, #3558FF, #B65CFF);	
	/* 标准的语法 */
	border-radius: 0px 100px 100px 0px;
	color: #fff;
	font-size: 12px;
	padding-left: 10px;
	box-sizing: border-box;
	line-height: 25px;
	position: absolute;
	z-index:3;
	transform: translate(-5px, 5px);
}
.voteListBlock {
	padding: 15px 20px;
	height: 90px;
	box-sizing: border-box;
}
.voteListBlock-number {
	margin-top: 20px;
	margin-left: 8px;
	margin-right: 8px;
	height: 24px;
	width: 24px;
	background: #E5E5EA;
	border-radius: 50%;
	text-align: center;
	line-height: 24px;
}
.pai{
	margin-top:10px;
	width:40px;
	height: 40px;
}
.voteDistributeBlock {
	padding: 20px;
}
.voteDistributeBlock>text {
	font-size: 15px;
	color: #888;
	margin-bottom: 8px;
}
.voteDistributeBlock>view {
	font-size: 15px;
	color: #333;
	margin-bottom: 20px;
}
</style>
