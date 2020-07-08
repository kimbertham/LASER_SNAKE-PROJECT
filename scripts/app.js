function init() {

  const gameGrid = document.querySelector('.grid')
  const startButton = document.querySelector('.start-button')
  const score = document.querySelector('.score')
  const deadButton = document.querySelector('.dead-button')
  const hScore = document.querySelector('.high-score')

  deadButton.addEventListener('click', restartGame)
  startButton.addEventListener('click', restartGame)
  document.addEventListener('keyup', handleDirectionKeys)
  document.addEventListener('keydown', handleLaserPosition)

  const grid = {
    cell: [],
    h: 23,
    w: 23,
    inW: 5,
    inH: 17
  }

  for (let y = 0; y < grid.h; y++) { 
    const rows = [] 
    for (let x = 0; x < grid.w; x++){
      const cell = { snake: 0, food: 0,trap: 0, laser: 0, door: 0 } 
      cell.element = document.createElement('div')
      gameGrid.appendChild(cell.element) 
      rows.push(cell)
    }
    grid.cell.push(rows) 
  }

  const game = {
    score: 0,
    hScore: [],
    food: false,
    trap: false,
    laser: {
      x: 0,
      y: 0,
      dir: 0
    }
  }

  const snake = {
    x: 0,
    y: 0,
    dir: 0,
    len: 5
  }

  const timers = {
    traps: 0,
    laser: 0
  }

  function init ()  {
    for (let y = 0; y < grid.h; y++) { 
      for (let x = 0; x < grid.w; x++) {
        const c = grid.cell[y][x] 
        c.snake = 0
        c.food = 0
        c.trap = 0
        c.laser = 0
      }
    }

    snake.y = Math.floor(grid.h / 2)
    snake.x = Math.floor(grid.w / 2)
    snake.dir = 'Up'
    game.score = 0
    grid.inW = 5
    grid.inH = 17
    snake.len = 5
  }


  function ranNum(){
    return (Math.floor(Math.random() * grid.w))
  }

  function setAtt (elem, name)  {
    elem.element.setAttribute('id', name)
  }
  
  function updatingHighScore(){
    game.hScore.push(game.score)
    hScore.textContent = Math.max.apply(null,game.hScore)
  }


  const handleObstacles = (icon) => {
    
    if (icon === 'trap') {
      clearInterval(timers.traps)
      timers.traps = setInterval(()=>{
        handleObstacles('trap')
      }, 10000)
    }

    do { 
      const cell = grid.cell[ranNum()][ranNum()]
      for (let y = 0; y < grid.h; y++) { 
        for (let x = 0; x < grid.w; x++){
          if ( Object.keys(cell).some(k => cell[k] === 1)) {
            cell[icon] = false
            game[icon] = false
          } else {
            cell[icon] = 1
            game[icon] = true
          }
        }
      }
    }
    while (!game[icon])
  }


  function handleDirectionKeys(event) {
    switch (event.key) {
      case 'ArrowRight' :
        if ( snake.dir !== 'Left') {
          snake.dir = 'Right'
        }
        break
      case 'ArrowLeft': 
        if (snake.dir !== 'Right') {
          snake.dir = 'Left'
        }
        break
      case 'ArrowUp': 
        if (snake.dir !== 'Down') {
          snake.dir =  'Up'
        }
        break
      case 'ArrowDown':
        if (snake.dir !== 'Up') {
          snake.dir =  'Down'
        }
        break
    }
  }

  function handleLaserPosition(event){
    const { laser } = game

    if (event.code === 'Space') {
      laser.y = snake.y
      laser.x = snake.x 

      switch (snake.dir) {
        case 'Right' : 
          laser.x = snake.x + 2
          laser.dir = 'Right'
          break
        case 'Left' : 
          laser.x = snake.x - 2
          laser.dir = 'Left'
          break
        case 'Up' :  
          laser.y = snake.y - 2
          laser.dir = 'Up'
          break
        case 'Down' : 
          laser.y = snake.y + 2

          laser.dir = 'Down'
          break
      }
      laserMove()
    }
  }


  function laserMove() {
    const { laser } = game
    const cell = grid.cell[laser.y][laser.x]

    timers.laser = setTimeout(laserMove, 50)
    cell.laser = 1

    switch (laser.dir) {
      case 'Right':
        laser.x++
        break
      case 'Left' :
        laser.x--
        break
      case 'Up' : 
        laser.y--
        break
      case 'Down': 
        laser.y++
        break
    }

    if (cell.trap > 0) {
      cell.trap = 0
      clearTimeout(timers.laser)
    } 
    if (cell.door > 0 ){
      cell.laser = 0 
      clearTimeout(timers.laser)
    } 
    if (laser.x < 0 || laser.x >= grid.w ||
      laser.y < 0 || laser.y >=  grid.h ) {
      clearTimeout(timers.laser)
    }
  }


  function deadScreen() {

    updatingHighScore()

    clearTimeout(decreaseTen)
    clearTimeout(decreaseTwo)
    clearTimeout(maxSpeed)

    gameGrid.id = 'dead-screen'
    gameGrid.classList.remove('grid')
    deadButton.style.display = 'block'
  }


  function restartGame(){

    deadButton.style.display = 'none'
    gameGrid.removeAttribute('id')
    gameGrid.classList.add('grid')

    init()
    theGame()
    handleObstacles('food')
    handleObstacles('trap')
  }


  let maxSpeed
  let decreaseTen
  let decreaseTwo

  function theGame(){

    score.textContent = game.score
    grid.cell[snake.y][snake.x].snake = snake.len


    decreaseTen = setTimeout(theGame, 240 - (snake.len * 10))
    if (snake.len >= 11  && snake.len < 18) {
      clearTimeout(decreaseTen)
      decreaseTwo = setTimeout(theGame, 120 - (snake.len * 2))
    } else if (snake.len >= 19) {
      clearTimeout(decreaseTwo)
      clearTimeout(decreaseTen)
      maxSpeed = setTimeout(theGame, 65)
    }

    for (let y = 0; y < grid.h; y++) { 
      for (let x = 0; x < grid.w; x++){
        const cell = grid.cell[y][x]
        if (cell.snake > 0) {
          setAtt(cell,'snake-head')
          cell.snake--
        } else if (cell.food > 0) {
          setAtt(cell,'snake-food')
        } else if (cell.trap > 0) {
          setAtt(cell,'snake-trap')
        } else if (cell.laser > 0 ) {
          setAtt(cell,'laser') 
          cell.laser--
        } else if (cell.door === 1) {
          setAtt(cell,'doors') 
        } else {
          cell.element.removeAttribute('id')
        } 

        if (x < grid.inW || y < grid.inW || 
          x >  grid.inH || y > grid.inH) {
          grid.cell[y][x].door = 1
        } else {
          grid.cell[y][x].door = 0
        }

      }
    }

    switch (snake.dir) {
      case 'Right':
        snake.x++
        break
      case 'Left' :
        snake.x--
        break
      case 'Up' : 
        snake.y--
        break
      case 'Down': 
        snake.y++
        break
    }

    if ( snake.x < 0 || snake.x >= grid.w || snake.y < 0 || snake.y >= grid.h ||
    grid.cell[snake.y][snake.x].trap === 1 || 
    grid.cell[snake.y][snake.x].door === 1) {
      deadScreen()
    }

    if (grid.cell[snake.y][snake.x].food === 1) {
      grid.cell[snake.y][snake.x].food = 0
      snake.len++
      game.score += 100
      grid.inW--
      grid.inH++
      handleObstacles('food')
    }
  }
}


window.addEventListener('DOMContentLoaded' , init)
