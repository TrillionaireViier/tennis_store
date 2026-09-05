<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$dataFile = __DIR__ . '/data/equipment.json';

// Initialize file if it doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $equipment = json_decode(file_get_contents($dataFile), true);
    
    echo json_encode([
        "status" => "success",
        "equipment" => $equipment
    ]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle both JSON and FormData (multipart/form-data)
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    
    if (strpos($contentType, 'application/json') !== false) {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
    } else {
        $data = $_POST;
    }
    
    if (!$data || !isset($data['title'])) {
        echo json_encode(["status" => "error", "message" => "Invalid product data"]);
        exit;
    }
    
    // Handle Image Upload
    $imageUrl = $data['image'] ?? "https://picsum.photos/seed/new/500/500"; // fallback
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = uniqid('prod_') . '.' . $fileExtension;
        $targetFile = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            // Save the relative URL so it can be served
            $imageUrl = '/api/uploads/' . $fileName;
        }
    }
    
    $equipment = json_decode(file_get_contents($dataFile), true);
    
    // Auto-increment ID
    $maxId = 0;
    foreach ($equipment as $item) {
        if ($item['id'] > $maxId) $maxId = $item['id'];
    }
    
    $newProduct = [
        "id" => $maxId + 1,
        "title" => $data['title'],
        "category" => $data['category'] ?? "Новинка",
        "price" => (float)($data['price'] ?? 0),
        "image" => $imageUrl,
        "description" => $data['description'] ?? "Опис товару"
    ];
    
    $equipment[] = $newProduct;
    file_put_contents($dataFile, json_encode($equipment, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode([
        "status" => "success",
        "message" => "Товар успішно додано!",
        "product" => $newProduct
    ]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        echo json_encode(["status" => "error", "message" => "Product ID is required"]);
        exit;
    }
    
    $equipment = json_decode(file_get_contents($dataFile), true);
    $initialCount = count($equipment);
    
    $equipment = array_values(array_filter($equipment, function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    
    if (count($equipment) < $initialCount) {
        file_put_contents($dataFile, json_encode($equipment, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(["status" => "success", "message" => "Товар успішно видалено!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Товар не знайдено"]);
    }
}
?>
