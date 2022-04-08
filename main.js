var svgA, svgB,svgC,svgD;
var width, height, innerHeight, innerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };
var ingredients_data, descrip_data, attrFoodType, attrFoodItem, attrNutrient;
var xScale, yScale, plot, back;





document.addEventListener('DOMContentLoaded', () => {
    svgA = d3.select('#A');
    svgB = d3.select('#B');
    svgC = d3.select('#C');
    svgD = d3.select('#D');


    width = +svgA.style('width').replace('px', '');
    height = +svgA.style('height').replace('px', '');;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;


    // Load files
    Promise.all([d3.csv('data/ingredients_edited.csv'),d3.csv('data/descriptions.csv')])
        .then(function (values) {
            console.log('loaded data');
            ingredients_data = values[0];
            descrip_data = values[1];
            console.log(ingredients_data)
            console.log(descrip_data)
            


            // data wrangling
            
           drawC();

        });
});

function drawA(){


    drawC();
    drawD();

}

function drawC() {
    attrFoodType = d3.select('#attribute-select-type').property('value');
    attrNutrient = d3.select('#attribute-select-nutr').property('value');

    console.log(attrFoodType, attrNutrient)

    foodData = ingredients_data.filter( d => d.Category == attrFoodType);

    console.log(foodData)

    var color = d3.scaleOrdinal()
    .domain(['Alpha Carotene','Beta Carotene','Beta Cryptoxanthin','Carbohydrate','Cholesterol','Choline','Fiber','Lutein and Zeaxanthin','Lycopene','Niacin','Protein','Retinol','Riboflavin','Selenium','Sugar Total','Thiamin','Water','Monosaturated Fats','Polysaturated Fats','Saturated Fats','Lipids','Calcium','Copper','Iron','Magnesium','Phosphorus','Potassium','Sodium','Zinc','Vitamin A - RAE','Vitamin B12','Vitamin B6','Vitamin C','Vitamin E','Vitamin K'])
    .range(d3.schemeSet1);

    let max = d3.max(foodData, d => +d[attrNutrient])
    let min = d3.min(foodData, d => +d[attrNutrient])

    console.log(min,max)

    var size = d3.scaleLinear()
    .domain([min, max])
    .range([7,55])
    
    

    

}

function drawB(){

    

}

function drawD(){

}









