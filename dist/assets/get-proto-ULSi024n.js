import { r as t } from "./es-object-atoms-Hm0rX7lz.js";
import { r } from "./dunder-proto-Dg6ZZIcQ.js";
var n, o, e, f, u, c;
function i() {
  return o ? n : (o = 1, n = "undefined" != typeof Reflect && Reflect.getPrototypeOf || null);
}
function a() {
  return f ? e : (f = 1, e = t().getPrototypeOf || null);
}
function p() {
  if (c) return u;
  c = 1;
  var t2 = i(), n2 = a(), o2 = r();
  return u = t2 ? function(r2) {
    return t2(r2);
  } : n2 ? function(t3) {
    if (!t3 || "object" != typeof t3 && "function" != typeof t3) throw new TypeError("getProto: not an object");
    return n2(t3);
  } : o2 ? function(t3) {
    return o2(t3);
  } : null;
}
export {
  a,
  i as b,
  p as r
};
