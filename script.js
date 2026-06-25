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

function setupScrollReveal() {
  const revealTargets = document.querySelectorAll(
    "main > .section-band, .project-card, .focus-card, .skill-card, .timeline-list > li, .detail-status-card, .detail-flow, .detail-pipeline, .collaboration-note"
  );

  if (!revealTargets.length) {
    return;
  }

  document.documentElement.classList.add("reveal-enabled");
  revealTargets.forEach((target) => target.classList.add("reveal-on-scroll"));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach((target) => {
    if (target.getBoundingClientRect().top < window.innerHeight * 0.95) {
      target.classList.add("is-visible");
      return;
    }

    observer.observe(target);
  });
}

document.addEventListener("DOMContentLoaded", setupProjectFilters);
document.addEventListener("DOMContentLoaded", setupScrollReveal);
