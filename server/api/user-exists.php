<?php

require __DIR__ . '/bootstrap.php';

require_method('GET');

$userID = $_GET['userID'] ?? null;
validate_user_id($userID);

$stmt = get_db()->prepare('SELECT number_of_visits FROM users WHERE user_id = :user_id LIMIT 1');
$stmt->execute(['user_id' => $userID]);
$numberOfVisits = $stmt->fetchColumn();

send_json([
    'exists' => $numberOfVisits !== false,
    'numberOfVisits' => $numberOfVisits !== false ? (int) $numberOfVisits : null,
]);
