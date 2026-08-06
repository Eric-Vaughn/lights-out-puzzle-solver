# TO-DO
## General TO-DO
+ ✅ Make a working, click-able grid
## HTML
+ ✅ Basic stucture / boilerplate HTML code
+ Allow for 3 columns for the webapp's structure. Right, Middle, and Left
+ Add a description of application (right side bar/column? Link to my Github & such?)
+ Add another column to the right for configuring settings and what-not (buttons will go there, etc.)
## CSS
+ ✅ Make "on-light" color = yellow
+ ✅ Make "off-light" color = ~~black~~ grey
+ ✅ Visualize grid-container
+ ✅ Visualize reset-button
+ ✅ Add hover affects to reset-button
## JavaScript
+ ✅ Add clicking on grid
+ ✅ Add "lights out" functionality to clicking on a grid cell (flips state of surrounding cells)
+ ✅ Provide a reset button
+ ✅ Add a "new" method to Grid.js class that is the ResetButton.js's functionality (clear all cells to an off state). Then, ResetButton.js will only need to call on that method. Potential names for method: "turnGridOff", "resetGrid", "turnAllCellsOff"
+ Have a variable "showSteps" where the user can select to see a full visulzation of the algorithm they chose, or they can just get the result. Needs a good, boolean-esk var name
+ Add a new method to Grid.js class. It will randomly select a few cells to have on (randomly populate with on cells). There should be a sparse number generated. Potential names for method: ""
+ Add a new button called something akin to "Randomize". It will simply call the above TO-DO entry's method. (Mention it is random to the user --> not guaranteed to be solvable)