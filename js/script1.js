window.saveDataAcrossSessions = true

let delay = 500; // amount of time before scrolling (in ms)
let delay1 = 1500 //amount of time before reading book
let distance = 250; // # of pixel to scroll each time
let threshold = window.innerHeight * 0.3; // how much whitespace before actually scrolling

//to read book on left
const turnLeft = window.innerWidth / 8

//to read book on right
const turnRight = window.innerWidth - window.innerWidth / 8

let lastTime = 0;
let direction = 0;

//for scroll 
function updateDirection(x, time) {
	direction = x;
	lastTime = time;
}

//used to scroll
function scroll(direction, distance, time) {
	if (lastTime + delay < time) {
		window.scrollBy({
			top: direction * distance,
			behavior: 'smooth'
		});
		
		updateDirection(0, time)
	}
}

webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) return;

	//In order to see if person is looking left
    if(data.x < turnLeft && lookDirection !== "left" && lookDirection !== 'reset') {
		timeLooking = elapsedTime
		lookDirection = "left"

	}

	//In order to see if person is looking right
	else if (data.x > turnRight && lookDirection !== "right" && lookDirection !== 'reset') {
		timeLooking = elapsedTime
		lookDirection = "right"

	}

	//Looking elsewhere
	else if (data.x >= turnLeft && data.x <= turnRight) {
		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = "null"

	}

    if (timeLooking + delay1 < elapsedTime) {

		//If looking left read book left
		
		if (lookDirection === "left") {
            window.location.href = 'iAmMalala.html'
		}

		//If looking right read book right

		else {
            window.location.href = 'iAmMalala.html'

		}

		//reset
		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = 'stop'
	

	}

	//Used in order to scroll up and down

	if (data.y > window.innerHeight/2 + threshold && direction != 1) updateDirection(1, elapsedTime);
	else if (data.y < window.innerHeight/2 - threshold && direction != -1) updateDirection(-1, elapsedTime);
	else if (data < (window.innerHeight/2 + threshold) && data > (window.innerHeight/2 - threshold)) updateDirection(0, 0);

	scroll(direction, distance, elapsedTime);

	console.log(direction);

}).begin();