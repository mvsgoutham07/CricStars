function getCart() {
    var cartData = localStorage.getItem("cricstars_official_cart");
    if (cartData) {
        return JSON.parse(cartData); 
    }
    return []; 
}
function saveCart(cart) {
    localStorage.setItem("cricstars_official_cart", JSON.stringify(cart));
    updateCartCount(); 
}
function addToCart(productId) {
    var product = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    if (!product) return;
    var cart = getCart();
    var existingItem = null;
    for (var j = 0; j < cart.length; j++) {
        if (cart[j].id === productId) {
            existingItem = cart[j];
            break;
        }
    }
    if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        cart.push({
            id:       product.id,
            name:     product.name,
            category: product.category,
            price:    product.price,
            image:    product.image,
            type:     product.type,
            desc:     product.desc,
            quantity: 1
        });
    }
    saveCart(cart);
    alert(product.name + " added to cart!");
}
function removeFromCart(productId) {
    var cart = getCart();
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    saveCart(newCart);
    renderCart(); 
}
function updateQuantity(productId, delta) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + delta;
            if (cart[i].quantity <= 0) {
                removeFromCart(productId);
                return;
            }
            break;
        }
    }
    saveCart(cart);
    renderCart(); 
}
function updateCartCount() {
    var cart = getCart();
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems = totalItems + cart[i].quantity;
    }
    var cartLinks = document.querySelectorAll('a[href="cart.html"]');
    for (var j = 0; j < cartLinks.length; j++) {
        cartLinks[j].textContent = "Cart (" + totalItems + ")";
    }
}
function renderCart() {
    var cartItemsDiv = document.getElementById("cartItems");
    var subtotalEl   = document.getElementById("subtotal");
    var totalEl      = document.getElementById("total");
    if (!cartItemsDiv) return;
    var cart = getCart();
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p style='text-align:center; color:#888; padding:50px;'>Your cart is empty.</p>";
        subtotalEl.textContent = "₹0";
        totalEl.textContent    = "₹0";
        return;
    }
    cartItemsDiv.innerHTML = "";
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        subtotal = subtotal + (item.price * item.quantity);
        var row = document.createElement("div");
        row.style.cssText = "display:flex; align-items:center; gap:20px; padding:20px 0; border-bottom:1px solid #eee;";
        row.innerHTML =
            "<img src='" + item.image + "' alt='" + item.name + "' style='width:80px; height:80px; object-fit:contain;'>" +
            "<div style='flex:1;'>" +
                "<h4 style='margin:0;'>" + item.name + "</h4>" +
                "<p style='font-size:0.8rem; color:#666; margin-top:5px;'>" + item.type + "</p>" +
                "<div style='font-weight:bold; color:var(--primary); margin-top:10px;'>₹" + item.price.toLocaleString("en-IN") + "</div>" +
            "</div>" +
            "<div style='display:flex; align-items:center; gap:15px;'>" +
                "<button onclick='updateQuantity(" + item.id + ", -1)' style='width:30px; height:30px; border:1px solid #ddd; border-radius:50%; background:white; cursor:pointer; font-size:1rem;'>-</button>" +
                "<span>" + item.quantity + "</span>" +
                "<button onclick='updateQuantity(" + item.id + ", 1)'  style='width:30px; height:30px; border:1px solid #ddd; border-radius:50%; background:white; cursor:pointer; font-size:1rem;'>+</button>" +
            "</div>" +
            "<button onclick='removeFromCart(" + item.id + ")' style='background:none; border:none; font-size:1.5rem; cursor:pointer; color:#ff4d4d; padding-left:15px;'>&times;</button>";
        cartItemsDiv.appendChild(row);
    }
    subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
    totalEl.textContent    = "₹" + subtotal.toLocaleString("en-IN");
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); 
    renderCart();      
});
