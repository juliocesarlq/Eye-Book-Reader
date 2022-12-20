// Used to save data across Sessions.
window.saveDataAcrossSessions = true


let pageCount = 1
let delay = 1500; // 1.5 second
let timeLooking = Number.POSITIVE_INFINITY
let lookDirection = null

// Const variable of flipping pages.
const turnLeft = window.innerWidth / 4
const turnRight = window.innerWidth - window.innerWidth / 4

// Const variable for going to library.
const libraryX = window.innerWidth/ 20
const libraryY = window.innerHeight / 20


// Used to get new page. 
let pageElement = getNewPage();
let nextPageElement = getNewPage(true);

// Function to get new page. 
function getNewPage(next = false) {
	const page = document.createElement('iframe')
	//document.body.append(page)
	page.src="book_1-1/" + "book_" + pageCount + "-" + pageCount + ".pdf"

	if (next) {
		page.classList.add("next")
		pageCount++
	}

	document.body.append(page)
	return page

} 

// Webgazer using setGazeListener function.
webgazer.setGazeListener((data, timestamp) => {

	if (data == null || lookDirection === 'stop') return

	
	// Look at top left hand corner and go back to library. 
	if(data.x < libraryX && data.y < libraryY && timestamp > 1000) {
		history.go(-1)
	}

	// If not looking in corner, you're either looking left or looking right. 
	else if(data.x < turnLeft && lookDirection !== "left" && lookDirection !== 'reset') {
		timeLooking = timestamp
		lookDirection = "left"

	}

	else if (data.x > turnRight && lookDirection !== "right" && lookDirection !== 'reset') {
		timeLooking = timestamp
		lookDirection = "right"

	}

	else if (data.x >= turnLeft && data.x <= turnRight) {
		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = "null"

	}


	if (timeLooking + delay < timestamp) {

		if (lookDirection === "left") {
			pageElement.classList.add("left")
			//pageCount = pageCount + 1
		}

		else {
			pageElement.classList.add("right")
			//pageCount = pageCount - 1
		}

		// Loads up next page and resets. 
		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = 'stop'
		setTimeout(() => {
			pageElement.remove()
			nextPageElement.classList.remove('next')
			pageElement = nextPageElement
			nextPageElement = getNewPage(true)
			lookDirection = 'reset'

		}, 400)

	}

	console.log(data);
}).begin();