//Creates random problems, checks answers to them
//mathjs is imported as math in practice.html, but that should be fine
//el.innerHTML = math.sqrt(9);
var response=document.getElementById("response");
var x=1;
var currentAns='';
var answered=true;
var strike=false;
var entry_text="";
var qType="";
start_diff=1;
/////
//Difficulty settings
/////
var sTrig=['sin','cos'];//The ones that can actually be used now
var nTrig=['sin','cos','tan'];
var rTrig=['csc','sec','cot'];
var inTrig=['arcsin','arccos','arctan'];
var irTrig=['arccsc','arcsec', 'arccot'];
var allTrig=nTrig.concat(rTrig, inTrig, irTrig);
var diffs=[];
diffs["derivative"]=[
	[2,1,5], [3,2,5], [4,5,10], //Polynomial difficulty levels
	[1,1,1,sTrig], [2,2,2,sTrig], [3,3,sTrig]//The trig difficulty levels
];
diffs["tangent"]=[[2,1,5,3],[3,2,5,10]]; 
diffs["integral"]=[[2,1,5],[3,2,5]];
var diffNames=[];
diffNames['derivative']=["Easy Polynomial","Normal Polynomial","Hard Polynomial",
						"Easy Trigonometry","Normal Trigonometry","Hard Trigonometry"];
						//Is it bad that I needed to look up what "Trig" was short for?
diffNames['tangent']=["Easy Polynomial","Hard Polynomial"];
diffNames['integral']=["Easy Polynomial","Hard Polynomial"];
//////
//Startup stuff
//////
var page=document.getElementById("problem");
var loadFunc = function(){
	//console.log("test");
	var query=window.location.search.substring(1);//Based off of an example I found online, this will give me a string to use
	var vars=query.split("&");
	var welcome=document.getElementById("welcome-text");
	//var start_diff=1;
	for(var v=0; v<vars.length; v++){
		var stuff=vars[v].split("=");
		if(stuff[0]=="type"){
			if(stuff[1]=="derivative"){
				qType="derivative";
				welcome.innerHTML="Now that you've learned derivatives, practice your skills with these problems";
			}
			else if(stuff[1]=="integral"){
				qType="integral";
				welcome.innerHTML="Now that you've learned integrals, practice your skills with these problems";
			}
			else if(stuff[1]=="tangent"){
				qType="tangent";
				welcome.innerHTML="Now that you've learned tangent lines, practice your skills with these problems";
			}
		}
		if(stuff[0]=="difficulty"){
			var t=Number(stuff[1]);
			if(!isNaN(t)){//Check that t is actually a number
				start_diff=t;
			}
		}
	}
	//console.log(qType);
	//console.log(start_diff);
	if(qType!=""){
		document.getElementById("type").value=qType;
		//document.getElementById("type").onload=
		setDropdown(document.getElementById("type"), qType);

		//document.getElementById("type").onload=function(){document.getElementById("type").value=qType;};
		document.getElementById("difficulty").value=start_diff;
		setDropdown(document.getElementById("difficulty"), start_diff);
		//document.getElementById("difficulty").onload=function(){document.getElementById("difficulty").value=start_diff;};
		newQ();
		//console.log("test");
	}
};
function setDropdown(dropdown, val){
	//console.log("test");
	//var instance = M.Dropdown.getInstance(dropdown);
	//instance.open();
	//instance.close();
	var found=false;
	var index;
	for(var i=0;i<dropdown.options.length&&!found; i++){
		//console.log("test"+i);
		//console.log(dropdown.options[i].value);
		//console.log(val);
		//console.log(dropdown.options[i].value==val);
		if(dropdown.options[i].value==val){
			//console.log("found");
			dropdown.selectedIndex=i;
			var opt=dropdown.options[i];
			opt.selected=true;
			index=i;
			found=true;
			//dropdown.remove(i);
			//dropdown.add(opt, i);
			//dropdown.click();


			//return;
		}
	}
	//Ok, so all of this code is a workaround to materialze
	//Pretty much, I need to find the list item that has the span inside with the right lable, and then change it's class, while reseting the other classes
	var parent=dropdown.parentElement;
	//console.log(parent);
	//var el=parent.querySelector(".dropdown-content");
	var e2=parent.querySelector(".dropdown-trigger");
	e2.click();//Yes, this is the best way to do this. Materialize has no real javasript API
	var e3=M.Dropdown.getInstance(e2);
	e3.close();
	/*//console.log(el);
	var temp=el.firstElementChild;
	//console.log(temp);
	while(temp!=null){
		var inside=temp.firstElementChild;
		//console.log(temp);
		temp.class="";
		var text=inside.innerHTML;
		console.log(temp.class);
		console.log(text);
		console.log(dropdown.options[index].text);
		console.log(text==dropdown.options[index].text)
		if(text==dropdown.options[index].text){
			temp.class="active selected";//Materialize's selected class
			console.log(temp.class);
		}
		temp=temp.nextElementSibling;
		//console.log(temp);
	}
	//console.log("called");*/
}
//document.getElementById("type").onload=setTimeout(document.getElementById("type").style="visibility: visible", 30000)
function updateDropdowns(){
	var type=document.getElementById("type").value;
	//console.log(type);
	//var options=diffs[type].length;
	//console.log(options);
	var diffDrop=document.getElementById("difficulty");
	/*if(options==oldMaxDiff){//No options need to be added or removed
		console.log("fine");
		return;
	}*/
	/*else if(options>oldMaxDiff){//Need to add options
		console.log("Adding");
		for(var i=oldMaxDiff+1; i<=options; i++){//Add some options
			var option=document.createElement("option");
			option.text=i;
			option.value=i;
			diffDrop.add(option);
			console.log(option);
		}
	}
	else{//need to remove options
		console.log("removing");
		for(var i=oldMaxDiff; i>options; i--){//remove some options
			diffDrop.remove(i-1);//Remove the option at index i-1, so i=4 would remove index 3 (which would be '4')
		}
	}
	oldMaxDiff=options;*/
	while(diffDrop.options.length>0){
		diffDrop.remove(0);
	}
	for(var i=0;i<diffNames[type].length; i++){
		var option=document.createElement("option");
		option.text=diffNames[type][i];
		option.value=i+1;
		diffDrop.add(option);
	}
	$('#difficulty').formSelect();
}
//window.onload=setTimeout(loadFunc, 2000);
MathJax.Hub.Register.StartupHook("End", loadFunc);//Wait for MathJax to finish starting up
document.getElementById("type").addEventListener("change",updateDropdowns());
setTimeout(document.getElementById("type").addEventListener("change",function(){updateDropdowns()}), 100000000);//I should not have to do this, but materialize is evil
document.getElementById("type").addEventListener("change",console.log("test"));
//////
//Questions
//////
function functionthing() {
	var ans=document.getElementById("input-answer").value;
	if(entry_text!=""){
		ans=entry_text.replace(/\[/g,"(").replace(/\]/g,")");//The /[stuff]/g makes it replace all, not just the first instance
	}
	try{
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
	catch(err){
		reply("There was an error with your input, check for empty or unclosed exponents amd fractions, and implicit multiplication.");
		response.style.color = "#f00";
		response.style.font_weight="bold";
	}
}
function wrongResponse(){
	//Goes through and comes up with a better response to a wrong answer than "Aww..."
	var r="Incorrect<br>";
	if(qType=="der"){
		var responses=["Did you remember the power rule?","Check you work and try again.","You can do it!"];//I can't come up with any other response
		var a=Math.floor((Math.random()*responses.length))
		r+=responses[a];
	}
	else if(qType=="int"){
		//if()
	}
	reply(r);
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
		else if(type=="tangent"){
			t_l(diff);
		}
		strike=false;
		var b=document.getElementById("new-question");
		b.innerHTML="New Question";
	}
}
function ask(question, expression){
	var q=document.getElementById("question");
	//console.log(question);
	//console.log(expression);
	//var e=document.getElementById("expression");
	q.innerHTML=question;
	//e.innerHTML=expression;
	var m=MathJax.Hub.getAllJax("expression")[0];
	MathJax.Hub.Queue(['Text',m, expression]);
	reply("");
	var ans=document.getElementById("input-answer");
	ans.value="";
	answered=false;
	var ent=document.getElementById("new-entry");
	ent.innerHTML="";
	entry_text="";
}
function reply(text){
	var response=document.getElementById("response");
	response.innerHTML=text;
	response.style.color = "#000";
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

function der(diff){
	//I fell bad hardcoding this, but I don't know how to do it in js
	var derDiffs=diffs["derivative"];
	var d=derDiffs[diff-1];
	if(d.length==3){//The polynomial trig questions
		newDerivative(d[0],d[1],d[2]);
	}
	if(d.length==4){//The trig questions have 4 parts of data
		newTrigDerivative(d[0],d[1],d[2],d[3]);
	}
}
function newDerivative(terms, maxPow, maxCo, test=false){
	var q="What is the derivative of the following?";
	var e="\\frac{d}{dx}(";//The part to print
	var simple="";//The one to be used to make the answer
	//Ok, going to rethink this:
	//If there are more possible powers than terms, make terms that are to a random power in the range with a random coefficient, check that isn't already used (delete terms from list, probably)
		//Then, go through and put them in a reasonable order, to not confuse people
		//Much better than just generating random numbers and checking that it isn't already used
	//If there are more or equal terms than possible powers, make a random coefficient for each power, number of terms doesn't matter
	//Also, posible powers=maxpow+1;
	poly=makePolynomial(terms, maxPow, maxCo, test);
	if(test){
		for(var i=0; i<poly[2][0].length; i++){
			console.log(poly[2][0][i]);
		}
		console.log("pows:");
		for(var i=0; i<poly[2][1].length; i++){
			console.log(poly[2][1][i]);
		}
	}
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
function newTrigDerivative(maxTCo, maxXCo, maxXPow, diff){
	var q="What is the derivative of the following?";
	var e="\\frac{x}{dx}(";
	var simple="";
	var trig=trig_term(maxTCo, maxXCo, maxXPow, diff);
	e+=trig[1];
	simple+=trig[0];
	e+=")=?";
	var ans=0;
	console.log(simple);
	if(simple.includes("x")){
		ans=math.derivative(simple,"x").toString();
	}
	currentAns=ans;
	ask(q,e);
}
function t_l(diff){
	//makes a new tangent line problem, from just the difficulty
	var tlDiffs=diffs["tangent"];
	var d=tlDiffs[diff-1];
	tangent_slope(d[0],d[1],d[2],d[3]);
}
function tangent_slope(terms, maxPow, maxCo, maxX){
	var q="What is the slope of the following equation at x=";
	var e="f(x)=";
	var simple="";
	poly=makePolynomial(terms, maxPow, maxCo);
	e+=poly[0];
	simple+=poly[1];
	var xVal=((Math.random()*maxX*2)-maxX).toFixed(0);//If I am correct, this gives a random number [-maxX, maxX], and rounds it to an integer
	//needs to be "xVal" because of how mathjs works
	var ans;
	if(simple.includes("x")){
		ans=math.derivative(simple, "x").toString();
		ans=math.eval(ans, {x:xVal});
	}
	else{
		ans=0;
	}
	q+=xVal+"?";
	ask(q,e);
	currentAns=ans;
}
function intQ(diff){
	var intDiffs=diffs["integral"];
	var d=intDiffs[diff-1];
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
function newTrigIntegral(maxTCo, maxXCo, maxXPow, trig=nTrig){
	var latex="\\int(";
	var simple="";
	var t=trig_term(maxTCo, maxXCo, maxXPow, trig, true);
	latex+=t[1];
	simple+=t[0];
	latex+=")dx";
	raw=t[2];
	ans=integrateTrig(raw[0], raw[1],raw[2],raw[3]);
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
function integrateTrig(tCo, trig, xCo, xPow){
	console.log("Not finishing this now...");
	return 1;//so that it won't crash, at least...
	//Going to start coding this now, but am going to have to leave in a bit
	//Hopefully I will remember to push this code later
	//pseudocode:
	//Oh, great, this is going to need a different random trig generator, to make it work nicely (no integration by parts)
	//Ok, so the random trig will make it so that it works out somewhat nicely
	//So do reverse power rule with the coefficient
	//Do the integration of the trig function
	//And print it nicely
	//Yeah, most of the work is going to need to be making the random trig generator
	//Might just want to generate a trig function, and then find the derivative of that (and print it nicely)
	//Yeah, do that
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
			/*if(co==-1&&pow!=0){
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
			}*/
			//Add in later: allow a term with coefficient <=0, and account for that with the printing of the + and the entire term
			if(pow!=maxPow){
				if(co>0){
					latex+="+";
					simple+="+";
				}
				if(Math.abs(co)>1||pow==0){
					latex+=co;
					simple+=co;
				}
				else if(co<0){//-1
					latex+="-";
					simple+="-";
				}
			}
			else{
				if(Math.abs(co)>1||pow==0){
					simple+=co;
					latex+=co;
				}
				else if(co<0){//-1
					simple+="-";
					latex+="-";
				}
			}
			if(pow>0){
				simple+="x";
				latex+="x";
				if(pow>1){
					simple+="^"+pow;
					latex+="^{"+pow+"}";
				}
			}
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
		console.log(possiblePows);
		var pows=[];
		var cos=[];
		for(var i=0; i<terms; i++){
			var pi=Math.floor((Math.random()*possiblePows.length));
			console.log(pi);
			var c=0;
			while(c==0){
				c=((Math.random()*maxCo*2)-maxCo).toFixed(0);
			}
			var p=possiblePows[pi];
			possiblePows.splice(pi, 1);
			console.log(possiblePows);
			pows.push(p);
			cos[p]=c;
			console.log(p);
		}
		pows.sort(function(a,b){return b-a});//Javascript tutorial says this should be reverse order
		console.log(pows);
		for(var i=0; i<pows.length; i++){
			var p=pows[i];
			/*if((cos[p]==-1)&&(p!=0)){
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
			}*/
			if(i>0){
				if(cos[p]>0){
					latex+="+";
					simple+="+";
				}
				if(Math.abs(cos[p])>1||p==0){
					latex+=cos[p];
					simple+=cos[p];
				}
				else if(cos[p]<0){//-1
					latex+="-";
					simple+="-";
				}
			}
			else{
				if(Math.abs(cos[p])>1||p==0){
					simple+=cos[p];
					latex+=cos[p];
				}
				else if(cos[p]<0){//-1
					simple+="-";
					latex+="-";
				}
			}
			if(p>0){
				simple+="x";
				latex+="x";
				if(p>1){
					simple+="^"+p;
					latex+="^{"+p+"}";
				}
			}
			raws[0].push(p);
			raws[1].push(cos[p]);
			console.log("Co:"+cos[p]+" Pow:"+p);
		}
	}
	var result=[latex, simple];
	if(raw){
		result.push(raws);
	}
	return result;
}
function trig_term(maxTCo, maxXCo, /*maxTPow,*/ maxXPow, diff=nTrig, raw=false){
	//Ok, so all of these variables are because you can have: a*sin^c(bx^d)
	//'max' is just there to be descriptive
	//'T' is for 'Trig', so it is a modifier for the trig (a and c)
	//'X' is for 'x', so it is a modifier for the indepenent variable (b and d)
	//'Co' is 'Coefficient', so it is a and b
	//'Pow' is 'Power', so it is c and d
	//So: maxTCo*sin^maxTPow(maxXCo*x^maxXPow) would be what it is, if it rolled 'sin' and 1 for every random thing
	//diff is an array of all of the trig functions that can be used, which are kindly listed in a few arrays above this function
	//Default is just sin, cos and tan
	var latex="";
	var simple="";
	var trigs=diff.filter(function (trig){
		return allTrig.includes(trig);
	});
	//Ok, since I seem to already be writing a lot of comments for this, might as well plan out the logic:
	//Generate a random coefficient within the range and !=0, print it, accounting for possibly =+-1
	//Pick a random power within the range, thought I may want to make it !=0
		//If it is 1, don't need to worry about it anymore
		//Otherwise, print a parenthese and later on print the exponent
		//May just drop this part...
		//Dropping it for now
	//Pick a random trig function within the checked list, print it 
		//(latex for trig stuff is \trig, with 'trig' being an actual trig function, makes it not an italicized variable)
	//Pick a random coefficient within the second range, print it, accounting for =+-1
	//Pick a random exponent for x, possible checking !=0, but we may want that... Do I need another argument for having x^0?
		//Yeah, print it according to the normal printing rules
	//Close the parens, put in the ^pow if it should be there
	//Why am I writing so many comments right now?
	var tc=0;
	while(tc==0){
		tc=((Math.random()*maxTCo*2)-maxTCo).toFixed(0);
	}
	if(Math.abs(tc)==1){
		if(tc==-1){
			simple+="-";
			latex+="-";
		}
	}
	else{
		simple+=tc;
		latex+=tc;
	}
	var t=Math.floor(Math.random()*trigs.length);
	var tr=trigs[t];
	simple+=tr+"(";
	latex+="\\"+tr+"(";//If it was just "sin", it LaTeX would italicize it because it thinks it is a variable, so it needs to be"\sin"
	var xc=0;
	while(xc==0){
		xc=((Math.random()*maxXCo*2)-maxXCo).toFixed(0);
	}
	if(xc==-1){
		simple+="-";
		latex+="-";
	}
	else if(xc!=1){
		simple+=xc;
		latex+=xc;
	}
	var xp=(Math.random()*maxXPow).toFixed(0);
	if(xp==0){
		if(Math.abs(xc)==1){//If it had just printed a - or nothing at all for the coefficient, print 1
			simple+="1";
			latex+="1";
		}
	}
	else{
		simple+="x";
		latex+="x";
		if(xp>1){
			simple+="^"+xp;
			latex+="^{"+xp+"}";
		}
	}
	simple+=")";
	latex+=")";
	var val=[simple, latex]
	if(raw){
		val.push([tc, tr, xc, xp]);//Add in the values to the return statement so that the integral can be found
	}
	return val;
}
function test(){
	console.log("test");
}
function testRandom(max, limit=100){
	//Just a check that I was doing random numbers properly
	//I think it might be rolling both + and - 0 though?
	var full=[];
	for (var i=0; i<=max; i++){
		full[i]=false;
	}
	var cont=true;
	var count=0;
	while(cont&&count<limit){
		count++;
		var a=((Math.random()*max)).toFixed(0);
		if(a>max||a<-max){
			console.log("Problem:"+a);
		}
		full[a]=true;
		cont=!full.every(function (i){
			return i;
		})
	}
	console.log("All were generated?"+!cont);
	console.log("Times rolled: "+count);
	console.log(full);
}
///////
//Numpad stuff (I would move this into a separate file, but they work so closely together that they might as well be in the same file)
///////
var expo=false;
var first=0;
//wait, so you can have [number], [expoenet][/exponent], [fstart][fmid][fend], [exponent][fstart][/exponent], [fstart][exponent][fmid], and also in denominator, but it isn't much of a problem
//So, those scenarios can be 0, 1, 2, 3, 4
var keyWrapper=function keyGuard(event){
	//Do some modification to the keypress, and then call numpad with it
	console.log(event.code);
	console.log(event.key);
	event.currentTarget.value ="test";
	event.preventDefault();
}
var entry=document.getElementById("input-answer");
//entry.addEventListener('keydown', keyWrapper);
function numpad(key){
	var area=document.getElementById("new-entry");
	if(typeof key=="number"){
		if(entry_text.slice(-1)=="]"||entry_text.slice(-1)==")"){//fix implicit multiplication
			area.innerHTML+="*";
			entry_text+="*";
		}
		area.innerHTML+=key;
		entry_text+=key;
	}
	else if(key=="^"){
		entry_text+=addExpo(area);
	}
	else if(key=="back"){
		entry_text=backspace(area, entry_text);
	}
	else if(key=="frac"){
		entry_text+=addFrac(area);
	}
	else if(['x','c'].includes(key)){//any remaining value, not a function
		if([")","]"].includes(entry_text.slice(-1))){//just came up with a much better way of doing this logic
			entry_text+="*";
			area.innerHTML+="*";
		}
		area.innerHTML+=key;
		entry_text+=key;
	}
	else{
		area.innerHTML+=key;
		entry_text+=key;
	}
	console.log(first);
}
function newNumpad(key, btn){
	//key-what key was pressed, using the response from event.key
	//btn-false if from the text box, true if from the 
}
function addExpo(feild){
	if(!expo){
		feild.innerHTML+="^(";
		expo=true;
		if (first==0){
			first=1;
		}
		else if(first==2){
			first=4;
		}
		return "^(";
	}
	else{
		if(first==4){
			first=2;
		}
		else if(first==1){
			first=0;
		}
		else{
			console.log("Need to let the user know this");
			reply("<You need to close the fraction before you can close the exponent");
			response.style.color = "#f00";
			return "";
		}
		var start=feild.innerHTML.indexOf("^(");
		//console.log(feild.innerHTML.substring(start+2));
		var inside=feild.innerHTML.substring(start+2);
		var before=feild.innerHTML.substring(0,start);
		//console.log(before);
		val="";
		if(inside==""){
			//feild.innerHTML=before;//Yeah, that probably did more bad than good
			inside="1";//so that it just won't do anything, instead of breaking something
			//If I have the time to rework the flow of this, I would make it remove the opening exponent instead
			val="1";
		}
		//else{
		feild.innerHTML=before+"<sup>"+inside+"</sup>";
		//}
		expo=false;
		return val+")";
	}
}
var frac_stage=0;//0=not in fraction, 1=numerator, 2=denominator
function addFrac(feild){
	if(frac_stage==0){
		feild.innerHTML+="[";
		frac_stage=1;
		if(first==0){
			first=2;
		}
		else if(first==1){
			first=3;
		}
		return "[";
	}
	else if(frac_stage==1){
		if(first!=3&&first!=2){
			//console.log("Need to let the user know this");
			reply("You need to close the exponent before you can close the fraction");
			style.color = "#f00";
			return "";
		}
		//Slightly bad workaround, but I don't think it's worth the effort to find what the numerator is here
		//This will need to be redone if I ever allow fractions inside of fractions
		if(feild.innerHTML.slice(-1)=="["){
			feild.innerHTML+="1]/[";
			frac_stage=2;
			return "1]/[";
			//Oh, I really should redo this part at some point, but I just want to get a better fix out for now
		}
		feild.innerHTML+="]/[";
		frac_stage=2;
		return "]/[";
	}
	else if(frac_stage==2){
		if (first==3){
			first=1;
		}
		else if(first==2){
			first=0;
		}
		else{
			//console.log("Need to let the user know this");
			reply("You need to close the exponent before you can close the fraction");
			style.color = "#f00";
			return "";
		}
		var start=feild.innerHTML.indexOf("[");
		var mid=feild.innerHTML.indexOf("]/[");
		var before=feild.innerHTML.slice(0,start);
		var num=feild.innerHTML.slice(start+1,mid);
		var den=feild.innerHTML.slice(mid+3);
		console.log(before);
		console.log(num);
		console.log(den);
		val="";
		if(den==""){
			console.log("Yeah, actually setting the denominator to 1");
			den="1";
			val="1";
		}
		feild.innerHTML=before+"<sup>"+num+"</sup>&frasl;<sub>"+den+"</sub>";
		frac_stage=0;
		return val+"]";//slightly better, but still kind of painful...
	}
}
function backspace(feild, text){
	var last=feild.innerHTML.slice(-1);
	//console.log(last);;
	if(feild.innerHTML.slice(-6)=="</sup>"){//Check for superscript closing tag, undo formatting
		var start=feild.innerHTML.lastIndexOf("<sup>");
		var inside=feild.innerHTML.slice(start+5,-6);
		var before=feild.innerHTML.slice(0,start);
		//console.log(inside);
		//console.log(before);
		feild.innerHTML=before+"^("+inside;
		expo=true;
		if (first==0){
			first=1;
		}
		else if(first==2){
			first=4;
		}
		text=text.slice(0,-1);
	}
	else if(last=="("&&feild.innerHTML.slice(-2)=="^("){//check for superscript opening tag, remove entire thing instead of just a single character
		feild.innerHTML=feild.innerHTML.slice(0,-2);
		text=text.slice(0,-2);
		expo=false;
		if(first==4){
			first=2;
		}
		else if(first==1){
			first=0;
		}
	}
	else if(last==">"&&feild.innerHTML.slice(-6)=="</sub>"){//check for fraction closing tag, remove formatting
		//console.log("Yeah, right now this is broken...");
		//return text;
		var middle = feild.innerHTML.lastIndexOf("</sup>⁄<sub>");//special note: that is not the normal forward slash, that is &frasl;
		//console.log(middle);
		//Oh, this will be fun to code. 3 scenARios:
			//"<sup>[exponent]</sup>[other stuff]*<sup>*[rest of fraction]"
			//"*<sup>*[rest of fraction]"
			//"*<sup>*[numerator stuff]<sup>[exponent]</sup>[rest of fraction]"
		var temp=feild.innerHTML.slice(0,middle);
		while(temp.lastIndexOf("</sup>")>temp.lastIndexOf("<sup>")){
			//Keep on removing any exponents until it's outside of the fraction
			temp=temp.slice(0, temp.lastIndexOf("<sup>"));
		}
		var start=temp.lastIndexOf("<sup>");
		var before=feild.innerHTML.slice(0, start);
		var num=feild.innerHTML.slice(start+5,middle);
		var den=feild.innerHTML.slice(middle+12, -6);//found part of the problem- .innerHTML is returing the specail /, not &frasl;
		console.log(before);
		console.log(num);
		console.log(den);
		//return text;
		feild.innerHTML=before+"["+num+"]/["+den;
		text=text.slice(0,-1);
		frac_stage=2;
		if(first==0){
			first=2;
		}
		else if(first==1){
			first=3;
		}
	}
	else if(last=="["&&feild.innerHTML.slice(-3)=="]/["){//check for the fraction slash
		feild.innerHTML=feild.innerHTML.slice(0,-3);
		text=text.slice(0,-3);
		frac_stage=1;
	}
	else if(last=="["){//fraction numerator start
		feild.innerHTML=feild.innerHTML.slice(0,-1);
		text=text.slice(0,-1);
		frac_stage=0;
		if (first==3){
			first=1;
		}
		else if(first==2){
			first=0;
		}
	}
	else{//normal backspace
		feild.innerHTML=feild.innerHTML.slice(0,-1);
		text=text.slice(0,-1);
	}
	return text;
}