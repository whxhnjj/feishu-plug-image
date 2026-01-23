function e(e4, t3) {
  return function() {
    return e4.apply(t3, arguments);
  };
}
const { toString: t } = Object.prototype, { getPrototypeOf: n } = Object, { iterator: r, toStringTag: o } = Symbol, s = (i = /* @__PURE__ */ Object.create(null), (e4) => {
  const n2 = t.call(e4);
  return i[n2] || (i[n2] = n2.slice(8, -1).toLowerCase());
});
var i;
const a = (e4) => (e4 = e4.toLowerCase(), (t3) => s(t3) === e4), c = (e4) => (t3) => typeof t3 === e4, { isArray: l } = Array, u = c("undefined");
function f(e4) {
  return null !== e4 && !u(e4) && null !== e4.constructor && !u(e4.constructor) && h(e4.constructor.isBuffer) && e4.constructor.isBuffer(e4);
}
const d = a("ArrayBuffer");
const p = c("string"), h = c("function"), m = c("number"), b = (e4) => null !== e4 && "object" == typeof e4, y = (e4) => {
  if ("object" !== s(e4)) return false;
  const t3 = n(e4);
  return !(null !== t3 && t3 !== Object.prototype && null !== Object.getPrototypeOf(t3) || o in e4 || r in e4);
}, g = a("Date"), w = a("File"), E = a("Blob"), O = a("FileList"), R = a("URLSearchParams"), [S, T, A, v] = ["ReadableStream", "Request", "Response", "Headers"].map(a);
function C(e4, t3, { allOwnKeys: n2 = false } = {}) {
  if (null == e4) return;
  let r2, o2;
  if ("object" != typeof e4 && (e4 = [e4]), l(e4)) for (r2 = 0, o2 = e4.length; r2 < o2; r2++) t3.call(null, e4[r2], r2, e4);
  else {
    if (f(e4)) return;
    const o3 = n2 ? Object.getOwnPropertyNames(e4) : Object.keys(e4), s2 = o3.length;
    let i2;
    for (r2 = 0; r2 < s2; r2++) i2 = o3[r2], t3.call(null, e4[i2], i2, e4);
  }
}
function x(e4, t3) {
  if (f(e4)) return null;
  t3 = t3.toLowerCase();
  const n2 = Object.keys(e4);
  let r2, o2 = n2.length;
  for (; o2-- > 0; ) if (r2 = n2[o2], t3 === r2.toLowerCase()) return r2;
  return null;
}
const j = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, N = (e4) => !u(e4) && e4 !== j;
const U = (P = "undefined" != typeof Uint8Array && n(Uint8Array), (e4) => P && e4 instanceof P);
var P;
const F = a("HTMLFormElement"), _ = (({ hasOwnProperty: e4 }) => (t3, n2) => e4.call(t3, n2))(Object.prototype), L = a("RegExp"), k = (e4, t3) => {
  const n2 = Object.getOwnPropertyDescriptors(e4), r2 = {};
  C(n2, (n3, o2) => {
    let s2;
    false !== (s2 = t3(n3, o2, e4)) && (r2[o2] = s2 || n3);
  }), Object.defineProperties(e4, r2);
};
const B = a("AsyncFunction"), D = (q = "function" == typeof setImmediate, I = h(j.postMessage), q ? setImmediate : I ? (M = `axios@${Math.random()}`, z = [], j.addEventListener("message", ({ source: e4, data: t3 }) => {
  e4 === j && t3 === M && z.length && z.shift()();
}, false), (e4) => {
  z.push(e4), j.postMessage(M, "*");
}) : (e4) => setTimeout(e4));
var q, I, M, z;
const H = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(j) : "undefined" != typeof process && process.nextTick || D, J = { isArray: l, isArrayBuffer: d, isBuffer: f, isFormData: (e4) => {
  let t3;
  return e4 && ("function" == typeof FormData && e4 instanceof FormData || h(e4.append) && ("formdata" === (t3 = s(e4)) || "object" === t3 && h(e4.toString) && "[object FormData]" === e4.toString()));
}, isArrayBufferView: function(e4) {
  let t3;
  return t3 = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e4) : e4 && e4.buffer && d(e4.buffer), t3;
}, isString: p, isNumber: m, isBoolean: (e4) => true === e4 || false === e4, isObject: b, isPlainObject: y, isEmptyObject: (e4) => {
  if (!b(e4) || f(e4)) return false;
  try {
    return 0 === Object.keys(e4).length && Object.getPrototypeOf(e4) === Object.prototype;
  } catch (e5) {
    return false;
  }
}, isReadableStream: S, isRequest: T, isResponse: A, isHeaders: v, isUndefined: u, isDate: g, isFile: w, isBlob: E, isRegExp: L, isFunction: h, isStream: (e4) => b(e4) && h(e4.pipe), isURLSearchParams: R, isTypedArray: U, isFileList: O, forEach: C, merge: function e2() {
  const { caseless: t3, skipUndefined: n2 } = N(this) && this || {}, r2 = {}, o2 = (o3, s2) => {
    const i2 = t3 && x(r2, s2) || s2;
    y(r2[i2]) && y(o3) ? r2[i2] = e2(r2[i2], o3) : y(o3) ? r2[i2] = e2({}, o3) : l(o3) ? r2[i2] = o3.slice() : n2 && u(o3) || (r2[i2] = o3);
  };
  for (let e4 = 0, t4 = arguments.length; e4 < t4; e4++) arguments[e4] && C(arguments[e4], o2);
  return r2;
}, extend: (t3, n2, r2, { allOwnKeys: o2 } = {}) => (C(n2, (n3, o3) => {
  r2 && h(n3) ? t3[o3] = e(n3, r2) : t3[o3] = n3;
}, { allOwnKeys: o2 }), t3), trim: (e4) => e4.trim ? e4.trim() : e4.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), stripBOM: (e4) => (65279 === e4.charCodeAt(0) && (e4 = e4.slice(1)), e4), inherits: (e4, t3, n2, r2) => {
  e4.prototype = Object.create(t3.prototype, r2), e4.prototype.constructor = e4, Object.defineProperty(e4, "super", { value: t3.prototype }), n2 && Object.assign(e4.prototype, n2);
}, toFlatObject: (e4, t3, r2, o2) => {
  let s2, i2, a2;
  const c2 = {};
  if (t3 = t3 || {}, null == e4) return t3;
  do {
    for (s2 = Object.getOwnPropertyNames(e4), i2 = s2.length; i2-- > 0; ) a2 = s2[i2], o2 && !o2(a2, e4, t3) || c2[a2] || (t3[a2] = e4[a2], c2[a2] = true);
    e4 = false !== r2 && n(e4);
  } while (e4 && (!r2 || r2(e4, t3)) && e4 !== Object.prototype);
  return t3;
}, kindOf: s, kindOfTest: a, endsWith: (e4, t3, n2) => {
  e4 = String(e4), (void 0 === n2 || n2 > e4.length) && (n2 = e4.length), n2 -= t3.length;
  const r2 = e4.indexOf(t3, n2);
  return -1 !== r2 && r2 === n2;
}, toArray: (e4) => {
  if (!e4) return null;
  if (l(e4)) return e4;
  let t3 = e4.length;
  if (!m(t3)) return null;
  const n2 = new Array(t3);
  for (; t3-- > 0; ) n2[t3] = e4[t3];
  return n2;
}, forEachEntry: (e4, t3) => {
  const n2 = (e4 && e4[r]).call(e4);
  let o2;
  for (; (o2 = n2.next()) && !o2.done; ) {
    const n3 = o2.value;
    t3.call(e4, n3[0], n3[1]);
  }
}, matchAll: (e4, t3) => {
  let n2;
  const r2 = [];
  for (; null !== (n2 = e4.exec(t3)); ) r2.push(n2);
  return r2;
}, isHTMLForm: F, hasOwnProperty: _, hasOwnProp: _, reduceDescriptors: k, freezeMethods: (e4) => {
  k(e4, (t3, n2) => {
    if (h(e4) && -1 !== ["arguments", "caller", "callee"].indexOf(n2)) return false;
    const r2 = e4[n2];
    h(r2) && (t3.enumerable = false, "writable" in t3 ? t3.writable = false : t3.set || (t3.set = () => {
      throw Error("Can not rewrite read-only method '" + n2 + "'");
    }));
  });
}, toObjectSet: (e4, t3) => {
  const n2 = {}, r2 = (e5) => {
    e5.forEach((e6) => {
      n2[e6] = true;
    });
  };
  return l(e4) ? r2(e4) : r2(String(e4).split(t3)), n2;
}, toCamelCase: (e4) => e4.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e5, t3, n2) {
  return t3.toUpperCase() + n2;
}), noop: () => {
}, toFiniteNumber: (e4, t3) => null != e4 && Number.isFinite(e4 = +e4) ? e4 : t3, findKey: x, global: j, isContextDefined: N, isSpecCompliantForm: function(e4) {
  return !!(e4 && h(e4.append) && "FormData" === e4[o] && e4[r]);
}, toJSONObject: (e4) => {
  const t3 = new Array(10), n2 = (e5, r2) => {
    if (b(e5)) {
      if (t3.indexOf(e5) >= 0) return;
      if (f(e5)) return e5;
      if (!("toJSON" in e5)) {
        t3[r2] = e5;
        const o2 = l(e5) ? [] : {};
        return C(e5, (e6, t4) => {
          const s2 = n2(e6, r2 + 1);
          !u(s2) && (o2[t4] = s2);
        }), t3[r2] = void 0, o2;
      }
    }
    return e5;
  };
  return n2(e4, 0);
}, isAsyncFn: B, isThenable: (e4) => e4 && (b(e4) || h(e4)) && h(e4.then) && h(e4.catch), setImmediate: D, asap: H, isIterable: (e4) => null != e4 && h(e4[r]) };
function W(e4, t3, n2, r2, o2) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e4, this.name = "AxiosError", t3 && (this.code = t3), n2 && (this.config = n2), r2 && (this.request = r2), o2 && (this.response = o2, this.status = o2.status ? o2.status : null);
}
J.inherits(W, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: J.toJSONObject(this.config), code: this.code, status: this.status };
} });
const K = W.prototype, V = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e4) => {
  V[e4] = { value: e4 };
}), Object.defineProperties(W, V), Object.defineProperty(K, "isAxiosError", { value: true }), W.from = (e4, t3, n2, r2, o2, s2) => {
  const i2 = Object.create(K);
  J.toFlatObject(e4, i2, function(e5) {
    return e5 !== Error.prototype;
  }, (e5) => "isAxiosError" !== e5);
  const a2 = e4 && e4.message ? e4.message : "Error", c2 = null == t3 && e4 ? e4.code : t3;
  return W.call(i2, a2, c2, n2, r2, o2), e4 && null == i2.cause && Object.defineProperty(i2, "cause", { value: e4, configurable: true }), i2.name = e4 && e4.name || "Error", s2 && Object.assign(i2, s2), i2;
};
function $(e4) {
  return J.isPlainObject(e4) || J.isArray(e4);
}
function X(e4) {
  return J.endsWith(e4, "[]") ? e4.slice(0, -2) : e4;
}
function G(e4, t3, n2) {
  return e4 ? e4.concat(t3).map(function(e5, t4) {
    return e5 = X(e5), !n2 && t4 ? "[" + e5 + "]" : e5;
  }).join(n2 ? "." : "") : t3;
}
const Q = J.toFlatObject(J, {}, null, function(e4) {
  return /^is[A-Z]/.test(e4);
});
function Z(e4, t3, n2) {
  if (!J.isObject(e4)) throw new TypeError("target must be an object");
  t3 = t3 || new FormData();
  const r2 = (n2 = J.toFlatObject(n2, { metaTokens: true, dots: false, indexes: false }, false, function(e5, t4) {
    return !J.isUndefined(t4[e5]);
  })).metaTokens, o2 = n2.visitor || l2, s2 = n2.dots, i2 = n2.indexes, a2 = (n2.Blob || "undefined" != typeof Blob && Blob) && J.isSpecCompliantForm(t3);
  if (!J.isFunction(o2)) throw new TypeError("visitor must be a function");
  function c2(e5) {
    if (null === e5) return "";
    if (J.isDate(e5)) return e5.toISOString();
    if (J.isBoolean(e5)) return e5.toString();
    if (!a2 && J.isBlob(e5)) throw new W("Blob is not supported. Use a Buffer instead.");
    return J.isArrayBuffer(e5) || J.isTypedArray(e5) ? a2 && "function" == typeof Blob ? new Blob([e5]) : Buffer.from(e5) : e5;
  }
  function l2(e5, n3, o3) {
    let a3 = e5;
    if (e5 && !o3 && "object" == typeof e5) {
      if (J.endsWith(n3, "{}")) n3 = r2 ? n3 : n3.slice(0, -2), e5 = JSON.stringify(e5);
      else if (J.isArray(e5) && (function(e6) {
        return J.isArray(e6) && !e6.some($);
      })(e5) || (J.isFileList(e5) || J.endsWith(n3, "[]")) && (a3 = J.toArray(e5))) return n3 = X(n3), a3.forEach(function(e6, r3) {
        !J.isUndefined(e6) && null !== e6 && t3.append(true === i2 ? G([n3], r3, s2) : null === i2 ? n3 : n3 + "[]", c2(e6));
      }), false;
    }
    return !!$(e5) || (t3.append(G(o3, n3, s2), c2(e5)), false);
  }
  const u2 = [], f2 = Object.assign(Q, { defaultVisitor: l2, convertValue: c2, isVisitable: $ });
  if (!J.isObject(e4)) throw new TypeError("data must be an object");
  return (function e5(n3, r3) {
    if (!J.isUndefined(n3)) {
      if (-1 !== u2.indexOf(n3)) throw Error("Circular reference detected in " + r3.join("."));
      u2.push(n3), J.forEach(n3, function(n4, s3) {
        true === (!(J.isUndefined(n4) || null === n4) && o2.call(t3, n4, J.isString(s3) ? s3.trim() : s3, r3, f2)) && e5(n4, r3 ? r3.concat(s3) : [s3]);
      }), u2.pop();
    }
  })(e4), t3;
}
function Y(e4) {
  const t3 = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(e4).replace(/[!'()~]|%20|%00/g, function(e5) {
    return t3[e5];
  });
}
function ee(e4, t3) {
  this._pairs = [], e4 && Z(e4, this, t3);
}
const te = ee.prototype;
function ne(e4) {
  return encodeURIComponent(e4).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function re(e4, t3, n2) {
  if (!t3) return e4;
  const r2 = n2 && n2.encode || ne;
  J.isFunction(n2) && (n2 = { serialize: n2 });
  const o2 = n2 && n2.serialize;
  let s2;
  if (s2 = o2 ? o2(t3, n2) : J.isURLSearchParams(t3) ? t3.toString() : new ee(t3, n2).toString(r2), s2) {
    const t4 = e4.indexOf("#");
    -1 !== t4 && (e4 = e4.slice(0, t4)), e4 += (-1 === e4.indexOf("?") ? "?" : "&") + s2;
  }
  return e4;
}
te.append = function(e4, t3) {
  this._pairs.push([e4, t3]);
}, te.toString = function(e4) {
  const t3 = e4 ? function(t4) {
    return e4.call(this, t4, Y);
  } : Y;
  return this._pairs.map(function(e5) {
    return t3(e5[0]) + "=" + t3(e5[1]);
  }, "").join("&");
};
class oe {
  constructor() {
    this.handlers = [];
  }
  use(e4, t3, n2) {
    return this.handlers.push({ fulfilled: e4, rejected: t3, synchronous: !!n2 && n2.synchronous, runWhen: n2 ? n2.runWhen : null }), this.handlers.length - 1;
  }
  eject(e4) {
    this.handlers[e4] && (this.handlers[e4] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e4) {
    J.forEach(this.handlers, function(t3) {
      null !== t3 && e4(t3);
    });
  }
}
const se = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false }, ie = { isBrowser: true, classes: { URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : ee, FormData: "undefined" != typeof FormData ? FormData : null, Blob: "undefined" != typeof Blob ? Blob : null }, protocols: ["http", "https", "file", "blob", "url", "data"] }, ae = "undefined" != typeof window && "undefined" != typeof document, ce = "object" == typeof navigator && navigator || void 0, le = ae && (!ce || ["ReactNative", "NativeScript", "NS"].indexOf(ce.product) < 0), ue = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts, fe = ae && window.location.href || "http://localhost", de = { ...Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: ae, hasStandardBrowserEnv: le, hasStandardBrowserWebWorkerEnv: ue, navigator: ce, origin: fe }, Symbol.toStringTag, { value: "Module" })), ...ie };
function pe(e4) {
  function t3(e5, n2, r2, o2) {
    let s2 = e5[o2++];
    if ("__proto__" === s2) return true;
    const i2 = Number.isFinite(+s2), a2 = o2 >= e5.length;
    if (s2 = !s2 && J.isArray(r2) ? r2.length : s2, a2) return J.hasOwnProp(r2, s2) ? r2[s2] = [r2[s2], n2] : r2[s2] = n2, !i2;
    r2[s2] && J.isObject(r2[s2]) || (r2[s2] = []);
    return t3(e5, n2, r2[s2], o2) && J.isArray(r2[s2]) && (r2[s2] = (function(e6) {
      const t4 = {}, n3 = Object.keys(e6);
      let r3;
      const o3 = n3.length;
      let s3;
      for (r3 = 0; r3 < o3; r3++) s3 = n3[r3], t4[s3] = e6[s3];
      return t4;
    })(r2[s2])), !i2;
  }
  if (J.isFormData(e4) && J.isFunction(e4.entries)) {
    const n2 = {};
    return J.forEachEntry(e4, (e5, r2) => {
      t3((function(e6) {
        return J.matchAll(/\w+|\[(\w*)]/g, e6).map((e7) => "[]" === e7[0] ? "" : e7[1] || e7[0]);
      })(e5), r2, n2, 0);
    }), n2;
  }
  return null;
}
const he = { transitional: se, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e4, t3) {
  const n2 = t3.getContentType() || "", r2 = n2.indexOf("application/json") > -1, o2 = J.isObject(e4);
  o2 && J.isHTMLForm(e4) && (e4 = new FormData(e4));
  if (J.isFormData(e4)) return r2 ? JSON.stringify(pe(e4)) : e4;
  if (J.isArrayBuffer(e4) || J.isBuffer(e4) || J.isStream(e4) || J.isFile(e4) || J.isBlob(e4) || J.isReadableStream(e4)) return e4;
  if (J.isArrayBufferView(e4)) return e4.buffer;
  if (J.isURLSearchParams(e4)) return t3.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e4.toString();
  let s2;
  if (o2) {
    if (n2.indexOf("application/x-www-form-urlencoded") > -1) return (function(e5, t4) {
      return Z(e5, new de.classes.URLSearchParams(), { visitor: function(e6, t5, n3, r3) {
        return de.isNode && J.isBuffer(e6) ? (this.append(t5, e6.toString("base64")), false) : r3.defaultVisitor.apply(this, arguments);
      }, ...t4 });
    })(e4, this.formSerializer).toString();
    if ((s2 = J.isFileList(e4)) || n2.indexOf("multipart/form-data") > -1) {
      const t4 = this.env && this.env.FormData;
      return Z(s2 ? { "files[]": e4 } : e4, t4 && new t4(), this.formSerializer);
    }
  }
  return o2 || r2 ? (t3.setContentType("application/json", false), (function(e5, t4, n3) {
    if (J.isString(e5)) try {
      return (t4 || JSON.parse)(e5), J.trim(e5);
    } catch (e6) {
      if ("SyntaxError" !== e6.name) throw e6;
    }
    return (n3 || JSON.stringify)(e5);
  })(e4)) : e4;
}], transformResponse: [function(e4) {
  const t3 = this.transitional || he.transitional, n2 = t3 && t3.forcedJSONParsing, r2 = "json" === this.responseType;
  if (J.isResponse(e4) || J.isReadableStream(e4)) return e4;
  if (e4 && J.isString(e4) && (n2 && !this.responseType || r2)) {
    const n3 = !(t3 && t3.silentJSONParsing) && r2;
    try {
      return JSON.parse(e4, this.parseReviver);
    } catch (e5) {
      if (n3) {
        if ("SyntaxError" === e5.name) throw W.from(e5, W.ERR_BAD_RESPONSE, this, null, this.response);
        throw e5;
      }
    }
  }
  return e4;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: de.classes.FormData, Blob: de.classes.Blob }, validateStatus: function(e4) {
  return e4 >= 200 && e4 < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
J.forEach(["delete", "get", "head", "post", "put", "patch"], (e4) => {
  he.headers[e4] = {};
});
const me = J.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), be = Symbol("internals");
function ye(e4) {
  return e4 && String(e4).trim().toLowerCase();
}
function ge(e4) {
  return false === e4 || null == e4 ? e4 : J.isArray(e4) ? e4.map(ge) : String(e4);
}
function we(e4, t3, n2, r2, o2) {
  return J.isFunction(r2) ? r2.call(this, t3, n2) : (o2 && (t3 = n2), J.isString(t3) ? J.isString(r2) ? -1 !== t3.indexOf(r2) : J.isRegExp(r2) ? r2.test(t3) : void 0 : void 0);
}
let Ee = class {
  constructor(e4) {
    e4 && this.set(e4);
  }
  set(e4, t3, n2) {
    const r2 = this;
    function o2(e5, t4, n3) {
      const o3 = ye(t4);
      if (!o3) throw new Error("header name must be a non-empty string");
      const s3 = J.findKey(r2, o3);
      (!s3 || void 0 === r2[s3] || true === n3 || void 0 === n3 && false !== r2[s3]) && (r2[s3 || t4] = ge(e5));
    }
    const s2 = (e5, t4) => J.forEach(e5, (e6, n3) => o2(e6, n3, t4));
    if (J.isPlainObject(e4) || e4 instanceof this.constructor) s2(e4, t3);
    else if (J.isString(e4) && (e4 = e4.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e4.trim())) s2(((e5) => {
      const t4 = {};
      let n3, r3, o3;
      return e5 && e5.split("\n").forEach(function(e6) {
        o3 = e6.indexOf(":"), n3 = e6.substring(0, o3).trim().toLowerCase(), r3 = e6.substring(o3 + 1).trim(), !n3 || t4[n3] && me[n3] || ("set-cookie" === n3 ? t4[n3] ? t4[n3].push(r3) : t4[n3] = [r3] : t4[n3] = t4[n3] ? t4[n3] + ", " + r3 : r3);
      }), t4;
    })(e4), t3);
    else if (J.isObject(e4) && J.isIterable(e4)) {
      let n3, r3, o3 = {};
      for (const t4 of e4) {
        if (!J.isArray(t4)) throw TypeError("Object iterator must return a key-value pair");
        o3[r3 = t4[0]] = (n3 = o3[r3]) ? J.isArray(n3) ? [...n3, t4[1]] : [n3, t4[1]] : t4[1];
      }
      s2(o3, t3);
    } else null != e4 && o2(t3, e4, n2);
    return this;
  }
  get(e4, t3) {
    if (e4 = ye(e4)) {
      const n2 = J.findKey(this, e4);
      if (n2) {
        const e5 = this[n2];
        if (!t3) return e5;
        if (true === t3) return (function(e6) {
          const t4 = /* @__PURE__ */ Object.create(null), n3 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
          let r2;
          for (; r2 = n3.exec(e6); ) t4[r2[1]] = r2[2];
          return t4;
        })(e5);
        if (J.isFunction(t3)) return t3.call(this, e5, n2);
        if (J.isRegExp(t3)) return t3.exec(e5);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e4, t3) {
    if (e4 = ye(e4)) {
      const n2 = J.findKey(this, e4);
      return !(!n2 || void 0 === this[n2] || t3 && !we(0, this[n2], n2, t3));
    }
    return false;
  }
  delete(e4, t3) {
    const n2 = this;
    let r2 = false;
    function o2(e5) {
      if (e5 = ye(e5)) {
        const o3 = J.findKey(n2, e5);
        !o3 || t3 && !we(0, n2[o3], o3, t3) || (delete n2[o3], r2 = true);
      }
    }
    return J.isArray(e4) ? e4.forEach(o2) : o2(e4), r2;
  }
  clear(e4) {
    const t3 = Object.keys(this);
    let n2 = t3.length, r2 = false;
    for (; n2--; ) {
      const o2 = t3[n2];
      e4 && !we(0, this[o2], o2, e4, true) || (delete this[o2], r2 = true);
    }
    return r2;
  }
  normalize(e4) {
    const t3 = this, n2 = {};
    return J.forEach(this, (r2, o2) => {
      const s2 = J.findKey(n2, o2);
      if (s2) return t3[s2] = ge(r2), void delete t3[o2];
      const i2 = e4 ? (function(e5) {
        return e5.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e6, t4, n3) => t4.toUpperCase() + n3);
      })(o2) : String(o2).trim();
      i2 !== o2 && delete t3[o2], t3[i2] = ge(r2), n2[i2] = true;
    }), this;
  }
  concat(...e4) {
    return this.constructor.concat(this, ...e4);
  }
  toJSON(e4) {
    const t3 = /* @__PURE__ */ Object.create(null);
    return J.forEach(this, (n2, r2) => {
      null != n2 && false !== n2 && (t3[r2] = e4 && J.isArray(n2) ? n2.join(", ") : n2);
    }), t3;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e4, t3]) => e4 + ": " + t3).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e4) {
    return e4 instanceof this ? e4 : new this(e4);
  }
  static concat(e4, ...t3) {
    const n2 = new this(e4);
    return t3.forEach((e5) => n2.set(e5)), n2;
  }
  static accessor(e4) {
    const t3 = (this[be] = this[be] = { accessors: {} }).accessors, n2 = this.prototype;
    function r2(e5) {
      const r3 = ye(e5);
      t3[r3] || (!(function(e6, t4) {
        const n3 = J.toCamelCase(" " + t4);
        ["get", "set", "has"].forEach((r4) => {
          Object.defineProperty(e6, r4 + n3, { value: function(e7, n4, o2) {
            return this[r4].call(this, t4, e7, n4, o2);
          }, configurable: true });
        });
      })(n2, e5), t3[r3] = true);
    }
    return J.isArray(e4) ? e4.forEach(r2) : r2(e4), this;
  }
};
function Oe(e4, t3) {
  const n2 = this || he, r2 = t3 || n2, o2 = Ee.from(r2.headers);
  let s2 = r2.data;
  return J.forEach(e4, function(e5) {
    s2 = e5.call(n2, s2, o2.normalize(), t3 ? t3.status : void 0);
  }), o2.normalize(), s2;
}
function Re(e4) {
  return !(!e4 || !e4.__CANCEL__);
}
function Se(e4, t3, n2) {
  W.call(this, null == e4 ? "canceled" : e4, W.ERR_CANCELED, t3, n2), this.name = "CanceledError";
}
function Te(e4, t3, n2) {
  const r2 = n2.config.validateStatus;
  n2.status && r2 && !r2(n2.status) ? t3(new W("Request failed with status code " + n2.status, [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor(n2.status / 100) - 4], n2.config, n2.request, n2)) : e4(n2);
}
Ee.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), J.reduceDescriptors(Ee.prototype, ({ value: e4 }, t3) => {
  let n2 = t3[0].toUpperCase() + t3.slice(1);
  return { get: () => e4, set(e5) {
    this[n2] = e5;
  } };
}), J.freezeMethods(Ee), J.inherits(Se, W, { __CANCEL__: true });
const Ae = (e4, t3, n2 = 3) => {
  let r2 = 0;
  const o2 = (function(e5, t4) {
    e5 = e5 || 10;
    const n3 = new Array(e5), r3 = new Array(e5);
    let o3, s2 = 0, i2 = 0;
    return t4 = void 0 !== t4 ? t4 : 1e3, function(a2) {
      const c2 = Date.now(), l2 = r3[i2];
      o3 || (o3 = c2), n3[s2] = a2, r3[s2] = c2;
      let u2 = i2, f2 = 0;
      for (; u2 !== s2; ) f2 += n3[u2++], u2 %= e5;
      if (s2 = (s2 + 1) % e5, s2 === i2 && (i2 = (i2 + 1) % e5), c2 - o3 < t4) return;
      const d2 = l2 && c2 - l2;
      return d2 ? Math.round(1e3 * f2 / d2) : void 0;
    };
  })(50, 250);
  return (function(e5, t4) {
    let n3, r3, o3 = 0, s2 = 1e3 / t4;
    const i2 = (t5, s3 = Date.now()) => {
      o3 = s3, n3 = null, r3 && (clearTimeout(r3), r3 = null), e5(...t5);
    };
    return [(...e6) => {
      const t5 = Date.now(), a2 = t5 - o3;
      a2 >= s2 ? i2(e6, t5) : (n3 = e6, r3 || (r3 = setTimeout(() => {
        r3 = null, i2(n3);
      }, s2 - a2)));
    }, () => n3 && i2(n3)];
  })((n3) => {
    const s2 = n3.loaded, i2 = n3.lengthComputable ? n3.total : void 0, a2 = s2 - r2, c2 = o2(a2);
    r2 = s2;
    e4({ loaded: s2, total: i2, progress: i2 ? s2 / i2 : void 0, bytes: a2, rate: c2 || void 0, estimated: c2 && i2 && s2 <= i2 ? (i2 - s2) / c2 : void 0, event: n3, lengthComputable: null != i2, [t3 ? "download" : "upload"]: true });
  }, n2);
}, ve = (e4, t3) => {
  const n2 = null != e4;
  return [(r2) => t3[0]({ lengthComputable: n2, total: e4, loaded: r2 }), t3[1]];
}, Ce = (e4) => (...t3) => J.asap(() => e4(...t3)), xe = de.hasStandardBrowserEnv ? /* @__PURE__ */ ((e4, t3) => (n2) => (n2 = new URL(n2, de.origin), e4.protocol === n2.protocol && e4.host === n2.host && (t3 || e4.port === n2.port)))(new URL(de.origin), de.navigator && /(msie|trident)/i.test(de.navigator.userAgent)) : () => true, je = de.hasStandardBrowserEnv ? { write(e4, t3, n2, r2, o2, s2, i2) {
  if ("undefined" == typeof document) return;
  const a2 = [`${e4}=${encodeURIComponent(t3)}`];
  J.isNumber(n2) && a2.push(`expires=${new Date(n2).toUTCString()}`), J.isString(r2) && a2.push(`path=${r2}`), J.isString(o2) && a2.push(`domain=${o2}`), true === s2 && a2.push("secure"), J.isString(i2) && a2.push(`SameSite=${i2}`), document.cookie = a2.join("; ");
}, read(e4) {
  if ("undefined" == typeof document) return null;
  const t3 = document.cookie.match(new RegExp("(?:^|; )" + e4 + "=([^;]*)"));
  return t3 ? decodeURIComponent(t3[1]) : null;
}, remove(e4) {
  this.write(e4, "", Date.now() - 864e5, "/");
} } : { write() {
}, read: () => null, remove() {
} };
function Ne(e4, t3, n2) {
  let r2 = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t3);
  return e4 && (r2 || 0 == n2) ? (function(e5, t4) {
    return t4 ? e5.replace(/\/?\/$/, "") + "/" + t4.replace(/^\/+/, "") : e5;
  })(e4, t3) : t3;
}
const Ue = (e4) => e4 instanceof Ee ? { ...e4 } : e4;
function Pe(e4, t3) {
  t3 = t3 || {};
  const n2 = {};
  function r2(e5, t4, n3, r3) {
    return J.isPlainObject(e5) && J.isPlainObject(t4) ? J.merge.call({ caseless: r3 }, e5, t4) : J.isPlainObject(t4) ? J.merge({}, t4) : J.isArray(t4) ? t4.slice() : t4;
  }
  function o2(e5, t4, n3, o3) {
    return J.isUndefined(t4) ? J.isUndefined(e5) ? void 0 : r2(void 0, e5, 0, o3) : r2(e5, t4, 0, o3);
  }
  function s2(e5, t4) {
    if (!J.isUndefined(t4)) return r2(void 0, t4);
  }
  function i2(e5, t4) {
    return J.isUndefined(t4) ? J.isUndefined(e5) ? void 0 : r2(void 0, e5) : r2(void 0, t4);
  }
  function a2(n3, o3, s3) {
    return s3 in t3 ? r2(n3, o3) : s3 in e4 ? r2(void 0, n3) : void 0;
  }
  const c2 = { url: s2, method: s2, data: s2, baseURL: i2, transformRequest: i2, transformResponse: i2, paramsSerializer: i2, timeout: i2, timeoutMessage: i2, withCredentials: i2, withXSRFToken: i2, adapter: i2, responseType: i2, xsrfCookieName: i2, xsrfHeaderName: i2, onUploadProgress: i2, onDownloadProgress: i2, decompress: i2, maxContentLength: i2, maxBodyLength: i2, beforeRedirect: i2, transport: i2, httpAgent: i2, httpsAgent: i2, cancelToken: i2, socketPath: i2, responseEncoding: i2, validateStatus: a2, headers: (e5, t4, n3) => o2(Ue(e5), Ue(t4), 0, true) };
  return J.forEach(Object.keys({ ...e4, ...t3 }), function(r3) {
    const s3 = c2[r3] || o2, i3 = s3(e4[r3], t3[r3], r3);
    J.isUndefined(i3) && s3 !== a2 || (n2[r3] = i3);
  }), n2;
}
const Fe = (e4) => {
  const t3 = Pe({}, e4);
  let { data: n2, withXSRFToken: r2, xsrfHeaderName: o2, xsrfCookieName: s2, headers: i2, auth: a2 } = t3;
  if (t3.headers = i2 = Ee.from(i2), t3.url = re(Ne(t3.baseURL, t3.url, t3.allowAbsoluteUrls), e4.params, e4.paramsSerializer), a2 && i2.set("Authorization", "Basic " + btoa((a2.username || "") + ":" + (a2.password ? unescape(encodeURIComponent(a2.password)) : ""))), J.isFormData(n2)) {
    if (de.hasStandardBrowserEnv || de.hasStandardBrowserWebWorkerEnv) i2.setContentType(void 0);
    else if (J.isFunction(n2.getHeaders)) {
      const e5 = n2.getHeaders(), t4 = ["content-type", "content-length"];
      Object.entries(e5).forEach(([e6, n3]) => {
        t4.includes(e6.toLowerCase()) && i2.set(e6, n3);
      });
    }
  }
  if (de.hasStandardBrowserEnv && (r2 && J.isFunction(r2) && (r2 = r2(t3)), r2 || false !== r2 && xe(t3.url))) {
    const e5 = o2 && s2 && je.read(s2);
    e5 && i2.set(o2, e5);
  }
  return t3;
}, _e = "undefined" != typeof XMLHttpRequest && function(e4) {
  return new Promise(function(t3, n2) {
    const r2 = Fe(e4);
    let o2 = r2.data;
    const s2 = Ee.from(r2.headers).normalize();
    let i2, a2, c2, l2, u2, { responseType: f2, onUploadProgress: d2, onDownloadProgress: p2 } = r2;
    function h2() {
      l2 && l2(), u2 && u2(), r2.cancelToken && r2.cancelToken.unsubscribe(i2), r2.signal && r2.signal.removeEventListener("abort", i2);
    }
    let m2 = new XMLHttpRequest();
    function b2() {
      if (!m2) return;
      const r3 = Ee.from("getAllResponseHeaders" in m2 && m2.getAllResponseHeaders());
      Te(function(e5) {
        t3(e5), h2();
      }, function(e5) {
        n2(e5), h2();
      }, { data: f2 && "text" !== f2 && "json" !== f2 ? m2.response : m2.responseText, status: m2.status, statusText: m2.statusText, headers: r3, config: e4, request: m2 }), m2 = null;
    }
    m2.open(r2.method.toUpperCase(), r2.url, true), m2.timeout = r2.timeout, "onloadend" in m2 ? m2.onloadend = b2 : m2.onreadystatechange = function() {
      m2 && 4 === m2.readyState && (0 !== m2.status || m2.responseURL && 0 === m2.responseURL.indexOf("file:")) && setTimeout(b2);
    }, m2.onabort = function() {
      m2 && (n2(new W("Request aborted", W.ECONNABORTED, e4, m2)), m2 = null);
    }, m2.onerror = function(t4) {
      const r3 = new W(t4 && t4.message ? t4.message : "Network Error", W.ERR_NETWORK, e4, m2);
      r3.event = t4 || null, n2(r3), m2 = null;
    }, m2.ontimeout = function() {
      let t4 = r2.timeout ? "timeout of " + r2.timeout + "ms exceeded" : "timeout exceeded";
      const o3 = r2.transitional || se;
      r2.timeoutErrorMessage && (t4 = r2.timeoutErrorMessage), n2(new W(t4, o3.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED, e4, m2)), m2 = null;
    }, void 0 === o2 && s2.setContentType(null), "setRequestHeader" in m2 && J.forEach(s2.toJSON(), function(e5, t4) {
      m2.setRequestHeader(t4, e5);
    }), J.isUndefined(r2.withCredentials) || (m2.withCredentials = !!r2.withCredentials), f2 && "json" !== f2 && (m2.responseType = r2.responseType), p2 && ([c2, u2] = Ae(p2, true), m2.addEventListener("progress", c2)), d2 && m2.upload && ([a2, l2] = Ae(d2), m2.upload.addEventListener("progress", a2), m2.upload.addEventListener("loadend", l2)), (r2.cancelToken || r2.signal) && (i2 = (t4) => {
      m2 && (n2(!t4 || t4.type ? new Se(null, e4, m2) : t4), m2.abort(), m2 = null);
    }, r2.cancelToken && r2.cancelToken.subscribe(i2), r2.signal && (r2.signal.aborted ? i2() : r2.signal.addEventListener("abort", i2)));
    const y2 = (function(e5) {
      const t4 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e5);
      return t4 && t4[1] || "";
    })(r2.url);
    y2 && -1 === de.protocols.indexOf(y2) ? n2(new W("Unsupported protocol " + y2 + ":", W.ERR_BAD_REQUEST, e4)) : m2.send(o2 || null);
  });
}, Le = (e4, t3) => {
  const { length: n2 } = e4 = e4 ? e4.filter(Boolean) : [];
  if (t3 || n2) {
    let n3, r2 = new AbortController();
    const o2 = function(e5) {
      if (!n3) {
        n3 = true, i2();
        const t4 = e5 instanceof Error ? e5 : this.reason;
        r2.abort(t4 instanceof W ? t4 : new Se(t4 instanceof Error ? t4.message : t4));
      }
    };
    let s2 = t3 && setTimeout(() => {
      s2 = null, o2(new W(`timeout ${t3} of ms exceeded`, W.ETIMEDOUT));
    }, t3);
    const i2 = () => {
      e4 && (s2 && clearTimeout(s2), s2 = null, e4.forEach((e5) => {
        e5.unsubscribe ? e5.unsubscribe(o2) : e5.removeEventListener("abort", o2);
      }), e4 = null);
    };
    e4.forEach((e5) => e5.addEventListener("abort", o2));
    const { signal: a2 } = r2;
    return a2.unsubscribe = () => J.asap(i2), a2;
  }
}, ke = function* (e4, t3) {
  let n2 = e4.byteLength;
  if (n2 < t3) return void (yield e4);
  let r2, o2 = 0;
  for (; o2 < n2; ) r2 = o2 + t3, yield e4.slice(o2, r2), o2 = r2;
}, Be = async function* (e4) {
  if (e4[Symbol.asyncIterator]) return void (yield* e4);
  const t3 = e4.getReader();
  try {
    for (; ; ) {
      const { done: e5, value: n2 } = await t3.read();
      if (e5) break;
      yield n2;
    }
  } finally {
    await t3.cancel();
  }
}, De = (e4, t3, n2, r2) => {
  const o2 = (async function* (e5, t4) {
    for await (const n3 of Be(e5)) yield* ke(n3, t4);
  })(e4, t3);
  let s2, i2 = 0, a2 = (e5) => {
    s2 || (s2 = true, r2 && r2(e5));
  };
  return new ReadableStream({ async pull(e5) {
    try {
      const { done: t4, value: r3 } = await o2.next();
      if (t4) return a2(), void e5.close();
      let s3 = r3.byteLength;
      if (n2) {
        let e6 = i2 += s3;
        n2(e6);
      }
      e5.enqueue(new Uint8Array(r3));
    } catch (e6) {
      throw a2(e6), e6;
    }
  }, cancel: (e5) => (a2(e5), o2.return()) }, { highWaterMark: 2 });
}, { isFunction: qe } = J, Ie = (({ Request: e4, Response: t3 }) => ({ Request: e4, Response: t3 }))(J.global), { ReadableStream: Me, TextEncoder: ze } = J.global, He = (e4, ...t3) => {
  try {
    return !!e4(...t3);
  } catch (e5) {
    return false;
  }
}, Je = (e4) => {
  e4 = J.merge.call({ skipUndefined: true }, Ie, e4);
  const { fetch: t3, Request: n2, Response: r2 } = e4, o2 = t3 ? qe(t3) : "function" == typeof fetch, s2 = qe(n2), i2 = qe(r2);
  if (!o2) return false;
  const a2 = o2 && qe(Me), c2 = o2 && ("function" == typeof ze ? (l2 = new ze(), (e5) => l2.encode(e5)) : async (e5) => new Uint8Array(await new n2(e5).arrayBuffer()));
  var l2;
  const u2 = s2 && a2 && He(() => {
    let e5 = false;
    const t4 = new n2(de.origin, { body: new Me(), method: "POST", get duplex() {
      return e5 = true, "half";
    } }).headers.has("Content-Type");
    return e5 && !t4;
  }), f2 = i2 && a2 && He(() => J.isReadableStream(new r2("").body)), d2 = { stream: f2 && ((e5) => e5.body) };
  o2 && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e5) => {
    !d2[e5] && (d2[e5] = (t4, n3) => {
      let r3 = t4 && t4[e5];
      if (r3) return r3.call(t4);
      throw new W(`Response type '${e5}' is not supported`, W.ERR_NOT_SUPPORT, n3);
    });
  });
  const p2 = async (e5, t4) => {
    const r3 = J.toFiniteNumber(e5.getContentLength());
    return null == r3 ? (async (e6) => {
      if (null == e6) return 0;
      if (J.isBlob(e6)) return e6.size;
      if (J.isSpecCompliantForm(e6)) {
        const t5 = new n2(de.origin, { method: "POST", body: e6 });
        return (await t5.arrayBuffer()).byteLength;
      }
      return J.isArrayBufferView(e6) || J.isArrayBuffer(e6) ? e6.byteLength : (J.isURLSearchParams(e6) && (e6 += ""), J.isString(e6) ? (await c2(e6)).byteLength : void 0);
    })(t4) : r3;
  };
  return async (e5) => {
    let { url: o3, method: i3, data: a3, signal: c3, cancelToken: l3, timeout: h2, onDownloadProgress: m2, onUploadProgress: b2, responseType: y2, headers: g2, withCredentials: w2 = "same-origin", fetchOptions: E2 } = Fe(e5), O2 = t3 || fetch;
    y2 = y2 ? (y2 + "").toLowerCase() : "text";
    let R2 = Le([c3, l3 && l3.toAbortSignal()], h2), S2 = null;
    const T2 = R2 && R2.unsubscribe && (() => {
      R2.unsubscribe();
    });
    let A2;
    try {
      if (b2 && u2 && "get" !== i3 && "head" !== i3 && 0 !== (A2 = await p2(g2, a3))) {
        let e6, t5 = new n2(o3, { method: "POST", body: a3, duplex: "half" });
        if (J.isFormData(a3) && (e6 = t5.headers.get("content-type")) && g2.setContentType(e6), t5.body) {
          const [e7, n3] = ve(A2, Ae(Ce(b2)));
          a3 = De(t5.body, 65536, e7, n3);
        }
      }
      J.isString(w2) || (w2 = w2 ? "include" : "omit");
      const t4 = s2 && "credentials" in n2.prototype, c4 = { ...E2, signal: R2, method: i3.toUpperCase(), headers: g2.normalize().toJSON(), body: a3, duplex: "half", credentials: t4 ? w2 : void 0 };
      S2 = s2 && new n2(o3, c4);
      let l4 = await (s2 ? O2(S2, E2) : O2(o3, c4));
      const h3 = f2 && ("stream" === y2 || "response" === y2);
      if (f2 && (m2 || h3 && T2)) {
        const e6 = {};
        ["status", "statusText", "headers"].forEach((t6) => {
          e6[t6] = l4[t6];
        });
        const t5 = J.toFiniteNumber(l4.headers.get("content-length")), [n3, o4] = m2 && ve(t5, Ae(Ce(m2), true)) || [];
        l4 = new r2(De(l4.body, 65536, n3, () => {
          o4 && o4(), T2 && T2();
        }), e6);
      }
      y2 = y2 || "text";
      let v2 = await d2[J.findKey(d2, y2) || "text"](l4, e5);
      return !h3 && T2 && T2(), await new Promise((t5, n3) => {
        Te(t5, n3, { data: v2, headers: Ee.from(l4.headers), status: l4.status, statusText: l4.statusText, config: e5, request: S2 });
      });
    } catch (t4) {
      if (T2 && T2(), t4 && "TypeError" === t4.name && /Load failed|fetch/i.test(t4.message)) throw Object.assign(new W("Network Error", W.ERR_NETWORK, e5, S2), { cause: t4.cause || t4 });
      throw W.from(t4, t4 && t4.code, e5, S2);
    }
  };
}, We = /* @__PURE__ */ new Map(), Ke = (e4) => {
  let t3 = e4 && e4.env || {};
  const { fetch: n2, Request: r2, Response: o2 } = t3, s2 = [r2, o2, n2];
  let i2, a2, c2 = s2.length, l2 = We;
  for (; c2--; ) i2 = s2[c2], a2 = l2.get(i2), void 0 === a2 && l2.set(i2, a2 = c2 ? /* @__PURE__ */ new Map() : Je(t3)), l2 = a2;
  return a2;
};
Ke();
const Ve = { http: null, xhr: _e, fetch: { get: Ke } };
J.forEach(Ve, (e4, t3) => {
  if (e4) {
    try {
      Object.defineProperty(e4, "name", { value: t3 });
    } catch (e5) {
    }
    Object.defineProperty(e4, "adapterName", { value: t3 });
  }
});
const $e = (e4) => `- ${e4}`, Xe = (e4) => J.isFunction(e4) || null === e4 || false === e4;
const Ge = { getAdapter: function(e4, t3) {
  e4 = J.isArray(e4) ? e4 : [e4];
  const { length: n2 } = e4;
  let r2, o2;
  const s2 = {};
  for (let i2 = 0; i2 < n2; i2++) {
    let n3;
    if (r2 = e4[i2], o2 = r2, !Xe(r2) && (o2 = Ve[(n3 = String(r2)).toLowerCase()], void 0 === o2)) throw new W(`Unknown adapter '${n3}'`);
    if (o2 && (J.isFunction(o2) || (o2 = o2.get(t3)))) break;
    s2[n3 || "#" + i2] = o2;
  }
  if (!o2) {
    const e5 = Object.entries(s2).map(([e6, t4]) => `adapter ${e6} ` + (false === t4 ? "is not supported by the environment" : "is not available in the build"));
    throw new W("There is no suitable adapter to dispatch the request " + (n2 ? e5.length > 1 ? "since :\n" + e5.map($e).join("\n") : " " + $e(e5[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
  }
  return o2;
}, adapters: Ve };
function Qe(e4) {
  if (e4.cancelToken && e4.cancelToken.throwIfRequested(), e4.signal && e4.signal.aborted) throw new Se(null, e4);
}
function Ze(e4) {
  Qe(e4), e4.headers = Ee.from(e4.headers), e4.data = Oe.call(e4, e4.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e4.method) && e4.headers.setContentType("application/x-www-form-urlencoded", false);
  return Ge.getAdapter(e4.adapter || he.adapter, e4)(e4).then(function(t3) {
    return Qe(e4), t3.data = Oe.call(e4, e4.transformResponse, t3), t3.headers = Ee.from(t3.headers), t3;
  }, function(t3) {
    return Re(t3) || (Qe(e4), t3 && t3.response && (t3.response.data = Oe.call(e4, e4.transformResponse, t3.response), t3.response.headers = Ee.from(t3.response.headers))), Promise.reject(t3);
  });
}
const Ye = "1.13.2", et = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e4, t3) => {
  et[e4] = function(n2) {
    return typeof n2 === e4 || "a" + (t3 < 1 ? "n " : " ") + e4;
  };
});
const tt = {};
et.transitional = function(e4, t3, n2) {
  return (r2, o2, s2) => {
    if (false === e4) throw new W((function(e5, t4) {
      return "[Axios v" + Ye + "] Transitional option '" + e5 + "'" + t4 + (n2 ? ". " + n2 : "");
    })(o2, " has been removed" + (t3 ? " in " + t3 : "")), W.ERR_DEPRECATED);
    return t3 && !tt[o2] && (tt[o2] = true), !e4 || e4(r2, o2, s2);
  };
}, et.spelling = function(e4) {
  return (e5, t3) => true;
};
const nt = { assertOptions: function(e4, t3, n2) {
  if ("object" != typeof e4) throw new W("options must be an object", W.ERR_BAD_OPTION_VALUE);
  const r2 = Object.keys(e4);
  let o2 = r2.length;
  for (; o2-- > 0; ) {
    const s2 = r2[o2], i2 = t3[s2];
    if (i2) {
      const t4 = e4[s2], n3 = void 0 === t4 || i2(t4, s2, e4);
      if (true !== n3) throw new W("option " + s2 + " must be " + n3, W.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (true !== n2) throw new W("Unknown option " + s2, W.ERR_BAD_OPTION);
  }
}, validators: et }, rt = nt.validators;
let ot = class {
  constructor(e4) {
    this.defaults = e4 || {}, this.interceptors = { request: new oe(), response: new oe() };
  }
  async request(e4, t3) {
    try {
      return await this._request(e4, t3);
    } catch (e5) {
      if (e5 instanceof Error) {
        let t4 = {};
        Error.captureStackTrace ? Error.captureStackTrace(t4) : t4 = new Error();
        const n2 = t4.stack ? t4.stack.replace(/^.+\n/, "") : "";
        try {
          e5.stack ? n2 && !String(e5.stack).endsWith(n2.replace(/^.+\n.+\n/, "")) && (e5.stack += "\n" + n2) : e5.stack = n2;
        } catch (e6) {
        }
      }
      throw e5;
    }
  }
  _request(e4, t3) {
    "string" == typeof e4 ? (t3 = t3 || {}).url = e4 : t3 = e4 || {}, t3 = Pe(this.defaults, t3);
    const { transitional: n2, paramsSerializer: r2, headers: o2 } = t3;
    void 0 !== n2 && nt.assertOptions(n2, { silentJSONParsing: rt.transitional(rt.boolean), forcedJSONParsing: rt.transitional(rt.boolean), clarifyTimeoutError: rt.transitional(rt.boolean) }, false), null != r2 && (J.isFunction(r2) ? t3.paramsSerializer = { serialize: r2 } : nt.assertOptions(r2, { encode: rt.function, serialize: rt.function }, true)), void 0 !== t3.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? t3.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t3.allowAbsoluteUrls = true), nt.assertOptions(t3, { baseUrl: rt.spelling("baseURL"), withXsrfToken: rt.spelling("withXSRFToken") }, true), t3.method = (t3.method || this.defaults.method || "get").toLowerCase();
    let s2 = o2 && J.merge(o2.common, o2[t3.method]);
    o2 && J.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e5) => {
      delete o2[e5];
    }), t3.headers = Ee.concat(s2, o2);
    const i2 = [];
    let a2 = true;
    this.interceptors.request.forEach(function(e5) {
      "function" == typeof e5.runWhen && false === e5.runWhen(t3) || (a2 = a2 && e5.synchronous, i2.unshift(e5.fulfilled, e5.rejected));
    });
    const c2 = [];
    let l2;
    this.interceptors.response.forEach(function(e5) {
      c2.push(e5.fulfilled, e5.rejected);
    });
    let u2, f2 = 0;
    if (!a2) {
      const e5 = [Ze.bind(this), void 0];
      for (e5.unshift(...i2), e5.push(...c2), u2 = e5.length, l2 = Promise.resolve(t3); f2 < u2; ) l2 = l2.then(e5[f2++], e5[f2++]);
      return l2;
    }
    u2 = i2.length;
    let d2 = t3;
    for (; f2 < u2; ) {
      const e5 = i2[f2++], t4 = i2[f2++];
      try {
        d2 = e5(d2);
      } catch (e6) {
        t4.call(this, e6);
        break;
      }
    }
    try {
      l2 = Ze.call(this, d2);
    } catch (e5) {
      return Promise.reject(e5);
    }
    for (f2 = 0, u2 = c2.length; f2 < u2; ) l2 = l2.then(c2[f2++], c2[f2++]);
    return l2;
  }
  getUri(e4) {
    return re(Ne((e4 = Pe(this.defaults, e4)).baseURL, e4.url, e4.allowAbsoluteUrls), e4.params, e4.paramsSerializer);
  }
};
J.forEach(["delete", "get", "head", "options"], function(e4) {
  ot.prototype[e4] = function(t3, n2) {
    return this.request(Pe(n2 || {}, { method: e4, url: t3, data: (n2 || {}).data }));
  };
}), J.forEach(["post", "put", "patch"], function(e4) {
  function t3(t4) {
    return function(n2, r2, o2) {
      return this.request(Pe(o2 || {}, { method: e4, headers: t4 ? { "Content-Type": "multipart/form-data" } : {}, url: n2, data: r2 }));
    };
  }
  ot.prototype[e4] = t3(), ot.prototype[e4 + "Form"] = t3(true);
});
const st = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(st).forEach(([e4, t3]) => {
  st[t3] = e4;
});
const it = (function t2(n2) {
  const r2 = new ot(n2), o2 = e(ot.prototype.request, r2);
  return J.extend(o2, ot.prototype, r2, { allOwnKeys: true }), J.extend(o2, r2, null, { allOwnKeys: true }), o2.create = function(e4) {
    return t2(Pe(n2, e4));
  }, o2;
})(he);
it.Axios = ot, it.CanceledError = Se, it.CancelToken = class e3 {
  constructor(e4) {
    if ("function" != typeof e4) throw new TypeError("executor must be a function.");
    let t3;
    this.promise = new Promise(function(e5) {
      t3 = e5;
    });
    const n2 = this;
    this.promise.then((e5) => {
      if (!n2._listeners) return;
      let t4 = n2._listeners.length;
      for (; t4-- > 0; ) n2._listeners[t4](e5);
      n2._listeners = null;
    }), this.promise.then = (e5) => {
      let t4;
      const r2 = new Promise((e6) => {
        n2.subscribe(e6), t4 = e6;
      }).then(e5);
      return r2.cancel = function() {
        n2.unsubscribe(t4);
      }, r2;
    }, e4(function(e5, r2, o2) {
      n2.reason || (n2.reason = new Se(e5, r2, o2), t3(n2.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e4) {
    this.reason ? e4(this.reason) : this._listeners ? this._listeners.push(e4) : this._listeners = [e4];
  }
  unsubscribe(e4) {
    if (!this._listeners) return;
    const t3 = this._listeners.indexOf(e4);
    -1 !== t3 && this._listeners.splice(t3, 1);
  }
  toAbortSignal() {
    const e4 = new AbortController(), t3 = (t4) => {
      e4.abort(t4);
    };
    return this.subscribe(t3), e4.signal.unsubscribe = () => this.unsubscribe(t3), e4.signal;
  }
  static source() {
    let t3;
    return { token: new e3(function(e4) {
      t3 = e4;
    }), cancel: t3 };
  }
}, it.isCancel = Re, it.VERSION = Ye, it.toFormData = Z, it.AxiosError = W, it.Cancel = it.CanceledError, it.all = function(e4) {
  return Promise.all(e4);
}, it.spread = function(e4) {
  return function(t3) {
    return e4.apply(null, t3);
  };
}, it.isAxiosError = function(e4) {
  return J.isObject(e4) && true === e4.isAxiosError;
}, it.mergeConfig = Pe, it.AxiosHeaders = Ee, it.formToJSON = (e4) => pe(J.isHTMLForm(e4) ? new FormData(e4) : e4), it.getAdapter = Ge.getAdapter, it.HttpStatusCode = st, it.default = it;
const { Axios: at, AxiosError: ct, CanceledError: lt, isCancel: ut, CancelToken: ft, VERSION: dt, all: pt, Cancel: ht, isAxiosError: mt, spread: bt, toFormData: yt, AxiosHeaders: gt, HttpStatusCode: wt, formToJSON: Et, getAdapter: Ot, mergeConfig: Rt } = it;
export {
  it as a
};
