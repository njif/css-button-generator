<?php

include 'validate.php';

if (!empty($_POST)) {

	$email_adress = $_POST['email'];

	if (validateEmail($email_adress)) {
		require_once ("lib/mail/PHPMailerAutoload.php");

		$mail = new PHPMailer();

		$mail->IsSMTP();
		$mail->Host       = "smtp.gmail.com";
		$mail->SMTPAuth   = true;
		$mail->SMTPSecure = "ssl";
		$mail->Port       = 465;
		$mail->Charset    = "UTF-8";

		$userdata    = file_get_contents("user.pwd");
		$userdataArr = explode("\n", $userdata);

		$mail->Username = $userdataArr[0];
		$mail->Password = $userdataArr[1];

		$mail->AddAddress("{$email_adress}");

		$mail->From     = "css3buttongenerator@gmail.com";
		$mail->FromName = "CSS3 Button generator";

		$mail->Subject = 'CSS3 Button code';

		$mail->Body = "Button html code: \r\n {$_POST['html']}\r\n Button css code: \r\n {$_POST['css']}";

		if ($mail->Send()) {
			echo 'Done!';
		} else {
			echo 'Mailer error: ' . $mail->ErrorInfo;
		};

	} else {
		echo 'Error: Wrong email!';
	};

};

?>