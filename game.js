window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var en;
var ctxEn;

var st;
var ctxSt;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.png";

var enemyImg = new Image();
enemyImg.src = "img/enemy.png";

var playerImg = new Image();
playerImg.src = "img/player.png";

var player;
var enemies = [];

var isPlaying;

// For creating enemies
var spawnInterval;
var spawnTime = 24000;
var spawnAmount = 3;

var requestAnimateFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    en = document.getElementById("enemy");
    ctxEn = en.getContext("2d");

    st = document.getElementById("stats");
    ctxSt = en.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;
    pl.width = gameWidth;
    pl.height = gameHeight;
    en.width = gameWidth;
    en.height = gameHeight;
    st.width = gameWidth;
    st.height = gameHeight;

    ctxSt.fillStyle = "#3d3d3d";
    ctxSt.font = "bold 15pt Arial";

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    player = new Player();

    drawBg();
    startLoop();
    updateStats();

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
}

function spawnEnemy(count) {
    for (var i = 0; i < count; i++) {
        enemies[i] = new Enemy();
    }
}

function startCreatingEnemies() {
    stopCreatingEnemies();
    spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)}, spawnTime);
}

function stopCreatingEnemies() {
    clearInterval(spawnInterval);
}

function loop() {
    if (isPlaying) {
        draw();
        update();
        requestAnimateFrame(loop);
    }
}

function startLoop() {
    isPlaying = true;
    loop();
    startCreatingEnemies();
}

function stopLoop() {
    isPlaying = false;
}

function draw() {
    player.draw();

    clearCtxEnemy();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }

}

function update() {
    player.update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
}

// Objects
function Player() {
    this.srcX = 36;
    this.srcY = 2;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 136;
    this.height = 155;
    this.scale = 0.7;
    this.speed = 5;

    // For keys
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
}

function Enemy() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = Math.floor(Math.random() * gameWidth + gameWidth);
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.width = 163;
    this.height = 116;
    this.scale = 0.4;

    this.speed = 5;
}

Enemy.prototype.draw = function() {
    ctxEn.drawImage(enemyImg,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width * this.scale, this.height * this.scale);
}

Enemy.prototype.update = function() {
    this.drawX -= this.speed;
    if (this.drawX + this.width * this.scale < 0) {
        //this.drawX = Math.floor(Math.random() * gameWidth + gameWidth);
        //this.drawY = Math.floor(Math.random() * gameHeight);
        this.destroy();
    }
}

Enemy.prototype.destroy = function() {
    enemies.splice(enemies.indexOf(this), 1);
}

Player.prototype.draw = function () {
    clearCtxPlayer();
    ctxPl.drawImage(playerImg,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width * this.scale, this.height * this.scale);
}

Player.prototype.update = function () {
    this.chooseDir();

    if (this.drawX < 0)
        this.drawX = 0;
    if (this.drawX > gameWidth - this.width * this.scale)
        this.drawX = gameWidth - this.width * this.scale;
    if (this.drawY < 0)
        this.drawY = 0;
    if (this.drawY > gameHeight - this.height * this.scale)
        this.drawY = gameHeight - this.height * this.scale;

}

Player.prototype.chooseDir = function () {
    if (this.isUp) this.drawY -= this.speed;
    if (this.isDown) this.drawY += this.speed;
    if (this.isLeft) this.drawX -= this.speed;
    if (this.isRight) this.drawX += this.speed;
}

function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") { player.isUp = true; e.preventDefault(); }
    if (keyChar == "S") { player.isDown = true; e.preventDefault(); }
    if (keyChar == "A") { player.isLeft = true; e.preventDefault(); }
    if (keyChar == "D") { player.isRight = true; e.preventDefault(); }

}

function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") { player.isUp = false; e.preventDefault(); }
    if (keyChar == "S") { player.isDown = false; e.preventDefault(); }
    if (keyChar == "A") { player.isLeft = false; e.preventDefault(); }
    if (keyChar == "D") { player.isRight = false; e.preventDefault(); }
}

function drawRect() {
    ctxMap.fillStyle = "#3d3d3d";
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxPlayer() {
    ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy() {
    ctxEn.clearRect(0, 0, gameWidth, gameHeight);
}

function updateStats() {
    ctxSt.clearRect(0, 0, gameWidth, gameHeight);
    ctxSt.fillText("Player", 100, 100);
    console.log(("Я тут"));
}

function drawBg() {
    ctxMap.drawImage(background, 0, 0, 800, 480,
        0, 0, gameWidth, gameHeight);
}
