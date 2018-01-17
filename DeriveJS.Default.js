var parsePix = function(pixVal) { //remove "px" from a font value
	return pixVal.substring(0,pixVal.length-2);
};

bodyIdEl = document.getElementById("body"); //body element
bodyIdEl.style.top = "160px"; //bring body below the menu bar
bodyIdEl.style.height = (window.innerHeight - parsePix(bodyIdEl.style.top)) + "px";	//the body takes up the rest of the webpage (vertically)






menuButtonEls = document.querySelectorAll("#header-menu button"); //query all menu bar buttons
menuButtonSep = window.innerWidth/menuButtonEls.length - 10; //generate width of all centered buttons
for(var i = 0; i < menuButtonEls.length; i++) { //apply menuButtonSep to all buttons
	buttonEl = menuButtonEls[i].style;
	buttonEl.width = menuButtonSep + "px";			
};
window.onresize = function(e) { //run all above code upon resizing the window
	menuButtonSep = window.innerWidth/menuButtonEls.length - 10;
	for(var i = 0; i < menuButtonEls.length; i++) {
		buttonEl = menuButtonEls[i].style;
		buttonEl.width = menuButtonSep + "px";			
	};
	bodyIdEl.style.height = (window.innerHeight - parsePix(bodyIdEl.style.top)) + "px";	
};



/* Not part of the code --> May be implemented later
var mouseOverButton = function(e) {
	e.target.myParam.style.backgroundColor = "#DDDDDD";
};
var mouseOutButton = function(e) {
	e.target.myParam.style.backgroundColor = "#3F3F3F";
	console.log("Attempt to change 'background-color' of " + e.target.myParam);
}

for(var i = 0; i < menuButtonEls.length; i++) {
	menuButtonEls[i].addEventListener("mousemove", mouseOverButton);
	menuButtonEls[i].addEventListener("mousemout", mouseOutButton);
	menuButtonEls[i].myParam = menuButtonEls[i];
};
*/