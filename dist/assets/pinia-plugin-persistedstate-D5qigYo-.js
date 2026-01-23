function e(e2, r2) {
  if (null == e2) return;
  let t2 = e2;
  for (let e3 = 0; e3 < r2.length; e3++) {
    if (void 0 === t2 || void 0 === t2[r2[e3]]) return;
    if (null === t2 || null === t2[r2[e3]]) return null;
    t2 = t2[r2[e3]];
  }
  return t2;
}
function r(e2, t2, i2) {
  if (0 === i2.length) return t2;
  const n2 = i2[0];
  return i2.length > 1 && (t2 = r("object" == typeof e2 && null !== e2 && Object.prototype.hasOwnProperty.call(e2, n2) ? e2[n2] : Number.isInteger(Number(i2[1])) ? [] : {}, t2, Array.prototype.slice.call(i2, 1))), Number.isInteger(Number(n2)) && Array.isArray(e2) ? e2.slice()[n2] : Object.assign({}, e2, { [n2]: t2 });
}
function t(e2, i2) {
  if (null == e2 || 0 === i2.length) return e2;
  if (1 === i2.length) {
    if (null == e2) return e2;
    if (Number.isInteger(i2[0]) && Array.isArray(e2)) return Array.prototype.slice.call(e2, 0).splice(i2[0], 1);
    const r2 = {};
    for (const t2 in e2) r2[t2] = e2[t2];
    return delete r2[i2[0]], r2;
  }
  if (null == e2[i2[0]]) {
    if (Number.isInteger(i2[0]) && Array.isArray(e2)) return Array.prototype.concat.call([], e2);
    const r2 = {};
    for (const t2 in e2) r2[t2] = e2[t2];
    return r2;
  }
  return r(e2, t(e2[i2[0]], Array.prototype.slice.call(i2, 1)), [i2[0]]);
}
function i(t2, i2) {
  return i2.map((e2) => e2.split(".")).map((r2) => [r2, e(t2, r2)]).filter((e2) => void 0 !== e2[1]).reduce((e2, t3) => r(e2, t3[1], t3[0]), {});
}
function n(e2, r2) {
  return r2.map((e3) => e3.split(".")).reduce((e3, r3) => t(e3, r3), e2);
}
function o(e2, { storage: r2, serializer: t2, key: o2, debug: a2, pick: s2, omit: c, beforeHydrate: l, afterHydrate: u }, f, y = true) {
  try {
    y && (l == null ? void 0 : l(f));
    const a3 = r2.getItem(o2);
    if (a3) {
      const r3 = t2.deserialize(a3), o3 = s2 ? i(r3, s2) : r3, l2 = c ? n(o3, c) : o3;
      e2.$patch(l2);
    }
    y && (u == null ? void 0 : u(f));
  } catch (e3) {
  }
}
function a(e2, { storage: r2, serializer: t2, key: o2, debug: a2, pick: s2, omit: c }) {
  try {
    const a3 = s2 ? i(e2, s2) : e2, l = c ? n(a3, c) : a3, u = t2.serialize(l);
    r2.setItem(o2, u);
  } catch (e3) {
  }
}
var s = /* @__PURE__ */ (function(e2 = {}) {
  return function(r2) {
    !(function(e3, r3, t2) {
      const { pinia: i2, store: n2, options: { persist: s2 = t2 } } = e3;
      if (!s2) return;
      // v8 ignore if -- @preserve
      if (!(n2.$id in i2.state.value)) {
        const e4 = i2._s.get(n2.$id.replace("__hot:", ""));
        return void (e4 && Promise.resolve().then(() => e4.$persist()));
      }
      const c = (Array.isArray(s2) ? s2 : true === s2 ? [{}] : [s2]).map(r3);
      n2.$hydrate = ({ runHooks: r4 = true } = {}) => {
        c.forEach((t3) => {
          o(n2, t3, e3, r4);
        });
      }, n2.$persist = () => {
        c.forEach((e4) => {
          a(n2.$state, e4);
        });
      }, c.forEach((r4) => {
        o(n2, r4, e3), n2.$subscribe((e4, t3) => a(t3, r4), { detached: true });
      });
    })(r2, (t2) => {
      const i2 = (n2 = t2.key, o2 = r2.store.$id, "function" == typeof n2 ? n2(o2) : "string" == typeof n2 ? n2 : o2);
      var n2, o2;
      return { key: (e2.key ? e2.key : (e3) => e3)(i2), debug: t2.debug ?? e2.debug ?? false, serializer: t2.serializer ?? e2.serializer ?? { serialize: (e3) => JSON.stringify(e3), deserialize: (e3) => JSON.parse(e3) }, storage: t2.storage ?? e2.storage ?? window.localStorage, beforeHydrate: t2.beforeHydrate ?? e2.beforeHydrate, afterHydrate: t2.afterHydrate ?? e2.afterHydrate, pick: t2.pick, omit: t2.omit };
    }, e2.auto ?? false);
  };
})();
export {
  s
};
