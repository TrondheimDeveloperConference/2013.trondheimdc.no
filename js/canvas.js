function isCanvasSupported(){
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
}

$(function() {
	if (!isCanvasSupported())
		return;
		
	var canvas = document.getElementById("canvas"); 
	var ctx = canvas.getContext("2d");
	
	var dist = 20,
		r = 3,
		width = document.body.scrollWidth,
		height = document.body.scrollHeight,
		xCount = Math.floor(width / dist),
		hitNodes = new Array(),
		st = null;
		
	window.onresize = function() {
		st = null;
		clearTimeout(st);
		st = setTimeout(redraw, 500);
	}

	function redraw() {
		width = document.body.scrollWidth;
		xCount = Math.floor(width / dist);
		height = document.body.scrollHeight;
		canvas.height = height;
		canvas.width = width;
	}
	
	var n = getRandomNode();
	var count = 0;
	canvas.height = height;
	canvas.width = width;
	
	showNewNode(n, function() {
		var newNode = getRandomNode(n);
		lineFromNodeToNode(n, newNode);
	});
	
	function lineFromNodeToNode(node1, node2) {
		var xDist = node1.x * dist - node2.x * dist;
		var yDist = node1.y * dist - node2.y * dist;
		var xDiff, yDiff;
		if (Math.abs(xDist) > Math.abs(yDist)) {
			xDiff = node1.x - node2.x > 0 ? -1 : 1;
			yDiff = (yDist / xDist) * xDiff;
		} else {
			yDiff = node1.y - node2.y > 0 ? -1 : 1;
			xDiff = (xDist / yDist) * yDiff;
		}
		ctx.beginPath();
		ctx.moveTo(node1.x*dist, node1.y*dist);
		var xMove = xDiff,
			yMove = yDiff,
			reached = false;
			
		var si3 = setInterval(function() {
			ctx.beginPath();
			ctx.moveTo(node1.x*dist+xMove, node1.y*dist+yMove);
			xMove += xDiff*2;
			yMove += yDiff*2;
			ctx.lineTo(node1.x*dist+xMove, node1.y*dist+yMove);
			//ctx.globalCompositeOperation = "destination-over";
			ctx.strokeStyle = "#ccc";//getRandomColor();
			ctx.stroke();
			
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if ((xDiff == 1 && node1.x*dist + xMove >= node2.x*dist ||
					xDiff == -1 && node1.x*dist + xMove <= node2.x*dist)) {
					reached = true;
				}
			} else {
				if ((yDiff == 1 && node1.y*dist + yMove >= node2.y*dist ||
					yDiff == -1 && node1.y*dist + yMove <= node2.y*dist)) {
					reached = true;
				}
			}
			
			if (reached) {
				clearInterval(si3);
				showNewNode(node2, function() {
					if (hitNodes.indexOf(node2.x + "," + node2.y) == -1) {
						hitNodes.push(node2.x + "," + node2.y);
						var rand = Math.ceil(Math.random() * 7);
						var newNodes = rand > 2 ? 1 : 2
						for (var i = 0; i < newNodes; i++) {
							var newNode = getRandomNode(node2);
							lineFromNodeToNode(node2, newNode);
						}
					}
				});
			}
		}, 50);
	}
	
	function showNewNode(newNode, callback) {
		var size = 0.5;
		var si2 = setInterval(function() {
			/*ctx.beginPath();
			ctx.arc(newNode.x*dist, newNode.y*dist, size, 0, Math.PI*2, true);
			ctx.fillStyle = getRandomColor();
			//ctx.globalCompositeOperation = "source-over";
			//ctx.fill();
			*/
			size += 0.5;
			if (size > r*2) {
				clearInterval(si2);
				callback();
			}
		}, 1);
	}
	
	function getRandomNode(node) {
		var attempts = 0;
		var newNode = {
			x: Math.floor(Math.random() * (xCount - 1)) + 1,
			y: Math.floor(Math.random() * 30 + (document.body.scrollTop/dist)) + 1
		};
		if (node == undefined)
			return newNode;
		
		while (attempts < 10 &&
			   Math.abs(node.x - newNode.x) > 5) {
			   attempts++;
			   var newNode = {
					x: Math.floor(Math.random() * (xCount - 1)) + 1,
					y: Math.floor(Math.random() * 30 + (document.body.scrollTop/dist)) + 1
				};
		}
		return newNode;
	}
	
	function getRandomColor() {
		var red = Math.round(Math.random() * 8 + 112), //112 - 120
			g = 255
			b = Math.round(Math.random() * 156 + 99); //99 - 255
		return "rgb(" + red + "," + g + "," + b + ")";
	}

});