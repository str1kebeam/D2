import sympy #right now, assuming that later on I will be able to install it on the computer
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
    y = sympy.Function('y')(x)
    y_ = sympy.Derivative(y, x)
    if answer==False:
        return False
    parts=answer.split(" ")
    valid=True
    for i, part in enumerate(parts):#this converts ^ to **, etc. Also checks that it doesn't try
                        #to do anything evil
        if part=="":#If there were two spaces in a row, not sure if this is even needed
            continue
        elif part=="x":
            continue
        elif part.isdigit():
            continue
        elif part=="^":
            parts[i]="**"
            #print "But this works?"
            continue
        elif part=="y'":
            parts[i]="Derivative(y(x), x)"
            #print "It should have happened"
            continue
        elif part in validOperations:
            continue
        else:
            valid = False
            #print("Someone just tried to break it!")
            break
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
    lastWasNum = newEntry.isdigit()
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
            if entry[i].isdigit():
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
        lastWasNum=entry[i].isdigit()
    if openParens>closeParens:#unclosed parentheses?
        missing=openParens-closeParens
        newEntry+=(" )"*missing)#instead of giving a syntax error, will just append parentheses
    return newEntry
def testProblems():
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