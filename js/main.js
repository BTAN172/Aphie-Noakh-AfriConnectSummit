// Gestion du menu amburger
// Sélection du bouton burger et de la navigation
const burger = document.querySelector('.menu-burger');
const nav = document.querySelector('header nav');

// Écouteur d'événement sur le clic du bouton burger
if (burger && nav) { 
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Accessibilité
        const isOpen = burger.classList.contains('active');
        burger.setAttribute('aria-expanded', isOpen);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ---  Selection des elements---
    const burger = document.querySelector('.menu-burger');
    const nav = document.querySelector('header nav');
    const header = document.querySelector('header');
    const themeToggle = document.getElementById('theme-toggle');
    

    // ---  dark/light mode avec localstorage ---
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        // Vérifie si un thème est déjà enregistré ou utilise les préférences système
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-theme');
            if (icon) {
                icon.className = 'fa-solid fa-sun'; // Icône soleil en mode sombre
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (icon) {
                icon.className = 'fa-solid fa-moon'; // Icône lune en mode clair
            }
        }

        // Écouteur d'événement sur le bouton Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Sauvegarde du choix dans le localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Changement d'icône dynamique
            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    // ---  Effet de la navbar au scroll(SHRINK) ---
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Vérification au chargement initial de la page
    window.addEventListener('scroll', checkScroll);
    checkScroll(); 

    // ---  Bouton de retour en haut ---
    //  le bouton dans le document
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut de page');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);

    // Contrôle d'affichage du bouton de retour en haut
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Action de retour en haut 
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Animation des compteurs au scroll ---
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        // Ajuste la vitesse de l'animation 
        const speed = target / 50; 

        if (count < target) {
            counter.innerText = Math.ceil(count + speed);
            setTimeout(() => animateCounter(counter), 30);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); 
            }
        });
        // Déclenche quand 50% de la carte est visible
    }, { threshold: 0.5 }); 

    stats.forEach(stat => counterObserver.observe(stat));


    // --- Animations fade-in des sections aux scrol ---
    // On cible les articles à révéler et toutes tes balises <section> principales
    const fadeElements = document.querySelectorAll('.scroll-reveal, section:not(.hero-section)');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-fade');
            }
        });
    }, { threshold: 0.15 }); 

    fadeElements.forEach(element => {
        // On applique la classe de préparation de l'effet
        element.classList.add('prepare-fade');
        fadeObserver.observe(element);
    });
});

// --- Compte a rebours en temps reel ---
    // Date cible d'après ton HTML : 21 Décembre 2026 à 09:00
    const countdownDate = new Date('December 21, 2026 09:00:00').getTime();

    // Sélection des boîtes du compteur d'index.html
    const boxes = document.querySelectorAll('.compteur .box .number');

    if (boxes.length === 4) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            // Si la date est dépassée
            if (distance < 0) {
                boxes.forEach(box => box.innerText = '00');
                clearInterval(countdownInterval);
                return;
            }

            // Calcul des jours, heures, minutes et secondes
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Affichage avec un zéro initial si le chiffre est inférieur à 10
            boxes[0].innerText = days < 10 ? '0' + days : days;
            boxes[1].innerText = hours < 10 ? '0' + hours : hours;
            boxes[2].innerText = minutes < 10 ? '0' + minutes : minutes;
            boxes[3].innerText = seconds < 10 ? '0' + seconds : seconds;
        };

        // Lance le compteur immédiatement, puis toutes les secondes
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // --- VALIDATION DU FORMULAIRE D'INSCRIPTION ---
    const regForm = document.querySelector('#registrationForm');

    if (regForm) {
        const inputs = regForm.querySelectorAll('input, select, textarea');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Fonction pour afficher une erreur sous le bon champ
        const showError = (input, message) => {
            const container = input.parentElement;
            let errorElement = container.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('small');
                errorElement.className = 'error-message';
                container.appendChild(errorElement);
            }
            
            errorElement.innerText = message;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        };

        // Fonction pour valider un champ avec succès
        const showSuccess = (input) => {
            const container = input.parentElement;
            const errorElement = container.querySelector('.error-message');
            if (errorElement) errorElement.remove();
            
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        };

        // Logique de validation stricte par type de champ
        const validateInput = (input) => {
            const val = input.value.trim();

            // 1. Tous les champs requis obligatoires
            if (input.hasAttribute('required') && val === '') {
                showError(input, 'Ce champ est obligatoire.');
                return false;
            }

            // 2. Vérification de l'Email via Regex
            if (input.type === 'email' && !emailRegex.test(val)) {
                showError(input, 'Veuillez entrer une adresse email valide.');
                return false;
            }

            // 3. Téléphone : On nettoie les espaces/caractères spéciaux pour ne garder que les chiffres
            if (input.type === 'tel') {
                const digitsOnly = val.replace(/\D/g, ''); 
                if (digitsOnly.length < 8) {
                    showError(input, 'Le numéro de téléphone doit contenir au moins 8 chiffres.');
                    return false;
                }
            }

            // 4. Message (textarea) : Minimum 20 caractères
            if (input.tagName.toLowerCase() === 'textarea' && val.length < 20) {
                showError(input, 'Votre message doit contenir au moins 20 caractères.');
                return false;
            }

            showSuccess(input);
            return true;
        };

        // Écouteurs pour valider pendant que l'utilisateur écrit ou change de case
        inputs.forEach(input => {
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('change', () => validateInput(input)); // Utile pour les balises <select>
        });

        // Soumission du formulaire
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            // Force la vérification de l'ensemble des champs
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Utilisation et stylisation de ta div #successMessage existante
                const successAlert = document.querySelector('#successMessage');
                if (successAlert) {
                    successAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Votre inscription a été enregistrée avec succès !';
                    successAlert.classList.add('show-success');
                }

                // Réinitialisation complète du formulaire
                regForm.reset();

                // Nettoyage des bordures vertes de succès après reset
                inputs.forEach(input => input.classList.remove('is-valid'));

                // Masquage automatique du message après 5 secondes
                setTimeout(() => {
                    if (successAlert) successAlert.classList.remove('show-success');
                }, 5000);
            }
        });
    }

    // --- FILTRAGE DYNAMIQUE DES INTERVENANTS ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const speakerCards = document.querySelectorAll('.speaker-card');

    if (filterButtons.length > 0 && speakerCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Gestion de l'état actif sur les boutons (Accessibilité)
                filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
                button.setAttribute('aria-pressed', 'true');

                // 2. Récupération de la catégorie sélectionnée
                const selectedCategory = button.textContent.trim();

                // 3. Filtrage des cartes
                speakerCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (selectedCategory === 'Tous' || cardCategory === selectedCategory) {
                        // On affiche la carte en retirant la classe de masquage
                        card.classList.remove('card-hidden');
                    } else {
                        // On masque la carte en ajoutant la classe
                        card.classList.add('card-hidden');
                    }
                });
            });
        });
    }

    // --- GESTION DES ONGLETS DU PLANNING ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const schedulePanels = document.querySelectorAll('.schedule-panel');

    // FORCE l'affichage du Jour 1 au démarrage pour éviter le conflit CSS
    if(document.getElementById('panel-jour1')) {
        document.getElementById('panel-jour1').classList.add('active-panel');
    }

    if (tabButtons.length > 0 && schedulePanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPanelId = button.getAttribute('aria-controls');

                tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
                button.setAttribute('aria-selected', 'true');

                schedulePanels.forEach(panel => {
                    if (panel.id === targetPanelId) {
                        panel.classList.add('active-panel');
                    } else {
                        panel.classList.remove('active-panel');
                    }
                });
            });
        });
    }

    // --- Année dynamique dans le footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
