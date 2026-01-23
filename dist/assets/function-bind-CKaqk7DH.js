var t, n, r, o;
function e() {
  if (n) return t;
  n = 1;
  var r2 = Object.prototype.toString, o2 = Math.max, e2 = function(t2, n2) {
    for (var r3 = [], o3 = 0; o3 < t2.length; o3 += 1) r3[o3] = t2[o3];
    for (var e3 = 0; e3 < n2.length; e3 += 1) r3[e3 + t2.length] = n2[e3];
    return r3;
  };
  return t = function(t2) {
    var n2 = this;
    if ("function" != typeof n2 || "[object Function]" !== r2.apply(n2)) throw new TypeError("Function.prototype.bind called on incompatible " + n2);
    for (var i2, p = (function(t3, n3) {
      for (var r3 = [], o3 = n3, e3 = 0; o3 < t3.length; o3 += 1, e3 += 1) r3[e3] = t3[o3];
      return r3;
    })(arguments, 1), u = o2(0, n2.length - p.length), a = [], f = 0; f < u; f++) a[f] = "$" + f;
    if (i2 = Function("binder", "return function (" + (function(t3, n3) {
      for (var r3 = "", o3 = 0; o3 < t3.length; o3 += 1) r3 += t3[o3], o3 + 1 < t3.length && (r3 += n3);
      return r3;
    })(a, ",") + "){ return binder.apply(this,arguments); }")(function() {
      if (this instanceof i2) {
        var r3 = n2.apply(this, e2(p, arguments));
        return Object(r3) === r3 ? r3 : this;
      }
      return n2.apply(t2, e2(p, arguments));
    }), n2.prototype) {
      var c = function() {
      };
      c.prototype = n2.prototype, i2.prototype = new c(), c.prototype = null;
    }
    return i2;
  }, t;
}
function i() {
  if (o) return r;
  o = 1;
  var t2 = e();
  return r = Function.prototype.bind || t2;
}
export {
  i as r
};
