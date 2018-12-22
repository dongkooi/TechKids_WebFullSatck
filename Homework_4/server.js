const express = require('express');
const app = express();

app.use(express.static('asset'));

app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/cvNgoTheDong.html")
});
app.listen(6969, (err) => {
    if(err)
    console.log("Something's wrong");
    else console.log("Server start sucess");
});