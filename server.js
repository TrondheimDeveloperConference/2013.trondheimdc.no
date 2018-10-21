var sys = require("util"),
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

http.createServer(function(req, res) {
	var uri = url.parse(req.url).pathname;
	if (uri == undefined)
		return;
	if (uri == "/")
		uri = "/index.html";
	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if (!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404: Not Found");
			res.end();
			return;
		}
		
		fs.readFile(filename, "binary", function(err, file) {
			if (err) {
			    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
				res.write(err);
				res.end();
				return;
			}
			if (filename.indexOf("html") != -1)
				res.writeHead(200,  { "Content-Type": "text/html; charset=utf-8" });
			else
				res.writeHead(200);
			res.write(file, "binary");
			res.end();
		});
	});
}).listen(8080);