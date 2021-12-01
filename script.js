const menuWrapper = $('.menu-wrapper');

const loadMenu = () => {
  setTimeout(() => {
    $('.menu-button').first().click();
  }, 2000)
  menuWrapper.animate({
    'height': '150px',
    'opacity': '100%'
  }, 1500, () => {
    menuWrapper.css('height', 'auto');
    $('.menu-name').animate({
      'opacity': '100%'
    }, 1500, () => {})    
  })
  $('.menu-btn').on('click', function() {
    const currentMenu = $('.collapse.show');
    currentMenu.removeClass('show');
  })
}

$(document).ready(function() {
  loadMenu();  
})

