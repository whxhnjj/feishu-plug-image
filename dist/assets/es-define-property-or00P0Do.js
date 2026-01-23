var r, e;
function t() {
  if (e) return r;
  e = 1;
  var t2 = Object.defineProperty || false;
  if (t2) try {
    t2({}, "a", { value: 1 });
  } catch (r2) {
    t2 = false;
  }
  return r = t2;
}
export {
  t as r
};
