var svgA, svgB, svgC, svgD, svgE, svgD1;
var width, height, innerHeight, innerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };
var ingredients_data, descrip_data, attrFoodType, attrFoodItem, attrNutrient;
var fact, colorScale;
var xScale, yScale, plot, back;

colorScale = {
  'Protein': "#bf045b",
  'Carbohydrate': "#ff7f0e",
  'Sugar Total': '#ff7f0e',

  'Lipids': "#9467bd",
  "Monosaturated Fats": "#9467bd",
  "Polysaturated Fats": "#9467bd",
  "Saturated Fats": "#9467bd",

  'Minerals': "#d62728",
  'Zinc': "#d62728",
  'Sodium': "#d62728",
  "Calcium": "#d62728",
  "Copper": "#d62728",
  "Iron": "#d62728",
  "Magnesium": "#d62728",
  "Phosphorus": "#d62728",
  "Potassium": "#d62728",

  "Vitamins": "#2ca02c",
  "Vitamin A - RAE": "#2ca02c",
  "Vitamin B12": "#2ca02c",
  "Vitamin B6": "#2ca02c",
  "Vitamin C": "#2ca02c",
  "Vitamin E": "#2ca02c",
  "Vitamin K": "#2ca02c",

  'Alpha Carotene': 'salmon',
  'Beta Carotene': 'orange red',
  'Cholesterol': 'teal',
  'Fiber': 'plum',

};

var hovertip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background", "white")
  .style("padding", 3 + "px")
  .style("margin", 5 + "px")
  .style("border-radius", 5 + "px")
  .style("border", 1 + "px solid black")
  .style("font-size", 15 + "px");

document.addEventListener("DOMContentLoaded", () => {
  // svgA = d3.select("#A");
  svgB = d3.select("#B");
  svgC = d3.select("#C");
  svgD = d3.select("#D");
  svgE = d3.select("#E");


  // Load files
  Promise.all([
    d3.csv("data/ingredients_edited.csv"),
    d3.csv("data/descriptions.csv"), d3.csv('data/ingredients_mg.csv')
  ]).then(function (values) {
    console.log("loaded data");
    ingredients_data = values[0];
    descrip_data = values[1];
    ing_mg_data = values[2];

    console.log(ingredients_data);
    console.log(descrip_data);
    console.log(ing_mg_data);

    // data wrangling


    drawC();
  });
});

function drawA() {
  attrFoodType = d3.select("#type").property("value");
  attrNutrient = d3.select("#nutr").property("value");
  attrFoodItem = d3.select("#item").property("value");

  console.log(attrFoodItem, attrFoodType, attrNutrient);

  var width = 500
  height = 350
  margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svgA = d3.select("#A")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  var foodItem = [];
  ing_mg_data.forEach((element) => {
    if (element.Description == attrFoodItem) {
      foodItem.push(element);
    }
  });

  foodItem.forEach(function (d) {
    d.Protein = +d.Protein;
    d.Carbohydrate = +d.Carbohydrate;
    d.Lipids = +d.Lipids;

    // vitamins
    d['Vitamin A - RAE'] = +d['Vitamin A - RAE'];
    d["Vitamin B12"] = +d["Vitamin B12"];
    d["Vitamin B6"] = +d["Vitamin B6"];
    d["Vitamin C"] = +d["Vitamin C"];
    d["Vitamin E"] = +d["Vitamin E"];
    d["Vitamin K"] = +d["Vitamin K"];
    d.Vitamins = d['Vitamin A - RAE'] + d["Vitamin B12"] + d["Vitamin B6"] + d["Vitamin C"] + d["Vitamin E"] + d["Vitamin K"];

    // minerals
    d.Zinc = +d.Zinc;
    d.Sodium = +d.Sodium;
    d.Calcium = +d.Calcium;
    d.Copper = +d.Copper;
    d.Iron = +d.Iron;
    d.Magnesium = +d.Magnesium;
    d.Phosphorus = +d.Phosphorus;
    d.Potassium = +d.Potassium;

    d.Minerals = d.Zinc + d.Sodium + d.Calcium + d.Copper + d.Iron + d.Magnesium + d.Phosphorus + d.Potassium;
  });

  console.log(foodItem)

  var data1 = { Protein: foodItem[0].Protein, Carbohydrate: foodItem[0].Carbohydrate, Lipids: foodItem[0].Lipids, Vitamins: foodItem[0].Vitamins, Minerals: foodItem[0].Minerals }
  console.log(data1)



  var pie = d3.pie()
    .value(function (d) { return d.value; })
    .sort(function (x, y) { console.log(x); return d3.ascending(x.key, y.key); })
  var finalData = pie(d3.entries(data1))

  // map to data
  var g = svgA.selectAll("path")
    .data(finalData)
    .enter()
    .append('path')
    .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
    .attr('fill', function (d) { return (colorScale[d.data.key]) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    .on("mouseover", function (d, i) {
      d3.select(this).transition()
        .duration('50')
        .style('opacity', '.55');

      console.log(d.data.key)
    })
    .on("mousemove", function (d, i) {

    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition()
        .duration('50')
        .style('opacity', '1');
    })
    .on('click', function (d, i) {
      console.log(`clicked ${d.data.key}`);

      drawB(d.data.key);

    })

  // g.enter()
  //   .append('path')
  //   // .merge(g)
  //   .transition()
  //   .duration(1000)
  //   .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
  //   .attr('fill', function (d) { return (colorScale[d.data.key]) })
  //   .attr("stroke", "white")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 1)



  g.exit().remove()

  drawC();
  // drawB();
  console.log('done with B')
  drawD();
}



function drawC(key) {
  attrFoodType = d3.select("#type").property("value");
  if (key) {
    attrNutrient = key;
  } else {
    attrNutrient = d3.select("#nutr").property("value");
  }
  attrFoodItem = d3.select("#item").property("value");

  var widthC = svgC.node().clientWidth;
  var heightC = svgC.node().clientHeight;

  // console.log(attrFoodType, attrNutrient);

  foodData = ingredients_data.filter((d) => d.Category == attrFoodType);

  // console.log(foodData);

  var foodlist = [];

  ingredients_data.forEach((element) => {
    if (element.Category == attrFoodType) {
      foodlist.push(element.Description);
    }
  });

  // console.log(foodlist);


  let max = d3.max(foodData, (d) => +d[attrNutrient]);
  let min = d3.min(foodData, (d) => +d[attrNutrient]);

  // console.log(min, max);

  var size = d3.scaleLinear().domain([min, max]).range([7, 50]);

  var hovertip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "white")
    .style("padding", 3 + "px")
    .style("margin", 5 + "px")
    .style("border-radius", 5 + "px")
    .style("border", 1 + "px solid black")
    .style("font-size", 15 + "px");

  svgC.select("g").remove();

  var node = svgC.append("g")
    .selectAll("circle")
    .data(foodData)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", (d) => size(+d[attrNutrient]))
    .attr("cx", widthC / 2)
    .attr("cy", heightC / 2)
    // .style("fill", colorScale[attrNutrient])
    .style('fill', d => fillCirc(d))
    .style("fill-opacity", 0.9)
    .style("stroke-width", 1)
    .on("mouseover", function (d, i) {
      hovertip.html(`<b>${d.Description}</b><br>${+d[attrNutrient]}`);
      hovertip.style("visibility", "visible");
    })
    .on("mousemove", function (d, i) {
      hovertip
        .style("top", d3.event.pageY - 10 + "px")
        .style("left", d3.event.pageX + 10 + "px");
    })
    .on("mouseout", function (d, i) {
      hovertip.style("visibility", "hidden");
    })
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  var simulation = d3
    .forceSimulation()
    .force(
      "center",
      d3
        .forceCenter()
        .x(widthC / 2)
        .y(heightC / 2)
    )
    .force("charge", d3.forceManyBody().strength(0.5))
    .force(
      "collide",
      d3
        .forceCollide()
        .strength(0.1)
        .radius(function (d) {
          return size(+d[attrNutrient]) + 3;
        })
        .iterations(1)
    );
  simulation.nodes(foodData).on("tick", function (d) {
    node
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
  });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    hovertip.style("visibility", "hidden");
    if (!d3.event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    hovertip.style("visibility", "hidden");
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    hovertip.style("visibility", "hidden");
    if (!d3.event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }

  svgE.selectAll('g').remove();

  var widthE = svgE.node().clientWidth;

  // add text to svg E
  var glyph = svgE.append('g')
    .attr('transform', `translate(${widthE / 2},40)`)

  glyph.append('text')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .attr('font-size', 30 + 'px')
    .attr('fill', 'black')
    .style("font-weight", "bold")
    .text(attrNutrient);

  function fillCirc(d) {
    // console.log(attrFoodItem);
    if (d.Description == attrFoodItem) {
      return '#808080';
    } else {
      return colorScale[attrNutrient];
    }
  }

}



function drawB(key) {
  console.log("key:" + key);

  const margin = { top: 50, bottom: 50, left: 70, right: 50 };

  const FIELDS_TO_SHOW = {
    Lipids: ["Monosaturated Fats", "Polysaturated Fats", "Saturated Fats"],
    Carbohydrate: ["Sugar Total"],
    Protein: ["Lycopene", "Niacin", "Thiamin"],
    Vitamins: [
      "Vitamin A - RAE",
      "Vitamin B12",
      "Vitamin B6",
      "Vitamin C",
      "Vitamin E",
      "Vitamin K",
    ],
    Minerals: ['Zinc', 'Sodium', 'Calcium', 'Copper', 'Iron', 'Magnesium', 'Phosphorus', 'Potassium']
  };

  attrFoodType = d3.select("#type").property("value");
  attrFoodItem = d3.select("#item").property("value");
  attrNutrient = d3.select("#nutr").property("value");

  var width = svgB.node().clientWidth;
  var height = svgB.node().clientHeight;

  var foodData = ingredients_data.filter(
    (d) => d.Category == attrFoodType && d.Description == attrFoodItem
  )[0];
  console.log("food data", foodData);

  svgB.selectAll("g").remove();
  foodData = FIELDS_TO_SHOW[key].map((field) => ({
    name: field,
    score: +foodData[field],
  }));

  const x = d3
    .scaleBand()
    .domain(d3.range(foodData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      foodData.reduce((max, data) => Math.max(max, data.score), 0) * 1.3,
    ])
    .range([height - margin.bottom, margin.top]);

  svgB
    .append("g")
    .attr("fill", colorScale[key])
    .selectAll("rect")
    .data(foodData)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.score))
    .attr("title", (d) => d.score)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.score))
    .attr("width", x.bandwidth())
    .on('click', function (d, i) {
      console.log(`clicked ${d.name}`);

      drawC(d.name);

    })

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, foodData.format))
      .attr("font-size", "15px");
  }
  if (key == 'Minerals' || key == 'Vitamins') {
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => foodData[i].name))
        .selectAll("text")
        // .style("text-anchor", "end")     
        // .attr("dx", "-10px")             
        // .attr("dy", "0px")              
        .attr("transform", "rotate(-10)")
        .attr("font-size", "10px")
    }
  }
  else {
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((i) => foodData[i].name))
        .selectAll("text")
        // .style("text-anchor", "end")     
        // .attr("dx", "-10px")             
        // .attr("dy", "0px")              
        // .attr("transform", "rotate(-10)" )
        .attr("font-size", "10px")
    }
  }


  svgB.append("g").call(xAxis);
  svgB.append("g").call(yAxis);
  svgB.node();

}

function drawD() {
  svgD.append('text')
    .attr('x', '55')
    .attr('y', '54')
    .text('Nutrition Facts')
    .attr("font-size", "40px")
    .style('font-weight', 'bold')

  svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 5)
    .attr("x", 10)
    .attr("y1", 70)
    .attr("x2", 400)
    .attr("y2", 70)

    /////////////////////////////////////////////////
    svgD.append('text')
    .attr('x', '10')
    .attr('y', '88')
    .text('8 serving per container')
    .attr("font-size", "15px")
    // .style('font-weight', 'bold')

    svgD.append('text')
    .attr('x', '10')
    .attr('y', '105')
    .text('Serving size')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')

    svgD.append('text')
    .attr('x', '275')
    .attr('y', '105')
    .text('2/3 cup (55g)')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')

    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 20)
    .attr("x1", 10)
    .attr("y1", 125)
    .attr("x2", 390)
    .attr("y2", 125)

    svgD.append('text')
    .attr('x', '10')
    .attr('y', '155')
    .text('Amount per serving')
    .attr("font-size", "15px")
    .style('font-weight', 'bold')

    svgD.append('text')
    .attr('x', '10')
    .attr('y', '190')
    .text('Calories')
    .attr("font-size", "35px")
    .style('font-weight', 'bold')

    svgD.append('text')
    .attr('x', '310')
    .attr('y', '190')
    .text('230')
    .attr("font-size", "40px")
    .style('font-weight', 'bold')

    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 10)
    .attr("x1", 10)
    .attr("y1", 205)
    .attr("x2", 390)
    .attr("y2", 205)
    ///////////////////////////////////////////////
    /////////////////daily value to cholesrol
    svgD.append('text')
    .attr('x', '55')
    .attr('y', '54')
    .text('% Daily Value*')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')
    //lef right
    .attr("x", 270)
    //updown?
    .attr("y", 230 )

    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x", 567)
    .attr("y1", 240)
    .attr("x2", 400)//left right width 
    .attr("y2", 240)

    svgD.append('text')
    .attr('x', '10')
    .attr('y', '260')
    .text('Total Fat')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')


    svgD.append('text')
    .attr('x', '90')
    .attr('y', '260')
    .text('8g')
    .attr("font-size", "17px")

    svgD.append('text')
    .attr('x', '350')
    .attr('y', '260')
    .text('10%')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')
    
    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x", 567)
    .attr("y1", 270)
    .attr("x2", 400)//left right width 
    .attr("y2", 270)

    svgD.append('text')
    .attr('x', '30')
    .attr('y', '290')
    .text('Saurated Fat 1g')
    .attr("font-size", "15px")

    svgD.append('text')
    .attr('x', '360')
    .attr('y', '290')
    .text('5%')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')

    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x", 567)
    .attr("y1", 300)
    .attr("x2", 400)//left right width 
    .attr("y2", 300)

    svgD.append('text')
    .attr('x', '30')
    .attr('y', '320')
    .text('Trans Fat 0g')
    .attr("font-size", "15px")

    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x", 567)
    .attr("y1", 330)
    .attr("x2", 400)//left right width 
    .attr("y2", 330)

    svgD.append('text')
    .attr('x', '10')
    .attr('y', '353')
    .text('Cholesterol')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')
 
    svgD.append('text')
    .attr('x', '110')
    .attr('y', '353')
    .text('0mg')
    .attr("font-size", "17px")

    svgD.append('text')
    .attr('x', '360')
    .attr('y', '350')
    .text('0%')
    .attr("font-size", "17px")
    .style('font-weight', 'bold')
    
    svgD.append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x", 567)
    .attr("y1", 364)
    .attr("x2", 400)//left right width 
    .attr("y2", 364)

}
