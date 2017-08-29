var express = require("express"),
    app = express(),
    port = 3000;

var client = __dirname,
    os = require("os");

app.use("/css", express.static(client + '/css'));
app.use("/js", express.static(client + '/js'));
app.use("/img", express.static(client + '/img'));


app.get("/", function(req, res) {
  res.sendFile(client + '/index.html');
});


app.get("*", function(req, res) {
    res.send("404");
});


if (process.argv.length == 3 && !isNaN(Number(process.argv[2]))) 
  port = Number(process.argv[2]);

app.listen(port, function() {
 console.log("Listening on " + port);
});
