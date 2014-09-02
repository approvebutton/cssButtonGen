<?php

    if($_POST) {
    require("lib/mail/PHPMailerAutoload.php");

    $mail = new PHPMailer();

    $mail->IsSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = "ssl";
    $mail->Port       = 465;
    $mail->Charset    = "UTF-8";
    $mail->Username   = "alpha7@sredatv.ru";
    $mail->Password   = "alpha123";
    $mail->From       = "alpha7@sredatv.ru";
    $mail->FromName   = "CSS Button";
    $mail->AddAddress("{$_POST['email']}");
    $mail->Subject    = 'CSS3 Button';
    $mail->Body     = "HTML: \r\n {$_POST['html']}\r\n CSS: \r\n {$_POST['css']}";

    if(!$mail->Send()) {
      echo 'Message was not sent.';
      echo 'Mailer error: ' . $mail->ErrorInfo;
    } else {
      echo 'Message has been sent.';
    };
};

?>
