// Animación de contador para las estadísticas
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observador de intersección para animar elementos al hacer scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar contadores
            const counters = entry.target.querySelectorAll('.number[data-target]');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            
            // Animar tarjetas
            const cards = entry.target.querySelectorAll('.stat-card, .title-category');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.6s ease forwards';
                    card.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observar secciones
document.addEventListener('DOMContentLoaded', () => {
    // Animar los contadores del hero inmediatamente
    const heroCounters = document.querySelectorAll('.stats-quick .number[data-target]');
    setTimeout(() => {
        heroCounters.forEach(counter => {
            animateCounter(counter);
        });
    }, 500);
    
    // Inicializar opacidad de las tarjetas
    document.querySelectorAll('.stat-card, .title-category').forEach(card => {
        card.style.opacity = '0';
    });
    
    // Observar secciones
    const sections = document.querySelectorAll('.statistics, .titles');
    sections.forEach(section => observer.observe(section));
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Cambiar color del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
        }
    });
});

// Efecto hover en las estadísticas
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #f4f4f4 0%, #ffffff 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
    });
});

// Mostrar mensaje interactivo
console.log('%c¡Bienvenido a la página de CR7! ⚽', 
    'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%c938 goles y contando...', 
    'color: #2c5364; font-size: 14px;');
gi