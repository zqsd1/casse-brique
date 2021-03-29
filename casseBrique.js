
const BRIQUE_X = 15// nb colonne brique
const BRIQUE_Y = 15//nb ligne de brique
const RATIO_X = 1 // le % despace x occupe par les brique
const RATIO_Y = .5 //le % du canvas occupé par la zone de brique

const BALLE_SPEED_X = 0
const BALLE_SPEED_Y = 200

const BRIQUE_PV_COLOR = {
    1: "red",
    2: "yellow",
    3: "green"
}
const NIVEAU1 = [{ "x": 8, "y": 1 }, { "x": 6, "y": 1 }, { "x": 6, "y": 3 }, { "x": 8, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 1 }, { "x": 8, "y": 6 }, { "x": 4, "y": 8 }, { "x": 1, "y": 6 }, { "x": 1, "y": 12 }, { "x": 10, "y": 10 }, { "x": 12, "y": 10 }, { "x": 13, "y": 6 }, { "x": 13, "y": 2 }]
const NIVEAU2 =
    [{ "x": 1, "y": 3 }, { "x": 2, "y": 3 }, { "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 11, "y": 3 }, { "x": 11, "y": 4 }, { "x": 11, "y": 5 }, { "x": 11, "y": 6 }, { "x": 11, "y": 7 }, { "x": 11, "y": 8 }, { "x": 10, "y": 8 }, { "x": 9, "y": 8 }, { "x": 6, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 2, "y": 8 }, { "x": 1, "y": 8 }]
const NIVEAU3 = [{ "x": 3, "y": 3 }, { "x": 4, "y": 3 }, { "x": 5, "y": 3 }, { "x": 6, "y": 3 }, { "x": 7, "y": 3 }, { "x": 8, "y": 3 }, { "x": 9, "y": 3 }, { "x": 10, "y": 3 }, { "x": 10, "y": 4 }, { "x": 10, "y": 5 }, { "x": 10, "y": 6 }, { "x": 10, "y": 7 }, { "x": 9, "y": 7 }, { "x": 8, "y": 7 }, { "x": 7, "y": 7 }, { "x": 6, "y": 7 }, { "x": 5, "y": 7 }, { "x": 4, "y": 7 }, { "x": 3, "y": 7 }, { "x": 3, "y": 5 }, { "x": 3, "y": 6 }, { "x": 3, "y": 4 }, { "x": 3, "y": 8 }, { "x": 4, "y": 8 }, { "x": 5, "y": 8 }, { "x": 10, "y": 8 }, { "x": 10, "y": 9 }, { "x": 10, "y": 10 }, { "x": 9, "y": 10 }, { "x": 8, "y": 10 }, { "x": 7, "y": 10 }, { "x": 6, "y": 10 }, { "x": 5, "y": 10 }, { "x": 4, "y": 10 }, { "x": 3, "y": 10 }, { "x": 3, "y": 9 }, { "x": 5, "y": 9 }, { "x": 4, "y": 9 }]

const NIVEAU4 = [{ "posX": 0, "posY": 5, "niveau": 1 }, { "posX": 1, "posY": 5, "niveau": 1 }, { "posX": 2, "posY": 5, "niveau": 1 }, { "posX": 3, "posY": 5, "niveau": 1 }, { "posX": 5, "posY": 5, "niveau": 1 }, { "posX": 4, "posY": 5, "niveau": 1 }, { "posX": 6, "posY": 5, "niveau": 1 }, { "posX": 7, "posY": 5, "niveau": 1 }, { "posX": 8, "posY": 5, "niveau": 1 }, { "posX": 9, "posY": 5, "niveau": 1 }, { "posX": 10, "posY": 5, "niveau": 1 }, { "posX": 11, "posY": 5, "niveau": 1 }, { "posX": 12, "posY": 5, "niveau": 1 }, { "posX": 13, "posY": 5, "niveau": 1 }, { "posX": 14, "posY": 5, "niveau": 1 }, { "posX": 13, "posY": 6, "niveau": 3 }, { "posX": 14, "posY": 6, "niveau": 3 }, { "posX": 12, "posY": 6, "niveau": 3 }, { "posX": 11, "posY": 6, "niveau": 3 }, { "posX": 10, "posY": 6, "niveau": 3 }, { "posX": 9, "posY": 6, "niveau": 3 }, { "posX": 8, "posY": 6, "niveau": 3 }, { "posX": 7, "posY": 6, "niveau": 3 }, { "posX": 6, "posY": 6, "niveau": 3 }, { "posX": 5, "posY": 6, "niveau": 3 }, { "posX": 4, "posY": 6, "niveau": 3 }, { "posX": 3, "posY": 6, "niveau": 3 }, { "posX": 2, "posY": 6, "niveau": 3 }, { "posX": 1, "posY": 6, "niveau": 3 }, { "posX": 0, "posY": 6, "niveau": 3 }, { "posX": 7, "posY": 7, "niveau": 1 }, { "posX": 7, "posY": 8, "niveau": 1 }, { "posX": 7, "posY": 9, "niveau": 1 }, { "posX": 7, "posY": 10, "niveau": 1 }, { "posX": 7, "posY": 11, "niveau": 1 }, { "posX": 13, "posY": 4, "niveau": 2 }, { "posX": 1, "posY": 4, "niveau": 2 }, { "posX": 3, "posY": 3, "niveau": 2 }, { "posX": 5, "posY": 4, "niveau": 2 }, { "posX": 7, "posY": 3, "niveau": 2 }, { "posX": 9, "posY": 4, "niveau": 2 }, { "posX": 11, "posY": 3, "niveau": 2 }, { "posX": 8, "posY": 7, "niveau": 2 }, { "posX": 6, "posY": 7, "niveau": 2 }, { "posX": 5, "posY": 8, "niveau": 2 }, { "posX": 4, "posY": 7, "niveau": 2 }, { "posX": 9, "posY": 8, "niveau": 2 }, { "posX": 10, "posY": 7, "niveau": 2 }, { "posX": 11, "posY": 8, "niveau": 2 }, { "posX": 12, "posY": 7, "niveau": 2 }, { "posX": 3, "posY": 8, "niveau": 2 }, { "posX": 2, "posY": 7, "niveau": 2 }, { "posX": 14, "posY": 11, "niveau": 1 }, { "posX": 11, "posY": 11, "niveau": 1 }, { "posX": 4, "posY": 11, "niveau": 1 }, { "posX": 0, "posY": 11, "niveau": 1 }]

const NIVEAU_TEST = [
    {
        "posX": 0,
        "posY": 0,
        "niveau": 1
    },
    {
        "posX": 0,
        "posY": 15,
        "niveau": 2
    },
    {
        "posX": 10,
        "posY": 0,
        "niveau": 3
    },
]
var canvas;
var ctx;
var secondsPassed = 0;
var oldTimeStamp = 0;

var briques = [

];



(function init() {

    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

    }
    window.requestAnimationFrame(loop)
})();


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
    draw: function () {
        ctx.beginPath();

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

var balle = {
    r: 10,
    x: 30,
    y: 760,
    vx: 0,
    vy: 0,

    //si la balle touche plusieur brique en meme temps sa risque d'inverser plusieur fois sa direction et finalement sa va rien changer
    // donc changement possible que 1 fois

    isVxReversed: false,
    isVyReversed: false,

    draw: function () {
        ctx.beginPath();

        ctx.save();
        ctx.fillStyle = "black";
        ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore()
    },
    mouvement: function () {

        this.isVxinversed = false;
        this.isVyinversed = false;

        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        if (this.x > canvas.width || this.x < 0) {
            this.inverserVx();

        }

        if ( this.y < 0) {

            
            this.inverserVy();

        }
        if (this.y>canvas.height) {
            ballePerdue();
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
            console.log("call callback")
            ifCollisionCallBack(distX, distY);
            console.log("apres callback");
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
        console.log("callback fait");

    }


}

function ballePerdue(){
    balle.vx = 0
    balle.vy = 0
    balle.x = barre.x + barre.w/2
    balle.y = barre.y - balle.r
}

/** */
function Brique(x, y, pv) {

    this.w = canvas.width / (BRIQUE_X/RATIO_X);
    this.h = canvas.height / (BRIQUE_Y/RATIO_Y);

    this.x = x * this.w
    this.y = y * this.h;
    this.pv = pv

    this.draw = function (params) {
        ctx.beginPath();

        ctx.save();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = BRIQUE_PV_COLOR[this.pv]
        ctx.fill();
        ctx.restore();
    }

    /**
     * 
     * @param {number} dmg les degats infligé
     * @returns 
     */
    this.takeDamage = function (dmg = 1) {
        this.pv = this.pv - dmg;
        return this.pv;
    }
}

NIVEAU_TEST.forEach(element => {
    briques.push(new Brique(element.posX, element.posY, element.niveau))
})

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

        brique.draw();
    });

    balle.draw();
    barre.draw();


}





/**
 * gere les collision de la balle avec les briques et la barre de rebond
 * @param {briques} briques la liste des brique a test 
 */
function collide(briques) {


    for (let index = 0; index < briques.length; index++) {
        const brique = briques[index];

        const touch = balle.isCollisionWithBrique(brique, balle.changerDirectionAfterCollide);
        if (touch && brique instanceof Brique) {

            if (brique.takeDamage() <= 0) {

                briques.splice(index, 1);
                index--;
            }

        }
    }

}

function moveBalleAvecBarre() {
 if (balle.vx== 0 &&balle.vy ==0) {
     balle.x = barre.x +barre.w/2
     balle.y = barre.y -balle.r;
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
        moveBalleAvecBarre()
    }

}

);
document.addEventListener("keydown", e => {
    if (e.key == "ArrowRight") {

        moveBalleAvecBarre()
        barre.mouvement(true);

    }
    if (e.key == "ArrowLeft") {
        moveBalleAvecBarre()
        barre.mouvement(false);
    }
    //space bar
    if (e.key == " ") {
        balle.vx == 0 ? balle.vx = BALLE_SPEED_X : balle.vx = balle.vx;
        balle.vy == 0 ? balle.vy = BALLE_SPEED_Y : balle.vy = balle.vy;
    }
})




// var eventKillBrick = new CustomEvent("killBrick", { detail: this })


// document.addEventListener("killBrick", e => {
//     console.log(e);
// })


// document.dispatchEvent(eventKillBrick);




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