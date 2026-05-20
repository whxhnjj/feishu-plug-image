<template>
  <div class="feiyu-home">
    <!-- 程序运行状态横幅 -->
    <transition name="fade">
      <div v-if="runningTaskCount > 0" class="running-banner">
        <div class="banner-content">
          <div class="banner-text">
            <div class="text-main"><icon-loading class="banner-icon" spin />请保持窗口开启，任务运行中，请您耐心等待！</div>
            <div class="text-sub"> ⚠️
              请勿删除任何运行中的多维表格或表格行，否则将导致任务异常。若因违规删除已生成的成功数据，造成数据无法回传至多维表格的情况，相关积分不予返还，且用户需自行承担数据丢失的责任。</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 轮播广告位 -->
    <div class="banner-section" v-if="!isBannerHidden">
      <a-skeleton v-if="bannerLoading" :animation="true">
        <a-skeleton-shape shape="rect" style="width: 100%; height: 140px; border-radius: 12px;" />
      </a-skeleton>
      <a-carousel v-else-if="bannerList.length > 0" class="custom-carousel" :auto-play="true" indicator-type="slider"
        show-arrow="hover" style="width: 100%; height: 140px; border-radius: 12px; overflow: hidden;">
        <a-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner-item" @click="handleBannerClick(item.url)"
            :style="{ cursor: item.url ? 'pointer' : 'default' }">
            <img :src="item.image" class="banner-img" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>

    <!-- 联系客服 -->
    <div v-if="!isKefuIconRemoved" class="kefu-contact-strip" @click="handleKefuClick">
      <div class="kefu-contact-left">
        <icon-customer-service />
      </div>
      <div class="kefu-contact-main">
        <div class="kefu-contact-title">联系客服</div>
        <div class="kefu-contact-desc">7 * 24小时在线服务</div>
      </div>
      <div class="kefu-contact-cta">
        <span>立即联系</span>
        <icon-arrow-right />
      </div>
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
          <a v-if="webUrl" :href="webUrl + '/app/user-center'" target="_blank" class="link-text">{{ t('getApiKey')
          }}</a>
        </div>
        <div class="header-right">
          <a-button v-if="!isEditingApiKey" type="text" size="small" @click="startEditApiKey">
            <template #icon><icon-edit /></template>
          </a-button>
          <a-button type="text" size="small" @click="showSettingsModal = true">
            <template #icon><icon-settings /></template>
          </a-button>
        </div>
      </div>
      <div class="section-body">
        <a-input-password v-if="!isEditingApiKey" v-model="apiKey" :placeholder="t('enterApiKey')" class="api-input"
          disabled>
        </a-input-password>
        <a-input-password v-else v-model="tempApiKey" :placeholder="t('enterApiKey')" class="api-input" allow-clear>
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
          <a-button type="primary" size="mini" class="btn-copy-template" style="margin-right: 8px;"
            @click="handleAddTable" :loading="isSelectingData">
            <template #icon><icon-plus /></template>
            {{ t('addDataTable') }}
          </a-button>
          <a-button type="outline" size="mini" @click="handleUseTemplate">
            <template #icon><icon-plus /></template>
            {{ t('createTable') }}
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
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :rows="3" />
          <a-skeleton-line :rows="3" />
          <a-skeleton-line :rows="3" />
        </a-space>
      </a-skeleton>
      <div v-else class="form-list">
        <!-- 模型选项 -->
        <div v-if="configList.model" class="form-card-item">
          <div class="item-left">
            <span class="item-icon icon-fixed-0"><icon-palette /></span>
            <div class="item-info">
              <div class="label-with-help">
                <span class="label-text">{{ configList.model.title }}</span>
                <a-tooltip trigger="hover" position="top"
                  content="同一模型在不同线路下，积分消耗可能不同；各线路稳定性也会有差异。模型生图质量目标一致，但成功率会受线路状态影响，请按您的实际需求选择线路。">
                  <span class="label-help-icon">
                    <icon-question-circle />
                  </span>
                </a-tooltip>
              </div>
            </div>
          </div>
          <div class="item-right">
            <a-select v-model="formData.aiModel" class="minimal-select" allow-search
              :placeholder="t('pleaseSelect')" :trigger-props="{
                autoFitPopupWidth: false,
                autoFitPopupMinWidth: false,
                popupStyle: { width: '300px' },
                contentClass: 'model-select-popup-content'
              }">
              <template #label="{ data }">
                <div v-if="data" class="model-option-left" style="gap: 4px; min-width: 0; width: 100%;">
                  <div class="model-icon-box" style="width: 20px; height: 20px; border-radius: 4px;">
                    <img :src="getImgSrc(data.value)" alt="icon" class="model-icon-img"
                      style="width: 12px; height: 12px;" />
                  </div>
                  <span class="model-name"
                    style="font-size: 13px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{
                      data.label }}</span>
                </div>
              </template>
              <a-option v-for="opt in configList.model.value" :key="opt.value" :value="opt.value"
                :label="opt.label || opt.name">
                <div class="model-option-wrapper">
                  <div class="model-option-left">
                    <div class="model-icon-box">
                      <img :src="getImgSrc(opt.value)" alt="icon" class="model-icon-img" />
                    </div>
                    <div class="model-name-wrapper">
                      <div class="model-name-group">
                        <span class="model-name">{{ opt.label || opt.name }}</span>
                        <span v-if="opt.plan !== undefined && opt.plan !== null && opt.plan !== ''" class="model-line-text">
                          线路 {{ opt.plan }}
                        </span>
                      </div>
                      <div v-if="opt.is_active" class="model-badge">
                        {{ opt.is_active }}
                      </div>
                    </div>
                  </div>
                  <span class="model-points">{{ opt.points }} {{ t('points') || '积分' }}</span>
                </div>
              </a-option>
            </a-select>
          </div>
        </div>

        <!-- setting 动态配置 -->
        <div v-if="visibleCurrentModelSettings.length > 0" v-for="(item, index) in visibleCurrentModelSettings" :key="item.field"
          class="form-card-item">
          <div class="item-left">
            <span class="item-icon" :class="`icon-${(index + 2) % 4}`">
              <component :is="getIcon(index + 2, item.title)" />
            </span>
            <div class="item-info">
              <span class="label-text">{{ item.title }}</span>
            </div>
          </div>
          <div class="item-right">
            <a-select v-if="item.type === 'select'" v-model="formData[item.field]" class="minimal-select" allow-search
              :placeholder="t('pleaseSelect') + ' ' + item.title" :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="opt in item.value" :key="opt.value" :value="opt.value"
                :disabled="item.field === 'language' ? isLanguageDisabled(opt.value) : false">{{ opt.name }}</a-option>
            </a-select>
            <a-input-number v-else-if="item.type === 'number'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" mode="button" />
            <a-input v-else-if="item.type === 'text'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" allow-clear />
            <a-textarea v-else-if="item.type === 'textarea'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" allow-clear
              :auto-size="{ minRows: 3, maxRows: 6 }" />
            <div v-else-if="item.type === 'url'" class="url-upload-field">
              <input type="file" multiple accept="image/*"
                @change="(event) => handleUrlFieldFileChange(item, event)">
              <div class="url-upload-meta">
                <span class="url-upload-count">已选择 {{ getUrlFieldFileCount(item.field) }} 个文件</span>
                <a-button type="text" size="mini" @click="clearUrlFieldFiles(item.field)">清空</a-button>
              </div>
            </div>
          </div>
        </div>

        <!-- fixedSetting 固定配置 -->
        <div v-if="configList.fixedSetting" v-for="(item, index) in configList.fixedSetting" :key="item.field"
          class="form-card-item">
          <div class="item-left">
            <span class="item-icon"
              :class="`icon-${(index + 2 + visibleCurrentModelSettings.length) % 4}`">
              <component
                :is="getIcon(index + 2 + visibleCurrentModelSettings.length, item.title)" />
            </span>
            <div class="item-info">
              <span class="label-text">{{ item.title }}</span>
            </div>
          </div>
          <div class="item-right">
            <a-select v-if="item.type === 'select'" v-model="formData[item.field]" class="minimal-select" allow-search
              :placeholder="t('pleaseSelect') + ' ' + item.title" :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="opt in item.value" :key="opt.value" :value="opt.value"
                :disabled="item.field === 'language' ? isLanguageDisabled(opt.value) : false">{{ opt.name }}</a-option>
            </a-select>
            <a-input-number v-else-if="item.type === 'number'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" mode="button" />
            <a-input v-else-if="item.type === 'text'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" allow-clear />
            <a-textarea v-else-if="item.type === 'textarea'" v-model="formData[item.field]"
              :placeholder="t('pleaseEnter') + ' ' + item.title" allow-clear
              :auto-size="{ minRows: 3, maxRows: 6 }" />
            <div v-else-if="item.type === 'url'" class="url-upload-field">
              <input type="file" multiple accept="image/*"
                @change="(event) => handleUrlFieldFileChange(item, event)">
              <div class="url-upload-meta">
                <span class="url-upload-count">已选择 {{ getUrlFieldFileCount(item.field) }} 个文件</span>
                <a-button type="text" size="mini" @click="clearUrlFieldFiles(item.field)">清空</a-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 套图数量 -->
        <div class="form-card-item">
          <div class="item-left">
            <span class="item-icon icon-fixed-1">
              <icon-image />
            </span>
            <div class="item-info">
              <div class="label-with-help">
                <span class="label-text">套图组数</span>
                <a-tooltip trigger="hover" position="top"
                  content="套图组数：指每行多维表格数据生成的套图数量。选择2组则生成2套图及对应2列，选择3组则生成3套图及对应3列，以此类推。">
                  <span class="label-help-icon">
                    <icon-question-circle />
                  </span>
                </a-tooltip>
              </div>
            </div>
          </div>
          <div class="item-right">
            <a-select v-model="formData.tmpTotal" class="minimal-select" :placeholder="t('pleaseSelect')"
              :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="n in 20" :key="n" :value="String(n)">每组 {{ n }} 套图</a-option>
            </a-select>
          </div>
        </div>

        <!-- 单套张数 -->
        <div class="form-card-item">
          <div class="item-left">
            <span class="item-icon icon-fixed-0">
              <icon-expand />
            </span>
            <div class="item-info">
              <div class="label-with-help">
                <span class="label-text">单套张数</span>
                <a-tooltip trigger="hover" position="top"
                  content="单套张数：指每组套图内含的图片张数。若套图组数设为3、单套张数设为5，则每行数据共生成15张图（3组×5张），并以3列形式分别展示每组套图。">
                  <span class="label-help-icon">
                    <icon-question-circle />
                  </span>
                </a-tooltip>
              </div>
            </div>
          </div>
          <div class="item-right">
            <a-select v-model="formData.total" class="minimal-select" :placeholder="t('pleaseSelect')"
              :trigger-props="{ autoFitPopupMinWidth: true }">
              <a-option v-for="n in 20" :key="n" :value="String(n)">单套 {{ n }} 张图</a-option>
            </a-select>
          </div>
        </div>

        <!-- 选项记忆 -->
        <div class="form-card-item">
          <div class="item-left">
            <span class="item-icon icon-fixed-2">
              <icon-history />
            </span>
            <div class="item-info">
              <span class="label-text">选项记忆</span>
            </div>
          </div>
          <div class="item-right">
            <div class="custom-segmented-control">
              <div class="segmented-slider" :class="memoryMode"></div>
              <div class="segmented-item" :class="{ active: memoryMode === 'remember' }"
                @click="memoryMode = 'remember'">
                记住选择</div>
              <div class="segmented-item" :class="{ active: memoryMode === 'once' }" @click="memoryMode = 'once'">仅本次
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 任务运行状态指示器 -->
    <div class="task-status-indicator" v-if="runningTaskCount > 0 && !isTaskStatusHidden" ref="indicatorRef"
      :style="indicatorStyle" @mousedown="handleDragStart" @touchstart="handleDragStart">
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

          <a-button class="btn-submit" :class="{ 'is-loading': submitting || runningTaskCount > 0 }"
            :disabled="submitting || runningTaskCount > 0" type="primary" shape="round" @click="handleSubmit">
            <div class="btn-content-inline">
              <icon-loading spin v-if="submitting || runningTaskCount > 0" />
              <icon-thunderbolt v-else />
              <span class="btn-text">{{ runningTaskCount > 0 ? '运行中...' : t('submit') }}</span>
              <span v-if="recordIdList.length > 0 && estimatedPoints > 0 && runningTaskCount === 0"
                class="points-info-inline">
                {{ t('consumePoints', { points: estimatedPoints }) }}
              </span>
            </div>
          </a-button>
        </div>
        <div class="footer-tip">{{ t('complianceTip') }}</div>
      </div>
    </div>

    <!-- 联系客服悬浮图标（旧设计，暂时注释保留） -->
    <!-- <div v-if="!isKefuIconRemoved" class="kefu-float-icon" @click="handleKefuClick">
      <icon-customer-service />
    </div> -->

    <!-- 自定义联系客服弹窗 -->
    <transition name="modal-fade">
      <div v-if="showKefuModal" class="custom-modal-overlay" @click.self="showKefuModal = false">
        <div class="custom-modal-container">
          <div class="kefu-modal-content">
            <div class="kefu-header">
              <div class="kefu-title">联系客服</div>
              <div class="kefu-subtitle">7 * 24小时在线服务</div>
              <icon-close class="kefu-close-icon" @click="showKefuModal = false" />
            </div>
            <div class="kefu-body">
              <div class="qr-code-container">
                <img src="https://ai-banana-1251050854.cos.ap-guangzhou.myqcloud.com/feishu/kefu/kefu.png" alt="客服二维码"
                  class="qr-code-img" />
                <div class="scanning-line"></div>
              </div>
              <div class="kefu-tip">扫描二维码，添加专属客服</div>
              <div class="wechat-btn">
                <svg viewBox="0 0 1024 1024" width="16" height="16" class="wechat-icon">
                  <path
                    d="M666.2 438.4c-11.2 0-22.1 1.1-32.6 3.1 1.1-6.1 1.7-12.3 1.7-18.7 0-101.3-116.4-183.4-260-183.4-143.6 0-260 82.1-260 183.4 0 96.3 105.3 175.1 238.8 182.5l-3.8 1.1c-10.1 2.8-19.1 8.8-25.6 17.1l-43.4 55.4c-4.1 5.3-2.1 13 4.4 15.5 2.1 0.8 4.4 0.9 6.6 0.2l76.1-22.9c13.1-3.9 27-4.1 40.2-0.5 21.1 5.7 43.5 8.8 66.7 8.8 11.2 0 22.1-0.7 32.6-2.1-1.1 6.1-1.7 12.3-1.7 18.7 0 84.4 97 152.8 216.7 152.8 119.7 0 216.7-68.4 216.7-152.8 0-84.4-97-152.8-216.7-152.8z m-291.5-51.4c-12.8 0-23.1-10.3-23.1-23.1s10.3-23.1 23.1-23.1 23.1 10.3 23.1 23.1-10.3 23.1-23.1 23.1z m120.3 0c-12.8 0-23.1-10.3-23.1-23.1s10.3-23.1 23.1-23.1 23.1 10.3 23.1 23.1-10.3 23.1-23.1 23.1z m240.6 231.4c-10.6 0-19.3-8.6-19.3-19.3s8.6-19.3 19.3-19.3 19.3 8.6 19.3 19.3-8.6 19.3-19.3 19.3z m100.5 0c-10.6 0-19.3-8.6-19.3-19.3s8.6-19.3 19.3-19.3 19.3 8.6 19.3 19.3-8.6 19.3-19.3 19.3z"
                    fill="#07C160"></path>
                </svg>
                <span>微信扫一扫添加</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 系统设置弹窗组件 -->
    <SettingsModal v-model="showSettingsModal" :is-banner-hidden="isBannerHidden"
      :is-task-status-hidden="isTaskStatusHidden" :is-kefu-icon-removed="isKefuIconRemoved"
      @toggle-banner="toggleBanner" @toggle-task-status="toggleTaskStatus" @toggle-kefu-icon="toggleKefuIcon"
      @handle-web-url-click="handleWebUrlClick" @handle-help-click="handleHelpClick" @show-logs="showLogModal = true" />

    <!-- 运行日志弹窗组件 -->
    <LogModal v-model="showLogModal" :logs="logs" @clear-logs="clearLogs" @delete-log="handleDeleteLog" />
  </div>
</template>

<script>
import { bitable, FieldType } from '@lark-base-open/js-sdk';
const ui = bitable.ui;
import { GetPlugSelectField, GetPlugAd } from '@api/api/common.js';
// import jsonData from './data.json';
import zh from './locales/zh.json';
import en from './locales/en.json';
import jp from './locales/jp.json';
import './style.css';
import { uploadFilesToCOS } from '@/utils/cosUpload';
import useAppStore from '@/stores/app';
import { mapState } from 'pinia';
import SettingsModal from './com/SettingsModal.vue';
import LogModal from './com/LogModal.vue';
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
  IconExpand,
  IconCheckCircleFill,
  IconInfoCircleFill,
  IconPlayCircle,
  IconPlus,
  IconLoading,
  IconCopy,
  IconCustomerService,
  IconMessage,
  IconHistory,
  IconSettings,
  IconList,
  IconDelete,
  IconEmpty
} from '@arco-design/web-vue/es/icon';
import { AddTask, GetTaskStatus } from "@api/api/index";
export default {
  name: 'Home',
  components: {
    SettingsModal,
    LogModal,
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
    IconExpand,
    IconPlayCircle,
    IconPlus,
    IconLoading,
    IconCopy,
    IconCustomerService,
    IconMessage,
    IconHistory,
    IconSettings,
    IconList,
    IconDelete,
    IconEmpty
  },
  data() {
    return {
      showKefuModal: false,
      showSettingsModal: false,
      showLogModal: false,
      logs: [], // 中文注释：日志数据改为异步加载
      memoryMode: 'once', // 'once' or 'remember'
      isKefuIconRemoved: localStorage.getItem('FEIYU_PLUG_IS_KEFU_ICON_REMOVED') === 'true',
      isTaskStatusHidden: localStorage.getItem('FEIYU_PLUG_IS_TASK_STATUS_HIDDEN') === 'true',
      isBannerHidden: localStorage.getItem('FEIYU_PLUG_IS_BANNER_HIDDEN') === 'true',
      storedPreferences: null,
      configList: {
        model: null,
        fixedSetting: [],
        setting: {}
      },
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
        total: '',
        title: '',
        desc: '',
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
    currentModelSettings() {
      if (!this.formData.aiModel || !this.configList.setting) {
        return [];
      }
      return this.configList.setting[this.formData.aiModel] || [];
    },
    visibleCurrentModelSettings() {
      return this.currentModelSettings.filter(item => !item.hidden);
    },
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
      handler(newValue, oldValue) {
        if (newValue && oldValue && newValue !== oldValue) {
          const oldModelSettings = this.getModelSettingsByValue(oldValue);
          oldModelSettings.forEach(item => {
            if (item?.field) {
              delete this.formData[item.field];
            }
          });

          const newModelSettings = this.getModelSettingsByValue(newValue);
          newModelSettings.forEach(item => {
            if (!item?.field || item.hidden) return;
            this.formData[item.field] = this.getDefaultValueByFieldConfig(item);
          });

          const languageConfig = this.configList.fixedSetting.find(item => item.field === 'language');
          if (languageConfig && this.isLanguageDisabled(this.formData.language)) {
            this.formData.language = languageConfig.default;
          }
        }
        this.calculatePoints();
      },
      deep: true
    },
    recordIdList: {
      handler() {
        this.calculatePoints();
      },
      deep: true
    },
    'formData.tmpTotal': {
      handler() {
        this.calculatePoints();
      }
    },
    'formData.total': {
      handler() {
        this.calculatePoints();
      }
    }
  },
  async mounted() {
    this.indicatorTop = window.innerHeight - 150;
    this.getPlugAd();
    this.getPlugSelectField();
    this.pollTaskStatus(); // 加载时检查挂起的任务

    // 中文注释：初始化时从飞书存储加载运行日志
    try {
      const storedLogs = await bitable.bridge.getData('FEIYU_PLUG_RUN_LOGS');
      if (Array.isArray(storedLogs)) {
        this.logs = storedLogs;
      }
    } catch (e) {
      console.error('Load logs error:', e);
    }
  },
  // 新增：组件卸载前清理资源，防止内存泄露
  beforeUnmount() {
    // 标记组件已卸载
    this._isUnmounted = true;

    // 清理轮询定时器
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
      this.pollingTimer = null;
    }

    // 强制移除可能的全局监听器（防止拖拽时突然卸载组件导致的泄露）
    window.removeEventListener('mousemove', this.handleDragMove);
    window.removeEventListener('mouseup', this.handleDragEnd);
    window.removeEventListener('touchmove', this.handleDragMove);
    window.removeEventListener('touchend', this.handleDragEnd);
  },
  methods: {
    handleHelpClick() {
      window.open('https://hey-fish.feishu.cn/docx/X6AadbCE9oDXoyxAgP6cs24on5a?from=from_copylink', '_blank');
    },
    handleWebUrlClick() {
      if (this.webUrl) {
        window.open(this.webUrl, '_blank');
      }
    },
    handleKefuClick() {
      this.showKefuModal = true;
    },
    toggleKefuIcon(val) {
      this.isKefuIconRemoved = !val;
      localStorage.setItem('FEIYU_PLUG_IS_KEFU_ICON_REMOVED', this.isKefuIconRemoved);
    },
    toggleTaskStatus(val) {
      this.isTaskStatusHidden = !val;
      localStorage.setItem('FEIYU_PLUG_IS_TASK_STATUS_HIDDEN', this.isTaskStatusHidden);
    },
    toggleBanner(val) {
      this.isBannerHidden = !val;
      localStorage.setItem('FEIYU_PLUG_IS_BANNER_HIDDEN', this.isBannerHidden);
    },
    mapFieldInputType(inputType) {
      const type = String(inputType || '').toLowerCase();
      if (type === 'select' || type === 'radio') return 'select';
      if (type === 'number') return 'number';
      if (type === 'textarea') return 'textarea';
      if (type === 'url') return 'url';
      return 'text';
    },
    normalizeSelectOptions(options = []) {
      if (!Array.isArray(options)) return [];
      return options.map(option => ({
        value: option?.value ?? '',
        name: option?.label ?? option?.name ?? option?.value ?? ''
      }));
    },
    normalizeFieldConfig(fieldConfig = {}) {
      const fieldInput = String(fieldConfig.field_input || fieldConfig.type || '').toLowerCase();
      const type = this.mapFieldInputType(fieldInput);
      const field = fieldConfig.field_key || fieldConfig.field || '';
      const isImagesField = fieldInput === 'url' && field === 'images';
      const rawLimit = Number(fieldConfig.field_limit ?? 0);
      const fieldLimit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 0;
      const isRequired = Number(fieldConfig.is_required ?? 0) > 0;
      return {
        title: fieldConfig.field_label || fieldConfig.title || field,
        field,
        type,
        fieldInput: fieldInput || type,
        fieldType: fieldConfig.field_type || '',
        default: fieldConfig.default_value ?? fieldConfig.default ?? '',
        value: this.normalizeSelectOptions(fieldConfig.field_option || fieldConfig.value || []),
        fieldLimit,
        isRequired,
        hidden: isImagesField
      };
    },
    normalizeConfigData(rawData = {}) {
      if (Array.isArray(rawData.model)) {
        const modelList = rawData.model || [];
        const modelOptions = modelList.map(model => ({
          value: model?.value ?? '',
          label: model?.label ?? model?.name ?? model?.value ?? '',
          name: model?.label ?? model?.name ?? model?.value ?? '',
          points: Number(model?.points ?? 0),
          plan: model?.plan,
          is_active: model?.is_active || '',
          excludeLanguage: Array.isArray(model?.excludeLanguage) ? model.excludeLanguage : []
        }));
        const modelDefault = modelOptions[0]?.value || '';
        const settingMap = {};
        modelList.forEach(model => {
          const modelValue = model?.value ?? '';
          settingMap[modelValue] = Array.isArray(model?.setting)
            ? model.setting.map(settingItem => this.normalizeFieldConfig(settingItem))
            : [];
        });
        return {
          model: {
            title: '使用模型',
            field: 'aiModel',
            type: 'select',
            default: modelDefault,
            value: modelOptions
          },
          fixedSetting: Array.isArray(rawData.fixedSetting) ? rawData.fixedSetting.map(item => this.normalizeFieldConfig(item)) : [],
          setting: settingMap
        };
      }

      const oldModel = rawData.model || {};
      const oldSetting = rawData.setting || {};
      const modelOptions = Array.isArray(oldModel.value)
        ? oldModel.value.map(item => ({
          value: item?.value ?? '',
          label: item?.name ?? item?.label ?? item?.value ?? '',
          name: item?.name ?? item?.label ?? item?.value ?? '',
          points: Number(item?.points ?? 0),
          plan: item?.plan,
          is_active: item?.is_active || '',
          excludeLanguage: Array.isArray(item?.excludeLanguage) ? item.excludeLanguage : []
        }))
        : [];
      const settingMap = {};
      Object.keys(oldSetting).forEach(modelValue => {
        const fields = Array.isArray(oldSetting[modelValue]) ? oldSetting[modelValue] : [];
        settingMap[modelValue] = fields.map(item => this.normalizeFieldConfig({
          field_label: item?.title,
          field_input: item?.type,
          field_key: item?.field,
          field_option: item?.value,
          default_value: item?.default
        }));
      });
      const fixedSetting = Array.isArray(rawData.fixedSetting)
        ? rawData.fixedSetting.map(item => this.normalizeFieldConfig({
          field_label: item?.title,
          field_input: item?.type,
          field_key: item?.field,
          field_option: item?.value,
          default_value: item?.default
        }))
        : [];

      return {
        model: {
          title: oldModel.title || '使用模型',
          field: 'aiModel',
          type: 'select',
          default: oldModel.default || modelOptions[0]?.value || '',
          value: modelOptions
        },
        fixedSetting,
        setting: settingMap
      };
    },
    getModelSettingsByValue(modelValue) {
      if (!modelValue || !this.configList?.setting) return [];
      return this.configList.setting[modelValue] || [];
    },
    getDefaultValueByFieldConfig(fieldConfig) {
      if (fieldConfig.type === 'number') {
        const num = Number(fieldConfig.default);
        return Number.isFinite(num) ? num : '';
      }
      if (fieldConfig.type === 'url') {
        return [];
      }
      return fieldConfig.default ?? '';
    },
    getFieldLimit(fieldConfig) {
      const limit = Number(fieldConfig?.fieldLimit ?? 0);
      return Number.isFinite(limit) && limit > 0 ? limit : 0;
    },
    handleUrlFieldFileChange(item, event) {
      const allFiles = Array.from(event?.target?.files || []);
      const limit = this.getFieldLimit(item);
      let finalFiles = allFiles;
      if (limit > 0 && allFiles.length > limit) {
        finalFiles = allFiles.slice(0, limit);
        ui.showToast({ toastType: 'warning', message: `${item.title} 最多上传 ${limit} 个文件，已自动截断。` });
      }
      this.formData[item.field] = finalFiles;
      if (event?.target) {
        event.target.value = '';
      }
    },
    getUrlFieldFileCount(fieldKey) {
      const files = this.formData[fieldKey];
      return Array.isArray(files) ? files.length : 0;
    },
    clearUrlFieldFiles(fieldKey) {
      this.formData[fieldKey] = [];
    },
    normalizeInputValueByField(fieldConfig, inputValue) {
      if (fieldConfig.type === 'number') {
        if (inputValue === '' || inputValue === null || inputValue === undefined) {
          return '';
        }
        const num = Number(inputValue);
        return Number.isFinite(num) ? num : '';
      }
      return inputValue;
    },
    isFieldValueEmpty(fieldConfig, value) {
      if (fieldConfig.type === 'url') {
        return !Array.isArray(value) || value.length === 0;
      }
      if (fieldConfig.type === 'number') {
        return value === '' || value === null || value === undefined || Number.isNaN(Number(value));
      }
      return value === '' || value === null || value === undefined;
    },
    getImgSrc(value) {
      if (!value) return new URL('./img/logo.svg', import.meta.url).href;
      const lowerValue = String(value).toLowerCase();
      if (lowerValue.includes('gpt')) {
        return new URL('./img/chat-gpt.svg', import.meta.url).href;
      } else if (lowerValue.includes('banana')) {
        return new URL('./img/nano-banana.svg', import.meta.url).href;
      } else if (lowerValue.includes('grok')) {
        return new URL('./img/grok.svg', import.meta.url).href;
      } else if (lowerValue.includes('veo')) {
        return new URL('./img/gemini.svg', import.meta.url).href;
      } else if (lowerValue.includes('wan')) {
        return new URL('./img/万相.svg', import.meta.url).href;
      } else if (lowerValue.includes('gemini')) {
        return new URL('./img/gemini.svg', import.meta.url).href;
      } else if (lowerValue.includes('doubao')) {
        return new URL('./img/doubao.svg', import.meta.url).href;
      } else if (lowerValue.includes('seedream')) {
        return new URL('./img/doubao.svg', import.meta.url).href;
      } else if (lowerValue.includes('kling')) {
        return new URL('./img/kling.svg', import.meta.url).href;
      } else {
        return new URL('./img/logo.svg', import.meta.url).href;
      }
    },
    isLanguageDisabled(languageCode) {
      if (!this.formData.aiModel || !this.configList.model || !this.configList.model.value) {
        return false;
      }
      const modelData = this.configList.model.value.find(m => m.value === this.formData.aiModel);
      if (modelData && modelData.excludeLanguage) {
        return modelData.excludeLanguage.includes(languageCode);
      }
      return false;
    },
    async getPlugAd() {
      this.bannerLoading = true;
      try {
        const res = await GetPlugAd();
        // 中文注释：如果组件已卸载，不再更新状态，防止内存泄露
        if (this._isUnmounted) return;
        if (res.code === 200) {
          this.bannerList = res.data || [];
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error);
      } finally {
        if (!this._isUnmounted) {
          this.bannerLoading = false;
        }
      }
    },
    async calculatePoints() {
      if (this.recordIdList.length === 0) {
        this.estimatedPoints = 0;
        return;
      }

      const modelValue = this.formData.aiModel;
      if (!modelValue || !this.configList.model || !this.configList.model.value) {
        this.estimatedPoints = 0;
        return;
      }

      const modelData = this.configList.model.value.find(m => m.value === modelValue);
      if (!modelData) {
        this.estimatedPoints = 0;
        return;
      }

      const unitPrice = modelData.points;

      // 中文注释：使用“单套张数”和“每组套数”来计算总消耗积分
      const totalImagesPerRecord = Number(this.formData.total || 5) * Number(this.formData.tmpTotal || 1);
      const totalNum = this.recordIdList.length * totalImagesPerRecord;

      this.estimatedPoints = totalNum * unitPrice;
    },
    handleBannerClick(url) {
      if (url) {
        window.open(url, '_blank');
      }
    },
    async getPlugSelectField() {
      this.loading = true;
      try {
        // 加载记忆设置 (使用 localStorage)
        const savedMode = localStorage.getItem('FEIYU_PLUG_MEMORY_MODE');
        const savedPrefsStr = localStorage.getItem('FEIYU_PLUG_PREFERENCES');

        this.memoryMode = 'once'; // 默认值
        if (savedMode === 'remember' && savedPrefsStr) {
          try {
            this.storedPreferences = JSON.parse(savedPrefsStr);
            this.memoryMode = 'remember';
          } catch (e) {
            console.error('Parse memory settings error:', e);
          }
        }

        const res = await GetPlugSelectField();
        // 中文注释：防止在请求返回前组件已卸载导致的内存操作风险
        if (this._isUnmounted) return;
        if (res.code === 200) {
          this.configList = this.normalizeConfigData(res.data || {});
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
        if (!this._isUnmounted) {
          this.loading = false;
        }
      }
    },
    async onSubmit() {
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
    getIcon(index, title) {
      if (['尺寸比例', '尺寸', '比例'].includes(title)) {
        return 'IconFullscreen';
      }
      if (['设计风格', '设计', '风格'].includes(title)) {
        return 'IconBulb';
      }
      if (['场景偏好', '场景', '偏好'].includes(title)) {
        return 'IconCommon';
      }
      if (['选项记忆', '记忆'].includes(title)) {
        return 'IconHistory';
      }
      const icons = ['IconGift', 'IconPalette', 'IconDesktop', 'IconSend', 'IconHeart', 'IconLayers'];
      return icons[index % icons.length];
    },
    // 初始化表单数据
    initForm() {
      const data = {};
      const isRemember = this.memoryMode === 'remember' && this.storedPreferences;

      let modelToUse;
      if (isRemember && this.storedPreferences.aiModel) {
        modelToUse = this.storedPreferences.aiModel;
      } else {
        modelToUse = this.formData.aiModel || this.configList?.model?.default;
      }
      const modelExists = this.configList?.model?.value?.some(item => item.value === modelToUse);
      if (!modelExists) {
        modelToUse = this.configList?.model?.value?.[0]?.value || '';
      }
      data.aiModel = modelToUse;

      if (this.configList.fixedSetting) {
        this.configList.fixedSetting.forEach(item => {
          if (!item?.field || item.hidden) return;
          if (isRemember && this.storedPreferences[item.field] !== undefined && item.type !== 'url') {
            data[item.field] = this.normalizeInputValueByField(item, this.storedPreferences[item.field]);
          } else {
            data[item.field] = this.getDefaultValueByFieldConfig(item);
          }
        });
      }

      if (isRemember && this.storedPreferences.tmpTotal !== undefined) {
        data.tmpTotal = this.storedPreferences.tmpTotal;
      } else {
        data.tmpTotal = '1';
      }
      if (isRemember && this.storedPreferences.total !== undefined) {
        data.total = this.storedPreferences.total;
      } else {
        data.total = '5';
      }

      const modelSettings = this.getModelSettingsByValue(modelToUse);
      modelSettings.forEach(item => {
        if (!item?.field || item.hidden) return;
        if (isRemember && this.storedPreferences[item.field] !== undefined && item.type !== 'url') {
          data[item.field] = this.normalizeInputValueByField(item, this.storedPreferences[item.field]);
        } else {
          data[item.field] = this.getDefaultValueByFieldConfig(item);
        }
      });

      const languageConfig = this.configList.fixedSetting.find(item => item.field === 'language');
      if (languageConfig && this.isLanguageDisabled(data.language)) {
        data.language = languageConfig.default;
      }
      this.formData = { ...data };
    },
    getMemorySafeFormData() {
      const safeData = {};
      Object.keys(this.formData || {}).forEach(key => {
        const value = this.formData[key];
        if (value instanceof File) {
          return;
        }
        if (Array.isArray(value) && value.some(item => item instanceof File)) {
          return;
        }
        safeData[key] = value;
      });
      return safeData;
    },
    validateRequiredFieldsBeforeSubmit(modelSettings = []) {
      for (const item of this.configList.fixedSetting || []) {
        if (!item?.isRequired || !item?.field || item.hidden) continue;
        const value = this.formData[item.field];
        if (this.isFieldValueEmpty(item, value)) {
          ui.showToast({ toastType: 'error', message: `${item.title} 为必填项` });
          return false;
        }
      }

      for (const item of modelSettings || []) {
        if (!item?.isRequired || !item?.field || item.hidden) continue;
        if (item.fieldInput === 'url' && item.field === 'images') continue;
        const value = this.formData[item.field];
        if (this.isFieldValueEmpty(item, value)) {
          ui.showToast({ toastType: 'error', message: `${item.title} 为必填项` });
          return false;
        }
      }
      return true;
    },
    buildFixedSettingPayload() {
      const payload = {};
      for (const item of this.configList.fixedSetting || []) {
        if (!item?.field || item.hidden) continue;
        let value = this.formData[item.field];
        if (this.isFieldValueEmpty(item, value)) {
          value = this.getDefaultValueByFieldConfig(item);
        }
        payload[item.field] = this.normalizeInputValueByField(item, value);
      }
      return payload;
    },
    async buildModelSettingPayload(modelSettings = [], rowId, imgField, presetImageUrls = []) {
      const payload = {};
      for (const item of modelSettings) {
        if (!item?.field) continue;

        if (item.fieldInput === 'url' && item.field === 'images') {
          const feishuUrls = Array.isArray(presetImageUrls) && presetImageUrls.length > 0
            ? presetImageUrls
            : (imgField ? await imgField.getAttachmentUrls(rowId) : []);
          const limit = this.getFieldLimit(item);
          const slicedUrls = limit > 0 ? feishuUrls.slice(0, limit) : feishuUrls;
          console.log('[FEIYU_UPLOAD_DEBUG] 原始飞书链接', feishuUrls);
          console.log('[FEIYU_UPLOAD_DEBUG] 截断后飞书链接', slicedUrls);
          const { files, failedUrls } = await this.urlsToFiles(slicedUrls);
          if (failedUrls.length > 0) {
            await this.addLog('飞书链接转文件部分失败', {
              rowId,
              failCount: failedUrls.length,
              failedUrls
            });
          }
          if (slicedUrls.length > 0 && files.length === 0) {
            throw new Error(`飞书图片下载失败：本行 ${slicedUrls.length} 张均未转换成功（可能是飞书链接跨域策略限制）`);
          }
          payload[item.field] = files.length > 0 ? await uploadFilesToCOS(files) : [];
          console.log('[FEIYU_UPLOAD_DEBUG] COS上传结果链接', payload[item.field]);
          continue;
        }

        if (item.fieldInput === 'url') {
          const rawFiles = Array.isArray(this.formData[item.field]) ? this.formData[item.field] : [];
          const limit = this.getFieldLimit(item);
          const uploadFiles = limit > 0 ? rawFiles.slice(0, limit) : rawFiles;
          payload[item.field] = uploadFiles.length > 0 ? await uploadFilesToCOS(uploadFiles) : [];
          continue;
        }

        let value = this.formData[item.field];
        if (this.isFieldValueEmpty(item, value)) {
          value = this.getDefaultValueByFieldConfig(item);
        }
        payload[item.field] = this.normalizeInputValueByField(item, value);
      }
      return payload;
    },
    async urlsToFiles(urls = []) {
      const files = [];
      const failedUrls = [];
      for (const url of urls) {
        const file = await this.urlToFile(url);
        if (file) {
          files.push(file);
        } else {
          failedUrls.push(url);
        }
      }
      return { files, failedUrls };
    },
    async handleSubmit() {
      if (!this.validateApiKey()) return;
      if (this.memoryMode === 'remember') {
        try {
          localStorage.setItem('FEIYU_PLUG_MEMORY_MODE', 'remember');
          localStorage.setItem('FEIYU_PLUG_PREFERENCES', JSON.stringify(this.getMemorySafeFormData()));
        } catch (err) {
          console.error('Save memory settings error:', err);
        }
      }
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
      if (!this.formData.aiModel) {
        ui.showToast({ toastType: 'error', message: '请选择模型' });
        return;
      }

      const modelSettings = this.getModelSettingsByValue(this.formData.aiModel);
      if (!this.validateRequiredFieldsBeforeSubmit(modelSettings)) {
        return;
      }
      const imagesSetting = modelSettings.find(item => item.fieldInput === 'url' && item.field === 'images');

      this.submitting = true;
      try {
        const table = await bitable.base.getTable(this.edit.tableId);
        const statusField = await table.getField('任务运行状态'); // 预取字段以确保存在
        const imgField = await table.getField('参考图');
        const titleField = await table.getField('商品标题');
        const descField = await table.getField('产品描述');
        const progressField = await table.getField('任务进度');

        let successCount = 0;
        let failureCount = 0;

        // 套图结果x 和 套图链接x
        // 中文注释：根据用户选择的套图组数，预先检测并按顺序创建必要的“套图结果”和“套图链接”字段
        const maxSets = Number(this.formData.tmpTotal || 1);
        const fieldMetaList = await table.getFieldMetaList() || [];
        const existingFieldNames = fieldMetaList.map(f => f.name);

        for (let s = 1; s <= maxSets; s++) {
          const resFieldTitle = `套图结果${s}`;
          const urlFieldTitle = `套图链接${s}`;

          // 检测并创建附件字段
          if (!existingFieldNames.includes(resFieldTitle)) {
            console.log(`Creating missing field: ${resFieldTitle}`);
            await table.addField({ type: FieldType.Attachment, name: resFieldTitle });
          }

          // 检测并创建文本链接字段
          if (!existingFieldNames.includes(urlFieldTitle)) {
            await table.addField({ type: FieldType.Text, name: urlFieldTitle });
          }
        }

        // 任务运行时，this.recordIdList 我需要批量将“生成结果”字段附件 内容先清空。 - 先注释
        // await Promise.all(this.recordIdList.map(rId => resultField.setValue(rId, []).catch(e => console.error('Clear field error', e))));

        for (let i = 0; i < this.recordIdList.length; i++) {
          if (this._isUnmounted) return;
          const rowId = this.recordIdList[i];
          this.edit.rowId = rowId;

          const imgValueField = await imgField.getValue(rowId);
          if (!imgValueField || imgValueField.length <= 0) {
            this.addLog('图片附件为空', `行ID: ${rowId}`);
            ui.showToast({ toastType: 'warning', message: `选择的第 ${i + 1}条,数据图片附件为空，已跳过该条。` });
            failureCount++;
            continue;
          }
          const debugFeishuUrls = imagesSetting ? (await imgField.getAttachmentUrls(rowId) || []) : [];
          console.log('[FEIYU_UPLOAD_DEBUG] 行提交摘要', {
            rowId,
            aiModel: this.formData.aiModel,
            imagesCount: debugFeishuUrls.length
          });

          this.edit.total = this.formData.total || '5';

          const titleCellValue = await titleField.getValue(rowId);
          if (!titleCellValue || (Array.isArray(titleCellValue) && titleCellValue.length === 0)) {
            this.addLog('商品标题为空', `行ID: ${rowId}`);
            ui.showToast({ toastType: 'warning', message: `选择的第 ${i + 1}条,数据商品标题为空，已跳过。` });
            failureCount++;
            continue;
          }
          this.edit.title = Array.isArray(titleCellValue)
            ? titleCellValue.filter(item => item && item.text).map(item => item.text).join('\n')
            : (titleCellValue?.text || (typeof titleCellValue === 'string' ? titleCellValue : ''));

          const descCellValue = await descField.getValue(rowId);
          if (!descCellValue || (Array.isArray(descCellValue) && descCellValue.length === 0)) {
            this.addLog('产品描述为空', `行ID: ${rowId}`);
            ui.showToast({ toastType: 'warning', message: `选择的第 ${i + 1}条, 数据产品描述为空，已跳过。` });
            failureCount++;
            continue;
          }
          this.edit.desc = Array.isArray(descCellValue)
            ? descCellValue.filter(item => item && item.text).map(item => item.text).join('\n')
            : (descCellValue?.text || (typeof descCellValue === 'string' ? descCellValue : ''));

          try {
            const settingPayload = await this.buildModelSettingPayload(modelSettings, rowId, imgField, debugFeishuUrls);
            const payload = {
              appToken: this.edit.appToken,
              tableId: this.edit.tableId,
              viewId: this.edit.viewId,
              rowId,
              tmpTotal: this.formData.tmpTotal || '1',
              total: this.formData.total || '5',
              title: this.edit.title,
              desc: this.edit.desc,
              aiModel: this.formData.aiModel,
              setting: settingPayload,
              fixedSetting: this.buildFixedSettingPayload()
            };
            const res = await AddTask(payload);

            if (res.code === 200) {
              successCount++;
              const taskList = Array.isArray(res.data) ? res.data : [res.data];

              // 存储任务ID
              let storedTaskIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
              if (!Array.isArray(storedTaskIds)) storedTaskIds = [];

              for (const taskData of taskList) {
                const taskId = taskData.task_id;
                if (taskId && !storedTaskIds.includes(taskId)) {
                  storedTaskIds.push(taskId);
                }
              }
              await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', storedTaskIds);

              // 使用第一个任务的数据更新当前行的进度和状态
              const mainTask = taskList[0] || {};
              // 任务进度
              await progressField.setValue(rowId, parseFloat(mainTask?.progress || 0));

              // 更新表格中的状态
              await statusField.setValue(rowId, mainTask.status_str);
            } else {
              this.addLog('提交任务失败(AddTask非200)', {
                rowId,
                res
              });
              ui.showToast({ toastType: 'error', message: res.msg || '任务提交失败' });
              failureCount++;
              break; // 出错时停止循环
            }
          } catch (err) {
            console.error(err);
            this.addLog('提交任务异常(AddTask异常)', {
              rowId,
              message: err?.message || String(err),
              stack: err?.stack || ''
            });
            ui.showToast({ toastType: 'error', message: '提交任务时发生错误' });
            failureCount++;
            break;
          }
        }

        ui.showToast({ toastType: 'success', message: `任务执行完成，共 ${this.recordIdList.length} 条数据，成功 ${successCount} 条，失败 ${failureCount} 条。` });
        this.addLog('任务执行完成', `共 ${this.recordIdList.length} 条数据，成功 ${successCount} 条，失败 ${failureCount} 条。`);
        this.recordIdList = []; // 清空选择

        // 强制重置暂停状态并启动轮询
        this.isPaused = false;
        const currentStoredTaskIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
        this.runningTaskCount = Array.isArray(currentStoredTaskIds) ? currentStoredTaskIds.length : 0;
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
      // 新增：防止并发执行导致的内存泄露和定时器累积
      if (this._isPolling) return;
      this._isPolling = true;

      // 在这里增加一个判断，判断是否有数据表权限，没有的话提示用户没有此多为表格的权限
      try {
        const hasPermission = await bitable.base.isEditable();
        // 新增：如果组件已卸载，直接退出
        if (this._isUnmounted) return;

        if (!hasPermission) {
          const errMsg = '您没有此表格的权限，终止任务运行。';
          ui.showToast({ toastType: 'error', message: errMsg });
          this.addLog('权限错误', errMsg);
          this.isPaused = true;
          this.pollingTimer = null;
          return;
        }
      } catch (error) {
        console.error('Check permission error:', error);
        this.addLog('检查权限失败', error.message);
        this.isPaused = true;
        this.pollingTimer = null;
        return;
      } finally {
        // 如果不是因为权限问题退出，且没有卸载，则在 try/catch 结束后重置状态
        if (!this._isUnmounted) {
          // 逻辑在后面继续，所以这里不直接 return
        } else {
          this._isPolling = false;
          return;
        }
      }

      // 避免多个轮询循环
      if (this.pollingTimer) {
        clearTimeout(this.pollingTimer);
        this.pollingTimer = null;
      }

      if (this.isPaused) {
        this._isPolling = false;
        return;
      }

      const MAX_POLLING_TASKS = 5;
      const normalizeId = id => String(id).trim();

      try {
        // 始终从 bridge 读取最新的任务ID
        let rawTaskIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
        if (this._isUnmounted) return;

        // 确保是数组
        if (!Array.isArray(rawTaskIds)) rawTaskIds = [];

        // 统一标准化任务ID（字符串化）并移除空项（null, undefined, 空字符串等）
        const allStoredTaskIds = rawTaskIds
          .map(id => (id === null || id === undefined ? '' : normalizeId(id)))
          .filter(id => id !== '');

        // 如果标准化后与原存储不一致（例如类型不一致或存在空项），立即同步更新存储
        if (JSON.stringify(allStoredTaskIds) !== JSON.stringify(rawTaskIds)) {
          await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', allStoredTaskIds);
        }

        this.runningTaskCount = allStoredTaskIds.length;

        // 如果数组为空（或过滤后为空），停止轮询并清空存储
        if (allStoredTaskIds.length === 0) {
          this._isPolling = false;
          this.pollingTimer = null;
          this.runningTaskCount = 0; // 中文注释：确保 UI 状态更新为 0
          // 如果之前不是空的，则执行清空操作
          if (rawTaskIds.length > 0) {
            await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', []);
          }
          return;
        }
        // 每次最多轮询指定数量的数据，如果总数不足，则全部轮询
        const currentStoredTaskIds = allStoredTaskIds.slice(0, MAX_POLLING_TASKS);

        // 再次确认当前待轮询的ID列表不为空
        if (!currentStoredTaskIds || currentStoredTaskIds.length === 0) {
          this._isPolling = false;
          this.pollingTimer = null;
          return;
        }
        const res = await GetTaskStatus({ taskIds: currentStoredTaskIds });
        if (this._isUnmounted) return;
        if (res && res.code === 200) {
          const taskCandidates = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
          const tasks = taskCandidates.filter(task => {
            if (!task || task.task_id === null || task.task_id === undefined) return false;
            return normalizeId(task.task_id) !== '';
          });

          // 使用新的ID副本进行过滤
          let nextRoundTaskIds = [...currentStoredTaskIds];

          for (const task of tasks) {
            // 新增：循环中检查卸载状态
            if (this._isUnmounted) return;
            const taskId = normalizeId(task.task_id);
            // 检查此任务是否仍在最新列表中
            if (!nextRoundTaskIds.includes(taskId)) continue;

            if (!task.table_id || !task.row_id) {
              this.addLog('任务数据缺失(table_id/row_id)', task);
              continue;
            }

            // 中文注释：如果任务已完成(3)或已失败(-1)，无论后续表格操作是否成功，都应将其从轮询队列中移除
            if (task.status === 3 || task.status === -1) {
              nextRoundTaskIds = nextRoundTaskIds.filter(id => id !== taskId);
            }

            try {
              let table;
              try {
                table = await bitable.base.getTable(task.table_id);
              } catch (tableErr) {
                console.error(`[Task] Table ${task.table_id} not found.`, tableErr);
                this.addLog('数据表不存在或已被删除', task);
                // 确保已从队列中移除（上面已经移除过一次，这里作为兜底）
                nextRoundTaskIds = nextRoundTaskIds.filter(id => id !== taskId);
                continue;
              }

              // 状态 3: 已完成
              if (task.status === 3) {
                // 中文注释：仅在状态为 3（已完成）时检查行是否存在，防止行被删除导致数据丢失
                let isRowExist = false;
                try {
                  const rowData = await table.getRecordById(task.row_id);
                  if (rowData) isRowExist = true;
                } catch (rowErr) {
                  console.warn(`[Task] Row ${task.row_id} not found during completion check.`, rowErr);
                }

                if (!isRowExist) {
                  this.addLog('任务完成但行已被删除', task);
                  continue;
                }

                // 图片处理块
                try {
                  if (task.images && task.images.length > 0) {
                    const tmpNum = task.tmp_id ? Number(task.tmp_id) : 1; // 套图第几个td
                    const fieldTitle = `套图结果${tmpNum}`;
                    // 1. 获取字段，特定错误处理
                    let outPutImgField;
                    try {
                      outPutImgField = await table.getField(fieldTitle);
                    } catch (fieldError) {
                      try {
                        // 打印所有字段以供调试
                        const fieldList = await table.getFieldList() || [];
                        const fieldNames = await Promise.all(fieldList.map(f => f.getName()));

                        // 创建字段
                        await table.addField({ type: FieldType.Attachment, name: fieldTitle });
                        outPutImgField = await table.getField(fieldTitle);
                      } catch (createError) {
                        console.error(`[Task] Failed to create field "${fieldTitle}":`, createError);
                        this.addLog(`创建“${fieldTitle}”字段失败`, task);
                        throw new Error(`Field "${fieldTitle}" access and creation failed`);
                      }
                    }

                    // 新功能：处理“生成结果链接”字段
                    const fieldGroupUrlTitle = `套图链接${tmpNum}`;
                    try {
                      let outPutUrlField;
                      try {
                        outPutUrlField = await table.getField(fieldGroupUrlTitle);
                      } catch (fieldError) {
                        try {
                          // 创建文本字段
                          await table.addField({ type: FieldType.Text, name: fieldGroupUrlTitle });
                          outPutUrlField = await table.getField(fieldGroupUrlTitle);
                        } catch (createError) {
                          console.error(`[Task] Failed to create field "${fieldGroupUrlTitle}":`, createError);
                          this.addLog(`创建“${fieldGroupUrlTitle}”字段失败`, task);
                        }
                      }

                      if (outPutUrlField) {
                        const newUrls = task.images.join('\n');
                        // 获取旧数据
                        const existingUrlVal = await outPutUrlField.getValue(task.row_id);
                        let finalUrlString = newUrls;

                        // 如果有旧数据，追加新数据，与附件逻辑保持一致
                        if (existingUrlVal) {
                          let existingText = '';
                          if (typeof existingUrlVal === 'string') {
                            existingText = existingUrlVal;
                          } else if (Array.isArray(existingUrlVal)) {
                            existingText = existingUrlVal.map(item => item.text || '').join('');
                          }

                          // 中文注释：如果旧数据中包含中文（通常是之前的错误提示文案），则将其清空，避免干扰新数据的展示
                          const hasChinese = /[\u4e00-\u9fa5]/.test(existingText);
                          if (hasChinese) {
                            existingText = '';
                          }

                          if (existingText) {
                            finalUrlString = existingText + '\n' + newUrls;
                          }
                        }

                        await outPutUrlField.setValue(task.row_id, finalUrlString);
                      }
                    } catch (urlFieldErr) {
                      console.error(`[Task] Error processing "${fieldGroupUrlTitle}" field:`, urlFieldErr);
                      this.addLog(`处理“${fieldGroupUrlTitle}”失败`, task);
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
                          this.addLog('图片转换返回空', task);
                        }
                      } catch (err) {
                        console.error('[Task] Error processing image url:', imgUrl, err);
                        this.addLog('处理图片URL失败', task);
                      }
                    }

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
                          this.addLog('解析附件数据失败', task);
                        }

                        const finalAttachments = [...oldList, ...newList];

                        // 4. 回填合并后的数据
                        await outPutImgField.setValue(task.row_id, finalAttachments);
                      }
                    }
                  }
                  // 中文注释：任务执行成功，记录完整数据日志
                  this.addLog('任务执行成功', task);
                } catch (err) {
                  console.error('[Task] Image upload logic error (continuing to cleanup):', err);
                  this.addLog('图片上传逻辑错误', task);
                }
              }
              // 状态 -1: 失败
              else if (task.status === -1) {
                const tmpNum = task.tmp_id ? Number(task.tmp_id) : 1; // 先读区套图链接 x
                // 新功能：处理“生成结果链接”字段
                const fieldGroupUrlTitle = `套图链接${tmpNum}`;
                let outPutUrlField;
                try {
                  outPutUrlField = await table.getField(fieldGroupUrlTitle);
                } catch (fieldError) {
                  try {
                    // 如果没有 就 创建文本字段
                    await table.addField({ type: FieldType.Text, name: fieldGroupUrlTitle });
                    outPutUrlField = await table.getField(fieldGroupUrlTitle);
                  } catch (createError) {
                    console.error(`[Task] Failed to create field "${fieldGroupUrlTitle}":`, createError);
                    this.addLog(`创建“${fieldGroupUrlTitle}”字段失败`, task);
                  }
                }
                // 将失败字段文字写入字段
                await outPutUrlField.setValue(task.row_id, task.status_str);
                this.addLog('任务执行失败', task);
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
              this.addLog('更新任务状态失败', task);
            }
          }

          // 重要：在保存之前重新读取存储，以避免覆盖等待期间添加的新任务
          let latestStoredIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
          if (this._isUnmounted) return;
          if (!Array.isArray(latestStoredIds)) latestStoredIds = [];
          latestStoredIds = latestStoredIds
            .map(id => (id === null || id === undefined ? '' : normalizeId(id)))
            .filter(id => id !== '');

          // 计算应保留哪些 ID：
          // (存储中的最新 ID) 减去 (我们在本次循环中完成/失败的 ID)
          // 我们不能只使用 nextRoundTaskIds，因为它不包含新添加的 ID。

          // 识别本次轮询周期中移除的 ID
          const removedIds = currentStoredTaskIds.filter(id => !nextRoundTaskIds.includes(id));

          // 从最新存储中过滤掉它们
          const finalTaskIds = latestStoredIds.filter(id => !removedIds.includes(id));

          // 更新存储
          try {
            await bitable.bridge.setData('FEIYU_PLUG_TASK_ID', finalTaskIds);
            this.runningTaskCount = finalTaskIds.length;
          } catch (storageErr) {
            console.error('[Task] Failed to sync storage to bridge:', storageErr);
            this.addLog('同步存储失败', storageErr.message);
            // 即使存储同步失败，也尝试更新本地计数以反映 UI
            this.runningTaskCount = finalTaskIds.length;
          }

          // 如果任务仍存在，继续轮询
          if (finalTaskIds.length > 0 && !this.isPaused && !this._isUnmounted) {
            this.pollingTimer = setTimeout(() => {
              this.pollTaskStatus();
            }, 5000);
          } else {
            // 中文注释：任务处理完毕，停止定时器
            this.pollingTimer = null;
          }

        } else {
          // API 错误，更新本地状态并停止轮询
          const errMsg = res?.msg || 'API 接口异常';
          this.addLog('轮询状态接口错误', errMsg);
          this.pollingTimer = null;
          this.isPaused = true;

          // 中文注释：即使接口报错，也需要更新当前的运行任务计数
          const latestIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
          this.runningTaskCount = Array.isArray(latestIds) ? latestIds.length : 0;
        }
      } catch (e) {
        // 发生错误，停止轮询
        console.error('Poll status fatal error:', e);
        this.addLog('轮询过程致命错误', e.message);
        this.pollingTimer = null;
        this.isPaused = true;

        // 中文注释：发生致命错误时，重新同步一次计数，确保 UI 状态正确
        try {
          const latestIds = await bitable.bridge.getData('FEIYU_PLUG_TASK_ID');
          this.runningTaskCount = Array.isArray(latestIds) ? latestIds.length : 0;
        } catch (err) {
          this.runningTaskCount = 0;
        }
      } finally {
        this._isPolling = false;
      }
    },

    async downloadFeishuFile(url, credentialsMode = 'omit') {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: credentialsMode
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return response.blob();
    },
    async urlToFile(url) {
      try {
        let blob;
        try {
          // 中文注释：优先使用 omit，适配 Access-Control-Allow-Origin: * 的飞书下载链接
          blob = await this.downloadFeishuFile(url, 'omit');
        } catch (omitErr) {
          // 中文注释：兜底重试 include，兼容必须携带凭证的场景
          blob = await this.downloadFeishuFile(url, 'include');
          console.warn('[FEIYU_UPLOAD_DEBUG] 飞书下载 omit 失败后 include 重试成功', {
            url,
            error: omitErr?.message || String(omitErr)
          });
        }

        let filename = 'image.png';
        try {
          const pathname = new URL(url).pathname || '';
          const rawFilename = pathname.substring(pathname.lastIndexOf('/') + 1);
          if (rawFilename) filename = rawFilename;
        } catch (e) {
          // 中文注释：URL 解析失败时保留默认文件名
        }

        return new File([blob], filename, { type: blob.type || 'image/png' });
      } catch (error) {
        console.error('urlToFile error:', error);
        const shortUrl = url.length > 180 ? `${url.slice(0, 180)}...` : url;
        this.addLog('图片转换失败', `URL: ${shortUrl}\nError: ${error.message}`);
        return null;
      }
    },
    async addLog(reason, detail) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      // 中文注释：更新时间格式为 年/月/日 时:分:秒
      const timeStr = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

      const newLog = {
        id: Date.now() + Math.random().toString(36).substr(2, 9), // 增加唯一ID用于单个删除
        createdAt: Date.now(),
        time: timeStr,
        reason: reason,
        detail: typeof detail === 'string' ? detail : JSON.stringify(detail)
      };

      // 中文注释：仅保留最新100条日志，超过的旧日志会被截断
      const MAX_LOGS = 100;

      try {
        let currentLogs = await bitable.bridge.getData('FEIYU_PLUG_RUN_LOGS');
        if (!Array.isArray(currentLogs)) currentLogs = [];

        currentLogs.unshift(newLog);
        const cappedLogs = currentLogs.slice(0, MAX_LOGS);
        this.logs = cappedLogs;
        await bitable.bridge.setData('FEIYU_PLUG_RUN_LOGS', cappedLogs);
      } catch (e) {
        console.error('Add log error:', e);
        // 兜底更新本地状态：同样限制最多100条
        const fallbackLogs = Array.isArray(this.logs) ? this.logs : [];
        fallbackLogs.unshift(newLog);
        this.logs = fallbackLogs.slice(0, MAX_LOGS);
      }
    },
    async clearLogs() {
      // 中文注释：清空飞书存储中的日志
      try {
        this.logs = [];
        await bitable.bridge.setData('FEIYU_PLUG_RUN_LOGS', []);
        ui.showToast({ toastType: 'success', message: '日志已清空' });
      } catch (e) {
        console.error('Clear logs error:', e);
      }
    },
    async handleDeleteLog(logId) {
      // 中文注释：删除单个日志并更新飞书存储
      try {
        const updatedLogs = this.logs.filter(log => log.id !== logId);
        this.logs = updatedLogs;
        await bitable.bridge.setData('FEIYU_PLUG_RUN_LOGS', updatedLogs);
        ui.showToast({ toastType: 'success', message: '日志已删除' });
      } catch (e) {
        console.error('Delete log error:', e);
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
          const fieldMetaList = await table.getFieldMetaList() || [];
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

          // // 4. 生成结果 这个功能不需要了，先注释
          // const resultFieldName = '生成结果';
          // const existingResultField = fieldMetaList.find(f => f.name === resultFieldName);
          // if (existingResultField) {
          //   if (existingResultField.type !== FieldType.Attachment) {
          //     console.log(`Converting ${resultFieldName} to Attachment`);
          //     await table.setField(existingResultField.id, { type: FieldType.Attachment });
          //   }
          // } else {
          //   await table.addField({ type: FieldType.Attachment, name: resultFieldName });
          // }

        } catch (error) {
          console.error('Check fields error:', error);
          ui.showToast({
            toastType: 'error',
            message: '检测字段失败'
          });
          return;
        }

        // 获取多选，选中的表格数据 recordIdList 是一个数组，表格的ID
        const selectedIds = await bitable.ui.selectRecordIdList(tableId, viewId);

        // 过滤：如果“商品标题”和“产品描述”都没有值，则过滤掉该行
        const table = await bitable.base.getTable(tableId);
        const titleField = await table.getField('商品标题');
        const descField = await table.getField('产品描述');

        const validIds = [];
        for (const recordId of selectedIds) {
          const titleVal = await titleField.getValue(recordId);
          const descVal = await descField.getValue(recordId);

          // 中文注释：使用健壮的判断方式检查是否有值，支持字符串、富文本数组等格式
          const hasTitle = Array.isArray(titleVal)
            ? titleVal.some(t => t && t.text)
            : !!(titleVal?.text || (typeof titleVal === 'string' ? titleVal : ''));
          const hasDesc = Array.isArray(descVal)
            ? descVal.some(t => t && t.text)
            : !!(descVal?.text || (typeof descVal === 'string' ? descVal : ''));

          if (hasTitle || hasDesc) {
            validIds.push(recordId);
          }
        }

        this.recordIdList = validIds;

        if (selectedIds.length > 0 && validIds.length === 0) {
          ui.showToast({ toastType: 'warning', message: '选中的数据中，“商品标题”和“产品描述”均为空，已自动过滤' });
        } else if (validIds.length < selectedIds.length) {
          console.log(`Filtered out ${selectedIds.length - validIds.length} empty records`);
        }
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
        const tableList = await bitable.base.getTableList() || [];
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

<style lang="scss">
.model-select-popup-content {
  .arco-select-dropdown {
    width: 300px !important;
    max-width: 300px !important;
    max-height: 350px !important;
    overflow: hidden !important;
  }

  .arco-select-dropdown-list-wrapper {
    max-height: 350px !important;
  }

  .arco-select-option {
    min-height: 44px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .arco-select-option-content {
    width: 100%;
    line-height: 1.5;
  }
}

/* 自定义弹窗动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .custom-modal-container {
    transform: scale(0.9) translateY(20px);
  }
}

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
  width: 240px;
  background-color: transparent;
  /* 移除容器背景色，防止圆角处白边泄露 */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  /* 开启硬件加速，优化圆角渲染 */
}

.kefu-modal-content {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.kefu-header {
  background: linear-gradient(135deg, #722ed1 0%, #b37feb 100%);
  padding: 16px 12px;
  text-align: center;
  position: relative;
  color: #fff;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  margin: -1px -1px 0 -1px;
  /* 负边距微调，确保完全覆盖可能存在的白边 */

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
  }
}

.kefu-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
  letter-spacing: 0.5px;
}

.kefu-subtitle {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.8;
  letter-spacing: 0.2px;
}

.kefu-close-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    opacity: 1;
    transform: rotate(90deg);
  }
}

.kefu-body {
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
}

.qr-code-container {
  width: 160px;
  height: 160px;
  padding: 6px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(114, 46, 209, 0.06);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;

  .scanning-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #722ed1, transparent);
    box-shadow: 0 0 8px #722ed1;
    animation: scanning 3s infinite linear;
    z-index: 1;
  }
}

@keyframes scanning {
  0% {
    top: 0;
  }

  50% {
    top: 100%;
  }

  100% {
    top: 0;
  }
}

.qr-code-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.kefu-tip {
  font-size: 13px;
  color: #1d2129;
  margin-bottom: 16px;
  font-weight: 500;
}

.wechat-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: #f7f8fa;
  border: 1px solid #e5e6eb;
  border-radius: 20px;
  color: #4e5969;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #f2f3f5;
    border-color: #07C160;
    color: #07C160;
  }
}

/* 联系客服悬浮图标 */
.kefu-float-icon {
  position: fixed;
  right: 12px;
  top: 170px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  color: #722ed1;
  transition: all 0.3s;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .arco-icon {
    font-size: 18px;
  }
}
</style>
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
  margin-bottom: 12px;

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

.kefu-contact-strip {
  min-height: 48px;
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(114, 192, 255, 0.32);
  background: linear-gradient(95deg, rgba(231, 247, 255, 0.95) 0%, rgba(236, 255, 251, 0.96) 100%);
  box-shadow: 0 4px 12px rgba(85, 170, 230, 0.08);
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(114, 192, 255, 0.5);
    box-shadow: 0 8px 18px rgba(85, 170, 230, 0.14);
    transform: translateY(-1px);
  }

  .kefu-contact-left {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2f9fe8;
    background: linear-gradient(145deg, rgba(181, 231, 255, 0.55) 0%, rgba(184, 245, 232, 0.5) 100%);
    flex-shrink: 0;

    .arco-icon {
      font-size: 18px;
    }
  }

  .kefu-contact-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;

    .kefu-contact-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--custom-text-color);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kefu-contact-desc {
      font-size: 12px;
      color: var(--color-text-2);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .kefu-contact-cta {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: #2f9fe8;
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
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

    &.is-running,
    &.is-paused {
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
  padding: 12px 12px;
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
        background-color: #722ED1;
        /* 紫色竖条 */
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

        &:hover:not(.arco-input-disabled),
        &:focus-within:not(.arco-input-disabled) {
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
    flex: 1;
    min-width: 0;

    .item-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;

      &.icon-0 {
        background: rgba(22, 93, 255, 0.1);
        color: #165DFF;
      }

      &.icon-1 {
        background: rgba(114, 46, 209, 0.1);
        color: #722ED1;
      }

      &.icon-2 {
        background: rgba(255, 125, 0, 0.1);
        color: #FF7D00;
      }

      &.icon-3 {
        background: rgba(0, 180, 42, 0.1);
        color: #00B42A;
      }

      &.icon-4 {
        background: rgba(245, 63, 63, 0.1);
        color: #F53F3F;
      }

      &.icon-5 {
        background: rgba(19, 194, 194, 0.1);
        color: #13C2C2;
      }

      &.icon-6 {
        background: rgba(250, 173, 20, 0.1);
        color: #FAAD14;
      }

      &.icon-7 {
        background: rgba(128, 90, 213, 0.1);
        color: #805AD5;
      }

      &.icon-8 {
        background: rgba(82, 196, 26, 0.1);
        color: #52C41A;
      }

      &.icon-9 {
        background: rgba(24, 144, 255, 0.1);
        color: #1890FF;
      }

      &.icon-10 {
        background: rgba(135, 208, 104, 0.1);
        color: #87D068;
      }

      &.icon-11 {
        background: rgba(64, 169, 255, 0.1);
        color: #40A9FF;
      }

      &.icon-12 {
        background: rgba(250, 140, 22, 0.1);
        color: #FA8C16;
      }

      &.icon-13 {
        background: rgba(111, 66, 193, 0.1);
        color: #6F42C1;
      }

      &.icon-14 {
        background: rgba(47, 84, 235, 0.1);
        color: #2F54EB;
      }

      &.icon-15 {
        background: rgba(105, 219, 124, 0.1);
        color: #69DB7C;
      }

      &.icon-16 {
        background: rgba(250, 219, 20, 0.1);
        color: #FADB14;
      }

      &.icon-17 {
        background: rgba(235, 47, 150, 0.1);
        color: #EB2F96;
      }

      &.icon-18 {
        background: rgba(26, 173, 196, 0.1);
        color: #1AADC4;
      }

      &.icon-19 {
        background: rgba(153, 84, 187, 0.1);
        color: #9954BB;
      }

      /* Fixed configuration items - using completely unique colors */
      &.icon-fixed-0 {
        background: rgba(255, 107, 107, 0.1);
        color: #FF6B6B;
      }

      &.icon-fixed-1 {
        background: rgba(77, 171, 247, 0.1);
        color: #4DABF7;
      }

      &.icon-fixed-2 {
        background: rgba(130, 201, 30, 0.1);
        color: #82C91E;
      }

      &.icon-history {
        background: rgba(146, 84, 222, 0.1);
        color: #9254DE;
      }
    }

    .item-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;

      .label-with-help {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }

      .label-text {
        font-size: 15px;
        font-weight: 500;
        color: var(--custom-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .label-help-icon {
        display: inline-flex;
        align-items: center;
        color: var(--color-text-3);
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        transition: color 0.2s;
        flex-shrink: 0;

        &:hover {
          color: rgb(var(--primary-6));
        }
      }
    }
  }

  .item-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    max-width: 58%;
    min-width: 0;

    /* 自定义分段控制 */
    .custom-segmented-control {
      display: flex;
      background: #f1f2f5;
      padding: 2px;
      border-radius: 6px;
      width: 100%;
      /* 移除 max-width 限制，使其宽度与 item-right 容器（58%）保持一致 */
      height: 32px;
      /* 与上方输入框/下拉框高度保持一致 */
      box-sizing: border-box;
      user-select: none;
      position: relative;
      /* 为滑块定位 */

      .segmented-slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(50% - 2px);
        height: calc(100% - 4px);
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        z-index: 1;

        &.once {
          transform: translateX(100%);
        }
      }

      .segmented-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        /* 与上方选项文字大小保持一致 */
        cursor: pointer;
        border-radius: 4px;
        transition: color 0.3s ease;
        color: #4e5969;
        white-space: nowrap;
        height: 100%;
        position: relative;
        z-index: 2;
        /* 确保文字在滑块上方 */

        &.active {
          color: #722ed1;
          font-weight: 500;
        }

        &:hover:not(.active) {
          background: rgba(0, 0, 0, 0.03);
        }
      }
    }

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
            white-space: nowrap;
            /* Prevent wrapping */
          }

          .btn-text {
            /* Remove flex/gap from here as it's now handled by btn-row-main */
          }

          .points-info {
            font-size: 10px;
            font-weight: normal;
            opacity: 0.6;
            margin-top: 0px;
            white-space: nowrap;
            /* Prevent wrapping */
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

.url-upload-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  input[type="file"] {
    width: 100%;
    font-size: 12px;
  }

  .url-upload-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .url-upload-count {
    font-size: 12px;
    color: var(--color-text-2);
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
