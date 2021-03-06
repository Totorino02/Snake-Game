const canvas = document.querySelector('.canvas');
const scoreDiv = document.querySelector('.scoreDiv');
const ctx = canvas.getContext('2d');
const edge = (Math.PI/180)*(360);
const box = 20; 
const Buttons = document.getElementsByTagName('button');

let topdir=leftdir=rightdir=downdir=false;
let d;
let score = 0;
let snake =[];
snake[0]={x:6*box, y:7*box};

let food = {
    x: (Math.floor(Math.random()*19)+1.5)*box,
    y: (Math.floor(Math.random()*19)+1.5)*box,
}
//let us draw rect
drawRect = (x,y,w,h,color)=>{
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

//draw food
drawFood = (x,y)=>{
    ctx.fillStyle="gold"
    ctx.beginPath();
    ctx.arc(x,y,0.5*box,0,edge);
    ctx.fill()
}

document.addEventListener('keydown', (e)=>{direction(e)});

direction = (e)=>{ 
    if(e.keyCode==37 && d!="RIGHT"){
        d="LEFT"
    }else if(e.keyCode==38 && d!="DOWN"){
        d="UP"
    }else if(e.keyCode==39 && d!="LEFT"){
        d="RIGHT"
    }else if(e.keyCode==40 && d!="UP"){
        d="DOWN"
    }
}

move = ()=>{ 
    snake.pop();
    if(d=='LEFT') snakeX-=box;
    if(d=="RIGHT") snakeX+=box;
    if(d=="UP") snakeY-=box;
    if(d=='DOWN') snakeY+=box;
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

//collisions detection and actions
collision = (head,array)=>{
    for(let i=0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true
        }else{
            return false
        }
    }
}
del =()=>{snake.pop();}

scored =()=>{
    scoreDiv.innerText=score;
};scored()


// the main function
draw = ()=>{

    drawRect(0,0,400,400,"black")
    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = (i==0)? 'red':"green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    drawFood(food.x, food.y);
    
    for(let i=0; i<Buttons.length;i++){
        Buttons[i].addEventListener('click', ()=>{dir()})
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    del();

    if(d=='LEFT') snakeX-=box;
    if(d=="RIGHT") snakeX+=box;
    if(d=="UP") snakeY-=box;
    if(d=='DOWN') snakeY+=box;
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);


    if(snakeX==food.x-10 && snakeY==food.y-10){
        food = {
            x: (Math.floor(Math.random()*19)+1.5)*box,
            y: (Math.floor(Math.random()*19)+1.5)*box,
        }
        //drawFood(food.x, food.y);
        snake.unshift(newHead);
        score++
        scored()
    }else{
       //snake.pop() 
    }

    if(snakeX < 0 || snakeX >19*box ||snakeY < 0 || snakeY >19*box ){
        clearInterval(game);
    }

}
//game loop
let game = setInterval(draw, 100);
