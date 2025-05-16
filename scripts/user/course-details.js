var params = new URLSearchParams(window.location.search)
var id = params.get("id")

async function dataGetbyApi(id) {
    return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/courses/${id}`, {
        method: "GET"
    })
}

async function getData() {
    try {
        var data = await dataGetbyApi(id)
        var allData = await data.json()

        var courseLogo = document.getElementById("courseLogo")
        courseLogo.src = `${allData.thumbnailURL}`

        var category = document.getElementById("category")
        category.textContent = `${allData.category}`

        var description = document.getElementById("description")
        description.textContent = `${allData.description}`

        var container = document.querySelector(".course-modules");

        allData.modules.forEach(function (module) {
            var moduleDiv = document.createElement("div");
            moduleDiv.classList.add("module");
            moduleDiv.innerHTML = `<h3>🔹 ${module.title}</h3>`;


            // ----------------only enrolled users-------------------------

            async function getDataByApi() {
                return fetch(`https://68218af0259dad2655af8849.mockapi.io/skillup/users/${localStorage.getItem("id")}`)
            }

            async function getData() {
                try {
                    var data = await getDataByApi()
                    var userdata = await data.json()
                    var userEnrolledCourses = userdata.enrolledCourses

                    if (userEnrolledCourses.includes(parseInt(id))) {
                        var ul = document.createElement("ul");
                        module.resources.forEach(function (res) {
                            var li = document.createElement("li");
                            li.innerHTML = `<a href="${res.url}" >🎥 ${res.title}</a>`;
                            ul.appendChild(li);
                        })
                        moduleDiv.appendChild(ul);
                        
                    }
                    else {
                        console.log("User Not enrolled")
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            getData()
            container.appendChild(moduleDiv);



            // ----------------only enrolled users-------------------------




        });


    } catch (error) {
        console.log(error)
    }
}

getData()




