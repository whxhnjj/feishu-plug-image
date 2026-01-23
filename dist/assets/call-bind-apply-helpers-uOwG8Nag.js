import { r as e } from "./function-bind-CKaqk7DH.js";
import { r as t } from "./es-errors-BLYKrcsK.js";
var n, r, o, f, u, i, c, a, l, p, s = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function d(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function y(e2) {
  if (Object.prototype.hasOwnProperty.call(e2, "__esModule")) return e2;
  var t2 = e2.default;
  if ("function" == typeof t2) {
    var n2 = function e3() {
      return this instanceof e3 ? Reflect.construct(t2, arguments, this.constructor) : t2.apply(this, arguments);
    };
    n2.prototype = t2.prototype;
  } else n2 = {};
  return Object.defineProperty(n2, "__esModule", { value: true }), Object.keys(e2).forEach(function(t3) {
    var r2 = Object.getOwnPropertyDescriptor(e2, t3);
    Object.defineProperty(n2, t3, r2.get ? r2 : { enumerable: true, get: function() {
      return e2[t3];
    } });
  }), n2;
}
function b() {
  return r ? n : (r = 1, n = Function.prototype.call);
}
function h() {
  return f ? o : (f = 1, o = Function.prototype.apply);
}
function g() {
  if (a) return c;
  a = 1;
  var t2 = e(), n2 = h(), r2 = b(), o2 = i ? u : (i = 1, u = "undefined" != typeof Reflect && Reflect && Reflect.apply);
  return c = o2 || t2.call(r2, n2);
}
function j() {
  if (p) return l;
  p = 1;
  var n2 = e(), r2 = t(), o2 = b(), f2 = g();
  return l = function(e2) {
    if (e2.length < 1 || "function" != typeof e2[0]) throw new r2("a function is required");
    return f2(n2, o2, e2);
  };
}
export {
  d as a,
  b,
  s as c,
  h as d,
  y as g,
  j as r
};
