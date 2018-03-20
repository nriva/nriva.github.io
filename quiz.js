//                   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
var answers = [null, 1, 3, 3, 2, 2, 2, 3, 2, 3, 1, 3, 1, 3, 2, 1, 1, 2, 2, 3, 2];
var userAnswers = [];

var NUM_QUIZ = 2;

var wrongAnswers = 0;
var emptyAnswers=0;

function removeSave()
{
	window.localStorage.removeItem('userAnswers');
	
}

function testAll()
{
	wrongAnswers=0;
	emptyAnswers=0;

	for(var i=1;i<=NUM_QUIZ;i++)
		test(i,answers[i]);
		
	window.localStorage.setItem('userAnswers', JSON.stringify(userAnswers));		

	if(wrongAnswers==0 && emptyAnswers==0)
	{
		document.getElementById("testOk").style.display="block";
		document.getElementById("testFail").style.display="none";
		document.getElementById("testIncomplete").style.display="none";
	}
	else if(wrongAnswers==0 && emptyAnswers!=0)
	{
		document.getElementById("testOk").style.display="none";
		document.getElementById("testFail").style.display="none";
		document.getElementById("testIncomplete").style.display="block";
	}
	else if(wrongAnswers!=0)
	{
		document.getElementById("testOk").style.display="none";
		document.getElementById("testFail").style.display="block";
		document.getElementById("testIncomplete").style.display="none";
	}
}

function idToStr(id)
{
	var s = "0" + String(id);
	if(s.length==2)
		return s;
	return s.substring(1);
}

function test(id)
{
	var idStr = idToStr(id);

	var answerId = answers[id];

	var elements = document.getElementsByName('answer'+idStr);
	var i=0;
	for(var i=0;i<elements.length;i++)
	{
	  if(elements[i].checked)
		break;
	}
	
	if(i<elements.length)
	{
		resetAnswer(id);	

		var elem=document.getElementById('case' + idStr + "_" + (answerId));
		elem.style.color="green";

		if(userAnswers==null)
			userAnswers = new Array();
		userAnswers[id] = i+1;


		if(i+1!=answerId) {
		  elem=document.getElementById('case' + idStr + "_" + (i+1));
		  elem.style.color="red";
		  wrongAnswers++;
		}
	}
	else
		emptyAnswers++;

}

function resetAnswer(id)
{
	var idStr = idToStr(id);
	
	try {
		document.getElementById('case'+idStr+'_1').style.color="black";
		document.getElementById('case'+idStr+'_2').style.color="black";
		document.getElementById('case'+idStr+'_3').style.color="black";  
	} catch(errObj)
	{
		debugger;
		throw errObj;
	}
}

function onload()
{
	
	 var tmp = window.localStorage.getItem('userAnswers');
	 
	 if(tmp==null)
		return;

	userAnswers = JSON.parse(tmp);
	for(var i=1;i<=NUM_QUIZ;i++)
	{
		document.getElementById('answer'+idToStr(i)+"_"+userAnswers[i]).checked = true;
		resetAnswer(i);
	}

}