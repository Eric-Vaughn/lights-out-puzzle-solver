export class Grid {
    // Initialize properties and find the DOM element
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

    // Generate the grid cells dynamically
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
                cell.dataset.status = "off";
                
                this.gridContainer.appendChild(cell);
            }
        }
    }

    // Function that flips a single, given cell on/off
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

    // Function to process flipping a cell's neighbors (North, South, East, & West)
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

    // Event Delegation: Listen for clicks on the parent container
    initEventListeners() {
        this.gridContainer.addEventListener("click", (event) => {
            // Ensure the target is actually a cell, not the spaces between them
            const clickedCell = event.target.closest(".cell");
            
            if (!clickedCell) return; 

            // Retrieve row and column details from data attributes
            const r = clickedCell.dataset.row;
            const c = clickedCell.dataset.col;
            
            console.log(`Cell clicked at Row: ${r}, Column: ${c}`);

            this.flipCell(clickedCell);
            this.flipNeighbors(clickedCell);
        });
    }

    turnAllCellsOff() {
        // Find only the cells that are currently "on"
        const activeCells = this.gridContainer.querySelectorAll('.cell[data-status="on"]');
        console.log(`Found ${activeCells.length} active cells to turn off.`);

        // Loop through them and change their status back to "off"
        activeCells.forEach(cell => {
            cell.dataset.status = "off";
            
            // Remove the active CSS class(es) that is styling them
            cell.classList.remove("on"); 
        });
    }
    
}