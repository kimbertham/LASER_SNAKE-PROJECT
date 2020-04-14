function init() {



  //DOM elements
  const gameGrid = document.querySelector('.grid')
  const startButton = document.querySelector('.start-button')
  const score = document.querySelector('.score')
  const deadButton = document.querySelector('.dead-button')
  const highScoreSpan = document.querySelector('.high-score')

  //grid specs 
  const gridArray = []
  const highScoreArray = []
  const height = 23
  const width = 23

  //! Snake specs
  let snakeYPosition
  let snakeXPosition
  let snakeDirection
  let snakeLength
  let scoreUpdate

  function randomNum(){
    return (Math.floor(Math.random() * width))
  }
 
  for (let yPosition = 0; yPosition < height; yPosition++) { // two loops for height and width
    const rowArray = [] // creates 
    for (let xPosition = 0; xPosition < width; xPosition++){
      const cell = { snake: 0, food: 0, trap: 0, laser: 0 } // object to store the snakes specs
      cell.element = document.createElement('div')
      gameGrid.appendChild(cell.element) // store the cell div on the board
      rowArray.push(cell) // add it into a row
      // cell.element.textContent = `${xPosition}, ${yPosition}` // keep track of the coordinates
      cell.element.style.fontSize = '8px' 
    }
    gridArray.push(rowArray) // add row into board
  }
  

  function createSnakeFood(){
    // food is placed randomy on the board by generating random numbers for array indexes
    let foodXPosition = randomNum()
    let foodYPosition = randomNum()
    gridArray[foodYPosition][foodXPosition].food = 1
    // console.log(`${appleXPosition}${foodYPosition}`)

    // Loops through the arrays to check if the food put down already has a class of SNAKE so food has to placed on a white classless div
    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++){
        if (gridArray[foodYPosition][foodXPosition].element.classList.contains('snake-head')) {
          gridArray[foodYPosition][foodXPosition].food = 0
          foodXPosition = randomNum()
          foodYPosition = randomNum()
          console.log('cant be placed, generate new')
          gridArray[foodYPosition][foodXPosition].food = 1
        }
      }
    }
  }
  ///---------------- creating snake traps

  let trapTimer

  function creatingSnakeTraps() {
    console.log('being read')
    
    function beginTraps() {
      trapTimer = setTimeout(creatingSnakeTraps, 30000)
    }
    beginTraps()

    const trapXPosition = randomNum()
    const trapYPosition = randomNum()

    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++){
        if (gridArray[yPosition][yPosition].element.classList.contains('snake-head') || 
        gridArray[yPosition][yPosition].element.classList.contains('snake-food')) {
          gridArray[trapYPosition][trapXPosition].trap = 0
          console.log('cant plae here, generate new')
          const trapXPosition = randomNum()
          const trapYPosition = randomNum()
        } else 
          gridArray[trapYPosition][trapXPosition].trap = 1
      }
    }
  }

  let laserPosition
  let laserDirection
  let laserXPos
  let laserYPos

  function handleLaserPosition(event){
    if (event.code === 'Space') {
      switch (snakeDirection) {
        case 'Right' : 
          laserXPos = snakeXPosition + 2
          laserYPos = snakeYPosition
          laserDirection = 'Right'
          console.log(laserDirection)

          break
        case 'Left' : 
          laserXPos = snakeXPosition - 2
          laserYPos = snakeYPosition
          laserDirection = 'Left'
          break
        case 'Up' :  
          laserXPos = snakeXPosition 
          laserYPos = snakeYPosition - 2
          laserDirection = 'Up'
          break
        case 'Down' : 
          laserXPos = snakeXPosition 
          laserYPos = snakeYPosition + 2
          laserDirection = 'Down'
          break
      }
      laserMove()
    }

    function laserMove() {

      console.log('hi')
   
    
      switch (laserDirection) {
        case 'Right':
          laserXPos++
          console.log(`${laserXPos} ${laserYPos}`)
          
          break
        case 'Left' :
          laserXPos--
          break
        case 'Up' : 
          laserYPos--
          break
        case 'Down': 
          laserYPos++
          break
      }
      gridArray[laserYPos][laserXPos].laser = 1


      const laserTimer = setTimeout(laserMove, 100)

    }
  }
    

  function updatingScore(){
    score.textContent = scoreUpdate
  }
  //=------------

  function updatingHighScore(){
    
    highScoreArray.push(scoreUpdate)
    const highScore = Math.max.apply(null,highScoreArray)
    highScoreSpan.textContent = highScore
  }

  function deadScreen() {
    
    console.log('dead')
    clearTimeout(trapTimer)

    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++) {
        gridArray[yPosition][xPosition].element.classList.remove('snake-head')    
        gridArray[yPosition][xPosition].element.classList.remove('snake-food') 
        gridArray[yPosition][xPosition].element.classList.remove('laser')
      }
    }
    gameGrid.id = 'dead-screen'
    gameGrid.classList.remove('grid')
    gameGrid.appendChild(deadButton)
    deadButton.style.display = 'block'
    deadButton.addEventListener('click', restartGame)

  }
  

  function restartGame(){

    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++) {
        gridArray[yPosition][xPosition].snake = 0
        gridArray[yPosition][xPosition].food = 0
        gridArray[yPosition][xPosition].trap = 0
        gridArray[yPosition][xPosition].laser = 0

      }
    }

    gameGrid.removeAttribute('id')
    gameGrid.classList.add('grid')
    deadButton.style.display = 'none'

    snakeYPosition = Math.floor(height / 2)
    snakeXPosition = Math.floor(width / 2)
    snakeLength = 5
    snakeDirection = 'Up'
    scoreUpdate = 0
    updatingScore()
    createSnakeFood()
    creatingSnakeTraps()
    theGame()
  }

  //snake food 


  function theGame(){
    // FUNCTIONING PART OF THE GAME!! HERE LOOP TO MAKE THE SNAKE PRESET, CLASS WILL GET ADDED BASED ON THIS!!!!!! 
    // GOTTA MANIPULTE THE VARIABLES TO MAKE THE MOVEMENT APPEAR DIFF
    //! gridArray[yPosition][xPosition ] <------- (LOOP - LOCAL TO LOOP) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][] 
    //! gridArray[snakeXPosition][snakeYPosition] // <------- (GAME - LOCAL TO FUNCTION) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][]

    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++){

        if (gridArray[yPosition][xPosition].snake > 0) {
          gridArray[yPosition][xPosition].element.classList.remove('laser') 
          gridArray[yPosition][xPosition].element.classList.add('snake-head') 
          gridArray[yPosition][xPosition].snake-- // THE NUMVER OF ITERATIONS THE CLASS IS ON THE BOARD FOR, STATING HOW  LONG ITLL MEET THE CONDITION OF THE LOOP AND DECREASE BY ONE ADTER EVERY LOOP INCREMENTALLY,
        } else if (gridArray[yPosition][xPosition].food === 1) {
          gridArray[yPosition][xPosition].element.classList.add('snake-food')
        } else if (gridArray[yPosition][xPosition].trap === 1) {
          gridArray[yPosition][xPosition].element.classList.add('snake-trap') 
        } else if (gridArray[yPosition][xPosition].laser > 0 ) {
          gridArray[yPosition][xPosition].element.classList.add('laser') 
          gridArray[yPosition][xPosition].laser--
        } else {
          gridArray[yPosition][xPosition].element.classList.remove('snake-head')    ///  REMOVES THE CLASS IF THE SNAKE
          gridArray[yPosition][xPosition].element.classList.remove('snake-food')
          gridArray[yPosition][xPosition].element.classList.remove('snake-trap')
          gridArray[yPosition][xPosition].element.classList.remove('laser') 
          // OR SNAKE FOOD IS NOT AT POSITION INDEX
        } 
      }
    }
    
    


    
    // handling the movement of the snake, none of this is called untill triggered by a keyboard event /// ! DEAFULT UP SETTING MOVES
  
    switch (snakeDirection) {
      case 'Right':
        snakeXPosition++
        break
      case 'Left' :
        snakeXPosition--
        break
      case 'Up' : 
        snakeYPosition--
        break
      case 'Down': 
        snakeYPosition++
        break
    }
    
    
    function handleDirectionKeys(event) {
      switch (event.key) {
        case 'ArrowRight' :
          if ( snakeDirection !== 'Left') {
            snakeDirection = 'Right'
          }
          break
        case 'ArrowLeft': 
          if (snakeDirection !== 'Right') {
            snakeDirection = 'Left'
          }
          break
        case 'ArrowUp': 
          if (snakeDirection !== 'down') {
            snakeDirection = 'Up'
          }
          break
        case 'ArrowDown':
          if (snakeDirection !== 'Up') {
            snakeDirection = 'Down'
          }
          break
      }
    }
   
    document.addEventListener('keyup', handleDirectionKeys)
    

    // -----------------------------------------------

   
    
    
    

    document.addEventListener('keydown', handleLaserPosition)
    
    //!LOSIING CONDITIONS
    // making the game lose if the walls are rouched by making the numbers outside of the width and height accessible for adding a class
    if ( snakeXPosition < 0 || snakeXPosition >= width - 1 || snakeYPosition < 0 || snakeYPosition >= height - 1)  {
      updatingHighScore()
      deadScreen()
    } else if (gridArray[snakeYPosition][snakeXPosition].snake > 0){
      updatingHighScore()
      deadScreen()    //making the game lose if the snake current position is going somewhere where the classlist is already set. i.e can only go somewhere that is 'blank'
    } else if (gridArray[snakeYPosition][snakeXPosition].trap > 0) {
      updatingHighScore()
      deadScreen()
    }
  

    // !WINNING CONDITIONS
    // making game win a "point" by collecting food divs and gaining length
    if (gridArray[snakeYPosition][snakeXPosition].food === 1) {
      gridArray[snakeYPosition][snakeXPosition].element.classList.remove('snake-food')
      snakeLength++
      scoreUpdate += 100
      updatingScore()
      gridArray[snakeYPosition][snakeXPosition].food = 0
      createSnakeFood()
    }
    
    // HERE!!!! would be where the first.. " viewable active moment of the game starts" !!!!! 
    gridArray[snakeYPosition][snakeXPosition].snake = snakeLength
    // console.log( `${[snakeYPosition]} ${[snakeXPosition]}.snake = ${snakeLength}`)

    




    // const decreaseTen = setTimeout(theGame, 200 - (snakeLength * 10))

    // if (snakeLength > 7 && snakeLength < 9) {
    //   clearTimeout(decreaseTen)
    //   const decreaseTwo = setTimeout(theGame, 100 - (snakeLength * 2))
    //   console.log(100 - (snakeLength * 2))
    // } else if (snakeLength > 11) {
    //   clearTimeout(decreaseTen)
    //   const maxSpeed = setTimeout(theGame, 55)
    //   console.log('maxSpeed')
    // }



    const decreaseTen = setTimeout(theGame, 100)
    
  //gameLoop
  }
  //gameLoop
  
  
  startButton.addEventListener('click', restartGame)



}
window.addEventListener('DOMContentLoaded' , init)