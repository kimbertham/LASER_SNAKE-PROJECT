https://kimbertham.github.io/LASER_SNAKE-PROJECT/

<h1> LASERSNAKE </h1>

<h2> Brief </h2> 
<p> Build a grid based, classic game of your choice within a 6 day time frame. It must be build using vanilla javascript without the use of frameworks or third party packages. </p>

<h2> Technologies </h2>
<p>HTML</p>
<p>CSS</p>
<p>JavaScript</p>

<h2> Demo </h2>
<img src='https://i.imgur.com/s40DynM.gif' alt='demo' />
 
<h2> Process </h2>
<p>A recreation of the classic game snake with a twist, lasers and poison. Creating over a 1 week period using pure vanilla JavaScript.

<h4> Game grid and snake movement</h4>
<p> The first step was creating the actual game grid that would control the placements of the features involved in the game and placing the initial snake position at the center. Once the snake was set I worked on handling the movements of the snake. This was achieved by adding and removing styling and classes to specific cells on the grid depending on the keys pressed by the player correspeonding to the direction of movement. </p>

<h4>Obstacles</h4>
 <p> To create the food for the snake I generated two random numbers between 23 and and placed the food at random on the grid. At this point I realised the food would have to be placed at cells not where the snake classes were currently set as it could be potentially covered by the snake body. I wrote a do while function to ensure random numbers were generated untill coordinated that did not match any currently taken up by the snake were generated. <p>
 
 <h4>Point conditions</h4>
 <p> The wins and loss conditions of the games were written leading to either a increase in points or to end the game function. If the head of the snakes coordinates on the grid matched the position of the food, the food class would be removed and create function would be called again to create another. If the head touched the walls of the grid the game would end.<p>
 
 <h4> Poison and lasers</h4>
 <p> At this point I decided I would add in the poison as I had already written the function to randomly place obstacles around the grid and all was needed was to set the coordinates of these the loss conditions instead of win. As the lasers would not need to be controlled by the player I simply took the directional function of the snake and applied it to the laser which would go on in the same direction untill it would hit the walls of the grid and the classes be would be removed. Spacebar would trigger the class to be added to the same coordinates of the snake but two cells ahead in the direction of the snake head. </p>
 
 <h4> Levels </h4>
<p> To increase difficulty with levels I decided to implement an explanding grid type design in which the available space the snake can access increases with the first three levels. The speed of the snake also increases with levels achieved by creating a direct relationship between the snake length and setTimeout value of the game.</p>


<h2> Difficulties </h2>
<ul>
<li> <p> I initially had a lot of trouble handling the movement of the snake and coordinating both the movement, position and directions at the same time. Once i was able to match up the starting position of the movement on the grid and the direction, I found that the snake could end up eating itself if the opposite keys were pressed and the snake backed into itself or if movements leading to the snake eating else were pressed on the keys faster than the snakes next move could be shown on the DOM. This was eventually resolved by creaing an array of upcoming direction movememnts and including ternirary statements that didnt allow opposite moves. <p><li>
 
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
<li><p>I also had trouble keeping track of the multipe SetTimeouts and ensureing there was always a working clear function for all of them. </p></li>
 <ul>


