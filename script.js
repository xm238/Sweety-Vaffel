// Update this value if the business WhatsApp number changes.
const WA_PHONE = "905319612520";

/**
 * Builds a WhatsApp deep-link with encoded message text.
 */
function buildWhatsAppLink(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Sets order links for each menu item card.
 * Required format:
 * https://wa.me/905319612520?text=Merhaba%21%20Sweety%20Vaffel%20sitesinden%20geliyorum.%20[ITEM_NAME]%20sipari%C5%9F%20vermek%20istiyorum.
 */
function initOrderButtons() {
  const orderButtons = document.querySelectorAll(".order-btn[data-item-name]");

  orderButtons.forEach((button) => {
    const itemName = button.getAttribute("data-item-name") || "Urun";
    const message = `Merhaba! Sweety Vaffel sitesinden geliyorum. ${itemName} sipariş vermek istiyorum.`;
    const href = buildWhatsAppLink(message);

    button.setAttribute("href", href);
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noreferrer noopener");
  });
}

/**
 * Scroll reveal animation with IntersectionObserver.
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Mobile navigation toggle.
 */
function initMobileNavigation() {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initOrderButtons();
  initRevealAnimations();
  initMobileNavigation();
});
