# Landing de servicios — Sabrina Sanso

Sitio de los servicios de análisis funcional y documentación de software de Sabrina Sanso (Bitácora IT), para startups de software de 1 a 3 años.

**Sitio publicado:** <https://sabrinas01.github.io/serviciosaf/>

Es un sitio estático en HTML con Tailwind compilado. Para verlo en local: `npm install`, `npm run build:css` y servir la carpeta (por ejemplo con `npx serve .`).

## Desarrollo

Serví la carpeta con cualquier servidor estático, por ejemplo:

```sh
npx serve .
```

## Estructura

- `index.html`, `servicios.html`, `sobre-mi.html`: las páginas del sitio.
- `politica-de-privacidad.html`: política de privacidad, que se enlaza desde el footer.
- `assets/`: imágenes.
- `robots.txt` y `sitemap.xml`: SEO.
- `.github/workflows/deploy.yml`: publica en GitHub Pages en cada push a `main`.
- `Documentacion/`: Lean PRD e historial de cambios.

Las convenciones del proyecto (código compartido entre páginas, accesibilidad, analítica y despliegue) están en [CLAUDE.md](CLAUDE.md).
