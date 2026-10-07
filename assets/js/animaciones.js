/*
  Animaciones al hacer scroll (design system bitacorait). Ver CLAUDE.md > Animaciones.

  - Todo elemento con data-anim recibe la clase .en-vista cuando entra en pantalla.
  - Los hijos de un data-anim-grupo se animan en cascada (variable --i).
  - Las líneas de la Terminal y los ítems de la Checklist reciben su orden en --n.
  El estado inicial (oculto) solo existe si este script corre (.js-anim en <html>)
  y si el visitante no pidió reducir el movimiento: sin JS, todo se ve completo.
*/
document.documentElement.classList.add("js-anim");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-anim-grupo]").forEach((grupo) => {
    [...grupo.children].forEach((hijo, i) => {
      if (!hijo.hasAttribute("data-anim")) hijo.setAttribute("data-anim", grupo.dataset.animGrupo || "subir");
      hijo.style.setProperty("--i", i);
    });
  });
  document.querySelectorAll('[data-anim="terminal"] .bit-term-line, [data-anim="check"] .bit-check-item').forEach((el) => {
    el.style.setProperty("--n", [...el.parentElement.children].indexOf(el));
  });

  const marcar = (el) => {
    el.classList.add("en-vista");
    /* Terminada la entrada, se quita el retraso de la cascada para que el hover responda enseguida. */
    if (el.style.getPropertyValue("--i")) setTimeout(() => el.style.removeProperty("--i"), 1500);
  };
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-anim]").forEach(marcar);
    return;
  }
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { marcar(e.target); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll("[data-anim]").forEach((el) => observer.observe(el));
});
