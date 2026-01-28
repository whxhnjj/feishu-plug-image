<template>
  <div class="feiyu-home">
    <!-- 轮播广告位 -->
    <div class="banner-section">
      <a-skeleton v-if="bannerLoading" :animation="true">
        <a-skeleton-shape shape="rect" style="width: 100%; height: 140px; border-radius: 12px;" />
      </a-skeleton>
      <a-carousel
        v-else-if="bannerList.length > 0"
        class="custom-carousel"
        :auto-play="true"
        indicator-type="slider"
        show-arrow="hover"
        style="width: 100%; height: 140px; border-radius: 12px; overflow: hidden;"
      >
        <a-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner-item" @click="handleBannerClick(item.url)" :style="{ cursor: item.url ? 'pointer' : 'default' }">
            <img :src="item.image" class="banner-img" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>

    <!-- API key 设置 -->
    <div class="api-key-section">
      <div class="section-header">
        <div class="header-left">
          <span class="vertical-bar"></span>
          <span class="section-title" style="margin-right: 2px;">{{ t('apiKeySetting') }}</span>
          <a-tooltip :content="t('helpCenter')">
            <span class="icon-help" @click="handleHelpClick">
              <icon-question-circle />
            </span>
          </a-tooltip>
          <a v-if="webUrl" :href="webUrl" target="_blank" class="link-text">{{ t('getApiKey') }}</a>
        </div>
        <div class="header-right">
           <a-button v-if="!isEditingApiKey" type="text" size="small" @click="startEditApiKey">
             <template #icon><icon-edit /></template>
           </a-button>
        </div>
      </div>
      <div class="section-body">
        <a-input-password 
          v-if="!isEditingApiKey"
          v-model="apiKey" 
          :placeholder="t('enterApiKey')" 
          class="api-input"
          disabled
        >
        </a-input-password>
        <a-input-password 
          v-else
          v-model="tempApiKey" 
          :placeholder="t('enterApiKey')" 
          class="api-input"
          allow-clear
        >
        </a-input-password>
        
        <transition name="fade">
          <div class="save-btn-area" v-if="isEditingApiKey">
             <a-button class="btn-cancel" @click="cancelEditApiKey">{{ t('cancel') }}</a-button>
             <a-button class="btn-save" type="primary" status="success" @click="saveApiKey">
               <template #icon><icon-save /></template>
               {{ t('saveConfig') }}
             </a-button>
          </div>
        </transition>
      </div>
    </div>

         
    <!-- 数据选择 -->
    <div class="api-key-section">
      <div class="section-header">
        <div class="header-left">
          <span class="vertical-bar"></span>
          <span class="section-title">{{ t('dataSelection') }}</span>
        </div>
        <div class="header-right">
          <a-button type="outline" size="mini" class="btn-copy-template" @click="handleUseTemplate" style="margin-right: 8px;">
            <template #icon><icon-plus /></template>
            {{ t('createTable') }}
          </a-button>
          <a-button type="primary" size="mini" @click="handleSelectData" :loading="isSelectingData">
            <template #icon><icon-plus /></template>
             {{ t('addDataTable') }}
           </a-button>
        </div>
      </div>
      <div class="section-body">
         <a-button type="primary" long @click="handleSelectData" :loading="isSelectingData" :disabled="isSelectingData">
           {{ t('selectData') }}
         </a-button>
         
         <div class="selected-count" :class="{ 'has-data': recordIdList.length > 0 }">
            <div class="count-badge">
               <icon-check-circle-fill v-if="recordIdList.length > 0" />
               <icon-info-circle-fill v-else />
            </div>
            <span class="count-text">
              {{ recordIdList.length > 0 ? t('selectedCount', { count: recordIdList.length }) : t('noDataSelected') }}
            </span>
         </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-body">
      <a-skeleton v-if="loading" :animation="true">
        <a-space direction="vertical" :style="{width:'100%'}" size="large">
           <a-skeleton-line :rows="3" />
           <a-skeleton-line :rows="3" />
           <a-skeleton-line :rows="3" />
        </a-space>
      </a-skeleton>
      <div v-else class="form-list">
        <div v-for="(item, index) in configList" :key="item.field" class="form-card-item" :style="{ animationDelay: `${index * 0.05}s` }">
          <div class="item-left">
            <span class="item-icon" :class="`icon-${index % 4}`">
               <component :is="getIcon(index)" />
            </span>
            <div class="item-info">
              <span class="label-text">{{ item.title }}</span>
            </div>
          </div>
          <div class="item-right">
            <a-select v-model="formData[item.field]" class="minimal-select" allow-search :placeholder="t('pleaseSelect')"
             :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="opt in item.value.select" :key="opt" :value="opt">{{ opt }}</a-option>
            </a-select>
          </div>
        </div>
      </div>
    </div>

    <!-- 任务运行状态指示器 -->
    <div class="task-status-indicator" 
         v-if="runningTaskCount > 0"
         ref="indicatorRef"
         :style="indicatorStyle"
         @mousedown="handleDragStart"
         @touchstart="handleDragStart"
    >
      <a-tooltip :content="indicatorTooltip" position="left" mini>
        <div class="indicator-icon" 
             :class="{ 'is-running': runningTaskCount > 0 && !isPaused, 'is-paused': runningTaskCount > 0 && isPaused }">
           <icon-sync v-if="!isPaused" :spin="runningTaskCount > 0" />
           <icon-play-circle v-else />
        </div>
      </a-tooltip>
    </div>

    <!-- 底部固定操作栏 -->
    <div class="action-footer">
      <div class="footer-content">
        <div class="btn-group">
          <!-- <a-button class="btn-submit" type="primary" shape="round" @click="handleSubmit">
            <div class="btn-content">
              <div class="btn-row-main">
                <icon-thunderbolt />
                <span class="btn-text">{{ t('submit') }}</span>
              </div>
              <div v-if="recordIdList.length > 0 && estimatedPoints > 0" class="points-info">
                {{ t('consumePoints', { points: estimatedPoints }) }}
              </div>
            </div>
          </a-button> -->
          
          <a-button class="btn-submit" :class="{ 'is-loading': submitting }" type="primary" shape="round" @click="handleSubmit">
            <div class="btn-content-inline">
              <icon-loading spin v-if="submitting" />
              <icon-thunderbolt v-else />
              <span class="btn-text">{{ t('submit') }}</span>
              <span v-if="recordIdList.length > 0 && estimatedPoints > 0" class="points-info-inline">
                {{ t('consumePoints', { points: estimatedPoints }) }}
              </span>
            </div>
          </a-button>
        </div>
        <div class="footer-tip">{{ t('complianceTip') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { bitable, FieldType } from '@lark-base-open/js-sdk';
const ui = bitable.ui;
import { GetPlugSelectField, GetPlugAd, GetPlugDeductionSet } from '@api/api/common.js';
import zh from './locales/zh.json';
import en from './locales/en.json';
import jp from './locales/jp.json';
import useAppStore from '@/stores/app';
import { mapState } from 'pinia';
import { 
  IconCloudDownload, 
  IconEdit, 
  IconSync, 
  IconThunderbolt,
  IconSave,
  IconClose,
  IconArrowRight,
  IconPalette,
  IconImage,
  IconLanguage,
  IconExpand,
  IconCheckCircleFill,
  IconInfoCircleFill,
  IconPlayCircle,
  IconPlus,
  IconLoading,
  IconCopy
} from '@arco-design/web-vue/es/icon';
import { AddTask, GetTaskStatus } from "@api/api/index";
export default {
  name: 'Home',
  components: {
    IconCloudDownload,
    IconEdit,
    IconSync,
    IconThunderbolt,
    IconSave,
    IconCheckCircleFill,
    IconInfoCircleFill,
    IconClose,
    IconArrowRight,
    IconPalette,
    IconImage,
    IconLanguage,
    IconExpand,
    IconPlayCircle,
    IconPlus,
    IconLoading,
    IconCopy
  },
  data() {
    return {
      configList: [],
      loading: false,
      isSelectingData: false,
      bannerLoading: false,
      formData: {},
      locales: { zh, en, jp },
      bannerList: [],
      apiKey: localStorage.getItem('FEIYUAPIKEYPLUG') || '',
      isEditingApiKey: false,
      tempApiKey: '',
      edit: {
        appToken: '',
        tableId: '',
        viewId: '',
        rowId: '',
        imgs: '',
        total: '',
        title: '',
        desc: '',
        style: '',
        scene: '',
        language: '',
        aspectRatio: '',
        size: '',
        aiModel: '',
      },
      recordIdList: [],
      submitting: false,
      pollingTimer: null,
      runningTaskCount: 0,
      isPaused: false,
      webUrl: 'https://feishu.feiyushuju.com',
      deductionRules: {},
      estimatedPoints: 0,
      // 指示器拖拽状态
      indicatorTop: 500,
      isDragging: false,
      dragStartY: 0,
      initialTop: 0,
      hasMoved: false,
    };
  },
  computed: {
    ...mapState(useAppStore, ['language']),
    indicatorStyle() {
      return {
        top: `${this.indicatorTop}px`,
        right: '20px',
        position: 'fixed',
        zIndex: 9999,
        cursor: 'move',
        touchAction: 'none'
      };
    },
    indicatorTooltip() {
      if (this.runningTaskCount === 0) {
        return this.t('noTaskRunning');
      }
      if (this.isPaused) {
        return this.t('taskPaused');
      }
      return this.t('taskRunning', { count: this.runningTaskCount });
    }
  },
  watch: {
    'formData.aiModel': {
      handler() {
        this.calculatePoints();
      }
    },
    recordIdList: {
      handler() {
        this.calculatePoints();
      },
      deep: true
    }
  },
  mounted() {
    this.indicatorTop = window.innerHeight - 150;
    this.getPlugAd();
    this.getPlugSelectField();
    this.getPlugDeductionSet();
    this.pollTaskStatus(); // 加载时检查挂起的任务
  },
  methods: {
    handleHelpClick() {
      window.open('https://hey-fish.feishu.cn/docx/X6AadbCE9oDXoyxAgP6cs24on5a?from=from_copylink', '_blank');
    },
    async getPlugAd() {
      this.bannerLoading = true;
      try {
        const res = await GetPlugAd();
        if (res.code === 200) {
          this.bannerList = res.data || [];
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error);
      } finally {
        this.bannerLoading = false;
      }
    },
    async getPlugDeductionSet() {
      try {
        const res = await GetPlugDeductionSet();
        if (res.code === 200) {
          this.deductionRules = res.data || {};
        }
      } catch (error) {
        console.error('Failed to fetch deduction rules:', error);
      }
    },
    async calculatePoints() {
      if (this.recordIdList.length === 0) {
        this.estimatedPoints = 0;
        return;
      }
      
      const model = this.formData.aiModel;
      if (!model || !this.deductionRules || this.deductionRules[model] === undefined) {
        this.estimatedPoints = 0;
        return;
      }

      const unitPrice = this.deductionRules[model];
      let totalNum = 0;

      try {
        // 如果没有 tableId，尝试从 selection 获取
        let tableId = this.edit.tableId;
        if (!tableId) {
           const selection = await bitable.base.getSelection();
           tableId = selection.tableId;
        }
        if (!tableId) return;

        const table = await bitable.base.getTable(tableId);
        const outPutImgNumField = await table.getField('输出图数量');
        
        // 并行获取所有选中行的图片数量
        const promises = this.recordIdList.map(async (rowId) => {
             const val = await outPutImgNumField.getValue(rowId);
             // 尝试转换为数字，如果是非数字则为 0
             const num = parseInt(val?.text || 0, 10);
             return isNaN(num) ? 0 : num;
        });
        
        const nums = await Promise.all(promises);
        totalNum = nums.reduce((a, b) => a + b, 0);
        
        this.estimatedPoints = totalNum * unitPrice;
        
      } catch (e) {
        console.error('Calculate points error:', e);
        this.estimatedPoints = 0;
      }
    },
    handleBannerClick(url) {
      if (url) {
        window.open(url, '_blank');
      }
    },
    async getPlugSelectField () {
      this.loading = true;
      try {
        const res = await GetPlugSelectField();
        if (res.code === 200) {
          this.configList = res.data || [];
          this.webUrl = res?.domain || 'https://feishu.feiyushuju.com';
          this.initForm();
        } else {
         ui.showToast({
          toastType: 'error',
          message: res.msg || '获取配置失败'
         });
        }
      } catch (error) {
        ui.showToast({ toastType: 'error', message: '网络错误' });
      } finally {
        this.loading = false;
      }
    },
    async onSubmit () {
      const table = await bitable.base.getActiveTable()
      const attachmentField = await table.getField('参考图');
      const selection = await bitable.base.getSelection();
      const view1 = await table.getViewById(selection.viewId);
      const view = await view1.getVisibleRecordIdList();
      const attachmentUrls = await attachmentField.getAttachmentUrls(view[1]);
      console.log(JSON.stringify(attachmentUrls))
    },
    // 翻译方法
    t(key, params = {}) {
      // 优先从配置的语言包取，如果没有则显示key
      let text = this.locales[this.language]?.[key] || key;
      
      // 如果有参数，进行插值替换
      if (params && Object.keys(params).length > 0) {
        Object.keys(params).forEach(k => {
          text = text.split(`{${k}}`).join(params[k]);
        });
      }
      
      return text;
    },
    // 获取动态图标
    getIcon(index) {
      const icons = ['IconPalette', 'IconImage', 'IconLanguage', 'IconExpand'];
      return icons[index % icons.length];
    },
    // 初始化表单数据
    initForm() {
      const data = {};
      this.configList.forEach(item => {
        data[item.field] = item.value.default;
      });
      this.formData = { ...data };
    },
    async handleSubmit() {
      if (!this.validateApiKey()) return;
      
      // 在这里增加一个判断，判断是否有数据表权限，没有的话提示用户没有此多为表格的权限
      try {
        const hasPermission = await bitable.base.isEditable();
        if (!hasPermission) {
          ui.showToast({ toastType: 'error', message: '您没有此表格的权限，无法运行任务。' });
          return;
        }
      } catch (error) {
        console.error('Check permission error:', error);
      }


      if (this.submitting) return;
      if (this.recordIdList.length === 0) {
        ui.showToast({ toastType: 'error', message: '请先选择数据！' });
        return;
      }

      this.submitting = true;
      try {
        const table = await bitable.base.getTable(this.edit.tableId);
        const statusField = await table.getField('任务运行状态'); // 预取字段以确保存在
        const imgField = await table.getField('参考图');
        const outPutImgNumField = await table.getField('输出图数量');
        const titleField = await table.getField('商品标题');
        const descField = await table.getField('产品描述');
        const progressField = await table.getField('任务进度');
        const resultField = await table.getField('生成结果');

        // 任务运行时，this.recordIdList 我需要批量将“生成结果”字段附件 内容先清空。 - 先注释
        // await Promise.all(this.recordIdList.map(rId => resultField.setValue(rId, []).catch(e => console.error('Clear field error', e))));

        for (let i = 0; i < this.recordIdList.length; i++) {
          const rowId = this.recordIdList[i];
          this.edit.rowId = rowId;

          // 获取当前行数据
          const imgs = await imgField.getAttachmentUrls(rowId);
          this.edit.imgs = imgs; // 直接赋值数组或根据需要处理

          const totalCellValue = await outPutImgNumField.getValue(rowId);
          this.edit.total = totalCellValue?.text || 0;

          const titleCellValue = await titleField.getValue(rowId);
          this.edit.title = Array.isArray(titleCellValue) ? titleCellValue.map(item => item.text).join('\n') : (titleCellValue?.text || '');

          const descCellValue = await descField.getValue(rowId);
          this.edit.desc = Array.isArray(descCellValue) ? descCellValue.map(item => item.text).join('\n') : (descCellValue?.text || '');

          try {
            const res = await AddTask({ ...this.edit, ...this.formData });
            
            if (res.code === 200) {
              const taskData = res.data;
              const taskId = taskData.task_id;
              
              // 存储任务ID
              let storedTaskIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
              if (!Array.isArray(storedTaskIds)) storedTaskIds = [];

              if (!storedTaskIds.includes(taskId)) {
                storedTaskIds.push(taskId);
                await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', storedTaskIds);
              }
              // 任务进度
              await progressField.setValue(rowId, parseFloat(taskData?.progress || 0));
              
              // 更新表格中的状态
              await statusField.setValue(rowId, taskData.status_str);

            } else {
             ui.showToast({ toastType: 'error', message: res.msg || '任务提交失败' });
              break; // 出错时停止循环
            }
          } catch (err) {
            console.error(err);
            ui.showToast({ toastType: 'error', message: '提交任务时发生错误' });
            break;
          }
        }

        ui.showToast({ toastType: 'success', message: '任务执行成功' });
        this.recordIdList = []; // 清空选择
        
        // 强制重置暂停状态并启动轮询
        this.isPaused = false;
        this.pollTaskStatus(); // 开始轮询

      } catch (e) {
        console.error(e);
        ui.showToast({ toastType: 'error', message: '错误: ' + e.message });
      } finally {
        this.submitting = false;
      }
    },

    // 拖拽处理
    handleDragStart(e) {
      if (this.runningTaskCount === 0) return;
      this.isDragging = true;
      this.hasMoved = false;
      this.initialTop = this.indicatorTop;
      
      // 获取Y坐标（鼠标或触摸）
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.dragStartY = clientY;
      
      // 阻止默认行为以避免文本选择或滚动，并确保点击不会原生触发
      if (e.cancelable) e.preventDefault();

      // 添加全局监听器
      window.addEventListener('mousemove', this.handleDragMove);
      window.addEventListener('mouseup', this.handleDragEnd);
      window.addEventListener('touchmove', this.handleDragMove, { passive: false });
      window.addEventListener('touchend', this.handleDragEnd);
    },

    handleDragMove(e) {
      if (!this.isDragging) return;
      
      // 修复：如果鼠标按键在窗口外释放，当鼠标返回时停止拖拽
      if (e.type === 'mousemove' && e.buttons === 0) {
        this.handleDragEnd();
        return;
      }
      
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - this.dragStartY;
      
      // 检查移动阈值
      if (Math.abs(deltaY) > 2) {
          this.hasMoved = true;
      }

      let newTop = this.initialTop + deltaY;
      
      // 边界检查
      const windowHeight = window.innerHeight;
      const indicatorHeight = 40; // 指示器大致高度
      const margin = 10;
      
      // 保持在垂直边界内
      if (newTop < margin) newTop = margin;
      if (newTop > windowHeight - indicatorHeight - margin) newTop = windowHeight - indicatorHeight - margin;
      
      this.indicatorTop = newTop;
      
      if (e.cancelable) e.preventDefault();
    },

    handleDragEnd() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
      window.removeEventListener('touchmove', this.handleDragMove);
      window.removeEventListener('touchend', this.handleDragEnd);

      // 如果没有显著移动，则视为点击
      if (!this.hasMoved) {
          this.togglePolling();
      }
    },

    togglePolling() {
      if (this.runningTaskCount === 0) return;

      if (this.isPaused) {
        // 恢复
        this.isPaused = false;
        this.pollTaskStatus();
        ui.showToast({ toastType: 'success', message: this.t('pollingResumed') || '已恢复检测' });
      } else {
        // 暂停
        this.isPaused = true;
        if (this.pollingTimer) {
          clearTimeout(this.pollingTimer);
          this.pollingTimer = null;
        }
        ui.showToast({ toastType: 'warning', message: this.t('pollingPaused') || '已暂停检测' });
      }
    },

    async pollTaskStatus() {
      // 在这里增加一个判断，判断是否有数据表权限，没有的话提示用户没有此多为表格的权限
      try {
        const hasPermission = await bitable.base.isEditable();
        if (!hasPermission) {
          ui.showToast({ toastType: 'error', message: '您没有此表格的权限，终止任务运行。' });
          this.isPaused = true;
          this.pollingTimer = null;
          return;
        }
      } catch (error) {
        console.error('Check permission error:', error);
        this.isPaused = true;
        this.pollingTimer = null;
        return;
      }

      // 避免多个轮询循环
      if (this.pollingTimer) {
        clearTimeout(this.pollingTimer);
        this.pollingTimer = null;
      }
      
      if (this.isPaused) return;
 
      // 始终从 bridge 读取最新的任务ID
      let currentStoredTaskIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
      if (!Array.isArray(currentStoredTaskIds)) currentStoredTaskIds = [];

      this.runningTaskCount = currentStoredTaskIds.length;
      if (currentStoredTaskIds.length === 0) {
        return;
      }

      try {
        const res = await GetTaskStatus({ taskIds: currentStoredTaskIds });
        if (res && res.code === 200) {
          const tasks = Array.isArray(res.data) ? res.data : [res.data];
          
          // 使用新的ID副本进行过滤
          let nextRoundTaskIds = [...currentStoredTaskIds];

          for (const task of tasks) {
            // 检查此任务是否仍在最新列表中（可能已被其他进程移除，尽管在单线程JS中不太可能）
            if (!nextRoundTaskIds.includes(task.task_id)) continue;

            if (!task.table_id || !task.row_id) continue;

            try {
              const table = await bitable.base.getTable(task.table_id);
 

              // 状态 3: 已完成
              if (task.status === 3) {
                // 图片处理块
                try {
                  if (task.images && task.images.length > 0) {
                    console.log('[Task] Processing images:', task.images.length);
                    
                    // 1. 获取字段，特定错误处理
                    let outPutImgField;
                    try {
                      outPutImgField = await table.getField('生成结果');
                    } catch (fieldError) {
                      try {
                        // 打印所有字段以供调试
                        const fieldList = await table.getFieldList();
                        const fieldNames = await Promise.all(fieldList.map(f => f.getName()));

                        // 创建字段
                        await table.addField({ type: FieldType.Attachment, name: '生成结果' });
                        outPutImgField = await table.getField('生成结果');
                        console.log('[Task] Field "生成结果" created successfully.');
                      } catch (createError) {
                        console.error('[Task] Failed to create field "生成结果":', createError);
                        throw new Error('Field "生成结果" access and creation failed'); 
                      }
                    }
                    
                    // 2. 处理图片
                    const fileList = [];
                    for (const imgUrl of task.images) {
                      try {
                        const file = await this.urlToFile(imgUrl);
                        if (file) {
                          fileList.push(file);
                        } else {
                          console.warn('[Task] Failed to convert url to file:', imgUrl);
                        }
                      } catch (err) {
                        console.error('[Task] Error processing image url:', imgUrl, err);
                      }
                    }

                    console.log('[Task] Ready to upload fileList:', fileList.length);
                    if (fileList.length > 0) {
                      // 1. 获取旧数据
                      const existingVal = await outPutImgField.getValue(task.row_id);
                      
                      // 2. 先上传新文件（这会覆盖旧数据，但我们已经备份在 existingVal）
                      // 分步上传是为了解决 SDK 不支持同时传入“File对象”和“已有附件Token对象”导致 createReader 报错的问题
                      await outPutImgField.setValue(task.row_id, fileList);
                      
                      // 3. 如果原本有数据，需要合并
                      if (existingVal && existingVal.length > 0) {
                          // 获取刚上传的新数据的 Token 信息
                          const newVal = await outPutImgField.getValue(task.row_id);
                          
                          // 合并：确保使用纯对象
                          let oldList = [];
                          let newList = [];
                          try {
                             oldList = JSON.parse(JSON.stringify(existingVal));
                             newList = JSON.parse(JSON.stringify(newVal));
                          } catch (e) {
                             console.warn('Parse attachments error', e);
                          }
                          
                          const finalAttachments = [...oldList, ...newList];
                          
                          // 4. 回填合并后的数据
                          await outPutImgField.setValue(task.row_id, finalAttachments);
                      }
                      console.log('[Task] Images uploaded successfully (appended).');
                    }
                  }
                } catch (err) {
                  console.error('[Task] Image upload logic error (continuing to cleanup):', err);
                }
                
                // 3. 从列表中移除
                console.log('[Task] Removing task ID:', task.task_id);
                nextRoundTaskIds = nextRoundTaskIds.filter(id => id !== task.task_id);
              }               
              // 状态 -1: 失败
              else if (task.status === -1) {
                // 从列表中移除
                nextRoundTaskIds = nextRoundTaskIds.filter(id => id !== task.task_id);
              }

              const statusField = await table.getField('任务运行状态');
              const statusStr = await statusField.getValue(task.row_id);
              if (statusStr?.text !== task?.status_str) {
                // 不相等，更新
                await statusField.setValue(task.row_id, task.status_str);
              }
              const progressField = await table.getField('任务进度');
              // 任务进度
              await progressField.setValue(task.row_id, parseFloat(task?.progress || 0) / 100);


            } catch (innerErr) {
              console.error('Error updating task status:', innerErr);
            }
          }

          // 重要：在保存之前重新读取存储，以避免覆盖等待期间添加的新任务
          let latestStoredIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
          if (!Array.isArray(latestStoredIds)) latestStoredIds = [];
          
          // 计算应保留哪些 ID：
          // (存储中的最新 ID) 减去 (我们在本次循环中完成/失败的 ID)
          // 我们不能只使用 nextRoundTaskIds，因为它不包含新添加的 ID。
          
          // 识别本次轮询周期中移除的 ID
          const removedIds = currentStoredTaskIds.filter(id => !nextRoundTaskIds.includes(id));
          
          // 从最新存储中过滤掉它们
          const finalTaskIds = latestStoredIds.filter(id => !removedIds.includes(id));

          // 更新存储
          await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', finalTaskIds);
          this.runningTaskCount = finalTaskIds.length;

          // 如果任务仍存在，继续轮询
          if (finalTaskIds.length > 0 && !this.isPaused) {
             this.pollingTimer = setTimeout(() => {
               this.pollTaskStatus();
             }, 5000);
          }

        } else {
           // API 错误，停止轮询
           this.pollingTimer = null;
           this.isPaused = true;
        }
      } catch (e) {
        // 发生错误，停止轮询
        this.pollingTimer = null;
        this.isPaused = true;
      }
    },

    async urlToFile(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.png';
        return new File([blob], filename, { type: blob.type });
      } catch (error) {
        console.error('urlToFile error:', error);
        return null;
      }
    },
    async handleReset() {
      this.initForm();
      ui.showToast({ toastType: 'info', message: this.t('reset') });
    },
    validateApiKey() {
      const key = this.isEditingApiKey ? this.tempApiKey : this.apiKey;
      if (!key) {
        ui.showToast({ toastType: 'error', message: '请填写 API 秘钥' });
        return false;
      }
      return true;
    },
    startEditApiKey() {
      this.tempApiKey = this.apiKey;
      this.isEditingApiKey = true;
    },
    async saveApiKey() {
      this.apiKey = this.tempApiKey;
      localStorage.setItem('FEIYUAPIKEYPLUG', this.apiKey);
      this.isEditingApiKey = false;
      ui.showToast({ toastType: 'success', message: this.t('apiKeySaved') });
    },
    cancelEditApiKey() {
      this.tempApiKey = '';
      this.isEditingApiKey = false;
    },
    handleUseTemplate() {
      if (!this.validateApiKey()) return;
      window.open('https://hey-fish.feishu.cn/base/JOODbXcvKa3j9KsJqo5c04SKn6b?from=from_copylink', '_blank');
    },
    // 选择数据
    async handleSelectData() {
      if (!this.validateApiKey()) return;
      // 在这里增加一个判断，判断是否有数据表权限，没有的话提示用户没有此多为表格的权限
      try {
        const hasPermission = await bitable.base.isEditable();
        if (!hasPermission) {
          ui.showToast({ toastType: 'error', message: '您没有此表格的权限，无法选择数据' });
          return;
        }
      } catch (error) {
        console.error('Check permission error:', error);
      }
      this.isSelectingData = true;
      try {
      this.recordIdList = [];
      const { baseId, tableId, viewId } = await bitable.base.getSelection();
      // 基础数据
      this.edit.appToken = baseId;
      this.edit.tableId = tableId;
      this.edit.viewId = viewId;
      // 检测当前表格字段是否符合规则
      const requiredFields = ['商品标题', '产品描述', '参考图'];
      try {
        const table = await bitable.base.getTable(tableId);
        const fieldMetaList = await table.getFieldMetaList();
        const existingFieldNames = fieldMetaList.map(field => field.name);
        
        const missingFields = requiredFields.filter(field => !existingFieldNames.includes(field));
        
        if (missingFields.length > 0) {
          ui.showToast({
            toastType: 'error',
            message: `当前表格缺失以下字段，请检查: 「  ${missingFields.join('、')}  」是否存在`
          });
          return;
        }

        // 检查并强制转换核心字段类型
        const typeMapping = {
          '商品标题': FieldType.Text,
          '产品描述': FieldType.Text,
          '参考图': FieldType.Attachment
        };

        for (const [fieldName, expectedType] of Object.entries(typeMapping)) {
          const field = fieldMetaList.find(f => f.name === fieldName);
          if (field && field.type !== expectedType) {
            try {
              console.log(`Converting field ${fieldName} from ${field.type} to ${expectedType}`);
              await table.setField(field.id, { type: expectedType });
            } catch (err) {
              console.error(`Failed to convert field ${fieldName}:`, err);
              ui.showToast({
                toastType: 'warning',
                message: `字段「${fieldName}」类型不正确且无法自动转换，请手动修改为${expectedType === FieldType.Attachment ? '附件' : '文本'}类型`
              });
              // 如果转换失败，可能需要终止，或者让用户自行处理。根据需求“如果类型错误，强制转换为正确类型”，失败则意味着无法满足需求。
              // 这里选择抛出错误终止流程，以免后续逻辑报错
              throw new Error(`Field ${fieldName} type mismatch and conversion failed`);
            }
          }
        }
        

        // 自动补充字段
        
        // 1. 任务运行状态
         const statusFieldName = '任务运行状态';
         const statusOptionsConfig = [
           { name: '待创建', color: 0 }, // 0: 灰色
           { name: '已排队', color: 2 }, // 2: 橙色
           { name: '执行中', color: 4 }, // 4: 绿色
           { name: '已完成', color: 5 }, // 5: 蓝色
           { name: '已失败', color: 1 }  // 1: 红色
         ];
         
         const existingStatusField = fieldMetaList.find(f => f.name === statusFieldName);
         if (existingStatusField) {
            // 存在则检测类型
            if (existingStatusField.type !== FieldType.SingleSelect) {
              console.log(`Converting ${statusFieldName} to SingleSelect`);
              await table.setField(existingStatusField.id, { 
                type: FieldType.SingleSelect,
                property: { options: statusOptionsConfig }
              });
            }
         } else {
           // 不存在则创建
            await table.addField({
              type: FieldType.SingleSelect,
              name: statusFieldName,
              property: { options: statusOptionsConfig }
            });
         }
         
         // --- 统一设置“任务运行状态”默认值 ---
         try {
           const statusField = await table.getField(statusFieldName);
           let statusOptions = await statusField.getOptions();
           
           // 如果选项为空（可能是转换类型时丢失），重新设置选项
           if (!statusOptions || statusOptions.length === 0) {
              console.log('Options missing for status field, resetting options...');
              // 注意：setField 修改属性时不需要传 type
              await table.setField(statusField.id, { property: { options: statusOptionsConfig } });
              statusOptions = await statusField.getOptions();
           }

           const targetOption = statusOptions.find(opt => opt.name === '待创建');
           if (targetOption) {
             const view = await table.getViewById(viewId);
             const recordIdList = await view.getVisibleRecordIdList();
             for (const recordId of recordIdList) {
                // 如果值为空，则设置默认值
                const val = await statusField.getValue(recordId);
                if (!val) {
                  await statusField.setValue(recordId, targetOption.id);
                }
             }
           }
         } catch (e) {
           console.error('Set default value for status field failed:', e);
         }

         // 2. 任务进度
         const progressFieldName = '任务进度';
         const existingProgressField = fieldMetaList.find(f => f.name === progressFieldName);
         let shouldCreateProgress = false;

         if (existingProgressField) {
            // 存在则检测类型
            if (existingProgressField.type !== FieldType.Progress) {
               console.log(`Deleting ${progressFieldName} due to type mismatch`);
               try {
                   await table.deleteField(existingProgressField.id);
                   shouldCreateProgress = true;
               } catch (error) {
                   console.error(`Failed to delete field ${progressFieldName}:`, error);
                   // 如果删除失败，可能需要中断或抛出错误，或者尝试直接 setField？
                   // 用户要求是“删除掉”，如果删除不了，后续创建也会报错（重名）。
                   // 这里简单的抛出异常或者让后续逻辑去处理
                   throw error;
               }
            }
         } else {
            shouldCreateProgress = true;
         }

         if (shouldCreateProgress) {
           await table.addField({
             type: FieldType.Progress,
             name: progressFieldName,
             property: { formatter: '0%' }
           });
         }
         
         // --- 统一设置“任务进度”默认值 ---
         try {
            const progressField = await table.getField(progressFieldName);
            const view = await table.getViewById(viewId);
            const recordIdList = await view.getVisibleRecordIdList();
            for (const recordId of recordIdList) {
               const val = await progressField.getValue(recordId);
               // 数字类型 getValue 返回可能不同，这里简单判断
               if (val === null || val === undefined) {
                 await progressField.setValue(recordId, 0);
               }
            }
         } catch (e) {
            console.error('Set default value for progress field failed:', e);
         }

         // 3. 输出图数量
         const outputFieldName = '输出图数量';
         const numOptions = [];
         for (let i = 1; i <= 20; i++) {
             numOptions.push({ name: String(i) });
         }
         
         const existingOutputField = fieldMetaList.find(f => f.name === outputFieldName);
         if (existingOutputField) {
             if (existingOutputField.type !== FieldType.SingleSelect) {
                 console.log(`Converting ${outputFieldName} to SingleSelect`);
                 await table.setField(existingOutputField.id, {
                     type: FieldType.SingleSelect,
                     property: { options: numOptions }
                 });
             }
         } else {
           await table.addField({
             type: FieldType.SingleSelect,
             name: outputFieldName,
             property: { options: numOptions }
           });
         }
         
         // --- 统一设置“输出图数量”默认值 ---
         try {
           const outputNumField = await table.getField(outputFieldName);
           let outputOptions = await outputNumField.getOptions();
           
           // 如果选项为空，重新设置
           if (!outputOptions || outputOptions.length === 0) {
               console.log('Options missing for output field, resetting options...');
               await table.setField(outputNumField.id, { property: { options: numOptions } });
               outputOptions = await outputNumField.getOptions();
           }
           
           const targetOutputOption = outputOptions.find(opt => opt.name === '5');
           if (targetOutputOption) {
              const view = await table.getViewById(viewId);
              const recordIdList = await view.getVisibleRecordIdList();
              for (const recordId of recordIdList) {
                const val = await outputNumField.getValue(recordId);
                if (!val) {
                  await outputNumField.setValue(recordId, targetOutputOption.id);
                }
              }
           }
         } catch (e) {
            console.error('Set default value for output field failed:', e);
         }

        // 4. 生成结果
        const resultFieldName = '生成结果';
        const existingResultField = fieldMetaList.find(f => f.name === resultFieldName);
        if (existingResultField) {
            if (existingResultField.type !== FieldType.Attachment) {
                console.log(`Converting ${resultFieldName} to Attachment`);
                await table.setField(existingResultField.id, { type: FieldType.Attachment });
            }
        } else {
          await table.addField({ type: FieldType.Attachment, name: resultFieldName });
        }

      } catch (error) {
        console.error('Check fields error:', error);
        ui.showToast({
          toastType: 'error',
          message: '检测字段失败'
        });
        return;
      }

      // 获取多选，选中的表格数据 recordIdList 是一个数组，表格的ID
      this.recordIdList = await bitable.ui.selectRecordIdList(tableId, viewId);
      } catch (error) {
        console.error(error);
      } finally {
        this.isSelectingData = false;
      }
    },
    // 修改后使用中文注释
    async handleAddTable() {
      if (!this.validateApiKey()) return;
      // 在这里增加一个判断，判断是否有数据表权限，没有的话提示用户没有此多为表格的权限
      try {
        const hasPermission = await bitable.base.isEditable();
        if (!hasPermission) {
          ui.showToast({ toastType: 'error', message: '您没有新建数据表的权限' });
          return;
        }
      } catch (error) {
        console.error('Check permission error:', error);
      }

      try {
        // 1. 获取所有数据表，用于生成不重复的表名
        const tableList = await bitable.base.getTableList();
        const names = await Promise.all(tableList.map(table => table.getName()));
        
        let newName = '飞鱼数据表';
        let counter = 1;
        while (names.includes(`${newName}${counter}`)) {
          counter++;
        }
        newName = `${newName}${counter}`;

        // 2. 创建数据表
        const { tableId } = await bitable.base.addTable({ name: newName });
        const table = await bitable.base.getTable(tableId);

        // 3. 切换到新创建的数据表
        await bitable.ui.switchToTable(tableId);

        // 4. 创建字段
        // 获取当前字段列表，修改第一个默认字段（通常是文本类型）为"商品标题"
        const fieldList = await table.getFieldList();
        if (fieldList.length > 0) {
          await table.setField(fieldList[0].id, { name: '商品标题' });
        } else {
          await table.addField({ type: FieldType.Text, name: '商品标题' });
        }
        // 字段4: 产品描述 (文本)
        await table.addField({ type: FieldType.Text, name: '产品描述' });
        // 字段5: 参考图 (附件)
        await table.addField({ type: FieldType.Attachment, name: '参考图' });

        // 字段2: 任务运行状态 (单选)
        await table.addField({
          type: FieldType.SingleSelect,
          name: '任务运行状态',
          property: {
            options: [
              { name: '待创建', color: 0 }, // 0: 灰色
              { name: '已排队', color: 2 }, // 2: 橙色
              { name: '执行中', color: 4 }, // 4: 绿色
              { name: '已完成', color: 5 }, // 5: 蓝色
              { name: '已失败', color: 1 }  // 1: 红色
            ]
          }
        });

        // 字段3: 任务进度 (数字，格式化为百分比)
        // 注意：API可能不支持直接设置为进度条样式，但可以设置为数字类型
        await table.addField({
          type: FieldType.Progress,
          name: '任务进度',
          property: {
            formatter: '0%' // 尝试设置格式
          }
        });
        // 字段6: 输出图数量 (单选 1-20)
        const numOptions = [];
        for (let i = 1; i <= 20; i++) {
          numOptions.push({ name: String(i) });
        }
        await table.addField({
          type: FieldType.SingleSelect,
          name: '输出图数量',
          property: {
            options: numOptions
          }
        });
        // 字段7: 生成结果 (附件)
        await table.addField({ type: FieldType.Attachment, name: '生成结果' });

        ui.showToast({ toastType: 'success', message: '新建数据表成功' });

      } catch (error) {
        console.error('Add table error:', error);
        ui.showToast({ toastType: 'error', message: '当前表格，无新建数据表权限！' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.feiyu-home {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--custom-text-color);
  /* overflow: hidden; 移除，由外层 LayoutView 控制滚动 */
}
/* 轮播图区域 */
.banner-section {
  margin-bottom: 24px;
  
  .banner-item {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    
    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}


/* 主要内容区 */
.content-body {
  flex: 1;
  /* 移除局部滚动，跟随页面滚动 */
}


.icon-help {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  color: var(--color-text-3);
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
  
  &:hover {
    color: rgb(var(--primary-6));
  }
}

/* 任务运行状态指示器 */
.task-status-indicator {
  position: fixed;
  /* left: 5px; Removed for dynamic positioning */
  /* bottom: 150px; Removed for dynamic positioning */
  z-index: 9999;
  
  .indicator-icon {
    width: 24px;
    height: 24px;
    background: var(--color-bg-2);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    transition: all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    color: var(--color-text-3);
    border: 1px solid var(--color-border-2);
    font-size: 14px;

    &.is-running {
      color: #00b42a;
      background: rgba(0, 180, 42, 0.1);
      border-color: #00b42a;
      box-shadow: 0 2px 12px rgba(0, 180, 42, 0.2);
    }

    &.is-paused {
      color: #ff7d00;
      background: rgba(255, 125, 0, 0.1);
      border-color: #ff7d00;
      box-shadow: 0 2px 12px rgba(255, 125, 0, 0.2);
    }
    
    &.is-running, &.is-paused {
      cursor: pointer;
    }
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

/* API Key 设置区域 */
.api-key-section {
  background: var(--custom-card-bg);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: var(--custom-shadow);
  border: 1px solid var(--custom-border-color);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .header-left {
      display: flex;
      align-items: center;
      
      .vertical-bar {
        width: 4px;
        height: 14px;
        background-color: #722ED1; /* 紫色竖条 */
        border-radius: 2px;
        margin-right: 8px;
      }
      
      .section-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--custom-text-color);
        margin-right: 12px;
      }
      
      .link-text {
        font-size: 12px;
        color: #165DFF;
        text-decoration: none;
        height: 22.5px;
        line-height: 2;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .section-body {
    .save-btn-area {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      border-top: 1px solid var(--custom-border-color);
      padding-top: 12px;
      
      .btn-cancel {
        flex: 0 0 auto;
        color: var(--custom-text-secondary);
        border-radius: 6px;
        padding: 0 16px;
        min-width: 80px;
        &:hover {
          background-color: var(--color-fill-2);
          color: var(--custom-text-color);
        }
      }

      .btn-save {
        flex: 1;
        border-radius: 6px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 180, 42, 0.2);
        transition: all 0.2s;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 180, 42, 0.3);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }

    .api-input {
      :deep(.arco-input-wrapper) {
        border-radius: 8px;
        background-color: var(--color-fill-2);
        border: 1px solid transparent;
        padding: 8px 12px;
        transition: all 0.2s;
        
        &.arco-input-disabled {
           background-color: var(--color-fill-1);
           color: var(--color-text-4);
           cursor: not-allowed;
        }
        
        &:hover:not(.arco-input-disabled), &:focus-within:not(.arco-input-disabled) {
          background-color: var(--custom-card-bg);
          border-color: #722ED1;
          box-shadow: 0 0 0 2px rgba(114, 46, 209, 0.1);
        }
      }
    }

    .selected-count {
      margin-top: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      background-color: var(--color-fill-2);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
      
      .count-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: var(--color-text-3);
        transition: color 0.3s;
      }
      
      .count-text {
        font-size: 13px;
        color: var(--color-text-2);
        font-weight: 500;
      }

      &.has-data {
        background-color: rgba(0, 180, 42, 0.1);
        
        .count-badge {
          color: #00b42a;
        }
      }
    }
  }
}

/* 表单列表 */
.form-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 100px;
}

.form-card-item {
  background: var(--custom-card-bg);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--custom-shadow);
  border: 1px solid var(--custom-border-color);
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);

  .item-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .item-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      
      &.icon-0 { background: rgba(22, 93, 255, 0.1); color: #165DFF; }
      &.icon-1 { background: rgba(114, 46, 209, 0.1); color: #722ED1; }
      &.icon-2 { background: rgba(255, 125, 0, 0.1); color: #FF7D00; }
      &.icon-3 { background: rgba(0, 180, 42, 0.1); color: #00B42A; }
    }

    .item-info {
      display: flex;
      flex-direction: column;
      
      .label-text {
        font-size: 15px;
        font-weight: 500;
        color: var(--custom-text-color);
      }
    }
  }

  .item-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    max-width: 50%;
    
    .minimal-select {
      width: 100%;
      background: transparent;
      :deep(.arco-select-view-single) {
        background: transparent;
        border: none;
        padding-right: 0;
        .arco-select-view-value {
          justify-content: flex-end;
          font-size: 14px;
        }
      }
    }
  }
}

/* 底部固定操作栏 */
.action-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--custom-card-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--custom-border-color);
  padding: 12px 20px 6px 20px;
  padding-bottom: calc(6px + constant(safe-area-inset-bottom));
  padding-bottom: calc(6px + env(safe-area-inset-bottom));
  z-index: 100;

  .footer-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .btn-group {
      display: flex;
      gap: 12px;
      
      .btn-submit {
        flex: 1;
        height: 48px;
        font-size: 16px;
        font-weight: 600;
        background: linear-gradient(90deg, #165DFF 0%, #722ED1 100%);
        border: none;
        box-shadow: 0 4px 12px rgba(22, 93, 255, 0.3);
        
        &:hover {
          box-shadow: 0 6px 16px rgba(22, 93, 255, 0.4);
          transform: translateY(-1px);
        }
        
        &:active {
          transform: translateY(1px);
        }
        
        &.is-loading {
          opacity: 0.8;
          cursor: not-allowed;
          pointer-events: none;
        }

        .btn-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.2;
          
          .btn-row-main {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            white-space: nowrap; /* Prevent wrapping */
          }

          .btn-text {
             /* Remove flex/gap from here as it's now handled by btn-row-main */
          }
          
          .points-info {
            font-size: 10px;
            font-weight: normal;
            opacity: 0.6;
            margin-top: 0px;
            white-space: nowrap; /* Prevent wrapping */
          }
        }

        .btn-content-inline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          
          .points-info-inline {
            font-size: 12px;
            font-weight: normal;
            opacity: 0.8;
            margin-left: 2px;
            white-space: nowrap;
          }
        }
      }
    }
    
    .footer-tip {
      text-align: center;
      font-size: 11px;
      color: var(--color-text-4);
      transform: scale(0.9);
    }
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
