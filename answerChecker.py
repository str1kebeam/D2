import sympy #right now, assuming that later on I will be able to install it on the computer
import re
validOperations=["*","+","-","/","**", "(",")"]
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
    answer=spacifyEntry(answer)
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
        return "Something very bad happened!"
def checkAnswer(guess, answer, simplify=True):
    '''Checks if guess is equivalent to answer.
    Note that this currently simplyies guess, so they could just put in the question in
        some cases.'''
    if type(guess) in [int, float]:
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
        return check==0
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