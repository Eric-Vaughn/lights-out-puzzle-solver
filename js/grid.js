const DELAY_BETWEEN_CLICKS = 250; // Milliseconds

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

        this.animationTimerId = null; // For animating .solve() sequences
        
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

        // Inject the grid sizes as CSS variables
        this.gridContainer.style.setProperty('--rows', this.rows);
        this.gridContainer.style.setProperty('--cols', this.cols);

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
     * Generates a 2D array version of the grid's current state
     * @returns a 2D array of the grid's current state
     */
    getBoardState() {
    // Create an empty 2D array matching your grid dimensions
    const board = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));
    
    // Find all rendered cells
    const cells = this.gridContainer.querySelectorAll(".cell");
    
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row, 10); // Numeric literal "10" denotes default case: base 10
        const col = parseInt(cell.dataset.col, 10);
        const isOn = cell.dataset.status === "on";
        
        board[row][col] = isOn ? 1 : 0;
    });
    
    return board;
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
     * Creates an array of booleans that represents the on/off states of the last row's cells
     * @returns an array of booleans that represents the on/off states of the last row's cells
     */
    getBottomRowState() {
        let stateArray = Array(this.cols).fill(false);
        let bottomCells = this.gridContainer.querySelectorAll(`[data-row="${this.rows - 1}"]`);

        for (const cell of bottomCells) {
            if (cell.dataset.status === "on") {
                stateArray[cell.dataset.col] = true;
            }
        }

        return stateArray;
    }

    /**
     * Generates a sequence of moves that solves the puzzle, if one exists
     * @param {Array2D} initialBoard - A 2D array of 0's & 1's representing the grid's state
     * @returns a 2D array of moves (where to click) to solve the given puzzle
     */
    solveDynamicChasing(initialBoard) {
        const height = initialBoard.length;
        const width = initialBoard[0].length;
        const maxCombinations = Math.pow(2, width); // 2^W possibilities

        /**
         * Helper to simulate a grid state and chase it down
         * @param {number} firstRowPattern - Number whose 1's & 0's pattern is used as a row-state permutation to try
         * @returns - a 2D array of moves (where to click) if a solution is found, null otherwise
         */
        function tryFirstRowPattern(firstRowPattern) {
            // Clone the original board to avoid modifying it
            let board = initialBoard.map(row => [...row]);
            let moves = Array(height).fill(0).map(() => Array(width).fill(0));

            // Helper to simulate a button press while keeping track of moves
            const press = (row, col) => {
                moves[row][col] ^= 1; // Keep track that we clicked here: [currRow][currCol]

                const directions = [
                    [0, 0],  // Current position
                    [-1, 0], // Row above
                    [1, 0],  // Row below
                    [0, -1], // Column to left
                    [0, 1]   // Column to right
                ];

                directions.forEach(([dr, dc]) => {
                    const newRow = row + dr; // Add our currRow + deltaRow
                    const newCol = col + dc; // Add out currCol + deltaCol
                    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) { // Check boundaries
                        board[newRow][newCol] ^= 1; // Flip on/off state of cell @ [newRow][newCol]
                    }
                });
            };

            // Apply the current combination pattern to the top row (Row 0)
            for (let col = 0; col < width; col++) {
                // Bitwise operations to try this permutation
                if ((firstRowPattern >> col) & 1) {
                    press(0, col);
                }
            }

            // Chase the lights down row by row
            for (let row = 0; row < height - 1; row++) {
                for (let col = 0; col < width; col++) {
                    if (board[row][col] === 1) {
                        press(row + 1, col); // Press directly below to extinguish
                    }
                }
            }

            // Verify if the bottom row is completely cleared
            const isSolved = board[height - 1].every(cell => cell === 0);
            
            return isSolved ? moves : null;
        }

        // Iterate through all 2^W possible top-row setups
        for (let pattern = 0; pattern < maxCombinations; pattern++) {
            const solution = tryFirstRowPattern(pattern);
            if (solution) {
                return solution; // Found a valid sequence of moves!
            }
        }

        return null; // The puzzle is mathematically unsolvable
    }

    /**
     * Solves the puzzle using the Light Chase method
     * @returns void
     */
    solveWithLightChase() {
        // Convert current DOM element states into a 2D matrix
        const currentBoard = this.getBoardState();
        // Generate the solution steps matrix
        const solutionMoves = this.solveDynamicChasing(currentBoard);
        const clickQueue = []; // Will be a queue of cells who need to be clicked

        if (!solutionMoves) {
            alert("This grid configuration is mathematically unsolvable!");
            return;
        }

        // Extract and queue only the cells that need to be clicked
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (solutionMoves[r][c] === 1) {
                    clickQueue.push({ r, c });
                }
            }
        }

        // Execute sequential clicks with a timed delay
        const delayBetweenClicks = 250; // Milliseconds
        
        clickQueue.forEach((target, index) => {
            setTimeout(() => {
                // Find the cell to click using template literals
                const cellToClick = this.gridContainer.querySelector(
                    `[data-row="${target.r}"][data-col="${target.c}"]`
                );
                
                if (cellToClick) { this.flipCellAndNeighbors(cellToClick); } // Click the cell
            }, index * delayBetweenClicks);
        });
    }

    // GENERATED CODE FOR solveWithLinearAlgebra()
    /**
     * Solves the Lights Out puzzle using linear algebra over GF(2).
     * @param {number[][]} grid - 2D array where 1 = light is ON, 0 = light is OFF.
     * @returns {number[][]|null} 2D array indicating which buttons to press (1 = press), or null if unsolvable.
     */
    solveWithLinearAlgebra() {
        const gridArray2D = this.getBoardState();
        const rows = gridArray2D.length;
        const cols = gridArray2D[0].length;
        const n = rows * cols;

        // 1. Create the Augmented Matrix [A | b]
        // Matrix size: n rows, n + 1 columns
        const mat = Array.from({ length: n }, () => new Uint8Array(n + 1));

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                
                // Set the current light state in the augmented column b
                mat[idx][n] = gridArray2D[r][c];

                // Define the 5-point stencil (cell + 4 neighbors)
                const neighbors = [
                    [r, c],     // self
                    [r - 1, c], // top
                    [r + 1, c], // bottom
                    [r, c - 1], // left
                    [r, c + 1]  // right
                ];

                for (const [nr, nc] of neighbors) {
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        const nIdx = nr * cols + nc;
                        mat[idx][nIdx] = 1; // Pressing nIdx toggles idx
                    }
                }
            }
        }

        // 2. Perform Gaussian Elimination over GF(2)
        let pivotRow = 0;
        for (let col = 0; col < n; col++) {
            // Find a pivot row
            let i = pivotRow;
            while (i < n && mat[i][col] === 0) i++;

            if (i === n) continue; // Free variable encountered

            // Swap current row with pivot row
            if (i !== pivotRow) {
                const temp = mat[pivotRow];
                mat[pivotRow] = mat[i];
                mat[i] = temp;
            }

            // Eliminate column elements in all other rows using XOR
            for (let r = 0; r < n; r++) {
                if (r !== pivotRow && mat[r][col] === 1) {
                    for (let c = col; c <= n; c++) {
                        mat[r][c] ^= mat[pivotRow][c];
                    }
                }
            }
            pivotRow++;
        }

        // 3. Back-substitution & Solvability Verification
        const solution = Array.from({ length: rows }, () => new Array(cols).fill(0));
        
        for (let r = 0; r < n; r++) {
            // Find the leading 1 in the row
            let leadingCol = -1;
            for (let c = 0; c < n; c++) {
                if (mat[r][c] === 1) {
                    leadingCol = c;
                    break;
                }
            }

            if (leadingCol === -1) {
                // If row is all zeros but target b is 1, no solution exists
                if (mat[r][n] === 1) return null; 
            } else {
                // Map flat index back to 2D matrix
                const solR = Math.floor(leadingCol / cols);
                const solC = leadingCol % cols;
                solution[solR][solC] = mat[r][n];
            }
        }

        return solution;
    }

}