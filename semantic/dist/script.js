// Loading the JSON

$(function() {


   var menu = [];

   $.getJSON('new-menu.json', function(data) {
       $.each(data.menu, function(i, f) {
          var mnuLst = "<button class='ui basic button'" + " id='" + i + "'>" + "<i class='square icon'></i>" + f.title + "</button>"
           $(mnuLst).appendTo("#menu .body");
           $(document).ready(function(){
              $("#" + i).click(function(){

                $('#description').text(f.desc);
              });
            });



     });

   });

  // ############## initialize data
  var t = -1,
  n = 40,
  duration = 750,
  data = [];

  // ############## initizalize socket connections

  var socket = io('http://localhost:3000');
  socket.on('data1', function(msg){

      //add data to the queue
      data.push({
       time: ++t,
       value: parseInt(msg.data)/10
     })

     tick();
  });

  // ############## initialize GRAPH

  // Set the dimensions of the canvas / graph
  var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

  var n = 40,
    random = d3.randomNormal(0, .2),
    data = d3.range(n).map(random);
    // Adds the svg canvas
    var svg = d3.select(".data")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 0]);
var line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

svg.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width)
  .attr("height", height);

var xAxis = d3.axisBottom(10).tickFormat(function(d){ return d.x;});
var widthScale = d3.scaleLinear()
    .domain([0, 120])
    .range([0, width]);
var axis = d3.axisLeft()
    .scale(widthScale);

var path = svg.append("g")
  .attr("clip-path", "url(#clip)")
  .append("path")
  .data([data])
  .attr("class", "line");


function tick() {
//  console.log(data.length);
  // update the domains
  x.domain([t - n + 2, t]);

  // redraw the line
  svg.select(".line")
    .attr("d", line)
    .attr("transform", null);

  // slide the x-axis left
  axis.transition()
    .duration(duration)
    .ease("linear")
    .call(x.axis);

  // slide the line left
  path.transition()
    .duration(duration)
    .ease("linear")
    .attr("transform", "translate(" + x(t - n) + ")");

  // pop the old data point off the front
  if (data.length > 20) data.shift();

}


});




// D3.JS Script

// Parse the date / time
//var parseDate = d3.time.format("%d-%b-%y").parse;
