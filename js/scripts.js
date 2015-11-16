// ABSOLUTE VARIABLES
var TO_RADIANS = Math.PI/180; 

// VARIABLES
var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");

var ballX = 250, ballY = 250, ballR = 25, ballC = '#FF0000', ballSpeed = 10;
var ballDestX = 0, ballDestY = 0;

var step = 30; //step every 25ms
var playerGraphic = document.getElementById('character-sprite');

var angleRadians = 0, angleDeg = 0;

$(document).ready(function(){
	console.log('jQuery ready!');
});

$(window).load(function(){
	drawLoop(); // Start the Primary Drawing Loop
})

// Tracking Mouse Clicks on Canvas
$('#drawCanvas').mousedown(function(e){
	var mouseX = e.pageX,
		mouseY = e.pageY;

	var relativeX = mouseX - $('#drawCanvas').offset().left,
		relativeY = mouseY - $('#drawCanvas').offset().top;

	ballDestX = relativeX;
	ballDestY = relativeY;

	console.log(e.which);
	if (e.which==3) {
		e.preventDefault();
	}
});

$(document).on("contextmenu", "#drawCanvas", function(e){
	// prevent right-click on canvas
	return false;
});

function ballMove() {
	dx = ballDestX - ballX;
	dy = ballDestY - ballY;

	if (Math.abs(dx) <= ballSpeed) {dx=0;}
	if (Math.abs(dy) <= ballSpeed) {dy=0;}

	if (Math.abs(dx)>0 || Math.abs(dy)>0) {
		angleRadians 	= Math.atan2(dy, dx);
		angleDeg		= angleRadians * 180 / Math.PI;

		xVelocity = ballSpeed * Math.cos(angleRadians);
		yVelocity = ballSpeed * Math.sin(angleRadians);

		ballX += xVelocity;
		ballY += yVelocity;
	} else {
		ballX = ballDestX;
		ballY = ballDestY;
	}
}

function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Primary Drawing Loop Function
function drawLoop() {
	clearCanvas();
	ballMove();
	drawRotatedImage(playerGraphic,ballX,ballY,angleDeg)
	setTimeout(function(){
		drawLoop();
	},step)
}

function drawRotatedImage(image, x, y, angle) { 
	ctx.save(); 
	ctx.translate(x, y);
	ctx.rotate(angle * TO_RADIANS);
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
	ctx.restore(); 
}