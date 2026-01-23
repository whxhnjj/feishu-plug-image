import { r as t } from "./call-bind-apply-helpers-uOwG8Nag.js";
import { r as o } from "./gopd-CjuWBzBm.js";
var r, e;
function p() {
  if (e) return r;
  e = 1;
  var p2, n = t(), c = o();
  try {
    p2 = [].__proto__ === Array.prototype;
  } catch (t2) {
    if (!t2 || "object" != typeof t2 || !("code" in t2) || "ERR_PROTO_ACCESS" !== t2.code) throw t2;
  }
  var f = !!p2 && c && c(Object.prototype, "__proto__"), a = Object, i = a.getPrototypeOf;
  return r = f && "function" == typeof f.get ? n([f.get]) : "function" == typeof i && function(t2) {
    return i(null == t2 ? t2 : a(t2));
  };
}
export {
  p as r
};
