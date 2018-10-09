$(document).ready(function() {

  // add initialize recipe to dashboard
  setRecipe();

  // add recipes to calendar
  getRecipes();

  function setRecipe(){
  window.recipeInfo =  {name: "Awesome Pepperoni Pizza",
  time:"45 min",
  feeds:4,
  ingredients:8,
  recipeUrl:"https://lh3.googleusercontent.com/UfzLfk9ugfdHhepQcvY30yBVA-070xMFYM-e72JZXdN2e2bP827PHte_9FatjPYqQl8-GO2wSFu0GkFtchoqocM=s180",
  calories: 655.87}
  }

  function getRecipes(){
    $.get("/api/recipes", function(data) {
      data.forEach(d =>{
        $(`#${d.calendar}`).append(`  <div class="chip">
    ${d.name}
    <i class="close material-icons">close</i>
  </div>`)
      });
console.log(data)
      if(data.length !== 0){
// update piechart
var nutrientData=[
    {State:'FAT_KCAL',freq:{}}
    ,{State:'FASAT',freq:{}}
    ,{State:'FOLDFE',freq:{}}
    // ,{State:'ENERC_KJ',freq:{}}
    ,{State:'WATER',freq:{}}
    ,{State:'FAMS',freq:{}}
    ,{State:'FIBTG',freq:{}}
    ,{State:'PROCNT',freq:{}}
    ,{State:'CHOCDF',freq:{}}
    ,{State:'CHOLE',freq:{}}
    ,{State:'FAPU',freq:{}}
    // ,{State:'VITA_IU',freq:{}}
    // ,{State:'ENERC_KCAL',freq:{}}
    ];

data.forEach(d => {
  d.nutrientData = JSON.parse(d.nutrientData)
 if(d.nutrientData !== null){
  for (let i = 0; i < nutrientData.length; i++) {
  nutrientData[i].freq[d.recipeID] =  d.nutrientData[i].freq[d.recipeID]
  }
  }
});
console.log(nutrientData)

  $('#piechart').empty();
  dashboard('#piechart', nutrientData);
      }

    });
  }

});