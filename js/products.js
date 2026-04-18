var products = [
    { id: 1, name: "SS Ton Player Edition", category: "Bats", price: 55000, image: "assets/sston.jpg", type: "English Willow", desc: "Grade A+ English Willow, massive edges." },
    { id: 2, name: "SG Savage X1", category: "Bats", price: 4500, image: "assets/sgsavage.jpg", type: "Kashmir Willow", desc: "Premium Kashmir Willow, ready to play." },
    { id: 3, name: "GM Diamond Pro", category: "Bats", price: 38000, image: "assets/gmdiamond.jpg", type: "English Willow", desc: "Traditional profile, modern sweet spot." },
    { id: 4, name: "DSC Condor Force", category: "Bats", price: 3500, image: "assets/dsc.jpg", type: "Kashmir Willow", desc: "Powerful stroke maker with deep bow." },
    { id: 5, name: "Kookaburra Ghost", category: "Bats", price: 42000, image: "assets/kookaburra.jpg", type: "English Willow", desc: "Minimalist design, maximum performance." },
    { id: 7, name: "Dukes Special County", category: "Balls", price: 2800, image: "assets/dukestop.jpg", type: "4pc Red Leather", desc: "Premium match ball used in first-class cricket." },
    { id: 8, name: "SG Test White", category: "Balls", price: 2400, image: "assets/sgball.jpg", type: "4pc White Leather", desc: "Official ball for T20 and ODIs." },
    { id: 9, name: "Kookaburra Turf Pink", category: "Balls", price: 3500, image: "assets/kookaburrapinkball.jpg", type: "4pc Pink Leather", desc: "Designed for day-night Test matches." },
    { id: 10, name: "Club Grade Red", category: "Balls", price: 850, image: "assets/clubball.jpg", type: "2pc Red Leather", desc: "Highly durable 2-piece ball for academy practice." },
    { id: 11, name: "Adidas 24-7 Batting Pads", category: "Pads", price: 9500, image: "assets/battingpads.jpg", type: "Batting Pads", desc: "Ultra-light foam with maximum protection." },
    { id: 12, name: "SG Hilite Keeping Pads", category: "Pads", price: 6200, image: "assets/sghilite.jpg", type: "Keeping Pads", desc: "Compact design for quick movements." },
    { id: 13, name: "SS Gladiator Batting Pads", category: "Pads", price: 8800, image: "assets/ssgladiator.jpg", type: "Batting Pads", desc: "Traditional cane padding with modern comfort." },
    { id: 14, name: "GM Diamond Batting Gloves", category: "Gloves", price: 5500, image: "assets/gmgloves.jpg", type: "Batting Gloves", desc: "Multi-flex points for finger control." },
    { id: 15, name: "SG Test Keeping Gloves", category: "Gloves", price: 4800, image: "assets/keepinggloves.jpg", type: "Keeping Gloves", desc: "Super-grip palms and reinforced protection." },
    { id: 16, name: "SS Platinum Batting Gloves", category: "Gloves", price: 4200, image: "assets/ssskytop.jpg", type: "Batting Gloves", desc: "Calf leather palms with sheep leather reinforcement." },
    { id: 17, name: "Shrey Masterclass Pro", category: "Helmets", price: 12500, image: "assets/shreymasterclass.jpg", type: "Titanium Grille", desc: "Lighest and strongest protection available." },
    { id: 18, name: "Masuri Vision Series", category: "Helmets", price: 10800, image: "assets/masuri.jpg", type: "Steel Grille", desc: "Patented eye-line grille technology for better vision." },
    { id: 19, name: "Aero P1 Chest Guard", category: "Protection", price: 2200, image: "assets/chestguard.jpg", type: "Chest Guard", desc: "Contoured 3-piece design for torso." },
    { id: 20, name: "SG Pro Arm Guard", category: "Protection", price: 950, image: "assets/armguard.jpg", type: "Arm Guard", desc: "High-density foam with moisture-wicking fabric." },
    { id: 21, name: "GM All-Rounder Abdo Guard", category: "Protection", price: 450, image: "assets/abdoguard.jpg", type: "Abdomen Guard", desc: "Essential high-impact groin protection." }
];
function applyFilters() {
    var query = (document.getElementById("searchInput") ? document.getElementById("searchInput").value : "").trim().toLowerCase();
    var sortBy = document.getElementById("sortSelect") ? document.getElementById("sortSelect").value : "newest";
    var priceRangeEl = document.getElementById("priceRange");
    var maxPrice = priceRangeEl ? parseInt(priceRangeEl.value, 10) : Infinity;
    var priceValueEl = document.getElementById("priceValue");
    if (priceValueEl && priceRangeEl) {
        priceValueEl.innerText = "₹" + maxPrice.toLocaleString('en-IN');
    }
    var checkboxes = document.querySelectorAll(".filter-option input");
    var activeCategories = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) activeCategories.push(checkboxes[i].value);
    }
    var grid = document.getElementById("productGrid");
    if (!grid) return;
    var cards = Array.from(grid.querySelectorAll(".product-card"));
    cards.forEach(function(card) {
        var category = card.getAttribute("data-category");
        var price = parseInt(card.getAttribute("data-price"), 10);
        var productName = card.querySelector(".product-name").innerText.toLowerCase();
        var productType = card.querySelector(".product-type").innerText.toLowerCase();
        var categoryName = category ? category.toLowerCase() : "";
        var matchesSearch = productName.includes(query) || productType.includes(query) || categoryName.includes(query);
        var matchesCategory = activeCategories.length === 0 || activeCategories.includes(category);
        var matchesPrice = price <= maxPrice;
        if (matchesSearch && matchesCategory && matchesPrice) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
    cards.sort(function(a, b) {
        if (sortBy === "newest") {
            return parseInt(a.getAttribute("data-index"), 10) - parseInt(b.getAttribute("data-index"), 10);
        }
        var priceA = parseInt(a.getAttribute("data-price"), 10);
        var priceB = parseInt(b.getAttribute("data-price"), 10);
        return sortBy === "low" ? priceA - priceB : priceB - priceA;
    });
    cards.forEach(function(card) {
        grid.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("searchInput");
    var sortSelect = document.getElementById("sortSelect");
    var priceRangeEl = document.getElementById("priceRange");
    var checkboxes = document.querySelectorAll(".filter-option input");
    var grid = document.getElementById("productGrid");
    if (grid) {
        var cards = Array.from(grid.querySelectorAll(".product-card"));
        cards.forEach(function(card, index) {
            card.setAttribute("data-index", index);
        });
    }
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);
    if (priceRangeEl) priceRangeEl.addEventListener("input", applyFilters);
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", applyFilters);
    }
});
