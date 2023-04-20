// Define the chart configuration
const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'ECG Data',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: []
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    height: 300, // Set height of chart
    width: 500, // Set width of chart
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 10000, // Total duration of the chart in milliseconds
          refresh: 1000, // Refresh rate in milliseconds
          delay: 1000, // Delay between the time an update is received and when it is displayed
          onRefresh: function(chart) { // Callback function for updating the chart data
            fetch('/ecg_data')
              .then(response => response.json())
              .then(data => {
                const timestamp = Date.now();
                const ecg = data.ecg;
                chart.data.labels.push(timestamp);
                chart.data.datasets[0].data.push(ecg);
              });
          }
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1023
        }
      }]
    },
    plugins: {
      streaming: {
        frameRate: 30 // Number of frames per second
      }
    }
  }
};

// Get the canvas element and create the chart
const chartElement = document.getElementById('chart');
const chart = new Chart(chartElement, chartConfig);
