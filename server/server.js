const fs = require("fs");
const https = require("https");
const app = require("./app");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
  });
