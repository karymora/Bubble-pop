const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// alert("Hello! I am an alert box!!");
//const startButton = document.getElementById('start-button')
let frames = 0
let score = 0
let interval


  let grid = {
    x: 250,          
    y: 100,          
    height: 800, 
    width:800,    
    columns: 6,    
    rows: 6,      
    bubblewidth: 70,  
    bubbleheight: 70, 
    topbubbles: []      
    }


class Topbubble { 

 constructor(width, height,color, x, y,){
    this.width=70
    this.height=70
    this.color='red'
    this.x=100
    this.y=100
    
}

 draw(){
   ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
     }


}


function start(){
  
}

function updateTopBubbles(){
 for (let i=0; i<grid.columns; i++) {
  grid.topbubbles[i] = [];
 for (var j=0; j<grid.rows; j++) {
  grid.topbubbles[i][j] = new Topbubble(i, j, 100,100)
   }
        }
 
  }

function drawTopBubbles(){
 let down=0
   for (let i=0; i<grid.rows; i++) {
 
  grid.topbubbles.forEach(topbubble =>{
   theTopBubbles.x +=90
   if(down%5===0){
   theTopBubbles.y +=90
   down=0
   theTopBubbles.x=180
     }
  theTopBubbles.draw()
  down++
  } )
  
   }

}

let theTopBubbles=new Topbubble(0,0,"red",0,0)     

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // frames++
  clearCanvas()
  start()
  board.draw()
  canon.draw()
  bubble.draw()
  drawTopBubbles()
  updateTopBubbles()
}

function start() {
  interval = setInterval(update, 900 / 60)
  // console.log(interval)
}

function clearCanvas() {  
 ctx.clearRect(0, 0, canvas.width, canvas.height)}

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height

    this.image = new Image()
    this.image.src = './assets/screen1.jpg'
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {

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
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    )
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

}


const board = new Board()
const canon = new Canon()
const bubble = new Bubble()

update()


//startButton.onclick=start()