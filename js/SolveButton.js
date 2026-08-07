import { puzzleGrid } from "./app";

const solveButton = document.getElementById("solve-button");

solveButton.addEventListener("click", () => {
    puzzleGrid.solveWithLightChase();
});