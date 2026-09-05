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

$dataFile = __DIR__ . '/data/users.json';

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([
        [
            "id" => 1,
            "nickname" => "admin",
            "name" => "Адміністратор",
            "password" => "123456"
        ]
    ]));
}

if ($action === 'login') {
    $nickname = $data['nickname'] ?? '';
    $password = $data['password'] ?? '';
    
    $users = json_decode(file_get_contents($dataFile), true);
    $foundUser = null;
    
    foreach ($users as $u) {
        if ($u['nickname'] === $nickname && $u['password'] === $password) {
            $foundUser = $u;
            break;
        }
    }
    
    if ($foundUser) {
        echo json_encode([
            "status" => "success",
            "message" => "Успішна авторизація!",
            "token" => "mock_jwt_token_" . $foundUser['id'],
            "user" => [
                "id" => $foundUser['id'],
                "name" => $foundUser['name'],
                "nickname" => $foundUser['nickname']
            ]
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Невірний нікнейм або пароль!"
        ]);
    }
} elseif ($action === 'register') {
    $nickname = $data['nickname'] ?? '';
    $password = $data['password'] ?? '';
    $name = $data['name'] ?? 'Користувач';
    
    if (empty($nickname) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Всі поля обов'язкові"]);
        exit;
    }

    $users = json_decode(file_get_contents($dataFile), true);
    
    foreach ($users as $u) {
        if ($u['nickname'] === $nickname) {
            echo json_encode(["status" => "error", "message" => "Цей нікнейм вже зайнятий!"]);
            exit;
        }
    }
    
    $maxId = 0;
    foreach ($users as $u) {
        if ($u['id'] > $maxId) $maxId = $u['id'];
    }
    
    $newUser = [
        "id" => $maxId + 1,
        "nickname" => $nickname,
        "name" => $name,
        "password" => $password
    ];
    
    $users[] = $newUser;
    file_put_contents($dataFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode([
        "status" => "success",
        "message" => "Успішна реєстрація! Вітаємо, $name.",
        "token" => "mock_jwt_token_" . $newUser['id'],
        "user" => [
            "id" => $newUser['id'],
            "name" => $name,
            "nickname" => $nickname
        ]
    ]);
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
                "nickname" => "admin",
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
} elseif ($action === 'list_users') {
    $users = json_decode(file_get_contents($dataFile), true);
    // Remove passwords before sending to frontend
    $safeUsers = array_map(function($u) {
        unset($u['password']);
        return $u;
    }, $users);
    
    echo json_encode([
        "status" => "success",
        "users" => $safeUsers
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Невідома дія (action). Доступні: login, profile."
    ]);
}
?>
