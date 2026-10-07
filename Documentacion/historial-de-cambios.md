# Historial de cambios

Registro de los cambios de la landing de servicios de Sabrina Sanso (Bitacora IT), de la versión más nueva a la más vieja. Cada cambio incluye por qué se definió así.

Las versiones son 0.x porque el sitio todavía no está publicado. La 1.0.0 queda reservada para el lanzamiento, previsto para el 15 de octubre de 2026 según el [Lean PRD](LeanPRD.md).

---

## Versión 0.14.0

**Fecha de actualización:** 7 de octubre de 2026

- **El sitio pasa al design system bitacorait** (Manual de Marca v4.1), con el estilo "tech girl ordenada". Reemplaza a Technical Artisan.
  - **Por qué:** decisión de Sabri, para que la landing use la identidad visual de la marca. El primer intento con bitacorait no le gustó; después se actualizó el design system con el estilo "tech girl ordenada" y se volvió a implementar.
- **Tema claro y oscuro automáticos.** El claro es el del manual: fondo gris arena, títulos en verde oscuro y texto gris carbón. El oscuro (PROPUESTA) se aplica si el sistema del visitante está en modo oscuro.
  - **Por qué:** decisión de Sabri. El design system ya trae los dos temas con tokens semánticos que llegan a 4,5:1.
- **Tipografía:** Rubik para todo y Fraunces 500 para los títulos de sección (`h2`), en lugar de Bogart, que no se puede distribuir. Se quitó JetBrains Mono y no se usa tipografía monoespaciada.
  - Fraunces se sirve desde el propio sitio (`assets/fonts/`), con su licencia OFL. Por eso la CSP ahora permite fuentes de `'self'`.
- **Componentes del design system escritos en HTML:**
  - Botones (`bit-btn`), etiquetas, encabezados de sección numerados (01, 02) y tarjetas.
  - El bloque CTA en verde oscuro.
  - Fondo de puntos en secciones alternadas.
  - Checklist para lo que incluye cada etapa.
  - Terminal para el "después" del puente técnico.
  - Se quitaron los corchetes en las esquinas (`tech-border`).
  - **Por qué:** seguir el design system al pie, como pidió Sabri.
- **Cambios de texto menores:**
  - Los botones pasan de mayúsculas a oración: "Charlemos" y "Agendar reunión".
  - El puente técnico tiene título ("El puente técnico") y la Terminal se llama `validar-email.md`.
  - "Trayectoria profesional" pasa a ser un título visible en Fraunces.
- **Animaciones al hacer scroll y al pasar el mouse** (`assets/js/animaciones.js`):
  - Los bloques suben y aparecen en cascada.
  - La raya de los antetítulos numerados crece.
  - Se dibujan el subrayado del "¿Quién sabe qué se rompe?" y el tachado de la frase del "Hoy".
  - La Terminal se tipea línea por línea, con un cursor que parpadea.
  - Los tildes de la checklist se marcan en orden y la flecha del puente fluye.
  - Al pasar el mouse, los botones se levantan, la flecha → avanza y las tarjetas cambian el borde a acento.
  - **Por qué:** pedido de Sabri, para que el sitio sea más atractivo visualmente. Las animaciones refuerzan el estilo "tech girl ordenada": muestran el orden y el "antes y después" en lugar de decorar.
  - Con "reducir movimiento" activado, o sin JavaScript, todo se ve quieto y completo. Ninguna animación dura más de 5 segundos (WCAG 2.2.2).
- **Trayectoria de Sobre Mí:** cada ítem es una grilla de tres columnas (año, punto y tarjeta), con el punto centrado sobre la línea. Antes, en los ítems de la izquierda el año quedaba pegado al punto.
- **Se verificó** con Chrome headless (por el protocolo de depuración) en las 4 páginas, a 1280px y a 390px, en los dos temas: axe-core da 0 violaciones, también con el modal abierto, y no hay scroll horizontal.

## Versión 0.13.0

**Fecha de actualización:** 7 de octubre de 2026

- **El sitio sigue al pie el design system "Technical Artisan"**, del proyecto "Landing page servicios af" en Google Stitch. Los colores, las tipografías y los espaciados ya eran los de ese sistema. Se ajustaron los detalles en los que el sitio se apartaba:
  - **Radio de 4px** en botones, inputs y cards (antes 2px). Los puntos de la trayectoria ahora son círculos.
  - **Sin sombras:** se quitaron los brillos verdes y la sombra de las cards al pasar el mouse. La profundidad se marca solo con capas de color y bordes.
  - **Margen lateral de 20px en celular** (antes 28px en todas las pantallas).
  - **Padding de 28px en las cards.**
  - **"Technical Strike":** la etapa 02 de Servicios y la card "Hoy" de la trayectoria se destacan con un borde superior de 2px en acento, en lugar de un fondo verde.
  - **Listas** con 14px entre ítems.
  - **Chips** de "Solo la etapa 01 · 01 + 02 · Las tres etapas" en mono y mayúscula, con fondo tenue.
  - **Por qué:** que el sitio respete el design system de la marca de punta a punta. Antes se probó implementar el design system "bitacorait" (fondo claro gris arena, Fraunces en los títulos), pero se descartó porque a Sabri no le gustó cómo se veía.
- **Se verificó:** axe-core da 0 violaciones en las 4 páginas, a 1280px y a 390px, sin scroll horizontal.

## Versión 0.12.0

**Fecha de actualización:** 7 de octubre de 2026

- **Detalle de cada etapa en Servicios.** Cada card muestra su plazo junto al número de etapa: 72 hs hábiles para el diagnóstico, 2 semanas para la documentación básica y 4 semanas para la complementaria. También tiene un botón "Ver detalle" que abre un modal con una descripción más larga, qué incluye, el entregable, el plazo, un ejemplo concreto y un botón para agendar la reunión.
  - **Por qué:** resuelve la solicitud "Servicios: cards estáticas sin detalle o interacción". La sugerencia vino del feedback de un usuario. Así el visitante entiende qué recibe en cada etapa y cuánto tarda, sin sobrecargar la página.
  - El botón del modal lleva a la misma agenda de Notion Calendar, que sigue siendo el único canal de contacto. Registra el mismo evento de conversión (`clic_agendar_reunion`) con la etapa en `location`. Un evento nuevo, `clic_ver_detalle_etapa`, muestra qué etapa genera más interés.
  - Se usó el `<dialog>` nativo del navegador: maneja el foco y el cierre con Escape sin librerías ni cambios en la CSP. axe-core da 0 violaciones con el modal abierto, en escritorio y en celular.
- **El menú mobile se cierra con la tecla Escape**, y el foco vuelve al botón del menú.
  - **Por qué:** es lo que espera quien navega con teclado. Surgió de la revisión visual del 7 de octubre.

## Versión 0.11.0

**Fecha de actualización:** 6 de octubre de 2026

- **Migración a Tailwind 4 (4.3.0).** Se hizo con la herramienta oficial `@tailwindcss/upgrade` y después se revisó a mano. Ya no existe `tailwind.config.js`: los tokens de diseño pasaron al bloque `@theme` de `src/tailwind.css`. La compilación usa `@tailwindcss/cli`. Se quitó el plugin `@tailwindcss/container-queries`, porque v4 ya las incluye y el sitio no las usaba.
  - **Por qué:** resuelve las vulnerabilidades de `braces` y `postcss-selector-parser` que quedaron pendientes en la 0.10.0. Ahora `npm audit` da 0 vulnerabilidades.
  - **Por qué 4.3.0 y no la última:** desde la 4.3.1, `@tailwindcss/cli` fija una versión de `@parcel/watcher` que vuelve a traer la vulnerabilidad de `braces`.
- **Se verificó que el sitio se ve igual:** se compararon los estilos calculados de cada elemento de las 4 páginas, en escritorio y en celular, entre la versión con Tailwind 3 y la de Tailwind 4. No cambia ninguna posición, tamaño, color ni tipografía.
  - **Ajustes para lograrlo:** en v4 las utilidades van en una capa de CSS, y el CSS de Material Symbols (que no tiene capa) les ganaba. Por eso los íconos se veían más grandes (24px en lugar de 16px). Los tamaños de los íconos ahora llevan `!` (por ejemplo `text-base!`).
  - El degradado radial del CTA se pasó a la utilidad nativa `bg-radial-[...]`, porque la forma de v3 dejó de funcionar.
  - Se agregaron reglas de compatibilidad para el color de borde por defecto y el cursor de los botones.
  - **Por qué:** igual que en la 0.10.0, el objetivo era cambiar la herramienta sin cambiar cómo se ve el sitio.
- **README:** la sección "Documentación" ahora tiene una tabla con el Lean PRD y el historial de cambios, cada uno con una breve descripción.

## Versión 0.10.0

**Fecha de actualización:** 6 de octubre de 2026

- **Tailwind compilado en lugar del CDN.** El sitio ya no ejecuta el JavaScript de `cdn.tailwindcss.com`: carga un archivo CSS propio (`assets/css/tailwind.css`, 38 KB), generado con Tailwind 3.4.17, la misma versión que servía el CDN. La configuración, que estaba copiada en las 4 páginas, pasó a un solo archivo (`tailwind.config.js`). El workflow compila el CSS antes de cada publicación.
  - **Por qué:** era el riesgo pendiente de la auditoría de seguridad. Si el CDN se veía comprometido o se caía, el sitio quedaba expuesto o sin estilos, y el propio Tailwind advierte que el CDN no es para producción. Además, ahora la página no espera a que un script genere los estilos, lo que ayuda al LCP ≤ 2,5 s que pide el PRD. La CSP quedó más estricta: ya no permite `cdn.tailwindcss.com`.
- **Se verificó que el sitio se ve igual:** se compararon los estilos calculados de cada elemento de las 4 páginas, en escritorio y en celular, entre la versión con CDN y la compilada.
  - Para lograr 0 diferencias se corrigieron 5 elementos con dos tamaños de letra a la vez (el botón "CHARLEMOS" y los años de la trayectoria). También se cambiaron las clases con `&gt;` por `>`, y se compila sin minificar porque el minificador redondeaba los colores con transparencia.
  - **Por qué:** el CDN y el compilado resuelven distinto las clases que se contradicen. El objetivo era cambiar cómo se sirven los estilos sin cambiar cómo se ve el sitio.
  - **Única diferencia, intencional:** la línea vertical de la trayectoria en Sobre Mí ahora queda centrada sobre los puntos. Antes estaba corrida 1px, porque el CSS de la animación anulaba el centrado (`-translate-x-1/2`). El centrado pasó al CSS de la animación.
- **`npm audit` reporta vulnerabilidades en dependencias de Tailwind 3** (`braces`, `postcss-selector-parser`): son de denegación de servicio y solo afectan a la compilación.
  - **Por qué no se corrigieron:** no hay versión corregida dentro de Tailwind 3. Solo procesan nuestros propios HTML y no llegan al sitio publicado. Se resuelven al migrar a Tailwind 4, que cambia el formato de configuración y el CSS base.

## Versión 0.9.0

**Fecha de actualización:** 6 de octubre de 2026

- **Auditoría de seguridad** del sitio, del workflow de despliegue y de la configuración del repo.
  - **Por qué:** el sitio ya está publicado y el repo es público.
- **Nuevas propiedades de GA4 (`G-LJFKG629HC`) y de Clarity (`ytqqzs6u98`)**, creadas desde cero para la URL de GitHub Pages.
  - **Por qué:** decisión de Sabri, para que las métricas arranquen limpias con el sitio nuevo y no se mezclen con las de la landing de Lovable.
- **Content-Security-Policy en las 4 páginas.** Es una lista de los únicos dominios desde los que el sitio puede cargar scripts, estilos, fuentes, imágenes y conexiones. También bloquea formularios, iframes y plugins.
  - **Por qué:** si alguien lograra inyectar un script de otro origen (por ejemplo, si un tercero se viera comprometido), el navegador no lo ejecutaría. Se agregó como `<meta>` porque GitHub Pages no permite configurar cabeceras HTTP. Se probó que no bloquea Tailwind, las fuentes, GA4 ni Clarity.
- **Política de referrer** `strict-origin-when-cross-origin`.
  - **Por qué:** cuando alguien sale del sitio hacia un link externo, el otro sitio solo recibe el dominio y no la ruta completa.
- **Workflow de despliegue reforzado:** las actions quedan fijadas a un commit exacto y pasan a versiones nuevas (sin Node 20). Además, el checkout no guarda credenciales y el job tiene un tiempo máximo.
  - **Por qué:** una etiqueta como `v4` se puede mover para que apunte a otro código, y un commit no. Node 20 está deprecado en GitHub Actions.
- **Lo que ya estaba bien y no se tocó:** todos los links externos tienen `noopener`, no hay recursos sin HTTPS, no hay JavaScript que procese datos del usuario, el HTTPS está forzado en GitHub Pages, y el repo tiene activos el escaneo de secretos y la protección contra subir secretos.

## Versión 0.8.0

**Fecha de actualización:** 6 de octubre de 2026

- **Nueva página de política de privacidad** (`politica-de-privacidad.html`), enlazada desde el footer de todas las páginas. Explica qué recolectan Google Analytics y Microsoft Clarity, para qué se usa, las cookies, los servicios de terceros (Notion Calendar, redes), cómo evitar la medición y los derechos según la Ley 25.326.
  - **Por qué:** el Lean PRD la incluye en el MVP y pide que contemple GA4 y Clarity. Se publicó antes que el sitio para que las visitas no fueran medidas sin aviso.
- **Despliegue automático en GitHub Pages** con GitHub Actions, en cada push a `main`. Solo se publican los archivos del sitio.
  - **Por qué:** el PRD define el despliegue con GitHub Actions en el plan gratuito. La documentación no se publica porque no es parte del sitio.
- **URL del sitio: `https://sabrinas01.github.io/serviciosaf/`.** Reemplazó al dominio provisorio `sabrinasanso.example` en `canonical`, `og:url`, el JSON-LD, `robots.txt` y `sitemap.xml`.
  - **Por qué:** el PRD deja el dominio propio para más adelante. Con el dominio provisorio, la URL canónica apuntaba a una dirección inexistente y los buscadores no indexaban bien las páginas.
- **Se quitaron del repo los precios y el valor hora del Lean PRD.** Quedan solo en el Lean PRD de Notion.
  - **Por qué:** GitHub Pages gratis requiere que el repo sea público, y los precios son información interna (regla de Sabri: no se muestran en la landing).
- **README actualizado:** describe las 4 páginas, el despliegue y la URL publicada.
  - **Por qué:** todavía describía la landing de una sola página, y con el repo público es lo primero que ve quien entra.

## Versión 0.7.0

**Fecha de actualización:** 6 de octubre de 2026

- **Botones de redes sociales debajo de la bio de Sobre Mí:** LinkedIn, Instagram (@bitacorait), GitHub y Email, con ícono y el evento `clic_rrss`, que indica qué red se tocó.
  - **Por qué:** pedido de Sabri. El feedback del PRD pedía más información sobre ella, y las redes muestran su trabajo y su contenido. Hasta ahora solo aparecían en el footer, al final de la página. Para los lectores de pantalla, cada link avisa que se abre en una pestaña nueva.
- **Auditoría de accesibilidad de Sobre Mí** con axe-core. El resultado: 0 violaciones de WCAG 2.1 AA en las 3 páginas.
  - **Por qué:** el Lean PRD exige el nivel AA de WCAG 2.1.
- **Jerarquía de títulos en Sobre Mí.** "Trayectoria profesional" pasó a ser un `h2` (se ve igual que antes), y los títulos de las cards pasaron de `h4` a `h3`.
  - **Por qué:** la página saltaba de `h1` a `h4`. Quien navega con lector de pantalla recorre la página por títulos, y un salto así hace pensar que falta contenido (criterio 1.3.1).
- **La trayectoria se anuncia como una lista de 4 etapas.**
  - **Por qué:** así el lector de pantalla dice cuántas etapas hay y en cuál está la persona (criterio 1.3.1).
- **Las animaciones de la card "Hoy" se detienen solas:** el cohete late 3 veces y el punto de "Aceptando nuevos clientes", 2.
  - **Por qué:** antes se repetían para siempre. El criterio 2.2.2 pide que el movimiento automático que dura más de 5 segundos se pueda pausar o se detenga solo.
- **Respeto por la preferencia de movimiento reducido** del sistema operativo: si la persona la tiene activada, las secciones y la trayectoria aparecen sin animación.
  - **Por qué:** a algunas personas los desplazamientos en pantalla les causan mareo. Además, si la animación no corría, la trayectoria quedaba invisible.
- **En las 3 páginas** (son partes compartidas):
  - Un link "Saltar al contenido", que aparece al presionar Tab, y la etiqueta `<main>` para el contenido principal.
    - **Por qué:** quien navega con teclado no tiene que recorrer todo el menú en cada página (criterio 2.4.1).
  - Contorno de foco visible en links y botones.
    - **Por qué:** quien navega con teclado tiene que ver dónde está parado (criterio 2.4.7).
  - Los íconos se marcaron como decorativos.
    - **Por qué:** el lector de pantalla leía sus nombres internos, como "rocket_launch" o "location_on".
  - Las flechas de los links (→) también se marcaron como decorativas.
    - **Por qué:** el lector de pantalla las anunciaba como "flecha derecha".
  - El link "Email" del footer ahora dice "Email: enviar correo electrónico a Sabrina Sanso" para los lectores de pantalla.
    - **Por qué:** quien usa control por voz dice lo que ve ("Email"), y ese texto tiene que estar en el nombre del link (criterio 2.5.3).
- **El contraste de colores ya cumplía AA.** El par más bajo da 7,19:1 y el mínimo es 4,5:1, así que no se cambió ningún color.

## Versión 0.6.0

**Fecha de actualización:** 6 de octubre de 2026

- **Se sacó el quiz de diagnóstico del CTA** en Inicio y Servicios, junto con su script y el evento `diagnostico_completado`.
  - **Por qué:** el Lean PRD deja el "quiz o diagnóstico previo" fuera de alcance. El objetivo de la landing es que la persona agende una reunión, no que complete un paso intermedio.
- **El CTA ahora lleva a la agenda de Notion Calendar.** Dice "¿Tu equipo necesita esto? Charlemos." y tiene un botón "AGENDAR REUNIÓN" que abre `calendar.notion.so/meet/sabrysanscaadas/bitacorait` en otra pestaña.
  - **Por qué:** según el PRD, la agenda es el único canal de contacto. Además, agendar directamente evita el paso extra del formulario y el problema del Google Form, que pedía iniciar sesión con Google.
- **Se sacó todo lo relacionado con el Google Form:** el botón "COMPLETAR FORMULARIO", los eventos `clic_completar_formulario` y `form_submit`, y el script que detectaba la vuelta desde el formulario (`?formulario_enviado=1`).
  - **Por qué:** sin formulario, ese código ya no tiene uso. El evento `form_submit` además se disparaba al hacer clic y no al enviar, así que inflaba la conversión en GA4. Al no haber formulario, la landing no guarda datos de contacto, y el riesgo RN-003 (exposición de datos del formulario) deja de aplicar.
- **Nuevo evento de GA4: `clic_agendar_reunion`.**
  - **Por qué:** es la métrica secundaria del PRD. Sirve para ver cuánta gente llega al botón de agenda y no agenda. Falta marcarlo como evento clave en el panel de GA4, cuando el sitio esté publicado.
- **El ícono del botón de agenda se marcó como decorativo** (`aria-hidden="true"`).
  - **Por qué:** sin eso, un lector de pantalla leía el nombre interno del ícono ("calendar_month"). El PRD pide accesibilidad AA de WCAG 2.1.
- **Se unificó el público como startups de 1 a 3 años.** El sitio ya lo decía así; se corrigió el PRD, que decía "0 a 3".
  - **Por qué:** decisión de Sabri, para que el mensaje sea el mismo en todos los documentos.
- **Regla nueva: los precios no se muestran en la landing.** Quedó escrita en el PRD y en `CLAUDE.md`. Los precios del PRD son de uso interno.
  - **Por qué:** regla definida por Sabri.
- **Se actualizó la documentación:** `CLAUDE.md` tiene las reglas fijas (contacto solo por agenda, sin precios, 1 a 3 años) y los eventos actuales. En Notion, se reescribió la HU-A con lo que muestra el sitio hoy.
  - **Por qué:** la HU-A todavía describía la landing de Lovable (una sola página, precios, 4 pasos y formulario), y la documentación tiene que coincidir con el sitio.

## Versión 0.5.0

**Fecha de actualización:** 6 de octubre de 2026

- **Menú mobile en las 3 páginas.** Un botón de menú abre los links a Inicio, Servicios y Sobre Mí y el botón "Charlemos". El menú marca la página actual y se cierra al tocar un link. Los clics envían los mismos eventos que el menú de escritorio, con `location: menu_mobile`.
  - **Por qué:** en celular la navegación estaba oculta y no había forma de llegar a Servicios ni a Sobre Mí. Los visitantes llegan desde redes sociales, y el PRD pide que el sitio se vea bien en celulares.
- **Card "Hoy" al final de la trayectoria profesional**, con "Aceptando nuevos clientes", el título "Analista Funcional freelance" y un link "Charlemos →" (evento `clic_timeline_charlemos`).
  - **Por qué:** la trayectoria terminaba en "2023 - 2025" sin decir qué hacés hoy ni si estás disponible. El feedback pedía cerrar la historia con el estado actual.
- **Correcciones en la trayectoria:** en mobile se ven los rangos de años completos (antes solo el año de inicio), y se corrigieron las tildes de "Inicié" y "terminé".
  - **Por qué:** el texto de mobile no coincidía con el de escritorio, y había errores de ortografía.
- **Se agregó el Lean PRD** en `Documentacion/LeanPRD.md`.
  - **Por qué:** para dejar por escrito el alcance, el público, las reglas y las métricas del MVP antes del lanzamiento.

## Versión 0.4.0

**Fecha de actualización:** 6 de octubre de 2026

- **Servicios unificado en una sola sección.** Se sacó la columna "cómo trabajo" con 4 pasos (Relevo, Documento, Identifico, Entrego). Quedaron 3 etapas en fila; cada una dice qué se hace, sus puntos clave y su entregable. Arriba se aclara que se contratan por separado o juntas.
  - **Por qué:** dos solicitudes del feedback. El texto decía "tres etapas" pero se mostraban 4 pasos, y las secciones "cómo trabajo" y "Servicios" contaban lo mismo con nombres distintos. El paso "Entrego" quedó repartido en el entregable de cada etapa.
- **Nuevo hero en Inicio.**
  - Arriba del título se agregó "Analista Funcional IT · +4 años en equipos de producto".
  - El párrafo quedó en una sola oración, y las 3 columnas de texto pasaron a 3 líneas cortas con íconos.
  - Se sumó la foto con la etiqueta "AF técnica · Scrum Master" (solo en escritorio) y el link "Ver cómo trabajo →" (evento `clic_hero_servicios`).
  - **Por qué:** según el feedback, el hero era un bloque de texto denso, sin elemento visual, que no mostraba el perfil ni los años de experiencia. La foto también responde a otro pedido del feedback: más información sobre quién ofrece el servicio.
- **CTA con un quiz de diagnóstico de 3 preguntas** en Inicio y Servicios. Sacado en la versión 0.6.0.
  - **Por qué:** el feedback decía que el CTA anterior ("¿Tu equipo necesita esto? Dejame tu mail.") no ayudaba a quien todavía no sabe si necesita el servicio. Además, el título pedía un mail pero el botón llevaba a un formulario.
- **Sobre Mí sin CTA propio.** El botón "Charlemos" del header de esa página lleva al CTA de Inicio.
  - **Por qué:** decisión de Sabri. Sobre Mí queda como página de presentación y trayectoria.
- **Se agregó `CLAUDE.md`**, con la estructura del sitio, los tokens de diseño, la analítica y las convenciones.
  - **Por qué:** el sitio no tiene plantillas, y el header, el footer y el CTA están copiados en cada página. Hacía falta dejar por escrito qué hay que cambiar en las 3 páginas cada vez que se toca una parte compartida.

## Versión 0.3.0

**Fecha de actualización:** 12 de septiembre de 2026

- **La landing se dividió en 3 páginas:** Inicio (`index.html`), Servicios (`servicios.html`) y Sobre Mí (`sobre-mi.html`), y se agregaron las páginas nuevas al `sitemap.xml`.
  - **Por qué:** para separar la propuesta de valor, el detalle de los servicios y la presentación personal, en lugar de tener todo en una sola página larga.

## Versión 0.2.0

**Fecha de actualización:** 6 de septiembre de 2026

- **Migración a HTML estático.** Se sacó el proyecto de Lovable (TanStack Start, React, Vite y componentes de UI) y el sitio quedó como HTML con Tailwind por CDN, sin build ni dependencias. La foto, `robots.txt` y `sitemap.xml` pasaron a la raíz.
  - **Por qué:** el objetivo del PRD es dar de baja la landing de Lovable y mantenerla desde un repo propio. Para una landing de pocas páginas, HTML estático es más simple de mantener y de desplegar con GitHub Actions en el plan gratuito.
- **Se ajustó el margen de scroll de las secciones** y se actualizaron los links de navegación.
  - **Por qué:** al navegar a una sección, el header fijo tapaba el título.
- **Se integraron Google Analytics 4 y Microsoft Clarity.**
  - **Por qué:** el PRD pide medir visitas y comportamiento. Clarity aporta los mapas de calor y las grabaciones, y ayuda a filtrar bots.

## Versión 0.1.0

**Fecha de actualización:** 5 de septiembre de 2026

- **Primera versión del repo:** exportación del diseño de la landing desde Stitch (variante con línea de tiempo) e importación del proyecto de Lovable.
  - **Por qué:** para tener en un repo propio el diseño y el contenido que existían en Lovable, como base para reconstruir la landing.
