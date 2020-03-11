import React from "react";
import "./game.css"

class Game extends React.Component {
  state = {
    vertSpeed: 1.2*this.props.difficulty,
    horizonSpeed: 0.6*this.props.difficulty
  };

  gameCode = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let ballHorizonSpeed = 0;
    let ballVertSpeed = 0;
    let chosenHorizonSpeed = this.state.horizonSpeed;
    let chosenVertSpeed = this.state.vertSpeed;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 5;
    let brickColumnCount = 3;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
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

    function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          if (b.status == 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              ballVertSpeed = -ballVertSpeed;
              b.status = 0;
              score++;
              if (score == brickRowCount * brickColumnCount) {
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
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
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
          if (bricks[c][r].status == 1) {
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

    function screenLimits() {
      if (x + ballHorizonSpeed > canvas.width - ballRadius || x + ballHorizonSpeed < ballRadius) {
        ballHorizonSpeed = -ballHorizonSpeed;
      }
      if (y + ballVertSpeed < ballRadius) {
        ballVertSpeed = -ballVertSpeed;
      } else if (y + ballVertSpeed > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          ballVertSpeed = -ballVertSpeed;
        } else {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            ballHorizonSpeed = chosenHorizonSpeed;
            ballVertSpeed = chosenVertSpeed;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
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
      screenLimits();

      x += ballHorizonSpeed;
      y += ballVertSpeed;
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
    let canvas = <canvas className={'canvas'} id={'myCanvas'} width="480" height="320"></canvas>
    return (
       <div className={'canvas-wrapper'}>
         {canvas}
       </div>
    );
  }
}

export default Game

