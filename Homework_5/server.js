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
        res.sendFile(__dirname + "/view/answer.html");
    }
});

app.get('/api/random', (req, res) => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
    res.send({question : randomQuestion});
});
app.get('/api/question/:questionId', (req, res) => {
    let idQuestion = req.params.questionId;
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    questions.forEach((question) => {
        if (question.id == idQuestion) {
            totalVote = question.yes + question.no;
            if (totalVote == 0){
                yesPercent = 50;
                noPercent = 50;
            } else {
                yesPercent = ((question.yes*100)/totalVote).toFixed(2);
                noPercent = 100 - yesPercent;
            }
            res.send({
                questionContent: question.content,
                totalVotes: totalVote,
                yesPercents: yesPercent,
                noPercents: noPercent
            });
        }
    })
});

app.get('/question/:questionId', (req, res) => {
    res.sendFile(__dirname + "/view/question.html");
});
app.post('/vote/:id', (req, res) => {
    let id = req.params.id;
    let vote = req.body.vote;
    const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    questions.forEach((question,index) => {
        if (question.id == id) {
            questions[index][vote] += 1;
        }
    });
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.send();
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