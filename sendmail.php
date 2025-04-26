<?php
// Если вы скачали PHPMailer вручную, убедитесь, что файлы находятся в папке "phpmailer"
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $role = strip_tags(trim($_POST["role"]));

    $mail = new PHPMailer();

    try {
        // Настраиваем SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';       // SMTP сервер Gmail
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your_email@gmail.com';   // замените на ваш Gmail адрес
        $mail->Password   = 'your_password';          // замените на ваш пароль (или пароль приложения)
        $mail->SMTPSecure = 'tls';  
        $mail->Port       = 587;

        // От кого и кому письма
        $mail->setFrom('your_email@gmail.com', 'Dirento Animation Studio');
        $mail->addAddress('katyslav80@gmail.com');

        $mail->Subject = 'Новая заявка с сайта';
        $mail->Body    = "Имя: $name\nEmail: $email\nСпециализация: $role";

        $mail->send();
        echo "Спасибо, ваша заявка успешно отправлена!";
    } catch (Exception $e) {
        echo "Ошибка отправки: " . $mail->ErrorInfo;
    }
} else {
    header("Location: index.html");
    exit;
}
?>
