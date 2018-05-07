//Creates random problems, checks answers to them
//mathjs is imported as math in practice.html, but that should be fine
//el.innerHTML = math.sqrt(9);
var x=1;
var currentAns='4x^3+6x^2';
function functionthing() {
	var ans=document.getElementById("input-answer").value;
	var correct=checkAns(ans);
	if(correct){
		reply("Great!"+x.toString());
		x++;
	}
	else{
		//reply('Aww...');
	}
}
function reply(text){
	var response=document.getElementById("response");
	response.innerHTML=text;
}
function checkAns(ans){
	//This is going to have its own difficulties:
	//mathjs doesn't reorder terms, at all, so I need to figure out how to make x+1=1+x
	if (ans==currentAns){
		return true;
	}
	//else if(math.equal(math.simplify(ans),math.simplify(currentAns))){
	//	return true;
	//}
	reply(1)
	//reply(math.compare(math.simplify(ans),math.simplify(currentAns)));
	//reply(math.format(math.simplify(currentAns));
	return false;
}