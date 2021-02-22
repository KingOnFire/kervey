//TODO check form inputs and display an error if its empty, or two values are the same, and more

addAnswer = document.querySelector("#add")
data = document.querySelector("#inputdata")
counter = 2
addAnswer.addEventListener("click", () => {
    counter++;
    // input.innerHTML += `<input type="text" placeholder="Answer" class="answer" name="answer${counter}">`
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'answer')
    input.setAttribute('placeholder', 'Answer')
    input.setAttribute('name', 'answer' + counter)
    data.appendChild(input)
})



document.querySelector("#create").addEventListener("click", () => {

    answers = []
    document.querySelectorAll(".answer").forEach(element => {
        answers.push(element.value)
    })
    fetch("/create", {
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
                    "answers": answers,
                    "question": document.querySelector("#question").value
                })
            }).then(response => {
                    return response.json()
                }).then(json => {
                    location.assign("http://localhost:3000/view/" + json.code)
                })
})