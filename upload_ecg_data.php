<?php
if (isset($_POST['ecg'])) {
  $ecg = $_POST['ecg'];
  $csvData = date("Y-m-d H:i:s") . "," . $ecg . "\n";
  file_put_contents("ecg_data.csv", $csvData, FILE_APPEND);
}
?>
