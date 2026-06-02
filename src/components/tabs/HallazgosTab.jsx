import { useState } from 'react';
import { FOUNDING_HALLAZGOS, ENGLISH_MARKETS, TIMING_ANALYSIS } from '../../data/foundingAnalysis';
import { generateHallazgos } from '../../utils/claudeApi';

const LOADING_MSGS = [
  'Analizando 48 posts... 🧠',
  'Clasificando tipos de hook...',
  'Calculando benchmarks vs industria...',
  'Identificando tendencias críticas...',
  'Generando recomendaciones accionables... ✨',
];

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InsightRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-xs font-bold ${valueClass}`}>{value}</span>
    </div>
  );
}

// ── Markets + Timing helpers ─────────────────────────────────────────────────
function Tag({ text, color = 'default' }) {
  const cls = {
    default: 'bg-cream text-dark-brown',
    teal:    'bg-teal/10 text-teal',
    gold:    'bg-gold/10 text-gold',
  }[color];
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${cls}`}>{text}</span>;
}

const POTENCIAL_STYLE = {
  'MUY ALTO':   'bg-green-100 text-green-700',
  'ALTO':       'bg-orange/20 text-orange',
  'MEDIO-ALTO': 'bg-yellow-100 text-yellow-700',
  'MEDIO':      'bg-gray-100 text-gray-600',
};

function ScoreStars({ score }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`text-[10px] ${n <= score ? 'text-orange' : 'text-gray-200'}`}>★</span>
      ))}
    </div>
  );
}

function WindowQualityBadge({ quality }) {
  const cls = quality?.includes('Máximo') ? 'text-green-700 bg-green-50'
    : quality?.includes('Alto') ? 'text-orange bg-orange/10'
    : 'text-gray-500 bg-gray-100';
  return <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cls}`}>{quality}</span>;
}

function MarketsSection() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-sm text-dark-brown">🌍 Mercados Objetivo — Hablantes de Inglés</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Mercados prioritarios para la pauta basados en datos orgánicos reales y afinidad cultural con el contenido lofi
        </p>
      </div>
      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ENGLISH_MARKETS.map((m, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${expanded === i ? 'border-orange shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="p-3 flex items-start gap-3">
              <span className="text-2xl shrink-0">{m.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-dark-brown">{m.region}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${POTENCIAL_STYLE[m.potencial] || 'bg-gray-100 text-gray-600'}`}>
                    {m.potencial}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">{m.timezone}</div>
                <ScoreStars score={m.score} />
              </div>
              <span className="text-gray-300 text-sm shrink-0">{expanded === i ? '▲' : '▼'}</span>
            </div>
            <div className="bg-cream/60 px-3 pb-2 grid grid-cols-3 gap-1 text-center">
              {[
                { label: '12:00 GMT-5', local: m.at12GMT5, q: m.q12 },
                { label: '18:00 GMT-5', local: m.at18GMT5, q: m.q18 },
                { label: '07:00 GMT-5', local: m.at07GMT5, q: m.q07 },
              ].map(w => (
                <div key={w.label} className="bg-white rounded-lg p-1.5">
                  <div className="text-[8px] text-gray-400 font-mono">{w.label}</div>
                  <div className="text-[9px] font-bold text-dark-brown leading-tight">{w.local}</div>
                  <WindowQualityBadge quality={w.q} />
                </div>
              ))}
            </div>
            {expanded === i && (
              <div className="px-3 pb-3 space-y-2 animate-fade-in">
                <p className="text-[10px] text-gray-600 leading-relaxed mt-2">{m.relevancia}</p>
                {m.topInterests && (
                  <div>
                    <div className="text-[10px] font-bold text-dark-brown mb-1">Intereses clave:</div>
                    <div className="flex flex-wrap gap-1">
                      {m.topInterests.map((t, j) => <Tag key={j} text={t} />)}
                    </div>
                  </div>
                )}
                {m.adNotes && (
                  <div className="bg-orange/5 border border-orange/20 rounded-lg p-2 text-[10px] text-orange leading-relaxed">
                    💡 {m.adNotes}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimingSection() {
  const ta = TIMING_ANALYSIS;
  const WINDOW_STYLES = [
    { border: 'border-orange', label_bg: 'bg-orange text-white' },
    { border: 'border-teal',   label_bg: 'bg-teal text-white'   },
    { border: 'border-gold',   label_bg: 'bg-gold text-white'   },
  ];
  return (
    <div className="bg-white rounded-2xl p-5 space-y-5">
      <div>
        <h3 className="font-bold text-sm text-dark-brown">⏰ Análisis de Timing — Mejor Hora para Activar Pauta</h3>
        <p className="text-xs text-gray-500 mt-0.5">{ta.targetNote}</p>
      </div>
      <div className="bg-dark-brown text-cream rounded-xl p-4">
        <div className="font-bold text-xs text-orange mb-2">📊 Evidencia de los datos orgánicos</div>
        <p className="text-xs text-cream/80 leading-relaxed">{ta.dataInsight}</p>
      </div>
      <div className="space-y-4">
        {ta.optimalWindows.map((w, i) => {
          const st = WINDOW_STYLES[i];
          return (
            <div key={i} className={`border-l-4 ${st.border} rounded-r-xl overflow-hidden`}>
              <div className={`${st.label_bg} px-3 py-1.5 flex items-center gap-2`}>
                <span className="font-mono font-bold text-sm">{w.windowGMT5}</span>
                <span className="text-xs opacity-90">{w.label}</span>
              </div>
              <div className="bg-cream/40 px-3 py-2">
                <p className="text-[10px] text-gray-600 italic mb-2">📌 {w.evidence}</p>
                <div className="grid sm:grid-cols-2 gap-1">
                  {w.markets.map((mk, j) => (
                    <div key={j} className="flex items-center justify-between bg-white rounded-lg px-2 py-1 gap-2">
                      <span className="text-xs text-gray-700 flex-1">{mk.market}</span>
                      <span className="text-[10px] font-mono text-dark-brown shrink-0">{mk.local}</span>
                      <WindowQualityBadge quality={mk.quality} />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-teal font-semibold mt-2">→ {w.recommendation}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-orange text-white rounded-xl p-4">
        <div className="font-bold text-sm mb-1">🚀 Recomendación: Inicia la campaña el {ta.campaignStart.bestDayGMT5} a las {ta.campaignStart.bestTimeGMT5}</div>
        <p className="text-xs text-white/85 leading-relaxed mb-2">{ta.campaignStart.reason}</p>
        <p className="text-xs text-white/70 leading-relaxed">💡 {ta.campaignStart.schedulingTip}</p>
        <div className="mt-2 bg-black/20 rounded-lg px-3 py-1.5 text-[10px] text-white/80">
          ⚠️ {ta.campaignStart.avoidNote}
        </div>
      </div>
    </div>
  );
}

function HallazgosContent({ data }) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Benchmarks */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Section title="📊 Benchmarks del Período">
          <InsightRow label="ER Promedio" value={`${data.benchmarks?.erPromedio}%`} valueClass="text-green-ok" />
          <InsightRow label="vs Industria" value={data.benchmarks?.erVsIndustria} />
          <InsightRow label="Mejor día" value={`${data.benchmarks?.mejorDia?.dia} — ${data.benchmarks?.mejorDia?.avgViews} views avg`} valueClass="text-orange" />
          <InsightRow label="Peor día" value={`${data.benchmarks?.peorDia?.dia} — ${data.benchmarks?.peorDia?.avgViews} views avg`} valueClass="text-red-500" />
          <InsightRow label="Mejor horario" value={`${data.benchmarks?.mejorHora?.hora} — ${data.benchmarks?.mejorHora?.avgViews} views avg`} valueClass="text-orange" />
          <InsightRow label="Mejor formato ER" value={`${data.benchmarks?.mejorFormatoER?.formato} — ${data.benchmarks?.mejorFormatoER?.er}%`} valueClass="text-teal" />
          <InsightRow label="Mejor formato alcance" value={`${data.benchmarks?.mejorFormatoAlcance?.formato} — ${data.benchmarks?.mejorFormatoAlcance?.avgReach} avg`} />
        </Section>

        <Section title="🧠 Análisis por Tipo de Hook">
          {data.analisisHooks && (
            <>
              {[
                { k: 'Científicos/Datos', d: data.analisisHooks.cientifico,   cls: 'text-green-ok' },
                { k: 'Motivacionales',   d: data.analisisHooks.motivacional, cls: 'text-orange' },
                { k: 'Emocionales',      d: data.analisisHooks.emocional,    cls: 'text-gold' },
                { k: 'POV',              d: data.analisisHooks.pov,          cls: 'text-red-500' },
              ].filter(x => x.d).map(({ k, d, cls }) => (
                <InsightRow key={k} label={`${k} (${d.posts} posts)`} value={`${d.avgViews} views avg`} valueClass={cls} />
              ))}
              <div className="mt-3 bg-green-50 rounded-xl p-3 text-xs text-gray-700">
                ⚡ <strong>Conclusión:</strong> {data.analisisHooks.conclusion}
              </div>
            </>
          )}
        </Section>
      </div>

      {/* Trends */}
      <Section title="📉 Tendencias Críticas">
        <p className="text-xs text-gray-600 mb-4">{data.tendencias?.descripcion}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-red-500 mb-2">⚠️ Alertas Críticas</h4>
            {data.tendencias?.alertasCriticas?.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2 text-xs text-gray-700 bg-red-50 rounded-lg p-2">
                <span>🔴</span><span>{a}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-xs font-bold text-green-ok mb-2">✅ Tendencias Positivas</h4>
            {data.tendencias?.tendenciasPositivas?.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2 text-xs text-gray-700 bg-green-50 rounded-lg p-2">
                <span>🟢</span><span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Saves vs Shares */}
      <Section title="💾 Guardados vs. Shares: La Brecha">
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="font-mono font-extrabold text-3xl text-green-ok">{data.guardadosVsShares?.ratioActual?.toFixed(1)}</div>
            <div className="text-xs text-gray-500 mt-1">Ratio Guardados/Shares</div>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-600 mb-2">{data.guardadosVsShares?.interpretacion}</p>
            <div className="bg-yellow-50 rounded-xl p-3 text-xs text-gray-700">
              📌 <strong>Recomendación:</strong> {data.guardadosVsShares?.recomendacion}
            </div>
          </div>
        </div>
      </Section>

      {/* What to repeat / avoid */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Section title="✅ Qué Repetir (Fórmulas Ganadoras)">
          <ul className="space-y-2">
            {data.queRepetir?.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-ok mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="❌ Qué Evitar (Patrones Perdedores)">
          <ul className="space-y-2">
            {data.queEvitar?.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-700">
                <span className="w-2 h-2 rounded-full bg-red-alert mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Action plan */}
      <Section title="🎯 Plan de Acción Inmediata">
        <div className="space-y-3">
          {data.planAccionInmediata?.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${
                item.prioridad === 'ALTA' ? 'bg-red-100 text-red-600' :
                item.prioridad === 'MEDIA' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {item.prioridad}
              </span>
              <div>
                <p className="text-xs font-semibold text-dark-brown">{item.accion}</p>
                <p className="text-xs text-gray-500 mt-0.5">→ {item.impactoEsperado}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Markets + Timing */}
      <MarketsSection />
      <TimingSection />
    </div>
  );
}

export default function HallazgosTab({ period, historicalPeriods }) {
  const [data, setData] = useState(() => {
    if (period.isFounding) return FOUNDING_HALLAZGOS;
    try {
      const cached = localStorage.getItem(`cv_hallazgos_${period.id}`);
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);

  const fetch = async () => {
    setLoading(true);
    setError('');
    const interval = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 2000);
    try {
      const result = await generateHallazgos(period, historicalPeriods);
      localStorage.setItem(`cv_hallazgos_${period.id}`, JSON.stringify(result));
      setData(result);
    } catch (e) {
      setError(e.message === 'API_KEY_MISSING' ? 'Configura tu API Key en los ajustes para generar el análisis.' : e.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-dark-brown">💡 Hallazgos & Recomendaciones Estratégicas</h3>
          {period.isFounding && <p className="text-xs text-orange mt-0.5">📌 Análisis pre-calculado del período de lanzamiento</p>}
        </div>
        {!period.isFounding && (
          <button
            onClick={fetch}
            disabled={loading}
            className="text-xs font-bold bg-orange text-white px-4 py-2 rounded-xl hover:bg-orange/90 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : data ? 'Regenerar IA' : 'Generar con IA 🧠'}
          </button>
        )}
      </div>

      {loading && (
        <div className="bg-white rounded-2xl p-10 text-center">
          <div className="text-4xl animate-pulse mb-3">🧠</div>
          <p className="font-semibold text-dark-brown">{LOADING_MSGS[msgIdx]}</p>
          <div className="w-64 mx-auto mt-4 bg-cream rounded-full h-2">
            <div className="bg-orange h-2 rounded-full animate-pulse" style={{ width: '55%' }} />
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white rounded-2xl p-5">
          <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">{error}</div>
          <button onClick={fetch} className="mt-3 text-xs font-bold text-orange hover:underline">Reintentar</button>
        </div>
      )}

      {data && !loading && <HallazgosContent data={data} />}

      {!data && !loading && !error && (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          <div className="text-4xl mb-3">💡</div>
          <p className="font-semibold">Haz click en "Generar con IA" para obtener hallazgos y recomendaciones basados en tus datos.</p>
        </div>
      )}
    </div>
  );
}
