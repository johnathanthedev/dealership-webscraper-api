class Vehicle {
    constructor(year, make, model) {
        this.year = year
        this.make = make
        this.model = model
    }

    full_name() {
        return `${this.year} ${this.make} ${this.model}`
    }
}

module.exports = Vehicle