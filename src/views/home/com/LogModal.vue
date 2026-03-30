<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="custom-modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="custom-modal-container" style="width: 320px;">
        <div class="log-modal-content">
          <div class="log-header">
            <div class="header-left-box">
              <div class="header-icon-bg">
                <icon-list style="font-size: 18px; color: #fff;" />
              </div>
              <div class="header-text">
                <div class="log-title">运行日志</div>
                <div class="log-subtitle">Running Logs</div>
              </div>
            </div>
            <icon-close class="log-close-icon" @click="$emit('update:modelValue', false)" />
          </div>

          <div class="log-body">
            <div v-if="logs.length === 0" class="empty-logs">
              <icon-empty style="font-size: 40px; color: #e5e6eb; margin-bottom: 12px;" />
              <div class="empty-text">暂无错误日志</div>
            </div>
            <div v-else class="log-list">
              <div v-for="(log, index) in logs" :key="index" class="log-item">
                <div class="log-item-header">
                  <span class="log-time">{{ log.time }}</span>
                  <span class="log-tag">ERROR</span>
                </div>
                <div class="log-reason">{{ log.reason }}</div>
                <div class="log-detail">{{ log.detail }}</div>
              </div>
            </div>
          </div>
          
          <div class="log-footer" v-if="logs.length > 0">
            <div class="clear-btn" @click="$emit('clear-logs')">
              <icon-delete style="margin-right: 4px;" /> 清空日志
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LogModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    logs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'clear-logs']
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
  z-index: 2100; /* 比设置弹窗高一点 */
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

.log-modal-content {
  background: #f4f7f9;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.log-header {
  padding: 16px 20px;
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
    background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(255, 77, 79, 0.2);
  }

  .header-text {
    .log-title {
      font-size: 16px;
      font-weight: 600;
      color: #1d2129;
      line-height: 1.2;
    }

    .log-subtitle {
      font-size: 10px;
      color: #86909c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
  }

  .log-close-icon {
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

.log-body {
  padding: 12px;
  overflow-y: auto;
  flex: 1;

  .empty-logs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    
    .empty-text {
      font-size: 14px;
      color: #86909c;
    }
  }

  .log-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .log-item {
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    border-left: 3px solid #ff4d4f;

    .log-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .log-time {
        font-size: 12px;
        color: #86909c;
        font-family: monospace;
      }

      .log-tag {
        font-size: 10px;
        background: #fff1f0;
        color: #ff4d4f;
        padding: 1px 6px;
        border-radius: 4px;
        font-weight: 600;
      }
    }

    .log-reason {
      font-size: 14px;
      font-weight: 600;
      color: #1d2129;
      margin-bottom: 6px;
    }

    .log-detail {
      font-size: 12px;
      color: #4e5969;
      white-space: pre-wrap;
      word-break: break-all;
      background: #f8f9fa;
      padding: 8px;
      border-radius: 6px;
      line-height: 1.5;
    }
  }
}

.log-footer {
  padding: 12px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;

  .clear-btn {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #4e5969;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: #ff4d4f;
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
