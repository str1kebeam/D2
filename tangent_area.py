'''
Name: Prahlad Jasti
Course: CSE
Assignment:  Tangent Line and Integration 
Purpose - To display the tangent line to a graph and the area under it
          based on certain preset boundaries. 
'''
import numpy as np  
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon
x = np.linspace(-30,30,200)  
def f(x):             #Function to be plotted
    return x ** 2
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
def shade_with_rectangles(n,h,i,orientation):
    '''
    Draws rectangles under function using matplotlib's rectangle 
    function. Sets (h,0) as a relative point, and draws rectangles 
    based on a loop. The number of rectangles is n, and the boundary 
    of shading is from 'h' to 'i'. 
    '''
    plt.plot(x,y,'black')    #Plot function
    currentAxis = plt.gca()
    currentAxis.set_xlim([-20,20])
    currentAxis.set_ylim([-100,100])
    plt.axhline(0, color='black')     #Plots axes
    plt.axvline(0, color='black')
    if orientation == 'right':
        orig_point = (h,0)        #Pivot point to start drawing rectangles
        for a0 in range(n+1):
            currentAxis.add_patch(Rectangle(orig_point, (i-h)/float(n), f(orig_point[0] + (i-h)/float(n)), facecolor="blue"))
            orig_point = (h + (a0+1) * (i-h)/float(n),0)
        '''
        Rectangle is drawn from bottom left corner, giving horizontal 
        length first, and then vertical length. Change in x is given by 
        the length of the boundary over the number of rectangles, and 
        height in either direction is given by the y - value of the next 
        x - value on the function. 
        '''
    elif orientation == 'left':
        orig_point = (h,0)        #Pivot point to start drawing rectangles
        for a0 in range(n):
            currentAxis.add_patch(Rectangle(orig_point, (i-h)/float(n), f(orig_point[0]), facecolor="red"))
            orig_point = (h + (a0+1) * (i-h)/float(n),0)
def shade(h,i):
    '''
    Does same thing as shade_with_rectangles,
    but the number of rectangles under the 
    function is negligibly large.  
    '''
    shade_with_rectangles(600,h,i,"right")

def demo():
    '''
    Asks user what operation they want to use and
    what parameters they want.
    '''
    print("Which option would you like to choose for the function? The current graph is x ^ 2.\n")
    for option in ['tangent','secant','approximate shade with rectangles','shade','quit']:
        print(option + '\n')
    o = raw_input('>>>')
    if o in ['tangent','tan']:
        tangent_point = raw_input('At what x-value of the graph would you like to draw a tangent at?\n>>>')
        draw_tangent(int(tangent_point))
        plt.show()
        #Displays graph, will save it to new file soon
    elif o in ['secant','sec']:
        secant_point = raw_input('At what x-value of the graph would you like to draw a secant from?\n>>>')
        difference = raw_input('How far away from the original point would you like to draw the secant to?\nThis value can not be zero, but it can be negative.\n>>>')
        draw_secant(int(secant_point),int(difference))
        plt.show()
    elif o in ['approximate','approximation','rectangles','shade with rectangles','approximate shade with rectangles','rect']:
        num_rectangles = raw_input('How many rectangles would you like to draw under the graph?\n>>>')
        lower = raw_input('Enter the lower boundary for the shading.\n>>>')
        upper = raw_input('Enter the upper boundary for the shading.\n>>>')
        orientation = raw_input('Would you like to use a right hand or left hand approximation?\n>>>')
        shade_with_rectangles(int(num_rectangles),int(lower),int(upper),orientation)
        plt.show()
    elif o in ['shade','integrate']:
        lower = raw_input('Enter the lower boundary for the shading.\n>>>')
        upper = raw_input('Enter the upper boundary for the shading.\n>>>')
        shade(int(lower),int(upper))
        plt.show()
    elif o == 'quit':
        print('Thank you for using the Derive graph utility.\n')   
    else:
        print('That is not a valid operation')   
