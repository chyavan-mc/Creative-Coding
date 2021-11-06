const canvas = document.getElementById("sinCircle");
const context = canvas.getContext('2d');
canvas.width = 0.95*Math.min(window.innerWidth, window.innerHeight);
canvas.height = canvas.width;

context.fillStyle = "#383030";
context.fillRect(0,0, canvas.width, canvas.height);
let r = 0.35*canvas.width;

class Liner{
    constructor(i,n, tr, count){
        this.pos_theta = (2*Math.PI*i/n)+(tr*Math.PI/n);
        this.theta = count*(this.pos_theta + (tr*Math.PI));
        this.len = -0.05*canvas.width + 0.2*canvas.width*Math.sin(this.theta);
        this.x = canvas.width/2 + r*Math.cos(this.pos_theta);
        this.y = canvas.height/2 + r*Math.sin(this.pos_theta);
        this.draw();
    }

    draw(){
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x+this.len*Math.cos(this.pos_theta), this.y+this.len*Math.sin(this.pos_theta));
        context.strokeStyle = "#FFF";
        context.lineWidth = 2*canvas.width/720;
        context.lineCap = "round";
        context.stroke();
        this.theta += 0.05;
        this.len = -0.05*canvas.width + 0.2*canvas.width*Math.sin(this.theta);
    }
}


let a = new Array();
let N = 50;
let count =1;

for(let i=0; i<N; i++){
    a.push(new Liner(i,N,0,count));
    a.push(new Liner(i,N,1,count));
}
id = setInterval(function(){
    context.fillStyle = "#383030";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.font="bold "+ 20*canvas.width/720 +"px arial";
    context.fillStyle = "#FFF";
    context.textAlign = "center"; 
    context.fillText("T A P", canvas.width/2, canvas.height/2);
    for(let i=0; i<2*N; i++){
        a[i].draw();
    }

}, 25);

canvas.onmousedown = function(){
    clearInterval(id);
    a.length = 0;
    count%=6;
    count+=1;
    for(let i=0; i<N; i++){
        a.push(new Liner(i,N,0,count));
        a.push(new Liner(i,N,1,count));
    }
    id = setInterval(function(){
        context.fillStyle = "#383030";
        context.fillRect(0,0, canvas.width, canvas.height);
        context.font="bold "+ 20*canvas.width/720 +"px arial";
        context.fillStyle = "#FFF";
        context.textAlign = "center"; 
        context.fillText("T A P", canvas.width/2, canvas.height/2);
        for(let i=0; i<2*N; i++){
            a[i].draw();
        }
    }, 25);
}