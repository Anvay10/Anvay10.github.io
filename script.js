const ecgChart = new Chart(document.getElementById("ecgChart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'ECG Data',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      fill: false
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'ECG Data Chart'
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'ECG Value'
        }
      }]
    }
  }
});

const webSocket = new WebSocket('ws://10.100.105.64');

webSocket.onmessage = (event) => {
  const ecgValue = event.data;
  const time = new Date().toLocaleTimeString();

  ecgChart.data.labels.push(time);
  ecgChart.data.datasets[0].data.push(ecgValue);
  ecgChart.update();
};
