import { r as t } from "./get-intrinsic-DPla16h1.js";
import { r as e } from "./call-bound-Dsl4ZuVa.js";
import { r as o } from "./object-inspect-Cr-iKrax.js";
import { r } from "./side-channel-map-D663uv66.js";
import { r as n } from "./es-errors-BLYKrcsK.js";
var a, f;
function p() {
  if (f) return a;
  f = 1;
  var p2 = t(), i = e(), s = o(), c = r(), u = n(), y = p2("%WeakMap%", true), j = i("WeakMap.prototype.get", true), m = i("WeakMap.prototype.set", true), l = i("WeakMap.prototype.has", true), d = i("WeakMap.prototype.delete", true);
  return a = y ? function() {
    var t2, e2, o2 = { assert: function(t3) {
      if (!o2.has(t3)) throw new u("Side channel does not contain " + s(t3));
    }, delete: function(o3) {
      if (y && o3 && ("object" == typeof o3 || "function" == typeof o3)) {
        if (t2) return d(t2, o3);
      } else if (c && e2) return e2.delete(o3);
      return false;
    }, get: function(o3) {
      return y && o3 && ("object" == typeof o3 || "function" == typeof o3) && t2 ? j(t2, o3) : e2 && e2.get(o3);
    }, has: function(o3) {
      return y && o3 && ("object" == typeof o3 || "function" == typeof o3) && t2 ? l(t2, o3) : !!e2 && e2.has(o3);
    }, set: function(o3, r2) {
      y && o3 && ("object" == typeof o3 || "function" == typeof o3) ? (t2 || (t2 = new y()), m(t2, o3, r2)) : c && (e2 || (e2 = c()), e2.set(o3, r2));
    } };
    return o2;
  } : c;
}
export {
  p as r
};
