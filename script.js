document.addEventListener('DOMContentLoaded', function () {
    // Module Selection and Checkbox Bi-directional Linking
    const moduleCheckboxes = document.querySelectorAll('input[name="module"]');
    const moduleButtons = document.querySelectorAll('#programme-timeline .btn-gold');
    const packCompletCheckbox = document.querySelector('input[name="module"][value="Pack Complet"]');
    const individualModuleCheckboxes = Array.from(moduleCheckboxes).filter(cb => cb.value !== 'Pack Complet');

    // Helper function to update a button's text based on module title
    function updateModuleButton(title, isChecked) {
        moduleButtons.forEach(button => {
            const card = button.closest('.card');
            if (!card) return;
            const cardTitleEl = card.querySelector('h3');
            if (!cardTitleEl) return;
            
            const cardTitle = cardTitleEl.textContent.trim();
            if (cardTitle === title) {
                button.textContent = isChecked ? 'Module sélectionné' : 'Choisir ce module';
            }
        });
    }

    // Helper function to update the "Pack Complet" checkbox state
    function updatePackCompletCheckbox() {
        if (packCompletCheckbox) {
            const allIndividualChecked = individualModuleCheckboxes.every(cb => cb.checked);
            packCompletCheckbox.checked = allIndividualChecked;
        }
    }

    // Direction 1: Clicking a module button updates the checkbox
    moduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            if (!card) return;
            const titleEl = card.querySelector('h3');
            if (!titleEl) return;

            const title = titleEl.textContent.trim();
            const checkbox = document.querySelector(`input[name="module"][value="${title}"]`);
            
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                // Manually trigger change event to sync everything
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });

    // Direction 2: Changing a checkbox updates the button and potentially the pack
    moduleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const title = this.value;
            const isChecked = this.checked;

            if (title === 'Pack Complet') {
                // If "Pack Complet" is changed, update all individual modules
                individualModuleCheckboxes.forEach(cb => {
                    if (cb.checked !== isChecked) {
                        cb.checked = isChecked;
                        updateModuleButton(cb.value, isChecked);
                    }
                });
            } else {
                // If an individual module is changed, update its button and the pack checkbox
                updateModuleButton(title, isChecked);
                updatePackCompletCheckbox();
            }
        });
    });

    // Menu Spy Implementation
    function initMenuSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function activateMenuByScroll() {
            const fromTop = window.scrollY + 100; // offset of 100px
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                const isInView = (fromTop >= sectionTop) && (fromTop <= sectionTop + sectionHeight);
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href').slice(1) === sectionId) {
                        if (isInView) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    }
                });
            });
        }
        
        // Add smooth scroll behavior for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });

        // Listen for scroll events
        window.addEventListener('scroll', function() {
            requestAnimationFrame(activateMenuByScroll);
        });
        
        // Initial check for active section
        activateMenuByScroll();
    }

    // Burger Menu
    const burgerMenuButton = document.getElementById('burger-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

    burgerMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('open');
        }, 10);
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    });

    // Initialize Menu Spy
    initMenuSpy();
    
    // Hero Carousel
  const carouselImages = document.querySelectorAll(".carousel-image");
  let currentImageIndex = 0;

  function showNextImage() {
    if (carouselImages.length > 0) {
      carouselImages[currentImageIndex].classList.remove("active");
      currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
      carouselImages[currentImageIndex].classList.add("active");
    }
  }

  if (carouselImages.length > 0) {
    // Initially, the first image is already active from the HTML
    setInterval(showNextImage, 5000); // Change image every 5 seconds
  }

  // Timeline Animations
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate timeline line
          const line = document.querySelector(".timeline-line");
          if (line) line.classList.add("visible");

          // Animate timeline dots and content
          const dots = entry.target.querySelectorAll(".timeline-dot");
          const leftContent = entry.target.querySelectorAll(
            ".timeline-content.left"
          );
          const rightContent = entry.target.querySelectorAll(
            ".timeline-content.right"
          );

          dots.forEach((dot, index) => {
            setTimeout(() => {
              dot.classList.add("visible");
            }, index * 200);
          });

          leftContent.forEach((content, index) => {
            setTimeout(() => {
              content.classList.add("visible");
            }, index * 200);
          });

          rightContent.forEach((content, index) => {
            setTimeout(() => {
              content.classList.add("visible");
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  const timelineContainer = document.getElementById("timeline-container");
  if (timelineContainer) {
    timelineObserver.observe(timelineContainer);
  }
  // FAQ Toggle
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("span");
      const isOpen = answer.classList.contains("open");

      document.querySelectorAll(".faq-toggle.open").forEach((openAnswer) => {
        if (openAnswer !== answer) {
          openAnswer.classList.remove("open");
          const otherIcon =
            openAnswer.previousElementSibling.querySelector("span");
          otherIcon.textContent = "+";
          otherIcon.classList.remove("rotate-90");
        }
      });

      answer.classList.toggle("open");
      icon.textContent = answer.classList.contains("open") ? "−" : "+";
      icon.classList.toggle("rotate-90", answer.classList.contains("open"));
    });
  });

  // Scroll Animations
  const scrollElements = document.querySelectorAll(".scroll-animate");
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  const displayScrollElement = (element) => {
    element.classList.add("visible");
  };
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });
  // Initial check
  handleScrollAnimation();
});


function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Récupération des modules sélectionnés
  const selectedModules = document.querySelectorAll('input[name="module"]:checked');
  let modulesText = "";

  if (selectedModules.length > 0) {
    // Vérifier si "Pack Complet" est sélectionné
    const hasPackComplet = Array.from(selectedModules).some(cb => cb.value === "Pack Complet");

    if (hasPackComplet) {
      modulesText = "*Modules souhaités:*\n- Pack Complet (7 modules)\n";
    } else {
      modulesText = "*Modules souhaités:*\n";
      selectedModules.forEach(checkbox => {
        modulesText += `- ${checkbox.value}\n`;
      });
    }
  }

  // Construction du message avec de vrais retours à la ligne
  const message =
    `*Nouvelle demande d'inscription*\n\n` +
    `*Nom:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Téléphone:* ${phone}\n` +
    (modulesText ? `${modulesText}` : "");

  // Numéro WhatsApp en format international
  const whatsappNumber = "221710132121";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  console.log("WhatsApp Message:", message); // Debug

  window.open(whatsappUrl, "_blank");
  resetForm();
}

// Fonction de réinitialisation du formulaire
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.querySelectorAll('input[name="module"]:checked').forEach(cb => cb.checked = false);
}

function resetForm() {
    // Reset input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    // Uncheck all module checkboxes
    const moduleCheckboxes = document.querySelectorAll('input[name="module"]');
    moduleCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset all module button texts
    const moduleButtons = document.querySelectorAll('#programme-timeline .btn-gold');
    moduleButtons.forEach(button => {
        button.textContent = 'Choisir ce module';
    });
}
