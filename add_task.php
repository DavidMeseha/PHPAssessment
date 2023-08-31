<?php
$jsonData = file_get_contents('tasks.json');
$tasks = json_decode($jsonData, true);
$today = date('d/m/Y');
$title = $_GET['title'];
$index = 0;
$notAdded = true;

do {
    if (!array_key_exists((string) $index, $tasks)) {
        $tasks[(string) $index] = array("title" => $title, "date" => $today);
        break;
    }

    $index++;
} while (true);

file_put_contents('tasks.json', json_encode($tasks));
echo json_encode($tasks);
?>