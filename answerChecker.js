//Creates random problems, checks answers to them
//mathjs is imported as math in practice.html, but that should be fine
//el.innerHTML = math.sqrt(9);
var x=1;
var currentAns='4x^3+6x^2';
function functionthing() {
	var ans=document.getElementById("input-answer").value;
	var correct=checkAns(ans);
	if(correct){
		reply("Great!");//+x.toString());
		//x++;
	}
	else{
		reply('Aww...');
	}
}
function ask(question, expression){
	var q=document.getElementById("question");
	var e=document.getElementById("expression");
	q.innerHTML=question;
	e.innerHTML=expression;
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
	else{
		//reply(2);
		var a=math.rationalize(math.simplify(ans));//really roundabout way to do this, simplify() simplifies it and rationalize() as a side effect puts it in normal order
		var b=math.rationalize(math.simplify(currentAns));

		if(a.toString()==b.toString()){
			return true;
		}
		//var a=math.compareNatural(math.simplify(ans),math.simplify(currentAns));
		//reply(a);
		
	}
	//reply(3);
	//reply(math.compare(math.simplify(ans),math.simplify(currentAns)));
	//reply(math.format(math.simplify(currentAns));
	return false;
}
function newDerivative(terms, maxPow, maxCo){
	var q="What is the derivative of the following?";
	var e="$$\\frac{d}{dx}(";//The part to print
	var simple="";//The one to be used to make the answer
	var cos=[];//May want to make this an associative array, but not sure if I have time to do that right now
	var pow=[];
	for(var i=0; i<terms; i++){//Should add in some logic to stop repeat powers
		var a=(Math.random()*maxCo)+1;
		var b=(Math.random()*maxPow)+1;
		cos.push(a);
		pow.push(b);
	}
}