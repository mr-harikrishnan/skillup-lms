//existing User

var value = localStorage.getItem("skillupEmail")
if(value){
    window.location.href="../pages/user/course.html"
}

document.getElementById("btn").addEventListener("click", function (event) {

    event.preventDefault()

    setTimeout(() => {
        nameError.textContent = ""
        emailError.textContent = ""
        passwordError.textContent = ""

    }, 2000);

    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var nameError = document.getElementById("name-error")
    var emailError = document.getElementById("email-error")
    var passwordError = document.getElementById("password-error")


    var isname = false
    var isEmail = false
    var isPassword = false

    if (!name) {
        nameError.textContent = "Please fill in the field"
    }
    else if (name.length < 3) {
        nameError.textContent = "minimum three letters"
    }
    else if (name[0] != name[0].toUpperCase()) {
        nameError.textContent = "first letter capital";
    }
    else if (/^\d+$/.test(name)) {
        nameError.textContent = "Only Letters allowed";
    }
    else {
        isname = true
    }



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



    // -----------------------------------------------------------------------------------
    var isUser = false;

    if (isname && isEmail && isPassword) {


        async function getDatas() {
            var res = await fetch("https://68218af0259dad2655af8849.mockapi.io/skillup/users", {
                method: "get"
            })
            return res.json()
        }
        async function fetchData() {
            try {

                var alldatas = await getDatas()
                alldatas.forEach(element => {
                    if ((element.email == email)) {
                        emailError.textContent = "Email already exists"
                        isUser = true
                    }
                });

                // =========================New User================================================



                if (!isUser) {






                    async function postData() {

                        let objdata = {
                            email: email,
                            name: name,
                            password: password,
                            role: "USER",
                            enrolledCourses: []
                        };


                        try {
                            let response = await fetch('https://68218af0259dad2655af8849.mockapi.io/skillup/users', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(objdata)
                            });

                            if (response.ok) {
                                let data = await response.json();
                                console.log(' Data posted:', data);
                                window.location.href = "../pages/login.html"
                            } else {
                                console.log(' Failed to post data');
                            }
                        } catch (error) {
                            console.log(' Error:', error);
                        }
                    }


                    postData();


                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()  //user data fetching


    } //all validataion checks



})  //add event listener