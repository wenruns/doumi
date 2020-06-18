<template>
	<view class="pc-head" :style="themes[mainTheme]">
		<view></view>
		<view class="title-content">斗米科技</view>
		<view>
			<a-select :options="themeOptions" :defaultValue="mainTheme" @change="change" class="theme" :iconShow="false"></a-select>
			<!-- <u-icon name="list-dot" class="list-dot" @click="test"></u-icon> -->
		</view>
	</view>
</template>

<script>
	import aSelect from '@/components/wen-select/wen-select.vue'; 
	import { common } from '@/static/js/common.js';
	export default {
		name: "PcHeader",
		components:{
			aSelect,
		},
		props:{},
		data() {
			return {
				mainTheme: '',
				themes: {},
				themeOptions: [],
			};
		},
		created() {
			var customConfigs = common.getStorage('custom_config');
			var customSetting = common.getCustomSetting();
			this.mainTheme = customSetting && customSetting.theme ? customSetting.theme : customConfigs.defaultTheme;
			this.themeOptions = customConfigs.themes;
			this.themeOptions.forEach((item, index)=>{
				if(typeof item.value == 'object'){
					this.themes[item.value.value] = item.value.style
				}else{
					this.themes[item.value] = {};
				}
			})
		},
		methods:{
			change(data){
				this.mainTheme = data.value
				common.setCustomSetting('theme', data.value);
			},
			test(){
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success: function (res) {
				        const latitude = res.latitude;
				        const longitude = res.longitude;
				        uni.openLocation({
				            latitude: latitude,
				            longitude: longitude,
				            success: function () {
				                console.log('success');
				            }
				        });
				    }
				});
			}
		},
		
	}
</script>

<style>
	.pc-head{
		/* text-align: center; */
		height: 50px;
		background: #4CD964;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.pc-head>.title-content{
		font-size: 25px;
		/* color: white; */
		padding: 10px;
		box-sizing: border-box;
	}
	.theme{
		float: right;
		margin: 10px;
		color: white;
	}
</style>
