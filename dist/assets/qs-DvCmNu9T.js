import { a as e } from "./call-bind-apply-helpers-uOwG8Nag.js";
import { r } from "./side-channel-CDLbO4FQ.js";
var t, o, n, i, a, l, c, s, p, f;
function u() {
  if (o) return t;
  o = 1;
  var e2 = String.prototype.replace, r2 = /%20/g, n2 = "RFC3986";
  return t = { default: n2, formatters: { RFC1738: function(t2) {
    return e2.call(t2, r2, "+");
  }, RFC3986: function(e3) {
    return String(e3);
  } }, RFC1738: "RFC1738", RFC3986: n2 };
}
function d() {
  if (i) return n;
  i = 1;
  var e2 = u(), r2 = Object.prototype.hasOwnProperty, t2 = Array.isArray, o2 = (function() {
    for (var e3 = [], r3 = 0; r3 < 256; ++r3) e3.push("%" + ((r3 < 16 ? "0" : "") + r3.toString(16)).toUpperCase());
    return e3;
  })(), a2 = function(e3, r3) {
    for (var t3 = r3 && r3.plainObjects ? { __proto__: null } : {}, o3 = 0; o3 < e3.length; ++o3) void 0 !== e3[o3] && (t3[o3] = e3[o3]);
    return t3;
  }, l2 = 1024;
  return n = { arrayToObject: a2, assign: function(e3, r3) {
    return Object.keys(r3).reduce(function(e4, t3) {
      return e4[t3] = r3[t3], e4;
    }, e3);
  }, combine: function(e3, r3) {
    return [].concat(e3, r3);
  }, compact: function(e3) {
    for (var r3 = [{ obj: { o: e3 }, prop: "o" }], o3 = [], n2 = 0; n2 < r3.length; ++n2) for (var i2 = r3[n2], a3 = i2.obj[i2.prop], l3 = Object.keys(a3), c2 = 0; c2 < l3.length; ++c2) {
      var s2 = l3[c2], p2 = a3[s2];
      "object" == typeof p2 && null !== p2 && -1 === o3.indexOf(p2) && (r3.push({ obj: a3, prop: s2 }), o3.push(p2));
    }
    return (function(e4) {
      for (; e4.length > 1; ) {
        var r4 = e4.pop(), o4 = r4.obj[r4.prop];
        if (t2(o4)) {
          for (var n3 = [], i3 = 0; i3 < o4.length; ++i3) void 0 !== o4[i3] && n3.push(o4[i3]);
          r4.obj[r4.prop] = n3;
        }
      }
    })(r3), e3;
  }, decode: function(e3, r3, t3) {
    var o3 = e3.replace(/\+/g, " ");
    if ("iso-8859-1" === t3) return o3.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(o3);
    } catch (e4) {
      return o3;
    }
  }, encode: function(r3, t3, n2, i2, a3) {
    if (0 === r3.length) return r3;
    var c2 = r3;
    if ("symbol" == typeof r3 ? c2 = Symbol.prototype.toString.call(r3) : "string" != typeof r3 && (c2 = String(r3)), "iso-8859-1" === n2) return escape(c2).replace(/%u[0-9a-f]{4}/gi, function(e3) {
      return "%26%23" + parseInt(e3.slice(2), 16) + "%3B";
    });
    for (var s2 = "", p2 = 0; p2 < c2.length; p2 += l2) {
      for (var f2 = c2.length >= l2 ? c2.slice(p2, p2 + l2) : c2, u2 = [], d2 = 0; d2 < f2.length; ++d2) {
        var y2 = f2.charCodeAt(d2);
        45 === y2 || 46 === y2 || 95 === y2 || 126 === y2 || y2 >= 48 && y2 <= 57 || y2 >= 65 && y2 <= 90 || y2 >= 97 && y2 <= 122 || a3 === e2.RFC1738 && (40 === y2 || 41 === y2) ? u2[u2.length] = f2.charAt(d2) : y2 < 128 ? u2[u2.length] = o2[y2] : y2 < 2048 ? u2[u2.length] = o2[192 | y2 >> 6] + o2[128 | 63 & y2] : y2 < 55296 || y2 >= 57344 ? u2[u2.length] = o2[224 | y2 >> 12] + o2[128 | y2 >> 6 & 63] + o2[128 | 63 & y2] : (d2 += 1, y2 = 65536 + ((1023 & y2) << 10 | 1023 & f2.charCodeAt(d2)), u2[u2.length] = o2[240 | y2 >> 18] + o2[128 | y2 >> 12 & 63] + o2[128 | y2 >> 6 & 63] + o2[128 | 63 & y2]);
      }
      s2 += u2.join("");
    }
    return s2;
  }, isBuffer: function(e3) {
    return !(!e3 || "object" != typeof e3) && !!(e3.constructor && e3.constructor.isBuffer && e3.constructor.isBuffer(e3));
  }, isRegExp: function(e3) {
    return "[object RegExp]" === Object.prototype.toString.call(e3);
  }, maybeMap: function(e3, r3) {
    if (t2(e3)) {
      for (var o3 = [], n2 = 0; n2 < e3.length; n2 += 1) o3.push(r3(e3[n2]));
      return o3;
    }
    return r3(e3);
  }, merge: function e3(o3, n2, i2) {
    if (!n2) return o3;
    if ("object" != typeof n2 && "function" != typeof n2) {
      if (t2(o3)) o3.push(n2);
      else {
        if (!o3 || "object" != typeof o3) return [o3, n2];
        (i2 && (i2.plainObjects || i2.allowPrototypes) || !r2.call(Object.prototype, n2)) && (o3[n2] = true);
      }
      return o3;
    }
    if (!o3 || "object" != typeof o3) return [o3].concat(n2);
    var l3 = o3;
    return t2(o3) && !t2(n2) && (l3 = a2(o3, i2)), t2(o3) && t2(n2) ? (n2.forEach(function(t3, n3) {
      if (r2.call(o3, n3)) {
        var a3 = o3[n3];
        a3 && "object" == typeof a3 && t3 && "object" == typeof t3 ? o3[n3] = e3(a3, t3, i2) : o3.push(t3);
      } else o3[n3] = t3;
    }), o3) : Object.keys(n2).reduce(function(t3, o4) {
      var a3 = n2[o4];
      return r2.call(t3, o4) ? t3[o4] = e3(t3[o4], a3, i2) : t3[o4] = a3, t3;
    }, l3);
  } }, n;
}
function y() {
  if (l) return a;
  l = 1;
  var e2 = r(), t2 = d(), o2 = u(), n2 = Object.prototype.hasOwnProperty, i2 = { brackets: function(e3) {
    return e3 + "[]";
  }, comma: "comma", indices: function(e3, r2) {
    return e3 + "[" + r2 + "]";
  }, repeat: function(e3) {
    return e3;
  } }, c2 = Array.isArray, s2 = Array.prototype.push, p2 = function(e3, r2) {
    s2.apply(e3, c2(r2) ? r2 : [r2]);
  }, f2 = Date.prototype.toISOString, y2 = o2.default, m2 = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, commaRoundTrip: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: t2.encode, encodeValuesOnly: false, filter: void 0, format: y2, formatter: o2.formatters[y2], indices: false, serializeDate: function(e3) {
    return f2.call(e3);
  }, skipNulls: false, strictNullHandling: false }, h2 = {}, b2 = function r2(o3, n3, i3, a2, l2, s3, f3, u2, d2, y3, b3, g, w, v, E, O, D, j) {
    for (var A, x = o3, S = j, N = 0, I = false; void 0 !== (S = S.get(h2)) && !I; ) {
      var L = S.get(o3);
      if (N += 1, void 0 !== L) {
        if (L === N) throw new RangeError("Cyclic object value");
        I = true;
      }
      void 0 === S.get(h2) && (N = 0);
    }
    if ("function" == typeof y3 ? x = y3(n3, x) : x instanceof Date ? x = w(x) : "comma" === i3 && c2(x) && (x = t2.maybeMap(x, function(e3) {
      return e3 instanceof Date ? w(e3) : e3;
    })), null === x) {
      if (s3) return d2 && !O ? d2(n3, m2.encoder, D, "key", v) : n3;
      x = "";
    }
    if ("string" == typeof (A = x) || "number" == typeof A || "boolean" == typeof A || "symbol" == typeof A || "bigint" == typeof A || t2.isBuffer(x)) return d2 ? [E(O ? n3 : d2(n3, m2.encoder, D, "key", v)) + "=" + E(d2(x, m2.encoder, D, "value", v))] : [E(n3) + "=" + E(String(x))];
    var _, T = [];
    if (void 0 === x) return T;
    if ("comma" === i3 && c2(x)) O && d2 && (x = t2.maybeMap(x, d2)), _ = [{ value: x.length > 0 ? x.join(",") || null : void 0 }];
    else if (c2(y3)) _ = y3;
    else {
      var P = Object.keys(x);
      _ = b3 ? P.sort(b3) : P;
    }
    var R = u2 ? String(n3).replace(/\./g, "%2E") : String(n3), K = a2 && c2(x) && 1 === x.length ? R + "[]" : R;
    if (l2 && c2(x) && 0 === x.length) return K + "[]";
    for (var k = 0; k < _.length; ++k) {
      var C = _[k], F = "object" == typeof C && C && void 0 !== C.value ? C.value : x[C];
      if (!f3 || null !== F) {
        var H = g && u2 ? String(C).replace(/\./g, "%2E") : String(C), Q = c2(x) ? "function" == typeof i3 ? i3(K, H) : K : K + (g ? "." + H : "[" + H + "]");
        j.set(o3, N);
        var B = e2();
        B.set(h2, j), p2(T, r2(F, Q, i3, a2, l2, s3, f3, u2, "comma" === i3 && O && c2(x) ? null : d2, y3, b3, g, w, v, E, O, D, B));
      }
    }
    return T;
  };
  return a = function(r2, t3) {
    var a2, l2 = r2, s3 = (function(e3) {
      if (!e3) return m2;
      if (void 0 !== e3.allowEmptyArrays && "boolean" != typeof e3.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      if (void 0 !== e3.encodeDotInKeys && "boolean" != typeof e3.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      if (null !== e3.encoder && void 0 !== e3.encoder && "function" != typeof e3.encoder) throw new TypeError("Encoder has to be a function.");
      var r3 = e3.charset || m2.charset;
      if (void 0 !== e3.charset && "utf-8" !== e3.charset && "iso-8859-1" !== e3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      var t4 = o2.default;
      if (void 0 !== e3.format) {
        if (!n2.call(o2.formatters, e3.format)) throw new TypeError("Unknown format option provided.");
        t4 = e3.format;
      }
      var a3, l3 = o2.formatters[t4], s4 = m2.filter;
      if (("function" == typeof e3.filter || c2(e3.filter)) && (s4 = e3.filter), a3 = e3.arrayFormat in i2 ? e3.arrayFormat : "indices" in e3 ? e3.indices ? "indices" : "repeat" : m2.arrayFormat, "commaRoundTrip" in e3 && "boolean" != typeof e3.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      var p3 = void 0 === e3.allowDots ? true === e3.encodeDotInKeys || m2.allowDots : !!e3.allowDots;
      return { addQueryPrefix: "boolean" == typeof e3.addQueryPrefix ? e3.addQueryPrefix : m2.addQueryPrefix, allowDots: p3, allowEmptyArrays: "boolean" == typeof e3.allowEmptyArrays ? !!e3.allowEmptyArrays : m2.allowEmptyArrays, arrayFormat: a3, charset: r3, charsetSentinel: "boolean" == typeof e3.charsetSentinel ? e3.charsetSentinel : m2.charsetSentinel, commaRoundTrip: !!e3.commaRoundTrip, delimiter: void 0 === e3.delimiter ? m2.delimiter : e3.delimiter, encode: "boolean" == typeof e3.encode ? e3.encode : m2.encode, encodeDotInKeys: "boolean" == typeof e3.encodeDotInKeys ? e3.encodeDotInKeys : m2.encodeDotInKeys, encoder: "function" == typeof e3.encoder ? e3.encoder : m2.encoder, encodeValuesOnly: "boolean" == typeof e3.encodeValuesOnly ? e3.encodeValuesOnly : m2.encodeValuesOnly, filter: s4, format: t4, formatter: l3, serializeDate: "function" == typeof e3.serializeDate ? e3.serializeDate : m2.serializeDate, skipNulls: "boolean" == typeof e3.skipNulls ? e3.skipNulls : m2.skipNulls, sort: "function" == typeof e3.sort ? e3.sort : null, strictNullHandling: "boolean" == typeof e3.strictNullHandling ? e3.strictNullHandling : m2.strictNullHandling };
    })(t3);
    "function" == typeof s3.filter ? l2 = (0, s3.filter)("", l2) : c2(s3.filter) && (a2 = s3.filter);
    var f3 = [];
    if ("object" != typeof l2 || null === l2) return "";
    var u2 = i2[s3.arrayFormat], d2 = "comma" === u2 && s3.commaRoundTrip;
    a2 || (a2 = Object.keys(l2)), s3.sort && a2.sort(s3.sort);
    for (var y3 = e2(), h3 = 0; h3 < a2.length; ++h3) {
      var g = a2[h3], w = l2[g];
      s3.skipNulls && null === w || p2(f3, b2(w, g, u2, d2, s3.allowEmptyArrays, s3.strictNullHandling, s3.skipNulls, s3.encodeDotInKeys, s3.encode ? s3.encoder : null, s3.filter, s3.sort, s3.allowDots, s3.serializeDate, s3.format, s3.formatter, s3.encodeValuesOnly, s3.charset, y3));
    }
    var v = f3.join(s3.delimiter), E = true === s3.addQueryPrefix ? "?" : "";
    return s3.charsetSentinel && ("iso-8859-1" === s3.charset ? E += "utf8=%26%2310003%3B&" : E += "utf8=%E2%9C%93&"), v.length > 0 ? E + v : "";
  };
}
function m() {
  if (s) return c;
  s = 1;
  var e2 = d(), r2 = Object.prototype.hasOwnProperty, t2 = Array.isArray, o2 = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: e2.decode, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictDepth: false, strictNullHandling: false, throwOnLimitExceeded: false }, n2 = function(e3) {
    return e3.replace(/&#(\d+);/g, function(e4, r3) {
      return String.fromCharCode(parseInt(r3, 10));
    });
  }, i2 = function(e3, r3, t3) {
    if (e3 && "string" == typeof e3 && r3.comma && e3.indexOf(",") > -1) return e3.split(",");
    if (r3.throwOnLimitExceeded && t3 >= r3.arrayLimit) throw new RangeError("Array limit exceeded. Only " + r3.arrayLimit + " element" + (1 === r3.arrayLimit ? "" : "s") + " allowed in an array.");
    return e3;
  }, a2 = function(t3, o3, n3, a3) {
    if (t3) {
      var l2 = n3.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, c2 = /(\[[^[\]]*])/g, s2 = n3.depth > 0 && /(\[[^[\]]*])/.exec(l2), p2 = s2 ? l2.slice(0, s2.index) : l2, f2 = [];
      if (p2) {
        if (!n3.plainObjects && r2.call(Object.prototype, p2) && !n3.allowPrototypes) return;
        f2.push(p2);
      }
      for (var u2 = 0; n3.depth > 0 && null !== (s2 = c2.exec(l2)) && u2 < n3.depth; ) {
        if (u2 += 1, !n3.plainObjects && r2.call(Object.prototype, s2[1].slice(1, -1)) && !n3.allowPrototypes) return;
        f2.push(s2[1]);
      }
      if (s2) {
        if (true === n3.strictDepth) throw new RangeError("Input depth exceeded depth option of " + n3.depth + " and strictDepth is true");
        f2.push("[" + l2.slice(s2.index) + "]");
      }
      return (function(r3, t4, o4, n4) {
        var a4 = 0;
        if (r3.length > 0 && "[]" === r3[r3.length - 1]) {
          var l3 = r3.slice(0, -1).join("");
          a4 = Array.isArray(t4) && t4[l3] ? t4[l3].length : 0;
        }
        for (var c3 = n4 ? t4 : i2(t4, o4, a4), s3 = r3.length - 1; s3 >= 0; --s3) {
          var p3, f3 = r3[s3];
          if ("[]" === f3 && o4.parseArrays) p3 = o4.allowEmptyArrays && ("" === c3 || o4.strictNullHandling && null === c3) ? [] : e2.combine([], c3);
          else {
            p3 = o4.plainObjects ? { __proto__: null } : {};
            var u3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, d2 = o4.decodeDotInKeys ? u3.replace(/%2E/g, ".") : u3, y2 = parseInt(d2, 10);
            o4.parseArrays || "" !== d2 ? !isNaN(y2) && f3 !== d2 && String(y2) === d2 && y2 >= 0 && o4.parseArrays && y2 <= o4.arrayLimit ? (p3 = [])[y2] = c3 : "__proto__" !== d2 && (p3[d2] = c3) : p3 = { 0: c3 };
          }
          c3 = p3;
        }
        return c3;
      })(f2, o3, n3, a3);
    }
  };
  return c = function(l2, c2) {
    var s2 = (function(r3) {
      if (!r3) return o2;
      if (void 0 !== r3.allowEmptyArrays && "boolean" != typeof r3.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      if (void 0 !== r3.decodeDotInKeys && "boolean" != typeof r3.decodeDotInKeys) throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      if (null !== r3.decoder && void 0 !== r3.decoder && "function" != typeof r3.decoder) throw new TypeError("Decoder has to be a function.");
      if (void 0 !== r3.charset && "utf-8" !== r3.charset && "iso-8859-1" !== r3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      if (void 0 !== r3.throwOnLimitExceeded && "boolean" != typeof r3.throwOnLimitExceeded) throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      var t3 = void 0 === r3.charset ? o2.charset : r3.charset, n3 = void 0 === r3.duplicates ? o2.duplicates : r3.duplicates;
      if ("combine" !== n3 && "first" !== n3 && "last" !== n3) throw new TypeError("The duplicates option must be either combine, first, or last");
      return { allowDots: void 0 === r3.allowDots ? true === r3.decodeDotInKeys || o2.allowDots : !!r3.allowDots, allowEmptyArrays: "boolean" == typeof r3.allowEmptyArrays ? !!r3.allowEmptyArrays : o2.allowEmptyArrays, allowPrototypes: "boolean" == typeof r3.allowPrototypes ? r3.allowPrototypes : o2.allowPrototypes, allowSparse: "boolean" == typeof r3.allowSparse ? r3.allowSparse : o2.allowSparse, arrayLimit: "number" == typeof r3.arrayLimit ? r3.arrayLimit : o2.arrayLimit, charset: t3, charsetSentinel: "boolean" == typeof r3.charsetSentinel ? r3.charsetSentinel : o2.charsetSentinel, comma: "boolean" == typeof r3.comma ? r3.comma : o2.comma, decodeDotInKeys: "boolean" == typeof r3.decodeDotInKeys ? r3.decodeDotInKeys : o2.decodeDotInKeys, decoder: "function" == typeof r3.decoder ? r3.decoder : o2.decoder, delimiter: "string" == typeof r3.delimiter || e2.isRegExp(r3.delimiter) ? r3.delimiter : o2.delimiter, depth: "number" == typeof r3.depth || false === r3.depth ? +r3.depth : o2.depth, duplicates: n3, ignoreQueryPrefix: true === r3.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof r3.interpretNumericEntities ? r3.interpretNumericEntities : o2.interpretNumericEntities, parameterLimit: "number" == typeof r3.parameterLimit ? r3.parameterLimit : o2.parameterLimit, parseArrays: false !== r3.parseArrays, plainObjects: "boolean" == typeof r3.plainObjects ? r3.plainObjects : o2.plainObjects, strictDepth: "boolean" == typeof r3.strictDepth ? !!r3.strictDepth : o2.strictDepth, strictNullHandling: "boolean" == typeof r3.strictNullHandling ? r3.strictNullHandling : o2.strictNullHandling, throwOnLimitExceeded: "boolean" == typeof r3.throwOnLimitExceeded && r3.throwOnLimitExceeded };
    })(c2);
    if ("" === l2 || null == l2) return s2.plainObjects ? { __proto__: null } : {};
    for (var p2 = "string" == typeof l2 ? (function(a3, l3) {
      var c3 = { __proto__: null }, s3 = l3.ignoreQueryPrefix ? a3.replace(/^\?/, "") : a3;
      s3 = s3.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var p3 = l3.parameterLimit === 1 / 0 ? void 0 : l3.parameterLimit, f3 = s3.split(l3.delimiter, l3.throwOnLimitExceeded ? p3 + 1 : p3);
      if (l3.throwOnLimitExceeded && f3.length > p3) throw new RangeError("Parameter limit exceeded. Only " + p3 + " parameter" + (1 === p3 ? "" : "s") + " allowed.");
      var u3, d3 = -1, y3 = l3.charset;
      if (l3.charsetSentinel) for (u3 = 0; u3 < f3.length; ++u3) 0 === f3[u3].indexOf("utf8=") && ("utf8=%E2%9C%93" === f3[u3] ? y3 = "utf-8" : "utf8=%26%2310003%3B" === f3[u3] && (y3 = "iso-8859-1"), d3 = u3, u3 = f3.length);
      for (u3 = 0; u3 < f3.length; ++u3) if (u3 !== d3) {
        var m3, h2, b2 = f3[u3], g = b2.indexOf("]="), w = -1 === g ? b2.indexOf("=") : g + 1;
        -1 === w ? (m3 = l3.decoder(b2, o2.decoder, y3, "key"), h2 = l3.strictNullHandling ? null : "") : (m3 = l3.decoder(b2.slice(0, w), o2.decoder, y3, "key"), h2 = e2.maybeMap(i2(b2.slice(w + 1), l3, t2(c3[m3]) ? c3[m3].length : 0), function(e3) {
          return l3.decoder(e3, o2.decoder, y3, "value");
        })), h2 && l3.interpretNumericEntities && "iso-8859-1" === y3 && (h2 = n2(String(h2))), b2.indexOf("[]=") > -1 && (h2 = t2(h2) ? [h2] : h2);
        var v = r2.call(c3, m3);
        v && "combine" === l3.duplicates ? c3[m3] = e2.combine(c3[m3], h2) : v && "last" !== l3.duplicates || (c3[m3] = h2);
      }
      return c3;
    })(l2, s2) : l2, f2 = s2.plainObjects ? { __proto__: null } : {}, u2 = Object.keys(p2), d2 = 0; d2 < u2.length; ++d2) {
      var y2 = u2[d2], m2 = a2(y2, p2[y2], s2, "string" == typeof l2);
      f2 = e2.merge(f2, m2, s2);
    }
    return true === s2.allowSparse ? f2 : e2.compact(f2);
  };
}
function h() {
  if (f) return p;
  f = 1;
  var e2 = y(), r2 = m();
  return p = { formats: u(), parse: r2, stringify: e2 };
}
const b = e(h());
export {
  b as q
};
