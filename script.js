// Change this value if the business WhatsApp number is updated.
const WA_PHONE = "905319612520";

const GENERAL_WA_MESSAGE = "Merhaba! Sweety Vaffel sitesinden geliyorum. Bilgi almak istiyorum.";

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

function initGeneralWhatsAppLinks() {
  const generalLinks = document.querySelectorAll("[data-wa-general]");
  const url = buildWhatsAppUrl(GENERAL_WA_MESSAGE);

  generalLinks.forEach((link) => {
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer noopener");
  });
}

function initOrderButtons() {
  const orderButtons = document.querySelectorAll(".order-btn[data-order-item]");

  orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-order-item") || "ürün";
      const message = `Merhaba! Sweety Vaffel sitesinden geliyorum. ${itemName} sipariş vermek istiyorum.`;
      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initMobileMenu() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("menu-open", !isExpanded);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGeneralWhatsAppLinks();
  initOrderButtons();
  initRevealAnimations();
  initMobileMenu();
});
