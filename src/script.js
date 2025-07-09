document.addEventListener("DOMContentLoaded", () => {
  /**
   * Função principal que inicializa todos os módulos.
   */
  const initApp = () => {
    setupScrollAnimation();
    updateFooterYear();
    initializeSwiper();
    setupPortfolioModal();
    setupImageLightbox();
    setupEscapeKey();
  };

  /**
   * Animação de elementos ao rolar.
   */
  const setupScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(".anim-on-scroll");
    if (!animatedElements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }
    );
    animatedElements.forEach((element) => observer.observe(element));
  };

  /**
   * Atualiza o ano no rodapé.
   */
  const updateFooterYear = () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  /**
   * Inicializa o carrossel SwiperJS.
   */
  const initializeSwiper = () => {
    if (typeof Swiper === "undefined") return;
    new Swiper(".portfolio__swiper", {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 15,
      breakpoints: {
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
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
   * Configura a modal principal do portfólio.
   */
  const setupPortfolioModal = () => {
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    const modal = document.querySelector(".modal");
    if (!modal || !portfolioCards.length) return;

    const modalTitle = modal.querySelector(".modal__title");
    const modalDescription = modal.querySelector(".modal__description");
    const closeButton = modal.querySelector(".modal__close");
    const overlay = modal.querySelector(".modal__overlay");

    const openModal = (card) => {
      const title = card.querySelector(".portfolio-card__title").textContent;
      const description = card.querySelector(".portfolio-card__description").textContent;

      modalTitle.textContent = title;
      modalDescription.textContent = description;

      modal.classList.remove("modal--hidden");
      document.body.classList.add("modal-open");
    };

    const closeModal = () => {
      modal.classList.add("modal--hidden");
      document.body.classList.remove("modal-open");
    };

    portfolioCards.forEach(card => {
      card.addEventListener("click", () => {
        openModal(card);
      });
    });

    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
  };

  /**
   * Configura o lightbox para as imagens da galeria.
   */
  const setupImageLightbox = () => {
    const galleryImages = document.querySelectorAll(".modal__gallery-image");
    const lightbox = document.querySelector(".image-lightbox");
    if (!lightbox || !galleryImages.length) return;

    const lightboxImage = lightbox.querySelector(".image-lightbox__image");
    const lightboxClose = lightbox.querySelector(".image-lightbox__close");
    const lightboxOverlay = lightbox.querySelector(".image-lightbox__overlay");

    const openLightbox = (imageSrc) => {
        lightboxImage.src = imageSrc;
        lightbox.classList.remove("image-lightbox--hidden");
    }

    const closeLightbox = () => {
        lightbox.classList.add("image-lightbox--hidden");
    }

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            openLightbox(img.src);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", closeLightbox);
  };
  
  /**
   * Configura a tecla 'Escape' para fechar as janelas.
   */
  const setupEscapeKey = () => {
      document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      const modal = document.querySelector(".modal");
      const lightbox = document.querySelector(".image-lightbox");

      // Fecha o lightbox se estiver aberto, senão, fecha a modal
      if (!lightbox.classList.contains("image-lightbox--hidden")) {
        lightbox.classList.add("image-lightbox--hidden");
      } else if (!modal.classList.contains("modal--hidden")) {
        modal.classList.add("modal--hidden");
        document.body.classList.remove("modal-open");
      }
    });
  }

  // Inicializa a aplicação
  initApp();
});