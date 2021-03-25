class Balle {
    constructor(x, y/*TODO canvasAssocie*/) {
        this.r = 10;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        //si la balle touche plusieur brique en meme temps sa risque d'inverser plusieur fois sa direction et finalement sa va rien changer
        // donc changement possible que 1 fois
        this.isVxModified = false;
        this.isVyModified = false;


        this.canvas = canvas
        this.maxX = canvas.width;
        this.maxY = canvas.height;

    }

    draw(ctx){
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "black";
        ctx.arc(balle.x, balle.y, balle.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    //TODO find a way to =>inverseV(param){isV$modified}     wildcard
    inverserVx() {
        if (!this.isVxModified) {
            this.vx = -this.vx;
            this.isVxModified = true;
        }

    }
    inverserVy() {
        if (!this.isVyModified) {
            this.vy = -this.vy;
            this.isVyModified = true;
        }

    }

    start(){
        this.vx = 100;
        this.vy = 200
    }
    mouvement(secondsPassed) {
        this.isVxModified = false;
        this.isVyModified = false;

        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        if (this.x > this.maxX || this.x < 0) {

            this.inverserVx();
        }

        if (this.y > this.maxY || this.y < 0) {

            //TODO
            // canvas.dispatchEvent(eventBallePerdue);

            this.inverserVy();

        }
    }
}

class Rectangle {

    constructor(x, y, w, h, color) {
        this.x =x;
        this.y = y;
        this.w=w;
        this.h=h;
        this.color = color;
    }

}
class Brique extends Rectangle {
    constructor(x, y, w, h, color, pv) {
        super(x, y, w, h, color)
        this.pv;

    }
    draw(ctx){
        ctx.beginPath();
        ctx.save();
        ctx.rect(brique.x, brique.y, brique.w, brique.h);
        ctx.fillStyle = config.difficulte[brique.niveau];
        ctx.fill();
        ctx.restore();
    }

    hit() {
        return this.pv--;

        //TODO event PV = 0 => remove from briques
    }
    //TODO deces
}
class Barre extends Rectangle {

    constructor(w,h,color, canvas) {
        super(canvas.width/2-w/2, canvas.height-3*h,w,h,color)

        this.maxX = canvas.width;

        this.vx = 100;
    }
    mouvement(isDirRight = true, secondsPassed) {
        //test si ça deborde pas du canvas
        if (isDirRight ? this.x + this.w < this.maxX : this.x > 0) {
            isDirRight ? this.x += this.vx * secondsPassed : this.x -= this.vx * secondsPassed;
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = barre.color;
        ctx.fillRect(barre.x, barre.y, barre.w, barre.h);
        ctx.restore();
    }
}
