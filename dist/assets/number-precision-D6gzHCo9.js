function r(r2, t2) {
  return void 0 === t2 && (t2 = 15), +parseFloat(Number(r2).toPrecision(t2));
}
function t(r2) {
  var t2 = r2.toString().split(/[eE]/), n2 = (t2[0].split(".")[1] || "").length - +(t2[1] || 0);
  return n2 > 0 ? n2 : 0;
}
function n(n2) {
  if (-1 === n2.toString().indexOf("e")) return Number(n2.toString().replace(".", ""));
  var e2 = t(n2);
  return e2 > 0 ? r(Number(n2) * Math.pow(10, e2)) : Number(n2);
}
function e(r2) {
  f && (r2 > Number.MAX_SAFE_INTEGER || Number.MIN_SAFE_INTEGER);
}
function u(r2) {
  return function() {
    for (var t2 = [], n2 = 0; n2 < arguments.length; n2++) t2[n2] = arguments[n2];
    var e2 = t2[0];
    return t2.slice(1).reduce(function(t3, n3) {
      return r2(t3, n3);
    }, e2);
  };
}
var i = u(function(r2, u2) {
  var i2 = n(r2), o2 = n(u2), a2 = t(r2) + t(u2), c2 = i2 * o2;
  return e(c2), c2 / Math.pow(10, a2);
}), o = u(function(r2, n2) {
  var e2 = Math.pow(10, Math.max(t(r2), t(n2)));
  return (i(r2, e2) + i(n2, e2)) / e2;
}), a = u(function(r2, n2) {
  var e2 = Math.pow(10, Math.max(t(r2), t(n2)));
  return (i(r2, e2) - i(n2, e2)) / e2;
}), c = u(function(u2, o2) {
  var a2 = n(u2), c2 = n(o2);
  return e(a2), e(c2), i(a2 / c2, r(Math.pow(10, t(o2) - t(u2))));
});
var f = true;
var v = { strip: r, plus: o, minus: a, times: i, divide: c, round: function(r2, t2) {
  var n2 = Math.pow(10, t2), e2 = c(Math.round(Math.abs(i(r2, n2))), n2);
  return r2 < 0 && 0 !== e2 && (e2 = i(e2, -1)), e2;
}, digitLength: t, float2Fixed: n, enableBoundaryChecking: function(r2) {
  void 0 === r2 && (r2 = true), f = r2;
} };
export {
  v as i
};
