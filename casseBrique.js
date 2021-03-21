var canvas;
var ctx;
var secondsPassed = 0;
var oldTimeStamp = 0;
var nbBriqueX = 15;
var nbBriqueY = 30
var briques = [

];

var barre = {
    w: 200,
    h: 10,
    color: "red",
    /**
     * w et h sont lié au canvas
     */
    x: 600 / 2 - 200 / 2,
    y: 800 - 3 * 10,
    vx: 500,
    mouvement: function (droite = true) {
        //test si ça deborde pas du canvas
        if (droite ? this.x + this.w < canvas.width : this.x > 0) {
            droite ? this.x += this.vx * secondsPassed : this.x -= this.vx * secondsPassed;
        }
    }
}

var balle = {
    r: 10,
    x: 250,
    y: 760,
    vx: 0,
    vy: 0,
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

/**
 * des briques a charger ;
 */
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
/**
 * fait dessiner le canvas avec une notion temporelle
 * @param {timeStamp} timeStamp 
 */
function loop(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    balle.mouvement();

    collide(balle.y > 2 * canvas.height / 3 ? [barre] : briques);
    draw();
    window.requestAnimationFrame(loop);
}

/**
 * dessine le canvas 
 */
function draw() {
    //clean le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    //les briques a dessiner
    briques.forEach(brique => {
        ctx.beginPath();
        ctx.save();
        ctx.rect(brique.x, brique.y, brique.w, brique.h);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
    });

    //dessine la balle
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
    ctx.fill();

    //dessine la barre
    ctx.beginPath();
    ctx.fillStyle = barre.color;
    ctx.fillRect(barre.x, barre.y, barre.w, barre.h);

}

//charge les brique du niveau dans le tableau de brique a dessiner
lvl3.forEach(element => {
    briques.push(
        {
            x: element.x * canvas.width / nbBriqueX,
            y: element.y * canvas.height / nbBriqueY,
            w: canvas.width / nbBriqueX,
            h: canvas.height / nbBriqueY,

        })
});

/**
 * dit si il y a une collision entre 2 element du canvas
 * @param {briques} brique 
 * @param {balle} ball 
 * @returns ecart x et y ou false
 */
function detectCollisionBetweenRectAndBall(brique, ball) {

    var testX = ball.x;
    var testY = ball.y;

    if (ball.x < brique.x)
        //viens de la gauche
        testX = brique.x;
    else if (ball.x > brique.x + brique.w)
        //vien de la droite
        testX = brique.x + brique.w;

    if (ball.y < brique.y)
        //viens du haut 
        testY = brique.y;
    else if (ball.y > brique.y + brique.h)
        //viens du bas
        testY = brique.y + brique.h

    //0 veut dire que c'est dedans
    var distX = ball.x - testX;// +  arrive de la droite  / - arrive de la gauche
    var distY = ball.y - testY;//+ arrive du bas / - arrive du haut

    var distance = Math.sqrt((distX * distX) + (distY * distY));
    //collision détecté
    if (distance <= ball.r) {
        return [distX, distY];

    }
    return [];
    // return false;
}
/**
 * gere les collision de la balle avec les briques et la barre de rebond
 * @param {briqes} briques la liste des brique a test 
 */
function collide(briques) {
    //si la balle touche plusieur brique en meme temps sa risque d'inverser plusieur fois sa direction et finalement sa va rien changer
    // donc changement possible que 1 fois
    var ballereverseX = false;
    var ballereverseY = false;

    //teste pour toute les briques
    //for parce que je retire les brique qui ont une collision et avec foreach sa en saute apres en avoir retiré
    for (let index = 0; index < briques.length; index++) {
        const brique = briques[index];
        const [distX, distY] = detectCollisionBetweenRectAndBall(brique, balle);

        //si j'ai une collision
        //inverse direction de la balle
        if (distX != undefined) {

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
            //sa arrive quand la balle est vers un angle d'une brique
            else {
                //la balle à plutot touché droite/ gauche
                if ((distX * distX) > (distY * distY) && !ballereverseX) {
                    balle.vx = -balle.vx;
                    ballereverseX = true;
                }
                //la balle à plutot touché le top/bot
                else if ((distX * distX) < (distY * distY) && !ballereverseY) {
                    balle.vy = -balle.vy;
                    ballereverseY = true;
                }
                else {
                    //la balle a touché un angle niquel
                    balle.vx = -balle.vx;
                    balle.vy = -balle.vy;
                    ballereverseX = true;
                    ballereverseY = true;
                }
            }
            briques.splice(index, 1);
            index--;
        }
    }
}



function collisionBarre() {
    const brique = barre;

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
    var distX = balle.x - testX;// +  arrive de la droite  / - arrive de la gauche
    var distY = balle.y - testY;//+ arrive du bas / - arrive du haut

    var distance = Math.sqrt((distX * distX) + (distY * distY));
    if (distance <= balle.r) {

        if (distY == 0 || distX == 0) {
            if (distY == 0) {
                balle.vx = -balle.vx;

            }
            if (distX == 0) {
                balle.vy = -balle.vy;

            }
        }
        //sa arrive quand la balle est vers un angle d'une brique
        else {
            //la balle à plutot touché droite/ gauche
            if ((distX * distX) > (distY * distY)) {
                balle.vx = -balle.vx;

            }
            //la balle à plutot touché le top/bot
            else if ((distX * distX) < (distY * distY)) {
                balle.vy = -balle.vy;

            }
            else {
                //la balle a touché un angle niquel
                balle.vx = -balle.vx;
                balle.vy = -balle.vy;

            }

        }
    }
}

/**
 * les event pour deplacer la barre
 * si on deplace la souris dans le canvas
 * si on use les fleche droite/gauche
 */
canvas.addEventListener('mousemove', e => {
    //la souris est au milieu de la barre et il faut verifier que la barre va pas deborder
    if (!(e.clientX - barre.w / 2 <= 0 || e.clientX + barre.w / 2 >= canvas.width)) {
        barre.x = e.clientX - barre.w / 2;
    }

}

);
document.addEventListener("keydown", e => {
    if (e.key == "ArrowRight") {
        barre.mouvement(true);
    }
    if (e.key == "ArrowLeft") {
        barre.mouvement(false);
    }
    //space bar
    if (e.key == " ") {
        balle.vx == 0 ? balle.vx = 100 : balle.vx = balle.vx;
        balle.vy == 0 ? balle.vy = 200 : balle.vy = balle.vy;
    }
})

