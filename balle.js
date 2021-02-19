var balle = {
    posX: 100,
    posY: 100,
    radius: 10,
    couleur: "purple",
    direction: "down",
    vitesseX: 2,
    vitesseY: 0


}

var briques = [
    new Brique(100,200)
]

function Brique(posX, posY) {
    this.height = 50;
    this.width = this.height*Math.sqrt(2);
    this.couleur = "red";
    this.posX = posX;
    this.posY = posY;
}

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
        briques.forEach(element => {
            ctx.fillStyle = element.couleur;
            ctx.fillRect(element.posX, element.posY, element.width, element.height);
        });

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
    if (balle.posX+balle.radius >= document.getElementById("canvas").width
     ||balle.posX-balle.radius <=0) {
        balle.vitesseX = -balle.vitesseX
    }
    if (balle.posY + balle.radius >= document.getElementById("canvas").height 
    || balle.posY - balle.radius <=0) {
        balle.vitesseY = -balle.vitesseY;        
    }

    //si y'a une value de la balle qui est dans une value de la brique 
    if (balle.posX>=briques[0].posX &&balle.posX<=briques[0].posX+briques[0].width &&
        balle.posY>=briques[0].posY &&balle.posY<=briques[0].posY+briques[0].height) {

            //TODO un % sa devrait pouvoir le faire pour le requestAnimationFrame
            //si la distance y de la balle par rapport à l'origine y de la brique est de 0 ou la hauteur de la brique (avec erreur lié à la vitesse de la balle)
            if ((balle.posY - briques[0].posY <=briques[0].height)&&(balle.posY - briques[0].posY)>=briques[0].height+balle.vitesseY ||(balle.posY - briques[0].posY >=0)&&(balle.posY - briques[0].posY)<=balle.vitesseY) {
                balle.vitesseY = -balle.vitesseY
            }

            //si les coord x de la balle - les coord x de la brique comprise entre 0 et la largeur de la brique avec marge erreur de la vitesse de la balle
            if ((balle.posX - briques[0].posX <=briques[0].width)&&(balle.posX - briques[0].posX >=briques[0].width+balle.vitesseX)||(balle.posX - briques[0].posX >=0)&&(balle.posX - briques[0].posX <=balle.vitesseX)) {
                balle.vitesseX = -balle.vitesseX;
                console.log(balle.posX - briques[0].posX);
            }
        
    }

}