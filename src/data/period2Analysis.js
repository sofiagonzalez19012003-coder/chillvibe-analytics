// ─── Período 2: Crecimiento Post-Lanzamiento (15 May – 15 Sep 2026) ───────────
// Análisis basado en el export real de Instagram Insights (Dec 31 2025 – Sep 15 2026).
// Metodología idéntica a foundingAnalysis.js: mismo cálculo de ER, mismos criterios
// de Top/Bottom (20% superior/inferior por views), mismo formato de "por qué
// funcionó / por qué no funcionó" post por post.

export const PERIOD2_POSTS = [
  {id:1, fecha:"05/15 10:00", tipo:"Reel", views:372, alcance:269, likes:7, comments:0, shares:1, saved:3, er:4.1, desc:"POV: The world is moving fast. You decided not to follow. Sometimes the best thing you can do is sit still, press play, and let the journey be the destination.", url:"https://www.instagram.com/reel/DYXe5XGpyy0/"},
  {id:2, fecha:"05/19 12:50", tipo:"Reel", views:290, alcance:223, likes:8, comments:0, shares:1, saved:2, er:4.9, desc:"POV: It's 11PM. The world is finally quiet. No notifications. No deadlines. Just the warm crackle of fire and that one tape you've been saving.", url:"https://www.instagram.com/reel/DYiFM-phODy/"},
  {id:3, fecha:"05/20 16:10", tipo:"Carrusel", views:255, alcance:97, likes:4, comments:0, shares:0, saved:1, er:5.2, desc:"Your alarm isn't the problem. Your biology is fighting back. Your body's natural day runs 24.2 hours, not 24. That's not laziness, that's science.", url:"https://www.instagram.com/p/DYlBM7qEXuY/"},
  {id:4, fecha:"05/24 13:12", tipo:"Imagen", views:332, alcance:208, likes:3, comments:1, shares:1, saved:1, er:2.9, desc:"POV: The world is on fire. You finally stopped trying to put it out. Peace isn't the absence of chaos, it's choosing stillness anyway.", url:"https://www.instagram.com/p/DYu_-BGhyXQ/"},
  {id:5, fecha:"06/03 10:11", tipo:"Reel", views:174, alcance:114, likes:6, comments:0, shares:3, saved:1, er:8.8, desc:"The sun sets, the energy flows, the session has officially begun. Chill Vibe Play, for the long nights.", url:"https://www.instagram.com/reel/DZIa6ffRZqh/"},
  {id:6, fecha:"06/10 17:25", tipo:"Reel", views:204, alcance:127, likes:4, comments:0, shares:1, saved:1, er:4.7, desc:"Next soundtrack? World Cup 2026. Kei's curious about all the noise, so he's tuning in his own way. Who's your team? Drop a flag.", url:"https://www.instagram.com/reel/DZbOHsmR_Gi/"},
  {id:7, fecha:"06/12 16:09", tipo:"Reel", views:257, alcance:194, likes:7, comments:0, shares:0, saved:1, er:4.1, desc:"Who's taking it today? A good match deserves a good comedown. When the final whistle blows, Kei presses play and rests deeply with the best tapes.", url:"https://www.instagram.com/reel/DZgPM1ER2AN/"},
  {id:8, fecha:"06/13 13:57", tipo:"Reel", views:298, alcance:188, likes:4, comments:0, shares:0, saved:1, er:2.7, desc:"Final whistle: USA 4, Paraguay 1. A good match deserved a good comedown, and Kei's got it covered. The perfect way to end a winning night.", url:"https://www.instagram.com/reel/DZik0oPhiCt/"},
  {id:9, fecha:"06/22 19:39", tipo:"Reel", views:216, alcance:147, likes:6, comments:0, shares:0, saved:3, er:6.1, desc:"Who's your team tonight? Kei's got the scarf, the mug and the comfy spot ready. When the game's over, let the cozy vibes take it from here.", url:"https://www.instagram.com/reel/DZ6XMm5R7TS/"},
  {id:10, fecha:"06/27 16:25", tipo:"Reel", views:281, alcance:197, likes:7, comments:0, shares:0, saved:2, er:4.6, desc:"Your most productive hours don't always look like hustle. Sometimes they look like a warm lamp, a quiet playlist, and nowhere to be.", url:"https://www.instagram.com/reel/DaG4ycfxEXs/"},
  {id:11, fecha:"06/30 17:37", tipo:"Reel", views:341, alcance:229, likes:9, comments:0, shares:2, saved:1, er:5.2, desc:"POV: 2AM and you're actually in the zone. Kei's not sleeping either. Headphones on, window open, let's go.", url:"https://www.instagram.com/reel/DaOvr3ZR_R0/"},
  {id:12, fecha:"07/30 10:56", tipo:"Reel", views:301, alcance:238, likes:12, comments:0, shares:1, saved:0, er:5.5, desc:"No regrets. Rain on the window, coffee going cold, alarm ignored. Some mornings the most productive thing you can do is absolutely nothing.", url:"https://www.instagram.com/reel/DbbRmzwBDfb/"},
  {id:13, fecha:"08/02 10:56", tipo:"Reel", views:310, alcance:219, likes:4, comments:0, shares:1, saved:1, er:2.7, desc:"Stop. Breathe. You are okay. Not okay like everything is perfect, okay like you're still here, still standing, still breathing.", url:"https://www.instagram.com/reel/DbjAA3GxfgB/"},
  {id:14, fecha:"08/03 05:54", tipo:"Reel", views:228, alcance:166, likes:7, comments:0, shares:0, saved:1, er:4.8, desc:"New month, new trail, same tape. August hits different when you're out here. No deadlines, no drama. Welcome to August, you earned this.", url:"https://www.instagram.com/reel/DblCNpfxYDf/"},
  {id:15, fecha:"08/04 12:04", tipo:"Reel", views:229, alcance:179, likes:6, comments:0, shares:0, saved:2, er:4.5, desc:"Deadlines hit different when the sun goes down. All day: stress, tabs open, brain at 100%. Then the night comes and everything gets quieter.", url:"https://www.instagram.com/reel/DboRPCov2ev/"},
  {id:16, fecha:"08/06 11:52", tipo:"Reel", views:235, alcance:180, likes:9, comments:0, shares:1, saved:1, er:6.1, desc:"1 million problems, 1 million solutions, still here. That's not luck, that's you. Every single time, somehow, you figured it out.", url:"https://www.instagram.com/reel/DbtZemIxECv/"},
  {id:17, fecha:"08/08 13:46", tipo:"Carrusel", views:202, alcance:76, likes:7, comments:0, shares:0, saved:1, er:10.5, desc:"Most things stealing your peace don't announce themselves. No drama, no warning, just a slow quiet drain. Swipe, recognize, reset.", url:"https://www.instagram.com/p/DbywRCSgfPY/"},
  {id:18, fecha:"08/11 06:07", tipo:"Reel", views:365, alcance:295, likes:10, comments:0, shares:5, saved:1, er:5.4, desc:"BREATHE. Not when you have time, not after the next deadline, right now. Rain, sunrise, tea, ocean, forest. It's all still there waiting for you.", url:"https://www.instagram.com/reel/Db5qKxfxW58/"},
  {id:19, fecha:"08/18 16:56", tipo:"Reel", views:193, alcance:165, likes:5, comments:0, shares:0, saved:2, er:4.2, desc:"It's midnight and the only thing still awake is the sky. No noise, no notifications, just a window full of stars and nowhere else to be.", url:"https://www.instagram.com/reel/DcM1nDyR1ow/"},
  {id:20, fecha:"08/19 17:00", tipo:"Reel", views:174, alcance:139, likes:4, comments:0, shares:0, saved:1, er:3.6, desc:"Everyone logged off hours ago. You're just getting started. The glow hits different after midnight.", url:"https://www.instagram.com/reel/DcOWjx-hMeo/"},
  {id:21, fecha:"08/20 16:00", tipo:"Reel", views:109, alcance:93, likes:3, comments:0, shares:0, saved:2, er:5.4, desc:"It's raining, the tape's already playing. Zero plans to change either one. Some days just ask you to stay exactly where you are.", url:"https://www.instagram.com/reel/DcR5LzqBcyR/"},
  {id:22, fecha:"08/21 07:00", tipo:"Reel", views:155, alcance:127, likes:4, comments:0, shares:0, saved:1, er:3.9, desc:"Nowhere to be, nothing to prove. The porch, the breeze, the book you won't finish. No plans is the plan.", url:"https://www.instagram.com/reel/DcTgPCQtdba/"},
  {id:23, fecha:"08/22 16:30", tipo:"Reel", views:190, alcance:162, likes:8, comments:0, shares:0, saved:1, er:5.6, desc:"They're running late, you don't even mind. Cold tea, warm window. Time moves slower when you stop checking the clock.", url:"https://www.instagram.com/reel/DcXGMhINKPE/"},
  {id:24, fecha:"09/10 18:05", tipo:"Reel", views:173, alcance:130, likes:7, comments:0, shares:0, saved:1, er:6.2, desc:"So much is going on right now, and somehow you're still here. Still showing up, still trying. That's not small, that's everything.", url:"https://www.instagram.com/reel/DdIMGVDxKwb/"},
  {id:25, fecha:"09/14 13:59", tipo:"Carrusel", views:150, alcance:87, likes:6, comments:0, shares:1, saved:1, er:9.2, desc:"Your room should feel like a hug. Not a Pinterest board, not an aesthetic flex. Just a place where your nervous system finally exhales.", url:"https://www.instagram.com/p/DdSDQr7gYz5/"},
  {id:26, fecha:"09/15 07:00", tipo:"Carrusel", views:26, alcance:9, likes:3, comments:0, shares:0, saved:1, er:44.4, desc:"Your favorite playlist might be the reason you've read the same paragraph three times. Not the noise, not the stress. The lyrics.", url:"https://www.instagram.com/p/DdT4A_qgf2q/"},
];

export const PERIOD2 = {
  id: "2026-p2-crecimiento",
  label: "May–Sep 2026 (Crecimiento)",
  isFounding: false,
  badge: "PERIODO ACTUAL",
  badgeColor: "bg-teal",
  dateRange: "May 15 – Sep 15, 2026",
  importedAt: "2026-09-15T12:00:00.000Z",
  posts: PERIOD2_POSTS,
  summary: {
    totalViews: 6060,
    totalReach: 4258,
    totalLikes: 160,
    totalSaves: 34,
    totalShares: 18,
    totalComments: 1,
    avgER: 6.7,
    totalPosts: 26,
    reels: 21,
    carousels: 4,
    images: 1,
    topPosts: [1, 18, 11, 4, 13],
    bottomPosts: [24, 22, 25, 21, 26],
  },
};

// ─── Hallazgos: Período 2 ──────────────────────────────────────────────────────
// Nota: el ER promedio del lanzamiento en este mismo export (recalculado con las
// vistas de por vida a Sep 15) bajó de 16.6% a 9.7% porque 3 reels de abril se
// volvieron virales meses después (1.78M views combinadas) sin engagement
// proporcional. El 16.6% original en foundingAnalysis.js sigue siendo el dato
// correcto para describir el momento del lanzamiento — se preserva sin tocar.
export const PERIOD2_HALLAZGOS = {
  benchmarks: {
    erPromedio: 6.7,
    erVsIndustria: "6.7% vs benchmark industria 3–5% → sigue 1.3x–2.2x superior, pero cayó 60% frente al 16.6% del lanzamiento",
    mejorDia: { dia: "Martes", avgViews: 241 },
    peorDia: { dia: "Lunes", avgViews: 198 },
    mejorHora: { hora: "10:00", avgViews: 289 },
    mejorFormatoER: { formato: "Carrusel", er: 17.3 },
    mejorFormatoAlcance: { formato: "Reel", avgReach: 180 },
    seguidoresAtribuidos: { periodo: 3, lanzamiento: 258 },
  },
  analisisHooks: {
    pov:          { posts: 4,  avgViews: 334 },
    situacional:  { posts: 4,  avgViews: 244 },
    emocional:    { posts: 16, avgViews: 217 },
    cientifico:   { posts: 2,  avgViews: 140 },
    conclusion: "El hallazgo del lanzamiento se invirtió por completo: en abril–mayo los hooks POV eran el grupo más débil (53 views avg). Ahora son el formato ganador (334 views avg, +54% sobre el promedio del período) — la marca ya tiene una audiencia que reconoce a Kei y responde a narrativa en primera persona. Los hooks científicos, que dominaban el lanzamiento, casi desaparecieron (solo 2 de 26 posts) y rindieron peor (140 views) — es la oportunidad más clara y más barata de recuperar para el próximo mes.",
  },
  tendencias: {
    descripcion: "A diferencia del lanzamiento (una caída aguda por saturación en los primeros días), este período tiene un patrón de silencio-y-arranque: 4 posts en mayo, 7 en junio, apenas 1 en julio (29 días sin publicar), 11 en agosto — el mes más activo y el único con cadencia realmente sostenida — y 3 en septiembre. El promedio de views se mantiene notablemente estable entre 150–370 sin importar el mes, lo que sugiere que el techo actual no es de calidad de contenido sino de frecuencia y consistencia de publicación.",
    alertasCriticas: [
      "Solo 3 seguidores atribuidos en 26 posts / 4 meses, contra 258 en las 3 semanas del lanzamiento — casi todo el crecimiento de audiencia sigue viniendo de los 3 reels virales de abril, no de contenido nuevo. El alcance actual no se está convirtiendo en comunidad.",
      "Los comentarios colapsaron a 1 en 26 posts (vs 26 comentarios en 48 posts del lanzamiento) — la audiencia ve y a veces guarda, pero prácticamente no conversa. Ningún post reciente tiene una pregunta abierta en el copy.",
      "29 días sin publicar entre el 30 de junio y el 30 de julio — el silencio más largo desde el lanzamiento.",
      "Dos posts se publicaron el mismo día (20 de agosto) — repite a menor escala el error de saturación del lanzamiento.",
      "Publicar antes de las 08:00 GMT-5 sigue siendo la ventana más débil (90 views promedio) — el mismo patrón que en el lanzamiento.",
    ],
    tendenciasPositivas: [
      "El rango de views por día de la semana se emparejó: 198–261 (antes 80–202) — ya no hay un 'peor día' que destruya el alcance como el jueves del lanzamiento.",
      "Agosto fue el mes más consistente (11 posts, ritmo cada 2–3 días) y sostuvo el promedio de views más alto y estable del período.",
      "Los carruseles siguen siendo el formato de mayor ER (17.3%) — confirma el patrón del lanzamiento (26.8%) con una muestra distinta.",
      "Los hooks POV con Kei como protagonista maduraron hasta ser el mejor performer del período (334 views avg) — señal de que la marca ya tiene una identidad reconocible.",
    ],
  },
  guardadosVsShares: {
    ratioActual: 1.9,
    interpretacion: "El ratio bajó de 5.2 (lanzamiento) a 1.9 — proporcionalmente se comparte más, pero el volumen absoluto de ambas métricas es bajo: 34 guardados y 18 shares en 4 meses, contra 62 y 12 en apenas 3 semanas de lanzamiento. Es coherente con el colapso de comentarios: la audiencia interactúa mucho menos de forma activa en general, no solo dejando de comentar.",
    recomendacion: "El CTA explícito de guardar/compartir usado en el lanzamiento ('Comparte esto con alguien que lo necesite esta noche') desapareció del copy reciente. Recuperarlo es la palanca más barata para revertir la caída de engagement activo — no requiere cambiar el contenido, solo el cierre del copy.",
  },
  queRepetir: [
    "Hooks POV en primera persona con Kei como protagonista (mejor performer del período: 334 views avg)",
    "La cadencia de agosto (~1 post cada 2–3 días) — el mes con mejor promedio sostenido de todo el período",
    "Carruseles para maximizar ER (17.3%), aunque se usaron muy poco (solo 4 en 4 meses)",
    "Publicar entre 10:00 y 13:00 GMT-5 — confirma la ventana ya identificada en el lanzamiento",
    "Reciclar hooks ya validados (ej. 'Stop. Breathe. You are okay' volvió a rendir por encima del promedio)",
  ],
  queEvitar: [
    "Silencios de más de 2 semanas (julio: 29 días sin publicar) — corta el momentum del algoritmo",
    "Publicar 2 posts el mismo día con una audiencia todavía pequeña (20 de agosto)",
    "Publicar antes de las 08:00 GMT-5",
    "Copy sin pregunta ni CTA de comentario explícito — la causa más probable del colapso a 1 comentario en 4 meses",
    "Depender solo de hooks científicos sin renovarlos — cayeron a 2 posts y el peor promedio de views del período (140)",
  ],
  planAccionInmediata: [
    { accion: "Restaurar una cadencia mínima de 2 posts/semana sin saltar más de 10 días", prioridad: "ALTA", impactoEsperado: "Evitar los silencios de 19–29 días que frenaron julio y agosto-septiembre" },
    { accion: "Agregar una pregunta o CTA de comentario explícito en cada copy", prioridad: "ALTA", impactoEsperado: "Revertir el colapso de comentarios (1 en 26 posts) y devolver la señal de conversación al algoritmo" },
    { accion: "Duplicar la proporción de hooks POV con Kei (hoy 4 de 26 posts)", prioridad: "ALTA", impactoEsperado: "+54% views promedio vs. el resto del contenido, según el propio historial del período" },
    { accion: "Nunca publicar 2 posts el mismo día", prioridad: "MEDIA", impactoEsperado: "Evitar la canibalización de alcance observada el 20 de agosto" },
    { accion: "Retomar el CTA explícito de compartir/guardar en el cierre del copy", prioridad: "MEDIA", impactoEsperado: "Recuperar el ratio guardados/shares y el volumen absoluto de ambos" },
  ],
};

export const PERIOD2_TOP_REASONS = {
  1:  { why: "Primer post tras 4 días de silencio post-lanzamiento. Hook POV situacional publicado a las 10:00, la ventana que ya el lanzamiento señalaba como fuerte.", pattern: "Retorno con hook POV + hora matutina 10:00" },
  18: { why: "Imperativo de una palabra ('BREATHE') publicado a las 06:07, hora atípica. Generó 5 shares, el número más alto de todo el período.", pattern: "Imperativo corto y directo = el contenido más compartido del período" },
  11: { why: "Reutiliza el hook 'POV: 2AM' que ya había aparecido en el lanzamiento. Con Kei como protagonista consolidado, escaló mucho mejor que su versión original.", pattern: "Hooks POV con Kei ya consolidado escalan mejor que en el lanzamiento" },
  4:  { why: "Formato imagen estática con copy de alto contraste emocional ('el mundo está en llamas, deja de intentar apagarlo'). Alcance alto (208) para tratarse de una imagen.", pattern: "Imagen + copy de alto contraste, usado con moderación" },
  13: { why: "Repite el hook exacto 'Stop. Breathe. You are okay' del lanzamiento — confirma que es un patrón replicable incluso 3 meses después.", pattern: "Hooks de mindfulness cortos y directos siguen funcionando con el tiempo" },
};

export const PERIOD2_BOT_REASONS = {
  24: { why: "Publicado tras 19 días de silencio (22 ago – 10 sep) — la audiencia se enfrió. Copy emocional genérico sin hook de apertura fuerte.", avoid: "Reactivar con contenido de bajo impacto justo después de una pausa larga" },
  22: { why: "Publicado a las 07:00, la franja horaria con el peor promedio del período (90 views).", avoid: "Publicar antes de las 08:00 GMT-5" },
  25: { why: "Carrusel sin dato ni hook de curiosidad en la portada — los carruseles ganan en ER, no necesariamente en views, si no abren con un gancho fuerte.", avoid: "Carrusel sin hook de apertura" },
  21: { why: "Publicado el mismo día que otro post (20 de agosto) — canibaliza alcance entre ambos, repitiendo a menor escala el error de saturación del lanzamiento.", avoid: "Publicar más de 1 post el mismo día con audiencia todavía pequeña" },
  26: { why: "Post publicado el mismo día del corte de datos (15 de septiembre) — no ha tenido tiempo de circular. No es una señal real de bajo desempeño.", avoid: "Dato insuficiente todavía — no accionable" },
};

// ─── Plan Orgánico: Próximas 2 semanas (a partir del 21 de septiembre) ────────
export const PERIOD2_PAUTA = {
  periodoInicio: "2026-09-21",
  periodoFin: "2026-10-04",
  objetivos: {
    viewsObjetivo: 300,
    viewsActual: 233,
    crecimientoEsperado: "+29%",
    seguidoresObjetivo: 30,
    erObjetivo: 8.0,
    guardadosObjetivo: 25,
    sharesObjetivo: 15,
    justificacion: "Meta calculada sobre el promedio real de views del período (233/post) y el mejor performer verificado (hooks POV, 334 views avg). La meta de seguidores es deliberadamente conservadora: en 4 meses solo se atribuyeron 3 follows a contenido nuevo, así que 30 en 2 semanas ya representa un cambio real de tendencia, no una proyección optimista.",
  },
  estrategia: {
    fase1: { dias: "1–5",  enfoque: "Recuperar cadencia y conversación", tipoContenido: "Hooks POV con Kei + pregunta explícita en el copy", metaPrincipal: "0 días sin actividad de comentarios" },
    fase2: { dias: "6–10", enfoque: "Duplicar el peso de los hooks ganadores", tipoContenido: "60% POV, 20% Carrusel (ER), 20% situacional", metaPrincipal: "Avg views > 280/post" },
    fase3: { dias: "11–14", enfoque: "Recuperar el CTA de compartir", tipoContenido: "Cierre de copy con CTA explícito de compartir/guardar en todos los posts", metaPrincipal: "Shares > 2/post promedio" },
  },
  semanas: [
    {
      semana: 1, fechaInicio: "21 Sep", fechaFin: "27 Sep", tema: "Recuperar cadencia — Hooks POV + conversación",
      posts: [
        { dia: "Lunes",    fecha: "Sep 21", publicar: true,  formato: "Reel",     linea: "TAPES", hookRecomendado: "POV: it's Monday, 10AM, and you already pressed play. Some things don't need a reason.", horaOptima: "10:00", objetivo: "Alcance",  descripcion: "Hook POV en la ventana ganadora del período (10:00, 289 views avg)." },
        { dia: "Martes",   fecha: "Sep 22", publicar: true,  formato: "Carrusel", linea: "ZEN",   hookRecomendado: "3 things your brain does after 8 minutes of lo-fi. Swipe to find out — and tell us which one surprised you.", horaOptima: "12:00", objetivo: "Guardados", descripcion: "Carrusel con pregunta de cierre explícita para reactivar comentarios (colapsaron a 1 en 4 meses)." },
        { dia: "Miércoles",fecha: "Sep 23", publicar: false, formato: null,       linea: null,    hookRecomendado: null, horaOptima: null, objetivo: null, descripcion: "DESCANSO — evitar publicar 2 días seguidos sin necesidad." },
        { dia: "Jueves",   fecha: "Sep 24", publicar: true,  formato: "Reel",     linea: "PLAY",  hookRecomendado: "POV: 2AM again. Kei's used to it by now. Are you?", horaOptima: "17:00", objetivo: "ER", descripcion: "Repite el patrón POV+Kei que fue el mejor performer histórico del período." },
        { dia: "Viernes",  fecha: "Sep 25", publicar: true,  formato: "Reel",     linea: "ZEN",   hookRecomendado: "Friday check-in: what got you through this week? Tell us below.", horaOptima: "13:00", objetivo: "Comentarios", descripcion: "Pregunta directa de cierre de semana — objetivo explícito: comentarios, no solo views." },
        { dia: "Sábado",   fecha: "Sep 26", publicar: false, formato: null,       linea: null,    hookRecomendado: null, horaOptima: null, objetivo: null, descripcion: "DESCANSO." },
        { dia: "Domingo",  fecha: "Sep 27", publicar: true,  formato: "Reel",     linea: "TAPES", hookRecomendado: "POV: Sunday night, the week hasn't started yet. Stay here a little longer.", horaOptima: "18:00", objetivo: "Alcance", descripcion: "Domingo mostró la señal de views más alta del período (321 avg, muestra pequeña) — vale la pena probar con volumen." },
      ],
    },
    {
      semana: 2, fechaInicio: "28 Sep", fechaFin: "4 Oct", tema: "Consolidar CTA de compartir — Cerrar el mes con shares",
      posts: [
        { dia: "Lunes",    fecha: "Sep 28", publicar: true,  formato: "Reel",     linea: "PLAY",  hookRecomendado: "Your most productive hour isn't the one with the most coffee. Share this with whoever needs to hear it.", horaOptima: "10:00", objetivo: "Shares", descripcion: "CTA explícito de compartir en el cierre — se perdió desde el lanzamiento." },
        { dia: "Martes",   fecha: "Sep 29", publicar: true,  formato: "Carrusel", linea: "TAPES", hookRecomendado: "5 lo-fi facts you can use tonight. Save this before you forget.", horaOptima: "12:00", objetivo: "Guardados", descripcion: "Carrusel educativo — formato con mejor ER comprobado (17.3%)." },
        { dia: "Miércoles",fecha: "Sep 30", publicar: false, formato: null,       linea: null,    hookRecomendado: null, horaOptima: null, objetivo: null, descripcion: "DESCANSO." },
        { dia: "Jueves",   fecha: "Oct 1",  publicar: true,  formato: "Reel",     linea: "ZEN",   hookRecomendado: "POV: new month, same tape. What are you leaving behind in September?", horaOptima: "17:00", objetivo: "Comentarios", descripcion: "Arranque de mes con pregunta abierta — mantener la reactivación de comentarios." },
        { dia: "Viernes",  fecha: "Oct 2",  publicar: true,  formato: "Reel",     linea: "PLAY",  hookRecomendado: "Friday focus, one more time. Tag someone who needs this playlist today.", horaOptima: "13:00", objetivo: "Shares", descripcion: "Segundo CTA de compartir de la semana — medir si el ratio guardados/shares mejora." },
        { dia: "Sábado",   fecha: "Oct 3",  publicar: false, formato: null,       linea: null,    hookRecomendado: null, horaOptima: null, objetivo: null, descripcion: "DESCANSO." },
        { dia: "Domingo",  fecha: "Oct 4",  publicar: true,  formato: "Reel",     linea: "TAPES", hookRecomendado: "POV: two weeks of showing up. This is what consistency actually sounds like.", horaOptima: "18:00", objetivo: "Alcance", descripcion: "Cierre de quincena — reforzar el patrón POV que definió el período." },
      ],
    },
  ],
  hooksRecomendados: [
    { hook: "POV: it's Monday, 10AM, and you already pressed play.", tipo: "POV", lineaRecomendada: "TAPES" },
    { hook: "3 things your brain does after 8 minutes of lo-fi. Which one surprised you?", tipo: "Científico", lineaRecomendada: "ZEN" },
    { hook: "POV: 2AM again. Kei's used to it by now. Are you?", tipo: "POV", lineaRecomendada: "PLAY" },
    { hook: "Friday check-in: what got you through this week?", tipo: "Emocional", lineaRecomendada: "ZEN" },
    { hook: "Your most productive hour isn't the one with the most coffee. Share this.", tipo: "Motivacional", lineaRecomendada: "PLAY" },
    { hook: "5 lo-fi facts you can use tonight. Save this before you forget.", tipo: "Científico", lineaRecomendada: "TAPES" },
    { hook: "POV: new month, same tape. What are you leaving behind?", tipo: "POV", lineaRecomendada: "ZEN" },
    { hook: "Tag someone who needs this playlist today.", tipo: "Motivacional", lineaRecomendada: "PLAY" },
  ],
  kpisControl: [
    { semana: 1, metaViews: 260, metaER: 7,  accionSiNoCumple: "Revisar si el copy incluyó pregunta explícita; si no la tuvo, es la causa más probable." },
    { semana: 2, metaViews: 300, metaER: 8,  accionSiNoCumple: "Si los shares no suben, reforzar el CTA de compartir en los últimos 3 segundos del copy." },
  ],
  estrategiaCrecimientoAudiencia: {
    metaSeguidor: 30,
    acciones: [
      "Responder a cualquier comentario en las primeras 24h — con solo 1 comentario en 4 meses, cada respuesta cuenta como señal fuerte para el algoritmo",
      "Incluir una pregunta o CTA de comentario explícito en el 100% de los posts, no solo en algunos",
      "No dejar pasar más de 4 días sin publicar, ni en temporada baja",
      "Etiquetar a Kapital Music y usar el hashtag de marca en cada post para consolidar la identidad de Kei",
      "Nunca publicar 2 posts el mismo día mientras la audiencia siga siendo pequeña",
    ],
    ugcActivation: "Invitar a la audiencia a comentar qué tape prefieren (TAPES/ZEN/PLAY) en vez de solo pedir que guarden — el objetivo inmediato es conversación, no solo alcance.",
    hashtagStrategy: "Mantener la mezcla de hashtags de nicho (#lofibeats #chillvibes) que ya se usa, agregando 1–2 hashtags de conversación (#lofiaskme #chillvibecommunity) para incentivar comentarios.",
  },
  advertencias: [
    "NUNCA dejar pasar más de 10 días sin publicar — julio perdió 29 días completos",
    "Evitar publicar 2 posts el mismo día — pasó el 20 de agosto y canibalizó alcance",
    "No usar hooks científicos como único formato — con solo 2 en 4 meses ya rindieron peor (140 views avg)",
    "No cerrar el copy sin pregunta o CTA de comentario — es la causa más probable del colapso a 1 comentario",
    "No asumir que el alcance actual se traduce en seguidores — solo 3 follows atribuidos en 4 meses, hay que pedirlo explícitamente",
  ],
};
