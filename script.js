const random = (number) => {
  return Math.floor(Math.random() * number) + 1;
}


// GAME/MENU SWITCH

const showGameScreen = () => {
  gameScreen.fadeIn(1000);
  gameScreen.css('display', 'flex')
}
const hideGameScreen = () => {
  gameScreen.fadeOut(1000, showMenu);
}

const showMenu = () => {
  menuWrapper.fadeIn(1000);
}
const hideMenu = () => {
  menuWrapper.fadeOut(1000, showGameScreen);
}


// DICE DRAWING

const diceCanvas = document.querySelector('#dice-display');
const ctx = diceCanvas.getContext('2d');
const canvasSize = diceCanvas.width;
const dotSpacing = canvasSize / 4;
ctx.translate(canvasSize / 2, canvasSize / 2);
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
  holdBtn.off('click');

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
        game.checkDiceScore(score);
        return;
      }
    });
}


// PLAYER

class Player {
  constructor(playerObject) {
    this.object = playerObject;
    this.playerName = this.object.find('.player-name');
    this.globalScore = this.object.find('.global-score');
    this.roundScore = this.object.find('.round-score');
  }

  set name(name) { this.playerName.html(name); }
  get name() { return this.playerName.html(); }

  set global(value) { this.globalScore.html(value); }
  get global() { return parseInt(this.globalScore.html()); }

  set round(value) { this.roundScore.html(value); }
  get round() { return parseInt(this.roundScore.html()); }

  resetGlobal() {
    this.global = '0';
  }
  resetRound() {
    this.round = '0';
  }
  hold() {
    this.global += this.round; 
    this.resetRound();
  }
}


// PLAYERS

const players = {
  list: [
    new Player($('#player1')),
    new Player($('#player2'))
  ],
  current: () => { 
    return players.list.filter(player => player.object.hasClass('player-picked'))[0]; 
  },
  initialize: () => {
    const regex = /<[^>]*>/g;
    players.list.forEach((player, index) => {
      const input = $(`#player${index + 1}-input`);
      const inputValue = input.val().replaceAll(regex, "");
      player.name = inputValue !== '' ? inputValue.toUpperCase() : `Player ${index + 1}`;
      player.resetGlobal();
      player.resetRound();
    });
  },
  switchPlayers: () => {
    const picked = $('.player-picked');
    const unpicked = $('.player-unpicked');
  
    picked.removeClass('player-picked');
    unpicked.removeClass('player-unpicked');
  
    picked.addClass('player-unpicked');
    unpicked.addClass('player-picked');
  }
}


// GAME

const game = {
  startNewGame: () => {
    players.initialize();
    if (random(2) % 2 === 0) players.switchPlayers();
  },
  endTurn: () => {
    const player = players.current();
    player.resetRound();
  
    if (player.global >= 100) {
      game.endGame();
    } else {
      players.switchPlayers();
    }
  },
  endGame: () => {
    game.displayWinner(players.current());
    continueBtn.attr('disabled', true);
  },
  checkDiceScore: (score) => {
    if (score === 1) {
      game.endTurn();
    } else {
      players.current().round += score;
      holdBtn.on('click', () => {
        players.current().hold();
        game.endTurn();
      });
    }
  },
  displayWinner: (player) => {
    const modalBody = endgameModal.find('.modal-body');
    const p = document.createElement('p');
    const text = `Le vainqueur est ${player.name}`;
    
    p.innerHTML = text;
    modalBody.html(p);
    
    endgameModal.modal('toggle');
  }
}


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
const quitBtn = $('#quit-btn');
const replayBtn = $('#replay-btn');

// Modal
const endgameModal = $('#endgame-modal');
const newgameModal = $('#newgame-modal');


// LOAD PAGE

const animateMenu = () => {
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
}

const setEventListeners = () => {
  // Menu
  $('.menu-btn').on('click', function() {
    const currentMenu = $('.collapse.show');
    currentMenu.removeClass('show');
  })
  continueBtn.on('click', hideMenu)
  
  // Game controls
  returnbtn.on('click', hideGameScreen);
  rollBtn.on('click', { interval: 0 }, rollAnim);

  // Newgame Modal
  newgameModal.on('show.bs.modal', () => {
    playBtn.on('click', () => {
      hideMenu();
      game.startNewGame();
      continueBtn.attr('disabled', false);
      playBtn.off('click');
    })
  })
  
  // Endgame Modal
  endgameModal.on('show.bs.modal', () => {
    quitBtn.on('click', () => {
      hideGameScreen();
    });  
    replayBtn.on('click', () => {
      game.startNewGame();
      continueBtn.attr('disabled', false);
    });
  })
  endgameModal.on('hidden.bs.modal', () => {
    quitBtn.off('click');
    replayBtn.off('click');
  })
}

$(document).ready(function() {
  animateMenu();
  setEventListeners();
})
