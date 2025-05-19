//existing User
var value = localStorage.getItem("skillup")
if(value){
    window.location.href="../pages/user/course.html"
}


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
            return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/users`, {
                method: "GET"
            })

        }

        async function getData() {            //problem
            try {

                var userData = await getDataByEmailApi(email)
                var data = await userData.json()

                if (userData.status == 200) {

                    var resDta = data.find(function (userDta) {
                        return userDta.email == email
                    })

                    if (resDta) {
                        if (resDta.password == password) {
                            if(resDta.role == "ADMIN"){
                                window.location.href="../pages/admin/course.html"
                                localStorage.clear()
                                localStorage.setItem("skillupEmail", email)
                                localStorage.setItem("role",resDta.role)
                            }
                            else{
                                localStorage.clear()
                                localStorage.setItem("skillupEmail", email)
                                localStorage.setItem("role",resDta.role)
                                localStorage.setItem("id",resDta.id)
                                window.location.href="../pages/user/course.html"
                               
                            }
                        }
                        else {
                            passwordError.textContent = "Incorrect Password"

                        }
                    }
                    else{
                        emailError.textContent="Email not found please register"
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

