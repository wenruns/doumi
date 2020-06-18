function CanvasClass(){
	/**
	 * 画布集合
	 */
	this.ctxs = {};
	
	/**
	 * 活跃画布
	 */
	this.activeCanvas = null;
	
	
}

CanvasClass.prototype.switchContent = function(canvasId, componentObj = null){
	this.activeCanvas = canvasId;
	return this;
} 

CanvasClass.prototype.hasContent = function(canvasId){
	if(this.ctxs[canvasId]){
		return true;
	}
	return false;
}

CanvasClass.prototype.createContent = function(canvasId, componentObj){
	if(this.ctxs[canvasId]){
		throw Error('Cannot create canvas repeatedly.')
	}		
	this.ctxs[canvasId] = uni.createCanvasContext(canvasId, componentObj);
	this.activeCanvas = canvasId;
	return this;
}
	

CanvasClass.prototype.getOrCreateContent = function(canvasId, componentObj){
	if(!this.hasContent(canvasId)){
		this.createContent(canvasId, componentObj);
	}
	this.activeCanvas = canvasId;
	return this;
}








const canvas = new CanvasClass();

module.exports = {
	canvas,
}