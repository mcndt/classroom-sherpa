var rocky = require('rocky');
var schedule = require('./schedule.json');

rocky.on('draw', function(event) {
  var context = event.context;
  context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
  var w = context.canvas.unobstructedWidth;
  var h = context.canvas.unobstructedHeight;
  var date = new Date("2016-10-28T12:41:00");
  
  
  context.fillStyle = "white";
  context.textAlign = "center";
  context.font = "28px light numbers Leco-numbers";
  context.fillText(date.toLocaleTimeString(), w * (1/2), h * (1/3), w);
  
  
  var course = "*";
  var room = "*";
  var tc = toTimecode(date).parseInt();

  for (var i = 0; i < schedule[date.getDay()]; i++) {
    if (tc >= schedule[date.getDay()][i].start && tc < schedule[date.getDay()][i].end) {
      course = schedule[date.getDay()][i].class;
      room =   schedule[date.getDay()][i].room;
      return;
    }
  }
  
  context.font = "18px bold Gothic";
  context.fillText( "course + room + tc", w * (1/2), h * (2/3), w);
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});

function toTimecode(date) {
  var timestamp = date.getHours();
  var tempmin = date.getMinutes();
  if (tempmin.length < 2) {
    tempmin = "0" + tempmin;
  }
  timestamp = timestamp.toString() + tempmin;
  return timestamp;
}