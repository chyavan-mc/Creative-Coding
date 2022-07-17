canvas = document.getElementById('wave');
context = canvas.getContext('2d');
canvas.width = 0.95*Math.min(window.innerWidth, window.innerHeight);
canvas.height = canvas.width;
context.fillStyle = "#101018";
context.fillRect(0,0, canvas.width, canvas.height);

r = 0.002*Math.min(canvas.width, canvas.height);
d = 0.02*Math.min(canvas.width, canvas.height);
k = 3;


function euclid(x, y) {
    let deltaX = x - canvas.width/2;
    let deltaY = y - canvas.height/2;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY); 
}

class Dot {
    constructor(x, y) {
        this.yc = y;
        this.x = x;
        this.y = y;
        this.mag = k - k*euclid(x,y)/(canvas.width/2);
        this.mag = this.mag >= 0 ? this.mag : 0;
        this.dy = this.mag*d;
        this.osc = Math.cos(0.03*euclid(x,y));
        this.draw();
    }

    draw() {
        context.beginPath();
        context.arc(this.x,this.yc,r,0,2*Math.PI);
        context.fillStyle =  "#F0F0F0";
        context.fill();
        this.yc = this.y - this.dy*Math.cos(this.osc);
        this.osc += 0.12;
    }
}


a = new Array();
for(let i=0; i < canvas.width/d; i++) {
    a.push(new Array());
    for(let j=-1; j <= canvas.height/d; j++) {
        a[i].push(new Dot(i*d, j*d));
    }
}
setInterval(
    function() {
        context.fillStyle = "#101018";
        context.fillRect(0,0, canvas.width, canvas.height);
        a.forEach(row => {
            row.forEach(item => {
                item.draw();
            });
        });
    },
    30
);
