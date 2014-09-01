<?php $mail = new PHPMailer;

$mail->IsSMTP();
$mail->Host       = "smtp.gmail.com";
$mail->SMTPAuth   = true;
$mail->SMTPSecure = "ssl";
$mail->Port       = 465;
$mail->Charset    = "UTF-8";
$mail->Username   = "alpha7@sredatv.ru";
$mail->Password   = "alpha123";
$mail->From       = "alpha7@sredatv.ru";
$address          = $_POST['email'];

$mail->isHTML(true);
$mail->Subject    = 'Subject';
$mail->Body       = "HTML: {$_POST['html']}<br> CSS: {$_POST['css']}";
$mail->AltBody    = "HTML: {$_POST['html']}\r\n CSS: {$_POST['css']}";
