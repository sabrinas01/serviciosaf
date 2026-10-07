# CLAUDE.md

Sitio de marketing de los servicios de análisis funcional y documentación de software de Sabrina Sanso, orientado a startups de software de 1 a 3 años. Todo el texto está en **español rioplatense** con voseo ("reconocés", "Dejame", "charlemos"). Mantené esa voz en cualquier texto nuevo.

El alcance y las decisiones de producto están en [Documentacion/LeanPRD.md](Documentacion/LeanPRD.md). Reglas fijas, definidas por Sabri:

- **El único canal de contacto es el botón de agenda de Notion Calendar.** No hay formulario de contacto ni quiz o diagnóstico previo.
- **Los precios de los servicios no se muestran en la landing.**
- El público se describe siempre como startups de software de **1 a 3 años**.

## Stack

- HTML estático puro: sin build, sin `package.json`, sin framework y sin tests.
- Tailwind se carga en tiempo de ejecución desde el Play CDN (`cdn.tailwindcss.com?plugins=forms,container-queries`), y cada página lo configura inline en `<script id="tailwind-config">`.
- Las fuentes vienen de Google Fonts: Rubik (texto y títulos), JetBrains Mono (eyebrows, acciones de UI y datos) y Material Symbols Outlined (íconos).
- Para verlo localmente, abrí una página en el navegador o serví la carpeta con un servidor estático, por ejemplo `npx serve .`.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Inicio: hero con foto, problemas frecuentes "lo que suele pasar" (01–06), "el puente técnico" antes/después, CTA |
| `servicios.html` | Sección `#servicios`: 3 etapas contratables por separado (Diagnóstico funcional, Documentación básica, Documentación complementaria), cada una con su entregable, CTA |
| `politica-de-privacidad.html` | Política de privacidad (qué recolectan GA4 y Clarity, cookies, terceros, derechos según la Ley 25.326). Se enlaza desde el footer de todas las páginas. Sin JSON-LD ni CTA |
| `sobre-mi.html` | Bio en `#sobre-mi` con `assets/perfil-sabrina.png`, línea de tiempo profesional en `#timeline-section` (2021–2025, más una card destacada "Hoy"). Sin CTA |

Las páginas se enlazan entre sí con rutas relativas a los `.html`. Inicio y Servicios tienen su propia sección CTA `#contacto`, y el botón "Charlemos" del header apunta ahí.

## El código compartido está duplicado, no hay plantillas

No hay includes ni parciales. Cada página tiene su propia copia completa de:

- el `<head>` (GA4, Microsoft Clarity, meta SEO, JSON-LD, fuentes, config de Tailwind, `<style>` propio y los scripts de animación al scroll y de tracking)
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

La navegación de escritorio es `hidden md:flex`. En mobile hay un botón hamburguesa (`[data-menu-toggle]`) que abre `#menu-mobile`, un nav con los mismos links y el botón "Charlemos", más un script inline al final del `<header>`. Si cambiás un link del nav, cambialo también en `#menu-mobile`.

## Tokens de diseño

La config de Tailwind define una paleta oscura estilo Material 3 (clase `dark` en `<html>`): `primary`, `secondary` (#8dd4c0, el color de acento), `surface-*`, `on-surface*`, `outline-variant`, `teal-accent`, entre otros. También define pares tipográficos semánticos que se usan juntos, por ejemplo `font-display-h1 text-display-h1`, `font-section-h2 text-section-h2`, `font-mono-eyebrow text-mono-eyebrow`, `font-body-main text-body-main`, `font-body-small`, `font-ui-action`, `font-mono-data` y `font-card-h3`. Los tokens de espaciado incluyen `max-w-max-width` (1080px), `px-margin-page`, `py-section-v-md`/`-lg` y `gap-grid-gap`. Usá estos tokens en lugar de valores arbitrarios.

Clases CSS propias:

- `.reveal`: aparece con un fade y desplazamiento, y recibe `.active` desde un IntersectionObserver. La mayoría de las secciones ya vienen con `reveal active`.
- `.hover-lift`
- `.tech-border`: esquinas en forma de corchete en `#8dd4c0`.

## Accesibilidad

El PRD exige WCAG 2.1 AA. Las 3 páginas pasan axe-core sin violaciones; mantené estas convenciones:

- Cada página tiene un link "Saltar al contenido" (primer elemento del `<body>`) que apunta a `<main id="contenido">`, que envuelve todo lo que está entre el header y el footer.
- Los íconos de Material Symbols son texto (`rocket_launch`, `calendar_month`), así que llevan `aria-hidden="true"`. Si un ícono es el único contenido de un botón, el botón necesita `aria-label`.
- Las flechas decorativas en los links van como `<span aria-hidden="true">→</span>`.
- Los títulos no saltan niveles: un `h1` por página, después `h2` y `h3`. Si un título tiene que verse chico (como "trayectoria profesional"), se le aplican las clases de eyebrow, pero sigue siendo un `h2`.
- Las animaciones infinitas (`animate-ping`, `animate-pulse`) se limitan con `[animation-iteration-count:N]` para que terminen antes de 5 segundos (criterio 2.2.2), y llevan `motion-reduce:animate-none`.
- El CSS respeta `prefers-reduced-motion`: `.reveal`, `.hover-lift` y la trayectoria se muestran sin transición.
- El foco de teclado se ve con un contorno de `#8dd4c0` (`a:focus-visible, button:focus-visible` en el `<style>` de cada página).
- Si un link tiene `aria-label`, este incluye el texto visible (por ejemplo "Email: enviar correo…"), por el criterio 2.5.3.

## Analítica

- GA4 (`G-LJFKG629HC`) y Microsoft Clarity (`xzx7i06ova`) están en el `<head>` de cada página. Si cambia un ID, reemplazalo en las 4 páginas (el de GA4 aparece 2 veces por página).
- El tracking de clics es declarativo. Agregá `data-track="nombre_evento"` a un elemento (o una lista separada por comas para varios eventos), y opcionalmente `data-track-params='{"clave":"valor"}'` (JSON entre comillas simples). Un script inline llama a `gtag("event", …)` al hacer clic.
- Eventos actuales:
  - `clic_nav_seccion` y `clic_header_charlemos` (en el menú mobile llevan además `"location":"menu_mobile"`)
  - `clic_timeline_charlemos` (solo en sobre-mi, card "Hoy")
  - `clic_rrss` con `{ red: linkedin|instagram|github|email, location: sobre_mi_bio }`: botones de redes debajo de la bio de sobre-mi. Las URLs son las mismas del footer; si cambia una, cambiala en los dos lugares.
  - `clic_hero_charlemos` y `clic_hero_servicios` (solo en index)
  - `clic_agendar_reunion`: botón "AGENDAR REUNIÓN" del CTA, que abre `https://calendar.notion.so/meet/sabrysanscaadas/bitacorait` en otra pestaña. Es la métrica de conversión del PRD.
- El CTA `#contacto` solo está en `index.html` y `servicios.html`. `sobre-mi.html` no tiene, así que su botón "Charlemos" del header y el link de la card "Hoy" apuntan a `index.html#contacto`.

## SEO

- `robots.txt` y `sitemap.xml` listan las cuatro páginas.
- La URL del sitio es `https://sabrinas01.github.io/serviciosaf/` (GitHub Pages, sin dominio propio por ahora según el PRD). Aparece en `canonical`, `og:url`, el JSON-LD, `robots.txt` y `sitemap.xml`. Si se compra un dominio, hay que reemplazarla en todos esos lugares.
- Toda página nueva tiene que agregarse a `sitemap.xml` y tener sus propios meta tags y canonical.

## Despliegue

`.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main` (también se puede correr a mano desde Actions). Copia a `_site/` solo `*.html`, `assets/`, `robots.txt` y `sitemap.xml`: la documentación, `CLAUDE.md` y `.claude/` no se publican. Si agregás una carpeta que el sitio necesita (por ejemplo `css/`), sumala al paso "Preparar archivos del sitio".

El repo es público (GitHub Pages gratis lo requiere): no subas datos internos como precios o valor hora. Están solo en el Lean PRD de Notion. Si necesitás tener un documento interno en la carpeta del proyecto, guardalo en `Documentacion/privado/` o con el nombre `*.privado.md`: el `.gitignore` los excluye.

## Archivos desactualizados

- `.claude/launch.json` corre `npm run dev` en el puerto 8080, pero no existe `package.json`. Quedó del proyecto Lovable/TanStack importado antes y después eliminado (ver el historial del repo privado).

## Git

Se trabaja en `develop` y los PRs van contra `main`. Este repo público arrancó el 6 de octubre de 2026 con un solo commit del estado del sitio. El historial anterior (y el PR #1) está en el repo privado `sabrinas01/serviciosaf-privado`, y está resumido en `Documentacion/historial-de-cambios.md`. Los mensajes de commit usan prefijos convencionales (`feat:`, `fix:`, `refactor:`, `docs:`).

**Los mensajes de commit van siempre en español**, tanto el título como el cuerpo (por ejemplo `feat: agregar menú móvil y mejorar seguimiento de eventos`). Lo mismo vale para las descripciones de PR.
