import { useState, useEffect, useCallback } from 'react';
import { FOUNDING_PERIOD } from './data/foundingPosts';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MonthReport from './components/MonthReport';
import ApiKeyModal from './components/ApiKeyModal';
import ImportModal from './components/ImportModal';

const STORAGE_KEY = 'cv_months';

function loadMonths() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveMonths(months) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(months));
}

export default function App() {
  const [months, setMonths] = useState(() => loadMonths());
  const [currentView, setCurrentView] = useState('dashboard');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cv_api_key')) setShowApiKey(true);
  }, []);

  const allPeriods = [FOUNDING_PERIOD, ...months].sort(
    (a, b) => new Date(b.importedAt) - new Date(a.importedAt)
  );

  const currentPeriod = currentView === 'dashboard'
    ? null
    : allPeriods.find(p => p.id === currentView);

  const addMonth = useCallback((period) => {
    setMonths(prev => {
      const updated = [...prev.filter(m => m.id !== period.id), period];
      saveMonths(updated);
      return updated;
    });
    setCurrentView(period.id);
    setShowImport(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-cream font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        periods={allPeriods}
        currentView={currentView}
        onNavigate={(v) => { setCurrentView(v); setSidebarOpen(false); }}
        onImport={() => setShowImport(true)}
        onSettings={() => setShowApiKey(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 p-4 bg-dark-brown text-cream sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-serif font-bold text-lg">🦔 Chill Vibe Analytics</span>
        </div>

        <div className="p-4 lg:p-6 animate-fade-in">
          {currentView === 'dashboard' ? (
            <Dashboard periods={allPeriods} onNavigate={setCurrentView} />
          ) : currentPeriod ? (
            <MonthReport period={currentPeriod} allPeriods={allPeriods} />
          ) : (
            <div className="text-center py-20 text-brown-mid">Período no encontrado.</div>
          )}
        </div>
      </main>

      {showApiKey && <ApiKeyModal onClose={() => setShowApiKey(false)} />}
      {showImport && <ImportModal onClose={() => setShowImport(false)} onImport={addMonth} />}
    </div>
  );
}
