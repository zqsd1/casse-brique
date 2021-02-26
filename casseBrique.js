var canvas;
var ctx
var secondsPassed = 0;
var oldTimeStamp = 0;
var nbBriqueX = 15;
var nbBriqueY = 30
var briques = [

];
var balle = {
    r: 10,
    x: 120,
    y: 10,
    vx: 100,
    vy: 200,
    mouvement: function () {

        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        if (this.x > canvas.width || this.x < 0) {

            this.vx = -this.vx;
        }

        if (this.y > canvas.height || this.y < 0) {


            this.vy = -this.vy;
        }
    }
}


var lvl1 = [{ "x": 8, "y": 1 }, { "x": 6, "y": 1 }, { "x": 6, "y": 3 }, { "x": 8, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 1 }, { "x": 8, "y": 6 }, { "x": 4, "y": 8 }, { "x": 1, "y": 6 }, { "x": 1, "y": 12 }, { "x": 10, "y": 10 }, { "x": 12, "y": 10 }, { "x": 13, "y": 6 }, { "x": 13, "y": 2 }]
var lvl2 =
    [{ "x": 1, "y": 3 }, { "x": 2, "y": 3 }, { "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 11, "y": 3 }, { "x": 11, "y": 4 }, { "x": 11, "y": 5 }, { "x": 11, "y": 6 }, { "x": 11, "y": 7 }, { "x": 11, "y": 8 }, { "x": 10, "y": 8 }, { "x": 9, "y": 8 }, { "x": 6, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 2, "y": 8 }, { "x": 1, "y": 8 }]
var lvl3 = [{ "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 4 }, { "x": 10, "y": 5 }, { "x": 10, "y": 6 }, { "x": 10, "y": 7 }, { "x": 9, "y": 7 }, { "x": 8, "y": 7 }, { "x": 7, "y": 7 }, { "x": 6, "y": 7 }, { "x": 5, "y": 7 }, { "x": 4, "y": 7 }, { "x": 3, "y": 7 }, { "x": 3, "y": 5 }, { "x": 3, "y": 6 }, { "x": 3, "y": 4 }, { "x": 3, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 10, "y": 8 }, { "x": 10, "y": 9 }, { "x": 10, "y": 10 }, { "x": 9, "y": 10 }, { "x": 8, "y": 10 }, { "x": 7, "y": 10 }, { "x": 6, "y": 10 }, { "x": 5, "y": 10 }, { "x": 4, "y": 10 }, { "x": 3, "y": 10 }, { "x": 3, "y": 9 }, { "x": 5, "y": 9 }, { "x": 4, "y": 9 }]

document.onload = init()

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

    briques.forEach(brique => {
        ctx.beginPath();
        ctx.save();
        ctx.rect(brique.x, brique.y, brique.w, brique.h);
        ctx.fillStyle = brique.collide ? "orange" : "blue";
        ctx.fill();
        ctx.restore();
    });


    ctx.beginPath();
    ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
    ctx.fill();

}
lvl3.forEach(element => {
    briques.push(
        {
            x: element.x * canvas.width / nbBriqueX,
            y: element.y * canvas.height / nbBriqueY,
            w: canvas.width / nbBriqueX,
            h: canvas.height / nbBriqueY,
            collide: false
        })
});


function collision() {
    var ballereverseX = false;
    var ballereverseY = false;

    for (let i = 0; i < briques.length; i++) {
        const brique = briques[i];


        //brique.collide = false
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

        //0 veut dire que c'est dedans
        var distX = balle.x - testX;// +  rrive de la droite - arrive de la gauche
        var distY = balle.y - testY;//+ arrive du bas - arrive du haut

        var distance = Math.sqrt((distX * distX) + (distY * distY));
        if (distance <= balle.r) {

            if (!brique.collide) {

                if (distY == 0 || distX == 0) {
                    if (distY == 0 && !ballereverseX) {
                        balle.vx = -balle.vx;
                        ballereverseX = true;
                    }
                    if (distX == 0 && !ballereverseY) {
                        balle.vy = -balle.vy;
                        ballereverseY = true;
                    }
                }
                else {
                    if ((distX * distX) > (distY * distY) && !ballereverseX) {
                        balle.vx = -balle.vx;
                        ballereverseX = true;
                    }
                    else if ((distX * distX) < (distY * distY) && !ballereverseY) {
                        balle.vy = -balle.vy;
                        ballereverseY = true;
                    }
                    else {
                        balle.vx = -balle.vx;
                        balle.vy = -balle.vy;
                        ballereverseX = true;
                        ballereverseY = true;
                    }

                }
            }

            brique.collide = true;
            briques.splice(i,1)

        }
        else {
            brique.collide = false;
        }
    }
}


