//existing User

// var value = localStorage.getItem("skillupUser")
// if(value){
//     window.location.href="../pages/homePage.html"
// }



document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()

    setTimeout(() => {

        emailError.textContent = ""
        passwordError.textContent = ""

    }, 2000);


    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var emailError = document.getElementById("email-error")
    var passwordError = document.getElementById("password-error")


    var isEmail = false
    var isPassword = false




    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = "Please fill in the field";
    }
    else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address";
    }
    else {
        isEmail = true
    }



    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
        passwordError.textContent = "Please fill in the field";
    }
    else if (!passwordPattern.test(password)) {
        passwordError.textContent = "8+ chars, 1 upper, 1 lower, 1 num, 1 special";
    }
    else {
        isPassword = true
    }




    if (isEmail && isPassword) {

        async function getDataByEmailApi(email) {
            return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/users?email=${email}`, {
                method: "GET"
            })

        }

        async function getData() {
            try {

                var userData = await getDataByEmailApi(email)
                var data = await userData.json()

                if (userData.status == 200) {

                    if (data[0].role == "ADMIN") {
                        localStorage.setItem("skillupUser", JSON.stringify(email))

                        window.location.href = "../pages/admin.html"

                    }

                    else {
                        localStorage.setItem("skillupUser", JSON.stringify(email))

                        window.location.href = "../pages/homePage.html"

                    }

                }
                else if (userData.status == 404) {
                    emailError.textContent = "User not found Please register"

                }

            } catch (error) {
                console.log(error)

            }
        }
        getData()

    }


})