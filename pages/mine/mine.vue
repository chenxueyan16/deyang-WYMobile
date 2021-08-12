<template>
	<view class="page">
		<view class="login_bg">
			<view style="margin:50px 15px 8px 15px;" >
				<u-row gutter="16">
					<u-col span="3">
						<image class="user_img" :src="info.headPortraitUrl"></image>
					</u-col>
					<u-col span="7" class="infoBlock_text">
						<view>
							<text style="font-size:20px;margin-top:8px;color:#fff;width:auto;">{{info.name}}</text>
							<text class="tag">物业</text>
						</view>
						<view style="font-size:16px;margin-top:15px;color:#fff;">{{info.desc}}</view>
					</u-col>
					<u-col span="2" text-align="right"  @click="routerTo('myself')">
						<image class="icon_arrow" src="/static/icon_arrow_white.png" ></image>
					</u-col>
				</u-row>
			</view>	
			<view class="warnBar1" v-if="showWarn">请及时上传拍照，以便通过刷脸进入小区！</view>
		</view>
		<view class="login_block">
			<view class="clearfix itemBlock" v-for="(item,index) in itemList" :key="index" @click="routerTo(item.name2)">
				<image class="fl item_icon" :src="item.icon" ></image>
				<view class="fl">
				  <view class="item_title">{{item.name1}}</view>
				  <view class="item_desc">{{item.desc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showWarn:false,
				info: {
					name: '',
					desc: '',
					tag: '',
					headPortraitUrl: ''
				},
				itemList: [{
					name1: '工作人员',
					icon: '/static/icon_person.png',
					desc: '添加管理工作人员信息',
					name2: 'employee'
				}, {
					name1: '小区管理',
					icon: '/static/icon_house.png',
					desc: '小区人员信息查询与管理',
					name2: 'community'
				}, {
					name1: '关于我们',
					icon: '/static/icon_set.png',
					desc: '退出登录/系统版本',
					name2: 'about'
				}],
			}
		},
		onLoad(){
			try {
			    var userInfo = uni.getStorageSync('userInfo');
				this.getInfo(JSON.parse(userInfo).user.id);	   
			} catch (e) {
			    // error
			} 		 
		},
		methods: {
			getInfo:function(id){
				var that = this;
				this.$request('app/zhsquser/info/' + id,JSON.stringify({})).then(res=>{
					if(res.code==0){
						that.info.name = res.zhsqUser.name ? res.zhsqUser.name : '完善个人信息';
						that.info.desc = res.zhsqUser.idNumber.length==18 ? res.zhsqUser.idNumber : '欢迎使用德阳智慧社区';
						if (!res.zhsqUser.headPortraitUrl) {
							that.info.headPortraitUrl = '/static/pic_avator.png';
							that.showWarn = true;
						} else {
							that.info.headPortraitUrl = res.zhsqUser.headPortraitUrl;
							that.showWarn = false;
						}
					}	
				})
			},
			routerTo: function (name) {
				uni.navigateTo({
				    url: '../'+name+'/'+name+'?edit=1'
				});
			},			
		}
	}
</script>

<style>
.user_img {
  height: 80px;
  width: 60px;
  border-radius: 30px;
}
.icon_arrow {
  margin-top: 10px;
  height: 20px;
  width: 20px;
}
.warnBar1 {
  height: 22px;
  padding: 0 15px;
  background: #FF4F4D;
  color: #fff;
  font-size: 12px;
  line-height: 22px;
}
.login_block {
  width: 90%;
  margin: 0 auto;
  padding: 15px 20px;
  background: #ffffff;
  transform: translateY(-15px);
  border-radius: 5px;
  box-sizing: border-box;
}
.itemBlock {
  height: 80px;
  padding: 16px 0 10px 0;
  box-sizing: border-box;
}
.item_icon {
  height: 34px;
  width: 34px;
  margin-top: 6px;
  margin-right: 20px;
}

.item_title {
  color: #41424F;
  margin-bottom: 4px;
  font-size: 16px;
}

.item_desc {
  color: #CDCDCD;
  font-size: 12px;
}
</style>
