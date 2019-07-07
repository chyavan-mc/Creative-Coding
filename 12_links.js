canvas = document.getElementById("links");
context = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
context.fillStyle="#38403C";
context.fillRect(0,0,canvas.width,canvas.height);

class Dot{
    constructor(){
        this.start = {x:canvas.width/2, y:canvas.height/2};
        this.end = {x:(0.2+0.6*Math.random())*canvas.width, y:(0.2+0.6*Math.random())*canvas.height};
        this.now = this.start;
        this.now.prob = Math.random();
        this.startR = (0.004+0.020*Math.random())*Math.min(canvas.width,canvas.height);
        this.endR = (0.004+0.020*Math.random())*Math.min(canvas.width,canvas.height);
        this.nowR = this.startR;
        this.dR = 0.01*(this.endR-this.startR);
        this.D=euclid(this.start,this.end);
        this.dr=0.01*this.D;
        this.theta = Math.atan2(this.end.y-this.start.y, this.end.x-this.start.x);
        this.count = 0;
    }

    draw(){
        context.beginPath();
        context.arc(this.now.x,this.now.y,this.nowR,0,2*Math.PI);
        context.fillStyle = "#E8F0E0";
        context.fill();
        if(this.count<10){this.count++; return;}

        if(euclid(this.now,this.start)<euclid(this.start,this.end)/2){
            this.dR+=0.0005*(this.endR-this.startR);
            this.dr+=0.0005*this.D;}
        else{
            this.dR-=0.0005*(this.endR-this.startR);
            this.dr-=0.0005*this.D;}
        this.now.x += this.dr*Math.cos(this.theta);
        this.now.y += this.dr*Math.sin(this.theta);
        this.nowR += this.dR;

        if((euclid(this.end,this.start)-euclid(this.start,this.now))/this.D < 0.01){
            this.start.x = this.end.x;
            this.start.y = this.end.y;
            this.end.x = (0.2+0.6*Math.random())*canvas.width;
            this.end.y = (0.2+0.6*Math.random())*canvas.height;
            this.now.x = this.start.x;
            this.now.y = this.start.y;
            this.nowR = this.endR;
            this.startR = this.endR;
            this.endR = (0.004+0.020*Math.random())*Math.min(canvas.width,canvas.height);
            this.dR = 0.01*(this.endR-this.startR);
            this.D=euclid(this.start,this.end);
            this.dr=0.01*this.D;
            this.theta = Math.atan2(this.end.y-this.start.y, this.end.x-this.start.x);
            this.count = 0;
        }
    }
}

function euclid(objA,objB){
    return Math.sqrt(((objA.x-objB.x)*(objA.x-objB.x))+((objA.y-objB.y)*(objA.y-objB.y)));
}

function lines(objA, objB){
    context.beginPath();
    context.strokeStyle = "#E8F0E0";
    context.moveTo(objA.now.x,objA.now.y);
    context.lineTo(objB.now.x,objB.now.y);
    context.lineWidth = (0.25*((objA.nowR + objB.nowR)/2)+0.1)*(Math.min(canvas.width,canvas.height)/800);
    context.lineCap = "round";
    context.stroke();
}

let a = new Array();
const dots = 20;
for(let i=0;i<dots;i++){
    a.push(new Dot());
}

setInterval(function(){
    context.fillStyle="#38403C";
    context.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<dots-1;i++){
        lines(a[i],a[i+1]);
    }
    for(let i=0;i<dots;i++){
        a[i].draw();}
    },25);