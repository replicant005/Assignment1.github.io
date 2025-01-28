// author - mehak kapur
// date - 28th jan 2025

"use strict";

// scripts/navbar.js
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item');

    // Loop through the nav items and highlight the current page
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));  // Remove active class from all items
            this.classList.add('active');  // Add active class to clicked item
        });
    });

    // Dynamically highlight the current page based on the URL
    const path = window.location.pathname.split('/').pop(); // Get current page name from URL
    const activeLink = document.getElementById(path.split('.')[0]); // Get corresponding link ID
    if (activeLink) {
        activeLink.classList.add('active'); // Add active class to the current page
    }
});