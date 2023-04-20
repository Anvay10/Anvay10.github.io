const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Data',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: []
    }]
  },
  options: {
    responsive: false, // Set to false to disable automatic resizing of chart
    maintainAspectRatio: false,
    height: 300, // Set height of chart
    width: 500, // Set width of chart
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000, // Total duration of the chart in milliseconds
          refresh: 1000, // Refresh rate in milliseconds
          delay: 1000, // Delay between the time an update is received and when it is displayed
          onRefresh: function(chart) { // Callback function for updating the chart data
            chart.data.datasets.forEach(function(dataset) {
              dataset.data.push({
                x: Date.now(),
                y: Math.random() * 100 // Sample data point
              });
            });
          }
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
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
chartElement.height = chartConfig.options.height; // Set the height of the chart element
chartElement.width = chartConfig.options.width; // Set the width of the chart element
const chart = new Chart(chartElement, chartConfig);
