$(document).ready(function() {

  // add initialize recipe to dashboard
  setRecipe();

    // add recipes to calendar
  getRecipes();

  function setRecipe(){
   $.get("/api/recipe/Awesome-Pepperoni-Pizza-1873784", function(data) {
     if(data === null){
       window.recipeInfo = {name: "Awesome Pepperoni Pizza",
  recipeID: "Awesome-Pepperoni-Pizza-1873784",
  time:"45 min",
  feeds:4,
  ingredients:8,
  imageUrl:"https://lh3.googleusercontent.com/UfzLfk9ugfdHhepQcvY30yBVA-070xMFYM-e72JZXdN2e2bP827PHte_9FatjPYqQl8-GO2wSFu0GkFtchoqocM=s180",
  recipeUrl:"http://www.bigoven.com/recipe/awesome-pepperoni-pizza/165695",
  calories:  655.87,
  nutritionEstimates: JSON.stringify([{"attribute":"FAT_KCAL","value":280},{"attribute":"FASAT","value":13.73},{"attribute":"FOLDFE","value":269.02},{"attribute":"WATER","value":127.6},{"attribute":"FAMS","value":12.24},{"attribute":"FIBTG","value":2.75},{"attribute":"PROCNT","value":30},{"attribute":"CHOCDF","value":61.69},{"attribute":"CHOLE","value":0.08},{"attribute":"FAPU","value":1.84}]),
  nutritionEstimatesAvail:`<div id="recipeServes" class="col s12">Nutritional information available</div>`
       }
     } else {
       window.recipeInfo =  data
     }
  console.log(window.recipeInfo)
  })
  }

  function getRecipes(){
    $.get("/api/recipes", function(data) {
      console.log(data.length)

      if(data.length !== 0){
      data.forEach(d =>{
        $(`#${d.calendar}`).empty();
        $(`#${d.calendar}`).append(`  <div class="chip" id="${d.recipeID}">
    ${d.name}
    <i class="close material-icons">close</i>
  </div>`)
      });
console.log(data)

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
  d.nutritionEstimates = JSON.parse(d.nutritionEstimates)
 if(d.nutritionEstimates !== null){
  for (let i = 0; i < nutrientData.length; i++) {
  nutrientData[i].freq[d.recipeID] =  d.nutritionEstimates[i].freq[d.recipeID]
  }
  }
});
console.log(nutrientData)
window.nutrientData = nutrientData;
  $('#piechart').empty();
  dashboard('#piechart', nutrientData);
      } else{
        $('#piechart').empty();
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
    window.nutrientData = nutrientData;
      }

    });
  }

  window.getRecipes = getRecipes;

});