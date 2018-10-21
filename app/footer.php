	<footer id="pagefooter">
		<small>Trondheim Developer Conference er et samarbeid mellom fagmiljøene i Trondheim. <a href="http://www.trondheimdc.no">www.trondheimdc.no</a>
		<a href="mailto:connect@trondheimdc.no">connect@trondheimdc.no</a></small>
	</footer>
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://2013.trondheimdc.no/js/data.js"></script>
	<!--script src="/scripts/data.js"></script-->
	
	<?php
	global $scripts;
	foreach ($scripts as $s) {
		echo "<script src='$s'></script>";
	}
	?>
</body>
</html>
