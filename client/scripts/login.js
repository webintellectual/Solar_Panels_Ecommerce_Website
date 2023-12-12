import BACKEND_URL from "./config.js";

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Get the form data
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Make a POST request to the login API
    fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // The login was successful
      // Store the entered username as currentUsername in local storage
      localStorage.setItem('currentUsername', username);
  
      // Redirect the user to the index page
      window.location.href = window.location.origin + "/client/index.html"
    })
    .catch((error) => {
      // The login failed
      alert("Incorrect username or password.");
    });
  });