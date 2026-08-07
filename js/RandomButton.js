import { puzzleGrid } from "./app.js";

const randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", () => {
    console.log("Random button clicked!");
    puzzleGrid.genRandomLayout();
});