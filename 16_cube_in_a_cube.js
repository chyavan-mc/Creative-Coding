canvas = document.getElementById("cubes");
context = canvas.getContext('2d');

length = 0.9*Math.floor(Math.min(window.innerHeight,window.innerWidth));
canvas.width = length;
canvas.height = length;
context.fillStyle = "#202030";
context.fillRect(0, 0, canvas.width, canvas.height);
side = 0.45*length*0.5;
theta = Math.PI/8;
angle_multiplier = Math.sin(theta);
angle_multiplier_2 = Math.cos(theta);
n = 3;
order = [4,2,1,3,5,0]
steps = 50;

positions = {
    left: [
        [0,0],
        [0,side*angle_multiplier_2],
        [-side/Math.sqrt(2), -side*angle_multiplier + side*angle_multiplier_2],
        [-side/Math.sqrt(2), -side*angle_multiplier]
    ],
    right: [
        [0,0],
        [0,side*angle_multiplier_2],
        [side/Math.sqrt(2), -side*angle_multiplier + side*angle_multiplier_2],
        [side/Math.sqrt(2), -side*angle_multiplier]
    ],
    top: [
        [0,0],
        [-side/Math.sqrt(2), -side*angle_multiplier],
        [0, -2*side*angle_multiplier],
        [side/Math.sqrt(2), -side*angle_multiplier]
    ],
}

locations = {
    0: [0,0],
    1: [0,side*angle_multiplier_2],
    2: [side/Math.sqrt(2), -side*angle_multiplier + side*angle_multiplier_2],
    3: [side/Math.sqrt(2), -side*angle_multiplier],
    4: [0, -2*side*angle_multiplier],
    5: [-side/Math.sqrt(2), -side*angle_multiplier]
}

let diff = 8;
let high = 40 + diff;
let med = 40;
let low = 40 - diff;
lights = {
    0: [high,med,med],
    1: [low,med,med],
    2: [low,low,med],
    3: [high,low,med],
    4: [high,low,low],
    5: [high,med,low]
}

function drawPolygon(origin, part, fillStyle) {
    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(origin[0] + positions[part][0][0], origin[1] + positions[part][0][1]);
    for(let idx=1; idx < positions[part].length; idx++) {
        context.lineTo(origin[0] + positions[part][idx][0], origin[1] + positions[part][idx][1]);
    }
    context.closePath();
    context.fill();
}

function getOrder(a,b) {
    return (order.indexOf(a) - order.indexOf(b))
}

class Cube {
    constructor(i) {
        this.i = i;
        this.k = 2*i
        this.x = length/2 + locations[this.k][0];
        this.y = length/2 + locations[this.k][1];
        this.x_init = this.x;
        this.y_init = this.y;
        this.position = this.k;
        this.hue = 270 + 30*i;
        this.count = 0;
        
        this.top_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][0] + "%)";
        this.left_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][1] + "%)";
        this.right_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][2] + "%)";
        
        this.top_light_init = lights[this.k][0];
        this.left_light_init = lights[this.k][1];
        this.right_light_init = lights[this.k][2];
    }

    draw() {
        drawPolygon([this.x, this.y], "top", this.top_hue);
        drawPolygon([this.x, this.y], "left", this.left_hue);
        drawPolygon([this.x, this.y], "right", this.right_hue);
        this.move();
    }

    move() {
        this.count+=1;
        // this.hue += 0.2;
        if (this.count%steps == 0) {
            this.k = (this.k+1)%6;
            this.count = 0;
            this.x = length/2 + locations[this.k][0];
            this.y = length/2 + locations[this.k][1];
            this.x_init = length/2 + locations[this.k][0];
            this.y_init = length/2 + locations[this.k][1];
            this.position = this.k;

            this.top_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][0] + "%)";
            this.left_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][1] + "%)";
            this.right_hue = "hsl(" + this.hue + ", 75%, " + lights[this.k][2] + "%)";
            this.top_light_init = lights[this.k][0];
            this.left_light_init = lights[this.k][1];
            this.right_light_init = lights[this.k][2];
        }
        else {
            let multiplier = Math.pow(Math.sin(Math.PI*this.count/(2*steps)),2)
            this.x = this.x_init + (locations[(this.k+1)%6][0] - locations[this.k][0])*multiplier
            this.y = this.y_init + (locations[(this.k+1)%6][1] - locations[this.k][1])*multiplier

            
            this.top_hue = "hsl(" + this.hue + ", 75%, " + (this.top_light_init + (lights[(this.k+1)%6][0] - lights[this.k][0])*multiplier) + "%)";
            this.left_hue = "hsl(" + this.hue + ", 75%, " + (this.left_light_init + (lights[(this.k+1)%6][1] - lights[this.k][1])*multiplier) + "%)";
            this.right_hue = "hsl(" + this.hue + ", 75%, " + (this.right_light_init + (lights[(this.k+1)%6][2] - lights[this.k][2])*multiplier) + "%)";
        }
    }
    
    getPosition() {
        return this.position;
    }

}


let cubes = new Array();
for(let i=0; i<n;i++){
    cubes.push(new Cube(i));
}

setInterval(
    function start(){
        context.fillStyle = "#202030";
        context.fillRect(0, 0, canvas.width, canvas.height);
        cubes = cubes.sort((a,b) => getOrder(a.getPosition(),b.getPosition()))
        for(let i=0; i<n; i++){
            cubes[i].draw();
        }
    }
    , 20);