### Planning and research
1. Game Basics
- Point total: 168 dots

| Suit | Dots | Total |
| :---: | :---: | ---: |
| 6 | 48 |     |
| 5 | 40 |     |
| 4 | 32 |     |
| 3 | 24 |     |
| 2 | 16 |     |
| 1 |  8 |     |
|   |    | 168 |

- Keep track of tiles played, each tile has a value.
- As a tile is played, the tile value is deducted from the point total.
- Display tiles played and tiles remaining to be played
- Game has one player with 1 to 3 opponents


### Gameplay Logic
1. create all dominoes
2. Play 1 picks dominoes they picked up
3. Player 1 picks player who went first
    - Player 1 picks dominoes played
    - Player can toggle direction of play
4. Player 1 continues dictating play
5. On each play, the game will deduct from dominoes pile
6. After each player has gone,once, the prediction engine will kick in


#### Table Logic
- Table is an Array.
- Methods
    - add
    
