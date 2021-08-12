<template>
	<view class="content page">
		<u-tabbar v-model="current" :list="list" active-color="#295BFD" inactive-color="#999"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					iconPath: "../../static/icon_home_normal.png",
					selectedIconPath: "../../static/icon_home_selected.png",
					text: '首页',
					customIcon: false,
					pagePath: '/pages/home/home',
				},{
					iconPath: "../../static/icon_mine_normal.png",
					selectedIconPath: "../../static/icon_mine_selected.png",
					text: '我的',
					customIcon: false,
					pagePath: '/pages/mine/mine',
				}],
				current: 0
			}
		},
		onLoad() {		
			uni.switchTab({
			    url: '../home/home'
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
