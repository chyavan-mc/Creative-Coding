const canvas = document.getElementById("pendulum");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "#303050";
context.fillRect(0,0,canvas.width,canvas.height);
const g = 10;
const r = 0.02*canvas.height;
const refRate = 25;
numb = 15;

class Pendulum{
    constructor(i){
        this.len = (0.15*canvas.height) + (2*i*r);
        this.theta = Math.PI/8;
        this.omega = 0;
        this.dt = 0.3;
        this.pivot = {x:0.5*canvas.width,y:0.1*canvas.height};
        this.open = {x:0.5*canvas.width,y:0.1*canvas.height + this.len};
        this.rgb = Math.round(255*(i+20)/(numb+20));
    }

    show(){
        context.beginPath();
        context.lineWidth = 0.005*Math.min(canvas.width,canvas.height);
        context.moveTo(this.pivot.x,this.pivot.y);
        context.lineTo(this.open.x,this.open.y);
        context.lineCap = "round";
        context.strokeStyle = "rgb("+this.rgb+","+this.rgb+","+this.rgb+")";
        context.stroke();
        context.beginPath();
        context.arc(this.open.x,this.open.y,r,0,2*Math.PI);
        context.fillStyle =  "rgb("+this.rgb+","+this.rgb+","+this.rgb+")";
        context.fill();
        this.open.x = this.pivot.x + this.len*Math.sin(this.theta);
        this.open.y = this.pivot.y + this.len*Math.cos(this.theta);
        let acc = (-g/this.len)*Math.sin(this.theta);
        this.omega += acc*this.dt;
        this.theta += this.omega*this.dt;     
    }
}

let a = new Array();
for(let i=0;i<numb;i++){
    a.push(new Pendulum(i+1));
}

setInterval(function(){
    context.fillStyle = "rgb(48,48,80,0.9)";
    context.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<numb;i++){
        a[i].show();
    }
    },refRate);