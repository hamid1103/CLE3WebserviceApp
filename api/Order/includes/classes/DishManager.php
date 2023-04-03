<?php

class DishManager
{
    private array $dishes;

    public function __construct()
    {
        $json_data = file_get_contents(realpath('./includes/data/dishes.json'));
        $this->dishes = json_decode($json_data);
    }

    //return dish from an id
    public function getDish(int $id) {
        return $this->dishes[$id];
    }

    //create new dish
    //TODO return its id?
    public function addDish(array $dish) {

    }

    //remove a dish
    public function removeDish(int $id) {

    }
}