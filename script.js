const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')



let frames = 0
let score = 0
let interval
let myPlatforms = []
let coins = []



function update() {
  frames++
  clearCanvas()
  start()
  board.draw()
  canon.draw()
  canon2.draw()
  canon3.draw()
  bubble.draw()
  coin1.draw()
  platform.draw()
  player.draw()
  generateCoins()
  drawCoins()

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
    const coinPositionY = Math.floor(Math.random() * (100))
    coins.push(new Coin(40, 40, 0, coinPositionY))
    //console.log(coins)
  }
}

function drawCoins() {
  coins.forEach(theCoin => {
    theCoin.x += 1
    theCoin.draw()
  })
  console.log(coins)
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
}


function updatePlatforms() {
  if (frames % 120 === 0) {
    let y = 120
    let minWidth = canvas.width * 0.075
    let maxWidth = canvas.width * 0.75
    let width = Math.floor(Math.random() * (maxWidth - minWidth))
    let random = Math.floor(Math.random() * canvas.width)

    myPlatforms.push(new Platform(width, 150, this.imagePlatform, random, 0))
    // score++
  }

}
// let thePlatforms = new Platform(width, 150, this.imagePlatform, 180, 430)



// function drawPlatforms() {

//   myPlatforms.forEach(thePlatforms => {
//     thePlatforms.y += 1
//     thePlatforms.draw()
//   })
// }

class Character {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 120
    this.height = 120
    this.image = new Image()
    this.image.src = './assets/run_1.png'

  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  walk() {
    this.x += 20
  }
  walkback() {
    this.x -= 20
  }

  jump() {
    this.y -= 20

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

    case 32:
      player.jump()

      break


    case 13:
      location.reload()
      break

      // default:
      //   break
  }
}





const board = new Board()
const canon = new Canon(500, 630)
const canon2 = new Canon(150, 630)
const canon3 = new Canon(850, 630)
const bubble = new Bubble()
const coin1 = new Coin(40, 40, 50, 50)
const platform = new Platform(150, 250)
const player = new Character(200, 140)

update()

//startButton.onclick=start()   