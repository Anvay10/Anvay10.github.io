// Set up the chart
var ctx = document.getElementById('ecgChart').getContext('2d');
var ecgChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'ECG Data',
      data: [],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

// Set up WebSocket connection
var socket = new WebSocket('ws://10.100.105.0:80');

// When the connection is open, send a message to the server to request ECG data
socket.onopen = function(event) {
  socket.send('ECG data request');
};

// When a message is received from the server, update the chart with the new data
socket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  var ecg = data.ecg;
  var timestamp = data.timestamp;

  // Add the new data to the chart
  ecgChart.data.labels.push(timestamp);
  ecgChart.data.datasets[0].data.push(ecg);
  ecgChart.update();
};
