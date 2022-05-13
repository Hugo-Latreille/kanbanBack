require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./app/routers");

// app.use(express.static('static'));
// app.set('view engine', 'ejs');
// app.set('views', __dirname + './../../views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
	res.redirect("/api/docs")
	
})

app.use("/api", router)

app.set("port", process.env.PORT);
app.set("baseUrl", "http://localhost");
const server = app.listen(app.get("port"), () => {
	console.log(
		`Le serveur est lancé sur : ${app.get("baseUrl")}:${server.address().port}`
	);
});


