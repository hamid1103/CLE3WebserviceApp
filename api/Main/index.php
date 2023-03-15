<?php
//Require functions for actions
require_once "includes/actions.php";

//Based on the existence of the GET parameter, 1 of the 2 functions will be called
//TODO: replace with another method once actions gets too big.

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $data = getRestaurant($_GET['id']);
    } elseif (isset($_GET['name'])) {
        $data = getRestaurantByName(urldecode($_GET['name']));
    }else{
        $data = getRestaurant();
    }
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['action'])){
        $action = $_POST['action'];
        //Add Actions Here
        if($action == 'newKey'){
            if(!isset($_POST['id']) || !isset($_POST['name']) || !isset($_POST['value'])){
                $data = 'Missing required header(s). Make sure Request has "id", "name" and "value"';
            }else{
                $id = $_POST['id'];
                $key = $_POST['name'];
                $value = $_POST['value'];
                $data = addDataToRestaurant($id, $key, $value);
            }
        }elseif ($action == 'addTo'){
            if(!isset($_POST['id']) || !isset($_POST['name']) || !isset($_POST['value'])){
                $data = 'Missing required header(s). Make sure Request has "id", "name" and "value"';
            }else{
                $id = $_POST['id'];
                $key = $_POST['name'];
                $value = $_POST['value'];
                $data = addDataToKeyInRestaurant($id, $key, $value);
            }
        }else{
            $data = "Error: Unkown Action";
        }
    }else{
        $data = "Error: No Action Defined in post. Make sure you have 'action' header in post with either 'newKey' or 'addTo'";
    }
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