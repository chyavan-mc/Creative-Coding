const canvas = document.getElementById("Rayer");
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "#202040";
context.fillRect(0, 0, canvas.width, canvas.height);
let Lines = null;
let mouseoverID = null;
let NoLines = 5;
context.font = "BOLDER " + Math.min(canvas.height/5,canvas.width/5)+"px Lucida Console";
context.textAlign = "center";
context.fillStyle = "#FFFFFF";
context.fillText("CLICK", canvas.width/2, canvas.height/2);
context.font = Math.min(canvas.height/25,canvas.width/25)+"px Lucida Console";
context.textAlign = "center";
context.fillStyle = "#FFFFFF";
context.fillText("o r   m o v e   m o u s e", canvas.width/2, canvas.height*5.5/10);


function Liner(L){
    if(L==null){
        L = new Array();
        for(let i=0;i<NoLines;i++){
        let x1 = (Math.random()*canvas.width*0.9)+(0.05*canvas.width);
        let y1 = (Math.random()*canvas.height*0.9)+(0.05*canvas.height);
        let x2 = (Math.random()*canvas.width*0.9)+(0.05*canvas.width);
        let y2 = (Math.random()*canvas.height*0.9)+(0.05*canvas.height);
        context.beginPath();
        context.lineWidth = 0.01*Math.min(canvas.width,canvas.height);
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.strokeStyle = "#B0B0E0";
        context.stroke();
        let obj = {x1:x1,x2:x2,y1:y1,y2:y2};
        L.push(obj);
        }
        Lines = L;
    }

    else{
        for(let i=0;i<NoLines;i++){
            let x1 = L[i].x1;
            let y1 = L[i].y1;
            let x2 = L[i].x2;
            let y2 = L[i].y2;
            context.beginPath();
            context.lineWidth = 0.01*Math.min(canvas.width,canvas.height);
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.strokeStyle = "#B0B0E0";
            context.stroke();
        }

    }
}

function blocked(x,y, theta){
    let block = {d:Number.POSITIVE_INFINITY};
    for(let i=0; i<NoLines; i++){
        let den = ((Lines[i].x1-Lines[i].x2)*Math.sin(theta))-((Lines[i].y1-Lines[i].y2)*Math.cos(theta));
        if(den==0){continue;}
        let t = (((Lines[i].x1-x)*Math.sin(theta))-((Lines[i].y1-y)*Math.cos(theta)))/den;
        let u = (((Lines[i].x1-Lines[i].x2)*(Lines[i].y1 - y))-((Lines[i].y1-Lines[i].y2)*(Lines[i].x1-x)))/den;
        if(t>0 && t<1 && u>0){
            let intX = Lines[i].x1 + t*(Lines[i].x2-Lines[i].x1);
            let intY = Lines[i].y1 + t*(Lines[i].y2-Lines[i].y1);
            if(block.d > euclid(x,y,intX,intY)){block.d = euclid(x,y,intX,intY); block.xy = [intX,intY];}
        }
    }
    return block.xy;
}

function euclid(x1,y1,x2,y2){
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
}

function drawRays(x,y){
    let n = 720;
    let theta = Math.PI/10;
    for(let i=0; i<n; i++){
        xy = blocked(x,y,theta)
        if(xy){
            context.beginPath();
            context.strokeStyle = "rgba(255,255,255,0.15)";
            context.lineWidth = 0.002*Math.min(canvas.width,canvas.height);
            context.moveTo(x,y);
            let r = Math.max(canvas.width,canvas.height);
            context.lineTo(xy[0],xy[1]);
            context.stroke();
        }
        else{
            context.beginPath();
            context.strokeStyle = "rgba(255,255,255,0.15)";
            context.lineWidth = 0.002*Math.min(canvas.width,canvas.height);
            context.moveTo(x,y);
            let r = Math.max(canvas.width,canvas.height);
            context.lineTo(x+(r*Math.cos(theta)),y+(r*Math.sin(theta)));
            context.stroke();}
        theta+= ((2*Math.PI)/n);
    }
}

canvas.onmousemove = function(){
    context.fillStyle = "#202040";
    context.fillRect(0, 0, canvas.width, canvas.height);
    Liner(Lines);
    x = event.clientX;
    y = event.clientY;
    drawRays(x,y);
}

canvas.onmousedown = function(){
    context.fillStyle = "#202040";
    context.fillRect(0, 0, canvas.width, canvas.height);
    Liner(Lines);
    x = event.clientX;
    y = event.clientY;
    drawRays(x,y);
}