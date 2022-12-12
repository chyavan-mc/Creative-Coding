const canvas = document.getElementById("Moon");
const context = canvas.getContext('2d');
canvas.width = 0.95*Math.min(window.innerWidth,window.innerHeight);
canvas.height = 0.95*Math.min(window.innerWidth,window.innerHeight);
context.fillStyle = "#202030";
context.fillRect(0, 0, canvas.width, canvas.height);
let circleR = 0.45*Math.min(window.innerWidth,window.innerHeight);
let now = new Date();
let timer = now.getSeconds() + now.getMinutes()*60;
let ID = null;

function start(){
    ID = setInterval(function(){
        let ne = new Date();
        let s = ne.getSeconds() + ne.getMinutes()*60 - timer;
        if(s>60){
            clearInterval(ID);
            context.fillStyle = "#202030";
            context.fillRect(0, 0, canvas.width, canvas.height);
            timer = ne.getSeconds() + ne.getMinutes()*60;
            start();}
        let theta = 2*Math.PI*Math.random();
        let x1 = circleR*Math.cos(theta) + (canvas.width/2);
        let y1 = circleR*Math.sin(theta) + (canvas.height/2);
        theta = 2*Math.PI*Math.random();
        let x2 = circleR*Math.cos(theta) + (canvas.width/2);
        let y2 = circleR*Math.sin(theta) + (canvas.height/2);
        context.strokeStyle = "rgba(255,255,255,0.4)";
        context.lineCap = "round";
        context.lineWidth = 0.005*canvas.height;
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.stroke();
    },20);
}

start();