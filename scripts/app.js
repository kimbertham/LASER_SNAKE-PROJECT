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

  let snakeYPosition
  let snakeXPosition
  let snakeDirection
  let snakeLength = 5
  let scoreUpdate
  
  function randomNum(){
    return (Math.floor(Math.random() * width))
  }
 
  for (let yPosition = 0; yPosition < height; yPosition++) { 
    const rowArray = [] 
    for (let xPosition = 0; xPosition < width; xPosition++){
      const cell = { snake: 0, food: 0, trap: 0, laser: 0, door: 0 } 
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
      for (let y = 0; y < height; y++) { 
        for (let x = 0; x < width; x++){
          if ( gridArray[foodYPosition][foodXPosition].door > 0 ||
            gridArray[foodYPosition][foodXPosition].trap > 0 ||
            gridArray[foodYPosition][foodXPosition].snake > 0 ) {
            gridArray[foodYPosition][foodXPosition].food = 0
            foodBlock = 1
          } else {
            gridArray[foodYPosition][foodXPosition].food = 1
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

    setTraps()

    do { 
      trapXPos = randomNum()
      trapYPos = randomNum()
      for (let y = 0; y < height; y++) { 
        for (let x = 0; x < width; x++){
          if (gridArray[trapYPos][trapXPos].door > 0 ||
            gridArray[trapYPos][trapXPos].trap > 0 ||
            gridArray[trapYPos][trapXPos].snake > 0) {
            gridArray[trapYPos][trapXPos].trap = 0
            trapBlock = 1
          } else {
            gridArray[trapYPos][trapXPos].trap = 1

            trapBlock = 2
          }
        }
      }
    }
    while (trapBlock === 1)
  }

  function setTraps(){
    clearInterval(trapsTimer)
    trapsTimer =  setInterval(createTraps, 15000)
  }
  let trapsTimer 

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
    // condition for laser to appear or disappear 

    if (gridArray[laserYPos][laserXPos].trap > 0) {
      gridArray[laserYPos][laserXPos].trap = 0
    }  // gets rid of trap by removing class when laser class is on the same spot
    if (gridArray[laserYPos][laserXPos].door > 0 ){
      gridArray[laserYPos][laserXPos].laser = 0 
    } // laser class removed when door class present
    if (gridArray[laserXPos] < 0 || laserXPos >= width || laserYPos < 0 || laserYPos >=  height ) {
      clearTimeout(laserTimer)
    }

    function beginLaser() {
      laserTimer = setTimeout(laserMove, 50)
    }
    beginLaser()
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

    clearTimeout(laserTimer)
    clearTimeout(decreaseTen)
    clearTimeout(decreaseTwo)
    clearTimeout(maxSpeed)

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++) {
        gridArray[y][x].element.removeAttribute('id')
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
          // gridArray[x][y].element.classList.add('doors')
        } else {
          // gridArray[x][y].element.classList.remove('doors')
          gridArray[y][x].door = 0
        }
      }
    }
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
    snakeLength = 5
    updatingScore()
    changeLevel()
    theGame()
    // AFTER GAME CALL!!!!
    createTraps()
    testFood()
    //-----------------
  }
 
  //!GAME LOOP 

  let maxSpeed
  let decreaseTen
  let decreaseTwo

  function theGame(){


    decreaseTen = setTimeout(theGame, 240 - (snakeLength * 10))
    if (snakeLength >= 11  && snakeLength < 18) {
      clearTimeout(decreaseTen)
      decreaseTwo = setTimeout(theGame, 120 - (snakeLength * 2))
    } else if (snakeLength >= 19) {
      clearTimeout(decreaseTwo)
      clearTimeout(decreaseTen)
      maxSpeed = setTimeout(theGame, 65)
    }

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++){
        if (gridArray[y][x].snake > 0) {
          gridArray[y][x].element.setAttribute('id', 'snake-head')
          gridArray[y][x].snake--
        } else if (gridArray[y][x].food === 1) {
          gridArray[y][x].element.setAttribute('id','snake-food')
        } else if (gridArray[y][x].trap === 1) {
          gridArray[y][x].element.setAttribute('id', 'snake-trap')
        } else if (gridArray[y][x].laser > 0 ) {
          gridArray[y][x].element.setAttribute('id','laser') 
          gridArray[y][x].laser--
        } else if (gridArray[y][x].door === 1) {
          gridArray[y][x].element.setAttribute('id', 'doors') 
        } else {
          gridArray[y][x].element.removeAttribute('id')
    
        } 
      }
    }
    //handling the movement of the snake, none of this is called untill triggered by a keyboard event /
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
          if (snakeDirection !== 'Down') {
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
    document.addEventListener('keydown', handleLaserPosition)
    // -----------------------------------------------

    //!LOSIING CONDITIONS
    // making the game lose if the walls are rouched by making the numbers outside of the width and height accessible for adding a class
    if ( snakeXPosition < 0 || snakeXPosition >= width || snakeYPosition < 0 || snakeYPosition >= height)  {
      clearTimeout(decreaseTen)
      clearTimeout(decreaseTwo)
      clearTimeout(maxSpeed)
      deadScreen()
      updatingHighScore()
    } else if (gridArray[snakeYPosition][snakeXPosition].snake > 0 || 
      (gridArray[snakeYPosition][snakeXPosition].trap === 1 ) ||
    (gridArray[snakeYPosition][snakeXPosition].door === 1 )) {
      //making the game lose if the snake current position is going somewhere where the classlist is already set. i.e can only go somewhere that is 'blank'
      clearTimeout(decreaseTen)
      clearTimeout(decreaseTwo)
      clearTimeout(maxSpeed)
      deadScreen()
      updatingHighScore()
    }
    // !WINNING CONDITIONS
    // making game win a "point" by collecting food divs and gaining length
    if (gridArray[snakeYPosition][snakeXPosition].food === 1) {
      // gridArray[snakeYPosition][snakeXPosition].element.classList.remove('snake-food')
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
    gridArray[snakeYPosition][snakeXPosition].snake = snakeLength
    // console.log( `${[snakeYPosition]} ${[snakeXPosition]}.snake = ${snakeLength}`)
  }

  startButton.addEventListener('click', restartGame)
}
window.addEventListener('DOMContentLoaded' , init)




// 