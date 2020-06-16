<template>
	<view class="container">
		<pc-header></pc-header>
		<view>
		
		</view>
	</view>
</template>

<script>
	import pcHeader from '@/components/pc-header/pc-header.vue';
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
