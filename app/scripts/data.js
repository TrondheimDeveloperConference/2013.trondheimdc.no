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
		if (session.starts.getHours() >= start.getHours() && session.starts.getMinutes() >= start.getMinutes() &&
			session.ends.getHours() <= end.getHours() && session.ends.getMinutes() <= end.getMinutes())
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
		starts: new Date(2013, 10, 28, 08, 00, 00),
		ends: new Date(2013, 10, 28, 09, 00, 00),
		title: "Registrering"
	},
    {
        starts: new Date(2013, 10, 28, 09, 00, 00),
        ends: new Date(2013, 10, 28, 09, 10, 00),
        title: "Introduksjon"
    },
    {
        starts: new Date(2013, 10, 28, 09, 10, 00),
        ends: new Date(2013, 10, 28, 10, 00, 00)
    },
    {
        starts: new Date(2013, 10, 28, 10, 00, 00),
        ends: new Date(2013, 10, 28, 10, 15, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 10, 15, 00),
        ends: new Date(2013, 10, 28, 10, 45, 00)
    },
    {
        starts: new Date(2013, 10, 28, 10, 45, 00),
        ends: new Date(2013, 10, 28, 11, 00, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 11, 00, 00),
        ends: new Date(2013, 10, 28, 11, 30, 00)
    },
    {
        starts: new Date(2013, 10, 28, 11, 30, 00),
        ends: new Date(2013, 10, 28, 11, 45, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 11, 45, 00),
        ends: new Date(2013, 10, 28, 12, 15, 00),
    },
    {
        starts: new Date(2013, 10, 28, 12, 15, 00),
        ends: new Date(2013, 10, 28, 12, 30, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 12, 30, 00),
        ends: new Date(2013, 10, 28, 13, 00, 00)
    },
    {
        starts: new Date(2013, 10, 28, 13, 00, 00),
        ends: new Date(2013, 10, 28, 14, 00, 00),
        title: "Lunsj"
    },
    {
        starts: new Date(2013, 10, 28, 14, 00, 00),
        ends: new Date(2013, 10, 28, 14, 30, 00)
    },
    {
        starts: new Date(2013, 10, 28, 14, 30, 00),
        ends: new Date(2013, 10, 28, 14, 45, 00),
        title: "Lunsj"
    },
    {
        starts: new Date(2013, 10, 28, 14, 45, 00),
        ends: new Date(2013, 10, 28, 15, 15, 00)
    },
    {
        starts: new Date(2013, 10, 28, 15, 15, 00),
        ends: new Date(2013, 10, 28, 15, 30, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 15, 30, 00),
        ends: new Date(2013, 10, 28, 16, 00, 00)
    },
    {
        starts: new Date(2013, 10, 28, 16, 00, 00),
        ends: new Date(2013, 10, 28, 16, 15, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 16, 15, 00),
        ends: new Date(2013, 10, 28, 16, 45, 00)
    },
    {
        starts: new Date(2013, 10, 28, 16, 45, 00),
        ends: new Date(2013, 10, 28, 17, 00, 00),
        title: "Pause"
    },
    {
        starts: new Date(2013, 10, 28, 17, 00, 00),
        ends: new Date(2013, 10, 28, 17, 50, 00)
    },
    {
        starts: new Date(2013, 10, 28, 17, 50, 00),
        ends: new Date(2013, 10, 28, 18, 00, 00),
        title: "Takk for i dag"
    }
]


if (typeof TrondheimDC.sessions === "undefined" || !TrondheimDC.sessions) {
    TrondheimDC.sessions = {};
}
function populateSessions(callback) {
	if (!TrondheimDC.sessions.length) {
		$.getJSON("/sessions.php", function(data) {
			TrondheimDC.sessions = data;
			for (var i = 0; i < TrondheimDC.sessions.length; i++) {
				TrondheimDC.sessions[i].starts = new Date(TrondheimDC.sessions[i].starts);
				TrondheimDC.sessions[i].ends = new Date(TrondheimDC.sessions[i].ends);
			}
			try {
				callback();
			} catch (e) {}
		});
	}
}

/*

TrondheimDC.sessions = [
    {
        id: 1,
        title: "Getting your Project Off The Ground",
        abstract: "So your project is just getting started. Or maybe you're just about to embark on a new release. Or new members just joined the team. What now?<br><br>In either situation, your project will have a lot of energy and attention right now. But at the same time, there's probably a lot of uncertainty about what to do first. Many projects waste this valuable time without a clear plan or purpose. In Exilesoft, we have refined activities to deal with these problems, even with the additional constraint that the team may be distributed geographically.<br><br>In this talk, I share a typical plan of what activities to do every day in the first weeks together with a set of activities which yeld tangible results in terms of team building, vision, architecture and a coherent working system in a minimum of time.<br><br>Come to this talk if you want to kick start your project and get on the right track fast.",
        speakerIds: [1],
        tags: [],
        starts: new Date(2013, 10, 28, 11, 00, 00),
        ends: new Date(2013, 10, 28, 11, 30, 00),
        track: 4
    }, 
    {
        id: 2,
        title: "Refactoring Patterns for TDD",
        abstract: "In this talk we will discuss how we can make some untestable code testable again, by refactoring techniques. We will also talk about design of code, what it means to have testable design vs. simply well designed code.",
        speakerIds: [2],
        tags: [],
        starts: new Date(2013, 09, 28, 12, 30, 00),
        ends: new Date(2013, 09, 28, 13, 00, 00),
        track: 1
    },
    {
        id: 3,
        title: "Bytecode for beginners",
        abstract: "This session is an introduction to the exciting underworld that hides just below the surface of our .NET and Java programs. We’ll look at the bytecode operations available on the virtual machine, and how we can manipulate them for fun and profit.",
        speakerIds: [3],
        tags: [],
        starts: new Date(2013, 09, 28, 16, 15, 00),
        ends: new Date(2013, 09, 28, 16, 45, 00),
        track: 3
    },
    {
        id: 4,
        title: "Hvordan komme igang med utvikling for Oculus Rift",
        abstract: "Oculus Rift er maskinvare som fornyer løftet om virtuell virkelighet og solid innlevelse i tredimensjonale verdener. Dette foredraget skal forsøke å besvare spørsmål som: Hva er Oculus Rift? Hvordan virker det? Hvorfor ble det en så stor suksess på Kickstarter? Hvordan kan du kjøpe en selv, og programmere for dette?",
        speakerIds: [4],
        tags: [],
        starts: new Date(2013, 09, 28, 11, 45, 00),
        ends: new Date(2013, 09, 28, 12, 15, 00),
        track: 1
    },
    {
        id: 5,
        title: "Big Data in Real-Time with Storm",
        abstract: "Storm is a scalable framework for real-time computation. It guarantees no data loss, and is programming language agnostic. What is there not to like?<br><br>This talk will show example Storm topologies and present experience from running a Storm cluster at Zedge.",
        speakerIds: [6],
        tags: [],
        starts: new Date(2013, 09, 28, 15, 30, 00),
        ends: new Date(2013, 09, 28, 16, 00, 00),
        track: 3
    },
    {
        id: 6,
        title: "10 ting en utvikler må kunne om brukervennlighet og design",
        abstract: "Interaksjonsdesignere og designere er mangelvare i mange utviklingsprosjekter. Ofte må utviklerne selv ta beslutninger som angår brukergrensesnittet og designet. Vi viser deg hva du må kunne for å lage gode, brukervennlige og estetiske systemer uten å være designer eller interaksjonsdesigner.",
        speakerIds: [7,11],
        tags: [],
        starts: new Date(2013, 09, 28, 10, 15, 00),
        ends: new Date(2013, 09, 28, 10, 45, 00),
        track: 2
    },
    {
        id: 7,
        title: "Do As I Say; Not As I Do? Optimal User Experience Through Innovation Experiment Systems",
        abstract: "Asking users what they would like to have built is probably the worst question in the history of software engineering. Users don't know what they want and it's the engineer's job to find this out. Answering this question requires a systematic approach to exploring a broad set of hypotheses about functionality that might add value for customers at different stages of development. The talk introduces the notion of Innovation Experiment Systems as a systematic method for optimizing the user experience of existing features, developing new features as well as developing new products. The method uses different techniques dependent on the stage of development, including pre-development, non-commercial deployment and commercial deployment. In each stage, frequent customer involvement, both active and passive, is used to constantly establish and improve the user experience. The method is based on data from eight industrial cases and stresses the importance of speed and rapid iterations in development. The talk uses numerous examples from industry are used to illustrate the concepts.",
        speakerIds: [8],
        tags: [],
        starts: new Date(2013, 09, 28, 09, 10, 00),
        ends: new Date(2013, 09, 28, 10, 00, 00),
        track: 1
    },
    {
        id: 8,
        title: "Parallel? Sleep well!",
        abstract: "Are you a developer, designer or architect and want to use multicore programming to make your system better? Traditionally, this would include heavy lifting, sleepless deployment nights and hard-to-track bugs. In this session I share some language independent techniques that can make you sleep well.",
        speakerIds: [9],
        tags: [],
        starts: new Date(2013, 09, 28, 11, 00, 00),
        ends: new Date(2013, 09, 28, 11, 30, 00),
        track: 3
    },
    {
        id: 9,
        title: "Continuous deployment with OctopusDeploy and TeamCity in 30 minutes",
        abstract: "Do you want more programming hours? If yes you will need an effective deployment. I will in this presentation show you how you can setup OctopusDeploy and TeamCity for effetive continuous deployment in less than 30 minutes for multiple projects.",
        speakerIds: [10],
        tags: [],
        starts: new Date(2013, 09, 28, 14, 00, 00),
        ends: new Date(2013, 09, 28, 14, 30, 00),
        track: 4
    },
    {
        id: 10,
        title: "Gjør gøye ting med touch i JavaScript",
        abstract: "Touch-interaksjon har definitivt kommet for å bli. Vi kaster et lite blikk på hvilke gøye ting du kan gjøre med touch-events i JavaScript, og beveger oss innom hvordan pointer events funker i IE.",
        speakerIds: [12],
        tags: [],
        starts: new Date(2013, 09, 28, 12, 30, 00),
        ends: new Date(2013, 09, 28, 13, 00, 00),
        track: 2
    },
    {
        id: 11,
        title: "Experiences with code review in scientific software",
        abstract: "We have recently introduced code review into our scientific software development. Our approach is simple: Two pair of eyes on every line of code. We will here present our approach and our experiences as this has helped change the way we work: We're now writing for an audience.",
        speakerIds: [13],
        tags: [],
        starts: new Date(2013, 09, 28, 12, 00, 00),
        ends: new Date(2013, 09, 28, 12, 15, 00),
        track: 4
    },
    {
        id: 12,
        title: "Utvikling og drift av 100% skybasert Java webløsning",
        abstract: "Må javaløsninger være store, tunge og vanskelige å deploye og drifte? Selv en omfattende webløsning med Java, HTML5 og JavaScript kan være lekende lett å håndtere. Jeg viser deg en lettvektsløsning som lever 100% i skyen. Den kjører på en PaaS, skalerer bra og kan deployes på kort tid uten at brukerne legger merke til det.",
        speakerIds: [14],
        tags: [],
        starts: new Date(2013, 09, 28, 14, 45, 00),
        ends: new Date(2013, 09, 28, 15, 15, 00),
        track: 3
    },
    {
        id: 13,
        title: "En innovasjonsbasert prosess: et alternativ til dagens kravspesifiseringspraksis",
        abstract: "Tradisjonell kravspesifisering sikrer verken brukervennlige eller innovative IT-løsninger. Som et alternativ foreslås kontekstuell behovskartlegging og iterativ spesifisering, der brukerhistorier og andre spesifikasjoner blir samskapt gjennom tverrfaglig samarbeid mellom designere, systemutviklere og ulike brukere. Det blir gitt konkrete eksempler fra praksis og forslag til gjennomføring.",
        speakerIds: [15],
        tags: [],
        starts: new Date(2013, 09, 28, 15, 30, 00),
        ends: new Date(2013, 09, 28, 16, 00, 00),
        track: 4
    },
    {
        id: 14,
        title: "Yahoo! i Trondheim, satelittkontor og virksomhetskritisk",
        abstract: "Suksess som satelittkontor - hvordan kan et lite kontor i et lite dyrt land langt borte fra hovedkontoret lykkes og få ansvaret for utviklingen av virksomhetskritiske systemer?",
        speakerIds: [16],
        tags: [],
        starts: new Date(2013, 09, 28, 10, 15, 00),
        ends: new Date(2013, 09, 28, 10, 45, 00),
        track: 1
    },
    {
        id: 15,
        title: "Deploymekanismer for .Net",
        abstract: "Usikker på om du skal velge Octopus, Webdeploy, eller noe helt annet? Tore guider deg gjennom jungelen og forteller deg om styrker og svakheter med de forskjellige alternativene, slik at du enklere kan gjøre et valg basert på dine behov.",
        speakerIds: [17],
        tags: [],
        starts: new Date(2013, 09, 28, 14, 45, 00),
        ends: new Date(2013, 09, 28, 15, 15, 00),
        track: 4
    },
    {
        id: 16,
        title: "Slutt å bruk scrumish",
        abstract: "Bruk scrum skikkelig. Det er lett. Det vanskelige er å løse problemene som synliggjøres. Jeg vil gi eksempler på slike problemer og hvordan man løser dem, og kanskje hvordan man kan strekke seg enda litt lenger.",
        speakerIds: [18],
        tags: [],
        starts: new Date(2013, 09, 28, 11, 45, 00),
        ends: new Date(2013, 09, 28, 12, 00, 00),
        track: 4
    },
    {
        id: 17,
        title: "Do's & Don'ts med BDD",
        abstract: "Praktiske erfaringer med Behavior Driven Development fra reelle kundecaser - hva fungerer og hva fungerer ikke like bra.",
        speakerIds: [19],
        tags: [],
        starts: new Date(2013, 09, 28, 16, 15, 00),
        ends: new Date(2013, 09, 28, 16, 45, 00),
        track: 4
    },
    {
        id: 18,
        title: "Beyond Budgeting",
        abstract: "Beyond Budgeting - a management model for new business and people realities<ul><li>the Statoil implementation journey</li><li>The problems with traditional management, including budgeting</li><li>The Beyond Budgeting principles and companies on the journey</li><li>Statoil's 'Ambition to Action' model;</li><li>redefining performance - dynamic and relative targets and a holistic performance evaluation</li><li>dynamic forecasting and resource allocation and no traditional budgets</li><li>from calendar-driven to event-driven; a more self-regulating management model</li><li>Implementation experiences and advice</li></ul>",
        speakerIds: [21],
        tags: [],
        starts: new Date(2013, 09, 28, 11, 00, 00),
        ends: new Date(2013, 09, 28, 11, 30, 00),
        track: 1
    },
    {
        id: 19,
        title: "Introduksjon",
        abstract: "",
        speakerIds: [22],
        tags: [],
        starts: new Date(2013, 09, 28, 09, 00, 00),
        ends: new Date(2013, 09, 28, 09, 10, 00),
        track: 1
    },
    {
        id: 20,
        title: "Let's do this in a better way! Let's try...",
        abstract: "As a developer, you're always looking for new ways of doing things. You'd like to take conscious, rational choices. But then, how do you know that the change is going in the right direction? That you and your team are on the same page?<br><br>This talk will offer a simple way to validate assumptions and shorten feedback loops, so that you can improve consciously. These simple steps increase transparency and collaboration, and are useful when the goal is fuzzy and progress is hard to assess. That is, pretty much always the case.",
        speakerIds: [23],
        tags: [],
        starts: new Date(2013, 09, 28, 10, 15, 00),
        ends: new Date(2013, 09, 28, 10, 45, 00),
        track: 4
    },
    {
        id: 21,
        title: "Cloud backed mobile apps the easy way",
        abstract: "Building pure client side apps is easy, but how do you scale them to the cloud? You’ve got a lot of learning to do and a lot of things to worry about like data, identity, validation, push, scale and diagnostics to name a few. Azure Mobile Services is there to make it easy. It provides you a ton of backend services out of the box to help you cloud enable those client apps utilizing the client side Javascript skills you already have, and If you are a node developer you can go even further.",
        speakerIds: [24],
        tags: [],
        starts: new Date(2013, 09, 28, 10, 15, 00),
        ends: new Date(2013, 09, 28, 10, 45, 00),
        track: 3
    },
    {
        id: 22,
        title: "C# on a diet with scriptcs",
        abstract: "Have you ever found times where you just want to write and execute some C# code and you ask yourself Do I really need an IDE? a solution? a project? a class? Do I really need to compile? Why do I have to worry about all these dlls? if you've done any development with dynamic languages like Ruby, Python or node.js the answer is you don't. But what about C#? scriptcs (https://github.com/scriptcs/scriptcs) is new way to develop C# applications as script. It leverages compiler advancements of Roslyn and combines the power of nuget to offer a low calorie approach to working with C#. It's great for prototyping, simple scripting or even building simple apps. Not only does it let you write scripted \"apps\", but it also includes a REPL so you can execute code interactively. You can even debug. Come to this talk and it will change the way you think about C# development.",
        speakerIds: [24],
        tags: [],
        starts: new Date(2013, 09, 28, 14, 00, 00),
        ends: new Date(2013, 09, 28, 14, 30, 00),
        track: 3
    },
    {
        id: 23,
        title: "UnSharePointing SharePoint",
        abstract: "SharePoint is big and clunky, hard to TDD, CI, or use all the cool stuff that ScottGu and Hanselman show. Right? Incorrect! The new apps model requires you to not be a SharePoint’er, to be a SharePoint’er. This quick session will demonstrate how regular .NET skills, best practices, and development techniques can be used in the new SharePoint app model, all this, without knowing much about SharePoint.",
        speakerIds: [25],
        tags: [],
        starts: new Date(2013, 09, 28, 11, 45, 00),
        ends: new Date(2013, 09, 28, 12, 15, 00),
        track: 3
    },
    {
        id: 24,
        title: "JavaScript Debugging Tricks",
        abstract: "<code>// Only those who laugh at the below should attend.</code><br><br><code>(function IHATEJAVASCRIPT(a,b) {for (var i=0,k,f=1;k=b[i];i++) {f^=!!~a.indexOf(k)};return !f;})(window.location.href,['<a/>','<b>','<td>','<span>'])?alert('ATTEND THIS SESSION'):alert('FOR SOME AWESOME DEBUGGING TRICKS');</code><br><br><code>// Debugging JavaScript can be a pain, this session is a quick rundown of some awesome tricks I use.</code>",
        speakerIds: [25],
        tags: [],
        starts: new Date(2013, 09, 28, 12, 30, 00),
        ends: new Date(2013, 09, 28, 13, 00, 00),
        track: 3
    }
];*/


/********************
* SPEAKERS
********************/

if (typeof TrondheimDC.speakers === "undefined" || !TrondheimDC.speakers) {
    TrondheimDC.speakers = {};
}
function populateSpeakers(callback) {
	if (!TrondheimDC.speakers.length) {
		$.getJSON("/speakers.php", function(data) {
			TrondheimDC.speakers = data;
			
			try {
				callback();
			} catch (e) {}
		});
	}
}
/*
TrondheimDC.speakers = [
    {
        image: "/img/speakers/speaker_male-default.png",        
        id: "1",
        name: "Johannes Broadwall",
        twitter: "jhannes",
        about: 'Johannes is the Oslo based Chief Scientist for the Sri Lanka based company Exilesoft. He trains distributed teams and contributes to projects halfway across the world. He is an active contributor to the programmer community in Oslo and Sri Lanka and a veteran speaker in Norway and abroad.'
    }, {
        image: "/img/speakers/roy_osherove.png",
        id: "2",
        name: "Roy Osherove",
        twitter: "royosherove",
        about: 'Roy Osherove is the author of "The Art of Unit Testing" and teaches refactoring and tdd at <a href="http://www.artofunittesting.com">ArtOfUnitTesting.com</a>'
    }, {
        image: "/img/speakers/speaker_male-default.png",
        id: "3",
        name: "Einar W. Høst",
        twitter: "einarwh",
        about: "Einar W. Høst is a sleep-deprived developer and technical architect at Computas. In his spare time, he writes an obscure technical blog, enjoys pixel art, and indulges in impractical coding projects aimed at having fun with the djinns of the computer. He holds a PhD in Computer Science from the University of Oslo and thinks ivory towers are beautiful."
    }, {
        image: '/img/speakers/eirik_folstad_wahl.png',
        id: "4",
        name: "Eirik Folstad Wahl",
        twitter: 'EirikWahl',
        about: "Eirik Folstad Wahl er konsulent i Norges beste arbeidsplass, Itema. For tiden er Eirik på et prosjekt for Sintef MARINTEK, hvor han bl.a. jobber med å visualisere oljeplattformer og skip som flyter i høye bølger og sterk vind. Etter 13 år som profesjonell systemutvikler, så liker Eirik å se på seg selv som \"early adopter\". Dermed var valget enkelt da muligheten åpnet seg for å bestille Oculus Rift Development Kit, og å programmere mot denne fascinerende teknologien."
    }, {
        image: "/img/speakers/eirik_backer.png",
        id: "5",
        name: "Eirik Backer",
        twitter: "",
        about: "Eirik is a designer and web developer, as well as a teacher at the Norwegian School of Creative Studies. With a great passion for JavaScript, communication and tailor made solutions, he have been working with projects both abroad and in Trondheim in the past 8 years."
    }, {
        image: "/img/speakers/knut_ola_hellan.png",
        id: "6",
        name: "Knut O. Hellan",
        twitter: "knuthellan",
        about: "Data scientist in Zedge spending his days thinking about data, analyzing data, developing data processing workflows, scaling data processing and leading other data scientists."
    }, {
        id: "7",
        image: "/img/speakers/speaker_male-default.png",
        name: "Ole Andreas Alsos",
        twitter: "olealsos",
        about: "Ole leder BEKKs interaksjonsdesignavdeling i Trondheim. Han har jobbet med brukervennlighet i over 10 år og har doktorgrad i brukervennlighet fra NTNU. I tillegg underviser han i interaksjonsdesign ved NTNU og han har holdt en rekke foredrag og workshops både i inn- og utland."
    },
    {
        id: "8",
        image: "/img/speakers/speaker_male-default.png",        
        name: "Jan Bosch",
        twitter: "JanBosch",
        about: "Jan Bosch is professor of software engineering and director of the software research center at Chalmers University Technology in Gothenburg, Sweden. Earlier, he worked as Vice President Engineering Process at Intuit Inc where he also lead Intuit's Open Innovation efforts and headed the central mobile technologies team. Before Intuit, he was head of the Software and Application Technologies Laboratory at Nokia Research Center, Finland. Before joining Nokia, he headed the software engineering research group at the University of Groningen, The Netherlands, where he holds a professorship in software engineering. He received a MSc degree from the University of Twente, The Netherlands, and a PhD degree from Lund University, Sweden. His research activities include open innovation, innovation experiment systems, compositional software engineering, software ecosystems, software architecture, software product families and software variability management. He is the author of a book 'Design and Use of Software Architectures: Adopting and Evolving a Product Line Approach' published by Pearson Education (Addison-Wesley & ACM Press), (co-)editor of several books and volumes in, among others, the Springer LNCS series and (co-)author of a significant number of research articles. He is editor for Science of Computer Programming, has been guest editor for journal issues, chaired several conferences as general and program chair, served on many program committees and organized numerous workshops."
    },
    {
        id: "9",
        image: "/img/speakers/fredrik_bertilsson.png",
        name: "Fredrik Bertilsson",
        twitter: "fredrikbertilss",
        about: "Fredrik works as a software consultant at Acando in Trondheim. He has a M. Sc. in Computer Science from Linköping, Sweden. In the two decades of software development there has been a lot of objected oriented development with different methodologies and technologies. Roles have varied from developer to architect. There has been cloud development (Azure), web clients, fat clients and server development, mostly in .NET and C++ but also a lot in Java. He spends his spare time with family and friends, running, telemark skiing, jazz and some climbing. Meet him at the NNUG Trondheim gatherings."
    },
    {
        id: "10",
        image: "/img/speakers/tomas_jansson.png",
        name: "Tomas Jansson",
        twitter: "TomasJansson",
        about: "Tomas is a developer with passion for great software. He is interested in all kind of software development projects. Tomas has a high focus on delivering value and quality to the customers he is working with through constantly improving the processes in how to deliver software and how the software is built. Tomas is an active member of the .NET community where he is the assistant lead the Norwegian .NET User Group (NNUG) Oslo chapter. He has experience from talking at events such as NDC, Microsoft Techdays, Trondheim Developer Conference and NNUG meetings."
    },
    {
        id: "11",
        image: "/img/speakers/speaker_female-default.png",
        name: "Anna Karine Lunna",
        twitter: "",
        about: "Interaksjonsdesigner som brenner for å lage gode brukeropplevelser som berører, enten det er knyttet til en tjeneste eller et produkt. Har bakgrunn fra industriell design ved NTNU og jobber nå med funksjonalitet og brukeropplevelse i BEKK Trondheim."
    },
    {
        id: "12",
        image: "/img/speakers/arne_martin_aurlien.png",
        name: "Arne Martin Aurlien",
        twitter: "arnemart",
        about: "Utvikler i Boost Communications AS, med fokus på framside. Lokal JavaScript-guru. Forsiktig funksjonell programmering-entusiast. Motvillig PHP-utvikler. Prisvinnende hjemmebrygger. Stolt skjeggbærer. Burgergourmet."
    },
    {
        id: "13",
        image: "/img/speakers/speaker_male-default.png",
        name: "Petter Rønningen",
        twitter: "",
        about: "With a background in computer science at NTNU and physics at the University of Tromsø, Petter Rønningen is working with research and software development at SINTEF Materials and Chemistry. His daily focus is developing scientific software and models that can help answer difficult questions and provide solutions to pollution in the marine environment."
    },
    {
        id: "14",
        image: "/img/speakers/mikkel_dan-rognlie.png",
        name: "Mikkel Dan-Rognlie",
        twitter: "mikkelbd",
        about: "Seniorkonsulent og fagleder i Bekk Consulting og medlem av styret i javaBin Trondheim. Han har en M.Sc. i softwareutvikling fra ITU i hjembyen København. Mikkel er en utadvent og engasjert utvikler som elsker JVM'en og det rike utvalget av biblioteker og rammeverk i Java-verdenen. Han har bred erfaring fra utvikling av skybaserte løsninger og rike webapplikasjoner.<br><br>Mikkel liker seg godt i Trondheim og den norske natur. På fritiden er han gjerne å finne på ski, terrengsykkel, eller fjelltur og har sannsynligvis mer ski- og fjellutstyr enn den gjennomsnittlige nordmannen."
    },
    {
        id: "15",
        image: "/img/speakers/speaker_male-default.png",
        name: "Knut H. Rolland",
        twitter: "",
        about: "Knut H. Rolland er aktiv forsker innen IT og innovasjon, og underviser ved Norges IT Høyskole der han leder mastergradsprogrammet i Information Systems Management and Innovation. Han har lang erfaring som rådgiver innen IT og ledelse for større virksomheter i både offentlig og privat sektor. Han har doktorgrad i informatikk fra universitetet i Oslo (2003) og har tidligere vært førsteamanuensis på NTNU (2003-2007) og gjesteforsker på Aalborg universitet i Danmark (2000). Knut sine forskningsinteresser inkluderer blant annet:<ul><li>Komplekse IT-systemer og ledelse av stor-skala IT prosjekter</li><li>Generative IT-systemer og smidige organisasjoner</li><li>Digitale infrastrukturer og tjenesteinnovasjon</li><li>Innovasjons-basert kravspesifisering</li></ul>"
    },
    {
        id: "16",
        image: "/img/speakers/speaker_male-default.png",
        name: "Kim Omar Johansen",
        twitter: "",
        about: "Kim er daglig leder i Yahoo! Technologies Norway AS. I Trondheim har Yahoo! et team på 40 som utvikler kjerneteknologien i de fleste av Yahoo!'s publiseringssystemer. Dette systemet skalerer til en milliard brukere, tusenvis av spørringer i sekundet, håndterer petabytes med data under kontinuerlig oppdatering. Resultater må leveres på millisekunder, uten nedetid. Kim har jobbet med søk i Yahoo!, Overture og FAST."
    },
    {
        id: "17",
        image: "/img/speakers/tore_vestues.jpg",
        name: "Tore Vestues",
        twitter: "torevestues",
        about: "Fagsjef og kvalitetsansvarlig i BEKK Trondheim. Tore er alltid på utkikk etter nye og bedre måter å lage god software på. Han har holdt en rekke foredrag på konferanser, events og i brukergrupper."
    },
    {
        id: "18",
        image: "/img/speakers/otto_paulsen.jpg",
        name: "Otto Paulsen",
        twitter: "ottopaulsen",
        about: "Otto har jobbet med systemutvikling i over 22 år og har selv erfaring med de fleste typer arbeidsoppgaver man må gjennom for å gjøre jobben. På arbeidsplasser som Itema, Statoil, Marintek, ExproSoft, Nidar, Q-Free og TISIP har han jobbet mye i team, ofte som teamleder. De siste årene har han vært scrum master og hjulpet flere forskjellige team med innføring og forbedring i sin bruk av scrum og andre smidige metoder. Han er lidenskapelig opptatt av åpenhet og synighet og prøver å utnytte verdien av sunn fornuft så ofte som mulig."
    },
    {
        id: "19",
        image: "/img/speakers/speaker_male-default.png",
        name: "Anders Walla",
        twitter: "",
        about: "Anders brenner for å skape vedlikeholdbar, strukturert og testbar kode ved å fokusere på god objektorientering og separation of concerns. Han har erfaring med å håndtere eldre kodebaser og motivieres av å øke kvaliteten på disse igjennom å få kontroll på avhengigheter og tilstrebe et enkelt, testbart design."
    },
    {
        id: "20",
        image: "/img/speakers/speaker_female-default.png",
        name: "Ivana Gancheva",
        twitter: "IvanaGancheva",
        about: "Ivana has been on both sides of the fence: developer and project manager. She has experience with XP/agile practices and experiments with such. She actively contributes to XP/Agile/Lean communities and speaks at conferences in Norway and abroad."
    },
    {
        id: "21",
        image: "/img/speakers/bjarte_bogsnes.jpg",
        name: "Bjarte Bogsnes",
        twitter: "bbogsnes",
        about: "Bjarte Bogsnes has a long international career, both in Finance and HR. He is currently heading up the Beyond Budgeting implementation at Statoil, Scandinavia's largest company with operations in 36 countries and a turnover of 100 bn USD.<br><br>Bjarte is Chairman of Beyond Budgeting Round Table Europe (BBRT), and is a popular international business speaker. He is the author of \"Implementing Beyond Budgeting - Unlocking the Performance Potential\", where he writes about his implementation experiences. Statoil realized that traditional leadership and management practices no longer work in today's competence organizations operating in business environments more complex, dynamic and unpredictable than ever. The company implemented innovative alternatives to traditional management, like abolishing traditional budgets and calendar-based management in favor of more decentralized, agile and human processes."
    },
    {
        id: "22",
        image: "/img/speakers/speaker_male-default.png",
        name: "Aslak Borgersrud",
        twitter: "aslak_gatas",
        about: ""
    },
    {
        id: "23",
        image: "/img/speakers/glenn_block.jpg",
        name: "Glenn Block",
        twitter: "gblock",
        about: "Glenn is a product manager for Splunk's developer experience. A hardcore coder professionally for almost 20 years, he cares deeply about making developers' lives easier. Glenn lives and breathes code, is rumored never to actually sleep, and is an active contributor to node.js and .net OSS Projects, and supporter of the community.  He's also a big supporter in the shift toward cloud development having played a key role at Microsoft in supporting OSS stacks in Windows Azure. He does have a personal life, which he shares with his wife and 9 year old daughter in Seattle usually while caffeinated."
    },  
    {
        id: "24",
        image: "/img/speakers/speaker_male-default.png",
        name: "Sahil Malik",
        twitter: "sahilmalik",
        about: "Sahil Malik, the founder and principal of Winsmarts.com, has been a Microsoft MVP and INETA Speaker for the past 10 years, author and reviewer of many books and numerous articles in both the .NET and SharePoint space, consultant and trainer who delivers training and talks at conferences internationally. Sahil has trained for the best names in the Microsoft technology space, and has architected and delivered SharePoint based solutions for extremely high profile clients. Sahil has authored 14 books on topics ranging from .NET, SQL Server, and SharePoint 2007, 2010, and 2013."
    },
    {
        id: "25",
        image: "/img/speakers/speaker_male-default.png",
        name: "Julian Aubourg",
        twitter: "jaubourg",
        about: "Julian is a member of the jQuery Core Team living in Brussels, Belgium. He's also a co-editor of the XHR specification at the W3C. While not working on jQuery, XHR or other open-source endeavors, Julian creates web sites and gives JavaScript and jQuery trainings for Creative-Area (http://www.creative-area.net/)."
    }
];*/