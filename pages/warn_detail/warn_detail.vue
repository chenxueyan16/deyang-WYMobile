<template>
	<view>
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" title="详情" :border-bottom="false"></u-navbar>
		<view class="formStyle" style="margin-bottom:70px;">
			<u-form :model="info" label-width="auto">
				<view class="remarks">
					<view>内容</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.text" disabled/>
					</u-form-item>
				</view>
				<u-form-item label="预警类型" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.deployType" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="预警时间" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.deployTime" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="证件类型" v-if="info.deployType!=='重点人员'" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.documentType" disabled input-align="right"/>
				</u-form-item>
				<u-form-item label="证件号" v-if="info.deployType!=='重点人员'" :border-bottom="false" :label-style="{'color':'#888'}">
					<u-input v-model="info.deployTarget" disabled input-align="right"/>
				</u-form-item>
				<u-row gutter="16" style="padding:25px 0;">
					<u-col span="4"><view style="color:transparent">2</view></u-col>
					<u-col span="4">
						<image v-if="info.deployType!=='重点人员'" class="currentphoto" :src="info.deployPic" ></image>
					</u-col>
					<u-col span="4" text-align="right" style="height:160px">
						<image v-if="info.status=='0'" src="/static/wait_deal.png" style="height:20px;width:55px;transform: translateX(4px);"></image>
						<image v-if="info.status=='1'" src="/static/deal.png" style="height:20px;width:55px;transform: translateX(4px);"></image>
					</u-col>
				</u-row>
				<view class="remarks" v-if="info.status!=='0'">
					<view>处理反馈</view>
					<u-form-item :border-bottom="false">
						<u-input type="textarea" :height="20" :auto-height="true" v-model="info.remarks" disabled/>
					</u-form-item>
				</view>
		    </u-form>
		</view>
		<view class="replyBlock" v-if="info.status=='0'">
			<u-form-item>
				<u-input type="textarea" maxlength="140" :height="20" :auto-height="true" v-model="info.remarks" placeholder="请输入反馈留言"/>
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
				info:{
					remarks:'wefret',
					deployPic:'/static/account.png',
					status:'0'
				},
				showLoading:false,
				id:null
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
				// url: url + 'app/wy/alarm/info',
				// type: 'POST',
				// data: JSON.stringify({ id: id }),
				// success: function (res) {
				//   deal(res);
				//   if (res.code === 0) {
				// 	that.info = res.data;
				// 	that.info.documentType = '身份证';
				// 	that.info.deployPic = res.data.deployPic ? res.data.deployPic : '../image/pic_avator.png';
				// 	switch (that.info.deployType) {
				// 	  case 1: that.info.deployType = '人员预警';
				// 		break;
				// 	  case 2: that.info.deployType = '车辆预警';
				// 		break;
				// 	  case 3: that.info.deployType = '未登记人员预警';
				// 		break;
				// 	  case 4: that.info.deployType = '老人预警';
				// 		break;
				// 	  case 5: that.info.deployType = '重点人员';
				// 		that.info.status = '1';
				// 		break;
				// 	}
				//   }
				// }
			 //  })
			},
			dealHandle: function () {
			  var that = this;
			  that.info.remarks = that.info.remarks ? that.info.remarks.replace(/\s+/g, "") : '';
			//   if (that.info.remarks == '') {
			// 	vant.Toast({
			// 	  message: '请输入反馈留言！',
			// 	  icon: '../image/warn.png'
			// 	})
			//   } else {
			// 	that.showZZ = true;
			// 	$.ajax({
			// 	  url: url + 'app/wy/alarm/update',
			// 	  type: 'POST',
			// 	  data: JSON.stringify({ id: id, remarks: that.info.remarks }),
			// 	  success: function (res) {
			// 		deal(res);
			// 		if (res.code == 0) {
			// 		  vant.Toast({
			// 			message: '操作成功！',
			// 			icon: '../image/success.png'
			// 		  })
			// 		  setTimeout(function () {
			// 			that.showZZ = false;
			// 			that.routerTo();
			// 		  }, 1000)
			// 		}
			// 	  },
			// 	  error: function (err) {
			// 		that.showZZ = false;
			// 	  }
			// 	})
			// }
			},
		}
	}
</script>

<style>

</style>
