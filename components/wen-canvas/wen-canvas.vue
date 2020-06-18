<template>
	<view class="wen-canvas" :style="'width:'+width+';height:'+height+';'" >
		<canvas canvas-id="wen-canvas" ></canvas>
	</view>
</template>

<script>
	import { canvas } from '@/static/js/canvas.js';
	
	export default {
		name: "WenCanvas",
		props: {
			width: {
				type: String | Number,
				default: '100vw',
			},
			height: {
				type: String | Number,
				default: '100vh',
			},
			
		},
		data() {
			return {
				
			};
		},
		created() {
			console.log(canvas)
			console.log('sss',canvas.hasContent('wen-canvas'))
		}
	}
</script>

<style>
	.wen-canvas{
		background: transparent;
		border: 1px solid red;
	}
</style>
