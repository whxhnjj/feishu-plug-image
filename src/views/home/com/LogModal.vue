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

          <!-- 中文注释：胶囊风格的时间筛选器 -->
          <div class="log-filter-bar" v-if="logs.length > 0">
            <div class="filter-capsule-container">
              <div 
                v-for="item in filterOptions" 
                :key="item.value"
                class="filter-capsule-item"
                :class="{ 'active': currentFilter === item.value }"
                @click="currentFilter = item.value"
              >
                {{ item.label }}
              </div>
            </div>
          </div>

          <div class="log-body" ref="logBody" @scroll="handleScroll">
            <div v-if="filteredLogs.length === 0" class="empty-logs">
              <icon-empty style="font-size: 40px; color: #e5e6eb; margin-bottom: 12px;" />
              <div class="empty-text">暂无符合条件的日志</div>
            </div>
            <div v-else class="log-list">
              <!-- 中文注释：使用 displayedLogs 替代 filteredLogs 进行分批渲染 -->
              <div v-for="(log, index) in displayedLogs" :key="log.id || index" class="log-item" :class="{ 'log-success': log.reason === '任务执行成功' }">
                <div class="log-item-header">
                  <div class="header-left">
                    <span class="log-time">{{ log.time }}</span>
                    <span class="log-tag" :class="{ 'tag-success': log.reason === '任务执行成功' }">
                      {{ log.reason === '任务执行成功' ? 'SUCCESS' : 'ERROR' }}
                    </span>
                  </div>
                  <div class="header-right-btns">
                    <a-tooltip content="复制日志内容" position="top">
                      <div class="icon-btn copy-btn" @click="handleCopy(log)">
                        <icon-copy />
                      </div>
                    </a-tooltip>
                    
                    <!-- 中文注释：点击触发自定义确认弹窗 -->
                    <div class="icon-btn delete-btn" @click="openConfirmDelete(log.id)">
                      <icon-delete />
                    </div>
                  </div>
                </div>
                <div class="log-reason">{{ log.reason }}</div>
                
                <!-- 中文注释：如果详情是 JSON 对象，则以格式化代码块展示 -->
                <div v-if="isJsonObject(log.detail)" class="log-detail-json">
                  <pre class="json-code"><code>{{ JSON.stringify(parseJson(log.detail), null, 2) }}</code></pre>
                </div>
                <div v-else class="log-detail">{{ log.detail }}</div>
              </div>
              
              <!-- 中文注释：加载更多提示 -->
              <div v-if="hasMore" class="load-more-tip">
                <icon-loading spin style="margin-right: 8px;" /> 正在加载更多日志...
              </div>
              <div v-else-if="filteredLogs.length > pageSize" class="no-more-tip">
                已展示全部 {{ filteredLogs.length }} 条日志
              </div>
            </div>
          </div>
          
          <!-- 中文注释：底部操作按钮 -->
          <div class="log-footer" v-if="logs.length > 0">
            <div class="footer-btn download-btn" @click="handleDownloadCsv">
              <icon-download style="margin-right: 4px;" /> 导出CSV
            </div>
            <div class="footer-divider"></div>
            <div class="footer-btn clear-btn" @click="openConfirmClear">
              <icon-delete style="margin-right: 4px;" /> 清空日志
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- 中文注释：自定义二次确认弹窗 -->
  <ConfirmModal 
    v-model="showConfirm"
    :title="confirmConfig.title"
    :content="confirmConfig.content"
    @confirm="confirmConfig.onConfirm"
  />
</template>

<script>
import { IconCopy, IconDelete, IconList, IconClose, IconEmpty, IconLoading, IconDownload } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import ConfirmModal from './ConfirmModal.vue';

export default {
  name: 'LogModal',
  components: {
    IconCopy,
    IconDelete,
    IconList,
    IconClose,
    IconEmpty,
    IconLoading,
    IconDownload,
    ConfirmModal
  },
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
  emits: ['update:modelValue', 'clear-logs', 'delete-log'],
  data() {
    return {
      showConfirm: false,
      confirmConfig: {
        title: '',
        content: '',
        onConfirm: () => {}
      },
      // 中文注释：懒渲染相关配置
      pageSize: 20, // 每次加载的数量
      displayCount: 20, // 当前展示的数量
      loadingMore: false,
      // 中文注释：筛选相关配置
      currentFilter: 'all', // 默认全部
      filterOptions: [
        { label: '全部', value: 'all' },
        { label: '今天', value: 'today' },
        { label: '昨天', value: 'yesterday' },
        { label: '近3天', value: '3days' },
        { label: '近7天', value: '7days' }
      ]
    }
  },
  computed: {
    // 中文注释：根据时间筛选日志
    filteredLogs() {
      if (this.currentFilter === 'all') return this.logs;
      
      const now = new Date();
      now.setHours(0, 0, 0, 0); // 设置为今天凌晨 0 点
      
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 2); // 包含今天、昨天、前天共3天
      
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // 包含今天在内的前7天

      return this.logs.filter(log => {
        try {
          // 日志时间格式为 YYYY/MM/DD HH:mm:ss
          const logDate = new Date(log.time.split(' ')[0]);
          logDate.setHours(0, 0, 0, 0);

          if (this.currentFilter === 'today') {
            return logDate.getTime() === now.getTime();
          } else if (this.currentFilter === 'yesterday') {
            return logDate.getTime() === yesterday.getTime();
          } else if (this.currentFilter === '3days') {
            return logDate.getTime() >= threeDaysAgo.getTime();
          } else if (this.currentFilter === '7days') {
            return logDate.getTime() >= sevenDaysAgo.getTime();
          }
          return true;
        } catch (e) {
          console.error('Filter date error:', e);
          return true;
        }
      });
    },
    // 中文注释：计算当前需要展示的日志切片
    displayedLogs() {
      return this.filteredLogs.slice(0, this.displayCount);
    },
    // 中文注释：是否还有更多未展示的日志
    hasMore() {
      return this.displayCount < this.filteredLogs.length;
    }
  },
  watch: {
    // 中文注释：当筛选条件变化时，重置展示数量并滚动到顶部
    currentFilter() {
      this.displayCount = this.pageSize;
      this.$nextTick(() => {
        if (this.$refs.logBody) {
          this.$refs.logBody.scrollTop = 0;
        }
      });
    },
    // 中文注释：当弹窗打开时，重置展示数量
    modelValue(val) {
      if (val) {
        this.displayCount = this.pageSize;
        this.currentFilter = 'all'; // 每次打开重置为“全部”
        // 重置滚动位置到顶部
        this.$nextTick(() => {
          if (this.$refs.logBody) {
            this.$refs.logBody.scrollTop = 0;
          }
        });
      }
    },
    // 中文注释：当原始日志数据变化时，如果展示数量大于当前长度，进行修正
    'filteredLogs.length'(newLen) {
      if (this.displayCount > newLen) {
        this.displayCount = Math.max(this.pageSize, newLen);
      }
    }
  },
  methods: {
    // 中文注释：处理滚动加载逻辑
    handleScroll(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      // 距离底部 50px 时加载更多
      if (scrollHeight - scrollTop - clientHeight < 50) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.hasMore && !this.loadingMore) {
        this.loadingMore = true;
        // 模拟一小段延迟，让用户感知到加载过程，提升交互体验
        setTimeout(() => {
          this.displayCount += this.pageSize;
          this.loadingMore = false;
        }, 150);
      }
    },
    // 中文注释：打开单个删除确认弹窗
    openConfirmDelete(logId) {
      this.confirmConfig = {
        title: '删除确认',
        content: '确定要删除这条日志吗？',
        onConfirm: () => {
          this.$emit('delete-log', logId);
        }
      };
      this.showConfirm = true;
    },
    // 中文注释：打开全部清空确认弹窗
    openConfirmClear() {
      this.confirmConfig = {
        title: '清空确认',
        content: '确定要清空所有日志吗？该操作不可撤销。',
        onConfirm: () => {
          this.$emit('clear-logs');
        }
      };
      this.showConfirm = true;
    },
    // 中文注释：导出所有日志为 CSV
    handleDownloadCsv() {
      if (this.filteredLogs.length === 0) {
        Message.warning('当前条件下暂无日志可导出');
        return;
      }

      try {
        // CSV 表头
        const headers = ['时间', '原因', '详情'];
        
        // 转换数据行 (使用筛选后的数据)
        const rows = this.filteredLogs.map(log => {
          // 处理详情：如果是对象则转为字符串，并处理 CSV 中的引号问题
          let detailStr = log.detail;
          if (this.isJsonObject(detailStr)) {
            detailStr = JSON.stringify(this.parseJson(detailStr));
          }
          
          // 处理 CSV 转义：将双引号替换为两个双引号，并在整个字段两端加上双引号
          const escapeCsv = (str) => {
            if (str === null || str === undefined) return '';
            const text = String(str).replace(/"/g, '""');
            return `"${text}"`;
          };

          return [
            escapeCsv(log.time),
            escapeCsv(log.reason),
            escapeCsv(detailStr)
          ].join(',');
        });

        // 组合成完整的 CSV 字符串（添加 BOM 以支持 Excel 中文展示）
        const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
        
        // 创建下载
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const filterName = this.filterOptions.find(o => o.value === this.currentFilter)?.label || '全部';
        
        link.setAttribute('href', url);
        link.setAttribute('download', `运行日志_${filterName}_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        Message.success('日志导出成功');
      } catch (err) {
        console.error('Export CSV error:', err);
        Message.error('导出失败');
      }
    },
    // 中文注释：详情展示辅助方法
    isJsonObject(val) {
      if (!val) return false;
      try {
        const obj = typeof val === 'string' ? JSON.parse(val) : val;
        return obj !== null && typeof obj === 'object';
      } catch (e) {
        return false;
      }
    },
    parseJson(val) {
      try {
        return typeof val === 'string' ? JSON.parse(val) : val;
      } catch (e) {
        return {};
      }
    },
    formatJsonVal(val) {
      if (val === null || val === undefined) return '';
      if (Array.isArray(val)) return val.join(', ');
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    },
    handleCopy(log) {
      const text = `时间: ${log.time}\n原因: ${log.reason}\n详情: ${log.detail}`;
      
      // 优先使用现代 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          Message.success('日志已复制到剪贴板');
        }).catch(err => {
          console.error('Clipboard API copy failed:', err);
          this.fallbackCopy(text);
        });
      } else {
        // 兜底方案
        this.fallbackCopy(text);
      }
    },
    fallbackCopy(text) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // 确保 textarea 在屏幕外且不可见
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          Message.success('日志已复制到剪贴板');
        } else {
          Message.error('复制失败，请手动选择文字复制');
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
        Message.error('复制失败');
      }
    }
  }
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
  height: 95vh; /* 固定高度为 95% 视口高度 */
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

.log-filter-bar {
  padding: 8px 12px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;

  .filter-capsule-container {
    display: flex;
    background: #f2f3f5;
    padding: 2px;
    border-radius: 10px;
    gap: 2px;
  }

  .filter-capsule-item {
    flex: 1;
    text-align: center;
    font-size: 11px;
    padding: 6px 0;
    color: #4e5969;
    cursor: pointer;
    border-radius: 8px; /* 苹果风格 8px 圆角 */
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;

    &:hover {
      color: #1d2129;
    }

    &.active {
      background: #fff;
      color: #165dff;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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
      // 中文注释：使用 content-visibility 优化长列表渲染性能，跳过不在视口内的内容渲染
      content-visibility: auto;
      contain-intrinsic-size: 100px;

      &.log-success {
        border-left-color: #00b42a;
      }

    .log-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .log-time {
        font-size: 10px;
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

        &.tag-success {
          background: #e8ffea;
          color: #00b42a;
        }
      }

      .header-right-btns {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .icon-btn {
        cursor: pointer;
        color: #86909c;
        font-size: 14px;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #f2f3f5;
        }

        &:active {
          transform: scale(0.9);
        }

        &.copy-btn:hover {
          color: #165dff;
        }

        &.delete-btn:hover {
          color: #ff4d4f;
        }
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

    .log-detail-json {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 8px;
      margin-top: 4px;
      overflow: hidden;

      .json-code {
        margin: 0;
        font-size: 11px;
        line-height: 1.4;
        color: #4e5969;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
        white-space: pre-wrap;
        word-break: break-all;
        max-height: 200px;
        overflow-y: auto;

        code {
          display: block;
        }
      }
    }
  }

  .load-more-tip, .no-more-tip {
    text-align: center;
    padding: 12px 0;
    font-size: 12px;
    color: #86909c;
  }
}

.log-footer {
  padding: 8px 12px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .footer-btn {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #4e5969;
    cursor: pointer;
    transition: all 0.2s;
    padding: 4px 10px;
    border-radius: 6px;

    &:hover {
      background-color: #f2f3f5;
    }

    &.download-btn:hover {
      color: #165dff;
    }

    &.clear-btn:hover {
      color: #ff4d4f;
    }
  }

  .footer-divider {
    width: 1px;
    height: 14px;
    background-color: #e5e6eb;
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
