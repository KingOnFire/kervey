const express = require("express")
const app = express()
const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer)
const bodyParser = require('body-parser')
sessionCodes = ['12345']
sessions = [{
    code: "12345",
    question: "How is your day going?",
    answers: [{"Good": 0}, {"Bad": 0}]
}]
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/join/:code", (req, res) => {
    let code = req.params.code
    if (sessionCodes.includes(code)) {
        res.json({
            "valid": true
        })
    }
    else {
        res.json({
            "valid": false
        })
    }

})
app.post("/info/:code", (req, res) => {
    let answer = req.body.answer
    let session_index = sessions.findIndex(session => {return session.code == req.params.code})
    let answer_index = sessions[session_index].answers.findIndex(i => {return Object.keys(i)[0] == answer})
    sessions[session_index].answers[answer_index][answer]++;
    io.emit("reply", {"answer": answer})
    res.json({"OK": true})
})

app.get("/view/:code", (req, res) => {
    res.sendFile(__dirname + "/public/view.html")
})
app.get("/room/:code", (req, res) => {
    res.sendFile(__dirname + "/public/question.html")
})

app.get("/create", (req, res) => {
    res.sendFile(__dirname + "/public/create.html")
})

app.post("/create", (req, res) => {
    function createCode() {
        codeArr = []
        for(let i = 0; i < 5; i++) {codeArr.push(Math.floor(Math.random() * 10))}
        code = ""
        codeArr.forEach(number => {
            code += '' + number
        })
        return code
    }
    code = createCode()
    while (sessionCodes.includes(code)) {
        code = createCode()
    }
    // add a session object to the sessions array using req.body
    answers = []
    sessionCodes.push(code)
    req.body.answers.forEach(answer => {
        answers.push({[answer]: 0})
    })
    sessions.push({
        code: code,
        question: req.body.question,
        answers: answers
    })
    console.log(answers)
    res.json({"code": code})
})

app.get("/info/:code", (req, res) => {
    let code = req.params.code
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].code == code) {
            res.json({
                "question": sessions[i].question,
                "answers": sessions[i].answers
            })
        }
    }
})
app.get("/test", (req, res) => {
    res.send("hello world")
})


httpServer.listen(process.env.PORT || 3000, () => {
    console.log("running server at http://localhost:3000")
})