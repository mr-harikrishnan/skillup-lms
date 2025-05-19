
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
    btn.onclick = function () {
        history.back()
    }
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


        datas.forEach(function (data) {

            var contentDiv = document.querySelector(".contentDiv")

            var courseData = document.createElement("div");
            courseData.className = "courseData";
            courseData.setAttribute("id", `${data.id}`)
            contentDiv.appendChild(courseData)


            var courseImgDiv = document.createElement("div");
            courseImgDiv.className = "courseImgDiv";
            courseImgDiv.onclick = function () {
                window.location.href = `/pages/admin/course-details.html?id=${data.id}`
            }
            courseData.appendChild(courseImgDiv);


            var img = document.createElement("img");
            img.src = `${data.thumbnailURL}`
            img.alt = "";
            courseImgDiv.appendChild(img);


            var courseTitle = document.createElement("div");
            courseTitle.className = "courseTitle";
            courseData.appendChild(courseTitle);

            var titleP = document.createElement("p");
            titleP.textContent = `${data.title}`;
            courseTitle.appendChild(titleP);

            // Create course description container
            var courseDesc = document.createElement("div");
            courseDesc.className = "courseDesc";
            courseData.appendChild(courseDesc);

            var descP = document.createElement("p");
            descP.textContent = `${data.description}`;
            courseDesc.appendChild(descP);

            var editDltDiv = document.createElement("div")
            editDltDiv.className = "editDltDiv"
            courseData.appendChild(editDltDiv)

            var editDiv = document.createElement("div")
            editDiv.className = "editDiv"
            editDiv.onclick = function () {
                window.location.href = `/pages/admin/edit-course.html?id=${data.id}`
            }
            editDltDiv.appendChild(editDiv)

            var dltDiv = document.createElement("div")
            dltDiv.className = "dltDiv"
            dltDiv.onclick = function () {
                deleteCourse(data.id)
            }
            editDltDiv.appendChild(dltDiv)

        })



    } catch (error) {

    }
}
fetchData()




async function deleteCourse(id) {

    try {
        var dltresponse = await fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/courses/${id}`, {
            method: "DELETE"
        })

        if (!dltresponse.ok) {
            throw new Error('Failed to delete');
        }

        var data = await dltresponse.json()
        console.log("data delete", data)
        location.reload();

    } catch (error) {
        console.log(error)
    }

}

