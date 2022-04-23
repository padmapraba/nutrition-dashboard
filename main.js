var svgA, svgB, svgC, svgD, svgE, svgD1;
var width, height, innerHeight, innerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };
var ingredients_data, descrip_data, attrFoodType, attrFoodItem, attrNutrient;
var fact, colorScale;
var xScale, yScale, plot, back;



document.addEventListener("DOMContentLoaded", () => {
  // svgA = d3.select("#A");
  svgB = d3.select("#B");
  svgC = d3.select("#C");
  svgD = d3.select("#D");
  svgE = d3.select("#E");
  // svgD1 = d3.select("#D #F");

  // width = +svgA.style("width").replace("px", "");
  // height = +svgA.style("height").replace("px", "");
  // innerWidth = width - margin.left - margin.right;
  // innerHeight = height - margin.top - margin.bottom;

  // Load files
  Promise.all([
    d3.csv("data/ingredients_edited.csv"),
    d3.csv("data/descriptions.csv"),
  ]).then(function (values) {
    console.log("loaded data");
    ingredients_data = values[0];
    descrip_data = values[1];
    console.log(ingredients_data);
    console.log(descrip_data);

    // data wrangling

    drawC();
  });
});

function drawA() {

  // // const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  // var widthA = svgA.node().clientWidth;
  // var heightA = svgA.node().clientHeight;
  // // // var width = 700, height  = 500;


  // // //color
  // var addColor = d3.scaleOrdinal(d3.schemeDark2);

  // svgA.select("g").remove();

  // // var node = svgA.append("g")

  // // var svgA = d3.select("body").append("svgA").attr("width", widthA).attr("height", heightA)
  // //   .style("background", "white");

  // // // //input info for data
  // // var info = [

  // //   { type: "carbs", amount: 60 },
  // //   { type: "proteins", amount: 20 },
  // //   { type: "vitamin", amount: 5},
  // //   { type: "mineral", amount: 5},
  // //   { type: "fats", amount:  10},
  // // ];

  // var info = { carbs: 60, proteins: 20, vitamin: 5, mineral: 5, fats: 10 }
  // console.log(info)
  // // var data = d3.pie().sort(null).value(function (d) { return d.amount; })(info);
  // var pie = d3.pie().value(function (d) { return d.value; })
  // var data_ready = pie(d3.entries(info))
  // // console.log(data);
  // //make arc
  // var theSegment = d3.arc()
  //   .innerRadius(0)
  //   .outerRadius(150)
  //   .padAngle(.05)
  //   .padRadius(50)

  // console.log(widthA, heightA)
  // //combine
  // // var putSections = svgA.append("g").attr("transform", "translate(249,250)")
  // //   .selectAll("path").data(data)

  // svgA.selectAll('mysectors')
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //   .attr("d", theSegment).attr("fill", "#66C2A5");


  // //putSections.enter().append("path").attr("d",theSegment).attr("fill",
  // //function(d){return addColor(d.data.amount)});
  // // putSections.enter().append("path")
  // // //make text appera
  // // var text = d3.select("g").selectAll("text").data(data);
  // // text.enter().append("text").each(function (d) {
  // //   var center = theSegment.centroid(d);
  // //   d3.select(this).attr("x", center[0]).attr("y", center[1]).text(d.data.amount)
  // // })

  // -----
  // var width = svgA.node().clientWidth;
  // var height = svgA.node().clientHeight;
  // console.log(width,height)
  // margin = 40

  var width = 500
    height = 350
    margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svgA = d3.select("#A")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 

  // create 2 data_set
  var data1 = { a: 9, b: 20, c: 30, d: 8, e: 12 }
  var data2 = { a: 6, b: 16, c: 20, d: 14, e: 19, f: 12 }

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f"])
    .range(d3.schemeDark2);

  // A function that create / update the plot for a given variable:
  function update(data) {

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function (d) { return d.value; })
      .sort(function (a, b) { console.log(a); return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))

    // map to data
    var u = svgA.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function (d) { return (color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)

    // remove the group that is not present anymore
    u
      .exit()
      .remove()

  }

  // Initialize the plot with the first dataset
  update(data1)

  drawC();
  drawB();
  drawD();
}



function drawC() {
  attrFoodType = d3.select("#type").property("value");
  attrNutrient = d3.select("#nutr").property("value");
  attrFoodItem = d3.select("#item").property("value");
  // attrFoodItem = "blue";

  var widthC = svgC.node().clientWidth;
  var heightC = svgC.node().clientHeight;

  console.log(attrFoodType, attrNutrient);

  foodData = ingredients_data.filter((d) => d.Category == attrFoodType);

  console.log(foodData);

  var foodlist = [];

  ingredients_data.forEach((element) => {
    if (element.Category == attrFoodType) {
      foodlist.push(element.Description);
    }
  });

  console.log(foodlist);
  colorScale = {
    'Protein': "#bf045b",
    'Carbohydrate': "#bf5e04",
    'Lipids': "#0464b3",
    "Monosaturated Fats": "#0464b3",
    "Polysaturated Fats": "#0464b3",
    "Saturated Fats": "#0464b3",

    'Zinc': "#b30f04",
    'Sodium': "#b30f04",
    "Calcium": "#b30f04",
    "Copper": "#b30f04",
    "Iron": "#b30f04",
    "Magnesium": "#b30f04",
    "Phosphorus": "#b30f04",
    "Potassium": "#b30f04",

    "Vitamin A - RAE": "#8404b3",
    "Vitamin B12": "#8404b3",
    "Vitamin B6": "#8404b3",
    "Vitamin C": "#8404b3",
    "Vitamin E": "#8404b3",
    "Vitamin K": "#8404b3",

    'Alpha Carotene': 'salmon',
    'Beta Carotene': 'orange red',
    'Cholesterol': 'teal',
    'Fiber': 'plum',
    'Sugar Total': '#6495ED'

  };

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
    console.log(attrFoodItem);
    if (d.Description == attrFoodItem) {
      return '#808080';
    } else {
      return colorScale[attrNutrient];
    }
  }

}



function drawB() {
  const margin = { top: 50, bottom: 50, left: 70, right: 50 };
  const FIELDS_TO_SHOW = {
    Fats: ["Monosaturated Fats", "Polysaturated Fats", "Saturated Fats"],
    Carbohydrates: ["Sugar Total"],
    Protein: ["Lycopene", "Niacin", "Thiamin"],
    Vitamins: [
      "Vitamin A - RAE",
      "Vitamin B12",
      "Vitamin B6",
      "Vitamin C",
      "Vitamin E",
      "Vitamin K",
    ],
  };

  attrFoodType = d3.select("#type").property("value");
  attrFoodItem = d3.select("#item").property("value");
  attrNutrient = d3.select("#nutr").property("value");

  var width = svgB.node().clientWidth;
  var height = svgB.node().clientHeight;

  var foodData = ingredients_data.filter(
    (d) => d.Category == attrFoodType && d.Description == attrFoodItem
  )[0];

  svgA.selectAll("g").remove();
  foodData = FIELDS_TO_SHOW[attrNutrient].map((field) => ({
    name: field,
    score: foodData[field],
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
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(foodData)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.score))
    .attr("title", (d) => d.score)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.score))
    .attr("width", x.bandwidth());

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, foodData.format))
      .attr("font-size", "20px");
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => foodData[i].name))
      .attr("font-size", "20px");
  }

  svgB.append("g").call(xAxis);
  svgB.append("g").call(yAxis);
  svgB.node();
}

function drawD() {


}
