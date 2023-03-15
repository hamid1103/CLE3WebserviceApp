<?php
$json = file_get_contents('./includes/restaurants.json');
$json_dec = json_decode($json, true, 10);
$res_list = $json_dec['restaurants'];
function getRestaurant($id = 'all'){
    global $json_dec, $res_list;

    if ($id == 'all'){
        return $json_dec;
    }elseif ($id >= 0){
        if($id > $res_list.length){
            return null;
        }
        return $res_list[$id];
    }else{
        return null;
    }
}

function addDataToRestaurant($id, $key, $data){

}

function addDataToKeyInRestaurant($id, $key, $data){

}
