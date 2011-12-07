var rl;
require('js-yaml');

var messages = require('./lesson-1.yaml')[0];

module.exports = [
    {
        start: function(rl) {
            rl.write(messages.step1 + "\n");
        },
        data: function(data, rl) {
            if (typeof data == 'string') {
                return true;
            }

            rl.write(messages.step1fail);
        },
    },
];
