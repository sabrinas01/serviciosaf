# CLAUDE.md

Sitio de marketing de los servicios de análisis funcional y documentación de software de Sabrina Sanso, orientado a startups de software de 1 a 3 años. Todo el texto está en **español rioplatense** con voseo ("reconocés", "Dejame", "charlemos"). Mantené esa voz en cualquier texto nuevo.

El alcance y las decisiones de producto están en [Documentacion/LeanPRD.md](Documentacion/LeanPRD.md). Reglas fijas, definidas por Sabri:

- **El único canal de contacto es el botón de agenda de Notion Calendar.** No hay formulario de contacto ni quiz o diagnóstico previo.
- **Los precios de los servicios no se muestran en la landing.**
- El público se describe siempre como startups de software de **1 a 3 años**.

## Stack

- HTML estático, sin framework y sin tests. El único paso de build es compilar el CSS de Tailwind.
- **Tailwind 4.3.0 compilado** con `@tailwindcss/cli` (no el CDN). No hay `tailwind.config.js`: la configuración está en `src/tailwind.css` (única fuente), con los tokens en el bloque `@theme`. La salida es `assets/css/tailwind.css`, que cada página enlaza con un `<link>`. El único plugin es `@tailwindcss/forms`; las container queries ya vienen incluidas en v4.
  - Las versiones están fijadas en 4.3.0 a propósito: desde la 4.3.1, `@tailwindcss/cli` depende de una versión de `@parcel/watcher` que arrastra una vulnerabilidad de `braces`. Antes de subir de versión, corré `npm audit`.
  - En v4 las utilidades van dentro de `@layer utilities`, y cualquier CSS sin capa les gana. Por eso los íconos de Material Symbols (cuyo CSS de Google Fonts fija `font-size: 24px` sin capa) llevan los tamaños con `!`: `text-base!`, `text-sm!`. Lo mismo pasa con las reglas del `<style>` de cada página.
  - `src/tailwind.css` tiene reglas de compatibilidad con v3 (color de borde por defecto y `cursor: pointer` en botones).
  - **Después de agregar o cambiar clases en un HTML, corré `npm run build:css`** (o `npm run watch:css` mientras editás). Si no, la clase nueva no tiene estilo en local. El workflow vuelve a compilar antes de publicar, así que lo publicado nunca queda desactualizado.
  - Commiteá también `assets/css/tailwind.css`, para que el sitio se pueda ver en local sin instalar nada.
  - El CSS se compila **sin `--minify`**: el minificador convertía los colores con transparencia (por ejemplo `bg-surface/90`) a `hsla()` y los redondeaba. GitHub Pages ya los comprime al enviarlos.
  - No pongas dos utilidades que pisan la misma propiedad en el mismo elemento (por ejemplo `text-ui-action` y `text-base`): el CSS compilado decide cuál gana por el orden de las reglas, no por el orden de las clases en el HTML.
  - Dentro de `class`, escribí los caracteres tal cual y no como entidades HTML: `before:content-['>']`, nunca `content-['&gt;']`. El compilador lee el texto del archivo y no reconoce la entidad.
- Las fuentes son Rubik y Material Symbols Outlined (íconos), que vienen de Google Fonts, y Fraunces (los `h2`), que se sirve desde `assets/fonts/`.
- Para verlo localmente: `npm install` (una sola vez), `npm run build:css`, y servir la carpeta con un servidor estático, por ejemplo `npx serve .`.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Inicio: hero con foto, problemas frecuentes "lo que suele pasar" (01–06), "el puente técnico" antes/después, CTA |
| `servicios.html` | Sección `#servicios`: 3 etapas contratables por separado (Diagnóstico funcional, Documentación básica, Documentación complementaria), cada una con su plazo (72 hs hábiles, 2 y 4 semanas), su entregable y un botón "Ver detalle" que abre un modal (`<dialog>` nativo) con descripción, qué incluye, ejemplo y CTA a la agenda. CTA |
| `politica-de-privacidad.html` | Política de privacidad (qué recolectan GA4 y Clarity, cookies, terceros, derechos según la Ley 25.326). Se enlaza desde el footer de todas las páginas. Sin JSON-LD ni CTA |
| `sobre-mi.html` | Bio en `#sobre-mi` con `assets/perfil-sabrina.png`, línea de tiempo profesional en `#timeline-section` (2021–2025, más una card destacada "Hoy"). Sin CTA |

Las páginas se enlazan entre sí con rutas relativas a los `.html`. Inicio y Servicios tienen su propia sección CTA `#contacto`, y el botón "Charlemos" del header apunta ahí.

## El código compartido está duplicado, no hay plantillas

No hay includes ni parciales. Cada página tiene su propia copia completa de:

- el `<head>` (GA4, Microsoft Clarity, meta SEO, JSON-LD, fuentes, el `<link>` al CSS de Tailwind, `<style>` propio y los scripts de animación al scroll y de tracking)
- el header con la navegación
- el bloque CTA `#contacto` (solo en index y servicios)
- el footer

**Cualquier cambio en una parte compartida hay que hacerlo en los tres archivos.** Lo que cambia entre páginas es:

- `<title>`, description, keywords, `og:*`, `twitter:*` y `canonical`.
- La navegación: el link de la página actual lleva `class="text-secondary ..."` y `aria-current="page"`, y los demás llevan las clases `text-on-surface-variant hover:text-secondary`.
- `sobre-mi.html` agrega CSS propio (`.timeline-line-anim`, `.timeline-item*`) y una animación escalonada de la línea de tiempo dentro de su IntersectionObserver.
- Inicio, Servicios y Sobre Mí repiten el mismo bloque JSON-LD; la política de privacidad no lo tiene.
- La política de privacidad no marca ningún link del nav como activo, y su botón "Charlemos" apunta a `index.html#contacto`. En el footer, su link "Privacidad" lleva `aria-current="page"`.

**Si agregás o cambiás qué datos se recolectan** (una herramienta de medición nueva, un formulario, cookies nuevas), actualizá `politica-de-privacidad.html` y su fecha de "Última actualización".

La navegación de escritorio es `hidden md:flex`. En mobile hay un botón hamburguesa (`[data-menu-toggle]`) que abre `#menu-mobile`, un nav con los mismos links y el botón "Charlemos", más un script inline al final del `<header>` (abre y cierra con el botón, al tocar un link y con Escape, que devuelve el foco al botón). Si cambiás un link del nav, cambialo también en `#menu-mobile`.

## Design system

El sitio sigue el design system **bitacorait** (Manual de Marca v4.1): <https://claude.ai/artifact/8zRe5meUXCZdBrxcnYjuP2>. Sus tokens están en `src/tailwind.css`; si cambia algo en el design system, cambialo ahí. Los valores marcados PROPUESTA no están en el manual.

- **Temas:**
  - Hay dos: claro (el del manual, fondo gris arena) y oscuro (PROPUESTA, fondo gris carbón). Se elige solo según el `prefers-color-scheme` del visitante; no hay botón ni clase `dark`.
  - Los colores semánticos son variables CSS que cambian con el tema: `fondo`, `fondo-elevado`, `titulo`, `texto`, `texto-suave`, `acento`, `on-acento`, `primario`, `on-primario`, `borde`, `foco` y `grilla`. Usá siempre estos.
  - Los colores de marca (`gris-arena`, `verde-oscuro`, `verde-azulado`, `gris-carbon`, `verde-claro`) van solo dentro de bloques que se ven igual en los dos temas: el CTA y la Terminal.
- **Contraste:** en el tema claro, `acento` da 3,37:1 sobre `fondo`. No lo uses para texto chico: solo para títulos de 24px o más, íconos, bordes o fondo de botón.
- **Tipografía:**
  - Rubik para todo y **Fraunces** (500) para los `h2`, con `font-fraunces text-h2`. Sin tipografía monoespaciada.
  - Estilos: `text-h1` (Rubik Bold 40px), `text-h2`, `text-body`, `text-small` y `text-ui` (botones y navegación).
  - Fraunces se sirve desde `assets/fonts/`, con la licencia OFL en `Fraunces-OFL.txt`, y se precarga en el `<head>`.
- **Espaciado:** grilla de 8px con `space-1` a `space-4` (8, 16, 24 y 40px), por ejemplo `gap-space-3` o `px-space-3 md:px-space-4`. El ancho de página es `max-w-max-width` (1040px) y las secciones llevan `py-section-v` (80px).
- **Radios:** `rounded-sm` (4px) en etiquetas, `rounded-md` (8px) en botones y `rounded-lg` (16px) en tarjetas y bloques.
- **Estilo "tech girl ordenada":** el toque tech sale de la estructura visible.
  - Las secciones van numeradas (`01`, `02`) en el antetítulo.
  - Las secciones alternan fondo de puntos (`bit-bg-puntos`) y fondo liso. Nunca va grilla detrás de una `bit-card`.
  - Hay como máximo una Terminal por página.
  - El texto va alineado a la izquierda.

Los componentes del design system son de React. Acá se escriben en HTML con las mismas clases, que están definidas en `@layer components` de `src/tailwind.css`:

| Componente | Clases |
| --- | --- |
| Button | `bit-btn` + `bit-btn-primario` / `-cta` / `-secundario` / `-claro` + `bit-btn-md` / `-lg`. Una sola acción `primario` o `cta` por bloque; `claro` solo dentro del CTA |
| Tag | `bit-tag`, `bit-tag-acento` |
| SectionHeader | `<p class="bit-eyebrow"><span class="bit-num">01</span><span class="bit-eyebrow-rule"></span>texto</p>` + título |
| Card | `bit-card` |
| CtaBlock | `bit-cta`: fondo `verde-oscuro` en los dos temas, con el foco en gris arena |
| Section | `bit-bg-puntos` o `bit-bg-cuadricula` |
| Checklist | `bit-check-title`, `bit-check-list`, `bit-check-item is-done`, `bit-check-box` |
| Terminal | `bit-term`, `bit-term-bar`, `bit-term-dots`, `bit-term-body`, `bit-term-line` + `bit-term-mark` (`$`, `→`, `✓`) |

## Animaciones

`assets/js/animaciones.js` se carga en el `<head>` de las 4 páginas. Le agrega la clase `.en-vista` a cada elemento con `data-anim` cuando entra en pantalla. El CSS de las animaciones está al final de `src/tailwind.css`.

- **Entrada:** `data-anim="subir"` (sube y aparece) o `data-anim="aparecer"` (aparece con una leve escala). En un contenedor con `data-anim-grupo`, sus hijos se animan en cascada.
- **Raya del antetítulo:** la raya de `bit-eyebrow` crece cuando el antetítulo o su contenedor tiene `data-anim`.
- **Dibujos:**
  - `.subrayar` subraya en acento (el "¿Quién sabe qué se rompe?" del hero).
  - `.tachar` tacha el texto (la frase del "Hoy" del puente técnico).
  - Los dos se dibujan de izquierda a derecha.
- **Terminal:** con `data-anim="terminal"`, las líneas se "tipean" una por una. El cursor (`bit-term-cursor`) parpadea 4 veces al final.
- **Checklist:** con `data-anim="check"` (lo pone `checklist()` en las cards y en los modales), las casillas aparecen y se dibuja el tilde, en orden.
- **Flecha del puente:** `.flecha-puente` hace fluir su línea punteada 4 veces.
- **Hover:** los botones `bit-btn` se levantan 1px, la flecha `<span class="flecha">→</span>` avanza 3px y las tarjetas con `hover:border-acento` cambian el borde.

Reglas que hay que mantener:

- Todo el estado inicial oculto está dentro de `@media (prefers-reduced-motion: no-preference)` y depende de la clase `.js-anim`, que pone el script. Con "reducir movimiento" activado, o sin JavaScript, la página se ve quieta y completa.
- Ninguna animación dura más de 5 segundos ni se repite sin fin (criterio 2.2.2).
- Si agregás una sección, marcá sus bloques con `data-anim` o `data-anim-grupo` en lugar de escribir otra animación.

Clases CSS propias del `<style>` de cada página:

- `.reveal`: aparece con un fade y desplazamiento, y recibe `.active` desde un IntersectionObserver. La mayoría de las secciones ya vienen con `reveal active`.
- `.hover-lift`: sube la card 4px al pasar el mouse.

## Accesibilidad

El PRD exige WCAG 2.1 AA. Las 4 páginas pasan axe-core sin violaciones, en los dos temas; mantené estas convenciones:

- Cada página tiene un link "Saltar al contenido" (primer elemento del `<body>`) que apunta a `<main id="contenido">`, que envuelve todo lo que está entre el header y el footer.
- Los íconos de Material Symbols son texto (`rocket_launch`, `calendar_month`), así que llevan `aria-hidden="true"`. Si un ícono es el único contenido de un botón, el botón necesita `aria-label`.
- Las flechas decorativas en los links van como `<span aria-hidden="true">→</span>`.
- Los títulos no saltan niveles: un `h1` por página, después `h2` y `h3`. Los antetítulos (`bit-eyebrow`) son párrafos, no títulos.
- Las animaciones infinitas (`animate-ping`, `animate-pulse`) se limitan con `[animation-iteration-count:N]` para que terminen antes de 5 segundos (criterio 2.2.2), y llevan `motion-reduce:animate-none`.
- El CSS respeta `prefers-reduced-motion`: `.reveal`, `.hover-lift` y la trayectoria se muestran sin transición.
- El foco de teclado es un anillo de 2px en `foco`, separado 2px del elemento (`:focus-visible` en `src/tailwind.css`). Dentro del CTA pasa a gris arena.
- Si un link tiene `aria-label`, este incluye el texto visible (por ejemplo "Email: enviar correo…"), por el criterio 2.5.3.

## Seguridad

- Cada página tiene una **Content-Security-Policy** en un `<meta http-equiv>` al principio del `<head>` (GitHub Pages no permite configurar cabeceras HTTP). Solo permite cargar scripts, estilos, fuentes, imágenes y conexiones del propio sitio y de Google Fonts, GA4 y Clarity.
  - **Si agregás un script, una fuente, un embed o un servicio externo nuevo, sumá su dominio a la CSP de las 4 páginas.** Si no, el navegador lo bloquea en silencio. Para verificarlo, abrí la consola del navegador: cada bloqueo aparece como error "Refused to … because it violates the following Content Security Policy directive".
  - `script-src` y `style-src` permiten `'unsafe-inline'` porque el sitio usa scripts y estilos inline (GA4, Clarity, tracking, menú, animaciones y el `<style>` de cada página). Si se mueven a archivos `.js` y `.css`, se puede quitar y la CSP queda más estricta.
  - `form-action 'none'` y `frame-src 'none'`: el sitio no tiene formularios ni iframes. Si se agrega alguno, hay que habilitarlo en la CSP.
- `<meta name="referrer" content="strict-origin-when-cross-origin">`: a los sitios externos solo les llega el dominio, nunca la ruta completa.
- Todos los links con `target="_blank"` llevan `rel="noopener"`.
- El workflow de despliegue fija cada action a un commit (SHA) con el número de versión en un comentario, y usa permisos mínimos.
- En el repo están activos el escaneo de secretos y la protección contra subir secretos (push protection).

## Analítica

- GA4 (`G-LJFKG629HC`) y Microsoft Clarity (`ytqqzs6u98`) están en el `<head>` de cada página. Si cambia un ID, reemplazalo en las 4 páginas (el de GA4 aparece 2 veces por página).
- El tracking de clics es declarativo. Agregá `data-track="nombre_evento"` a un elemento (o una lista separada por comas para varios eventos), y opcionalmente `data-track-params='{"clave":"valor"}'` (JSON entre comillas simples). Un script inline llama a `gtag("event", …)` al hacer clic.
- Eventos actuales:
  - `clic_nav_seccion` y `clic_header_charlemos` (en el menú mobile llevan además `"location":"menu_mobile"`)
  - `clic_timeline_charlemos` (solo en sobre-mi, card "Hoy")
  - `clic_rrss` con `{ red: linkedin|instagram|github|email, location: sobre_mi_bio }`: botones de redes debajo de la bio de sobre-mi. Las URLs son las mismas del footer; si cambia una, cambiala en los dos lugares.
  - `clic_hero_charlemos` y `clic_hero_servicios` (solo en index)
  - `clic_agendar_reunion`: botón "AGENDAR REUNIÓN" del CTA, que abre `https://calendar.notion.so/meet/sabrysanscaadas/bitacorait` en otra pestaña. Es la métrica de conversión del PRD. Los modales de servicios usan el mismo evento con `location: modal_etapa_01|02|03`.
  - `clic_ver_detalle_etapa` con `{ etapa: 01|02|03 }`: botón "Ver detalle" de cada card de servicios.
- Los modales de servicios son `<dialog>` abiertos con `showModal()`: el navegador ya maneja el foco y el cierre con Escape. Si cambiás el plazo, el entregable o lo que incluye una etapa, cambialo en la card y en su modal.
- El CTA `#contacto` solo está en `index.html` y `servicios.html`. `sobre-mi.html` no tiene, así que su botón "Charlemos" del header y el link de la card "Hoy" apuntan a `index.html#contacto`.

## SEO

- `robots.txt` y `sitemap.xml` listan las cuatro páginas.
- La URL del sitio es `https://sabrinas01.github.io/serviciosaf/` (GitHub Pages, sin dominio propio por ahora según el PRD). Aparece en `canonical`, `og:url`, el JSON-LD, `robots.txt` y `sitemap.xml`. Si se compra un dominio, hay que reemplazarla en todos esos lugares.
- Toda página nueva tiene que agregarse a `sitemap.xml` y tener sus propios meta tags y canonical.

## Despliegue

`.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main` (también se puede correr a mano desde Actions). Instala las dependencias con `npm ci` y compila el CSS de Tailwind. Después copia a `_site/` solo `*.html`, `assets/`, `robots.txt` y `sitemap.xml`: la documentación, `CLAUDE.md` y `.claude/` no se publican. Si agregás una carpeta que el sitio necesita (por ejemplo `css/`), sumala al paso "Preparar archivos del sitio".

El repo es público (GitHub Pages gratis lo requiere): no subas datos internos como precios o valor hora. Están solo en el Lean PRD de Notion. Si necesitás tener un documento interno en la carpeta del proyecto, guardalo en `Documentacion/privado/` o con el nombre `*.privado.md`: el `.gitignore` los excluye.

## Archivos desactualizados

- `.claude/launch.json` corre `npm run dev` en el puerto 8080, pero no existe `package.json`. Quedó del proyecto Lovable/TanStack importado antes y después eliminado (ver el historial del repo privado).

## Git

Se trabaja en `develop` y los PRs van contra `main`. Este repo público arrancó el 6 de octubre de 2026 con un solo commit del estado del sitio. El historial anterior (y el PR #1) está en el repo privado `sabrinas01/serviciosaf-privado`, y está resumido en `Documentacion/historial-de-cambios.md`. Los mensajes de commit usan prefijos convencionales (`feat:`, `fix:`, `refactor:`, `docs:`).

**Los mensajes de commit van siempre en español**, tanto el título como el cuerpo (por ejemplo `feat: agregar menú móvil y mejorar seguimiento de eventos`). Lo mismo vale para las descripciones de PR.
