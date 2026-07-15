// Gestion du menu amburger
// Sélection du bouton burger et de la navigation
const burger = document.querySelector('.menu-burger');
const nav = document.querySelector('header nav');

// Écouteur d'événement sur le clic du bouton burger
if (burger && nav) { // Sécurité pour s'assurer que les éléments existent sur la page
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Accessibilité
        const isOpen = burger.classList.contains('active');
        burger.setAttribute('aria-expanded', isOpen);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SÉLECTION DES ÉLÉMENTS ---
    const burger = document.querySelector('.menu-burger');
    const nav = document.querySelector('header nav');
    const header = document.querySelector('header');
    const themeToggle = document.getElementById('theme-toggle');
    

    // --- 3. GESTION DU DARK/LIGHT MODE AVEC LOCALSTORAGE ---
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

    // --- 4. EFFET DE NAVBAR AU SCROLL (SHRINK) ---
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérification au chargement initial de la page

    // --- 5. CRÉATION & GESTION DU BOUTON RETOUR EN HAUT ---
    // On crée dynamiquement le bouton dans le document
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

    // Action de retour au sommet fluide
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});