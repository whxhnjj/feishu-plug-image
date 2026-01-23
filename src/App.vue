<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import useAppStore from '@store/app';
export default {
  name: "App",
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
};
</script>

<style lang="scss">
/* 基础样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--custom-text-color);
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--custom-app-bg);
}
</style>