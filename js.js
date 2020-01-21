const canvas = document.getElementById('gameLayer');
const ctx = canvas.getContext('2d');

let gridSize = 20;

let squareH = canvas.height / gridSize;
let squareW = canvas.width / gridSize;

let gameGrid = [];

let rightl = [{x: 9, y: 7}, {x: 9, y: 5}, {x: 9, y: 6}, {x: 10, y: 7}];
let leftl = [{x: 9, y: 7}, {x: 9, y: 5}, {x: 9, y: 6}, {x: 8, y: 7}];
let square = [{x: 9, y: 7}, {x: 8, y: 7}, {x: 8, y: 8}, {x: 9, y: 8}];
let rightz = [{x: 9, y: 7}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 8, y: 7}];
let leftz = [{x: 9, y: 7}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 7}];
let line = [{x: 9, y: 7}, {x: 9, y: 5}, {x: 9, y: 6}, {x: 9, y: 8}];
let tee = [{x: 9, y: 7}, {x: 8, y: 7}, {x: 10, y: 7}, {x: 9, y: 8}];
let shapes = [rightl, leftl, square, rightz, leftz, line, tee];

let curBlock = shapes[2];

let index = shapes.indexOf(curBlock);
console.log(index);

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
			slideCur(curBlock, -1); //move left
			break;
		case 68:
			slideCur(curBlock, 1); //move right
			break;
		case 67:
			chooseShape();
			break;
		case 90:
			index += 1;
			if(index > shapes.length - 1){
				index = 0;
			}
			curBlock = shapes[index];
			drawCurrentBlock(curBlock);
			break;
		case 88:
			index -= 1;
			if(index < 0){
				index = shapes.length - 1;
			}
			curBlock = shapes[index];
			drawCurrentBlock(curBlock);
			break;
	}
});

function slideCur(cur, dir){
	console.log(dir);
	cur.forEach(function(block){
		let newX = block.x + dir;
		if(gameGrid[block.y][newX] == 0){
			block.x = newX;
		};
	});
	drawCurrentBlock(curBlock);
	freenessUpdate(curBlock);
}

function rotate(cur){
	//drawGrid();
	let affMat = [0,-1,
				  1, 0];
	for(i = 1; i < cur.length; i ++){
		x = cur[i].x - cur[0].x;
		y = cur[i].y - cur[0].y;
		cur[i].x = x*affMat[0] + y*affMat[1] + cur[0].x;
		cur[i].y = x*affMat[2] + y*affMat[3] + cur[0].y;
	}
	ctx.fillStyle = 'red';
	drawCurrentBlock(curBlock);
	console.log(gameGrid);
	freenessUpdate(cur);
}

function freenessUpdate(cur){
	for(i = 0; i < cur.length; i++){
		for(j = 0; j < cur.length; j++){
			if(cur[i].x == cur[j].x && cur[i].y + 1 == cur[j].y){
				cur[i].free = false;
			} else{
				cur[i].free = true;
			}
		}
	}
}

function collisionCheck(cur, mx, my){
	for(i = 0; i < cur.length; i++){
		console.log("cur[i]: " + cur[i].y);
		console.log(gridSize);
		if(cur[i].y + my < gridSize && cur[i].x + mx < gridSize && cur[i].x + mx > 0){
			//console.log(gameGrid[cur[i].y + 1][cur[i].x] == 1);
			//console.log(gameGrid[cur[i].y + 1][cur[i].x] > gridSize);
			if(gameGrid[cur[i].y + my][cur[i].x] == 1){
				blockStay();
				return true;
			} else{
				return false;
			}
		} else{
			return true;
		}
	}
}

function blockStay(){
	
}

function chooseShape(){
	let rand = Math.floor(Math.random()*6);
	curBlock = shapes[rand];
	let index = shapes.indexOf(curBlock);
	drawCurrentBlock(curBlock);
}

function drawCurrentBlock(cur){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cur.forEach(function(block){
		ctx.fillRect(squareW*block.x, squareH*block.y, squareW, squareH);
	});
}

function gameLoop(){
	if(!collisionCheck(curBlock, 0, 1)){
		console.log(!collisionCheck(curBlock, 0, 1));
		curBlock.forEach(function(block){
			block.y += 1;
		});
		//drawGrid();
		drawCurrentBlock(curBlock);
		//console.log(gameGrid);
	} else{
		console.log('stop');
	}
}

//chooseShape();

//drawCurrentBlock(curBlock);

let gameInterval = setInterval(gameLoop, 1000);