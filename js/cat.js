/**
 * Created by An on 2017/7/12.
 */
var stage = new createjs.Stage("gameview");

// var gameView = new createjs.Container();
// stage.addChild(gameView);
//
// var s = new createjs.Shape();
// s.graphics.beginFill("#333333");
// s.graphics.drawCircle(50, 50, 25);
// s.graphics.endFill();
// gameView.addChild(s);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

var circleArr = [[], [], [], [], [], [], [], [], []]
var currentCat;

function checkCircle(circle) {
    if (circle.getCircleType() == 1) {
        circle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = circle;
        return true;
    }
    return false;
}

function circleClicked(event) {
    if (event.target.getCircleType() != 3) {
        event.target.setCircleType(2);
    }

    if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8) {
        alert("你没有抓住神经猫！");
    }

    if (!checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY]) //左
        && !checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY - 1]) //左上
        && !checkCircle(circleArr[currentCat.indexX][currentCat.indexY - 1]) //上
        && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY - 1]) //右上
        && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY]) //右
        && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY + 1]) //右下
        && !checkCircle(circleArr[currentCat.indexX][currentCat.indexY + 1]) //下
        && !checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY + 1]) //左下
    ) {
        alert("你抓住了神经猫！")
    }
}

function addCircles() {
    for (var indexY = 0; indexY < 9; indexY++) {
        for (var indexX = 0; indexX < 9; indexX++) {
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY % 2 ? indexX * 55 + 25 : indexX * 55;
            c.y = indexY * 55;

            if (indexX == 4 && indexY == 4) {
                c.setCircleType(3);
                currentCat = c;
            }
            c.addEventListener("click", circleClicked);
        }
    }
}

addCircles();