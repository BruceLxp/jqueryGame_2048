//通过动画显示数字
function showNumberWithAnimation(i,j,randNumber){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i),
		left:getPosLeft(j),
	},500);
}