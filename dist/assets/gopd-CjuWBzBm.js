var r, t, n, e;
function c() {
  return t ? r : (t = 1, r = Object.getOwnPropertyDescriptor);
}
function u() {
  if (e) return n;
  e = 1;
  var r2 = c();
  if (r2) try {
    r2([], "length");
  } catch (t2) {
    r2 = null;
  }
  return n = r2;
}
export {
  u as r
};
