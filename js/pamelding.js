$(function() {
	$(document).on("click", "#AddAttendee", function() {
		var $div = $(".personDetails > div:last").clone();
		var num = $(".personDetails > div").length+1;
		$("input", $div).each(function() {
			$(this).val("");
			$(this).attr("name", $(this).attr("name").replace(/[0-9]{1,2}/g, num));
		});
		$div.find("h3").text("Deltaker #" + num);
		$(".personDetails").append($div);
		$(".personDetails .remove").removeClass("disabled").parents("#Enrollment").removeClass("singleAttendee");
	});

	$(document).on("click", "#Enrollment .remove", function() {
		if ($(".personDetails > div").length === 1) return;

		$(this).closest(".row").animate({ height: 0, avoidCSSTransitions: true }, function() {
			$(this).remove();
			resetInputs();
			if ($(".personDetails > div").length == 1)
				$(".personDetails .remove").addClass("disabled").parents("#Enrollment").addClass("singleAttendee");
		});
	});

	$(document).on("click", "#AttendeIsOrder", function() {
		var $div = $(".personDetails > div:first");
		var name = $div.find("[name*=firstname]").val();
		var lastname = $div.find("[name*=lastname]").val();
		var email = $div.find("[name*=email]").val();
		var phone = $div.find("[name*=phone]").val();

		$("#FirstName input").val(name);
		$("#LastName input").val(lastname);
		$("#Email input").val(email);
		$("#Phone input").val(phone);
	});

	function resetInputs() {
		$(".personDetails > div").each(function(num) {
			//var num = $(".personDetails > div").length+1;
			num++;
			$("input", $(this)).each(function() {
				$(this).attr("name", $(this).attr("name").replace(/[0-9]{1,2}/g, num));
			});
			$(this).find("h3").text("Deltaker #" + num);
		});
	}

	$(document).on("keyup", "#Enrollment input", function() {
		$(this).parent().removeClass("invalid");
	});

	//AJAX påmelding
	$(document).on("click", "#Enrollment [type=submit]", function(e) {
		e.preventDefault();

		$.post("ajax.php", $("#Enrollment").serialize()).done(function(data) {
			if (data == "OK") {
				$("#Enrollment").remove();
				$("#Paamelding .offsetRight").append("<div class='alert alert-success'>High Five! Vi sees!</div>");
				var offsetTop = $("#Paamelding").offset().top - 30;

				$("body").animate({ scrollTop: offsetTop });
			} else if (data == "Error from server") {
				alert("Vi har dessverre litt problemer med serveren. Prøv igjen senere.");
			} else {
				var errorlist = data.split("||");
				var errormsg = "";
				for (var i = 0; i < errorlist.length; i++) {
					console.log(errorlist[i]);
					errormsg += errorlist[i].split("|")[1] + "\r\n";
					$("[name=" + errorlist[i].split("|")[0] + "]").parent().addClass("invalid");
				}
				alert(errormsg);
			}
		});

		_gaq.push(['_trackEvent', 'Klikk', 'Knapp', 'Meld på']);
	});
});