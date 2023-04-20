const ecgChart = new Chart(document.getElementById('ecgChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'ECG',
            data: [],
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
            fill: false,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                ticks: {
                    suggestedMax: 1023,
                    suggestedMin: 0,
                },
            }],
        },
    },
});

const ecgData = [];

function updateChart(jsonData) {
    const data = JSON.parse(jsonData).data;

    for (let i = 0; i < data.length; i++) {
        ecgData.push(data[i]);

        if (ecgData.length > 400) {
            ecgData.shift();
        }
    }

    ecgChart.data.datasets[0].data = ecgData;
    ecgChart.update();
}

const source = new EventSource('/events');
source.addEventListener('data', (event) => {
    updateChart(event.data);
});
