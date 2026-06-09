const MODEL = 'claude-sonnet-4-6';

function getApiKey() {
  return localStorage.getItem('cv_api_key') || '';
}

async function callClaude(system, userContent, maxTokens = 2500) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API_KEY_MISSING');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userContent }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.content?.find(b => b.type === 'text')?.text || '{}';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

const SYSTEM_HALLAZGOS = `Eres un analista senior de marketing digital especializado en cuentas de música instrumental y lofi para Instagram. Tu rol es analizar datos reales de Instagram Insights y entregar hallazgos accionables, concisos y brutalmente honestos. Siempre basas tus conclusiones en números reales. Nunca inventas datos. Usas benchmarks reales (ER industria música lofi: 3-5%, views cuentas <1K: 50-200). La cuenta es Chill Vibe (@chillvibeglobal) by Kapital Music — tres líneas: TAPES (lofi/nostalgia), ZEN (mindfulness), PLAY (gaming/focus). Target: 18-34 años, estudiantes y deep workers. Responde SOLO en español. Responde en JSON válido siguiendo el schema exacto proporcionado.`;

const SYSTEM_PAUTA = `Eres un estratega de contenido senior especializado en crecimiento orgánico para cuentas de música en Instagram. Creas planes de pauta basados en datos reales que generan crecimiento sostenible. Conoces el algoritmo de Instagram 2025-2026: favorece consistencia, calidad sobre cantidad, y formatos que generan guardados y shares. La cuenta Chill Vibe (@chillvibeglobal) tiene tres líneas: TAPES (🎵 naranja/rojo/negro), ZEN (🌿 teal/lavanda), PLAY (🎮 café/dorado). Objetivo: crecer orgánicamente hacia 100 seguidores primero. Responde SOLO en español. Responde en JSON válido.`;

export async function generateHallazgos(monthData, historicalData) {
  const prompt = `Analiza el dataset de Instagram del período ${monthData.dateRange || 'reciente'} para @chillvibeglobal y genera hallazgos estratégicos.

DATOS DEL PERÍODO:
${JSON.stringify({ dateRange: monthData.dateRange, summary: monthData.summary, totalPosts: monthData.posts?.length }, null, 2)}

TOP 5 POSTS (por views):
${JSON.stringify(
  [...(monthData.posts || [])].sort((a,b)=>b.views-a.views).slice(0,5).map(p=>({views:p.views,er:p.er,tipo:p.tipo,desc:p.desc.slice(0,80)})),
  null, 2
)}

CONTEXTO HISTÓRICO:
${JSON.stringify(historicalData?.map(m=>({ label:m.label, avgViews:m.summary?.totalViews/m.posts?.length||0, avgER:m.summary?.avgER })), null, 2)}

Responde ÚNICAMENTE con JSON con esta estructura:
{
  "benchmarks": {
    "erPromedio": number,
    "erVsIndustria": "string",
    "mejorDia": {"dia":"string","avgViews":number},
    "peorDia": {"dia":"string","avgViews":number},
    "mejorHora": {"hora":"string","avgViews":number},
    "mejorFormatoER": {"formato":"string","er":number},
    "mejorFormatoAlcance": {"formato":"string","avgReach":number}
  },
  "analisisHooks": {
    "cientifico": {"posts":number,"avgViews":number},
    "motivacional": {"posts":number,"avgViews":number},
    "pov": {"posts":number,"avgViews":number},
    "emocional": {"posts":number,"avgViews":number},
    "conclusion": "string"
  },
  "tendencias": {
    "descripcion": "string",
    "alertasCriticas": ["string"],
    "tendenciasPositivas": ["string"]
  },
  "guardadosVsShares": {
    "ratioActual": number,
    "interpretacion": "string",
    "recomendacion": "string"
  },
  "queRepetir": ["string","string","string","string","string"],
  "queEvitar": ["string","string","string","string","string"],
  "planAccionInmediata": [
    {"accion":"string","prioridad":"ALTA","impactoEsperado":"string"}
  ]
}`;

  return callClaude(SYSTEM_HALLAZGOS, prompt, 2000);
}

export async function generatePauta(monthData, historicalData, startDate) {
  const startStr = startDate.toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' });
  const prompt = `Crea un plan de pauta PROFESIONAL de 30 días para @chillvibeglobal comenzando el ${startStr}.

MÉTRICAS DEL ÚLTIMO PERÍODO:
${JSON.stringify(monthData.summary, null, 2)}

TOP POSTS QUE FUNCIONARON:
${JSON.stringify(
  [...(monthData.posts||[])].sort((a,b)=>b.views-a.views).slice(0,5).map(p=>({views:p.views,er:p.er,tipo:p.tipo,desc:p.desc.slice(0,80)})),
  null, 2
)}

HISTORIAL:
${JSON.stringify(historicalData?.map(m=>({label:m.label,avgViews:Math.round((m.summary?.totalViews||0)/(m.posts?.length||1)),avgER:m.summary?.avgER})), null, 2)}

Responde ÚNICAMENTE con JSON:
{
  "periodoInicio": "string",
  "periodoFin": "string",
  "objetivos": {
    "viewsObjetivo": number,
    "viewsActual": number,
    "crecimientoEsperado": "string",
    "seguidoresObjetivo": number,
    "erObjetivo": number,
    "guardadosObjetivo": number,
    "sharesObjetivo": number,
    "justificacion": "string"
  },
  "estrategia": {
    "fase1": {"dias":"1-10","enfoque":"string","tipoContenido":"string","metaPrincipal":"string"},
    "fase2": {"dias":"11-20","enfoque":"string","tipoContenido":"string","metaPrincipal":"string"},
    "fase3": {"dias":"21-30","enfoque":"string","tipoContenido":"string","metaPrincipal":"string"}
  },
  "hooksRecomendados": [
    {"hook":"string","tipo":"Científico|Motivacional|Situacional|Emocional|POV","lineaRecomendada":"TAPES|ZEN|PLAY"}
  ],
  "kpisControl": [
    {"semana":number,"metaViews":number,"metaER":number,"accionSiNoCumple":"string"}
  ],
  "estrategiaCrecimientoAudiencia": {
    "metaSeguidor": number,
    "acciones": ["string"],
    "ugcActivation": "string",
    "hashtagStrategy": "string"
  },
  "advertencias": ["string"]
}`;

  return callClaude(SYSTEM_PAUTA, prompt, 3000);
}

const SYSTEM_PAUTA_PAGADA = `Eres un estratega senior de paid media especializado en Instagram Ads para cuentas de música, lifestyle y bienestar con audiencias internacionales anglófonas. Creas planes de pauta pagada de 15 días basados ÚNICAMENTE en datos reales de rendimiento orgánico — nunca inventas métricas. Tus proyecciones son conservadoras y realistas, calculadas a partir del ER y views orgánicos. Conoces el algoritmo de Meta Ads 2025-2026 y cómo segmentar audiencias internacionales de habla inglesa. La cuenta Chill Vibe (@chillvibeglobal) by Kapital Music tiene contenido 100% en inglés dirigido a mercados anglófonos globales: Reino Unido, USA, Canadá, Australia, Filipinas, India urbana. La cuenta se configura desde GMT-5 pero el público objetivo está en el exterior. Los datos orgánicos confirman audiencia UK: los mejores posts se publicaron a las 12:00–18:00 GMT-5 = 17:00–23:00 Londres. Responde SOLO en español. Responde en JSON válido con el schema exacto.`;

export async function generatePautaPagada(allPeriods, budget, currency = 'USD') {
  const allPosts = allPeriods.flatMap(p => p.posts || []);
  const topPosts = [...allPosts].sort((a, b) => b.views - a.views).slice(0, 8)
    .map(p => ({ id: p.id, views: p.views, er: p.er, tipo: p.tipo, desc: p.desc.slice(0, 100), alcance: p.alcance, saved: p.saved, shares: p.shares }));

  const historySummary = allPeriods.map(p => ({
    label: p.label,
    avgViews: Math.round((p.summary?.totalViews || 0) / (p.posts?.length || 1)),
    avgER: p.summary?.avgER,
    totalPosts: p.summary?.totalPosts,
  }));

  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  // Timing evidence from organic data
  const allPosts2 = allPeriods.flatMap(p => p.posts || []);
  const timingEvidence = [...allPosts2]
    .sort((a,b) => b.views - a.views)
    .slice(0, 10)
    .map(p => {
      const [, time] = p.fecha.split(' ');
      const h = time ? parseInt(time) : null;
      return { id: p.id, views: p.views, hora_GMT5: time || '?', desc_short: p.desc.slice(0, 60) };
    });

  const prompt = `Crea un plan de PAUTA PAGADA de 15 días para @chillvibeglobal con presupuesto total de ${budget} ${currency}. Fecha inicio: ${today}.

CONTEXTO CRÍTICO — AUDIENCIA INTERNACIONAL ANGLÓFONA:
- La cuenta se configura desde GMT-5 (Colombia) pero el contenido es 100% en inglés
- Nombre "@chillvibeglobal" señala intención global explícita
- 69.6% del alcance orgánico proviene de NO seguidores (el algoritmo ya distribuye globalmente)
- Evidencia de timing orgánico muestra correlación con UK prime time (ver abajo)

TOP POSTS + TIMING (cruciales para segmentación internacional):
${JSON.stringify(timingEvidence, null, 2)}

CORRELACIÓN TIMING GMT-5 → MERCADOS INTERNACIONALES:
12:00 GMT-5 = 17:00 Londres / 12:00 NYC / 09:00 LA / 01:00 Manila
18:00 GMT-5 = 23:00 Londres / 18:00 NYC / 15:00 LA / 07:00 Manila
07:00 GMT-5 = 12:00 Londres / 07:00 NYC / 04:00 LA / 20:00 Manila

TOP POSTS HISTÓRICOS:
${JSON.stringify(topPosts, null, 2)}

RESUMEN HISTÓRICO:
${JSON.stringify(historySummary, null, 2)}

BENCHMARK ORGÁNICO:
- ER promedio: ${(historySummary.reduce((s,p) => s + (p.avgER||0), 0) / historySummary.length).toFixed(1)}%
- Views promedio: ${Math.round(historySummary.reduce((s,p) => s + p.avgViews, 0) / historySummary.length)}/post

MERCADOS OBJETIVO PRIORITARIOS (inglés):
1. Reino Unido + Irlanda (UTC+0/+1) — Prime time 12:00–15:00 GMT-5 → los datos orgánicos lo confirman
2. USA East Coast (GMT-5) — Mismo timezone, lunch + post-trabajo
3. USA West Coast (GMT-8) — 3h detrás, amplía cobertura
4. Canadá (GMT-5/-8) — Bundleable con USA
5. Filipinas (GMT+8) — Lo-fi culture masiva, night owls → ventana 07:00 GMT-5
6. India urbana (GMT+5:30) — Estudiantes tech, bajo CPM, alto volumen
7. Australia (GMT+10/+11) — Ventana 18:00 GMT-5 = mañana AU

Responde ÚNICAMENTE con JSON con esta estructura exacta (sin markdown, sin texto extra):
{
  "presupuestoTotal": number,
  "moneda": "string",
  "duracion": "15 días",
  "fechaInicio": "string",
  "fechaFin": "string",
  "fases": [
    { "nombre": "string", "dias": "string", "presupuesto": number, "objetivo": "string", "color": "orange|teal|gold" }
  ],
  "postsSeleccionados": [
    {
      "postId": number,
      "copyExtracto": "string",
      "viewsOrganico": number,
      "erOrganico": number,
      "porQueEscala": "string (2-3 oraciones específicas con datos reales)",
      "objetivo": "Alcance|Tráfico|Conversión|Seguidores|Reproducciones",
      "prioridad": "ALTA|MEDIA|BAJA",
      "presupuesto": number
    }
  ],
  "calendario": [
    { "dia": number, "fecha": "string", "diaSemana": "string", "fase": number, "post": "string", "objetivo": "string", "presupuestoDiario": number }
  ],
  "planDetallado": [
    { "dias": "string", "post": "string", "objetivo": "string", "presupuestoDiario": number, "presupuestoTotal": number, "audiencia": "string", "formatoAnuncio": "string", "cta": "string" }
  ],
  "segmentacion": {
    "fria": { "descripcion": "string", "demografia": ["string"], "intereses": ["string"], "comportamientos": ["string"] },
    "tibia": { "descripcion": "string", "retargeting": ["string"], "lookalike": ["string"], "intereses": ["string"] },
    "caliente": { "descripcion": "string", "segmentos": ["string"], "cta": ["string"], "nota": "string" }
  },
  "kpis": {
    "escalar": ["string x5-7"],
    "optimizar": ["string x5-7"],
    "pausar": ["string x5-7"],
    "tabla": [
      { "kpi": "string", "queMide": "string", "umbralOptimo": "string", "frecuencia": "string", "herramienta": "string" }
    ]
  },
  "proyecciones": {
    "conservador": { "label": "Conservador", "note": "string", "impresiones": "string", "alcanceUnico": "string", "nuevosSeguidores": "string", "videoViews": "string", "clicsPerfil": "string", "costoSeguidor": "string", "cpm": "string" },
    "realista":    { "label": "Realista",    "note": "string", "impresiones": "string", "alcanceUnico": "string", "nuevosSeguidores": "string", "videoViews": "string", "clicsPerfil": "string", "costoSeguidor": "string", "cpm": "string" },
    "optimista":   { "label": "Optimista",   "note": "string", "impresiones": "string", "alcanceUnico": "string", "nuevosSeguidores": "string", "videoViews": "string", "clicsPerfil": "string", "costoSeguidor": "string", "cpm": "string" },
    "metaPrincipal": "string"
  },
  "distribucionPresupuesto": [
    { "fase": "string", "post": "string", "dias": "string", "presupuesto": number, "porcentaje": number, "justificacion": "string" }
  ]
}`;

  return callClaude(SYSTEM_PAUTA_PAGADA, prompt, 4000);
}
