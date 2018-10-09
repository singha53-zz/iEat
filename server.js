require("dotenv").config();
var express                = require("express"),
    bodyParser             = require("body-parser"),
    exphbs                 = require("express-handlebars"),
    session               = require('express-session')
    passport               = require("passport")

var app = express();
var PORT = process.env.PORT || 3000;

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(require("client-sessions")({
  secret: "O Canada our home and native land.",
  resave: false,
  saveUninitialized: false
}))

// Handlebars
app.set('views', './views')
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "development") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
