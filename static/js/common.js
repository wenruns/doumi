function getCustomConfig(callback){
	uni.request({
			url:'./static/json/custom.json',
			method: "GET",
			dataType: 'json',
			complete: (rst) => {
				callback && callback(rst);
			}
		});
}

function getStorage(index = '', defaultValue = null){
	try{
		if(index){
			var value = uni.getStorageSync(index);
			if(!value){
				return defaultValue;
			}
			return value;
		}
		var value = {};
		var info = uni.getStorageInfoSync();
		info.keys.forEach(function(item, index){
			value[item] = uni.getStorageSync(item);
		})
		return value;
	}catch(e){
		console.warn(e);
		return false;
	}
}

function setStorage(index, value){
	try{
		uni.setStorageSync(index, value);
	}catch(e){
		console.warn(e);
		return false;
	}
	return true;
}

function setCustomSetting(index, value){
	try{
		var customSetting = getStorage('customer_setting', {});
		customSetting[index] = value;
		setStorage('customer_setting', customSetting);
		return true;
	}catch(e){
		console.warn(e)
		return false;
	}
}

function getCustomSetting(index = '', defaultValue = null){
	try{
		var customSetting = getStorage('customer_setting', {});
		if(index){
			if(customSetting[index]){
				return customSetting[index];
			}
			return defaultValue;
		}
		return customSetting;
	}catch(e){
		console.warn(e)
		return false;
	}
}




/**
 * 通用模块
 */
module.exports = {
	/**
	 * 获取自定义配置
	 * @param {Object} callback
	 */
	getCustomConfig,
	/**
	 * 获取本地缓存信息
	 */
	getStorage,
	/**
	 * 
	 * @param {Object} index
	 * @param {Object} value
	 */
	setStorage,
	
	setCustomSetting,
	
	getCustomSetting,
}