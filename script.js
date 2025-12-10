document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.nav-link, .footer a[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const glosariumItems = document.querySelectorAll('.glosarium-item');
    const searchInput = document.getElementById('searchInput');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        menuToggle.innerHTML = mainNav.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            if (mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            glosariumItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        glosariumItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('.item-description').textContent.toLowerCase();
            const usage = item.querySelector('.item-usage').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || usage.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    const codeExamples = document.querySelectorAll('.code-example pre');
    codeExamples.forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.title = 'Salin kode';
        
        codeBlock.parentNode.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = 'none';
        copyButton.style.color = '#fff';
        copyButton.style.padding = '5px 10px';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.fontSize = '0.8rem';
        copyButton.style.transition = 'background 0.3s';
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        copyButton.addEventListener('click', function() {
            const codeText = codeBlock.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = 'rgba(76, 175, 80, 0.8)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
        
        codeBlock.parentNode.appendChild(copyButton);
    });

    const stepHeaders = document.querySelectorAll('.step-header');
    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const stepContent = this.nextElementSibling;
            stepContent.style.display = stepContent.style.display === 'none' ? 'block' : 'none';
        });
    });

    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.path-step, .glosarium-item, .resource-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark mode';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.background = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.style.background = '#f0db4f';
            this.style.color = '#333';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .dark-theme {
            background-color: #121212;
            color: #e0e0e0;
        }
        
        .dark-theme .header,
        .dark-theme .feature-card,
        .dark-theme .path-step,
        .dark-theme .glosarium-item,
        .dark-theme .resource-card,
        .dark-theme .shortcuts-section {
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        
        .dark-theme .main-nav a {
            color: #e0e0e0;
        }
        
        .dark-theme .step-header h3,
        .dark-theme .section-header h2,
        .dark-theme .glosarium-category h3,
        .dark-theme .resource-card h3 {
            color: #bb86fc;
        }
        
        .dark-theme .footer {
            background-color: #0f0f0f;
        }
        
        .dark-theme .search-box input {
            background-color: #2d2d2d;
            border-color: #444;
            color: #e0e0e0;
        }
        
        .dark-theme .filter-btn {
            background-color: #333;
            color: #e0e0e0;
        }
        
        .dark-theme .filter-btn.active {
            background-color: #bb86fc;
            color: #121212;
        }
        
        .dark-theme .shortcut-item {
            background-color: #2d2d2d;
        }
        
        .dark-theme .shortcut-item kbd {
            background-color: #333;
            border-color: #444;
            color: #e0e0e0;
        }
        
        .dark-theme .code-example {
            background-color: #0f0f0f;
        }
    `;
    
    document.head.appendChild(style);
});
