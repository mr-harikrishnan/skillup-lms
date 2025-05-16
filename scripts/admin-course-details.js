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
            const moduleDiv = document.createElement("div");
            moduleDiv.classList.add("module");
            moduleDiv.innerHTML = `<h3>🔹 ${module.title}</h3>`;

            const ul = document.createElement("ul");

            module.resources.forEach(function (res) {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${res.url}" t>🎥 ${res.title}</a>`;

                ul.appendChild(li);
            });

            moduleDiv.appendChild(ul);
            container.appendChild(moduleDiv);
        });


    } catch (error) {
        console.log(error)
    }
}

getData()


// "modules": [
//       {
//         "title": "Introduction to FastAPI",
//         "resources": [
//           {
//             "title": "FastAPI Tamil Tutorial | Build APIs",
//             "url": "https://youtu.be/vLqTf2b6GZw"
//           },
//           {
//             "title": "FastAPI Beginner Guide",
//             "url": "https://youtu.be/qRyyHGJ8kzc"
//           }
//         ]
//       },
//       {
//         "title": "FastAPI with SQLModel",
//         "resources": [
//           {
//             "title": "CRUD using SQLModel",
//             "url": "https://youtu.be/NW-Zh7RMXjQ"
//           },
//           {
//             "title": "FastAPI & SQLModel Integration",
//             "url": "https://youtu.be/WNUnL7DUK5M"
//           }
//         ]
//       }
//    ]

