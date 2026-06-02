import { FOUNDING_BOT_REASONS } from '../../data/foundingAnalysis';

function Badge({ tipo }) {
  const cls = { Reel: 'badge-reel', Carrusel: 'badge-carousel', Imagen: 'badge-image' }[tipo] || '';
  return <span className={`badge ${cls}`}>{tipo}</span>;
}

export default function BottomPostsTab({ period }) {
  const botIds = period.summary?.bottomPosts || [];
  const bots = botIds.map(id => period.posts?.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4">
        <h3 className="font-bold text-sm text-dark-brown">⚠️ Bottom {bots.length} Posts del Período</h3>
        <p className="text-xs text-gray-500 mt-1">Los posts con menor número de visualizaciones — diagnóstico para no repetir</p>
      </div>

      {bots.map((p, i) => {
        const reasons = period.isFounding ? FOUNDING_BOT_REASONS[p.id] : null;
        return (
          <div key={p.id} className="bg-white rounded-2xl p-5 border-l-4 border-red-alert animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono font-extrabold text-2xl text-red-500">#{i + 1}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-dark-brown">Post #{p.id}</span>
                    <Badge tipo={p.tipo} />
                    <span className="text-xs text-gray-400">{p.fecha}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                {[
                  { v: p.views,    l: 'VIEWS',   c: 'text-red-500' },
                  { v: `${p.er}%`, l: 'ER',      c: 'text-dark-brown' },
                  { v: p.alcance,  l: 'ALCANCE',  c: 'text-brown-mid' },
                ].map(m => (
                  <div key={m.l} className="text-center">
                    <div className={`font-mono font-extrabold text-xl ${m.c}`}>{m.v}</div>
                    <div className="text-[10px] text-gray-400">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-3 mb-3 text-xs text-gray-600 italic">
              "{p.desc}"
            </div>

            {reasons ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-700">
                  <strong className="text-red-500">⚠️ Por qué no funcionó:</strong> {reasons.why}
                </p>
                <p className="text-xs text-gray-700">
                  <strong className="text-orange">🚫 Evitar repetir:</strong> {reasons.avoid}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {[
                  ['Views', p.views, p.views < 50 ? '🔴 Muy bajo' : '🟡 Bajo'],
                  ['ER', `${p.er}%`, p.er < 10 ? '🔴 Bajo' : '🟡 Mejorable'],
                  ['Alcance', p.alcance, p.alcance < 30 ? '🔴 Limitado' : '🟡 Normal'],
                ].map(([l, v, s]) => (
                  <div key={l} className="bg-red-50 rounded-lg p-2">
                    <span className="text-gray-500">{l}: </span>
                    <strong className="text-dark-brown">{v}</strong>
                    <span className="ml-1 text-gray-400">{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
