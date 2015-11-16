var ballX = 50, ballY = 50, ballMoveX = 5, ballMoveY = 2.5;

$(document).ready(function(){
	console.log('jQuery ready!');
	drawLoop(); // Start the Primary Drawing Loop
});

// Tracking Mouse Clicks on Canvas
$('#drawCanvas').click(function(e){
	var mouseX = e.pageX,
		mouseY = e.pageY;

	var relativeX = mouseX - $('#drawCanvas').offset().left,
		relativeY = mouseY - $('#drawCanvas').offset().top;
});

// Get Context for Canvas
var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");

// Drawing Functions
function drawCircle(x,y,radius,color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fill();
}

function ballMove() {
	ballX += ballMoveX;
	ballY += ballMoveY;
	if (ballX > $('#drawCanvas').width() || ballX < 0) 	{ ballMoveX = -ballMoveX; }
	if (ballY > $('#drawCanvas').height() || ballY < 0) { ballMoveY = -ballMoveY; }
}

function clearCanvas() {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0,$('#drawCanvas').width(),$('#drawCanvas').height());
}

// Primary Drawing Loop Function
function drawLoop() {
	clearCanvas();
	drawCircle(ballX,ballY,50,'#FF0000');
	ballMove();
	setTimeout(function(){
		drawLoop();
	},25)
}