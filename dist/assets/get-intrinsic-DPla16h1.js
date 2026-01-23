import { r } from "./es-object-atoms-Hm0rX7lz.js";
import { r as t, a as e, b as o, c as n, d as a, e as y, f as p } from "./es-errors-BLYKrcsK.js";
import { r as i, a as s, b as f, c, d as l, e as u, f as A } from "./math-intrinsics-DHiNV-49.js";
import { r as d } from "./gopd-CjuWBzBm.js";
import { r as m } from "./es-define-property-or00P0Do.js";
import { r as P } from "./has-symbols-BLBwH5A2.js";
import { r as g, a as h, b as S } from "./get-proto-ULSi024n.js";
import { b, d as I } from "./call-bind-apply-helpers-uOwG8Nag.js";
import { r as F } from "./function-bind-CKaqk7DH.js";
import { r as E } from "./hasown-CroOTh5K.js";
var U, v;
function w() {
  if (v) return U;
  var w2;
  v = 1;
  var R = r(), j = p(), B = y(), M = a(), O = n(), x = e(), _ = t(), G = o(), k = A(), N = u(), W = l(), D = c(), C = f(), T = s(), J = i(), V = Function, q = function(r2) {
    try {
      return V('"use strict"; return (' + r2 + ").constructor;")();
    } catch (r3) {
    }
  }, z = d(), $ = m(), H = function() {
    throw new _();
  }, K = z ? (function() {
    try {
      return H;
    } catch (r2) {
      try {
        return z(arguments, "callee").get;
      } catch (r3) {
        return H;
      }
    }
  })() : H, L = P()(), Q = g(), X = h(), Y = S(), Z = I(), rr = b(), tr = {}, er = "undefined" != typeof Uint8Array && Q ? Q(Uint8Array) : w2, or = { __proto__: null, "%AggregateError%": "undefined" == typeof AggregateError ? w2 : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? w2 : ArrayBuffer, "%ArrayIteratorPrototype%": L && Q ? Q([][Symbol.iterator]()) : w2, "%AsyncFromSyncIteratorPrototype%": w2, "%AsyncFunction%": tr, "%AsyncGenerator%": tr, "%AsyncGeneratorFunction%": tr, "%AsyncIteratorPrototype%": tr, "%Atomics%": "undefined" == typeof Atomics ? w2 : Atomics, "%BigInt%": "undefined" == typeof BigInt ? w2 : BigInt, "%BigInt64Array%": "undefined" == typeof BigInt64Array ? w2 : BigInt64Array, "%BigUint64Array%": "undefined" == typeof BigUint64Array ? w2 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? w2 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": j, "%eval%": eval, "%EvalError%": B, "%Float16Array%": "undefined" == typeof Float16Array ? w2 : Float16Array, "%Float32Array%": "undefined" == typeof Float32Array ? w2 : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? w2 : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? w2 : FinalizationRegistry, "%Function%": V, "%GeneratorFunction%": tr, "%Int8Array%": "undefined" == typeof Int8Array ? w2 : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? w2 : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? w2 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": L && Q ? Q(Q([][Symbol.iterator]())) : w2, "%JSON%": "object" == typeof JSON ? JSON : w2, "%Map%": "undefined" == typeof Map ? w2 : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && L && Q ? Q((/* @__PURE__ */ new Map())[Symbol.iterator]()) : w2, "%Math%": Math, "%Number%": Number, "%Object%": R, "%Object.getOwnPropertyDescriptor%": z, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? w2 : Promise, "%Proxy%": "undefined" == typeof Proxy ? w2 : Proxy, "%RangeError%": M, "%ReferenceError%": O, "%Reflect%": "undefined" == typeof Reflect ? w2 : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? w2 : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && L && Q ? Q((/* @__PURE__ */ new Set())[Symbol.iterator]()) : w2, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? w2 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": L && Q ? Q(""[Symbol.iterator]()) : w2, "%Symbol%": L ? Symbol : w2, "%SyntaxError%": x, "%ThrowTypeError%": K, "%TypedArray%": er, "%TypeError%": _, "%Uint8Array%": "undefined" == typeof Uint8Array ? w2 : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? w2 : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? w2 : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? w2 : Uint32Array, "%URIError%": G, "%WeakMap%": "undefined" == typeof WeakMap ? w2 : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? w2 : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? w2 : WeakSet, "%Function.prototype.call%": rr, "%Function.prototype.apply%": Z, "%Object.defineProperty%": $, "%Object.getPrototypeOf%": X, "%Math.abs%": k, "%Math.floor%": N, "%Math.max%": W, "%Math.min%": D, "%Math.pow%": C, "%Math.round%": T, "%Math.sign%": J, "%Reflect.getPrototypeOf%": Y };
  if (Q) try {
    null.error;
  } catch (r2) {
    var nr = Q(Q(r2));
    or["%Error.prototype%"] = nr;
  }
  var ar = function r2(t2) {
    var e2;
    if ("%AsyncFunction%" === t2) e2 = q("async function () {}");
    else if ("%GeneratorFunction%" === t2) e2 = q("function* () {}");
    else if ("%AsyncGeneratorFunction%" === t2) e2 = q("async function* () {}");
    else if ("%AsyncGenerator%" === t2) {
      var o2 = r2("%AsyncGeneratorFunction%");
      o2 && (e2 = o2.prototype);
    } else if ("%AsyncIteratorPrototype%" === t2) {
      var n2 = r2("%AsyncGenerator%");
      n2 && Q && (e2 = Q(n2.prototype));
    }
    return or[t2] = e2, e2;
  }, yr = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, pr = F(), ir = E(), sr = pr.call(rr, Array.prototype.concat), fr = pr.call(Z, Array.prototype.splice), cr = pr.call(rr, String.prototype.replace), lr = pr.call(rr, String.prototype.slice), ur = pr.call(rr, RegExp.prototype.exec), Ar = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, dr = /\\(\\)?/g, mr = function(r2, t2) {
    var e2, o2 = r2;
    if (ir(yr, o2) && (o2 = "%" + (e2 = yr[o2])[0] + "%"), ir(or, o2)) {
      var n2 = or[o2];
      if (n2 === tr && (n2 = ar(o2)), void 0 === n2 && !t2) throw new _("intrinsic " + r2 + " exists, but is not available. Please file an issue!");
      return { alias: e2, name: o2, value: n2 };
    }
    throw new x("intrinsic " + r2 + " does not exist!");
  };
  return U = function(r2, t2) {
    if ("string" != typeof r2 || 0 === r2.length) throw new _("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && "boolean" != typeof t2) throw new _('"allowMissing" argument must be a boolean');
    if (null === ur(/^%?[^%]*%?$/, r2)) throw new x("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var e2 = (function(r3) {
      var t3 = lr(r3, 0, 1), e3 = lr(r3, -1);
      if ("%" === t3 && "%" !== e3) throw new x("invalid intrinsic syntax, expected closing `%`");
      if ("%" === e3 && "%" !== t3) throw new x("invalid intrinsic syntax, expected opening `%`");
      var o3 = [];
      return cr(r3, Ar, function(r4, t4, e4, n3) {
        o3[o3.length] = e4 ? cr(n3, dr, "$1") : t4 || r4;
      }), o3;
    })(r2), o2 = e2.length > 0 ? e2[0] : "", n2 = mr("%" + o2 + "%", t2), a2 = n2.name, y2 = n2.value, p2 = false, i2 = n2.alias;
    i2 && (o2 = i2[0], fr(e2, sr([0, 1], i2)));
    for (var s2 = 1, f2 = true; s2 < e2.length; s2 += 1) {
      var c2 = e2[s2], l2 = lr(c2, 0, 1), u2 = lr(c2, -1);
      if (('"' === l2 || "'" === l2 || "`" === l2 || '"' === u2 || "'" === u2 || "`" === u2) && l2 !== u2) throw new x("property names with quotes must have matching quotes");
      if ("constructor" !== c2 && f2 || (p2 = true), ir(or, a2 = "%" + (o2 += "." + c2) + "%")) y2 = or[a2];
      else if (null != y2) {
        if (!(c2 in y2)) {
          if (!t2) throw new _("base intrinsic for " + r2 + " exists, but the property is not available.");
          return;
        }
        if (z && s2 + 1 >= e2.length) {
          var A2 = z(y2, c2);
          y2 = (f2 = !!A2) && "get" in A2 && !("originalValue" in A2.get) ? A2.get : y2[c2];
        } else f2 = ir(y2, c2), y2 = y2[c2];
        f2 && !p2 && (or[a2] = y2);
      }
    }
    return y2;
  }, U;
}
export {
  w as r
};
