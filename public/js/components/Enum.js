class Enum {
    constructor(array) {
        for (let i = 0; i < array.length; i++) 
            this[array[i]] = i;
    }
}

export default Enum;