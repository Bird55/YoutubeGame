window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.png";

var tiles = new Image();
tiles.src = "img/tiles.png";

var player;
var enemy;

var requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

var isPlaying;

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    pl.width = gameWidth;
    pl.height = gameHeight;

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    player = new Player();
    enemy = new Enemy();

    drawBg();

    startLoop();
//    draw();
}

function loop() {
    if (isPlaying) {
        draw();
        update();
        requestAnimFrame(loop);
    }
}

function startLoop() {
    isPlaying = true;
    loop();
}

function stopLoop() {
    isPlaying = false;
}

function draw() {
    player.draw();
    enemy.draw();
}

function update() {

}

// Objects
function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 120;
    this.height = 70;

    this.speed = 8;
}

function Enemy() {
    this.srcX = 0;
    this.srcY = 70;
    this.drawX = 700;
    this.drawY = 50;
    this.width = 100;
    this.height = 70;

    this.speed = 5;
}

Player.prototype.draw = function () {
    ctxMap.drawImage(tiles,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.draw = function() {
    ctxMap.drawImage(tiles,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
}

function drawRect() {
    ctxMap.fillStyle = "#3d3d3d";
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0, 0, gameWidth, gameHeight);
}

function drawBg() {
    ctxMap.drawImage(background, 0, 0, 800, 480,
        0, 0, gameWidth, gameHeight);
}
