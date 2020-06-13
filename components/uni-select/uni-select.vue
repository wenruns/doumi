<template>
	<view class="uni-select">
		<view class="uni-select-content" :style="style">
			<view class="uni-select-value" v-html="text"></view>
			<view class="uni-select-icon"></view>
		</view>
		<view class="uni-select-options">
			<template v-for="(item,index) in options">
				<view class="uni-select-option"  :key="index" v-if="isObject(item.value, index)" :style="checkStyle(item.value)" v-html="item.text" @click="choose(item, index)">1</view>
				<view class="uni-select-option"  :key="index" v-else v-html="item.text" @click="choose(item, index)">2</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		name:"UniSelect",
		props:{
			value:{
				type: String,
				default: '',
			},
			text:{
				type: String,
				default:'<span style="color: gray;">请选择</span>'
			},
			options:{
				type: Array,
				default: ()=>{
					return [
						{
							text: "选项1",
							value: "1",
						},{
							text: "选项2",
							value: "2",
						},{
							text: "选项3",
							value: "3",
						}
					];
				}
			}
		},
		data(){
			return {
				style: {}
			}
		},
		created(){
			console.log(this.$props.options);
		},
		methods:{
			isObject(item, index){
				if(typeof item == 'object'){
					return true;
				}
				return false;
			},
			choose(item, index){
				console.log(item, index);
				this.text = item.text;
				if(this.isObject(item.value, index)){
					this.value = item.value.value;
					this.style = item.value.style;
				}else{
					this.value = item.value;
				}
			},
			checkStyle(item){
				if(item.style){
					return item.style;
				}
				return {};
			}
		}
	}
</script>

<style>
	.uni-select{
		display: inline-block;
		position: relative;
		/* border: 1px solid red; */
	}
	.uni-select>.uni-select-content{
		cursor: pointer;
		background-color: white;
		border: 1px solid pink;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 5px;
	}
	.uni-select>.uni-select-content>.uni-select-value{
		padding-right: 5px;
	}
	.uni-select>.uni-select-content>.uni-select-icon{
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid gray;
	}
	.uni-select>.uni-select-options{
		position: relative;
		left: 0px;
		top: calc(100% + 1px);
		min-width: calc(100% - 2px);
		background-color: red;
		border: 1px solid pink;
	}
	.uni-select>.uni-select-options>.uni-select-option{
		border-bottom: 1px solid gray;
		background: white;
		padding: 0px 10px;
	}
</style>
