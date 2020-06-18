<template>
	<view class="login-box">
		<canvas canvas-id="test-id" class="canvas-box" type="webgl" :disable-scroll="false" @mousedown="touchStartEvent" @mousemove="touchMoveEvent" @mouseup="touchEndEvent"></canvas>
	</view>
</template>

<script>
	export default {
		name: "PcLogin",
		props:{
			
		},
		data() {
			return {
				lognTap: false,
				hadMove: false,
				hadDown: false,
				startPos: {x: null, y: null},
				previosPos: {x: null, y: null},
				error: false,
				cancel: false,
				canvasContent: null,
				lineWidth: 1,
			};
		},
		methods:{
			touchStartEvent(e){
				console.log('touchstart')
				try{
					this.hadDown = true;
					this.previosPos = this.startPos = this.getMousePos();
					if(!this.canvasContent){
						this.canvasContent = uni.createCanvasContext('test-id', this)
						// this.canvasContent.setLineWidth(1);
					}
					// this.makeBroken();
					var h = setTimeout(()=>{
						if(!this.hadMove && this.hadDown && !this.cancel){
							this.lognTap = true;
							this.longTapEvent(e);
						}
						clearTimeout(h);
					}, 3000)
				}catch(err){
					this.error = true;
					this.errorEvent(e, err, 'start');
				}
			},
			touchMoveEvent(e){
				try{
					if(this.lognTap || !this.hadDown || this.cancel){
						return false;
					}
					this.hadMove = true;
					var pos = this.getMousePos();
					
					this.canvasContent.save();
					this.canvasContent.beginPath();
					this.canvasContent.moveTo(this.previosPos.x, this.previosPos.y);
					this.canvasContent.setLineWidth(this.lineWidth);
					this.canvasContent.lineTo(pos.x, pos.y);
					this.canvasContent.closePath();
					this.canvasContent.strokeStyle = 'red';
					this.canvasContent.stroke();
					this.canvasContent.draw(true);
					this.canvasContent.restore();
					
					// var w = Math.abs(pos.x - this.previosPos.x);
					// var h = Math.abs(pos.y - this.previosPos.y);
					// var data = uni.canvasGetImageData({
					// 	canvasId:'test-id',
					// 	x: this.previosPos.x,
					// 	y: this.previosPos.y,
					// 	width: w,
					// 	height: h,
					// 	success(rst) {
					// 		console.log(rst)
					// 	},
					// 	fail(err) {
					// 		console.log(err)
					// 	}
					// })
					// console.log('data', data)
					this.previosPos = pos;
					this.makeBroken();
					this.lineWidth+=0.01;
				}catch(err){
					this.error = true;
					this.errorEvent(e, err, 'move');
				}
			},
			touchEndEvent(e){
				try{
					var pos = this.getMousePos();
					
					console.log('touchend',pos)
					var x = this.startPos.x;
					var y = this.startPos.y;
					var h = setTimeout(()=>{
						clearTimeout(h);
						// this.canvasContent.draw();
						console.log('clear.....')
						this.canvasContent.clearRect(x-100, y-250 , 500, 500);
						this.canvasContent.draw(true);
					}, 1000)
					// 初始化数据
					this.lognTap = false;
					this.hadDown = false;
					this.hadMove = false;
					this.startPos = {x: null, y: null};
					this.cancel = false;
					this.error = false;
					this.previosPos = {x: null, y: null};
					this.lineWidth = 0;
				}catch(err){
					this.error = true;
					this.errorEvent(e, err, 'end');
				}
			},
			touchCancelEvent(e){
				try{
					var pos = this.getMousePos();
					console.log('touchcancel',pos)
				}catch(err){
					this.error = true;
					this.errorEvent(e, err, 'cancel');
				}
			},
			longTapEvent(e){
				try{
					console.log('longtap')
				}catch(err){
					this.error = true;
					this.errorEvent(e, err, 'longtap');
				}
			},
			errorEvent(e, err, event){
				console.log('error', event, err)
			},
			getMousePos(pos='offset', scroll = false){
				var et = event || window.event;
				var res = {x:null,y:null};
				switch(pos){
					case 'client':
						res.x = et.clientX;
						res.y = et.clientY;
						break;
					case 'page':
						res.x = et.pageX;
						res.y = et.pageY;
						break;
					case 'screen':
						res.x = et.screenX;
						res.y = et.screenY;
						break;
					case 'layer':
						res.x = et.layerX;
						res.y = et.layerY;
						break;
					case 'offset':
					default:
						res.x = et.offsetX;
						res.y = et.offsetY;
				}
				return res;
			},
			makeBroken(pos = null, level = 0, depth = 0){
				
				console.log('makeBroken')
				if(!pos || level == 0){
					pos = this.getMousePos()
					// this.canvasContent.save();
					
				}
				
				// 裂痕条数n
				var n = Math.round(Math.random()*10);
				for(var i=0; i<n; i++){
					var nextPos = this.makeCoordinate(pos, level==0);
					this.canvasContent.save();
					this.canvasContent.beginPath();
					this.canvasContent.moveTo(pos.x, pos.y);
					this.canvasContent.lineTo(nextPos.x, nextPos.y);
					this.canvasContent.setLineWidth(this.lineWidth - 0.01)
					this.canvasContent.closePath();
					this.canvasContent.stroke();
					// this.canvasContent.clip();
					this.canvasContent.draw(true);
					this.canvasContent.restore();
					// 每条裂痕的深度
					// var m = Math.round(Math.random()*10);
					// if(level == 0){
					// 	console.log('i='+i, '++++++++++++++++++++++++++++++++++++++++++++++');
					// 	depth = m%4;
					// }
					// console.log(this.startPos, nextPos, depth, m, level, '========================')
					// if(level>= depth || m % 2){
					// 	continue;
					// }
					
					// var h = setTimeout(()=>{
					// 	clearTimeout(h);
					// 	this.makeBroken(nextPos, (level+1), depth);
						
					// }, 100);
					
					// var h = setTimeout(()=>{
					// 	clearTimeout(h);
					// 	this.canvasContent.draw();
					// }, 1000)
				}
			},
			
			makeCoordinate(pos, root = true) {
				var radomX = Math.round(Math.random()*100);
				var radomY = Math.round(Math.random()*100);
				// console.log('radomx='+radomX, 'radomy='+radomY, root ,(radomX % 2))
				var x = 0;
				var y = 0;
				if((root && (radomX % 2)) || (!root && pos.x > this.startPos.x)){
					// console.log('增加')
					x = pos.x + radomX;
				}else{
					// console.log('减去')
					x = pos.x - radomX;
				}
				if((root && (radomY % 2))|| (!root && pos.y > this.startPos.y)){
					y = pos.y + radomY;
				}else{
					y = pos.y - radomY;
				}
				// console.log('pos.x='+pos.x, 'pos.y='+pos.y)
				// console.log('x='+x, 'y='+y)
				return {
					x: x,
					y: y
				};
			}
		},
		created() {
			console.log('created')
		},
		onHide() {
			console.log('onHide')
		},
		onShow() {
			console.log('onShow')
		},
		onUnload() {
			console.log('onUnload')
		},
		onLoad() {
			console.log('onLoad')
		},
	}
</script>

<style>
	.login-box{
		padding: 0px;
		margin: 0px;
		width: 100vw;
		height: 100vh;
		/* background: url('https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3892521478,1695688217&fm=26&gp=0.jpg'); */
		/* background-size: 100% 100%; */
	}
	.canvas-box{
		margin: auto;
		border: 1px solid red;
		width: calc(100% - 2px);
		height: calc(100% - 2px);
	}
</style>
