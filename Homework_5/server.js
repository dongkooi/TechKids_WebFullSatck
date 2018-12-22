const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    if(questions.length == 0) res.send("Chưa có câu hỏi nào!");
    else
    {
        const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
        res.send(
            `<h1>${randomQuestion.content}</h1>
            <form action="/editTrueQuestion" method="POST">
                <button type="submit" name="idQuestion" value="${randomQuestion.id}">Đúng/Có/Phải</button>
            </form>
            <form action="/editFalseQuestion" method="POST">
                <button type="submit" name="idQuestion" value="${randomQuestion.id}">Sai/Không/Trái</button>
            </form>`);
    }
});

app.post('/editTrueQuestion', (req, res) => {
    let data = req.body.idQuestion;
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    questions.forEach((question) => {
        if (question.id == data) {
            question.yes += 1;
        }
    });
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
});

app.post('/editFalseQuestion', (req, res) => {
    let data = req.body.idQuestion;
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    questions.forEach((question) => {
        if (question.id == data) {
            question.no += 1;
        }
    });
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
});

app.get('/ask', (req, res) => {
    res.sendFile(__dirname + "/view/ask.html")
});

app.post('/addquestion', (req, res) => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    const newQuestion = {
        "content" : req.body.questionContent,
        "yes" :0,
        "no" : 0,
        "id": questions.length
    };
    questions.push(newQuestion);
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/ask");
});
app.listen(6969, (err) => {
    if(err)
    console.log("Something's wrong");
    else console.log("Server start sucess");
});