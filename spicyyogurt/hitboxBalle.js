class GameObject {
    constructor(context, x, y, vx, vy) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}
class Square extends GameObject {
    // Set default width and height
    static width = 50;
    static height = 50;

    constructor(context, x, y, vx, vy) {
        super(context, x, y, vx, vy);

    }

    draw() {
        // Draw a simple square
        this.context.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
        this.context.fillRect(this.x, this.y, Square.width, Square.height);
    }

    update(secondsPassed) {
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;


        // Calculate the angle (vy before vx)
        let radians = Math.atan2(this.vy, this.vx);

        // Convert to degrees
        let degrees = 180 * radians / Math.PI;
    }
}

let gameObjects;
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

    createWorld();
    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function createWorld() {
    gameObjects = [
        new Square(context, 250, 50, 0, 50),
        new Square(context, 250, 300, 0, -50),
        new Square(context, 150, 0, 50, 50),
        new Square(context, 250, 150, 50, 50),
        new Square(context, 350, 75, -50, 50),
        new Square(context, 300, 300, 50, -50)
    ];
}


function gameLoop(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Loop over all game objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(secondsPassed);
    }
    detectCollisions();

    //clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Do the same to draw
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }

    window.requestAnimationFrame(gameLoop);
}

function detectCollisions() {
    let obj1;
    let obj2;



    // Reset collision state of all objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].isColliding = false;
    }

    // Start checking for collisions
    for (let i = 0; i < gameObjects.length; i++) {
        obj1 = gameObjects[i];
        for (let j = i + 1; j < gameObjects.length; j++) {
            obj2 = gameObjects[j];

            let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
            let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
            let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
            let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
            let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, Square.width, Square.height, obj2.x, obj2.y, Square.width, Square.height)) {
                obj1.vx -= (speed * vCollisionNorm.x);
                obj1.vy -= (speed * vCollisionNorm.y);
                obj2.vx += (speed * vCollisionNorm.x);
                obj2.vy += (speed * vCollisionNorm.y);
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
}
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2) {
        // collision detected!
        return true;
    }
    return false;

}

