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
   * INICIALIZAÇÃO DO CARROSSEL (SWIPERJS) - COM FOCO CENTRAL E SETAS
   */
  const swiper = new Swiper(".portfolio-swiper", {
    // Efeito de loop infinito
    loop: true,

    // Define o espaçamento entre os slides
    spaceBetween: 30, // <-- VOLTOU PARA O VALOR MAIOR
    
    // Essencial para centralizar o slide ativo
    centeredSlides: true, 

    // Define quantos slides são visíveis. Usaremos breakpoints para responsividade.
    slidesPerView: 1, // Padrão para telas bem pequenas

    // Em telas maiores, mostra 3 slides, forçando o do meio a ficar centralizado
    breakpoints: {
      // a partir de 768px de largura
      768: {
        slidesPerView: 3,
        spaceBetween: 30, // <-- VOLTOU PARA O VALOR MAIOR
      },
      // a partir de 1200px de largura
      1200: {
          slidesPerView: 3,
          spaceBetween: 40, // <-- VOLTOU PARA O VALOR MAIOR
      }
    },

    // Navegação por setas
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Paginação por bolinhas
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /**
   * LÓGICA DE CLIQUE PARA TRANSFORMAR CARD E MOSTRAR TEXTO
   */
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  portfolioCards.forEach(card => {
    card.addEventListener("click", function(event) {
      // Impede que o clique se propague e ative o slide, caso o card já esteja ativo
      if (this.classList.contains('is-active')) {
          event.stopPropagation();
      }

      const isAlreadyActive = this.classList.contains("is-active");
      
      portfolioCards.forEach(c => c.classList.remove("is-active"));

      if (!isAlreadyActive) {
        this.classList.add("is-active");
      }
    });
  });
});