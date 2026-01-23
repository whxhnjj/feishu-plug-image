import { r } from "./get-intrinsic-DPla16h1.js";
import { r as t } from "./call-bound-Dsl4ZuVa.js";
import { r as e } from "./object-inspect-Cr-iKrax.js";
import { r as o } from "./es-errors-BLYKrcsK.js";
var n, i;
function a() {
  if (i) return n;
  i = 1;
  var a2 = r(), p = t(), s = e(), f = o(), u = a2("%Map%", true), c = p("Map.prototype.get", true), m = p("Map.prototype.set", true), d = p("Map.prototype.has", true), j = p("Map.prototype.delete", true), l = p("Map.prototype.size", true);
  return n = !!u && function() {
    var r2, t2 = { assert: function(r3) {
      if (!t2.has(r3)) throw new f("Side channel does not contain " + s(r3));
    }, delete: function(t3) {
      if (r2) {
        var e2 = j(r2, t3);
        return 0 === l(r2) && (r2 = void 0), e2;
      }
      return false;
    }, get: function(t3) {
      if (r2) return c(r2, t3);
    }, has: function(t3) {
      return !!r2 && d(r2, t3);
    }, set: function(t3, e2) {
      r2 || (r2 = new u()), m(r2, t3, e2);
    } };
    return t2;
  };
}
export {
  a as r
};
