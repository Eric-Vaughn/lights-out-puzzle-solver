const resetButton = document.getElementById("reset-button");

// Import the shared container from grid.js
import { puzzleGrid } from "./app.js";

resetButton.addEventListener("click", () => {
    console.log("Reset button clicked!");
    puzzleGrid.turnAllCellsOff();
});
