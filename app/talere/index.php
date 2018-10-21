<?php include "../header.php"; ?>
	
	<section id="speakers">
		
	</section>
	
	<script type="text/html" id="speakersTemplate">
	<article id="s<%= id %>">
		<header>
			<img src="<%= image %>" alt="Bilde av <%= name %>">
			<h2>
				<%= name %>
				<small>Twitter: <a href="http://twitter.com/<%= twitter %>">@<%= twitter %></a></small>
			</h2>
		</header>
		<p><%= about %></p>
		<h3>Foredrag</h3>
		<ul class="sessions cleanlist">
		
		</ul>
	</article>
	
	</script>
	<script type="text/html" id="sessionsTemplate">
	<li>
		<a href="/app/foredrag/#<%= id %>"><%= title %></a>
	</li>
	</script>
	<script>
		document.querySelector("header nav li:nth-child(2)").className = "active";
	</script>
	
<?php

$scripts[] = "/app/scripts/talere.js";

include "../footer.php";
?>