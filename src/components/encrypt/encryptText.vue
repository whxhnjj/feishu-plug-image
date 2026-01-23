<template>
  <span v-if="text">
    <span class="is-all-text" v-if="isAllShow" @click="$onCopy(text)">{{ text }}</span>
    <template v-else>
      <span v-if="isShow">{{ text }} <icon-eye-invisible class="icon" @click="isShow = !isShow" /></span>
      <span v-else>{{ encryptString(text) }} <icon-eye class="icon" @click="isShow = !isShow"  /></span>
    </template>
    <icon-copy class="icon" @click="$onCopy(text)" style="margin-left: 5px;" />
  </span>
  <span v-else class="dayu-common-no-text">-</span>
</template>

<script>
import { IconEye, IconEyeInvisible, IconCopy } from '@arco-design/web-vue/es/icon';

export default {
  name: 'AllText',
  components: {
    IconEye,
    IconEyeInvisible,
    IconCopy
  },
  props: {
    text: {
      type: [ String, Number ],
      default: ''
    },
    isAllShow: {
      type: Boolean,
      default: false, // false 不全部展示 
    },
    isAllEncryption: { // 是否全部加密
      type: Boolean,
      default: false, // 默认不全部加密
    },
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    encryptString(str) {
      if (this.isAllEncryption) {
        return '************';
      } else {
        // 判断字符串长度
        if (str.length > 11) {
          // 如果字符串长度大于11，显示前3位和后4位，中间部分用*表示
          return str.substring(0, 3) + '******' + str.substring(str.length - 4);
        } else if (str.length === 11) {
          // 如果字符串长度大于11，显示前3位和后4位，中间部分用*表示
          return str.substring(0, 3) + '*'.repeat(str.length - 7) + str.substring(str.length - 4);
        } else if (str.length > 1) {
          // 如果字符串长度在2到11之间，只加密前1位和后1位
          return str.charAt(0) + '*'.repeat(str.length - 2) + str.charAt(str.length - 1);
        } else {
          // 如果字符串长度小于或等于1，全部用*表示
          return '*'.repeat(str.length);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon{
  cursor: pointer;
  &:hover{
    color: #1890ff;
  }
}
.is-all-text{
  cursor: pointer;
  line-height: 20px;
  &:hover{
    color: #1890ff;
  }
}
</style>