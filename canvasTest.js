
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);

    }
    drawCanvas3()
}

function drawCanvas3(params) {
    //si on fait âs restore /save la couleur/ l'apha reste
    var ctx = document.getElementById('canvas3').getContext('2d');

    ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle with default settings
    ctx.save();                  // Save the default state

    ctx.fillStyle = '#09F';      // Make changes to the settings
    ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

    ctx.save();                  // Save the current state
    ctx.fillStyle = '#FFF';      // Make changes to the settings
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

    ctx.restore();               // Restore previous state
    ctx.fillRect(45, 45, 60, 60);   // Draw a rectangle with restored settings

    //ctx.restore();               // Restore original state
    ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with restored settings
}


document.addEventListener("keydown", keydown);
function keydown(event, opt) {
    console.log(event);
    if (event.code == "Space") {
        event.preventDefault();
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

             ctx.save();
             ctx.fillStyle = "green";
             ctx.fillRect(50, 100, 100, 5);

             ctx.restore();
            
            ctx.save();
            ctx.fillStyle = 'rgba(200, 0, 200, 0.5)';
            ctx.fillRect(150, 300, 100, 50);
            ctx.restore();
            ctx.save();
            
            
            ctx.rotate(5 * Math.PI / 180);//la rotate se fait par rapport à l'origine (0,0) du canvas
            ctx.fillRect(150, 300, 100, 50);

            ctx.restore();
            ctx.translate(150,300);//translate change l'origine (0,0)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(0,0,20,20);
            ctx.rotate(20*Math.PI/180);
            ctx.fillRect(0,0,40,40);

            //prend l'origine précendente pour aller à une nouvelle 
            //rotate influ sur l'axe x/y
            ctx.translate(100,100);

            ctx.fillStyle="red";
            ctx.fillRect(0,0,50,50);

        }
    }
    //a
    if (event.keyCode == 65) {
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw2();
        }
    }
    //z
    if (event.keyCode == 90) {
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw3();
        }
    }
}
function draw2() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);  // Cercle extérieur
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Bouche (sens horaire)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Oeil gauche
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Oeil droite
        ctx.stroke();
    }
}
function draw3(params) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //ctx.beginPath();
        ctx.arc(100, 100, 70, 0, Math.PI * 2);
        //ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fill()
    }
}
