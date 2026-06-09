import { useState } from 'react';

export default function ApiKeyModal({ onClose }) {
  const [key, setKey] = useState(localStorage.getItem('cv_api_key') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!key.trim()) return;
    localStorage.setItem('cv_api_key', key.trim());
    setSaved(true);
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">🔑</span>
          <div>
            <h2 className="font-serif font-bold text-dark-brown text-lg">Configurar Anthropic API Key</h2>
            <p className="text-xs text-gray-500 mt-0.5">Para generar análisis con IA</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Ingresa tu API Key de Anthropic para habilitar los análisis automáticos de hallazgos y planes de pauta.
        </p>

        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="sk-ant-api03-..."
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-orange transition-colors"
        />

        <div className="flex items-start gap-2 mt-3 p-3 bg-cream rounded-lg">
          <span className="text-xs">ℹ️</span>
          <p className="text-xs text-gray-500">
            Tu API key se guarda <strong>solo en este navegador</strong> (localStorage). Nunca sale de tu equipo ni se envía a ningún servidor externo.
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              saved
                ? 'bg-green-ok text-white'
                : key.trim()
                  ? 'bg-orange text-white hover:bg-orange/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saved ? '✓ Guardado' : 'Guardar y Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
