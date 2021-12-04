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

  // SET BUTTONS EVENT LISTENER
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






$(document).ready(function() {
  loadMenu();  
})

