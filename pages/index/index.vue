<template>
	<view class="content">
		<van-toast id="van-toast" />
		<van-notify id="van-notify" />
		<van-dialog id="choose-dialog" use-slot>
			<van-row>
				<van-col span='8'>
					<image mode='aspectFill' :src='imagePath' class='img'></image>
				</van-col>
				<van-col span='16'>
					<van-cell-group
						title='无法精准识别或者有多个得分相近，请选择你想要的分类'
					>
					<van-cell @click='choose(item.keyword)' value-class='list-item-value-text' is-link :value='"匹配度 "+item.score+"%"' :title='item.keyword' v-for='item in itemList' :key='item.keyword'>
						
					</van-cell>
					</van-cell-group>
				</van-col>
			</van-row>
			
		</van-dialog>
		<van-dialog id="show-result-dialog" use-slot>
			<view class='result-title-box'>
				<view class='typename-text'>{{result.keywords}}</view>  属于  {{result.typename}}
			</view>
			<view class='desc-box' :style="'border-color:'+type2resouce[result.typename].color">
				<view class='desc-1-box'>
					<van-row>
						<van-col span='8'>
							<image :src='type2resouce[result.typename].img' mode='aspectFit' class='img'></image>
						</van-col>
						<van-col span='16'>
							<view class='desc-1-right-box' :style="'color:'+type2resouce[result.typename].color">
								<view class='result-desc-text-title' >
									{{result.typename}}是指:
								</view>
								<view class='result-desc-text'>
									{{type2resouce[result.typename].desc1}}
								</view>
							</view>
						</van-col>
					</van-row>
				</view>
				<view class="desc-2-box">
					<view class='result-desc-title-box' :style="'background-color:'+type2resouce[result.typename].color">
						<text class='result-desc-title'>
							{{result.typename}}的投放要求
						</text>
					</view>
					<view class='result-desc-box'>
						<view
						  class='result-desc-require'
						  v-for='item in type2resouce[result.typename].desc2'
						  :key='item'
						  :style="'color:'+type2resouce[result.typename].color"
						>
							<view class='dot' :style="'background-color:'+type2resouce[result.typename].color"></view>
							<view>
								{{item}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</van-dialog>
		<super-search
		  :value='searchData'
		  @change='searchChange'
		  @getPhoto='getPhoto'
		  @search='search()'
		>
		</super-search>
		 
		 <view class='cemment'>
			 <text class='comment-text'>
				 请完整地输入垃圾的中文名称（包括材质），如：牛奶盒，旧衣服，塑料瓶。拍摄时需保证光线充足，查询以图片识别结果为准，多个物品无法同时识别。本查询系统仅供参考，具体分类以所属专业的管理部门条例为准。
			 </text>
		 </view>
		 <view class='search-list-title'>大家都在搜</view>
		 <view class='search-list-box'>
			 
		   <view 
			class= 'search-list-item'
			v-for='item in searchList' 
			:key='item.keywords'
			@click='showResult(item)'
		   >
			   <text style="text-align: center;">{{item.keywords}}</text>
		   </view>
		 </view>
	</view>
</template>

<script>
	import superSearch from '@/components/search/index.vue'
	// 90a1432f6ea2e2c724b1cd6df7060549
	export default {
		components:{superSearch},
		data() {
			return {
				searchData: '',
				imagePath:'http://tmp/QBelpuicGwAG8862781a01556ad83071f6effb988fa8.jpg',
				itemList:[
				],
				searchList:[
				],
				result:{
				},
				type2resouce:{
					'有害垃圾':{
						color:'#d64343',
						img:'http://iotcd-test.oss-cn-chengdu.aliyuncs.com/test/rc-upload-1615874080056-9.png?name=bad-garbage.png',
						desc1:'废灯管、废油漆、杀虫剂、废弃化妆品等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物',
						desc2:['易破损的有害垃圾应该连包装或包裹后投放','压力罐装容器，应排空内容物后投放']
					},
					'干垃圾':{
						color:'black',
						img:'http://iotcd-test.oss-cn-chengdu.aliyuncs.com/test/rc-upload-1615874080056-11.png?name=dry-garbage.png',
						desc1:'除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。',
						desc2:['尽量沥干水分','难以辨识类别的生活垃圾投入干垃圾容器内']
					},
					'可回收':{
						color:'#3f3fcc',
						img:'http://iotcd-test.oss-cn-chengdu.aliyuncs.com/test/rc-upload-1615874080056-13.png?name=recle-garbage.png',
						desc1:'废纸张、废塑料、废玻璃制品、非金属、废织物等适宜回收、可循环利用的生活废物',
						desc2:['轻投轻放','清洁干燥，避免污染','废纸尽量平整','立体包装物请清空内容物，并压扁投放','有尖锐边角的，应包裹后投放']
					},
					'湿垃圾':{
						color:'green',
						img:'http://iotcd-test.oss-cn-chengdu.aliyuncs.com/test/rc-upload-1615874080056-15.png?name=wet-garbage.png',
						desc1:'又称为厨余垃圾、有机垃圾，即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。',
						desc2:['园林垃圾 ：树枝的收集呈松散状；树叶、杂草和植物放板条箱内','厨余垃圾：放塑料袋里或放饭带盖的桶里（2~3L的桶）','要求比其他混合垃圾收集频次高']
					}
				},
			}
		},
		onLoad() {

		},
		onShareAppMessage({from,target,webViewUrl}){
			// console.log(from,target,webViewUrl)
			const garbages = ['胶卷','牛奶盒','口罩','高跟鞋','口红','香蕉皮','节能灯','创口贴','电脑']
			return {
				title:'拍照就能识别垃圾，点我康康~~',
			}
		},
		showShareMenu(){},
		methods: {
			getPhoto(){
				console.log('getphone')
				wx.chooseImage({
					count:1,
					sizeType:'compressed',
					success:(res)=>{
						console.log(res)
						this.imagePath = res.tempFilePaths[0]
						this.img2base64(this.imagePath)
					}
				})
			},
			img2base64(imgPath){
				
				wx.getFileSystemManager().readFile({
					filePath:imgPath,
					encoding:'base64',
					success:res=>{
						console.log('img2base64')
						console.log(res)
						this.imgClassify(res.data)
					}
				})
			},
			async imgClassify(b64){
				// key:  07oUHE0fgICZhUqmvM4hDod1
				// Secret Key:  yCgptyciMHsTZ9WPQ2z9ghst2RIUskWx
				// const [ error, res ] = await uni.request({
				// 	url:'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=07oUHE0fgICZhUqmvM4hDod1&client_secret=yCgptyciMHsTZ9WPQ2z9ghst2RIUskWx'
				// })
				// console.log('token')
				// if(error){
				// 	return this.$notify({
				// 		type:'warning',
				// 		message:'网络似乎出了点问题~~'
				// 	})
				// }
				// const access_token = res.data.access_token
				// console.log(access_token)
				// const [err,response] = await uni.request({
				// 	url:`https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general`,
				// 	method:'POST',
				// 	header:{
				// 		'Content-Type':'application/x-www-form-urlencoded'
				// 	},
				// 	data:{
				// 		image:b64,
				// 		access_token
				// 	}
				// })
				// if(err){
				// 	return this.$notify({
				// 		type:'warning',
				// 		message:'网络似乎出了点问题~~'
				// 	})
				// }
			
				this.$toast.loading({
				  duration: 0, // 持续展示 toast
				  forbidClick: true,
				  message: '识别中~~',
				  selector: '#van-toast',
				})
				uniCloud.callFunction({
					name:'ImageClassify',
					data:{
						image:b64
					},
					success:response=>{
						this.$toast.clear()
						console.log(response)
						const result = response.result.result.map(item=>({
							...item,
							score:item.score.toFixed(3)*100
						}))
						const highRights = result.filter(i=>i.score>70)
						console.log(highRights,result)
						if(highRights.length===1){
							this.searchData = highRights[0].keyword
							this.search()
						}else if(!highRights.length){
							this.$notify({
								type:'warning',
								message:'请确保图片清晰，且只有一个物品~~'
							})
						}else{
							this.showDialog(highRights)
						}
					},
					error:e=>{
						this.$toast.clear()
						this.$notify({
							type:'warning',
							message:'网络似乎出了点问题~~'
						})
						this.searchList = []
					}
				})
				
				
			},
			showDialog(highRights){
				this.itemList = highRights
				this.$dialog.alert({
					selector:'#choose-dialog',
					confirmButtonText:'返回'
				})
			},
			choose(keyword){
				this.$dialog.close()
				this.searchData = keyword
				this.search()
			},
			searchChange(data){
				this.searchData = data.detail
			},
			search(){
				// console.log(this.searchData)
				if(!this.searchData){
					
					return this.$notify({
							type:'warning',
							message:'输入点什么东西吧~~'
						})
				}
				// console.log(this.searchData)
				// console.log('点击了search')
				this.$toast.loading({
				  duration: 0, // 持续展示 toast
				  forbidClick: true,
				  message: '查询中~~',
				  selector: '#van-toast',
				})
				uniCloud.callFunction({
					name:'TrashClassify',
					data:{
						keyword:this.searchData
					},
					success:res=>{
						this.$toast.clear()
						// console.log(res)
						if(res.result.matched){
							this.searchList = []
							this.showResult({
								keywords:res.result.keyword,
								typename:res.result.matched['typename']
							})
							return 
						}
						this.$notify({
								type:'warning',
								message:'请输入更精准的关键字，或者从大家都在搜点击查询~~'
							})
						if(res.result.similars.length){
							this.searchList = res.result.similars
						}else{
							this.searchList = []
						}
						// this.searchList = res.
					},
					error:e=>{
						this.$toast.clear()
						this.$notify({
							type:'warning',
							message:'网络似乎出了点问题~~'
						})
						this.searchList = []
					}
				})
			},
			showResult(item){
				this.result = item
				this.$dialog.alert({
					selector:'#show-result-dialog',
					showConfirmButton:false,
					closeOnClickOverlay:true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		height: 100vh;
		overflow: hidden;
	}
	
	/deep/ .list-item-value-text{
		font-size: 22rpx;
	}
	.img{
		width: 100%;
	}
	.cemment{
		margin: 30rpx;
		margin-top: 10rpx;
		padding: 20rpx;
		background: #f0f3f6;
		.comment-text{
			color: #586069;
			font-size: 30rpx;
		}
	}
	.search-list-title{
		margin: 0 auto;
		margin-bottom: 15rpx;
		text-align: center;
		color: #d0d0d0;
	}
	.search-list-box{
		margin: 0 20rpx;
		max-height: 650rpx;
		overflow-y: scroll;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx #808080;
	}
	.search-list-item{
		margin: 20rpx;
		padding: 20rpx;
		font-size: 34rpx;
		// color:#a7a6a6;
		border-bottom: 1px solid #eae9e9;
		text{
			display: inline-block;
			width: 100%;
			text-align: center;
		}
	}
	// 详情弹窗
	.result-title-box{
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		overflow: hidden;
		display: flex;
		justify-content: center;
		// background-color: red;
	}
	.typename-text{
		display: inline-block;
		max-width: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.desc-box{
		margin: 20rpx;
		padding: 20rpx 0;
		// background-color: yellow;
		border-radius: 50rpx;
		border:1px dashed black;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.desc-1-box{
			flex: 1;
			padding: 0 20rpx;
			.desc-1-right-box{
				margin: 20rpx;
				margin-top: 60rpx;
				margin-bottom: 0;
				.result-desc-text-title{
					margin: 10rpx auto;
				}
				.result-desc-text{
					font-size: 28rpx;
					line-height: 60rpx;
					
				}
			}
		}
		.desc-2-box{
			flex:1;
			.result-desc-title-box{
				padding: 0 20rpx;
				height: 80rpx;
				color:white;
				background-color: black;
				text-align: center;
				line-height: 80rpx;
			}
			.result-desc-box{
				
				padding: 0 20rpx;
				.result-desc-require{
					display: flex;
					align-items: baseline;
					font-size: 28rpx;
					line-height: 40rpx;
					.dot{
						// flex: 1;
						border-radius: 150%;
						height: 15rpx;
						width: 15rpx;
						background-color: black;
						margin-right: 20rpx;
					}
				}
				
			}
		}
	}
</style>
