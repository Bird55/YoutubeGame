window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var plWidth = 120;
var plHeight = 70;

var background = new Image();
background.src = "img/bg.png";

var tiles = new Image();
tiles.src = "img/tiles.png";

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");

    map.width = gameWidth;
    map.height = gameHeight;

    pl = document.getElementById("player");
    ctxPl = pl.getContext("2d");

    pl.width = plWidth;
    pl.height = plHeight;

    drawBtn = document.getElementById("drawBtn");
    clearBtn = document.getElementById("clearBtn");

    drawBtn.addEventListener("click", drawRect, false);
    clearBtn.addEventListener("click", clearRect, false);

    drawBg();
    drawPlayer();
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

function drawPlayer() {
    ctxMap.drawImage(tiles, 0, 0, 120, 70,
        0, 0, plWidth, plHeight);
}