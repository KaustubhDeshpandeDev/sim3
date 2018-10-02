require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const port = process.env.SERVER_PORT || 4000;
const app = express();
const session = require("express-session");
const {
  create,
  get_User,
  logout,
  sessionid
} = require("./controllers/userCtrl");
const {
  read_Posts_User,
  read_Posts,
  create_Posts,
  update,
  detail_By_ID,
  delete_By_ID
} = require("./controllers/postCtrl");

app.use(express.static(__dirname + "/../build"));

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 100000
    }
  })
);

app.post("/api/user", get_User);
app.post("/api/user/create", create);
app.post("/api/auth/logout", logout);

app.get("/api/posts", read_Posts);
app.post("/api/posts/:id", read_Posts_User);
app.post("/api/create/:id", create_Posts);
app.put("/api/post/:title", update);
app.post("/api/post/:id", detail_By_ID);
app.delete("/api/post/", delete_By_ID);

app.get("/api/session/", sessionid);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port  ${port}`);
});
