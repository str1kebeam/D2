import numpy as np  
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
x = np.linspace(-15,15,200)
def f(x):
    return x ** 3
y = f(x)
def draw_tangent(i,dx):
    dy = (f(i + 0.001) - f(i))/(0.001) * (x - i) + (f(i))
    dx = (f(i + float(dx)) - f(i))/(float(dx)) * (x - i) + (f(i))
    plt.plot(x,y,'black')
    plt.plot(x,dy,'chartreuse')
    plt.plot(x,dx,'r')
    plt.show()
def shade(n,i):
    plt.plot(x,y,'black')
    currentAxis = plt.gca()
    orig_point = (0,0)
    for a0 in range(n+1):
        if a0 == n:
            break
        else:
            currentAxis.add_patch(Rectangle(orig_point, orig_point[0] + i/float(n), f(orig_point[0] + i/float(n)), facecolor="blue"))
            orig_point = ((a0+1) * i/float(n),0)
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
    plt.show()

