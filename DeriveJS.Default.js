var parsePix = function(pixVal) {
	return pixVal.substring(0,pixVal.length-2);
};

bodyIdEl = document.getElementById("body");
bodyIdEl.style.top = "160px";
bodyIdEl.style.height = (window.innerHeight - parsePix(bodyIdEl.style.top)) + "px";	






menuButtonEls = document.querySelectorAll("#header-menu button");
menuButtonSep = window.innerWidth/menuButtonEls.length - 10;
for(var i = 0; i < menuButtonEls.length; i++) {
	buttonEl = menuButtonEls[i].style;
	buttonEl.width = menuButtonSep + "px";			
};
window.onresize = function(e) {
	menuButtonSep = window.innerWidth/menuButtonEls.length - 10;
	for(var i = 0; i < menuButtonEls.length; i++) {
		buttonEl = menuButtonEls[i].style;
		buttonEl.width = menuButtonSep + "px";			
	};
	bodyIdEl.style.height = (window.innerHeight - parsePix(bodyIdEl.style.top)) + "px";	
};



/*
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