// main.js (safe version)
// Works even if some elements don't exist on certain pages.

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Mobile menu toggle (safe)
  // ---------------------------
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn ? menuBtn.querySelector("i") : null;

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      if (menuBtnIcon) {
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      }
    });

    navLinks.addEventListener("click", () => {
      navLinks.classList.remove("open");
      if (menuBtnIcon) menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  }

  // ---------------------------
  // ScrollReveal animations (safe)
  // ---------------------------
  const hasScrollReveal = typeof window.ScrollReveal === "function";
  if (hasScrollReveal) {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    // Only reveal if selector exists
    const revealIfExists = (selector, options) => {
      if (document.querySelector(selector)) {
        window.ScrollReveal().reveal(selector, options);
      }
    };

    revealIfExists(".header__image img", { ...scrollRevealOption, origin: "right" });
    revealIfExists(".header__content h1", { ...scrollRevealOption, delay: 500 });
    revealIfExists(".header__content p", { ...scrollRevealOption, delay: 1000 });
    revealIfExists(".header__btns", { ...scrollRevealOption, delay: 1500 });

    revealIfExists(".arrival__card", { ...scrollRevealOption, interval: 500 });

    revealIfExists(".sale__image img", { ...scrollRevealOption, origin: "left" });
    revealIfExists(".sale__content h2", { ...scrollRevealOption, delay: 500 });
    revealIfExists(".sale__content p", { ...scrollRevealOption, delay: 1000 });
    revealIfExists(".sale__content h4", { ...scrollRevealOption, delay: 1000 });
    revealIfExists(".sale__btn", { ...scrollRevealOption, delay: 1500 });

    revealIfExists(".favourite__card", { ...scrollRevealOption, interval: 500 });

    revealIfExists(".download__image", { ...scrollRevealOption, origin: "left" });
    revealIfExists(".download__content", { ...scrollRevealOption, origin: "right", delay: 300 });

    revealIfExists(".promo__container .section__header", { ...scrollRevealOption, delay: 200 });
    revealIfExists(".promo__container form", { ...scrollRevealOption, delay: 500 });
  } else {
    // Optional: uncomment if you want to debug missing ScrollReveal
    // console.warn("ScrollReveal not loaded. Animations skipped.");
  }

  // ---------------------------
  // Banner infinite scroll duplicate (safe)
  // ---------------------------
  const banner = document.querySelector(".banner__container");
  if (banner && banner.children.length) {
    const bannerContent = Array.from(banner.children);
    bannerContent.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", "true");
      banner.appendChild(duplicateNode);
    });
  }

  // ---------------------------
  // Add animate class on scroll (safe)
  // ---------------------------
  const animateOnScroll = () => {
    const cards = document.querySelectorAll(".arrival__card, .favourite__card");
    if (!cards.length) return;

    const windowHeight = window.innerHeight;
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < windowHeight * 0.85) {
        card.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll, { passive: true });
  window.addEventListener("load", animateOnScroll);
  animateOnScroll();

  // ---------------------------
  // Parallax header image (safe + smooth)
  // ---------------------------
  const headerImg = document.querySelector(".header__image img");
  if (headerImg) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY || window.pageYOffset;
        headerImg.style.transform = `translateY(${scrolled * 0.1}px)`;
      },
      { passive: true }
    );
  }
});
