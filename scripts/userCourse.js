

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
            contentDiv.appendChild(courseData)


            var courseImgDiv = document.createElement("div");
            courseImgDiv.className = "courseImgDiv";
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

        })







    } catch (error) {

    }
}
fetchData()

