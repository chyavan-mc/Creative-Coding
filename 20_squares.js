canvas = document.getElementById("squares");
context = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, window.innerHeight);
canvas.height = canvas.width;
context.fillStyle="#202030"
context.fillRect(0,0,canvas.width,canvas.height);
rand = Math.round(Math.random()*10-5)
class Square{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.xc = ((5+(5*i))/100)*canvas.width;
        this.yc = ((5+(5*j))/100)*canvas.width;
        this.theta = (i-rand*j)*Math.PI/36;
        this.len = (2.5/100)*(1+0.8*Math.sin(this.theta))*canvas.width;
        this.x = this.xc-this.len/2;
        this.y = this.yc-this.len/2;
        this.draw();
    }
    draw(){
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x,this.y,this.len,this.len);
        this.theta += 0.05;
        this.len = (2.5/100)*(1+0.8*Math.sin(this.theta))*canvas.width;
        this.x = this.xc-this.len/2;
        this.y = this.yc-this.len/2;
    }
}

let a = new Array();
for(let i=0; i<19; i++){
    a.push(new Array());
    for(let j=0; j<19; j++){
        a[i].push(new Square(i,j));
    }
}


setInterval(function(){
    context.fillStyle="#202030"
    context.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<19; i++){
        for(let j=0; j<19; j++){
            a[i][j].draw();
        }
    }
}, 40);