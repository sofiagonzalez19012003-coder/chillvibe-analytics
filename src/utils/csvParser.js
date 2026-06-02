import Papa from 'papaparse';
import { calcER, computeSummary } from './calculations';

const TYPE_MAP = {
  'Reel de Instagram': 'Reel',
  'Secuencia de Instagram': 'Carrusel',
  'Imagen de Instagram': 'Imagen',
};

function toNum(v) {
  if (v === undefined || v === null || v === '') return 0;
  const n = parseFloat(String(v).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

export function parseInstagramCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(r => {
            const agg = r['Fecha'] || r['Date'] || '';
            const note = r['Comentario sobre los datos'] || r['Data note'] || '';
            return agg === 'Total' && note === '';
          });

          if (!rows.length) {
            reject(new Error('No se encontraron filas válidas. Asegúrate de exportar el CSV de Instagram con la fila "Total".'));
            return;
          }

          const posts = rows.map((r, i) => {
            const publishedAt = r['Hora de publicación'] || r['Publish time'] || '';
            const tipo = TYPE_MAP[r['Tipo de publicación'] || r['Post type'] || ''] || 'Reel';
            const alcance = toNum(r['Alcance'] || r['Reach']);
            const likes    = toNum(r['Me gusta'] || r['Likes']);
            const comments = toNum(r['Comentarios'] || r['Comments']);
            const shares   = toNum(r['Veces que se compartió'] || r['Shares']);
            const saved    = toNum(r['Veces que se guardó'] || r['Saves']);
            const views    = toNum(r['Visualizaciones'] || r['Views'] || r['Impressions']);

            // Normalize date from MM/DD/YYYY HH:MM to MM/DD HH:MM
            let fecha = publishedAt;
            const match = publishedAt.match(/(\d{1,2})\/(\d{1,2})\/\d{4}\s+(\d{1,2}:\d{2})/);
            if (match) fecha = `${match[1]}/${match[2]} ${match[3]}`;

            return {
              id: i + 1,
              fecha,
              tipo,
              views,
              alcance,
              likes,
              comments,
              shares,
              saved,
              er: calcER(likes, comments, shares, saved, alcance),
              desc: (r['Descripción'] || r['Caption'] || '').slice(0, 150),
              url: r['Enlace permanente'] || r['Permalink'] || '',
            };
          }).filter(p => p.views > 0 || p.alcance > 0);

          const summary = computeSummary(posts);
          resolve({ posts, summary });
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
}
