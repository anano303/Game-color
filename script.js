let score = 0;
let level;

let timer;
const levelTimes = {
  easy: 1500,
  medium: 2000,
  difficult: 3000,
};

function hideAllContent() {
  let contentDivs = document.querySelectorAll(".content");
  contentDivs.forEach(function (div) {
    div.style.display = "none";
  });
}

function startGame(level) {
  clearTimeout(timer);
  let colorNames, colorBigBoxSelector;
  if (level === "easy") {
    colorNames = ["red", "yellow", "green", "black"];
    colorBigBoxSelector = "#easy-content .colorBigBox";
    timer = setTimeout(function () {
      alert("შენ დამარცხდი! დრო ამოიწურა");
      score = 0;
      document.querySelector(`#${level}-content .score`).textContent =
        "Score: " + score;
    }, 20000);
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
      "pink",
    ];
    colorBigBoxSelector = "#difficult-content .colorBigBox";
  }

  let colorIndex = Math.floor(Math.random() * colorNames.length);
  let targetColor = colorNames[colorIndex];
  let colorBigBox = document.querySelector(colorBigBoxSelector);
  if (colorBigBox) {
    colorBigBox.style.backgroundColor = targetColor;
  } else {
    console.error("Failed to select colorBigBox");
  }

  let scoreDisplay = document.querySelector(`#${level}-content .score`);
  let messageDisplay = document
    .getElementById(`${level}-content`)
    .querySelector("#message");

  let answerButtons = document.querySelectorAll(
    `#${level}-content .answers button`
  );
  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      clearTimeout(timer);
      let chosenColor = this.dataset.color;
      if (chosenColor === targetColor) {
        score++;
        messageDisplay.textContent = "სწორია <3";
      } else {
        score--;
        messageDisplay.textContent = "არასწორი პასუხი";
      }
      scoreDisplay.textContent = "Score: " + score;

      if (
        (level === "easy" && score >= 4) ||
        (level === "medium" && score >= 8) ||
        (level === "difficult" && score >= 11)
      ) {
        messageDisplay.textContent =
          "გილოცავ, მოიგე! შეგიძლია გადახვიდე შემდეგ ეტაპზე";
        // score = 0;
        scoreDisplay.textContent = "Score: " + score;
      } else if (
        (level === "easy" && score <= -4) ||
        (level === "medium" && score <= -8) ||
        (level === "difficult" && score <= -11)
      ) {
        messageDisplay.textContent = "სამწუხაროდ დამარცხი, კიდევ სცადე ";
        score = 0;
        scoreDisplay.textContent = "Score: " + score;
      } else {
        colorIndex = Math.floor(Math.random() * colorNames.length);
        targetColor = colorNames[colorIndex];
        colorBigBox.style.backgroundColor = targetColor;

        timer = setTimeout(function () {
          alert("You lost! Time's up!");
          score = 0;
          scoreDisplay.textContent = "Score: " + score;
        }, levelTimes[level]);
      }
    });
  });

  let nextButton = document.querySelector(`#${level}-content .next`);
  nextButton.addEventListener("click", function () {
    clearTimeout(timer);
    if (
      (level === "easy" && score >= 4) ||
      (level === "medium" && score >= 8) ||
      (level === "difficult" && score >= 11)
    ) {
      let nextLevel;
      score = 0;
      if (level === "easy") {
        nextLevel = "medium";
      } else if (level === "medium") {
        nextLevel = "difficult";
      } else {
        alert("შენ უკვე დახურე თამაში!");
        return;
      }

      hideAllContent();

      let nextLevelContent = document.getElementById(`${nextLevel}-content`);
      if (nextLevelContent) {
        nextLevelContent.style.display = "block";
        startGame(nextLevel);
      } else {
        console.error("Next level content not found!");
      }
    } else {
      alert(
        "ჯერ არ მოგიგია , შემდეგ ეტაპზე გადასვლას შეძლებ ამ ეტაპის დახურვის შემდეგ"
      );
    }
  });
}

document.getElementById("easy").addEventListener("click", function () {
  hideAllContent();
  document.getElementById("easy-content").style.display = "block";
  startGame("easy");
  level = "easy";
});

document.getElementById("medium").addEventListener("click", function () {
  hideAllContent();
  document.getElementById("medium-content").style.display = "block";
  startGame("medium");
  level = "medium";
});

document.getElementById("difficult").addEventListener("click", function () {
  hideAllContent();
  document.getElementById("difficult-content").style.display = "block";
  startGame("difficult");
  level = "difficult";
});

document.querySelectorAll(".new-game").forEach((button) => {
  button.addEventListener("click", function () {
    location.reload();
  });
});
