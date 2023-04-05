<?php
$json = file_get_contents('./reservering.json');
$json_decode = json_decode($json, true);
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $reservations_array = $json_decode;
    $new_reservation['voornaam'] = $_POST['firstname'];
    $new_reservation['restaurant'] = $_POST['restaurant'];
    $new_reservation['datetime'] = $_POST['datetime'];
    $new_reservation['aantal_personen'] = $_POST['aantal-personen'];
    $new_reservation['opmerkingen'] = $_POST['opmerkingen'];
    array_push($reservations_array['reserveringen'], $new_reservation);
    file_put_contents("reservering.json", json_encode($reservations_array));

    print_r($new_reservation);
} else {
    echo 'Error: Invalid request, please send a post';
}
?>


