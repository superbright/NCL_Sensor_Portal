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


  var t = -1,
  n = 40,
  duration = 750,
  data = [];

          var nextTime = (function() {
          var currentTime = parseInt(new Date().getTime() / 1000);
          return function() { return currentTime++; }
      })();

  var socket = io('http://localhost:3000');
  socket.on('data1', function(msg){
    data.push({
      time: ++t,
      value: parseInt(msg.data)/10
    })

    tick();



function tick() {
                var data = [{ label: 'A', values: [] }],
                length = 40,
                nextIndex = length,
                playing = true,
                interval = null;


            var chart = $('#test-3 .epoch').epoch({
                type: 'time.line',
                data: data
            });

            var pushPoint = function() {
                var x = nextIndex * 2 * Math.PI / length,
                    y = Math.cos(x) + 1,
                    time = nextTime();
                chart.push([{ time: time, y: y}]);
                nextIndex++;
            };

            pushPoint();
            interval = setInterval(pushPoint, 100);

        };

        console.log(data);



});


  // ############## initizalize socket connections

 });
