const header = $('header');
const menuWrapper = $('.menu-wrapper');

const loadMenu = () => {
  setTimeout(() => {
    $('.menu-btn').first().click();
  }, 3000)
  header.hide(3000);
  menuWrapper.animate({
    'height': '150px',
    'opacity': '100%'
  }, 3000, () => {
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

