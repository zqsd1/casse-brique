var balle = {
    posX: 100,
    posY: 100,
    radius: 10,
    couleur: "purple",
    direction: "down",
    vitesseX: 2,
    vitesseY: 0


}

var nbBriqueX = 15;
var nbBriqueY = 15
var zoneY = 0.5;
var lvl1 = [{ "posX": 8, "posY": 1 }, { "posX": 6, "posY": 1 }, { "posX": 6, "posY": 3 }, { "posX": 8, "posY": 3 }, { "posX": 10, "posY": 3 }, { "posX": 10, "posY": 1 }, { "posX": 8, "posY": 6 }, { "posX": 4, "posY": 8 }, { "posX": 1, "posY": 6 }, { "posX": 1, "posY": 12 }, { "posX": 10, "posY": 10 }, { "posX": 12, "posY": 10 }, { "posX": 13, "posY": 6 }, { "posX": 13, "posY": 2 }]

function niveau(lvl) {
    lvl.forEach(element => {
        briques.push(new Brique(element.posX, element.posY));
    });
}
var briques = [
    //new Brique(100, 200)
]

function Brique(posX, posY) {
    this.height = canvas.height*zoneY/nbBriqueY;
    this.width = canvas.width/nbBriqueX;
    this.couleur = "red";
    this.posX = posX*(canvas.width/nbBriqueX);
    this.posY = posY*(canvas.height/nbBriqueY);
}

niveau(lvl1);
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
            ctx.fillStyle = element.couleur;
            ctx.fillRect(element.posX, element.posY, element.width, element.height);
            ctx.restore();
        });
        ctx.fill();

    }
}
window.requestAnimationFrame(bouger);

//window.setInterval(bouger, 200, balle);
function bouger() {
    draw()
    balle.posX += balle.vitesseX;
    balle.posY += balle.vitesseY;
    collision();


    window.requestAnimationFrame(bouger);

}

function collision(params) {
    if (balle.posX + balle.radius >= document.getElementById("canvas").width
        || balle.posX - balle.radius <= 0) {
        balle.vitesseX = -balle.vitesseX
    }
    if (balle.posY + balle.radius >= document.getElementById("canvas").height
        || balle.posY - balle.radius <= 0) {
        balle.vitesseY = -balle.vitesseY;
    }

    briques.forEach(brique => {
        //test si la balle est dans une brique
        if (balle.posX>=brique.posX &&balle.posX<=brique.posX+brique.width &&
            balle.posY>=brique.posY && balle.posY<=brique.posY.height) {
                //si la balle touche la gauche de la brique OU si la balle touche la droite de la piece avec erreur de la vitesse
                //TODO corriger la vitesse
                if (balle.posX-brique.posX ==0 ||balle.posX-brique.posX-brique.width <=balle.vitesseX) {
                    balle.vitesseX = -balle.vitesseX;
                }
                if (balle.posY -brique.posX ==0 ||balle.posY -brique.posY-brique.height <=balle.vitesseY) {
                    balle.vitesseY = - balle.vitesseY;
                }
            
        }
    });
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