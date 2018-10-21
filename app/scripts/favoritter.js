$(function() {

	populateSpeakers(function() {
		populateSessions(function() {
			var $ul = $("<ul>").addClass("cleanlist");
		
			var sessions = [];
			for (var i = 0; i < sessionsLength(); i++) {
				var session = getSession(i);
				if (cookie.read("fav" + session.id) != 'true') continue;
				
				var speaker = getSpeakerById(session.speakerIds[0]);
				var custom = {
					id: session.id,
					title: session.title,
					speakerId: speaker.id,
					speakerName: speaker.name,
					track: session.track,
					isFav: cookie.read("fav" + session.id) ? "checked" : "not",
					from: formatTime(session.starts),
					to: formatTime(session.ends),
					duration: getTimeDifference(session.ends, session.starts)
				}
				sessions.push(custom);
			}
			sessions.sort(function(a, b) {
				return a.from > b.from ? 1 : -1;
			});
			
			for (var i = 0; i < sessions.length; i++) {
				$ul.append(tmpl("sessionTemplate", sessions[i]));
			}
			
			if (!sessions.length) {
				$("#favourites").append("<h2>Ingen favoritter enda</h2>");
			}
			
			$("#favourites").append($ul);
		});
		
	});
	
	
	$(document).on("change", "#favourites :checkbox", function() {
		var id = $(this).data("id");
		cookie.create("fav" + id, $(this).is(":checked"), 100);
		$(this).parents("li").animate({ height: 0 }, function() {
			$(this).remove();
		});
	});
	
	
});