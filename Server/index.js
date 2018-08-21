const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    console.log("Database Connected"), app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
