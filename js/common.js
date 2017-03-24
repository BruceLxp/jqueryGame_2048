function add(x, y, i) {
	return x + y * i;
}

//判断是否没有空间
function noSpance() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (arr[i][j] == 0) { //有空间
				return false;
			}
		}
	}
	//无空间
	return true;
}

//获取数字背景颜色
function getNumberBackgroundColor(num) {
	switch (num) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}
}
//获取数字颜色
function getNumberColor(num) {
	if (num <= 4) {
		return "#776e65";
	} else {
		return "#fff";
	}
}
// 判断是否可以移动（向左）条件：1.左边无数字，2.左边数字跟自己相同
function canMoveLeft(arr){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){//向左移动时，最左边的位置（j=0）无需判断，j从1开始
			if(arr[i][j-1]==0 || arr[i][j-1]==arr[i][j]){
				return true;
			}
		}
	}
	return false;
}
// 判断是否可以移动（向上）条件：1.上边无数字，2.上边数字跟自己相同
function canMoveUp(arr){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i-1][j]==0 || arr[i-1][j]==arr[i][j]){
				return true;
			}
		}
	}
	return false;
}
// 判断是否可以移动（向右）条件：1.右边无数字，2.右边数字跟自己相同
function canMoveRight(arr){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(arr[i][j+1]==0 || arr[i][j+1]==arr[i][j]){
				return true;
			}
		}
	}
	return false;
}
// 判断是否可以移动（向下）条件：1.下边无数字，2.下边数字跟自己相同
function canMoveDown(arr){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(arr[i+1][j]==0 || arr[i+1][j]==arr[i][j]){
				return true;
			}
		}
	}
	return false;
}
// 判断水平方向上是否有障碍物
function noBlockHorizontal(row,col1,col2,arr){//row传进来的行
	for(var i=col1+1;i<col2;i++){
		if(arr[row][i]!=0){
			return false;
		}
	}
	return true;
}
// 判断垂直方向是否有障碍物
function noBlockVertiol(row,col1,col2,arr){//row传进来的行
	for(var j=col1+1;j<col2;j++){
		if(arr[j][row]!=0){
			return false;
		}
	}
	return true;
}
// 判断是否可以移动
function isMove(){
	if(canMoveLeft(arr) || canMoveUp(arr) || canMoveRight(arr) || canMoveDown(arr)){
		return false;
	}
	return true;
}
// 判断游戏是否结束
function isGameOver(){
	if(noSpance() && isMove()){
		alert("对不起，游戏已经结束，请重新再来吧，骚年~");
	}
}