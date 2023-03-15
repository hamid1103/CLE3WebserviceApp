<?php
$json = file_get_contents('./includes/restaurants.json');
$json_dec = json_decode($json, true, 10);
$res_list = $json_dec['restaurants'];
function getRestaurant($id = 'all'){
    global $json_dec, $res_list;

    if ($id == 'all'){

        return $json_dec;
    }else{

        $keys = array_column($res_list, 'Name');
        $index = array_search(urldecode($id), $keys);

        return $res_list[$index];

    }
}

function addDataToRestaurant($id, $data){

}

function addDataToKeyInRestaurant($id, $key, $data){

}
