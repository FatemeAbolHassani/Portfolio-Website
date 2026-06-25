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

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll("#projects .project-card");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const activeFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(/\s+/);
        const shouldShow = activeFilter === "all" || tags.includes(activeFilter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", setupProjectFilters);
