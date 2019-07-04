const canvas = document.getElementById("canv");
const context = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Drop{

    constructor(){

	this.x = Math.random()*canvas.width;

	this.len = Math.floor(Math.random()*8)+4;
	this.acc = 1+(this.len/10);
	this.y = -6-(Math.random()*5);
	this.time = 0;
    }

    drawDrop(){
	context.beginPath();
	context.moveTo(this.x,this.y);

        context.lineTo(this.x,this.y+this.len);

        context.strokeStyle = 'white';

        context.lineCap = 'butt';

        context.lineWidth = 1 + (this.len)/12;

        context.stroke();

        this.time+=0.2;

        this.y += this.acc*(this.time*this.time);

        if(this.y> canvas.height){

            this.x = Math.random()*canvas.width;

            this.len = Math.floor(Math.random()*10)+4;

            this.acc = 1+(this.len/5);

            this.y = -2-(Math.random()*5);

            this.time = 0;

        }
    }
}

			
let count = 0;

let dice = 1;
			

function lightning(){
    
	count+=1;
    
	let happend = false;
    
	if (count==91){ dice = Math.random();
}

	if (((count > 91 && count < 93)||(count > 95 && count < 98)) && dice>0.5){
        
	context.clearRect(0,0,canvas.width, canvas.height);

	context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);happend = true;}
	if ((count > 98 && count < 101) && dice>0.5){

		context.clearRect(0,0,canvas.width, canvas.height);
		context.fillStyle = "white";
	
        context.fillRect(0, 0, canvas.width, canvas.height);
count = 0;

		happend = true;

		let audio = new Audio("https://github.com/ChyavanKoushik/Reverse-Shell-Python/blob/master/thunder.mp3");
		audio.play();     }

	if(count>101){count=0;}
	return happend
;}


let rainDrops = Math.floor(window.innerWidth/4);

let array = new Array();

for(let i=0;i<rainDrops;i++){

    array.push(new Drop());    
}
let boo = false;
setInterval(function(){

	rainDrops = Math.floor(window.innerWidth/4);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.clearRect(0,0,canvas.width, canvas.height);
	context.fillStyle = "#303540";
	context.fillRect(0, 0, canvas.width, canvas.height);
	boo = lightning();

	if (boo==false){

        	for(let i=0;i<rainDrops;i++){array[i].drawDrop();
    }}},
    50);