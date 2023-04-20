var ws = new WebSocket("ws://" + window.location.hostname + ":81/");
ws.onmessage = function(event) {
  addDataToChart(parseInt(event.data));
};
