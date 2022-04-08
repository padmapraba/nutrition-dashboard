var svgA, svgB,svgC,svgD;
var width, height, innerHeight, innerWidth;
var margin = { top: 50, right: 60, bottom: 60, left: 100 };
var ingredients_data, attributeX, attributeY, attributeS;
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
    Promise.all([d3.csv('data/ingredients_edited.csv')])
        .then(function (values) {
            console.log('loaded data');
            ingredients_data = values[0];
            console.log(ingredients_data)
            


            // data wrangling
            
           

        });
});

function drawChart() {

    


}

function drawBackground() {

    




}









