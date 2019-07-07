canvas = document.getElementById("field");
context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "#FFFFFF";
context.fillRect(0,0,canvas.width,canvas.height);
const a = 0.5*euclid(canvas.width/2,canvas.height/2);

class Star{
    constructor(){
        this.reset();
        for(let i=0;i<Math.round(1000*Math.random());i++){
            this.draw();
        }
    }

    reset(){
        this.coord = {x:canvas.width/2,y:canvas.height/2};
        this.theta = Math.random()*2*Math.PI;
        this.k = Math.random();
        this.len = 0.001*euclid(canvas.width,canvas.height)*(1+this.k);
        this.t = 0;
    }

    draw(){
        if(this.coord.x>canvas.width || this.coord.x<0 ||this.coord.y>canvas.height || this.coord.y<0){this.reset();return;}
        this.d = euclid(this.coord.x-canvas.width/2,this.coord.y-canvas.height/2)/euclid(canvas.width/2,canvas.height/2);
        context.beginPath();
        context.moveTo(this.coord.x,this.coord.y);
        context.lineTo(this.coord.x+this.len*Math.cos(this.theta),this.coord.y+this.len*Math.sin(this.theta));
        this.coord.x+=a*this.t*this.t*Math.cos(this.theta)*(0.5+this.d)*this.k;
        this.coord.y+=a*this.t*this.t*Math.sin(this.theta)*(0.5+this.d)*this.k;
        this.t+=0.01;
        context.lineWidth = (euclid(canvas.width,canvas.height)/600)+this.d;
        context.lineCap = "round";
        this.len += (euclid(canvas.width,canvas.height)/6)*this.d*this.d*this.d*this.k*this.k;
        context.strokeStyle= "rgba(255,255,255,"+ Math.sqrt(this.d)*this.k +")";
        context.stroke();
    }
}

function euclid(x,y){
    return Math.sqrt(x*x + y*y);
}

let stars = new Array();
for(let i=0;i<200;i++){
    stars.push(new Star());
}

setInterval(function(){
    context.fillStyle = "#202028";
    context.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<200;i++){
        stars[i].draw();
    }
    for(let i=0;i<0.05;i+=0.005){
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,i*euclid(canvas.width,canvas.height),0,Math.PI*2);
        context.fillStyle = "rgb(32, 32, 40,"+ (0.5-i) +")";
        context.fill();
    }
},40);