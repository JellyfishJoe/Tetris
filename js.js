const canvas = document.getElementById('gameLayer');
const ctx = canvas.getContext('2d');

let gridSize = 20;

let squareH = canvas.height / gridSize;
let squareW = canvas.width / gridSize;

let gameGrid = [];

let rightl = [{x: 5, y: 7, free: true}, {x: 6, y: 7, free: true}, {x: 5, y: 6, free: false}, {x: 5, y: 5, free: false}];
let leftl = [];
let square = [];
let rightz = [];
let leftz = [];
let line = [];

let shapes = [rightl, leftl, square, rightz, leftz, line]

let curBlock = shapes[0];

ctx.fillStyle = '#ff0000';

function buildGrid(){
	for(i = 0; i < gridSize; i++){
		gameGrid.push([]);
		for(j = 0; j < gridSize; j++){
			gameGrid[i].push(0);
		}
	}
}

buildGrid();

function drawGrid(){
	ctx.strokeStyle = '0x000000';
	for(var i = 0; i < gridSize + 1; i ++){
		ctx.moveTo(0, i * squareH);
		ctx.lineTo(canvas.width, i * squareH);

		ctx.moveTo(i * squareW, 0);
		ctx.lineTo(i * squareW, canvas.height);
	}
	ctx.stroke();
}

document.addEventListener('keydown', function(event){
	switch(event.keyCode){
		case 87:
			rotate(curBlock);
			break;
		case 32:
			gameLoop();
			break;
		case 65:
			slideCur(-1);
			break;
		case 68:
			slideCur(1);
			break;
		case 81:
			chooseShape();
			break;
	}
});

function slideCur(dir){

}

function rotate(cur){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//drawGrid();
	let affMat = [0,-1,
				  1, 0];
	for(i = 1; i < cur.length; i ++){
		gameGrid[cur[i].y][cur[i].x] = 0;
		x = cur[i].x - cur[0].x;
		y = cur[i].y - cur[0].y;
		cur[i].x = x*affMat[0] + y*affMat[1] + cur[0].x;
		cur[i].y = x*affMat[2] + y*affMat[3] + cur[0].y;
		gameGrid[cur[i].y][cur[i].x] = 1;
	}
	ctx.fillStyle = 'red';
	drawCurrentBlock(curBlock);
	console.log(gameGrid);
	freenessUpdate(cur);
}

function freenessUpdate(cur){
	for(i = 0; i < cur.length; i++){
		for(j = 0; j < cur.length; j++){
			if(cur[i].x = cur[j].x && cur[i].y + 1 == cur[j].y){
				cur[i].free = false;
			} else{
				cur[i].free = true;
			}
		}
	}
}

function collisionCheck(cur){
	console.log('check');
	for(i = 0; i < cur.length; i++){
		if(cur[i].free == true){
			console.log('true');
			console.log(gameGrid[cur[i].y + 1][cur[i].x] == 1);
			console.log(gameGrid[cur[i].y + 1][cur[i].x] > gridSize);
			if(cur[i].y + 1 > gridSize || gameGrid[cur[i].y + 1][cur[i].x] == 1){
				console.log('blocked');
				return true;
			} else{
				return false;
			}
		}
	}
}

function chooseShape(){
	let rand = Math.floor(Math.random*5);
}

function addShape(cur){
	console.log(gameGrid);
	cur.forEach(function(block){
		gameGrid[block.y][block.x] = 1;
	});
	drawCurrentBlock(cur);
}

function drawCurrentBlock(cur){
	cur.forEach(function(block){
		ctx.fillRect(squareW*block.x, squareH*block.y, squareW, squareH);
	});
}

function gameLoop(){
	console.log('game run');
	if(!collisionCheck(curBlock)){
		curBlock.forEach(function(block){
			gameGrid[block.y][block.x] = 0
		});
		curBlock.forEach(function(block){
			block.y += 1;
			gameGrid[block.y][block.x] = 1
		});
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//drawGrid();
		drawCurrentBlock(curBlock);
		console.log(gameGrid);
	} else{
		console.log('stop');
	}
}

addShape(curBlock);

//let gameInterval = setInterval(gameLoop, 1000);