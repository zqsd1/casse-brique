var canvas = document.getElementById("canvas");
var y = canvas.height / 2;
var x = canvas.width;
var nbBriquesX = 15;
var nbBriquesY =15;
var largeurBrique = x/nbBriquesX;
var hauteurBrique = y/nbBriquesY;


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
    // ctx.beginPath();
    // ctx.rect(50, 50, 10, 10);
    // ctx.fillStyle = 'red';
    // ctx.lineWidth = '2'
    // ctx.stroke();
    // ctx.fill();
    // ctx.strokeRect(50, 50, 10, 10)
}
canvas.addEventListener("mousedown", clickMouse)

function clickMouse(params) {
    

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //recup info du decalage du canvas dans la page
        var rect = canvas.getBoundingClientRect();
        //coordonné du clic
        var clicX = params.clientX-rect.x
        var clicY = params.clientY-rect.y;
        //le numero de la brique clicqué    
        var positionXBrique = Math.trunc(clicX/largeurBrique);
        var positionYBrique = Math.trunc(clicY/hauteurBrique);
        ctx.fillRect(positionXBrique*largeurBrique,positionYBrique*hauteurBrique,largeurBrique,hauteurBrique);

         
        // console.log(params.clientX - rect.x,params.offsetX, params.clientY - rect.y);
        // console.log((params.clientX-rect.x)/(x/nbBriquesX))
        // console.log((params.clientY-rect.y)/(y/nbBriquesY));
        // ctx.fillStyle = "rgba(200,0,0,0.5)";
        // ctx.fillRect(Math.trunc((params.clientX-rect.x)/(x/nbBriquesX))*x/nbBriquesX,Math.trunc((params.clientY-rect.y)/(y/nbBriquesY))*y/nbBriquesY,x / nbBriquesX, y / nbBriquesY)






        // ctx.fillStyle = "red";
        // //firefox a des prob pour la position du clic par rapport a la page et le decalage du canvas
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
