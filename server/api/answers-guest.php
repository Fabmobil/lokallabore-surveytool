<?php

require __DIR__ . '/bootstrap.php';

require_method('POST');

$body = read_json_body();

$submittedAt = null;
if (isset($body['date']) && is_string($body['date'])) {
    $timestamp = strtotime($body['date']);
    if ($timestamp !== false) {
        $submittedAt = gmdate('Y-m-d H:i:s', $timestamp);
    }
}

try {
    $stmt = get_db()->prepare('
        INSERT INTO answers_guest (data, submitted_at)
        VALUES (:data, COALESCE(:submitted_at, datetime(\'now\')))
    ');
    $stmt->execute([
        'data' => json_encode($body),
        'submitted_at' => $submittedAt,
    ]);
    send_json(['status' => 'ok'], 201);
} catch (PDOException $e) {
    error_log('answers-guest.php: ' . $e->getMessage());
    send_json(['error' => 'SERVER_ERROR'], 500);
}
