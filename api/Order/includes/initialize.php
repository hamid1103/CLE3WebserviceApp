<?php
require_once 'classes/DishManager.php';
require_once 'classes/MenuManager.php';

require_once 'util.php';
$routes =
    [
        'menu' => 'actions/menu.php',
        'dish' => 'actions/dish.php'
    ];

//if the request is post, check authorization.

//load managers
$dishManager = new DishManager();
$menuManager = new MenuManager($dishManager);

//let file handle the request
//set internal error first just in case
$data = array(
    'error' => 'An internal error occurred.',
    'status' => 500
);

if (isset($_GET['_url'])) {
    if (array_key_exists($_GET['_url'], $routes)) {
        $file = $routes[$_GET['_url']];
        require_once $file;
    } else {
        //return not found
        $data = array(
            'error' => 'Not found.',
            'status' => 404
        );
    }
} else {
    //return not found
    $data = array(
        'error' => 'Not found.',
        'status' => 404
    );
}


//send data
echo json_encode($data);