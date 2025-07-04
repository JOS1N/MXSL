// script.js

document.addEventListener("DOMContentLoaded", function() {

  // Animação fade-in ao rolar
  const fadeElements = document.querySelectorAll(
    ".portifolio__space, .text__child, .footer__info p"
  );

  // Verifique se existem elementos para observar
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            // Opcional: para de observar o elemento depois que ele aparece
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Começa a animação quando 10% do elemento está visível
    );

    fadeElements.forEach((el) => observer.observe(el));
  }


  // Ano automático no rodapé
  const yearElement = document.getElementById("current-year");
  if(yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Para o ano funcionar, ajuste seu footer:
/*
  <p>© <span id="current-year"></span> - MX Sound and Light</p>
*/