<?php
$json = file_get_contents('./reviews.json');
$json_dec = json_decode($json, true, 10);
header("Content-Type: application/json");
echo $json;