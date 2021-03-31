<template>
	<van-search
	   :value="value"
	   @change='this.$emit("change",$event)'
	   @search='this.$emit("search")'
	   shape="round"
	   custom-class='box'
	   placeholder="拍照识别或输入关键字"
	   input-align='center'
	   use-action-slot
	   use-right-icon-slot
	   use-left-icon-slot
	 >
		<van-icon slot="left-icon"  name='search' size="50rpx">	
		</van-icon>
		<van-icon custom-class='photo-icon' color='black' slot="right-icon"  @click='this.$emit("getPhoto")' name='photograph' size="50rpx">
		</van-icon>
	    </van-button>
		<van-button @click='this.$emit("search")' slot="right-icon" size="small" custom-style='border:none;font-size:36rpx;background:transparent;' >
			查询
		</van-button>
	 </van-search>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number|String,
				default: ''
			},
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .photo-icon{
		position: relative;
		top: 15rpx;
	}
	/deep/ .box{
		box-shadow: 0 0 10rpx #808080;
		// margin-bottom: 10rpx;
	}
</style>
