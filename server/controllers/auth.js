module.exports = oauth => {
  return (req, res) => {
    const code = req.query.code;
    console.log("We got the code: ", code);

    oauth.getToken(code, (err, tokens) => {
      if (err) {
        console.log("Error: ", err);
        process.exit(1);
      }
      oauth.setCredentials(tokens);
      console.log(tokens);
      res.send("END");
    });
  };
};
