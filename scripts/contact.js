// author - mehak kapur
// date - 20th feb 2025

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Handle feedback form submission with AJAX-like behavior
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById("feedbackName").value,
            email: document.getElementById("feedbackEmail").value,
            rating: document.getElementById("rating").value,
            comments: document.getElementById("comments").value,
        };

        // Simulate AJAX request (Replace this with an actual API call if needed)
        setTimeout(() => {
            document.getElementById("confirmationModalBody").innerHTML = `
                <h5>Feedback Submitted Successfully!</h5>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Rating:</strong> ${formData.rating} Stars</p>
                <p><strong>Comments:</strong> ${formData.comments}</p>
            `;
            const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
            confirmationModal.show();
        }, 1000);
    });
});