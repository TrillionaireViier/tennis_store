<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// In a real application, you would connect to MySQL via PDO here:
// $pdo = new PDO("mysql:host=localhost;dbname=tennis_store", "user", "password");

// Read POST payload
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$action = $data['action'] ?? $_GET['action'] ?? null;

if ($action === 'login') {
    // MOCK LOGIN LOGIC
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    // Simulate DB check
    if ($email === 'admin@test.com' && $password === '123456') {
        echo json_encode([
            "status" => "success",
            "message" => "Успішна авторизація!",
            "token" => "mock_jwt_token_8829910", // Stateless auth token
            "user" => [
                "id" => 1,
                "name" => "Адміністратор",
                "email" => $email
            ]
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Невірний email або пароль! (Спробуйте admin@test.com / 123456)"
        ]);
    }
} elseif ($action === 'profile') {
    // MOCK PROFILE LOGIC (Requires Token)
    $headers = apache_request_headers();
    $token = $headers['Authorization'] ?? '';
    
    if (strpos($token, 'mock_jwt') !== false) {
        echo json_encode([
            "status" => "success",
            "message" => "Профіль успішно завантажено.",
            "user" => [
                "id" => 1,
                "name" => "Адміністратор",
                "email" => "admin@test.com",
                "discount_level" => "VIP"
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Ви не авторизовані."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Невідома дія (action). Доступні: login, profile."
    ]);
}
?>
