export const gridContainer = document.getElementById("grid-container");
const ROWS = 8;
const COLS = 8;

// Generate the grid cells dynamically
for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        
        // Store coordinates directly on the DOM element
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.status = "off";
        
        gridContainer.appendChild(cell);
    }
}

// Event Delegation: Listen for clicks on the parent container
gridContainer.addEventListener("click", (event) => {
    // Ensure the target is actually a cell, not the spaces between them
    const clickedCell = event.target.closest(".cell");
    
    if (!clickedCell) return; 

    // Retrieve row and column details from data attributes
    const r = clickedCell.dataset.row;
    const c = clickedCell.dataset.col;
    
    console.log(`Cell clicked at Row: ${r}, Column: ${c}`);

     // Toggle the status string and the visual class
    if (clickedCell.dataset.status === "off") { // If off --> turn on
        clickedCell.dataset.status = "on";
        clickedCell.classList.add("on");
    } else {
        clickedCell.dataset.status = "off";
        clickedCell.classList.remove("on");
    }
});
