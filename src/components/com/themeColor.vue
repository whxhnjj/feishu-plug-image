<template>
  <a-color-picker v-model="currPrimaryColor" show-preset show-history />
</template>
<script>
import useAppStore from '@store/app';
 export default {
  props: {
    styleStr: {
      type: String,
      default: 'width: 200px',
    }
  },
  data () {
    return {
    }
  },
  computed:{
    currPrimaryColor: {
      get () {
        const appStore = useAppStore(); // ✅ 在 getter 中调用 store
        return appStore.primaryColor
      },
      set (color) {
        const appStore = useAppStore(); // ✅ 在 getter 中调用 store
        appStore.setPrimaryColor(color || '')
      }
    },
  },
}
</script>