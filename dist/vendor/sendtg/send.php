<?php
$name = $_POST['name'];
$phone = $_POST['tel'];
$email = $_POST['email'];
$message = $_POST['message'];
$token = ""; // 5897585110:AAEF-Rxg4jyhUe8CbFJZk-9NI99YitZbO1c
$chat_id = ""; // -1001833268569
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Email:' => $email,
    'Сообщение: ' => $message
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if (!$sendToTelegram) {
    $message = 'Что-то пошло не так и ничего не отправилось...';
} else {
    $message = 'Отправлено!';
}

$response = ['mesage' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>