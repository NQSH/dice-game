const header = $('header');
const menuWrapper = $('.menu-wrapper');

const loadMenu = () => {
  setTimeout(() => {
    $('.menu-btn').first().click();
  }, 3000)
  header
  .delay(1500)
  .hide(1500);
  menuWrapper
  .delay(1500)
  .animate({
    'height': '150px',
    'opacity': '100%'
  }, 1500, () => {
    menuWrapper.css('height', 'auto');
    $('.menu-name').animate({
      'opacity': '100%'
    }, 1000, () => {})    
  })
  $('.menu-btn').on('click', function() {
    const currentMenu = $('.collapse.show');
    currentMenu.removeClass('show');
  })
}

$(document).ready(function() {
  loadMenu();  
})

