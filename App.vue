<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import { getCustomConfig, setStorage } from '@/static/js/common.js';
	export default {
		onLaunch: function() {
			getCustomConfig(function(rst){
				if(rst.statusCode == 200){
					setStorage('custom_config', rst.data)
				}else{
					console.warn(rst)
				}
			})
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
