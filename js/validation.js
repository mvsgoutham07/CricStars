function showError(inputId, errorId, msg) {
    var inputEl = document.getElementById(inputId);
    var errorEl = document.getElementById(errorId);
    if (inputEl) inputEl.style.borderColor = "#e11d48";
    if (errorEl) {
        errorEl.style.display = "block";
        if (msg) errorEl.textContent = msg;
    }
}
function clearError(inputId, errorId) {
    var inputEl = document.getElementById(inputId);
    var errorEl = document.getElementById(errorId);
    if (inputEl) inputEl.style.borderColor = "#ccc";
    if (errorEl) errorEl.style.display = "none";
}
var registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        var allValid = true;
        var name = document.getElementById("regName").value.trim();
        var nameRegex = /^[A-Za-z\s]+$/;
        if (name.length > 0 && nameRegex.test(name)) {
            clearError("regName", "regNameError");
        } else {
            showError("regName", "regNameError", "Name must contain only letters and spaces.");
            allValid = false;
        }
        var dob = document.getElementById("regDob").value;
        if (dob !== "") {
            clearError("regDob", "regDobError");
        } else {
            showError("regDob", "regDobError");
            allValid = false;
        }
        var mobile = document.getElementById("regMobile").value.trim();
        var mobileRegex = /^[0-9]{10}$/;
        if (mobileRegex.test(mobile)) {
            clearError("regMobile", "regMobileError");
        } else {
            showError("regMobile", "regMobileError");
            allValid = false;
        }
        var email = document.getElementById("regEmail").value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            clearError("regEmail", "regEmailError");
        } else {
            showError("regEmail", "regEmailError");
            allValid = false;
        }
        var address = document.getElementById("regAddress").value.trim();
        if (address.length > 0) {
            clearError("regAddress", "regAddressError");
        } else {
            showError("regAddress", "regAddressError");
            allValid = false;
        }
        var pin = document.getElementById("regPin").value.trim();
        if (pin.length > 0) {
            clearError("regPin", "regPinError");
        } else {
            showError("regPin", "regPinError");
            allValid = false;
        }
        var state = document.getElementById("regState").value;
        if (state !== "") {
            clearError("regState", "regStateError");
        } else {
            showError("regState", "regStateError");
            allValid = false;
        }
        var pass = document.getElementById("regPass").value;
        var passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]).{8,}$/;
        if (passRegex.test(pass)) {
            clearError("regPass", "regPassError");
        } else {
            showError("regPass", "regPassError");
            allValid = false;
        }
        var confirm = document.getElementById("regConfirm").value;
        if (confirm === pass && confirm.length > 0) {
            clearError("regConfirm", "regConfirmError");
        } else {
            showError("regConfirm", "regConfirmError");
            allValid = false;
        }
        if (allValid) {
            alert("Account created successfully!");
            registerForm.reset();
        }
    });
}
var loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        var allValid = true;
        var loginId = document.getElementById("loginId").value.trim();
        var loginPass = document.getElementById("loginPass").value;
        if (loginId.length > 0) {
            clearError("loginId", "loginIdError");
        } else {
            showError("loginId", "loginIdError", "Please enter your email or mobile.");
            allValid = false;
        }
        if (loginPass.length > 0) {
            clearError("loginPass", "loginPassError");
        } else {
            showError("loginPass", "loginPassError");
            allValid = false;
        }
        if (allValid) {
            if (loginId.toLowerCase() === "user@test.com" || loginId === "1234567890") {
                alert("Login successful! Welcome to CricStars.");
                window.location.href = "index.html"; 
            } else {
                showError("loginId", "loginIdError", "Account not registered. Please create an account on the right.");
            }
        }
    });
}
