const questionDiv = document.querySelector(".question")
const answersDiv = document.querySelector(".answers")

code = location.pathname.slice(6)


fetch(`/info/${code}`)
.then(response => response.json())
.then(responseJson => {
    questionDiv.textContent = responseJson.question
    responseJson.answers.forEach(answer => {
        button = document.createElement("button")
        button.textContent = Object.keys(answer)[0]
        button.addEventListener("click", (event) => {
            fetch(`/info/${code}`, {
                "method": "POST",
                "mode": "cors",
                "cache": "no-cache",
                "credentials": "same-origin",
                "headers": {
                    "Content-Type": "application/json; charset=utf-8",
                },
                "redirect": "follow",
                "referrer": "no-referrer",
                "body": JSON.stringify({
                    "answer": event.target.textContent
                })
            }).then(
                response => {location.assign(`http://localhost:3000/view/${code}`)}
            )
        })
        answersDiv.append(button)

    })
})