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
#### Time Spent & Rate of Completion
START DATE: 2026-07-30
END DATE: 2026-08-17
AMOUNT OF DAYS PROJECT WAS ACTIVE: 19
AMOUNT OF DAYS I WORKED ON THE PROJECT: 14

The amount of days spent on this project is far greater than it should have been. Some days I worked on the project for maybe 20 minutes, others 2-4 hours. I'd estimate it took around 9 days worth of work/research for about 3 hours per day. So, 27 total "work hours" for this project — liberally. Which would be 3 workdays (8 hours/day) + 3 extra hours.

Not bad for my first project!
#### AI Usage
I feel as though I used AI ***too*** much throughout the making of this program. I will excuse its usage *this* time simply because this is my first "real" project using HTML, CSS, and JavaScript. AI helped me see all three in action and how they all connect with one another. It helped especially to see JavaScript code that's very "JavaScript-y". Like how people say to code Python in a "Pythonic" way. 

I think AI usage as a tool for learning is better than a crutch for understanding. However, I used it to help with both solve() methods. The Light Chase method was mostly me, but the bit-shifting aspect in the functions' code I never would have thought to use. The only time during this project I truly used AI as a crutch was with the Linear Equations version of the project's solve method; since I don't know much about Linear Equations and would rather this one method not stop me from moving on to another project. Though it would have been nice to wrap my head around a new sector of mathematics, I feel as though now is not the time. Sad, I know.

#### Readability Over Efficiency
A good amount of code in this project forgos more efficient uses of memory for readability. Typically, this is due to making a somewhat "unnecessary" variable. 

For example:
In js/Grid.js the Grid class has a method called `flipNeighbors(cell)`. Here it is:

```
flipNeighbors(cell) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const directions = [
        [-1, 0], // North
        [1, 0],  // South
        [0, -1], // West
        [0, 1]   // East
    ];

    directions.forEach(([dr, dc]) => {
        const newRow = Number(row) + dr;
        const newCol = Number(col) + dc;

        // Query the DOM container for a cell matching the neighboring coordinates
        const neighbor = this.gridContainer.querySelector(
            `[data-row="${newRow}"][data-col="${newCol}"]`
        );

        if (neighbor) {
            this.flipCell(neighbor);
        }
    });
}
```

The variables: `row`, `col`, `newRow`, & `newCol` are all unnecessary. The only variables that are "needed" are `directions` and `neighbor`. `directions` so we aren't using numeric literals that feel arbitrary everywhere and allows us to iterate on the container with a `.forEach(...)` function. `neighbor` being kept in a variable makes it so we don't have to call `this.gridContainer.querySelector(...)` twice the amount of times necessary (once to check if the `neighbor` exists then again to pass that `neighbor` to `this.flipCell(...)`).

Getting rid of the unnecessary variables would make the function look like this:

```
flipNeighbors(cell) {
    const directions = [
        [-1, 0], // North
        [1, 0],  // South
        [0, -1], // West
        [0, 1]   // East
    ];

    directions.forEach(([dr, dc]) => {
        // Query the DOM container for a cell matching the neighboring coordinates
        const neighbor = this.gridContainer.querySelector(
            `[data-row="${Number(cell.dataset.row) + dr}"][data-col="${Number(cell.dataset.col) + dc}"]`
        );

        if (neighbor) {
            this.flipCell(neighbor);
        }
    });
}
```

I like how clean it makes the code to get rid of those variables but at the cost of one line:

`[data-row="${Number(cell.dataset.row) + dr}"][data-col="${Number(cell.dataset.col) + dc}"]`

8 bytes (memory of a number in JavaScript) * 4 (amount of variables we cut out) = 32 bytes of memory saved this way.

I think, especially in an instance like this, the amount of memory saved (efficiency) is outweighed by "glance-able" understanding (readability).

I know this is a pretty basic concept that I'm overexplaining, but there are quite a few similar situations littered throughout this program's code. I thought I'd at least address this in my first "real" project.
### What I Learned
+ I learned a lot of general things about CSS and JavaScript through this project (basics)
+ How HTML, CSS, and JavaScript connect to form a webpage
+ How to organize HTML so CSS can make visualizing its contents better
+ The importing of scripts in HTML using the \<script\> tag
+ The difference between Tags, Classes, & IDs and how they go in that order of specificity for both HTML and CSS
+ Bit-shifting can be used to generate on/off permutations
+ Ternary expressions are in JavaScript
+ How to generate random values in JavaScript
+ How to utilize async functions and how to abort them
    + It's possible to have async class methods!
+ How to write a proper JavaScript docstring for a function
+ Lambda functions such as an Array().forEach(...) function
### What I Need More Practice On
+ DOM elements and their usage
+ Proper usage of .js files. I currently feel as though I've been making them to compartmentalize simple code. I feel like all of my buttons could be inside of one "Buttons.js" file, for example. I understand when things get more complex this compartmentalizing of code is ideal, but all these buttons were doing is calling methods of the grid instance created in app.js. Maybe in a larger scope project I would have a file called "GridButtons.js". That way, other buttons that do more than run a method of a class can be in their own files while method calling buttons would be collected in a single file.
+ The concept of "Promises"
+ More practice of lambda functions. Currently, I feel as though my understanding is still rather [black box](https://en.wikipedia.org/wiki/Black_box)
### Possible Improvments
+ Add a way for the user to set the number of rows and columns
+ Add a toggle to change the solveWithLightChase() button into a solveWithLinearEquations() button
+ Add more design to the HTML & CSS so the webpage isn't as bland
+ Align the left and right columns of HTML content to be flush with each other's top edges
+ ~~During the Solve button's "animation," if the user hits the Reset button, the application resets but keeps trying to solve the previous puzzle (it still runs through the steps it would have done at the time of resetting). **This is a bug and should be fixed**~~
    + Issue resolved!
+ Add a logging system and display that tells the user what the auto-solver is doing