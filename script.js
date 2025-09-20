document.addEventListener('DOMContentLoaded', function () {
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

  const message =
    `*Nouvelle demande d'inscription*%0A%0A` +
    `*Nom:* ${name}%0A` +
    `*Email:* ${email}%0A` +
    `*Téléphone:* ${phone}%0A`;

  const whatsappNumber = "221710132121";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappUrl, "_blank");
}
