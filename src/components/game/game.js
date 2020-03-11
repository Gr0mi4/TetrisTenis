import React from "react";
import "./game.css"

class Game extends React.Component {
  state = {
    vertSpeed: 1.2*this.props.difficulty,
    horizonSpeed: 0.0*this.props.difficulty
  };

  gameCode = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let ballRadius = 10;
    let ballHorizonSpeed = 0;
    let ballVertSpeed = 0;

    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleSpeed = 1;
    let paddleX = (canvas.width - paddleWidth) / 2;

    let ballXCord = canvas.width / 2;
    let ballYCord = canvas.height - 30;

    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickRowCount = 7;
    let brickColumnCount = 3;
    let brickOffsetLeft = ((canvas.width - ((brickWidth+brickPadding)*brickRowCount))/2)+5;


    let chosenHorizonSpeed = this.state.horizonSpeed;
    let chosenVertSpeed = this.state.vertSpeed;

    let rightPressed = false;
    let leftPressed = false;


    let score = 0;
    let lives = 3;

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
            if (ballXCord > brick.x && ballXCord < brick.x + brickWidth && ballYCord > brick.y && ballYCord+15 < brick.y + brickHeight*2) {
              ballVertSpeed = -ballVertSpeed;
              brick.status = 0;
              score++;
              if (score === brickRowCount * brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ballXCord, ballYCord, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#525252";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
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

    function paddleCollision() {
      if (ballYCord + ballVertSpeed > canvas.height - ballRadius - paddleHeight/2) {
        if (ballXCord+ballRadius > paddleX && ballXCord-ballRadius < paddleX + paddleWidth) {
          ballVertSpeed = -ballVertSpeed;
        } else {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
          } else {
            ballXCord = canvas.width / 2;
            ballYCord = canvas.height - 30;
            ballHorizonSpeed = chosenHorizonSpeed;
            ballVertSpeed = chosenVertSpeed;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }
    }

    function screenLimits() {
      if (ballXCord + ballHorizonSpeed > canvas.width - ballRadius || ballXCord + ballHorizonSpeed < ballRadius) {
        ballHorizonSpeed = -ballHorizonSpeed;
      }
      if (ballYCord + ballVertSpeed < ballRadius) {
        ballVertSpeed = -ballVertSpeed;
      }
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
      }
    }

    let draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
      paddleCollision();
      screenLimits();

      ballXCord += ballHorizonSpeed;
      ballYCord += ballVertSpeed;
    };

    setTimeout( () => {
      ballHorizonSpeed = chosenHorizonSpeed;
      ballVertSpeed = chosenVertSpeed;
    }, 3000);

    return(
       setInterval( () => {
         if (!this.props.gamePaused) {
           draw();
         }
       }, 16.6)
    )
  };

  componentDidMount() {
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

