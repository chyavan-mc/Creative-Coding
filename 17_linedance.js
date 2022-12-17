canvas = document.getElementById('linedance');
context = canvas.getContext('2d');
canvas.width = 0.99*Math.min(window.innerWidth,window.innerHeight);
canvas.height = canvas.width;
context.fillStyle = "#202030";
context.fillRect(0,0, canvas.width, canvas.height);

class Line{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.xc = (canvas.width/40)*(1 + 2*i);
        this.yc = (canvas.width/40)*(1 + 2*j);
        this.theta = (i+3*j)*Math.PI/38;
        this.draw();
    }

    
    draw(){
        context.beginPath();
        context.moveTo(this.xc-(canvas.width/75)*sin(this.theta),this.yc-(canvas.width/75)*cos(this.theta));
        context.lineTo(this.xc+(canvas.width/75)*sin(this.theta),this.yc+(canvas.width/75)*cos(this.theta));
        context.strokeStyle = "#FFF";
        context.lineWidth = 3;
        context.lineCap = "round";
        this.theta+=0.05;
        this.theta%=(2*Math.PI);
        context.stroke();
    }

    drawer(x,y){
        context.beginPath();
        this.theta = Math.atan2((this.yc-y),(this.xc-x));
        this.theta = (this.theta + (2*Math.PI))%(2*Math.PI);
        context.moveTo(this.xc-(canvas.width/75)*Math.cos(this.theta),this.yc-(canvas.width/75)*Math.sin(this.theta));
        context.lineTo(this.xc+(canvas.width/75)*Math.cos(this.theta),this.yc+(canvas.width/75)*Math.sin(this.theta));
        context.strokeStyle = "#FFF";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.stroke();
    }
}


function sin(theta){
    if(theta>0 && theta<=Math.PI/2){return -Math.sin(4*theta)/2;}
    else if(theta>Math.PI/2 && theta<=3*Math.PI/2){return -Math.cos(theta);}
    return Math.sin(2*theta);
}

function cos(theta){
    return Math.sqrt(1-sin(theta)*sin(theta));
}


let a = new Array();
var id;
for(let i=0; i<20; i++){
    a.push(new Array());
    for(let j=0;j<20;j++){
        a[i].push(new Line(i,j));
    }
}
id = setInterval(function(){
    context.fillStyle = "#202030";
    context.fillRect(0,0, canvas.width, canvas.height);
    for(let i=0; i<20; i++){
        for(let j=0;j<20;j++){
            a[i][j].draw();
        }
    }
},40);

canvas.onmousemove = function(){
    clearInterval(id);
    context.fillStyle = "#202030";
    context.fillRect(0,0, canvas.width, canvas.height);
    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    for(let i=0; i<20; i++){
        for(let j=0;j<20;j++){
            a[i][j].drawer(x,y);
        }
    }
}

canvas.onmouseout = function(){
    id = setInterval(function(){
        context.fillStyle = "#202030";
        context.fillRect(0,0, canvas.width, canvas.height);
        for(let i=0; i<20; i++){
            for(let j=0;j<20;j++){
                a[i][j].draw();
            }
        }
    },40);
}
