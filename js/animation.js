//通过动画显示数字
function showAnimation(x, y, number) {
	$("#number-cell-" + x + "-" + y).css("background-color", getNumberBackgroundColor(number));
	$("#number-cell-" + x + "-" + y).css("color", getNumberColor(number));
	$("#number-cell-" + x + "-" + y).text(number);

	$("#number-cell-" + x + "-" + y).animate({
		width: "100px",
		height: "100px",
		top: add(20, 120, x),
		left: add(20, 120, y)
	}, 1000);
}
// 通过动画进行移动操作
function showMoveAnimation(i,j,x,y){
	var numberCell=$("#number-cell-" + i + "-" + j);
	numberCell.animate({
		top:add(20,120,x),
		left:add(20,120,y)
	},300);
}