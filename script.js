const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let frames = 0
let score = 0
let interval
let myPlatforms = []
let coins = []
let stars = []

function update() {
  frames++
  clearCanvas()
  
  board.draw()
  canon.draw()
  canon2.draw()
  canon3.draw()
  // bubbleLeft.draw()
  // bubbleMiddle.draw()
  // bubbleRight.draw()
  coin1.draw()
  platform.draw()
  platform2.draw()
  platform3.draw()
  player.draw()
  scoreB.draw()
  updateScore()
  generateCoins()
  drawCoins()
  generatePlatforms()
  drawPlatforms()
  winCoins()
  winStars()
  stopFall()
  generateBubble()
  drawBubbles()
  generateStars()
  drawStars()
  loses()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function updateScore() {
  ctx.font = '30px Lexend Deca'
  ctx.fillStyle = 'white'
  ctx.fillText(`Score : ${score}`, 130, 60)
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
    this.image.src = './assets/screen1.png'
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x -= 1
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class scoreBoard {
  constructor() {
    this.x = 40
    this.y = 10
    this.width = 250
    this.height = 60
    this.imageScore = new Image()
    this.imageScore.src = './assets/coinsbn.png'
    this.imageScore.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.imageScore, this.x, this.y, this.width, this.height)
  }
}

class Canon {
  constructor(x, y) {
    this.x = x
    this.y = y
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
    this.x = x
    this.y = y
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
    this.imageRed.src = './assets/red.png'
    this.image = new Image()
    this.image.src = './assets/purple.png'
    this.image.onload = () => {
      this.draw()
    }
  }

  draw() {
    this.y -= 0.4
    ctx.drawImage(this.imageRed, this.x, this.y, this.width, this.height)
  }
  float() {
    this.y -= 20
  }
  shoot() {
    this.y = -10
  }

  top() {
    return this.y
  }
  bottom() {
    return this.y + this.height
  }

  left() {
    return this.x
  }
  right() {
    return this.x + this.width
  }
}

function generateBubble() {
  let randomNumber = Math.floor(Math.random() * 200)
  if (leftBubble.y <= 0) {
    if (frames % randomNumber === 0) {
      leftBubble.y = 630
    }
  }

  let randomNumber2 = Math.floor(Math.random() * 150)
  if (rightBubble.y <= 0) {
    if (frames % randomNumber2 === 0) {
      rightBubble.y = 630
    }
  }

  let randomNumber3 = Math.floor(Math.random() * 100)
  if (middleBubble.y <= 0) {
    if (frames % randomNumber3 === 0) {
      middleBubble.y = 630
    }
  }
}

function drawBubbles() {
  leftBubble.draw()
  rightBubble.draw()
  middleBubble.draw()
}

class Coin {
  constructor(width, height, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.imageCoin = new Image()
    this.imageCoin.src = './assets/coin.png'
    this.imageCoin.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.imageCoin, this.x, this.y, this.width, this.height)
  }
}

function generateCoins() {
  if (frames % 400 === 0) {
    // const coinPositionX = Math.floor(Math.random() * (max - min))
    const coinPositionY = Math.floor(Math.random() * 180)
    coins.push(new Coin(40, 40, 0, coinPositionY))
    //console.log(coins)
  }
}

function drawCoins() {
  coins.forEach(theCoin => {
    theCoin.x += 1
    theCoin.draw()
  })
}

class Star {
  constructor(width, height, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.imageStar = new Image()
    this.imageStar.src = './assets/star.png'
    this.imageStar.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.imageStar, this.x, this.y, this.width, this.height)
  }
  top() {
    return this.y
  }

  left() {
    return this.x
  }
  right() {
    return this.x + this.width
  }

  bottom() {
    return this.y + this.height
  }
}

function generateStars() {
  if (frames % 200 === 0) {
    const starPositionY = Math.floor(Math.random() * 400)
    stars.push(new Star(40, 40, 500, starPositionY))
  }
}

function drawStars() {
  stars.forEach(theStar => {
    theStar.x += 1
    theStar.draw()
  })
}

class Platform {
  constructor(x, y) {
    this.width = 150
    this.height = 80
    this.x = x
    this.y = y
    this.imagePlatform = new Image()
    this.imagePlatform.src = './assets/ground.png'
    this.imagePlatform.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.imagePlatform, this.x, this.y, this.width, this.height)
  }
  fall() {
    this.y = canvas.height
  }

  top() {
    return this.y
  }
}

function generatePlatforms() {
  if (frames % 800 === 0) {
    const platformPositionX = Math.floor(Math.random() * 306)
    const platformPositionY = Math.floor(Math.random() * 600)
    myPlatforms.push(new Platform(platformPositionX, platformPositionY))
  }
}

function drawPlatforms() {
  myPlatforms.forEach(myPlatform => {
    myPlatform.x += 1
    myPlatform.draw()
  })
}

class Character {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.fall = 0.5
    this.width = 120
    this.height = 120
    this.image = new Image()
    this.image.src = './assets/run_1.png'
  }

  draw() {
    this.y += this.fall
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  walk() {
    this.x === canvas.width - this.width ? (this.x = 0) : (this.x += 20)
  }
  walkback() {
    this.x === 0 ? (this.x = canvas.width - this.width) : (this.x -= 20)
  }

  jump() {
    this.y -= 20
    this.y === 0 ? (this.y = canvas.height - this.height) : (this.y -= 20)
  }

  fall() {
    this.y += 20
  }

  top() {
    return this.y
  }

  left() {
    return this.x
  }
  right() {
    return this.x + this.width
  }

  bottom() {
    return this.y + this.height
  }

  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }

  isFollowing(tree) {
    return this.y < tree.y + tree.height && this.y + this.height > tree.y
  }
}

document.onkeydown = e => {
  switch (e.keyCode) {
    case 39:
      player.walk()
      break

    case 37:
      player.walkback()
      break

    case 38:
      player.jump()
      break

    case 40:
      player.fall()
      break

    case 13:
      location.reload()
      break

    // default:
    //   break
  }
}

function winCoins() {
  coins.forEach((coin, i) => {
    if (player.isTouching(coin)) {
      coins.splice(i, 1)
      return (score += 1)
    }
  })
}

function winStars() {
  stars.forEach((star, a) => {
    if (player.isTouching(star)) {
      stars.splice(a, 1)
      return (score += 1)
    }
  })
}

function stopFall() {
  myPlatforms.forEach((tree, i) => {
    if (
      player.isTouching(tree) ||
      player.isTouching(platform) ||
      player.isTouching(platform2) ||
      player.isTouching(platform3)
    ) {
      player.fall = 0
    } else {
      player.fall = 0.5
    }
  })
}
function finalScreen() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function stop() {
  clearInterval(interval)
  interval = null
  finalScreen()
}

function loses() {
  if (
    player.isTouching(leftBubble) ||
    player.isTouching(rightBubble) ||
    player.isTouching(middleBubble) ||
    player.y === canvas.height - player.height
  ) {
    stop()
  }
}

const board = new Board()
const canon = new Canon(500, 630)
const canon2 = new Canon(150, 630)
const canon3 = new Canon(850, 630)
let leftBubble = new Bubble(220, 630)
let middleBubble = new Bubble(580, 630)
let rightBubble = new Bubble(920, 630)
//const platform = new Platform()
const coin1 = new Coin(40, 40, 50, 50)
const platform = new Platform(150, 250)
const platform2 = new Platform(450, 400)
const platform3 = new Platform(600, 150)
const player = new Character(200, 140)
const scoreB = new scoreBoard()

setTimeout(function() {
  platform.fall()
}, 12000)

setTimeout(function() {
  platform2.fall()
}, 6000)

setTimeout(function() {
  platform3.fall()
}, 9000)

setTimeout(() => {
  myPlatforms.forEach(element => {
    element.fall()
  })
}, 100)

window.onload =()=>{
start()
}

//startButton.onclick=start()
