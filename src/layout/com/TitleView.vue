<template>
  <div class="logo-container">
    <div class="logo-text">
      <img src="~@assets/image/logo.png" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '飞鱼图像生成'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  .logo-text {
    font-weight: 800;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-family: 'Arial', 'Helvetica', sans-serif;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: #22c55e;
    border-radius: 8px;
    padding: 6px;
    img{
      max-height: 28px;
    }
  }
  .title{
    font-size: 20px;
    color: var(--color-text-1);
    margin-left: 12px;
    font-weight: 600;
  }
}
</style>