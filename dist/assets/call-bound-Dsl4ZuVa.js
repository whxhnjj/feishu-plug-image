import { r } from "./get-intrinsic-DPla16h1.js";
import { r as t } from "./call-bind-apply-helpers-uOwG8Nag.js";
var n, o;
function i() {
  if (o) return n;
  o = 1;
  var i2 = r(), e = t(), p = e([i2("%String.prototype.indexOf%")]);
  return n = function(r2, t2) {
    var n2 = i2(r2, !!t2);
    return "function" == typeof n2 && p(r2, ".prototype.") > -1 ? e([n2]) : n2;
  };
}
export {
  i as r
};
