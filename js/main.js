function updateCartCount() {
    var cart = [];
    var cartData = localStorage.getItem("cricstars_official_cart");
    if (cartData) {
        cart = JSON.parse(cartData);
    }
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    var cartLinks = document.querySelectorAll('a[href="cart.html"]');
    for (var j = 0; j < cartLinks.length; j++) {
        cartLinks[j].textContent = "Cart (" + totalItems + ")";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var reveals = document.querySelectorAll(".reveal");
    function reveal() {
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 
    updateCartCount();
});
