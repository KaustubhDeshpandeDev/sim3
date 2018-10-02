const create = (req, res, next) => {
  let { username, password } = req.body;

  Object.assign(req.session, { username, userid });
  const db = req.app.get("db");

  db.add_user([username, password])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const get_User = (req, res, next) => {
  let { username, password } = req.body;

  const db = req.app.get("db");

  db.get_user([username, password])
    .then(response => {
      (req.session.username = response[0].username),
        (req.session.userid = response[0].userid);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const sessionid = (req, res, next) => {
  res.status(200).send({
    username: req.session.username,
    userid: req.session.userid
  });
};

const logout = (req, res) => {
  req.session.destroy;
};

module.exports = {
  create,
  get_User,
  logout,
  sessionid
};
