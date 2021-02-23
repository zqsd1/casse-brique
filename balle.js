var balle = {
    posX: 270,
    posY: 210,
    radius: 10,
    couleur: "purple",
    direction: "down",
    vitesseX: -1,
    vitesseY: -2


}

var nbBriqueX = 15;
var nbBriqueY = 30
var zoneY = 1;
var lvl1 = [{ "posX": 8, "posY": 1 }, { "posX": 6, "posY": 1 }, { "posX": 6, "posY": 3 }, { "posX": 8, "posY": 3 }, { "posX": 10, "posY": 3 }, { "posX": 10, "posY": 1 }, { "posX": 8, "posY": 6 }, { "posX": 4, "posY": 8 }, { "posX": 1, "posY": 6 }, { "posX": 1, "posY": 12 }, { "posX": 10, "posY": 10 }, { "posX": 12, "posY": 10 }, { "posX": 13, "posY": 6 }, { "posX": 13, "posY": 2 }]
var lvl2 =
    [{ "posX": 1, "posY": 3 }, { "posX": 2, "posY": 3 }, { "posX": 3, "posY": 3 }, { "posX": 4, "posY": 3 }, { "posX": 5, "posY": 3 }, { "posX": 6, "posY": 3 }, { "posX": 7, "posY": 3 }, { "posX": 8, "posY": 3 }, { "posX": 9, "posY": 3 }, { "posX": 10, "posY": 3 }, { "posX": 11, "posY": 3 }, { "posX": 11, "posY": 4 }, { "posX": 11, "posY": 5 }, { "posX": 11, "posY": 6 }, { "posX": 11, "posY": 7 }, { "posX": 11, "posY": 8 }, { "posX": 10, "posY": 8 }, { "posX": 9, "posY": 8 }, { "posX": 6, "posY": 8 }, { "posX": 4, "posY": 8 }, { "posX": 5, "posY": 8 }, { "posX": 2, "posY": 8 }, { "posX": 1, "posY": 8 }]
function niveau(lvl) {
    lvl.forEach(element => {
        briques.push(new Brique(element.posX, element.posY));
    });
}
var briques = [
    //new Brique(5, 5)
]

function Brique(posX, posY) {
    this.height = canvas.height * zoneY / nbBriqueY;
    this.width = canvas.width / nbBriqueX;
    // this.height = 100;
    //this.width = 80;
    this.couleur = "red";
    this.posX = posX * (canvas.width / nbBriqueX);
    this.posY = posY * (canvas.height / nbBriqueY);
    this.collide = false;
}

niveau(lvl2);
draw();


function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        ctx.arc(balle.posX, balle.posY, balle.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = balle.couleur;
        ctx.fill();

        drawBriques();

    }

}

function drawBriques() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        briques.forEach(element => {
            ctx.save();
            ctx.fillStyle = element.collide ? "blue" : element.couleur;
            ctx.fillRect(element.posX, element.posY, element.width, element.height);
            ctx.restore();
        });
        ctx.fill();

    }
}
window.requestAnimationFrame(bouger);

//window.setInterval(bouger, 200, balle);
function bouger() {
    balle.posX += balle.vitesseX;
    balle.posY += balle.vitesseY;
    collision();

    draw()


    window.requestAnimationFrame(bouger);

}

function collision(params) {





    // // RECTANGLE/RECTANGLE
    // boolean rectRect(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {

    //     // are the sides of one rectangle touching the other?

    //     if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
    //         r1x <= r2x + r2w &&    // r1 left edge past r2 right
    //         r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
    //         r1y <= r2y + r2h) {    // r1 bottom edge past r2 top
    //           return true;
    //     }
    //     return false;
    //   }
    briques.forEach(brique => {
        brique.collide = false;
    });


    var testX = balle.posX;
    var testY = balle.posY;
    var swapVitesseX = false;
    var swapVitesseY = false;
    briques.forEach(brique => {
        if (balle.posX < brique.posX) {
            //viens de la gauche
            testX = brique.posX;
        } else if (balle.posX > brique.posX + brique.width) {
            //vien de la droite
            testX = brique.posX + brique.width;
        }
        if (balle.posY < brique.posY) {
            //viens du haut 
            testY = brique.posY;
        } else if (balle.posY > brique.posY + brique.height) {
            //viens du bas
            testY = brique.posY + brique.height
        }
        var distX = balle.posX - testX;
        var distY = balle.posY - testY;
        var distance = Math.sqrt((distX * distX) + (distY * distY));
        if (distance <= balle.radius) {

            brique.collide = true;
            if (distY < 1.4 && distY > -1.4 && !swapVitesseX) {
                balle.vitesseX = -balle.vitesseX;
                swapVitesseX = true;
            }
            if (distX <= 1.4 && distX >= -1.4 && !swapVitesseY) {

                balle.vitesseY = -balle.vitesseY;
                swapVitesseY = true;
            }
            if (!(distX <= 1.4 && distX >= -1.4) && !(distY < 1.4 && distY > -1.4)) {
                balle.vitesseY = -balle.vitesseY;
                swapVitesseY = true;
                balle.vitesseX = -balle.vitesseX;
                swapVitesseX = true;

            }



        }
    });

    // // CIRCLE/RECTANGLE
    // boolean circleRect(float cx, float cy, float radius, float rx, float ry, float rw, float rh) {

    //     // temporary variables to set edges for testing
    //     float testX = cx;
    //     float testY = cy;

    //     // which edge is closest?
    //     if (cx < rx)         testX = rx;      // test left edge
    //     else if (cx > rx+rw) testX = rx+rw;   // right edge
    //     if (cy < ry)         testY = ry;      // top edge
    //     else if (cy > ry+rh) testY = ry+rh;   // bottom edge

    //     // get distance from closest edges
    //     float distX = cx-testX;
    //     float distY = cy-testY;
    //     float distance = sqrt( (distX*distX) + (distY*distY) );

    //     // if the distance is less than the radius, collision!
    //     if (distance <= radius) {
    //       return true;
    //     }
    //     return false;
    //   }

    if (balle.posX + balle.radius >= document.getElementById("canvas").width
        || balle.posX - balle.radius <= 0) {
        balle.vitesseX = -balle.vitesseX
    }
    if (balle.posY + balle.radius >= document.getElementById("canvas").height
        || balle.posY - balle.radius <= 0) {
        balle.vitesseY = -balle.vitesseY;
    }

    // briques.forEach(brique => {
    //     //test si la balle est dans une brique
    //     if (balle.posX >= brique.posX && balle.posX <= brique.posX + brique.width &&
    //         balle.posY >= brique.posY && balle.posY <= brique.posY + brique.height) {
    //         //si la balle touche la gauche de la brique OU si la balle touche la droite de la piece avec erreur de la vitesse
    //         //TODO corriger la vitesse

    //         //TODO chiant prob avec la taille des brique qui sont en x.xxx
    //         if (balle.posX - Math.trunc(brique.posX) <= 1 || (Math.trunc(brique.posX) + Math.trunc(brique.width)) - balle.posX <= 1) {
    //             balle.vitesseX = -balle.vitesseX;
    //         }
    //         if (balle.posY - Math.trunc(brique.posY) <= 1 || (Math.trunc(brique.posY) + Math.trunc(brique.height)) - balle.posY <= 1) {
    //             balle.vitesseY = - balle.vitesseY;
    //         }

    //     }
    // });
    //si y'a une value de la balle qui est dans une value de la brique 
    // if (balle.posX >= briques[0].posX && balle.posX <= briques[0].posX + briques[0].width &&
    //     balle.posY >= briques[0].posY && balle.posY <= briques[0].posY + briques[0].height) {

    //     //TODO un % sa devrait pouvoir le faire pour le requestAnimationFrame
    //     //si la distance y de la balle par rapport à l'origine y de la brique est de 0 ou la hauteur de la brique (avec erreur lié à la vitesse de la balle)
    //     if ((balle.posY - briques[0].posY <= briques[0].height) && (balle.posY - briques[0].posY) >= briques[0].height + balle.vitesseY || (balle.posY - briques[0].posY >= 0) && (balle.posY - briques[0].posY) <= balle.vitesseY) {
    //         balle.vitesseY = -balle.vitesseY
    //     }

    //     //si les coord x de la balle - les coord x de la brique comprise entre 0 et la largeur de la brique avec marge erreur de la vitesse de la balle
    //     if ((balle.posX - briques[0].posX <= briques[0].width) && (balle.posX - briques[0].posX >= briques[0].width + balle.vitesseX) || (balle.posX - briques[0].posX >= 0) && (balle.posX - briques[0].posX <= balle.vitesseX)) {
    //         balle.vitesseX = -balle.vitesseX;
    //         console.log(balle.posX - briques[0].posX);
    //     }

    // }

}