"use strict";

/**
 * app.js
 *
 * Author: Kritika Kapri, Amal Baradia
 * Student ID: 100938161, 100886422
 * Date of Completion: 2025-02-22
 **/

(function () {

    /**
     * Fetch and display Oshawa news using the News API.
     * Retrieves up to 5 recent articles and updates the webpage.
     *
     * @async
     * @returns {Promise<void>}
     */
    async function DisplayNews() {
        console.log("[INFO] Fetching news articles for Oshawa...");

        const apiKey = "c0a68c05-a913-45a9-8d02-903c1f805eeb";
        const city = "Oshawa";
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;

        console.log("[DEBUG] Fetching news from:", apiUrl);

        try {
            // Adding the required headers (Origin or X-Requested-With)
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // This header is now included
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("[DEBUG] Fetched news data:", data);

            const newsContainer = document.getElementById("news-list");
            if (!newsContainer) {
                console.error("[ERROR] News container not found in the DOM");
                return;
            }

            newsContainer.innerHTML = ""; // Clear existing news

            if (data.articles.length === 0) {
                newsContainer.innerHTML = "<p>No recent news available for Oshawa.</p>";
                return;
            }

            // Debugging log to verify articles
            console.log("[DEBUG] Articles to display:", data.articles);

            // Display up to 5 news articles
            data.articles.slice(0, 5).forEach((article, index) => {
                console.log(`[DEBUG] Displaying article #${index + 1}:`, article);
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-article");
                articleElement.innerHTML = `
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || "No description available."}</p>
                <small>Published: ${new Date(article.publishedAt).toLocaleDateString()}</small>
            `;
                newsContainer.appendChild(articleElement);
            });
        } catch (error) {
            console.error("[ERROR] Failed to fetch news data:", error);
            const newsContainer = document.getElementById("news-list");
            if (newsContainer) {
                newsContainer.innerHTML = "<p>Unable to load news at this time.</p>";
            }
        }
    }




    /**
     * loadGalleryImages()
     *
     * Fetches gallery image data from a JSON file and displays each image in the gallery container.
     * Initializes a lightbox for viewing images in full screen.
     *
     * @returns {void}
     */

    async function loadGalleryImages() {
        try {
            // Fetch the gallery data (JSON)
            const response = await fetch('data/gallery.json');
            if (!response.ok) {
                throw new Error('Failed to load gallery data');
            }

            const galleryData = await response.json();
            const galleryContainer = document.getElementById('gallery-container');

            // Loop through the images and create HTML for each image
            galleryData.images.forEach(image => {
                const imageItem = document.createElement('div');
                imageItem.classList.add('col-md-4', 'mb-4'); // Bootstrap grid for responsive layout

                const imageLink = document.createElement('a');
                imageLink.href = image.src; // Link to the full-size image for lightbox

                const imgElement = document.createElement('img');
                imgElement.src = image.thumbnail; // Thumbnail for preview
                imgElement.alt = image.title;
                imgElement.classList.add('img-fluid', 'rounded'); // Make image responsive

                // Append image to the link, and the link to the container
                imageLink.appendChild(imgElement);
                imageItem.appendChild(imageLink);
                galleryContainer.appendChild(imageItem);
            });

            // After images are added, initialize LightGallery
            lightGallery(document.getElementById('gallery-container'), {
                selector: 'a', // Set selector to anchor tags, since images are wrapped in <a> tags
                download: false // Disable the download button in the lightbox
            });

        } catch (error) {
            console.error('[ERROR] Failed to load gallery images:', error);
        }
    }


    /**
     * toggleMessageArea(element, show, message)
     *
     * Toggles the visibility of the message area, displaying the provided message if required.
     * Adds a 'danger' alert class when the show parameter is true.
     *
     * @param {HTMLElement} element - The element that triggers the message.
     * @param {boolean} show - Boolean indicating whether to show or hide the message area.
     * @param {string} message - The message to display when showing the area.
     */
    function toggleMessageArea(element, show, message = "") {
        const messageArea = document.getElementById("messageArea");
        if (show) {
            messageArea.style.display = "block";
            messageArea.textContent = message;
            element.classList.add("alert", "alert-danger");
        } else {
            messageArea.style.display = "none";
            messageArea.classList.remove("alert", "alert-danger");
        }
    }



    /**
     * UpdateNavBar()
     *
     * Checks if a user is logged in by looking at sessionStorage.
     * If the user is logged in, it updates the navigation bar to reflect the "Logout" option.
     *
     * @returns {void}
     */

    function UpdateNavBar(){
        console.log("[INFO] Checking User login status");

        const loginNav = document.getElementById("login");

        if(!loginNav){
            console.warn("[WARNING] loginNav not found. skipping CheckLogin().");
            return;
        }

        const userSession = sessionStorage.getItem("user");
        if(userSession){
            loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
            loginNav.href = "#";
            loginNav.addEventListener("click", (event) =>{
                event.preventDefault();
                sessionStorage.removeItem("user");
                location.href = "login.html";
            })
        }
    }


    /**
     * Displays the login page and handles login functionality.
     * @constructor
     */
    function DisplayLoginPage() {
        console.log("[INFO] DisplayLoginPage called...");
        const messageArea = document.getElementById("messageArea");
        const loginButton = document.getElementById("loginButton");
        const cancelButton = document.getElementById("cancelButton");

        // Hide message area initially
        messageArea.style.display = "none";

        if (!loginButton) {
            console.error("[ERROR] loginButton not found in the DOM");
            return;
        }

        loginButton.addEventListener("click", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                const response = await fetch("data/users.json");
                if (!response.ok) {
                    throw new Error(`[ERROR] HTTP error! ${response.status}`);
                }

                const jsonData = await response.json();
                const users = jsonData.users;
                if (!Array.isArray(users)) {
                    throw new Error("[ERROR] JSON data does not contain a valid Array");
                }

                const authenticatedUser = users.find(user => user.Username === username && user.Password === password);

                if (authenticatedUser) {
                    sessionStorage.setItem("user", JSON.stringify({
                        DisplayName: authenticatedUser.DisplayName,
                        EmailAddress: authenticatedUser.EmailAddress,
                        Username: authenticatedUser.Username,
                    }));

                    // Create a welcome message and display it on the page
                    const welcomeMessage = `Welcome, ${authenticatedUser.DisplayName}!`;
                    if (messageArea) {
                        messageArea.innerHTML = `<p>${welcomeMessage}</p>`;
                        messageArea.style.display = "block";  // Show message area
                    } else {
                        console.error("Message area element not found.");
                    }

                    // Redirect to index.html after a short delay
                    setTimeout(() => {
                        window.location.href = "index.html"; // Redirect after 2 seconds
                    }, 2000); // Adjust the delay if necessary
                } else {
                    toggleMessageArea(loginButton, true, "Invalid username or password. Please try again.");
                    document.getElementById("username").focus();
                    document.getElementById("username").select();
                }

            } catch (error) {
                console.error("[ERROR] Login failed...");
            }
        });

        cancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById("loginForm").reset();
            location.href = "index.html";
        });
    }


    // Registration Page Logic
    function DisplayRegisterPage() {
        console.log("[INFO] DisplayRegisterPage called...");

    }

    /**
     * Validates the registration form input fields.
     * @returns {boolean} Returns true if all fields are filled, false otherwise.
     */
    function validateRegistrationForm() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!username || !password || !confirmPassword) {
            alert("All fields are required.");
            return false;
        }

        return true;
    }

    // Call the necessary function based on the page
    if (location.pathname.includes("login.html")) {
        DisplayLoginPage();
    } else if (location.pathname.includes("register.html")) {
        DisplayRegisterPage();
    }


    /**
     * Updates the active navigation link based on the current page.
     */
    function updateActiveNavLink() {
        console.log("[INFO] updateActiveNavLink called...");

        const currentPage = document.title.trim();
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(link => {
            if (link.textContent.trim() === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Load the navbar into the current page
     * @returns {Promise<void>}
     */
    async function LoadHeader() {
        console.log("[INFO] LoadHeader Called ...");

        return fetch("header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("[DEBUG] Header content loaded:", data);
                document.querySelector("header").innerHTML = data;

                // Update the navigation bar and welcome message
                UpdateNavBar();
                DisplayWelcomeMessage();

                // Add event listener for logout link
                const logoutLink = document.getElementById("logoutLink");
                if (logoutLink) {
                    logoutLink.addEventListener("click", (event) => {
                        event.preventDefault();
                        Logout();
                    });
                }

                updateActiveNavLink(); // Update the active nav link after loading the header
            })
            .catch(error => console.error("[ERROR] Unable to load header:", error));
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Add event listener for search input
        document.getElementById("searchBar").addEventListener("keyup", function() {
            const searchQuery = this.value.toLowerCase();
            filterEvents(searchQuery);
        });

        // Event filtering by category (e.g., Fundraisers, Workshops)
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            });
        });

        /**
         * Filters events based on the user's search input.
         * @param {string} query - The search query input by the user.
         */
        function filterEvents(query) {
            // Get all event cards
            const eventCards = document.querySelectorAll('.event-card');

            eventCards.forEach(card => {
                const title = card.querySelector('.event-title').textContent.toLowerCase();
                const description = card.querySelector('.event-description').textContent.toLowerCase();

                // If either title or description matches search query, show the event card
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = ''; // Show event
                } else {
                    card.style.display = 'none'; // Hide event
                }
            });
        }

        /**
         * Filters events by category.
         * @param {string} category - The category to filter events by.
         */
        function filterByCategory(category) {
            const eventCards = document.querySelectorAll('.event-card');

            eventCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // If the category is 'All' or matches the card's category, show it
                if (category === "All" || cardCategory === category) {
                    card.style.display = ''; // Show event
                } else {
                    card.style.display = 'none'; // Hide event
                }
            });
        }
    });

    /**
     * Start the app based on the page title or other criteria
     */
    async function startApp() {
        console.log("Starting App...");

        switch (document.title) {
            case "Volunteer Opportunities":
                // The opportunities page will be managed by opportunities.js
                break;

            case "Home":
                displayHomePage();
                break;

            case "Contact Us":
                displayContactPage();
                break;

            case "Oshawa News":
                try {
                    await DisplayNews(); // Awaiting the asynchronous call
                    console.log("[DEBUG] News articles fetched and displayed successfully.");
                } catch (error) {
                    console.error("[ERROR] Failed to fetch or display news articles:", error);
                }
                break;

            case "Gallery": // Add new case for gallery page
                try {
                    await loadGalleryImages(); // Awaiting the asynchronous call
                } catch (error) {
                    console.error("[ERROR] Failed to load gallery images:", error);
                }
                break;

            // Other page cases can be added as necessary
        }
    }

    /**
     * Example: Display the home page content.
     */
    function displayHomePage() {
        console.log("Displaying Home Page...");
        // Do not call DisplayNews here unless explicitly needed
        // Add home page-specific content here
    }

    /**
     * Example: Display the contact page content.
     */
    function displayContactPage() {
        console.log("Displaying Contact Page...");
    }


    // Listens for the "DOMContentLoaded" event, calls the startApp function when it does
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");

        // Load the gallery images after the DOM is ready
        loadGalleryImages();

        // Load the header for every page
        LoadHeader()
            .then(() => {
                console.log("[INFO] Header loaded successfully.");
                startApp(); // Now call startApp after loading the header
            })
            .catch((error) => {
                console.error("[ERROR] Header loading failed:", error);
            });
    });

})();