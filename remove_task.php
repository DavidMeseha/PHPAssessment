<?php
$index = $_GET['index'];
$jsonData = file_get_contents('tasks.json');
$tasks = json_decode($jsonData, true);
unset($tasks[$index]);

file_put_contents('tasks.json', json_encode($tasks));
echo json_encode($tasks);
?>