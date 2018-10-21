<?php
	$error = array();
	if (empty($_POST['orderfirstname']))
		$error[] = 'orderfirstname|Mangler fornavn for bestilling';
	if (empty($_POST['orderlastname']))
		$error[] = 'orderlastname|Mangler etternavn for bestilling';
	if (empty($_POST['orderemail']))
		$error[] = 'orderemail|Mangler e-post for bestilling';
	if (!preg_match('/\S*@\S*\.\S*/', $_POST['orderemail']))
		$error[] = 'orderemail|Ikke gyldig e-post';
	if (empty($_POST['orderzip']))
		$error[] = 'orderzip|Mangler postnummer for bestilling';
	else if (!preg_match('/^[0-9]{4,5}$/', $_POST['orderzip']))
		$error[] = 'orderzip|Postnummer for bestilling er ugyldig';
	if (empty($_POST['ordercity']))
		$error[] = 'ordercity|Mangler poststed for bestilling';
	$phone = $_POST['orderphone'];
	if (empty($phone))
		$error[] = 'orderphone|Mangler telefonnr på bestilling';
	else if (!preg_match('/^\+?4?7?([0-9 ?]{8,15})$/', $phone))
		$error[] = 'orderphone|Telefonnr på bestilling er ikke gyldig';

	$fields = array(
		'fornavn'			=> $_POST['orderfirstname'],
		'etternavn'			=> $_POST['orderlastname'],
		'tlf'				=> $_POST['orderphone'],
		'epost'				=> $_POST['orderemail'],
		'firma'				=> $_POST['ordercompany'],
		'adresse'			=> $_POST['orderaddress'],
		'postnummer'		=> $_POST['orderzip'],
		'poststed'			=> $_POST['ordercity']
	);

	$counter = 1;
	while (isset($_POST['firstname' . $counter])) {
		if (empty($_POST['firstname'.$counter]))
			$error[] = 'firstname'.$counter.'|Mangler fornavn på deltaker '.$counter;
		if (empty($_POST['lastname'.$counter]))
			$error[] = 'lastname'.$counter.'|Mangler etternavn på deltaker '.$counter;
		if (empty($_POST['email'.$counter]))
			$error[] = 'email'.$counter.'|Mangler e-post til deltaker '.$counter;
		if (!preg_match('/\S*@\S*\.\S*/', $_POST['email' . $counter]))
			$error[] = 'email'.$counter.'|E-post til deltaker ' . $counter . ' er ikke gyldig';
		if (empty($_POST['phone'.$counter]))
			$error[] = 'phone'.$counter.'|Mangler mobil til deltaker '.$counter;
		else if(!preg_match('/^\+?4?7?([0-9 ?]{8,15})$/', $_POST['phone'.$counter]))
			$error[] = 'phone'.$counter.'|Mobilnr til deltaker ' . $counter . ' er ikke gyldig';

		$fields['deltakerfornavn'.$counter] = $_POST['firstname'.$counter];
		$fields['deltakeretternavn'.$counter] = $_POST['lastname'.$counter];
		$fields['deltakerepost'.$counter] = $_POST['email'.$counter];
		$fields['deltakertlf'.$counter] = $_POST['phone'.$counter];
		$counter++;
	}

	if (!empty($error)) {
		echo implode('||', $error);
		return;
	}
	
	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_URL, 'https://www.dataforeningen.no/cpclass/run/cpform/formservice.php');
	curl_setopt($ch, CURLOPT_POST, count($fields));
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); 	 #Fjern disse to når vi går LIVE
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); #Altså denne også.
	curl_setopt($ch, CURLOPT_FAILONERROR,1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);

	//execute post
	$result = curl_exec($ch);
	
	try {
		$xml = new SimpleXMLElement($result);
	} catch(Exception $e) {
		echo "INFO: " . curl_getinfo($ch, CURLINFO_HTTP_CODE);
		echo "------ERROR: " . curl_error($ch);
		echo "------EXCEPTION: " . var_export($e);
		echo "------RESULT: " . var_export($result);
		die();
	}
	//close connection
	curl_close($ch);
	//echo '----------DATA' . $xml->code;
	echo $xml->code;

	$fields['entrydate'] = date('H:i - d.m.Y');
	//Save to local file
	$list = require('data.php');
	$list[] = $fields;
	$saved = file_put_contents('data.php', '<?php return ' . var_export($list, true) . ';');
	if(!$saved)die('Error on save');
?>