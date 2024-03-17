

"use strict";				

// Global variables and Constants

var canvas;					// the canvas element
var context;				// the drawing context

var coordinateLabel;		// information div labels
var mouseInOutLabel;		
var mouseUpDownLabel;
var drawColorLabel;
var lineWidthLabel

var insideCanvas = false;	// pointer inside canvas?
var drawingMode = false; 	// drawing or moving?
var currX = 0, currY = 0;	// Where the mouse is
var prevX = 0, prevY = 0;	// Where the mouse was

const inactiveCanvasBorder = "2px solid #c3c3c3";
const activeCanvasBorder   = "2px solid #000000";

function initialize() {

	// Initialize our labels
	coordinateLabel 	= document.getElementById("coordinatesId");
	mouseInOutLabel 	= document.getElementById("mouseInOutId");
	mouseUpDownLabel	= document.getElementById("mouseUpDownId"); 
	drawColorLabel 		= document.getElementById("drawColorId"); 
	lineWidthLabel 		= document.getElementById("lineWidthId");

	// Get the canvas and set the 2d drawing context
	canvas = document.getElementById('drawingCanvasId');
	context = canvas.getContext('2d');
	context.lineCap = "round"

	// set inital canvas state, drawing color and linewidth
	
	setColor('purple');
	setLineWidth('1');
}

function clearCanvas() {
    // Ask for confirmation
    var confirmation = confirm("Are you sure you want to clear your work?");
    if (confirmation) {
        // Clear the canvas
        context.clearRect(0, 0, 500, 500);
        
        context.fillText("Copyright Dan Mazzola & ABOR", 350, 495);
    }
}


// (1) set the line drawing color (strokeStyle)
function setColor(color) {
		switch(color) {
			case "Gold":
				context.strokeStyle="#ffbe0b";
				break;
			case "Orange":
				context.strokeStyle="#f3722c";
				break;
			case "Purple":
				context.strokeStyle="#7b2cbf";
				break;
			case "Gradient":
					var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
					gradient.addColorStop(0, 'rgba(255,190,11,1)');
					gradient.addColorStop(0.37, 'rgba(243,114,44,1)');
					gradient.addColorStop(1, 'rgba(123,44,191,1)');
					context.strokeStyle = gradient;
					break;
		}
		drawColorLabel.innerHTML = "Drawing Color is " + color;
}

// (2) set the line width
function setLineWidth(width) {
		context.lineWidth = width;
		lineWidthLabel.innerHTML = "Drawing Line " + width + " pixles wide";
}

// (3) handle mouse move events
function mouseMoved(event) {
	prevX = currX;
	prevY = currY;
	currX = event.clientX - canvas.offsetLeft;
	currY = event.clientY - canvas.offsetTop;
	coordinateLabel.innerHTML = "Coordinates: (" + currX + ", " + currY + ")";
	drawLine();
}


// (4) draw the line when appropriate
function drawLine() {
	if (insideCanvas && drawingMode) {
		context.beginPath();
		context.moveTo(prevX, prevY);
		context.lineTo(currX, currY);
		context.stroke();
		context.closePath();
	}
}

// (5) handle the mouse entered event
	function mouseEnteredCanvas(event) {
		mouseInOutLabel.innerHTML = "Mouse inside of Canvas";
		document.body.style.cursor = 'crosshair';
		canvas.style.border = activeCanvasBorder;
		insideCanvas = true;
}

// (6) handle the mouse left event
function mouseLeftCanvas(event) {
	coordinateLabel.innerHTML = "Coordinates:";
	mouseInOutLabel.innerHTML = "Mouse outside of Canvas";
	document.body.style.cursor = 'auto';
	canvas.style.border = inactiveCanvasBorder;
	insideCanvas = false;
}

// (7) Handle the mouse down event
function startDrawing(event) {
	drawingMode = true;
	mouseUpDownLabel.innerHTML = "Mouse Button Down (drawing mode)";
}

// (8) Handle the mouse up event
function stopDrawing(event) {
	drawingMode = false;
	mouseUpDownLabel.innerHTML = "Mouse Button Up (moving mode)";
}


