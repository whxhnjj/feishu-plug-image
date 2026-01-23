import { c as t } from "./call-bind-apply-helpers-uOwG8Nag.js";
import { r as e } from "./crypto-js-kFogrGFp.js";
var r, n;
function o() {
  if (n) return r;
  n = 1;
  var o2 = "function" == typeof Map && Map.prototype, i = Object.getOwnPropertyDescriptor && o2 ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, u = o2 && i && "function" == typeof i.get ? i.get : null, l = o2 && Map.prototype.forEach, c = "function" == typeof Set && Set.prototype, a = Object.getOwnPropertyDescriptor && c ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, f = c && a && "function" == typeof a.get ? a.get : null, p = c && Set.prototype.forEach, y = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, g = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, s = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, b = Boolean.prototype.valueOf, h = Object.prototype.toString, S = Function.prototype.toString, m = String.prototype.match, d = String.prototype.slice, v = String.prototype.replace, j = String.prototype.toUpperCase, O = String.prototype.toLowerCase, w = RegExp.prototype.test, _ = Array.prototype.concat, x = Array.prototype.join, W = Array.prototype.slice, k = Math.floor, E = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, M = Object.getOwnPropertySymbols, T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, L = "function" == typeof Symbol && "object" == typeof Symbol.iterator, $ = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === L || "symbol") ? Symbol.toStringTag : null, A = Object.prototype.propertyIsEnumerable, q = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t2) {
    return t2.__proto__;
  } : null);
  function I(t2, e2) {
    if (t2 === 1 / 0 || t2 === -1 / 0 || t2 != t2 || t2 && t2 > -1e3 && t2 < 1e3 || w.call(/e/, e2)) return e2;
    var r2 = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if ("number" == typeof t2) {
      var n2 = t2 < 0 ? -k(-t2) : k(t2);
      if (n2 !== t2) {
        var o3 = String(n2), i2 = d.call(e2, o3.length + 1);
        return v.call(o3, r2, "$&_") + "." + v.call(v.call(i2, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return v.call(e2, r2, "$&_");
  }
  var N = e, P = N.custom, R = G(P) ? P : null, D = { __proto__: null, double: '"', single: "'" }, B = { __proto__: null, double: /(["\\])/g, single: /(['\\])/g };
  function C(t2, e2, r2) {
    var n2 = r2.quoteStyle || e2, o3 = D[n2];
    return o3 + t2 + o3;
  }
  function z(t2) {
    return v.call(String(t2), /"/g, "&quot;");
  }
  function F(t2) {
    return !$ || !("object" == typeof t2 && ($ in t2 || void 0 !== t2[$]));
  }
  function H(t2) {
    return "[object Array]" === Q(t2) && F(t2);
  }
  function U(t2) {
    return "[object RegExp]" === Q(t2) && F(t2);
  }
  function G(t2) {
    if (L) return t2 && "object" == typeof t2 && t2 instanceof Symbol;
    if ("symbol" == typeof t2) return true;
    if (!t2 || "object" != typeof t2 || !T) return false;
    try {
      return T.call(t2), true;
    } catch (t3) {
    }
    return false;
  }
  r = function e2(r2, n2, o3, i2) {
    var c2 = n2 || {};
    if (K(c2, "quoteStyle") && !K(D, c2.quoteStyle)) throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (K(c2, "maxStringLength") && ("number" == typeof c2.maxStringLength ? c2.maxStringLength < 0 && c2.maxStringLength !== 1 / 0 : null !== c2.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var a2 = !K(c2, "customInspect") || c2.customInspect;
    if ("boolean" != typeof a2 && "symbol" !== a2) throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (K(c2, "indent") && null !== c2.indent && "	" !== c2.indent && !(parseInt(c2.indent, 10) === c2.indent && c2.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (K(c2, "numericSeparator") && "boolean" != typeof c2.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var h2 = c2.numericSeparator;
    if (void 0 === r2) return "undefined";
    if (null === r2) return "null";
    if ("boolean" == typeof r2) return r2 ? "true" : "false";
    if ("string" == typeof r2) return X(r2, c2);
    if ("number" == typeof r2) {
      if (0 === r2) return 1 / 0 / r2 > 0 ? "0" : "-0";
      var j2 = String(r2);
      return h2 ? I(r2, j2) : j2;
    }
    if ("bigint" == typeof r2) {
      var w2 = String(r2) + "n";
      return h2 ? I(r2, w2) : w2;
    }
    var k2 = void 0 === c2.depth ? 5 : c2.depth;
    if (void 0 === o3 && (o3 = 0), o3 >= k2 && k2 > 0 && "object" == typeof r2) return H(r2) ? "[Array]" : "[Object]";
    var M2 = (function(t2, e3) {
      var r3;
      if ("	" === t2.indent) r3 = "	";
      else {
        if (!("number" == typeof t2.indent && t2.indent > 0)) return null;
        r3 = x.call(Array(t2.indent + 1), " ");
      }
      return { base: r3, prev: x.call(Array(e3 + 1), r3) };
    })(c2, o3);
    if (void 0 === i2) i2 = [];
    else if (V(i2, r2) >= 0) return "[Circular]";
    function P2(t2, r3, n3) {
      if (r3 && (i2 = W.call(i2)).push(r3), n3) {
        var u2 = { depth: c2.depth };
        return K(c2, "quoteStyle") && (u2.quoteStyle = c2.quoteStyle), e2(t2, u2, o3 + 1, i2);
      }
      return e2(t2, c2, o3 + 1, i2);
    }
    if ("function" == typeof r2 && !U(r2)) {
      var B2 = (function(t2) {
        if (t2.name) return t2.name;
        var e3 = m.call(S.call(t2), /^function\s*([\w$]+)/);
        if (e3) return e3[1];
        return null;
      })(r2), J2 = nt(r2, P2);
      return "[Function" + (B2 ? ": " + B2 : " (anonymous)") + "]" + (J2.length > 0 ? " { " + x.call(J2, ", ") + " }" : "");
    }
    if (G(r2)) {
      var Y2 = L ? v.call(String(r2), /^(Symbol\(.*\))_[^)]*$/, "$1") : T.call(r2);
      return "object" != typeof r2 || L ? Y2 : Z(Y2);
    }
    if ((function(t2) {
      if (!t2 || "object" != typeof t2) return false;
      if ("undefined" != typeof HTMLElement && t2 instanceof HTMLElement) return true;
      return "string" == typeof t2.nodeName && "function" == typeof t2.getAttribute;
    })(r2)) {
      for (var ot = "<" + O.call(String(r2.nodeName)), it = r2.attributes || [], ut = 0; ut < it.length; ut++) ot += " " + it[ut].name + "=" + C(z(it[ut].value), "double", c2);
      return ot += ">", r2.childNodes && r2.childNodes.length && (ot += "..."), ot += "</" + O.call(String(r2.nodeName)) + ">";
    }
    if (H(r2)) {
      if (0 === r2.length) return "[]";
      var lt = nt(r2, P2);
      return M2 && !(function(t2) {
        for (var e3 = 0; e3 < t2.length; e3++) if (V(t2[e3], "\n") >= 0) return false;
        return true;
      })(lt) ? "[" + rt(lt, M2) + "]" : "[ " + x.call(lt, ", ") + " ]";
    }
    if ((function(t2) {
      return "[object Error]" === Q(t2) && F(t2);
    })(r2)) {
      var ct = nt(r2, P2);
      return "cause" in Error.prototype || !("cause" in r2) || A.call(r2, "cause") ? 0 === ct.length ? "[" + String(r2) + "]" : "{ [" + String(r2) + "] " + x.call(ct, ", ") + " }" : "{ [" + String(r2) + "] " + x.call(_.call("[cause]: " + P2(r2.cause), ct), ", ") + " }";
    }
    if ("object" == typeof r2 && a2) {
      if (R && "function" == typeof r2[R] && N) return N(r2, { depth: k2 - o3 });
      if ("symbol" !== a2 && "function" == typeof r2.inspect) return r2.inspect();
    }
    if ((function(t2) {
      if (!u || !t2 || "object" != typeof t2) return false;
      try {
        u.call(t2);
        try {
          f.call(t2);
        } catch (t3) {
          return true;
        }
        return t2 instanceof Map;
      } catch (t3) {
      }
      return false;
    })(r2)) {
      var at = [];
      return l && l.call(r2, function(t2, e3) {
        at.push(P2(e3, r2, true) + " => " + P2(t2, r2));
      }), et("Map", u.call(r2), at, M2);
    }
    if ((function(t2) {
      if (!f || !t2 || "object" != typeof t2) return false;
      try {
        f.call(t2);
        try {
          u.call(t2);
        } catch (t3) {
          return true;
        }
        return t2 instanceof Set;
      } catch (t3) {
      }
      return false;
    })(r2)) {
      var ft = [];
      return p && p.call(r2, function(t2) {
        ft.push(P2(t2, r2));
      }), et("Set", f.call(r2), ft, M2);
    }
    if ((function(t2) {
      if (!y || !t2 || "object" != typeof t2) return false;
      try {
        y.call(t2, y);
        try {
          g.call(t2, g);
        } catch (t3) {
          return true;
        }
        return t2 instanceof WeakMap;
      } catch (t3) {
      }
      return false;
    })(r2)) return tt("WeakMap");
    if ((function(t2) {
      if (!g || !t2 || "object" != typeof t2) return false;
      try {
        g.call(t2, g);
        try {
          y.call(t2, y);
        } catch (t3) {
          return true;
        }
        return t2 instanceof WeakSet;
      } catch (t3) {
      }
      return false;
    })(r2)) return tt("WeakSet");
    if ((function(t2) {
      if (!s || !t2 || "object" != typeof t2) return false;
      try {
        return s.call(t2), true;
      } catch (t3) {
      }
      return false;
    })(r2)) return tt("WeakRef");
    if ((function(t2) {
      return "[object Number]" === Q(t2) && F(t2);
    })(r2)) return Z(P2(Number(r2)));
    if ((function(t2) {
      if (!t2 || "object" != typeof t2 || !E) return false;
      try {
        return E.call(t2), true;
      } catch (t3) {
      }
      return false;
    })(r2)) return Z(P2(E.call(r2)));
    if ((function(t2) {
      return "[object Boolean]" === Q(t2) && F(t2);
    })(r2)) return Z(b.call(r2));
    if ((function(t2) {
      return "[object String]" === Q(t2) && F(t2);
    })(r2)) return Z(P2(String(r2)));
    if ("undefined" != typeof window && r2 === window) return "{ [object Window] }";
    if ("undefined" != typeof globalThis && r2 === globalThis || void 0 !== t && r2 === t) return "{ [object globalThis] }";
    if (!(function(t2) {
      return "[object Date]" === Q(t2) && F(t2);
    })(r2) && !U(r2)) {
      var pt = nt(r2, P2), yt = q ? q(r2) === Object.prototype : r2 instanceof Object || r2.constructor === Object, gt = r2 instanceof Object ? "" : "null prototype", st = !yt && $ && Object(r2) === r2 && $ in r2 ? d.call(Q(r2), 8, -1) : gt ? "Object" : "", bt = (yt || "function" != typeof r2.constructor ? "" : r2.constructor.name ? r2.constructor.name + " " : "") + (st || gt ? "[" + x.call(_.call([], st || [], gt || []), ": ") + "] " : "");
      return 0 === pt.length ? bt + "{}" : M2 ? bt + "{" + rt(pt, M2) + "}" : bt + "{ " + x.call(pt, ", ") + " }";
    }
    return String(r2);
  };
  var J = Object.prototype.hasOwnProperty || function(t2) {
    return t2 in this;
  };
  function K(t2, e2) {
    return J.call(t2, e2);
  }
  function Q(t2) {
    return h.call(t2);
  }
  function V(t2, e2) {
    if (t2.indexOf) return t2.indexOf(e2);
    for (var r2 = 0, n2 = t2.length; r2 < n2; r2++) if (t2[r2] === e2) return r2;
    return -1;
  }
  function X(t2, e2) {
    if (t2.length > e2.maxStringLength) {
      var r2 = t2.length - e2.maxStringLength, n2 = "... " + r2 + " more character" + (r2 > 1 ? "s" : "");
      return X(d.call(t2, 0, e2.maxStringLength), e2) + n2;
    }
    var o3 = B[e2.quoteStyle || "single"];
    return o3.lastIndex = 0, C(v.call(v.call(t2, o3, "\\$1"), /[\x00-\x1f]/g, Y), "single", e2);
  }
  function Y(t2) {
    var e2 = t2.charCodeAt(0), r2 = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e2];
    return r2 ? "\\" + r2 : "\\x" + (e2 < 16 ? "0" : "") + j.call(e2.toString(16));
  }
  function Z(t2) {
    return "Object(" + t2 + ")";
  }
  function tt(t2) {
    return t2 + " { ? }";
  }
  function et(t2, e2, r2, n2) {
    return t2 + " (" + e2 + ") {" + (n2 ? rt(r2, n2) : x.call(r2, ", ")) + "}";
  }
  function rt(t2, e2) {
    if (0 === t2.length) return "";
    var r2 = "\n" + e2.prev + e2.base;
    return r2 + x.call(t2, "," + r2) + "\n" + e2.prev;
  }
  function nt(t2, e2) {
    var r2 = H(t2), n2 = [];
    if (r2) {
      n2.length = t2.length;
      for (var o3 = 0; o3 < t2.length; o3++) n2[o3] = K(t2, o3) ? e2(t2[o3], t2) : "";
    }
    var i2, u2 = "function" == typeof M ? M(t2) : [];
    if (L) {
      i2 = {};
      for (var l2 = 0; l2 < u2.length; l2++) i2["$" + u2[l2]] = u2[l2];
    }
    for (var c2 in t2) K(t2, c2) && (r2 && String(Number(c2)) === c2 && c2 < t2.length || L && i2["$" + c2] instanceof Symbol || (w.call(/[^\w$]/, c2) ? n2.push(e2(c2, t2) + ": " + e2(t2[c2], t2)) : n2.push(c2 + ": " + e2(t2[c2], t2))));
    if ("function" == typeof M) for (var a2 = 0; a2 < u2.length; a2++) A.call(t2, u2[a2]) && n2.push("[" + e2(u2[a2]) + "]: " + e2(t2[u2[a2]], t2));
    return n2;
  }
  return r;
}
export {
  o as r
};
