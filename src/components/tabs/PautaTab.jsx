import { useState } from 'react';
import { FOUNDING_PAUTA } from '../../data/foundingAnalysis';
import { generatePauta } from '../../utils/claudeApi';
import { nextMonday } from '../../utils/calculations';

const LOADING_MSGS = [
  'Analizando top performers históricos... 🧠',
  'Calculando objetivos alcanzables...',
  'Diseñando estrategia de 3 fases...',
  'Generando hooks recomendados...',
  'Construyendo calendario semanal... 📅',
  'Finalizando plan de pauta... ✨',
];

const LINE_COLORS = { TAPES: 'bg-orange/20 text-orange', ZEN: 'bg-teal/20 text-teal', PLAY: 'bg-gold/20 text-gold' };
const OBJ_COLORS = { Alcance: 'bg-orange/20 text-orange', ER: 'bg-teal/20 text-teal', Guardados: 'bg-gold/20 text-gold', Shares: 'bg-brown-mid/20 text-brown-mid', Seguidores: 'bg-green-100 text-green-700', Conversión: 'bg-purple-100 text-purple-700' };
const HOOK_TYPE_COLORS = { Científico: 'bg-teal/20 text-teal', Motivacional: 'bg-orange/20 text-orange', Situacional: 'bg-gold/20 text-gold', Emocional: 'bg-pink-100 text-pink-600', POV: 'bg-gray-100 text-gray-600' };

function ObjetivosCard({ obj }) {
  if (!obj) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">🎯 Objetivos del Período</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Views Objetivo', value: obj.viewsObjetivo, sub: `Actual: ${obj.viewsActual}`, cls: 'border-orange' },
          { label: 'Crecimiento', value: obj.crecimientoEsperado, sub: 'vs período anterior', cls: 'border-teal' },
          { label: 'Seguidores', value: obj.seguidoresObjetivo, sub: 'meta del período', cls: 'border-gold' },
          { label: 'ER Objetivo', value: `${obj.erObjetivo}%`, sub: 'tasa de engagement', cls: 'border-brown-mid' },
        ].map(k => (
          <div key={k.label} className={`bg-cream rounded-xl p-3 border-l-4 ${k.cls}`}>
            <div className="font-mono font-extrabold text-xl text-dark-brown">{k.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mt-0.5">{k.label}</div>
            <div className="text-[10px] text-gray-400">{k.sub}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 bg-cream rounded-xl p-3">{obj.justificacion}</p>
    </div>
  );
}

function EstrategiaCard({ estrategia }) {
  if (!estrategia) return null;
  const phases = [
    { key: 'fase1', color: 'border-orange', label: 'Fase 1', icon: '🔥' },
    { key: 'fase2', color: 'border-teal',   label: 'Fase 2', icon: '📈' },
    { key: 'fase3', color: 'border-gold',   label: 'Fase 3', icon: '🏆' },
  ];
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">⚡ Estrategia de 3 Fases</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {phases.map(({ key, color, label, icon }) => {
          const f = estrategia[key];
          if (!f) return null;
          return (
            <div key={key} className={`border-l-4 ${color} bg-cream rounded-xl p-4`}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{icon} {label} · Días {f.dias}</div>
              <div className="font-bold text-sm text-dark-brown mb-2">{f.enfoque}</div>
              <div className="text-xs text-gray-600 mb-1"><strong>Contenido:</strong> {f.tipoContenido}</div>
              <div className="text-xs text-orange font-semibold">Meta: {f.metaPrincipal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarWeek({ week }) {
  const publishDays = week.posts?.filter(p => p.publicar) || [];
  return (
    <div className="bg-white rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-sm text-dark-brown">Semana {week.semana} · {week.fechaInicio} – {week.fechaFin}</h4>
          <p className="text-xs text-gray-500 mt-0.5">Tema: <strong>{week.tema}</strong></p>
        </div>
        <span className="text-xs bg-cream text-dark-brown font-bold px-3 py-1 rounded-full">
          {publishDays.length} posts
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {week.posts?.map((post, i) => (
          <div
            key={i}
            className={`rounded-xl p-3 border-2 ${post.publicar ? 'border-cream bg-cream' : 'border-dashed border-gray-200 opacity-50'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-dark-brown">{post.dia}</span>
              <span className="text-[10px] text-gray-400">{post.fecha}</span>
            </div>
            {post.publicar ? (
              <>
                <div className="flex gap-1.5 flex-wrap mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LINE_COLORS[post.linea] || 'bg-gray-100 text-gray-600'}`}>{post.linea}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${OBJ_COLORS[post.objetivo] || 'bg-gray-100 text-gray-600'}`}>{post.objetivo}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dark-brown/10 text-dark-brown">{post.formato}</span>
                </div>
                {post.hookRecomendado && (
                  <p className="text-xs text-gray-700 italic mb-1">"{post.hookRecomendado}"</p>
                )}
                <div className="flex items-center gap-1 text-[10px] text-orange font-semibold">
                  🕐 {post.horaOptima}
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-400">DESCANSO</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HooksCard({ hooks }) {
  if (!hooks?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">🎣 Hooks Recomendados para Este Período</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {hooks.map((h, i) => (
          <div key={i} className="bg-cream rounded-xl p-3">
            <div className="flex gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${HOOK_TYPE_COLORS[h.tipo] || 'bg-gray-100 text-gray-500'}`}>{h.tipo}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LINE_COLORS[h.lineaRecomendada] || 'bg-gray-100 text-gray-500'}`}>{h.lineaRecomendada}</span>
            </div>
            <p className="text-xs text-dark-brown font-medium italic">"{h.hook}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPIsControlCard({ kpis }) {
  if (!kpis?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">📊 KPIs de Control Semanal</h3>
      <div className="overflow-x-auto">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Semana</th>
              <th>Meta Views/Post</th>
              <th>Meta ER %</th>
              <th>Acción si no cumple</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map((k, i) => (
              <tr key={i}>
                <td className="font-bold">S{k.semana}</td>
                <td className="font-mono text-orange font-bold">{k.metaViews}</td>
                <td className="font-mono font-bold">{k.metaER}%</td>
                <td className="text-xs text-gray-600">{k.accionSiNoCumple}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AudienceCard({ strat }) {
  if (!strat) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">👥 Estrategia de Crecimiento de Audiencia</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-cream rounded-xl p-4">
          <div className="font-mono font-extrabold text-3xl text-orange text-center">{strat.metaSeguidor}</div>
          <div className="text-xs text-center text-gray-500 mt-1">Meta de seguidores</div>
        </div>
        <div className="sm:col-span-2 space-y-2">
          {strat.acciones?.map((a, i) => (
            <div key={i} className="flex gap-2 text-xs text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0" />
              {a}
            </div>
          ))}
          {strat.ugcActivation && (
            <div className="bg-orange/10 rounded-lg p-2 text-xs text-orange font-medium mt-2">
              🎬 UGC: {strat.ugcActivation}
            </div>
          )}
          {strat.hashtagStrategy && (
            <div className="text-xs text-gray-600 bg-cream rounded-lg p-2 mt-1">
              # {strat.hashtagStrategy}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WarningsCard({ warnings }) {
  if (!warnings?.length) return null;
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="font-bold text-sm text-dark-brown mb-4">🚨 Advertencias y Notas de Riesgo</h3>
      <div className="space-y-2">
        {warnings.map((w, i) => (
          <div key={i} className="flex gap-2 text-xs text-gray-700 bg-red-50 rounded-lg p-3">
            <span>⚠️</span><span>{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PautaContent({ data }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <ObjetivosCard obj={data.objetivos} />
      <EstrategiaCard estrategia={data.estrategia} />

      {data.semanas?.length > 0 && (
        <div>
          <div className="bg-white rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-sm text-dark-brown">📅 Calendario Semanal de Contenido</h3>
            <p className="text-xs text-gray-500 mt-1">{data.periodoInicio} – {data.periodoFin}</p>
          </div>
          {data.semanas.map(week => <CalendarWeek key={week.semana} week={week} />)}
        </div>
      )}

      <HooksCard hooks={data.hooksRecomendados} />
      <KPIsControlCard kpis={data.kpisControl} />
      <AudienceCard strat={data.estrategiaCrecimientoAudiencia} />
      <WarningsCard warnings={data.advertencias} />
    </div>
  );
}

export default function PautaTab({ period, historicalPeriods, allPeriods }) {
  const [data, setData] = useState(() => {
    if (period.isFounding) return FOUNDING_PAUTA;
    try {
      const cached = localStorage.getItem(`cv_pauta_${period.id}`);
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
      const startDate = nextMonday(new Date(period.importedAt));
      const result = await generatePauta(period, historicalPeriods, startDate);
      localStorage.setItem(`cv_pauta_${period.id}`, JSON.stringify(result));
      setData(result);
    } catch (e) {
      setError(e.message === 'API_KEY_MISSING' ? 'Configura tu API Key en los ajustes para generar el plan.' : e.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-dark-brown">🚀 Plan de Pauta 30 Días</h3>
          {period.isFounding && <p className="text-xs text-orange mt-0.5">📌 Plan pre-calculado · Inicia Lunes 18 Mayo, 2026</p>}
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
            <div className="bg-orange h-2 rounded-full animate-pulse" style={{ width: '65%' }} />
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white rounded-2xl p-5">
          <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">{error}</div>
          <button onClick={fetch} className="mt-3 text-xs font-bold text-orange hover:underline">Reintentar</button>
        </div>
      )}

      {data && !loading && <PautaContent data={data} />}

      {!data && !loading && !error && (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          <div className="text-4xl mb-3">🚀</div>
          <p className="font-semibold">Haz click en "Generar con IA" para obtener un plan de pauta de 30 días basado en tus datos.</p>
        </div>
      )}
    </div>
  );
}
