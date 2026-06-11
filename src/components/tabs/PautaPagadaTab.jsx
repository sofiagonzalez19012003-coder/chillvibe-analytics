import { useState } from 'react';
import { FOUNDING_PAUTA_PAGADA, FOUNDING_PAUTA_PAGADA_RESULTADOS } from '../../data/foundingAnalysis';
import { generatePautaPagada } from '../../utils/claudeApi';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const LOADING_MSGS = [
  'Analizando posts con mayor rendimiento orgánico... 🧠',
  'Seleccionando contenido con potencial de escala...',
  'Calculando distribución óptima del presupuesto...',
  'Definiendo segmentación de audiencias...',
  'Proyectando resultados basados en datos reales...',
  'Construyendo calendario de pauta día a día... 📅',
  'Finalizando plan de pauta pagada... ✨',
];

const FASE_COLORS = {
  1: { bg: 'bg-orange', text: 'text-orange', border: 'border-orange', light: 'bg-orange/10' },
  2: { bg: 'bg-teal',   text: 'text-teal',   border: 'border-teal',   light: 'bg-teal/10'   },
  3: { bg: 'bg-gold',   text: 'text-gold',   border: 'border-gold',   light: 'bg-gold/10'   },
};

const OBJ_COLORS = {
  Alcance:        'bg-orange/20 text-orange',
  Reproducciones: 'bg-teal/20 text-teal',
  Seguidores:     'bg-green-100 text-green-700',
  Tráfico:        'bg-gold/20 text-gold',
  Conversión:     'bg-purple-100 text-purple-700',
  'Escalar ganador': 'bg-dark-brown/10 text-dark-brown',
};

const PRIO_COLORS = {
  ALTA:  'bg-red-100 text-red-600',
  MEDIA: 'bg-yellow-100 text-yellow-700',
  BAJA:  'bg-green-100 text-green-700',
};

// ── Budget Hero ──────────────────────────────────────────────────────────────
function BudgetHero({ data }) {
  const total = data.presupuestoTotal;
  const currency = data.moneda || 'USD';
  return (
    <div className="bg-dark-brown text-cream rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div>
          <div className="font-mono font-extrabold text-5xl text-orange">${total.toLocaleString()} {currency}</div>
          <div className="text-sm text-cream/60 mt-1">Presupuesto total recomendado · {data.duracion}</div>
          <div className="text-xs text-cream/40 mt-1">{data.fechaInicio} → {data.fechaFin} · ${(total/15).toFixed(0)}/día promedio</div>
        </div>
        <div className="sm:ml-auto flex flex-col gap-2">
          {data.fases?.map(f => (
            <div key={f.nombre} className="flex items-center gap-3 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${f.color === 'orange' ? 'bg-orange' : f.color === 'teal' ? 'bg-teal' : 'bg-gold'}`} />
              <span className="text-cream/70 font-semibold w-16">{f.nombre} ({f.dias})</span>
              <span className="font-mono font-bold text-cream">${f.presupuesto}</span>
              <span className="text-cream/40 hidden sm:inline">— {f.objetivo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 1. Content Selection ─────────────────────────────────────────────────────
function ContentSelectionSection({ posts }) {
  if (!posts?.length) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-sm text-dark-brown">🎯 1. Selección de Contenido a Pautar</h3>
        <p className="text-xs text-gray-500 mt-0.5">Posts con mayor potencial de escalabilidad basado en rendimiento orgánico real</p>
      </div>
      <div className="overflow-x-auto">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Copy</th>
              <th>Views Org.</th>
              <th>ER Org.</th>
              <th>Por qué escala</th>
              <th>Objetivo Pauta</th>
              <th>Prioridad</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.postId}>
                <td className="font-bold whitespace-nowrap">#{p.postId}</td>
                <td className="max-w-[160px]">
                  <div className="truncate text-gray-600 text-xs italic">"{p.copyExtracto}"</div>
                </td>
                <td><strong className="font-mono text-orange">{p.viewsOrganico}</strong></td>
                <td><strong className="font-mono">{p.erOrganico}%</strong></td>
                <td className="max-w-[220px] text-xs text-gray-600">{p.porQueEscala}</td>
                <td>
                  <span className={`badge text-[10px] font-bold px-2 py-0.5 rounded-full ${OBJ_COLORS[p.objetivo] || 'bg-gray-100 text-gray-600'}`}>
                    {p.objetivo}
                  </span>
                </td>
                <td>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIO_COLORS[p.prioridad] || 'bg-gray-100 text-gray-500'}`}>
                    {p.prioridad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 2. 15-Day Calendar ───────────────────────────────────────────────────────
function CalendarSection({ dias, fases }) {
  if (!dias?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-2">📅 3. Calendario de Pauta Día a Día</h3>
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {fases?.map(f => (
          <div key={f.nombre} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${f.color==='orange'?'bg-orange':f.color==='teal'?'bg-teal':'bg-gold'}`} />
            <span className="font-semibold text-dark-brown">{f.nombre} ({f.dias})</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {dias.map(d => {
          const fc = FASE_COLORS[d.fase] || FASE_COLORS[1];
          return (
            <div key={d.dia} className={`rounded-xl p-2.5 border-t-[3px] ${fc.border} bg-white shadow-sm`}>
              <div className={`font-mono font-extrabold text-lg ${fc.text}`}>D{d.dia}</div>
              <div className="text-[10px] text-gray-400 mb-1">{d.fecha} · {d.diaSemana}</div>
              <div className="font-bold text-xs text-dark-brown leading-tight mb-1">{d.post}</div>
              <div className={`text-[10px] ${fc.text} font-semibold`}>{d.objetivo}</div>
              <div className="font-mono font-bold text-[11px] text-orange mt-1">${d.presupuestoDiario}/día</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 3. Detailed Plan Table ───────────────────────────────────────────────────
function PlanDetalladoSection({ plan }) {
  if (!plan?.length) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-sm text-dark-brown">📋 3. Plan Detallado de Pauta</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Días</th>
              <th>Post</th>
              <th>Objetivo</th>
              <th>$/día</th>
              <th>Total</th>
              <th>Audiencia</th>
              <th>Formato</th>
              <th>CTA</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((r, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap font-bold text-xs">{r.dias}</td>
                <td className="font-bold whitespace-nowrap">{r.post}</td>
                <td>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${OBJ_COLORS[r.objetivo] || 'bg-gray-100 text-gray-600'}`}>
                    {r.objetivo}
                  </span>
                </td>
                <td className="font-mono font-bold text-dark-brown">${r.presupuestoDiario}</td>
                <td className="font-mono font-bold text-orange">${r.presupuestoTotal}</td>
                <td className="text-xs text-gray-600 max-w-[200px]">{r.audiencia}</td>
                <td className="text-xs whitespace-nowrap">{r.formatoAnuncio}</td>
                <td className="text-xs font-semibold text-teal whitespace-nowrap">{r.cta}</td>
              </tr>
            ))}
            <tr className="bg-dark-brown text-cream">
              <td colSpan={4}><strong>TOTAL</strong></td>
              <td><strong className="font-mono text-orange text-base">${plan.reduce((s,r)=>s+(r.presupuestoTotal||0),0)}</strong></td>
              <td colSpan={3} className="text-cream/60 text-xs italic">Presupuesto comprometido en posts prioritarios</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 4. Audience Segmentation ─────────────────────────────────────────────────
function SegmentacionSection({ seg }) {
  if (!seg) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">👥 4. Segmentación de Audiencia Recomendada</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Cold */}
        <div>
          <div className="text-xs font-bold text-orange mb-3">🧊 Audiencia Fría (Fase 1)</div>
          <div className="space-y-2 text-xs">
            <div><strong className="text-dark-brown">Demografía:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.fria?.demografia?.map((t,i) => <Tag key={i} text={t} />)}</div>
            </div>
            <div><strong className="text-dark-brown">Intereses:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.fria?.intereses?.map((t,i) => <Tag key={i} text={t} />)}</div>
            </div>
            <div><strong className="text-dark-brown">Comportamientos:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.fria?.comportamientos?.map((t,i) => <Tag key={i} text={t} />)}</div>
            </div>
          </div>
        </div>
        {/* Warm */}
        <div>
          <div className="text-xs font-bold text-teal mb-3">🔥 Audiencia Tibia (Fase 2 — Retargeting)</div>
          <div className="space-y-2 text-xs">
            <div><strong className="text-dark-brown">Retargeting:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.tibia?.retargeting?.map((t,i) => <Tag key={i} text={t} color="teal" />)}</div>
            </div>
            <div><strong className="text-dark-brown">Lookalike:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.tibia?.lookalike?.map((t,i) => <Tag key={i} text={t} color="teal" />)}</div>
            </div>
            <div><strong className="text-dark-brown">Intereses adicionales:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.tibia?.intereses?.map((t,i) => <Tag key={i} text={t} />)}</div>
            </div>
          </div>
        </div>
        {/* Hot */}
        <div>
          <div className="text-xs font-bold text-gold mb-3">⚡ Audiencia Caliente (Fase 3 — Conversión)</div>
          <div className="space-y-2 text-xs">
            <div><strong className="text-dark-brown">Segmentos alta intención:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.caliente?.segmentos?.map((t,i) => <Tag key={i} text={t} color="gold" />)}</div>
            </div>
            <div><strong className="text-dark-brown">CTA específico:</strong>
              <div className="flex flex-wrap gap-1 mt-1">{seg.caliente?.cta?.map((t,i) => <Tag key={i} text={t} color="gold" />)}</div>
            </div>
            {seg.caliente?.nota && (
              <div className="bg-yellow-50 rounded-lg p-2 text-[10px] text-yellow-800 mt-2">⚡ {seg.caliente.nota}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ text, color = 'default' }) {
  const cls = {
    default: 'bg-cream text-dark-brown',
    teal:    'bg-teal/10 text-teal',
    gold:    'bg-gold/10 text-gold',
  }[color];
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${cls}`}>{text}</span>;
}

// ── 5. Budget Distribution ───────────────────────────────────────────────────
function PresupuestoSection({ dist }) {
  if (!dist?.length) return null;
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-sm text-dark-brown">💰 5. Distribución y Justificación del Presupuesto</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="cv-table">
          <thead>
            <tr><th>Fase</th><th>Post</th><th>Días</th><th>Presupuesto</th><th>% del Total</th><th>Justificación</th></tr>
          </thead>
          <tbody>
            {dist.map((r, i) => (
              <tr key={i}>
                <td>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                    r.fase.includes('1') ? 'bg-orange' : r.fase.includes('2') ? 'bg-teal' : r.fase.includes('3') ? 'bg-gold' : 'bg-dark-brown/60'
                  }`}>{r.fase}</span>
                </td>
                <td className="font-bold whitespace-nowrap">{r.post}</td>
                <td className="text-xs text-gray-500 whitespace-nowrap">{r.dias}</td>
                <td><strong className="font-mono text-orange">${r.presupuesto}</strong></td>
                <td>
                  <div className="text-xs mb-1">{r.porcentaje}%</div>
                  <div className="h-1.5 bg-cream rounded-full w-24">
                    <div className="h-full bg-orange rounded-full" style={{ width: `${r.porcentaje}%` }} />
                  </div>
                </td>
                <td className="text-xs text-gray-600 max-w-[240px]">{r.justificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 6. KPIs ──────────────────────────────────────────────────────────────────
function KPIsSection({ kpis }) {
  if (!kpis) return null;
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4">
        <h3 className="font-bold text-sm text-dark-brown mb-4">📊 6. KPIs a Monitorear Durante la Pauta</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <KPICard title="⬆️ Señales de ESCALAR" color="green-ok" items={kpis.escalar} colorClass="text-green-ok" bg="bg-green-50" />
          <KPICard title="⚙️ Señales de OPTIMIZAR" color="gold" items={kpis.optimizar} colorClass="text-gold" bg="bg-yellow-50" />
          <KPICard title="⏸️ Señales de PAUSAR" color="red-alert" items={kpis.pausar} colorClass="text-red-500" bg="bg-red-50" />
        </div>
        {kpis.tabla?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="cv-table">
              <thead>
                <tr><th>KPI</th><th>Qué mide</th><th>Umbral óptimo</th><th>Frecuencia</th><th>Herramienta</th></tr>
              </thead>
              <tbody>
                {kpis.tabla.map((k, i) => (
                  <tr key={i}>
                    <td><strong className="font-mono">{k.kpi}</strong></td>
                    <td className="text-xs text-gray-600">{k.queMide}</td>
                    <td><span className="font-bold text-xs text-green-ok">{k.umbralOptimo}</span></td>
                    <td className="text-xs">{k.frecuencia}</td>
                    <td className="text-xs text-teal font-semibold">{k.herramienta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({ title, items, colorClass, bg }) {
  return (
    <div className={`${bg} rounded-xl p-4`}>
      <h4 className={`font-bold text-xs mb-3 ${colorClass}`}>{title}</h4>
      <ul className="space-y-1.5">
        {items?.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-gray-700">
            <span className={`${colorClass} shrink-0`}>▲</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── 7. Projections ───────────────────────────────────────────────────────────
function ProyeccionesSection({ proy }) {
  if (!proy) return null;
  const scenarios = [
    { key: 'conservador', icon: '📉', borderCls: 'border-gray-300' },
    { key: 'realista',    icon: '🎯', borderCls: 'border-orange' },
    { key: 'optimista',   icon: '🚀', borderCls: 'border-green-ok' },
  ];
  const rows = [
    { label: 'Impresiones totales',    key: 'impresiones' },
    { label: 'Alcance único',          key: 'alcanceUnico' },
    { label: 'Nuevos seguidores',      key: 'nuevosSeguidores' },
    { label: 'Reproducciones video',   key: 'videoViews' },
    { label: 'Clics al perfil',        key: 'clicsPerfil' },
    { label: 'Costo por seguidor',     key: 'costoSeguidor' },
    { label: 'CPM estimado',           key: 'cpm' },
  ];
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">📈 7. Proyección de Resultados</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {scenarios.map(({ key, icon, borderCls }) => {
          const sc = proy[key];
          if (!sc) return null;
          return (
            <div key={key} className={`border-t-4 ${borderCls} rounded-xl pt-4 px-4 pb-4 bg-cream`}>
              <div className="font-bold text-sm text-dark-brown mb-1">{icon} {sc.label}</div>
              <div className="text-[10px] text-gray-400 mb-3 italic">{sc.note}</div>
              {rows.map(r => (
                <div key={r.key} className="flex justify-between text-xs py-1 border-b border-white/60 last:border-0">
                  <span className="text-gray-500">{r.label}</span>
                  <span className="font-bold font-mono text-dark-brown">{sc[r.key]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {proy.metaPrincipal && (
        <div className="bg-dark-brown text-cream rounded-xl p-4 text-xs leading-relaxed">
          <strong className="text-orange">🎯 Meta principal: </strong>
          {proy.metaPrincipal}
        </div>
      )}
    </div>
  );
}

// ── Full Plan Content ─────────────────────────────────────────────────────────
function PautaPagadaContent({ data }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <BudgetHero data={data} />
      <ContentSelectionSection posts={data.postsSeleccionados} />
      <CalendarSection dias={data.calendario} fases={data.fases} />
      <PlanDetalladoSection plan={data.planDetallado} />
      <SegmentacionSection seg={data.segmentacion} />
      <PresupuestoSection dist={data.distribucionPresupuesto} />
      <KPIsSection kpis={data.kpis} />
      <ProyeccionesSection proy={data.proyecciones} />
    </div>
  );
}

// ── Pauta Pagada Resultados Content (CP1 Real Results) ──────────────────────
function PautaPagadaResultadosContent({ res }) {
  if (!res) return null;

  // Data for retention curve chart
  const retentionData = {
    labels: ['Inicio', '25% Vista', '50% Vista', '75% Vista', '95% Vista', '100% Completo'],
    datasets: res.fases.map((f, idx) => {
      const colors = [
        { border: '#e8631a', bg: 'rgba(232, 99, 26, 0.05)' }, // Phase 1 - Orange
        { border: '#3abfbf', bg: 'rgba(58, 191, 191, 0.05)' }, // Phase 2 - Teal
        { border: '#d4a027', bg: 'rgba(212, 160, 39, 0.05)' }  // Phase 3 - Gold
      ];
      const color = colors[idx] || colors[0];

      const vTotal = f.retentionCurve.totalViews;
      const dataPct = [
        100,
        +((f.retentionCurve.v25 / vTotal) * 100).toFixed(1),
        +((f.retentionCurve.v50 / vTotal) * 100).toFixed(1),
        +((f.retentionCurve.v75 / vTotal) * 100).toFixed(1),
        +((f.retentionCurve.v95 / vTotal) * 100).toFixed(1),
        +((f.retentionCurve.v100 / vTotal) * 100).toFixed(1)
      ];

      return {
        label: f.nombre.split(' - ')[1] || f.nombre,
        data: dataPct,
        borderColor: color.border,
        backgroundColor: color.bg,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: color.border,
        pointRadius: 4
      };
    })
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 11 },
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: 'Porcentaje Retención (%)', font: { size: 10 } }
      }
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero card */}
      <div className="bg-dark-brown text-cream rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <span className="bg-orange text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              📊 Reporte de Ejecución Real
            </span>
            <h2 className="font-serif font-extrabold text-2xl mt-2 text-orange">{res.nombreCampaña}</h2>
            <div className="text-xs text-cream/70 mt-1">Periodo: {res.periodo} · Duración: {res.duracion}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-cream/40 uppercase tracking-widest">Inversión Ejecutada</div>
            <div className="font-mono font-extrabold text-3xl text-cream">${res.spentTotal.toLocaleString()} COP</div>
            <div className="text-[10px] text-cream/60 mt-0.5">aprox. ${(res.spentTotal / 4000).toFixed(2)} USD (TRM 4,000)</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border-l-4 border-orange">
          <div className="font-mono font-extrabold text-2xl text-dark-brown">{res.impressionsTotal.toLocaleString()}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-1">Impresiones</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Alcance: {res.reachTotal.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border-l-4 border-teal">
          <div className="font-mono font-extrabold text-2xl text-dark-brown">{res.thruPlaysTotal.toLocaleString()}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-1">ThruPlays (15s+)</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Costo/TP Prom: $1.51 COP</div>
        </div>
        <div className="bg-white rounded-xl p-5 border-l-4 border-gold">
          <div className="font-mono font-extrabold text-2xl text-dark-brown">{res.clicksEnlaceTotal}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-1">Clics en Enlace</div>
          <div className="text-[10px] text-gray-400 mt-0.5">CPC Prom: ${res.avgCpc} COP</div>
        </div>
        <div className="bg-white rounded-xl p-5 border-l-4 border-brown-mid">
          <div className="font-mono font-extrabold text-2xl text-dark-brown">{res.pageEngagementTotal.toLocaleString()}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-1">Interacciones</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Reacciones: {res.reactionsTotal} | Shares: {res.sharesTotal}</div>
        </div>
      </div>

      {/* Funnel + Video Retention side-by-side */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Retention Graph */}
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-bold text-sm text-dark-brown mb-1">📉 Curva de Retención de Video por Creativo</h3>
          <p className="text-xs text-gray-500 mb-4">Porcentaje de reproducción del video. Mide el interés del oyente en el tiempo.</p>
          <div className="h-64 flex items-center justify-center relative">
            <Line data={retentionData} options={chartOptions} />
          </div>
        </div>

        {/* CSS Funnel Visual */}
        <div className="bg-white rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-dark-brown mb-1">🎯 Embudo de Conversión Publicitaria</h3>
            <p className="text-xs text-gray-500 mb-4">El viaje del usuario desde ver el anuncio hasta interactuar en plataformas de streaming.</p>
            <div className="flex flex-col gap-2.5 pt-2">
              {[
                { label: 'Impresiones en Pantalla', val: res.impressionsTotal.toLocaleString(), pct: '100%', bg: 'bg-orange text-white', w: 'w-full' },
                { label: 'Reproducciones de Video', val: '1,622,664', pct: '97.0%', bg: 'bg-teal text-white', w: 'w-[97%]' },
                { label: 'ThruPlays (100% o 15s+)', val: res.thruPlaysTotal.toLocaleString(), pct: '13.2%', bg: 'bg-gold text-dark-brown', w: 'w-[50%]' },
                { label: 'Clics en el Enlace', val: res.clicksEnlaceTotal.toString(), pct: '0.04%', bg: 'bg-dark-brown text-cream', w: 'w-[15%]' }
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 w-24 shrink-0 leading-tight">{f.label}</span>
                  <div className="flex-1 bg-cream rounded-lg overflow-hidden h-8 flex items-center relative border border-gray-100">
                    <div className={`h-full ${f.bg} flex items-center px-2.5 font-mono font-bold text-[11px] ${f.w} transition-all duration-500`}>
                      {f.val}
                    </div>
                    <span className="absolute right-2.5 text-[9px] font-bold text-gray-400">{f.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 bg-cream rounded-xl text-xs text-gray-600 leading-relaxed border-l-2 border-orange">
            💡 **VCR de 13.6% promedio:** La retención de video es muy sólida para campañas en redes. Indica una afinidad estética alta del contenido lofi con la audiencia.
          </div>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-sm text-dark-brown">📋 Tabla de Desglose por Fases</h3>
          <p className="text-xs text-gray-500 mt-0.5">Rendimiento individual por conjunto de anuncios y creativo ejecutado</p>
        </div>
        <div className="overflow-x-auto">
          <table className="cv-table">
            <thead>
              <tr>
                <th>Fase / Anuncio</th>
                <th>Inversión</th>
                <th>Impresiones</th>
                <th>Reach</th>
                <th>Freq.</th>
                <th>CPM</th>
                <th>ThruPlays</th>
                <th>Costo/TP</th>
                <th>Clics Link</th>
                <th>CPC Link</th>
                <th>CTR Link</th>
                <th>Shares/Saves</th>
              </tr>
            </thead>
            <tbody>
              {res.fases.map(f => (
                <tr key={f.fase}>
                  <td>
                    <div className="font-bold text-xs text-dark-brown">{f.nombre.split(' - ')[2]}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Fase {f.fase}</div>
                  </td>
                  <td className="font-mono text-xs">${f.spent.toLocaleString()}</td>
                  <td className="font-mono text-xs">{f.impressions.toLocaleString()}</td>
                  <td className="font-mono text-xs">{f.reach.toLocaleString()}</td>
                  <td className="font-mono text-xs">{f.frequency.toFixed(2)}</td>
                  <td className="font-mono text-xs">${f.cpm.toFixed(1)}</td>
                  <td className="font-mono text-xs">{f.thruPlays.toLocaleString()}</td>
                  <td className="font-mono text-xs">${f.costPerThruPlay}</td>
                  <td className="font-mono text-xs">{f.linkClicks}</td>
                  <td className="font-mono text-xs">${f.cpc.toFixed(1)}</td>
                  <td className="font-mono text-xs">{(f.ctrLink * 100).toFixed(3)}%</td>
                  <td className="text-xs font-semibold text-teal">{f.shares} / {f.saves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights + Time sections */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Insights list */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-dark-brown">🧠 Hallazgos Clave de Marketing</h3>
          <div className="space-y-3">
            {res.insights.map((insight, i) => (
              <div key={i} className="flex gap-2.5 text-xs text-gray-700 bg-cream/50 rounded-xl p-3 border-l-2 border-orange">
                <span className="text-orange">✦</span>
                <p className="leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Optimal Hours */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-dark-brown">⏰ Horarios Óptimos de Conversión (GMT-5)</h3>
          <div className="space-y-3">
            {[
              { time: '12:00 – 15:00 GMT-5', label: 'Golden Hour (Reino Unido / USA East) ⭐⭐⭐⭐⭐', desc: 'Cubre almuerzo en NYC/Miami y prime time post-trabajo en Londres. Mayor volumen de conversiones.', bg: 'border-orange bg-orange/5 text-orange' },
              { time: '18:00 – 21:00 GMT-5', label: 'Late Night Chill (Reino Unido / USA West) ⭐⭐⭐⭐', desc: 'Ideal para el relax lofi en UK (sueño/descanso) y la tarde de estudio en California.', bg: 'border-teal bg-teal/5 text-teal' },
              { time: '07:00 – 09:00 GMT-5', label: 'Commute & Asia Pacific (Filipinas / UK) ⭐⭐⭐', desc: 'Mapea con el almuerzo en UK y el prime time nocturno en Manila/Filipinas.', bg: 'border-gold bg-gold/5 text-gold' }
            ].map(w => (
              <div key={w.time} className={`border-l-4 ${w.bg.split(' ')[0]} rounded-r-xl p-3 bg-cream/40`}>
                <div className="font-mono font-bold text-xs text-dark-brown">{w.time}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{w.label}</div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Demographics & Plan de Acción */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Population */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-dark-brown">👥 Población y Target Optimizado</h3>
          <div className="space-y-3 text-xs text-gray-600">
            <div className="bg-cream rounded-xl p-3.5">
              <strong className="text-dark-brown block mb-1">Perfil Demográfico Principal:</strong>
              {FOUNDING_PAUTA_PAGADA_RESULTADOS.poblacion.demografia}
            </div>
            <div>
              <strong className="text-dark-brown block mb-2">Puntos Geográficos Clave:</strong>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { flag: '🇬🇧', pais: 'Reino Unido', note: 'Timezone prime 12-15h. Alta afinidad streaming.' },
                  { flag: '🇺🇸', pais: 'Estados Unidos', note: 'Costa Este y Oeste. Audiencia puente.' },
                  { flag: '🇵🇭', pais: 'Filipinas', note: 'Timezone 07h. Alto volumen, bajo costo.' },
                  { flag: '🇮🇳', pais: 'India', note: 'Timezone 07h. Muy bajo CPM. Escala masiva.' }
                ].map(g => (
                  <div key={g.pais} className="bg-cream/40 rounded-lg p-2 flex items-start gap-2">
                    <span className="text-xl shrink-0">{g.flag}</span>
                    <div>
                      <div className="font-bold text-dark-brown">{g.pais}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{g.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan de Acción */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-dark-brown">🚀 Plan de Acción e Inversión Próxima</h3>
          <p className="text-xs text-gray-500">Acciones inmediatas sugeridas para implementar en Meta Ads para el siguiente periodo</p>
          <div className="space-y-3">
            {[
              { paso: 'Incrementar Presupuesto', det: 'Escalar el presupuesto diario de $16 USD a $25 USD en Fase 1, aprovechando el CTR orgánico alto de 2.05%.', prio: 'ALTA' },
              { paso: 'Ad Scheduling', det: 'Configurar programación horaria en Meta Ads para concentrar el 80% del gasto en las 3 ventanas óptimas.', prio: 'ALTA' },
              { paso: 'Optimizar CTA', det: 'Añadir un llamado de acción más directo al final del creativo (los últimos 3s) para subir el CTR del link.', prio: 'MEDIA' },
              { paso: 'A/B Testing Creativo', det: 'Lanzar un test comparando el gancho científico contra gancho estético/anime en Filipinas.', prio: 'MEDIA' }
            ].map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-cream/30 rounded-xl p-3 border border-gray-100">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.prio === 'ALTA' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                  {p.prio}
                </span>
                <div>
                  <h4 className="font-bold text-xs text-dark-brown">{p.paso}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.det}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────
export default function PautaPagadaTab({ period, allPeriods }) {
  const CURRENCIES = ['USD', 'EUR', 'MXN', 'COP', 'ARS'];

  const [budget, setBudget] = useState('150');
  const [currency, setCurrency] = useState('USD');
  const [data, setData] = useState(() => {
    if (period.isFounding) return FOUNDING_PAUTA_PAGADA;
    try {
      const cached = localStorage.getItem(`cv_pauta_pagada_${period.id}`);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);
  const [viewMode, setViewMode] = useState(period.isFounding ? 'resultados' : 'plan');

  const handleGenerate = async () => {
    const amt = parseFloat(budget);
    if (!amt || amt <= 0) { setError('Ingresa un presupuesto válido mayor a 0.'); return; }
    setLoading(true);
    setError('');
    const interval = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 2200);
    try {
      const result = await generatePautaPagada(allPeriods, amt, currency);
      localStorage.setItem(`cv_pauta_pagada_${period.id}`, JSON.stringify(result));
      setData(result);
    } catch (e) {
      setError(e.message === 'API_KEY_MISSING'
        ? 'Configura tu API Key en los ajustes para generar el plan de pauta.'
        : e.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* View Switcher for Founding Period */}
      {period.isFounding && (
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('resultados')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              viewMode === 'resultados'
                ? 'bg-dark-brown text-cream border-dark-brown shadow-sm'
                : 'bg-white text-dark-brown border-gray-200 hover:bg-cream'
            }`}
          >
            📊 Reporte de Ejecución (CP1)
          </button>
          <button
            onClick={() => setViewMode('plan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              viewMode === 'plan'
                ? 'bg-dark-brown text-cream border-dark-brown shadow-sm'
                : 'bg-white text-dark-brown border-gray-200 hover:bg-cream'
            }`}
          >
            📋 Plan de Pauta Propuesto
          </button>
        </div>
      )}

      {viewMode === 'resultados' ? (
        <PautaPagadaResultadosContent res={FOUNDING_PAUTA_PAGADA_RESULTADOS} />
      ) : (
        <>
          {/* Header + controls */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-sm text-dark-brown">💰 Plan de Pauta Pagada — 15 Días</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Estrategia de Instagram Ads basada en los posts ganadores reales del historial acumulado.
                  Incluye selección de contenido, calendario, segmentación, KPIs y proyecciones.
                </p>
                {period.isFounding && (
                  <p className="text-xs text-orange font-semibold mt-1">
                    📌 Plan pre-calculado con $150 USD · Puedes ingresar tu presupuesto y regenerar con IA.
                  </p>
                )}
              </div>
              {/* Budget input */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-orange transition-colors">
                  <span className="px-3 py-2.5 bg-cream text-gray-500 text-sm font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    placeholder="150"
                    className="w-24 px-2 py-2.5 text-sm font-mono font-bold text-dark-brown focus:outline-none"
                  />
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="px-2 py-2.5 bg-cream text-xs font-bold text-dark-brown focus:outline-none border-l border-gray-200"
                  >
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-orange/90 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {loading ? '...' : data ? 'Regenerar 🔄' : 'Generar Plan 🧠'}
                </button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="text-5xl animate-pulse mb-4">🧠</div>
              <p className="font-bold text-dark-brown text-base">{LOADING_MSGS[msgIdx]}</p>
              <p className="text-xs text-gray-400 mt-1">Analizando ${budget} {currency} con {allPeriods.flatMap(p=>p.posts||[]).length} posts históricos</p>
              <div className="w-64 mx-auto mt-5 bg-cream rounded-full h-2.5">
                <div className="bg-orange h-full rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-white rounded-2xl p-5">
              <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">{error}</div>
              <button onClick={handleGenerate} className="mt-3 text-xs font-bold text-orange hover:underline">
                Reintentar
              </button>
            </div>
          )}

          {/* Plan */}
          {data && !loading && <PautaPagadaContent data={data} />}

          {/* Empty state */}
          {!data && !loading && !error && (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
              <div className="text-5xl mb-4">💰</div>
              <p className="font-bold text-base text-dark-brown">Ingresa tu presupuesto y genera tu plan de pauta.</p>
              <p className="text-sm mt-2">Claude analizará los posts con mejor rendimiento orgánico y diseñará una estrategia completa de Instagram Ads para los próximos 15 días.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
