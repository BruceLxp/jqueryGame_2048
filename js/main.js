var arr = [];

$(function() {
	newGame();
});

//开始新游戏
function newGame() {
	//初始化页面
	init();
	//在随机的两个格子中产生随机数
	generateNumber();
	generateNumber();
}

//初始化
function init() {
	//初始化单元格的位置
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", add(20, 120, i));
			gridCell.css("left", add(20, 120, j));
		}
	}
	//初始化数组(定义一个二维数组)
	for (var i = 0; i < 4; i++) {
		arr[i] = [];
		for (var j = 0; j < 4; j++) {
			arr[i][j] = 0;
		}
	}
	//更新页面视图，即刷新上层的16个单元格
	updateView();
}

//在随机位置上产生一个随机数
function generateNumber() {
	//判断是否还有空间，如果没有
	if (noSpance()) {
		return;
	}
	//随机一个位置，思路：把所有空位置取出来存放到数组中，然后在数组中随机选一个
	var nums = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (arr[i][j] == 0) {
				nums.push(i * 4 + j);
			}
		}
	}
	var empty = Math.floor(Math.random() * (nums.length));
	var X = Math.floor(nums[empty] / 4);
	var Y = Math.floor(nums[empty] % 4);
	//随机一个数字
	var ranNum = Math.random() > 0.5 ? 2 : 4;
	arr[X][Y] = ranNum;
	showAnimation(X, Y, ranNum);
}

//更新视图
function updateView() {
	//将上层的元素清空
	$(".number-cell").remove();
	//循环创建动态div
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			// if(arr[i][j]!=0){

			// }else{

			// }

			var numberCell = $("#number-cell-" + i + "-" + j);
			if (arr[i][j] != 0) {
				numberCell.css("width", "100px");
				numberCell.css("height", "100px");
				numberCell.css("top", add(20, 120, i));
				numberCell.css("left", add(20, 120, j));
				numberCell.css("background-color", getNumberBackgroundColor(arr[i][j]));
				numberCell.css("color", getNumberColor(arr[i][j]));
				numberCell.text(arr[i][j]);
			} else {
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
				numberCell.css("top", add(20, 120, i) + 50);
				numberCell.css("left", add(20, 120, j) + 50);
			}
		}
	}
}

// 实现键盘响应
$(document).keydown(function(event){
	event.preventDefault();//阻止事件的默认动作，否则会出现按上下方向键时滚动条也会滑动
	switch(event.keyCode){
		case 37://left
			if(canMoveLeft(arr)){
				moveLeft();
				generateNumber();
			}
			setTimeout(isGameOver,300);
			break;
		case 38://up
			if(canMoveUp(arr)){
				moveUp();
				generateNumber();
			}
			setTimeout(isGameOver,300);
			break;
		case 39://right
			if(canMoveRight(arr)){
				moveRight();
				generateNumber();
			}
			setTimeout(isGameOver,300);
			break;
		case 40://down
			if(canMoveDown(arr)){
				moveDown();
				generateNumber();
			}
			setTimeout(isGameOver,300);
			break;
	}
});

/*向左移动操作
	需要对每一个数字的左边进行判断，落脚点有两种情况：
	1.落脚点没有数字，且移动路径没有障碍
	2.落脚点有相同数字，且移动路径没有障碍
*/
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(arr[i][j]!=0){
				for(var k=0;k<j;k++){//从最左边开始遍历左边所有元素，进行判断
					if(arr[i][k]==0 && noBlockHorizontal(i,k,j,arr)){
						// 移动操作
						showMoveAnimation(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[i][k]==arr[i][j] && noBlockHorizontal(i,k,j,arr)){
						showMoveAnimation(i,j,i,k);
						arr[i][k]+=arr[i][j];
						arr[i][j]=0;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView, 300);
}
/*向上移动操作*/
function moveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]!=0){
				for(var k=0;k<i;k++){//从最上边开始遍历上边所有元素，进行判断
					if(arr[k][j]==0 && noBlockVertiol(j,k,i,arr)){
						// 移动操作
						showMoveAnimation(i,j,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[k][j]==arr[i][j] && noBlockVertiol(j,k,i,arr)){
						showMoveAnimation(i,j,k,j);
						arr[k][j]+=arr[i][j];
						arr[i][j]=0;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView, 300);
}
/*向右移动操作*/
function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(arr[i][j]!=0){
				for(var k=3;k>j;k--){//从最右边开始遍历右边所有元素，进行判断
					if(arr[i][k]==0 && noBlockHorizontal(i,j,k,arr)){
						// 移动操作
						showMoveAnimation(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[i][k]==arr[i][j] && noBlockHorizontal(i,j,k,arr)){
						showMoveAnimation(i,j,i,k);
						arr[i][k]+=arr[i][j];
						arr[i][j]=0;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView, 300);
}
/*向下移动操作*/
function moveDown(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(arr[i][j]!=0){
				for(var k=3;k>i;k--){//从最下边开始遍历下边所有元素，进行判断
					if(arr[k][j]==0 && noBlockVertiol(j,i,k,arr)){
						// 移动操作
						showMoveAnimation(i,j,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[k][j]==arr[i][j] && noBlockVertiol(j,i,k,arr)){
						showMoveAnimation(i,j,k,j);
						arr[k][j]+=arr[i][j];
						arr[i][j]=0;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView, 300);
}