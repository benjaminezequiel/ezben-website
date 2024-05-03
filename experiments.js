const grid = document.querySelector('.experiments-grid')
 
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

  console.log(experiment.image)
  if (experiment.image != undefined) {
    const img = document.createElement('img')
    img.src = experiment.image
    newElement.appendChild(img)
  }

  if(experiment.size != 'default'){
    newElement.classList.add(experiment.size)
  }

  newElement.appendChild(title)
  // newElement.appendChild(description)
  // newElement.appendChild(date)
  newElement.appendChild(tags)

  newElement.classList.add('test-experiment')
  grid.appendChild(newElement)
}