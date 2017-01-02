var rocky = require('rocky');
var schedule = require('./schedule.json');
var calendar = require('./365.json');

rocky.on('draw', function(event) {
  
  // setup
  var context = event.context;
  context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
  
  var w = context.canvas.unobstructedWidth;
  var h = context.canvas.unobstructedHeight;
  //var date = new Date("2017-10-28T13:03:00");
  var date = new Date();
  var tc = date.toLocaleTimeString(undefined, {hour: '2-digit'}) + date.toLocaleTimeString(undefined, {minute: '2-digit'});
  
  // draw time
  context.fillStyle = "white";
  context.textAlign = "center";
  context.font = "42px bold numbers Leco-numbers";
  context.fillText(date.toLocaleTimeString(undefined, {hour: '2-digit'}) + ":" +
                   date.toLocaleTimeString(undefined, {minute: '2-digit'}),
                   (w/2), (h/4), w);
  
  // draw date
  context.font = "14px Gothic";
  context.fillStyle = "#b3b3b3";
  context.fillText(calendar[yearDay(date)], (w/2), ((h/4)+45), w);
  
  // draw 365project theme
  context.fillText(date.getDate() + "/" + (date.getMonth() + 1), (w/2), ((h/4)-8), w);
  
  // draw classroom & class
  for (var i = 0; i < schedule[date.getDay()].length; i++) {
    if (tc >= schedule[date.getDay()][i].start && tc < schedule[date.getDay()][i].end) {
      context.font = "24px bold Gothic";
      context.fillStyle = "#ff6600";
      context.textAlign = "left";
      context.fillText( schedule[date.getDay()][i].class, 9, (h-33), w);
      context.textAlign = "right";
      context.fillText( schedule[date.getDay()][i].room, (w-9), (h-33), w);
    }
  }
  
  // draw line
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

function yearDay(date) {
  var start = new Date(date.getFullYear(), 0,0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24; // one day in ms
  var day = Math.floor(diff / oneDay);
  return (day - 1);
}
