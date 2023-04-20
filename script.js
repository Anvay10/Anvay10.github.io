var ecgChart;

function initChart() {
  // Initialize the chart with empty data
  var ctx = document.getElementById('ecgChart').getContext('2d');
  ecgChart = new Chart(ctx, {
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
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function updateChart() {
  // Send a request to the server for the latest ECG data
  var request = new XMLHttpRequest();
  request.open('GET', '/data', true);
  request.onload = function() {
    if (request.status == 200) {
      // Parse the response and update the chart
      var ecgData = JSON.parse(request.responseText);
      for (var i = 0; i < ecgData.length; i++) {
        ecgChart.data.datasets[0].data.push(ecgData[i]);
        ecgChart.data.labels.push('');
      }
      ecgChart.update();
    }
  };
  request.send();
}

// Initialize the chart when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  initChart();
});

// Update the chart every 100 ms
setInterval(function() {
  updateChart();
}, 100);
