import { FRONTEND_URL } from "./config.js";

window.onload = function() {
    var buttons = [
        { id: "mono-button", price: "$1000", link: FRONTEND_URL + "/client/pages/mono.html" },
        { id: "poly-button", price: "$800", link: "./checkout.html" },
        { id: "thin-button", price: "$1200", link: "./checkout.html" }
    ];

    buttons.forEach(function(button) {
        var container = document.getElementById(button.id);
        if (container) {
            var btn = document.createElement("button");
            btn.innerHTML = "Buy Now";
            btn.onclick = function() { 
                var loggedInUser = localStorage.getItem("currentUsername");
                if (loggedInUser) {
                    window.location.href = button.link; 
                } else {
                    window.alert("Please sign up or log in first.");
                    window.location.href = FRONTEND_URL + "/client/pages/login.html"; // Replace with your login page URL
                }
            };
            btn.classList.add("buy-button");
            container.appendChild(btn);
        }
    });
};