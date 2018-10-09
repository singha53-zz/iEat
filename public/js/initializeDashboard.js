$(document).ready(function() {

  // add initialize recipe to dashboard
  setRecipe();

  // add recipes to calendar
  getRecipes();

  function setRecipe(){
   $.get("/api/recipe/Awesome-Pepperoni-Pizza-1873784", function(data) {
  window.recipeInfo =  data
  console.log(data)
  })
  }

  function getRecipes(){
    $.get("/api/recipes", function(data) {
      data.forEach(d =>{
        $(`#${d.calendar}`).empty();
        $(`#${d.calendar}`).append(`  <div class="chip" id="${d.recipeID}">
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