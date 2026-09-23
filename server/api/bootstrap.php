<?php

function resolve_db_path()
{
    $prodConfigFile = __DIR__ . '/../../data/db-config.php';
    if (file_exists($prodConfigFile)) {
        return require $prodConfigFile;
    }

    $devDir = dirname(__DIR__, 2) . '/.dev-data';
    if (!is_dir($devDir)) {
        mkdir($devDir, 0775, true);
    }
    return $devDir . '/dev.sqlite';
}

function get_db()
{
    static $db = null;
    if ($db !== null) {
        return $db;
    }

    $db = new PDO('sqlite:' . resolve_db_path());
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->exec('
        CREATE TABLE IF NOT EXISTS users (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id          TEXT NOT NULL UNIQUE,
            number_of_visits INTEGER NOT NULL DEFAULT 1,
            created_at       TEXT NOT NULL DEFAULT (datetime(\'now\'))
        )
    ');
    $db->exec('
        CREATE TABLE IF NOT EXISTS answers_registrierung (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id      TEXT,
            data         TEXT NOT NULL,
            submitted_at TEXT NOT NULL DEFAULT (datetime(\'now\'))
        )
    ');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_ar_user_id ON answers_registrierung(user_id)');
    $db->exec('
        CREATE TABLE IF NOT EXISTS answers_login (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id      TEXT,
            data         TEXT NOT NULL,
            submitted_at TEXT NOT NULL DEFAULT (datetime(\'now\'))
        )
    ');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_al_user_id ON answers_login(user_id)');
    $db->exec('
        CREATE TABLE IF NOT EXISTS answers_guest (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            data         TEXT NOT NULL,
            submitted_at TEXT NOT NULL DEFAULT (datetime(\'now\'))
        )
    ');

    return $db;
}

function require_method($method)
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        send_json(['error' => 'METHOD_NOT_ALLOWED'], 405);
    }
}

function is_json_object($data)
{
    if (!is_array($data)) {
        return false;
    }
    if ($data === []) {
        return true;
    }
    return array_keys($data) !== range(0, count($data) - 1);
}

function read_json_body()
{
    $maxBytes = 200 * 1024;
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        send_json(['error' => 'INVALID_BODY'], 400);
    }
    if (strlen($raw) > $maxBytes) {
        send_json(['error' => 'PAYLOAD_TOO_LARGE'], 413);
    }

    $data = json_decode($raw, true);
    if (!is_json_object($data)) {
        send_json(['error' => 'INVALID_BODY'], 400);
    }

    return $data;
}

function send_json($data, $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function validate_user_id($userID)
{
    if (!is_string($userID) || !preg_match('/^[a-z,\x{00e4}\x{00f6}\x{00fc}-]{2,15}[0-9]{8}$/u', $userID)) {
        send_json(['error' => 'INVALID_USER_ID'], 400);
    }
}
