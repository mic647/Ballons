'use strict';

var NUM_OF_BALLONS = +prompt('How many balloons do you want in the game?');
var gNextId = 1;
var gLeft = 110;
var gameIterval;
var isOn = false;
var sumPoped = 0;
var gSpeed = 1;
var gBalloons = createBalloons();

function createBalloon() {
    return {
        id: gNextId++,
        color: getRandomColor(),
        left: gLeft * (gNextId - 2),
        bottom: 0,
        isPoped: false,
        speed: 5
    }
}

function createBalloons() {
    var balloon = [];
    for (var i = 0; i < NUM_OF_BALLONS; i++) {
        balloon.push(createBalloon());
    }
    return balloon;
}

function init() {
    createBalloons();
    renderBallons();
}

function play() {
    isOn = true;
    sumPoped = 0;
    gameIterval = setInterval(moveBallons, 1000);
}

function puse(elBtn) {
    if (isOn === true) {
        elBtn.innerText = 'Keep Game';
        isOn = false
        clearInterval(gameIterval)
    } else {
        elBtn.innerText = 'puse Game';
        gameIterval = setInterval(moveBallons, 1000);
        isOn = true;
    }
}

function renderBallons() {
    var strHtml = '';
    for (var i = 0; i < gBalloons.length; i++) {
        var currBallon = gBalloons[i];
        strHtml += ` <div class="ballon ballon${currBallon.id}" onmouseover = "speedUp(${i})" onclick="popBalloon(${i},this)" style="bottom: ${currBallon.bottom}px; left: ${currBallon.left}px; background-color: ${currBallon.color};"> <h6> num:${currBallon.id} speed:${currBallon.speed} </div >
        `
    }
    var elBallon = document.querySelector('.ballons');
    elBallon.innerHTML = strHtml;
}

function moveBallons() {
    for (var i = 0; i < gBalloons.length; i++) {
        var currBalloon = gBalloons[i];
        currBalloon.bottom += currBalloon.speed;
        if (isGameOver(i)) return;
        renderBallons();
    }
}

function speedUp(i) {
    if (isOn) gBalloons[i].speed += gSpeed;
}


function popBalloon(i, elBtn) {
    if (!gBalloons[i].isPopped) sumPoped++;
    if (isGameOver(i)) return;
    if (isOn) {
        playSound();
        gBalloons[i].isPopped = true;
        elBtn.style.opacity = 0 + '%';
        gBalloons.splice(i, 1);
    }

}

function playSound() {
    var sound = new Audio("sound/pop.mp3");
    sound.play();
}

function isGameOver(i) {
    if (gBalloons[i].bottom > 650 || sumPoped >= NUM_OF_BALLONS) {
        isOn = false;
        var elModal = document.querySelector('.modal');
        elModal.style.opacity = 100 + '%';
        elModal.innerHTML = `'game over! the ballon num ${gBalloons[i].id}is win <button onclick="location.reload()">play agein</button>`
        clearInterval(gameIterval);
        return true;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}