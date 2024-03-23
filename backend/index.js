const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
//app.use(cors());

// all routes
const blog = require("./routes/blogs");

//mount
app.use("/api/v1/", blog);

//Db connection
const connectDb = require("./config/database");
connectDb();

app.listen(process.env.PORT, () => {
  console.log("listening on port 8080");
});

app.get("/", (req, res) => {
  res.send(`<h1>hai hello</h1>`);
});
