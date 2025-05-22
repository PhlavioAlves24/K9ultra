document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (!bsCollapse) {
                        bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    }
                    bsCollapse.hide();
                }
                
                const navbarHeight = document.querySelector('.navbar.fixed-top')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Atualizar ano no footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simulação de envio de formulário
    const ctaForm = document.getElementById('ctaForm');
    const formMessage = document.getElementById('formMessage');

    if (ctaForm && formMessage) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            if (!nameInput || !emailInput) {
                console.error("Campos do formulário não encontrados!");
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            formMessage.textContent = '';
            formMessage.className = 'mt-3 text-center'; 

            if (name === '' || email === '') {
                formMessage.textContent = 'Por favor, preencha todos os campos.';
                formMessage.classList.add('error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formMessage.textContent = 'Por favor, insira um email válido.';
                formMessage.classList.add('error');
                return;
            }

            formMessage.textContent = 'Enviando seus dados...';
            formMessage.classList.add('info'); 

            setTimeout(() => {
                formMessage.textContent = `Obrigado, ${name}! Você será notificado sobre a oferta exclusiva para o K9 Ultra em ${email}.`;
                formMessage.classList.remove('info');
                formMessage.classList.add('success');
                ctaForm.reset();

                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'mt-3 text-center';
                }, 7000);

            }, 1500);
        });
    }

    // Animação de elementos ao rolar
    const animatedElements = document.querySelectorAll(
        '.feature-card, .specs-list li, .gallery-item, .form-container, #why-k9 h2, #why-k9 .lead'
    );
    
    if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observerInstance.unobserve(entry.target); 
                } else {
                    // entry.target.classList.remove('visible'); 
                }
            });
        }, { 
            threshold: 0.1 
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }
});