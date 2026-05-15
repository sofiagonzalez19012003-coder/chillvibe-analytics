import { useState, useMemo } from 'react';
import { erClass, fmtDate } from '../../utils/calculations';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend, Filler);

const OR = '#e8631a', TE = '#3abfbf', GO = '#d4a027', BR = '#7a4a28';

function Badge({ tipo }) {
  const cls = { Reel: 'badge-reel', Carrusel: 'badge-carousel', Imagen: 'badge-image' }[tipo] || '';
  return <span className={`badge ${cls}`}>{tipo}</span>;
}

function StatusBadge({ isTop, isBot }) {
  if (isTop) return <span className="badge badge-top">TOP</span>;
  if (isBot) return <span className="badge badge-bot">LOW</span>;
  return null;
}

export default function KPIsTab({ period }) {
  const [sortKey, setSortKey] = useState('views');
  const [sortDir, setSortDir] = useState(-1);
  const [search, setSearch] = useState('');

  const topSet = new Set(period.summary?.topPosts || []);
  const botSet = new Set(period.summary?.bottomPosts || []);

  const sorted = useMemo(() => {
    const posts = [...(period.posts || [])];
    if (search) {
      const q = search.toLowerCase();
      return posts.filter(p => p.desc.toLowerCase().includes(q) || p.tipo.toLowerCase().includes(q));
    }
    return posts.sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir);
  }, [period.posts, sortKey, sortDir, search]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => -d);
    else { setSortKey(key); setSortDir(-1); }
  };

  const Th = ({ k, label }) => (
    <th className="cursor-pointer select-none hover:bg-dark-brown/80" onClick={() => toggleSort(k)}>
      <div className="flex items-center gap-1">
        {label}
        {sortKey === k && <span className="text-orange">{sortDir === -1 ? '↓' : '↑'}</span>}
      </div>
    </th>
  );

  // Charts data
  const byDay = {};
  const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  (period.posts || []).forEach(p => {
    const [date] = p.fecha.split(' ');
    const [mm, dd] = date.split('/');
    const d = new Date(2026, mm-1, dd);
    const name = DAY_NAMES[d.getDay()];
    if (!byDay[name]) byDay[name] = [];
    byDay[name].push(p.views);
  });
  const dayLabels = Object.keys(byDay);
  const dayValues = dayLabels.map(k => Math.round(byDay[k].reduce((a,b)=>a+b,0)/byDay[k].length));

  const fmtCounts = { Reel:0, Carrusel:0, Imagen:0 };
  (period.posts||[]).forEach(p => { if (fmtCounts[p.tipo] !== undefined) fmtCounts[p.tipo]++; });

  return (
    <div className="space-y-5">
      {/* Mini charts */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4">
          <h4 className="font-bold text-xs text-dark-brown mb-3">Avg Views por Día de la Semana</h4>
          <Bar
            data={{ labels: dayLabels, datasets: [{ data: dayValues, backgroundColor: dayValues.map(v => v === Math.max(...dayValues) ? OR : BR + '88'), borderRadius: 6 }] }}
            options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }}
          />
        </div>
        <div className="bg-white rounded-2xl p-4">
          <h4 className="font-bold text-xs text-dark-brown mb-3">Distribución de Formatos</h4>
          <Doughnut
            data={{ labels: ['Reels', 'Carruseles', 'Imágenes'], datasets: [{ data: [fmtCounts.Reel, fmtCounts.Carrusel, fmtCounts.Imagen], backgroundColor: [OR, TE, GO], borderWidth: 0 }] }}
            options={{ plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } } }, responsive: true }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <h3 className="font-bold text-sm text-dark-brown">Tabla Completa — {period.posts?.length} Posts</h3>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por copy o formato..."
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs w-full sm:w-64 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="cv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Estado</th>
                <Th k="fecha" label="Fecha" />
                <th>Formato</th>
                <Th k="views" label="Views" />
                <Th k="alcance" label="Alcance" />
                <Th k="likes" label="Likes" />
                <Th k="comments" label="Coms" />
                <Th k="shares" label="Shares" />
                <Th k="saved" label="Guard." />
                <Th k="er" label="ER %" />
                <th>Copy</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(p => (
                <tr key={p.id}>
                  <td><strong>#{p.id}</strong></td>
                  <td><StatusBadge isTop={topSet.has(p.id)} isBot={botSet.has(p.id)} /></td>
                  <td className="whitespace-nowrap text-gray-500">{fmtDate(p.fecha)}</td>
                  <td><Badge tipo={p.tipo} /></td>
                  <td><strong className="text-orange font-mono">{p.views}</strong></td>
                  <td className="font-mono">{p.alcance}</td>
                  <td className="font-mono">{p.likes}</td>
                  <td className="font-mono">{p.comments}</td>
                  <td className="font-mono">{p.shares}</td>
                  <td className="font-mono">{p.saved}</td>
                  <td className={`font-mono ${erClass(p.er)}`}>{p.er}%</td>
                  <td>
                    <div className="max-w-[200px] truncate text-gray-500 text-xs">
                      {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">{p.desc}</a> : p.desc}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">No hay resultados para "{search}"</div>
        )}
      </div>
    </div>
  );
}
