<?php
// CORS Headers for React Frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Mock database (in a real app, use PDO with MySQL)
$categories = [
    [
        "id" => 2,
        "title" => "Групові Тренування",
        "description" => "Навчання в групах під керівництвом майстрів спорту.",
        "icon" => "Users"
    ],
    [
        "id" => 3,
        "title" => "Індивідуальні Заняття",
        "description" => "Персональний підхід для швидкого прогресу.",
        "icon" => "Dumbbell"
    ],
    [
        "id" => 4,
        "title" => "Турніри",
        "description" => "Щотижневі змагання для любителів та професіоналів.",
        "icon" => "Trophy"
    ],
    [
        "id" => 5,
        "title" => "Корпоративи",
        "description" => "Організація спортивних заходів для компаній.",
        "icon" => "Activity"
    ],
    [
        "id" => 6,
        "title" => "Ремонт Інвентарю",
        "description" => "Переклейка накладок та збірка ракеток.",
        "icon" => "ShieldCheck"
    ]
];

// Return JSON response
echo json_encode([
    "status" => "success",
    "data" => $categories,
    "seo" => [
        "title" => "Послуги Настільного Тенісу | Table Tennis Store",
        "description" => "Найкращі зали, тренування та турніри з настільного тенісу в Києві."
    ]
]);
?>
