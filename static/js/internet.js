import { common } from '@/static/js/common.js';

function InternetObject(){
	this.socketOpen = false;
	// 回调方法
	this.callbacks = {};
	
	this.queue = [];
	this.configs = common.getStorage('custom_config')
	
	/**
	 * 初始化
	 */
	var _init =  ()=>{
		// console.log('init internet object')
		if(this.configs.connectType == 'websocket'){
			uni.connectSocket({
				url: this.configs.websocket.url,
				header: this.configs.websocket.header,
				method: this.configs.websocket.method,
				protocols: this.configs.websocket.protocols,
				success: (rst) => {
					
				},
				fail: (err)=>{
					
				},
			})
			uni.onSocketOpen((res) =>{
				this.socketOpen = true;
				this.queue.forEach((item, index)=>{
					uni.sendSocketMessage(item);
				})
				console.log('WebSocket连接已打开！');
			});
			
			uni.onSocketError(function (res) {
				console.log('WebSocket连接打开失败，请检查！');
			});
			
			uni.onSocketMessage(function (res) {
				console.log('收到服务器内容：' + res.data);
				var data = {};
				try{
					data = JSON.parse(res.data);
				}catch(e){
					data = res.data;
				}
				if (data.flag && data.unique){
					var callback = this.callbacks[data.flag][data.unique];
					callback && callback(data); 
					this.callbacks[data.flag][data.unique] = null;
				}
			});
			
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
			});
		}
	}
	_init();

	/**
	 * 关闭socket
	 */
	this.closeWebsocket=({
		code = 1000,
		reason = '',
		success = null,
		fail = null,
		complete = null,
	})=>{
		if(this.socketOpen){
			uni.closeSocket({
				code,
				reason,
				success,
				fail,
				complete,
			});
			this.socketOpen = false;
		}
	}
	
	/**
	 * 创建唯一索引
	 * @param {Object} flag
	 */
	function createUnique(flag){
		var unique = parseInt(Math.random() * 100);
		if(this.callbacks[flag][unique]){
			return createUnique(flag);
		}
		return unique;
	}
	
	// 通过websocket发送数据
	this.sendByTcp = ({
		data = null,
		flag = null,
		callback = null,
	})=>{
		var unique = createUnique(flag);
		this.callbacks[flag][unique] = callback;
		if(this.socketOpen){
			uni.sendSocketMessage({
				data,
				flag,
				unique,
			});
		}else{
			this.queue.push({
				data,
				flag,
				unique,
			});
			_init();
		}
	}
	
	// 通过http发送数据
	this.sendByHttp = ({
		data = null,
		flag = null,
		callback = null,
	})=>{
		var api = this.configs.apis[flag];
		if(api && api.url){
			uni.request({
				url: api.url,
				method:api.method?api.method:'GET',
				data:data,
				dataType: api.dataType?api.dataType:'json',
				header: api.header?api.header:{},
				timeout: api.timeout ? api.timeout : 30000,
				responseType: api.responseType ? api.responseType : 'text',
				sslVerify: api.sslVerify ? api.sslVerify : true,
				withCredentials: api.withCredentials ? api.withCredentials : false,
				success: (rst)=>{
					callback && callback(rst);
				},
				fail: (err)=> {
					callback && callback(err);
				}
			})
		}
	}
	
	
	this.sendData = ({
		data=null,
		flag=null,
		callback=null,
	})=>{
		if(!flag){
			return {
				status: false,
				error: "请输入flag参数",
			};
		}
		
		if(this.configs.connectType == 'http'){
			this.sendByHttp({
				data,
				flag,
				callback,
			})
		}else{
			this.sendByTcp({
				data,
				flag,
				callback,
			});
		}
	}
	
}

const internet = new InternetObject();


/**
 * 网络连接模块
 */
module.exports = {
	internet,
}