<?php
function require_parameters(array $parameters)
{
    $extraction = [];
    foreach ($parameters as $p) {
        if (!array_key_exists($p, $_GET)) {
            echo json_encode(array(
                'error' => "Missing a required parameter '$p'",
                'status' => 400
            ));
            exit();
        } else {
            $extraction[$p] = $_GET[$p];
        }
    }

    return $extraction;
}