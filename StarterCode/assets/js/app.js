var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//CREATE AN SVG WRAPPER, APPEND AN SVG GROUP THAT WILL HOLD OUR CHART,
//AND SHIFT THE LATTER BY LEFT AND TOP MARGINS

var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//APPEND SVG GROUP

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// GET DATA

d3.csv("assets/data/data.csv").then(function (data, err) {
    if (err) throw err;
    console.log(data)

  // PARSE DATA
    data.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
  });

//   };

});