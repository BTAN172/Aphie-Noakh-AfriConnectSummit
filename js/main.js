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