// Import the shared container from grid.js
import { puzzleGrid } from "./app.js";

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
    console.log("Reset button clicked!");
    puzzleGrid.turnAllCellsOff();
});
