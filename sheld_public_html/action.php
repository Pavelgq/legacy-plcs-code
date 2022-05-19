<?php

$company_mail = "Энерготэк<site@energotek.ru>";
$to_mail = "key@energotek.ru";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['g-recaptcha-response'])) {
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6Lfo1J4aAAAAAIVLJ7lhyRVAcUu0QkY1MsId1f4G';
    $recaptcha_response = $_POST['g-recaptcha-response'];
    $recaptcha = json_decode(file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response));

    if ($recaptcha->score >= 0.5) {
        $subject = "Новый запрос на код активации, \"ЭКРАН\"";
        $message = "Получен новый запрос на код активации, программа \"ЭКРАН\"<br>ФИО: " . $_POST['NAME'] . "<br>Компания: " . $_POST['COMPANY'] . "<br>Должность: " . $_POST['POSITION'] . "<br>Эл. почта: " . $_POST['EMAIL'] . "<br>Телефон: " . $_POST['TEL'] . "<br>Полное наименование объекта: " . $_POST['OBJNAME'] . "<br>Адрес объекта: " . $_POST['OBJADDRESS'] . "<br>Предполагаемая дата монтажа: " . $_POST['DATE'];
        $header = "From: " . $company_mail  . "\r\n";
        $header .= "MIME-Version: 1.0\r\n";
        $header .= "Content-type: text/html\r\n";

        $result = mail($to_mail, $subject, $message, $header);

        if($result == true) {
            echo '{"status": "Mail OK", "score": ' . $recaptcha->score . '}';
        }else {
            echo '{"status": "Mail ERROR", "score": ' . $recaptcha->score . '}';
        }
    } else if ($recaptcha->score != 0) {
        echo '{"status": "You are a robot!", "score": ' . $recaptcha->score . '}';
    } else {
        echo '{"status": "Repeated query?"}';
    }
 
}
