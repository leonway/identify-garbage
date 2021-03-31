'use strict';
exports.main = async (event, context) => {
	try{
			//event为客户端上传的参数
			console.log('event : ', event)
			const res = await uniCloud.httpclient.request('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=07oUHE0fgICZhUqmvM4hDod1&client_secret=yCgptyciMHsTZ9WPQ2z9ghst2RIUskWx',{
				dataType:'json'
			})
			// console.log('err,res')
			// console.log(res)
			// if(!res.success){
			// 	throw new Error('获取百度access_token失败！')
			// }
			
			const access_token = res.data.access_token
			const classify_res = await uniCloud.httpclient.request('https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',{
				method:"POST",
				dataType:'json',
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data:{
					image:event.image,
					access_token
				}
			})
			console.log('error,classify_res')
			console.log(classify_res)
			
			//返回数据给客户端
			return classify_res.data
	}catch(e){
		//TODO handle the exception
		console.log('errr')
		console.log(e&&e.message,e)
		return  {
			code:500,
			message:e&&e.message||'server error'
		}
	}
};
