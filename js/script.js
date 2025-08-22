// ------- Menú móvil -------
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });
}

// ------- Modo claro/oscuro automático por hora -------
// Regla: claro 07:00–18:59, oscuro 19:00–06:59
function applyTimeTheme() {
  const hour = new Date().getHours();
  const theme = (hour >= 19 || hour < 7) ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  // Opcional: sincroniza color-scheme para inputs nativos
  document.documentElement.style.colorScheme = theme;
}

// Aplica al cargar
applyTimeTheme();

// Si quieres que cambie automáticamente justo al cambiar de hora:
const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;
setTimeout(() => {
  applyTimeTheme();
  // Revisa el tema cada 5 minutos para no estar martillando
  setInterval(applyTimeTheme, 5 * 60 * 1000);
}, msUntilNextMinute);

// ------- Navegación suave a anclas -------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      mobileNav && (mobileNav.hidden = true);
      burger && burger.setAttribute("aria-expanded", "false");
    }
  });
});