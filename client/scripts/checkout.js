import {BACKEND_URL, FRONTEND_URL} from './config.js';

window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var quantity = urlParams.get('quantity');
    var price = urlParams.get('price');
    var product = urlParams.get('productName');

    if (!price) {
        switch (product) {
            case "Monocrystalline Solar Panel":
                price = `$${1000 * quantity}`;
                break;
            case "Polycrystalline Solar Panel":
                price = `$${800 * quantity}`;
                break;
            case "Thin Film Solar Panel":
                price = `$${600 * quantity}`;
                break;
            default:
                console.error('Invalid product type');
                return;
        }
    }

    document.getElementById('quantity').value = quantity;
    document.getElementById('price').value = price;
    document.getElementById('product-name').value = product;

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var address = document.getElementById('address').value;
        var phoneNumber = document.getElementById('phone-number').value;
        var loggedInUser = localStorage.getItem('currentUsername');

        var orderData = {
            username: loggedInUser, // replace with actual username
            productName: product,
            quantity: quantity,
            billAmount: price,
            Address: address,
            phoneNumber: phoneNumber
        };

        fetch(`${BACKEND_URL}/api/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Order placed successfully') {
                window.location.href = window.location.origin + "/client/pages/thankyou.html";
            } else {
                alert(data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });


}