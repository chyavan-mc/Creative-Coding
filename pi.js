canvas = document.getElementById('pi');
context = canvas.getContext('2d');
canvas.width = 0.9*Math.min(window.innerHeight,window.innerWidth);
canvas.height = canvas.width;

context.fillStyle="#202030";
context.fillRect(0,0,canvas.width,canvas.height);
p = document.getElementById('value');
p.style="font-family: Arial, Helvetica, sans-serif;font-size: "+ canvas.width/25 +"px; margin-top:0px;"+"color:#FFFFFF; font-weight:900";

function drop(){
    let xc = Math.random();
    let yc = Math.random();
    let r = (Math.sqrt((xc*xc)+(yc*yc))<1)?1:0;
    let color ="#202030";
    if(r<1){color = "rgba(255, 68, 68)";}
    else{color = "rgba(68, 255, 68)";}
    context.beginPath();
    context.arc(xc*canvas.width, yc*canvas.width, canvas.width/400, 0, Math.PI*2);
    context.fillStyle = color;
    context.fill();
    return r;
}

let pi_value = 0;
let count = 0;
let k = 0;

setInterval(function(){
    context.beginPath();
    context.arc(0, 0, canvas.width, 0, Math.PI*2);
    context.strokeStyle = "rgba(255,255,255)";
    context.stroke();
    for(let i=0;i<10;i++){
    count+=1;
    k += drop();
    pi_value = 4*(k/count);}
    context.fillStyle="rgba(32, 32, 48,0.08)";
    context.fillRect(0,0,canvas.width,canvas.height);
    
},20);

setInterval(function(){
    context.beginPath();
    context.arc(0, 0, canvas.width, 0, Math.PI*2);
    context.strokeStyle = "rgba(255,255,255)";
    context.stroke();
    context.fillStyle="rgba(32, 32, 48,0.3)";
    context.fillRect(0,0,canvas.width,canvas.height);
    p.innerHTML = `<a href="https://en.wikipedia.org/wiki/Monte_Carlo_method" style="color: rgb(255,255,255);"> PI = `+ pi_value.toFixed(10) +` </a>`;
},1000);