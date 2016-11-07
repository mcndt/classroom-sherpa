var rocky = require('rocky');
var schedule = require('./schedule.json');

rocky.on('draw', function(event) {
  
  // setup
  var context = event.context;
  context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
  
  var w = context.canvas.unobstructedWidth;
  var h = context.canvas.unobstructedHeight;
 // var date = new Date("2016-10-28T13:03:00");
  var date = new Date();
  var course = " -";
  var room = " -";
  var tc = date.toLocaleTimeString(undefined, {hour: '2-digit'}) + date.toLocaleTimeString(undefined, {minute: '2-digit'});
  
  // draw time
  context.fillStyle = "white";
  context.textAlign = "center";
  context.font = "42px bold numbers Leco-numbers";
  context.fillText(date.toLocaleTimeString(undefined, {hour: '2-digit'}) + ":" +
                   date.toLocaleTimeString(undefined, {minute: '2-digit'}),
                   (w/2), (h/4), w);
  context.font = "14px Gothic";
  context.fillStyle = "#b3b3b3";
  context.fillText(date.getDate() + "/" + (date.getMonth() + 1), (w/2), ((h/4)+45), w);
  
  // draw sherpa
  for (var i = 0; i < schedule[date.getDay()].length; i++) {
    if (tc >= schedule[date.getDay()][i].start && tc < schedule[date.getDay()][i].end) {
      course = schedule[date.getDay()][i].class;
      room =   schedule[date.getDay()][i].room;
    }
  }
  
  context.font = "24px bold Gothic";
  context.fillStyle = "#ff6600";
  context.textAlign = "left";
  context.fillText( course, 9, (h-33), w);
  context.textAlign = "right";
  context.fillText( room, (w-9), (h-33), w);
  
  context.strokeStyle = "#ff6600";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(6, (h-36));
  context.lineTo((w-6), (h-36));
  context.stroke();
  
  
  
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});