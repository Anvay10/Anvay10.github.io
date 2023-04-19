var ctx = document.getElementById('ecgChart').getContext('2d');

var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array.from(Array(400).keys()),
    datasets: [{
      label: 'ECG Data',
      data: [],
      fill: false,
      borderColor: 'rgb(0,255,0)',
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
      var ecgData = this.responseText.trim().split(', ');
      chart.data.datasets[0].data = ecgData;
      chart.update();
    }
  };
  xhttp.open("GET", "/ecg", true);
  xhttp.send();
}

setInterval(updateChart, 10);
