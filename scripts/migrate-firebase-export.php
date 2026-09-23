<?php

/**
 * One-time backfill: imports a Firebase Realtime Database JSON export
 * (shape: {users, answersRegistrierung, answersLogin, answersGuest}) into
 * the new SQLite schema, so the new backend has historical parity.
 *
 * Usage: php scripts/migrate-firebase-export.php <firebase-export.json> <survey.sqlite>
 */

if ($argc !== 3) {
    fwrite(STDERR, "Usage: php scripts/migrate-firebase-export.php <firebase-export.json> <survey.sqlite>\n");
    exit(1);
}

[, $exportPath, $dbPath] = $argv;

if (!is_file($exportPath)) {
    fwrite(STDERR, "Export file not found: $exportPath\n");
    exit(1);
}

$raw = file_get_contents($exportPath);
$export = json_decode($raw, true);
if (!is_array($export)) {
    fwrite(STDERR, "Could not parse $exportPath as JSON\n");
    exit(1);
}

$db = new PDO('sqlite:' . $dbPath);
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

function submitted_at_from_row($row)
{
    if (isset($row['date']) && is_string($row['date'])) {
        $timestamp = strtotime($row['date']);
        if ($timestamp !== false) {
            return gmdate('Y-m-d H:i:s', $timestamp);
        }
    }
    return null;
}

function import_users(PDO $db, array $users)
{
    $stmt = $db->prepare('INSERT OR IGNORE INTO users (user_id, number_of_visits) VALUES (:user_id, :number_of_visits)');
    $imported = 0;
    $skipped = 0;
    foreach ($users as $userID => $userData) {
        if (!is_string($userID) || $userID === '') {
            $skipped++;
            continue;
        }
        $numberOfVisits = is_array($userData) && isset($userData['numberOfVisits']) && is_numeric($userData['numberOfVisits'])
            ? (int) $userData['numberOfVisits']
            : 1;
        $stmt->execute(['user_id' => $userID, 'number_of_visits' => $numberOfVisits]);
        $imported += $stmt->rowCount();
    }
    return [$imported, $skipped, count($users) - $imported - $skipped];
}

function import_answers(PDO $db, string $table, array $rows, bool $hasUserId)
{
    $columns = $hasUserId ? 'user_id, data, submitted_at' : 'data, submitted_at';
    $placeholders = $hasUserId ? ':user_id, :data, :submitted_at' : ':data, :submitted_at';
    $stmt = $db->prepare("
        INSERT INTO $table ($columns)
        VALUES (" . str_replace(':submitted_at', "COALESCE(:submitted_at, datetime('now'))", $placeholders) . ")
    ");
    $imported = 0;
    $missingUserId = 0;
    foreach ($rows as $row) {
        if (!is_array($row)) {
            continue;
        }
        $params = [
            'data' => json_encode($row),
            'submitted_at' => submitted_at_from_row($row),
        ];
        if ($hasUserId) {
            $userID = isset($row['userID']) && is_string($row['userID']) ? $row['userID'] : null;
            if ($userID === null) {
                $missingUserId++;
            }
            $params['user_id'] = $userID;
        }
        $stmt->execute($params);
        $imported++;
    }
    return [$imported, $missingUserId];
}

$users = isset($export['users']) && is_array($export['users']) ? $export['users'] : [];
$answersRegistrierung = isset($export['answersRegistrierung']) && is_array($export['answersRegistrierung'])
    ? array_values($export['answersRegistrierung'])
    : [];
$answersLogin = isset($export['answersLogin']) && is_array($export['answersLogin'])
    ? array_values($export['answersLogin'])
    : [];
$answersGuest = isset($export['answersGuest']) && is_array($export['answersGuest'])
    ? array_values($export['answersGuest'])
    : [];

[$usersImported, $usersSkipped, $usersDuplicate] = import_users($db, $users);
[$registrierungImported, $registrierungMissingUserId] = import_answers($db, 'answers_registrierung', $answersRegistrierung, true);
[$loginImported, $loginMissingUserId] = import_answers($db, 'answers_login', $answersLogin, true);
[$guestImported] = import_answers($db, 'answers_guest', $answersGuest, false);

echo "Users:                {$usersImported} imported, {$usersSkipped} skipped (invalid), {$usersDuplicate} already present\n";
echo "Registrierung rows:   {$registrierungImported} imported ({$registrierungMissingUserId} without a userID)\n";
echo "Login rows:           {$loginImported} imported ({$loginMissingUserId} without a userID)\n";
echo "Guest rows:           {$guestImported} imported\n";
