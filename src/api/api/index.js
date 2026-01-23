import request from '@api/request';
import PlugId from '@api/plugId'  
 /**
 * @typedef {Object} RequestOptions
 * @property {string}  url     接口地址
 * @property {'GET'|'POST'} [method='POST'] 请求方式，默认 POST
 * @property {Object} [data]     请求体（仅 POST 时有效）
 * @property {Object} [params]   查询参数（仅 GET 时有效）
 * @property {boolean} isToken 是否需要 token，默认 false
 */
export const GetMemberInfo = async (params) => { // 用户信息
  return request({
    url: '/api/v0.1/member/info', 
    method: 'GET',
    params,
    isToken: true,
  })
};
export const AddTask = async (data) => { // 创建任务 
  return request({
    url: '/api/v0.1/amazon/amazon.img.task.add', 
    method: 'POST',
    data: {
      plugId: PlugId,
      ...data,
    },
    isToken: true,
  })
};
export const GetTaskStatus = async (params) => { // 获取任务状态  
  return request({
    url: '/api/v0.1/amazon/amazon.img.task.status', 
    method: 'GET',
    params: {
      plugId: PlugId,
      ...params,
    },
    isToken: true,
  })
};






