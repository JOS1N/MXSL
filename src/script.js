document.addEventListener("DOMContentLoaded", () => {
  /**
   * Função principal que inicializa todos os módulos da página.
   * Serve como um ponto de entrada claro para o script.
   */
  const initApp = () => {
    setupScrollAnimation();
    updateFooterYear();
    initializeSwiper();
    setupPortfolioInteraction();
  };

  /**
   * Configura a animação de elementos ao rolar a página.
   * Usa IntersectionObserver para melhor performance.
   */
  const setupScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(".anim-on-scroll");
    if (!animatedElements.length) return; // Evita erros se não houver elementos

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Anima apenas uma vez
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => observer.observe(element));
  };

  /**
   * Atualiza dinamicamente o ano no rodapé para o ano corrente.
   */
  const updateFooterYear = () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  /**
   * Inicializa o carrossel SwiperJS com as configurações do projeto.
   */
  const initializeSwiper = () => {
    if (typeof Swiper === "undefined") {
      console.error("Biblioteca SwiperJS não foi carregada.");
      return;
    }

    new Swiper(".portfolio__swiper", {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      slidesPerView: 1, // Visão padrão para mobile
      spaceBetween: 15,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  };

  /**
   * Adiciona a interatividade de clique aos cartões do portfólio.
   * Clicar em um cartão o expande e fecha qualquer outro que esteja aberto.
   */
  const setupPortfolioInteraction = () => {
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    if (!portfolioCards.length) return;

    portfolioCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Se o cartão clicado já está ativo, não faz nada para evitar fechar.
        if (card.classList.contains("portfolio-card--active")) {
          return;
        }

        // Procura e desativa qualquer outro cartão que esteja ativo
        const currentlyActiveCard = document.querySelector(".portfolio-card--active");
        if (currentlyActiveCard) {
            currentlyActiveCard.classList.remove("portfolio-card--active");
        }

        // Ativa o cartão que foi clicado
        card.classList.add("portfolio-card--active");
      });
    });
  };

  // Executa a aplicação quando o DOM estiver pronto
  initApp();
});