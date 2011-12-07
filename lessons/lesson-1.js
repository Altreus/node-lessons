require('js-yaml');

var messages = require('./lesson-1.yaml')[0];

module.exports = [
    {
        start: function() {
            console.log(messages.step1);
        },
        data: function(data) {
            if (typeof data == 'string') {
                return true;
            }

            console.log(messages.step1fail);
        },
    },
];
