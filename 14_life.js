let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
const cellWidth = 20;
const refRate = 200;
const buffer = 3;

const parent = document.getElementById("parent");
parent.className = innerWidth > innerHeight ? "h-flex" : "v-flex";
parent.style.width = innerWidth + 'px';
parent.style.height = innerHeight + 'px';

const canvas = document.getElementById("lifeCanvas");
const context = canvas.getContext("2d");

let width = innerWidth > innerHeight ? Math.floor(0.7*innerWidth/cellWidth)*cellWidth : Math.floor(innerWidth/cellWidth)*cellWidth;
let height = innerWidth > innerHeight ? Math.floor(innerHeight/cellWidth)*cellWidth : Math.floor(0.7*innerHeight/cellWidth)*cellWidth;
canvas.width = width;
canvas.height = height;
const xTotal = (width/cellWidth) + 2*buffer;
const yTotal = (height/cellWidth) + 2*buffer;

class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.alive = false;
        this.newAlive = false;
    }

    show(){
        context.fillStyle = this.alive? "#1AA260":"#FFF";
        context.fillRect((this.x-buffer)*cellWidth + 2, (this.y-buffer)*cellWidth + 2, cellWidth - 4, cellWidth - 4);
    }

    calculate(cells){
        let aliveCount = 0;
        var counter1=0;
        var counter2=0;
        var counter3=0;
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                counter1+=1;
                if(i==0 && j==0){ continue;}
                counter2+=1;
                if(this.x+i < 0 || this.x+i > (cells.length-1) || this.y+j < 0 || this.y+j > (cells[0].length-1)){continue;}
                counter3+=1;
                if(cells[this.x+i][this.y+j].alive) {
                    aliveCount += 1;
                }
            }
        }
        if(this.alive){
            if(aliveCount == 2 || aliveCount == 3){this.newAlive = true;}
        }
        else {
            if(aliveCount == 3) {this.newAlive = true;}
        }
    }

    setAlive(alive){
        this.alive = alive;
    }

    toggleAlive(){
        this.alive = !this.alive;
    }

    switchAliveToNew(){
        this.alive = this.newAlive;
        this.newAlive = false;
    }
}

let cells = [];
for(let i=0; i< xTotal; i++){
    cells.push([]);
    for(let j=0; j< yTotal; j++){
        cells[i].push(new Cell(i,j));
    }
}

function drawAll(){
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,width,height);
    
    for(let j=0; j< yTotal; j++){
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(0, j*cellWidth);
        context.lineTo(width, j*cellWidth);
        context.strokeStyle = "#DDD";
        context.stroke();
    }

    for(let i=0; i< xTotal; i++){
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(i*cellWidth,0);
        context.lineTo(i*cellWidth,height);
        context.strokeStyle = "#DDD";
        context.stroke();
    }

    for(let i=0; i< xTotal-buffer; i++){
        for(let j=0; j< yTotal-buffer; j++){
            cells[i][j].show();
        }
    }
}

function clearAll(){
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,width,height);
    
    for(let j=0; j< yTotal; j++){
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(0, j*cellWidth);
        context.lineTo(width, j*cellWidth);
        context.strokeStyle = "#DDD";
        context.stroke();
    }

    for(let i=0; i< xTotal; i++){
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(i*cellWidth,0);
        context.lineTo(i*cellWidth,height);
        context.strokeStyle = "#DDD";
        context.stroke();
    }

    for(let i=0; i< xTotal; i++){
        for(let j=0; j< yTotal; j++){
            cells[i][j].setAlive(false);
            cells[i][j].show();
        }
    }
}

function calculateAlive(){
    for(let i=0; i< xTotal; i++){
        for(let j=0; j< yTotal; j++){
            cells[i][j].calculate(cells);
        }
    }
    for(let i=0; i< xTotal; i++){
        for(let j=0; j< yTotal; j++){
            cells[i][j].switchAliveToNew();
        }
    }
}

function moveStep(){
    calculateAlive();
    drawAll();
}


var id;
function onStart(){
    let isActive = false;
    for(let i=0; i< xTotal; i++){
        for(let j=0; j< yTotal; j++){
            isActive = isActive || cells[i][j].alive;
        }
    }
    if(id || !isActive ){return;}
    id = setInterval(moveStep,refRate);
}

function onStop() {
    if(id!=null){
        clearInterval(id);
        id = null;
    }
}

function onRandomize(){
    for(let i=0; i< xTotal; i++){
        for(let j=0; j< yTotal; j++){
            let v = Math.random();
            cells[i][j].setAlive( v > 0.85 );
        }
    }
    moveStep();
}

function onStepForward(){
    if(id==null){
        moveStep();
    }
}


function onClearAll(){
    onStop();
    clearAll();
}

canvas.onmousedown = function(){
    if(id == null){
        const rect = canvas.getBoundingClientRect();
        const i = Math.floor((event.clientX - rect.left)/cellWidth);
        const j = Math.floor((event.clientY - rect.top)/cellWidth);
        cells[i+buffer][j+buffer].toggleAlive();
        cells[i+buffer][j+buffer].show();
    }
}

onRandomize();