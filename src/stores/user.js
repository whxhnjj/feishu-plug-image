import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js';
const useMainStore = defineStore('mainId', {
  state: () => ({
    loginAcction: [], // 登录记录账号
    loginInfo: {},
    isAuthenticated: false,
    menuData: [],
  }),
  actions: {
    onLoginChange(loginInfo) {
      this.loginInfo = loginInfo;
      this.isAuthenticated = true
    },
    async onLogoutChange() {
      this.loginInfo = {};
      this.isAuthenticated = false;
    },
    setLoginInfo(state) {
      console.log(state)
      // 新数据结构：仅保留手机号和密码
      const newItem = {
        phone: state.phone,
        password: state.password
      };

      // 1. 查找是否已存在相同手机号
      const phoneIndex = this.loginAcction.findIndex(item => item.phone === state.phone);

      if (phoneIndex !== -1) {
        // 找到相同手机号，更新密码并移到首位
        const existing = this.loginAcction.splice(phoneIndex, 1)[0];
        existing.password = state.password;          // 更新密码
        this.loginAcction.unshift(existing);         // 移到首位
      } else {
        // 不存在相同号，直接插入到首位
        this.loginAcction.unshift(newItem);
      }

      // 2. 限制总记录数最多 10 条
      if (this.loginAcction.length > 10) {
        this.loginAcction.pop();
      }
    },
    setMenuData (data) {
      this.menuData = data;
    },
  },
  persist: {
    key: 'FEISHU-ORDER-ADMIN', // 存储的键名
    storage: localStorage, // 默认 localStorage
    paths: ['loginAcction','menuData','loginInfo','isAuthenticated'], // 只持久化部分状态
    serializer: { // 自定义序列化
      serialize: (state) => {
        const jsonString = JSON.stringify(state);// 将状态转换为 JSON 字符串        
        const encrypted = CryptoJS.AES.encrypt(jsonString, 'feishu-order-admin').toString();// 使用 AES 加密
        return encrypted;
      },
      deserialize: (state) => {        
        const bytes = CryptoJS.AES.decrypt(state, 'feishu-order-admin');// 解密
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);        
        return JSON.parse(decrypted);// 将解密后的字符串解析为 JSON 对象
      }
    }
  }
})
export default useMainStore; //导出