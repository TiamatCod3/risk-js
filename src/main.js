const game  = {
    players: [
        {id: 1, name: 'Tiago', color: 'black', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},  
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
        {id: 2, name: 'Paulo', color: 'green', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
        {id: 3, name: 'Edu', color: 'yellow', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
        {id: 4, name: 'Rafa', color: 'white', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
        {id: 5, name: 'Ygor', color: 'blue', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
        {id: 6, name: 'Tha', color: 'red', cards: [], objective: 0,
        placeble:{"all":0,"1":0}, placed:{"all":0,"1":0},
        totalCards: 0, totalArmies: 0, totalTerritories: 0},
    ],
    turn: {
        totalPlayers: 6,
        counter: 0,
        currentPlayer: 0,
        playersOrder:[],
        currentPhase: -1,
        phases: ["Mobilizar", "Atacar", "Fortificar"]
    },
    board :{
        territories: [
            {
                id: 1,
                name: 'Alaska',
                neighbors: [2,4],
                continent:1,
                card: 1,
                owner: 0,
                armies: 0
            },
            {
                id: 2,
                name: 'Mackenzie',
                neighbors: [1,3,4,5],
                continent: 1,
                card: 2,
                owner: 0,
                armies: 0
            },
            {
                id: 3,
                name: 'Groelândia',
                neighbors: [2,6],
                continent: 1,
                card: 2,
                owner: 0,
                armies: 0
            },
            {
                id: 4,
                name: 'Vancouver',
                neighbors: [1,2,5,7],
                continent: 1,
                card: 1,
                owner: 0,
                armies: 0
            },
            {
                id: 5,
                name: 'Ottawa',
                neighbors: [2,4,6,7,8],
                continent: 1,
                card: 2,
                owner: 0,
                armies: 0
            },
            {
                id: 6,
                name: 'Labrador',
                neighbors: [3,5,8],
                continent: 1,
                card: 3,
                owner: 0,
                armies: 0
            },
            {
                id: 7,
                name:'California',
                neighbors: [4,5,8,9],
                continent: 1,
                card: 3,
                owner: 0,
                armies: 0
            },
            {
                id: 8,
                name: 'Nova York',
                neighbors: [5,6,7,9],
                continent: 1,
                card: 1,
                owner: 0,
                armies: 0
            },
            {
                id: 9,
                name: 'México',
                neighbors: [7,8],
                continent: 1,
                card: 3,
                owner: 0,
                armies: 0
            }
            
        ]
    },
    decks :{
        cards: [1,2,3,4,5,6,7,8,9],
        objectives:[
            {id:1, description: "Destruir exércitos azuis"},
            {id:2, description: "Destruir exércitos amarelos"},
            {id:3, description: "Destruir exércitos brancos"},
            {id:4, description: "Destruir exércitos verdes"},
            {id:5, description: "Destruir exércitos pretos"},
            {id:6, description: "Destruir exércitos vermelhos"},
            {id:7, description: "Conquistar América do Norte e África"},
            {id:8, description: "Conquistar Ásia e África"},
            {id:9, description: "Conquistar América do Norte e Oceania"},
            {id:10, description: "Conquistar Europa, América do Sul e +1 continente"},
            {id:11, description: "Conquistar Ásia e América do Sul"},
            {id:12, description: "Conquistar Europa, Oceania e +1 continente"},
            {id:13, description: "18 territórios com 2 em cada"},
            {id:14, description: "Conquistar 24 territórios"},
        ],
        discards:[]
    },

    shuffle(items){
        items = items.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)  
        return items
    },

    shufflePlayerOrder: () =>{
        game.turn.playersOrder = game.shuffle(
            game.players.map( player => {
                return player.id
            })
        )   
    },

    shuffleTerritoryCards: () => {
        game.decks.cards = game.shuffle(
            game.decks.cards
        )
    },

    shuffleObjectiveCards: () => {
        game.decks.objectives = game.shuffle(
            game.decks.objectives.map(objective => {
                return objective.id
            })
        )
    },

    dealObjectiveCards: () => {
        game.players.map((player, index) => {
            player.objective = game.decks.objectives[index]
        })
    },

    dealTerritoryCards: () => {
        game.decks.cards.forEach((card) =>{
            let player = game.getCurrentPlayer()
            player.cards.push(card)
            game.nextPlayer()
        })
        game.decks.cards = []
    },

    nextPlayer: () => {
        game.turn.currentPlayer++;
        game.turn.currentPlayer %= 6;
        
    },

    getCurrentPlayer: () => {
        let id = game.turn.playersOrder[game.turn.currentPlayer]
        return game.players.find(player => player.id === id)
    },

    getTerritory: (id) => {
        return game.board.territories.find(territory => territory.id === id)
    },

    initialTerritorySetup: () => {
        game.players.forEach(player =>{
            player.cards.forEach((card,index) => {
                let id = card
                let territory = game.getTerritory(id)
                game.placeArmy(player.id, territory, 1)
                game.decks.discards.push(card)
            })
            player.cards = []
        })
        game.nextPhase()
    },

    placeArmy: (owner, target, amount) => {

        console.log(target.owner)
        

        if(target.owner === 0 || target.owner === owner){
            target.armies += amount;
            target.owner = owner
            return true
        }else{
            console.log("Alocação inválida")
            return false
        }
    },

    reshuffle: () => {
        game.decks.cards = game.decks.discards
        game.decks.discards = []
        game.decks.cards.push(-1)
        game.shuffleTerritoryCards()
    },

    nextPhase: () => {
        game.turn.currentPhase++
        if (game.turn.currentPhase > 2){
            game.turn.currentPhase%=3
            game.counter++
            game.nextPlayer()
        }
        game.startPhase()
    },

    startPhase: () => {
        switch (game.turn.currentPhase) {
            case 0:
            game.setTotalArmiesToPlace()
                break;
            case 1:
                
            break;
            case 2:
                
                break;
        
            default:
                break;
        }
    },

    setTotalArmiesToPlace:() => {
        let player = game.getCurrentPlayer()
        let general = game.getPlayerTerritoriesCount(player)
        player.placeble.all = Math.max(Math.floor(general/2), 3)
    },

    getPlayerTerritoriesCount:(player) => {
        return game.board.territories.filter(t => t.owner === player.id).length
    }, 

    getcurrentPlayerTerritoriesIds: () => {
        let territories = game.board.territories.filter(t => t.owner === game.getCurrentPlayer().id)
        return territories
    },
    
    placeTerritoryArmy: (target,amount) => {
        let player = game.getCurrentPlayer()
        let territory = game.board.territories.find(t => t.id === target)
        console.log(territory)
        if(player.placeble.all < amount){
            console.log("A quantidade é maior que o possível de se alocar")
            return false
        }
        
        if(game.placeArmy(player.id, territory, amount)){
            player.placeble.all -= amount
            player.placed.all += amount
        }
    }
}

//Definir a ordem dos participantes
game.shufflePlayerOrder()

//Embaralhar as cartas objetivo
game.shuffleObjectiveCards()

//Embaralhar as cartas de território
game.shuffleTerritoryCards()

//Distribuir cartas objetivo
game.dealObjectiveCards()

//Distribuir cartas de território
game.dealTerritoryCards()

//Alocar
game.initialTerritorySetup()
// console.log(game)

//Reembaralhar as cartas
game.reshuffle()

//Obter o número de exércitos para alocar


//UI
const message = document.getElementById("message")
mensagem()
mostrarBoard()

function mostrarBoard(){
    document.getElementById("player").textContent = JSON.stringify(game.getCurrentPlayer(), undefined, 2);
    document.getElementById("moves").textContent = JSON.stringify(game.getcurrentPlayerTerritoriesIds(), undefined, 2);
    document.getElementById("json").textContent = JSON.stringify(game.board.territories, undefined, 2);
}

function mensagem(){
    message.innerHTML = `<h1>${game.getCurrentPlayer().name} -> ${game.turn.phases[game.turn.currentPhase]}</h1>`

}

const next = document.getElementById("next")
next.addEventListener('click', (e) => {
    game.nextPhase();
    mensagem()
    mostrarBoard()
})

const alocacao = document.getElementById("alocacao")
const origem = document.getElementById("origem")
const destino = document.getElementById("destino")
const quantidade = document.getElementById("quantidade")

alocacao.addEventListener('submit', (e) => {
    e.preventDefault();
    switch (game.turn.currentPhase) {
        case 0:
            game.placeTerritoryArmy(parseInt(destino.value), parseInt(quantidade.value))
            break;
        case 1:
        
            break;
        case 2:
        
            break;
        default:
            break;
    }
    mostrarBoard()
    e.target.reset();
})