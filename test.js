const express = require("express");
const session = require("express-session");
const ReplDBStore = require("./lib/index.js").default;

const app = express();

app.use(
  session({
    secret: "mytestingsecret156",
    store: new ReplDBStore(),
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }

  req.session.views++;

  res.send(`
    <p> Hello, ${req.session.id}! </p>
    <p> You've viewed this page ${req.session.views} times </p>
  `);
});

app.listen(3000);
