//
// server.js
//
// Copyright (c) Nicholas P. Waltz
//



var express = require("express"),
    app = express(),
    fs = require('fs'),
    port = 3000;

var client = __dirname,
    os = require("os");

app.use("/css", express.static(client + '/css'));
app.use("/js", express.static(client + '/js'));
app.use("/img", express.static(client + '/img'));


app.get("/", function(req, res) {
  res.sendFile(client + '/index.html');
});

app.get("/file", function(req, res) {
  if (typeof req.xhr === "undefined") return res.status(404).end();
  var file = req.query.path, fileFragments = file.split('/'), stat = {}, data = "";
  if (typeof file === "undefined") return res.status(404).end();

  try {
    stat = fs.lstatSync(file);
    data = fs.readFileSync(file);
  } catch (e) {
    return res.status(404).end();
  }


  data = data.toString();

  res.send(JSON.stringify({
    data: data,
    name: fileFragments[fileFragments.length - 1],
    size: stat.size
  }));

});

app.post("/file", function(req, res) {

});

app.get("/dir", function(req, res) {
  if (typeof req.xhr === "undefined") return res.status(404).end();

  var dir = req.query.path.replace(/(\/)$/, ""),
      list = [],
      stat,
      i = 0;


  if (typeof dir === "undefined") res.status(404).end();
  try {
    list = fs.readdirSync(dir);
  } catch (e) {
    return res.status(404).end();
  }

  for (; i < list.length; i++) {
    try {
      stat = fs.lstatSync(dir + '/' + list[i]);
    } catch (e) {
      return res.status(404).end();
    }
    list[i] = {
      name: list[i],
      dir: stat.isDirectory(),
      size: stat.size
    };
  }

  res.send(JSON.stringify(list));
  
});

app.get("*", function(req, res) {
    res.status(404).send("404");
});


if (process.argv.length == 3 && !isNaN(Number(process.argv[2]))) 
  port = Number(process.argv[2]);

app.listen(port, function() {
 console.log("http://localhost:" + port + "/");
});
