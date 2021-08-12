export const url = 'http://dygzhwr.sprplus.cn/api/'//内网开放入口
// export const url = (process.env.NODE_ENV === 'production') ?
//     'http://dygzhwr.sprplus.cn/api/' :
//     '/api'
// var baseUrl = 'www.dycic.net';//线上环境
export const baseUrl = 'dygzh.sprplus.cn';//测试
// var appId = 'wx069d0acf695549e5';//正式
export const appId = 'wx5f549352176be902';//测试

const request = (url = '', data = {}, type = 'POST') => {
	var token = ''
	// 同步获取token
	try {
	    var userInfo = uni.getStorageSync('userInfo');
		token = userInfo ? JSON.parse(userInfo).token : ''
	} catch (e) {
	    // error
	}
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: 'http://dygzhwr.sprplus.cn/api/'+url,
            data: data,
            dataType: 'json', 
			header: {
				'SPR-ZHSQ-Token':token,
				'channel':'wyWeChat',
				'Content-Type':'application/json'
			},
        }).then((response) => {
            let [error, res] = response; 
			if(res.data.code===401){
				removeInfo('userInfo')
				removeInfo('deptName')
				removeInfo('deptId')
				removeInfo('roleId')
				uni.showToast({
				    title: '身份过期，请重新登录',
					icon:'none'
				});
				setTimeout(function () {
					uni.navigateTo({
					    url: '/pages/login/login'
					});
				}, 2000)	
			}else{
				resolve(res.data);
			}    
        }).catch(error => {
            let [err, res] = error;
			console.log(err)
            reject(err)
        })
    });
}
export default request


// export function deal(data){
// 	if (data.code == 401) {
// 		removeInfo('userInfo')
// 		removeInfo('deptName')
// 		removeInfo('deptId')
// 		removeInfo('roleId')
// 		vant.Toast('身份过期，请重新登录');
// 		setTimeout(function () {
// 			uni.navigateTo({
// 			    url: '../pages/login/login'
// 			});
// 		}, 1000)
// 	}
// }

export function removeInfo(value){
	try {
	    uni.removeStorageSync(value);
	} catch (e) {
	    // error
	}
}

export function replaceHandle(baseStr, objInfo){
	var reg = new RegExp(Object.keys(objInfo).join('|'), 'gi');
	var result = baseStr.replace(reg, function (value) {
		return objInfo[value];
	})
	return result;
}