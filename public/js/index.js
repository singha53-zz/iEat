$(document).ready(function() {
  // Materlize functionality
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.dropdown-trigger').dropdown();
  $('.tabs').tabs();
  $('#sun-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#sun-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#sun-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#mon-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#mon-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#mon-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#tues-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#tues-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#tues-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#wednes-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#wednes-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#wednes-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#thurs-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#thurs-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#thurs-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#fri-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#fri-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#fri-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#sat-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#sat-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#sat-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});

// Get references to page elements
var $meal = $("#meal");
var $allergies = $("#allergy");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// functions to use
function addImages(course, recipe) {
    // image = $('<img>')
    // image.attr('src', recipe.smallImageUrls);
    // image.attr('id', recipe.id);

    var recipeDiv = $('<div>');
    recipeDiv.addClass('card horizontal');
    recipeDiv.html(`
      <div class="card-stacked">
        <div class="card-content">
            <img id=${recipe.id} src=${recipe.smallImageUrls}>
            <br>
            <a id=${recipe.id} class="recipe">${recipe.id
      .split('-')
      .slice(0, -1)
      .join(' ')}</a>
        </div>
      </div>`);

    $('#recipeList').append(recipeDiv);
  }

// The API object contains methods for each kind of request we'll make
var API = {
  postRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(recipe)
    });
  },
  getRecipe: function(url) {
    return $.ajax({
      url: url,
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

var handleFormSubmit = function(event) {
  event.preventDefault();

  var recipe = {
    meal: $meal.val(),
    allergy: $allergies.val()
  };
  console.log(recipe)

var url = `/search/${recipe.meal}/${recipe.allergy}`
console.log(url)

  API.getRecipe(url).then(res => {
    $('#recipeList').empty();
        console.log(res);
        for (var i = 1; i < res.matches.length; i++) {
          var image;
          if (res.matches[i].attributes.course !== undefined) {
            // console.log(res.matches[i].attributes.course);
            addImages(res.matches[i].attributes.course[0], res.matches[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

  $meal.val("");
};

// clicking on a recipe
$(document).on('click', '.recipe', function(event) {
  console.log(event.currentTarget.id)
var recipe = event.currentTarget.id;
  var url = `/search/${recipe}/`

API.getRecipe(url).then(res => {
console.log(res.name)
// $('#recipeName').innerHTML = res.name;
document.getElementById("recipeName").innerHTML = res.name

$('#selectRecipe').empty();
 $('#selectRecipe').append(`<div class="row">
 
          <div id=${res.id} class="col s6">
          <img "materialboxed" src = ${res.images[0].hostedMediumUrl}>
          </div>
          <div class="col s6">
          <div class="row">
<div id="recipeTime" class="col s12">Time: ${res.totalTime}</div>
<div id="recipeFeeds" class="col s12">Feeds: ${res.numberOfServings}</div>
<div id="recipeIngredients" class="col s12">Ingredients: ${res. ingredientLines.length}</div>
<div id="recipeServes" class="col s12">Calories: ${res.numberOfServings}</div>
          </div>
          </div>
        </div>

              `)

  })
})

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

// add recipe to database
$(document).on('click', '.add', function(event) {
  console.log(event)
})

// $('#tabs-swipe-demo').on('click', function(e){
//   console.log(e)
//   element.classList.contains("active")
// })

$('ul.tabs').on('click', 'a', function(e) {
    console.log(e.target)
});

$exampleList.on("change", ".delete", handleDeleteBtnClick);

})