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

  let isHovering = false;
  let rafId = 0;
  let targetX = nav.clientWidth / 2;
  let targetY = nav.clientHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const updateGlow = () => {
    const easing = isHovering ? 0.11 : 0.055;
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    nav.style.setProperty("--mouse-x", `${currentX.toFixed(2)}px`);
    nav.style.setProperty("--mouse-y", `${currentY.toFixed(2)}px`);

    const delta = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
    if (delta > 0.3) {
      rafId = window.requestAnimationFrame(updateGlow);
      return;
    }

    rafId = 0;
  };

  const startGlowLoop = () => {
    if (rafId) {
      return;
    }
    rafId = window.requestAnimationFrame(updateGlow);
  };

  const recenterTarget = () => {
    targetX = nav.clientWidth / 2;
    targetY = nav.clientHeight / 2;
  };

  recenterTarget();
  startGlowLoop();

  nav.addEventListener("pointermove", (event) => {
    const rect = nav.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
    isHovering = true;
    startGlowLoop();
  });

  nav.addEventListener("pointerenter", () => {
    isHovering = true;
    startGlowLoop();
  });

  nav.addEventListener("pointerleave", () => {
    isHovering = false;
    recenterTarget();
    startGlowLoop();
  });

  window.addEventListener("resize", () => {
    if (!isHovering) {
      recenterTarget();
      startGlowLoop();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initOrderButtons();
  initReveal();
  initMobileMenu();
  initHeaderMotion();
});
