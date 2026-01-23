function o(e2, t2 = {}, s2) {
  for (const i2 in e2) {
    const h2 = e2[i2], r2 = s2 ? `${s2}:${i2}` : i2;
    "object" == typeof h2 && null !== h2 ? o(h2, t2, r2) : "function" == typeof h2 && (t2[r2] = h2);
  }
  return t2;
}
const e = { run: (o2) => o2() }, t = void 0 !== console.createTask ? console.createTask : () => e;
function s(o2, e2) {
  const s2 = e2.shift(), i2 = t(s2);
  return o2.reduce((o3, t2) => o3.then(() => i2.run(() => t2(...e2))), Promise.resolve());
}
function i(o2, e2) {
  const s2 = e2.shift(), i2 = t(s2);
  return Promise.all(o2.map((o3) => i2.run(() => o3(...e2))));
}
function h(o2, e2) {
  for (const t2 of [...o2]) t2(e2);
}
class r {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(o2, e2, t2 = {}) {
    if (!o2 || "function" != typeof e2) return () => {
    };
    const s2 = o2;
    let i2;
    for (; this._deprecatedHooks[o2]; ) i2 = this._deprecatedHooks[o2], o2 = i2.to;
    if (i2 && !t2.allowDeprecated) {
      let o3 = i2.message;
      o3 || (o3 = `${s2} hook has been deprecated` + (i2.to ? `, please use ${i2.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(o3) || this._deprecatedMessages.add(o3);
    }
    if (!e2.name) try {
      Object.defineProperty(e2, "name", { get: () => "_" + o2.replace(/\W+/g, "_") + "_hook_cb", configurable: true });
    } catch {
    }
    return this._hooks[o2] = this._hooks[o2] || [], this._hooks[o2].push(e2), () => {
      e2 && (this.removeHook(o2, e2), e2 = void 0);
    };
  }
  hookOnce(o2, e2) {
    let t2, s2 = (...o3) => ("function" == typeof t2 && t2(), t2 = void 0, s2 = void 0, e2(...o3));
    return t2 = this.hook(o2, s2), t2;
  }
  removeHook(o2, e2) {
    if (this._hooks[o2]) {
      const t2 = this._hooks[o2].indexOf(e2);
      -1 !== t2 && this._hooks[o2].splice(t2, 1), 0 === this._hooks[o2].length && delete this._hooks[o2];
    }
  }
  deprecateHook(o2, e2) {
    this._deprecatedHooks[o2] = "string" == typeof e2 ? { to: e2 } : e2;
    const t2 = this._hooks[o2] || [];
    delete this._hooks[o2];
    for (const e3 of t2) this.hook(o2, e3);
  }
  deprecateHooks(o2) {
    Object.assign(this._deprecatedHooks, o2);
    for (const e2 in o2) this.deprecateHook(e2, o2[e2]);
  }
  addHooks(e2) {
    const t2 = o(e2), s2 = Object.keys(t2).map((o2) => this.hook(o2, t2[o2]));
    return () => {
      for (const o2 of s2.splice(0, s2.length)) o2();
    };
  }
  removeHooks(e2) {
    const t2 = o(e2);
    for (const o2 in t2) this.removeHook(o2, t2[o2]);
  }
  removeAllHooks() {
    for (const o2 in this._hooks) delete this._hooks[o2];
  }
  callHook(o2, ...e2) {
    return e2.unshift(o2), this.callHookWith(s, o2, ...e2);
  }
  callHookParallel(o2, ...e2) {
    return e2.unshift(o2), this.callHookWith(i, o2, ...e2);
  }
  callHookWith(o2, e2, ...t2) {
    const s2 = this._before || this._after ? { name: e2, args: t2, context: {} } : void 0;
    this._before && h(this._before, s2);
    const i2 = o2(e2 in this._hooks ? [...this._hooks[e2]] : [], t2);
    return i2 instanceof Promise ? i2.finally(() => {
      this._after && s2 && h(this._after, s2);
    }) : (this._after && s2 && h(this._after, s2), i2);
  }
  beforeEach(o2) {
    return this._before = this._before || [], this._before.push(o2), () => {
      if (void 0 !== this._before) {
        const e2 = this._before.indexOf(o2);
        -1 !== e2 && this._before.splice(e2, 1);
      }
    };
  }
  afterEach(o2) {
    return this._after = this._after || [], this._after.push(o2), () => {
      if (void 0 !== this._after) {
        const e2 = this._after.indexOf(o2);
        -1 !== e2 && this._after.splice(e2, 1);
      }
    };
  }
}
function n() {
  return new r();
}
export {
  n as c
};
