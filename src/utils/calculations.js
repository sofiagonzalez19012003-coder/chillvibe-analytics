export function calcER(likes, comments, shares, saved, reach) {
  if (!reach || reach === 0) return 0;
  return +((( likes + comments + shares + saved) / reach) * 100).toFixed(1);
}

export function computeSummary(posts) {
  if (!posts || !posts.length) return null;
  const totalViews    = posts.reduce((s, p) => s + p.views, 0);
  const totalReach    = posts.reduce((s, p) => s + p.alcance, 0);
  const totalLikes    = posts.reduce((s, p) => s + p.likes, 0);
  const totalSaves    = posts.reduce((s, p) => s + p.saved, 0);
  const totalShares   = posts.reduce((s, p) => s + p.shares, 0);
  const totalComments = posts.reduce((s, p) => s + p.comments, 0);
  const avgER         = +(posts.reduce((s, p) => s + p.er, 0) / posts.length).toFixed(1);
  const reels         = posts.filter(p => p.tipo === 'Reel').length;
  const carousels     = posts.filter(p => p.tipo === 'Carrusel').length;
  const images        = posts.filter(p => p.tipo === 'Imagen').length;

  const sorted = [...posts].sort((a, b) => b.views - a.views);
  const topCount = Math.max(1, Math.round(posts.length * 0.2));
  const topPosts    = sorted.slice(0, topCount).map(p => p.id);
  const bottomPosts = sorted.slice(-topCount).map(p => p.id);

  return {
    totalViews, totalReach, totalLikes, totalSaves, totalShares, totalComments,
    avgER, totalPosts: posts.length, reels, carousels, images, topPosts, bottomPosts,
  };
}

export function avgViewsByDay(posts) {
  const days = { Lunes:[], Martes:[], Miércoles:[], Jueves:[], Viernes:[], Sábado:[], Domingo:[] };
  const dayNames = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  posts.forEach(p => {
    const [datePart] = p.fecha.split(' ');
    const [mm, dd, yy] = datePart.split('/');
    const year = yy ? +yy + 2000 : 2026;
    const d = new Date(year, mm - 1, dd);
    const name = dayNames[d.getDay()];
    if (days[name]) days[name].push(p.views);
  });
  return Object.fromEntries(
    Object.entries(days).map(([k, v]) => [k, v.length ? Math.round(v.reduce((a,b) => a+b,0)/v.length) : 0])
  );
}

export function avgViewsByHour(posts) {
  const hours = {};
  posts.forEach(p => {
    const parts = p.fecha.split(' ');
    if (parts.length < 2) return;
    const h = parts[1].split(':')[0].padStart(2,'0') + ':00';
    if (!hours[h]) hours[h] = [];
    hours[h].push(p.views);
  });
  return Object.fromEntries(
    Object.entries(hours)
      .sort((a,b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => [k, Math.round(v.reduce((a,b) => a+b,0)/v.length)])
  );
}

export function avgERByFormat(posts) {
  const fmt = { Reel:[], Carrusel:[], Imagen:[] };
  posts.forEach(p => { if (fmt[p.tipo]) fmt[p.tipo].push(p.er); });
  return Object.fromEntries(
    Object.entries(fmt).map(([k, v]) => [k, v.length ? +(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1) : 0])
  );
}

export function avgReachByFormat(posts) {
  const fmt = { Reel:[], Carrusel:[], Imagen:[] };
  posts.forEach(p => { if (fmt[p.tipo]) fmt[p.tipo].push(p.alcance); });
  return Object.fromEntries(
    Object.entries(fmt).map(([k, v]) => [k, v.length ? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 0])
  );
}

export function erClass(er) {
  if (er >= 20) return 'er-high';
  if (er >= 10) return 'er-mid';
  return 'er-low';
}

export function fmtDate(fecha) {
  const [datePart, timePart] = fecha.split(' ');
  const [mm, dd] = datePart.split('/');
  return `${dd}/${mm}${timePart ? ' ' + timePart : ''}`;
}

export function nextMonday(fromDate) {
  const d = new Date(fromDate);
  const day = d.getDay();
  const diff = day === 1 ? 7 : (8 - day) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d;
}
