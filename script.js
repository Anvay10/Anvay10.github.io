const ecgChart = new Chart(document.getElementById("ecgChart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'ECG Data',
      data: [],
      borderColor: 'rgb(127, 127, 127)',
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
        x: {
            display: true,
            title: {
                display: true,
                text: 'Time'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'ECG Value'
            },
            suggestedMin: -0.5,
            suggestedMax: 1.5
        }
    }
  }
});

const webSocket = new WebSocket('wss://10.100.111.152');

webSocket.onmessage = (event) => {
  const ecgValue = event.data;
  const time = new Date().toLocaleTimeString();

  ecgChart.data.labels.push(time);
  ecgChart.data.datasets[0].data.push(ecgValue);
  ecgChart.update();
};
