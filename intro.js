#!/usr/bin/env node

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout, null)

rl.on('line', function(line) {
    if (line == "exit") {
        rl.close();
        process.stdin.destroy();
        process.exit();
    }
});
    
var argv = require('optimist').argv;

var lesson_no = argv.lesson || 1;

var lesson = require('./lessons/lesson-' + lesson_no++);

(function() {
    var step = -1;

    function next() {
        step++;
        lesson[step].start(rl);
        lesson();
    }

    function lesson() {
        var input = rl.prompt();
        try {
            var result = eval(input);
            if (lesson[step].data(result)) {
                process.nextTick(next);
            }
            else {
                process.nextTick(lesson);
            }
        }
        catch (e) {
            console.log(e);
            process.nextTick(lesson);
        }
    }
})();
