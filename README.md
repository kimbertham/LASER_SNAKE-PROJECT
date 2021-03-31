https://kimbertham.github.io/LASER_SNAKE-PROJECT/

<h1> LASERSNAKE </h1>

<h2> Overview </h2>
<p>1 Week solo Project</p>
<p>A recreation of the classic game snake with a twist, lasers and poison. Creating over a 1 week period using pure vanilla JavaScript. Control of the snake was achieved by creating a grid and altering stlying classes to give the illusion of movement. After sucessfully creating the basic game by day 4, I decided to add in the feature of bombs and posion and altering the games win/loss conditions to fit these new obstacles. To increase difficulty with levels I decided to implement an explanding grid type design in which the available space the snake can access increases with the first three levels. The speed of the snake also increases with levels achieved by creating a direct relationship between the snake length and setTimeout value of the game.  </p>

<h2> Technologies<h2/>
  <ul> 
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

<h2> Demo </h2>
<img src='https://i.imgur.com/s40DynM.gif' alt='demo' />

<h2> Difficulties </h2>
<p> I initially had a lot of trouble handling the movement of the snake and coordinating both the movement, position and directions at the same time. Once i was able to match up the starting position of the movement on the grid and the direction, I found that the snake could end up eating itself if the opposite keys were pressed and the snake backed into itself or if movements leading to the snake eating else were pressed on the keys faster than the snakes next move could be shown on the DOM. This was eventually resolved by creaing an array of upcoming direction movememnts and including ternirary statements that didnt allow opposite moves. 
I also had trouble keeping track of the multipe SetTimeouts and ensureing there was always a working clear function for all of them. </p>
```

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
   
   
   hello
  ```

