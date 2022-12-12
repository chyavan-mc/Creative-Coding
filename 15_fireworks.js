const canvas = document.getElementById("fireworks");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.97;
canvas.height = window.innerHeight * 0.97;
let _cw_ = canvas.width;
let _ch_ = canvas.height;
const g = 10;
const t = 0.1;
const refRate = 20;
var clear = 0;
context.fillStyle = "#202030";
context.fillRect(0,0,canvas.width,canvas.height);

function clearCanvas() {
    clear += 1;
    context.fillStyle = clear%15 == 0 ? "#20203088": "#20203022";
    context.fillRect(0,0,canvas.width,canvas.height);
}

class BurstTrail {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        let u = 0.1*_ch_;
        this.theta = (2*Math.PI)*Math.random();
        this.ux = u*Math.cos(this.theta);
        this.uy = u*Math.sin(this.theta);
        this.vx = this.ux;
        this.vy = this.uy;
        this.opacity = 1;
        this.color = color + Math.round(40*(Math.random()-0.5));
    }

    getOpacity(){
        return this.opacity;
    }

    show(){
        this.vy = this.vy - 0.8*g*t;
        this.x = this.x + this.vx*t;
        this.y = this.y - this.vy*t - 0.4*g*t*t;
        context.beginPath();
        context.arc(this.x,this.y, 5, 0,2*Math.PI);
        context.fillStyle = "hsla("+this.color+",100%, 60%, " + this.opacity + ")";
        context.fill();
        this.opacity -= 0.02;
    }
}

class Firework {
    constructor(){
        this.setInitialState();
    }

    setInitialState() {
        this.x = (1.5*Math.random()-0.25)*_cw_;
        this.y = _ch_;
        let top = Math.sqrt(2*g*_ch_);
        let u = 0.5*top + 0.5*top*Math.random();
        this.theta = (Math.PI/3) + (Math.PI/3)*Math.random();
        this.ux = u*Math.cos(this.theta);
        this.uy = u*Math.sin(this.theta);
        this.vx = this.ux;
        this.vy = this.uy;
        this.peak = false;
        this.bursts = [];
        this.color = 360*Math.random();
    }

    show(){
        if(this.peak) {
            if(this.bursts.some(b => b.getOpacity() > 0)){
                this.bursts.forEach(b => {
                    b.show();
                });
            }
            else{
                this.setInitialState();
            }
        }
        else {
            this.vy = this.vy - g*t;
            if(this.vy > 0){
                this.x = this.x + this.vx*t;
                this.y = this.y - this.vy*t - 0.5*g*t*t;
                context.beginPath();
                context.arc(this.x,this.y, 3, 0,2*Math.PI);
                context.fillStyle = "hsl("+this.color+",100%, 75%)";
                context.fill();
            }
            else {
                this.peak = true;
                for(let i=0; i< 15 + 5*Math.random() ;i++){
                    this.bursts.push(new BurstTrail(this.x, this.y, this.color));
                }
                this.bursts.forEach(b => {
                    b.show();
                });
            }
        }
    }
}

var a = [];

setInterval(function(){
    clearCanvas();
    context.font = Math.min(canvas.height/8,canvas.width/8)+"px Oleo Script Swash Caps";
    context.textAlign = "center";
    context.fillStyle = "#FFFFFF";
    context.fillText("Happy Diwali!", canvas.width/2, canvas.height/2);
    
    if(a.length < 10) {
        if(Math.random() < 0.05){
            a.push(new Firework());
        }
    }
    a.forEach(fw => {
        fw.show();
    });
    },refRate);
