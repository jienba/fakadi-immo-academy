document.addEventListener('DOMContentLoaded', function () {
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
