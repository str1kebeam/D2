import numpy as np  
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
x = np.linspace(-15,15,200)
def f(x):             #Function to be plotted
    return x ** 2
y = f(x)
def draw_tangent(i):
    axes = plt.gca()
    axes.set_xlim([-20,20])
    axes.set_ylim([-20,20])
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
    plt.plot(x,y,'black')
    dy = (f(i + 0.001) - f(i))/(0.001) * (x - i) + (f(i))
    plt.plot(x,dy,'chartreuse')
def draw_secant(i,dx):
    axes = plt.gca()
    axes.set_xlim([-20,20])
    axes.set_ylim([-20,20])
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
    plt.plot(x,y,'black')
    dx = (f(i + float(dx)) - f(i))/(float(dx)) * (x - i) + (f(i))
    plt.plot(x,dx,'red')
def shade(n,i):
    plt.plot(x,y,'black')
    currentAxis = plt.gca()
    currentAxis.set_xlim([-20,20])
    currentAxis.set_ylim([-20,20])
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



