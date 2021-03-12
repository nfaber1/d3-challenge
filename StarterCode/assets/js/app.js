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
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//APPEND SVG GROUP

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// INITIAL PARAMETERS

var XAxis = "Poverty Rate";
var Yaxis = "Healthcare Rate";

// GET DATA

d3.csv("assets/data/data.csv").then(function (data) {

  // PARSE DATA
    data.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
  });

  function xScale(data, XAxis) {

    var xLinearScale = xScale(data, XAxis)
    // CREATE SCALES
    var yLinearScale = d3.scaleLinear()
        .domaun([0, d3.max(data, d => d.obesity)])
        .range([height, 0]);
  
    // return yLinearScale;
  


  // create y scale function


  // create x scale function
  var xLinearScale = d3.scaleLinear()
    .domain([8.75, d3.max(data, d => d.poverty)])
    .range([0, width]);

  // create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    // .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[XAxis]))
    .attr("cy", d => yLinearScale(d.num_hits))
    .attr("r", 15)
    .attr("fill", "red")
    .attr("opacity", ".1");

  // append x axis label
  chartGroup.append("text")
    .attr("x", 400)
    .attr("y", 610)
    .classed("aText", true)
    .text("In Poverty %");

  // append y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacks Healthcare %");

  // state abbreviations
  var circlesLabels = chartGroup.selectAll(null)
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.healthcare))
    .classed("stateText", true)
    .attr("alignment-baseline", "central")

  };

});