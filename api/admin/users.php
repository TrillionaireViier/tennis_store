<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Mock Database of users
$users = [
    [
        "id" => 1,
        "name" => "Admin User",
        "email" => "admin@tabletennis.com.ua",
        "role" => "admin",
        "status" => "active"
    ],
    [
        "id" => 2,
        "name" => "John Doe",
        "email" => "user@example.com",
        "role" => "user",
        "status" => "active"
    ],
    [
        "id" => 3,
        "name" => "Jane Smith",
        "email" => "jane@example.com",
        "role" => "user",
        "status" => "inactive"
    ]
];

echo json_encode(["status" => "success", "users" => $users]);
?>
