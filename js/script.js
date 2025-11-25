document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-links');
    const toggleButton = document.querySelector('.nav-toggle');

    // Check if the toggle button exists before adding the event listener
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Toggles the 'nav-open' class on the navigation links list
            nav.classList.toggle('nav-open');
        });

        // Optional: Close the menu when a link is clicked (important for single-page UX)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
            });
        });
    }
});