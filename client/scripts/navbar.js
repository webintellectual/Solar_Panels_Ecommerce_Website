import BACKEND_URL from "./config.js";

window.addEventListener("DOMContentLoaded", (event) => {
  // Check if the user is logged in
  var loggedInUser = localStorage.getItem("currentUsername");

  if (loggedInUser) {
    // The user is logged in
    fetch(`${BACKEND_URL}/api/userDetails/${loggedInUser}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userProfile) => {
        // Replace the Login and Sign Up links with a dropdown menu
        document.querySelector("#profile-nav").innerHTML = `
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          style="display:inline">
              ${loggedInUser}
          </a>
          <img src="${
            userProfile.profileImage
              ? BACKEND_URL + "/" + userProfile.profileImage
              : "../assets/images/no-profile-picture.svg"
          }" alt="Profile Image" style="border-radius: 50%; width:50px; height: 50px; object-fit: cover; padding-left: 5px;">
           <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#" id="edit-profile">Edit Profile</a>
              <a class="dropdown-item" href="#" id="my-orders">My Orders</a>
              <a class="dropdown-item" href="#" id="logout">Log Out</a>
          </div>
      </li>
  `;
        // Add event listener for the Log Out link
        document
          .querySelector("#logout")
          .addEventListener("click", function (event) {
            // Prevent the default action
            event.preventDefault();

            // Log the user out
            localStorage.removeItem("currentUsername");

            // // Reload the page
            // location.reload();
            window.location.href =
              window.location.origin + "/client/index.html";
          });

        // Add event listener for the Edit Profile link
        document
          .querySelector("#edit-profile")
          .addEventListener("click", function (event) {
            // Prevent the default action
            event.preventDefault();

            // Navigate to the edit_profile.html page
            window.location.href = "../pages/edit_profile.html"; // replace with the path to your edit_profile.html page if it's different
          });

          document
          .querySelector("#my-orders")
          .addEventListener("click", function (event) {
            // Prevent the default action
            event.preventDefault();
        
            // Navigate to the orders page
            window.location.href = "../pages/my_orders.html"; // replace with the path to your orders page if it's different
          });

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //   document
  //     .querySelector("#edit-profile")
  //     .addEventListener("click", function (event) {
  //       // Prevent the default action
  //       event.preventDefault();

  //       // Redirect the user to the profile editing page
  //       window.location.href = "../pages/edit_profile.html";
  //     });
});


$(document).ready(function () {
  $('.dropdown').hover(function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  }, function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });

  $('.dropdown > a').click(function () {
    location.href = this.href;
  });
});