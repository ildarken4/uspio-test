<?php
// Путь к файлу
$file_path = 'emails.json';

// Проверяем, был ли передан email
if(isset($_POST['email'])) {
    $email = $_POST['email'];

    // Загружаем содержимое файла JSON
    $json_data = file_get_contents($file_path);

    // Преобразуем JSON в ассоциативный массив
    $data = json_decode($json_data, true);

    // Сохраняем email в параметр "email" объекта
    $data['email'] = $email;

    // Преобразуем массив обратно в JSON
    $updated_json_data = json_encode($data, JSON_UNESCAPED_UNICODE);

    // Сохраняем обновленные данные в файл
    file_put_contents($file_path, $updated_json_data);

    // Отправляем ответ об успешном сохранении
    echo "Email " . $email . " успешно сохранен в файле emails.json";
} else {
    // Если не получили email, отправляем сообщение об ошибке
    echo "Ошибка: Email не был передан";
}
?>

