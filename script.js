const random = (number) => {
  return Math.floor(Math.random() * number) + 1;
}

const popAnim = (object, callback) => {
  object
  .css('scale', '1.5')
  .animate({ 'scale': 1 }, 1000, callback);
}

// MENU LOADER

// Wrappers
const header = $('header');
const menuWrapper = $('#menu-wrapper');
const gameScreen = $('#game-screen');

// Buttons
const continueBtn = $('#continue-btn');
const playBtn = $('#play-btn');
const returnbtn = $('#return-btn');
const rollBtn = $('#roll-btn');

const loadMenu = () => {

  // LOADING ANIMATION
  // setTimeout(() => {
  //   $('.menu-btn').first().click();
  // }, 3000)

  header
  .delay(0000)
  .hide(0000);

  menuWrapper
  .delay(0000)
  .animate({
    'height': '150px',
    'opacity': '100%'
  }, 0000, () => {
    menuWrapper.css('height', 'auto');
    $('.menu-name').animate({
      'opacity': '100%'
    }, 1000, () => {})    
  })

  // ADD EVENT LISTENERS
  $('.menu-btn').on('click', function() {
    const currentMenu = $('.collapse.show');
    currentMenu.removeClass('show');
  })
  continueBtn,playBtn.on('click', hideMenu);
  playBtn.on('click', () => {
    continueBtn.attr('disabled', false);
    startNewGame();
  })
  returnbtn.on('click', hideGameScreen);
  rollBtn.on('click', () => { rollDice(); });
}

const showGameScreen = () => {
  gameScreen.fadeIn(1000);
  gameScreen.css('display', 'flex')
}
const hideGameScreen = () => {
  gameScreen.fadeOut(1000, showMenu);
}

const hideMenu = () => {
  menuWrapper.fadeOut(1000, showGameScreen);
}
const showMenu = () => {
  menuWrapper.fadeIn(1000);
}


// DICE DRAWING

const diceCanvas = document.querySelector('#dice-display');
const ctx = diceCanvas.getContext('2d');
const canvasSize = diceCanvas.width;
const dotSpacing = canvasSize / 4;
ctx.translate(50, 50);
ctx.fillStyle = '#dc3545';

const diceDots = {
  1: { x: -dotSpacing, y: -dotSpacing },
  2: { x: dotSpacing, y: -dotSpacing },
  3: { x: -dotSpacing, y: 0 },
  4: { x: 0, y: 0 },
  5: { x: dotSpacing, y: 0 },
  6: { x: -dotSpacing, y: dotSpacing },
  7: { x: dotSpacing, y: dotSpacing },
}

const numberToDots = (number) => {
  switch(number) {
    case 1: return [4];
    case 2: return [2, 6];
    case 3: return [2, 4, 6];
    case 4: return [1, 2, 6, 7];
    case 5: return [1, 2, 4, 6, 7];
    case 6: return [1, 2, 3, 5, 6, 7];
  }
}
const drawDice = (dots) => {
  ctx.clearRect(-canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(diceDots[dot].x, diceDots[dot].y, 10, 0, Math.PI*2);
    ctx.fill();
  });
}



// DICE ROLLING

const rollDice = (interval = 1) => {
  console.log(interval)
  $(document).delay(2000, () => {
    const number = random(6);
    const dots = numberToDots(number);
    drawDice(dots);
    console.log("OK")
    if(interval < 10) {
      return rollDice(interval + 1);
    }
    else {
      // Check si c'est pas un 1
      // Si Oui > resetRoundScore + switchPlayer + fonction failed(animation)
      // Si Non > ajoute valeur du dé a la poche
      return;
    }
  });
  // const number = random(6);
  // const dots = numberToDots(number);
  // drawDice(dots);
}


// START NEW GAME

class Player {
  constructor(playerObject) {
    this.object       = playerObject;
    this.name         = this.object.find('.player-name');
    this.globalScore  = this.object.find('.global-score');
    this.roundScore   = this.object.find('.round-score');
  }
  setName(name) {
    this.name.html(name);
  }
  resetGlobalScore() {
    this.globalScore.html('0');
  }
  resetRoundScore() {
    this.roundScore.html('0');
  }
  hold() {
    score = parseInt(this.globalScore.html()) + parseInt(this.roundScore.html());
    this.globalScore.html(score);
    this.resetRoundScore();
  }
  addToRoundScore(value) {
    this.roundScore += value;
  }
}

const players = [];
const player1 = new Player($('#player1'));
const player2 = new Player($('#player2'));

players.push(player1, player2);

const player1Input = $('#player1-input');
const player2Input = $('#player2-input');

const switchPlayers = () => {
  const picked = $('.player-picked');
  const unpicked = $('.player-unpicked');

  picked.removeClass('player-picked');
  unpicked.removeClass('player-unpicked');

  picked.addClass('player-unpicked');
  picked.addClass('player-picked');
}

const startNewGame = () => {
  players.forEach((player, index) => {
    const regex = /<[^>]*>/g;
    const inputValue = $(`#player${index + 1}-input`).val().replaceAll(regex, "");
    player.setName(inputValue !== '' ? inputValue.toUpperCase() : `Player ${index + 1}`);
    player.resetGlobalScore();
    player.resetRoundScore();
  });

  if(random(2) % 2 === 0) switchPlayers();
}

// START

$(document).ready(function() {
  loadMenu();
})

