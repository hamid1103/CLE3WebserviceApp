<?php
$json = file_get_contents('./includes/restaurants.json');
$json_dec = json_decode($json, true, 10);
$res_list = $json_dec['restaurants'];
function getRestaurantByName($id = 'all'){
    global $json_dec, $res_list;

    if ($id == 'all'){
        return $json_dec;
    }else{
        $keys = array_column($res_list, 'Name');
        $index = array_search($id, $keys);
        if($index){
            return $res_list[$index];
        }else{
            return "Not Found ".$id." in ".print_r($keys);
        }
    }
}

function getRestaurant($id = 'all'){
    global $json_dec, $res_list;
    if ($id == 'all'){

        return $json_dec;
    }else{
        return $res_list[$id];

    }
}

function addDataToRestaurant($id, $key, $value){
    global $json_dec, $res_list;
    $curRest = $res_list[$id];
    $curRest[$key] = $value;
    $res_list[$id] = $curRest;
    $json_dec['restaurants'] = $res_list;
    file_put_contents("./includes/restaurants.json", json_encode($json_dec));
    return $json_dec;
}

function addDataToKeyInRestaurant($id, $key, $value){
    global $json_dec, $res_list;

    $curRest = $res_list[$id];
    $curRest[$key][] = $value;
    $res_list[$id] = $curRest;
    $json_dec['restaurants'] = $res_list;
    file_put_contents("./includes/restaurants.json", json_encode($json_dec));
    return $json_dec;
}

