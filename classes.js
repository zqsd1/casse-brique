class Balle {
    constructor(x, y/*TODO canvasAssocie*/) {
        this.radius = 10;
        this.x = x;
        this.y = y;
        this.vx = 100;
        this.vy = 200;
        this.isVxModified = false;
        this.isVyModified = false;


        this.canvas = canvas
        this.maxX = canvas.width;
        this.maxY = canvas.height;

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

            this.inverserY();

        }
    }
}

class Rectangle {

    constructor(x, y, w, h, color) {
        this.x;
        this.y;
        this.w;
        this.h;
        this.color;
    }

}
class Brique extends Rectangle {
    constructor(x, y, w, h, color, pv) {
        super(x, y, w, h, color)
        this.pv;

    }

    hit() {
        return this.pv--;

        //TODO event PV = 0 => remove from briques
    }
    //TODO deces
}
class Barre extends Rectangle {

    constructor(x, y, w, h, color, canvas) {
        super(x, y, w, h, color)

        this.maxX = canvas.width;

        this.vx = 500;
    }
    mouvement(isDirRight = true, secondsPassed) {
        //test si ça deborde pas du canvas
        if (isDirRight ? this.x + this.w < this.maxX : this.x > 0) {
            isDirRight ? this.x += this.vx * secondsPassed : this.x -= this.vx * secondsPassed;
        }
    }
}
