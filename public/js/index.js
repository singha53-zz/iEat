$(document).ready(function() {
  // Materlize functionality
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.dropdown-trigger').dropdown();
  $('.tabs').tabs();

  $('.close').on('click', function(e){
    console.log(event.currentTarget.id)
    var ref_this = $("ul.tabs li a").find(".active");
        console.log(ref_this);
  })

  $('#sunday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#sunday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#sunday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#monday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#monday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#monday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#tuesday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#tuesday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#tuesday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#wednesday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#wednesday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#wednesday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#thursday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#thursday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#thursday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#friday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#friday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#friday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#saturday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#saturday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#saturday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});

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

var nutrientData=[
{nutrient:'FAT_KCAL',estimate:{}}
,{nutrient:'FASAT',estimate:{}}
,{nutrient:'FOLDFE',estimate:{}}
,{nutrient:'ENERC_KJ',estimate:{}}
,{nutrient:'WATER',estimate:{}}
,{nutrient:'FAMS',estimate:{}}
,{nutrient:'FIBTG',estimate:{}}
,{nutrient:'PROCNT',estimate:{}}
,{nutrient:'CHOCDF',estimate:{}}
,{nutrient:'CHOLE',estimate:{}}
,{nutrient:'FAPU',estimate:{}}
,{nutrient:'VITA_IU',estimate:{}}
,{nutrient:'ENERC_KCAL',estimate:{}}
];
// add recipe to database
$(document).on('click', '.add', function(event) {
  var ref_this = $("ul.tabs li a.active");
  console.log(ref_this[0].id+'-'+event.target.id);
  $('#'+ref_this[0].id+'-'+event.target.id).append(`  <div class="chip">
    ${document.getElementById("recipeName").innerHTML}
    <i class="close material-icons">close</i>
  </div>`)

// ## extract recipe id
var recipeID = $('#selectRecipe div:first').children().attr('id');

  var url = `/search/${recipeID}/`

API.getRecipe(url).then(res => {

  // console.log(res.nutritionEstimates.filter(x => {
  //   console.log(x.attribute)
  //   nutrientData.map(y => {
  //     console.log(y.nutrient)
  //     y.nutrient}).includes(x.attribute)
  // }))

for (let i = 0; i < nutrientData.length; i++) {
  nutrientData[i].estimate[recipeID] =  res.nutritionEstimates.filter(d => {
  return d.attribute === nutrientData[i].nutrient
})[0].value
}
console.log(nutrientData)

  })


})


// $('#tabs-swipe-demo').on('click', function(e){
//   console.log(e)
//   element.classList.contains("active")
// })

$('ul.tabs').on('click', 'a', function(e) {
    console.log(e.target)
});


function dashboard(id, fData, colors){
    var barColor = 'steelblue';
    function segColor(c){ return colors[c]; }
    
    // compute total for each state.
    fData.forEach(function(d){d.total=d.freq.low+d.freq.mid+d.freq.high;});
    
    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
        hGDim.w = 250 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;
            
        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.
            
        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");
        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.State == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }
        
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);
            
            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });            
        }        
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:250, h: 250};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }        
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.State,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg = {};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			.attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
        }
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }
    
    // calculate total frequency by segment for all state.
    var tF = ['low','mid','high'].map(function(d){ 
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
    });    
    
    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.State,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
}

var freqData=[
{State:'AL',freq:{low:4786, mid:1319, high:249}}
,{State:'AZ',freq:{low:1101, mid:412, high:674}}
,{State:'CT',freq:{low:932, mid:2149, high:418}}
,{State:'DE',freq:{low:832, mid:1152, high:1862}}
,{State:'FL',freq:{low:4481, mid:3304, high:948}}
,{State:'GA',freq:{low:1619, mid:167, high:1063}}
,{State:'IA',freq:{low:1819, mid:247, high:1203}}
,{State:'IL',freq:{low:4498, mid:3852, high:942}}
,{State:'IN',freq:{low:797, mid:1849, high:1534}}
,{State:'KS',freq:{low:162, mid:379, high:471}}
];

var colors = {low:"#807dba", mid:"#e08214",high:"#41ab5d"}
dashboard('#piechart', freqData, colors);
})