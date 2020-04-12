
function init() {

  //* grid specs
  const gridWidth = 33
  const gridCells = gridWidth * gridWidth


  //* DOM 
  const grid = document.querySelector('.grid')
  const cellsArray = []
  let snakeHeadPosition = 510 
 


  //creating gird and putting intial position of snake at 510

  for (let i = 0; i < gridCells; i++) {
    const cell = { snake: 0
    }
    cell.element = document.createElement('div')
    grid.appendChild(cell.element)
    cellsArray.push(cell)
    cell.element.textContent = i
    cell.element.style.fontSize = '8px'

    // cellsArray[1].element.classList.add('snake-head')
    console.log(cellsArray)
  }




  // button to begin initial game loop //
  const startButton = document.querySelector('.start-button')


  // function to begin game moving snake 

  let foodCount = 0

  
  //! begining of loop

  function StartTheGame() {
    console.log('game started')


    cellsArray.forEach()
    function setSnake() {
      if (cellsArray.cell.snake === 1) {
        cellsArray.classList.add('snake-head')
      }
      
    }
    
    // putting food targets down
    let snakeFood 
    function snakeFoodInput(){
      snakeFood = Math.floor(Math.random() * gridCells)
      cellsArray[snakeFood].classList.add('snake-food')
    }
    snakeFoodInput()

    // Will give chosen Value the direction pased on key press direction 
    let chosenDirection
    function handleSnakeDirection(event) {
      chosenDirection = event.key
    }

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


      if (snakeFood === snakeHeadPosition) {
        console.log('hi')
        cellsArray[snakeFood].classList.remove('snake-food')
        foodCount++
        console.log(foodCount)
        cellsArray[snakeHeadPosition].style.width = '4%'
        snakeFoodInput()
      }


    }

    const timedSnakeMovement = setInterval(
      function() {
        moveSnakeHead()
      }, 150)


      

      
    // switch (chosenDirection) {
    //   case 'ArrowUp':
    //     snakeFood -= gridWidth 
    //     console.log( snakeFood + ' ' + snakeHeadPosition)
    //     break
    //   case 'ArrowDown':
    //     snakeFood += gridWidth
    //     console.log( snakeFood + ' ' + snakeHeadPosition)
    //     break
    //   case 'ArrowRight':
    //     snakeFood++
    //     console.log( snakeFood + ' ' + snakeHeadPosition)
    //     break
    //   case 'ArrowLeft':
    //     snakeFood--
    //     console.log( snakeFood + ' ' + snakeHeadPosition)
    //     break
    //   default:
    //     snakeFood++ 
    // }
    //   cellsArray[snakeFood].classList.add('snake-head') 
    //   snakeFoodInput()
    // }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    document.addEventListener('keyup', handleSnakeDirection)
    //gameloop
  }
  //gameloop
      
      
  startButton.addEventListener('click', StartTheGame)
      
      
      
      
      
  // if () {
  // playAgain = true
  // } else {
  //   playAgain = false)
  // }
  //   } while (playAgain)
  // } 
          
          
          
  // //?---------check index position---------- //
          
  // function clickedPosition(event) {
  //   console.log(cellsArray.indexOf(event.target))
  // }
          
  // cellsArray.forEach(cell => {
  //   cell.addEventListener('click', clickedPosition)
  // })
  // //? ---------------------------------------/
}
        
window.addEventListener('DOMContentLoaded', init)




        
// you dont need to create any new divs or appendy divs becayse there is
// no actual movement within the page. The tail will grow by increasin the number of classlists seeming to appear following the main