import {countries} from './data/countries'
import {board} from './data/board'
import Game from './game/game'

const data = {
    players:[
        {name: 'Tiago', color: 1, type:1},
        {name: 'Diogo', color: 2, type:1},
        {name: 'Julia', color: 3, type:1} 
    ],
    countries: countries,
} 

const game = new Game(data)



