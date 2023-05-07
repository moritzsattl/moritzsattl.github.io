class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 3;
    }

    draw(canvas){
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2 * Math.PI);
        ctx.stroke();
    }

}

function fibonacci(n) {
    return n < 1 ? 0
         : n <= 2 ? 1
         : fibonacci(n - 1) + fibonacci(n - 2)
}

function main(r,p,m){
    let canvas = this.document.querySelector('canvas');
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#141414";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let midx = canvas.width/2;
    let midy = canvas.height/2;
    let radius = r;
    let pointsCount = p;
    let mod = m;
    
    let points = [];
    

    for(let i = 0; i < pointsCount; i++){
        points.push(new Point(midx + radius * Math.cos(i/pointsCount * (2 * Math.PI) - Math.PI/2),midy + radius * Math.sin(i/pointsCount * (2 * Math.PI) - Math.PI/2)));
        points[i].draw(canvas);
    }


    let lenOfFibs = 1000;

    var i;
    var fib = [0, 1]; // Initialize array!

    for (i = 2; i < lenOfFibs; i++) {
      // Next fibonacci number = previous + one before previous
      fib[i] = fib[i - 2] + fib[i - 1];
    }

    fib = fib.map(el => el % mod);
    console.log(points)
    console.log(fib)

    for(let i = 0; i < lenOfFibs - 1;i++){
        ctx.beginPath();
        ctx.moveTo(points[fib[i]].x, points[fib[i]].y);
        ctx.lineTo(points[fib[i + 1]].x, points[fib[i + 1]].y);
        ctx.stroke();
    }
}

window.addEventListener("DOMContentLoaded",function(){

    main(100,document.querySelector('#pointsRange').value,document.querySelector('#moduloRange').value)
    
})



document.querySelector('#pointsRange').addEventListener("input",function(event){
    event.target.parentElement.querySelector('.value').innerHTML = event.target.value;

    document.querySelector('#moduloRange').max = event.target.value;
    

    main(100,event.target.value,document.querySelector('#moduloRange').value)
})

document.querySelector('#moduloRange').addEventListener("input",function(event){
    event.target.parentElement.querySelector('.value').innerHTML = event.target.value;

    main(100,document.querySelector('#pointsRange').value,event.target.value)
})




