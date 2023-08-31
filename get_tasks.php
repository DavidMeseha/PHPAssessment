<?php
$jsonData = file_get_contents('tasks.json');
$tasks = json_decode($jsonData, true);
echo json_encode($tasks)
    ?>