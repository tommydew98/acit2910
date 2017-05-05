const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const session = require ("express-session");
const pg = require("pg");
const bcrypt = require("bcrypt");

var app = express();
const server = require("http").createServer(app);
var io = require("socket.io")(server);

// TODO add db local url
const dbURL = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/dagobah";

var publicFolder = path.resolve(__dirname, "client/view");
var appFolder = path.resolve(__dirname, "client/build");

// redirect to css and js folders
app.use("/scripts", express.static("client/build"));
app.use("/styles", express.static("client/stylesheet"));
app.use("/static", express.static("client/build/static"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "dagobahfastfoodsecret",
    resave: "true",
    saveUninitialized: true
}));


// app.get("/", function (req, resp){
//     resp.sendFile(appFolder + "/index.html");
// });

app.use(express.static(path.join(__dirname, "client","/build")));

io.on("connection", function(socket){

	socket.on("getItems", function(){
		console.log("conected database");
		pg.connect(dbURL, function(err, client, done){
			if(err){
				consoloe.log(err);
			} else {
				client.query("SELECT * FROM menu", function(err, results){
					done();
					console.log(results.rows);
					socket.emit("sendData", results.rows);
				});
			}

		});

	});

	socket.on("clearButton", function(){
		console.log("cleared button has been.");
	});
});


server.listen(port, function(err){
    if (err) {
        console.log(err);
        return false;
    }

    console.log("Server is running on port " + port);
});
