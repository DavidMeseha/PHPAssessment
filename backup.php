<?php
$tasks = file_get_contents('php://input');
file_put_contents('tasks.json', $tasks);
echo $tasks;
?>