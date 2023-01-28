const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname +"/HTML/index.html")
})
app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname +"/HTML/bmiCalculator.html")
})

app.post("/", function(req, res){
    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var result = num1 + num2

    res.send("result is " + result)
})

app.post("/hello/bmicalculator", function(req, res){
    var weight = parseFloat(req.body.weight)
    var hegiht = parseFloat(req.body.hegiht)

    res.send("result is " + weight/ (hegiht **2 ) )
})

app.listen(3000 , function () {
    console.log("server started at port 3000");
});