import numpy as np  
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
x = np.linspace(-30,30,200)
def f(x):             #Function to be plotted
    return 10 * np.sin(x)
y = f(x)
def draw_tangent(i):
    axes = plt.gca()      #Get the current axes
    axes.set_xlim([-50,50])
    axes.set_ylim([-50,50])
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
    plt.plot(x,y,'black')
    dy = (f(i + 0.001) - f(i))/(0.001) * (x - i) + (f(i))
    plt.plot(x,dy,'chartreuse')
def draw_secant(i,dx):
    axes = plt.gca()
    axes.set_xlim([-50,50])
    axes.set_ylim([-50,50])
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
    plt.plot(x,y,'black')
    dx = (f(i + float(dx)) - f(i))/(float(dx)) * (x - i) + (f(i))
    plt.plot(x,dx,'red')

def shade_with_rectangles(n,h,i):
    plt.plot(x,y,'black')
    currentAxis = plt.gca()
    currentAxis.set_xlim([-30,30])
    currentAxis.set_ylim([-30,30])
    orig_point = (h,0)
    for a0 in range(n):
        if a0 == n:
            break
        else:
            currentAxis.add_patch(Rectangle(orig_point, (i-h)/float(n), f(orig_point[0] + (i-h)/float(n)), facecolor="blue"))
            orig_point = (h + (a0+1) * (i-h)/float(n),0)
    plt.axhline(0, color='black')
    plt.axvline(0, color='black')
plt.show()
def shade(h,i):
    shade_with_rectangles(1000,h,i)


