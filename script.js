// Update this value if the business WhatsApp number changes.
const WA_PHONE = "905319612520";

function buildWhatsAppLink(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

function initOrderButtons() {
  const orderButtons = document.querySelectorAll(".order-btn[data-item-name]");

  orderButtons.forEach((button) => {
    const itemName = button.getAttribute("data-item-name") || "Urun";
    const message = `Merhaba! Sweety Vaffel sitesinden geliyorum. ${itemName} sipariş vermek istiyorum.`;

    button.setAttribute("href", buildWhatsAppLink(message));
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noreferrer noopener");
  });
}

function initReveal() {
  const sections = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
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
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("menu-open", !isOpen);
  });
}

function initHeaderMotion() {
  const nav = document.querySelector(".nav");

  if (!nav) {
    return;
  }

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  nav.addEventListener("pointermove", (event) => {
    const rect = nav.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    nav.style.setProperty("--mouse-x", `${x}px`);
    nav.style.setProperty("--mouse-y", `${y}px`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initOrderButtons();
  initReveal();
  initMobileMenu();
  initHeaderMotion();
});
