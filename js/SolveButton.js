import { puzzleGrid } from "./app.js";

const solveButton = document.getElementById("solve-button");

solveButton.addEventListener("click", () => {
    puzzleGrid.solveWithLightChase();
});