$(function() {

	populateSpeakers(function() {
		populateSessions(function() {
			if (location.hash.length) {
				$(".tilt").hide();
				$("#timeview").hide();
				$("header,footer").show();
				var id = location.hash.substr(1);
				var session = getSessionById(id);
				var custom = {
					title: session.title,
					abstract: session.abstract,
					track: session.track,
					from: formatTime(session.starts),
					to: formatTime(session.ends),
					duration: getTimeDifference(session.ends, session.starts)
				}
				var $tmpl = $(tmpl("singleSessionTemplate", custom));
				for (var i = 0; i < session.speakerIds.length; i++) {
					var speaker = getSpeakerById(session.speakerIds[i]);
					if (speaker) {
						$tmpl.find(".speakers").append(tmpl("sessionSpeakerTemplate", speaker));
					}
				}
				$("#sessions").append($tmpl);
			} else {
				var $ul = $("<ul>").addClass("cleanlist");
				for (var i = 0; i < slotsLength(); i++) {
					var slot = getSlot(i);
					if (slot.starts.getHours() == 8 || slot.starts.getHours() == 18) continue;
					var sessions = getSessionsBySlot(slot.starts, slot.ends);
					
					if (slot.title) {
						slot.title = slot.title.replace("Takk for i dag", "Party");
						$ul.append(tmpl("noSessionTemplate", slot));
					} else {
						sessions.sort(function(a, b) {
							return a.track < b.track ? -1 : 1;
						});
						if (sessions.length > 1 && sessions.length < 4) {
							for (var j = 0; j < 4; j++) {
								if (sessions[j] == undefined ||  sessions[j].track - 1 != j) {
									sessions.push({
										title: 'TBA',
										track: j+1,
										starts: slot.starts,
										ends: slot.ends,
										speakerIds: []
									});
									sessions.sort(function(a, b) {
										return a.track < b.track ? -1 : 1;
									});
								}
							}
						}
						
						for (var j = 0; j < sessions.length; j++) {
							var session  = sessions[j];
							var custom = {
								id: session.id,
								title: session.title,
								track: session.track,
								isFav: cookie.read("fav" + session.id) == 'true' ? "checked" : "not",
								from: session.starts,
								to: session.ends,
								duration: getTimeDifference(session.ends, session.starts)
							}
							
							var $li = $(tmpl("sessionTemplate", custom));
							
							for (var k = 0; k < session.speakerIds.length; k++) {
								var speaker = getSpeakerById(session.speakerIds[k]);
								if (speaker) {
									$li.find(".speakers").append(tmpl("sessionSpeakerTemplate", speaker));
								}
							}
							
							$ul.append($li);
						}
					}
				}
				$ul.prepend("<li class='h9 l10 fake break'><h3>Introduksjon</h3></li>");
				$("#sessions").append($ul);
				$("html").addClass("fullProgram");
			}
		});
	});
	
	$(document).on("click", "#sessions h3 a", function(e) {
		e.preventDefault();
		location.href = this.href;
		location.reload();
	});
	
	$(document).on("click", "#sessions :checkbox", function() {
		var checked = $(this).is(":checked");
		var id = $(this).data("id");
		cookie.create("fav" + id, checked, 100);
		if (checked)
			$(this).parents("li").addClass("checked");
		else
			$(this).parents("li").removeClass("checked");
	});
	
});