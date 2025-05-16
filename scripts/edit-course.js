var params = new URLSearchParams(window.location.search)
var courseId = params.get("id")

async function fetchDataByApi() {
    return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/courses/${courseId}`, {
        method: "GET"
    })
}

async function getData() {
    try {
        const data = await fetchDataByApi()
        const courseData = await data.json()
        document.getElementById("courseId").value = courseData.id
        document.getElementById("courseTitle").value = courseData.title
        document.getElementById("description").value = courseData.description
        document.getElementById("category").value = courseData.category
        document.getElementById("thumbnailUrl").value = courseData.thumbnailURL

        const moduleDiv = document.querySelector(".moduleDiv")
        moduleDiv.innerHTML = "";

        courseData.modules.forEach((module, index) => {
            const moduleContainer = document.createElement("div")
            moduleContainer.classList.add("module")

            moduleContainer.innerHTML = `
                <h3>Module <span class="moduleCount">${index + 1}</span></h3>
                <input type="text" placeholder="Module Title" class="moduleTitle" value="${module.title}" />
            `

            const resourcesDiv = document.createElement("div")
            resourcesDiv.classList.add("resourcesDiv")

            module.resources.forEach((res, resIndex) => {
                const resourceBlock = document.createElement("div")
                resourceBlock.classList.add("resources")

                resourceBlock.innerHTML = `
                    <h4>Resource <span class="resourceCount">${resIndex + 1}</span></h4>
                    <input type="text" placeholder="Resource ${resIndex + 1} Title" class="resTit" value="${res.title}" />
                    <input type="text" placeholder="Resource ${resIndex + 1} URL" class="resUrl" value="${res.url}" />
                `

                resourcesDiv.appendChild(resourceBlock)
            })

            // Optional: Add "Add Resource" button if needed
            const addResBtn = document.createElement("button")
            addResBtn.classList.add("addResources")
            addResBtn.textContent = "ADD RESOURCES"

            moduleContainer.appendChild(resourcesDiv)
            moduleContainer.appendChild(addResBtn)
            moduleDiv.appendChild(moduleContainer)
        })

    } catch (error) {
        console.error("Error loading data:", error)
    }
}

getData()



// ------------------------------create course code copy paste-------------------------------------------------------------


var updateBtn = document.getElementById("updateBtn")

var courseDataObj = {
    "title": "",
    "description": "",
    "category": "",
    "thumbnailURL": "",
    "modules": [],
    "id": ""
}

updateBtn.addEventListener("click", function (e) {
    var courseTitle = document.getElementById("courseTitle").value
    var description = document.getElementById("description").value
    var category = document.getElementById("category").value
    var thumbnailURL = document.getElementById("thumbnailUrl").value
    var id = document.getElementById("courseId")

    // obj data storing
    courseDataObj.title = courseTitle
    courseDataObj.description = description
    courseDataObj.category = category
    courseDataObj.thumbnailURL = thumbnailURL
    courseDataObj.id = id



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

    async function courseUpdate(courseId, courseDataObj) {
        try {
            const response = await fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/courses/${courseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(courseDataObj)
            });

            if (!response.ok) {
                throw new Error("Failed to update");
            }

            const data = await response.json();
            if (data) {
                console.log("Course updated:", data);
                window.location.href="/pages/admin/course.html"
            }

        } catch (error) {
            console.error("Error updating course:", error);
        }
    }

    courseUpdate(courseId, courseDataObj)


})


// -----------------------------------------------------------------------------------------------



