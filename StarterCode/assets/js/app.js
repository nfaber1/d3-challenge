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

// INITIAL PARAMS 

var chosenXAxis = "poverty"

// function xScale(data, chosenXAxis) {
    
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(data, d => d[chosenXAxis]) * 0.75,
//             d3.max(data, d => d[chosenXAxis]) * 1.25
//         ])
//         // .range([0. width]);

//     return xLinearScale;
// };

// function renderAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);
  
//     xAxis.transition()
//       .duration(1000)
//       .call(bottomAxis);
  
//     return xAxis;
//   }
  
//   // function used for updating circles group with a transition to
//   // new circles
//   function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  
//     circlesGroup.transition()
//       .duration(1000)
//       .attr("cx", d => newXScale(d[chosenXAxis]));
  
//     return circlesGroup;
//   }
  
//   // function used for updating circles group with new tooltip
//   function updateToolTip(chosenXAxis, circlesGroup) {
  
//     var label;
  
//     if (chosenXAxis === "poverty") {
//       label = "Poverty (%):";
//     }
//     else {
//       label = "Obesity (%):";
//     }
  
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
//       });
  
//     circlesGroup.call(toolTip);
  
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
  
//     return circlesGroup;
//   }

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

  // X LINEAR SCALE

  var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.poverty)])
        .range([height, 0]);

    // CREATE SCALES
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);
  
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
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
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .attr("fill", "red")
    .attr("opacity", ".3");

     // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  // append x axis label
  chartGroup.append("text")
    .attr("x", 250)
    .attr("y", 450)
    .attr("value", "poverty") // value to grab for event listener
    .classed("aText", true)
    .text("Poverty (%)");

  // append y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -300)
    .attr("value", "obesity") // value to grab for event listener
    .attr("dy", "1em")
    .classed("aText", true)
    .text("People Who Lack Healthcare (%)");

    // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//     labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(data, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "poverty") {
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//             obesityLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);

//   };

});