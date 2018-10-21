$(function() {

	populateSpeakers(function() {
		$ul = $("<ul>").addClass("cleanlist");
		for (var i = 0; i < speakersLength(); i++) {
			var speaker = getSpeaker(i);
			if (!speaker.image)
				speaker.image = "/img/speakers/speaker_male-default.png";
			var $speaker = $(tmpl("speakerTemplate", speaker));
			var sessions = getSessionsBySpeaker(speaker.id);
			for (var j = 0; j < sessions.length; j++) {
				$speaker.find(".content").append(tmpl("sessionTemplate", sessions[j]));
			}
			if (speaker.image.indexOf("default") == -1)
				$speaker.addClass("realFont");
			
			var rand = Math.random() * 2;
			if (rand > 1) $speaker.addClass("large");
			else          $speaker.addClass("medium");
			
			if (i == 1) $speaker.addClass("active");
			
			$ul.append($speaker);
		}
		
		$("#SpeakerList").append($ul);
	
		if ($(document).width() < 960) {
			$("#SpeakerList li").removeClass("active");
			$("#SpeakerList li:first-child").addClass("active");
		}
		
		$ul.data("left", $("#SpeakerList ul").css("left").replace("px", ""));
	});
	
	$(document).on("click", ".speakerNav", function() {
		if ($(this).hasClass("disabled")) return;
		var $old = $("#SpeakerList .active");
		if ($(this).hasClass("next")) {
			$new = $old.next();
		} else {
			$new = $old.prev();
		}

		centerSpeaker($new);
	});

	var mousedown = false,
		startX = 0,
		diff = 0,
		click = false,
		$ul;
	$(document).on("mousedown", "#SpeakerList", function(e) {
		mousedown = true;
		startX = e.clientX;
		click = true;
		return false;
	});
	$(document).on("mouseup", function(e) {
		mousedown = false;
		$ul.data("left", -diff);
		if (Math.abs(startX - e.clientX) > 20) click = false;
	});
	var checkoffset = true;
	$(document).on("mousemove", function(e) {
		if (!mousedown) return;

		diff = startX - e.clientX - $ul.data("left");
		$ul.css("left", -diff);

		var width = 0;
		if (checkoffset) {
			checkoffset = false;
			var isset = false;
			$("#SpeakerList li").each(function() {
				if (isset) return;
				width += $(this).outerWidth();
				if (width - diff > $("#SpeakerList ul").outerWidth() / 2) {
					$old = $("#SpeakerList .active");
					changeActive($old, $(this));
					isset = true;
				}
			});
			setTimeout(function() {
				checkoffset = true;
			}, 500);
		}
	});

	$(document).on("scroll", function() {
		var speakerTop = $("#SpeakerList").offset().top - $(window).height();
		var speakerEnd = speakerTop + $("#SpeakerList").height();
		$(document).off("keyup", speakerKeyUp);
		if ($("body").scrollTop() > speakerTop) {
			$(document).on("keyup", speakerKeyUp);
		}
		if ($("body").scrollTop() > speakerEnd) {
			$(document).off("keyup", speakerKeyUp);
		}
	});

	//$(document).on("click", ".readmore", function() {
	//	$(this).parents(".wayToHigh").css("height", "auto");
	//});

	$(document).on("click", "#SpeakerList li", function() {
		if (!click) return;
		centerSpeaker($(this));
	});

	function centerSpeaker($elm) {
		if ($elm == undefined) {
			$elm = findCenterSpeaker();
		}
		var width = $elm.outerWidth() / 2;
		$elm.prevAll().each(function() {
			width += $(this).outerWidth();
		});
		var center = $("#SpeakerList").width() / 2;
		$ul.animate({ "left": -width+center });
		$ul.data("left", -width+center);
		changeActive($("#SpeakerList .active"), $elm);
	}

	function findCenterSpeaker() {
		var center = $("#SpeakerList").width() / 2;
			var width = $ul.data("left") - 0;
			var $elm,
				isset = false;
			$("#SpeakerList li").each(function() {
				if (isset) return;
				width += $(this).outerWidth();
				if (width > center) {
					$elm = $(this);
					isset = true;
				}
			});
			return $elm;
	}

	function changeActive($old, $new) {
		if ($new.hasClass("active")) return;
		$(".content", $old).stop().slideUp();
		$old.removeClass("active");
		$(".readmore").remove();
		$new.find(".content").stop().slideDown(function() {
			$new.hide().show(0);
		});
		$new.addClass("active");

		//if ($new.height() > 500) {
			//$new.addClass("wayToHigh");
			//$("<b class='readmore'>Les mer</b>").appendTo($new);
		//}

		toggleButtonClasses();
	}

	function speakerKeyUp(e) {
		if (e.keyCode == 37) {
			$(".speakerNav.prev").trigger("click");
		} else if (e.keyCode == 39) {
			$(".speakerNav.next").trigger("click");
		}
	}

	function toggleButtonClasses() {
		if ($("#SpeakerList .active").prev().length === 0) {
			$(".speakerNav.prev").addClass("disabled");
		} else {
			$(".speakerNav.prev").removeClass("disabled");
		}

		if ($("#SpeakerList .active").next().length === 0) {
			$(".speakerNav.next").addClass("disabled");
		} else {
			$(".speakerNav.next").removeClass("disabled");
		}
	}
});