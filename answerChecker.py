import sympy #right now, assuming that later on I will be able to install it on the computer
import re
validOperations=["*","+","-","/","**", "(",")",]
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
    parts=answer.split(" ")
    valid=True
    for part in parts:#this converts ^ to **, etc. Also checks that it doesn't try
                        #to do anything evil
        if part=="":#If there were two spaces in a row, not sure if this is even needed
            continue
        elif part=="x":
            continue
        elif part.isdigit():
            continue
        elif part=="^":
            part="**"
            continue
        elif part in validOperations:
            continue
        else:
            valid = False
            print("Someone just tried to break it!")
            break
    working="".join(parts)
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
            eq=sanswer-sguess
            check = sympy.simplify(eq)
            if simplify:
                return check==0, ""
            else:
                if sguess == sanswer:
                    return True, ""
                else:
                    if check==0:
                        return False, "Simplification is needed"
                    else:
                        return False, ""
        except TypeError:
            return False, "Unable to interpret your answer"
        
    
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
def spacifyEntry(entry):
    '''Goal of this is to make something that will make it have spaces where needed
    for the stringToSympy() function.'''
    #I have no idea how to code this
    parts = re.findall('(\-?)([0-9.]+|x)\s*(\+|\(|\)|/|\*+|^|.?)', entry)
    #finds all of the numbers or x terms, and finds the operators (the .? is there for the last term, sigh...)
    newEntry=""
    if type(parts[0])==tuple:#It got multiple groupings
        for part in parts:
            newEntry+=" ".join(part)#put together the parts of the tuple
    else:
        newEntry=" ".join(parts)#put together the parts of the list
    return newEntry
def newSpacifyEntry(entry):
    if len(entry)==0:
        return "0" #makes it not break on an empty string
    newEntry = entry[0]
    lastWasNum = newEntry.isdigit()
    lastChar=newEntry
    openParens=newEntry.find("(")
    closeParens=newEntry.find(")")
    if len(entry)==1:
        return newEntry#so it doesn't break on a single character
    for i in range(1, len(entry)):
        if lastWasNum:
            if entry[i].isdigit():
                newEntry+=entry[i]
            else:
                newEntry+=" "+entry[i]
        else:
            if entry[i] == lastChar:
                if entry[i]*2 in validOperations:#right now, is it a *
                    newEntry+=entry[i]
                else:
                    newEntry+=" "+entry[i]
            else:
                newEntry+=" "+entry[i]
        if entry[i]=="(":
            openParens+=1
        if entry[i]==")":
            closeParens+=1
        if closeParens>openParens:
            return False
        lastChar= entry[i]
        lastWasNum=entry[i].isdigit()
    return newEntry
def testProblems():
    ans1 = raw_input("What is 1 + 1? ")
    print(checkAnswer(ans1, 2)[0])
    ans2 = raw_input("Factor x^2 - 1. ")
    print(checkAnswer(ans2, "(x-1)*(x+1)",simplify = False)[0])
    ans3 = raw_input("Type in something that is equivalent to x^2 - 1. ")
    print(checkAnswer(ans3, "x ^ 2 - 1", simplify= True)[0])