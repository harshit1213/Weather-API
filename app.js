const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "c22d8404b999c8777c5660f2f719fb4a"; 
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ unit +"&appid="+ apiKey;

    https.get(url, function(response){
    

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<p>Weather in "+query+ " is currently "+ desc + "<p>");
        res.write("<h1>Temperature in "+ query + " is "+ temp + " Degree Celcius.<h1>");
        res.write("<img src = " +imageURL+">");
        res.send();
       })
    })
})










app.listen(3000, function(){
    console.log("Server is Running on Port 3000!");
})