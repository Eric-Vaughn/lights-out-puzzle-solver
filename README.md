# Lights Out Puzzle Solver
This interactive application allows you to click anywhere on the puzzle grid to design and solve puzzles. It also has buttons and configurable settings to play around with!

## Instructions to run the application
1. Clone the repo to your local machine
2. Using Visual Studio Code, have/install the extenstion: [Live Preview](vscode:extension/ms-vscode.live-server)
3. Open the repo in Visual Studio Code
4. Right-click the repo's "index.html" file and select "Open with Live Server"
    + This will open the application in a new window in your default browser

## Demo files explained
Files that have the term "demo" appended to them are generated code. These files are meant help me see HTML, CSS, and JavaScript in action, since this is the first application I am creating using them.

## Inspiration for this project
Inspiration for this project is from a Youtube video I watched called:
[Solving Lights Out Puzzles | Light Chasing vs Linear Algebra](https://www.youtube.com/watch?v=rQtRK-AJOGg)

Seeing <@Random Noise>'s video made me want to do a visualization of the solving algorithm of Lights Out puzzles!

## Reflection
### General Thoughts
I feel as though I used AI ***too*** much throughout the making of this program. I will excuse its usage *this* time simply because this is my first "real" project using HTML, CSS, and JavaScript. AI helped me see all three in action and how they all connect with one another. It helped especially to see JavaScript code that's very "JavaScript-y". Like how people say to code Python in a "Pythonic" way. 

I think AI usage as a tool for learning is better than a crutch for understanding. However, I used it to help with both solve() methods. The Light Chase method was mostly me, but the bit-shifting aspect in the functions' code I never would have thought to use. The only time during this project I truly used AI as a crutch was with the Linear Equations version of the project's solve method; since I don't know much about Linear Equations and would rather this one method not stop me from moving on to another project. Though it would have been nice to wrap my head around a new sector of mathematics, I feel as though now is not the time. Sad, I know.
### What I Learned
+ I learned a lot of general things about CSS and JavaScript through this project (basics)
+ How HTML, CSS, and JavaScript connect to form a webpage
+ The importing of scripts in HTML using the <script> tag
+ How to organize HTML so CSS can make visualizing its contents better
+ Bit-shifting can be used to generate on/off permutations
+ Ternary expressions are in JavaScript
### What I Need More Practice On
+ DOM elements and their usage
+ Proper usage of .js files. I currently feel as though I've just been making them to compartmentalize simple code. I feel like all of my buttons could be inside of one "Buttons.js" file, for example. I understand when things get more complex, this compartmentalizing of code is ideal, but all these buttons were doing is calling methods of the grid instance created in app.js. Maybe in a larger scope project I would have a file called "GridButtons.js". That way, other buttons that do more than run a method of a class can be in their own files while method calling buttons would be collected in a single file.
### Possible Improvments
+ Add a way for the user to set the number of rows and columns
+ Add a toggle to change the solveWithLightChase() button into a solveWithLinearEquations() button
+ Add more design to the HTML & CSS so the webpage isn't as bland
+ Align the left and right columns of HTML content to be flush with each other's top edges
+ ~~During the Solve button's "animation," if the user hits the Reset button, the application resets but keeps trying to solve the previous puzzle (it still runs through the steps it would have done at the time of resetting). **This is a bug and should be fixed**~~
    + Issue resolved!
+ Add a logging system and display that tells the user what the auto-solver is doing