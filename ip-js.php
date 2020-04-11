<?php
$ip=$_SERVER['REMOTE_ADDR'];
//echo $ip;
//echo "<br>";
if ( isset ($_SERVER["HTTP_X_FORWARDED_FOR"]) ) {
	$visitorIPAddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
} else {
	$visitorIPAddress = $_SERVER["REMOTE_ADDR"];	
}
echo 'var iplcustomdim = "@_@'.$visitorIPAddress.'";'."\n";
?>