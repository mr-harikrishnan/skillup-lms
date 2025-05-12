document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()

   

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var emailError = document.getElementById("email-error")
    var passwordError = document.getElementById("password-error")



    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address";
    }


    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if (!passwordPattern.test(password)) {
        passwordError.textContent = "8+ chars, 1 upper, 1 lower, 1 num, 1 special";
    }

    if (!email) {
        emailError.textContent = "Please fill in the field";
    }

    if (!password) {
        passwordError.textContent = "Please fill in the field";
    }


})








