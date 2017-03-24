var  nums=new Array();

$(function(){
	newGame();
});

//开始新游戏
function newGame(){
	//初始化页面
	init();
	//在随机的两个格子中产生随机数
	generateNumber();
	generateNumber();
}

//初始化
function init(){
	//初始化单元格的位置
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i));
			gridCell.css("left",getPosLeft(j));
		}
	}

	//初始化数组
	for(var i=0;i<4;i++){
		nums[i]=new Array();
		for(var j=0;j<4;j++){
			nums[i][j]=0;
			// document.write(nums[i][j]+"&nbsp;&nbsp;");
		}
		// document.write("<br>");
	}

	updateView(); //更新页面视图，即刷新上层的16个单元格
}

//在随机位置上产生一个随机数
function generateNumber(){
	//判断是否还有空间，如果没有
	if(noSpace()){
		return;
	}

	//随机一个位置，思路：把所有空位置取出来存放到数组中，然后在数组中随机选一个
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){ //i和j的范围在0-3
				temp.push(i*4+j);  //3,1   3*4+1=13
			}
		}
	}
	var pos=Math.floor(Math.random()*(temp.length)); //[0,5]
	var x=Math.floor(temp[pos]/4);
	var y=Math.floor(temp[pos]%4);

	//随机一个数字
	var randNumber=Math.random()>0.5?2:4;
	nums[x][y]=randNumber;
	showNumberWithAnimation(x,y,randNumber);
}

//更新视图
function updateView(){
	//将上层的元素清空
	$(".number-cell").remove();
	
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");

			var numberCell=$("#number-cell-"+i+"-"+j);
			if(nums[i][j]!=0){
				numberCell.css("width","100px");
				numberCell.css("height","100px");
				numberCell.css("top",getPosTop(i));
				numberCell.css("left",getPosLeft(j));
				numberCell.css("background-color",getNumberBackgroundColor(nums[i][j]));
				numberCell.css("color",getNumberColor(nums[i][j]));
				numberCell.text(nums[i][j]);
			}else{
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",getPosTop(i)+50);
				numberCell.css("left",getPosLeft(j)+50);
			}
		}
	}




}












