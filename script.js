const hamburgerMenu = document.querySelector('.hamburger-btn');


const styleElement = (element, { display, opacity, background, height, width, padding }) => {
  element.style.display = display;
  element.style.opacity = opacity;
  element.style.background = background;
  element.style.height = height;
  element.style.width = width;
  element.style.padding = padding;
  element.style.transition = 'opacity,background ease-in-out 0.3s';
};

const visibleStyle = { background: 'white', opacity: '1', height: 'auto', width: 'auto', padding: '14px', display: 'flex' };
const hiddenStyle = { background: 'transparent', opacity: '0', height: '0px', width: '0px', padding: '0px', display: 'flex' };

hamburgerMenu.addEventListener('click', e => {
  const menuLinks = document.querySelector('.navlinks');
  const currentStyle = getComputedStyle(menuLinks);
  //console.log('computed:', currentStyle)
  //console.log('direct:', menuLinks.style)
  //console.log(currentStyle.display,  currentStyle.opacity)
  if (currentStyle.display === 'flex' && currentStyle.opacity === '1') {
    styleElement(menuLinks, hiddenStyle);
    return;
  } else if (currentStyle.display === 'flex' && currentStyle.opacity === '0') {
    styleElement(menuLinks, visibleStyle);
    return;
  }
});


document.addEventListener('click', e => {
  const menuLinks = document.querySelector('.navlinks');
  console.log(menuLinks.style.display);
  if (menuLinks.style.display === 'flex') {
    if (menuLinks.contains(e.target) || hamburgerMenu.contains(e.target)) return;
    styleElement(menuLinks, hiddenStyle);
  }
});


window.addEventListener('resize', e => {
  const menuLinks = document.querySelector('.navlinks');
  const isScreenWidth = document.documentElement.clientWidth > 767;
  isScreenWidth ?
  styleElement(menuLinks, { ...visibleStyle, background: 'transparent', display: 'block' }) :
  styleElement(menuLinks, { ...hiddenStyle, background: 'transparent' });
});


// add drop shadow to the nav bar element aster scrolling down an amount of pixels

let timer; //empty timer to accumulate the settimeout in order to clear later on
document.addEventListener('scroll', e => {
  if (timer) {window.clearTimeout(timer);} // will clear the timer its a way to optimize by delaying
  // the scroll fiering
  timer = window.setTimeout(() => {
    const nav = document.querySelector('.nav');
    const scrollTopValue = document.documentElement.scrollTop;

    if (scrollTopValue >= 800 && nav.style.boxShadow !== '0px 0px 7px rgba(0,0,0,0.2)') {
      nav.style.boxShadow = '0px 0px 7px rgba(0,0,0,0.2)';
    } else if (scrollTopValue < 800 && nav.style.boxShadow !== '0px 0px 0px rgba(0,0,0,0.0)') {
      nav.style.boxShadow = '0px 0px 0px rgba(0,0,0,0.0)';
    }
  }, 100);
});