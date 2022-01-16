const canvas = document.getElementById("timer");
const context = canvas.getContext('2d');
const pixels = 14;
const theta = Math.PI/6;
const sizeFactor = 0.035;
const digitVectors = {
    1: [    [0,0,1,1,0,0],
            [0,1,1,1,0,0],
            [1,1,1,1,0,0],
            [1,1,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
        ],
    2: [    [0,0,1,1,0,0],
            [0,1,1,1,1,0],
            [1,1,0,0,1,1],
            [1,0,0,0,0,1],
            [0,0,0,0,0,1],
            [0,0,0,0,1,1],
            [0,0,0,1,1,0],
            [0,0,1,1,0,0],
            [0,1,1,0,0,0],
            [1,1,0,0,0,0],
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
        ],
    3: [    [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [0,0,0,0,1,1],
            [0,0,0,1,1,1],
            [0,0,0,1,1,0],
            [0,0,0,1,1,1],
            [0,0,0,0,1,1],
            [0,0,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
    4: [    [0,0,0,0,1,1],
            [0,0,0,1,1,1],
            [0,0,1,1,1,1],
            [0,0,1,1,1,1],
            [0,1,1,0,1,1],
            [0,1,1,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [0,0,0,0,1,1],
            [0,0,0,0,1,1],
        ],
    5: [    [1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,0,0],
            [1,1,0,0,0,0],
            [1,1,1,1,1,0],
            [1,1,1,1,1,1],
            [0,0,0,0,1,1],
            [0,0,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
    6: [    [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,0,0],
            [1,1,0,0,0,0],
            [1,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
    7: [    [1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [0,0,0,0,1,1],
            [0,0,0,0,1,1],
            [0,0,0,1,1,0],
            [0,0,0,1,1,0],
            [0,0,1,1,1,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
        ],
    8: [    [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
    9: [    [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,1],
            [0,0,0,0,1,1],
            [0,0,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
    0: [    [0,1,1,1,1,0],
            [1,1,1,1,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1],
            [1,1,1,1,1,1],
            [0,1,1,1,1,0],
        ],
}
var canvasSize = canvas.width;
var side = canvasSize*sizeFactor;

function refreshCanvas(){
    canvas.width = 0.95*Math.min(window.innerWidth,window.innerHeight);
    canvas.height = canvas.width;
    context.fillStyle = "#252530";
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvasSize = canvas.width;
    side = canvasSize*sizeFactor;
}
refreshCanvas();

class Cube{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.resetSize();
    }

    resetSize(){
        var xOff = this.x - (pixels-1)/2;
        var yOff = this.y - (pixels-1)/2;
        var zOff = this.z - (pixels-1)/2;
        this.xOffset = (canvasSize/2) + (Math.cos(theta)*side*(xOff-yOff));
        this.yOffset = (canvasSize/2) + (Math.sin(theta)*side*(xOff+yOff) + side*zOff);
    }

    drawCube(dt){
        this.resetSize();
        var pixWidth = (pixels-2)/2;
        var count = -1;
        var condition = +([0 , pixels -1].includes(this.x)) +([0 , pixels -1].includes(this.y)) +([0 , pixels -1].includes(this.z));

        if(condition > 1){
            return;
        }
        
        if (condition <= 1) {
            //Top Face hour
            if(this.y > 0 && this.y < (pixels-1) && this.x > 0 && this.x < (pixels-1)){
                var tens = Math.floor(dt.getHours()/10);
                var ones = dt.getHours()%10;
                if(this.x<=pixWidth){
                    if(!digitVectors[tens][this.y-1][this.x-1]){
                        if(this.z != 0) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
                else {
                    if(!digitVectors[ones][this.y-1][this.x-pixWidth-1]){
                        if(this.z != 0) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
            }

            //Left Face Minute
            if(this.z > 0 && this.z < (pixels-1) && this.x > 0 && this.x < (pixels-1)){
                var tens = Math.floor(dt.getMinutes()/10);
                var ones = dt.getMinutes()%10;
                if(this.x<=pixWidth){
                    if(!digitVectors[tens][this.z-1][this.x-1]){
                        if(this.y != pixels - 1) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
                else {
                    if(!digitVectors[ones][this.z-1][this.x-pixWidth-1]){
                        if(this.y != pixels - 1) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
            }

            //Right Face Second
            if(this.y > 0 && this.y < (pixels-1) && this.z > 0 && this.z < (pixels-1)){
                var tens = Math.floor(dt.getSeconds()/10);
                var ones = dt.getSeconds()%10;
                var tempY = pixels - this.y - 1;
                if(tempY<=pixWidth){
                    if(!digitVectors[tens][this.z-1][tempY-1]){
                        if(this.x != pixels - 1) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
                else {
                    if(!digitVectors[ones][this.z-1][tempY-pixWidth-1]){
                        if(this.x != pixels - 1) {
                            count += 1;
                        }
                        else {
                            return;
                        }
                    }
                }
            }
        }

        if(count != -1 && count > 0){
            return;
        }
        
        var lightness = 60;
        var topLightness = lightness*(this.z == 0 && condition <= 1);
        var leftLightness = lightness*(this.y == pixels-1 && condition <= 1);
        var rightLightness = lightness*(this.x == pixels-1 && condition <= 1);
        
        var topFill =  condition > 1 ? '#333E': 'hsla(340deg,100%,' + Math.round(topLightness + 15 + ((this.x+this.y)*10/pixels)) + '%, 0.95)';
        var leftFill = condition > 1 ? '#333E': 'hsla(60deg,100%,' + Math.round(leftLightness + 15 + (this.x*20/pixels)) + '%, 0.95)';
        var rightFill = condition > 1 ? '#444E': 'hsla(200deg,100%,' + Math.round(rightLightness + 15 + (this.y*20/pixels)) + '%, 0.95)';

        //Top face
        context.beginPath();
        context.moveTo(this.xOffset,this.yOffset);                                                          //Bottom corner
        context.lineTo(this.xOffset+(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side));            //Right corner
        context.lineTo(this.xOffset,this.yOffset-side);                                                     //Top corner
        context.lineTo(this.xOffset-(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side));            //Left corner
        context.closePath();
        context.fillStyle = topFill;
        context.fill();
        context.strokeStyle = '#1111';
        context.stroke();

        //Left face
        context.beginPath();
        context.moveTo(this.xOffset,this.yOffset);                                                          //TopRight corner
        context.lineTo(this.xOffset-(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side));            //TopLeft corner
        context.lineTo(this.xOffset-(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side) + side);     //BottomLeft corner
        context.lineTo(this.xOffset,this.yOffset+side);                                                     //BottomRight corner
        context.closePath();
        context.fillStyle = leftFill;
        context.fill();
        context.strokeStyle = '#1111';
        context.stroke();

        //Right face
        context.beginPath();
        context.moveTo(this.xOffset,this.yOffset);                                                          //Bottom corner
        context.lineTo(this.xOffset+(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side));            //Right corner
        context.lineTo(this.xOffset+(Math.cos(theta)*side),this.yOffset-(Math.sin(theta)*side) + side);     //Top corner
        context.lineTo(this.xOffset,this.yOffset+side);                                                     //Left corner
        context.closePath();
        context.fillStyle = rightFill;
        context.fill();
        context.strokeStyle = '#1111';
        context.stroke();
    }
}

var arrayOfCubes = new Array();
for(let i=0; i< pixels; i++) {
    arrayOfCubes.push([]);
    for(let j=0; j< pixels; j++) {
        arrayOfCubes[i].push([]);
        for(let k=0; k< pixels; k++) {
            arrayOfCubes[i][j].push(new Cube(i,j,k))
        }
    }
}


setInterval(function(){
    var now = new Date();
    refreshCanvas();
    for(let i=0; i< pixels; i++) {
        for(let j=0; j< pixels; j++) {
            for(let k=pixels-1; k >= 0; k--) {
                arrayOfCubes[i][j][k].drawCube(now);
            }
        }
    }
},1000);