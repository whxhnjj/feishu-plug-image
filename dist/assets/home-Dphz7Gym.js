import { k as e, j as t } from "./@lark-base-open--wj6WFkb.js";
import { a } from "./axios-XD08gxqq.js";
import { q as i } from "./qs-DvCmNu9T.js";
import { _ as s, u as n } from "./index-Bb228cOZ.js";
import { a as o } from "./pinia-Ecob2UWI.js";
import "./vue-Cw7YYIIs.js";
import { g as l, h as r, i as d, j as c, c as p, k as g, l as u, m, n as h, o as y, p as w, q as f, r as b, s as T, t as v, u as I } from "./@arco-design-CHbMxZF5.js";
import { p as k, c as S, o as P, a as A, t as _, q as D, s as F, u as j, F as K, Q as L, n as E, A as C, z as R, T as V, b as x, P as U } from "./@vue-2BUk21rv.js";
import "./call-bind-apply-helpers-uOwG8Nag.js";
import "./function-bind-CKaqk7DH.js";
import "./es-errors-BLYKrcsK.js";
import "./side-channel-CDLbO4FQ.js";
import "./object-inspect-Cr-iKrax.js";
import "./crypto-js-kFogrGFp.js";
import "./side-channel-list-CjUaSC3U.js";
import "./side-channel-map-D663uv66.js";
import "./get-intrinsic-DPla16h1.js";
import "./es-object-atoms-Hm0rX7lz.js";
import "./math-intrinsics-DHiNV-49.js";
import "./gopd-CjuWBzBm.js";
import "./es-define-property-or00P0Do.js";
import "./has-symbols-BLBwH5A2.js";
import "./get-proto-ULSi024n.js";
import "./dunder-proto-Dg6ZZIcQ.js";
import "./hasown-CroOTh5K.js";
import "./call-bound-Dsl4ZuVa.js";
import "./side-channel-weakmap-pbUWVUap.js";
import "./tinycolor2-DBqHoQgM.js";
import "./pinia-plugin-persistedstate-D5qigYo-.js";
import "./vue-router-Bpc79ZYW.js";
import "./vue-toastification-gvaeHgp2.js";
import "./dayjs-C4HeD7j7.js";
import "./perfect-debounce-DuRXcIWw.js";
import "./hookable-DMLmKo6o.js";
import "./resize-observer-polyfill-BrS18N1Q.js";
import "./compute-scroll-into-view-BstioZEA.js";
import "./b-tween-D4DWnvJa.js";
import "./number-precision-D6gzHCo9.js";
import "./scroll-into-view-if-needed-DwRgbnrJ.js";
import "./b-validate-DAZkL0dB.js";
const z = e.ui, Y = a.create({ baseURL: "https://server-feishu.feiyushuju.com", timeout: 12e4 });
Y.interceptors.request.use(async (e2) => (e2.timeout = 12e4, e2.url && e2.isToken && (e2.headers.token = e2.isToken && localStorage.getItem("FEIYUAPIKEYPLUG") || ""), e2.data instanceof FormData ? (e2.onUploadProgress = e2.onUploadProgress, e2.headers["Content-Type"] = "multipart/form-data", e2) : ("GET" === e2.method.toUpperCase() ? (e2.params = { ...e2.params }, e2.paramsSerializer = function(e3) {
  return i.stringify(e3, { indices: true });
}) : e2.data = { ...e2.data }, e2)), async (e2) => (z.showToast({ toastType: "error", message: "网络请求超时了!" }), Promise.resolve(e2))), Y.interceptors.response.use(async (e2) => {
  const t2 = e2.data, a2 = t2.code || 200;
  if ("blob" === e2.request.responseType || "arraybuffer" === e2.request.responseType) return t2;
  return 200 === a2 ? Promise.resolve(t2) : [10002, 10003, 11008].includes(parseFloat(a2)) ? (z.showToast({ toastType: "error", message: (t2 == null ? void 0 : t2.msg) || "API Key 秘钥无效" }), Promise.reject(t2)) : (z.showToast({ toastType: "error", message: t2.msg || "系统接口异常" }), Promise.reject(t2));
}, async (e2) => {
  const t2 = e2.message;
  return "Network Error" === t2 ? z.showToast({ toastType: "error", message: "系统接口请求失败" }) : t2.includes("timeout") ? z.showToast({ toastType: "error", message: "系统接口请求超时" }) : t2.includes("Request failed with status code") && z.showToast({ toastType: "error", message: "系统接口" + t2.substr(t2.length - 3) + "异常" }), Promise.reject(e2);
});
const M = "RRRRRS", O = { amazon_img_style: "设计风格", amazon_img_scene: "场景偏好", amazon_language: "输出语种", banana_aspect_ratio: "生成比例", banana_size: "分辨率", banana_model: "AI模型", submit: "开始生成", reset: "重置", title: "飞鱼·AI绘画", language: "语言", apiKeySetting: "API Key 设置", getApiKey: "获取 API 密钥", enterApiKey: "请输入 API Key", cancel: "取消", saveConfig: "保存配置", apiKeySaved: "API Key 已保存", pleaseSelect: "请选择", complianceTip: "合规提示：请遵守法规，禁止生成违法内容。", consumePoints: "(预计消耗 {points} 积分)", dataSelection: "数据选择", selectData: "选择数据", addDataTable: "新增数据表", selectedCount: "已选择 {count} 条数据", noDataSelected: "暂未选择任何数据", noTaskRunning: "未有任务运行", taskRunning: "正在运行{count}任务，点击停止检测", taskPaused: "检测已停止，点击立即启动", pollingPaused: "已暂停检测", pollingResumed: "已恢复检测" }, G = { amazon_img_style: "Design Style", amazon_img_scene: "Scene Preference", amazon_language: "Output Language", banana_aspect_ratio: "Aspect Ratio", banana_size: "Resolution", banana_model: "AI Model", submit: "Generate", reset: "Reset", title: "Feiyu AI Art", language: "Language", apiKeySetting: "API Key Settings", getApiKey: "Get API Key", enterApiKey: "Enter API Key", cancel: "Cancel", saveConfig: "Save Config", apiKeySaved: "API Key Saved", pleaseSelect: "Select", complianceTip: "Compliance: Do not generate illegal content.", consumePoints: "(Est. cost {points} points)", dataSelection: "Data Selection", selectData: "Select Data", addDataTable: "Add Table", selectedCount: "Selected {count} records", noDataSelected: "No data selected", noTaskRunning: "No tasks running", taskRunning: "Running {count} tasks, click to stop detection", taskPaused: "Detection stopped, click to start immediately", pollingPaused: "Polling paused", pollingResumed: "Polling resumed" }, N = { amazon_img_style: "デザインスタイル", amazon_img_scene: "シーンの好み", amazon_language: "出力言語", banana_aspect_ratio: "生成比率", banana_size: "解像度", banana_model: "AIモデル", submit: "生成する", reset: "リセット", title: "Feiyu AI アート", language: "言語", apiKeySetting: "APIキー設定", getApiKey: "APIキーを取得", enterApiKey: "APIキーを入力", cancel: "キャンセル", saveConfig: "設定を保存", apiKeySaved: "APIキーが保存されました", pleaseSelect: "選択してください", complianceTip: "法令順守：違法コンテンツの生成は禁止です。", consumePoints: "(予想消費 {points} ポイント)", dataSelection: "データ選択", selectData: "データを選択", addDataTable: "テーブルを追加", selectedCount: "現在 {count} 件のデータが選択されています", noDataSelected: "データが選択されていません", noTaskRunning: "実行中のタスクはありません", taskRunning: "{count} 件のタスクを実行中 (クリックして一時停止)", taskPaused: "タスク一時停止中 (クリックして再開)", pollingPaused: "ポーリングを一時停止しました", pollingResumed: "ポーリングを再開しました" }, $ = async (e2) => Y({ url: "/api/v0.1/amazon/amazon.img.task.add", method: "POST", data: { plugId: M, ...e2 }, isToken: true }), q = e.ui, B = { name: "Home", components: { IconCloudDownload: I, IconEdit: v, IconSync: T, IconThunderbolt: b, IconSave: f, IconCheckCircleFill: w, IconInfoCircleFill: y, IconClose: h, IconArrowRight: m, IconPalette: u, IconImage: g, IconLanguage: p, IconExpand: c, IconPlayCircle: d, IconPlus: r, IconLoading: l }, data: () => ({ configList: [], loading: false, isSelectingData: false, bannerLoading: false, formData: {}, locales: { zh: O, en: G, jp: N }, bannerList: [], apiKey: localStorage.getItem("FEIYUAPIKEYPLUG") || "", isEditingApiKey: false, tempApiKey: "", edit: { appToken: "", tableId: "", viewId: "", rowId: "", imgs: "", total: "", title: "", desc: "", style: "", scene: "", language: "", aspectRatio: "", size: "", aiModel: "" }, recordIdList: [], submitting: false, pollingTimer: null, runningTaskCount: 0, isPaused: false, webUrl: "https://fs.amzfish.cn", deductionRules: {}, estimatedPoints: 0, indicatorTop: 500, isDragging: false, dragStartY: 0, initialTop: 0, hasMoved: false }), computed: { ...o(n, ["language"]), indicatorStyle() {
  return { top: `${this.indicatorTop}px`, right: "20px", position: "fixed", zIndex: 9999, cursor: "move", touchAction: "none" };
}, indicatorTooltip() {
  return 0 === this.runningTaskCount ? this.t("noTaskRunning") : this.isPaused ? this.t("taskPaused") : this.t("taskRunning", { count: this.runningTaskCount });
} }, watch: { "formData.aiModel": { handler() {
  this.calculatePoints();
} }, recordIdList: { handler() {
  this.calculatePoints();
}, deep: true } }, mounted() {
  this.indicatorTop = window.innerHeight - 150, this.getPlugAd(), this.getPlugSelectField(), this.getPlugDeductionSet(), this.pollTaskStatus();
}, methods: { async getPlugAd() {
  this.bannerLoading = true;
  try {
    const e2 = await (async (e3) => Y({ url: "/api/v0.1/common/plug.ads", method: "POST", data: { plugId: M, ...e3 }, isToken: false }))();
    200 === e2.code && (this.bannerList = e2.data || []);
  } catch (e2) {
  } finally {
    this.bannerLoading = false;
  }
}, async getPlugDeductionSet() {
  try {
    const e2 = await (async (e3) => Y({ url: "/api/v0.1/common/plug.deduction.setting", method: "POST", data: { plugId: M, ...e3 }, isToken: false }))();
    200 === e2.code && (this.deductionRules = e2.data || {});
  } catch (e2) {
  }
}, async calculatePoints() {
  if (0 === this.recordIdList.length) return void (this.estimatedPoints = 0);
  const t2 = this.formData.aiModel;
  if (!t2 || !this.deductionRules || void 0 === this.deductionRules[t2]) return void (this.estimatedPoints = 0);
  const a2 = this.deductionRules[t2];
  let i2 = 0;
  try {
    let t3 = this.edit.tableId;
    if (!t3) {
      t3 = (await e.base.getSelection()).tableId;
    }
    if (!t3) return;
    const s2 = await e.base.getTable(t3), n2 = await s2.getField("输出图数量"), o2 = this.recordIdList.map(async (e2) => {
      const t4 = await n2.getValue(e2), a3 = parseInt((t4 == null ? void 0 : t4.text) || 0, 10);
      return isNaN(a3) ? 0 : a3;
    });
    i2 = (await Promise.all(o2)).reduce((e2, t4) => e2 + t4, 0), this.estimatedPoints = i2 * a2;
  } catch (e2) {
    this.estimatedPoints = 0;
  }
}, handleBannerClick(e2) {
  e2 && window.open(e2, "_blank");
}, async getPlugSelectField() {
  this.loading = true;
  try {
    const e2 = await (async (e3) => Y({ url: "/api/v0.1/common/plug.select.field", method: "POST", data: { plugId: M, ...e3 }, isToken: false }))();
    200 === e2.code ? (this.configList = e2.data || [], this.webUrl = (e2 == null ? void 0 : e2.domain) || "https://fs.amzfish.cn", this.initForm()) : q.showToast({ toastType: "error", message: e2.msg || "获取配置失败" });
  } catch (e2) {
    q.showToast({ toastType: "error", message: "网络错误" });
  } finally {
    this.loading = false;
  }
}, async onSubmit() {
  const t2 = await e.base.getActiveTable(), a2 = await t2.getField("参考图"), i2 = await e.base.getSelection(), s2 = await t2.getViewById(i2.viewId), n2 = await s2.getVisibleRecordIdList();
  await a2.getAttachmentUrls(n2[1]);
}, t(e2, t2 = {}) {
  var _a;
  let a2 = ((_a = this.locales[this.language]) == null ? void 0 : _a[e2]) || e2;
  return t2 && Object.keys(t2).length > 0 && Object.keys(t2).forEach((e3) => {
    a2 = a2.split(`{${e3}}`).join(t2[e3]);
  }), a2;
}, getIcon(e2) {
  const t2 = ["IconPalette", "IconImage", "IconLanguage", "IconExpand"];
  return t2[e2 % t2.length];
}, initForm() {
  const e2 = {};
  this.configList.forEach((t2) => {
    e2[t2.field] = t2.value.default;
  }), this.formData = { ...e2 };
}, async handleSubmit() {
  if (!this.submitting) if (0 !== this.recordIdList.length) {
    this.submitting = true;
    try {
      const t2 = await e.base.getTable(this.edit.tableId), a2 = await t2.getField("任务运行状态"), i2 = await t2.getField("参考图"), s2 = await t2.getField("输出图数量"), n2 = await t2.getField("商品标题"), o2 = await t2.getField("产品描述"), l2 = await t2.getField("任务进度");
      await t2.getField("生成结果");
      for (let t3 = 0; t3 < this.recordIdList.length; t3++) {
        const r2 = this.recordIdList[t3];
        this.edit.rowId = r2;
        const d2 = await i2.getAttachmentUrls(r2);
        this.edit.imgs = d2;
        const c2 = await s2.getValue(r2);
        this.edit.total = (c2 == null ? void 0 : c2.text) || 0;
        const p2 = await n2.getValue(r2);
        this.edit.title = Array.isArray(p2) ? p2.map((e2) => e2.text).join("\n") : (p2 == null ? void 0 : p2.text) || "";
        const g2 = await o2.getValue(r2);
        this.edit.desc = Array.isArray(g2) ? g2.map((e2) => e2.text).join("\n") : (g2 == null ? void 0 : g2.text) || "";
        try {
          const t4 = await $({ ...this.edit, ...this.formData });
          if (200 !== t4.code) {
            q.showToast({ toastType: "error", message: t4.msg || "任务提交失败" });
            break;
          }
          {
            const i3 = t4.data, s3 = i3.task_id;
            let n3 = await e.bridge.getData("FEIYU_PLUG_TASK_ID");
            Array.isArray(n3) || (n3 = []), n3.includes(s3) || (n3.push(s3), await e.bridge.setData("FEIYU_PLUG_TASK_ID", n3)), await l2.setValue(r2, parseFloat((i3 == null ? void 0 : i3.progress) || 0)), await a2.setValue(r2, i3.status_str);
          }
        } catch (e2) {
          q.showToast({ toastType: "error", message: "提交任务时发生错误" });
          break;
        }
      }
      q.showToast({ toastType: "success", message: "任务执行成功" }), this.recordIdList = [], this.isPaused = false, this.pollTaskStatus();
    } catch (e2) {
      q.showToast({ toastType: "error", message: "错误: " + e2.message });
    } finally {
      this.submitting = false;
    }
  } else q.showToast({ toastType: "error", message: "请先选择数据！" });
}, handleDragStart(e2) {
  if (0 === this.runningTaskCount) return;
  this.isDragging = true, this.hasMoved = false, this.initialTop = this.indicatorTop;
  const t2 = e2.touches ? e2.touches[0].clientY : e2.clientY;
  this.dragStartY = t2, e2.cancelable && e2.preventDefault(), window.addEventListener("mousemove", this.handleDragMove), window.addEventListener("mouseup", this.handleDragEnd), window.addEventListener("touchmove", this.handleDragMove, { passive: false }), window.addEventListener("touchend", this.handleDragEnd);
}, handleDragMove(e2) {
  if (!this.isDragging) return;
  if ("mousemove" === e2.type && 0 === e2.buttons) return void this.handleDragEnd();
  const t2 = (e2.touches ? e2.touches[0].clientY : e2.clientY) - this.dragStartY;
  Math.abs(t2) > 2 && (this.hasMoved = true);
  let a2 = this.initialTop + t2;
  const i2 = window.innerHeight;
  a2 < 10 && (a2 = 10), a2 > i2 - 40 - 10 && (a2 = i2 - 40 - 10), this.indicatorTop = a2, e2.cancelable && e2.preventDefault();
}, handleDragEnd() {
  this.isDragging = false, window.removeEventListener("mousemove", this.handleDragMove), window.removeEventListener("mouseup", this.handleDragEnd), window.removeEventListener("touchmove", this.handleDragMove), window.removeEventListener("touchend", this.handleDragEnd), this.hasMoved || this.togglePolling();
}, togglePolling() {
  0 !== this.runningTaskCount && (this.isPaused ? (this.isPaused = false, this.pollTaskStatus(), q.showToast({ toastType: "success", message: this.t("pollingResumed") || "已恢复检测" })) : (this.isPaused = true, this.pollingTimer && (clearTimeout(this.pollingTimer), this.pollingTimer = null), q.showToast({ toastType: "warning", message: this.t("pollingPaused") || "已暂停检测" })));
}, async pollTaskStatus() {
  if (this.pollingTimer && (clearTimeout(this.pollingTimer), this.pollingTimer = null), this.isPaused) return;
  let a2 = await e.bridge.getData("FEIYU_PLUG_TASK_ID");
  if (Array.isArray(a2) || (a2 = []), this.runningTaskCount = a2.length, 0 !== a2.length) try {
    const i2 = await (async (e2) => Y({ url: "/api/v0.1/amazon/amazon.img.task.status", method: "GET", params: { plugId: M, ...e2 }, isToken: true }))({ taskIds: a2 });
    if (i2 && 200 === i2.code) {
      const s2 = Array.isArray(i2.data) ? i2.data : [i2.data];
      let n2 = [...a2];
      for (const a3 of s2) if (n2.includes(a3.task_id) && a3.table_id && a3.row_id) try {
        const i3 = await e.base.getTable(a3.table_id);
        if (3 === a3.status) {
          try {
            if (a3.images && a3.images.length > 0) {
              let e2;
              try {
                e2 = await i3.getField("生成结果");
              } catch (a4) {
                try {
                  const a5 = await i3.getFieldList();
                  await Promise.all(a5.map((e3) => e3.getName()));
                  await i3.addField({ type: t.Attachment, name: "生成结果" }), e2 = await i3.getField("生成结果");
                } catch (e3) {
                  throw new Error('Field "生成结果" access and creation failed');
                }
              }
              const s4 = [];
              for (const e3 of a3.images) try {
                const t2 = await this.urlToFile(e3);
                t2 && s4.push(t2);
              } catch (e4) {
              }
              if (s4.length > 0) {
                const t2 = await e2.getValue(a3.row_id);
                if (await e2.setValue(a3.row_id, s4), t2 && t2.length > 0) {
                  const i4 = await e2.getValue(a3.row_id);
                  let s5 = [], n3 = [];
                  try {
                    s5 = JSON.parse(JSON.stringify(t2)), n3 = JSON.parse(JSON.stringify(i4));
                  } catch (e3) {
                  }
                  const o4 = [...s5, ...n3];
                  await e2.setValue(a3.row_id, o4);
                }
              }
            }
          } catch (e2) {
          }
          n2 = n2.filter((e2) => e2 !== a3.task_id);
        } else -1 === a3.status && (n2 = n2.filter((e2) => e2 !== a3.task_id));
        const s3 = await i3.getField("任务运行状态"), o3 = await s3.getValue(a3.row_id);
        (o3 == null ? void 0 : o3.text) !== (a3 == null ? void 0 : a3.status_str) && await s3.setValue(a3.row_id, a3.status_str);
        const l3 = await i3.getField("任务进度");
        await l3.setValue(a3.row_id, parseFloat((a3 == null ? void 0 : a3.progress) || 0) / 100);
      } catch (e2) {
      }
      let o2 = await e.bridge.getData("FEIYU_PLUG_TASK_ID");
      Array.isArray(o2) || (o2 = []);
      const l2 = a2.filter((e2) => !n2.includes(e2)), r2 = o2.filter((e2) => !l2.includes(e2));
      await e.bridge.setData("FEIYU_PLUG_TASK_ID", r2), this.runningTaskCount = r2.length, r2.length > 0 && !this.isPaused && (this.pollingTimer = setTimeout(() => {
        this.pollTaskStatus();
      }, 5e3));
    } else this.pollingTimer = null, this.isPaused = true;
  } catch (e2) {
    this.pollingTimer = null, this.isPaused = true;
  }
}, async urlToFile(e2) {
  try {
    const t2 = await fetch(e2), a2 = await t2.blob(), i2 = e2.substring(e2.lastIndexOf("/") + 1) || "image.png";
    return new File([a2], i2, { type: a2.type });
  } catch (e3) {
    return null;
  }
}, async handleReset() {
  this.initForm(), q.showToast({ toastType: "info", message: this.t("reset") });
}, startEditApiKey() {
  this.tempApiKey = this.apiKey, this.isEditingApiKey = true;
}, async saveApiKey() {
  this.apiKey = this.tempApiKey, localStorage.setItem("FEIYUAPIKEYPLUG", this.apiKey), this.isEditingApiKey = false, q.showToast({ toastType: "success", message: this.t("apiKeySaved") });
}, cancelEditApiKey() {
  this.tempApiKey = "", this.isEditingApiKey = false;
}, async handleSelectData() {
  this.isSelectingData = true;
  try {
    this.recordIdList = [];
    const { baseId: a2, tableId: i2, viewId: s2 } = await e.base.getSelection();
    this.edit.appToken = a2, this.edit.tableId = i2, this.edit.viewId = s2;
    const n2 = ["商品标题", "产品描述", "参考图"];
    try {
      const a3 = await e.base.getTable(i2), o2 = await a3.getFieldMetaList(), l2 = o2.map((e2) => e2.name), r2 = n2.filter((e2) => !l2.includes(e2));
      if (r2.length > 0) return void q.showToast({ toastType: "error", message: `当前表格缺失以下字段，请检查: 「  ${r2.join("、")}  」是否存在` });
      const d2 = { "商品标题": t.Text, "产品描述": t.Text, "参考图": t.Attachment };
      for (const [e2, i3] of Object.entries(d2)) {
        const s3 = o2.find((t2) => t2.name === e2);
        if (s3 && s3.type !== i3) try {
          await a3.setField(s3.id, { type: i3 });
        } catch (a4) {
          throw q.showToast({ toastType: "warning", message: `字段「${e2}」类型不正确且无法自动转换，请手动修改为${i3 === t.Attachment ? "附件" : "文本"}类型` }), new Error(`Field ${e2} type mismatch and conversion failed`);
        }
      }
      const c2 = "任务运行状态", p2 = [{ name: "待创建", color: 0 }, { name: "已排队", color: 2 }, { name: "执行中", color: 4 }, { name: "已完成", color: 5 }, { name: "已失败", color: 1 }], g2 = o2.find((e2) => e2.name === c2);
      g2 ? g2.type !== t.SingleSelect && await a3.setField(g2.id, { type: t.SingleSelect, property: { options: p2 } }) : await a3.addField({ type: t.SingleSelect, name: c2, property: { options: p2 } });
      try {
        const e2 = await a3.getField(c2);
        let t2 = await e2.getOptions();
        t2 && 0 !== t2.length || (await a3.setField(e2.id, { property: { options: p2 } }), t2 = await e2.getOptions());
        const i3 = t2.find((e3) => "待创建" === e3.name);
        if (i3) {
          const t3 = await a3.getViewById(s2), n3 = await t3.getVisibleRecordIdList();
          for (const t4 of n3) {
            await e2.getValue(t4) || await e2.setValue(t4, i3.id);
          }
        }
      } catch (e2) {
      }
      const u2 = "任务进度", m2 = o2.find((e2) => e2.name === u2);
      let h2 = false;
      if (m2) {
        if (m2.type !== t.Progress) try {
          await a3.deleteField(m2.id), h2 = true;
        } catch (e2) {
          throw e2;
        }
      } else h2 = true;
      h2 && await a3.addField({ type: t.Progress, name: u2, property: { formatter: "0%" } });
      try {
        const e2 = await a3.getField(u2), t2 = await a3.getViewById(s2), i3 = await t2.getVisibleRecordIdList();
        for (const t3 of i3) {
          const a4 = await e2.getValue(t3);
          null == a4 && await e2.setValue(t3, 0);
        }
      } catch (e2) {
      }
      const y2 = "输出图数量", w2 = [];
      for (let e2 = 1; e2 <= 20; e2++) w2.push({ name: String(e2) });
      const f2 = o2.find((e2) => e2.name === y2);
      f2 ? f2.type !== t.SingleSelect && await a3.setField(f2.id, { type: t.SingleSelect, property: { options: w2 } }) : await a3.addField({ type: t.SingleSelect, name: y2, property: { options: w2 } });
      try {
        const e2 = await a3.getField(y2);
        let t2 = await e2.getOptions();
        t2 && 0 !== t2.length || (await a3.setField(e2.id, { property: { options: w2 } }), t2 = await e2.getOptions());
        const i3 = t2.find((e3) => "5" === e3.name);
        if (i3) {
          const t3 = await a3.getViewById(s2), n3 = await t3.getVisibleRecordIdList();
          for (const t4 of n3) {
            await e2.getValue(t4) || await e2.setValue(t4, i3.id);
          }
        }
      } catch (e2) {
      }
      const b2 = "生成结果", T2 = o2.find((e2) => e2.name === b2);
      T2 ? T2.type !== t.Attachment && await a3.setField(T2.id, { type: t.Attachment }) : await a3.addField({ type: t.Attachment, name: b2 });
    } catch (e2) {
      return void q.showToast({ toastType: "error", message: "检测字段失败" });
    }
    this.recordIdList = await e.ui.selectRecordIdList(i2, s2);
  } catch (e2) {
  } finally {
    this.isSelectingData = false;
  }
}, async handleAddTable() {
  try {
    const a2 = await e.base.getTableList(), i2 = await Promise.all(a2.map((e2) => e2.getName()));
    let s2 = "飞鱼数据表", n2 = 1;
    for (; i2.includes(`${s2}${n2}`); ) n2++;
    s2 = `${s2}${n2}`;
    const { tableId: o2 } = await e.base.addTable({ name: s2 }), l2 = await e.base.getTable(o2);
    await e.ui.switchToTable(o2);
    const r2 = await l2.getFieldList();
    r2.length > 0 ? await l2.setField(r2[0].id, { name: "商品标题" }) : await l2.addField({ type: t.Text, name: "商品标题" }), await l2.addField({ type: t.SingleSelect, name: "任务运行状态", property: { options: [{ name: "待创建", color: 0 }, { name: "已排队", color: 2 }, { name: "执行中", color: 4 }, { name: "已完成", color: 5 }, { name: "已失败", color: 1 }] } }), await l2.addField({ type: t.Progress, name: "任务进度", property: { formatter: "0%" } }), await l2.addField({ type: t.Text, name: "产品描述" }), await l2.addField({ type: t.Attachment, name: "参考图" });
    const d2 = [];
    for (let e2 = 1; e2 <= 20; e2++) d2.push({ name: String(e2) });
    await l2.addField({ type: t.SingleSelect, name: "输出图数量", property: { options: d2 } }), await l2.addField({ type: t.Attachment, name: "生成结果" }), q.showToast({ toastType: "success", message: "新建数据表成功" });
  } catch (e2) {
    q.showToast({ toastType: "error", message: "当前表格，无新建数据表权限！" });
  }
} } }, J = { class: "feiyu-home" }, H = { class: "banner-section" }, Q = ["onClick"], W = ["src"], X = { class: "api-key-section" }, Z = { class: "section-header" }, ee = { class: "header-left" }, te = { class: "section-title" }, ae = ["href"], ie = { class: "header-right" }, se = { class: "section-body" }, ne = { key: 0, class: "save-btn-area" }, oe = { class: "api-key-section" }, le = { class: "section-header" }, re = { class: "header-left" }, de = { class: "section-title" }, ce = { class: "header-right" }, pe = { class: "section-body" }, ge = { class: "count-badge" }, ue = { class: "count-text" }, me = { class: "content-body" }, he = { key: 1, class: "form-list" }, ye = { class: "item-left" }, we = { class: "item-info" }, fe = { class: "label-text" }, be = { class: "item-right" }, Te = { class: "action-footer" }, ve = { class: "footer-content" }, Ie = { class: "btn-group" }, ke = { class: "btn-content-inline" }, Se = { class: "btn-text" }, Pe = { key: 2, class: "points-info-inline" }, Ae = { class: "footer-tip" };
const _e = s(B, [["render", function(e2, t2, a2, i2, s2, n2) {
  const o2 = k("a-skeleton-shape"), l2 = k("a-skeleton"), r2 = k("a-carousel-item"), d2 = k("a-carousel"), c2 = k("icon-edit"), p2 = k("a-button"), g2 = k("a-input-password"), u2 = k("icon-save"), m2 = k("icon-plus"), h2 = k("icon-check-circle-fill"), y2 = k("icon-info-circle-fill"), w2 = k("a-skeleton-line"), f2 = k("a-space"), b2 = k("a-option"), T2 = k("a-select"), v2 = k("icon-sync"), I2 = k("icon-play-circle"), z2 = k("a-tooltip"), Y2 = k("icon-loading"), M2 = k("icon-thunderbolt");
  return P(), S("div", J, [A("div", H, [s2.bannerLoading ? (P(), D(l2, { key: 0, animation: true }, { default: F(() => [j(o2, { shape: "rect", style: { width: "100%", height: "140px", "border-radius": "12px" } })]), _: 1 })) : s2.bannerList.length > 0 ? (P(), D(d2, { key: 1, class: "custom-carousel", "auto-play": true, "indicator-type": "slider", "show-arrow": "hover", style: { width: "100%", height: "140px", "border-radius": "12px", overflow: "hidden" } }, { default: F(() => [(P(true), S(K, null, L(s2.bannerList, (e3, t3) => (P(), D(r2, { key: t3 }, { default: F(() => [A("div", { class: "banner-item", onClick: (t4) => n2.handleBannerClick(e3.url), style: E({ cursor: e3.url ? "pointer" : "default" }) }, [A("img", { src: e3.image, class: "banner-img" }, null, 8, W)], 12, Q)]), _: 2 }, 1024))), 128))]), _: 1 })) : _("", true)]), A("div", X, [A("div", Z, [A("div", ee, [t2[4] || (t2[4] = A("span", { class: "vertical-bar" }, null, -1)), A("span", te, C(n2.t("apiKeySetting")), 1), s2.webUrl ? (P(), S("a", { key: 0, href: s2.webUrl, target: "_blank", class: "link-text" }, C(n2.t("getApiKey")), 9, ae)) : _("", true)]), A("div", ie, [s2.isEditingApiKey ? _("", true) : (P(), D(p2, { key: 0, type: "text", size: "small", onClick: n2.startEditApiKey }, { icon: F(() => [j(c2)]), _: 1 }, 8, ["onClick"]))])]), A("div", se, [s2.isEditingApiKey ? (P(), D(g2, { key: 1, modelValue: s2.tempApiKey, "onUpdate:modelValue": t2[1] || (t2[1] = (e3) => s2.tempApiKey = e3), placeholder: n2.t("enterApiKey"), class: "api-input", "allow-clear": "" }, null, 8, ["modelValue", "placeholder"])) : (P(), D(g2, { key: 0, modelValue: s2.apiKey, "onUpdate:modelValue": t2[0] || (t2[0] = (e3) => s2.apiKey = e3), placeholder: n2.t("enterApiKey"), class: "api-input", disabled: "" }, null, 8, ["modelValue", "placeholder"])), j(V, { name: "fade" }, { default: F(() => [s2.isEditingApiKey ? (P(), S("div", ne, [j(p2, { class: "btn-cancel", onClick: n2.cancelEditApiKey }, { default: F(() => [R(C(n2.t("cancel")), 1)]), _: 1 }, 8, ["onClick"]), j(p2, { class: "btn-save", type: "primary", status: "success", onClick: n2.saveApiKey }, { icon: F(() => [j(u2)]), default: F(() => [R(" " + C(n2.t("saveConfig")), 1)]), _: 1 }, 8, ["onClick"])])) : _("", true)]), _: 1 })])]), A("div", oe, [A("div", le, [A("div", re, [t2[5] || (t2[5] = A("span", { class: "vertical-bar" }, null, -1)), A("span", de, C(n2.t("dataSelection")), 1)]), A("div", ce, [j(p2, { type: "outline", size: "mini", class: "btn-add-table", onClick: n2.handleAddTable }, { icon: F(() => [j(m2)]), default: F(() => [R(" " + C(n2.t("addDataTable")), 1)]), _: 1 }, 8, ["onClick"])])]), A("div", pe, [j(p2, { type: "primary", long: "", onClick: n2.handleSelectData, loading: s2.isSelectingData, disabled: s2.isSelectingData }, { default: F(() => [R(C(n2.t("selectData")), 1)]), _: 1 }, 8, ["onClick", "loading", "disabled"]), A("div", { class: x(["selected-count", { "has-data": s2.recordIdList.length > 0 }]) }, [A("div", ge, [s2.recordIdList.length > 0 ? (P(), D(h2, { key: 0 })) : (P(), D(y2, { key: 1 }))]), A("span", ue, C(s2.recordIdList.length > 0 ? n2.t("selectedCount", { count: s2.recordIdList.length }) : n2.t("noDataSelected")), 1)], 2)])]), A("div", me, [s2.loading ? (P(), D(l2, { key: 0, animation: true }, { default: F(() => [j(f2, { direction: "vertical", style: { width: "100%" }, size: "large" }, { default: F(() => [j(w2, { rows: 3 }), j(w2, { rows: 3 }), j(w2, { rows: 3 })]), _: 1 })]), _: 1 })) : (P(), S("div", he, [(P(true), S(K, null, L(s2.configList, (e3, t3) => (P(), S("div", { key: e3.field, class: "form-card-item", style: E({ animationDelay: 0.05 * t3 + "s" }) }, [A("div", ye, [A("span", { class: x(["item-icon", "icon-" + t3 % 4]) }, [(P(), D(U(n2.getIcon(t3))))], 2), A("div", we, [A("span", fe, C(e3.title), 1)])]), A("div", be, [j(T2, { modelValue: s2.formData[e3.field], "onUpdate:modelValue": (t4) => s2.formData[e3.field] = t4, class: "minimal-select", "allow-search": "", placeholder: n2.t("pleaseSelect"), "trigger-props": { autoFitPopupMinWidth: true } }, { default: F(() => [(P(true), S(K, null, L(e3.value.select, (e4) => (P(), D(b2, { key: e4, value: e4 }, { default: F(() => [R(C(e4), 1)]), _: 2 }, 1032, ["value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder"])])], 4))), 128))]))]), s2.runningTaskCount > 0 ? (P(), S("div", { key: 0, class: "task-status-indicator", ref: "indicatorRef", style: E(n2.indicatorStyle), onMousedown: t2[2] || (t2[2] = (...e3) => n2.handleDragStart && n2.handleDragStart(...e3)), onTouchstart: t2[3] || (t2[3] = (...e3) => n2.handleDragStart && n2.handleDragStart(...e3)) }, [j(z2, { content: n2.indicatorTooltip, position: "left", mini: "" }, { default: F(() => [A("div", { class: x(["indicator-icon", { "is-running": s2.runningTaskCount > 0 && !s2.isPaused, "is-paused": s2.runningTaskCount > 0 && s2.isPaused }]) }, [s2.isPaused ? (P(), D(I2, { key: 1 })) : (P(), D(v2, { key: 0, spin: s2.runningTaskCount > 0 }, null, 8, ["spin"]))], 2)]), _: 1 }, 8, ["content"])], 36)) : _("", true), A("div", Te, [A("div", ve, [A("div", Ie, [j(p2, { class: x(["btn-submit", { "is-loading": s2.submitting }]), type: "primary", shape: "round", onClick: n2.handleSubmit }, { default: F(() => [A("div", ke, [s2.submitting ? (P(), D(Y2, { key: 0, spin: "" })) : (P(), D(M2, { key: 1 })), A("span", Se, C(n2.t("submit")), 1), s2.recordIdList.length > 0 && s2.estimatedPoints > 0 ? (P(), S("span", Pe, C(n2.t("consumePoints", { points: s2.estimatedPoints })), 1)) : _("", true)])]), _: 1 }, 8, ["class", "onClick"])]), A("div", Ae, C(n2.t("complianceTip")), 1)])])]);
}], ["__scopeId", "data-v-edfe046f"], ["__file", "/Users/wangjie/wj/飞鱼项目/飞书插件开发/feishu-plugs-image/src/views/home/home.vue"]]);
export {
  _e as default
};
