export default class Country{
    constructor({id, neighbors, name, continent}) {
        this.id = id
        this.name = name
        this.neighbors = neighbors
        this.continent = continent
    }
}