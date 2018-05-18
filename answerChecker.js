//Creates random problems, checks answers to them
//mathjs is imported as math in practice.html, but that should be fine
//el.innerHTML = math.sqrt(9);
var x=1;
var currentAns='4x^3+6x^2';
var answered=false;
var strike=false;
function functionthing() {
	var ans=document.getElementById("input-answer").value;
	var correct=checkAns(ans);
	if(correct){
		reply("Great!");//+x.toString());
		answered=true;
		//x++;
	}
	else{
		reply('Aww...');
	}
}
function newQ(){
	if(!answered && !strike){
		var b=document.getElementById("new-question");
		b.innerHTML="Are you sure?";
		strike=true;
	}
	else{
		var type=document.getElementById("type").value;
		var diff=document.getElementById("difficulty").value;
		if(type=="derivative"){
			der(diff);
		}
		else if(type=="integral"){
			intQ(diff);
		}
		strike=false;
		var b=document.getElementById("new-question");
		b.innerHTML="New Question";
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
	answered=false;
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
	poly=makePolynomial(terms, maxPow, maxCo);
	e+=poly[0];
	simple+=poly[1];
	var ans;
	if(simple.includes("x")){
		ans=math.rationalize(math.derivative(simple, "x")).toString();
	}
	else{
		ans="0";//Pretty much, mathjs will break if x isn't actually in it, but since this is dx if there isn't x the derivative should be 0 (for now...)
	}
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
var intDiffs=[]; intDiffs[1]=[2,1,5]; intDiffs[2]=[3,2,5];
function intQ(diff){
	var d=intDiffs[diff];
	newIntegral(d[0],d[1],d[2]);
}
function newIntegral(terms, maxPow, maxCo){//yeah, mathjs doesn't have a function for this
	//Yeah, this will be pretty much the same thing...
	var latex="\\int(";
	var simple="";
	var poly=makePolynomial(terms, maxPow, maxCo, true);
	latex+=poly[0];
	simple+=poly[1];
	latex+=")dx";
	raw=poly[2];
	ans=integrate(raw[0],raw[1], true);
	currentAns=ans;
	ask("Evaluate the following integral:",latex);
}
function integrate(pows, cos, con=false){//one thing mathjs doesn't have that we need is integration, so this will handle the simple rule for it
	var simple="";//This doesn't make latex right now, but I could easily edit it to do that
	for(var i=0; i<pows.length; i++){
		var c=cos[i];
		var p=pows[i];
		p++;
		simple+="("+c+"/"+p+")";
		if(p==1){
			simple+="x";
		}
		else if(p>1){
			simple+="x^"+p;
		}
		if(i+1!=pows.length){
			simple+="+";
		}
	}
	if(con){
		simple+="+c";
	}
	return simple;
}
function makePolynomial(terms, maxPow, maxCo, raw=false){
	//So, this entire thing is just going to be the derivative's polynomial maker
	//need to have it return the latex and normal text...
	var latex="";
	var simple="";
	var raws=[[],[]];
	if((maxPow+1)<=terms){
		for(var pow=maxPow; pow>=0; pow--){
			var co=0;
			while(co==0){
				co=((Math.random()*maxCo*2)-maxCo).toFixed(0);//So that there isn't a coefficient of 0, becuase that would be annoying and would lower terms number
			}
			if(co==-1&&pow!=0){
				simple+="-";
				latex+="-";
			}
			else if(co!=1||pow==0){
				simple+=co;
				latex+=co;
			}
			if(pow==1){
				latex+="x+";
				simple+="x+";
			}
			else if(pow>1){
				latex+="x^{"+pow+"}+";
				simple+="x^"+pow+"+";
			}//Add in later: allow a term with coefficient <=0, and account for that with the printing of the + and the entire term
			raws[0].push(pow);
			raws[1].push(co);
		}
	}
	else{
		var possiblePows=[];
		//Ok, for the removing parts of the array, use .splice(a,b), where a=start index, b=end index-1, so .splice(0,1) would remove item at index 0
		//Also, that doesn't return the value of it.
		for(var pow=0; pow<=maxPow; pow++){
			possiblePows.push(pow);
		}
		var pows=[];
		var cos=[];
		for(var i=0; i<terms; i++){
			var pi=Math.floor((Math.random()*possiblePows.length));
			var c=0;
			while(c==0){
				c=((Math.random()*maxCo*2)-maxCo).toFixed(0);
			}
			var p=possiblePows[pi];
			possiblePows=possiblePows.slice(pi, pi+1);
			pows.push(p);
			cos[p]=c;
		}
		pows.sort(function(a,b){return b-a});//Javascript tutorial says this should be reverse order
		for(var i=0; i<pows.length; i++){
			var p=pows[i];
			if((cos[p]==-1)&&(p!=0)){
				latex+="-";
				simple+="-";
			}
			else if(cos[p]!=1||p==0){
				latex+=cos[p];
				simple+=cos[p];
			}
			if(p>1){
				latex+="x^{"+p+"}";
				simple+="x^"+p;
			}
			else if(p==1){
				latex+="x";
				simple+="x";
			}
			if((i+1)!=pows.length){
				latex+="+";
				simple+="+";
			}
			raws[0].push(p);
			raws[1].push(cos[p]);
		}
	}
	var result=[latex, simple];
	if(raw){
		result.push(raws);
	}
	return result;
}
function test(){
	console.log("test");
}