<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false"></u-navbar>
		<view class="section2" style="margin-top:0;padding-top:20px;">
			<view class="prevent_img clearfix" :style="{backgroundImage:'url(' + info.eventPhotosUrl + ')'}">
				<image class="prevent_status fr" v-if="info.state==='1'" src="/static/deal.png"></image>
				<image class="prevent_status fr" v-if="info.state=='0'" src="/static/wait_deal.png"></image>
			</view>
	    </view>
		<view class="formStyle" style="margin-bottom:70px;">
			<u-form :model="info" label-width="auto">
				<u-form-item label="提交时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.createDate" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="提交人" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.createDate" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.type" disabled input-align="right"/>
				</u-form-item>
				<view class="remarks">
					<view>内容</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.text" disabled/>
					</u-form-item>
				</view>
				<view class="remarks" v-if="info.state=='1'">
					<view>处理反馈</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.textReply" disabled/>
					</u-form-item>
				</view>
		    </u-form>
		</view>
		<view class="replyBlock" v-if="info.state=='0'">
			<u-form-item>
				<u-input type="textarea" maxlength="140" :height="20" :auto-height="true" v-model="info.textReply" placeholder="请输入反馈留言"/>
				<u-button slot="right" type="primary" style="width:40%;" size="medium" @click="dealHandle">处理</u-button>
			</u-form-item>
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
				id:null,
				showLoading:false,
				info:{
					state:'0',
					eventPhotosUrl:'/static/prevention.jpg',
					textReply:'',
					text:'2111111111vlofkkkkkkkkkkkkkkkkkkkkkkqeeeeeeeeeeeeeeeeeeeeeeeeee'
				}
			}
		},
		onLoad(option){
			this.id = option.id
			this.getInfo();
		},
		methods: {
			getInfo: function () {
			  var that = this;
			 //  $.ajax({
				// url: url + 'app/wyownersmanagement/info/' + id,
				// type: 'POST',
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	that.infoList = res.data;
				// 	that.infoList.eventPhotosUrl = that.infoList.images ? that.infoList.images : '../image/prevention.jpg';
				// 	switch (that.infoList.type) {
				// 	  case '1': that.infoList.type = '随手拍';
				// 		break;
				// 	  case '2': that.infoList.type = '小区隐患';
				// 		break;
				// 	  case '3': that.infoList.type = '寻求帮助';
				// 		break;
				// 	  case '4': that.infoList.type = '矛盾纠纷';
				// 		break;
				// 	}
				//   }
				// }
			 //  })
			},
			dealHandle: function () {
			  var that = this;
			  that.infoList.textReply = that.infoList.textReply ? that.infoList.textReply.replace(/\s+/g, "") : '';
			  if (that.infoList.textReply == '') {
				vant.Toast({
				  message: '请输入反馈留言！',
				  icon: '../image/warn.png'
				})
			  } else {
				that.showZZ = true;
				// $.ajax({
				//   url: url + 'app/wyownersmanagement/update',
				//   type: 'POST',
				//   data: JSON.stringify({ id: id, textReply: that.infoList.textReply }),
				//   success: function (res) {
				// 	deal(res);
				// 	if (res.code === 0) {
				// 	  vant.Toast({
				// 		message: '处理成功！',
				// 		icon: '../image/success.png'
				// 	  })
				// 	  setTimeout(function () {
				// 		that.showZZ = false;
				// 		that.routerTo();
				// 	  }, 1000)
				// 	} else {
				// 	  that.showZZ = false;
				// 	  vant.Toast({
				// 		message: res.msg,
				// 		icon: '../image/error.png'
				// 	  })
				// 	}
				//   },
				//   error: function (err) {
				// 	that.showZZ = false;
				//   }
				// })
			  }
			},
		}
	}
</script>

<style>
.prevent_img {
  height: 300px;
  width: 300px;
  margin: 0 auto;
  padding-bottom: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.prevent_status {
  transform: translateY(265px);
  width: 55px;
  height: 20px;
}
</style>
