require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const http = require("http").createServer(app);

const URL = process.env.MONGODB_URL;
mongoose.connect(
  URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("mongodb database is connected");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build"));
  });
}
const port = 5000 || process.env.PORT;
http.listen(port, () => {
  console.log("server is running on port", port);
});
