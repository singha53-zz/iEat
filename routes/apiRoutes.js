var db = require("../models");
var axios = require('axios');

module.exports = function(app) {

app.get('/register', function(req, res){
  res.render("register");
})

app.post('/register', function(req, res){
  // res.send("registered!")
  db.User.register(new db.User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register')
    } 
    passport.authenticate("local")(req, res, function(){
      res.redirect('/');
    })
  });
})


// search a given recipe keyword
  app.get("/search/:meal/:allergy", function(req, res) {

var url = `https://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${req.params.meal.replace(
      ' ',
      '+'
    )}&requirePictures=true${req.params.allergy.split(',')
      .map(allergy => {
        return '&allowedAllergy[]=' + allergy;
      })
      .join('')}`;
    console.log(url);

  axios.get(url)
  .then(function(response) {
    res.json(response.data)
  })
  });

//  search for a given recipe
app.get("/search/:recipe", function(req, res) {
    console.log(req.params)
    var url = 'https://api.yummly.com/v1/api/recipe/' +
      req.params.recipe +
      '?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f';




      axios.get(url)
  .then(function(response) {
    res.json(response.data)
  })
})

  // Get all examples
  app.get("/api/recipes", function(req, res) {
    db.Allergy.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new example
  app.post("/api/recipes", function(req, res) {
    console.log('server:' + req.body)

  db.Allergy.create({
    meal: req.body.meal,
    allergy: JSON.stringify(req.body.allergy)
  }).then(function(result) {
      res.json(result)
    });
    res.redirect('/search')
  });

  // get search
  app.get("/search", function(req, res) {
    db.Allergy.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Allergy.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
