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
const holdBtn = $('#hold-btn');

const loadMenu = () => {

  // LOADING ANIMATION
  setTimeout(() => {
    $('.menu-btn').first().click();
  }, 3000)

  header
    .delay(2000)
    .hide(1000);

  menuWrapper
    .delay(2000)
    .animate({
      'height': '150px',
      'opacity': '100%'
    }, 1000, () => {
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
  continueBtn, playBtn.on('click', hideMenu);
  playBtn.on('click', () => {
    continueBtn.attr('disabled', false);
    startNewGame();
  })
  returnbtn.on('click', hideGameScreen);
  rollBtn.on('click', { interval: 0 }, rollAnim);
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
  switch (number) {
    case 1:
      return [4];
    case 2:
      return [2, 6];
    case 3:
      return [2, 4, 6];
    case 4:
      return [1, 2, 6, 7];
    case 5:
      return [1, 2, 4, 6, 7];
    case 6:
      return [1, 2, 3, 5, 6, 7];
  }
}
const drawDice = (dots) => {
  ctx.clearRect(-canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(diceDots[dot].x, diceDots[dot].y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}


// DICE ROLLING

const rollDice = () => {
  const number = random(6);
  const dots = numberToDots(number);
  drawDice(dots);
  return number;
}

const rollAnim = (event) => {
  rollBtn.off('click');
  $(document)
    .delay(event.data.interval * 100)
    .dequeue()
    .delay(0, () => {
      if (event.data.interval < 9) {
        rollDice();
        event.data.interval += 1;
        rollAnim(event);
      }
      else {
        rollBtn.on('click', { interval: 0 }, rollAnim);
        event.data.interval = 0;
        const score = rollDice();
        checkDiceScore(score);
        holdBtn.on('click', () => { getPickedPlayer().hold(); })
        return;
      }
    });
}

const checkDiceScore = (score) => {
  if (score === 1) {
    endTurn();
  } else {
    getPickedPlayer().addToRoundScore(score);
  }
}

// START NEW GAME

class Player {
  constructor(playerObject) {
    this.object = playerObject;
    this.name = this.object.find('.player-name');
    this.globalScore = this.object.find('.global-score');
    this.roundScore = this.object.find('.round-score');
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
    const global = parseInt(this.globalScore.html());
    const round = parseInt(this.roundScore.html());
    this.globalScore.html(global + round);
    this.resetRoundScore();
    endTurn();
  }
  addToRoundScore(value) {
    const score = parseInt(this.roundScore.html());
    this.roundScore.html(score + value);
    holdBtn.off('click');
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
  unpicked.addClass('player-picked');
}

const startNewGame = () => {
  players.forEach((player, index) => {
    const regex = /<[^>]*>/g;
    const inputValue = $(`#player${index + 1}-input`).val().replaceAll(regex, "");
    player.setName(inputValue !== '' ? inputValue.toUpperCase() : `Player ${index + 1}`);
    player.resetGlobalScore();
    player.resetRoundScore();
  });

  if (random(2) % 2 === 0) switchPlayers();
}

const getPickedPlayer = () => { // Remplacer par currentPlayer <<<
  return players.filter(player => player.object.hasClass('player-picked'))[0];
}
const getUnpickedPlayer = () => {
  return players.filter(player => player.object.hasClass('player-unpicked'))[0];
}

const endTurn = () => {

  getPickedPlayer().resetRoundScore();
  switchPlayers();
  holdBtn.off('click');
}


// CHECK LES GLOBAL SCORE

const checkGlobals = () => {
  // Stocker le first player
  // Si le currentplayer est différent du firstPlayer 
  const globalPickedPlayer = getPickedPlayer().globalScore.html();
  const globalUnpickedPlayer = getUnpickedPlayer().globalScore.html();
  if (globalPickedPlayer >= 100 &&
    globalUnpickedPlayer < 100) {
    // Picked est winner
  } else if (globalPickedPlayer < 100 &&
    globalUnpickedPlayer >= 100) {
    // Unpicked est winner
  } else {
    // Egalité
  }
}


// DISPLAY WINNER

const displayWinner = (player) => {
  // si player
  // pop modal avec nom du vainqueur
  // sinn
  // pop modal egalité
  // demander si rejouer dans modal
  // continueBtn off click ()
  // si oui starnewgame
  // sinon retour menu
}


// LOAD PAGE

$(document).ready(function() {
  loadMenu();
})