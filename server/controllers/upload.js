const Youtube = require("youtube-api");
const prettyBytes = require("pretty-bytes");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  console.log(req.youtube);
  console.log(__dirname);

  // ? upload the video to Youtube
  const reqToYoutube = Youtube.videos.insert(
    {
      resource: {
        snippet: {
          title: req.youtube.title
        },
        status: {
          privacyStatus: "unlisted"
        }
      },
      part: "snippet,status",
      media: {
        body: fs.createReadStream(
          __dirname + "/../public/uploads/" + req.youtube.filename
        )
      }
    },
    (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
        return;
      }
      clearTimeout(dataProgress)
    //   console.log("DATA: \n", data);
      return console.log("Done");
    }
  );

 const dataProgress =  setInterval(function() {
    console.log(
      `${prettyBytes(
        reqToYoutube.req.connection._bytesDispatched
      )} bytes uploaded.`
    );
  }, 250);

  res.send("Video uploaded");
};
