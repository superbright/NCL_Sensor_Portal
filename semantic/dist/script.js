// Loading the JSON

$(function() {
    document.getElementById("demo").innerHTML = formatAMPM();

    function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1
                ? '0' + d.getMinutes()
                : d.getMinutes(),
            hours = d.getHours().toString().length == 1
                ? '0' + d.getHours()
                : d.getHours(),
            ampm = d.getHours() >= 12
                ? 'pm'
                : 'am',
            months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            days = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ];
        return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
    }

    //all socket io operations
    var socket;

    //data fill for consistent time move
    var intervalFunc;
    var currentBaseData = 0;

    //json loaded menu
    var menu = [];

    $.getJSON('new-menu.json', function(data) {
        $.each(data.menu, function(i, f) {

            if(i == 0) {
              $('#headertitle').text("DATA: " + f.title);
            }
            var mnuLst = "<button class='ui basic button '" +
            " id='" + i + "'>" + "<i class='square icon'></i>" + f.title + "</button>"
            $(mnuLst).appendTo("#menu .body");
            $(document).ready(function() {
                $("#" + i).click(function() {

                    reset(i,f.dataurl);
                    currentBaseData = f.basedata;

                    $('#description').text(f.desc);
                    $('#headertitle').text("DATA: " + f.title);
                });



            });
        });

        //kick off data
        socket = io('http://27.0.0.1:3000');
        currentBaseData = data.menu[0].basedata;
        socket.on(data.menu[0].dataurl, function(msg) {
            console.log(msg);
            pushPoint(msg.data);
        });

        intervalFunc = setInterval(dataFillerfunc, 1000);
    });

    var dataFillerfunc = function() {
        console.log(currentBaseData);
        pushPoint(currentBaseData);
    }


    var reset = function(id,dataurl) {

            socket.removeAllListeners();

            data = [
                {
                    label: 'A',
                    values: []
                }
            ],
            length = 40,
            nextIndex = length,
            playing = true,
            interval = null;

            $('#test-3').empty().append("<div class='epoch'></div>");
            chart = $('#test-3 .epoch').epoch({
                type: 'time.line',
                data: data,
                axes: ['left', 'bottom']
            });

            // And this is required to see the updated styles...
            chart.redraw();
            //console.log(dataurl);
            socket.on(dataurl, function(msg) {
                 console.log(msg);
                pushPoint(msg.data);
            });
        } // end reset


        var t = -1,
            n = 40,
            duration = 750;
        var nextTime = (function() {
            var currentTime = parseInt(new Date().getTime() / 1000);
            return function() {
                return currentTime++;
            }
        })();

        data = [
            {
                label: 'A',
                values: []
            }
        ],
        length = 40,
        nextIndex = length,
        scale = 1,
        playing = true,
        interval = null;

        var chart = $('#test-3 .epoch').epoch({
            type: 'time.line',
            data: data,
            axes: ['left', 'bottom']
        });

        var pushPoint = function(val) {
            var x = nextIndex * 1 * Math.PI / length,
                y = val,
                time = nextTime();
            chart.push([
                {
                    time: time,
                    y: y
                }
            ]);
            nextIndex++;

        };

    });
