const canvas = document.getElementById("pendulum");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "#202030";
context.fillRect(0,0,canvas.width,canvas.height);
const g = 10;
const r = 0.02*canvas.height;
const refRate = 25;

class Pendulum{
    constructor(i){
        this.len = (0.5*Math.min(canvas.height, canvas.width)) + (2*i*r);
        this.theta = Math.PI/4;
        this.omega = 0;
        this.dt = 0.3;
        this.pivot = {x:0.5*canvas.width,y:0.25*canvas.height};
        this.open = {x:0.5*canvas.width,y:0.2*canvas.height + this.len};
    }

    show(){
        context.fillStyle = "rgb(32, 32, 48, 0.45)";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.beginPath();
        context.lineWidth = 0.005*Math.min(canvas.width,canvas.height);
        context.moveTo(this.pivot.x,this.pivot.y);
        context.lineTo(this.open.x,this.open.y);
        context.strokeStyle = "#F0F0F0";
        context.stroke();
        context.beginPath();
        context.arc(this.open.x,this.open.y,r,0,2*Math.PI);
        context.fillStyle =  "#F0F0F0";
        context.fill();
        this.open.x = this.pivot.x + this.len*Math.sin(this.theta);
        this.open.y = this.pivot.y + this.len*Math.cos(this.theta);
        let acc = (-g/this.len)*Math.sin(this.theta);
        this.omega += acc*this.dt;
        this.theta += this.omega*this.dt;     
    }
}

let a = new Pendulum(1);

setInterval(function(){
    a.show();
    },refRate);
