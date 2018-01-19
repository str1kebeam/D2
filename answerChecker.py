'''
Name:       Elijah Thorpe
Course:     CSE
Assignment: Software Design Project
Purpose:    Works with questions and answers. The main method to be used here is checkAnswer(), which will check an answer
            to a question. testProblems() is the function to call to test this. stringToSympy() turns strings into sympy
            expressions, which is how it does advanced answer checking.
'''
import sympy #Sympy's documentation can be found here: http://docs.sympy.org/latest/index.html
import re
validOperations=["*","+","-","/","**", "(",")","sin(", "cos(", "tan(","csc(","sec(","cot(", "y'"
                ]#,"Derivative(y(x), x)"] this one caused problems, but they shouldn't be typing it anyway
#that is a list of things that it will allow without any edits
def stringToSympy(answer):
    '''Takes in a string and converts it into a sympy expression
    Right now, has support for: basic 4 functions, x, numbers, parentheses
    Needs to follow the systems of: 
        *only uses the variable x
        *everything is separated by spaces
    Also, sympy has support for most stuff, we just need to make it formatted correctly
        (and block anything evil, so I'm just doing a whitelist)
    '''
    answer=newSpacifyEntry(answer)
    x = sympy.symbols("x")#No, this is not a typo, it is needed for sympy to work
                            #This lines means that 'x' is a variable name in the expression
    y = sympy.Function('y')(x) #y is a function of x now
    y_ = sympy.Derivative(y, x) #y' is the derivative of y(x). Variable is y_ because you can't have ' in variable names. The user still just types in y'
    if answer==False: #spacify didn't work
        return False
    parts=answer.split(" ") #splits it into parts
    valid=True
    lastWasNum=False
    for i, part in enumerate(parts):#this converts ^ to **, etc. Also checks that it doesn't try
                        #to do anything evil
        #try:
        #    float(part) #a bit of bad form, but works for now. I'll write a regex-using check later and remove this one
        #    continue
        #except ValueError:
        #    pass
        match=re.findall("[\d\.]+",part) #matches things formatted like a number.
        if part=="":#If there were two spaces in a row, not sure if this is even needed
            pass
        elif part=="x": #let x be entered
            if lastWasNum:
                parts[i]="*x"#turns 3x into 3*x, which has the advantage of not crashing
            pass
        elif len(match)>0 and match[0]==part: #any number is ok
            lastWasNum=True
            continue
            '''
            If there is a part that isn't formatted like a number, then it will return only part of the string, which won't be equal to part
            (The first check is there as if the length is 0 then the second part won't be evaluated, and throw an error)
            '''
        elif part=="^": #replaces ^ with **, even though sympy apparently turns ^ to **. Took awhile to find out that it didn't work
            parts[i]="**"
            #print "But this works?"
            pass
        elif part=="y'": #replaces y' with the sympy code
            parts[i]="Derivative(y(x), x)"
            #print "It should have happened"
            pass
        elif part in validOperations: #if it is in the above list, it is fine
            pass
        else: #something went wrong, they may have been trying to mess with the computer
            valid = False
            #print("Someone just tried to break it!")
            break
        lastWasNum=False#if it didn't go to continue at the number check, will set lastWasNum to false
    working="".join(parts)
    #print working
    if valid:
        return sympy.sympify(working)
    else:
        return False
def checkAnswer(guess, answer, simplify=True):
    '''Checks if the guess is a equivalent to answer. Give straight int or 
        float for a numeric answer, and a string for an expression (to be made sympy).
        The guess will be turned from a string to either a float or a sympy depending on
        which one answer was.
        Returns if they gave a correct answer, and then a string with other information
            (e.g. They gave 5x when the answer was 5, it will complain about a non-numeric answer.)'''
    if type(answer) in [int, float]:#the answer is a number
        try:
            return (float(guess)==float(answer)), ""
        except ValueError:#it wasn't a number that they gave
            return False, "A numeric answer was wanted"
    if type(answer) == str:#it is a string, to be made into a sympy
        sanswer = stringToSympy(answer)
        if sanswer == False:#it was caught by my code
            raise(TypeError)#It's an invalid string to be made to sympy for this code
        try:
            sguess = stringToSympy(guess)
            if sguess == False:
                return False, "Unable to interpret your answer"
            eq=sanswer-sguess#this is how sympy's documentation suggests doing it: subtract one expression from another and then check that it is equal to 0
            check = sympy.simplify(eq)
            if simplify:
                return check==0, ""
            else:
                if sguess == sanswer:#checks if they are identical
                    return True, ""
                else:
                    if check==0: #they gave an equivalent answer, but they didn't give what we wanted
                        return False, "Your answer is equivalent, but not correct."
                    else:
                        return False, ""
        except TypeError:
            return False, "Unable to interpret your answer"
        
    #an old system that in hind sight didn't make as much sense
    '''if type(guess) in [int, float]:
        if type(answer) in [int, float]:
            return guess==answer#pretty much, don't go through a lot of work if the
                                  #answer is 5
        else:
            return False
    usable=stringToSympy(guess)
    if type(usable)==str:#"Something very bad happened!"
        return False #and glare at the user
    if type(answer) in [int, float]:
        #The answer was 5 and they gave x
        return False
    if not simplify: #don't simplify their answer, they need to give it in the proper format
        return usable==answer
    else:
        eq=usable-answer
        check=sympy.simplify(eq)
        return check==0'''
def newSpacifyEntry(entry):
    '''Adds in spaces so that stringToSympy can check for evil stuff. Also does a bit of syntax checking'''
    if len(entry)==0:
        return "0" #makes it not break on an empty string
    newEntry = entry[0]
    lastWasNum = newEntry.isdigit() or newEntry == "."
    #lastChar=newEntry
    openParens=newEntry.find("(")
    closeParens=newEntry.find(")")
    currentWord=newEntry
    if len(entry)==1:
        return newEntry#so it doesn't break on a single character
    for i in range(1, len(entry)):
        if entry[i]==" ":#remove their spaces
            continue
        endWord=False
        if lastWasNum:
            if entry[i].isdigit() or entry[i]==".":
                endWord=False
            else:
                endWord=True
        else:
            if currentWord+entry[i] in " ".join(validOperations):#only works because they can't have spaces actualy read
                endWord=False               #checks for it being part of a valid operation
            else:
                endWord=True
        if endWord:
            if newEntry[-1]==")" and entry[i]=="(":
                newEntry+=" *"
            newEntry+=" "+entry[i]
            currentWord=entry[i]
        else:
            newEntry+=entry[i]
            currentWord+=entry[i]
        if entry[i]=="(":
            openParens+=1
        if entry[i]==")":
            closeParens+=1
        if closeParens>openParens:#mismatched parentheses?
            return False
        #lastChar= entry[i] #depreciated
        lastWasNum=entry[i].isdigit() or entry[i]=="."
    if openParens>closeParens:#unclosed parentheses?
        missing=openParens-closeParens
        newEntry+=(" )"*missing)#instead of giving a syntax error, will just append parentheses
    return newEntry
def testProblems():
    '''Runs a few test questions. For testing out if this works.'''
    ans1 = raw_input("What is 1 + 1? ")
    printCorrectNicely(checkAnswer(ans1, 2))
    ans2 = raw_input("Factor x^2 - 1. ")
    printCorrectNicely(checkAnswer(ans2, "(x-1)*(x+1)",simplify = False))
    ans3 = raw_input("Type in something that is equivalent to x^2 - 1. ")
    printCorrectNicely(checkAnswer(ans3, "x ^ 2 - 1", simplify= True))
    ans4 = raw_input("What is the derivative of y with respect to x? ")
    printCorrectNicely(checkAnswer(ans4, "y'"))
def printCorrectNicely(data):
    '''Just makes a better response than 'True'. 
    data[0] corresponds to right/wrong, data[1] corresponds to the reason
    Meant to just be fed the output from checkAnswer()'''
    if data[0]:
        print 'Correct!'
    else:
        print 'Wrong. '+data[1]
    return data[0]