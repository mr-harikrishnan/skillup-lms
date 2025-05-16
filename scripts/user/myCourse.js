
let currentPath = window.location.pathname

var currentPathSplit = currentPath.split("/")
var currentRole = currentPathSplit[2].toUpperCase()
var correctRole = localStorage.getItem("role")



if (currentRole != correctRole) {
    var allElements = document.body.querySelectorAll('*');
    allElements.forEach(function (element) {
        element.remove()
    })
    var image = document.createElement("img")
    image.src = "https://www.orangewebsite.com/articles/wp-content/uploads/2017/04/403.png"
    image.className = "notAccess"
    document.body.appendChild(image)

    var btn = document.createElement("a")
    btn.href = "/pages/admin/course.html"
    btn.className = "accessBtn"
    btn.textContent = "Back To Home page"
    document.body.appendChild(btn)
}



async function getDataByApi() {
    return fetch("https://68218af0259dad2655af8849.mockapi.io/skillup/courses", {
        method: "GET"
    })
}

async function fetchData() {
    try {
        var res = await getDataByApi()
        var datas = await res.json()
        console.log(datas)

        datas.forEach(function (data) {

            var contentDiv = document.querySelector(".contentDiv")

            var courseData = document.createElement("div");
            courseData.className = "courseData";
            // ----------------------only not enrolled div are append function--------------------------------------------

            async function checkData() {
                return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/users/${localStorage.getItem("id")}`)
            }
            async function checkEnrolled(courseId) {
                try {
                    var data = await checkData()
                    var userdata = await data.json()
                    var userEnrolledCourses = userdata.enrolledCourses
                    if (userEnrolledCourses.includes(parseInt(courseId))) {
                        contentDiv.appendChild(courseData)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            checkEnrolled(data.id)

            // ----------------------------------------------------------------------





            var courseImgDiv = document.createElement("div");
            courseImgDiv.className = "courseImgDiv";
            courseData.appendChild(courseImgDiv);


            var img = document.createElement("img");
            img.src = `${data.thumbnailURL}`
            img.alt = "";
            img.onclick = function () {
                window.location.href = `/pages/user/course-deatils.html?id=${data.id}`
            }
            courseImgDiv.appendChild(img);


            var courseTitle = document.createElement("div");
            courseTitle.className = "courseTitle";
            courseData.appendChild(courseTitle);

            var titleP = document.createElement("p");
            titleP.textContent = `${data.title}`;
            courseTitle.appendChild(titleP);

            var courseDesc = document.createElement("div");
            courseDesc.className = "courseDesc";
            courseData.appendChild(courseDesc);

            var descP = document.createElement("p");
            descP.textContent = `${data.description}`;
            courseDesc.appendChild(descP);

        })







    } catch (error) {

    }
}
fetchData()






