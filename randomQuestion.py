import answerChecker as ac #hopefully this is't shorthand for something else
import random
def askAQuestion(question, answer, simplify=True):
    ans=raw_input(question+" ")
    return ac.printCorrectNicely(ac.checkAnswer(ans, answer, simplify))
def randomIntNo0(low, high):
    a=random.randint(low, high)
    while a==0:
        a=random.randint(low,high)
    return a
def randomAddition(difficulty=1):
    '''Test of making random problems. Gives an addition/subtraction problem. Difficulty 0 corresponds to whole numbers <100,
    1 is integers -100<=x<=100, add more difficulties later.'''
    a=0
    b=0
    if difficulty==0:
        a=random.randint(0,100)
        b=random.randint(0,100)
    elif difficulty==1:
        a=random.randint(-100, 100)
        b=random.randint(-100, 100)
    elif difficulty>1:
        c=10**(difficulty+1)
        a=random.randint(-c, c)
        b=random.randint(-c, c)
    ans=a+b
    question="What is "+str(a)
    if b<0:
        question+=" - "+str(-b)
    else:
        question+=" + "+str(b)
    question+="?"
    return question, ans, False
def randomTangent(difficulty=1):
    '''Makes a random tangent line problem.
    0 gives a linear equation ax + b, where a,b, and c are in the range (-10, 10)
    1 gives a quadratic equation ax^2 + bx + c, where all of those variables are in the range (-10, 10)
    2 gives a polynomial equation ax^b + cx^d + e, where b and d are (1, 4) and not the same, and the rest are in the range (-10, 10)'''
    if difficulty==0:
        a = randomIntNo0(-10, 10)
        b = random.randint(-10, 10)
        x = random.randint(-10, 10)
        answer=a
        question="What is the slope of the tangent line of y=%sx + %s at x=%s?"%(a,b,x)
        return question, answer, False
    elif difficulty==1:
        a = randomIntNo0(-10, 10)
        b = randomIntNo0(-10, 10)
        c = random.randint(-10, 10)
        x = random.randint(-10, 10)
        answer = (a*x*2)+b 
        question = "What is the slope of the tangent line of y = %sx^2 + %sx + %s at x=%s?"%(a, b, c, x)
        return question, answer, False
    elif difficulty==2:
        a = randomIntNo0(-10, 10)
        b = random.randint(1, 4) #exponent here
        c = randomIntNo0(-10, 10)
        d = random.randint(1, 4)
        while d==b:
            d=random.randint(1, 4)
        e = random.randint(-10, 10)
        x = random.randint(-10, 10)
        answer = (a*b*(x**(b-1)))+(c*d*(x**(d-1)))
        strb = ""
        if b!=1:
            strb="^"+str(b)
        strd = ""
        if d!=1:
            strd="^"+str(d)
        question = "What is the slope of the tangent line of y = %sx%s + %sx%s + %s at x=%s?"%(a, strb, c, strd, e, x)
        return question, answer, False
    return "(Just type in 0 for now)", 0, False
def randomDerivative(difficulty=1):
    '''Just an example of the sympy answer checker parts, because none of the other questions use it and that's what I did a lot on
    The same as randomTangent, except it doesn't have an x=something'''
    if difficulty==0:
        a=randomIntNo0(-10,10)
        b=random.randint(-10,10)
        answer=str(a)#needs to be a string for my function to turn it into sympy
        question = "What is the derivative of %sx + %s?"%(a, b)
        return question, answer, False
    elif difficulty ==1:
        a=randomIntNo0(-10, 10)
        b=randomIntNo0(-10, 10)
        c=random.randint(-10, 10)
        answer=str(2*a)+"x"+str(b)
        question="What is the derivative of %sx^2 + %sx + %s?"%(a, b, c)
        return question, answer, False
    elif difficulty ==2:
        a=randomIntNo0(-10, 10)
        b=random.randint(1, 4)
        c=randomIntNo0(-10, 10)
        d=random.randint(1,4)
        while d==b:
            d=random.randint(1,4)
        e=random.randint(-10, 10)
        answer=""
        question="What is the derivative of " #I was going to have this have it's own if-else tree, but then I realized it would pretty much be the same
        if b==1:
            answer+=str(a)
            question+=str(a)+"x"
        elif b==2:
            answer+=str(a*(b))+"x"
            question+=str(a)+"x^2"
        else:
            answer+=str(a*(b))+"x^"+str(b-1)
            question+=str(a)+"x^"+str(b)
        answer+="+"
        question+=" + "
        if d==1:
            answer+=str(c)
            question+=str(c)+"x"
        elif d==2:
            answer+=str(c*d)+"x"
            question+=str(c)+"x^2"
        else:
            answer+=str(c*d)+"x^"+str(d-1)
            question+=str(c)+"x^"+str(d)
        question+=" + "+str(e)+"?"
        return question, answer, False
        
problemTypes = {"addition":randomAddition, "tangent line":randomTangent, "derivative":randomDerivative}
validDifficulties = {"addition":(0,1,2,3,4,5), "tangent line":(0,1,2), "derivative":(0,1,2)}
def testLoop():
    cont=True
    while cont:
        contProblems=True
        ansProblems=""
        while contProblems:
            print("What question type would you like?")
            for problem in problemTypes.keys():
                print"\t"+problem
            problem=((raw_input(">")).strip()).lower()
            if problem in problemTypes.keys():
                contProblems=False
                ansProblems=problem
            elif problem in ["tangent","tangentline"]: #so that I don't have to go through a lot of work to change the system, as this is just an example of how it would work
                ansProblems="tangent line"
                contProblems=False
        contDifficulty=True
        ansDifficulty=0
        while contDifficulty:
            print("What difficulty would you like? Valid difficulties are:")
            for difficulty in validDifficulties[ansProblems]:
                print "\t"+str(difficulty)
            ansDifficulty=(raw_input(">")).strip()
            if not ansDifficulty.isdigit():
                pass
            else:
                ansDifficulty=int(ansDifficulty)
                if ansDifficulty in validDifficulties[ansProblems]:
                    contDifficulty=False
        question, answer, simplify=problemTypes[ansProblems](ansDifficulty)
        askAQuestion(question, answer, simplify)
        cont = raw_input("Do you want another question? y/N ")
        if (cont.strip()).lower()=="y":
            cont=True
        else:
            cont=False