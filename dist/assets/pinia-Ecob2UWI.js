import "./vue-Cw7YYIIs.js";
import { r as t, h as e, a3 as n, a4 as o, Y as a, a5 as s, E as r, a6 as i, w as c, D as l, x as u, e as p, a7 as d, $ as f, a0 as h, a1 as y, i as g, g as m, a8 as b } from "./@vue-2BUk21rv.js";
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const _ = "undefined" != typeof window;
let v;
const w = (t2) => v = t2, $ = Symbol("pinia");
function S(t2) {
  return t2 && "object" == typeof t2 && "[object Object]" === Object.prototype.toString.call(t2) && "function" != typeof t2.toJSON;
}
var O, j;
(j = O || (O = {})).direct = "direct", j.patchObject = "patch object", j.patchFunction = "patch function";
const E = (() => "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : "object" == typeof globalThis ? globalThis : { HTMLElement: null })();
function I(t2, e2, n2) {
  const o2 = new XMLHttpRequest();
  o2.open("GET", t2), o2.responseType = "blob", o2.onload = function() {
    C(o2.response, e2, n2);
  }, o2.onerror = function() {
  }, o2.send();
}
function P(t2) {
  const e2 = new XMLHttpRequest();
  e2.open("HEAD", t2, false);
  try {
    e2.send();
  } catch (t3) {
  }
  return e2.status >= 200 && e2.status <= 299;
}
function k(t2) {
  try {
    t2.dispatchEvent(new MouseEvent("click"));
  } catch (e2) {
    const n2 = new MouseEvent("click", { bubbles: true, cancelable: true, view: window, detail: 0, screenX: 80, screenY: 20, clientX: 80, clientY: 20, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, button: 0, relatedTarget: null });
    t2.dispatchEvent(n2);
  }
}
const T = "object" == typeof navigator ? navigator : { userAgent: "" }, A = (() => /Macintosh/.test(T.userAgent) && /AppleWebKit/.test(T.userAgent) && !/Safari/.test(T.userAgent))(), C = _ ? "undefined" != typeof HTMLAnchorElement && "download" in HTMLAnchorElement.prototype && !A ? function(t2, e2 = "download", n2) {
  const o2 = document.createElement("a");
  o2.download = e2, o2.rel = "noopener", "string" == typeof t2 ? (o2.href = t2, o2.origin !== location.origin ? P(o2.href) ? I(t2, e2, n2) : (o2.target = "_blank", k(o2)) : k(o2)) : (o2.href = URL.createObjectURL(t2), setTimeout(function() {
    URL.revokeObjectURL(o2.href);
  }, 4e4), setTimeout(function() {
    k(o2);
  }, 0));
} : "msSaveOrOpenBlob" in T ? function(t2, e2 = "download", n2) {
  if ("string" == typeof t2) if (P(t2)) I(t2, e2, n2);
  else {
    const e3 = document.createElement("a");
    e3.href = t2, e3.target = "_blank", setTimeout(function() {
      k(e3);
    });
  }
  else navigator.msSaveOrOpenBlob((function(t3, { autoBom: e3 = false } = {}) {
    return e3 && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t3.type) ? new Blob([String.fromCharCode(65279), t3], { type: t3.type }) : t3;
  })(t2, n2), e2);
} : function(t2, e2, n2, o2) {
  (o2 = o2 || open("", "_blank")) && (o2.document.title = o2.document.body.innerText = "downloading...");
  if ("string" == typeof t2) return I(t2, e2, n2);
  const a2 = "application/octet-stream" === t2.type, s2 = /constructor/i.test(String(E.HTMLElement)) || "safari" in E, r2 = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r2 || a2 && s2 || A) && "undefined" != typeof FileReader) {
    const e3 = new FileReader();
    e3.onloadend = function() {
      let t3 = e3.result;
      if ("string" != typeof t3) throw o2 = null, new Error("Wrong reader.result type");
      t3 = r2 ? t3 : t3.replace(/^data:[^;]*;/, "data:attachment/file;"), o2 ? o2.location.href = t3 : location.assign(t3), o2 = null;
    }, e3.readAsDataURL(t2);
  } else {
    const e3 = URL.createObjectURL(t2);
    o2 ? o2.location.assign(e3) : location.href = e3, o2 = null, setTimeout(function() {
      URL.revokeObjectURL(e3);
    }, 4e4);
  }
} : () => {
};
function U(t2, e2) {
  "function" == typeof __VUE_DEVTOOLS_TOAST__ && __VUE_DEVTOOLS_TOAST__("🍍 " + t2, e2);
}
function L(t2) {
  return "_a" in t2 && "install" in t2;
}
function x() {
  if (!("clipboard" in navigator)) return U("Your browser doesn't support the Clipboard API", "error"), true;
}
function R(t2) {
  return !!(t2 instanceof Error && t2.message.toLowerCase().includes("document is not focused")) && (U('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), true);
}
let V;
async function M(t2) {
  try {
    const e2 = (V || (V = document.createElement("input"), V.type = "file", V.accept = ".json"), function() {
      return new Promise((t3, e3) => {
        V.onchange = async () => {
          const e4 = V.files;
          if (!e4) return t3(null);
          const n3 = e4.item(0);
          return t3(n3 ? { text: await n3.text(), file: n3 } : null);
        }, V.oncancel = () => t3(null), V.onerror = e3, V.click();
      });
    }), n2 = await e2();
    if (!n2) return;
    const { text: o2, file: a2 } = n2;
    N(t2, JSON.parse(o2)), U(`Global state imported from "${a2.name}".`);
  } catch (t3) {
    U("Failed to import the state from JSON. Check the console for more details.", "error");
  }
}
function N(t2, e2) {
  for (const n2 in e2) {
    const o2 = t2.state.value[n2];
    o2 ? Object.assign(o2, e2[n2]) : t2.state.value[n2] = e2[n2];
  }
}
function D(t2) {
  return { _custom: { display: t2 } };
}
const F = "🍍 Pinia (root)", H = "_root";
function J(t2) {
  return L(t2) ? { id: H, label: F } : { id: t2.$id, label: t2.$id };
}
function Y(t2) {
  return t2 ? Array.isArray(t2) ? t2.reduce((t3, e2) => (t3.keys.push(e2.key), t3.operations.push(e2.type), t3.oldValue[e2.key] = e2.oldValue, t3.newValue[e2.key] = e2.newValue, t3), { oldValue: {}, keys: [], operations: [], newValue: {} }) : { operation: D(t2.type), key: D(t2.key), oldValue: t2.oldValue, newValue: t2.newValue } : {};
}
function B(t2) {
  switch (t2) {
    case O.direct:
      return "mutation";
    case O.patchFunction:
    case O.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let K = true;
const W = [], z = "pinia:mutations", G = "pinia", { assign: X } = Object, q = (t2) => "🍍 " + t2;
function Q(t2, e2) {
  d({ id: "dev.esm.pinia", label: "Pinia 🍍", logo: "https://pinia.vuejs.org/logo.svg", packageName: "pinia", homepage: "https://pinia.vuejs.org", componentStateTypes: W, app: t2 }, (n2) => {
    "function" != typeof n2.now && U("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n2.addTimelineLayer({ id: z, label: "Pinia 🍍", color: 15064968 }), n2.addInspector({ id: G, label: "Pinia 🍍", icon: "storage", treeFilterPlaceholder: "Search stores", actions: [{ icon: "content_copy", action: () => {
      !(async function(t3) {
        if (!x()) try {
          await navigator.clipboard.writeText(JSON.stringify(t3.state.value)), U("Global state copied to clipboard.");
        } catch (t4) {
          if (R(t4)) return;
          U("Failed to serialize the state. Check the console for more details.", "error");
        }
      })(e2);
    }, tooltip: "Serialize and copy the state" }, { icon: "content_paste", action: async () => {
      await (async function(t3) {
        if (!x()) try {
          N(t3, JSON.parse(await navigator.clipboard.readText())), U("Global state pasted from clipboard.");
        } catch (t4) {
          if (R(t4)) return;
          U("Failed to deserialize the state from clipboard. Check the console for more details.", "error");
        }
      })(e2), n2.sendInspectorTree(G), n2.sendInspectorState(G);
    }, tooltip: "Replace the state with the content of your clipboard" }, { icon: "save", action: () => {
      !(async function(t3) {
        try {
          C(new Blob([JSON.stringify(t3.state.value)], { type: "text/plain;charset=utf-8" }), "pinia-state.json");
        } catch (t4) {
          U("Failed to export the state as JSON. Check the console for more details.", "error");
        }
      })(e2);
    }, tooltip: "Save the state as a JSON file" }, { icon: "folder_open", action: async () => {
      await M(e2), n2.sendInspectorTree(G), n2.sendInspectorState(G);
    }, tooltip: "Import the state from a JSON file" }], nodeActions: [{ icon: "restore", tooltip: 'Reset the state (with "$reset")', action: (t3) => {
      const n3 = e2._s.get(t3);
      n3 ? "function" != typeof n3.$reset ? U(`Cannot reset "${t3}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n3.$reset(), U(`Store "${t3}" reset.`)) : U(`Cannot reset "${t3}" store because it wasn't found.`, "warn");
    } }] }), n2.on.inspectComponent((t3) => {
      const e3 = t3.componentInstance && t3.componentInstance.proxy;
      if (e3 && e3._pStores) {
        const e4 = t3.componentInstance.proxy._pStores;
        Object.values(e4).forEach((e5) => {
          t3.instanceData.state.push({ type: q(e5.$id), key: "state", editable: true, value: e5._isOptionsAPI ? { _custom: { value: i(e5.$state), actions: [{ icon: "restore", tooltip: "Reset the state of this store", action: () => e5.$reset() }] } } : Object.keys(e5.$state).reduce((t4, n3) => (t4[n3] = e5.$state[n3], t4), {}) }), e5._getters && e5._getters.length && t3.instanceData.state.push({ type: q(e5.$id), key: "getters", editable: false, value: e5._getters.reduce((t4, n3) => {
            try {
              t4[n3] = e5[n3];
            } catch (e6) {
              t4[n3] = e6;
            }
            return t4;
          }, {}) });
        });
      }
    }), n2.on.getInspectorTree((n3) => {
      if (n3.app === t2 && n3.inspectorId === G) {
        let t3 = [e2];
        t3 = t3.concat(Array.from(e2._s.values())), n3.rootNodes = (n3.filter ? t3.filter((t4) => "$id" in t4 ? t4.$id.toLowerCase().includes(n3.filter.toLowerCase()) : F.toLowerCase().includes(n3.filter.toLowerCase())) : t3).map(J);
      }
    }), globalThis.$pinia = e2, n2.on.getInspectorState((n3) => {
      if (n3.app === t2 && n3.inspectorId === G) {
        const t3 = n3.nodeId === H ? e2 : e2._s.get(n3.nodeId);
        if (!t3) return;
        t3 && (n3.nodeId !== H && (globalThis.$store = i(t3)), n3.state = (function(t4) {
          if (L(t4)) {
            const e4 = Array.from(t4._s.keys()), n4 = t4._s;
            return { state: e4.map((e5) => ({ editable: true, key: e5, value: t4.state.value[e5] })), getters: e4.filter((t5) => n4.get(t5)._getters).map((t5) => {
              const e5 = n4.get(t5);
              return { editable: false, key: t5, value: e5._getters.reduce((t6, n5) => (t6[n5] = e5[n5], t6), {}) };
            }) };
          }
          const e3 = { state: Object.keys(t4.$state).map((e4) => ({ editable: true, key: e4, value: t4.$state[e4] })) };
          return t4._getters && t4._getters.length && (e3.getters = t4._getters.map((e4) => ({ editable: false, key: e4, value: t4[e4] }))), t4._customProperties.size && (e3.customProperties = Array.from(t4._customProperties).map((e4) => ({ editable: true, key: e4, value: t4[e4] }))), e3;
        })(t3));
      }
    }), n2.on.editInspectorState((n3) => {
      if (n3.app === t2 && n3.inspectorId === G) {
        const t3 = n3.nodeId === H ? e2 : e2._s.get(n3.nodeId);
        if (!t3) return U(`store "${n3.nodeId}" not found`, "error");
        const { path: o2 } = n3;
        L(t3) ? o2.unshift("state") : 1 === o2.length && t3._customProperties.has(o2[0]) && !(o2[0] in t3.$state) || o2.unshift("$state"), K = false, n3.set(t3, o2, n3.state.value), K = true;
      }
    }), n2.on.editComponentState((t3) => {
      if (t3.type.startsWith("🍍")) {
        const n3 = t3.type.replace(/^🍍\s*/, ""), o2 = e2._s.get(n3);
        if (!o2) return U(`store "${n3}" not found`, "error");
        const { path: a2 } = t3;
        if ("state" !== a2[0]) return U(`Invalid path for store "${n3}":
${a2}
Only state can be modified.`);
        a2[0] = "$state", K = false, t3.set(o2, a2, t3.state.value), K = true;
      }
    });
  });
}
let Z, tt = 0;
function et(t2, e2, n2) {
  const o2 = e2.reduce((e3, n3) => (e3[n3] = i(t2)[n3], e3), {});
  for (const e3 in o2) t2[e3] = function() {
    const a2 = tt, s2 = n2 ? new Proxy(t2, { get: (...t3) => (Z = a2, Reflect.get(...t3)), set: (...t3) => (Z = a2, Reflect.set(...t3)) }) : t2;
    Z = a2;
    const r2 = o2[e3].apply(s2, arguments);
    return Z = void 0, r2;
  };
}
function nt({ app: t2, store: e2, options: o2 }) {
  if (!e2.$id.startsWith("__hot:")) {
    if (e2._isOptionsAPI = !!o2.state, !e2._p._testing) {
      et(e2, Object.keys(o2.actions), e2._isOptionsAPI);
      const t3 = e2._hotUpdate;
      i(e2)._hotUpdate = function(n2) {
        t3.apply(this, arguments), et(e2, Object.keys(n2._hmrPayload.actions), !!e2._isOptionsAPI);
      };
    }
    !(function(t3, e3) {
      W.includes(q(e3.$id)) || W.push(q(e3.$id)), d({ id: "dev.esm.pinia", label: "Pinia 🍍", logo: "https://pinia.vuejs.org/logo.svg", packageName: "pinia", homepage: "https://pinia.vuejs.org", componentStateTypes: W, app: t3, settings: { logStoreChanges: { label: "Notify about new/deleted stores", type: "boolean", defaultValue: true } } }, (t4) => {
        const o3 = "function" == typeof t4.now ? t4.now.bind(t4) : Date.now;
        e3.$onAction(({ after: n2, onError: a3, name: s3, args: r2 }) => {
          const i2 = tt++;
          t4.addTimelineEvent({ layerId: z, event: { time: o3(), title: "🛫 " + s3, subtitle: "start", data: { store: D(e3.$id), action: D(s3), args: r2 }, groupId: i2 } }), n2((n3) => {
            Z = void 0, t4.addTimelineEvent({ layerId: z, event: { time: o3(), title: "🛬 " + s3, subtitle: "end", data: { store: D(e3.$id), action: D(s3), args: r2, result: n3 }, groupId: i2 } });
          }), a3((n3) => {
            Z = void 0, t4.addTimelineEvent({ layerId: z, event: { time: o3(), logType: "error", title: "💥 " + s3, subtitle: "end", data: { store: D(e3.$id), action: D(s3), args: r2, error: n3 }, groupId: i2 } });
          });
        }, true), e3._customProperties.forEach((n2) => {
          c(() => f(e3[n2]), (e4, a3) => {
            t4.notifyComponentUpdate(), t4.sendInspectorState(G), K && t4.addTimelineEvent({ layerId: z, event: { time: o3(), title: "Change", subtitle: n2, data: { newValue: e4, oldValue: a3 }, groupId: Z } });
          }, { deep: true });
        }), e3.$subscribe(({ events: n2, type: a3 }, s3) => {
          if (t4.notifyComponentUpdate(), t4.sendInspectorState(G), !K) return;
          const r2 = { time: o3(), title: B(a3), data: X({ store: D(e3.$id) }, Y(n2)), groupId: Z };
          a3 === O.patchFunction ? r2.subtitle = "⤵️" : a3 === O.patchObject ? r2.subtitle = "🧩" : n2 && !Array.isArray(n2) && (r2.subtitle = n2.type), n2 && (r2.data["rawEvent(s)"] = { _custom: { display: "DebuggerEvent", type: "object", tooltip: "raw DebuggerEvent[]", value: n2 } }), t4.addTimelineEvent({ layerId: z, event: r2 });
        }, { detached: true, flush: "sync" });
        const a2 = e3._hotUpdate;
        e3._hotUpdate = n((n2) => {
          a2(n2), t4.addTimelineEvent({ layerId: z, event: { time: o3(), title: "🔥 " + e3.$id, subtitle: "HMR update", data: { store: D(e3.$id), info: D("HMR update") } } }), t4.notifyComponentUpdate(), t4.sendInspectorTree(G), t4.sendInspectorState(G);
        });
        const { $dispose: s2 } = e3;
        e3.$dispose = () => {
          s2(), t4.notifyComponentUpdate(), t4.sendInspectorTree(G), t4.sendInspectorState(G), t4.getSettings().logStoreChanges && U(`Disposed "${e3.$id}" store 🗑`);
        }, t4.notifyComponentUpdate(), t4.sendInspectorTree(G), t4.sendInspectorState(G), t4.getSettings().logStoreChanges && U(`"${e3.$id}" store installed 🆕`);
      });
    })(t2, e2);
  }
}
function ot() {
  const e2 = o(true), a2 = e2.run(() => t({}));
  let s2 = [], r2 = [];
  const i2 = n({ install(t2) {
    w(i2), i2._a = t2, t2.provide($, i2), t2.config.globalProperties.$pinia = i2, _ && Q(t2, i2), r2.forEach((t3) => s2.push(t3)), r2 = [];
  }, use(t2) {
    return this._a ? s2.push(t2) : r2.push(t2), this;
  }, _p: s2, _a: null, _e: e2, _s: /* @__PURE__ */ new Map(), state: a2 });
  return _ && "undefined" != typeof Proxy && i2.use(nt), i2;
}
function at(t2, e2) {
  for (const n2 in e2) {
    const o2 = e2[n2];
    if (!(n2 in t2)) continue;
    const r2 = t2[n2];
    S(r2) && S(o2) && !a(o2) && !s(o2) ? t2[n2] = at(r2, o2) : t2[n2] = o2;
  }
  return t2;
}
const st = () => {
};
function rt(t2, e2, n2, o2 = st) {
  t2.add(e2);
  const a2 = () => {
    t2.delete(e2) && o2();
  };
  return !n2 && h() && y(a2), a2;
}
function it(t2, ...e2) {
  t2.forEach((t3) => {
    t3(...e2);
  });
}
const ct = (t2) => t2(), lt = Symbol(), ut = Symbol();
function pt(t2, e2) {
  t2 instanceof Map && e2 instanceof Map ? e2.forEach((e3, n2) => t2.set(n2, e3)) : t2 instanceof Set && e2 instanceof Set && e2.forEach(t2.add, t2);
  for (const n2 in e2) {
    if (!e2.hasOwnProperty(n2)) continue;
    const o2 = e2[n2], r2 = t2[n2];
    S(r2) && S(o2) && t2.hasOwnProperty(n2) && !a(o2) && !s(o2) ? t2[n2] = pt(r2, o2) : t2[n2] = o2;
  }
  return t2;
}
const dt = Symbol("pinia:skipHydration");
function ft(t2) {
  return !S(t2) || !Object.prototype.hasOwnProperty.call(t2, dt);
}
const { assign: ht } = Object;
function yt(t2) {
  return !(!a(t2) || !t2.effect);
}
function gt(e2, o2, a2, s2) {
  const { state: r2, actions: i2, getters: c2 } = o2, l2 = a2.state.value[e2];
  let d2;
  return d2 = mt(e2, function() {
    l2 || s2 || (a2.state.value[e2] = r2 ? r2() : {});
    const o3 = u(s2 ? t(r2 ? r2() : {}).value : a2.state.value[e2]);
    return ht(o3, i2, Object.keys(c2 || {}).reduce((t2, o4) => (t2[o4] = n(p(() => {
      w(a2);
      const t3 = a2._s.get(e2);
      return c2[o4].call(t3, t3);
    })), t2), {}));
  }, o2, a2, s2, true), d2;
}
function mt(u2, d2, f2 = {}, h2, y2, g2) {
  let m2;
  const b2 = ht({ actions: {} }, f2);
  if (!h2._e.active) throw new Error("Pinia destroyed");
  const v2 = { deep: true };
  let $2, j2;
  v2.onTrigger = (t2) => {
    $2 ? E2 = t2 : 0 != $2 || V2._hotUpdating || Array.isArray(E2) && E2.push(t2);
  };
  let E2, I2 = /* @__PURE__ */ new Set(), P2 = /* @__PURE__ */ new Set();
  const k2 = h2.state.value[u2];
  g2 || k2 || y2 || (h2.state.value[u2] = {});
  const T2 = t({});
  let A2;
  function C2(t2) {
    let e2;
    $2 = j2 = false, E2 = [], "function" == typeof t2 ? (t2(h2.state.value[u2]), e2 = { type: O.patchFunction, storeId: u2, events: E2 }) : (pt(h2.state.value[u2], t2), e2 = { type: O.patchObject, payload: t2, storeId: u2, events: E2 });
    const n2 = A2 = Symbol();
    l().then(() => {
      A2 === n2 && ($2 = true);
    }), j2 = true, it(I2, e2, h2.state.value[u2]);
  }
  const U2 = g2 ? function() {
    const { state: t2 } = f2, e2 = t2 ? t2() : {};
    this.$patch((t3) => {
      ht(t3, e2);
    });
  } : () => {
    throw new Error(`🍍: Store "${u2}" is built using the setup syntax and does not implement $reset().`);
  };
  const L2 = (t2, e2 = "") => {
    if (lt in t2) return t2[ut] = e2, t2;
    const n2 = function() {
      w(h2);
      const e3 = Array.from(arguments), o2 = /* @__PURE__ */ new Set(), a2 = /* @__PURE__ */ new Set();
      let s2;
      it(P2, { args: e3, name: n2[ut], store: V2, after: function(t3) {
        o2.add(t3);
      }, onError: function(t3) {
        a2.add(t3);
      } });
      try {
        s2 = t2.apply(this && this.$id === u2 ? this : V2, e3);
      } catch (t3) {
        throw it(a2, t3), t3;
      }
      return s2 instanceof Promise ? s2.then((t3) => (it(o2, t3), t3)).catch((t3) => (it(a2, t3), Promise.reject(t3))) : (it(o2, s2), s2);
    };
    return n2[lt] = true, n2[ut] = e2, n2;
  }, x2 = n({ actions: {}, getters: {}, state: [], hotState: T2 }), R2 = { _p: h2, $id: u2, $onAction: rt.bind(null, P2), $patch: C2, $reset: U2, $subscribe(t2, e2 = {}) {
    const n2 = rt(I2, t2, e2.detached, () => o2()), o2 = m2.run(() => c(() => h2.state.value[u2], (n3) => {
      ("sync" === e2.flush ? j2 : $2) && t2({ storeId: u2, type: O.direct, events: E2 }, n3);
    }, ht({}, v2, e2)));
    return n2;
  }, $dispose: function() {
    m2.stop(), I2.clear(), P2.clear(), h2._s.delete(u2);
  } }, V2 = e(ht({ _hmrPayload: x2, _customProperties: n(/* @__PURE__ */ new Set()) }, R2));
  h2._s.set(u2, V2);
  const M2 = (h2._a && h2._a.runWithContext || ct)(() => h2._e.run(() => (m2 = o()).run(() => d2({ action: L2 }))));
  for (const t2 in M2) {
    const e2 = M2[t2];
    if (a(e2) && !yt(e2) || s(e2)) y2 ? T2.value[t2] = r(M2, t2) : g2 || (k2 && ft(e2) && (a(e2) ? e2.value = k2[t2] : pt(e2, k2[t2])), h2.state.value[u2][t2] = e2), x2.state.push(t2);
    else if ("function" == typeof e2) {
      const n2 = y2 ? e2 : L2(e2, t2);
      M2[t2] = n2, x2.actions[t2] = e2, b2.actions[t2] = e2;
    } else if (yt(e2) && (x2.getters[t2] = g2 ? f2.getters[t2] : e2, _)) {
      (M2._getters || (M2._getters = n([]))).push(t2);
    }
  }
  if (ht(V2, M2), ht(i(V2), M2), Object.defineProperty(V2, "$state", { get: () => y2 ? T2.value : h2.state.value[u2], set: (t2) => {
    if (y2) throw new Error("cannot set hotState");
    C2((e2) => {
      ht(e2, t2);
    });
  } }), V2._hotUpdate = n((t2) => {
    V2._hotUpdating = true, t2._hmrPayload.state.forEach((e2) => {
      if (e2 in V2.$state) {
        const n2 = t2.$state[e2], o2 = V2.$state[e2];
        "object" == typeof n2 && S(n2) && S(o2) ? at(n2, o2) : t2.$state[e2] = o2;
      }
      V2[e2] = r(t2.$state, e2);
    }), Object.keys(V2.$state).forEach((e2) => {
      e2 in t2.$state || delete V2[e2];
    }), $2 = false, j2 = false, h2.state.value[u2] = r(t2._hmrPayload, "hotState"), j2 = true, l().then(() => {
      $2 = true;
    });
    for (const e2 in t2._hmrPayload.actions) {
      const n2 = t2[e2];
      V2[e2] = L2(n2, e2);
    }
    for (const e2 in t2._hmrPayload.getters) {
      const n2 = t2._hmrPayload.getters[e2], o2 = g2 ? p(() => (w(h2), n2.call(V2, V2))) : n2;
      V2[e2] = o2;
    }
    Object.keys(V2._hmrPayload.getters).forEach((e2) => {
      e2 in t2._hmrPayload.getters || delete V2[e2];
    }), Object.keys(V2._hmrPayload.actions).forEach((e2) => {
      e2 in t2._hmrPayload.actions || delete V2[e2];
    }), V2._hmrPayload = t2._hmrPayload, V2._getters = t2._getters, V2._hotUpdating = false;
  }), _) {
    const t2 = { writable: true, configurable: true, enumerable: false };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((e2) => {
      Object.defineProperty(V2, e2, ht({ value: V2[e2] }, t2));
    });
  }
  return h2._p.forEach((t2) => {
    if (_) {
      const e2 = m2.run(() => t2({ store: V2, app: h2._a, pinia: h2, options: b2 }));
      Object.keys(e2 || {}).forEach((t3) => V2._customProperties.add(t3)), ht(V2, e2);
    } else ht(V2, m2.run(() => t2({ store: V2, app: h2._a, pinia: h2, options: b2 })));
  }), V2.$state && "object" == typeof V2.$state && "function" == typeof V2.$state.constructor && V2.$state.constructor.toString().includes("[native code]"), k2 && g2 && f2.hydrate && f2.hydrate(V2.$state, k2), $2 = true, j2 = true, V2;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function bt(t2, e2, n2) {
  let o2;
  const a2 = "function" == typeof e2;
  function s2(n3, r2) {
    const i2 = b();
    if ((n3 = n3 || (i2 ? g($, null) : null)) && w(n3), !v) throw new Error('[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.');
    (n3 = v)._s.has(t2) || (a2 ? mt(t2, e2, o2, n3) : gt(t2, o2, n3), s2._pinia = n3);
    const c2 = n3._s.get(t2);
    if (r2) {
      const s3 = "__hot:" + t2, i3 = a2 ? mt(s3, e2, o2, n3, true) : gt(s3, ht({}, o2), n3, true);
      r2._hotUpdate(i3), delete n3.state.value[s3], n3._s.delete(s3);
    }
    if (_) {
      const e3 = m();
      if (e3 && e3.proxy && !r2) {
        const n4 = e3.proxy;
        ("_pStores" in n4 ? n4._pStores : n4._pStores = {})[t2] = c2;
      }
    }
    return c2;
  }
  return o2 = a2 ? n2 : e2, s2.$id = t2, s2;
}
function _t(t2, e2) {
  return Array.isArray(e2) ? e2.reduce((e3, n2) => (e3[n2] = function() {
    return t2(this.$pinia)[n2];
  }, e3), {}) : Object.keys(e2).reduce((n2, o2) => (n2[o2] = function() {
    const n3 = t2(this.$pinia), a2 = e2[o2];
    return "function" == typeof a2 ? a2.call(this, n3) : n3[a2];
  }, n2), {});
}
function vt(t2, e2) {
  return Array.isArray(e2) ? e2.reduce((e3, n2) => (e3[n2] = function(...e4) {
    return t2(this.$pinia)[n2](...e4);
  }, e3), {}) : Object.keys(e2).reduce((n2, o2) => (n2[o2] = function(...n3) {
    return t2(this.$pinia)[e2[o2]](...n3);
  }, n2), {});
}
export {
  _t as a,
  ot as c,
  bt as d,
  vt as m
};
