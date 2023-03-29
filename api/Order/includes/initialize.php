<?php
require_once 'classes/DishManager.php';
require_once 'classes/MenuManager.php';

$routes =
    [
        'menus' => 'actions/menus.php',
        'dishes' => 'actions/dishes.php'
    ];

//if the request is post, check authorization.
