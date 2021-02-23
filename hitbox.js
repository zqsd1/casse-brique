var canvas;
var ctx
var secondsPassed = 0;
var oldTimeStamp = 0;
window.onload = init()

function init() {

    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

    }
    window.requestAnimationFrame(loop)
}

function loop(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    balle.mouvement();
    collision();
    draw();
    window.requestAnimationFrame(loop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.save();
    ctx.rect(brique.x, brique.y, brique.w, brique.h);
    ctx.fillStyle = brique.collide ? "orange" : "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.restore();
    ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
    ctx.fill();

}

var brique = {
    x: 150,
    y: 150,
    w: 100,
    h: 150,
    collide: false
}

var balle = {
    r: 10,
    x: 10,
    y: 10,
    vx: 4,
    vy: 5,
    mouvement: function () {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width || this.x < 0)
            this.vx = -this.vx;

        if (this.y > canvas.height || this.y < 0)

            this.vy = -this.vy;
    }
}


function collision() {
    brique.collide = false
    var testX = balle.x;
    var testY = balle.y;

    if (balle.x < brique.x)
        //viens de la gauche
        testX = brique.x;
    else if (balle.x > brique.x + brique.w)
        //vien de la droite
        testX = brique.x + brique.w;

    if (balle.y < brique.y)
        //viens du haut 
        testY = brique.y;
    else if (balle.y > brique.y + brique.h)
        //viens du bas
        testY = brique.y + brique.h

    var distX = balle.x - testX;
    var distY = balle.y - testY;

    var distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= balle.r)
        brique.collide = true;

}
