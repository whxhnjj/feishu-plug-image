var t, e, r, o;
function n() {
  if (o) return r;
  o = 1;
  var n2 = "undefined" != typeof Symbol && Symbol, y = e ? t : (e = 1, t = function() {
    if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return false;
    if ("symbol" == typeof Symbol.iterator) return true;
    var t2 = {}, e2 = Symbol("test"), r2 = Object(e2);
    if ("string" == typeof e2) return false;
    if ("[object Symbol]" !== Object.prototype.toString.call(e2)) return false;
    if ("[object Symbol]" !== Object.prototype.toString.call(r2)) return false;
    for (var o2 in t2[e2] = 42, t2) return false;
    if ("function" == typeof Object.keys && 0 !== Object.keys(t2).length) return false;
    if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t2).length) return false;
    var n3 = Object.getOwnPropertySymbols(t2);
    if (1 !== n3.length || n3[0] !== e2) return false;
    if (!Object.prototype.propertyIsEnumerable.call(t2, e2)) return false;
    if ("function" == typeof Object.getOwnPropertyDescriptor) {
      var y2 = Object.getOwnPropertyDescriptor(t2, e2);
      if (42 !== y2.value || true !== y2.enumerable) return false;
    }
    return true;
  });
  return r = function() {
    return "function" == typeof n2 && ("function" == typeof Symbol && ("symbol" == typeof n2("foo") && ("symbol" == typeof Symbol("bar") && y())));
  };
}
export {
  n as r
};
