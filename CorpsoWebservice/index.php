<?php
//Require functions for actions
require_once "includes/actions.php";

//Based on the existence of the GET parameter, 1 of the 2 functions will be called
//TODO: replace with another method once actions gets too big.
if (!isset($_GET['id'])) {
    $data = getRestaurant();
} else {
    $data = getRestaurant($_GET['id']);
}

//Get Action(from $_GET or $_POST)
    //Get parameters
        //If parameters correct
            //Action
        //If parameters incorrect
            //Error log
            /*$data = ["Error" => "Incorrect Arguments, please make sure that all necessary arguments are given."];*/


//Set the header & output JSON so the client will know what to expect.
header("Content-Type: application/json");
echo json_encode($data);
exit;
