import "./vue-Cw7YYIIs.js";
import { d as t, c as e, o as s, b as o, n, q as a, s as i, G as r, P as c, a6 as l, $ as u, p as d, t as h, a as p, F as m, z as g, A as f, ab as v, I as b, R as T, Q as y, g as C, i as O, D as E, _ as S, v as D, u as R } from "./@vue-2BUk21rv.js";
var P, B = Object.defineProperty, w = Object.getOwnPropertySymbols, I = Object.prototype.hasOwnProperty, x = Object.prototype.propertyIsEnumerable, _ = (t2, e2, s2) => e2 in t2 ? B(t2, e2, { enumerable: true, configurable: true, writable: true, value: s2 }) : t2[e2] = s2, N = (t2, e2) => {
  for (var s2 in e2 || (e2 = {})) I.call(e2, s2) && _(t2, s2, e2[s2]);
  if (w) for (var s2 of w(e2)) x.call(e2, s2) && _(t2, s2, e2[s2]);
  return t2;
}, A = (t2) => "function" == typeof t2, L = (t2) => "string" == typeof t2, j = (t2) => L(t2) && t2.trim().length > 0, $ = (t2) => void 0 === t2, F = (t2) => "object" == typeof t2 && null !== t2, H = (t2) => window.TouchEvent && t2 instanceof TouchEvent, M = (t2) => V(t2, "component") && k(t2.component), k = (t2) => {
  return !$(t2) && (L(t2) || (A(e2 = t2) || F(e2)) || M(t2));
  var e2;
}, U = (t2) => F(t2) && ["height", "width", "right", "left", "top", "bottom"].every((e2) => "number" == typeof t2[e2]), V = (t2, e2) => (F(t2) || A(t2)) && e2 in t2, z = (P = 0, () => P++);
function G(t2) {
  return H(t2) ? t2.targetTouches[0].clientX : t2.clientX;
}
function q(t2) {
  return H(t2) ? t2.targetTouches[0].clientY : t2.clientY;
}
var X, W, Y, Q, J, K, Z = (e2) => M(e2) ? Z(e2.component) : ((t2) => V(t2, "tag") && j(t2.tag))(e2) ? t({ render: () => e2 }) : "string" == typeof e2 ? e2 : l(u(e2)), tt = class {
  constructor() {
    this.allHandlers = {};
  }
  getHandlers(t2) {
    return this.allHandlers[t2] || [];
  }
  on(t2, e2) {
    const s2 = this.getHandlers(t2);
    s2.push(e2), this.allHandlers[t2] = s2;
  }
  off(t2, e2) {
    const s2 = this.getHandlers(t2);
    s2.splice(s2.indexOf(e2) >>> 0, 1);
  }
  emit(t2, e2) {
    this.getHandlers(t2).forEach((t3) => t3(e2));
  }
};
(W = X || (X = {})).SUCCESS = "success", W.ERROR = "error", W.WARNING = "warning", W.INFO = "info", W.DEFAULT = "default", (Q = Y || (Y = {})).TOP_LEFT = "top-left", Q.TOP_CENTER = "top-center", Q.TOP_RIGHT = "top-right", Q.BOTTOM_LEFT = "bottom-left", Q.BOTTOM_CENTER = "bottom-center", Q.BOTTOM_RIGHT = "bottom-right", (K = J || (J = {})).ADD = "add", K.DISMISS = "dismiss", K.UPDATE = "update", K.CLEAR = "clear", K.UPDATE_DEFAULTS = "update_defaults";
var et = "Vue-Toastification", st = { type: { type: String, default: X.DEFAULT }, classNames: { type: [String, Array], default: () => [] }, trueBoolean: { type: Boolean, default: true } }, ot = { type: st.type, customIcon: { type: [String, Boolean, Object, Function], default: true } }, nt = { component: { type: [String, Object, Function, Boolean], default: "button" }, classNames: st.classNames, showOnHover: { type: Boolean, default: false }, ariaLabel: { type: String, default: "close" } }, at = { timeout: { type: [Number, Boolean], default: 5e3 }, hideProgressBar: { type: Boolean, default: false }, isRunning: { type: Boolean, default: false } }, it = { transition: { type: [Object, String], default: `${et}__bounce` } }, rt = { CORE_TOAST: { position: { type: String, default: Y.TOP_RIGHT }, draggable: st.trueBoolean, draggablePercent: { type: Number, default: 0.6 }, pauseOnFocusLoss: st.trueBoolean, pauseOnHover: st.trueBoolean, closeOnClick: st.trueBoolean, timeout: at.timeout, hideProgressBar: at.hideProgressBar, toastClassName: st.classNames, bodyClassName: st.classNames, icon: ot.customIcon, closeButton: nt.component, closeButtonClassName: nt.classNames, showCloseButtonOnHover: nt.showOnHover, accessibility: { type: Object, default: () => ({ toastRole: "alert", closeButtonLabel: "close" }) }, rtl: { type: Boolean, default: false }, eventBus: { type: Object, required: false, default: () => new tt() } }, TOAST: { id: { type: [String, Number], required: true, default: 0 }, type: st.type, content: { type: [String, Object, Function], required: true, default: "" }, onClick: { type: Function, default: void 0 }, onClose: { type: Function, default: void 0 } }, CONTAINER: { container: { type: [Object, Function], default: () => document.body }, newestOnTop: st.trueBoolean, maxToasts: { type: Number, default: 20 }, transition: it.transition, toastDefaults: Object, filterBeforeCreate: { type: Function, default: (t2) => t2 }, filterToasts: { type: Function, default: (t2) => t2 }, containerClassName: st.classNames, onMounted: Function, shareAppContext: [Boolean, Object] }, PROGRESS_BAR: at, ICON: ot, TRANSITION: it, CLOSE_BUTTON: nt }, ct = t({ name: "VtProgressBar", props: rt.PROGRESS_BAR, data: () => ({ hasClass: true }), computed: { style() {
  return { animationDuration: `${this.timeout}ms`, animationPlayState: this.isRunning ? "running" : "paused", opacity: this.hideProgressBar ? 0 : 1 };
}, cpClass() {
  return this.hasClass ? `${et}__progress-bar` : "";
} }, watch: { timeout() {
  this.hasClass = false, this.$nextTick(() => this.hasClass = true);
} }, mounted() {
  this.$el.addEventListener("animationend", this.animationEnded);
}, beforeUnmount() {
  this.$el.removeEventListener("animationend", this.animationEnded);
}, methods: { animationEnded() {
  this.$emit("close-toast");
} } });
ct.render = function(t2, a2) {
  return s(), e("div", { style: n(t2.style), class: o(t2.cpClass) }, null, 6);
};
var lt = ct, ut = t({ name: "VtCloseButton", props: rt.CLOSE_BUTTON, computed: { buttonComponent() {
  return false !== this.component ? Z(this.component) : "button";
}, classes() {
  const t2 = [`${et}__close-button`];
  return this.showOnHover && t2.push("show-on-hover"), t2.concat(this.classNames);
} } }), dt = g(" × ");
ut.render = function(t2, e2) {
  return s(), a(c(t2.buttonComponent), r({ "aria-label": t2.ariaLabel, class: t2.classes }, t2.$attrs), { default: i(() => [dt]), _: 1 }, 16, ["aria-label", "class"]);
};
var ht = ut, pt = {}, mt = { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "check-circle", class: "svg-inline--fa fa-check-circle fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, gt = [p("path", { fill: "currentColor", d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" }, null, -1)];
pt.render = function(t2, o2) {
  return s(), e("svg", mt, gt);
};
var ft = pt, vt = {}, bt = { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "info-circle", class: "svg-inline--fa fa-info-circle fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, Tt = [p("path", { fill: "currentColor", d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" }, null, -1)];
vt.render = function(t2, o2) {
  return s(), e("svg", bt, Tt);
};
var yt = vt, Ct = {}, Ot = { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "exclamation-circle", class: "svg-inline--fa fa-exclamation-circle fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, Et = [p("path", { fill: "currentColor", d: "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" }, null, -1)];
Ct.render = function(t2, o2) {
  return s(), e("svg", Ot, Et);
};
var St = Ct, Dt = {}, Rt = { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "exclamation-triangle", class: "svg-inline--fa fa-exclamation-triangle fa-w-18", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512" }, Pt = [p("path", { fill: "currentColor", d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" }, null, -1)];
Dt.render = function(t2, o2) {
  return s(), e("svg", Rt, Pt);
};
var Bt = Dt, wt = t({ name: "VtIcon", props: rt.ICON, computed: { customIconChildren() {
  return V(this.customIcon, "iconChildren") ? this.trimValue(this.customIcon.iconChildren) : "";
}, customIconClass() {
  return L(this.customIcon) ? this.trimValue(this.customIcon) : V(this.customIcon, "iconClass") ? this.trimValue(this.customIcon.iconClass) : "";
}, customIconTag() {
  return V(this.customIcon, "iconTag") ? this.trimValue(this.customIcon.iconTag, "i") : "i";
}, hasCustomIcon() {
  return this.customIconClass.length > 0;
}, component() {
  return this.hasCustomIcon ? this.customIconTag : k(this.customIcon) ? Z(this.customIcon) : this.iconTypeComponent;
}, iconTypeComponent() {
  return { [X.DEFAULT]: yt, [X.INFO]: yt, [X.SUCCESS]: ft, [X.ERROR]: Bt, [X.WARNING]: St }[this.type];
}, iconClasses() {
  const t2 = [`${et}__icon`];
  return this.hasCustomIcon ? t2.concat(this.customIconClass) : t2;
} }, methods: { trimValue: (t2, e2 = "") => j(t2) ? t2.trim() : e2 } });
wt.render = function(t2, e2) {
  return s(), a(c(t2.component), { class: o(t2.iconClasses) }, { default: i(() => [g(f(t2.customIconChildren), 1)]), _: 1 }, 8, ["class"]);
};
var It = t({ name: "VtToast", components: { ProgressBar: lt, CloseButton: ht, Icon: wt }, inheritAttrs: false, props: Object.assign({}, rt.CORE_TOAST, rt.TOAST), data: () => ({ isRunning: true, disableTransitions: false, beingDragged: false, dragStart: 0, dragPos: { x: 0, y: 0 }, dragRect: {} }), computed: { classes() {
  const t2 = [`${et}__toast`, `${et}__toast--${this.type}`, `${this.position}`].concat(this.toastClassName);
  return this.disableTransitions && t2.push("disable-transition"), this.rtl && t2.push(`${et}__toast--rtl`), t2;
}, bodyClasses() {
  return [`${et}__toast-${L(this.content) ? "body" : "component-body"}`].concat(this.bodyClassName);
}, draggableStyle() {
  return this.dragStart === this.dragPos.x ? {} : this.beingDragged ? { transform: `translateX(${this.dragDelta}px)`, opacity: 1 - Math.abs(this.dragDelta / this.removalDistance) } : { transition: "transform 0.2s, opacity 0.2s", transform: "translateX(0)", opacity: 1 };
}, dragDelta() {
  return this.beingDragged ? this.dragPos.x - this.dragStart : 0;
}, removalDistance() {
  return U(this.dragRect) ? (this.dragRect.right - this.dragRect.left) * this.draggablePercent : 0;
} }, mounted() {
  this.draggable && this.draggableSetup(), this.pauseOnFocusLoss && this.focusSetup();
}, beforeUnmount() {
  this.draggable && this.draggableCleanup(), this.pauseOnFocusLoss && this.focusCleanup();
}, methods: { hasProp: V, getVueComponentFromObj: Z, closeToast() {
  this.eventBus.emit(J.DISMISS, this.id);
}, clickHandler() {
  this.onClick && this.onClick(this.closeToast), this.closeOnClick && (this.beingDragged && this.dragStart !== this.dragPos.x || this.closeToast());
}, timeoutHandler() {
  this.closeToast();
}, hoverPause() {
  this.pauseOnHover && (this.isRunning = false);
}, hoverPlay() {
  this.pauseOnHover && (this.isRunning = true);
}, focusPause() {
  this.isRunning = false;
}, focusPlay() {
  this.isRunning = true;
}, focusSetup() {
  addEventListener("blur", this.focusPause), addEventListener("focus", this.focusPlay);
}, focusCleanup() {
  removeEventListener("blur", this.focusPause), removeEventListener("focus", this.focusPlay);
}, draggableSetup() {
  const t2 = this.$el;
  t2.addEventListener("touchstart", this.onDragStart, { passive: true }), t2.addEventListener("mousedown", this.onDragStart), addEventListener("touchmove", this.onDragMove, { passive: false }), addEventListener("mousemove", this.onDragMove), addEventListener("touchend", this.onDragEnd), addEventListener("mouseup", this.onDragEnd);
}, draggableCleanup() {
  const t2 = this.$el;
  t2.removeEventListener("touchstart", this.onDragStart), t2.removeEventListener("mousedown", this.onDragStart), removeEventListener("touchmove", this.onDragMove), removeEventListener("mousemove", this.onDragMove), removeEventListener("touchend", this.onDragEnd), removeEventListener("mouseup", this.onDragEnd);
}, onDragStart(t2) {
  this.beingDragged = true, this.dragPos = { x: G(t2), y: q(t2) }, this.dragStart = G(t2), this.dragRect = this.$el.getBoundingClientRect();
}, onDragMove(t2) {
  this.beingDragged && (t2.preventDefault(), this.isRunning && (this.isRunning = false), this.dragPos = { x: G(t2), y: q(t2) });
}, onDragEnd() {
  this.beingDragged && (Math.abs(this.dragDelta) >= this.removalDistance ? (this.disableTransitions = true, this.$nextTick(() => this.closeToast())) : setTimeout(() => {
    this.beingDragged = false, U(this.dragRect) && this.pauseOnHover && this.dragRect.bottom >= this.dragPos.y && this.dragPos.y >= this.dragRect.top && this.dragRect.left <= this.dragPos.x && this.dragPos.x <= this.dragRect.right ? this.isRunning = false : this.isRunning = true;
  }));
} } }), xt = ["role"];
It.render = function(t2, i2) {
  const l2 = d("Icon"), u2 = d("CloseButton"), T2 = d("ProgressBar");
  return s(), e("div", { class: o(t2.classes), style: n(t2.draggableStyle), onClick: i2[0] || (i2[0] = (...e2) => t2.clickHandler && t2.clickHandler(...e2)), onMouseenter: i2[1] || (i2[1] = (...e2) => t2.hoverPause && t2.hoverPause(...e2)), onMouseleave: i2[2] || (i2[2] = (...e2) => t2.hoverPlay && t2.hoverPlay(...e2)) }, [t2.icon ? (s(), a(l2, { key: 0, "custom-icon": t2.icon, type: t2.type }, null, 8, ["custom-icon", "type"])) : h("v-if", true), p("div", { role: t2.accessibility.toastRole || "alert", class: o(t2.bodyClasses) }, ["string" == typeof t2.content ? (s(), e(m, { key: 0 }, [g(f(t2.content), 1)], 2112)) : (s(), a(c(t2.getVueComponentFromObj(t2.content)), r({ key: 1, "toast-id": t2.id }, t2.hasProp(t2.content, "props") ? t2.content.props : {}, v(t2.hasProp(t2.content, "listeners") ? t2.content.listeners : {}), { onCloseToast: t2.closeToast }), null, 16, ["toast-id", "onCloseToast"]))], 10, xt), t2.closeButton ? (s(), a(u2, { key: 1, component: t2.closeButton, "class-names": t2.closeButtonClassName, "show-on-hover": t2.showCloseButtonOnHover, "aria-label": t2.accessibility.closeButtonLabel, onClick: b(t2.closeToast, ["stop"]) }, null, 8, ["component", "class-names", "show-on-hover", "aria-label", "onClick"])) : h("v-if", true), t2.timeout ? (s(), a(T2, { key: 2, "is-running": t2.isRunning, "hide-progress-bar": t2.hideProgressBar, timeout: t2.timeout, onCloseToast: t2.timeoutHandler }, null, 8, ["is-running", "hide-progress-bar", "timeout", "onCloseToast"])) : h("v-if", true)], 38);
};
var _t = It, Nt = t({ name: "VtTransition", props: rt.TRANSITION, emits: ["leave"], methods: { hasProp: V, leave(t2) {
  t2 instanceof HTMLElement && (t2.style.left = t2.offsetLeft + "px", t2.style.top = t2.offsetTop + "px", t2.style.width = getComputedStyle(t2).width, t2.style.position = "absolute");
} } });
Nt.render = function(t2, e2) {
  return s(), a(T, { tag: "div", "enter-active-class": t2.transition.enter ? t2.transition.enter : `${t2.transition}-enter-active`, "move-class": t2.transition.move ? t2.transition.move : `${t2.transition}-move`, "leave-active-class": t2.transition.leave ? t2.transition.leave : `${t2.transition}-leave-active`, onLeave: t2.leave }, { default: i(() => [D(t2.$slots, "default")]), _: 3 }, 8, ["enter-active-class", "move-class", "leave-active-class", "onLeave"]);
};
var At = t({ name: "VueToastification", devtools: { hide: true }, components: { Toast: _t, VtTransition: Nt }, props: Object.assign({}, rt.CORE_TOAST, rt.CONTAINER, rt.TRANSITION), data: () => ({ count: 0, positions: Object.values(Y), toasts: {}, defaults: {} }), computed: { toastArray() {
  return Object.values(this.toasts);
}, filteredToasts() {
  return this.defaults.filterToasts(this.toastArray);
} }, beforeMount() {
  const t2 = this.eventBus;
  t2.on(J.ADD, this.addToast), t2.on(J.CLEAR, this.clearToasts), t2.on(J.DISMISS, this.dismissToast), t2.on(J.UPDATE, this.updateToast), t2.on(J.UPDATE_DEFAULTS, this.updateDefaults), this.defaults = this.$props;
}, mounted() {
  this.setup(this.container);
}, methods: { async setup(t2) {
  var e2;
  A(t2) && (t2 = await t2()), e2 = this.$el, $(e2.remove) ? e2.parentNode && e2.parentNode.removeChild(e2) : e2.remove(), t2.appendChild(this.$el);
}, setToast(t2) {
  $(t2.id) || (this.toasts[t2.id] = t2);
}, addToast(t2) {
  t2.content = ((t3) => {
    if ("string" == typeof t3) return t3;
    const e3 = V(t3, "props") && F(t3.props) ? t3.props : {}, s3 = V(t3, "listeners") && F(t3.listeners) ? t3.listeners : {};
    return { component: Z(t3), props: e3, listeners: s3 };
  })(t2.content);
  const e2 = Object.assign({}, this.defaults, t2.type && this.defaults.toastDefaults && this.defaults.toastDefaults[t2.type], t2), s2 = this.defaults.filterBeforeCreate(e2, this.toastArray);
  s2 && this.setToast(s2);
}, dismissToast(t2) {
  const e2 = this.toasts[t2];
  $(e2) || $(e2.onClose) || e2.onClose(), delete this.toasts[t2];
}, clearToasts() {
  Object.keys(this.toasts).forEach((t2) => {
    this.dismissToast(t2);
  });
}, getPositionToasts(t2) {
  const e2 = this.filteredToasts.filter((e3) => e3.position === t2).slice(0, this.defaults.maxToasts);
  return this.defaults.newestOnTop ? e2.reverse() : e2;
}, updateDefaults(t2) {
  $(t2.container) || this.setup(t2.container), this.defaults = Object.assign({}, this.defaults, t2);
}, updateToast({ id: t2, options: e2, create: s2 }) {
  this.toasts[t2] ? (e2.timeout && e2.timeout === this.toasts[t2].timeout && e2.timeout++, this.setToast(Object.assign({}, this.toasts[t2], e2))) : s2 && this.addToast(Object.assign({}, { id: t2 }, e2));
}, getClasses(t2) {
  return [`${et}__container`, t2].concat(this.defaults.containerClassName);
} } });
At.render = function(t2, n2) {
  const c2 = d("Toast"), l2 = d("VtTransition");
  return s(), e("div", null, [(s(true), e(m, null, y(t2.positions, (n3) => (s(), e("div", { key: n3 }, [R(l2, { transition: t2.defaults.transition, class: o(t2.getClasses(n3)) }, { default: i(() => [(s(true), e(m, null, y(t2.getPositionToasts(n3), (t3) => (s(), a(c2, r({ key: t3.id }, t3), null, 16))), 128))]), _: 2 }, 1032, ["transition", "class"])]))), 128))]);
};
var Lt = At, jt = (t2 = {}, e2 = true) => {
  const s2 = t2.eventBus = t2.eventBus || new tt();
  e2 && E(() => {
    const e3 = S(Lt, N({}, t2)), s3 = e3.mount(document.createElement("div")), o3 = t2.onMounted;
    if ($(o3) || o3(s3, e3), t2.shareAppContext) {
      const s4 = t2.shareAppContext;
      true === s4 || (e3._context.components = s4._context.components, e3._context.directives = s4._context.directives, e3._context.mixins = s4._context.mixins, e3._context.provides = s4._context.provides, e3.config.globalProperties = s4.config.globalProperties);
    }
  });
  const o2 = (t3, e3) => {
    const o3 = Object.assign({}, { id: z(), type: X.DEFAULT }, e3, { content: t3 });
    return s2.emit(J.ADD, o3), o3.id;
  };
  return o2.clear = () => s2.emit(J.CLEAR, void 0), o2.updateDefaults = (t3) => {
    s2.emit(J.UPDATE_DEFAULTS, t3);
  }, o2.dismiss = (t3) => {
    s2.emit(J.DISMISS, t3);
  }, o2.update = function(t3, { content: e3, options: o3 }, n2 = false) {
    const a2 = Object.assign({}, o3, { content: e3 });
    s2.emit(J.UPDATE, { id: t3, options: a2, create: n2 });
  }, o2.success = (t3, e3) => o2(t3, Object.assign({}, e3, { type: X.SUCCESS })), o2.info = (t3, e3) => o2(t3, Object.assign({}, e3, { type: X.INFO })), o2.error = (t3, e3) => o2(t3, Object.assign({}, e3, { type: X.ERROR })), o2.warning = (t3, e3) => o2(t3, Object.assign({}, e3, { type: X.WARNING })), o2;
};
function $t(t2) {
  return "undefined" == typeof window ? (() => {
    const t3 = () => {
    };
    return new Proxy(t3, { get: () => t3 });
  })() : (e2 = t2, ["on", "off", "emit"].every((t3) => V(e2, t3) && A(e2[t3])) ? jt({ eventBus: t2 }, false) : jt(t2, true));
  var e2;
}
var Ft = Symbol("VueToastification"), Ht = new tt(), Mt = (t2) => {
  const e2 = C() ? O(Ft, void 0) : void 0;
  return e2 || $t(Ht);
}, kt = (t2, e2) => {
  true === (null == e2 ? void 0 : e2.shareAppContext) && (e2.shareAppContext = t2);
  const s2 = $t(N({ eventBus: Ht }, e2));
  t2.provide(Ft, s2);
};
export {
  kt as s,
  Mt as u
};
