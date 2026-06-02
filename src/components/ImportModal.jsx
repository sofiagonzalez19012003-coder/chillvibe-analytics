import { useState, useRef } from 'react';
import { parseInstagramCSV } from '../utils/csvParser';
import { computeSummary } from '../utils/calculations';

export default function ImportModal({ onClose, onImport }) {
  const [step, setStep] = useState('upload'); // upload | confirm | error
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const processFile = async (file) => {
    setLoading(true);
    setError('');
    try {
      const { posts, summary } = await parseInstagramCSV(file);
      if (!posts.length) throw new Error('No se encontraron posts válidos en el CSV.');

      // Detect period from posts
      const dates = posts
        .map(p => {
          const [date] = p.fecha.split(' ');
          const [mm, dd] = date.split('/');
          return new Date(2026, mm - 1, dd);
        })
        .filter(d => !isNaN(d.getTime()))
        .sort((a, b) => a - b);

      const startDate = dates[0];
      const endDate = dates[dates.length - 1];
      const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = startDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      const dateRange = `${startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} – ${endDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;

      setPreview({
        id: monthKey,
        label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
        dateRange,
        importedAt: new Date().toISOString(),
        posts,
        summary,
        aiAnalysis: { hallazgos: null, pauta: null, generatedAt: null },
      });
      setStep('confirm');
    } catch (e) {
      setError(e.message);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (!file?.name.endsWith('.csv')) {
      setError('Solo se aceptan archivos CSV de Instagram.');
      setStep('error');
      return;
    }
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
        {step === 'upload' && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">📂</span>
              <div>
                <h2 className="font-serif font-bold text-dark-brown text-lg">Importar Reporte Instagram</h2>
                <p className="text-xs text-gray-500 mt-0.5">CSV exportado de Instagram Insights</p>
              </div>
            </div>

            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                dragging ? 'border-orange bg-orange/5' : 'border-gray-200 hover:border-orange hover:bg-cream'
              }`}
            >
              {loading ? (
                <div className="space-y-2">
                  <div className="text-3xl animate-pulse">🧠</div>
                  <p className="text-sm font-semibold text-dark-brown">Procesando CSV...</p>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-3">📊</div>
                  <p className="font-semibold text-dark-brown text-sm">Arrastra tu CSV aquí o haz click</p>
                  <p className="text-xs text-gray-400 mt-1">Formato: Export de Instagram Insights (español)</p>
                </>
              )}
            </div>

            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files[0])} />

            <div className="mt-4 p-3 bg-cream rounded-lg text-xs text-gray-500">
              <strong>Columnas esperadas:</strong> Hora de publicación, Tipo de publicación, Visualizaciones, Alcance, Me gusta, Comentarios, Veces que se compartió, Veces que se guardó
            </div>

            <button onClick={onClose} className="w-full mt-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </>
        )}

        {step === 'confirm' && preview && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">✅</span>
              <div>
                <h2 className="font-serif font-bold text-dark-brown text-lg">Datos importados</h2>
                <p className="text-xs text-gray-500 mt-0.5">{preview.dateRange}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Posts', value: preview.summary.totalPosts },
                { label: 'Total Views', value: preview.summary.totalViews.toLocaleString() },
                { label: 'ER Prom.', value: `${preview.summary.avgER}%` },
                { label: 'Likes', value: preview.summary.totalLikes },
                { label: 'Guardados', value: preview.summary.totalSaves },
                { label: 'Shares', value: preview.summary.totalShares },
              ].map(k => (
                <div key={k.label} className="bg-cream rounded-xl p-3 text-center">
                  <div className="font-mono font-bold text-dark-brown text-lg">{k.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('upload')} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                ← Volver
              </button>
              <button
                onClick={() => onImport(preview)}
                className="flex-1 py-2.5 bg-orange text-white rounded-xl text-sm font-bold hover:bg-orange/90 transition-colors"
              >
                Guardar en historial →
              </button>
            </div>
          </>
        )}

        {step === 'error' && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">❌</span>
              <div>
                <h2 className="font-serif font-bold text-dark-brown text-lg">Error al importar</h2>
              </div>
            </div>
            <p className="text-sm text-red-600 bg-red-50 rounded-xl p-4 mb-5">{error}</p>
            <div className="flex gap-3">
              <button onClick={() => setStep('upload')} className="flex-1 py-2.5 bg-orange text-white rounded-xl text-sm font-bold hover:bg-orange/90 transition-colors">
                Intentar de nuevo
              </button>
              <button onClick={onClose} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-500">
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
