var canvas;
var ctx;

var secondsPassedFix = 0
var oldTimeStamp //= 0;
var nbBriqueX = 15;
var nbBriqueY = 30;
//TODO 1config par lvl?

const config2 = {
    "pv": {
        1: "red",
        2: "yellow",
        3: "green",
    },
    "dimension": {
        "briqueX": 15,
        "briqueY": 15,
        "ratioX": 1,
        "ratioY": .5
    }
}
const config = {
    "difficulte": {
        "lvl1": "red",
        "lvl2": "green",
        "lvl3": "yellow"
    },
    "dimension": {
        "briquesX": 15,
        "briquesY": 30,// nombre de ligne de brique sur le canvas //TODO là c'est toute la hauteur du canvas, faut une partie zone brique
        "hauteurJeux": .5
    },


}
var briques = [

];

const eventBallePerdue = new CustomEvent("ballePerdue", {
    bubbles: true
});

//TODO tableau vide = game over
//TODO nb vie => balle touche bas = -1 vie /vie = 0 game over

/**
 * des briques a charger ;
 */
const lvl4 = [{ "posX": 0, "posY": 5, "niveau": "lvl1" }, { "posX": 1, "posY": 5, "niveau": "lvl1" }, { "posX": 2, "posY": 5, "niveau": "lvl1" }, { "posX": 3, "posY": 5, "niveau": "lvl1" }, { "posX": 5, "posY": 5, "niveau": "lvl1" }, { "posX": 4, "posY": 5, "niveau": "lvl1" }, { "posX": 6, "posY": 5, "niveau": "lvl1" }, { "posX": 7, "posY": 5, "niveau": "lvl1" }, { "posX": 8, "posY": 5, "niveau": "lvl1" }, { "posX": 9, "posY": 5, "niveau": "lvl1" }, { "posX": 10, "posY": 5, "niveau": "lvl1" }, { "posX": 11, "posY": 5, "niveau": "lvl1" }, { "posX": 12, "posY": 5, "niveau": "lvl1" }, { "posX": 13, "posY": 5, "niveau": "lvl1" }, { "posX": 14, "posY": 5, "niveau": "lvl1" }, { "posX": 13, "posY": 6, "niveau": "lvl3" }, { "posX": 14, "posY": 6, "niveau": "lvl3" }, { "posX": 12, "posY": 6, "niveau": "lvl3" }, { "posX": 11, "posY": 6, "niveau": "lvl3" }, { "posX": 10, "posY": 6, "niveau": "lvl3" }, { "posX": 9, "posY": 6, "niveau": "lvl3" }, { "posX": 8, "posY": 6, "niveau": "lvl3" }, { "posX": 7, "posY": 6, "niveau": "lvl3" }, { "posX": 6, "posY": 6, "niveau": "lvl3" }, { "posX": 5, "posY": 6, "niveau": "lvl3" }, { "posX": 4, "posY": 6, "niveau": "lvl3" }, { "posX": 3, "posY": 6, "niveau": "lvl3" }, { "posX": 2, "posY": 6, "niveau": "lvl3" }, { "posX": 1, "posY": 6, "niveau": "lvl3" }, { "posX": 0, "posY": 6, "niveau": "lvl3" }, { "posX": 7, "posY": 7, "niveau": "lvl1" }, { "posX": 7, "posY": 8, "niveau": "lvl1" }, { "posX": 7, "posY": 9, "niveau": "lvl1" }, { "posX": 7, "posY": 10, "niveau": "lvl1" }, { "posX": 7, "posY": 11, "niveau": "lvl1" }, { "posX": 13, "posY": 4, "niveau": "lvl2" }, { "posX": 1, "posY": 4, "niveau": "lvl2" }, { "posX": 3, "posY": 3, "niveau": "lvl2" }, { "posX": 5, "posY": 4, "niveau": "lvl2" }, { "posX": 7, "posY": 3, "niveau": "lvl2" }, { "posX": 9, "posY": 4, "niveau": "lvl2" }, { "posX": 11, "posY": 3, "niveau": "lvl2" }, { "posX": 8, "posY": 7, "niveau": "lvl2" }, { "posX": 6, "posY": 7, "niveau": "lvl2" }, { "posX": 5, "posY": 8, "niveau": "lvl2" }, { "posX": 4, "posY": 7, "niveau": "lvl2" }, { "posX": 9, "posY": 8, "niveau": "lvl2" }, { "posX": 10, "posY": 7, "niveau": "lvl2" }, { "posX": 11, "posY": 8, "niveau": "lvl2" }, { "posX": 12, "posY": 7, "niveau": "lvl2" }, { "posX": 3, "posY": 8, "niveau": "lvl2" }, { "posX": 2, "posY": 7, "niveau": "lvl2" }, { "posX": 14, "posY": 11, "niveau": "lvl1" }, { "posX": 11, "posY": 11, "niveau": "lvl1" }, { "posX": 4, "posY": 11, "niveau": "lvl1" }, { "posX": 0, "posY": 11, "niveau": "lvl1" }]
const lvl1 = [{ "x": 8, "y": 1 }, { "x": 6, "y": 1 }, { "x": 6, "y": 3 }, { "x": 8, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 1 }, { "x": 8, "y": 6 }, { "x": 4, "y": 8 }, { "x": 1, "y": 6 }, { "x": 1, "y": 12 }, { "x": 10, "y": 10 }, { "x": 12, "y": 10 }, { "x": 13, "y": 6 }, { "x": 13, "y": 2 }]
const lvl2 =
    [{ "x": 1, "y": 3 }, { "x": 2, "y": 3 }, { "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 11, "y": 3 }, { "x": 11, "y": 4 }, { "x": 11, "y": 5 }, { "x": 11, "y": 6 }, { "x": 11, "y": 7 }, { "x": 11, "y": 8 }, { "x": 10, "y": 8 }, { "x": 9, "y": 8 }, { "x": 6, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 2, "y": 8 }, { "x": 1, "y": 8 }]
const lvl3 = [{ "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 4 }, { "x": 10, "y": 5 }, { "x": 10, "y": 6 }, { "x": 10, "y": 7 }, { "x": 9, "y": 7 }, { "x": 8, "y": 7 }, { "x": 7, "y": 7 }, { "x": 6, "y": 7 }, { "x": 5, "y": 7 }, { "x": 4, "y": 7 }, { "x": 3, "y": 7 }, { "x": 3, "y": 5 }, { "x": 3, "y": 6 }, { "x": 3, "y": 4 }, { "x": 3, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 10, "y": 8 }, { "x": 10, "y": 9 }, { "x": 10, "y": 10 }, { "x": 9, "y": 10 }, { "x": 8, "y": 10 }, { "x": 7, "y": 10 }, { "x": 6, "y": 10 }, { "x": 5, "y": 10 }, { "x": 4, "y": 10 }, { "x": 3, "y": 10 }, { "x": 3, "y": 9 }, { "x": 5, "y": 9 }, { "x": 4, "y": 9 }]



init();
var balle = new Balle(250,760);
var barre = new Barre(200,10,"red",canvas)


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
    window.requestAnimationFrame(loop);
    //pour faire les deplacement par rapport au temps
    if (oldTimeStamp === undefined)
        oldTimeStamp = timeStamp

    const secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    //FIXME gauche droite clavier pour la barre
   // secondsPassedFix = secondsPassed;

    balle.mouvement(secondsPassed);

    collide(balle.y > canvas.height * config.dimension.hauteurJeux ? [barre] : briques);

    
    draw();
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
        ctx.fillStyle = config.difficulte[brique.niveau];
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


lvl4.forEach(element => {
    briques.push(
        {
            x: element.posX * canvas.width / nbBriqueX,
            y: element.posY * canvas.height / nbBriqueY,
            w: canvas.width / config.dimension.briquesX,
            h: canvas.height / config.dimension.briquesY,
            niveau: element.niveau
        }
    )
})

/**
 * gere les collision de la balle avec les briques et la barre de rebond
 * @param {briqes} briques la liste des brique a test 
 */
function collide(briques) {



    //teste pour toute les briques
    //for parce que je retire les brique qui ont une collision et avec foreach sa en saute apres en avoir retiré
    for (let index = 0; index < briques.length; index++) {
        const brique = briques[index];
        const [distX, distY] = detectCollisionBetweenRectAndBall(brique, balle);

        //si j'ai une collision
        //inverse direction de la balle
        if (distX != undefined) {

            if (distY == 0 || distX == 0) {
                if (distY == 0 && !balle.isVxModif) {
                    balle.inverserVx();

                }
                if (distX == 0 && !balle.isVyModif) {
                    balle.inverserVy();

                }
            }
            //sa arrive quand la balle est vers un angle d'une brique
            else {
                //la balle à plutot touché droite/ gauche
                if ((distX * distX) > (distY * distY) && !balle.isVxModif) {
                    balle.inverserVx();

                }
                //la balle à plutot touché le top/bot
                else if ((distX * distX) < (distY * distY) && !balle.isVyModif) {
                    balle.inverserVy();

                }
                else {
                    //la balle a touché un angle niquel

                    balle.inverserVx();
                    balle.inverserVy();

                }
            }

            switch (brique.niveau) {
                case "lvl1":
                    briques.splice(index, 1);
                    index--;
                    break;
                case "lvl2":
                    brique.niveau = "lvl1";
                    break;
                case "lvl3":
                    brique.niveau = "lvl2";
                    break;

                default:
                    break;
            }


        }
    }
}

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
});

document.addEventListener("ballePerdue", () => {
    console.log("ballePerdue");
})
var startPress;
//TODO ecart max ?
document.addEventListener("keydown", e => {
    if (startPress === undefined)
        startPress = e.timeStamp

    const secondsPassed2 = (e.timeStamp - startPress) / 1000;
    startPress = e.timeStamp;

    if (e.key == "ArrowRight") {

barre.mouvement(true,secondsPassed2)
       // barre.mouvement(true, secondsPassed);
    }
    if (e.key == "ArrowLeft") {
        barre.mouvement(false,secondsPassed2);
      //  barre.mouvement(false, secondsPassed);
    }
    //space bar
    if (e.key == " ") {
        balle.vx == 0 ? balle.vx = 100 : balle.vx = balle.vx;
        balle.vy == 0 ? balle.vy = 200 : balle.vy = balle.vy;
    }
});

document.addEventListener("keyup", e => {
    if (e.key == "ArrowRight") {
       // startPress = undefined;

    }
    if (e.key == "ArrowLeft") {
       // startPress = undefined
    }
})

