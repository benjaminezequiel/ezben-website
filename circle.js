let numberOfPages = 16
let rotateQuantity = 0
const container = document.querySelector('.circles-container')

function createCircles() {
    updateCircles()
    let isDown = false

    container.addEventListener('mousedown', function() {
        isDown = true;
    });
    container.addEventListener('mouseup', function() {
        isDown = false;
    });
    window.addEventListener('mousemove', function(e) {
        if (isDown) {
            rotateQuantity = e.clientX / 10
            updateCircles()
        }
    });
}

function updateCircles() {
    const circleSize = 10
    const r = container.offsetHeight / 2
    container.style.width = r * 2 + 'px'

    for (let i = 0; i < numberOfPages; i++) {
        const radiant = (i + 1) * ((360 / numberOfPages) * Math.PI / 180) + rotateQuantity
        let circle = {}
        if (container.children.length >= numberOfPages) {
            circle = container.children[i]
        }
        else {
            circle = document.createElement('div')
        }

        circle.classList.add('circle')
        
        x = r + r * Math.cos(radiant)
        y = r + r * Math.sin(radiant)
        
        circle.style.left = x - circleSize + 'px'
        circle.style.top = y - circleSize + 'px'
        
        container.appendChild(circle)
    }
}

createCircles()

// createCircleOfCircles('container7',420,128);
// createCircleOfCircles('container6',400,128);
// createCircleOfCircles('container5',380,128);
// createCircleOfCircles('container4',360,128);
// createCircleOfCircles('container3',340,128);
// createCircleOfCircles('container2',320,128);
// createCircleOfCircles('container',300, 128);

function getCont(containerName) {
    return container = document.getElementById(containerName);
}

function createCircleOfCircles(containerName, r, numCircles) {
    const centerX = 150;
    const centerY = 150;
    const container = getCont(containerName)

    for (let i = 0; i < numCircles; i++) {
        // Calculate angle for each circle
        
        const anglePerCircle = 360 / numCircles;
        const radiant = anglePerCircle * Math.PI / 180
        const thisRadiant = (i + 1) * radiant;
        
        const circle = document.createElement('div');
        circle.classList.add('circle')

        const src = 'styles/test-img.png'
        const img = document.createElement('img')
        img.src = src
        img.classList.add('hover-img')

    
        const x = centerX + r * Math.cos(thisRadiant);
        const y = centerY + r * Math.sin(thisRadiant);
        
        circle.style.left = `${x - 10}px`; // Subtracting half of the width to center it
        circle.style.top = `${y - 10}px`; // Subtracting half of the height to center it
        container.appendChild(circle);
        circle.appendChild(img);
        // // Create and style the smaller circle
        // const circle = document.createElement('div');
        // circle.classList.add('circle');
    
        // // Add the smaller circle to the container
        // container.appendChild(circle);
    }    
}

let scalingAnimationRunning = false;

window.addEventListener('mousemove', (e) => {
    if (!scalingAnimationRunning) {
        scalingAnimationRunning = true;
        scaleCircles(getCont('container').children, e);
        scaleCircles(getCont('container2').children, e);
        scaleCircles(getCont('container3').children, e);
        scaleCircles(getCont('container4').children, e);
        scaleCircles(getCont('container5').children, e);
        scaleCircles(getCont('container6').children, e);
        scaleCircles(getCont('container7').children, e);
        setTimeout(()=>{
            scalingAnimationRunning = false;
        }, 50)
    }
    // const container2 = document.getElementById(container2);
    // const container3 = document.getElementById(container3);
    // scaleCircles(container2.children)
    // scaleCircles(container3.children)
})

function scaleCircles(circles, e) {
    for (let i = 0; i < circles.length; i++) {
        // console.log('hello')
        // console.log(circles[i])
        const rect = circles[i].getBoundingClientRect();
        // console.log()
        const dx = Math.abs(rect.x)  - e.clientX
        const dy = Math.abs(rect.y)  - e.clientY
        
        const distance = Math.hypot(dx, dy)
        const ratio = 100
        const scaling = 1 / (distance / 100)
        const clampedScale = Math.min(Math.max(scaling, 0), 1.2)
        if (scaling < 0.15) {
            circles[i].style.opacity = '0'
        }
        else {
            circles[i].style.opacity = '1'
        }

        if (scaling > 1) {
            console.log(scaling)
        }
        // console.log(scaling)
        // const subDistance = (rect.x - e.clientX) * 2 + (rect.top - e.clientY) * 2
        // const distance = Math.sqrt(subDistance)
        // circles[i].style.backgroundColor = 'red'
        circles[i].style.transform = 'scale(' + clampedScale + ')'
    }
}