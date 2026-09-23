<?php

require __DIR__ . '/bootstrap.php';

require_method('POST');

$body = read_json_body();

$userID = $body['userID'] ?? null;
validate_user_id($userID);

$stmt = get_db()->prepare('UPDATE users SET number_of_visits = number_of_visits + 1 WHERE user_id = :user_id');
$stmt->execute(['user_id' => $userID]);

send_json(['status' => 'ok']);
