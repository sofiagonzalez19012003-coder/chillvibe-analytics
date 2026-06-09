import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { generateHallazgos } from '../utils/claudeApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const OR = '#e8631a', BR = '#7a4a28', TE = '#3abfbf', GO = '#d4a027';

function KpiCard({ value, label, sub, color }) {
  const border = { orange: 'border-orange', brown: 'border-brown-mid', teal: 'border-teal', gold: 'border-gold' }[color] || 'border-orange';
  return (
    <div className={`bg-white rounded-xl p-5 border-l-4 ${border}`}>
      <div className="font-mono font-extrabold text-2xl text-dark-brown">{value}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Dashboard({ periods, onNavigate }) {
  const [aiSummary, setAiSummary] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cv_dashboard_ai') || 'null'); } catch { return null; }
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [loadMsg, setLoadMsg] = useState('Analizando datos...');

  const allPosts = periods.flatMap(p => p.posts || []);
  const totals = {
    views:    periods.reduce((s, p) => s + (p.summary?.totalViews    || 0), 0),
    reach:    periods.reduce((s, p) => s + (p.summary?.totalReach    || 0), 0),
    likes:    periods.reduce((s, p) => s + (p.summary?.totalLikes    || 0), 0),
    saves:    periods.reduce((s, p) => s + (p.summary?.totalSaves    || 0), 0),
    shares:   periods.reduce((s, p) => s + (p.summary?.totalShares   || 0), 0),
    comments: periods.reduce((s, p) => s + (p.summary?.totalComments || 0), 0),
    posts:    allPosts.length,
    avgER:    periods.length ? +(periods.reduce((s,p) => s + (p.summary?.avgER || 0), 0) / periods.length).toFixed(1) : 0,
  };

  const topHistorical = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 5);

  // Monthly growth chart
  const reversedPeriods = [...periods].reverse();
  const growthLabels = reversedPeriods.map(p => p.label.split(' ')[0]);
  const growthViews  = reversedPeriods.map(p => Math.round((p.summary?.totalViews || 0) / (p.posts?.length || 1)));
  const growthER     = reversedPeriods.map(p => p.summary?.avgER || 0);

  const LOADING_MSGS = [
    'Analizando datos históricos... 🧠',
    'Identificando patrones de contenido...',
    'Calculando benchmarks de la industria...',
    'Generando insights accionables...',
    'Finalizando análisis estratégico... ✨',
  ];

  const fetchAI = async () => {
    setAiLoading(true);
    setAiError('');
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % LOADING_MSGS.length;
      setLoadMsg(LOADING_MSGS[idx]);
    }, 2000);
    try {
      const latest = periods[0];
      const historical = periods.slice(1);
      const data = await generateHallazgos(latest, historical);
      localStorage.setItem('cv_dashboard_ai', JSON.stringify(data));
      setAiSummary(data);
    } catch (e) {
      setAiError(e.message === 'API_KEY_MISSING' ? 'Configura tu API Key para ver el análisis de IA.' : e.message);
    } finally {
      clearInterval(interval);
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-dark-brown text-cream rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="text-5xl">🦔</div>
        <div className="flex-1">
          <h1 className="font-serif font-extrabold text-xl">Chill Vibe @chillvibeglobal</h1>
          <p className="text-sm text-cream/60 mt-1">Analytics Intelligence Platform · By Kapital Music</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full">
              {periods.length} {periods.length === 1 ? 'período' : 'períodos'} de datos
            </span>
            <span className="bg-white/10 text-xs px-3 py-1 rounded-full">
              Desde {periods[periods.length - 1]?.dateRange?.split('–')[0]?.trim() || 'Abr 20, 2026'}
            </span>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="font-mono font-extrabold text-3xl text-orange">{totals.avgER}%</div>
          <div className="text-xs text-cream/50 mt-1">ER Histórico Prom.</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard value={totals.views.toLocaleString()} label="Views Totales" sub={`${Math.round(totals.views/totals.posts)} prom/post`} color="orange" />
        <KpiCard value={totals.reach.toLocaleString()} label="Alcance Total" sub={`${Math.round(totals.reach/totals.posts)} prom/post`} color="brown" />
        <KpiCard value={totals.posts} label="Posts Publicados" sub={`${periods.length} período(s)`} color="teal" />
        <KpiCard value={`${totals.avgER}%`} label="ER Promedio Histórico" sub="3–5× benchmark industria" color="gold" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard value={totals.likes.toLocaleString()} label="Likes Totales" sub={`${(totals.likes/totals.posts).toFixed(1)}/post`} color="orange" />
        <KpiCard value={totals.saves} label="Guardados Totales" sub="Señal de valor alto" color="brown" />
        <KpiCard value={totals.shares} label="Shares Totales" sub="Área de oportunidad" color="teal" />
        <KpiCard value={totals.comments} label="Comentarios" sub={`${(totals.comments/totals.posts).toFixed(1)}/post`} color="gold" />
      </div>

      {/* Growth chart */}
      {periods.length > 1 && (
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-bold text-sm text-dark-brown mb-4">📈 Evolución Mensual — Views Promedio por Post</h3>
          <Line
            data={{
              labels: growthLabels,
              datasets: [
                { label: 'Avg Views/Post', data: growthViews, borderColor: OR, backgroundColor: OR + '22', fill: true, tension: 0.4, pointBackgroundColor: OR, pointRadius: 5, yAxisID: 'y' },
                { label: 'ER Promedio %', data: growthER, borderColor: TE, backgroundColor: 'transparent', tension: 0.4, pointBackgroundColor: TE, pointRadius: 4, yAxisID: 'y1', borderDash: [5,3] },
              ],
            }}
            options={{
              responsive: true,
              interaction: { mode: 'index', intersect: false },
              plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } } },
              scales: { y: { beginAtZero: true, title: { display: true, text: 'Views', font: { size: 10 } } }, y1: { beginAtZero: true, position: 'right', title: { display: true, text: 'ER %', font: { size: 10 } }, grid: { drawOnChartArea: false } } },
            }}
          />
        </div>
      )}

      {/* AI Executive Summary */}
      <div className="bg-white rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-dark-brown">🧠 Análisis Ejecutivo — Generado por IA</h3>
          <button
            onClick={fetchAI}
            disabled={aiLoading}
            className="text-xs font-bold text-orange hover:text-orange/80 disabled:opacity-50 transition-colors"
          >
            {aiLoading ? '...' : aiSummary ? 'Regenerar' : 'Generar análisis'}
          </button>
        </div>

        {aiLoading && (
          <div className="text-center py-8 space-y-3">
            <div className="text-3xl animate-pulse">🧠</div>
            <p className="text-sm font-semibold text-dark-brown">{loadMsg}</p>
            <div className="w-full bg-cream rounded-full h-2"><div className="bg-orange h-2 rounded-full animate-pulse" style={{ width: '60%' }} /></div>
          </div>
        )}

        {aiError && !aiLoading && (
          <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">{aiError}</div>
        )}

        {aiSummary && !aiLoading && (
          <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
            {/* Benchmarks */}
            <div className="bg-cream rounded-xl p-4">
              <h4 className="font-bold text-xs uppercase tracking-wide text-dark-brown mb-3">📊 Benchmarks</h4>
              <div className="space-y-2">
                {[
                  ['ER Promedio', `${aiSummary.benchmarks?.erPromedio}%`, 'text-green-ok'],
                  ['vs Industria', aiSummary.benchmarks?.erVsIndustria, ''],
                  ['Mejor día', `${aiSummary.benchmarks?.mejorDia?.dia} (${aiSummary.benchmarks?.mejorDia?.avgViews} views)`, 'text-orange'],
                  ['Mejor hora', `${aiSummary.benchmarks?.mejorHora?.hora} (${aiSummary.benchmarks?.mejorHora?.avgViews} views)`, 'text-orange'],
                ].map(([label, val, cls]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-gray-500">{label}</span>
                    <span className={`font-bold ${cls}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hooks */}
            <div className="bg-cream rounded-xl p-4">
              <h4 className="font-bold text-xs uppercase tracking-wide text-dark-brown mb-3">🧠 Análisis de Hooks</h4>
              <div className="space-y-2 mb-2">
                {aiSummary.analisisHooks && Object.entries({ 'Científico': aiSummary.analisisHooks.cientifico, 'Motivacional': aiSummary.analisisHooks.motivacional, 'POV': aiSummary.analisisHooks.pov, 'Emocional': aiSummary.analisisHooks.emocional }).map(([k, v]) => v ? (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-gray-500">{k} ({v.posts} posts)</span>
                    <span className="font-bold text-dark-brown">{v.avgViews} views avg</span>
                  </div>
                ) : null)}
              </div>
              <p className="text-xs text-gray-600 bg-green-50 rounded-lg p-2">{aiSummary.analisisHooks?.conclusion}</p>
            </div>
            {/* Trends */}
            <div className="bg-cream rounded-xl p-4">
              <h4 className="font-bold text-xs uppercase tracking-wide text-dark-brown mb-2">📉 Tendencias</h4>
              <p className="text-xs text-gray-600 mb-2">{aiSummary.tendencias?.descripcion}</p>
              {aiSummary.tendencias?.alertasCriticas?.map((a, i) => (
                <p key={i} className="text-xs text-red-600 flex gap-1.5 mb-1"><span>⚠️</span>{a}</p>
              ))}
            </div>
            {/* Actions */}
            <div className="bg-cream rounded-xl p-4">
              <h4 className="font-bold text-xs uppercase tracking-wide text-dark-brown mb-2">🎯 Plan de Acción</h4>
              {aiSummary.planAccionInmediata?.map((a, i) => (
                <div key={i} className="flex gap-2 mb-2 text-xs">
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] shrink-0 ${a.prioridad==='ALTA'?'bg-red-100 text-red-600':a.prioridad==='MEDIA'?'bg-yellow-100 text-yellow-600':'bg-green-100 text-green-600'}`}>{a.prioridad}</span>
                  <span className="text-gray-700">{a.accion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!aiSummary && !aiLoading && !aiError && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-sm font-semibold">Haz click en "Generar análisis" para obtener un análisis ejecutivo con IA.</p>
          </div>
        )}
      </div>

      {/* Top historical posts */}
      <div className="bg-white rounded-2xl p-5">
        <h3 className="font-bold text-sm text-dark-brown mb-4">🏆 Top 5 Posts Históricos (por Views)</h3>
        <div className="space-y-3">
          {topHistorical.map((p, i) => (
            <div key={`${p.id}-${i}`} className="flex items-center gap-4 p-3 bg-cream rounded-xl">
              <div className="font-mono font-extrabold text-xl text-orange w-6 text-center">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-dark-brown truncate">{p.desc}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{p.fecha} · {p.tipo}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-orange text-base">{p.views}</div>
                <div className="text-[10px] text-gray-400">views</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-dark-brown text-base">{p.er}%</div>
                <div className="text-[10px] text-gray-400">ER</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
