function init() {
  const instructions = document.querySelector('.instructions')
  const gameGrid = document.querySelector('.grid')
  const dead = document.querySelector('.dead')
  const startButton = document.querySelector('.start-button')
  const score = document.querySelector('.score')
  const deadButton = document.querySelector('.dead-button')
  const hScore = document.querySelector('.high-score')

  deadButton.addEventListener('click', restartGame)
  startButton.addEventListener('click', showIns)
  document.addEventListener('keyup', handleDirectionKeys)
  document.addEventListener('keydown', handleLaserPosition)
  document.addEventListener('keydown', handleStart)

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
    len: 5,
    q: []
  }

  const timers = {
    traps: 0,
    laser: 0
  }

  function init ()  {


    for (let y = 0; y < grid.h; y++) { 
      for (let x = 0; x < grid.w; x++) {
        const c = grid.cell[y][x] 
        c.snake = 0, c.food = 0, c.trap = 0,c.laser = 0
      }
    }

    snake.y = Math.floor(grid.h / 2)
    snake.x = Math.floor(grid.w / 2)
    snake.dir = 'UP',
    game.score = 0
    grid.inW = 5
    grid.inH = 17
    snake.len = 5
  }

  function handleStart(event) {
    if (event.keyCode === 13) {
      instructions.style.display = 'none'
      startButton.style.display = 'none'
      restartGame()
    }
  }

  function showIns() {
    instructions.style.display = 'block'
    startButton.disabled = true
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
    event.preventDefault()
    switch (event.key) {
      case 'ArrowRight' :
        if ((snake.q.length ? snake.q[0] : snake.dir) !== 'LEFT') 
          snake.q.unshift('RIGHT')
        break
      case 'ArrowLeft': 
        if ((snake.q.length ? snake.q[0] : snake.dir) !== 'RIGHT') 
          snake.q.unshift('LEFT')
        break
      case 'ArrowUp': 
        if ((snake.q.length ? snake.q[0] : snake.dir) !== 'DOWN') 
          snake.q.unshift('UP')
        break
      case 'ArrowDown':
        if ((snake.q.length ? snake.q[0] : snake.dir) !== 'UP') 
          snake.q.unshift('DOWN')
        break
    }
  }



  function handleLaserPosition(event){
    const { laser } = game

    if (event.code === 'Space') {
      laser.y = snake.y
      laser.x = snake.x 

      switch (snake.dir) {
        case 'RIGHT' : 
          laser.x = snake.x + 2
          laser.dir = 'RIGHT'
          break
        case 'LEFT': 
          laser.x = snake.x - 2
          laser.dir = 'LEFT'
          break
        case 'UP' :  
          laser.y = snake.y - 2
          laser.dir = 'UP'
          break
        case 'DOWN' : 
          laser.y = snake.y + 2

          laser.dir = 'DOWN'
          break
      }
      laserMove()
    }
  }


  function laserMove() {
    const { laser } = game
    const c = grid.cell[laser.y][laser.x]

    timers.laser = setTimeout(laserMove, 50)
    c.laser = 1

    switch (laser.dir) {
      case 'RIGHT':
        laser.x++
        break
      case 'LEFT' :
        laser.x--
        break
      case 'UP' : 
        laser.y--
        break
      case 'DOWN': 
        laser.y++
        break
    }

    if (c.trap > 0) {
      c.trap = 0
      clearTimeout(timers.laser)
    } 
    if (c.door > 0 ){
      c.laser = 0 
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
    dead.style.display = 'block'
    deadButton.style.display = 'block'
  }


  function restartGame(){

    dead.style.display = 'none'
    deadButton.style.display = 'none'
    gameGrid.removeAttribute('id')
    gameGrid.classList.add('grid')
    

    init()
    theGame()
    // handleTimers()
    handleObstacles('food')
    handleObstacles('trap')
  }


  let maxSpeed
  let decreaseTen
  let decreaseTwo

  function theGame(){

    score.textContent = game.score
    grid.cell[snake.y][snake.x].snake = snake.len

    decreaseTen = setTimeout(theGame, 150 - (snake.len * 5))
    // if (snake.len >= 11  && snake.len < 18) {
    //   clearTimeout(decreaseTen)
    //   decreaseTwo = setTimeout(theGame, 120 - (snake.len * 2))
    // } else if (snake.len >= 19) {
    //   clearTimeout(decreaseTwo)
    //   clearTimeout(decreaseTen)
    //   maxSpeed = setTimeout(theGame, 65)
    // }



    for (let y = 0; y < grid.h; y++) { 
      for (let x = 0; x < grid.w; x++){
        const c = grid.cell[y][x]
        if (c.snake > 0) {
          setAtt(c,'snake-head')
          c.snake--
        } else if (c.food > 0) {
          setAtt(c,'snake-food')
        } else if (c.trap > 0) {
          setAtt(c,'snake-trap')
        } else if (c.laser > 0 ) {
          setAtt(c,'laser') 
          c.laser--
        } else if (c.door === 1) {
          setAtt(c,'doors') 
        } else {
          c.element.removeAttribute('id')
        } 

        if (x < grid.inW || y < grid.inW || 
          x >  grid.inH || y > grid.inH) {
          grid.cell[y][x].door = 1
        } else {
          grid.cell[y][x].door = 0
        }

      }
    }

    if (snake.q.length)
      snake.dir = snake.q.pop()

    switch (snake.dir) {
      case 'RIGHT':
        snake.x++
        break
      case 'LEFT' :
        snake.x--
        break
      case 'UP' : 
        snake.y--
        break
      case 'DOWN': 
        snake.y++
        break
    }

    if ( 
      snake.x < 0 || snake.x >= grid.w || snake.y < 0 || snake.y >= grid.h ||
      grid.cell[snake.y][snake.x].snake > 0 ||
      grid.cell[snake.y][snake.x].trap === 1 ||
      grid.cell[snake.y][snake.x].door === 1
    ) {
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
