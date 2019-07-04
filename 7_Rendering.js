const canvas = document.getElementById("Rayer");
const context = canvas.getContext('2d');
canvas.width = (window.innerWidth>window.innerHeight)?window.innerWidth*0.45:window.innerWidth;
canvas.height = (window.innerWidth<window.innerHeight)?window.innerHeight*0.45:window.innerHeight;
context.fillStyle = "#202040";
context.fillRect(0, 0, canvas.width, canvas.height);
walls = new Array();
walls.push({x1:0,x2:canvas.width,y1:0,y2:0});
walls.push({x1:0,x2:0,y1:0,y2:canvas.height});
walls.push({x1:0,x2:canvas.width,y1:canvas.height,y2:canvas.height});
walls.push({x1:canvas.width,x2:canvas.width,y1:0,y2:canvas.height});

const render = document.getElementById("Render");
const ctx = render.getContext('2d');
render.width = (window.innerWidth>window.innerHeight)?window.innerWidth*0.45:window.innerWidth;
render.height = (window.innerWidth<window.innerHeight)?window.innerHeight*0.45:window.innerHeight;
ctx.clearRect(0,0,render.width,render.height);
let clickID = null;
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
rotor = 0;

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

function walled(x,y, theta){
    let block = {d:Number.POSITIVE_INFINITY};
    for(let i=0; i<4; i++){
        let den = ((walls[i].x1-walls[i].x2)*Math.sin(theta))-((walls[i].y1-walls[i].y2)*Math.cos(theta));
        if(den==0){continue;}
        let t = (((walls[i].x1-x)*Math.sin(theta))-((walls[i].y1-y)*Math.cos(theta)))/den;
        let u = (((walls[i].x1-walls[i].x2)*(walls[i].y1 - y))-((walls[i].y1-walls[i].y2)*(walls[i].x1-x)))/den;
        if(t>0 && t<1 && u>0){
            let intX = walls[i].x1 + t*(walls[i].x2-walls[i].x1);
            let intY = walls[i].y1 + t*(walls[i].y2-walls[i].y1);
            if(block.d > euclid(x,y,intX,intY)){block.d = euclid(x,y,intX,intY); block.xy = [intX,intY];}
        }
    }
    return block.xy;
}


function euclid(x1,y1,x2,y2){
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
}

function drawRays(x,y,clicked){
    let n = 90;
    let rectWidth = render.width/n;
    let theta = rotor;
    let fovc = Math.PI/8;
    for(let i=0; i<n; i++){
        let xy = blocked(x,y,theta);
        if(xy){
            context.beginPath();
            context.strokeStyle = "rgba(255,255,255,0.15)";
            context.lineWidth = 0.002*Math.min(canvas.width,canvas.height);
            context.moveTo(x,y);
            context.lineTo(xy[0],xy[1]);
            context.stroke();
            drawRender(n,i,rectWidth,false,Math.abs(euclid(x,y,xy[0],xy[1])*Math.cos(fovc-theta+rotor)));
        }
        else{
            xy = walled(x,y,theta);
            context.beginPath();
            context.strokeStyle = "rgba(255,255,255,0.15)";
            context.lineWidth = 0.002*Math.min(canvas.width,canvas.height);
            context.moveTo(x,y);
            context.lineTo(xy[0],xy[1]);
            context.stroke();
            drawRender(n,i,rectWidth,true,null);}
        theta+= ((Math.PI*0.25)/n);
    }
    if(clicked==1){rotor -= ((4*Math.PI)/n);}
    if(clicked==2){rotor += ((4*Math.PI)/n);}
}

function drawRender(n,i,w,b,d){
    let h = render.height;
    let D = Math.max(render.width,render.height);
    if(b==true){
        ctx.fillStyle = "#101020";
        ctx.fillRect(i*w, 0, w, h/2);
        ctx.fillStyle = "#505060";
        ctx.fillRect(i*w, h/2, w, h);
    }
    else{
        ctx.fillStyle = "#101020";
        ctx.fillRect(i*w, 0, w, h/2);
        ctx.fillStyle = "#505060";
        ctx.fillRect(i*w, h/2, w, h);
        let k = (D-d)/D;
        ctx.fillStyle = "rgb("+(k*k*100+30)+","+(k*k*100+30)+","+(k*k*176+53)+")";
        ctx.fillRect(i*w, h*(1-k)/2, w+3, h*k);
        ctx.beginPath();
        ctx.strokeStyle = "rgb("+(k*k*100+30)+","+(k*k*100+30)+","+(k*k*176+53)+")";
        ctx.rect(i*w, h*(1-k)/2, w, h*k);
        ctx.stroke();
    }
}


canvas.onmousemove = function(){
    context.fillStyle = "#202040";
    context.fillRect(0, 0, canvas.width, canvas.height);
    Liner(Lines);
    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    drawRays(x,y);
}

canvas.onmousedown = function(){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let e = event.button;
    clickID = setInterval(function(){
        context.fillStyle = "#202040";
        context.fillRect(0, 0, canvas.width, canvas.height);
        Liner(Lines);
        drawRays(x,y,e+1)},50);
    
}

canvas.onmouseup = function(){
    clearInterval(clickID);
}