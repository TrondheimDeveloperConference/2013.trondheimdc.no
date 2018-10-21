$(function() {

	//PROGRAM
	populateSpeakers(function() {
		populateSessions(function() {
			var $wrapper = $("<div>");
			for (var i = 0; i < slotsLength(); i++) {
				var slot = getSlot(i);
				var sessions = getSessionsBySlot(slot.starts, slot.ends);
				
				var $ul = $(tmpl("slotTemplate", slot));
				if (slot.title) {
					$ul.append(tmpl("slotNoSessionTemplate", slot)).addClass("noSession");
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
						session.speaker = "";
						for (var k = 0; k < session.speakerIds.length; k++) {
							var speaker = getSpeakerById(session.speakerIds[k]);
							if (speaker)
								session.speaker += ", " + speaker.name;
						}
						session.speaker = session.speaker.substr(2);
						
						if (!session.abstract)
							session.abstract = "";
						
						var $li = $(tmpl("slotSessionTemplate", session));
						$li.append(tmpl("slotSpeakerDetailsTemplate", session));
						
						for (var k = 0; k < session.speakerIds.length; k++) {
							var speaker = getSpeakerById(session.speakerIds[k]);
							if (speaker) {
								$li.find(".content").append(tmpl("slotSpeakerDetailAboutTemplate", speaker));
							}
						}
						
						$ul.append($li);
					}
					if (sessions.length == 1)
						$ul.addClass("mainSession");
				}
				$wrapper.append($ul);
			}
			$("#ProgramWrapper").html($wrapper.html());
		});
	});

	//open session
	$(document).on("click", ".speaker, .session", function() {
		openPopup($(this));
	});
	var touchX = 0;
	$(document).on("touchstart", function(event) {
		var e = event.originalEvent.changedTouches[0];
		touchX = e.clientX;
	});
	$(document).on("touchend", ".speaker, .session", function(event) {
		var e = event.originalEvent.changedTouches[0];
		if (Math.abs(touchX - e.clientX) < 1) {
			openPopup($(this));
		}
	});
	
	function openPopup($elm) {
		$("#sessionPopup").html($elm.parents("li").find(".fulldetailview").html());
		$("#sessionPopup").fadeIn();
		$(document).on("click touchend", closePopup);
		$("html,body").css("overflow", "hidden");
	}
	
	function closePopup(e) {
		if ($(e.target).parents("#sessionPopup").length) return;
		$("#sessionPopup").fadeOut();
		$(document).off("click touchend", closePopup);
		$("html,body").css("overflow", "");
	}

	$(document).keyup(function(e) {
		if ($("#sessionPopup").length == 1 && e.which == 27) {
			closePopup(e);
		}	
	});

	// ALL DEVICES
	$(document).on("focus", "input", function() {
		$(this).parents("label").addClass("focus");
	});

	$(document).on("blur", "input", function() {
		$(this).parents("label").removeClass("focus");
	});

	$(document).on("click", "a[href*=#]", function(e) {
		e.preventDefault();
		var href = $(this).attr("href");

		if ($(window).width() < 1200) {
			var offsetTop = $(href).offset().top - 30;
			scrollToLocation(offsetTop, href);
		} else {
			var offsetTop = $(href).offset().top - 80;	
			scrollToLocation(offsetTop, href);
		}		
	});

	function scrollToLocation(offsetTop, href) {
		$("body").animate({ scrollTop: offsetTop }, function() {
			location.hash = href;
		});
	}

	$(window).on("scroll", windowScroll);
	
	
	//LARGE DEVICES
	var menuSt;
	function startMenuTimer() {
		clearTimeout(menuSt);
		if ($(window).width() < 1200) return;
		menuSt = setTimeout(function() {
			$("#MainNav ul").stop().animate({ "margin-left": -$("#MainNav ul").width() }, function() {
				$("#MainNav").addClass("inactive");
			});
		}, 1000);
	}
	startMenuTimer();

	function showMenu() {
		clearTimeout(menuSt);
		var $ul = $("#MainNav ul")
		if ($ul.parent().hasClass("inactive")) {
			$ul.parent().removeClass("inactive");
			$ul.stop().animate({ "margin-left": 0 });
		}
	}
	$(document).on("mousemove, mouseover", "#MainNav ul", function() {
		showMenu();
	});

	$(document).on("mouseout", "#MainNav ul", function() {
		startMenuTimer();
	});

	var prevWidth = $(window).width();
	$(window).on("resize", function() {
		var newWidth = $(window).width();
		if (newWidth < 1200 && prevWidth >= 1200) {
			showMenu();
		} else if (newWidth >= 1200 && prevWidth < 1200) {
			startMenuTimer();
		}

		prevWidth = newWidth;
	});

});

function windowScroll() {
    var st = $(this).scrollTop();

    if (st > 100) {
        $("#Challange").fadeOut();
        $("body").addClass("scrolled");
    } else {
        $("#Challange").fadeIn();
        $("body").removeClass("scrolled");
    }
}
