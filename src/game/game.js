import Player from "../model/player"

export default class Game{
    constructor(data) {
        const {players, countries} = data
        this.players = this.placePlayers(players)
        this.countries = countries
    }

    placePlayers(players) {
        return players.map(player =>{
            return new Player(player)
        })
    }

}