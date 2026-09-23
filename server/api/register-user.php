<?php

require __DIR__ . '/bootstrap.php';

require_method('POST');

$body = read_json_body();

$userID = $body['userID'] ?? null;
validate_user_id($userID);

try {
    $stmt = get_db()->prepare('INSERT INTO users (user_id) VALUES (:user_id)');
    $stmt->execute(['user_id' => $userID]);
    send_json(['status' => 'ok'], 201);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        send_json(['error' => 'USER_EXISTS'], 409);
    }
    error_log('register-user.php: ' . $e->getMessage());
    send_json(['error' => 'SERVER_ERROR'], 500);
}
