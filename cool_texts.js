window.addEventListener("resize", displayWindowSize);
const screen_size = document.getElementById('screen_size');
const current_time = document.getElementById('current_time');
const title_container = document.getElementById('title_container');

const page_title = document.getElementById('page_title');
const title_letters = document.getElementById('title_letters');

let title = page_title.innerHTML;

for (let i = 0; i < title.length; i++) {
    let letter = document.createElement('span');
    letter.innerHTML = title[i];
    letter.style.display = "inline-block"
    title_letters.appendChild(letter)
};

let randomMoveId
document.addEventListener("scroll", (event) => {
    const gradient = document.getElementById('gradient');
    gradient.style.opacity = '0%'
    setTimeout(()=>{
        gradient.style.display = 'none'
    }, 300)
});

title_container.addEventListener('mouseenter', () => {
    title_letters.style.gap = '1px'
    randomMoveId = setInterval(randomlyMoveTitleLetters, 200)
}) 

title_container.addEventListener('click', () => {
    title_container.classList.toggle('title-animation')
    const body = document.querySelector('body');
    body.classList.toggle('light-theme');
    scrambleAnimation();
    // title_letters.style.gap = '5px';
    // title_letters.style.transform = 'scale(1.1, 1.1)'
    // setTimeout(() => {
    //     title_letters.style.gap = '2px';
    //     title_letters.style.transform = 'scale(1, 1)'
    // }, 200)
}) 

title_container.addEventListener('mouseleave', () => {
    title_letters.style.gap = '0px'
    resetLetters();
    clearInterval(randomMoveId);
})


function resetLetters() {
    for (let i = 0; i < title.length; i++) {
        let letter = title_letters.children[i];
        letter.style.transform = 'unset';
    };
}

function randomlyMoveTitleLetters() {
    for (let i = 0; i < title.length; i++) {
        let letter = title_letters.children[i];
        let random_x = (Math.random() * 2 - 1) * 2;
        let random_y = (Math.random() * 2 - 1) * 8;
        let random_angle = (Math.random() * 2 - 1) * 10;
        let style = "translate(" + random_x + "px" + "," + random_y + "px" + ")" + "rotate(" + random_angle + "deg" + ")";
        
        letter.style.transform = style;
        // letter.style.transform = "translate(120px, 50%)";
        // letter.setAttribute('transform', "translate(10px, 10px)")
        // console.log(style)
    };
}

displayWindowSize();
displayCurrentTime();
setInterval(displayCurrentTime, 1000);

function displayWindowSize() {
  let w = window.innerWidth.toString();
  let h = window.innerHeight.toString();
  screen_size.innerHTML = w + " x " + h;

}

function displayCurrentTime() {
var d = new Date();
var s = d.getSeconds();
var m = d.getMinutes();
var h = d.getHours();
current_time.innerHTML = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
};