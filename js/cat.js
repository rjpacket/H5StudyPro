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
var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1, MOVE_UP_RIGHT = 2, MOVE_RIGHT = 3, MOVE_DOWN_RIGHT = 4,
    MOVE_DOWN_LEFT = 5;

function checkCircle(circle) {
    if (circle.getCircleType() == 1) {
        circle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = circle;
        return true;
    }
    return false;
}

function getMoveDir(cat) {
    var distanceMap = [];
    //left
    var can = true;
    for (var x = cat.indexX; x > 0; x--) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT] = cat.indexX - x;
            break;
        }
    }
    if (can) {
        return MOVE_LEFT;
    }
    //up left
    can = true;
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_UP_LEFT] = cat.indexY - y;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (y < 0 || x < 0) {
            break;
        }
    }
    if (can) {
        return MOVE_UP_LEFT;
    }
    //up right
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_UP_RIGHT] = cat.indexY - y;
            break;
        }
        if (y % 2 == 1) {
            x++;
        }
        y--;
        if (y < 0 || x > 8) {
            break;
        }
    }
    if (can) {
        return MOVE_UP_RIGHT;
    }

    //right
    can = true;
    for (var x = cat.indexX; x < 9; x++) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT] = x - cat.indexX;
            break;
        }
    }
    if (can) {
        return MOVE_RIGHT;
    }

    //down right
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_DOWN_RIGHT] = y - cat.indexY;
            break;
        }
        if (y % 2 == 1) {
            x++;
        }
        y--;
        if (x > 8 || y < 0) {
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_RIGHT;
    }

    //down left
    can = true;
    x = cat.indexX;
    y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_DOWN_LEFT] = y - cat.indexY;
            break;
        }
        if (y % 2 == 1) {
            x--;
        }
        y--;
        if (x < 0 || y < 0) {
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_LEFT;
    }
}

function circleClicked(event) {
    if (event.target.getCircleType() != Circle.TYPE_CAT) {
        event.target.setCircleType(Circle.TYPE_SELECTED);
    } else {
        return;
    }

    if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8) {
        alert("你没有抓住神经猫！");
        return;
    }

    // if (!checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY]) //左
    //     && !checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY - 1]) //左上
    //     && !checkCircle(circleArr[currentCat.indexX][currentCat.indexY - 1]) //上
    //     && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY - 1]) //右上
    //     && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY]) //右
    //     && !checkCircle(circleArr[currentCat.indexX + 1][currentCat.indexY + 1]) //右下
    //     && !checkCircle(circleArr[currentCat.indexX][currentCat.indexY + 1]) //下
    //     && !checkCircle(circleArr[currentCat.indexX - 1][currentCat.indexY + 1]) //左下
    // ) {
    //     alert("你抓住了神经猫！")
    // }
    var dir = getMoveDir(currentCat);
    switch (dir) {
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX - 1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY - 1];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY - 1];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX + 1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        case MOVE_DOWN_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY + 1];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        case MOVE_DOWN_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY + 1];
            currentCat.setCircleType(Circle.TYPE_SELECTED);
            break;
        default:
            alert("你抓住了神经猫！")
            break;
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
            } else if (Math.random() < 0.1) {
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click", circleClicked);
        }
    }
}

addCircles();