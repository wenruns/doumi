<template>
	<view class="pc-head" :style="themes[mainTheme]">
		<uni-select :options="themeOptions" :defaultValue="mainTheme" @change="change" style=""></uni-select>
	</view>
</template>

<script>
	import uniSelect from '@/components/uni-select/uni-select.vue';
	export default {
		props:{
			uniSelect,
		},
		name: "PcHeader",
		props:{
			theme:{
				type: String,
				default: "red"
			},
			themeOptions:{
				type: Array,
				default: ()=>{
					return [
						{
							text: "绿色的爱丽丝",
							value: {
								value: "green",
								style: {
									background: "green",
								}
							}
						},{
							text: "蓝色的天团",
							value: {
								value: "blue",
								style: {
									background: "blue",
								}
							}
						},{
							text: "红色的玫瑰",
							value: {
								value: "red",
								style: {
									background: "red",
								}
							}
						}
					];
				},
			},
		},
		data() {
			return {
				mainTheme: '',
				themes: {},
			};
		},
		created() {
			this.mainTheme = this.$props.theme;
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
			},
		},
		
	}
</script>

<style>
	.pc-head{
		/* text-align: center; */
		height: 50px;
		background: #4CD964;
	}
</style>
