const Youtube = require("youtube-api");
const readJson = require("r-json");
const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
const opn = require("open");

module.exports = () => {
  

  let oauth = Youtube.authenticate({
    type: "oauth",
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0]
  });

  opn(
    oauth.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/youtube.upload"]
    })
  ).then(v => {
    console.log("AUTH URL GENERATED");
  });

  return oauth;
};
