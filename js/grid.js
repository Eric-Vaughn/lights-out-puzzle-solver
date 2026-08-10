export class Grid {
    /**
     * Initializes a new instance of the Grid class
     * @param {string} containerId 
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(containerId, rows = 8, cols = 8) {
        this.gridContainer = document.getElementById(containerId);
        this.rows = rows;
        this.cols = cols;
        
        // Safety check to ensure the DOM element exists
        if (!this.gridContainer) {
            console.error(`Element with ID "${containerId}" not found.`);
            return;
        }

        // Automatically build the grid upon instantiation
        this.render();
        // Initialize event listeners immediately after rendering
        this.initEventListeners();
    }

    /**
     * Generates the grid cells dynamically
     * @returns void
     */ 
    render() {
        // Clear any existing content inside the container
        this.gridContainer.innerHTML = "";

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                
                // Store coordinates directly on the DOM element
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.status = "off"; // Can only be "off" or "on"
                
                this.gridContainer.appendChild(cell);
            }
        }
    }

    /**
     * Flips the given cell on/off
     * @param {Node} cell
     * @returns void 
     */
    flipCell(cell) {
        // Toggle the status string and the visual class
        if (cell.dataset.status === "off") { // If off --> turn on
            cell.dataset.status = "on";
            cell.classList.add("on");
        } else {
            cell.dataset.status = "off";
            cell.classList.remove("on");
        }
    }

    /**
     * Flips a given cell's cardinal neighbors (North, South, East, & West)
     * @param {Node} cell 
     * @returns void
     */
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

    /**
     * Flips the state of the given cell and it's four cardinal neighbors
     * @param {Node} cell 
     * @returns void
     */
    flipCellAndNeighbors(cell) {
        this.flipCell(cell);
        this.flipNeighbors(cell);
    }

    /**
     * Listen for clicks on the parent container
     * @returns void
     */
    initEventListeners() {
        this.gridContainer.addEventListener("click", (event) => {
            // Ensure the target is actually a cell, not the spaces between them
            const clickedCell = event.target.closest(".cell");
            
            if (!clickedCell) return; 

            // Retrieve row and column details from data attributes
            const r = clickedCell.dataset.row;
            const c = clickedCell.dataset.col;
            
            console.log(`Cell clicked at Row: ${r}, Column: ${c}`);

            this.flipCellAndNeighbors(clickedCell);
        });
    }

    /**
     * Turns all "on" cells "off".
     * @returns void
     */
    turnAllCellsOff() {
        // Find only the cells that are currently "on"
        const activeCells = this.gridContainer.querySelectorAll('.cell[data-status="on"]');
        console.log(`Found ${activeCells.length} active cells to turn off.`);

        // Loop through them and change their status back to "off"
        activeCells.forEach(cell => {
            this.flipCell(cell);
        });
    }
    
    /**
     * Generates a random layout for the grid. Not garrenteed to be solvable.
     * @returns void
     */
    genRandomLayout() {
        const PERCENT_CELLS_TO_FILP = 0.15; // The percentage of total cells to randomly flip
        // TotalCells * PercentToFlip --> Floor() it and ensure it is a Number not a Float
        let numOfCellsToFlipOn = Number(Math.floor((this.rows * this.cols) * PERCENT_CELLS_TO_FILP));
        let randRowIndex;
        let randColIndex;
        let randChosenCell;
        
        // Reset grid to an "off" state
        this.turnAllCellsOff();

        // Loop until control variable === 0
        while (numOfCellsToFlipOn) {
            randRowIndex = Math.floor(Math.random() * this.rows); // 0...rows exclusive
            randColIndex = Math.floor(Math.random() * this.cols); // 0...cols exclusive
            randChosenCell = this.gridContainer.querySelector(`[data-row="${randRowIndex}"][data-col="${randColIndex}"]`);

            if (randChosenCell.dataset.status === "off") {
                this.flipCell(randChosenCell);
                numOfCellsToFlipOn--;
            }
        }
    }

    /** 
     * Clears the given row of "on" cells by turning them off
     * @param {number} row: The row (index) to be cleared. Must NOT be the last row of the grid.
     * @returns void
    */
    clearRow(row) {
        let cellsToBeProcessed = this.gridContainer.querySelectorAll(`[data-row="${row}"][data-status="${"on"}"]`);
        let cellsToFlip = [];
        
        // To clear the given row, we need to flip the cells underneath any "on" cells in our current row. So find them...
        for (const cell of cellsToBeProcessed) {
            cellsToFlip.push(
                this.gridContainer.querySelector(
                    `[data-row="${Number(cell.dataset.row) + 1}"][data-col="${Number(cell.dataset.col)}"]`));
        }

        // ... then flip them
        cellsToFlip.forEach(cell => { this.flipCellAndNeighbors(cell); });
    }

    /**
     * Solves the puzzle using the Light Chase method
     * @returns void
     */
    solveWithLightChase() {
        /**
         * @TODO Finish this function b. If you wanna test clearRow() again, add it under this docstring.
         * RECALL: Loop until the last row, but DO NOT PROCESS the last row. Check if it's in a solved configuation. Augment only if such.
         */

        // Create an array[] of booleans to rep. permutations
        let permutationArray = Array(this.cols).fill(false);
        console.log(permutationArray);

        // Loop, clearing all rows but last one using clearRow()
        // until last row can be checked
        for (let i = 0; i < this.rows - 1; i++) { // -1 = index of second to last row
            this.clearRow(i);
        }

        // Check last row - HARD FUNCTIONALITLY. Functionalize this, I feel

        // Go through all permutations of first row's configuation - look ahead? recursion?
    }
}