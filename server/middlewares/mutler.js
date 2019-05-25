const path = require("path");
const multer = require("multer");

let filename;

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    // console.log(JSON.stringify(file));

    if (file.mimetype == "video/mp4") {
      filename = "VIDEO-" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  }
});

const upload = multer({
  storage: storage,
  files: 1,
  limits: { fileSize: 1000000000 }
}).single("myvideo");

module.exports = (req, res, next) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.log(err.message);
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(400).send(err.message);
    }
    req.youtube = {
      title: req.file.originalname,
      filename: filename
    };
    return next();
  });
};
