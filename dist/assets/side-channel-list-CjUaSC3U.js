import { r as n } from "./object-inspect-Cr-iKrax.js";
import { r as t } from "./es-errors-BLYKrcsK.js";
var e, r;
function o() {
  if (r) return e;
  r = 1;
  var o2 = n(), u = t(), i = function(n2, t2, e2) {
    for (var r2, o3 = n2; null != (r2 = o3.next); o3 = r2) if (r2.key === t2) return o3.next = r2.next, e2 || (r2.next = n2.next, n2.next = r2), r2;
  };
  return e = function() {
    var n2, t2 = { assert: function(n3) {
      if (!t2.has(n3)) throw new u("Side channel does not contain " + o2(n3));
    }, delete: function(t3) {
      var e2 = n2 && n2.next, r2 = (function(n3, t4) {
        if (n3) return i(n3, t4, true);
      })(n2, t3);
      return r2 && e2 && e2 === r2 && (n2 = void 0), !!r2;
    }, get: function(t3) {
      return (function(n3, t4) {
        if (n3) {
          var e2 = i(n3, t4);
          return e2 && e2.value;
        }
      })(n2, t3);
    }, has: function(t3) {
      return (function(n3, t4) {
        return !!n3 && !!i(n3, t4);
      })(n2, t3);
    }, set: function(t3, e2) {
      n2 || (n2 = { next: void 0 }), (function(n3, t4, e3) {
        var r2 = i(n3, t4);
        r2 ? r2.value = e3 : n3.next = { key: t4, next: n3.next, value: e3 };
      })(n2, t3, e2);
    } };
    return t2;
  };
}
export {
  o as r
};
