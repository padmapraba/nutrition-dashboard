var svgA, svgB, svgC, svgD, svgE, svgD1;
var width, height, innerHeight, innerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };
var ingredients_data, descrip_data, attrFoodType, attrFoodItem, attrNutrient;
var fact;
var xScale, yScale, plot, back;

document.addEventListener("DOMContentLoaded", () => {
  svgA = d3.select("#A");
  svgB = d3.select("#B");
  svgC = d3.select("#C");
  svgD = d3.select("#D");
  svgE = d3.select("#E");
  svgD1 = d3.select("#D #F");

  width = +svgA.style("width").replace("px", "");
  height = +svgA.style("height").replace("px", "");
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;

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

    drawA();
  });
});

function drawA() {

  // const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  var widthA = svgA.node().clientWidth;
  var heightA = svgA.node().clientHeight;
  // // var width = 700, height  = 500;


  // //color
  var addColor = d3.scaleOrdinal(d3.schemeDark2);

  svgA.select("g").remove();

  // var node = svgA.append("g")

  // var svgA = d3.select("body").append("svgA").attr("width", widthA).attr("height", heightA)
  //   .style("background", "white");

  // //input info for data
  // var info = [

  //   { type: "carbs", amount: 60 },
  //   { type: "proteins", amount: 20 },
  //   { type: "vitamin", amount: 5},
  //   { type: "mineral", amount: 5},
  //   { type: "fats", amount:  10},
  // ];

  var info = {carbs: 60, proteins: 20, vitamin: 5, mineral: 5, fats:10}
  console.log(info)
  // var data = d3.pie().sort(null).value(function (d) { return d.amount; })(info);
  var pie = d3.pie().value(function(d) {return d.value;})
  var data_ready = pie(d3.entries(info))
  // console.log(data);
  //make arc
  var theSegment = d3.arc()
    .innerRadius(0)
    .outerRadius(150)
    .padAngle(.05)
    .padRadius(50)

  console.log(widthA,heightA)
  //combine
  // var putSections = svgA.append("g").attr("transform", "translate(249,250)")
  //   .selectAll("path").data(data)

  svgA.selectAll('mysectors')
      .data(data_ready)
      .enter()
      .append('path')
      .attr("d", theSegment).attr("fill", "#66C2A5");


  //putSections.enter().append("path").attr("d",theSegment).attr("fill",
  //function(d){return addColor(d.data.amount)});
  // putSections.enter().append("path")
  // //make text appera
  // var text = d3.select("g").selectAll("text").data(data);
  // text.enter().append("text").each(function (d) {
  //   var center = theSegment.centroid(d);
  //   d3.select(this).attr("x", center[0]).attr("y", center[1]).text(d.data.amount)
  // })
  drawC();
  drawB();
  drawD();
}

function drawC() {
  attrFoodType = d3.select("#attribute-select-type").property("value");
  attrNutrient = d3.select("#attribute-select-nutr").property("value");
  attrFoodItem = d3.select("#attribute-select-item").property("value");
  attrFoodItem = "blue";

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

  var color = d3
    .scaleOrdinal()
    .domain(foodlist)
    .range([
      "#1b70fc",
      "#faff16",
      "#d50527",
      "#158940",
      "#f898fd",
      "#24c9d7",
      "#cb9b64",
      "#866888",
      "#22e67a",
      "#e509ae",
      "#9dabfa",
      "#437e8a",
      "#b21bff",
      "#ff7b91",
      "#94aa05",
      "#ac5906",
      "#82a68d",
      "#fe6616",
      "#7a7352",
      "#f9bc0f",
      "#b65d66",
      "#07a2e6",
      "#c091ae",
      "#8a91a7",
      "#88fc07",
      "#ea42fe",
      "#9e8010",
      "#10b437",
      "#c281fe",
      "#f92b75",
      "#07c99d",
      "#a946aa",
      "#bfd544",
      "#16977e",
      "#ff6ac8",
      "#a88178",
      "#5776a9",
      "#678007",
      "#fa9316",
      "#85c070",
      "#6aa2a9",
      "#989e5d",
      "#fe9169",
      "#cd714a",
      "#6ed014",
      "#c5639c",
      "#c23271",
      "#698ffc",
      "#678275",
      "#c5a121",
      "#a978ba",
      "#ee534e",
      "#d24506",
      "#59c3fa",
      "#ca7b0a",
      "#6f7385",
      "#9a634a",
      "#48aa6f",
      "#ad9ad0",
      "#d7908c",
      "#6a8a53",
      "#8c46fc",
      "#8f5ab8",
      "#fd1105",
      "#7ea7cf",
      "#d77cd1",
      "#a9804b",
      "#0688b4",
      "#6a9f3e",
      "#ee8fba",
      "#a67389",
      "#9e8cfe",
      "#bd443c",
      "#6d63ff",
      "#d110d5",
      "#798cc3",
      "#df5f83",
      "#b1b853",
      "#bb59d8",
      "#1d960c",
      "#867ba8",
      "#18acc9",
      "#25b3a7",
      "#f3db1d",
      "#938c6d",
      "#936a24",
      "#a964fb",
      "#92e460",
      "#a05787",
      "#9c87a0",
      "#20c773",
      "#8b696d",
      "#78762d",
      "#e154c6",
      "#40835f",
      "#d73656",
      "#1afd5c",
      "#c4f546",
      "#3d88d8",
      "#bd3896",
      "#1397a3",
      "#f940a5",
      "#66aeff",
      "#d097e7",
      "#fe6ef9",
      "#d86507",
      "#8b900a",
      "#d47270",
      "#e8ac48",
      "#cf7c97",
      "#cebb11",
      "#718a90",
      "#e78139",
      "#ff7463",
      "#bea1fd",
    ]);

  let max = d3.max(foodData, (d) => +d[attrNutrient]);
  let min = d3.min(foodData, (d) => +d[attrNutrient]);

  console.log(min, max);

  var size = d3.scaleLinear().domain([min, max]).range([7, 35]);

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
          .style("fill", (d) => color(d.Description))
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
        .attr('transform',`translate(${widthE/2},40)`)

    glyph.append('text')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .attr('font-size', 30 + 'px')
    .attr('fill', 'black')
    .style("font-weight", "bold")
    .text(attrNutrient);
}

function drawB() {
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
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

  attrFoodType = d3.select("#attribute-select-type").property("value");
  attrFoodItem = d3.select("#attribute-select-item").property("value");
  attrNutrient = d3.select("#attribute-select-nutr").property("value");

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

function drawD() { }
