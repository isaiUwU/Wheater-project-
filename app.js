const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
    
})

app.post ("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "abac89ad552438b4849b5b61d5bd6407";
    const unit = "metric";
    const lang = "es"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"&lang="+ lang ;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon            
            const name = weatherData.name;
            
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

            res.write("<h1>El Clima actual es " + weatherDescription + "</h1>");
            res.write("<h2>La Temperatura en la Ciudad de "+ name +" es de " + temp + " Grados Celsius</h2>");
            res.write("<img src="+ imageURL +">");
            res.send();
        })
    }) 
})

app.listen("3000", function () {
    console.log("your server is running on port 3000");
})

    
    