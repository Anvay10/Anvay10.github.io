var socket = io.connect('http://localhost:3000');
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('ecg_data', function(data) {
  // Do something with the ECG data
});
