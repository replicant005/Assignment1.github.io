/**
 * authguard.js
 *
 * Author: Mehak Kapur
 * Date of Completion: 2025-02-22
 **/
"use strict";
/**
 * Authentication Guard
 *
 * This function checks if a "user" exists in session storage.
 * If not, it logs a warning message and redirects the user to the login page.
 *
 * @returns {void}
 */
(function(){
    if(!sessionStorage.getItem("user")){
        console.warn("[AUTHGUARD] Unauthorized access detected. Redirecting to login page");
        location.href = "login.html";

    }

})();