import React from "react";
import "./game.css"
import {database} from "./../../firebase";

class Game extends React.Component {
  state = {
    vertSpeed: 1.2 * this.props.difficulty,
    horizonSpeed: 0.3 * this.props.difficulty,
    bestResults: null
  };

  gameCode = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let ballRadius = 10;
    let ballHorizonSpeed = 0;
    let ballVertSpeed = 0;

    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleSpeed = 7;
    let paddleXLeftCord = (canvas.width - paddleWidth) / 2;

    let ballXCord = canvas.width / 2;
    let ballYCord = canvas.height - 30;

    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickRowCount = 7;
    let brickColumnCount = 3;
    let brickOffsetLeft = ((canvas.width - ((brickWidth + brickPadding) * brickRowCount)) / 2) + 5;

    let seconds = '00';
    let minutes = '00';
    let timeText;

    let chosenHorizonSpeed = this.state.horizonSpeed;
    let chosenVertSpeed = this.state.vertSpeed;

    let rightPressed = false;
    let leftPressed = false;

    let resultsArray;
    let playerData;

    let score = 0;
    let lives = 3;

    let gameWaitingNextLife = false;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(event) {
      if (event.key === "ArrowRight") {
        rightPressed = true;
      } else if (event.key === "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(event) {
      if (event.key === "ArrowRight") {
        rightPressed = false;
      } else if (event.key === "ArrowLeft") {
        leftPressed = false;
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let brick = bricks[c][r];
          if (brick.status === 1) {
            if (ballXCord > brick.x && ballXCord < brick.x + brickWidth && ballYCord > brick.y && ballYCord + 15 < brick.y + brickHeight * 2) {
              ballVertSpeed = -ballVertSpeed;
              brick.status = 0;
              score++;
              if (score === brickRowCount * brickColumnCount) {
                calculateYourPlace();
                alert("Congratulations you won! Your score is " + score + "0 in time of " + timeText);
                document.location.reload();
              }
            }
          }
        }
      }
    }

    const setPlayerData = () => {
      playerData = {
        difficulty: `${this.props.difficulty}`,
        name: `${this.props.userName}`,
        time: timeText
      };
      return playerData;
    };

    const calculateYourPlace = () => {
      setPlayerData();
      resultsArray = this.state.bestResults;
      resultsArray.push(playerData);
      resultsArray.sort((a, b) => a.time > b.time ? 1 : -1);
      resultsArray.length = 5;
      writeUserData();
    };

    const writeUserData = () => {
      database.ref(`/`).set({
        BestResults: resultsArray
      })
    };

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ballXCord, ballYCord, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#525252";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleXLeftCord, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#525252";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#525252D";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#525252";
      ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#525252";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function drawLostLifeWarning() {
      ctx.font = "24px Arial";
      ctx.fillStyle = "#525252";
      ctx.fillText("You lost your life, it is " + lives + " to go, be careful!", 100, canvas.height / 2);
    }

    function drawTime() {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#525252";
      ctx.fillText("Time: " + timeText, canvas.width / 2 - 45, 20);
      timeText = minutes + ' : ' + seconds;
    }

    function timeTextCorrectView() {
      if (seconds === 60) {
        minutes = Number(minutes);
        minutes += 1;
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        seconds = 0;
      }
      if (typeof seconds == 'number' && seconds < 10) {
        seconds = '0' + seconds
      }
    }

    const paddleCollision = () => {
      let ballXRightCord = ballXCord + ballRadius;
      let ballXLeftCord = ballXCord - ballRadius;
      let paddleXRightCord = paddleXLeftCord + paddleWidth;

      if (ballYCord + ballVertSpeed > canvas.height - ballRadius - paddleHeight / 2) {
        if (ballXRightCord > paddleXLeftCord && ballXLeftCord < paddleXRightCord) {
          switch (true) {
            case (ballXCord > paddleXLeftCord && ballXCord < paddleXLeftCord + paddleWidth / 3) :
              ballHorizonSpeed -= 2;
              ballVertSpeed = -ballVertSpeed;
              break;
            case (ballXCord > paddleXLeftCord + (paddleWidth / 3) * 2 && ballXCord < paddleXRightCord) :
              ballHorizonSpeed += 2;
              ballVertSpeed = -ballVertSpeed;
              break;
            default:
              ballVertSpeed = -ballVertSpeed;

          }
        } else {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
          } else {
            gameWaitingNextLife = true;
            ballHorizonSpeed = 0;
            ballVertSpeed = 0;
            ballXCord = canvas.width / 2;
            ballYCord = canvas.height - 60;
            setTimeout(function () {
              gameWaitingNextLife = false;
              ballHorizonSpeed = chosenHorizonSpeed;
              ballVertSpeed = chosenVertSpeed;
              paddleXLeftCord = (canvas.width - paddleWidth) / 2;
            }, 2000);
          }
        }
      }
    };

    function screenLimits() {
      if (ballXCord + ballHorizonSpeed > canvas.width - ballRadius || ballXCord + ballHorizonSpeed < ballRadius) {
        ballHorizonSpeed = -ballHorizonSpeed;
      }
      if (ballYCord + ballVertSpeed < ballRadius) {
        ballVertSpeed = -ballVertSpeed;
      }
      if (rightPressed && paddleXLeftCord < canvas.width - paddleWidth) {
        paddleXLeftCord += paddleSpeed;
      } else if (leftPressed && paddleXLeftCord > 0) {
        paddleXLeftCord -= paddleSpeed;
      }
    }


    const chronograph = () => {
      setInterval(() => {
        if (!this.props.gamePaused)
          seconds++;
        timeTextCorrectView();
      }, 1000);
    };

    let draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (gameWaitingNextLife) {drawLostLifeWarning()}
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
      paddleCollision();
      screenLimits();
      drawTime();
      console.log('draw выполняется');

      ballXCord += ballHorizonSpeed;
      ballYCord += ballVertSpeed;
    };

    setTimeout(() => {
      ballHorizonSpeed = chosenHorizonSpeed;
      ballVertSpeed = chosenVertSpeed;
      chronograph();
    }, 3000);

    setInterval(() => {
      if (!this.props.gamePaused) {
        draw();
      }
    }, 16.6)
  };

  componentDidMount() {
    database.ref('/BestResults').on('value', (snapshot) => {
      this.setState({
        bestResults: snapshot.val()
      })
    });
    this.gameCode();
  }

  render() {
    let canvas = <canvas className={'canvas'} id={'myCanvas'} width="600" height="400"></canvas>
    return (
       <div className={'canvas-wrapper'}>
         {canvas}
       </div>
    );
  }
}

export default Game

