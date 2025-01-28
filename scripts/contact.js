// author - mehak kapur
// date - 28th jan 2025

"use strict";

// Handle form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();

    setTimeout(() => {
        confirmationModal.hide();
        window.location.href = 'index.html';
    }, 5000);
});

// Show or hide the "Back to Home" button based on scroll position
const backToHomeButton = document.getElementById("backToHome");
window.onscroll = () => {
    if (window.scrollY > 300) {
        backToHomeButton.style.display = "block";
    } else {
        backToHomeButton.style.display = "none";
    }
};