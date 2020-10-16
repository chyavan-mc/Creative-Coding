const canvas = document.getElementById("cubes");
const context = canvas.getContext("2d");
canvas.width = 0.98 * window.innerWidth;
canvas.height = 0.98 * window.innerHeight;
context.fillStyle = "#202030";
context.fillRect(0, 0, canvas.width, canvas.height);
const mid = { x: canvas.width / 2, y: canvas.height / 2 };
const numb = 12;

class Cube {
    constructor(i) {
        this.i = i;
        this.a = (40 + 20 * i) * (Math.min(mid.x, mid.y) / 300) * (12 / numb);
        this.A = this.a / Math.sqrt(2);
        this.B = this.a / 2;
        this.theta = 0;
        this.pt = new Array();
        this.pt.push({ y: mid.y - (this.a / 2) + this.B * Math.sin(this.theta), x: mid.x + this.A * Math.cos(this.theta) });
        this.pt.push({ y: mid.y + (this.a / 2) + this.B * Math.sin(this.theta), x: mid.x + this.A * Math.cos(this.theta) });
        this.pt.push({ y: mid.y - (this.a / 2) - this.B * Math.sin(this.theta), x: mid.x - this.A * Math.cos(this.theta) });
        this.pt.push({ y: mid.y + (this.a / 2) - this.B * Math.sin(this.theta), x: mid.x - this.A * Math.cos(this.theta) });
        this.pt.push({ y: mid.y - (this.a / 2) + this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x + this.A * Math.cos(this.theta + Math.PI / 2) });
        this.pt.push({ y: mid.y + (this.a / 2) + this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x + this.A * Math.cos(this.theta + Math.PI / 2) });
        this.pt.push({ y: mid.y - (this.a / 2) - this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x - this.A * Math.cos(this.theta + Math.PI / 2) });
        this.pt.push({ y: mid.y + (this.a / 2) - this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x - this.A * Math.cos(this.theta + Math.PI / 2) });
        this.count = (70 - 7 * i) * (numb / 10);
    }

    drawLine(pt1, pt2, width) {
        context.beginPath();
        context.strokeStyle = "rgba(255,255,255," + (1 - (this.i / (1.2 * numb))) + ")";
        context.moveTo(pt1.x, pt1.y);
        context.lineTo(pt2.x, pt2.y);
        context.lineWidth = width;
        context.lineCap = "round";
        context.stroke();
    }

    show() {
        for (let i = 0; i < 4; i++) {
            this.drawLine(this.pt[2 * i], this.pt[2 * i + 1], 1);

            this.drawLine(this.pt[i], this.pt[4 + (i % 2)], 1);
            this.drawLine(this.pt[i], this.pt[6 + (i % 2)], 1);
        }
        if ((this.pt[0].x == (mid.x + this.A) || this.pt[0].x == (mid.x - this.A)) && this.count < 40 + 6 * numb) {
            this.count += 1;
            return;
        }

        this.theta -= 0.005 * Math.PI;
        this.count = 0;
        this.pt[0] = { y: mid.y - (this.a / 2) + this.B * Math.sin(this.theta), x: mid.x + this.A * Math.cos(this.theta) };
        this.pt[1] = { y: mid.y + (this.a / 2) + this.B * Math.sin(this.theta), x: mid.x + this.A * Math.cos(this.theta) };
        this.pt[2] = { y: mid.y - (this.a / 2) - this.B * Math.sin(this.theta), x: mid.x - this.A * Math.cos(this.theta) };
        this.pt[3] = { y: mid.y + (this.a / 2) - this.B * Math.sin(this.theta), x: mid.x - this.A * Math.cos(this.theta) };
        this.pt[4] = { y: mid.y - (this.a / 2) + this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x + this.A * Math.cos(this.theta + Math.PI / 2) };
        this.pt[5] = { y: mid.y + (this.a / 2) + this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x + this.A * Math.cos(this.theta + Math.PI / 2) };
        this.pt[6] = { y: mid.y - (this.a / 2) - this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x - this.A * Math.cos(this.theta + Math.PI / 2) };
        this.pt[7] = { y: mid.y + (this.a / 2) - this.B * Math.sin(this.theta + Math.PI / 2), x: mid.x - this.A * Math.cos(this.theta + Math.PI / 2) };

    }
}

let a = new Array();
for (let i = 0; i < numb; i++) {
    a.push(new Cube(i));
}
setInterval(function() {
    context.fillStyle = "#202030";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numb; i++) {
        a[i].show();
    }
}, 10);