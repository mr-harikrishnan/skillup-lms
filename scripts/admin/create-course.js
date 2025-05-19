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
    btn.onclick=function(){
        history.back()
    }
    btn.className = "accessBtn"
    btn.textContent = "Back To Home page"
    document.body.appendChild(btn)
}





var submitBtn = document.getElementById("submitBtn")

var courseDataObj = {
    "title": "",
    "description": "",
    "category": "",
    "thumbnailURL": "",
    "modules": []
}

submitBtn.addEventListener("click", function (e) {
    var courseTitle = document.getElementById("courseTitle").value
    var description = document.getElementById("description").value
    var category = document.getElementById("category").value
    var thumbnailURL = document.getElementById("thumbnailUrl")

    // obj data storing
    courseDataObj.title = courseTitle
    courseDataObj.description = description
    courseDataObj.category = category
    courseDataObj.thumbnailURL = thumbnailURL



    var allModulesDiv = document.querySelectorAll(".module ")
    allModulesDiv.forEach(function (module) {

        var titleresObj = {
            "title": "",
            "resources": []
        }

        var moduletitle = module.querySelector(".moduleTitle")
        titleresObj.title = moduletitle.value

        var allResourcesDiv = module.querySelectorAll(".resources")
        allResourcesDiv.forEach(function (res) {
            var resourcesObj = {
                "title": "",
                "url": ""
            }

            var rt = res.querySelector(".resTit")
            var ru = res.querySelector(".resUrl")

            resourcesObj.title = rt.value
            resourcesObj.url = ru.value
            titleresObj.resources.push(resourcesObj)



        })

        courseDataObj.modules.push(titleresObj)


    });




    console.log(courseDataObj)
async function createData(){
try {
    let response = await fetch('https://68218af0259dad2655af8849.mockapi.io/skillup/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseDataObj)
    });

    if (response.ok) {
        let data = await response.json();
        console.log(' course created:', data);
        window.location.href="/pages/admin/course.html"
    } else {
        console.log(' Failed to create data');
    }
} catch (error) {
    console.log(' Error:', error);
}
}
createData(courseDataObj)
    

})


// ------------------------------------------------------------------

