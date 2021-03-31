

<h1> LASERSNAKE </h1>

Link: https://kimbertham.github.io/LASER_SNAKE-PROJECT/

<h2> Brief </h2> 
<p> Build a grid based game of your choice within a 6 day time frame. It must be build using vanilla javascript without the use of frameworks or third party packages. </p>

<h2> Technologies </h2>
<p>HTML</p>
<p>CSS</p>
<p>JavaScript</p>

<h2> Demo </h2>
<img src='https://i.imgur.com/s40DynM.gif' alt='demo' />
 
<h2> Process </h2>
<p>A recreation of the classic game snake with a twist, lasers and poison. Creating over a 1 week period using pure vanilla JavaScript.

<h4> Game grid and snake movement</h4>
<p> The first step was creating the actual game grid that would control the placements of the features involved in the game and placing the initial snake position at the center. Once the snake was set, I worked on handling the movements of the snake. This was achieved by adding and removing styling and classes to specific cells on the grid depending on the keys pressed by the player corresponding to the direction of movement. </p>

``` 
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
```
```
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
 ```

<h4>Obstacles</h4>
 <p> To create the food for the snake I generated two random numbers between 23 and placed the food at random on the grid. At this point I realised the food would have to be placed at cells not where the snake classes were currently set as it could be potentially covered by the snake body. I wrote a do while function to ensure random numbers were generated until coordinated that did not match any currently taken up by the snake were generated. <p>
 
 ```
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
  ```
 
<h4>Point conditions</h4>
 <p> The wins and loss conditions of the games were written leading to either an increase in points or to end the game function. If the head of the snake coordinates on the grid matched the position of the food, the food class would be removed and create function would be called again to create another. If the head touched the walls of the grid the game would end. <p>
 
 <h4> Poison and lasers</h4>
 <p> At this point I decided I would add in the poison as I had already written the function to randomly place obstacles around the grid and all was needed was to set the coordinates of these the loss conditions instead of win. As the lasers would not need to be controlled by the player, I simply took the directional function of the snake and applied it to the laser which would go on in the same direction until it would hit the walls of the grid and the classes be would be removed. Spacebar would trigger the class to be added to the same coordinates of the snake but two cells ahead in the direction of the snake head. </p>
 
 ```
    const c = grid.cell[laser.y][laser.x]

    timers.laser = setTimeout(laserMove, 50)
    c.laser = 1

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

 ```
 
<h4> Levels </h4>
<p> To increase difficulty with levels I decided to implement an expanding grid type design in which the available space the snake can access increases with the first three levels. The speed of the snake also increases with levels achieved by creating a direct relationship between the snake length and setTimeout value of the game.</p>


<h2> Difficulties </h2>
<ul>
<li> <p> I initially had a lot of trouble handling the movement of the snake and coordinating both the movement, position and directions at the same time. Once i was able to match up the starting position of the movement on the grid and the direction, I found that the snake could end up eating itself if the opposite keys were pressed and the snake backed into itself or if movements leading to the snake eating else were pressed on the keys faster than the snakes next move could be shown on the DOM. This was eventually resolved by creating an array of upcoming direction movements and including ternary statements that didn’t allow opposite moves. <p><li>
 
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
 ```
<li><p>I had trouble keeping track of the multiple SetTimeouts and ensuring there was always a working clear function for all of them. </p></li>
 </ul>

<h2> Wins </h2>
<ul>
 <li><p> I found this project to be very helpful in developing my experience with problem solving as I initially had trouble separating the idea of actually moving the grid cells and adding classes to instead give the appearance of movement. This really solidified my understanding of vanilla JavaScript and really gave me a chance to grow confident in using methods and functions to manipulate the users experience. </p></li>
<li><p> I was able to finish the basic game earlier than I thought which gave me time to experiment with adding in the poison and laser features in a way that made current code reusable across different use cases.</li></p>
 </ul>
 
 <h2> Bugs and Future content </h2>
 <p> Currently the game function is running on a SetTimeout functions with a speed relative to the snake length. This means after a certain increase in levels the games becomes too fast and it becomes very difficult to play. To solve this I could set a maximum speed limit after a certain point or alter the equation so the increase in speed I slower allowing for more level increases.

<h2> Experience and key takeaways </h2>
<p> As my first real project, I felt that this game really pulled together all my recently learned knowledge and allowed me the chance to experiment with a lot of the concepts I was not yet sure I had fully grasped yet such as objects and for loops. It really pushed me to consider every aspect of a problem I was faced with and considering each individual step I could possibly take to solve it a issue by issue.  Working solo was also a very interesting experience for me and I found it to be very beneficial as it forced me to really understand my next steps and what I would need to research and look up to achieve it. 
 <p> My key takeaway from this project would be the importance of planning and plotting down a process before beginning the build as I feel a lot of how the game fell in to place was down to trial and error that could have been avoided if I had a better initial understanding of the steps I wanted to achieve. </p>

