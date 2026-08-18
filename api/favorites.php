<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Read payload
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$action = $data['action'] ?? $_GET['action'] ?? null;
$product_id = $data['product_id'] ?? $_GET['product_id'] ?? null;

// Mock authorization check
$headers = apache_request_headers();
$token = $headers['Authorization'] ?? '';

if (strpos($token, 'mock_jwt') === false) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Будь ласка, авторизуйтесь для доступу до Бажаного."]);
    exit();
}

if ($action === 'list') {
    // MOCK LIST
    echo json_encode([
        "status" => "success",
        "message" => "Список бажаного завантажено",
        "favorites" => [
            ["id" => 1, "title" => "Оренда Столів", "icon" => "Target"],
            ["id" => 4, "title" => "Турніри", "icon" => "Trophy"]
        ]
    ]);
} elseif ($action === 'add') {
    if (!$product_id) {
        echo json_encode(["status" => "error", "message" => "Не вказано ID товару."]);
        exit();
    }
    // Simulate adding to DB
    echo json_encode([
        "status" => "success",
        "message" => "Товар ID {$product_id} успішно додано до списку Бажаного!"
    ]);
} elseif ($action === 'remove') {
    if (!$product_id) {
        echo json_encode(["status" => "error", "message" => "Не вказано ID товару."]);
        exit();
    }
    // Simulate removing from DB
    echo json_encode([
        "status" => "success",
        "message" => "Товар ID {$product_id} видалено зі списку Бажаного."
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Невідома дія. Доступні: list, add, remove."
    ]);
}
?>
