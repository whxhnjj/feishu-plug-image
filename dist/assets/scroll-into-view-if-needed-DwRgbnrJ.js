import { i as o } from "./compute-scroll-into-view-BstioZEA.js";
function e(o2) {
  return o2 === Object(o2) && 0 !== Object.keys(o2).length;
}
function n(n2, t) {
  var r = n2.isConnected || n2.ownerDocument.documentElement.contains(n2);
  if (e(t) && "function" == typeof t.behavior) return t.behavior(r ? o(n2, t) : []);
  if (r) {
    var i = (function(o2) {
      return false === o2 ? { block: "end", inline: "nearest" } : e(o2) ? o2 : { block: "start", inline: "nearest" };
    })(t);
    return (function(o2, e2) {
      void 0 === e2 && (e2 = "auto");
      var n3 = "scrollBehavior" in document.body.style;
      o2.forEach(function(o3) {
        var t2 = o3.el, r2 = o3.top, i2 = o3.left;
        t2.scroll && n3 ? t2.scroll({ top: r2, left: i2, behavior: e2 }) : (t2.scrollTop = r2, t2.scrollLeft = i2);
      });
    })(o(n2, i), i.behavior);
  }
}
export {
  n as s
};
