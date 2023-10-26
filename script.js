let canvas = document.getElementById('game'), ctx = canvas.getContext('2d'), ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40, dx = 2, dy = -2;

let paddleHeight = 12, paddleWidth = 72;
//Paddle start position
let paddleX = (canvas.width - paddleWidth) / 2;
//Bricks
let rowCount = 5, columnCount = 9, brickWidth = 54, brickHeight = 18, brickPadding = 12, topOffset = 40, leftOffset = 33, score = 0;
//Bricks array
let bricks = [];
for(let i = 0; i < columnCount; i++)
{
    bricks[i] = [];
    for(let k = 0; k < rowCount; k++)
    //Set position of bricks
    {
        bricks[i][k] = { x:0, y:0, status:1 };
    }
}
//Mouse moving eventListener and function
document.addEventListener("mousemove", mouseMoveHandler, false);
//Move paddle with mouse
function mouseMoveHandler(e)
{
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width)
    {
        paddleX = relativeX - paddleWidth / 2;
    }
}
//Draw paddle
function drawPaddle()
{
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
//Draw ball
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
//Draw bricks
function drawBricks()
{
    for(let i = 0; i < columnCount; i++)
    {
        for(let k = 0; k < rowCount; k++)
        {
            if(bricks[i][k].status === 1)
            {
                let brickX = (i * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (k * (brickHeight + brickPadding)) + topOffset;
                bricks[i][k].x = brickX;
                bricks[i][k].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//Track score
function trackScore()
{
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score: ' + score, 8, 24);
}
//Check ball hit bricks
function hitDetection()
{
    for(let i = 0; i < columnCount; i++)
    {
        for(let k = 0; k < rowCount; k++)
        {
            let b = bricks[i][k];
            if(b.status === 1)
            {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
                {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    //Check win
                    if(score === rowCount * columnCount)
                    {
                        alert("You win!!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
//Main function
function init()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    //Detect left and right walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }
    //Detect top wall
    if(y + dy < ballRadius)
    {
        dy = -dy;
    }else if(y + dy > canvas.height - ballRadius)
    {
        //Detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        }else{
            //If ball do not hit paddle
            alert("Game over...");
            document.location.reload();
        }
    }
    //Bottom wall
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius)
    {
        dy = -dy;
    }
    //Move ball
    x += dx;
    y += dy;
}
setInterval(init, 10);