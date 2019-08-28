const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.onclick = function(e) {
  let xPosition = e.clientX
  let yPosition = e.clientY
  bubble.x=xPosition
  bubble.y=yPosition
  bubble.draw()
  console.log(xPosition, yPosition)
}
// alert("Hello! I am an alert box!!");
//const startButton = document.getElementById('start-button')


let frames = 0
let score = 0
let interval
let grid = {
  x: 450,
  y: 250,
  height: 800,
  width: 800,
  columns: 6,
  rows: 6,
  bubblewidth: 70,
  bubbleheight: 70,
  topbubbles: []
}

function changePosition() {
  canvas.addEventListener('click', getClickPosition, false)
}

class Topbubble {
  constructor() {
    this.width = 70
    this.height = 70
    this.color = 'red'
    this.x = 300
    this.y = 100
    this.image = new Image()
    this.image.src = './assets/green.png'
    this.image.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height)
  }
}

function updateTopBubbles() {
  for (let i = 0; i < grid.columns; i++) {
    grid.topbubbles[i] = []
    for (let j = 0; j < grid.rows; j++) {
      grid.topbubbles[i][j] = new Topbubble()
    }
  }
}

function drawTopBubbles() {
  let down = 0

  for (let a = 0; a < grid.columns; a++) {
    grid.topbubbles.forEach((topbubble, i) => {
      topbubble[i].y += 90
      if (down % 6 === 0) {
        topbubble[i].x += 90
        down = 0
        topbubble[i].y = 180
      } else {
        topbubble[i].x += 90
        topbubble[i].y = 90
      }
      topbubble[i].draw()
      down++
    })
  }

  for (let a = 0; a < grid.rows; a++) {
    grid.topbubbles.forEach((topbubble, j) => {
      topbubble[a].y += 90
      if (down % 6 === 0) {
        topbubble[a].x += 90
        down = 0
        topbubble[a].y = 180
      } else {
        topbubble[a].x += 90
        topbubble[a].y = 90
      }
      topbubble[a].draw()
      down++
    })
  }
}

// let theTopBubbles = new Topbubble(0, 0, 0, 0)

function update() {
  frames++
  clearCanvas()
  start()
  board.draw()
  canon.draw()
  bubble.draw()
  updateTopBubbles()
  drawTopBubbles()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height

    this.image = new Image()
    this.image.src = './screen1.png'
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {
    
 this.x-=1
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    )

  }
}

class Canon {
  constructor() {
    this.x = 500
    this.y = 630
    this.width = 200
    this.height = 200
    this.image = new Image()
    this.image.src = './assets/canon.png'
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}

//
class Bubble {
  constructor(x, y, width, height, type) {
    this.x = 570
    this.y = 560
    this.width = 70
    this.height = 70
    this.type = type

    this.imageGreen = new Image()
    this.imageGreen.src = './assets/green.png'
    this.imagePurple = new Image()
    this.imagePurple.src = './assets/purple.png'
    this.imageYellow = new Image()
    this.imageYellow.src = './assets/yellow.png'
    this.imageRed = new Image()
    this.imageYellow.src = './assets/yellow.png'

    this.image = new Image()
    this.image.src = './assets/purple.png'
    this.image.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.imageGreen, this.x, this.y, this.width, this.height)
  }
  float() {
    this.y -= 20
  }
}

document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      bubble.float()
      break
    case 13:
      location.reload()
      break

    default:
      break
  }
}

const board = new Board()
const canon = new Canon()
const bubble = new Bubble()

update()

//startButton.onclick=start()
