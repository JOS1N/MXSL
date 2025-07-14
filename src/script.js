// Aplica o tema salvo no localStorage assim que a página carrega para evitar "flash"
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Função principal que inicializa todos os módulos.
   */
  const initApp = () => {
    initParticles();
    setupScrollAnimation();
    updateFooterYear();
    initializeSwiper();
    setupPortfolioModal();
    setupImageLightbox();
    setupEscapeKey();
    setupThemeToggle();
  };

  /**
   * Inicializa e configura o fundo de partículas (particles.js)
   */
  const initParticles = () => {
    if (typeof particlesJS === 'undefined') {
      console.error('Biblioteca particles.js não foi carregada.');
      return;
    }
    const particleConfig = {
      "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } },
      "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 } } },
      "retina_detect": true
    };
    particlesJS('particles-js', particleConfig);
    
    // Função para atualizar as cores das partículas com base no tema
    const updateParticlesColor = () => {
        if (!window.pJSDom || !window.pJSDom[0]) return;
        const pJS = window.pJSDom[0].pJS;
        const newColor = document.body.classList.contains('light-mode') ? '#1a1a1a' : '#ffffff';
        pJS.particles.color.value = newColor;
        pJS.particles.line_linked.color = newColor;
        pJS.fn.particlesRefresh();
    };
    
    setTimeout(updateParticlesColor, 200);
    const themeToggleButton = document.querySelector(".theme-toggle");
    if(themeToggleButton) themeToggleButton.addEventListener('click', updateParticlesColor);
  };

  /**
   * Configura o botão de alternância de tema.
   */
  const setupThemeToggle = () => {
    const themeToggleButton = document.querySelector(".theme-toggle");
    if (!themeToggleButton) return;
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  };

  /**
   * Configura a animação de elementos ao rolar.
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
      speed: 1500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
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
    const modalGalleryImages = modal.querySelectorAll(".modal__gallery-image");
    const closeButton = modal.querySelector(".modal__close");
    const overlay = modal.querySelector(".modal__overlay");
    const openModal = (card) => {
      modalTitle.textContent = card.querySelector(".portfolio-card__title").textContent;
      modalDescription.textContent = card.querySelector(".portfolio-card__description").textContent;
      const images = JSON.parse(card.dataset.images || '[]');
      modalGalleryImages.forEach((img, index) => {
        if (images[index]) {
          img.src = images[index];
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }
      });
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
            if(img.src && !img.src.endsWith('#') && !img.src.includes('undefined')) {
                openLightbox(img.src);
            }
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