document.getElementById("easy").addEventListener("click", function () {
  hideAllContent(); // ყველა დივის დამალვა
  document.getElementById("easy-content").style.display = "block"; // გამოვაჩინო დონე რომელსაც ირჩევს
  startGame("easy");
});
document.getElementById("medium").addEventListener("click", function () {
  hideAllContent();
  document.getElementById("medium-content").style.display = "block";
  startGame("medium");
});

document.getElementById("difficult").addEventListener("click", function () {
  hideAllContent();
  document.getElementById("difficult-content").style.display = "block";
  startGame("difficult");
});
function hideAllContent() {
  let contentDivs = document.querySelectorAll(".content");
  contentDivs.forEach(function (div) {
    div.style.display = "none";
  });
}

function startGame(level) {
  let colorNames;
  let colorBigBoxSelector;

  if (level === "easy") {
    colorNames = ["red", "yellow", "green", "black"];
    colorBigBoxSelector = "#easy-content .colorBigBox";
  } else if (level === "medium") {
    colorNames = ["red", "yellow", "green", "black", "blue", "purple"];
    colorBigBoxSelector = "#medium-content .colorBigBox";
  } else if (level === "difficult") {
    colorNames = [
      "red",
      "yellow",
      "green",
      "black",
      "blue",
      "purple",
      "orange",
      "cyan",
      "magenta",
      "brown",
    ];
    colorBigBoxSelector = "#difficult-content .colorBigBox";
  }

  console.log("colorBigBoxSelector:", colorBigBoxSelector);

  let colorIndex = Math.floor(Math.random() * colorNames.length);
  let targetColor = colorNames[colorIndex];
  let colorBigBox = document.querySelector(colorBigBoxSelector);

  console.log("colorBigBox:", colorBigBox);

  if (colorBigBox) {
    colorBigBox.style.backgroundColor = targetColor;
    console.log("Target color:", targetColor);
  } else {
    console.error("Failed to select colorBigBox");
  }

  let score = 0;
  let scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = "Score: " + score;

  let messageDisplay = document.getElementById("message");

  let answerButtons = document.querySelectorAll(".answers button");
  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let chosenColor = this.dataset.color;
      if (chosenColor === targetColor) {
        score++;
        messageDisplay.textContent = "სწორია <3";
      } else {
        score--;
        messageDisplay.textContent = "არასწორი პასუხი";
      }
      scoreDisplay.textContent = "Score: " + score;

      // შევამოწმოთ მოიგო თუ წააგო
      if (score >= 4) {
        messageDisplay.textContent = "Congratulations! You won!";
        score = 0;
        scoreDisplay.textContent = "Score: " + score;
      }
      if (score <= -4) {
        messageDisplay.textContent = "სამწუხაროდ დამარცხი, კიდევ სცადე ";
        score = 0;
        scoreDisplay.textContent = "Score: " + score;
      } else {
        // გააგრძელოს ახალი ფერების გამოჩენა
        colorIndex = Math.floor(Math.random() * colorNames.length);
        targetColor = colorNames[colorIndex];
        colorBigBox.style.backgroundColor = targetColor;
      }
    });
  });

  // Add event listener to the "Next" button
  //   let nextButton = document.getElementById("next");
  //   nextButton.addEventListener("click", function () {
  //     // Move to the next level
  //     levelIndex = (levelIndex + 1) % colorLevels.length;
  //     colorNames = colorLevels[levelIndex]; // Update color names for the next level
  //     // Generate new target color
  //     colorIndex = Math.floor(Math.random() * colorNames.length);
  //     targetColor = colorNames[colorIndex];
  //     colorBigBox.style.backgroundColor = targetColor;
  //     messageDisplay.textContent = ""; // Clear any previous messages
  //   });
}
