canvas = document.getElementById("particles");
context = canvas.getContext('2d');
let width, height;
const N = 100;
let clicked = false;
let clickX = 0;
let clickY = 0;
let mode = true;

function setCanvasBG(){
    width = 0.95*window.innerWidth;
    height = 0.95*window.innerHeight;
    canvas.height = height;
    canvas.width = width;
    context.fillStyle = "#282040";
    context.fillRect(0,0, width, height);
}

function euclid(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) );
}

class Particle {
    constructor() {
        this.start();
        let offset = Math.round(101*Math.random());
        for(let i=0; i< offset; i++){
            this.count();
        }
    }

    start() {
        this.x = width*Math.random();
        this.y = height*Math.random();
        this.theta = Math.PI*2*Math.random();
        this.initSpeed = 0.25 + 0.5*Math.random();
        this.speed = 0;
        this.size = 3 + 3*Math.random();
        this.opacity = 0;
        this.iter = 0;
        this.total = 200;
    }

    count(clicked = false) {
        if(clicked) {
            let d = euclid(this.x,this.y, clickX, clickY);
            let r = Math.min(width, height)/2;
            if(d < r){
                this.initSpeed += 0.25*Math.pow((r-d)/r, 2);
                let minus = mode? 1: -1;
                this.theta = Math.atan2(minus*(this.y - clickY), minus*(this.x - clickX));
            }
        }
        this.x = this.x + this.speed*Math.cos(this.theta);
        this.y = this.y + this.speed*Math.sin(this.theta);
        let m = this.iter/this.total;
        this.iter++;
        let func = 4*m*(1-m);
        // let func = -Math.cos(m*Math.PI*2)/2;
        this.speed = func*this.initSpeed;
        this.opacity = 30*func;
    }

    print() {
        if(this.iter > 0.99* this.total) {
            this.start();
        }
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fillStyle = "rgb(255 255 255 /" + this.opacity + "%)";
        context.fill();
    }

    draw(clicked = false) {
        this.count(clicked);
        this.print();
    }
}

setCanvasBG();

let a = new Array();

for(let i=0; i< N; i++) {
    a.push(new Particle());
}

setInterval(
    function() {
        setCanvasBG();
        a.forEach(p => {
            p.draw(clicked);
        });
        clicked = false;
    },
    25
)

canvas.onmousemove = function(){
    let rect = canvas.getBoundingClientRect();
    clickX = event.clientX - rect.left;
    clickY = event.clientY - rect.top;
    clicked = true;
}
canvas.onmousedown = function(){
    mode = !mode;
}