const canvas = document.getElementById("canv");
const context = canvas.getContext("2d");
canvasSize = 0.99;
canvas.width = window.innerWidth*canvasSize;
canvas.height = window.innerHeight*canvasSize;
let count = 0;
class Drop {
    constructor() {
        this.initializeDrop();
    }

    initializeDrop(){
        this.x = Math.random() * canvas.width;
        this.len = Math.floor(Math.random() * 10) + 4;
        this.acc = 1 + (this.len / 5);
        this.y = -6 - (Math.random() * 5);
        this.time = 0;
    }
    
    drawDrop() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.len);
        context.strokeStyle = 'white';
        context.lineCap = 'butt';
        context.lineWidth = 1 + (this.len) / 12;
        context.stroke();
        this.time += 0.2;
        this.y += this.acc * (this.time * this.time);
        if (this.y > canvas.height) {
            this.initializeDrop();
        }
    }
}

function drawRect(color) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function lightning() {
    count += 1;
    let happend = false;
    let dice = Math.random();
    if (((count > 91 && count < 93) || (count > 95 && count < 98)) && dice > 0.5) {
        drawRect("white");
        happend = true;
    }
    if ((count > 98 && count < 101) && dice > 0.5) {
        drawRect("white");
        count = 0;
        happend = true;
    }
    if (count > 101) {
        count = 0;
    }
    return happend;
}

let rainDrops = Math.floor(window.innerWidth / 4);
let array = new Array();
let boo = false;

setInterval(function() {
    rainDrops = Math.floor(window.innerWidth / 4);
    canvas.width = window.innerWidth*canvasSize;
    canvas.height = window.innerHeight*canvasSize;
    drawRect("#202030");
    if(array.length < rainDrops) {
        if(Math.random() < 0.2){
            array.push(new Drop());
        }
    }
    boo = lightning();
    if (boo == false) {
        array.forEach(drop => {
            drop.drawDrop();
        });
    }
}, 50);