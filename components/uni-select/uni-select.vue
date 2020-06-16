<template>
	<view class="uni-select">
		<view class="uni-select-content" :style="subStyle" @click="clickSelect">
			<view class="uni-select-value" :style="selectStyle" v-html="subText"></view>
			<view class="uni-select-icon" :style="iconStyle" v-show="iconShow"></view>
		</view>
		<view class="uni-select-options" :style="optionStyle" v-show="showOptions">
			<template v-for="(item,index) in options">
				<view class="uni-select-option" :id="item.value.value" v-if="isObject(item, index)" @click="choose(item, index)" :key="index" >
					<view class="uni-select-option-content" :style="checkStyle(item.value)" v-html="item.text"> </view>
					<view v-show="hadChoice(item, index)" class="had-choice-option"></view>
				</view>
				<view class="uni-select-option" :id="item.value" v-else @click="choose(item, index)" :key="index" >
					<view class="uni-select-option-content" v-html="item.text"> </view>
					<view v-show="hadChoice(item, index)" class="had-choice-option"></view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		name:"UniSelect",
		props:{
			iconShow: {
				type:Boolean,
				default: true,
			},
			defaultValue: {
				type: String,
				default: '',
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
			},
		},
		data(){
			return {
				// 下拉框默认样式
				subStyle: {},
				subValue: '',
				subText: '<span style="color: gray;">请选择</span>',
				// 显示选项
				showOptions: true,
				// 下拉框的初始宽度
				maxW: 0,
				selectStyle: {'min-width': '0px'},
				// 判断是否为初次执行
				firstTime: true,
				iconStyle: {"border-top": "10px solid gray"},
				optionStyle: {position: 'relative'},
			}
		},
		created(){
			// 默认值
			this.subValue = this.defaultValue
		},
		methods:{
			// 判断value是否为对象，
			isObject(item, index){
				var isobj = false;
				var id = '';
				var style = {};
				if(typeof item.value == 'object'){
					isobj = true;
					id = item.value.value;
					style = item.value.style;
				}else{
					id = item.value;
				}
				
				if(id == this.subValue){
					this.subStyle = style;
					this.subText = item.text;
				}
				this.$nextTick(function(){
					uni.createSelectorQuery().in(this).select('#'+id).boundingClientRect(data => {
					    if(data.width > this.maxW && this.firstTime){
							this.maxW = data.width;
							this.selectStyle['min-width'] = (this.maxW) + 'px';
						}
					}).exec();
					if(index == (this.options.length-1) && this.firstTime){
						this.firstTime  = false;
						this.showOptions = false;
						this.optionStyle = {position: 'absolute'};
					}
				})
				
				return isobj;
			},
			// 选择事件
			choose(item, index){
				var value = '';
				if(this.isObject(item, index)){
					value = item.value.value;
					this.subStyle = item.value.style;
				}else{
					value = item.value;
				}
				if(this.subValue != value){
					this.$emit('change', {value: value, data: item, index: index})
				}
				this.subValue = value;
				this.subText = item.text;
				this.showOptions = !this.showOptions;
				this.changeIconStatus();
			},
			// 检测style
			checkStyle(item){
				if(item.style){
					
					return item.style;
				}
				return {};
			},
			// 点击事件
			clickSelect(){
				this.showOptions = !this.showOptions;
				this.changeIconStatus();
				this.$emit('click',{value: this.subValue, text: this.subText, style: this.subStyle})
			},
			// 判断是否选中
			hadChoice(item, index){
				var value = '';
				if(this.isObject(item, index)){
					value = item.value.value;
				}else{
					value = item.value;
				}
				if(this.subValue == value){
					return true;
				}
				return false;
			},
			// 选择框icon变化方法
			changeIconStatus(){
				if(this.showOptions){
					this.iconStyle= {"border-bottom": "10px solid gray"};
				}else{
					this.iconStyle= {"border-top": "10px solid gray"};
				}
			},
		}
	}
</script>

<style>
	.uni-select{
		display: inline-block;
		position: relative;
		border: 1px solid #CCCCCC;
	}
	.uni-select>.uni-select-content{
		cursor: pointer;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 5px;
		min-height: 20px;
	}
	.uni-select>.uni-select-content>.uni-select-value{
		padding-right: 5px;
	}
	.uni-select>.uni-select-content>.uni-select-icon{
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
	}
	.uni-select>.uni-select-options{
		left: -1px;
		top: calc(100% + 1px);
		min-width: calc(100% + 2px);
		background-color: red;
		border: 1px solid pink;
	}
	.uni-select>.uni-select-options>.uni-select-option{
		border-bottom: 1px solid gray;
		background: white;
		cursor: pointer;
		position: relative;
		min-height: 20px;
	}
	.uni-select>.uni-select-options>.uni-select-option>.uni-select-option-content{
		padding: 0px 5px;
		min-height: 20px;
	}
	.uni-select>.uni-select-options>.uni-select-option>.had-choice-option{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
		filter: opacity(5);
	}
</style>
