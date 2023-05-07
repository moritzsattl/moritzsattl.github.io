class Particle{
    constructor(x,y,size,speed,acc,direction){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.acc = acc;
        this.dir = direction;
    }

    draw(canvas){
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

class Pixel{
    constructor(x,y,size,noise){
        this.x = x;
        this.y = y;
        this.size = size;
        this.noise = noise;
        //TODO:and force factor which also corresponds with the length of the drawn vector
    }

    draw(canvas){
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x,this.y,this.size,this.size);
        ctx.fill();
    }

    drawFlowField(canvas){
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.x + this.size/2,this.y + this.size/2);
        ctx.lineTo(this.x + this.size/2 + this.size * Math.cos(this.noise),this.y + this.size/2 + this.size * Math.sin(this.noise))
        ctx.stroke();
        
    }
}

let pixels = [];
let canvas, ctx;
let time = 0;

function gameLoop(){
    ctx.fillStyle = "#141414";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "white";
    for(let i = 0; i < pixels.length; i++){
        let pixel = pixels[i];
        angleNoise = noise.perlin3(pixel.x / pixel.size / 10, pixel.y / pixel.size / 10, time);
        pixel.noise = 2 * Math.PI * angleNoise;
        pixel.drawFlowField(canvas);
    }
    time+=0.001
        
    requestAnimationFrame(gameLoop);
}

function main(){
    canvas = this.document.querySelector('canvas');
    ctx = canvas.getContext("2d");
    
    let pixelSize = 25;
    noise.seed(Math.random());
    
    for(let y = pixelSize; y < canvas.height - pixelSize; y+=pixelSize){
        for(let x = pixelSize; x < canvas.width - pixelSize; x+=pixelSize){
            let p = new Pixel(x,y,pixelSize, 0);
            pixels.push(p)
        }
        x = 0;
    }

    
    gameLoop();
    
    
}

window.addEventListener("DOMContentLoaded",function(){

    main();
    
})





