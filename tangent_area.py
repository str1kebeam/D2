import numpy as np  
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
x = np.linspace(-30,30,200)  
def f(x):             #Function to be plotted
    return np.arctan(x)
y = f(x)
def draw_tangent(i):
    '''
    Does the same thing as draw_secant except the 
    difference between the two points is a neglibibly
    small amount for visual purposes. Displayed derivative
    will be calculated exactly. 
    '''
    draw_secant(i,0.0001)    #0.0001 is the difference between x-value points
def draw_secant(i,dx):
    '''
    Draws tangent line to the given function based on 
    given x-value by calculating the line between a point
    on the function and another point on the function whose 
    x-values are a given difference away.  
    '''
    axes = plt.gca()    #Matplotlib object for plot axes
    axes.set_xlim([-20,20])      #Limit for x and y ranges visually 
    axes.set_ylim([-20,20])
    plt.axhline(0, color='black')  #Draw axes
    plt.axvline(0, color='black')
    plt.plot(x,y,'black')          #Plot function
    dx = (f(i + float(dx)) - f(i))/(float(dx)) * (x - i) + (f(i))
    '''
    Calculation of line formula using point slope form
    '''
    plt.plot(x,dx,'red') #Plot tangent line

def shade_with_rectangles(n,h,i):
    '''
    Draws rectangles under function using matplotlib's rectangle 
    function. Sets (h,0) as a relative point, and draws rectangles 
    based on a loop. The number of rectangles is n, and the boundary 
    of shading is from 'h' to 'i'. 
    '''
    plt.plot(x,y,'black')    #Plot function
    currentAxis = plt.gca()
    currentAxis.set_xlim([-30,30])
    currentAxis.set_ylim([-30,30])
    plt.axhline(0, color='black')     #Plots axes
    plt.axvline(0, color='black')
    orig_point = (h,0)        #Pivot point to start drawing rectangles
    for a0 in range(n):
        currentAxis.add_patch(Rectangle(orig_point, (i-h)/float(n), f(orig_point[0] + (i-h)/float(n)), facecolor="blue"))
        orig_point = (h + (a0+1) * (i-h)/float(n),0)
        '''
        Rectangle is drawn from bottom left corner, giving horizontal 
        length first, and then vertical length. Change in x is given by 
        the length of the boundary over the number of rectangles, and 
        height in either direction is given by the y - value of the next 
        x - value on the function. 
        '''
def shade(h,i):
    '''
    Does same thing as shade_with_rectangles,
    but the number of rectangles under the 
    function is negligibly large.  
    '''
    shade_with_rectangles(1000,h,i)
plt.show()
#Displays graph, will save it to new file soon
