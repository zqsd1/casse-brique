var canvas = document.getElementById("canvas");
if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

}
canvas.addEventListener("mousedown", clickMouse)

function clickMouse(params) {
    console.log("hello");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var rect = canvas.getBoundingClientRect();
        ctx.fillStyle = "red";
        //firefox a des prob pour la position du clic par rapport a la page et le decalage du canvas
//pas décallé
        ctx.fillRect(params.offsetX, params.offsetY, 10, 10);
        ctx.fillStyle = 'rgba(0,0,200,0.5)';
        //pas decallé... ou alors de 1px
        ctx.fillRect(params.clientX - rect.x, params.clientY - rect.y, 10, 10);
        ctx.fillStyle = 'green'
        //decallé => origine de la page + le decalage du canvas
        ctx.fillRect(params.clientX, params.clientY, 10, 10);

    }
}
