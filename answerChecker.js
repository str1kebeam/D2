//Creates random problems, checks answers to them
//mathjs is imported as math in practice.html, but that should be fine
//el.innerHTML = math.sqrt(9);
function functionthing() {
	var ans=document.getElementById("input-answer").value;
	var correct=checkAns(ans);
	if(correct){
		reply("Great!");
	}
	else{
		reply('Aww...');
	}
}
function reply(text){
	var response=document.getElementById("response");
	response.innerHTML=text;
}
function checkAns(ans){
	if (ans=='4x^3 + 6x^2'){
		return true;
	}
	else if(math.simplify(ans).toString()=='4 * x ^ 3 + 6 * x ^ 2'){
		return true;
	}
	return false;
}