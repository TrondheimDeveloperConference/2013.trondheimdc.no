//sessions
function sessionsLength() {
	return TrondheimDC.sessions.length;
}

function getSession(id) {
	return TrondheimDC.sessions[id];
}

function getSessionById(id) {
	for (var i = 0; i < sessionsLength(); i++) {
		if (TrondheimDC.sessions[i] && TrondheimDC.sessions[i].id == id)
			return TrondheimDC.sessions[i];
	}
}

function getSessionsBySpeaker(id) {
	var sessions = [];
	for (var i = 0; i < sessionsLength(); i++) {
		var session = getSession(i);
		if (!session) continue;
		for (var j = 0; j < session.speakerIds.length; j++) {
			if (session.speakerIds[j] == id)
				sessions.push(session);
		}
	}
	return sessions;
}

function getSessionsBySlot(start, end) {
	var sessions = [];
	for (var i = 0; i < sessionsLength(); i++) {
		var session = getSession(i);
		if (session.starts >= start && session.ends <= end)
			sessions.push(session);
	}
	return sessions;
}

//speakers
function speakersLength() {
	return TrondheimDC.speakers.length;
}

function getSpeaker(i) {
	return TrondheimDC.speakers[i];
}

function getSpeakerById(id) {
	for (var i = 0; i < speakersLength(); i++) {
		if (TrondheimDC.speakers[i] && TrondheimDC.speakers[i].id == id)
			return TrondheimDC.speakers[i];
	}
}

//slots
function slotsLength() {
	return TrondheimDC.timeslots.length;
}

function getSlot(i) {
	return TrondheimDC.timeslots[i];
}

//helpers
function formatTime(time) {
	var h = time.getHours();
	var m = time.getMinutes();
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	return h + ":" + m;
}

function getTimeDifference(t1, t2) {
	var diff = Math.abs(t1 - t2);
	return Math.floor((diff/1000)/60);
}

var cookie = {
    create: function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        return value;
    },
    read: function (name) {
        var cName = name + "=";
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(cName) == 0)
                return cookie.substring(cName.length, cookie.length);
        }
        return null;
    },
    remove: function (name) {
        cookie.create(name, "", -1);
    }
};

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

if (typeof TrondheimDC === "undefined" || !TrondheimDC) {
    TrondheimDC = {};
}

if (typeof TrondheimDC.timeslots === "undefined" || !TrondheimDC.timeslots) {
    TrondheimDC.timeslots = {};
}

TrondheimDC.timeslots = [
	{
		starts: new Date(2013, 09, 28, 08, 00, 00),
		ends: new Date(2013, 09, 28, 09, 00, 00),
		title: "Registrering"
	},
    {
        starts: new Date(2013, 09, 28, 09, 00, 00),
        ends: new Date(2013, 09, 28, 09, 10, 00)
    },
    {
        starts: new Date(2013, 09, 28, 09, 10, 00),
        ends: new Date(2013, 09, 28, 10, 00, 00)
    },
    {
        starts: new Date(2013, 09, 28, 10, 00, 00),
        ends: new Date(2013, 09, 28, 10, 15, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 10, 15, 00),
        ends: new Date(2013, 09, 28, 10, 45, 00)
    },
    {
        starts: new Date(2013, 09, 28, 10, 45, 00),
        ends: new Date(2013, 09, 28, 11, 00, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 11, 00, 00),
        ends: new Date(2013, 09, 28, 11, 30, 00)
    },
    {
        starts: new Date(2013, 09, 28, 11, 30, 00),
        ends: new Date(2013, 09, 28, 11, 45, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 11, 45, 00),
        ends: new Date(2013, 09, 28, 12, 15, 00),
    },
    {
        starts: new Date(2013, 09, 28, 12, 15, 00),
        ends: new Date(2013, 09, 28, 12, 30, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 12, 30, 00),
        ends: new Date(2013, 09, 28, 13, 00, 00)
    },
    {
        starts: new Date(2013, 09, 28, 13, 00, 00),
        ends: new Date(2013, 09, 28, 14, 00, 00),
        title: "Lunsj"
    },
    {
        starts: new Date(2013, 09, 28, 14, 00, 00),
        ends: new Date(2013, 09, 28, 14, 30, 00)
    },
    {
        starts: new Date(2013, 09, 28, 14, 30, 00),
        ends: new Date(2013, 09, 28, 14, 45, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 14, 45, 00),
        ends: new Date(2013, 09, 28, 15, 15, 00)
    },
    {
        starts: new Date(2013, 09, 28, 15, 15, 00),
        ends: new Date(2013, 09, 28, 15, 30, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 15, 30, 00),
        ends: new Date(2013, 09, 28, 16, 00, 00)
    },
    {
        starts: new Date(2013, 09, 28, 16, 00, 00),
        ends: new Date(2013, 09, 28, 16, 15, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 16, 15, 00),
        ends: new Date(2013, 09, 28, 16, 45, 00)
    },
    {
        starts: new Date(2013, 09, 28, 16, 45, 00),
        ends: new Date(2013, 09, 28, 17, 00, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 09, 28, 17, 00, 00),
        ends: new Date(2013, 09, 28, 17, 50, 00)
    },
    {
        starts: new Date(2013, 09, 28, 17, 50, 00),
        ends: new Date(2013, 09, 28, 18, 00, 00),
        title: "Takk for i dag"
    },
    {
        starts: new Date(2013, 09, 28, 18, 00, 00),
        ends: new Date(2013, 09, 28, 00, 00, 00),
        title: "TDC afterparty"
    }
]


if (typeof TrondheimDC.sessions === "undefined" || !TrondheimDC.sessions) {
    TrondheimDC.sessions = {};
}
function populateSessions(callback) {
	if (!TrondheimDC.sessions.length) {
		var url = "/sessions.php";
		if (location.href.indexOf("local.") == -1)
			url = "/app" + url;
		$.getJSON(url, function(data) {
			TrondheimDC.sessions = data;
			for (var i = 0; i < TrondheimDC.sessions.length; i++) {
				TrondheimDC.sessions[i].speakerIds = eval(TrondheimDC.sessions[i].speakerIds);
				TrondheimDC.sessions[i].starts = new Date(TrondheimDC.sessions[i].starts);
				TrondheimDC.sessions[i].ends = new Date(TrondheimDC.sessions[i].ends);
			}
			try {
				callback();
			} catch(e) {}
		});
	}
}



/********************
* SPEAKERS
********************/

if (typeof TrondheimDC.speakers === "undefined" || !TrondheimDC.speakers) {
    TrondheimDC.speakers = {};
}
function populateSpeakers(callback) {
	if (!TrondheimDC.speakers.length) {
		var url = "/speakers.php";
		if (location.href.indexOf("local.") == -1)
			url = "/app" + url;
		$.getJSON(url, function(data) {
			TrondheimDC.speakers = data;
			try {
				callback();
			} catch(e) {}
		});
	}
}