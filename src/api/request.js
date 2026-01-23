import axios from 'axios';
import baseUrl from '@api/baseUrl'  
import qs from 'qs';
import { bitable } from '@lark-base-open/js-sdk';
const ui = bitable.ui;


const service = axios.create({
  baseURL: baseUrl,
  timeout: 120000
})
service.interceptors.request.use(async (config) => {
  config.timeout = 120000;// 设置API，接口请求超时时间
  // 设置 token
  if (config.url && config.isToken) config.headers.token = config.isToken ? localStorage.getItem('FEIYUAPIKEYPLUG') || '' : '';

    // 如果是 FormData
  if (config.data instanceof FormData) {    
    // 确保正确的 Content-Type
    config.onUploadProgress = config.onUploadProgress; // 确保这里传递了进度回调
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  }

  if ((config.method).toUpperCase() === 'GET') { // 判断是否GET请求
    config.params = { ...config.params }
    config.paramsSerializer = function (params) { // 转成 QS 格式传参
      return qs.stringify(params, { indices: true })
    }
  } else {
    config.data = { ...config.data }
  }
  return config;
}, async (error) => {
  ui.showToast({ toastType: 'error', message: '网络请求超时了!' })
  return Promise.resolve(error);
})
// 响应拦截器
service.interceptors.response.use(async (res) => {
  const result = res.data
  // setStoreFun(res);
  const code = result.code || 200;
  // 二进制数据则直接返回 logout
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return result;
  }
  const loginOutCodeArr = [10002,10003,11008];
  if (code === 200) {
    return Promise.resolve(result);
  } else if (loginOutCodeArr.includes(parseFloat(code))) { // API Key 秘钥无效
   ui.showToast({ toastType: 'error', message: result?.msg || 'API Key 秘钥无效' })
    return Promise.reject(result);
  } else {
   ui.showToast({ toastType: 'error', message: result.msg || '系统接口异常' })
    return Promise.reject(result);
  }
}, async (error) => {
  const msgs = error.message;
  if (msgs === 'Network Error') {
   ui.showToast({ toastType: 'error', message: '系统接口请求失败' })
  } else if (msgs.includes('timeout')) {
   ui.showToast({ toastType: 'error', message: '系统接口请求超时' })
  } else if (msgs.includes('Request failed with status code')) {
   ui.showToast({ toastType: 'error', message: '系统接口' + msgs.substr(msgs.length - 3) + '异常' })
  }
  return Promise.reject(error);
})
export default service;