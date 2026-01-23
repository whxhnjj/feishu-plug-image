import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js';
import tinycolor2 from 'tinycolor2'

function updatePrimaryColor (color) {
  if (color) {
    // document.documentElement.style.setProperty('--primary-color', color)
  } else {
    // document.documentElement.style.removeProperty('--primary-color')
  }
}

const currTheme = (localStorage.getItem('APP_THEME') || 'light') 
const currPrimaryColor = localStorage.getItem('feishu_ADMIN_COLOR') || '#22c55e'

if (currPrimaryColor) {
  updatePrimaryColor(currPrimaryColor)
}
const useAppStore = defineStore('appId', {
  state: () => ({
   collapseAside: true,
    primaryColor: currPrimaryColor,
    language: 'zh'
  }),
  actions: {
   // 切换左侧菜单收起与打开
    toggleCollapseAside () {
      this.collapseAside = !this.collapseAside;
    },
    setLanguage(lang) {
      this.language = lang;
    },
    setPrimaryColor (color) {
      updatePrimaryColor(color)
      this.primaryColor = color
      localStorage.setItem('FEISHU_ADMIN_COLOR', color)
    },
  },
  persist: {
    key: 'FEISHU-APP-ADMIN', // 存储的键名
    storage: localStorage, // 默认 localStorage
    paths: ['collapseAside', 'language'], // 只持久化部分状态
    serializer: { // 自定义序列化
      serialize: (state) => {
        const jsonString = JSON.stringify(state);// 将状态转换为 JSON 字符串        
        const encrypted = CryptoJS.AES.encrypt(jsonString, 'feishu-app-admin').toString();// 使用 AES 加密
        return encrypted;
      },
      deserialize: (state) => {        
        const bytes = CryptoJS.AES.decrypt(state, 'feishu-app-admin');// 解密
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);        
        return JSON.parse(decrypted);// 将解密后的字符串解析为 JSON 对象
      }
    }
  }
})
export default useAppStore; //导出