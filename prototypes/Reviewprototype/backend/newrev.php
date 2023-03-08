<?php
$json = file_get_contents('./reviews.json');
$json_dec = json_decode($json, true);
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    /*if(!isset($_POST['reviewer']) || !isset($_POST['score']) || !isset($_POST['summary']) || !isset($_POST['place']) || !isset($_POST['name'])){
        echo 'Error: Invalid Request, missing required values';
    }else{*/
        $newArray = $json_dec;
        $newrev['reviewer'] = $_POST['reviewer'];
        $newrev['place'] = $_POST['place'];
        $newrev['score'] = $_POST['score'];
        $newrev['summary'] = $_POST['summary'];
        $newrev['name'] = $_POST['name'];
        array_push($newArray['reviews'], $newrev);
        file_put_contents("reviews.json", json_encode($newArray));
        print_r($newArray);
    /*}*/
}else{
    echo 'Error: Invalid request, please send a post';
}