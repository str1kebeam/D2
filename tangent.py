import numpy as np  
import matplotlib.pyplot as pylab
import sympy as sp
x = np.linspace(-15,15,100) # 100 linearly spaced numbers
def f(x):
    return x ** 2
y = f(x) # computing the values of sin(x)/x
i = int(raw_input())
dy = (f(i + 0.001) - f(i))/(0.001) * (x - i) + (f(i))
l = (f(i + 2) - f(i))/2 * (x - i) + (f(i))
j = (f(i + 5) - f(i))/5 * (x - i) + (f(i))
pylab.plot(x,y) # sin(x)/x
pylab.plot(x,dy)
pylab.plot(x,l)
pylab.plot(x,j)
pylab.show()
