import BACKEND_URL from './config.js';

console.log("signup.js loaded");
console.log(window.location.origin + "/client/index.html")

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");
    // at wait time here

    // Get the form data

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var profileImage = document.getElementById("profileImage").files[0];

    // Create a FormData object
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('profileImage', profileImage);

    // Send the form data to the backend
    fetch(`${BACKEND_URL}/api/register`, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          // If the status code is 409, show a prompt to the user
          alert('Username or email already in use');
          throw new Error('Username or email already in use');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);

      // Store the current username in local storage
      localStorage.setItem('currentUsername', username);

      window.location.href = window.location.origin + "/client/index.html";
    })
    .catch((error) => {
      console.log("flag");
      console.error('Error:', error);
    })
    .finally(() => {
        console.log("flag2");
    })

  });