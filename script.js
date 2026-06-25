function toggleMenu() {
  const menu = document.querySelector("#mobile-menu");
  const button = document.querySelector(".menu-toggle");

  if (!menu || !button) {
    return;
  }

  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  button.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  button.classList.toggle("open", !isOpen);
  menu.hidden = isOpen;
}
