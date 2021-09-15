if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { escapeXML } = require("ejs");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
