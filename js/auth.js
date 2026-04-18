document.addEventListener("DOMContentLoaded", function () {
    var loginTab = document.querySelector('[data-tab="login"]');
    var registerTab = document.querySelector('[data-tab="register"]');
    var loginSection = document.getElementById("loginSection");
    var registerSection = document.getElementById("registerSection");
    if (!loginTab || !registerTab) return;
    loginTab.addEventListener("click", function () {
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginSection.classList.add("active");
        registerSection.classList.remove("active");
    });
    registerTab.addEventListener("click", function () {
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        registerSection.classList.add("active");
        loginSection.classList.remove("active");
    });
});
