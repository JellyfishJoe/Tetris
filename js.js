const canvas = document.getElementById('gameLayer');
const ctx = canvas.getContext('2d');

let gridSize = 20;

let squareH = canvas.height / gridSize;
let squareW = canvas.width / gridSize;

let gameGrid = [];

let long = [{x: 5, y: 7}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 8}];

let curBlock = long;


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

//function makeBlock(){
//	addSquare(20, 20);
//	addSquare(20, 21);
//}

function addSquare(x, y){
	//block.push({
	//	x: x,
	//	y: y
	//});
}

//makeBlock();

ctx.fillStyle = '#ff0000';
long.forEach(function(block){
	ctx.fillRect(squareW*block.x, squareH*block.y, squareW, squareH);
});

document.addEventListener('keydown', function(){
	rotate(curBlock);
});

drawGrid();

function rotate(cur){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	let affMat = [0,-1,
				  1, 0];
	for(i = 1; i < cur.length; i ++){
		x = cur[i].x - cur[0].x;
		y = cur[i].y - cur[0].y;
		cur[i].x = x*affMat[0] + y*affMat[1] + cur[0].x;
		cur[i].y = x*affMat[2] + y*affMat[3] + cur[0].y;
	}
	ctx.fillStyle = 'red';
	drawCurrentBlock(long);
}

function drawCurrentBlock(cur){
	cur.forEach(function(block){
		ctx.fillRect(squareW*block.x, squareH*block.y, squareW, squareH);
	});
}

function gameLoop(){
	long.forEach(function(block){
		block.y += 1;
	});
	drawCurrentBlock(long);

}

let gameInterval = setInterval(gameLoop, 1000);