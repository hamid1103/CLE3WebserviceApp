<?php

class MenuManager
{
    private array $menus;

    public function __construct()
    {

    }

    //return all categories from restaurants menu
    public function getAllCategories(int $restaurant_id) {

    }

    //return a specific category using an id
    public function getCategory(int $restaurant_id, int $category_id) {

    }

    //return an entire restaurant menu
    public function getMenu(int $restaurant_id) {

    }

    //add a new category to a restaurant menu
    public function addCategory(int $restaurant_id, array $category) {

    }

    //add a new restaurant menu
    //TODO make sure restaurant id is checked through an API request
    public function addMenu(int $restaurant_id, array $menu) {

    }

    //add a dish to a menu category
    public function addDishToCategory(int $restaurant_id, int $category_id, int $dish_id) {

    }
}