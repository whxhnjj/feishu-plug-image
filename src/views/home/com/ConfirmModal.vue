<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="confirm-modal-overlay">
      <div class="confirm-modal-container">
        <div class="confirm-modal-content">
          <div class="confirm-icon-box">
            <icon-exclamation-circle-fill style="font-size: 32px; color: #ff7d00;" />
          </div>
          <div class="confirm-title">{{ title }}</div>
          <div class="confirm-message">{{ content }}</div>
          <div class="confirm-footer">
            <a-button size="small" @click="$emit('update:modelValue', false)">取消</a-button>
            <a-button size="small" type="primary" status="warning" @click="handleConfirm">确定</a-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

export default {
  name: 'ConfirmModal',
  components: {
    IconExclamationCircleFill
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '操作确认'
    },
    content: {
      type: String,
      default: '确定要执行此操作吗？'
    }
  },
  emits: ['update:modelValue', 'confirm'],
  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.$emit('update:modelValue', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 3000; /* 确保层级高于日志弹窗(2100)和设置弹窗(2000) */
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-modal-container {
  width: 260px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: modal-in 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.confirm-modal-content {
  padding: 24px 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .confirm-icon-box {
    margin-bottom: 12px;
  }

  .confirm-title {
    font-size: 16px;
    font-weight: 600;
    color: #1d2129;
    margin-bottom: 8px;
  }

  .confirm-message {
    font-size: 13px;
    color: #4e5969;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .confirm-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 12px;
    
    :deep(.arco-btn) {
      border-radius: 6px;
      padding: 0 20px;
    }
  }
}

@keyframes modal-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
