var canvas = document.getElementById("canvas");
var y = canvas.height / 2;
var x = canvas.width;
var nbBriquesX = 15;
var nbBriquesY = 15;
var largeurBrique = x / nbBriquesX;
var hauteurBrique = y / nbBriquesY;

var briques = [];

function Brique(posX, posY) {

    this.posX = posX;
    this.posY = posY;
}


if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // met les emplacement des briques
    ctx.beginPath();
    for (let i = 0; i < nbBriquesX; i++) {
        for (let j = 0; j < nbBriquesY; j++) {

            ctx.rect(i * largeurBrique, j * hauteurBrique, largeurBrique, hauteurBrique);
        }
    }
    ctx.stroke();
}

canvas.addEventListener("mousedown", clickMouse)

function clickMouse(params) {


    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //recup info du decalage du canvas dans la page
        var rect = canvas.getBoundingClientRect();
        //coordonné du clic
        var clicX = params.offsetX;//params.clientX - rect.x
        var clicY = params.offsetY;//params.clientY - rect.y;
        //le numero de la brique clicqué    
        var positionXBrique = Math.trunc(clicX / largeurBrique);
        var positionYBrique = Math.trunc(clicY / hauteurBrique);

        //le clic est pas dans la zone pour poser les brique
        if (positionYBrique >= nbBriquesY) {
            return false;
        }
        //cherche si y'a une brique dans la case cliké
        var dejaBrique = briques.findIndex((elem, ind, arr) => elem.posX == positionXBrique && elem.posY == positionYBrique);
        //clic gauche
        if (params.button == 0) {
            //add la brique
            if (dejaBrique == -1) {
                ctx.fillRect(positionXBrique * largeurBrique, positionYBrique * hauteurBrique, largeurBrique, hauteurBrique);
                briques.push(new Brique(positionXBrique, positionYBrique));
            }
        }

        //clic droit
        if (params.button == 2) {
            //si y'a une brique on la vire
            if (dejaBrique != -1) {
                briques.splice(dejaBrique, 1);
                ctx.clearRect(positionXBrique * largeurBrique, positionYBrique * hauteurBrique, largeurBrique, hauteurBrique);
                ctx.strokeRect(positionXBrique * largeurBrique, positionYBrique * hauteurBrique, largeurBrique, hauteurBrique);
            }
        }


        //converti le tableau pour que ça soit lisible en html
        var tmp = JSON.stringify(briques);
        document.getElementById("briquesOutput").innerHTML = tmp;






        // //firefox a des prob pour la position du clic par rapport a la page et le decalage du canvas
        //offset recup la position dans l'element choisi
        // client meme chose pour l'element window
        //page a partir du document

        //mouse event attribut : https://www.w3schools.com/jsref/obj_mouseevent.asp

        // //pas décallé
        // ctx.fillRect(params.offsetX, params.offsetY, 10, 10);
        // ctx.fillStyle = 'rgba(0,0,200,0.5)';
        // //pas decallé... ou alors de 1px
        // ctx.fillRect(params.clientX - rect.x, params.clientY - rect.y, 10, 10);
        // ctx.fillStyle = 'green'
        // //decallé => origine de la page + le decalage du canvas
        // ctx.fillRect(params.clientX, params.clientY, 10, 10);

    }
}
