import { useState } from 'react';

export default function Sidebar({ periods, currentView, onNavigate, onImport, onSettings, isOpen, onClose }) {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-64 bg-dark-brown text-cream flex flex-col
      transform transition-transform duration-200
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🦔</span>
          <div>
            <div className="font-serif font-bold text-base leading-tight">Chill Vibe</div>
            <div className="text-xs text-cream/50 mt-0.5">Analytics Intelligence</div>
          </div>
        </div>
        <div className="text-xs text-cream/40 mt-3">@chillvibeglobal · By Kapital Music</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            currentView === 'dashboard'
              ? 'bg-orange text-white'
              : 'text-cream/80 hover:bg-white/10'
          }`}
        >
          <span>📊</span> Dashboard General
        </button>

        {/* Monthly reports accordion */}
        <div className="pt-2">
          <button
            onClick={() => setAccordionOpen(o => !o)}
            className="w-full text-left flex items-center justify-between px-3 py-2 text-xs font-bold text-cream/40 uppercase tracking-widest hover:text-cream/60 transition-colors"
          >
            <span>📅 Reportes Mensuales</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform ${accordionOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {accordionOpen && (
            <div className="mt-1 space-y-0.5">
              {periods.map(period => (
                <button
                  key={period.id}
                  onClick={() => onNavigate(period.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    currentView === period.id
                      ? 'bg-orange/90 text-white'
                      : 'text-cream/70 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px]">{period.isFounding ? '📌' : '📋'}</span>
                  <div className="truncate">
                    <div className="truncate">{period.label}</div>
                    <div className="text-[10px] opacity-60">{period.summary?.totalPosts} posts</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer actions */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <button
          onClick={onImport}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-orange/20 hover:bg-orange/30 text-orange text-sm font-bold transition-colors"
        >
          <span>+</span> Importar Nuevo Mes
        </button>
        <button
          onClick={onSettings}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-cream/50 hover:bg-white/10 text-xs font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Configurar API Key
        </button>
      </div>
    </aside>
  );
}
