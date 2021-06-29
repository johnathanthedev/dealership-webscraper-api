class Parser {
    constructor(text) {
        this.text = text
    }

    stringToURL() {
        return this.text.split(" ").join("+")
    }
}

module.exports = Parser