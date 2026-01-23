const n = { trailing: true };
function t(t2, i = 25, e = {}) {
  if (e = { ...n, ...e }, !Number.isFinite(i)) throw new TypeError("Expected `wait` to be a finite number");
  let r, o, l, u, a = [];
  const s = (n2, i2) => (l = (async function(n3, t3, i3) {
    return await n3.apply(t3, i3);
  })(t2, n2, i2), l.finally(() => {
    if (l = null, e.trailing && u && !o) {
      const t3 = s(n2, u);
      return u = null, t3;
    }
  }), l);
  return function(...n2) {
    return l ? (e.trailing && (u = n2), l) : new Promise((t3) => {
      const l2 = !o && e.leading;
      clearTimeout(o), o = setTimeout(() => {
        o = null;
        const t4 = e.leading ? r : s(this, n2);
        for (const n3 of a) n3(t4);
        a = [];
      }, i), l2 ? (r = s(this, n2), t3(r)) : a.push(t3);
    });
  };
}
export {
  t as d
};
