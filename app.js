// jshint esversion:6

const express = require("express");
const app = express();
const https = require("https"); //requirin the https module in the native react package

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=9aabacc4cec6098098756acd627a30f9";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      // .on() means on recieving the "data" as response
      const weatherData = JSON.parse(data); //weatherData stores the entire data that we get. It is converted from string format to object format with the help of the parse() method
      const temp = weatherData.main.temp;
      console.log(temp);
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png" ;
      
      res.write("<h1>The temperature in London is " + temp + " degree celsius.</h1>");
      res.write("The weather description is " + desc + ".");
      res.write("<img src =" +imageURL +">")
      res.send(); //to send the response to the browser we use "res" of the app.get() method
    });
  });
  // res.send("Server is up and running!");  //only one send() is allowed
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
