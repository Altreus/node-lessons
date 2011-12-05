var rl;
require('js-yaml');

var messages = require('./lesson-1.yaml');

module.exports = [
    {
        start: function(rl) {
            rl.write(messages.step1 + "\n");
        },
        data: function(data, rl) {
            if (typeof data == 'string') {
                return true;
            }

            rl.write(message.step1fail);
        },
    },
];
