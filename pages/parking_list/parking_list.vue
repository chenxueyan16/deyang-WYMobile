<template>
	<view class="page">
		<u-navbar back-icon-name="arrow-leftward" back-icon-color="#333" :title="title" :border-bottom="false"></u-navbar>
		<u-tabs :list="list" :current="current" :height="100" :is-scroll="false" bar-width="80" @change="change"></u-tabs>
		<!-- 异常停车 -->
		<view v-if="current==0">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="查询时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search1.inBeginTime" type="select" input-align="right" @click="showTime=true" />
					</u-form-item>
					<u-form-item label="查询车牌" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search1.plateCode" :clearable="false" input-align="right" placeholder="请输入车牌"/>
					</u-form-item>
					<p style="color:#FF4F4D;font-size:14px;">注：仅显示无出场的，手工入场记录</p>
					<u-form-item :border-bottom="false" :label-style="{'color':'#888'}">
						<view class="purebtn btnConfirm" style="width:100%;" @click="searchHandle1">查询</view>
					</u-form-item>	
				</u-form>
			</view>
			<view class="parkingBlock clearfix" @click="switchTo" style="padding:0px 20px;">
				<image class="fl" src="/static/parking5.png" style="width:100px;height: 80px;" />
				<view class="fl" style="margin-left:30px;padding:15px 15px 0px 0px;box-sizing:border-box;">
					<view style="font-size:16px;color:#333;font-weight:500;">手工入场</view>
					<view style="font-size:14px;color:#888;margin-top:6px;">拍照扫描有误请点击</view>
				</view>
			</view>
			<u-empty v-if="list1.length==0" style="margin-top:30px;" text="设置下查询条件试试～" src="/static/img_noresult.png" iconSize="160"></u-empty>
			<view class="parkingBlock" v-for="(item,index) in list1" :key="index">
				<view class="clearfix">
				    <text class="fl" style="color:#333;font-size:14px;font-weight:bold;">{{item.plateCode}}</text>
				    <text class="fl tag">{{item.inSourType}}</text>
					<u-button class="fr" v-if="!item.outDate" type="primary" size="mini" @click="outHandle(item)">人工放行</u-button>
				</view>
				<view class="parkingBlock_imgtitle" v-if="item.inPhotoUrl">进场图片</view>
				<view class="comDetail_img" v-if="item.inPhotoUrl">
				    <image v-for="(sitem,index) in item.inPhoto" :key="index" :src="sitem" style="border-radius:4px;height:60px;width:60px;" />
				</view>
				<view class="parkingBlock_imgtitle" v-if="item.outPhotoUrl">出场图片</view>
				<view class="comDetail_img" v-if="item.outPhotoUrl">
				    <image v-for="(sitem,index) in item.outPhoto" :key="index" :src="sitem" style="border-radius:4px;height:60px;width:60px;" />
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">进场时间：</text>
					<text class="fr">{{item.inDate}}</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix" v-if="item.outDate">
					<text class="fl">出场时间：</text>
					<text class="fr">{{item.outDate}}</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">{{item.inGatewayName}}：</text>
					<text class="fr">进</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix" v-if="item.outGatewayName">
					<text class="fl">{{item.outGatewayName}}：</text>
					<text class="fr">出</text>
				</view>		    
			</view>
		</view>
		<!-- 在停车辆 -->
		<view v-if="current==1">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="查询时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search2.inBeginTime" type="select" input-align="right" @click="showTime=true" />
					</u-form-item>
					<u-form-item label="查询车牌" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search2.plateCode" :clearable="false" input-align="right" placeholder="请输入车牌"/>
					</u-form-item>
					<u-form-item :border-bottom="false" :label-style="{'color':'#888'}">
						<view class="purebtn btnConfirm" style="width:100%;" @click="searchHandle2">查询</view>
					</u-form-item>
				</u-form>
			</view>
			<u-empty v-if="list2.length==0" style="margin-top:30px;" text="设置下查询条件试试～" src="/static/img_noresult.png" iconSize="160"></u-empty>
			<view class="parkingBlock" v-for="(item,index) in list2" :key="index">
				<view class="clearfix">
				    <text class="fl" style="color:#333;font-size:14px;font-weight:bold;">{{item.plateCode}}</text>
				    <text class="fl tag">{{item.memberType}}</text>
					<u-button class="fr" v-if="!item.outDate" type="primary" size="mini" @click="outHandle(item)">人工放行</u-button>
				</view>
				<view class="parkingBlock_imgtitle" v-if="item.inPhotoUrl">进场图片</view>
				<view class="comDetail_img" v-if="item.inPhotoUrl">
				    <image v-for="(sitem,index) in item.inPhoto" :key="index" :src="sitem" style="border-radius:4px;height:60px;width:60px;" />
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">进场时间：</text>
					<text class="fr">{{item.inDate}}</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">{{item.inGatewayName}}：</text>
					<text class="fr">进</text>
				</view>   
			</view>
		</view>
		<!-- 登记车辆 -->
		<view v-if="current==2">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="查询时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search3.inBeginTime" type="select" input-align="right" @click="showTime=true" />
					</u-form-item>
					<u-form-item label="查询车牌" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search3.plateCode" :clearable="false" input-align="right" placeholder="请输入车牌"/>
					</u-form-item>
					<u-form-item :border-bottom="false" :label-style="{'color':'#888'}">
						<view class="purebtn btnConfirm" style="width:100%;" @click="searchHandle3">查询</view>
					</u-form-item>
				</u-form>
			</view>
			<u-empty v-if="list3.length==0" style="margin-top:30px;" text="设置下查询条件试试～" src="/static/img_noresult.png" iconSize="160"></u-empty>
			<view class="infoBlock" v-if="list3.length>0" v-for="(item,index) in list3" :key="index">
				<view class="clearfix">
					<view class="infoBlock_text">
						<view class="clearfix infoBlock_text-item">
							<text class="fl" style="color:#333;font-weight:bold;">{{item.plateCode}}</text>
							<text class="fr nowTag" style="width:35px;text-align:center;color:#fff;">{{item.memberType}}</text>
						</view>
						<view class="clearfix infoBlock_text-item">
							<text class="fl">车主姓名</text>
							<text class="fr">{{item.ownerName}}</text>
						</view>
						<view class="clearfix infoBlock_text-item">
							<text class="fl">联系电话</text>
							<text class="fr">{{item.phone}}</text>
						</view>
						<view class="clearfix infoBlock_text-item">
							<text class="fl">车辆特征</text>
							<text class="fr">{{item.remarks}}</text>
						</view>
						<view class="clearfix infoBlock_text-item">
							<text class="fl">有效期截止时间</text>
							<text class="fr">{{item.endDate}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 进出场记录 -->
		<view  v-if="current==3">
			<view class="formStyle" style="background-color: #fff;">
				<u-form ref="uForm" label-width="auto">
					<u-form-item label="进场时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search4.inBeginTime" type="select" input-align="right" @click="showTime1=true" />
					</u-form-item>
					<u-form-item label="出场时间" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search4.outEndTime" type="select" input-align="right" @click="showTime2=true" />
					</u-form-item>
					<u-form-item label="查询车牌" :border-bottom="false" :label-style="{'color':'#888'}">
						<u-input v-model="search4.plateCode" :clearable="false" input-align="right" placeholder="请输入车牌"/>
					</u-form-item>
					<u-form-item :border-bottom="false" :label-style="{'color':'#888'}">
						<view class="purebtn btnConfirm" style="width:100%;" @click="searchHandle4">查询</view>
					</u-form-item>
				</u-form>
				<u-calendar v-model="showTime1" mode="date" :max-date="maxDate" @change="confirmHandle1"></u-calendar>
				<u-calendar v-model="showTime2" mode="date" :max-date="maxDate" @change="confirmHandle2"></u-calendar>
			</view>
			<u-empty v-if="list4.length==0" style="margin-top:30px;" text="设置下查询条件试试～" src="/static/img_noresult.png" iconSize="160"></u-empty>
			<view class="parkingBlock" v-for="(item,index) in list4" :key="index">
				<view class="clearfix">
				    <text class="fl" style="color:#333;font-size:14px;font-weight:bold;">{{item.plateCode}}</text>
				    <text class="fl tag">{{item.memberType}}</text>
					<text class="fl tag">{{item.inSourType}}</text>
					<text class="fl tag">{{item.outSourType}}</text>
				</view>
				<view class="parkingBlock_imgtitle" v-if="item.inPhotoUrl">进场图片</view>
				<view class="comDetail_img" v-if="item.inPhotoUrl">
				    <image v-for="(sitem,index) in item.inPhoto" :key="index" :src="sitem" style="border-radius:4px;height:60px;width:60px;" />
				</view>
				<view class="parkingBlock_imgtitle" v-if="item.outPhotoUrl">出场图片</view>
				<view class="comDetail_img" v-if="item.outPhotoUrl">
				    <image v-for="(sitem,index) in item.outPhoto" :key="index" :src="sitem" style="border-radius:4px;height:60px;width:60px;" />
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">进场时间：</text>
					<text class="fr">{{item.inDate}}</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix" v-if="item.outDate">
					<text class="fl">出场时间：</text>
					<text class="fr">{{item.outDate}}</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix">
					<text class="fl">{{item.inGatewayName}}：</text>
					<text class="fr">进</text>
				</view>
				<view class="parkingBlock_itemtitle clearfix" v-if="item.outGatewayName">
					<text class="fl">{{item.outGatewayName}}：</text>
					<text class="fr">出</text>
				</view>		    
			</view>
		</view>
		<!-- 日期选择 -->
		<u-calendar v-model="showTime" mode="date" :max-date="maxDate" @change="confirmHandle"></u-calendar>
		<!-- 加载更多 -->
		<u-loadmore :status="status" @loadmore="getMore" bg-color="#F5F5F5"/>
		<!-- 放行 -->
		<u-popup v-model="showDialog" mode="center" border-radius="14" width="300px">
			<view class="dialogBlock_title" style="font-weight: bold;">{{outData.plateCode}}</view>
			<view v-if="!alreadyPay" style="margin:0 16px;text-align: center;">停车未交费，是否放行</view>
			<view class="clearfix" v-if="alreadyPay" style="margin:0 16px">
				<view class="fl" v-for="item in buttons" v-if="item.gatewayState==0" :class="[selectGatewayName==item.gatewayName?'buttonGroup_active':'buttonGroup_normal','buttonGroup']" @click="selectHandle(item)">
					<image :src="selectGatewayName==item.gatewayName?'/static/outselect.png':'/static/outnormal.png'" style="width:18px;height: 16px;" />{{item.gatewayName}}
				</view>
				<view v-for="item in buttons" v-if="item.gatewayState==1" class="buttonGroup buttonGroup_offline fl">
					<image src="/static/outerror.png" style="width:18px;height: 16px;" />{{item.gatewayName}}
				</view>
				<view v-for="item in buttons" v-if="item.gatewayState==2" class="buttonGroup buttonGroup_error fl">
					<image src="/static/outnormal.png" style="width:18px;height: 16px;" />{{item.gatewayName}}
				</view>
			</view>
			<view class="clearfix dialogBlock_btnGroup" v-if="!alreadyPay">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="cancelHandle">否</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="payHandle">是</view>
			</view>
			<view class="clearfix dialogBlock_btnGroup" v-if="alreadyPay">
				<view class="fl dialogBlock_btn" style="color:#888;border-right:1px solid #DDDDDD;" @click="cancelHandle">取消</view>
				<view class="fr dialogBlock_btn" style="color:#295BFD" @click="upHandle(0);">抬杆请求</view>
			</view>
		</u-popup>
		<view id="wt-model" v-if="showLoading">
			<u-loading mode="flower" size="46"></u-loading>
			<view style="color:#fff;margin-top: 16px;">
				提交中...
			</view>
		</view>		
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				title:'',
				id:null,
				list: [
					{name: '异常停车'}, 
					{name: '在停车辆'},
					{name: '登记车辆'},
					{name: '进出场记录'},
				],
				current:0,
				maxDate: moment().format('YYYY-MM-DD'),
				currentDate: new Date(),
				page:1,
				showTime:false,
				status:'loadmore',
				showLoading:false,
				showDialog:false,
				outData:{},//人工放行，
				buttons:[
					{gatewayName:'出口',gatewayState:0},
					{gatewayName:'出口3',gatewayState:0},
					{gatewayName:'出口1',gatewayState:1},
					{gatewayName:'出口2',gatewayState:2}
				],//出入口
				alreadyPay:true,
				selectGatewayName:'出口',
				selectGatewayId:null,
				canConfirm: false,
				// 异常停车
				list1:[{
					plateCode:'陕A e1313',
					inSourType:1,
					inPhotoUrl:'13',
					inPhoto:['/static/account.png'],
					outPhotoUrl:'1',
					outPhoto:['/static/account.png'],
				}],
				search1:{},
				// 在停车辆
				list2:[],
				search2:{},
				// 登记车辆
				list3:[{
					plateCode:'陕A e1313',
					memberType:1,
					inPhotoUrl:'13',
					inPhoto:['/static/account.png'],
					outPhotoUrl:'1',
					outPhoto:['/static/account.png'],
				}],
				search3:{},
				// 进出场记录
				showTime1:false,
				showTime2:false,
				list4:[],
				search4:{}
				
			}
		},
		onLoad(option){
			this.title = option.name
			this.id = option.id
			// this.init()
		},
		methods: {
			change:function(index) {
				this.current = index;
				// this.init()
			},	
			// 初始化查询条件及查询结果
			init: function () {
				this.search1 = { plateCode: '', inBeginTime: '' };
				this.search2 = { plateCode: '', inBeginTime: '' };
				this.search3 = { plateCode: '', inBeginTime: '' };
				this.search4 = { plateCode: '', inBeginTime: '', outEndTime: '' };
				this.list1 = [];
				this.list2 = [];
				this.list3 = [];
				this.list4 = [];
				this.page = 1
				// this.error = false
				// this.loading = false
			  // this.finished = false
			},
			confirmHandle:function(e){
				this.search1.inBeginTime = e.result;
				switch (this.current){
					case 0:this.search1.inBeginTime = e.result;
					break;
					case 1:this.search2.inBeginTime = e.result;
					break;
					case 2:this.search3.inBeginTime = e.result;
					break;
				}
			},
			getMore:function(){
				this.page += 1
				this.status = 'loading'
				switch (this.current){
					case 0:this.searchHandle1(this.page);
					break;
					case 1:this.searchHandle2(this.page);
					break;
					case 2:this.searchHandle3(this.page);
					break;
				}
			},
			// 异常停车查询
			searchHandle1: function (page) {
				var that = this;
				console.log(page)
				// if (flag) {
				// 	that.list1 = []
				// 	that.page = 1
				// }
			//        $.ajax({
			//             url: url + 'app/park/parkinoutrecord/listUnusualCar',
			//             type: 'POST',
			//             data: JSON.stringify({ parkId: id, plateCode: that.search1.plateCode, inBeginTime: that.search1.inBeginTime,limit: 5, page: that.page }),
			//             success: function (res) {
			//               deal(res);
			
			//               that.loading = false
			//               that.finished = false
			
			//               if (res.code == 0) {
			//                 let list1 = res.data.list;
			//                 list1.map(function (item) {
			//                   if (item.inPhotoUrl && item.inPhotoUrl.indexOf(",") >= 0) {
			//                     item.inPhoto = item.inPhotoUrl.split(',');
			//                     // if (item.inPhoto.length > 3) {
			//                     //   item.inPhoto = item.inPhoto.splice(3)
			//                     // }
			//                   } else {
			//                     item.inPhoto = new Array();
			//                     item.inPhoto[0] = item.inPhotoUrl;
			//                   }
			//                   if (item.outPhotoUrl && item.outPhotoUrl.indexOf(",") >= 0) {
			//                     item.outPhoto = item.outPhotoUrl.split(',');
			//                     // if (item.outPhoto.length > 3) {
			//                     //   item.outPhoto = item.inPhoto.splice(3)
			//                     // }
			//                   } else {
			//                     item.outPhoto = new Array();
			//                     item.outPhoto[0] = item.outPhotoUrl;
			//                   }
			//                   switch (item.inSourType) {
			//                     case 0: item.inSourType = '终端生成';
			//                       break;
			//                     case 1: item.inSourType = '手工入场';
			//                       break;
			//                     case 2: item.inSourType = '无牌进场';
			//                       break;
			//                   }
			//                 })
			//                 that.list1.push(...list1)
			
			//                 if (that.list1.length >= res.data.totalCount) {
			//                   that.finished = true;
			//                 }
			//                 console.log(that.list1, res.data.totalCount, that.page)
			//               } else {
			//                 that.error = true;
			//               }
			              
			//             }
			//           })
			},
			// 在停车辆查询
			searchHandle2: function (page) {
			    var that = this;
			//           $.ajax({
			//             url: url + 'app/park/parkinoutrecord/list',
			//             type: 'POST',
			//             data: JSON.stringify({ parkId: id, plateCode: that.search2.plateCode, inBeginTime: that.search2.inBeginTime, limit: 5, page: that.page }),
			//             success: function (res) {
			//               deal(res);
			
			//               that.loading = false
			//               that.finished = false
			
			//               if (res.code == 0) {
			//                 let list2 = res.data.list;
			//                 list2.map(function (item) {
			//                   if (item.inPhotoUrl && item.inPhotoUrl.indexOf(",") >= 0) {
			//                     item.inPhoto = item.inPhotoUrl.split(',');
			//                     // if (item.inPhoto.length > 3) {
			//                     //   item.inPhoto = item.inPhoto.splice(3)
			//                     // }
			//                   } else {
			//                     item.inPhoto = new Array();
			//                     item.inPhoto[0] = item.inPhotoUrl;
			//                   }
			//                   switch (item.memberType) {
			//                     case 0: item.memberType = '固定';
			//                       break;
			//                     case 1: item.memberType = '储值';
			//                       break;
			//                     case 2: item.memberType = '会员';
			//                       break;
			//                     case 3: item.memberType = '临时';
			//                       break;
			//                   }
			//                 })
			//                 that.list2.push(...list2)
			
			//                 if (that.list2.length >= res.data.totalCount) {
			//                   that.finished = true;
			//                 }
			//                 console.log(that.list2, res.data.totalCount, that.page)
			//               } else {
			//                 that.error = true;
			//               }
			//             }
			//           })
			},
			// 登记车辆查询
			searchHandle3: function (page) {
			    var that = this;
			
			//           $.ajax({
			//             url: url + 'app/park/parkcarinfo/list',
			//             type: 'POST',
			//             data: JSON.stringify({ parkId: id, plateCode: that.search3.plateCode, inBeginTime: that.search3.inBeginTime, limit: 5, page: that.page }),
			//             success: function (res) {
			//               deal(res);
			
			//               that.loading = false
			//               that.finished = false
			
			//               if (res.code == 0) {
			
			//                 let list3 = res.data.list;
			//                 list3.map(function (item) {
			//                   item.phone = item.phone + '';
			//                   item.phone = item.phone.substr(0, 3) + "******" + item.phone.substr(7);
			//                   switch (item.memberType) {
			//                     case 0: item.memberType = '固定';
			//                       break;
			//                     case 1: item.memberType = '储值';
			//                       break;
			//                     case 2: item.memberType = '会员';
			//                       break;
			//                     case 3: item.memberType = '临时';
			//                       break;
			//                   }
			//                 })
			//                 that.list3.push(...list3)
			
			//                 if (that.list3.length >= res.data.totalCount) {
			//                   that.finished = true;
			//                 }
			//                 console.log(that.list3, res.data.totalCount, that.page)
			//               } else {
			//                 that.error = true;
			//               }
			//             }
			//           })
			},
			confirmHandle1:function(e){
				this.search4.inBeginTime = e.result;
			},
			confirmHandle2:function(e){
				this.search4.outEndTime = e.result;
			},
			// 进出场记录查询
			searchHandle4: function (page) {
			    var that = this;
			//           $.ajax({
			//             url: url + 'app/park/parkinoutrecord/listInOutRecord',
			//             type: 'POST',
			//             data: JSON.stringify({ parkId: id, plateCode: that.search4.plateCode, inBeginTime: that.search4.inBeginTime, outEndTime: that.search4.outEndTime,limit: 5, page: that.page }),
			//             success: function (res) {
			//               deal(res);
			
			//               that.loading = false
			//               that.finished = false
			
			//               if (res.code == 0) {
			//                 let list4 = res.data.list;
			//                 list4.map(function (item) {
			//                   if (item.inPhotoUrl && item.inPhotoUrl.indexOf(",") >= 0) {
			//                     item.inPhoto = item.inPhotoUrl.split(',');
			//                     if (item.inPhoto.length > 3) {
			//                       item.inPhoto = item.inPhoto.splice(3)
			//                     }
			//                   } else {
			//                     item.inPhoto = new Array();
			//                     item.inPhoto[0] = item.inPhotoUrl;
			//                   }
			//                   if (item.outPhotoUrl && item.outPhotoUrl.indexOf(",") >= 0) {
			//                     item.outPhoto = item.outPhotoUrl.split(',');
			//                     if (item.outPhoto.length > 3) {
			//                       item.outPhoto = item.inPhoto.splice(3)
			//                     }
			//                   } else {
			//                     item.outPhoto = new Array();
			//                     item.outPhoto[0] = item.outPhotoUrl;
			//                   }
			//                   switch (item.memberType) {
			//                     case 0: item.memberType = '固定';
			//                       break;
			//                     case 1: item.memberType = '储值';
			//                       break;
			//                     case 2: item.memberType = '会员';
			//                       break;
			//                     case 3: item.memberType = '临时';
			//                       break;
			//                   }
			//                   switch (item.inSourType) {
			//                     case 0: item.inSourType = '终端生成';
			//                       break;
			//                     case 1: item.inSourType = '手工入场';
			//                       break;
			//                     case 2: item.inSourType = '无牌进场';
			//                       break;
			//                   }
			//                   switch (item.outSourType) {
			//                     case 0: item.outSourType = '终端生成';
			//                       break;
			//                     case 1: item.outSourType = '手工出场';
			//                       break;
			//                     case 2: item.outSourType = '无牌出场';
			//                       break;
			//                   }
			//                 })
			//                 that.list4.push(...list4)
			
			//                 if (that.list4.length >= res.data.totalCount) {
			//                   that.finished = true;
			//                 }
			//                 console.log(that.list4, res.data.totalCount, that.page)
			//               } else {
			//                 that.error = true;
			//               }
			//             }
			//           })
			},
			// 人工放行-获取出入口
			outHandle: function (data) {
				this.outData = data
				this.showDialog = true;
				var that = this;
				// $.ajax({
				// url: url + 'app/park/parkgatewayinfo/list',
				// type: 'POST',
				// data: JSON.stringify({ parkId: id, isInOut: 1 }),
				// success: function (res) {
				//   if (res.code == 0) {
				// 	that.buttons = res.data.list;
				//   }
				// }
			 //  })
			},
			// 人工放行--选择出入口
			selectHandle: function (item) {
			  this.selectGatewayName = item.gatewayName;
			  this.selectGatewayId = item.id;
			  this.canConfirm = true;
			},
			// 未支付--取消人工放行
			cancelHandle:function(){
				this.showDialog = false;
				this.selectGatewayName = '';
				this.selectGatewayId = null;
				this.canConfirm = false;
				this.alreadyPay = true;
				if (this.current == 0) {
					this.searchHandle1(1);
				} else if (this.current == 1) {
					this.searchHandle2(1);
				}
			},
			// 未支付--强制抬杆请求
			payHandle: function () {
				this.alreadyPay = true;
				this.upHandle(1);
			},
			// 验证抬杆请求
			upHandle: function (forceOpen) {
			    if (!this.canConfirm) {
			        return false;
			    }
				var that = this;
				that.showLoading = true;
			          // $.ajax({
			          //   url: url + 'app/park/parkinoutrecord/sendOutOpenDoorCommond',
			          //   type: 'POST',
			          //   data: JSON.stringify({ parkId: id, inGatewayId: that.inGatewayId, forceOpen: forceOpen }),
			          //   success: function (res) {
			          //     deal(res);
			          //     if (res.code == 0) {
			          //       vant.Toast({
			          //         icon: '../image/success.png',
			          //         message: res.msg
			          //       })
			          //       that.inGatewayId = null;
			          //       that.yes = true;
			          //       // that.canConfirm = false;
			          //       that.showZZ = false;
			          //     } else if (res.code == 601) {
			          //       that.yes = false;
			          //       that.showZZ = false;
			          //     } else {
			          //       vant.Toast({
			          //         icon: '../image/error.png',
			          //         message: res.msg
			          //       })
			          //       that.showZZ = false;
			          //     }
			          //   },
			          //   error: function (err) {
			          //     that.showZZ = false;
			          //   }
			          // })
			},
			switchTo: function () {
				uni.navigateTo({
					url: '../parking_detail/parking_detail?id=' + this.id + '&name=' + this.title
				});
			},
		}
	}
</script>

<style>
.parkingBlock {
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  margin: 10px 20px 0px 20px;
}
.parkingBlock_imgtitle {
  color: #888;
  font-size: 14px;
  margin-bottom: 6px;
}
.parkingBlock_itemtitle>text:first-child {
  color: #888;
  font-size: 14px;
}
.parkingBlock_itemtitle {
  height: 24px;
  line-height: 24px;
}
.parkingBlock_itemtitle>text:last-child {
  color: #333;
  font-size: 14px;
}
.infoBlock_text-item>text:first-child{
	width:auto;
	min-width: 100px;
}
.infoBlock_text-item>text:last-child{
	text-align: right;
}
.nowTag {
  font-size: 12px;
  background: #53A6FF;
  padding-left: 2px;
  transform: translateX(20px);
  border: 1px solid;
  border-radius: 10px 0px 0px 10px;
}
</style>
