'''
Name:       Elijah Thorpe
Course:     CSE
Assignment: Software Design Project
Purpose:    This allows for the use of almost any string as a function, for use in the 
            graphing. Right now uses sympy, but I feel like I should add more utility to it
'''
import numpy as np
import sympy as sp
import answerChecker as ac
def numpyFunction(string, array, useSympy=True):
    '''
    Applies the string function to the numpy array, by using the answer checker code and sympy
    evaluation of expressions with a variable = something.
    '''
    function = ac.stringToSympy(string)
    x=sp.symbols("x")
    output = []
    for i in array:
        output.append(int(function.subs(x, int(i))))
    return np.array(output)