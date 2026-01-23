import "./vue-Cw7YYIIs.js";
import { w as e, a2 as t, d as n, $ as o, aa as r, h as a, i, e as s, X as l, C as c, r as u, g as h, D as d, y as p } from "./@vue-2BUk21rv.js";
function f() {
  return "undefined" != typeof navigator && "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : {};
}
const m = "function" == typeof Proxy;
let g, v;
function y() {
  return void 0 !== g || ("undefined" != typeof window && window.performance ? (g = true, v = window.performance) : "undefined" != typeof globalThis && (null === (e2 = globalThis.perf_hooks) || void 0 === e2 ? void 0 : e2.performance) ? (g = true, v = globalThis.perf_hooks.performance) : g = false), g ? v.now() : Date.now();
  var e2;
}
class b {
  constructor(e2, t2) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = e2, this.hook = t2;
    const n2 = {};
    if (e2.settings) for (const t3 in e2.settings) {
      const o3 = e2.settings[t3];
      n2[t3] = o3.defaultValue;
    }
    const o2 = `__vue-devtools-plugin-settings__${e2.id}`;
    let r2 = Object.assign({}, n2);
    try {
      const e3 = localStorage.getItem(o2), t3 = JSON.parse(e3);
      Object.assign(r2, t3);
    } catch (e3) {
    }
    this.fallbacks = { getSettings: () => r2, setSettings(e3) {
      try {
        localStorage.setItem(o2, JSON.stringify(e3));
      } catch (e4) {
      }
      r2 = e3;
    }, now: () => y() }, t2 && t2.on("plugin:settings:set", (e3, t3) => {
      e3 === this.plugin.id && this.fallbacks.setSettings(t3);
    }), this.proxiedOn = new Proxy({}, { get: (e3, t3) => this.target ? this.target.on[t3] : (...e4) => {
      this.onQueue.push({ method: t3, args: e4 });
    } }), this.proxiedTarget = new Proxy({}, { get: (e3, t3) => this.target ? this.target[t3] : "on" === t3 ? this.proxiedOn : Object.keys(this.fallbacks).includes(t3) ? (...e4) => (this.targetQueue.push({ method: t3, args: e4, resolve: () => {
    } }), this.fallbacks[t3](...e4)) : (...e4) => new Promise((n3) => {
      this.targetQueue.push({ method: t3, args: e4, resolve: n3 });
    }) });
  }
  async setRealTarget(e2) {
    this.target = e2;
    for (const e3 of this.onQueue) this.target.on[e3.method](...e3.args);
    for (const e3 of this.targetQueue) e3.resolve(await this.target[e3.method](...e3.args));
  }
}
function _(e2, t2) {
  const n2 = e2, o2 = f(), r2 = f().__VUE_DEVTOOLS_GLOBAL_HOOK__, a2 = m && n2.enableEarlyProxy;
  if (!r2 || !o2.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ && a2) {
    const e3 = a2 ? new b(n2, r2) : null;
    (o2.__VUE_DEVTOOLS_PLUGINS__ = o2.__VUE_DEVTOOLS_PLUGINS__ || []).push({ pluginDescriptor: n2, setupFn: t2, proxy: e3 }), e3 && t2(e3.proxiedTarget);
  } else r2.emit("devtools-plugin:setup", e2, t2);
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const w = "undefined" != typeof document;
function E(e2) {
  return "object" == typeof e2 || "displayName" in e2 || "props" in e2 || "__vccOpts" in e2;
}
const A = Object.assign;
function O(e2, t2) {
  const n2 = {};
  for (const o2 in t2) {
    const r2 = t2[o2];
    n2[o2] = R(r2) ? r2.map(e2) : e2(r2);
  }
  return n2;
}
const I = () => {
}, R = Array.isArray;
function T(e2, t2) {
  const n2 = {};
  for (const o2 in e2) n2[o2] = o2 in t2 ? t2[o2] : e2[o2];
  return n2;
}
function C(e2) {
  Array.from(arguments).slice(1);
}
const S = /#/g, $ = /&/g, k = /\//g, P = /=/g, N = /\?/g, x = /\+/g, D = /%5B/g, L = /%5D/g, G = /%5E/g, j = /%60/g, V = /%7B/g, B = /%7C/g, U = /%7D/g, M = /%20/g;
function W(e2) {
  return null == e2 ? "" : encodeURI("" + e2).replace(B, "|").replace(D, "[").replace(L, "]");
}
function q(e2) {
  return W(e2).replace(x, "%2B").replace(M, "+").replace(S, "%23").replace($, "%26").replace(j, "`").replace(V, "{").replace(U, "}").replace(G, "^");
}
function F(e2) {
  return q(e2).replace(P, "%3D");
}
function H(e2) {
  return (function(e3) {
    return W(e3).replace(S, "%23").replace(N, "%3F");
  })(e2).replace(k, "%2F");
}
function Q(e2) {
  if (null == e2) return null;
  try {
    return decodeURIComponent("" + e2);
  } catch (t2) {
    C(`Error decoding "${e2}". Using original value`);
  }
  return "" + e2;
}
const K = /\/$/;
function z(e2, t2, n2 = "/") {
  let o2, r2 = {}, a2 = "", i2 = "";
  const s2 = t2.indexOf("#");
  let l2 = t2.indexOf("?");
  return l2 = s2 >= 0 && l2 > s2 ? -1 : l2, l2 >= 0 && (o2 = t2.slice(0, l2), a2 = t2.slice(l2, s2 > 0 ? s2 : t2.length), r2 = e2(a2.slice(1))), s2 >= 0 && (o2 = o2 || t2.slice(0, s2), i2 = t2.slice(s2, t2.length)), o2 = (function(e3, t3) {
    if (e3.startsWith("/")) return e3;
    if (!t3.startsWith("/")) return C(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e3}" from "${t3}". It should look like "/${t3}".`), e3;
    if (!e3) return t3;
    const n3 = t3.split("/"), o3 = e3.split("/"), r3 = o3[o3.length - 1];
    ".." !== r3 && "." !== r3 || o3.push("");
    let a3, i3, s3 = n3.length - 1;
    for (a3 = 0; a3 < o3.length; a3++) if (i3 = o3[a3], "." !== i3) {
      if (".." !== i3) break;
      s3 > 1 && s3--;
    }
    return n3.slice(0, s3).join("/") + "/" + o3.slice(a3).join("/");
  })(null != o2 ? o2 : t2, n2), { fullPath: o2 + a2 + i2, path: o2, query: r2, hash: Q(i2) };
}
function J(e2, t2) {
  return t2 && e2.toLowerCase().startsWith(t2.toLowerCase()) ? e2.slice(t2.length) || "/" : e2;
}
function Y(e2, t2, n2) {
  const o2 = t2.matched.length - 1, r2 = n2.matched.length - 1;
  return o2 > -1 && o2 === r2 && X(t2.matched[o2], n2.matched[r2]) && Z(t2.params, n2.params) && e2(t2.query) === e2(n2.query) && t2.hash === n2.hash;
}
function X(e2, t2) {
  return (e2.aliasOf || e2) === (t2.aliasOf || t2);
}
function Z(e2, t2) {
  if (Object.keys(e2).length !== Object.keys(t2).length) return false;
  for (var n2 in e2) if (!ee(e2[n2], t2[n2])) return false;
  return true;
}
function ee(e2, t2) {
  return R(e2) ? te(e2, t2) : R(t2) ? te(t2, e2) : (e2 == null ? void 0 : e2.valueOf()) === (t2 == null ? void 0 : t2.valueOf());
}
function te(e2, t2) {
  return R(t2) ? e2.length === t2.length && e2.every((e3, n2) => e3 === t2[n2]) : 1 === e2.length && e2[0] === t2;
}
const ne = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
let oe = (function(e2) {
  return e2.pop = "pop", e2.push = "push", e2;
})({}), re = (function(e2) {
  return e2.back = "back", e2.forward = "forward", e2.unknown = "", e2;
})({});
function ae(e2) {
  if (!e2) if (w) {
    const t2 = document.querySelector("base");
    e2 = (e2 = t2 && t2.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "");
  } else e2 = "/";
  return "/" !== e2[0] && "#" !== e2[0] && (e2 = "/" + e2), e2.replace(K, "");
}
const ie = /^[^#]+#/;
function se(e2, t2) {
  return e2.replace(ie, "#") + t2;
}
const le = () => ({ left: window.scrollX, top: window.scrollY });
function ce(e2) {
  let t2;
  if ("el" in e2) {
    const n2 = e2.el, o2 = "string" == typeof n2 && n2.startsWith("#");
    if (!("string" != typeof e2.el || o2 && document.getElementById(e2.el.slice(1)))) try {
      const t3 = document.querySelector(e2.el);
      if (o2 && t3) return void C(`The selector "${e2.el}" should be passed as "el: document.querySelector('${e2.el}')" because it starts with "#".`);
    } catch (t3) {
      return void C(`The selector "${e2.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
    }
    const r2 = "string" == typeof n2 ? o2 ? document.getElementById(n2.slice(1)) : document.querySelector(n2) : n2;
    if (!r2) return void C(`Couldn't find element using selector "${e2.el}" returned by scrollBehavior.`);
    t2 = (function(e3, t3) {
      const n3 = document.documentElement.getBoundingClientRect(), o3 = e3.getBoundingClientRect();
      return { behavior: t3.behavior, left: o3.left - n3.left - (t3.left || 0), top: o3.top - n3.top - (t3.top || 0) };
    })(r2, e2);
  } else t2 = e2;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t2) : window.scrollTo(null != t2.left ? t2.left : window.scrollX, null != t2.top ? t2.top : window.scrollY);
}
function ue(e2, t2) {
  return (history.state ? history.state.position - t2 : -1) + e2;
}
const he = /* @__PURE__ */ new Map();
function de(e2) {
  return "string" == typeof e2 || e2 && "object" == typeof e2;
}
function pe(e2) {
  return "string" == typeof e2 || "symbol" == typeof e2;
}
let fe = (function(e2) {
  return e2[e2.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e2[e2.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e2[e2.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e2[e2.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e2[e2.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e2;
})({});
const me = Symbol("navigation failure"), ge = { [fe.MATCHER_NOT_FOUND]: ({ location: e2, currentLocation: t2 }) => `No match for
 ${JSON.stringify(e2)}${t2 ? "\nwhile being at\n" + JSON.stringify(t2) : ""}`, [fe.NAVIGATION_GUARD_REDIRECT]: ({ from: e2, to: t2 }) => `Redirected from "${e2.fullPath}" to "${(function(e3) {
  if ("string" == typeof e3) return e3;
  if (null != e3.path) return e3.path;
  const t3 = {};
  for (const n2 of be) n2 in e3 && (t3[n2] = e3[n2]);
  return JSON.stringify(t3, null, 2);
})(t2)}" via a navigation guard.`, [fe.NAVIGATION_ABORTED]: ({ from: e2, to: t2 }) => `Navigation aborted from "${e2.fullPath}" to "${t2.fullPath}" via a navigation guard.`, [fe.NAVIGATION_CANCELLED]: ({ from: e2, to: t2 }) => `Navigation cancelled from "${e2.fullPath}" to "${t2.fullPath}" with a new navigation.`, [fe.NAVIGATION_DUPLICATED]: ({ from: e2, to: t2 }) => `Avoided redundant navigation to current location: "${e2.fullPath}".` };
function ve(e2, t2) {
  return A(new Error(ge[e2](t2)), { type: e2, [me]: true }, t2);
}
function ye(e2, t2) {
  return e2 instanceof Error && me in e2 && (null == t2 || !!(e2.type & t2));
}
const be = ["params", "query", "hash"];
function _e(e2) {
  const t2 = {};
  if ("" === e2 || "?" === e2) return t2;
  const n2 = ("?" === e2[0] ? e2.slice(1) : e2).split("&");
  for (let e3 = 0; e3 < n2.length; ++e3) {
    const o2 = n2[e3].replace(x, " "), r2 = o2.indexOf("="), a2 = Q(r2 < 0 ? o2 : o2.slice(0, r2)), i2 = r2 < 0 ? null : Q(o2.slice(r2 + 1));
    if (a2 in t2) {
      let e4 = t2[a2];
      R(e4) || (e4 = t2[a2] = [e4]), e4.push(i2);
    } else t2[a2] = i2;
  }
  return t2;
}
function we(e2) {
  let t2 = "";
  for (let n2 in e2) {
    const o2 = e2[n2];
    n2 = F(n2), null != o2 ? (R(o2) ? o2.map((e3) => e3 && q(e3)) : [o2 && q(o2)]).forEach((e3) => {
      void 0 !== e3 && (t2 += (t2.length ? "&" : "") + n2, null != e3 && (t2 += "=" + e3));
    }) : void 0 !== o2 && (t2 += (t2.length ? "&" : "") + n2);
  }
  return t2;
}
function Ee(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const o2 = e2[n2];
    void 0 !== o2 && (t2[n2] = R(o2) ? o2.map((e3) => null == e3 ? null : "" + e3) : null == o2 ? o2 : "" + o2);
  }
  return t2;
}
const Ae = Symbol("router view location matched"), Oe = Symbol("router view depth"), Ie = Symbol("router"), Re = Symbol("route location"), Te = Symbol("router view location");
function Ce() {
  let e2 = [];
  return { add: function(t2) {
    return e2.push(t2), () => {
      const n2 = e2.indexOf(t2);
      n2 > -1 && e2.splice(n2, 1);
    };
  }, list: () => e2.slice(), reset: function() {
    e2 = [];
  } };
}
function Se(e2, t2, n2, o2, r2, a2 = (e3) => e3()) {
  const i2 = o2 && (o2.enterCallbacks[r2] = o2.enterCallbacks[r2] || []);
  return () => new Promise((s2, l2) => {
    const c2 = (e3) => {
      false === e3 ? l2(ve(fe.NAVIGATION_ABORTED, { from: n2, to: t2 })) : e3 instanceof Error ? l2(e3) : de(e3) ? l2(ve(fe.NAVIGATION_GUARD_REDIRECT, { from: t2, to: e3 })) : (i2 && o2.enterCallbacks[r2] === i2 && "function" == typeof e3 && i2.push(e3), s2());
    }, u2 = a2(() => e2.call(o2 && o2.instances[r2], t2, n2, /* @__PURE__ */ (function(e3, t3, n3) {
      let o3 = 0;
      return function() {
        1 === o3++ && C(`The "next" callback was called more than once in one navigation guard when going from "${n3.fullPath}" to "${t3.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e3._called = true, 1 === o3 && e3.apply(null, arguments);
      };
    })(c2, t2, n2)));
    let h2 = Promise.resolve(u2);
    if (e2.length < 3 && (h2 = h2.then(c2)), e2.length > 2) {
      const t3 = `The "next" callback was never called inside of ${e2.name ? '"' + e2.name + '"' : ""}:
${e2.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if ("object" == typeof u2 && "then" in u2) h2 = h2.then((e3) => c2._called ? e3 : (C(t3), Promise.reject(new Error("Invalid navigation guard"))));
      else if (void 0 !== u2 && !c2._called) return C(t3), void l2(new Error("Invalid navigation guard"));
    }
    h2.catch((e3) => l2(e3));
  });
}
function $e(e2, t2, n2, o2, r2 = (e3) => e3()) {
  const a2 = [];
  for (const i2 of e2) {
    i2.components || !i2.children || i2.children.length || C(`Record with path "${i2.path}" is either missing a "component(s)" or "children" property.`);
    for (const e3 in i2.components) {
      let s2 = i2.components[e3];
      if (!s2 || "object" != typeof s2 && "function" != typeof s2) throw C(`Component "${e3}" in record with path "${i2.path}" is not a valid component. Received "${String(s2)}".`), new Error("Invalid route component");
      if ("then" in s2) {
        C(`Component "${e3}" in record with path "${i2.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
        const t3 = s2;
        s2 = () => t3;
      } else s2.__asyncLoader && !s2.__warnedDefineAsync && (s2.__warnedDefineAsync = true, C(`Component "${e3}" in record with path "${i2.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      if ("beforeRouteEnter" === t2 || i2.instances[e3]) if (E(s2)) {
        const l2 = (s2.__vccOpts || s2)[t2];
        l2 && a2.push(Se(l2, n2, o2, i2, e3, r2));
      } else {
        let l2 = s2();
        "catch" in l2 || (C(`Component "${e3}" in record with path "${i2.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l2 = Promise.resolve(l2)), a2.push(() => l2.then((a3) => {
          if (!a3) throw new Error(`Couldn't resolve component "${e3}" at "${i2.path}"`);
          const s3 = (l3 = a3).__esModule || "Module" === l3[Symbol.toStringTag] || l3.default && E(l3.default) ? a3.default : a3;
          var l3;
          i2.mods[e3] = a3, i2.components[e3] = s3;
          const c2 = (s3.__vccOpts || s3)[t2];
          return c2 && Se(c2, n2, o2, i2, e3, r2)();
        }));
      }
    }
  }
  return a2;
}
function ke(e2, t2) {
  const n2 = A({}, e2, { matched: e2.matched.map((e3) => (function(e4, t3) {
    const n3 = {};
    for (const o2 in e4) t3.includes(o2) || (n3[o2] = e4[o2]);
    return n3;
  })(e3, ["instances", "children", "aliasOf"])) });
  return { _custom: { type: null, readOnly: true, display: e2.fullPath, tooltip: t2, value: n2 } };
}
function Pe(e2) {
  return { _custom: { display: e2 } };
}
let Ne = 0;
function xe(t2, n2, o2) {
  if (n2.__hasDevtools) return;
  n2.__hasDevtools = true;
  const r2 = Ne++;
  _({ id: "org.vuejs.router" + (r2 ? "." + r2 : ""), label: "Vue Router", packageName: "vue-router", homepage: "https://router.vuejs.org", logo: "https://router.vuejs.org/logo.png", componentStateTypes: ["Routing"], app: t2 }, (a2) => {
    "function" != typeof a2.now && C("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), a2.on.inspectComponent((e2, t3) => {
      e2.instanceData && e2.instanceData.state.push({ type: "Routing", key: "$route", editable: false, value: ke(n2.currentRoute.value, "Current Route") });
    }), a2.on.visitComponentTree(({ treeNode: e2, componentInstance: t3 }) => {
      if (t3.__vrv_devtools) {
        const n3 = t3.__vrv_devtools;
        e2.tags.push({ label: (n3.name ? `${n3.name.toString()}: ` : "") + n3.path, textColor: 0, tooltip: "This component is rendered by &lt;router-view&gt;", backgroundColor: Le });
      }
      R(t3.__vrl_devtools) && (t3.__devtoolsApi = a2, t3.__vrl_devtools.forEach((t4) => {
        let n3 = t4.route.path, o3 = Be, r3 = "", a3 = 0;
        t4.error ? (n3 = t4.error, o3 = Me, a3 = We) : t4.isExactActive ? (o3 = je, r3 = "This is exactly active") : t4.isActive && (o3 = Ge, r3 = "This link is active"), e2.tags.push({ label: n3, textColor: a3, tooltip: r3, backgroundColor: o3 });
      }));
    }), e(n2.currentRoute, () => {
      c2(), a2.notifyComponentUpdate(), a2.sendInspectorTree(l2), a2.sendInspectorState(l2);
    });
    const i2 = "router:navigations:" + r2;
    a2.addTimelineLayer({ id: i2, label: `Router${r2 ? " " + r2 : ""} Navigations`, color: 4237508 }), n2.onError((e2, t3) => {
      a2.addTimelineEvent({ layerId: i2, event: { title: "Error during Navigation", subtitle: t3.fullPath, logType: "error", time: a2.now(), data: { error: e2 }, groupId: t3.meta.__navigationId } });
    });
    let s2 = 0;
    n2.beforeEach((e2, t3) => {
      const n3 = { guard: Pe("beforeEach"), from: ke(t3, "Current Location during this navigation"), to: ke(e2, "Target location") };
      Object.defineProperty(e2.meta, "__navigationId", { value: s2++ }), a2.addTimelineEvent({ layerId: i2, event: { time: a2.now(), title: "Start of navigation", subtitle: e2.fullPath, data: n3, groupId: e2.meta.__navigationId } });
    }), n2.afterEach((e2, t3, n3) => {
      const o3 = { guard: Pe("afterEach") };
      n3 ? (o3.failure = { _custom: { type: Error, readOnly: true, display: n3 ? n3.message : "", tooltip: "Navigation Failure", value: n3 } }, o3.status = Pe("❌")) : o3.status = Pe("✅"), o3.from = ke(t3, "Current Location during this navigation"), o3.to = ke(e2, "Target location"), a2.addTimelineEvent({ layerId: i2, event: { title: "End of navigation", subtitle: e2.fullPath, time: a2.now(), data: o3, logType: n3 ? "warning" : "default", groupId: e2.meta.__navigationId } });
    });
    const l2 = "router-inspector:" + r2;
    function c2() {
      if (!u2) return;
      const e2 = u2;
      let t3 = o2.getRoutes().filter((e3) => !e3.parent || !e3.parent.record.components);
      t3.forEach(Ke), e2.filter && (t3 = t3.filter((t4) => ze(t4, e2.filter.toLowerCase()))), t3.forEach((e3) => Qe(e3, n2.currentRoute.value)), e2.rootNodes = t3.map(qe);
    }
    let u2;
    a2.addInspector({ id: l2, label: "Routes" + (r2 ? " " + r2 : ""), icon: "book", treeFilterPlaceholder: "Search routes" }), a2.on.getInspectorTree((e2) => {
      u2 = e2, e2.app === t2 && e2.inspectorId === l2 && c2();
    }), a2.on.getInspectorState((e2) => {
      if (e2.app === t2 && e2.inspectorId === l2) {
        const t3 = o2.getRoutes().find((t4) => t4.record.__vd_id === e2.nodeId);
        t3 && (e2.state = { options: De(t3) });
      }
    }), a2.sendInspectorTree(l2), a2.sendInspectorState(l2);
  });
}
function De(e2) {
  const { record: t2 } = e2, n2 = [{ editable: false, key: "path", value: t2.path }];
  return null != t2.name && n2.push({ editable: false, key: "name", value: t2.name }), n2.push({ editable: false, key: "regexp", value: e2.re }), e2.keys.length && n2.push({ editable: false, key: "keys", value: { _custom: { type: null, readOnly: true, display: e2.keys.map((e3) => `${e3.name}${(function(e4) {
    return e4.optional ? e4.repeatable ? "*" : "?" : e4.repeatable ? "+" : "";
  })(e3)}`).join(" "), tooltip: "Param keys", value: e2.keys } } }), null != t2.redirect && n2.push({ editable: false, key: "redirect", value: t2.redirect }), e2.alias.length && n2.push({ editable: false, key: "aliases", value: e2.alias.map((e3) => e3.record.path) }), Object.keys(e2.record.meta).length && n2.push({ editable: false, key: "meta", value: e2.record.meta }), n2.push({ key: "score", editable: false, value: { _custom: { type: null, readOnly: true, display: e2.score.map((e3) => e3.join(", ")).join(" | "), tooltip: "Score used to sort routes", value: e2.score } } }), n2;
}
const Le = 15485081, Ge = 2450411, je = 8702998, Ve = 2282478, Be = 16486972, Ue = 6710886, Me = 16704226, We = 12131356;
function qe(e2) {
  const t2 = [], { record: n2 } = e2;
  null != n2.name && t2.push({ label: String(n2.name), textColor: 0, backgroundColor: Ve }), n2.aliasOf && t2.push({ label: "alias", textColor: 0, backgroundColor: Be }), e2.__vd_match && t2.push({ label: "matches", textColor: 0, backgroundColor: Le }), e2.__vd_exactActive && t2.push({ label: "exact", textColor: 0, backgroundColor: je }), e2.__vd_active && t2.push({ label: "active", textColor: 0, backgroundColor: Ge }), n2.redirect && t2.push({ label: "string" == typeof n2.redirect ? `redirect: ${n2.redirect}` : "redirects", textColor: 16777215, backgroundColor: Ue });
  let o2 = n2.__vd_id;
  return null == o2 && (o2 = String(Fe++), n2.__vd_id = o2), { id: o2, label: n2.path, tags: t2, children: e2.children.map(qe) };
}
let Fe = 0;
const He = /^\/(.*)\/([a-z]*)$/;
function Qe(e2, t2) {
  const n2 = t2.matched.length && X(t2.matched[t2.matched.length - 1], e2.record);
  e2.__vd_exactActive = e2.__vd_active = n2, n2 || (e2.__vd_active = t2.matched.some((t3) => X(t3, e2.record))), e2.children.forEach((e3) => Qe(e3, t2));
}
function Ke(e2) {
  e2.__vd_match = false, e2.children.forEach(Ke);
}
function ze(e2, t2) {
  const n2 = String(e2.re).match(He);
  if (e2.__vd_match = false, !n2 || n2.length < 3) return false;
  if (new RegExp(n2[1].replace(/\$$/, ""), n2[2]).test(t2)) return e2.children.forEach((e3) => ze(e3, t2)), ("/" !== e2.record.path || "/" === t2) && (e2.__vd_match = e2.re.test(t2), true);
  const o2 = e2.record.path.toLowerCase(), r2 = Q(o2);
  return !(t2.startsWith("/") || !r2.includes(t2) && !o2.includes(t2)) || (!(!r2.startsWith(t2) && !o2.startsWith(t2)) || (!(!e2.record.name || !String(e2.record.name).includes(t2)) || e2.children.some((e3) => ze(e3, t2))));
}
function Je(e2, t2) {
  const { pathname: n2, search: o2, hash: r2 } = t2, a2 = e2.indexOf("#");
  if (a2 > -1) {
    let t3 = r2.includes(e2.slice(a2)) ? e2.slice(a2).length : 1, n3 = r2.slice(t3);
    return "/" !== n3[0] && (n3 = "/" + n3), J(n3, "");
  }
  return J(n2, e2) + o2 + r2;
}
function Ye(e2, t2, n2, o2 = false, r2 = false) {
  return { back: e2, current: t2, forward: n2, replaced: o2, position: window.history.length, scroll: r2 ? le() : null };
}
function Xe(e2) {
  const { history: t2, location: n2 } = window, o2 = { value: Je(e2, n2) }, r2 = { value: t2.state };
  function a2(o3, a3, i2) {
    const s2 = e2.indexOf("#"), l2 = s2 > -1 ? (n2.host && document.querySelector("base") ? e2 : e2.slice(s2)) + o3 : location.protocol + "//" + location.host + e2 + o3;
    try {
      t2[i2 ? "replaceState" : "pushState"](a3, "", l2), r2.value = a3;
    } catch (e3) {
      C("Error with push/replace State", e3), n2[i2 ? "replace" : "assign"](l2);
    }
  }
  return r2.value || a2(o2.value, { back: null, current: o2.value, forward: null, position: t2.length - 1, replaced: true, scroll: null }, true), { location: o2, state: r2, push: function(e3, n3) {
    const i2 = A({}, r2.value, t2.state, { forward: e3, scroll: le() });
    t2.state || C("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state"), a2(i2.current, i2, true), a2(e3, A({}, Ye(o2.value, e3, null), { position: i2.position + 1 }, n3), false), o2.value = e3;
  }, replace: function(e3, n3) {
    a2(e3, A({}, t2.state, Ye(r2.value.back, e3, r2.value.forward, true), n3, { position: r2.value.position }), true), o2.value = e3;
  } };
}
function Ze(e2) {
  const t2 = Xe(e2 = ae(e2)), n2 = (function(e3, t3, n3, o3) {
    let r2 = [], a2 = [], i2 = null;
    const s2 = ({ state: a3 }) => {
      const s3 = Je(e3, location), l3 = n3.value, c2 = t3.value;
      let u2 = 0;
      if (a3) {
        if (n3.value = s3, t3.value = a3, i2 && i2 === l3) return void (i2 = null);
        u2 = c2 ? a3.position - c2.position : 0;
      } else o3(s3);
      r2.forEach((e4) => {
        e4(n3.value, l3, { delta: u2, type: oe.pop, direction: u2 ? u2 > 0 ? re.forward : re.back : re.unknown });
      });
    };
    function l2() {
      if ("hidden" === document.visibilityState) {
        const { history: e4 } = window;
        if (!e4.state) return;
        e4.replaceState(A({}, e4.state, { scroll: le() }), "");
      }
    }
    return window.addEventListener("popstate", s2), window.addEventListener("pagehide", l2), document.addEventListener("visibilitychange", l2), { pauseListeners: function() {
      i2 = n3.value;
    }, listen: function(e4) {
      r2.push(e4);
      const t4 = () => {
        const t5 = r2.indexOf(e4);
        t5 > -1 && r2.splice(t5, 1);
      };
      return a2.push(t4), t4;
    }, destroy: function() {
      for (const e4 of a2) e4();
      a2 = [], window.removeEventListener("popstate", s2), window.removeEventListener("pagehide", l2), document.removeEventListener("visibilitychange", l2);
    } };
  })(e2, t2.state, t2.location, t2.replace);
  const o2 = A({ location: "", base: e2, go: function(e3, t3 = true) {
    t3 || n2.pauseListeners(), history.go(e3);
  }, createHref: se.bind(null, e2) }, t2, n2);
  return Object.defineProperty(o2, "location", { enumerable: true, get: () => t2.location.value }), Object.defineProperty(o2, "state", { enumerable: true, get: () => t2.state.value }), o2;
}
function et(e2) {
  return (e2 = location.host ? e2 || location.pathname + location.search : "").includes("#") || (e2 += "#"), e2.endsWith("#/") || e2.endsWith("#") || C(`A hash base must end with a "#":
"${e2}" should be "${e2.replace(/#.*$/, "#")}".`), Ze(e2);
}
let tt = (function(e2) {
  return e2[e2.Static = 0] = "Static", e2[e2.Param = 1] = "Param", e2[e2.Group = 2] = "Group", e2;
})({});
var nt = (function(e2) {
  return e2[e2.Static = 0] = "Static", e2[e2.Param = 1] = "Param", e2[e2.ParamRegExp = 2] = "ParamRegExp", e2[e2.ParamRegExpEnd = 3] = "ParamRegExpEnd", e2[e2.EscapeNext = 4] = "EscapeNext", e2;
})(nt || {});
const ot = { type: tt.Static, value: "" }, rt = /[a-zA-Z0-9_]/;
const at = "[^/]+?", it = { sensitive: false, strict: false, start: true, end: true };
var st = (function(e2) {
  return e2[e2._multiplier = 10] = "_multiplier", e2[e2.Root = 90] = "Root", e2[e2.Segment = 40] = "Segment", e2[e2.SubSegment = 30] = "SubSegment", e2[e2.Static = 40] = "Static", e2[e2.Dynamic = 20] = "Dynamic", e2[e2.BonusCustomRegExp = 10] = "BonusCustomRegExp", e2[e2.BonusWildcard = -50] = "BonusWildcard", e2[e2.BonusRepeatable = -20] = "BonusRepeatable", e2[e2.BonusOptional = -8] = "BonusOptional", e2[e2.BonusStrict = 0.7000000000000001] = "BonusStrict", e2[e2.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e2;
})(st || {});
const lt = /[.+*?^${}()[\]/\\]/g;
function ct(e2, t2) {
  let n2 = 0;
  for (; n2 < e2.length && n2 < t2.length; ) {
    const o2 = t2[n2] - e2[n2];
    if (o2) return o2;
    n2++;
  }
  return e2.length < t2.length ? 1 === e2.length && e2[0] === st.Static + st.Segment ? -1 : 1 : e2.length > t2.length ? 1 === t2.length && t2[0] === st.Static + st.Segment ? 1 : -1 : 0;
}
function ut(e2, t2) {
  let n2 = 0;
  const o2 = e2.score, r2 = t2.score;
  for (; n2 < o2.length && n2 < r2.length; ) {
    const e3 = ct(o2[n2], r2[n2]);
    if (e3) return e3;
    n2++;
  }
  if (1 === Math.abs(r2.length - o2.length)) {
    if (ht(o2)) return 1;
    if (ht(r2)) return -1;
  }
  return r2.length - o2.length;
}
function ht(e2) {
  const t2 = e2[e2.length - 1];
  return e2.length > 0 && t2[t2.length - 1] < 0;
}
const dt = { strict: false, end: true, sensitive: false };
function pt(e2, t2, n2) {
  const o2 = (function(e3, t3) {
    const n3 = A({}, it, t3), o3 = [];
    let r3 = n3.start ? "^" : "";
    const a2 = [];
    for (const t4 of e3) {
      const e4 = t4.length ? [] : [st.Root];
      n3.strict && !t4.length && (r3 += "/");
      for (let o4 = 0; o4 < t4.length; o4++) {
        const i3 = t4[o4];
        let s2 = st.Segment + (n3.sensitive ? st.BonusCaseSensitive : 0);
        if (i3.type === tt.Static) o4 || (r3 += "/"), r3 += i3.value.replace(lt, "\\$&"), s2 += st.Static;
        else if (i3.type === tt.Param) {
          const { value: e5, repeatable: n4, optional: l2, regexp: c2 } = i3;
          a2.push({ name: e5, repeatable: n4, optional: l2 });
          const u2 = c2 || at;
          u2 !== at && (s2 += st.BonusCustomRegExp);
          let h2 = n4 ? `((?:${u2})(?:/(?:${u2}))*)` : `(${u2})`;
          o4 || (h2 = l2 && t4.length < 2 ? `(?:/${h2})` : "/" + h2), l2 && (h2 += "?"), r3 += h2, s2 += st.Dynamic, l2 && (s2 += st.BonusOptional), n4 && (s2 += st.BonusRepeatable), ".*" === u2 && (s2 += st.BonusWildcard);
        }
        e4.push(s2);
      }
      o3.push(e4);
    }
    if (n3.strict && n3.end) {
      const e4 = o3.length - 1;
      o3[e4][o3[e4].length - 1] += st.BonusStrict;
    }
    n3.strict || (r3 += "/?"), n3.end ? r3 += "$" : n3.strict && !r3.endsWith("/") && (r3 += "(?:/|$)");
    const i2 = new RegExp(r3, n3.sensitive ? "" : "i");
    return { re: i2, score: o3, keys: a2, parse: function(e4) {
      const t4 = e4.match(i2), n4 = {};
      if (!t4) return null;
      for (let e5 = 1; e5 < t4.length; e5++) {
        const o4 = t4[e5] || "", r4 = a2[e5 - 1];
        n4[r4.name] = o4 && r4.repeatable ? o4.split("/") : o4;
      }
      return n4;
    }, stringify: function(t4) {
      let n4 = "", o4 = false;
      for (const r4 of e3) {
        o4 && n4.endsWith("/") || (n4 += "/"), o4 = false;
        for (const e4 of r4) if (e4.type === tt.Static) n4 += e4.value;
        else if (e4.type === tt.Param) {
          const { value: a3, repeatable: i3, optional: s2 } = e4, l2 = a3 in t4 ? t4[a3] : "";
          if (R(l2) && !i3) throw new Error(`Provided param "${a3}" is an array but it is not repeatable (* or + modifiers)`);
          const c2 = R(l2) ? l2.join("/") : l2;
          if (!c2) {
            if (!s2) throw new Error(`Missing required param "${a3}"`);
            r4.length < 2 && (n4.endsWith("/") ? n4 = n4.slice(0, -1) : o4 = true);
          }
          n4 += c2;
        }
      }
      return n4 || "/";
    } };
  })((function(e3) {
    if (!e3) return [[]];
    if ("/" === e3) return [[ot]];
    if (!e3.startsWith("/")) throw new Error(`Route paths should start with a "/": "${e3}" should be "/${e3}".`);
    function t3(e4) {
      throw new Error(`ERR (${n3})/"${c2}": ${e4}`);
    }
    let n3 = nt.Static, o3 = n3;
    const r3 = [];
    let a2;
    function i2() {
      a2 && r3.push(a2), a2 = [];
    }
    let s2, l2 = 0, c2 = "", u2 = "";
    function h2() {
      c2 && (n3 === nt.Static ? a2.push({ type: tt.Static, value: c2 }) : n3 === nt.Param || n3 === nt.ParamRegExp || n3 === nt.ParamRegExpEnd ? (a2.length > 1 && ("*" === s2 || "+" === s2) && t3(`A repeatable param (${c2}) must be alone in its segment. eg: '/:ids+.`), a2.push({ type: tt.Param, value: c2, regexp: u2, repeatable: "*" === s2 || "+" === s2, optional: "*" === s2 || "?" === s2 })) : t3("Invalid state to consume buffer"), c2 = "");
    }
    function d2() {
      c2 += s2;
    }
    for (; l2 < e3.length; ) if (s2 = e3[l2++], "\\" !== s2 || n3 === nt.ParamRegExp) switch (n3) {
      case nt.Static:
        "/" === s2 ? (c2 && h2(), i2()) : ":" === s2 ? (h2(), n3 = nt.Param) : d2();
        break;
      case nt.EscapeNext:
        d2(), n3 = o3;
        break;
      case nt.Param:
        "(" === s2 ? n3 = nt.ParamRegExp : rt.test(s2) ? d2() : (h2(), n3 = nt.Static, "*" !== s2 && "?" !== s2 && "+" !== s2 && l2--);
        break;
      case nt.ParamRegExp:
        ")" === s2 ? "\\" == u2[u2.length - 1] ? u2 = u2.slice(0, -1) + s2 : n3 = nt.ParamRegExpEnd : u2 += s2;
        break;
      case nt.ParamRegExpEnd:
        h2(), n3 = nt.Static, "*" !== s2 && "?" !== s2 && "+" !== s2 && l2--, u2 = "";
        break;
      default:
        t3("Unknown state");
    }
    else o3 = n3, n3 = nt.EscapeNext;
    return n3 === nt.ParamRegExp && t3(`Unfinished custom RegExp for param "${c2}"`), h2(), i2(), r3;
  })(e2.path), n2);
  {
    const t3 = /* @__PURE__ */ new Set();
    for (const n3 of o2.keys) t3.has(n3.name) && C(`Found duplicated params with name "${n3.name}" for path "${e2.path}". Only the last one will be available on "$route.params".`), t3.add(n3.name);
  }
  const r2 = A(o2, { record: e2, parent: t2, children: [], alias: [] });
  return t2 && !r2.record.aliasOf == !t2.record.aliasOf && t2.children.push(r2), r2;
}
function ft(e2, t2) {
  const n2 = [], o2 = /* @__PURE__ */ new Map();
  function r2(e3, n3, o3) {
    const s2 = !o3, l2 = gt(e3);
    !(function(e4, t3) {
      t3 && t3.record.name && !e4.name && !e4.path && C(`The route named "${String(t3.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
    })(l2, n3), l2.aliasOf = o3 && o3.record;
    const c2 = T(t2, e3), u2 = [l2];
    if ("alias" in e3) {
      const t3 = "string" == typeof e3.alias ? [e3.alias] : e3.alias;
      for (const e4 of t3) u2.push(gt(A({}, l2, { components: o3 ? o3.record.components : l2.components, path: e4, aliasOf: o3 ? o3.record : l2 })));
    }
    let h2, d2;
    for (const t3 of u2) {
      const { path: u3 } = t3;
      if (n3 && "/" !== u3[0]) {
        const e4 = n3.record.path, o4 = "/" === e4[e4.length - 1] ? "" : "/";
        t3.path = n3.record.path + (u3 && o4 + u3);
      }
      if ("*" === t3.path) throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.');
      if (h2 = pt(t3, n3, c2), n3 && "/" === u3[0] && At(h2, n3), o3 ? (o3.alias.push(h2), wt(o3, h2)) : (d2 = d2 || h2, d2 !== h2 && d2.alias.push(h2), s2 && e3.name && !yt(h2) && (Et(e3, n3), a2(e3.name))), Ot(h2) && i2(h2), l2.children) {
        const e4 = l2.children;
        for (let t4 = 0; t4 < e4.length; t4++) r2(e4[t4], h2, o3 && o3.children[t4]);
      }
      o3 = o3 || h2;
    }
    return d2 ? () => {
      a2(d2);
    } : I;
  }
  function a2(e3) {
    if (pe(e3)) {
      const t3 = o2.get(e3);
      t3 && (o2.delete(e3), n2.splice(n2.indexOf(t3), 1), t3.children.forEach(a2), t3.alias.forEach(a2));
    } else {
      const t3 = n2.indexOf(e3);
      t3 > -1 && (n2.splice(t3, 1), e3.record.name && o2.delete(e3.record.name), e3.children.forEach(a2), e3.alias.forEach(a2));
    }
  }
  function i2(e3) {
    const t3 = (function(e4, t4) {
      let n3 = 0, o3 = t4.length;
      for (; n3 !== o3; ) {
        const r4 = n3 + o3 >> 1;
        ut(e4, t4[r4]) < 0 ? o3 = r4 : n3 = r4 + 1;
      }
      const r3 = (function(e5) {
        let t5 = e5;
        for (; t5 = t5.parent; ) if (Ot(t5) && 0 === ut(e5, t5)) return t5;
      })(e4);
      r3 && (o3 = t4.lastIndexOf(r3, o3 - 1), o3 < 0 && C(`Finding ancestor route "${r3.record.path}" failed for "${e4.record.path}"`));
      return o3;
    })(e3, n2);
    n2.splice(t3, 0, e3), e3.record.name && !yt(e3) && o2.set(e3.record.name, e3);
  }
  return t2 = T(dt, t2), e2.forEach((e3) => r2(e3)), { addRoute: r2, resolve: function(e3, t3) {
    let r3, a3, i3, s2 = {};
    if ("name" in e3 && e3.name) {
      if (r3 = o2.get(e3.name), !r3) throw ve(fe.MATCHER_NOT_FOUND, { location: e3 });
      {
        const t4 = Object.keys(e3.params || {}).filter((e4) => !r3.keys.find((t5) => t5.name === e4));
        t4.length && C(`Discarded invalid param(s) "${t4.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      i3 = r3.record.name, s2 = A(mt(t3.params, r3.keys.filter((e4) => !e4.optional).concat(r3.parent ? r3.parent.keys.filter((e4) => e4.optional) : []).map((e4) => e4.name)), e3.params && mt(e3.params, r3.keys.map((e4) => e4.name))), a3 = r3.stringify(s2);
    } else if (null != e3.path) a3 = e3.path, a3.startsWith("/") || C(`The Matcher cannot resolve relative paths but received "${a3}". Unless you directly called \`matcher.resolve("${a3}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), r3 = n2.find((e4) => e4.re.test(a3)), r3 && (s2 = r3.parse(a3), i3 = r3.record.name);
    else {
      if (r3 = t3.name ? o2.get(t3.name) : n2.find((e4) => e4.re.test(t3.path)), !r3) throw ve(fe.MATCHER_NOT_FOUND, { location: e3, currentLocation: t3 });
      i3 = r3.record.name, s2 = A({}, t3.params, e3.params), a3 = r3.stringify(s2);
    }
    const l2 = [];
    let c2 = r3;
    for (; c2; ) l2.unshift(c2.record), c2 = c2.parent;
    return { name: i3, path: a3, params: s2, matched: l2, meta: bt(l2) };
  }, removeRoute: a2, clearRoutes: function() {
    n2.length = 0, o2.clear();
  }, getRoutes: function() {
    return n2;
  }, getRecordMatcher: function(e3) {
    return o2.get(e3);
  } };
}
function mt(e2, t2) {
  const n2 = {};
  for (const o2 of t2) o2 in e2 && (n2[o2] = e2[o2]);
  return n2;
}
function gt(e2) {
  const t2 = { path: e2.path, redirect: e2.redirect, name: e2.name, meta: e2.meta || {}, aliasOf: e2.aliasOf, beforeEnter: e2.beforeEnter, props: vt(e2), children: e2.children || [], instances: {}, leaveGuards: /* @__PURE__ */ new Set(), updateGuards: /* @__PURE__ */ new Set(), enterCallbacks: {}, components: "components" in e2 ? e2.components || null : e2.component && { default: e2.component } };
  return Object.defineProperty(t2, "mods", { value: {} }), t2;
}
function vt(e2) {
  const t2 = {}, n2 = e2.props || false;
  if ("component" in e2) t2.default = n2;
  else for (const o2 in e2.components) t2[o2] = "object" == typeof n2 ? n2[o2] : n2;
  return t2;
}
function yt(e2) {
  for (; e2; ) {
    if (e2.record.aliasOf) return true;
    e2 = e2.parent;
  }
  return false;
}
function bt(e2) {
  return e2.reduce((e3, t2) => A(e3, t2.meta), {});
}
function _t(e2, t2) {
  return e2.name === t2.name && e2.optional === t2.optional && e2.repeatable === t2.repeatable;
}
function wt(e2, t2) {
  for (const n2 of e2.keys) if (!n2.optional && !t2.keys.find(_t.bind(null, n2))) return C(`Alias "${t2.record.path}" and the original record: "${e2.record.path}" must have the exact same param named "${n2.name}"`);
  for (const n2 of t2.keys) if (!n2.optional && !e2.keys.find(_t.bind(null, n2))) return C(`Alias "${t2.record.path}" and the original record: "${e2.record.path}" must have the exact same param named "${n2.name}"`);
}
function Et(e2, t2) {
  for (let n2 = t2; n2; n2 = n2.parent) if (n2.record.name === e2.name) throw new Error(`A route named "${String(e2.name)}" has been added as a ${t2 === n2 ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function At(e2, t2) {
  for (const n2 of t2.keys) if (!e2.keys.find(_t.bind(null, n2))) return C(`Absolute path "${e2.record.path}" must have the exact same param named "${n2.name}" as its parent "${t2.record.path}".`);
}
function Ot({ record: e2 }) {
  return !!(e2.name || e2.components && Object.keys(e2.components).length || e2.redirect);
}
function It(e2) {
  const t2 = i(Ie), n2 = i(Re);
  let r2 = false, a2 = null;
  const l2 = s(() => {
    const n3 = o(e2.to);
    return r2 && n3 === a2 || (de(n3) || (r2 ? C('Invalid value for prop "to" in useLink()\n- to:', n3, "\n- previous to:", a2, "\n- props:", e2) : C('Invalid value for prop "to" in useLink()\n- to:', n3, "\n- props:", e2)), a2 = n3, r2 = true), t2.resolve(n3);
  }), c2 = s(() => {
    const { matched: e3 } = l2.value, { length: t3 } = e3, o2 = e3[t3 - 1], r3 = n2.matched;
    if (!o2 || !r3.length) return -1;
    const a3 = r3.findIndex(X.bind(null, o2));
    if (a3 > -1) return a3;
    const i2 = Tt(e3[t3 - 2]);
    return t3 > 1 && Tt(o2) === i2 && r3[r3.length - 1].path !== i2 ? r3.findIndex(X.bind(null, e3[t3 - 2])) : a3;
  }), u2 = s(() => c2.value > -1 && (function(e3, t3) {
    for (const n3 in t3) {
      const o2 = t3[n3], r3 = e3[n3];
      if ("string" == typeof o2) {
        if (o2 !== r3) return false;
      } else if (!R(r3) || r3.length !== o2.length || o2.some((e4, t4) => e4.valueOf() !== r3[t4].valueOf())) return false;
    }
    return true;
  })(n2.params, l2.value.params)), d2 = s(() => c2.value > -1 && c2.value === n2.matched.length - 1 && Z(n2.params, l2.value.params));
  if (w) {
    const t3 = h();
    if (t3) {
      const n3 = { route: l2.value, isActive: u2.value, isExactActive: d2.value, error: null };
      t3.__vrl_devtools = t3.__vrl_devtools || [], t3.__vrl_devtools.push(n3), p(() => {
        n3.route = l2.value, n3.isActive = u2.value, n3.isExactActive = d2.value, n3.error = de(o(e2.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return { route: l2, href: s(() => l2.value.href), isActive: u2, isExactActive: d2, navigate: function(n3 = {}) {
    if ((function(e3) {
      if (e3.metaKey || e3.altKey || e3.ctrlKey || e3.shiftKey) return;
      if (e3.defaultPrevented) return;
      if (void 0 !== e3.button && 0 !== e3.button) return;
      if (e3.currentTarget && e3.currentTarget.getAttribute) {
        const t3 = e3.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t3)) return;
      }
      e3.preventDefault && e3.preventDefault();
      return true;
    })(n3)) {
      const n4 = t2[o(e2.replace) ? "replace" : "push"](o(e2.to)).catch(I);
      return e2.viewTransition && "undefined" != typeof document && "startViewTransition" in document && document.startViewTransition(() => n4), n4;
    }
    return Promise.resolve();
  } };
}
const Rt = n({ name: "RouterLink", compatConfig: { MODE: 3 }, props: { to: { type: [String, Object], required: true }, replace: Boolean, activeClass: String, exactActiveClass: String, custom: Boolean, ariaCurrentValue: { type: String, default: "page" }, viewTransition: Boolean }, useLink: It, setup(e2, { slots: t2 }) {
  const n2 = a(It(e2)), { options: o2 } = i(Ie), r2 = s(() => ({ [Ct(e2.activeClass, o2.linkActiveClass, "router-link-active")]: n2.isActive, [Ct(e2.exactActiveClass, o2.linkExactActiveClass, "router-link-exact-active")]: n2.isExactActive }));
  return () => {
    const o3 = t2.default && (1 === (a2 = t2.default(n2)).length ? a2[0] : a2);
    var a2;
    return e2.custom ? o3 : l("a", { "aria-current": n2.isExactActive ? e2.ariaCurrentValue : null, href: n2.href, onClick: n2.navigate, class: r2.value }, o3);
  };
} });
function Tt(e2) {
  return e2 ? e2.aliasOf ? e2.aliasOf.path : e2.path : "";
}
const Ct = (e2, t2, n2) => null != e2 ? e2 : null != t2 ? t2 : n2;
function St(e2, t2) {
  if (!e2) return null;
  const n2 = e2(t2);
  return 1 === n2.length ? n2[0] : n2;
}
const $t = n({ name: "RouterView", inheritAttrs: false, props: { name: { type: String, default: "default" }, route: Object }, compatConfig: { MODE: 3 }, setup(t2, { attrs: n2, slots: r2 }) {
  !(function() {
    const e2 = h(), t3 = e2.parent && e2.parent.type.name, n3 = e2.parent && e2.parent.subTree && e2.parent.subTree.type;
    if (t3 && ("KeepAlive" === t3 || t3.includes("Transition")) && "object" == typeof n3 && "RouterView" === n3.name) {
      const e3 = "KeepAlive" === t3 ? "keep-alive" : "transition";
      C(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${e3}>
    <component :is="Component" />
  </${e3}>
</router-view>`);
    }
  })();
  const a2 = i(Te), d2 = s(() => t2.route || a2.value), p2 = i(Oe, 0), f2 = s(() => {
    let e2 = o(p2);
    const { matched: t3 } = d2.value;
    let n3;
    for (; (n3 = t3[e2]) && !n3.components; ) e2++;
    return e2;
  }), m2 = s(() => d2.value.matched[f2.value]);
  c(Oe, s(() => f2.value + 1)), c(Ae, m2), c(Te, d2);
  const g2 = u();
  return e(() => [g2.value, m2.value, t2.name], ([e2, t3, n3], [o2, r3, a3]) => {
    t3 && (t3.instances[n3] = e2, r3 && r3 !== t3 && e2 && e2 === o2 && (t3.leaveGuards.size || (t3.leaveGuards = r3.leaveGuards), t3.updateGuards.size || (t3.updateGuards = r3.updateGuards))), !e2 || !t3 || r3 && X(t3, r3) && o2 || (t3.enterCallbacks[n3] || []).forEach((t4) => t4(e2));
  }, { flush: "post" }), () => {
    const e2 = d2.value, o2 = t2.name, a3 = m2.value, i2 = a3 && a3.components[o2];
    if (!i2) return St(r2.default, { Component: i2, route: e2 });
    const s2 = a3.props[o2], c2 = s2 ? true === s2 ? e2.params : "function" == typeof s2 ? s2(e2) : s2 : null, u2 = l(i2, A({}, c2, n2, { onVnodeUnmounted: (e3) => {
      e3.component.isUnmounted && (a3.instances[o2] = null);
    }, ref: g2 }));
    if (w && u2.ref) {
      const e3 = { depth: f2.value, name: a3.name, path: a3.path, meta: a3.meta };
      (R(u2.ref) ? u2.ref.map((e4) => e4.i) : [u2.ref.i]).forEach((t3) => {
        t3.__vrv_devtools = e3;
      });
    }
    return St(r2.default, { Component: u2, route: e2 }) || u2;
  };
} });
function kt(e2) {
  const n2 = ft(e2.routes, e2), a2 = e2.parseQuery || _e, i2 = e2.stringifyQuery || we, s2 = e2.history;
  if (!s2) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const l2 = Ce(), c2 = Ce(), u2 = Ce(), h2 = t(ne);
  let p2 = ne;
  w && e2.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f2 = O.bind(null, (e3) => "" + e3), m2 = O.bind(null, H), g2 = O.bind(null, Q);
  function v2(e3, t2) {
    if (t2 = A({}, t2 || h2.value), "string" == typeof e3) {
      const o3 = z(a2, e3, t2.path), r3 = n2.resolve({ path: o3.path }, t2), i3 = s2.createHref(o3.fullPath);
      return i3.startsWith("//") ? C(`Location "${e3}" resolved to "${i3}". A resolved location cannot start with multiple slashes.`) : r3.matched.length || C(`No match found for location with path "${e3}"`), A(o3, r3, { params: g2(r3.params), hash: Q(o3.hash), redirectedFrom: void 0, href: i3 });
    }
    if (!de(e3)) return C("router.resolve() was passed an invalid location. This will fail in production.\n- Location:", e3), v2({});
    let o2;
    if (null != e3.path) "params" in e3 && !("name" in e3) && Object.keys(e3.params).length && C(`Path "${e3.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), o2 = A({}, e3, { path: z(a2, e3.path, t2.path).path });
    else {
      const n3 = A({}, e3.params);
      for (const e4 in n3) null == n3[e4] && delete n3[e4];
      o2 = A({}, e3, { params: m2(n3) }), t2.params = m2(t2.params);
    }
    const r2 = n2.resolve(o2, t2), l3 = e3.hash || "";
    l3 && !l3.startsWith("#") && C(`A \`hash\` should always start with the character "#". Replace "${l3}" with "#${l3}".`), r2.params = f2(g2(r2.params));
    const c3 = (function(e4, t3) {
      const n3 = t3.query ? e4(t3.query) : "";
      return t3.path + (n3 && "?") + n3 + (t3.hash || "");
    })(i2, A({}, e3, { hash: (u3 = l3, W(u3).replace(V, "{").replace(U, "}").replace(G, "^")), path: r2.path }));
    var u3;
    const d2 = s2.createHref(c3);
    return d2.startsWith("//") ? C(`Location "${e3}" resolved to "${d2}". A resolved location cannot start with multiple slashes.`) : r2.matched.length || C(`No match found for location with path "${null != e3.path ? e3.path : e3}"`), A({ fullPath: c3, hash: l3, query: i2 === we ? Ee(e3.query) : e3.query || {} }, r2, { redirectedFrom: void 0, href: d2 });
  }
  function y2(e3) {
    return "string" == typeof e3 ? z(a2, e3, h2.value.path) : A({}, e3);
  }
  function b2(e3, t2) {
    if (p2 !== e3) return ve(fe.NAVIGATION_CANCELLED, { from: t2, to: e3 });
  }
  function _2(e3) {
    return T2(e3);
  }
  function E2(e3, t2) {
    const n3 = e3.matched[e3.matched.length - 1];
    if (n3 && n3.redirect) {
      const { redirect: o2 } = n3;
      let r2 = "function" == typeof o2 ? o2(e3, t2) : o2;
      if ("string" == typeof r2 && (r2 = r2.includes("?") || r2.includes("#") ? r2 = y2(r2) : { path: r2 }, r2.params = {}), null == r2.path && !("name" in r2)) throw C(`Invalid redirect found:
${JSON.stringify(r2, null, 2)}
 when navigating to "${e3.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return A({ query: e3.query, hash: e3.hash, params: null != r2.path ? {} : e3.params }, r2);
    }
  }
  function T2(e3, t2) {
    const n3 = p2 = v2(e3), o2 = h2.value, r2 = e3.state, a3 = e3.force, s3 = true === e3.replace, l3 = E2(n3, o2);
    if (l3) return T2(A(y2(l3), { state: "object" == typeof l3 ? A({}, r2, l3.state) : r2, force: a3, replace: s3 }), t2 || n3);
    const c3 = n3;
    let u3;
    return c3.redirectedFrom = t2, !a3 && Y(i2, o2, n3) && (u3 = ve(fe.NAVIGATION_DUPLICATED, { to: c3, from: o2 }), F2(o2, o2, true, false)), (u3 ? Promise.resolve(u3) : k2(c3, o2)).catch((e4) => ye(e4) ? ye(e4, fe.NAVIGATION_GUARD_REDIRECT) ? e4 : q2(e4) : M2(e4, c3, o2)).then((e4) => {
      if (e4) {
        if (ye(e4, fe.NAVIGATION_GUARD_REDIRECT)) return Y(i2, v2(e4.to), c3) && t2 && (t2._count = t2._count ? t2._count + 1 : 1) > 30 ? (C(`Detected a possibly infinite redirection in a navigation guard when going from "${o2.fullPath}" to "${c3.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : T2(A({ replace: s3 }, y2(e4.to), { state: "object" == typeof e4.to ? A({}, r2, e4.to.state) : r2, force: a3 }), t2 || c3);
      } else e4 = N2(c3, o2, true, s3, r2);
      return P2(c3, o2, e4), e4;
    });
  }
  function S2(e3, t2) {
    const n3 = b2(e3, t2);
    return n3 ? Promise.reject(n3) : Promise.resolve();
  }
  function $2(e3) {
    const t2 = Z2.values().next().value;
    return t2 && "function" == typeof t2.runWithContext ? t2.runWithContext(e3) : e3();
  }
  function k2(e3, t2) {
    let n3;
    const [o2, r2, a3] = (function(e4, t3) {
      const n4 = [], o3 = [], r3 = [], a4 = Math.max(t3.matched.length, e4.matched.length);
      for (let i4 = 0; i4 < a4; i4++) {
        const a5 = t3.matched[i4];
        a5 && (e4.matched.find((e5) => X(e5, a5)) ? o3.push(a5) : n4.push(a5));
        const s3 = e4.matched[i4];
        s3 && (t3.matched.find((e5) => X(e5, s3)) || r3.push(s3));
      }
      return [n4, o3, r3];
    })(e3, t2);
    n3 = $e(o2.reverse(), "beforeRouteLeave", e3, t2);
    for (const r3 of o2) r3.leaveGuards.forEach((o3) => {
      n3.push(Se(o3, e3, t2));
    });
    const i3 = S2.bind(null, e3, t2);
    return n3.push(i3), te2(n3).then(() => {
      n3 = [];
      for (const o3 of l2.list()) n3.push(Se(o3, e3, t2));
      return n3.push(i3), te2(n3);
    }).then(() => {
      n3 = $e(r2, "beforeRouteUpdate", e3, t2);
      for (const o3 of r2) o3.updateGuards.forEach((o4) => {
        n3.push(Se(o4, e3, t2));
      });
      return n3.push(i3), te2(n3);
    }).then(() => {
      n3 = [];
      for (const o3 of a3) if (o3.beforeEnter) if (R(o3.beforeEnter)) for (const r3 of o3.beforeEnter) n3.push(Se(r3, e3, t2));
      else n3.push(Se(o3.beforeEnter, e3, t2));
      return n3.push(i3), te2(n3);
    }).then(() => (e3.matched.forEach((e4) => e4.enterCallbacks = {}), n3 = $e(a3, "beforeRouteEnter", e3, t2, $2), n3.push(i3), te2(n3))).then(() => {
      n3 = [];
      for (const o3 of c2.list()) n3.push(Se(o3, e3, t2));
      return n3.push(i3), te2(n3);
    }).catch((e4) => ye(e4, fe.NAVIGATION_CANCELLED) ? e4 : Promise.reject(e4));
  }
  function P2(e3, t2, n3) {
    u2.list().forEach((o2) => $2(() => o2(e3, t2, n3)));
  }
  function N2(e3, t2, n3, o2, r2) {
    const a3 = b2(e3, t2);
    if (a3) return a3;
    const i3 = t2 === ne, l3 = w ? history.state : {};
    n3 && (o2 || i3 ? s2.replace(e3.fullPath, A({ scroll: i3 && l3 && l3.scroll }, r2)) : s2.push(e3.fullPath, r2)), h2.value = e3, F2(e3, t2, n3, i3), q2();
  }
  let x2;
  function D2() {
    x2 || (x2 = s2.listen((e3, t2, n3) => {
      if (!ee2.listening) return;
      const o2 = v2(e3), r2 = E2(o2, ee2.currentRoute.value);
      if (r2) return void T2(A(r2, { replace: true, force: true }), o2).catch(I);
      p2 = o2;
      const a3 = h2.value;
      var i3, l3;
      w && (i3 = ue(a3.fullPath, n3.delta), l3 = le(), he.set(i3, l3)), k2(o2, a3).catch((e4) => ye(e4, fe.NAVIGATION_ABORTED | fe.NAVIGATION_CANCELLED) ? e4 : ye(e4, fe.NAVIGATION_GUARD_REDIRECT) ? (T2(A(y2(e4.to), { force: true }), o2).then((e5) => {
        ye(e5, fe.NAVIGATION_ABORTED | fe.NAVIGATION_DUPLICATED) && !n3.delta && n3.type === oe.pop && s2.go(-1, false);
      }).catch(I), Promise.reject()) : (n3.delta && s2.go(-n3.delta, false), M2(e4, o2, a3))).then((e4) => {
        (e4 = e4 || N2(o2, a3, false)) && (n3.delta && !ye(e4, fe.NAVIGATION_CANCELLED) ? s2.go(-n3.delta, false) : n3.type === oe.pop && ye(e4, fe.NAVIGATION_ABORTED | fe.NAVIGATION_DUPLICATED) && s2.go(-1, false)), P2(o2, a3, e4);
      }).catch(I);
    }));
  }
  let L2, j2 = Ce(), B2 = Ce();
  function M2(e3, t2, n3) {
    q2(e3);
    const o2 = B2.list();
    return o2.length ? o2.forEach((o3) => o3(e3, t2, n3)) : C("uncaught error during route navigation:"), Promise.reject(e3);
  }
  function q2(e3) {
    return L2 || (L2 = !e3, D2(), j2.list().forEach(([t2, n3]) => e3 ? n3(e3) : t2()), j2.reset()), e3;
  }
  function F2(t2, n3, o2, r2) {
    const { scrollBehavior: a3 } = e2;
    if (!w || !a3) return Promise.resolve();
    const i3 = !o2 && (function(e3) {
      const t3 = he.get(e3);
      return he.delete(e3), t3;
    })(ue(t2.fullPath, 0)) || (r2 || !o2) && history.state && history.state.scroll || null;
    return d().then(() => a3(t2, n3, i3)).then((e3) => e3 && ce(e3)).catch((e3) => M2(e3, t2, n3));
  }
  const K2 = (e3) => s2.go(e3);
  let J2;
  const Z2 = /* @__PURE__ */ new Set(), ee2 = { currentRoute: h2, listening: true, addRoute: function(e3, t2) {
    let o2, r2;
    return pe(e3) ? (o2 = n2.getRecordMatcher(e3), o2 || C(`Parent route "${String(e3)}" not found when adding child route`, t2), r2 = t2) : r2 = e3, n2.addRoute(r2, o2);
  }, removeRoute: function(e3) {
    const t2 = n2.getRecordMatcher(e3);
    t2 ? n2.removeRoute(t2) : C(`Cannot remove non-existent route "${String(e3)}"`);
  }, clearRoutes: n2.clearRoutes, hasRoute: function(e3) {
    return !!n2.getRecordMatcher(e3);
  }, getRoutes: function() {
    return n2.getRoutes().map((e3) => e3.record);
  }, resolve: v2, options: e2, push: _2, replace: function(e3) {
    return _2(A(y2(e3), { replace: true }));
  }, go: K2, back: () => K2(-1), forward: () => K2(1), beforeEach: l2.add, beforeResolve: c2.add, afterEach: u2.add, onError: B2.add, isReady: function() {
    return L2 && h2.value !== ne ? Promise.resolve() : new Promise((e3, t2) => {
      j2.add([e3, t2]);
    });
  }, install(e3) {
    e3.component("RouterLink", Rt), e3.component("RouterView", $t), e3.config.globalProperties.$router = ee2, Object.defineProperty(e3.config.globalProperties, "$route", { enumerable: true, get: () => o(h2) }), w && !J2 && h2.value === ne && (J2 = true, _2(s2.location).catch((e4) => {
      C("Unexpected error when starting the router:", e4);
    }));
    const t2 = {};
    for (const e4 in ne) Object.defineProperty(t2, e4, { get: () => h2.value[e4], enumerable: true });
    e3.provide(Ie, ee2), e3.provide(Re, r(t2)), e3.provide(Te, h2);
    const a3 = e3.unmount;
    Z2.add(e3), e3.unmount = function() {
      Z2.delete(e3), Z2.size < 1 && (p2 = ne, x2 && x2(), x2 = null, h2.value = ne, J2 = false, L2 = false), a3();
    }, w && xe(e3, ee2, n2);
  } };
  function te2(e3) {
    return e3.reduce((e4, t2) => e4.then(() => $2(t2)), Promise.resolve());
  }
  return ee2;
}
export {
  et as a,
  kt as c
};
