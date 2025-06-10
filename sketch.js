let sigma = 10;
let beta  = 8 / 3;
let rho   = 28;

let pointsArray = [];
let DT = 0.003;
let startTime = 50;

let angle = 0;

// Setup environment
function setup() {

	// Create canvas object
	let canvas = createCanvas(
		700,
		700,
		WEBGL);
    
    canvas.parent("#sketch-holder");
    
	// Populate array
	pointsArray.push(new Point(
		random(0.1, 0.7), random(0.1, 0.7), random(0.1, 0.7),
		[228, 178, 79]));

	pointsArray.push(new Point(
		random(0.1, 0.7), random(0.1, 0.7), random(0.1, 0.7),
		[123, 29, 107]));
	
	pointsArray.push(new Point(
		random(0.1, 0.7), random(0.1, 0.7), random(0.1, 0.7),
		[237, 80, 39]));
    
    let time = 0.0;
    while (time < startTime)
    {
        for (let point of pointsArray) {
	    	point.calcule();
        }
        time += DT;
    }
}

// Draw objects on canvas
function draw() {
	scale(10);
	rotateY(angle);
	background(0);
    
    let mid = createVector(0, 0, 0);
    mid.sub(pointsArray[0].getLastVector());
    mid.sub(pointsArray[1].getLastVector());
    mid.sub(pointsArray[2].getLastVector());
    mid.div(3);
    translate(mid)

	for (let point of pointsArray) {
		point.calcule();
		point.show();
	}
    
	
	angle += 0.002;
}
