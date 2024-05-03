const grid = document.querySelector('.experiments-grid')
const backdrop = document.querySelector('.backdrop')
let openExperiment = null;

async function getExperiments() {
  const res = await fetch('/src/experiments/experiments.json')
  return await res.json();
}

async function main() {
  const data = await getExperiments();
  for (let i = 0; i < data.experiments.length; i++) {
    createElement(data.experiments[i]);
  }
}

main()

function createElement(experiment) {
  const newElement = document.createElement('div')

  const title = document.createElement('h3')
  title.innerHTML = experiment.title

  const description = document.createElement('p')
  description.innerHTML = experiment.description

  const date = document.createElement('p')
  date.innerHTML = experiment.date

  const tags = document.createElement('p')
  tags.innerHTML = experiment.tags

  const container = document.createElement('div')

  console.log(experiment.image)
  if (experiment.image != undefined) {
    const img = document.createElement('img')
    img.src = experiment.image
    container.appendChild(img)
  }

  if(experiment.size != 'default'){
    newElement.classList.add(experiment.size)
  }

  container.appendChild(title)
  //  container.appendChild(description)
  //  container.appendChild(date)
  // container.appendChild(tags)
  container.classList.add('experiment-container')
  newElement.classList.add('test-experiment')

  newElement.appendChild(container)
  grid.appendChild(newElement)

  let isOpen = false;

  newElement.addEventListener('click', (e) => {
    if (!isOpen) {
      isOpen = true;
      const coordinates = newElement.getBoundingClientRect()
      const viewportX = window.innerWidth
      const viewportY = window.innerHeight
      const newX = (viewportX / 2) - (coordinates.width / 2) - coordinates.x
      const newY = (viewportY / 2) - (coordinates.height / 2) - coordinates.y
  
      newElement.style.transform = 'translate(' + newX + 'px,' + newY + 'px)'
      backdrop.style.display = 'unset'
      backdrop.style.opacity = '1'
      newElement.classList.add('active-item')
      disableScroll()
    }
    else {
      isOpen = false;
      newElement.style.transform = 'unset'
      newElement.classList.remove('active-item')
      backdrop.style.display = 'none'
      backdrop.style.opacity = '0'
      enableScroll()
    }
    // container.style.position = 'fixed';
    // setTimeout(() => {
      // }, 10)
    // container.classList.add('active');
    // window.addEventListener('mouseup', handleClick);
    // openExperiment = container;

  })
}



function handleClick(event) {
  if (!openExperiment.contains(event.target)) {
      openExperiment.classList.remove('active');
      window.removeEventListener('mouseup', handleClick)
      openExperiment = null;
  }
  // if(!container.contains(event.target)) {
  //     console.log('fora!')

  //   }
  // else {
  //   console.log('dentro!!!')
  // }
}
// function onClickOutside(e, container) {
//   if (e.target.className.includes('active')) {
//     console.log('experiment open')
//   }
//   else {
//     console.log('closed')
//     window.removeEventListener("click", onClickOutside);
//     container.classList.remove('active');
//   }
// }


var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;

try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}