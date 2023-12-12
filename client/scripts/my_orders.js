import BACKEND_URL from "./config.js";

window.onload = function () {
  var loggedInUser = localStorage.getItem("currentUsername");

  fetch(`${BACKEND_URL}/api/userDetails/${loggedInUser}`)
    .then((response) => response.json())
    .then((data) => {
      var orderHistory = data.orderHistory || [];
      var ordersContainer = document.createElement("div");

      if (orderHistory.length === 0) {
        document.body.style = `
            background-image: url('../assets/images/no_orders.jpg');
            background-size: 100%; // adjust this value to make the image smaller or larger
            background-position: center 100px;
            background-repeat: no-repeat; // add this line to prevent the image from repeating
            `;
        var noOrdersCard = document.createElement("div");
        noOrdersCard.innerHTML = `
                <h2>No orders yet!</h2>
                <p style="text-align: center;"><a href="./products.html">Browse Here</a></p>
\            `;
        noOrdersCard.style =
          "border: 1px solid #ccc; padding: 20px; margin: 20px 0; text-align: center;";
        ordersContainer.appendChild(noOrdersCard);
      } else {
        orderHistory.forEach((order) => {
        //   var orderSection = document.createElement("section");
        //   orderSection.className = "vh-100 gradient-custom-2";
          var imageName;
          switch (order.productName) {
            case "Monocrystalline Solar Panel":
              imageName = "type1.png";
              break;
            case "Polycrystalline Solar Panel":
              imageName = "type2.png";
              break;
            case "Thin Film Solar Panel":
              imageName = "type3.png";
              break;
            default:
              console.error("Invalid product name");
              return;
          }
          var orderCard = document.createElement("div");
          orderCard.className = "container py-5 h-100 wide-container";
          orderCard.innerHTML = `
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
                <div class="card card-stepper" style="border-radius: 16px;">
                    <div class="card-header p-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="text-muted mb-2"> Order ID: <span class="fw-bold text-body">${
                                  order.id
                                }</span></p>
                            </div>
                            <div>
                            <p class="text-muted mb-0"> Placed On <span class="fw-bold text-body">${new Date(
                                order.date
                              ).toLocaleString()}</span> </p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <div class="row justify-content-between">
                            <div class="col-md-6">
                                <h5 class="bold">${order.productName}</h5>
                                <p class="text-muted"> Qt: ${
                                  order.quantity
                                } item</p>
                                <h4 class="mb-3"> $ ${
                                    order.billAmount.substring(1)
                                } <span class="small text-muted"> via (COD) </span></h4>
                            </div>
                            <div class="col-md-6 text-right">
                                <img class="align-self-center img-fluid"
                                    src="../assets/images/${imageName}" width="250">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
          ordersContainer.appendChild(orderCard);
        });
      }

      document.body.appendChild(ordersContainer);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
