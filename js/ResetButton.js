const resetButton = document.getElementById("reset-button");

// Import the shared container from grid.js
import { gridContainer } from "./grid.js";

resetButton.addEventListener("click", () => {
    console.log("Reset button clicked!");
    // Find only the cells that are currently "on"
    const activeCells = gridContainer.querySelectorAll('.cell[data-status="on"]');
    console.log(`Found ${activeCells.length} active cells to reset.`);

    // Loop through them and change their status back to "off"
    activeCells.forEach(cell => {
        cell.dataset.status = "off";
        
        // Remove any active CSS classes you might be using to style them
        cell.classList.remove("on"); 
    });
});
