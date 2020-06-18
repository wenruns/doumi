<template>
	<view class="container">
		<pc-header></pc-header>
		<view>
		
		</view>
	</view>
</template>

<script>
	import pcHeader from '@/components/pc-header/pc-header.vue';
	import { user } from '@/static/js/user.js';
	
	export default {
		components:{
			pcHeader,
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				show: false,
			}
		},
		
		methods: {
			open(){
				this.$refs.popup.open();
			}
		},
		created() {
			console.log('create')
		},
		onShow() {
			console.log('show')
			if(!user.isLogin()){
				uni.navigateTo({
					url:"/pages/login/login",
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		padding: 0px;
		margin: 0px;
	}

</style>
