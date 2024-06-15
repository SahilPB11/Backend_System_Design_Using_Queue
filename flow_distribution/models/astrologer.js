// models/astrologer.js
class Astrologer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.users = [];
        this.flowStatus = 'normal'; // Can be 'normal', 'high', 'low'
    }
}

export default Astrologer;
