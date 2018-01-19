'''
Name:       Elijah Thorpe
Course:     CSE
Assignment: Software Design Project
Purpose:    A proof-of-concept of random problem generation (will need different formatting in final version).
            randomAddition, randomTangent, and randomDerivative are random question/answer generators.
            testLoop() is for testing out the questions. askAQuestion() would later on be replaced with some connection to the website.
'''
import answerChecker as ac #hopefully this is't shorthand for something else
import random
def askAQuestion(question, answer, simplify=True):
    '''Asks the question and gets the user's answer. Gets answerChecker.py to check the answer.
    In the final version of the website, most of this would be replaced with the webpage code.'''
    ans=raw_input(question+" ") #ask the question 
    return ac.printCorrectNicely(ac.checkAnswer(ans, answer, simplify)) #give the information to answerChecker
def randomIntNo0(low, high):
    '''Repeatedly generates random numbers in range [low, high] until it isn't 0
    Shortens a few statements, where (-10, 10) could give 0, which would mean another case to test when printing out questions,
    and would also confuse people when given a problem with 0x written in it.'''
    a=random.randint(low, high)
    while a==0:
        a=random.randint(low,high)
    return a
def randomAddition(difficulty=1):
    '''Test of making random problems. Gives an addition/subtraction problem. Difficulty 0 corresponds to whole numbers <100,
    1 is integers -100<=x<=100, greater than 1 is just adds more 0s on to the range for difficulty 1.'''
    a=0
    b=0
    if difficulty==0:
        a=random.randint(0,100) #generate the first number
        b=random.randint(0,100) #generate the second number
    elif difficulty==1: #same thing as above
        a=random.randint(-100, 100)
        b=random.randint(-100, 100)
    elif difficulty>1:
        c=10**(difficulty+1)
        a=random.randint(-c, c)
        b=random.randint(-c, c)
    ans=a+b #make the answer
    question="What is "+str(a) #start the question
    if b<0: #if it is less than 0, then this is subtraction, and a - should be used instead of a +
        question+=" - "+str(-b)
    else:
        question+=" + "+str(b)
    question+="?" #add a question mark to the question
    return question, ans, False
def randomTangent(difficulty=1):
    '''Makes a random tangent line problem.
    0 gives a linear equation ax + b, where a,b, and c are in the range (-10, 10)
    1 gives a quadratic equation ax^2 + bx + c, where all of those variables are in the range (-10, 10)
    2 gives a polynomial equation ax^b + cx^d + e, where b and d are (1, 4) and not the same, and the rest are in the range (-10, 10)'''
    if difficulty==0:
        a = randomIntNo0(-10, 10) #make x's coefficient
        b = random.randint(-10, 10) #make a constant term
        x = random.randint(-10, 10) #chose where it is tangent to y
        answer=a #make the answer
        question="What is the slope of the tangent line of y=%sx + %s at x=%s?"%(a,b,x) #make the question
        return question, answer, False
    elif difficulty==1:
        a = randomIntNo0(-10, 10) #generate x^2's coeffiecent
        b = randomIntNo0(-10, 10) #generate x's coeffiecent
        c = random.randint(-10, 10) #generate the constant term
        x = random.randint(-10, 10) #choose where it is tangent
        answer = (a*x*2)+b  #make the answer
        question = "What is the slope of the tangent line of y = %sx^2 + %sx + %s at x=%s?"%(a, b, c, x)
        return question, answer, False
    elif difficulty==2:
        a = randomIntNo0(-10, 10) #x^b's coeficent
        b = random.randint(1, 4) #exponent here. x's first power
        c = randomIntNo0(-10, 10) #x^d's coeficent
        d = random.randint(1, 4) #x's second power
        while d==b: #make the two terms not be of the same power
            d=random.randint(1, 4)
        e = random.randint(-10, 10) #generate a constant
        x = random.randint(-10, 10) #x value
        answer = (a*b*(x**(b-1)))+(c*d*(x**(d-1))) #answer
        strb = "" #how x^b should be writen
        if b!=1: #if not x^1, write something. If it is x^1, just make it x
            strb="^"+str(b)
        strd = "" #how x^d should be written. see above
        if d!=1: 
            strd="^"+str(d)
        question = "What is the slope of the tangent line of y = %sx%s + %sx%s + %s at x=%s?"%(a, strb, c, strd, e, x) #question
        return question, answer, False
    return "(Just type in 0 for now)", 0, False #was a filler for when I hadn't made all of the difficulties
def randomDerivative(difficulty=1):
    '''Just an example of the sympy answer checker parts, because none of the other questions use it and that's what I did a lot on
    The same as randomTangent, except it doesn't have an x=something'''
    if difficulty==0:
        a=randomIntNo0(-10,10) #x's coeficient
        b=random.randint(-10,10) #the constant term
        answer=str(a)#needs to be a string for my function to turn it into sympy
        question = "What is the derivative of %sx + %s?"%(a, b)
        return question, answer, False
    elif difficulty ==1:
        a=randomIntNo0(-10, 10) #x^2's coeficient
        b=randomIntNo0(-10, 10) #x's coeficient
        c=random.randint(-10, 10) #constant term
        answer=str(2*a)+"x"+str(b) #make the answer
        question="What is the derivative of %sx^2 + %sx + %s?"%(a, b, c)
        return question, answer, False
    elif difficulty ==2:
        a=randomIntNo0(-10, 10) #x^b's coeficient
        b=random.randint(1, 4) #x's first power
        c=randomIntNo0(-10, 10) #x^d's coeficent
        d=random.randint(1,4) #x's second power
        while d==b: #make the two x terms not have the same exponent
            d=random.randint(1,4)
        e=random.randint(-10, 10) #constant term
        answer="" #start the answer
        question="What is the derivative of " #I was going to have this have it's own if-else tree, but then I realized it would pretty much be the same
        if b==1: #if b is 0, then ax^b's derivative is just a, and will just be printed ax
            answer+=str(a)
            question+=str(a)+"x"
        elif b==2: #if b is 2, then ax^b's derivative is just ax, and will be printed as ax^2
            answer+=str(a*(b))+"x"
            question+=str(a)+"x^2"
        else: #if b is greater than 2, then ax^b's derivative is ax^(b-1), and will be printed ax^b
            answer+=str(a*(b))+"x^"+str(b-1)
            question+=str(a)+"x^"+str(b)
        answer+="+" #add in the pluses
        question+=" + "
        if d==1: #pretty much the same as the above if-elif-else tree, but for cx^d. I am really regretting my variable choices now
            answer+=str(c)
            question+=str(c)+"x"
        elif d==2:
            answer+=str(c*d)+"x"
            question+=str(c)+"x^2"
        else:
            answer+=str(c*d)+"x^"+str(d-1)
            question+=str(c)+"x^"+str(d)
        question+=" + "+str(e)+"?" #finish off the question with the constant and a question mark
        return question, answer, False

#Instead of hardcoding in the choices and the resulting functions called, these two dictionaries
    #let me quickly add them in
problemTypes = {"addition":randomAddition, "tangent line":randomTangent, "derivative":randomDerivative}
validDifficulties = {"addition":(0,1,2,3,4,5), "tangent line":(0,1,2), "derivative":(0,1,2)}
def testLoop():
    '''Just a function for testing out the random question generators. Uses the two
    above dictionaries for the options. All of this would be done by the website/a tiny bit of python.'''
    cont=True
    while cont: #loop so that you don't have to repeatedly call this function
        contProblems=True
        ansProblems="" #what problem type they are doing
        while contProblems: #a loop for checking they put in a valid problem type
            print("What question type would you like?") 
            for problem in problemTypes.keys(): #loop through all of the problem types
                print"\t"+problem
            problem=((raw_input(">")).strip()).lower() #have them answer the question, and format it for reading
            if problem in problemTypes.keys(): #if it is one of the problem types, end this loop and record the problem type
                contProblems=False
                ansProblems=problem
            elif problem in ["tangent","tangentline"]: #so that I don't have to go through a lot of work to change the system, as this is just an example of how it would work
                ansProblems="tangent line"
                contProblems=False
        contDifficulty=True
        ansDifficulty=0
        while contDifficulty:#loop for chosing a difficulty
            print("What difficulty would you like? Valid difficulties are:")
            for difficulty in validDifficulties[ansProblems]: #list all of the valid difficulties for this problem type
                print "\t"+str(difficulty)
            ansDifficulty=(raw_input(">")).strip() #get their answer
            if not ansDifficulty.isdigit(): #if they didn't give a number, continue the loop
                pass
            else: #if they did give a number...
                ansDifficulty=int(ansDifficulty) 
                if ansDifficulty in validDifficulties[ansProblems]: #check that it was a valid choice...
                    contDifficulty=False                                #and end the loop
        question, answer, simplify=problemTypes[ansProblems](ansDifficulty) #get the question, answer, and if it should be simplified from the random problem generator
        askAQuestion(question, answer, simplify) #Ask the question. Would be replaced with the website later on
        cont = raw_input("Do you want another question? y/N ") #do they want to continue this function's loop
        if (cont.strip()).lower()=="y": #if they said yes, continue this loop
            cont=True
        else: #if they say ANYTHING else, end the loop, so that even if I write the check horribly wrong, it won't be stuck
            cont=False