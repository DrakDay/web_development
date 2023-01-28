const express = require("express");
const bodyParser = require("body-parser")

const https = require("https")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){

    const appid = "d53cf92d40acb0a6842cb51650531a5a"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.CityName}&appid=${appid}`;
    
    https.get(url, function(response){

        response.on("data", function(data){
            const weahterdata = JSON.parse(data);
            const imageurl = "http://openweathermap.org/img/wn/"+ weahterdata.weather[0].icon +"@2x.png"
            res.write("<h1>the weather is currently " + weahterdata.weather[0].description+"</h1>")
            res.write(`<h1>the temp in ${req.body.CityName} is ` + weahterdata.main.temp +"</h1>")
            res.write("<img src=" + imageurl + ">")
            res.send()
        })
    })  
})

app.listen(3000, function(){
    console.log("listening at prot 3000")
})