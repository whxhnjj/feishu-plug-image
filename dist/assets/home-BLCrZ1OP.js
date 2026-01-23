import { k as e, j as t } from "./@lark-base-open--wj6WFkb.js";
import { a } from "./axios-XD08gxqq.js";
import { q as s } from "./qs-DvCmNu9T.js";
import { _ as i, u as n } from "./index-BNfqCEdL.js";
import { a as o } from "./pinia-Ecob2UWI.js";
import "./vue-Cw7YYIIs.js";
import { g as l, h as r, i as d, j as c, c as u, k as p, l as g, m, n as h, o as y, p as w, q as f, r as b, s as T, t as v, u as k } from "./@arco-design-CHbMxZF5.js";
import { p as I, c as P, o as A, a as S, t as _, q as D, s as j, u as K, F as L, Q as F, n as E, A as C, z as R, T as U, b as x, P as z } from "./@vue-2BUk21rv.js";
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
const V = e.ui, Y = a.create({ baseURL: "https://server-feishu.feiyushuju.com", timeout: 12e4 });
Y.interceptors.request.use(async (e2) => (e2.timeout = 12e4, e2.url && e2.isToken && (e2.headers.token = e2.isToken && localStorage.getItem("FEIYUAPIKEYPLUG") || ""), e2.data instanceof FormData ? (e2.onUploadProgress = e2.onUploadProgress, e2.headers["Content-Type"] = "multipart/form-data", e2) : ("GET" === e2.method.toUpperCase() ? (e2.params = { ...e2.params }, e2.paramsSerializer = function(e3) {
  return s.stringify(e3, { indices: true });
}) : e2.data = { ...e2.data }, e2)), async (e2) => (V.showToast({ toastType: "error", message: "网络请求超时了!" }), Promise.resolve(e2))), Y.interceptors.response.use(async (e2) => {
  const t2 = e2.data, a2 = t2.code || 200;
  if ("blob" === e2.request.responseType || "arraybuffer" === e2.request.responseType) return t2;
  return 200 === a2 ? Promise.resolve(t2) : [10002, 10003, 11008].includes(parseFloat(a2)) ? (V.showToast({ toastType: "error", message: (t2 == null ? void 0 : t2.msg) || "API Key 秘钥无效" }), Promise.reject(t2)) : (V.showToast({ toastType: "error", message: t2.msg || "系统接口异常" }), Promise.reject(t2));
}, async (e2) => {
  const t2 = e2.message;
  return "Network Error" === t2 ? V.showToast({ toastType: "error", message: "系统接口请求失败" }) : t2.includes("timeout") ? V.showToast({ toastType: "error", message: "系统接口请求超时" }) : t2.includes("Request failed with status code") && V.showToast({ toastType: "error", message: "系统接口" + t2.substr(t2.length - 3) + "异常" }), Promise.reject(e2);
});
const M = "RRRRRS", G = { amazon_img_style: "设计风格", amazon_img_scene: "场景偏好", amazon_language: "输出语种", banana_aspect_ratio: "生成比例", banana_size: "分辨率", banana_model: "AI模型", submit: "开始生成", reset: "重置", title: "飞鱼·AI绘画", language: "语言", apiKeySetting: "API Key 设置", getApiKey: "获取 API 密钥", enterApiKey: "请输入 API Key", cancel: "取消", saveConfig: "保存配置", apiKeySaved: "API Key 已保存", pleaseSelect: "请选择", complianceTip: "合规提示：请遵守法规，禁止生成违法内容。", consumePoints: "(预计消耗 {points} 积分)", dataSelection: "数据选择", selectData: "选择数据", addDataTable: "新增数据表", selectedCount: "已选择 {count} 条数据", noDataSelected: "暂未选择任何数据", noTaskRunning: "未有任务运行", taskRunning: "正在运行{count}任务，点击停止检测", taskPaused: "检测已停止，点击立即启动", pollingPaused: "已暂停检测", pollingResumed: "已恢复检测" }, O = { amazon_img_style: "Design Style", amazon_img_scene: "Scene Preference", amazon_language: "Output Language", banana_aspect_ratio: "Aspect Ratio", banana_size: "Resolution", banana_model: "AI Model", submit: "Generate", reset: "Reset", title: "Feiyu AI Art", language: "Language", apiKeySetting: "API Key Settings", getApiKey: "Get API Key", enterApiKey: "Enter API Key", cancel: "Cancel", saveConfig: "Save Config", apiKeySaved: "API Key Saved", pleaseSelect: "Select", complianceTip: "Compliance: Do not generate illegal content.", consumePoints: "(Est. cost {points} points)", dataSelection: "Data Selection", selectData: "Select Data", addDataTable: "Add Table", selectedCount: "Selected {count} records", noDataSelected: "No data selected", noTaskRunning: "No tasks running", taskRunning: "Running {count} tasks, click to stop detection", taskPaused: "Detection stopped, click to start immediately", pollingPaused: "Polling paused", pollingResumed: "Polling resumed" }, N = { amazon_img_style: "デザインスタイル", amazon_img_scene: "シーンの好み", amazon_language: "出力言語", banana_aspect_ratio: "生成比率", banana_size: "解像度", banana_model: "AIモデル", submit: "生成する", reset: "リセット", title: "Feiyu AI アート", language: "言語", apiKeySetting: "APIキー設定", getApiKey: "APIキーを取得", enterApiKey: "APIキーを入力", cancel: "キャンセル", saveConfig: "設定を保存", apiKeySaved: "APIキーが保存されました", pleaseSelect: "選択してください", complianceTip: "法令順守：違法コンテンツの生成は禁止です。", consumePoints: "(予想消費 {points} ポイント)", dataSelection: "データ選択", selectData: "データを選択", addDataTable: "テーブルを追加", selectedCount: "現在 {count} 件のデータが選択されています", noDataSelected: "データが選択されていません", noTaskRunning: "実行中のタスクはありません", taskRunning: "{count} 件のタスクを実行中 (クリックして一時停止)", taskPaused: "タスク一時停止中 (クリックして再開)", pollingPaused: "ポーリングを一時停止しました", pollingResumed: "ポーリングを再開しました" }, q = async (e2) => Y({ url: "/api/v0.1/amazon/amazon.img.task.add", method: "POST", data: { plugId: M, ...e2 }, isToken: true }), $ = e.ui, B = { name: "Home", components: { IconCloudDownload: k, IconEdit: v, IconSync: T, IconThunderbolt: b, IconSave: f, IconCheckCircleFill: w, IconInfoCircleFill: y, IconClose: h, IconArrowRight: m, IconPalette: g, IconImage: p, IconLanguage: u, IconExpand: c, IconPlayCircle: d, IconPlus: r, IconLoading: l }, data: () => ({ configList: [], loading: false, bannerLoading: false, formData: {}, locales: { zh: G, en: O, jp: N }, bannerList: [], apiKey: localStorage.getItem("FEIYUAPIKEYPLUG") || "", isEditingApiKey: false, tempApiKey: "", edit: { appToken: "", tableId: "", viewId: "", rowId: "", imgs: "", total: "", title: "", desc: "", style: "", scene: "", language: "", aspectRatio: "", size: "", aiModel: "" }, recordIdList: [], submitting: false, pollingTimer: null, runningTaskCount: 0, isPaused: false, webUrl: "https://fs.amzfish.cn", deductionRules: {}, estimatedPoints: 0, indicatorTop: 500, isDragging: false, dragStartY: 0, initialTop: 0, hasMoved: false }), computed: { ...o(n, ["language"]), indicatorStyle() {
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
  let s2 = 0;
  try {
    let t3 = this.edit.tableId;
    if (!t3) {
      t3 = (await e.base.getSelection()).tableId;
    }
    if (!t3) return;
    const i2 = await e.base.getTable(t3), n2 = await i2.getField("输出图数量"), o2 = this.recordIdList.map(async (e2) => {
      const t4 = await n2.getValue(e2), a3 = parseInt((t4 == null ? void 0 : t4.text) || 0, 10);
      return isNaN(a3) ? 0 : a3;
    });
    s2 = (await Promise.all(o2)).reduce((e2, t4) => e2 + t4, 0), this.estimatedPoints = s2 * a2;
  } catch (e2) {
    this.estimatedPoints = 0;
  }
}, handleBannerClick(e2) {
  e2 && window.open(e2, "_blank");
}, async getPlugSelectField() {
  this.loading = true;
  try {
    const e2 = await (async (e3) => Y({ url: "/api/v0.1/common/plug.select.field", method: "POST", data: { plugId: M, ...e3 }, isToken: false }))();
    200 === e2.code ? (this.configList = e2.data || [], this.webUrl = (e2 == null ? void 0 : e2.domain) || "https://fs.amzfish.cn", this.initForm()) : $.showToast({ toastType: "error", message: e2.msg || "获取配置失败" });
  } catch (e2) {
    $.showToast({ toastType: "error", message: "网络错误" });
  } finally {
    this.loading = false;
  }
}, async onSubmit() {
  const t2 = await e.base.getActiveTable(), a2 = await t2.getField("参考图"), s2 = await e.base.getSelection(), i2 = await t2.getViewById(s2.viewId), n2 = await i2.getVisibleRecordIdList();
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
      const t2 = await e.base.getTable(this.edit.tableId), a2 = await t2.getField("任务运行状态"), s2 = await t2.getField("参考图"), i2 = await t2.getField("输出图数量"), n2 = await t2.getField("商品标题"), o2 = await t2.getField("产品描述"), l2 = await t2.getField("任务进度");
      await t2.getField("生成结果");
      for (let t3 = 0; t3 < this.recordIdList.length; t3++) {
        const r2 = this.recordIdList[t3];
        this.edit.rowId = r2;
        const d2 = await s2.getAttachmentUrls(r2);
        this.edit.imgs = d2;
        const c2 = await i2.getValue(r2);
        this.edit.total = (c2 == null ? void 0 : c2.text) || 0;
        const u2 = await n2.getValue(r2);
        this.edit.title = Array.isArray(u2) ? u2.map((e2) => e2.text).join("\n") : (u2 == null ? void 0 : u2.text) || "";
        const p2 = await o2.getValue(r2);
        this.edit.desc = Array.isArray(p2) ? p2.map((e2) => e2.text).join("\n") : (p2 == null ? void 0 : p2.text) || "";
        try {
          const t4 = await q({ ...this.edit, ...this.formData });
          if (200 !== t4.code) {
            $.showToast({ toastType: "error", message: t4.msg || "任务提交失败" });
            break;
          }
          {
            const s3 = t4.data, i3 = s3.task_id;
            let n3 = await e.bridge.getData("FEIYU_PLUG_TASK_ID");
            Array.isArray(n3) || (n3 = []), n3.includes(i3) || (n3.push(i3), await e.bridge.setData("FEIYU_PLUG_TASK_ID", n3)), await l2.setValue(r2, parseFloat((s3 == null ? void 0 : s3.progress) || 0)), await a2.setValue(r2, s3.status_str);
          }
        } catch (e2) {
          $.showToast({ toastType: "error", message: "提交任务时发生错误" });
          break;
        }
      }
      $.showToast({ toastType: "success", message: "任务执行成功" }), this.recordIdList = [], this.isPaused = false, this.pollTaskStatus();
    } catch (e2) {
      $.showToast({ toastType: "error", message: "错误: " + e2.message });
    } finally {
      this.submitting = false;
    }
  } else $.showToast({ toastType: "error", message: "请先选择数据！" });
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
  const s2 = window.innerHeight;
  a2 < 10 && (a2 = 10), a2 > s2 - 40 - 10 && (a2 = s2 - 40 - 10), this.indicatorTop = a2, e2.cancelable && e2.preventDefault();
}, handleDragEnd() {
  this.isDragging = false, window.removeEventListener("mousemove", this.handleDragMove), window.removeEventListener("mouseup", this.handleDragEnd), window.removeEventListener("touchmove", this.handleDragMove), window.removeEventListener("touchend", this.handleDragEnd), this.hasMoved || this.togglePolling();
}, togglePolling() {
  0 !== this.runningTaskCount && (this.isPaused ? (this.isPaused = false, this.pollTaskStatus(), $.showToast({ toastType: "success", message: this.t("pollingResumed") || "已恢复检测" })) : (this.isPaused = true, this.pollingTimer && (clearTimeout(this.pollingTimer), this.pollingTimer = null), $.showToast({ toastType: "warning", message: this.t("pollingPaused") || "已暂停检测" })));
}, async pollTaskStatus() {
  if (this.pollingTimer && (clearTimeout(this.pollingTimer), this.pollingTimer = null), this.isPaused) return;
  let a2 = await e.bridge.getData("FEIYU_PLUG_TASK_ID");
  if (Array.isArray(a2) || (a2 = []), this.runningTaskCount = a2.length, 0 !== a2.length) try {
    const s2 = await (async (e2) => Y({ url: "/api/v0.1/amazon/amazon.img.task.status", method: "GET", params: { plugId: M, ...e2 }, isToken: true }))({ taskIds: a2 });
    if (s2 && 200 === s2.code) {
      const i2 = Array.isArray(s2.data) ? s2.data : [s2.data];
      let n2 = [...a2];
      for (const a3 of i2) if (n2.includes(a3.task_id) && a3.table_id && a3.row_id) try {
        const s3 = await e.base.getTable(a3.table_id);
        if (3 === a3.status) {
          try {
            if (a3.images && a3.images.length > 0) {
              let e2;
              try {
                e2 = await s3.getField("生成结果");
              } catch (a4) {
                try {
                  const a5 = await s3.getFieldList();
                  await Promise.all(a5.map((e3) => e3.getName()));
                  await s3.addField({ type: t.Attachment, name: "生成结果" }), e2 = await s3.getField("生成结果");
                } catch (e3) {
                  throw new Error('Field "生成结果" access and creation failed');
                }
              }
              const i4 = [];
              for (const e3 of a3.images) try {
                const t2 = await this.urlToFile(e3);
                t2 && i4.push(t2);
              } catch (e4) {
              }
              if (i4.length > 0) {
                const t2 = await e2.getValue(a3.row_id);
                if (await e2.setValue(a3.row_id, i4), t2 && t2.length > 0) {
                  const s4 = await e2.getValue(a3.row_id);
                  let i5 = [], n3 = [];
                  try {
                    i5 = JSON.parse(JSON.stringify(t2)), n3 = JSON.parse(JSON.stringify(s4));
                  } catch (e3) {
                  }
                  const o4 = [...i5, ...n3];
                  await e2.setValue(a3.row_id, o4);
                }
              }
            }
          } catch (e2) {
          }
          n2 = n2.filter((e2) => e2 !== a3.task_id);
        } else -1 === a3.status && (n2 = n2.filter((e2) => e2 !== a3.task_id));
        const i3 = await s3.getField("任务运行状态"), o3 = await i3.getValue(a3.row_id);
        (o3 == null ? void 0 : o3.text) !== (a3 == null ? void 0 : a3.status_str) && await i3.setValue(a3.row_id, a3.status_str);
        const l3 = await s3.getField("任务进度");
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
    const t2 = await fetch(e2), a2 = await t2.blob(), s2 = e2.substring(e2.lastIndexOf("/") + 1) || "image.png";
    return new File([a2], s2, { type: a2.type });
  } catch (e3) {
    return null;
  }
}, async handleReset() {
  this.initForm(), $.showToast({ toastType: "info", message: this.t("reset") });
}, startEditApiKey() {
  this.tempApiKey = this.apiKey, this.isEditingApiKey = true;
}, async saveApiKey() {
  this.apiKey = this.tempApiKey, localStorage.setItem("FEIYUAPIKEYPLUG", this.apiKey), this.isEditingApiKey = false, $.showToast({ toastType: "success", message: this.t("apiKeySaved") });
}, cancelEditApiKey() {
  this.tempApiKey = "", this.isEditingApiKey = false;
}, async handleSelectData() {
  this.recordIdList = [];
  const { baseId: t2, tableId: a2, viewId: s2 } = await e.base.getSelection();
  this.edit.appToken = t2, this.edit.tableId = a2, this.edit.viewId = s2, this.recordIdList = await e.ui.selectRecordIdList(a2, s2);
}, async handleAddTable() {
  try {
    const a2 = await e.base.getTableList(), s2 = await Promise.all(a2.map((e2) => e2.getName()));
    let i2 = "飞鱼数据表", n2 = 1;
    for (; s2.includes(`${i2}${n2}`); ) n2++;
    i2 = `${i2}${n2}`;
    const { tableId: o2 } = await e.base.addTable({ name: i2 }), l2 = await e.base.getTable(o2);
    await e.ui.switchToTable(o2);
    const r2 = await l2.getFieldList();
    r2.length > 0 ? await l2.setField(r2[0].id, { name: "商品标题" }) : await l2.addField({ type: t.Text, name: "商品标题" }), await l2.addField({ type: t.SingleSelect, name: "任务运行状态", property: { options: [{ name: "待创建", color: 0 }, { name: "已排队", color: 2 }, { name: "执行中", color: 4 }, { name: "已完成", color: 5 }, { name: "已失败", color: 1 }] } }), await l2.addField({ type: t.Progress, name: "任务进度", property: { formatter: "0%" } }), await l2.addField({ type: t.Text, name: "产品描述" }), await l2.addField({ type: t.Attachment, name: "参考图" });
    const d2 = [];
    for (let e2 = 1; e2 <= 20; e2++) d2.push({ name: String(e2) });
    await l2.addField({ type: t.SingleSelect, name: "输出图数量", property: { options: d2 } }), await l2.addField({ type: t.Attachment, name: "生成结果" }), $.showToast({ toastType: "success", message: "新建数据表成功" });
  } catch (e2) {
    $.showToast({ toastType: "error", message: "当前表格，无新建数据表权限！" });
  }
} } }, J = { class: "feiyu-home" }, H = { class: "banner-section" }, Q = ["onClick"], W = ["src"], X = { class: "api-key-section" }, Z = { class: "section-header" }, ee = { class: "header-left" }, te = { class: "section-title" }, ae = ["href"], se = { class: "header-right" }, ie = { class: "section-body" }, ne = { key: 0, class: "save-btn-area" }, oe = { class: "api-key-section" }, le = { class: "section-header" }, re = { class: "header-left" }, de = { class: "section-title" }, ce = { class: "header-right" }, ue = { class: "section-body" }, pe = { class: "count-badge" }, ge = { class: "count-text" }, me = { class: "content-body" }, he = { key: 1, class: "form-list" }, ye = { class: "item-left" }, we = { class: "item-info" }, fe = { class: "label-text" }, be = { class: "item-right" }, Te = { class: "action-footer" }, ve = { class: "footer-content" }, ke = { class: "btn-group" }, Ie = { class: "btn-content-inline" }, Pe = { class: "btn-text" }, Ae = { key: 2, class: "points-info-inline" }, Se = { class: "footer-tip" };
const _e = i(B, [["render", function(e2, t2, a2, s2, i2, n2) {
  const o2 = I("a-skeleton-shape"), l2 = I("a-skeleton"), r2 = I("a-carousel-item"), d2 = I("a-carousel"), c2 = I("icon-edit"), u2 = I("a-button"), p2 = I("a-input-password"), g2 = I("icon-save"), m2 = I("icon-plus"), h2 = I("icon-check-circle-fill"), y2 = I("icon-info-circle-fill"), w2 = I("a-skeleton-line"), f2 = I("a-space"), b2 = I("a-option"), T2 = I("a-select"), v2 = I("icon-sync"), k2 = I("icon-play-circle"), V2 = I("a-tooltip"), Y2 = I("icon-loading"), M2 = I("icon-thunderbolt");
  return A(), P("div", J, [S("div", H, [i2.bannerLoading ? (A(), D(l2, { key: 0, animation: true }, { default: j(() => [K(o2, { shape: "rect", style: { width: "100%", height: "140px", "border-radius": "12px" } })]), _: 1 })) : i2.bannerList.length > 0 ? (A(), D(d2, { key: 1, class: "custom-carousel", "auto-play": true, "indicator-type": "slider", "show-arrow": "hover", style: { width: "100%", height: "140px", "border-radius": "12px", overflow: "hidden" } }, { default: j(() => [(A(true), P(L, null, F(i2.bannerList, (e3, t3) => (A(), D(r2, { key: t3 }, { default: j(() => [S("div", { class: "banner-item", onClick: (t4) => n2.handleBannerClick(e3.url), style: E({ cursor: e3.url ? "pointer" : "default" }) }, [S("img", { src: e3.image, class: "banner-img" }, null, 8, W)], 12, Q)]), _: 2 }, 1024))), 128))]), _: 1 })) : _("", true)]), S("div", X, [S("div", Z, [S("div", ee, [t2[4] || (t2[4] = S("span", { class: "vertical-bar" }, null, -1)), S("span", te, C(n2.t("apiKeySetting")), 1), i2.webUrl ? (A(), P("a", { key: 0, href: i2.webUrl, target: "_blank", class: "link-text" }, C(n2.t("getApiKey")), 9, ae)) : _("", true)]), S("div", se, [i2.isEditingApiKey ? _("", true) : (A(), D(u2, { key: 0, type: "text", size: "small", onClick: n2.startEditApiKey }, { icon: j(() => [K(c2)]), _: 1 }, 8, ["onClick"]))])]), S("div", ie, [i2.isEditingApiKey ? (A(), D(p2, { key: 1, modelValue: i2.tempApiKey, "onUpdate:modelValue": t2[1] || (t2[1] = (e3) => i2.tempApiKey = e3), placeholder: n2.t("enterApiKey"), class: "api-input", "allow-clear": "" }, null, 8, ["modelValue", "placeholder"])) : (A(), D(p2, { key: 0, modelValue: i2.apiKey, "onUpdate:modelValue": t2[0] || (t2[0] = (e3) => i2.apiKey = e3), placeholder: n2.t("enterApiKey"), class: "api-input", disabled: "" }, null, 8, ["modelValue", "placeholder"])), K(U, { name: "fade" }, { default: j(() => [i2.isEditingApiKey ? (A(), P("div", ne, [K(u2, { class: "btn-cancel", onClick: n2.cancelEditApiKey }, { default: j(() => [R(C(n2.t("cancel")), 1)]), _: 1 }, 8, ["onClick"]), K(u2, { class: "btn-save", type: "primary", status: "success", onClick: n2.saveApiKey }, { icon: j(() => [K(g2)]), default: j(() => [R(" " + C(n2.t("saveConfig")), 1)]), _: 1 }, 8, ["onClick"])])) : _("", true)]), _: 1 })])]), S("div", oe, [S("div", le, [S("div", re, [t2[5] || (t2[5] = S("span", { class: "vertical-bar" }, null, -1)), S("span", de, C(n2.t("dataSelection")), 1)]), S("div", ce, [K(u2, { type: "outline", size: "mini", class: "btn-add-table", onClick: n2.handleAddTable }, { icon: j(() => [K(m2)]), default: j(() => [R(" " + C(n2.t("addDataTable")), 1)]), _: 1 }, 8, ["onClick"])])]), S("div", ue, [K(u2, { type: "primary", long: "", onClick: n2.handleSelectData }, { default: j(() => [R(C(n2.t("selectData")), 1)]), _: 1 }, 8, ["onClick"]), S("div", { class: x(["selected-count", { "has-data": i2.recordIdList.length > 0 }]) }, [S("div", pe, [i2.recordIdList.length > 0 ? (A(), D(h2, { key: 0 })) : (A(), D(y2, { key: 1 }))]), S("span", ge, C(i2.recordIdList.length > 0 ? n2.t("selectedCount", { count: i2.recordIdList.length }) : n2.t("noDataSelected")), 1)], 2)])]), S("div", me, [i2.loading ? (A(), D(l2, { key: 0, animation: true }, { default: j(() => [K(f2, { direction: "vertical", style: { width: "100%" }, size: "large" }, { default: j(() => [K(w2, { rows: 3 }), K(w2, { rows: 3 }), K(w2, { rows: 3 })]), _: 1 })]), _: 1 })) : (A(), P("div", he, [(A(true), P(L, null, F(i2.configList, (e3, t3) => (A(), P("div", { key: e3.field, class: "form-card-item", style: E({ animationDelay: 0.05 * t3 + "s" }) }, [S("div", ye, [S("span", { class: x(["item-icon", "icon-" + t3 % 4]) }, [(A(), D(z(n2.getIcon(t3))))], 2), S("div", we, [S("span", fe, C(e3.title), 1)])]), S("div", be, [K(T2, { modelValue: i2.formData[e3.field], "onUpdate:modelValue": (t4) => i2.formData[e3.field] = t4, class: "minimal-select", "allow-search": "", placeholder: n2.t("pleaseSelect"), "trigger-props": { autoFitPopupMinWidth: true } }, { default: j(() => [(A(true), P(L, null, F(e3.value.select, (e4) => (A(), D(b2, { key: e4, value: e4 }, { default: j(() => [R(C(e4), 1)]), _: 2 }, 1032, ["value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder"])])], 4))), 128))]))]), i2.runningTaskCount > 0 ? (A(), P("div", { key: 0, class: "task-status-indicator", ref: "indicatorRef", style: E(n2.indicatorStyle), onMousedown: t2[2] || (t2[2] = (...e3) => n2.handleDragStart && n2.handleDragStart(...e3)), onTouchstart: t2[3] || (t2[3] = (...e3) => n2.handleDragStart && n2.handleDragStart(...e3)) }, [K(V2, { content: n2.indicatorTooltip, position: "left", mini: "" }, { default: j(() => [S("div", { class: x(["indicator-icon", { "is-running": i2.runningTaskCount > 0 && !i2.isPaused, "is-paused": i2.runningTaskCount > 0 && i2.isPaused }]) }, [i2.isPaused ? (A(), D(k2, { key: 1 })) : (A(), D(v2, { key: 0, spin: i2.runningTaskCount > 0 }, null, 8, ["spin"]))], 2)]), _: 1 }, 8, ["content"])], 36)) : _("", true), S("div", Te, [S("div", ve, [S("div", ke, [K(u2, { class: x(["btn-submit", { "is-loading": i2.submitting }]), type: "primary", shape: "round", onClick: n2.handleSubmit }, { default: j(() => [S("div", Ie, [i2.submitting ? (A(), D(Y2, { key: 0, spin: "" })) : (A(), D(M2, { key: 1 })), S("span", Pe, C(n2.t("submit")), 1), i2.recordIdList.length > 0 && i2.estimatedPoints > 0 ? (A(), P("span", Ae, C(n2.t("consumePoints", { points: i2.estimatedPoints })), 1)) : _("", true)])]), _: 1 }, 8, ["class", "onClick"])]), S("div", Se, C(n2.t("complianceTip")), 1)])])]);
}], ["__scopeId", "data-v-edfe046f"], ["__file", "/Users/wangjie/wj/飞鱼项目/飞书插件开发/feishu-vue-xui/src/views/home/home.vue"]]);
export {
  _e as default
};
