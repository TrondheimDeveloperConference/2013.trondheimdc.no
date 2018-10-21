$(function() {
	$("header,footer").show();
	populateSessions();
	populateSpeakers(function() {
		var $ul = $("<ul>").addClass("cleanlist");
		for (var i = 0; i < speakersLength(); i++) {
			var speaker = getSpeaker(i);
			var $speaker = $(tmpl("speakersTemplate", speaker));
			var sessions = getSessionsBySpeaker(speaker.id);
			for (var j = 0; j < sessions.length; j++) {
				$speaker.find(".sessions").append(tmpl("sessionsTemplate", sessions[j]));
			}
			$ul.append($speaker);
		}
		
		$("#speakers").append($ul);
		
		setTimeout(function() {
			if (location.hash.length) {
				$("body,html").scrollTop($("#s" + location.hash.substr(1)).offset().top);
			}		
		}, 500);
	});
	
});