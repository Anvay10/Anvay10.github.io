var ctx = document.getElementById('ecgChart').getContext('2d');
var myChart = new Chart(ctx, {
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

function updateChart() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var ecgData = this.responseText.split(',');
      ecgData.pop(); // Remove the last empty element
      myChart.data.labels = Array.from(Array(ecgData.length).keys()).map(String);
      myChart.data.datasets[0].data = ecgData;
      myChart.update();
    }
  };
  xhttp.open("GET", "http://10.100.105.0/ecgData", true);
  xhttp.send();
}

setInterval(updateChart, 100);
