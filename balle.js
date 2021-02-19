var balle = {
    posX: 100,
    posY: 100,
    radius: 10,
    couleur: "purple",
    direction: "down",
    vitesseX: 5,
    vitesseY: 7


}

var briques = [
    new Brique(20, 0)
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
    if (balle.posX+balle.radius >= document.getElementById("canvas").width
     ||balle.posX-balle.radius <=0) {
        balle.vitesseX = -balle.vitesseX
    }
    if (balle.posY + balle.radius >= document.getElementById("canvas").height 
    || balle.posY - balle.radius <=0) {
        balle.vitesseY = -balle.vitesseY;
        
    }

    window.requestAnimationFrame(bouger);

}