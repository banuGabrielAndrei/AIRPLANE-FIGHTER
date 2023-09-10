let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let airplaneImage = document.getElementById("airplane");
let meteorsImage = document.getElementById("meteors");
let backgroundImage = document.getElementById("backgroundImage");
let missileImage = document.getElementById("missile");
let gamePlay = false;
let startButton = document.getElementById("start");
let restartButton = document.getElementById("resetGameButton");
let meteors = [];

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
    let x = Math.random() * (canvas.width - 180);
    let y = -50;
    let width = 180;
    let height = 130;
    let speed = 1;
    let newMeteor = new Meteor(x, y, width, height, speed);
    meteors.push(newMeteor);
}

setInterval(addMeteor, 1500);

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    airplane.drawAirplane();
    for (let i = 0; i < meteors.length; ++i) {
        meteors[i].upadateMeteor();
        meteors[i].drawMeteor();
    }
    updateAirplane();
    edgesDetection();
    requestAnimationFrame(drawGame);
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
    console.log(e.key);
}

function keyUp(e) {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        airplane.directionY = 0;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        airplane.directionX = 0;
    }
}

function shootMissile() {
    missile.missileX = airplane.airplaneX + (airplane.airplaneWidth / 2) - (missile.missileWidth / 2);
    missile.missileY = airplane.airplaneY - missile.missileHeight;
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

function startGame() {
    gamePlay = true; 
    requestAnimationFrame(drawGame);
    startButton.disabled = true;
    restartButton.disabled = false;
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);




       


