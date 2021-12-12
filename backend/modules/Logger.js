require('colors');

class Logger {

    static log(main = '', ...msg) {
        console.log(`[${main.blue}] ${'>>>'.red} ${msg.length != 0 ? msg.join(' | ').green : ''}`);
    }

}

module.exports = Logger;