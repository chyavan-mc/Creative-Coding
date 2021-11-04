const canvas = document.getElementById("her");
length = 0.85*Math.floor(Math.min(window.innerHeight,window.innerWidth));
canvas.width = length;
canvas.height = length;
const context = canvas.getContext("2d");
context.fillStyle = "#202030";
context.fillRect(0, 0, canvas.width, canvas.height);
let balls = 21;
h = 0.045*Math.min(document.body.clientWidth, document.body.clientHeight);
let text = document.getElementById("Ballcount");
text.style = "font-family:\"Lucida Console\";font-size:"+ (0.55*h) +"px; color:"+ "#EBEB7D; background-color: #202030";
text.innerHTML = "Lines : " + (balls-1);


let intID = null;

function increaser(){
    clearInterval(intID);
    balls+=5;
    text.innerHTML = "Lines : " + (balls-1);
    context.fillStyle = "#202030";
    context.fillRect(0, 0, canvas.width, canvas.height);
    start();
}

function decreaser(){
    clearInterval(intID);
    if((balls-5)>=5){balls-=5;}
    text.innerHTML = "Lines : " + (balls-1);
    start();
}

function fromCenter(x0,y0){
    return [x0+(canvas.width/2),y0+(canvas.height/2)];
}

class Point{
    constructor(number){
        this.number = number;
        this.r = ((number+1)*canvas.width)*(0.45/balls);
        this.coXY = [this.r+(canvas.width/2),0+(canvas.height/2)];
        this.circleR = 0.10*length/balls;
        this.theta = 0;
    }
    drawPoint(){
        context.beginPath();
        context.fillStyle = "#E0E0E0";
        context.arc(this.coXY[0],this.coXY[1],this.circleR,0,2*Math.PI);
        context.fill();
    }
    updatePosition(){
        this.coXY = [(this.r*Math.cos(this.theta))+(canvas.width/2),(this.r*Math.sin(this.theta))+(canvas.height/2)];
        this.theta -= (balls-this.number)*(100/(balls+10))*Math.PI/2000;
    }
}

function drawOnCanvas(points){
    for(let i=0; i<balls-1;i++){
        context.beginPath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 2*canvas.width*10/(500*balls);
        context.moveTo(points[i].coXY[0], points[i].coXY[1]);
        context.lineTo(points[i+1].coXY[0], points[i+1].coXY[1]);
        context.stroke();
    }
    for(let i=0; i<balls;i++){
        points[i].drawPoint();
    }
}

function start(){
    let points = new Array();
    for(let i=0; i<balls;i++){
        points.push(new Point(i));
    }
    intID = setInterval(function(){
        context.fillStyle = "#202030";
        context.fillRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<balls;i++){
            points[i].updatePosition();
        }
        drawOnCanvas(points);
    },34);
}