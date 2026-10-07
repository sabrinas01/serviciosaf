# PRD completo

Versión del 6 de octubre de 2026. Donde difiere de lo anterior en esta página, esta versión refleja lo acordado en esa fecha. Estado: en definición.

## 1. El "Por qué" (Contexto, visión y objetivos)

- **Producto:** landing page para ofrecer mis servicios como analista funcional freelance (Bitacora IT), con el proceso de trabajo, los servicios y mi experiencia, y un único camino de contacto: agendar una reunión.
- **Problema:** hoy Instagram es mi único canal de contacto. No tengo una página que ayude a quien me conoce por redes a decidir contactarme.
- **Objetivo:** que cualquier persona que llegue desde una red social entienda la oferta, y que la página la ayude a decidir agendar una reunión conmigo.
- **Urgencia:** la fecha del 15 de octubre de 2026 es una meta propia, sin evento externo detrás. Está ligada a dar de baja la landing de Lovable y reconstruirla desde un repo propio con el contenido traído de Lovable. El repo ya está armado.
- **Antecedentes:**
  - Feedback cualitativo de 7 personas de mi entorno sobre la propuesta de valor (doc "Onboarding Sabri").
  - 14 solicitudes cargadas entre el 9 y el 13 de agosto de 2026 en Solicitudes de funciones, sobre la versión de Lovable.
  - Hallazgos del feedback: el mensaje no se entendió de primeras; hay que definir si apunto a startups formales o informales; las empresas chicas pueden temerle al presupuesto; piden más información sobre mí y mis proyectos; no está claro cómo consigo clientes; algunos creen que buscan un equipo completo de desarrollo y no a una sola persona.

### Servicios

Los tres servicios se pueden contratar por separado o en el paquete completo.

**Los precios y el valor hora no se muestran en la landing ni se guardan en este repo, que es público** (regla definida por Sabri). Están solo en el Lean PRD de Notion, para uso interno.

| Servicio | Duración | Horas |
| --- | --- | --- |
| Diagnóstico funcional | 2 a 3 días | 18 |
| Documentación básica | 1 a 2 semanas por sprint o módulo | 30 |
| Documentación complementaria | 2 a 4 semanas | 37 |
| **Total** | **4 a 6 semanas** | **85** |

## 2. El "Para quién" (Público objetivo)

- **Público de la oferta:** startups de software de 1 a 3 años que ya tienen un producto desarrollado, con documentación inexistente o desactualizada, requisitos ambiguos y conocimiento del producto concentrado en pocas personas.
- **Quién decide contratarme:** founder, CTO o RRHH, o ellos mismos.
- **Cómo llegan:** desde cualquier red social, a través del enlace a la landing.
- **Caso de uso:** un founder, CTO o persona de RRHH llega desde una red social con mi link, recorre la landing y decide si me contacta agendando una reunión.

## 3. El "Qué" (Alcance, funciones y limitaciones)

### Alcance del MVP (todo entra para el 15 de octubre)

1. Servicios.
2. Experiencia profesional.
3. Sobre mí.
4. Propuesta de valor.
5. Enlaces a mis redes sociales.
6. Botón que abre mi página de citas de Notion Calendar: calendar.notion.so/meet/sabrysanscaadas/bitacorait. Es el único canal de contacto.
7. Política de privacidad y almacenamiento de datos.
8. Medición con GA4 y Microsoft Clarity.

### Fuera de alcance

- Formulario de contacto (el contacto es solo el botón de agenda).
- Dominio propio (por ahora).
- Multilenguaje (queda para la versión 2).
- Testimonios y casos de éxito (para después).
- Blog (para eso uso Instagram).
- Quiz o diagnóstico previo.
- Precios de los servicios (regla definida por Sabri: no van en la landing).

### Limitaciones

- Claude Code con plan pago y despliegue en GitHub Actions con plan gratuito.
- Sin dominio propio en esta etapa.

### Reglas y riesgos de datos

- Al no haber formulario, la landing no guarda datos de contacto. Por eso el riesgo RN-003 (exposición de datos del formulario) no aplica a la nueva versión, siempre que se mantenga así.
- La política de privacidad debe contemplar la recolección de datos por GA4 y Clarity.

## 4. Requisitos no funcionales

- **Rendimiento:** carga rápida. Valores confirmados: LCP de 2,5 s o menos, INP de 200 ms o menos y CLS de 0,1 o menos, medidos en el percentil 75 de usuarios reales.
- **Usabilidad y compatibilidad:** se ve bien en celulares, en orientación horizontal y vertical.
- **Accesibilidad:** que sea accesible. Nivel confirmado: AA de WCAG 2.1.
- **Medición:** poder medir las visitas y filtrar los bots. GA4 excluye automáticamente solo los bots conocidos, y Clarity detecta y excluye bots por defecto de su panel, mapas de calor y grabaciones. Ninguno garantiza eliminar todo el tráfico automatizado, por lo que se revisa el panel de Clarity.

## 5. Métricas de éxito (primera etapa)

- **Visitas:** al menos 3 usuarios únicos por día, de lunes a sábado, contados desde el lanzamiento (unas 18 por semana).
- **Conversión:** al menos 1 reunión agendada en el primer mes desde el lanzamiento.
- **Métrica secundaria:** clics en el botón de agenda (evento `clic_agendar_reunion`), para ver cuánta gente llega al botón y no agenda.

## Pendientes y riesgos

- Fecha de lanzamiento confirmada: 15 de octubre de 2026.
- Riesgo de plazo: ocho ítems de alcance en pocos días.
- Sin dominio propio, la landing se comparte con la URL gratuita de la plataforma de despliegue.
- Dar de baja la landing de Lovable recién cuando la nueva esté en línea.
- Evento de clic del botón de agenda: el sitio ya envía `clic_agendar_reunion` a GA4. Falta marcarlo como evento clave en el panel de GA4.

## Fuentes

- Páginas Lean PRD y Elicitación de requisitos del Sitio web Hub (Notion).
- Base Solicitudes de funciones (Notion), 14 solicitudes.
- Doc "Onboarding Sabri" (Google Docs): propuesta de valor, servicios, horas y feedback.
- Documentación de GA4 y Microsoft Clarity sobre filtrado de bots, y especificación de Core Web Vitals (web.dev), consultadas el 6 de octubre de 2026.
- Decisiones acordadas con Sabri en el chat del proyecto Landing Servicios.
