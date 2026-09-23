<?php

/**
 * Direct CSV export of the survey data, protected by HTTP Basic Auth
 * (see .htaccess in this directory). Mirrors the flattening logic of
 * src/data-analysis/script.js's doData(): each survey (registrierung,
 * login, guest) is its own independent dataset (unlike Fabmobil's
 * Workshop-Start/End tool, nothing here is joined across tables), one
 * row per submission. Pick which one with ?survey=registrierung|login|guest.
 */

require __DIR__ . '/bootstrap.php';

require_method('GET');

const TABLES = [
    'registrierung' => 'answers_registrierung',
    'login' => 'answers_login',
    'guest' => 'answers_guest',
];

function is_list_array($value)
{
    return $value === [] || array_keys($value) === range(0, count($value) - 1);
}

// The app stores birthdate answers as {day, month, year} (optionally with a
// sibling "nickname" key, e.g. the Login "anmeldung" object) instead of a
// plain date string. Format those into a readable date rather than raw JSON.
function format_birthdate_object($value)
{
    if (!is_array($value) || !isset($value['day'], $value['month'], $value['year'])) {
        return null;
    }
    $date = sprintf('%02d.%02d.%s', (int) $value['day'], (int) $value['month'], $value['year']);
    if (isset($value['nickname'])) {
        $date = $value['nickname'] . ' (' . $date . ')';
    }
    return $date;
}

// Several questions store a single/multiple-choice answer alongside a free-text
// one as {predefinedValue|predefinedValues, freeValue}. Flatten those into a
// plain list of the non-empty parts instead of dumping raw JSON into a cell.
function flatten_choice_object($value)
{
    if (!is_array($value) || is_list_array($value)) {
        return null;
    }
    $knownKeys = ['predefinedValue', 'predefinedValues', 'freeValue'];
    foreach (array_keys($value) as $key) {
        if (!in_array($key, $knownKeys, true)) {
            return null;
        }
    }

    $parts = [];
    if (isset($value['predefinedValue']) && $value['predefinedValue'] !== '') {
        $parts[] = $value['predefinedValue'];
    }
    if (isset($value['predefinedValues']) && is_array($value['predefinedValues'])) {
        foreach ($value['predefinedValues'] as $v) {
            if ($v !== '' && $v !== null) {
                $parts[] = $v;
            }
        }
    }
    if (isset($value['freeValue']) && $value['freeValue'] !== '') {
        $parts[] = $value['freeValue'];
    }
    return $parts;
}

function convert_to_stringable($value)
{
    $birthdate = format_birthdate_object($value);
    $choiceParts = $birthdate === null ? flatten_choice_object($value) : null;
    if ($birthdate !== null) {
        $str = $birthdate;
    } elseif ($choiceParts !== null) {
        $value = $choiceParts;
    }
    if (!isset($str)) {
        if (is_array($value)) {
            $str = is_list_array($value)
                ? implode(',', array_map(function ($v) {
                    return is_scalar($v) || $v === null ? (string) $v : json_encode($v);
                }, $value))
                : json_encode($value);
        } elseif (is_bool($value)) {
            $str = $value ? '1' : '';
        } elseif ($value === null) {
            $str = '';
        } else {
            $str = (string) $value;
        }
    }
    // A comma would break column alignment; a "#" breaks the old data-URI
    // download tool. Kept for output parity with that tool's CSVs.
    return str_replace([',', '#'], [';', '{HASH}'], $str);
}

function arr_to_csv(array $rows, array $columns, $delimiter = ',')
{
    $lines = [implode($delimiter, $columns)];
    foreach ($rows as $row) {
        $cells = [];
        foreach ($columns as $column) {
            $value = $row[$column] ?? null;
            $stringified = empty($value) ? '' : convert_to_stringable($value);
            $cells[] = '"' . str_replace('"', '""', $stringified) . '"'; // RFC 4180: escape embedded quotes
        }
        $lines[] = implode($delimiter, $cells);
    }
    return implode("\n", $lines);
}

function fetch_answers(PDO $db, $table)
{
    $stmt = $db->query("SELECT data FROM $table ORDER BY submitted_at ASC");
    $rows = [];
    foreach ($stmt as $row) {
        $decoded = json_decode($row['data'], true);
        if (is_array($decoded)) {
            $rows[] = $decoded;
        }
    }
    return $rows;
}

function collect_columns(array $rows)
{
    $seen = [];
    foreach ($rows as $row) {
        foreach (array_keys($row) as $key) {
            $seen[$key] = true;
        }
    }
    return array_keys($seen);
}

$survey = $_GET['survey'] ?? null;
if (!isset(TABLES[$survey])) {
    send_json(['error' => 'INVALID_SURVEY', 'validValues' => array_keys(TABLES)], 400);
}

$rows = fetch_answers(get_db(), TABLES[$survey]);
$columns = collect_columns($rows);
$csv = arr_to_csv($rows, $columns);

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="lokallabore-data-' . $survey . '.csv"');
echo $csv;
