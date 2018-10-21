<?php include "../header.php"; ?>
	
	<div id="favourites" class="sessions">
		
	</div>
	
	<script type="html/text" id="singleSessionTemplate">
	<h2><%= title %></h2>
	<div class="speakers">
		<a href="/app/talere/#<%= speakerId %>"><%= speakerName %></a>
		på spor <%= track %> kl <%= from %> - <%= to %> (<%= duration %>min)
	</div>
	<p>
		<%= abstract %>
	</p>
	<div class="tags">
		
	</div>
	</script>
	
	<script type="html/text" id="sessionTemplate">
	<li class="<%= isFav %>">
		<h3><a href="/app/foredrag/#<%= id %>"><%= title %></a></h3>
		<h4><a href="/app/talere/#<%= speakerId %>"><%= speakerName%></a></h4>
		<label>
			Stjerne
			<input type="checkbox" data-id="<%= id %>" <%= isFav %>>
		</label>
		<small>på spor <%= track %> kl <%= from %> - <%= to %> (<%= duration %>min)</small>
		<div class="tags">
		
		</div>
	</li>
	</script>
	<script>
		document.querySelector("header nav li:nth-child(3)").className = "active";
	</script>
	
<?php

$scripts[] = "/app/scripts/favoritter.js";

include "../footer.php";
?>