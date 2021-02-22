// TODO: fix whitespace problem
code = location.pathname.slice(6)
document.querySelector("#code").innerText += code
headingQuestion = document.querySelector("#question")
answerData = document.querySelector("#answers")
fetch(`/info/${code}`)
.then(res => {return res.json();})
.then(response => {
    headingQuestion.textContent = response.question
    response.answers.forEach(answer => {
        let answerName = Object.keys(answer)[0]
        let div = document.createElement("div")
        div.textContent = `${answerName}: ${answer[answerName]}`
        div.setAttribute("id", 'answer' + answerName)
        answerData.appendChild(div)
    })
    socket.on("reply", answer => {
        val = parseInt(document.querySelector(`#answer${''+ answer.answer}`).textContent.slice(
            answer.answer.length + 2))
        document.querySelector(`#answer${answer.answer}`).textContent = `${answer.answer}: ${++val}`
    })
})