// author - mehak kapur
// date - 28th jan 2025
"use strict";

// Event class to store event details
class Event {
    constructor(title, description, date, category) {
        this.title = title;
        this.description = description;
        this.date = new Date(date); // Convert string to Date object
        this.category = category; // e.g., 'Fundraiser', 'Workshop', 'Cleanup'
    }

    // Method to render event details in calendar grid
    render() {
        return `
            <div class="event-card" data-category="${this.category}" data-date="${this.date.toISOString()}">
                <h5 class="event-title">${this.title}</h5>
                <p class="event-description">${this.description}</p>
                <p class="event-date">${this.date.toDateString()}</p>
                <p class="event-category">${this.category}</p>
            </div>
        `;
    }
}

// Array to hold events (sample data)
const events = [
    new Event("Riverbank Restoration", "Spend the day restoring the riverbank and removing waste to protect wildlife.", "2025-02-05T09:00:00", "Cleanup"),
    new Event("Charity Dinner Night", "An evening of fine dining and philanthropy to support community programs.", "2025-02-10T19:00:00", "Fundraiser"),
    new Event("Eco-Friendly Living Workshop", "Discover simple yet effective ways to live a more sustainable lifestyle.", "2025-02-15T14:00:00", "Workshop"),
    new Event("Community Garden Day", "Join us in maintaining and beautifying a local community garden.", "2025-03-01T08:00:00", "Cleanup"),
    new Event("Innovation for Impact", "Explore how technology can drive positive change in communities.", "2025-03-10T09:00:00", "Workshop")
];


// Function to display events on the page
function displayEventsPage() {
    console.log("Displaying Events Page...");

    const eventContainer = document.getElementById('event-list');
    eventContainer.innerHTML = "";  // Clear previous events

    // Render each event
    events.forEach(event => {
        eventContainer.innerHTML += event.render();
    });

    // Attach filter event listener
    attachFilterEventListeners();
}

// Function to handle event filtering by category
function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        if (category === "All" || card.getAttribute('data-category') === category) {
            card.style.display = "block"; // Show matching event
        } else {
            card.style.display = "none"; // Hide non-matching event
        }
    });
}

// Function to attach filter event listeners
function attachFilterEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            filterEvents(category);
        });
    });
}

// Initialize the page
function start() {
    console.log("Starting Events Page...");
    displayEventsPage();
}

// Call start function when the page loads
window.addEventListener("load", start);