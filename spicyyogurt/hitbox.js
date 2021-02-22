let secondsPassed = 0;
let oldTimeStamp = 0;
let fps;
let rectX = 0;
let rectY = 0;
let movingSpeed = 1;
let timePassed = 0;

window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}
function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    //fps = Math.round(1 / secondsPassed);
    // Draw number to the screen
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, 200, 100);
    // context.font = '25px Arial';
    // context.fillStyle = 'black';
    // context.fillText("FPS: " + fps, 10, 30);



    update(secondsPassed);

    // Perform the drawing operation
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw() {
    // let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    // context.fillStyle = randomColor;
    // context.fillRect(100, 50, 200, 175);
    // Clear the entire canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ff8080';
    context.fillRect(rectX, rectY, 150, 100);
}

// function update(secondsPassed) {
//     // Use time to calculate new position
//     rectX += 1//(movingSpeed * secondsPassed);
//     rectY += 1//(movingSpeed * secondsPassed);
// }


function update(secondsPassed) {

    timePassed += secondsPassed

    // Use different easing functions for different effects.
    rectX = easeInOutQuint(timePassed, 50, 500, 1.5);
    rectY = easeLinear(timePassed, 50, 250, 1.5);
}

// Example easing functions
function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeLinear(t, b, c, d) {
    return c * t / d + b;
}