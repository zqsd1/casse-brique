var balle = {
    posX : 100,
    posY : 100,
    radius:50,
    couleur : "purple",
    direction : "left",
    

}

function draw(balle) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx= canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        ctx.arc(balle.posX,balle.posY,balle.radius,0,Math.PI*2,true);
        ctx.fillStyle= balle.couleur;
        ctx.fill();      
        
    }

}

draw(balle);

window.setInterval(bouger,300,balle);
function bouger(balle) {
    draw(balle)
    if (balle.direction =="left") {
        if (balle.posX + balle.radius >= document.getElementById("canvas").width) {
            balle.direction = "right";
            balle.posX -= 10;
            
        }
        else
        {
            balle.posX += 10;
        }
    }
    
    if (balle.direction =="right") {
        if (balle.posX - balle.radius <= 0) {
            balle.direction = "left";
            balle.posX += 10;
            
        }
        else
        {
            balle.posX -= 10;
        }
    }

}