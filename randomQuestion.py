import answerChecker as ac #hopefully this is't shorthand for something else
import random
def askAQuestion(question, answer, simplify=True):
    ans=raw_input(question+" ")
    return ac.printCorrectNicely(ac.checkAnswer(ans, answer, simplify))

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
    '''Makes a random tangent line problem.'''
    if difficulty==0:
        a = random.randint(-10, 10)
        b = random.randint(-10, 10)
        x = random.randint(-10, 10)
        answer=a
        question="What is the slope of the tangent line of y=%sx + %s at x=%s?"%(a,b,x)
        return question, answer, False
    elif difficulty==1:
        a = random.randint(-10, 10)
        b = random.randint(-10, 10)
        c = random.randint(-10, 10)
        x = random.randint(-10, 10)
        answer = (a*x*2)+b
        question = "What is the slope of the tangent line of y = %sx^2 + %sx + %s at x=%s?"%(a, b, c, x)
        return question, answer, False
    elif difficulty==2:
        a = random.randint(-10, 10)
        b = random.randint(1, 4) #exponent here
        c = random.randint(-10, 10)
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
problemTypes = {"addition":randomAddition, "tangent line":randomTangent}
validDifficulties = {"addition":(0,1,2,3,4,5), "tangent line":(0,1,2)}
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