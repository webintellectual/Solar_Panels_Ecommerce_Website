import BACKEND_URL from "./config.js";

window.addEventListener("DOMContentLoaded", (event) => {
  var loggedInUser = localStorage.getItem("currentUsername");

  fetch(`${BACKEND_URL}/api/userDetails/${loggedInUser}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("username").value = data.username;
      document.getElementById("password").value = data.password;
      document.getElementById("email").value = data.email;
      document.getElementById("profileImage").src = data.profileImage;
      // Select the radio button that matches the user's gender
      if (data.gender === "Male") {
        document.getElementById("male").checked = true;
      } else if (data.gender === "Female") {
        document.getElementById("female").checked = true;
      }
    })
    .catch((error) => console.error("Error:", error));
});

document
  .getElementById("edit-profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var loggedInUser = localStorage.getItem("currentUsername"); // Get the username from localStorage
    var newUsername = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var genderRadio = document.querySelector('input[name="gender"]:checked');
    var gender = genderRadio ? genderRadio.value : '';
    var profileImage = document.getElementById("profileImage").files[0];

    var formData = new FormData();
    formData.append("username", newUsername);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("gender", gender);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    fetch(`${BACKEND_URL}/api/userDetails/${loggedInUser}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("currentUsername", newUsername);
        window.alert("Details edited successfully!"); // Prompt the user
        // window.location.href = "../index.html"; // Redirect to the home page
      })
      .catch((error) => console.error("Error:", error));
  });