require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./app/routers");
const cors = require("cors");
const multer = require("multer");
const bodyParser = multer();

// app.use(express.static('static'));
// app.set('view engine', 'ejs');
// app.set('views', __dirname + './../../views');
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.none());

app.get("/", (_, res) => {
	res.redirect("/api/docs");
});

app.use("/api", router);

app.set("port", process.env.PORT);
app.set("baseUrl", "http://localhost");
const server = app.listen(app.get("port"), () => {
	console.log(
		`Le serveur est lancé sur : ${app.get("baseUrl")}:${server.address().port}`
	);
});
