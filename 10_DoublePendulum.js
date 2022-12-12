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
    constructor(parent){
        this.parent = parent;
        this.len = 0.15*Math.min(canvas.height,canvas.width);;
        this.theta = Math.PI;
        this.omega = 0;
        this.dt = 0.2;
        if(typeof this.parent == 'object'){
            this.parent.child = this;
            this.pivot = {x:parent.open.x,y:parent.open.y};}
        else{   this.pivot = { x:parent,y:0.4*canvas.height};
                this.theta += (this.parent*0.0001/canvas.width);}
        this.open = {x:this.pivot.x,y:this.pivot.y + this.len};
    }

    show(){
        if(typeof this.parent == 'object'){
            this.parent.show();
            this.pivot.x = this.parent.open.x;
            this.pivot.y = this.parent.open.y;
            this.open.x = this.pivot.x + this.len*Math.sin(this.theta);
            this.open.y = this.pivot.y + this.len*Math.cos(this.theta);
            this.acc = ((-g/this.len)*Math.sin(this.theta)) - this.parent.acc;
        }
        else{
            this.open.x = this.pivot.x + this.len*Math.sin(this.theta);
            this.open.y = this.pivot.y + this.len*Math.cos(this.theta);
            this.acc = (-g/this.len)*Math.sin(this.theta) + (g*Math.cos(this.child.theta)*Math.sin(this.child.theta-this.theta))/this.len;
            }
        this.omega += this.acc*this.dt;
        this.theta += this.omega*this.dt;

        context.beginPath();
        context.lineWidth = 0.005*Math.min(canvas.width,canvas.height);
        context.moveTo(this.pivot.x,this.pivot.y);
        context.lineTo(this.open.x,this.open.y);
        context.lineCap = "round";
        context.strokeStyle = "#F0F0F0";
        context.stroke();
        context.beginPath();
        context.arc(this.open.x,this.open.y,r,0,2*Math.PI);
        context.fillStyle =  "#F0F0F0";
        context.fill();
    }
}

let a = new Pendulum(new Pendulum(0.25*canvas.width));
let b = new Pendulum(new Pendulum(0.75*canvas.width));

setInterval(function(){
    context.fillStyle = "rgb(32,32,48,1)";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font = Math.min(canvas.height/20,canvas.width/20)+"px Lucida Console";
    context.textAlign = "center";
    context.fillStyle = "#FFFFFF";
    context.fillText("CHAOS", canvas.width*0.5, canvas.height*0.75);
    a.show();
    b.show();
    },refRate);