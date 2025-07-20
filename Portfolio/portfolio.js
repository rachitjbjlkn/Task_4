// Dark Mode Toggle
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.textContent = '☀️';
            } else {
                icon.textContent = '🌙';
            }
        });

        // Typing Animation
        const typingText = document.querySelector('.typing-text');
        const professions = ["Web Developer", "UI/UX Designer", "Full Stack Developer", "JavaScript Expert"];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                typingText.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentProfession.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }

        // Start typing animation
        setTimeout(type, 1000);

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Go to top button
        const goTopBtn = document.querySelector('.go-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                goTopBtn.style.opacity = '1';
                goTopBtn.style.pointerEvents = 'all';
            } else {
                goTopBtn.style.opacity = '0';
                goTopBtn.style.pointerEvents = 'none';
            }
        });

        goTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Project Modal
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const modal = document.getElementById(`projectModal${projectId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        });

        // Animate skill bars on scroll
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                
                if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
                    bar.style.width = bar.style.getPropertyValue('--width');
                }
            });
        }

        // Check on scroll and on initial load
        window.addEventListener('scroll', animateSkills);
        window.addEventListener('load', animateSkills);
        