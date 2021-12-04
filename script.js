// MENU LOADER

const header = $('header');
const menuWrapper = $('#menu-wrapper');
const gameScreen = $('#game-screen');

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
  $('#continue-btn, #play-btn').on('click', hideMenu);
  $('#play-btn').on('click', () => {
    document.querySelector('#continue-btn').disabled = false;
  })
  $('#return-btn').on('click', hideGameScreen);
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




// START

$(document).ready(function() {
  loadMenu();  
})

