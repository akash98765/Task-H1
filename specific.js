var myGameArea;
var myGamePiece;
var myGameObstacles = [];
var endObstacle;
var myGameExit;
var hungerObstacle = [];
var powerup = [];
var powerup1 = [];
var mycoin = [];
var spriteWidth = 576;
var spriteHeight = 256;
var srcX = 0;
var srcY = 0;
var rows = 4;
var columns = 9;
var width = 64;
var height = 64;
var curFrame = 0;
var frameCount = 9;
myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        this.interval2 = setInterval(timer, 1000);
        this.interval3 = setInterval(stam, 1000);
        this.frameNo = 0;
        this.interval4 = setInterval(cl, 999);

    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
        clearInterval(this.interval3);
        clearInterval(this.interval4);
    }


}
window.addEventListener("keydown", function(e) {
    myGameArea.keys = (myGameArea.keys || []);
    myGameArea.keys[e.keyCode] = (e.type == "keydown");
});
window.addEventListener("keyup", function(e) {
    myGameArea.keys[e.keyCode] = (e.type == "keydown");
});

function cl() {
    var canvas = document.getElementById("c1");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 240, 270);
}
var c = 200;

function stam() {
    var canvas = document.getElementById("c1");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px courier";
    ctx.fillStyle = "black";
    ctx.fillText("STAMINA:", 10, 20);
    ctx.beginPath();
    ctx.moveTo(10, 40);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineTo(c, 40);
    ctx.stroke();
    ctx.closePath();
    c -= 10;
    if (c <= 0) {
        myGameArea.stop();
        alert("no stamina");
        music();
    }
    ctx.drawImage(powerup[0].image, 10, 60, 10, 10);
    ctx.font = "10px courier";
    ctx.fillText(":2x speed", 25, 68);
    ctx.drawImage(powerup1[0].image, 10, 80, 10, 10);
    ctx.fillText(":God mode", 25, 88);
    ctx.drawImage(hungerObstacle[0].image, 10, 100, 10, 10);
    ctx.fillText(":food", 25, 108);
    ctx.drawImage(mycoin[0].image, 10, 120, 10, 10);
    ctx.fillText(":coin", 25, 128);
    ctx.drawImage(endObstacle.image, 10, 140, 10, 10);
    ctx.fillText(":end", 25, 148);
    ctx.drawImage(myGameObstacles[12].image, 10, 160, 10, 10);
    ctx.fillText(":enemy", 25, 168);
    ctx.drawImage(myMovingObstacle[0].image, 10, 180, 10, 10);
    ctx.fillText(":bullet", 25, 188);
}

function component(x, y, color, width, height, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.width = width;
    this.height = height;
    this.color = color;

}
component.prototype.update = function() {
    var ctx = myGameArea.context;
    if (this.type == "image") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

component.prototype.newPos = function() {
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;
}
component.prototype.crashWith = function(otherObj) {
    var myLeft = this.x;
    var myRight = this.x + (this.width - 5);
    var myTop = this.y;
    var myBottom = this.y + (this.height - 5);
    var oLeft = otherObj.x;
    var oRight = otherObj.x + otherObj.width - 10;
    var oTop = otherObj.y;
    var oBottom = otherObj.y + otherObj.height - 10;
    var crash = true;
    if ((myBottom < oTop) || (myTop > oBottom) || (myLeft > oRight) || (myRight < oLeft))
        crash = false;
    return crash;
}
component.prototype.drawImage = function() {
    var ctx = myGameArea.context;
    ctx.drawImage(this.image, srcX, srcY, 64, 64, this.x, this.y, this.width, this.height);
}
var n = 20;
var myMovingObstacle = [];

function timer() {
    if (n >= 0) {
        document.getElementById("time1").innerHTML = n;
        --n;
        if (n < 0) {
            myGameArea.stop();
            alert("Time Elapsed");
            music();

        }
    }
}

function startGame() {
    myGameArea.start();
    myGamePiece = new component(10, 10, "spritesheet.png", 30, 30, "image");
    myGameObstacles[0] = new component(80, 0, "green", 20, 50, "none");
    myGameObstacles[1] = new component(200, 0, "green", 20, 50, "none");
    myGameObstacles[2] = new component(350, 0, "green", 120, 30, "none");
    myGameObstacles[3] = new component(0, 200, "orange", 80, 40, "none");
    myGameObstacles[4] = new component(220, 200, "orange", 50, 40, "none");
    myGameObstacles[5] = new component(400, 200, "orange", 80, 40, "none");
    myGameObstacles[6] = new component(320, 30, "blue", 30, 50, "none");
    myGameObstacles[7] = new component(20, 330, "grey", 120, 20, "none");
    myGameObstacles[8] = new component(300, 330, "grey", 60, 20, "none");
    myGameObstacles[9] = new component(0, 400, "purple", 160, 20, "none");
    myGameObstacles[10] = new component(20, 210, "purple", 70, 20, "none");
    myGameObstacles[11] = new component(0, 250, "hotpink", 60, 20, "none");
    myGameObstacles[12] = new component(0, 140, "shooter.png", 30, 30, "image");
    myGameObstacles[13] = new component(0, 280, "shooter.png", 30, 30, "image");
    endObstacle = new component(420, 450, "door.png", 60, 20, "image");
    hungerObstacle[0] = new component(50, 100, "apple.png", 30, 30, "image");
    hungerObstacle[1] = new component(350, 50, "apple.png", 30, 30, "image");
    powerup[0] = new component(40, 60, "2x.png", 20, 20, "image");
    powerup1[0] = new component(100, 60, "jumpover.png", 30, 30, "image");
    mycoin[0] = new component(10, 10, "coin.jpg", 20, 20, "image");
    mycoin[1] = new component(40, 80, "coin.jpg", 20, 20, "image");
    mycoin[2] = new component(100, 100, "coin.jpg", 20, 20, "image");

}

function interval(no) {
    if ((myGameArea.frameNo / no) % 1 == 0)
        return true;
    return false;
}
var decide1 = 1;
var decide = 1;

function updateGameArea() {
    var i = 0;
    var h = 1;
    for (i = 0; i < mycoin.length; i++)
        if (myGamePiece.crashWith(mycoin[i])) {
            mycoin.splice(i, 1);
            change();
        }
    for (i = 0; i < powerup1.length; i++)
        if (myGamePiece.crashWith(powerup1[i])) {
            decide1 = 2;
            powerup1.splice(i, 1);
        }
    for (i = 0; i < powerup.length; i++)
        if (myGamePiece.crashWith(powerup[i])) {
            decide = 2;
            powerup.splice(i, 1);
        }
    for (i = 0; i < hungerObstacle.length; i++)
        if (myGamePiece.crashWith(hungerObstacle[i])) {
            c += 20;
            hungerObstacle.splice(i, 1);
        }
    for (i = 0; i < myMovingObstacle.length; i++)
        if (myGamePiece.crashWith(myMovingObstacle[i])) {
            myGameArea.stop();
            alert("GAME OVER> RESTART");
            music();
        }
    for (i = 0; i < myGameObstacles.length; i++) {
        if (decide1 == 1) {
            if (myGamePiece.crashWith(myGameObstacles[i])) {
                myGameArea.stop();
                alert("GAME OVER > RESTART");
                music();
            }
        }
        if (myGamePiece.crashWith(endObstacle)) {
            if (h <= 1) {
                myGameArea.stop();
                alert("Congrats");
                music();

            }
            ++h;
        } else {
            myGameArea.clear();
            myGameArea.frameNo += 1;
            if (interval(800))

            {
                myMovingObstacle.push(new component(20, 140, "bullet.png", 30, 30, "image"));
                myMovingObstacle.push(new component(30, 280, "bullet.png", 30, 30, "image"));
            }
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;
            if (decide == 1) {
                if (myGameArea.keys && myGameArea.keys[37]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 1 * height;
                    myGamePiece.speedX = -.1;
                }
                if (myGameArea.keys && myGameArea.keys[38]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 0;
                    myGamePiece.speedY = -.1;
                }
                if (myGameArea.keys && myGameArea.keys[39]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 3 * height;
                    myGamePiece.speedX = .1;
                }
                if (myGameArea.keys && myGameArea.keys[40]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 2 * height;

                    myGamePiece.speedY = .1;
                }
            }
            if (decide == 2) {
                if (myGameArea.keys && myGameArea.keys[37]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 1 * height;
                    myGamePiece.speedX = -.3;
                }
                if (myGameArea.keys && myGameArea.keys[38]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 0 * height;
                    myGamePiece.speedY = -.3;
                }
                if (myGameArea.keys && myGameArea.keys[39]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 3 * height;
                    myGamePiece.speedX = .3;
                }
                if (myGameArea.keys && myGameArea.keys[40]) {
                    curFrame = ++curFrame % frameCount;
                    srcX = curFrame * width;
                    srcY = 2 * height;
                    myGamePiece.speedY = .3;
                }
            }

            myGamePiece.newPos();
            myGamePiece.drawImage();

            var f = 0;
            for (f = 0; f < myGameObstacles.length; f++) {

                myGameObstacles[f].update();
                endObstacle.update();

            }
            for (f = 0; f < hungerObstacle.length; f++)
                hungerObstacle[f].update();

            for (f = 0; f < powerup.length; f++)
                powerup[f].update();
            for (f = 0; f < powerup1.length; f++)
                powerup1[f].update();
            for (f = 0; f < myMovingObstacle.length; f++) {
                myMovingObstacle[f].x += .15;
                myMovingObstacle[f].update();
            }
            for (f = 0; f < mycoin.length; f++)
                mycoin[f].update();
        }
    }


}
var score = 0;

function change() {
    ++score;
    var d = document.getElementById("s2");
    if (score == 1)
        d.innerHTML = score + " :'(";
    if (score >= 2 && score <= 3)
        d.innerHTML = score + " :)";
    if (score >= 4)
        d.innerHTML = score + " wow";

}

function music() {
    var par = document.getElementById("d1");
    var child = document.getElementById("a1");
    par.remove();
}