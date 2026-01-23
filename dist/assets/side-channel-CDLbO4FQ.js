import { r } from "./es-errors-BLYKrcsK.js";
import { r as e } from "./object-inspect-Cr-iKrax.js";
import { r as n } from "./side-channel-list-CjUaSC3U.js";
import { r as t } from "./side-channel-map-D663uv66.js";
import { r as s } from "./side-channel-weakmap-pbUWVUap.js";
var o, a;
function i() {
  if (a) return o;
  a = 1;
  var i2 = r(), c = e(), f = n(), u = t(), m = s() || u || f;
  return o = function() {
    var r2, e2 = { assert: function(r3) {
      if (!e2.has(r3)) throw new i2("Side channel does not contain " + c(r3));
    }, delete: function(e3) {
      return !!r2 && r2.delete(e3);
    }, get: function(e3) {
      return r2 && r2.get(e3);
    }, has: function(e3) {
      return !!r2 && r2.has(e3);
    }, set: function(e3, n2) {
      r2 || (r2 = m()), r2.set(e3, n2);
    } };
    return e2;
  };
}
export {
  i as r
};
