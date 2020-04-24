// SMOOTH SCROLL EFFECT
// Fetching list of all the anchors tags on the nav menu
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
// console.log(navMenuAnchorTags);

var interval;
for (var i = 0; i < navMenuAnchorTags.length; i++) {
	navMenuAnchorTags[i].addEventListener('click', function(event){
		event.preventDefault();
		// fectching IDs from the text inside the nav menu anchor tag
		// Or we could have fetched the #ID itself.
		var targetSectionID = this.textContent.trim().toLowerCase();
		// console.log(targetSectionID);
		// fetching target section by id
		var targetSection = document.getElementById(targetSectionID);
		console.log(targetSection);
		
		interval = setInterval(scrollVertically, 20, targetSection); // time to cover the distance
	});
}

function scrollVertically(targetSection){
	// Fetching the coordinates of the targetSection
	var targetSectionCoordinates = targetSection.getBoundingClientRect();
	// stop when top becomes <= 0
	if (targetSectionCoordinates.top <= 0) {
		clearInterval(interval);
		return; 
	}
	window.scrollBy(0, 50); // distance to be covered
}


// SKILL BARS AUTO FILL (all at once)
// var progressBars = document.querySelectorAll('.skill-bar > div');
// var skillContainer = document.getElementById('skills-container');
// window.addEventListener('scroll', checkScroll);
// var animationDone = false;

// function initialiseBars(){
// 	for (let bar of progressBars) {
// 		bar.style.width = 0 + '%';
// 	}
// }

// initialiseBars();

// function fillBars() {
// 	for (let bar of progressBars) {
// 		let targetWidth = bar.getAttribute('data-bar-width');
// 		let currentWidth = 0;
// 		let interval = setInterval(function(){
// 			if(currentWidth > targetWidth) {
// 				clearInterval(interval);
// 				return;
// 			}
// 			currentWidth++;
// 			bar.style.width = currentWidth + '%';
// 		}, 7);
// 	}
// }

// function checkScroll(){
// 	// check if skill container is visible
// 	var coordinates = skillContainer.getBoundingClientRect();	// getting coordinates of section
// 	if (!animationDone && coordinates.top <= window.innerHeight) {
// 		animationDone = true;
// 		// console.log('Skills Section Visible');
// 		// fill the skill bars
// 		fillBars();
// 	} else if (coordinates.top > window.innerHeight){
// 		animationDone = false;
// 		initialiseBars();
// 	}
// }


// SKILL BARS AUTO FILL ***IMPROVED***
var skillBars = document.querySelectorAll(".skill-bar");
// array to maintain animation value for each progress bar
var animationDone = new Array(skillBars.length);
for(var i = 0; i < animationDone.length; i++) {
    animationDone[i] = false;
}

// check whether the element is present in viewheight or not
function isInViewPort(element) {
	var coordinates = element.getBoundingClientRect();
	return (coordinates.top <= window.innerHeight);
}

// function for initialising each bar
function initialisedBar(bar) {
    bar.style.width = 0 + "%";
}

// function for filling a single bar
function fillBar(bar) {
    let targetValue = bar.getAttribute("data-bar-width");
    let curr = 0;
    function barFill() {
        if(curr >= targetValue) {
            clearInterval(b);
            return;
        }
        curr++;
        bar.style.width = curr + "%";
    }
    var b = setInterval(barFill,3);
}

// iterating over each progress bar
window.addEventListener("scroll",function() {
    for(var i =0; i < skillBars.length; i++) {
		if(!animationDone[i] && isInViewPort(skillBars[i])) {
			fillBar(skillBars[i].firstElementChild);
			animationDone[i] = true;
			console.log("skill");
		}
		else if(!isInViewPort(skillBars[i])) {
			animationDone[i] = false;
			initialisedBar(skillBars[i].firstElementChild);
		}
    }
});