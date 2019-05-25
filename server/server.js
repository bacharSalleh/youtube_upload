const express = require("express");
const app = express();
const initYoutubeAPI = require("./init");
const authCallBack = require("./controllers/auth");
const uploadToYoutube = require("./controllers/upload");
const uploadToServer = require("./middlewares/mutler");
const morgan = require("morgan");
const cors = require("cors");

const multer = require("multer");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.listen(5000, () => {
  console.log("Youtube uploader app initiated! - localhost:5000");
});

const oauth = initYoutubeAPI();


app.get("/auth-callback", authCallBack(oauth));

app.post("/upload", uploadToServer, uploadToYoutube);
