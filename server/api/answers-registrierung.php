<?php

require __DIR__ . '/bootstrap.php';

require_method('POST');

$body = read_json_body();

$userID = isset($body['userID']) && is_string($body['userID']) ? $body['userID'] : null;
$submittedAt = null;
if (isset($body['date']) && is_string($body['date'])) {
    $timestamp = strtotime($body['date']);
    if ($timestamp !== false) {
        $submittedAt = gmdate('Y-m-d H:i:s', $timestamp);
    }
}

try {
    $stmt = get_db()->prepare('
        INSERT INTO answers_registrierung (user_id, data, submitted_at)
        VALUES (:user_id, :data, COALESCE(:submitted_at, datetime(\'now\')))
    ');
    $stmt->execute([
        'user_id' => $userID,
        'data' => json_encode($body),
        'submitted_at' => $submittedAt,
    ]);
    send_json(['status' => 'ok'], 201);
} catch (PDOException $e) {
    error_log('answers-registrierung.php: ' . $e->getMessage());
    send_json(['error' => 'SERVER_ERROR'], 500);
}
