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
export const GetPlugSelectField = async (data) => { // 选项配置
  return request({
    url: '/api/v0.1/common/plug.select.field', 
    method: 'POST',
    data: {
      plugId: PlugId,
      ...data,
    },
    isToken: false,
  })
};
export const GetPlugDeductionSet = async (data) => { // 积分配置  
  return request({
    url: '/api/v0.1/common/plug.deduction.setting',
    method: 'POST',
    data: {
      plugId: PlugId,
      ...data,
    },
    isToken: false,
  })
};
export const GetPlugAd = async (data) => { // 获取轮播
  return request({
    url: '/api/v0.1/common/plug.ads',
    method: 'POST', 
    data: {
      plugId: PlugId,
      ...data,
    },
    isToken: false,
  })
};





