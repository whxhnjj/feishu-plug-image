<template>
  <a-layout class="layout-container">
    <!-- <a-layout-header class="layout-header">
      <header-view></header-view>
    </a-layout-header> -->
    <a-layout-content class="layout-content">
      <div class="page-body">
        <router-view :key="$route.fullPath" />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import HeaderView from '@layout/com/HeaderView.vue'

export default {
  name: 'LayoutView',
  components: {
    HeaderView
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  padding: 0;
  height: auto;
  line-height: normal;
  background: transparent;
  z-index: 100;
}

.layout-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.page-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}
</style>
