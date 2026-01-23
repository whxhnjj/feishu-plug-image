import { useToast } from 'vue-toastification';
export default {
  install(app) {
    app.config.globalProperties.$onOpenWeb = function(url) { // 新开窗口，打开网址
      window.open(url);
    };
    app.config.globalProperties.$commonIsPhone = function(phoneNumber) { // 验证手机号码
      // 匹配以数字1开头，第二位为3、4、5、6、7、8、9之一，后面跟着9个数字字符的字符串
      const regex = /^1[3-9]\d{9}$/;
      return regex.test(phoneNumber);
    };
    app.config.globalProperties.$removeEmptyKeys = function(obj) { // 清空对象里的空KEY
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
          if (value === null || value === undefined || value === '') return false;
          if (typeof value === 'object' && Object.keys(value).length === 0) return false;
          return true;
        })
      );
    };
    app.config.globalProperties.$stringToArray = function(str) { // js 字符串转数组，并去掉数组的空项。每一项并且去掉前后空。
      return str.split(',').map(item => item.trim()).filter(item => item !== '');
    };
    app.config.globalProperties.$onCopy = function(str) { // 复制方法
      const toast = useToast();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(str)
          .then(() => {
            toast.success('复制成功');
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
            toast.error('复制失败');
          });
      } else {
         // Fallback for older browsers or if permission denied
         const textArea = document.createElement("textarea");
         textArea.value = str;
         document.body.appendChild(textArea);
         textArea.select();
         try {
           document.execCommand('copy');
           toast.success('复制成功');
         } catch (err) {
           console.error('Fallback: Oops, unable to copy', err);
           toast.error('复制失败');
         }
         document.body.removeChild(textArea);
      }
    };
  }
}