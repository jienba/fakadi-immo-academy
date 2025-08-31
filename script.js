document.addEventListener('DOMContentLoaded', function () {
    // Hero Carousel
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;

    function showNextImage() {
        if (carouselImages.length > 0) {
            carouselImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            carouselImages[currentImageIndex].classList.add('active');
        }
    }

    if (carouselImages.length > 0) {
        // Initially, the first image is already active from the HTML
        setInterval(showNextImage, 5000); // Change image every 5 seconds
    }

    // Timeline Animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate timeline line
                const line = document.querySelector('.timeline-line');
                if (line) line.classList.add('visible');
                
                // Animate timeline dots and content
                const dots = entry.target.querySelectorAll('.timeline-dot');
                const leftContent = entry.target.querySelectorAll('.timeline-content.left');
                const rightContent = entry.target.querySelectorAll('.timeline-content.right');
                
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.classList.add('visible');
                    }, index * 200);
                });
                
                leftContent.forEach((content, index) => {
                    setTimeout(() => {
                        content.classList.add('visible');
                    }, index * 200);
                });
                
                rightContent.forEach((content, index) => {
                    setTimeout(() => {
                        content.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        timelineObserver.observe(timelineContainer);
    }
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('span');
            const isOpen = answer.classList.contains('open');

            document.querySelectorAll('.faq-toggle.open').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('open');
                    const otherIcon = openAnswer.previousElementSibling.querySelector('span');
                    otherIcon.textContent = '+';
                    otherIcon.classList.remove('rotate-90');
                }
            });
            
            answer.classList.toggle('open');
            icon.textContent = answer.classList.contains('open') ? '−' : '+';
            icon.classList.toggle('rotate-90', answer.classList.contains('open'));
        });
    });

    // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    // Initial check
    handleScrollAnimation();
});