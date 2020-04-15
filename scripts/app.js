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
  let snakeLength = 5
  let scoreUpdate

  function randomNum(){
    return (Math.floor(Math.random() * width))
  }
 
  for (let yPosition = 0; yPosition < height; yPosition++) { // two loops for height and width
    const rowArray = [] // creates 
    for (let xPosition = 0; xPosition < width; xPosition++){
      const cell = { snake: 0, food: 0, trap: 0, laser: 0, door: 0 } // object to store the snakes specs
      cell.element = document.createElement('div')
      gameGrid.appendChild(cell.element) // store the cell div on the board
      rowArray.push(cell) // add it into a row
      // cell.element.textContent = `${xPosition}, ${yPosition}` // keep track of the coordinates
      cell.element.style.fontSize = '8px' 
    }
    gridArray.push(rowArray) // add row into board
  }
  
  //! creating Food --------------------------------

  let foodBlock 
  let foodXPosition
  let foodYPosition

  function testFood(){
    do { 
      foodXPosition = randomNum()
      foodYPosition = randomNum()
      // console.log( `${foodYPosition} ${foodXPosition}`)
      for (let y = 0; y < height; y++) { 
        for (let x = 0; x < width; x++){
          if ( gridArray[foodYPosition][foodXPosition].door > 0 ||
            gridArray[foodYPosition][foodXPosition].trap > 0 ||
            gridArray[foodYPosition][foodXPosition].snake > 0 ) {
            gridArray[foodYPosition][foodXPosition].food = 0
            // console.log('dont appear')
            foodBlock = 1
          } else {
            gridArray[foodYPosition][foodXPosition].food = 1
            // console.log('appear')
            foodBlock = 2
          }
        }
      }
    }
    while (foodBlock === 1)
  }

  //! Creating traps ---------------------------

  let trapBlock 
  let trapXPos
  let trapYPos

  function createTraps(){
    do { 
      trapXPos = randomNum()
      trapYPos = randomNum()
      // console.log( `${trapYPos} ${trapYPos}`)

      for (let y = 0; y < height; y++) { 
        for (let x = 0; x < width; x++){
          if (gridArray[trapYPos][trapXPos].door > 0 ||
            gridArray[trapYPos][trapXPos].trap > 0 ||
            gridArray[trapYPos][trapXPos].snake > 0) {
            // console.log('dont appear')
            gridArray[trapYPos][trapXPos].trap = 0
            trapBlock = 1
          } else {
            gridArray[trapYPos][trapXPos].trap = 1
            // console.log('appear')
            trapBlock = 2
          }
        }
      }
    }

    while (trapBlock === 1)
  }
  //!  Creating Laser variables --------------------------


  let laserDirection
  let laserXPos
  let laserYPos
  let laserTimer 
  
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
  }
  function laserMove() {
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
      
    function beginLaser() {
      laserTimer = setTimeout(laserMove, 50)
    }
    beginLaser()

    if (gridArray[laserYPos][laserXPos].trap > 0) {
      console.log('got one')
      gridArray[laserYPos][laserXPos].trap = 0
    } 
    if ( laserXPos < 0 || laserXPos >= width || laserYPos < 0 || laserYPos >=  height )  {
      clearTimeout(laserTimer)
    }
  }

  //! updating Scores ------------------------------------

  function updatingScore(){
    score.textContent = scoreUpdate
  }
  //=------------

  function updatingHighScore(){
    
    highScoreArray.push(scoreUpdate)
    const highScore = Math.max.apply(null,highScoreArray)
    highScoreSpan.textContent = highScore
  }


  //! Death screen ------------------------


  function deadScreen() {
    
    console.log('dead')
    // clearTimeout(trapTimer)
    clearTimeout(laserTimer)

   

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++) {
        gridArray[y][x].element.classList.remove('snake-head')    
        gridArray[y][x].element.classList.remove('snake-food') 
        gridArray[y][x].element.classList.remove('laser')
      }
    }
    gameGrid.id = 'dead-screen'
    gameGrid.classList.remove('grid')
    gameGrid.appendChild(deadButton)
    deadButton.style.display = 'block'
    deadButton.addEventListener('click', restartGame)

  }
  
  //! --------- changing level ----
  let num = 5
  let numTwo = 17

  function changeLevel() {
    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++) {
        if (x < num || y < num || x >  numTwo || y > numTwo ) {
          gridArray[y][x].door = 1
          gridArray[x][y].element.classList.add('doors')
        } else {
          gridArray[x][y].element.classList.remove('doors')
          gridArray[y][x].door = 0
        }
      }
    }
    console.log(`${num} ${numTwo}`)
  }


  //! Restarting game -----------------------------------------

  function restartGame(){

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++) {
        gridArray[y][x].snake = 0
        gridArray[y][x].food = 0
        gridArray[y][x].trap = 0
        gridArray[y][x].laser = 0
      }
    }



    startButton.style.display = 'none'
    gameGrid.removeAttribute('id')
    gameGrid.classList.add('grid')
    deadButton.style.display = 'none'
    snakeYPosition = Math.floor(height / 2)
    snakeXPosition = Math.floor(width / 2)
    snakeDirection = 'Up'
    scoreUpdate = 0
    num = 5
    numTwo = 17
    updatingScore()

    changeLevel()
    theGame()
    // AFTER GAME CALL!!!!
    createTraps()
    testFood()


    //-----------------
  }
 

  function theGame(){
    // FUNCTIONING PART OF THE GAME!! HERE LOOP TO MAKE THE SNAKE PRESET, CLASS WILL GET ADDED BASED ON THIS!!!!!! 
    // GOTTA MANIPULTE THE VARIABLES TO MAKE THE MOVEMENT APPEAR DIFF
    //! gridArray[y][xPosition ] <------- (LOOP - LOCAL TO LOOP) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][] 
    //! gridArray[snakeXPosition][snakeYPosition] // <------- (GAME - LOCAL TO FUNCTION) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][]

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++){

        if (gridArray[y][x].snake > 0) {
          gridArray[y][x].element.classList.add('snake-head') 
          gridArray[y][x].snake-- // THE NUMVER OF ITERATIONS THE CLASS IS ON THE BOARD FOR, STATING HOW  LONG ITLL MEET THE CONDITION OF THE LOOP AND DECREASE BY ONE ADTER EVERY LOOP INCREMENTALLY,
        } else if (gridArray[y][x].food === 1) {
          gridArray[y][x].element.classList.add('snake-food')
        } else if (gridArray[y][x].trap === 1) {
          gridArray[y][x].element.classList.add('snake-trap') 
        } else if (gridArray[y][x].laser > 0 ) {
          gridArray[y][x].element.classList.add('laser') 
          gridArray[y][x].laser--
        } else if (gridArray[y][x].door === 1) {
          gridArray[y][x].element.classList.add('doors') 
        } else {
          gridArray[y][x].element.classList.remove('snake-head','snake-food','snake-trap','laser', 'doors')   ///  REMOVES THE CLASS IF THE SNAKE
          // OR SNAKE FOOD IS NOT AT POSITION INDEX
        } 
      }
    }

    const decreaseTen = setTimeout(theGame, 100)

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
    if ( snakeXPosition < 0 || snakeXPosition >= width || snakeYPosition < 0 || snakeYPosition >= height)  {
      const clear = clearTimeout(decreaseTen)
      updatingHighScore()
      deadScreen()
    } else if (gridArray[snakeYPosition][snakeXPosition].snake > 0){
      updatingHighScore()
      deadScreen()    //making the game lose if the snake current position is going somewhere where the classlist is already set. i.e can only go somewhere that is 'blank'
    } else if (gridArray[snakeYPosition][snakeXPosition].trap === 1 ) {
      updatingHighScore()
      deadScreen()
    } else if (gridArray[snakeYPosition][snakeXPosition].door === 1 ) {
      updatingHighScore()
      deadScreen()
    } 
    
  

    // !WINNING CONDITIONS
    // making game win a "point" by collecting food divs and gaining length
    if (gridArray[snakeYPosition][snakeXPosition].food === 1) {
      gridArray[snakeYPosition][snakeXPosition].element.classList.remove('snake-food')
      snakeLength++
      scoreUpdate += 100
      num--
      numTwo++
      updatingScore()
      gridArray[snakeYPosition][snakeXPosition].food = 0
      testFood()
    } else if (snakeLength % 2 === 0) {
      changeLevel()
    }
    
    // HERE!!!! would be where the first.. " viewable active moment of the game starts" !!!!! 
    gridArray[snakeYPosition][snakeXPosition].snake = snakeLength
    // console.log( `${[snakeYPosition]} ${[snakeXPosition]}.snake = ${snakeLength}`)

    
  //gameLoop
  }
  //gameLoop
  
  
  startButton.addEventListener('click', restartGame)

}
window.addEventListener('DOMContentLoaded' , init)




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