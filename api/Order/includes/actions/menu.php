<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    extract(require_parameters(['id']));
    $data = $menuManager->getMenu($id);
}