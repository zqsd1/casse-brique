var canvas;
var ctx;
var secondsPassed = 0;
var oldTimeStamp = 0;
var nbBriqueX = 15;
var nbBriqueY = 30
var briques = [

];



document.onload = init()

function init() {

    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

    }
    window.requestAnimationFrame(loop)
}


var barre = {
    w: 200,
    h: 10,
    color: "red",
    /**
     * w et h sont lié au canvas
     */
    x: (canvas.width / 2 - 200 / 2),
    y: (canvas.height - 3 * 10),
    vx: 500,
    mouvement: function (isDirDoite = true) {
        //test si ça deborde pas du canvas
        if (isDirDoite ? this.x + this.w < canvas.width : this.x > 0) {
            isDirDoite ? this.x += this.vx * secondsPassed : this.x -= this.vx * secondsPassed;
        }
    },
    draw: function (params) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

var balle = {
    r: 10,
    x: 250,
    y: 760,
    vx: 0,
    vy: 0,

    //si la balle touche plusieur brique en meme temps sa risque d'inverser plusieur fois sa direction et finalement sa va rien changer
    // donc changement possible que 1 fois

    isVxReversed: false,
    isVyReversed: false,

    draw: function (params) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
        ctx.fill();
    },
    mouvement: function () {

        this.isVxinversed = false;
        this.isVyinversed = false;

        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        if (this.x > canvas.width || this.x < 0) {
            this.inverserVx();
            //this.vx = -this.vx;

        }

        if (this.y > canvas.height || this.y < 0) {
            this.inverserVy();
            //this.vy = -this.vy;
        }
    },
    inverserVx: function () {
        if (!this.isVxinversed) {
            this.isVxinversed = true
            this.vx = -this.vx;

        }
    },
    inverserVy: function () {
        if (!this.isVyinversed) {
            this.isVyinversed = true;
            this.vy = -this.vy;

        }
    },

    /**
     * verifie si il y a une collision entre la balle et le rectangle 
     * si oui call function
     * @param {brique} brique le rectangle à test
     * @param {balle} ball la balle testé
     * @callback ifCollisionCallBack fonction appelé si il y a une collision
     * @returns {boolean}
     */
    isCollisionWithBrique: function (brique, ifCollisionCallBack) {

        var testX = this.x;
        var testY = this.y;

        if (this.x < brique.x)
            //viens de la gauche
            testX = brique.x;
        else if (this.x > brique.x + brique.w)
            //vien de la droite
            testX = brique.x + brique.w;

        if (this.y < brique.y)
            //viens du haut 
            testY = brique.y;
        else if (this.y > brique.y + brique.h)
            //viens du bas
            testY = brique.y + brique.h

        //0 veut dire que c'est dedans
        var distX = this.x - testX;// +  arrive de la droite  / - arrive de la gauche
        var distY = this.y - testY;//+ arrive du bas / - arrive du haut


        //pytagore
        var distance = Math.sqrt((distX * distX) + (distY * distY));
        //collision détecté
        if (distance <= this.r) {
            ifCollisionCallBack(distX, distY);
            return true;

        }
        return false;
    },


    /**
     * inverse la direction x et/ou y de la balle quand il y a collision
     * @param {number} distX 
     * @param {number} distY 
     */
    changerDirectionAfterCollide: function (distX, distY) {

        //la balle à plutot touché droite/ gauche
        if ((distX * distX) > (distY * distY)) {
            balle.inverserVx();
        }
        //la balle à plutot touché le top/bot
        if ((distX * distX) < (distY * distY)) {
            balle.inverserVy()
        }
        //la balle a touché un angle niquel
        if ((distX * distX) == (distY * distY)) {
            balle.inverserVx();
            balle.inverserVy();
        }

    }


}

/**
 * des briques a charger ;
 */
const lvl4 = [{ "posX": 0, "posY": 5, "niveau": "lvl1" }, { "posX": 1, "posY": 5, "niveau": "lvl1" }, { "posX": 2, "posY": 5, "niveau": "lvl1" }, { "posX": 3, "posY": 5, "niveau": "lvl1" }, { "posX": 5, "posY": 5, "niveau": "lvl1" }, { "posX": 4, "posY": 5, "niveau": "lvl1" }, { "posX": 6, "posY": 5, "niveau": "lvl1" }, { "posX": 7, "posY": 5, "niveau": "lvl1" }, { "posX": 8, "posY": 5, "niveau": "lvl1" }, { "posX": 9, "posY": 5, "niveau": "lvl1" }, { "posX": 10, "posY": 5, "niveau": "lvl1" }, { "posX": 11, "posY": 5, "niveau": "lvl1" }, { "posX": 12, "posY": 5, "niveau": "lvl1" }, { "posX": 13, "posY": 5, "niveau": "lvl1" }, { "posX": 14, "posY": 5, "niveau": "lvl1" }, { "posX": 13, "posY": 6, "niveau": "lvl3" }, { "posX": 14, "posY": 6, "niveau": "lvl3" }, { "posX": 12, "posY": 6, "niveau": "lvl3" }, { "posX": 11, "posY": 6, "niveau": "lvl3" }, { "posX": 10, "posY": 6, "niveau": "lvl3" }, { "posX": 9, "posY": 6, "niveau": "lvl3" }, { "posX": 8, "posY": 6, "niveau": "lvl3" }, { "posX": 7, "posY": 6, "niveau": "lvl3" }, { "posX": 6, "posY": 6, "niveau": "lvl3" }, { "posX": 5, "posY": 6, "niveau": "lvl3" }, { "posX": 4, "posY": 6, "niveau": "lvl3" }, { "posX": 3, "posY": 6, "niveau": "lvl3" }, { "posX": 2, "posY": 6, "niveau": "lvl3" }, { "posX": 1, "posY": 6, "niveau": "lvl3" }, { "posX": 0, "posY": 6, "niveau": "lvl3" }, { "posX": 7, "posY": 7, "niveau": "lvl1" }, { "posX": 7, "posY": 8, "niveau": "lvl1" }, { "posX": 7, "posY": 9, "niveau": "lvl1" }, { "posX": 7, "posY": 10, "niveau": "lvl1" }, { "posX": 7, "posY": 11, "niveau": "lvl1" }, { "posX": 13, "posY": 4, "niveau": "lvl2" }, { "posX": 1, "posY": 4, "niveau": "lvl2" }, { "posX": 3, "posY": 3, "niveau": "lvl2" }, { "posX": 5, "posY": 4, "niveau": "lvl2" }, { "posX": 7, "posY": 3, "niveau": "lvl2" }, { "posX": 9, "posY": 4, "niveau": "lvl2" }, { "posX": 11, "posY": 3, "niveau": "lvl2" }, { "posX": 8, "posY": 7, "niveau": "lvl2" }, { "posX": 6, "posY": 7, "niveau": "lvl2" }, { "posX": 5, "posY": 8, "niveau": "lvl2" }, { "posX": 4, "posY": 7, "niveau": "lvl2" }, { "posX": 9, "posY": 8, "niveau": "lvl2" }, { "posX": 10, "posY": 7, "niveau": "lvl2" }, { "posX": 11, "posY": 8, "niveau": "lvl2" }, { "posX": 12, "posY": 7, "niveau": "lvl2" }, { "posX": 3, "posY": 8, "niveau": "lvl2" }, { "posX": 2, "posY": 7, "niveau": "lvl2" }, { "posX": 14, "posY": 11, "niveau": "lvl1" }, { "posX": 11, "posY": 11, "niveau": "lvl1" }, { "posX": 4, "posY": 11, "niveau": "lvl1" }, { "posX": 0, "posY": 11, "niveau": "lvl1" }]
const lvl1 = [{ "x": 8, "y": 1 }, { "x": 6, "y": 1 }, { "x": 6, "y": 3 }, { "x": 8, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 1 }, { "x": 8, "y": 6 }, { "x": 4, "y": 8 }, { "x": 1, "y": 6 }, { "x": 1, "y": 12 }, { "x": 10, "y": 10 }, { "x": 12, "y": 10 }, { "x": 13, "y": 6 }, { "x": 13, "y": 2 }]
const lvl2 =
    [{ "x": 1, "y": 3 }, { "x": 2, "y": 3 }, { "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 11, "y": 3 }, { "x": 11, "y": 4 }, { "x": 11, "y": 5 }, { "x": 11, "y": 6 }, { "x": 11, "y": 7 }, { "x": 11, "y": 8 }, { "x": 10, "y": 8 }, { "x": 9, "y": 8 }, { "x": 6, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 2, "y": 8 }, { "x": 1, "y": 8 }]
const lvl3 = [{ "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 4 }, { "x": 10, "y": 5 }, { "x": 10, "y": 6 }, { "x": 10, "y": 7 }, { "x": 9, "y": 7 }, { "x": 8, "y": 7 }, { "x": 7, "y": 7 }, { "x": 6, "y": 7 }, { "x": 5, "y": 7 }, { "x": 4, "y": 7 }, { "x": 3, "y": 7 }, { "x": 3, "y": 5 }, { "x": 3, "y": 6 }, { "x": 3, "y": 4 }, { "x": 3, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 10, "y": 8 }, { "x": 10, "y": 9 }, { "x": 10, "y": 10 }, { "x": 9, "y": 10 }, { "x": 8, "y": 10 }, { "x": 7, "y": 10 }, { "x": 6, "y": 10 }, { "x": 5, "y": 10 }, { "x": 4, "y": 10 }, { "x": 3, "y": 10 }, { "x": 3, "y": 9 }, { "x": 5, "y": 9 }, { "x": 4, "y": 9 }]


const config = {
    "difficulte": {
        "lvl1": "red",
        "lvl2": "green",
        "lvl3": "yellow"
    }
}

/**
 * fait dessiner le canvas avec une notion temporelle
 * @param {timeStamp} timeStamp 
 */
function loop(timeStamp) {
    window.requestAnimationFrame(loop);//best practice says MDN
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;

    //if (secondsPassed < 1 / 2) return;// limite a 2 draw/sec

    oldTimeStamp = timeStamp;
    balle.mouvement();

    collide(balle.y > 2 * canvas.height / 3 ? [barre] : briques);

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

    balle.draw();
    barre.draw();


}


lvl4.forEach(element => {
    briques.push(
        {
            x: element.posX * canvas.width / nbBriqueX,
            y: element.posY * canvas.height / nbBriqueY,
            w: canvas.width / nbBriqueX,
            h: canvas.height / nbBriqueY,
            niveau: element.niveau
        }
    )
})



/**
 * gere les collision de la balle avec les briques et la barre de rebond
 * @param {briques} briques la liste des brique a test 
 */
function collide(briques) {

    //teste pour toute les briques
    //for parce que je retire les brique qui ont une collision et avec foreach sa en saute apres en avoir retiré
    for (let index = 0; index < briques.length; index++) {
        const brique = briques[index];
        const isCollision = balle.isCollisionWithBrique(brique, balle.changerDirectionAfterCollide);

        //  const [distX, distY] = detectCollisionBetweenRectAndBall(brique, balle);
        ///const isCollision = isCollisionBetweenRectAndBall(brique, balle, changerDirectionBalleAfterCollide);
        // if (isCollision) {
        //TODO promise ? async ?
        //     damageBrique(brique);
        // }


        if (isCollision) {
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


        //////////////
        // const SPEED = 2
        // let lastRenderTime = 0;
        // function main(time) {
        //     window.requestAnimationFrame(main);
        //     const secSincelastRender = (time - lastRenderTime) / 1000;
        //     if (secSincelastRender < 1 / SPEED) return

        //     console.log("render");
        //     lastRenderTime = time
        // }
        // //////////////
        // ////////////
        // for (let index = briques.length - 2; index >= 0; index--) {
        //     const element = briques[index];
        //     briques[index + 1] = { ...brique[index] }//duplicate the elem
        // }
        ///////////