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
function newQ(){
	var type=document.getElementById("type").value;
	var diff=document.getElementById("difficulty").value;
	if(type=="derivative"){
		der(diff);
	}
}
function ask(question, expression){
	var q=document.getElementById("question");
	//var e=document.getElementById("expression");
	q.innerHTML=question;
	//e.innerHTML=expression;
	var m=MathJax.Hub.getAllJax("expression")[0];
	MathJax.Hub.Queue(['Text',m, expression]);
	reply("");
	var ans=document.getElementById("input-answer");
	ans.value="";
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
var derDiffs=[]; derDiffs[1]=[2,1,5]; derDiffs[2]=[3,2,5];
function der(diff){
	//I fell bad hardcoding this, but I don't know how to do it in js
	var d=derDiffs[diff];
	newDerivative(d[0],d[1],d[2]);
}
function newDerivative(terms, maxPow, maxCo){
	var q="What is the derivative of the following?";
	var e="\\frac{d}{dx}(";//The part to print
	var simple="";//The one to be used to make the answer
	//Ok, going to rethink this:
	//If there are more possible powers than terms, make terms that are to a random power in the range with a random coefficient, check that isn't already used (delete terms from list, probably)
		//Then, go through and put them in a reasonable order, to not confuse people
		//Much better than just generating random numbers and checking that it isn't already used
	//If there are more or equal terms than possible powers, make a random coefficient for each power, number of terms doesn't matter
	//Also, posible powers=maxpow+1;
	if((maxPow+1)<=terms){
		for(var pow=maxPow; pow>=0; pow--){
			var co=((Math.random()*maxCo)+1).toFixed(0);//So that there isn't a coefficient of 0, becuase that would be annoying and would lower terms number
			e+=co;
			simple+=co;
			if(pow==1){
				e+="x+";
				simple+="x+";
			}
			else if(pow>1){
				e+="x^{"+pow+"}+";
				simple+="x^"+pow+"+";
			}//Add in later: allow a term with coefficient <=0, and account for that with the printing of the + and the entire term
		}
	}
	else{
		var possiblePows=[];
		//Ok, for the removing parts of the array, use .splice(a,b), where a=start index, b=end index-1, so .splice(0,1) would remove item at index 0
		//Also, that doesn't return the value of it.
		for(var pow=0; pow<=maxPow; pow++){
			possiblePows.add(pow);
		}
		var pows=[];
		var cos=[];
		for(var i=0; i<terms; i++){
			var pi=(Math.random()*possiblePows.length).toFixed(0);
			var c=((Math.random()*maxCo)+1).toFixed(0);
			var p=possiblePows[pi];
			possiblePows=possiblePows.slice(pi, pi+1);
			pows.push(p);
			cos[p]=c;
		}
		pows.sort(function(a,b){return b-a});//Javascript tutorial says this should be reverse order
		for(var i=0; i<pows.length; i++){
			var p=pows[i];
			e+=cos[p];
			simple+=cos[p];
			if(p>1){
				e+="x^{"+p+"}";
				simple+="x^"+p;
			}
			else if(p==1){
				e+="x";
				simple+="x";
			}
			if((i+1)!=pows.length){
				e+="+";
				simple+="+";
			}
		}
	}
	var ans=math.rationalize(math.derivative(simple, "x")).toString();
	currentAns=ans;
	e+=")=?";
	ask(q, e);

	/*var cos=[];//May want to make this an associative array, but not sure if I have time to do that right now
	var pow=[];
	if((maxPow+1)<terms){
		terms=maxPow+1;//If the higest power is x^4, you can't have 6 terms. 1+x+x^2+x^3+x^4 is 5 terms
	}
	for(var i=0; i<terms; i++){//Should add in some logic to stop repeat powers
		var c=(Math.random()*maxCo)+1;
		var p=(Math.random()*(maxPow+1));

	}*/
}