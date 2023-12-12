
window.onload = function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // This line prevents the form from being submitted normally
        navigateToCheckout();
    });
};

function calc(callback) {

	var form = document.getElementById('myForm');
    if (!form.checkValidity()) {
		form.reportValidity(); // This line will trigger the validation messages to show up
        return;
    }
	
    var n1 = parseFloat(document.getElementById('number1').value);
    var n2 = 500;
    var result = callback(n1, n2);
    document.getElementById('result').value = result + ' W';
    var price = n1 * 1000;
    document.getElementById('price').value = '$' + price;
}

function multiplyNum(n1, n2) {
	return n1 * n2;
}

function navigateToCheckout() {
    var form = document.getElementById('myForm');
    if (!form.checkValidity()) {
		form.reportValidity();
        return;
    }

    var quantity = document.getElementById('number1').value;
	var price = document.getElementById('price').value;
	var productName = "Monocrystalline Solar Panel";
    window.location.href = './checkout.html?quantity=' + quantity + '&price=' + price + '&productName=' + productName;
}

function calculate() {
    var form = document.getElementById('your-form-id');
    if (!form.checkValidity()) {
        return;
    }
}