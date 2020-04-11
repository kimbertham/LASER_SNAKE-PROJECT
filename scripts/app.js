
function init() {
  // let playAgain

  // gameloop() {
    
  //   do { 

  //* grid specs
  const gridWidth = 33
  const gridCells = gridWidth * gridWidth
  //* DOM 
  const grid = document.querySelector('.grid')
  const cellsArray = []

  //creating gird and putting intial position of snake at 510
  function createCells(firstPosition) {
    for (let i = 0; i < gridCells; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cellsArray.push(cell)
    }
    cellsArray[firstPosition].classList.add('snake-head')
  }

  // button to begin initial game loop //
  const startButton = document.querySelector('.start-button')


  let snakeHeadPosition = 510 


  // function to begin game moving snake 

  function StartTheGame() {
    console.log('game started')


    let chosenDirection
    // Will give chosen Value the direction pased on key press direction 
    function handleSnakePress(event) {
      chosenDirection = event.key
      console.log(chosenDirection)
    }
    document.addEventListener('keyup', handleSnakePress)


    //will move the snake in the direction based value asignned by handleSnakePress 

    function moveSnakeHead() {
      cellsArray[snakeHeadPosition].classList.remove('snake-head')
      switch (chosenDirection) {
        case 'ArrowUp':
          snakeHeadPosition -= gridWidth
          break
        case 'ArrowDown':
          snakeHeadPosition += gridWidth
          break
        case 'ArrowRight':
          snakeHeadPosition++
          break
        case 'ArrowLeft':
          snakeHeadPosition--
          break
        default:
          snakeHeadPosition++ 
      }
      cellsArray[snakeHeadPosition].classList.add('snake-head')
    }

    const timedSnakeMovement = setInterval(
      function() {
        moveSnakeHead()
      }, 150)
  }

  //generate random placement of snake food



  createCells(snakeHeadPosition)

  startButton.addEventListener('click', StartTheGame)



  

  // if () {
  // playAgain = true
  // } else {
  //   playAgain = false)
  // }
  //   } while (playAgain)
  // } 



  //?---------check index position---------- //

  function clickedPosition(event) {
    console.log(cellsArray.indexOf(event.target))
  }

  cellsArray.forEach(cell => {
    cell.addEventListener('click', clickedPosition)
  })
  //? ---------------------------------------/
}
  
window.addEventListener('DOMContentLoaded', init)