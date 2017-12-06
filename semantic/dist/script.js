// Loading the JSON

$(function() {
document.getElementById("demo").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

   var menu = [];

   $.getJSON('new-menu.json', function(data) {
       $.each(data.menu, function(i, f) {
          var mnuLst = "<button class='ui basic button'" + " id='" + i + "'>" + "<i class='square icon'></i>" + f.title + "</button>"
           $(mnuLst).appendTo("#menu .body");
           $(document).ready(function(){
              $("#" + i).click(function(){
                reset();
                $('#description').text(f.desc);
              });
            });
     });

   });


  var t = -1,
  n = 40,
  duration = 750;
  //data = [];
      var nextTime = (function() {
      var currentTime = parseInt(new Date().getTime() / 1000);
      return function() { return currentTime++; }
  })();

var reset = function() {
  console.log("ok");
  socket.removeAllListeners("data1");
  data = [{ label: 'A', values: [] }],
    length = 40,
    nextIndex = length,
    playing = true,
    interval = null;


   chart = $('#test-3 .epoch').epoch({
    type: 'time.line',
    data: data
  });
  // And this is required to see the updated styles...
  chart.redraw();
}

var data = [{ label: 'A', values: [] }],
  length = 40,
  nextIndex = length,
  playing = true,
  interval = null;


var chart = $('#test-3 .epoch').epoch({
  type: 'time.line',
  data: data
});

var pushPoint = function(val) {
  var x = nextIndex * 1 * Math.PI / length,
      y = val,
      time = nextTime();
  chart.push([{ time: time, y: y}]);
  nextIndex++;

};

  var socket = io('http://localhost:3000');
  socket.on('data1', function(msg){

    pushPoint(msg.data);
   console.log(msg.data);
}); //end socket

  // ############## initizalize socket connections

 });
