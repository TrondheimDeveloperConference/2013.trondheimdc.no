<?php include "../header.php"; ?>
	
	<div id="timeview">
		<?php
		for ($i = 9; $i < 18; $i++) {
			echo "<div class='h$i'></div>";
			echo "<div class='h$i m30'></div>";
		}
		?>
	</div>
	
	<span class="tilt"></span>
	
	<div id="sessions" class="sessions">
		
	</div>
	
	<script type="html/text" id="singleSessionTemplate">
	<div>
		<h3><%= title %></h3>
		<h4 class="speakers"></h4>
		<div>
			på spor <%= track %> kl <%= from %> - <%= to %> (<%= duration %>min)
		</div>
		<p>
			<%= abstract %>
		</p>
	</div>
	</script>
	
	<script type="text/html" id="sessionSpeakerTemplate">
	<a href="/app/talere/#<%= id %>"><%= name %></a>
	</script>
	
	<script type="html/text" id="sessionTemplate">
	<li class="<%= isFav %> t<%= track %> h<%= from.getHours() %> m<%= from.getMinutes() %> l<%= duration %>">
		<h3><a href="/app/foredrag/#<%= id %>"><%= title %></a></h3>
		<h4 class="speakers"></h4>
		<label>
			Stjerne
			<input type="checkbox" data-id="<%= id %>" <%= isFav %>>
		</label>
		<small>på spor <%= track %> kl <%= formatTime(from) %> - <%= formatTime(to) %> (<%= duration %>min)</small>
		<div class="tags">
		
		</div>
	</li>
	</script>
	
	<script type="html/text" id="noSessionTemplate">
	<li class="break h<%= starts.getHours() %> m<%= starts.getMinutes() %> l<%= getTimeDifference(starts, ends) %>">
		<h3><%= title %></h3>
	</li>
	</script>
	<script>
		document.querySelector("header nav li:first-child").className = "active";
	</script>
	
	<?php
	
	$scripts[] = "/app/scripts/foredrag.js";
	
	include "../footer.php";
	?>