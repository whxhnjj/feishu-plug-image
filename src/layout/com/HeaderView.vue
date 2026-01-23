<template>
  <div class="header">
    <div class="menu-logo">
      <TitleView @click.native="onHome" :title="t('title')" />
    </div>
    <div class="header-right">
      <a-space size="medium">
        <a-select v-model="currentLang" size="small" class="lang-select" style="width: 100px;">
          <template #prefix>
            <icon-language />
          </template>
          <a-option v-for="opt in langOptions" :key="opt.value" :value="opt.value" :label="opt.label" />
        </a-select>
        
        <a-button v-if="currTheme === 'light'" shape="circle" size="small" @click="onThen('dark')">
          <template #icon>
            <icon-moon-fill />
          </template>
        </a-button>
        <a-button v-else shape="circle" size="small" @click="onThen('light')">
          <template #icon>
            <icon-sun-fill />
          </template>
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
// Vue2 写法：Options API
import TitleView from './TitleView.vue'
import { bitable } from '@lark-base-open/js-sdk';
import { IconMoonFill, IconSunFill, IconLanguage } from '@arco-design/web-vue/es/icon';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import jp from '../locales/jp.json';
import useAppStore from '@/stores/app';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'HeaderView',
  components: {
    TitleView,
    IconMoonFill,
    IconSunFill,
    IconLanguage
  },
  data () {
    return {
      currTheme: 'light',
      langOptions: [
        { label: '中文', value: 'zh' },
        { label: 'English', value: 'en' },
        { label: '日本語', value: 'jp' }
      ],
      locales: {
        zh,
        en,
        jp
      }
    }
  },
  computed: {
    ...mapState(useAppStore, ['language']),
    currentLang: {
      get() {
        return this.language;
      },
      set(val) {
        this.setLanguage(val);
      }
    }
  },
  mounted () {
    this.getInit();
  },
  methods: {
    ...mapActions(useAppStore, ['setLanguage']),
    t(key) {
      return this.locales[this.language]?.[key] || key;
    },
    async getInit () {
      this.onSetThen();
      
      // 如果store里没有设置过语言，尝试获取飞书语言设置
      // 这里简单判断，如果默认是zh且可能未初始化
      // 实际上persist会恢复状态。如果需要强制同步飞书，可以加逻辑
      if (this.language === 'zh') {
         try {
          const lang = await bitable.bridge.getLanguage();
          if (lang) {
             let target = 'zh';
             if (lang.toLowerCase().includes('zh')) target = 'zh';
             else if (lang.toLowerCase().includes('en')) target = 'en';
             else if (lang.toLowerCase().includes('jp') || lang.toLowerCase().includes('ja')) target = 'jp';
             
             if (target !== this.language) {
               this.setLanguage(target);
             }
          }
        } catch (e) {
          console.warn('获取语言失败，使用默认中文', e);
        }
      }
    },
    onHome() {
      this.$router.push('/')
    },
    // 设置主题，并监听主题变化
    async onSetThen() {
      const theme = await bitable.bridge.getTheme();
      this.onThen(theme?.toLowerCase() || 'light');

      const themes = await bitable.bridge.onThemeChange((event) => {
        this.onThen(event?.data?.theme?.toLowerCase() || 'light');
      });
    },
    onThen (currTheme) {
      this.currTheme = currTheme;
      if (currTheme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        document.body.removeAttribute('arco-theme')
      }
      localStorage.setItem('APP_THEME', currTheme)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--color-bg-2);

  .menu-logo {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
