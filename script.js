document.addEventListener("DOMContentLoaded", function () {
  /**
   * LÓGICA DE ANIMAÇÃO AO ROLAR (INTERSECTION OBSERVER)
   */
  const animatedElements = document.querySelectorAll(".anim-on-scroll");

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
   */
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /**
   * INICIALIZAÇÃO DO CARROSSEL (SWIPERJS)
   * Configurações para o carrossel do portfólio.
   */
  const swiper = new Swiper(".portfolio-swiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});