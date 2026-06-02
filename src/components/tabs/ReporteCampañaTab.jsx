// ReporteCampañaTab.jsx
// Reporte completo de la Campaña CP1 — Meta Ads (May 3 – Jun 1, 2026)
// Se integra al sistema de tabs de MonthReport.jsx

const CP1_DATA = {
  periodo: { inicio: '3 de mayo, 2026', fin: '1 de junio, 2026' },
  conjuntos: [
    {
      id: 'f1-global',
      fase: 1,
      nombre: 'Fase 1 — Fría Global',
      post: '#48',
      inicio: '15 may',
      fin: '18 may',
      dias: 3,
      activo: true,
      alcance: 760992,
      impresiones: 828330,
      thruplay: 114213,
      costoPorThruplay: 1.23,
      cpm: 168.98,
      frecuencia: 1.09,
      ctrEnlace: 0.039,
      clicsEnlace: 319,
      clicsTotales: 914,
      cpcEnlace: 438.77,
      cpcTodos: 153.14,
      gastado: 139968,
      presupuestoDia: 40000,
    },
    {
      id: 'f1-lookalike',
      fase: 1,
      nombre: 'Fase 1 — Lookalike',
      post: '#40',
      inicio: '15 may',
      fin: '20 may',
      dias: 5,
      activo: false,
      alcance: 0,
      impresiones: 0,
      thruplay: 0,
      costoPorThruplay: null,
      cpm: 0,
      frecuencia: 0,
      ctrEnlace: null,
      clicsEnlace: 0,
      clicsTotales: 0,
      cpcEnlace: 0,
      cpcTodos: 0,
      gastado: 0,
      presupuestoDia: 16000,
    },
    {
      id: 'f2-retargeting2',
      fase: 2,
      nombre: 'Fase 2 — Retargeting',
      post: '#2',
      inicio: '16 may',
      fin: '20 may',
      dias: 4,
      activo: true,
      alcance: 228461,
      impresiones: 531360,
      thruplay: 65608,
      costoPorThruplay: 2.19,
      cpm: 270.94,
      frecuencia: 2.33,
      ctrEnlace: 0.065,
      clicsEnlace: 345,
      clicsTotales: 911,
      cpcEnlace: 417.30,
      cpcTodos: 158.03,
      gastado: 143967,
      presupuestoDia: 32000,
    },
    {
      id: 'f2-retargeting46',
      fase: 2,
      nombre: 'Fase 2 — Retargeting',
      post: '#46',
      inicio: '18 may',
      fin: '22 may',
      dias: 4,
      activo: false,
      alcance: 0,
      impresiones: 0,
      thruplay: 0,
      costoPorThruplay: null,
      cpm: 0,
      frecuencia: 0,
      ctrEnlace: null,
      clicsEnlace: 0,
      clicsTotales: 0,
      cpcEnlace: 0,
      cpcTodos: 0,
      gastado: 0,
      presupuestoDia: 32000,
    },
    {
      id: 'f3-conversion47',
      fase: 3,
      nombre: 'Fase 3 — Conversión',
      post: '#47',
      inicio: '23 may',
      fin: '25 may',
      dias: 2,
      activo: true,
      alcance: 267370,
      impresiones: 313528,
      thruplay: 41607,
      costoPorThruplay: 1.20,
      cpm: 159.36,
      frecuencia: 1.17,
      ctrEnlace: 0.027,
      clicsEnlace: 84,
      clicsTotales: 213,
      cpcEnlace: 594.82,
      cpcTodos: 234.58,
      gastado: 49965,
      presupuestoDia: 20000,
    },
  ],
  totales: {
    alcance: 989453,
    impresiones: 1673218,
    thruplay: 221428,
    gastado: 333900,
    clics: 2038,
    clicsEnlace: 748,
    costoProm: 1.51,
  },
  hallazgos: [
    {
      tipo: 'exito',
      titulo: 'Fase 3 tiene el mejor CPA',
      texto: 'Post #47 logró $1.20 COP por thruplay — el más eficiente de toda la campaña con solo 2 días. Merece mayor presupuesto en CP2.',
    },
    {
      tipo: 'exito',
      titulo: 'Audiencia fría funcionó muy bien',
      texto: 'Fase 1 alcanzó 760,992 personas únicas con frecuencia de 1.09x. Alta capacidad de descubrimiento.',
    },
    {
      tipo: 'atencion',
      titulo: 'Retargeting más caro de lo esperado',
      texto: 'Fase 2 tuvo CPM 60% más alto ($270 vs $169 en F1). Frecuencia de 2.33x sugiere saturación. Ampliar segmento.',
    },
    {
      tipo: 'atencion',
      titulo: 'CTR de enlace bajo en F3',
      texto: 'Solo 0.027% de CTR en conversión. El video engancha pero falta CTA fuerte. Agregar overlay o botón en CP2.',
    },
    {
      tipo: 'alerta',
      titulo: '2 conjuntos no entregaron',
      texto: 'Lookalike #40 y Retargeting #46 completaron con $0. Revisar audiencias y aprobación antes de CP2.',
    },
    {
      tipo: 'neutral',
      titulo: '~$192K COP sin ejecutar',
      texto: 'Solo el 63.5% del presupuesto potencial fue ejecutado. Con todos los conjuntos activos el alcance podría duplicarse.',
    },
  ],
};

const FASE_STYLE = {
  1: { badge: 'bg-orange/15 text-orange border border-orange/30', bar: 'bg-orange', text: 'text-orange', border: 'border-orange' },
  2: { badge: 'bg-teal/15 text-teal border border-teal/30',       bar: 'bg-teal',   text: 'text-teal',   border: 'border-teal'   },
  3: { badge: 'bg-gold/15 text-gold border border-gold/30',       bar: 'bg-gold',   text: 'text-gold',   border: 'border-gold'   },
};

const HALLAZGO_STYLE = {
  exito:    { wrap: 'bg-teal/8 border-l-4 border-teal',      icon: '✅', title: 'text-teal' },
  atencion: { wrap: 'bg-gold/8 border-l-4 border-gold',      icon: '⚠️', title: 'text-gold' },
  alerta:   { wrap: 'bg-red-50 border-l-4 border-red-400',   icon: '🚫', title: 'text-red-500' },
  neutral:  { wrap: 'bg-cream border-l-4 border-brown-mid',  icon: '💡', title: 'text-brown-mid' },
};

function Stat({ label, value, sub, colorClass = '' }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</div>
      <div className={`font-mono font-extrabold text-2xl leading-none ${colorClass || 'text-dark-brown'}`}>{value}</div>
      {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function PhaseTag({ fase }) {
  const s = FASE_STYLE[fase] || FASE_STYLE[1];
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
      F{fase}
    </span>
  );
}

function BarRow({ label, value, max, colorClass, display }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="grid items-center gap-3" style={{ gridTemplateColumns: '130px 1fr 80px' }}>
      <div className="text-xs text-dark-brown font-medium truncate">{label}</div>
      <div className="bg-cream rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="font-mono text-xs text-dark-brown text-right">{display}</div>
    </div>
  );
}

// ── Global KPIs ───────────────────────────────────────────────────────────────
function GlobalKPIs({ totales }) {
  const kpis = [
    { label: 'Alcance total',      value: '989K',    sub: 'personas únicas',           color: 'text-orange', border: 'border-l-4 border-orange' },
    { label: 'Thruplays totales',  value: '221K',    sub: 'reproducciones completas',  color: 'text-teal',   border: 'border-l-4 border-teal'   },
    { label: 'Inversión total',    value: '$334K',   sub: 'COP ejecutados',            color: 'text-gold',   border: 'border-l-4 border-gold'   },
    { label: 'Impresiones',        value: '1.67M',   sub: '3 conjuntos activos',       color: 'text-dark-brown', border: 'border-l-4 border-brown-mid' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map(k => (
        <div key={k.label} className={`bg-white rounded-2xl p-4 ${k.border}`}>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{k.label}</div>
          <div className={`font-mono font-extrabold text-3xl ${k.color}`}>{k.value}</div>
          <div className="text-[10px] text-gray-400 mt-1">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ── Funnel ────────────────────────────────────────────────────────────────────
function Funnel({ conjuntos }) {
  const activos = conjuntos.filter(c => c.activo);
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">🎯 Funnel de la Campaña CP1</h3>
      <div className="space-y-2">
        {activos.map((c, i) => {
          const s = FASE_STYLE[c.fase];
          const pct = Math.round((c.alcance / activos[0].alcance) * 100);
          return (
            <div key={c.id}>
              <div
                className={`rounded-xl p-4 flex items-center justify-between border ${s.border} bg-white`}
                style={{ marginLeft: `${i * 24}px`, marginRight: `${i * 12}px` }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <PhaseTag fase={c.fase} />
                    <span className="text-xs font-semibold text-dark-brown">{c.nombre} · Post {c.post}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">{c.inicio} – {c.fin} · {c.dias} días</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-extrabold text-xl ${s.text}`}>
                    {c.alcance.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-400">alcance</div>
                </div>
              </div>
              {i < activos.length - 1 && (
                <div className="text-gray-300 text-center text-xs py-1" style={{ marginLeft: `${(i + 1) * 24}px` }}>↓</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Inactive */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sin entrega</div>
        <div className="space-y-2">
          {conjuntos.filter(c => !c.activo).map(c => (
            <div key={c.id} className="rounded-lg bg-cream p-3 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-0.5" />
                <span className="text-xs text-dark-brown">{c.nombre} · Post {c.post}</span>
                <span className="text-[10px] text-gray-400">{c.inicio} – {c.fin}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 font-mono">$0 gastado</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Spend Table ───────────────────────────────────────────────────────────────
function SpendTable({ conjuntos }) {
  const total = conjuntos.reduce((s, c) => s + c.gastado, 0);
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-sm text-dark-brown">💰 Distribución de Inversión</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Fase</th>
              <th>Conjunto</th>
              <th>Presup/día</th>
              <th>Gastado (COP)</th>
              <th>% del total</th>
            </tr>
          </thead>
          <tbody>
            {conjuntos.map(c => {
              const pct = total > 0 ? ((c.gastado / total) * 100).toFixed(1) : 0;
              const s = FASE_STYLE[c.fase];
              return (
                <tr key={c.id} className={!c.activo ? 'opacity-50' : ''}>
                  <td><PhaseTag fase={c.fase} /></td>
                  <td>
                    <div className="font-semibold text-xs">{c.nombre}</div>
                    <div className="text-[10px] text-gray-400">Post {c.post}</div>
                  </td>
                  <td className="font-mono">${c.presupuestoDia.toLocaleString()}</td>
                  <td>
                    <span className={`font-mono font-bold ${c.gastado > 0 ? 'text-dark-brown' : 'text-gray-400'}`}>
                      ${c.gastado.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    {c.gastado > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-cream rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-mono">{pct}%</span>
                      </div>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-dark-brown text-cream">
              <td colSpan={3}><strong>TOTAL CP1</strong></td>
              <td><strong className="font-mono text-orange text-base">${total.toLocaleString()}</strong></td>
              <td><span className="text-cream/50 text-xs">63.5% ejecutado</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Per-Conjunto Cards ────────────────────────────────────────────────────────
function ConjuntoCard({ c }) {
  const s = FASE_STYLE[c.fase];
  if (!c.activo) return null;
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border-t-4 ${s.border}`}>
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <PhaseTag fase={c.fase} />
        <div>
          <div className="font-bold text-xs text-dark-brown">{c.nombre} · Post {c.post}</div>
          <div className="text-[10px] text-gray-400">{c.inicio} – {c.fin} · {c.dias} días</div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Thruplay</div>
          <div className={`font-mono font-extrabold text-2xl ${s.text}`}>{c.thruplay.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Alcance</div>
          <div className="font-mono font-extrabold text-2xl text-dark-brown">{c.alcance.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Impresiones</div>
          <div className="font-mono font-bold text-lg text-dark-brown">{c.impresiones.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Costo/Thruplay</div>
          <div className={`font-mono font-bold text-lg ${c.costoPorThruplay <= 1.25 ? 'text-teal' : 'text-dark-brown'}`}>
            ${c.costoPorThruplay} COP
            {c.costoPorThruplay <= 1.25 && <span className="ml-1 text-xs">⭐</span>}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CPM</div>
          <div className="font-mono font-bold text-lg text-dark-brown">${c.cpm} COP</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Frecuencia</div>
          <div className={`font-mono font-bold text-lg ${c.frecuencia > 2 ? 'text-orange' : 'text-dark-brown'}`}>
            {c.frecuencia}x
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Gastado</div>
          <div className="font-mono font-bold text-lg text-dark-brown">${c.gastado.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Clics Enlace</div>
          <div className="font-mono font-bold text-lg text-dark-brown">{c.clicsEnlace.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Clics Totales</div>
          <div className="font-mono font-bold text-lg text-dark-brown">{c.clicsTotales.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CTR Enlace</div>
          <div className="font-mono font-bold text-lg text-dark-brown">{c.ctrEnlace}%</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CPC Enlace</div>
          <div className="font-mono font-bold text-lg text-dark-brown">${c.cpcEnlace} COP</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">CPC Todos</div>
          <div className="font-mono font-bold text-lg text-dark-brown">${c.cpcTodos} COP</div>
        </div>
      </div>
    </div>
  );
}

// ── Charts ────────────────────────────────────────────────────────────────────
function Charts({ conjuntos }) {
  const activos = conjuntos.filter(c => c.activo);
  const maxThru = Math.max(...activos.map(c => c.thruplay));
  const maxAlc = Math.max(...activos.map(c => c.alcance));

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-5">
        <h3 className="font-bold text-sm text-dark-brown mb-4">📊 Thruplays por fase</h3>
        <div className="space-y-4">
          {conjuntos.map(c => {
            const s = FASE_STYLE[c.fase];
            return (
              <BarRow
                key={c.id}
                label={`${c.nombre.split('—')[1]?.trim()} ${c.post}`}
                value={c.thruplay}
                max={maxThru}
                colorClass={c.activo ? s.bar : 'bg-gray-200'}
                display={c.thruplay > 0 ? c.thruplay.toLocaleString() : '—'}
              />
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5">
        <h3 className="font-bold text-sm text-dark-brown mb-4">🌍 Alcance por fase</h3>
        <div className="space-y-4">
          {conjuntos.map(c => {
            const s = FASE_STYLE[c.fase];
            return (
              <BarRow
                key={c.id}
                label={`${c.nombre.split('—')[1]?.trim()} ${c.post}`}
                value={c.alcance}
                max={maxAlc}
                colorClass={c.activo ? s.bar : 'bg-gray-200'}
                display={c.alcance > 0 ? (c.alcance > 1000 ? `${(c.alcance / 1000).toFixed(0)}K` : c.alcance) : '—'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Insights ──────────────────────────────────────────────────────────────────
function Insights({ hallazgos }) {
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">💡 Hallazgos y Recomendaciones para CP2</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {hallazgos.map((h, i) => {
          const s = HALLAZGO_STYLE[h.tipo];
          return (
            <div key={i} className={`rounded-xl p-4 ${s.wrap}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{s.icon}</span>
                <span className={`font-bold text-xs ${s.title}`}>{h.titulo}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{h.texto}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Summary Banner ────────────────────────────────────────────────────────────
function SummaryBanner({ totales }) {
  return (
    <div className="bg-dark-brown text-cream rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-cream/40 mb-2">Conclusión CP1</div>
          <h3 className="font-serif font-extrabold text-xl leading-tight mb-3">
            Campaña exitosa de <span className="text-orange">descubrimiento masivo</span>{' '}
            con oportunidades claras de optimización
          </h3>
          <p className="text-sm text-cream/65 leading-relaxed">
            Alcanzamos casi <strong className="text-cream">1 millón de personas únicas</strong> con $334K COP,
            generando más de <strong className="text-cream">221K reproducciones completas</strong> de video.
            El objetivo de awareness/thruplay fue cumplido. CP2 debe corregir los conjuntos inactivos,
            escalar Fase 3 y agregar CTAs hacia Spotify/YouTube.
          </p>
        </div>
        <div className="flex sm:flex-col gap-3 sm:min-w-[160px]">
          <div className="flex-1 bg-cream/8 rounded-xl p-4 text-center">
            <div className="text-[10px] text-cream/40 font-bold uppercase tracking-widest mb-1">Costo prom.</div>
            <div className="font-mono font-extrabold text-3xl text-orange">$1.51</div>
            <div className="text-[10px] text-cream/40">COP / thruplay</div>
          </div>
          <div className="flex-1 bg-cream/8 rounded-xl p-4 text-center">
            <div className="text-[10px] text-cream/40 font-bold uppercase tracking-widest mb-1">Tasa video</div>
            <div className="font-mono font-extrabold text-3xl text-teal">13.2%</div>
            <div className="text-[10px] text-cream/40">de impresiones</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ReporteCampañaTab() {
  const { conjuntos, totales, hallazgos, periodo } = CP1_DATA;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">META ADS</span>
            <span className="bg-dark-brown text-cream text-[10px] font-bold px-2 py-0.5 rounded-full">CP1 · COMPLETADA</span>
          </div>
          <h2 className="font-serif font-extrabold text-lg text-dark-brown">Reporte de Pauta Pagada — Campaña CP1</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {periodo.inicio} → {periodo.fin} · 5 conjuntos · 3 activos · @chillvibeglobal
          </p>
        </div>
      </div>

      {/* Global KPIs */}
      <GlobalKPIs totales={totales} />

      {/* Funnel + Spend */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Funnel conjuntos={conjuntos} />
        <SpendTable conjuntos={conjuntos} />
      </div>

      {/* Per-conjunto cards */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
          Métricas detalladas por conjunto activo
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {conjuntos.filter(c => c.activo).map(c => (
            <ConjuntoCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <Charts conjuntos={conjuntos} />

      {/* Insights */}
      <Insights hallazgos={hallazgos} />

      {/* Summary */}
      <SummaryBanner totales={totales} />
    </div>
  );
}
