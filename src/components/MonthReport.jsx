import { useState } from 'react';
import KPIsTab from './tabs/KPIsTab';
import TopPostsTab from './tabs/TopPostsTab';
import BottomPostsTab from './tabs/BottomPostsTab';
import HallazgosTab from './tabs/HallazgosTab';
import PautaTab from './tabs/PautaTab';
import PautaPagadaTab from './tabs/PautaPagadaTab';

const TABS = [
  { id: 'kpis',         label: '📋 KPIs por Post' },
  { id: 'top',          label: '🏆 Top Posts' },
  { id: 'bottom',       label: '⚠️ Bottom Posts' },
  { id: 'hallazgos',    label: '💡 Hallazgos' },
  { id: 'pauta',        label: '🗓️ Plan Orgánico 30D' },
  { id: 'pauta-pagada', label: '💰 Pauta Pagada' },
];

export default function MonthReport({ period, allPeriods }) {
  const [activeTab, setActiveTab] = useState('kpis');

  const historicalPeriods = allPeriods.filter(p => p.id !== period.id);

  return (
    <div className="space-y-5">
      {/* Period header */}
      <div className="bg-dark-brown text-cream rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {period.isFounding && (
              <span className="bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                📌 PERÍODO DE LANZAMIENTO
              </span>
            )}
          </div>
          <h1 className="font-serif font-extrabold text-lg">{period.label}</h1>
          <p className="text-sm text-cream/60 mt-1">{period.dateRange}</p>
        </div>
        <div className="sm:ml-auto grid grid-cols-4 gap-4 text-center">
          {[
            { v: period.summary?.totalPosts,                     l: 'Posts'   },
            { v: period.summary?.totalViews?.toLocaleString(),   l: 'Views'   },
            { v: period.summary?.totalReach?.toLocaleString(),   l: 'Alcance' },
            { v: `${period.summary?.avgER}%`,                    l: 'ER Prom.' },
          ].map(k => (
            <div key={k.l}>
              <div className="font-mono font-extrabold text-lg text-orange">{k.v}</div>
              <div className="text-[10px] text-cream/50 uppercase tracking-wide">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
              activeTab === t.id
                ? t.id === 'pauta-pagada'
                  ? 'bg-orange text-white border-orange'
                  : 'bg-dark-brown text-cream border-dark-brown'
                : t.id === 'pauta-pagada'
                  ? 'bg-transparent text-orange border-orange/50 hover:border-orange hover:bg-orange/5'
                  : 'bg-transparent text-dark-brown border-dark-brown/30 hover:border-dark-brown hover:bg-cream'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {activeTab === 'kpis'         && <KPIsTab period={period} />}
        {activeTab === 'top'          && <TopPostsTab period={period} />}
        {activeTab === 'bottom'       && <BottomPostsTab period={period} />}
        {activeTab === 'hallazgos'    && <HallazgosTab period={period} historicalPeriods={historicalPeriods} />}
        {activeTab === 'pauta'        && <PautaTab period={period} historicalPeriods={historicalPeriods} allPeriods={allPeriods} />}
        {activeTab === 'pauta-pagada' && <PautaPagadaTab period={period} allPeriods={allPeriods} />}
      </div>
    </div>
  );
}
