let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let airplaneImage = document.getElementById("airplane");
let meteorsImage = document.getElementById("meteors");
let backgroundImage = document.getElementById("backgroundImage");
let missileImage = document.getElementById("missile");
let gamePlay = true;
let startButton = document.getElementById("start");
let restartButton = document.getElementById("resetGameButton");
let meteors = [];
let missiles = [];
let score = 0;

let airplane = {
    airplaneWidth: 100,
    airplaneHeight: 90,
    airplaneX: canvas.width / 2 - 50,
    airplaneY: canvas.height - 90,
    speed: 4,
    directionX: 0,
    directionY: 0,

    drawAirplane() {
        ctx.drawImage(airplaneImage, this.airplaneX, this.airplaneY, this.airplaneWidth, this.airplaneHeight);
    }
};

class Missile {
    constructor(missileX, missileY, missileWidth, missileHeight, speed) {
        this.missileX = missileX;
        this.missileY = missileY;
        this.missileWidth = missileWidth;
        this.missileHeight = missileHeight;
        this.speed = speed;
    }

    drawMissile() {
        ctx.drawImage(missileImage, this.missileX, this.missileY, this.missileWidth, this.missileHeight);
    }

    updateMissile() {
        this.missileY -= this.speed;
    }
}

function addMissiles() {
    let x = airplane.airplaneX;
    let y = airplane.airplaneY;
    let width = 30;
    let height = 50;
    let speed = 3;
    let newMissile = new Missile(x, y, width, height, speed);
    missiles.push(newMissile);
}

class Meteor {
    constructor(meteorX, meteorY, meteorWidth, meteorHeight, speed) {
        this.meteorX = meteorX;
        this.meteorY = meteorY;
        this.meteorHeight = meteorHeight;
        this.meteorWidth = meteorWidth;
        this.speed = speed;
    }

    drawMeteor() {
        ctx.drawImage(meteorsImage, this.meteorX, this.meteorY, this.meteorWidth, this.meteorHeight);
    }

    upadateMeteor() {
        this.meteorY += this.speed;
    }
}

function addMeteor() {
    let x = Math.random() * (canvas.width - 100);
    let y = -50;
    let width = 70;
    let height = 50;
    let speed = 2;
    let newMeteor = new Meteor(x, y, width, height, speed);
    meteors.push(newMeteor);
}

setInterval(addMeteor, 1000);

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    airplane.drawAirplane();
    if (gamePlay) {
        for (let i = 0; i < meteors.length; ++i) {
            meteors[i].upadateMeteor();
            meteors[i].drawMeteor();
        }
        for (let j = 0; j < missiles.length; ++j) {
            missiles[j].updateMissile();
            missiles[j].drawMissile();
        }
        updateAirplane();
        edgesDetection();
        checkHitTargets();
        requestAnimationFrame(drawGame);
    }
}

function updateAirplane() {
    airplane.airplaneX += airplane.directionX;
    airplane.airplaneY += airplane.directionY;
}

function moveUp() {
    airplane.directionY = -airplane.speed;
}

function moveDown() {
    airplane.directionY = airplane.speed;
}

function moveLeft() {
    airplane.directionX = -airplane.speed;
}

function moveRight() {
    airplane.directionX = airplane.speed;
}

function keyDown(e) {
    if (e.key == "ArrowUp") {
        moveUp();
    } else if (e.key == "ArrowDown") {
        moveDown();
    } else if (e.key == "ArrowLeft") {
        moveLeft();
    } else if (e.key == "ArrowRight") {
        moveRight();
    } else if (e.key == " ") {
        shootMissile();
    }
}

function keyUp(e) {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        airplane.directionY = 0;
    } else if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
        airplane.directionX = 0;
    }
}

function shootMissile() {
    addMissiles();
    let newMissile = missiles[missiles.length - 1];
    newMissile.missileX = airplane.airplaneX + (airplane.airplaneWidth / 2) - (newMissile.missileWidth / 2);
    newMissile.missileY = airplane.airplaneY - newMissile.missileHeight;
}

function edgesDetection() {
    if (airplane.airplaneX < 0) {
        airplane.airplaneX = 0;
    } else if (airplane.airplaneX + airplane.airplaneWidth > canvas.width) {
        airplane.airplaneX = canvas.width - airplane.airplaneWidth;
    }
    if (airplane.airplaneY < 0) {
        airplane.airplaneY = 0;
    } else if (airplane.airplaneY + airplane.airplaneHeight > canvas.height) {
        airplane.airplaneY = canvas.height - airplane.airplaneHeight;
    }
}

function checkHitTargets() {
    for (let i = 0; i < missiles.length; i++) {
        for (let j = 0; j < meteors.length; j++) {
            let missile = missiles[i];
            let meteor = meteors[j];
            if (missile && meteor) {
                if (
                    missile.missileY + missile.missileHeight > meteor.meteorY &&
                    missile.missileY < meteor.meteorY + meteor.meteorHeight &&
                    missile.missileX < meteor.meteorX + meteor.meteorWidth &&
                    missile.missileX + missile.missileWidth > meteor.meteorX
                ) {
                    missiles.splice(i, 1);
                    meteors.splice(j, 1);
                    --i;
                    --j;
                    ++score;
                    document.getElementById("score").innerText = "YOUR SCORE: " + score; 
                }
            }
        }
    }
}

function startGame() {
    gamePlay = true; 
    requestAnimationFrame(drawGame);
    startButton.disabled = true;
    restartButton.disabled = false;
}

function restartGame() {
    gamePlay = false;
    score = 0;
    meteors = [];
    missiles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    airplane.airplaneX = canvas.width / 2 - 50;
    airplane.airplaneY = canvas.height - 90;
    startButton.disabled = false;
    restartButton.disabled = true;
    document.getElementById("score").innerText = "YOUR SCORE: " + score;
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);