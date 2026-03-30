<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="custom-modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="custom-modal-container" style="width: 280px;">
        <div class="settings-modal-content">
          <div class="settings-header">
            <div class="header-left-box">
              <div class="header-icon-bg">
                <icon-settings style="font-size: 18px; color: #fff;" />
              </div>
              <div class="header-text">
                <div class="settings-title">系统设置</div>
                <div class="settings-subtitle">System Settings</div>
              </div>
            </div>
            <icon-close class="settings-close-icon" @click="$emit('update:modelValue', false)" />
          </div>

          <div class="settings-body">
            <div class="settings-group">
              <div class="group-title">常规设置</div>
              <div class="settings-card">
                <div class="settings-row">
                  <div class="row-info">
                    <div class="row-label">推广横幅</div>
                    <div class="row-desc">显示顶部推广横幅及广告</div>
                  </div>
                  <a-switch :model-value="!isBannerHidden" @change="$emit('toggle-banner')" type="round">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                </div>
                <div class="settings-row">
                  <div class="row-info">
                    <div class="row-label">任务状态</div>
                    <div class="row-desc">显示任务运行状态指示器</div>
                  </div>
                  <a-switch :model-value="!isTaskStatusHidden" @change="$emit('toggle-task-status')" type="round">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                </div>
                <div class="settings-row">
                  <div class="row-info">
                    <div class="row-label">显示客服图标</div>
                    <div class="row-desc">在页面右侧显示悬浮图标</div>
                  </div>
                  <a-switch :model-value="!isKefuIconRemoved" @change="$emit('toggle-kefu-icon')" type="round">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                </div>
              </div>
            </div>

            <div class="settings-group">
              <div class="group-title">支持</div>
              <div class="settings-card">
                <div class="settings-row" @click="$emit('show-logs')" style="cursor: pointer;">
                  <div class="row-info">
                    <div class="row-label">运行日志</div>
                    <div class="row-desc">查看任务执行错误日志</div>
                  </div>
                  <icon-arrow-right style="color: #86909c; font-size: 14px;" />
                </div>
                <div class="settings-row" @click="$emit('handle-web-url-click')" style="cursor: pointer;">
                  <div class="row-info">
                    <div class="row-label">查看官网</div>
                    <div class="row-desc">访问我们的官方网站</div>
                  </div>
                  <icon-arrow-right style="color: #86909c; font-size: 14px;" />
                </div>
                <div class="settings-row" @click="$emit('handle-help-click')" style="cursor: pointer;">
                  <div class="row-info">
                    <div class="row-label">帮助中心</div>
                    <div class="row-desc">查看使用教程及常见问题</div>
                  </div>
                  <icon-arrow-right style="color: #86909c; font-size: 14px;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SettingsModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    isBannerHidden: Boolean,
    isTaskStatusHidden: Boolean,
    isKefuIconRemoved: Boolean
  },
  emits: [
    'update:modelValue',
    'toggle-banner',
    'toggle-task-status',
    'toggle-kefu-icon',
    'handle-web-url-click',
    'handle-help-click',
    'show-logs'
  ]
}
</script>

<style lang="scss" scoped>
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.custom-modal-container {
  background-color: transparent;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
}

.settings-modal-content {
  background: #f4f7f9;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.settings-header {
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  .header-left-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-icon-bg {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #165dff 0%, #4080ff 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(22, 93, 255, 0.2);
  }

  .header-text {
    .settings-title {
      font-size: 16px;
      font-weight: 600;
      color: #1d2129;
      line-height: 1.2;
    }

    .settings-subtitle {
      font-size: 10px;
      color: #86909c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
  }

  .settings-close-icon {
    cursor: pointer;
    font-size: 16px;
    color: #86909c;
    transition: all 0.2s;

    &:hover {
      color: #1d2129;
      transform: rotate(90deg);
    }
  }
}

.settings-body {
  padding: 16px;
  max-height: 600px;
  overflow-y: auto;

  .settings-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .group-title {
    font-size: 12px;
    font-weight: 600;
    color: #4e5969;
    margin-bottom: 8px;
    padding-left: 4px;
  }

  .settings-card {
    background: #fff;
    border-radius: 12px;
    padding: 4px 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  }

  .settings-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f7f8fa;

    &:last-child {
      border-bottom: none;
    }

    .row-info {
      flex: 1;
      margin-right: 12px;
    }

    .row-label {
      font-size: 14px;
      font-weight: 500;
      color: #1d2129;
    }

    .row-desc {
      font-size: 11px;
      color: #86909c;
      margin-top: 2px;
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
