<template>
	<view class="pc-head" :style="themes[theme]">
		<uni-select :options="themeOptions"></uni-select>
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
				default: "green"
			},
			themeOptions:{
				type: Array,
				default: ()=>{
					return [
						{
							text: "green12312312312",
							value: {
								value: "green",
								style: {
									background: "green",
								}
							}
						},{
							text: "blue",
							value: {
								value: "blue",
								style: {
									background: "blue",
								}
							}
						},{
							text: "red",
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
			themes:{
				type: Object,
				default:()=>{
					return {
						green: {
							background: "green",
						},
						blue: {
							background: "blue",
						},
						"sky-blue": {
							background: "sky-blue",
						},
						red: {
							background: "red",
						}
					};
				}
			}
		},
		methods:{
			change(){
				console.log(this.$refs.themeObj.value);
				this.$props.theme = this.$refs.themeObj.value
			}
		},
		created: () => {
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.pc-head{
		/* text-align: center; */
		height: 50px;
		background: #4CD964;
	}
</style>
